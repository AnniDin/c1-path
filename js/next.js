/* C1 Path – difficulty ladder and "What to do next": after every quiz the learner gets two or three concrete next steps,
   chosen from the score, the exam part, the difficulty of the sets (C1.levels) and what is still undone. */
(function () {
  const { h } = Engine;
  const A = window.App;
  const { link } = A;
  const LV = () => window.C1.levels || {};
  const LABEL = ['', 'Warm-up', 'Easier', 'Medium', 'Harder', 'Hardest'];

  /* ---------- difficulty: practice sets run from easier to harder (progress is stored by set number, so only the display order changes) ---------- */
  const setLevel = (type, i) => { const expert = (((LV().practice || {})[type] || [])[i]) || 3; return A.calibrate ? A.calibrate(type, type + '/' + i, expert) : expert; };
  const setOrder = (type) => { const p = C1.practice.find((x) => x.id === type); return p ? p.sets.map((_, i) => i).sort((a, b) => setLevel(type, a) - setLevel(type, b) || a - b) : []; };
  const levelChip = (n) => h('span', { class: 'chip lv lv' + n, title: `Difficulty ${n} of 5: an expert rating, adjusted with learners' scores when enough are shared` }, LABEL[n] || 'Medium');
  /* listening sets, writing tasks and speaking sets: rated by id; lists show them from easier to harder */
  const itemLevel = (kind, id) => { const expert = ((LV()[kind] || {})[id]) || 3; return kind === 'listening' && A.calibrate ? A.calibrate('listening', 'listen:' + id, expert) : expert; };
  A.ranked = (kind, list) => list.map((x, i) => [x, i]).sort((a, b) => itemLevel(kind, a[0].id) - itemLevel(kind, b[0].id) || a[1] - b[1]).map((x) => x[0]);
  A.itemChip = (kind, id) => levelChip(itemLevel(kind, id));
  A.setLevel = setLevel; A.setOrder = setOrder; A.levelChip = levelChip;

  const done = (type, i) => !!Store.score(type + '/' + i);
  /* the learner's level in an exam part: the hardest difficulty at which a set was passed with 70% or more (0 = none yet) */
  const competence = (type) => { const p = C1.practice.find((x) => x.id === type); let c = 0; (p ? p.sets : []).forEach((_, i) => { const s = Store.score(type + '/' + i); if (s && s.p >= 0.7) c = Math.max(c, setLevel(type, i)); }); return c; };
  /* the undone set whose difficulty is closest to the target (a tie goes to the easier one) */
  const pickAt = (type, target, exclude) => setOrder(type).filter((j) => j !== exclude && !done(type, j))
    .sort((a, b) => Math.abs(setLevel(type, a) - target) - Math.abs(setLevel(type, b) - target) || setLevel(type, a) - setLevel(type, b))[0];
  const sameLevel = (type, i) => setOrder(type).find((j) => j !== i && !done(type, j) && setLevel(type, j) === setLevel(type, i));
  const leastPracticed = (not) => C1.practice.filter((p) => p.id !== not).map((p) => ({ id: p.id, title: p.title, n: p.sets.length, d: p.sets.filter((_, i) => done(p.id, i)).length }))
    .sort((a, b) => a.d / a.n - b.d / b.n)[0];

  /* what to build before a given exam part when it goes badly */
  const FOUNDATION = {
    mcq: ['#/vocab', 'Vocabulary: collocations and phrasal verbs are what these gaps test'],
    cloze: ['#/grammar', 'Grammar lessons: open gaps are grammar words (linkers, prepositions, auxiliaries)'],
    wf: ['#/grammar/wordfamilies', 'Word families: the suffixes and prefixes behind word formation'],
    kwt: ['#/grammar', 'Grammar lessons: each transformation tests one structure'],
    reading: ['#/vocab', 'Vocabulary: reading questions turn on paraphrase'],
    gapped: ['#/grammar', 'Grammar lessons on linkers and reference'],
    cross: ['#/vocab', 'Vocabulary: attitude and opinion language'],
    matching: ['#/vocab', 'Vocabulary: paraphrase and opinion language']
  };
  const grammarHas = (id) => A.grammar.some((g) => g.id === id);

  const kindOf = (t) => (/harder set|next level/i.test(t) ? 'harder' : /easier|Step down/i.test(t) ? 'easier' : /Another set at this level/i.test(t) ? 'same' : /mistake/i.test(t) ? 'mistakes'
    : /base first|Fix a pattern|Go back one lesson/i.test(t) ? 'base' : /Retry/i.test(t) ? 'retry' : /Continue (your unit|the course)/i.test(t) ? 'unit' : /Dictation/i.test(t) ? 'dictation'
      : /weak spots/i.test(t) ? 'weak' : /Re-read|Read the idea|strategy|Listen again/i.test(t) ? 'reread' : 'other');

  /* ---------- local feedback loop: did the suggestions you followed help? (this device only) ---------- */
  const PEND = 'c1path.recpend'; // the click waiting for the next quiz (transient, this device)
  const lsGet = (k, d) => { try { return JSON.parse(localStorage.getItem(k) || 'null') || d; } catch (e) { return d; } };
  const lsSet = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* ignore */ } };
  /* the log from before it was synced (localStorage) moves into the Store once */
  try { const old = JSON.parse(localStorage.getItem('c1path.recfx') || 'null'); if (old) { Object.entries(old).forEach(([k, o]) => Store.addFx(k, o.n, o.sum)); localStorage.removeItem('c1path.recfx'); } } catch (e) { /* ignore */ }
  /* a kind of suggestion followed at least 5 times whose next quiz scored 5+ points lower on average is shown last
     (harder sets and unit steps are exempt: a lower score is expected there) */
  const demoted = (k) => { const o = (Store.state.fx || {})[k]; return !['harder', 'unit'].includes(k) && !!o && o.n >= 5 && o.sum / o.n <= -5; };
  A.afterQuiz = (res, source, pct) => {
    A.diagnoseRecord && A.diagnoseRecord(res, source);
    const p = lsGet(PEND, null);
    if (p && Date.now() - p.ts < 864e5) Store.addFx(p.kind, 1, pct - p.pct);
    lsSet(PEND, null);
    A.shareScore && A.shareScore(res, source, pct);
  };

  /* ---------- spaced retries: a weak set comes back after 2 days, a middling one after 7, a good one after 21 ---------- */
  function retryDue() {
    const now = Date.now(), out = [];
    C1.practice.forEach((p) => p.sets.forEach((s, i) => {
      const sc = Store.score(p.id + '/' + i), la = sc && sc.last;
      if (!la) return;
      const days = (now - la.ts) / 864e5, wait = la.p < 0.7 ? 2 : la.p < 0.85 ? 7 : 21;
      if (days >= wait) out.push({ type: p.id, i, title: p.title + ' · ' + s.title, p: la.p, days: Math.floor(days), over: days / wait });
    }));
    return out.sort((a, b) => a.p - b.p || b.over - a.over);
  }
  A.retryDue = retryDue;

  function build(source, pct, res) {
    const recs = [], seen = new Set();
    const R = (title, sub, href) => { if (href && !seen.has(href)) { seen.add(href); recs.push({ title, sub, href, kind: kindOf(title) }); } };
    const wrong = res.filter((x) => !x.ok).length, href = source.href || '', topic = source.topic || '';
    const strong = pct >= 85, fair = pct >= 60, mistakes = Store.mistakes().length;
    const mistakeRec = () => mistakes && R(`Practise your ${mistakes} saved mistake${mistakes === 1 ? '' : 's'}`, 'Answer them correctly in two sessions and they leave your list.', '#/mistakes/practice');
    let m;

    if ((m = href.match(/^#\/practice\/([a-z]+)\/(\d+)/))) {
      const type = m[1], i = +m[2], p = C1.practice.find((x) => x.id === type);
      if (p) {
        /* the same percentage means more on a harder set: judge the score against the set's difficulty */
        const lvl = setLevel(type, i), comp = competence(type), adj = Math.round(pct + (lvl - 3) * 5);
        const accT = (() => { const st = Store.state.stats['u-' + type]; return st && st.t >= 20 ? st.c / st.t : null; })(); // your overall accuracy in this exam part moves the bar
        const strongT = accT != null && accT >= 0.85 ? 90 : accT != null && accT < 0.6 ? 80 : 85, fairT = accT != null && accT < 0.6 ? 55 : 60;
        const sStrong = adj >= strongT, sFair = adj >= fairT, why = lvl === 3 ? `${pct}%` : `${pct}% on a difficulty-${lvl} set counts as ${Math.min(100, Math.max(0, adj))}%`;
        const unitNext = A.nextInUnit('practice', type, i);
        const up = pickAt(type, Math.min(5, Math.max(comp, lvl) + 1), i), down = pickAt(type, Math.max(1, Math.min(lvl - 1, comp || lvl - 1)), i);
        if (sStrong) {
          if (unitNext) R('Continue your unit: ' + unitNext.label, `${why}: this part is solid, so move on.`, unitNext.href);
          if (up != null) R('Try a harder set: ' + p.sets[up].title, `${why}. Your level in this exam part is about ${comp} of 5, so difficulty ${setLevel(type, up)} is the next step.`, `#/practice/${type}/${up}`);
          else R('You have done every set of ' + p.title, 'Broaden your practice instead.', '#/practice');
          const lp = leastPracticed(type); lp && lp.d < lp.n && R('Practise ' + lp.title, `Your least practised exam part: ${lp.d} of ${lp.n} sets done.`, '#/practice/' + lp.id);
        } else if (sFair) {
          mistakeRec();
          const sl = sameLevel(type, i);
          sl != null && R('Another set at this level: ' + p.sets[sl].title, `${why}: you are close. One more set of the same difficulty will show whether it is a pattern or bad luck.`, `#/practice/${type}/${sl}`);
          R('Re-read the strategy for ' + p.title, 'Two minutes on the method often fixes the gaps you lost.', '#/practice/' + type);
        } else {
          if (down != null) R('Step down to an easier set: ' + p.sets[down].title, `${why}: this level is too hard right now. Difficulty ${setLevel(type, down)} of 5 first, then come back.`, `#/practice/${type}/${down}`);
          const f = FOUNDATION[type]; f && R('Build the base first', f[1], f[0]);
          mistakeRec();
        }
      }
    } else if ((m = href.match(/^#\/grammar\/(.+)$/))) {
      const id = m[1], g = A.grammar.find((x) => x.id === id);
      if (g) {
        const same = A.grammar.filter((x) => x.category === g.category), k = same.findIndex((x) => x.id === id);
        const nextL = same.slice(k + 1).concat(A.grammar.filter((x) => x.category !== g.category)).find((x) => !Store.state.lessons[x.id]), prevL = same[k - 1];
        const unitNext = A.nextInUnit('grammar', id);
        if (strong) {
          if (unitNext) R('Continue your unit: ' + unitNext.label, `You scored ${pct}% on this lesson.`, unitNext.href);
          R('Use it in an exam task', 'A structure sticks when you have to produce it under exam conditions.', '#/practice/kwt');
          nextL && R('Next lesson: ' + nextL.title, 'The next one you have not read yet.', '#/grammar/' + nextL.id);
        } else if (fair) {
          mistakeRec();
          R('Re-read "The idea" and "Traps" in this lesson', `${wrong} answer${wrong === 1 ? '' : 's'} missed: the reason behind the rule usually answers them.`, href);
          R('Try the quiz again tomorrow', 'Spaced repetition: a day later it moves from short- to long-term memory.', '#/course/mix');
        } else {
          R('Read the idea again, slowly', `${pct}%: do not move on yet. Read the lesson's opening idea and the examples, then retry the quiz.`, href);
          prevL && R('Go back one lesson: ' + prevL.title, 'It is the nearest easier lesson in the same theme.', '#/grammar/' + prevL.id);
          mistakeRec();
        }
      }
    } else if ((m = href.match(/^#\/skills\/listening\/(.+)$/))) {
      const id = m[1], cur = (LV().listening || {})[id] || 3, unitNext = A.nextInUnit('listening', id);
      const pool = (C1.listening || []).filter((l) => l.id !== id && !Store.score('listen:' + l.id));
      const lvl = (l) => (LV().listening || {})[l.id] || 3;
      const harder = pool.filter((l) => lvl(l) >= cur).sort((a, b) => lvl(a) - lvl(b))[0], easier = pool.filter((l) => lvl(l) <= cur).sort((a, b) => lvl(b) - lvl(a))[0];
      if (strong) {
        if (unitNext) R('Continue your unit: ' + unitNext.label, `You scored ${pct}% on the listening.`, unitNext.href);
        harder && R('A listening at the next level: ' + harder.title, `Difficulty ${lvl(harder)} of 5 (this one was ${cur}).`, '#/skills/listening/' + harder.id);
        R('Dictation', 'Train your ear for detail: type what you hear.', '#/skills/dictation');
      } else if (fair) {
        R('Listen again with the transcript open', 'Find the exact words that carried each answer. That is where the distractors hide.', href);
        mistakeRec();
        R('Dictation', 'Short sentences at your own speed show which sounds you miss.', '#/skills/dictation');
      } else {
        easier && R('An easier listening first: ' + easier.title, `${pct}%: build up from difficulty ${lvl(easier)} of 5.`, '#/skills/listening/' + easier.id);
        R('Dictation', 'Slow, short, repeatable: the quickest way to train the ear.', '#/skills/dictation');
        mistakeRec();
      }
    } else if (topic === 'v-quiz') {
      const due = A.dueIds().length;
      if (strong) { R('Learn new cards', 'Your recall is strong: add new vocabulary.', '#/review'); R('Use the words in a task', 'Words you use in writing stay for good.', '#/skills/writing'); }
      else { due && R(`Review the ${due} cards due today`, 'Reviewing on the due day is what makes cards stick.', '#/review'); mistakeRec(); R('Study the group again', 'Read the examples aloud before the next quiz.', '#/vocab'); }
    } else {
      const nc = A.nextCourseStep && A.nextCourseStep();
      if (strong) { nc && R('Continue the course: ' + nc.info.label, `${pct}%: you are ready for the next step.`, nc.info.href); }
      else { mistakeRec(); R('Train your weak spots', 'Questions only from the topics you get wrong most.', '#/weak'); }
    }

    /* what you keep missing in this very result */
    const top = (A.diagnoseWrong ? A.diagnoseWrong(res, source) : [])[0];
    if (top && (top.n >= 2 || res.length <= 6) && !seen.has(top.href)) {
      seen.add(top.href);
      recs.splice(Math.min(1, recs.length), 0, { title: 'Fix a pattern: ' + top.label, sub: `You missed ${top.n} question${top.n === 1 ? '' : 's'} on this. A short look at the cause helps more than more answers.`, href: top.href, kind: 'base' });
    }
    const rd = retryDue()[0];
    if (recs.length < 3 && rd) R('Retry ' + rd.title, `You scored ${Math.round(rd.p * 100)}% ${rd.days} day${rd.days === 1 ? '' : 's'} ago. A spaced retry is what makes it stick.`, `#/practice/${rd.type}/${rd.i}`);

    /* always useful: cards due, weak spots, the exam date, the next course step */
    const due = A.dueIds().length;
    if (recs.length < 3 && due) R(`Review ${due} flashcard${due === 1 ? '' : 's'} due today`, 'Short spaced reviews fix vocabulary.', '#/review');
    const weak = A.weakTopics ? A.weakTopics() : [];
    if (recs.length < 3 && weak.length && !strong) R('Train your weak spots', weak.map(([k]) => A.topicLabels[k] || k).join(', '), '#/weak');
    const ex = Store.state.exam && Store.state.exam.date;
    if (recs.length < 3 && ex) { const n = Math.round((new Date(ex + 'T00:00:00') - new Date(Store.today() + 'T00:00:00')) / 864e5); if (n >= 0 && n <= 21) R('Do a full timed test', `${n} day${n === 1 ? '' : 's'} to your exam: practise stamina and timing.`, '#/mock'); }
    const nc = A.nextCourseStep && A.nextCourseStep();
    if (recs.length < 3 && nc) R('Continue the course: ' + nc.info.label, 'The next step on your path.', nc.info.href);
    return recs.map((r, i) => [r, i]).sort((a, b) => demoted(a[0].kind) - demoted(b[0].kind) || a[1] - b[1]).map((x) => x[0]);
  }

  A.recommend = (source, pct, res) => {
    try {
      const recs = build(source || {}, pct, res || []).slice(0, 3);
      if (!recs.length) return null;
      return h('div', { class: 'next' }, h('h3', {}, 'What to do next'),
        recs.map((r, i) => {
          const here = location.hash.split('?')[0] === r.href.split('?')[0], cls = 'btn small' + (i ? ' ghost' : '');
          /* a link to the page you are already on fires no hashchange, so redraw the page instead */
          return h('div', { class: 'nextrow' }, h('div', {}, h('strong', {}, r.title), h('div', { class: 'muted' }, r.sub)),
            (() => { const el = here ? h('a', { class: cls, href: r.href, onclick: (e) => { e.preventDefault(); A.route(); } }, i ? 'Open' : 'Go') : link(r.href, i ? 'Open' : 'Go', cls);
              el.addEventListener('click', () => lsSet(PEND, { kind: r.kind, pct, ts: Date.now() })); return el; })());
        }));
    } catch (e) { return null; }
  };
  A.recommendFor = build; // used by the tests

  A.skillsCard = () => {
    const rows = (A.subSkillStats ? A.subSkillStats() : []).filter((x) => x.t >= 5).slice(0, 5);
    if (!rows.length) return null;
    return A.cardBlock('Your skills, weakest first', h('p', { class: 'muted' }, 'Every answer is tagged with the skill it tests. These are the ones you miss most '),
      ...rows.map((x) => { const a = x.c / x.t; return h('div', { class: 'trow' }, link(x.href, x.label), A.bar(a, a >= 0.8 ? 'ok' : a >= 0.6 ? 'warn' : 'bad'), h('span', {}, `${Math.round(a * 100)}% · ${x.t}`)); }));
  };
  const KIND = { harder: 'A harder set', easier: 'An easier set', same: 'A set at the same level', mistakes: 'Practising mistakes', base: 'A base lesson', retry: 'A spaced retry', unit: 'The next unit step', dictation: 'Dictation', weak: 'Weak spots', reread: 'Re-reading' };
  A.recsCard = () => {
    const rows = Object.entries(Store.state.fx || {}).filter(([, o]) => o.n >= 2);
    if (!rows.length) return null;
    return A.cardBlock('Do the suggestions help?', h('p', { class: 'muted' }, 'The score of your next quiz after you followed each kind of suggestion, against the quiz before it. A harder set scores lower by design. A kind that keeps lowering your score is shown last. '),
      ...rows.map(([k, o]) => { const d = Math.round(o.sum / o.n); return h('div', { class: 'trow' }, h('span', {}, KIND[k] || k), h('span', {}, `${o.n} times`), h('span', { class: d >= 0 ? 'a-ok' : 'a-warn' }, (d > 0 ? '+' : '') + d + ' points')); }));
  };
  A.competence = competence;

  /* Home: the next best steps, in priority order (spaced repetition first, then the weakest exam part, mistakes, the course, the exam date) */
  A.homeSteps = () => {
    const steps = [], push = (t, s, href, label) => { if (!steps.some((x) => x[2] === href)) steps.push([t, s, href, label]); };
    const st = Store.state, due = A.dueIds().length;
    if (!st.placement) push('Take the placement test', 'Twenty-four questions, B1 to C1. It shows where to start.', '#/placement', 'Start');
    const fresh = A.freshCards ? A.freshCards() : 0;
    if (due + fresh > 0) push(`Review ${due + fresh} vocabulary card${due + fresh === 1 ? '' : 's'}`, `${due} due · ${fresh} new`, '#/review', 'Review');
    /* the exam part with the lowest accuracy (at least 5 answers), and the set that suits the learner's level there */
    const parts = C1.practice.map((p) => { const s = st.stats['u-' + p.id]; return s && s.t >= 5 ? { p, acc: s.c / s.t } : null; }).filter(Boolean).filter((x) => x.acc < 0.75).sort((a, b) => a.acc - b.acc);
    if (parts[0]) { const { p, acc } = parts[0], j = pickAt(p.id, Math.max(1, competence(p.id)) , -1); if (j != null) push(`${p.title}: your weakest exam part`, `${Math.round(acc * 100)}% correct so far. A difficulty-${setLevel(p.id, j)} set suits your level.`, `#/practice/${p.id}/${j}`, 'Practise'); }
    const rd = retryDue()[0];
    if (rd) push('Retry ' + rd.title, `You scored ${Math.round(rd.p * 100)}% ${rd.days} day${rd.days === 1 ? '' : 's'} ago. Spaced retries make it stick.`, `#/practice/${rd.type}/${rd.i}`, 'Retry');
    const ws = A.weakestSkill ? A.weakestSkill() : null;
    if (ws) push('Your weakest skill: ' + ws.label, `${Math.round(ws.acc * 100)}% over ${ws.n} questions. Study it, then test it again.`, ws.href, 'Study');
    const nMist = Store.dueMistakes().length;
    if (nMist) push(`Review ${nMist} mistake${nMist === 1 ? '' : 's'}`, 'Due today: a day after the slip, then again after three days, so they stick', '#/mistakes', 'Review');
    const nc = A.nextCourseStep && A.nextCourseStep();
    if (nc) push(`Course · ${nc.u.title}`, `Step ${nc.i + 1} of ${nc.total}: ${nc.info.kind.toLowerCase()} · ${nc.info.label}`, nc.info.href, 'Continue');
    const ex = st.exam && st.exam.date;
    if (ex) { const d = Math.round((new Date(ex + 'T00:00:00') - new Date(Store.today() + 'T00:00:00')) / 864e5); if (d >= 0 && d <= 21) push('Do a full timed test', `${d} day${d === 1 ? '' : 's'} to your exam: practise stamina and timing.`, '#/mock', 'Start'); }
    push('Mixed review', 'A few questions from grammar, vocabulary and rewriting', '#/course/mix', 'Start');
    return steps;
  };
})();
