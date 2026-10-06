/* C1 Path – views and hash router. */
window.App = { routes: {}, cleanup: [] };
(function () {
  const { h, quiz } = Engine;
  const C1 = window.C1;
  const app = document.getElementById('app');
  const pct = (x) => Math.round(x * 100);

  /* ---------- structure of the course ---------- */
  const GRAMMAR_CATS = [
    { name: 'Verbs and time', blurb: 'How verbs express time, certainty and unreality.' },
    { name: 'Sentence structure', blurb: 'Building, reshaping and emphasising clauses.' },
    { name: 'Reporting and voice', blurb: 'Who does what, and who said what.' },
    { name: 'Words and patterns', blurb: 'Patterns that words demand: forms, quantities, comparisons, linkers.' }
  ];
  const VOCAB_SECTIONS = [
    { name: 'Phrasal verbs', blurb: 'Grouped by the particle or verb that gives them their logic.' },
    { name: 'Collocations and patterns', blurb: 'Word partners, prepositions and confusing pairs.' },
    { name: 'Idioms and expressions', blurb: 'Fixed images and formal phrases for Speaking and Writing.' },
    { name: 'Topic vocabulary', blurb: 'Useful language for the themes that come up in every exam.' }
  ];
  const PRACTICE_SECTIONS = [
    { name: 'Use of English', ids: ['mcq', 'cloze', 'wf', 'kwt'], blurb: 'Cambridge Reading and Use of English, Parts 1–4, and similar tasks in Linguaskill and CertAcles.' },
    { name: 'Reading', ids: ['reading', 'gapped'], blurb: 'Longer texts: understanding attitude, reference and text structure.' }
  ];

  const grammar = GRAMMAR_CATS.flatMap((c) => C1.grammar.filter((g) => g.category === c.name))
    .concat(C1.grammar.filter((g) => !GRAMMAR_CATS.some((c) => c.name === g.category)));
  const practiceTypes = PRACTICE_SECTIONS.flatMap((s) => s.ids.map((id) => C1.practice.find((p) => p.id === id)).filter(Boolean));
  const setKey = (typeId, i) => typeId + '/' + i;
  let unitCtx = null; // unit id when a page was opened from inside a course unit (?u=)

  const topicLabels = { 'v-cards': 'Vocabulary cards', 'v-quiz': 'Vocabulary quizzes', placement: 'Placement test', mix: 'Mixed review', 'unit-review': 'Unit reviews' };
  C1.grammar.forEach((g) => (topicLabels['g-' + g.id] = g.title));
  C1.practice.forEach((p) => (topicLabels['u-' + p.id] = p.title));
  const topicHref = (k) => k.startsWith('g-') ? '#/grammar/' + k.slice(2) : k.startsWith('u-') ? '#/practice/' + k.slice(2) : k.startsWith('v-') ? '#/vocab' : '#/';

  const allCards = C1.vocab.flatMap((g) => g.cards.map((c, i) => Object.assign({ id: g.id + '-' + i, group: g.id, groupTitle: g.title, section: g.section }, c)));
  const cardById = Object.fromEntries(allCards.map((c) => [c.id, c]));

  /* ---------- icons (line style, take the text colour) ---------- */
  const ICONS = {
    listening: '<path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16.5 8.5a5 5 0 010 7M19 6a8.5 8.5 0 010 12"/>',
    speaking: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3"/>',
    writing: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 3v18M12 8h4M12 12h4"/>',
    grammar: '<path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2V5z"/><path d="M8 7h7"/>',
    vocab: '<rect x="3" y="8" width="13" height="12" rx="2"/><path d="M8 8V6a2 2 0 012-2h9a2 2 0 012 2v9a2 2 0 01-2 2h-3"/>',
    practice: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r=".8"/>',
    review: '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l3 3 5-6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'
  };
  const KIND_ICON = { Vocabulary: 'vocab', Grammar: 'grammar', 'Use of English': 'practice', Reading: 'grammar', Listening: 'listening', Speaking: 'speaking', Writing: 'writing', Review: 'review' };
  const icon = (name) => h('span', { class: 'ico', 'aria-hidden': 'true', html: `<svg viewBox="0 0 24 24" width="1.15em" height="1.15em" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[KIND_ICON[name] || name] || ''}</svg>` });

  /* ---------- helpers ---------- */
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const link = (href, text, cls) => h('a', { href, class: cls || '' }, text);
  const back = (href, text) => h('p', { class: 'crumbs' }, link(href, '← ' + text));
  const bar = (p, cls) => h('div', { class: 'bar ' + (cls || '') }, h('i', { style: `width:${Math.max(2, pct(p))}%` }));
  const barCls = (a) => (a >= 0.8 ? 'ok' : a >= 0.6 ? 'warn' : 'bad');
  const accTag = (topic) => {
    const a = Store.accuracy(topic);
    return a == null ? null : h('span', { class: 'tag' + (a >= 0.8 ? ' ok' : '') }, pct(a) + '% correct');
  };
  const dueIds = () => allCards.filter((c) => Store.isDue(c.id)).map((c) => c.id);
  const newIds = (group) => allCards.filter((c) => !Store.card(c.id) && (!group || c.group === group)).map((c) => c.id);
  const NEW_PER_DAY = 10;
  const sectionHead = (title, blurb, right) => h('div', { class: 'section-h' }, h('div', {}, h('h2', {}, title), blurb ? h('div', { class: 'muted' }, blurb) : null), right || null);
  const scoreChip = (key) => { const s = Store.score(key); return s ? h('span', { class: 'chip best' }, 'best ' + pct(s.p) + '%') : null; };
  const setsDone = (p) => p.sets.filter((_, i) => Store.score(setKey(p.id, i))).length;
  const cardsSeen = (group) => allCards.filter((c) => c.group === group && Store.card(c.id)).length;


  /* ---------- course model ---------- */
  const unitById = (id) => C1.course.find((u) => u.id === id);
  function stepInfo(u, s) {
    const q = '?u=' + u.id;
    if (s.t === 'vocab') {
      const g = C1.vocab.find((x) => x.id === s.id);
      return { kind: 'Vocabulary', label: g.title, sub: `${g.cards.length} items`, href: `#/vocab/${s.id}${q}`, done: cardsSeen(s.id) >= Math.ceil(g.cards.length * 0.7) };
    }
    if (s.t === 'grammar') {
      const g = grammar.find((x) => x.id === s.id);
      return { kind: 'Grammar', label: g.title, sub: g.tagline, href: `#/grammar/${s.id}${q}`, done: !!Store.state.lessons[s.id] };
    }
    if (s.t === 'practice') {
      const p = C1.practice.find((x) => x.id === s.id), set = p.sets[s.set];
      return { kind: s.id === 'reading' || s.id === 'gapped' ? 'Reading' : 'Use of English', label: `${p.title} · ${set.title}`, sub: '', href: `#/practice/${s.id}/${s.set}${q}`, done: !!Store.score(setKey(s.id, s.set)) };
    }
    if (s.t === 'listening') {
      const l = (C1.listening || []).find((x) => x.id === s.id) || {};
      return { kind: 'Listening', label: l.title || s.id, sub: l.format || '', href: `#/skills/listening/${s.id}${q}`, done: !!Store.score('listen:' + s.id) };
    }
    if (s.t === 'writing') {
      const w = ((C1.writing || {}).tasks || []).find((x) => x.id === s.id) || {};
      return { kind: 'Writing', label: w.title || s.id, sub: w.genre ? w.genre[0].toUpperCase() + w.genre.slice(1) + ' · ' + w.min + '–' + w.max + ' words' : '', href: `#/skills/writing/${s.id}${q}`, done: !!(Store.skill('writing:' + s.id) || {}).done };
    }
    if (s.t === 'speaking') {
      const sp = ((C1.speaking || {}).sets || []).find((x) => x.id === s.id) || {};
      return { kind: 'Speaking', label: sp.title || s.id, sub: 'Parts 1–4 with timer and recorder', href: `#/skills/speaking/${s.id}${q}`, done: !!(Store.skill('speaking:' + s.id) || {}).done };
    }
    return { kind: 'Review', label: 'Unit review', sub: 'Mixed questions from everything in this unit', href: `#/course/${u.id}/review`, done: !!Store.score('unit:' + u.id) };
  }
  const unitSteps = (u) => u.steps.concat([{ t: 'review' }]).map((s) => stepInfo(u, s));
  const unitDone = (u) => unitSteps(u).filter((x) => x.done).length;
  function nextCourseStep() {
    for (const u of C1.course) { const infos = unitSteps(u); const i = infos.findIndex((x) => !x.done); if (i >= 0) return { u, info: infos[i], i, total: infos.length }; }
    return null;
  }
  /* When a page was opened from a unit, offer "back to unit" and "next step". */
  function unitBack() { const u = unitCtx && unitById(unitCtx); return u ? back('#/course/' + u.id, u.title) : null; }
  function unitFooter(kind, id, set) {
    const u = unitCtx && unitById(unitCtx);
    if (!u) return null;
    const list = u.steps.concat([{ t: 'review' }]);
    const idx = list.findIndex((s) => s.t === kind && s.id === id && (set == null || s.set === set));
    if (idx < 0) return null;
    const infos = unitSteps(u), prev = infos[idx - 1], next = infos[idx + 1];
    return h('div', { class: 'pager' },
      prev ? link(prev.href, '← ' + prev.label, 'btn ghost small') : link('#/course/' + u.id, '← Unit overview', 'btn ghost small'),
      next ? link(next.href, 'Next: ' + next.label + ' →', 'btn small') : link('#/course/' + u.id, 'Back to the unit', 'btn small'));
  }
  const uq = () => (unitCtx ? '?u=' + unitCtx : '');
  /* "Part of the course" crumb, shown when a page was opened from the Library instead of from a unit. */
  function partOf(kind, id, set) {
    if (unitCtx) return h('span');
    const hits = C1.course.filter((u) => u.steps.some((st) => st.t === kind && st.id === id && (set == null || st.set === set)));
    if (!hits.length) return h('span');
    return h('p', { class: 'crumbs' }, 'In the course: ', hits.flatMap((u, i) => [i ? ', ' : '', link(`#/course/${u.id}`, u.title)]));
  }

  /* ---------- question builders for mixed reviews ---------- */
  const sample = (arr, n) => shuffle(arr).slice(0, n);
  function grammarItems(lessonIds, perLesson) {
    return lessonIds.flatMap((id) => { const g = grammar.find((x) => x.id === id); return g ? sample(g.quiz, perLesson) : []; });
  }
  function vocabItem(c) {
    const same = (f) => shuffle(allCards.filter((x) => x.phrase !== c.phrase && f(x)));
    const pool = [].concat(same((x) => x.group === c.group), same((x) => x.section === c.section && x.kind === c.kind), same((x) => x.kind === c.kind));
    const opts = []; pool.forEach((x) => { if (opts.length < 3 && !opts.includes(x.phrase)) opts.push(x.phrase); });
    const all = shuffle([c.phrase].concat(opts));
    return {
      type: 'mcq', options: all, answer: all.indexOf(c.phrase),
      q: `<span class="muted">${c.meaning}</span><br>` + c.ex.replace(/\[\[(.+?)\]\]/g, '<span class="blank"></span>'),
      why: `<em>${c.phrase}</em>: ${c.meaning}. ${c.logic || ''}`
    };
  }
  const kwtPool = (sets) => sets.flatMap((s) => s.items.filter((q) => q.type === 'kwt'));

  /* Headings that skip a level (h1 straight to h3) get an aria-level so screen readers see a clean outline. */
  function fixHeadings() {
    let prev = 1;
    app.querySelectorAll('h1,h2,h3').forEach((el) => {
      const lvl = +el.tagName[1];
      if (lvl - prev > 1) { el.setAttribute('aria-level', String(prev + 1)); prev = prev + 1; } else prev = lvl;
    });
  }
  function view(...nodes) { app.replaceChildren(...nodes); fixHeadings(); window.scrollTo(0, 0); app.focus({ preventScroll: true }); }
  const cardBlock = (title, ...kids) => h('div', { class: 'card' }, title ? h('h2', { style: 'margin-top:0' }, title) : null, ...kids);

  /* ---------- home ---------- */
  function nextPractice() {
    for (const p of practiceTypes) for (let i = 0; i < p.sets.length; i++) if (!Store.score(setKey(p.id, i))) return { p, i };
    return null;
  }

  function home() {
    const st = Store.state;
    const due = dueIds().length;
    const fresh = Math.max(0, Math.min(NEW_PER_DAY - Store.newTodayCount(), newIds().length));
    const nc = nextCourseStep();

    const steps = [];
    if (!st.placement) steps.push(['Take the placement test', 'Twenty-four questions, B1 to C1. It shows where to start.', '#/placement', 'Start']);
    if (due + fresh > 0) steps.push([`Review ${due + fresh} vocabulary card${due + fresh === 1 ? '' : 's'}`, `${due} due · ${fresh} new`, '#/review', 'Review']);
    const nMist = Store.mistakes().length;
    if (nMist) steps.push([`Review ${nMist} mistake${nMist === 1 ? '' : 's'}`, 'Questions you got wrong, with the reason for each', '#/mistakes', 'Review']);
    if (nc) steps.push([`Course · ${nc.u.title}`, `Step ${nc.i + 1} of ${nc.total}: ${nc.info.kind.toLowerCase()} · ${nc.info.label}`, nc.info.href, 'Continue']);
    steps.push(['Mixed review', 'A few questions from grammar, vocabulary and rewriting', '#/course/mix', 'Start']);

    const [first, ...rest] = steps;
    const hero = h('section', { class: 'hero' },
      h('p', { class: 'eyebrow' }, st.placement || Store.totalAnswered() ? 'Next up' : 'Start here'),
      h('h1', {}, first[0]),
      h('p', { class: 'lead' }, first[1]),
      link(first[2], first[3], 'btn'));

    const gDone = grammar.filter((g) => st.lessons[g.id]).length;
    const seen = allCards.filter((c) => Store.card(c.id)).length;
    const pTotal = practiceTypes.reduce((a, p) => a + p.sets.length, 0);
    const pDone = practiceTypes.reduce((a, p) => a + setsDone(p), 0);
    const uDone = C1.course.filter((u) => unitDone(u) === unitSteps(u).length).length;
    const row = (label, href, done, total) => h('a', { class: 'prow', href }, h('span', {}, label), bar(total ? done / total : 0), h('span', { class: 'muted' }, `${done}/${total}`));

    const acc = (() => { const t = Store.totalAnswered(); const c = Object.values(st.stats).reduce((a, s) => a + s.c, 0); return t ? pct(c / t) + '%' : '–'; })();
    const weak = Object.entries(st.stats).filter(([, s]) => s.t >= 5).map(([k, s]) => [k, s.c / s.t]).filter(([, a]) => a < 0.75).sort((a, b) => a[1] - b[1]).slice(0, 3);
    const fig = (n, label) => h('div', {}, h('b', {}, n), h('span', {}, label));

    view(hero,
      h('div', { class: 'figures' },
        fig(Store.streak(), 'day streak'),
        fig(`${Store.todayCount()}/${Store.goal()}`, 'answers today'),
        fig(acc, 'accuracy'),
        fig(due, 'cards due')),
      App.rewards ? App.rewards.strip() : null,
      rest.length ? h('section', {}, h('h2', {}, 'Also on the list'),
        rest.slice(0, 3).map(([t, d, href, cta]) => h('div', { class: 'pathrow' }, h('div', {}, h('strong', {}, t), h('div', { class: 'muted' }, d)), link(href, cta, 'btn small ghost')))) : null,
      h('section', {}, h('h2', {}, 'Where you are'),
        row('Course units', '#/course', uDone, C1.course.length),
        row('Grammar lessons', '#/grammar', gDone, grammar.length),
        row('Vocabulary items', '#/vocab', seen, allCards.length),
        row('Practice sets', '#/practice', pDone, pTotal)),
      weak.length ? h('section', {}, h('h2', {}, 'Needs work'),
        weak.map(([k, a]) => h('div', { class: 'trow' }, link(topicHref(k), topicLabels[k] || k), bar(a, 'bad'), h('span', {}, pct(a) + '%'))),
        h('p', { class: 'muted' }, 'Topics below 75% after at least 5 answers.')) : null,
      h('p', { class: 'muted' }, link('#/progress', 'Review and progress →'), ' · ', link('#/welcome', 'How C1 Path works')));
  }

  /* ---------- progress ---------- */
  function progress() {
    const st = Store.state;
    const heat = h('div', { class: 'heat' }, Store.lastDays(84).map((d) =>
      h('i', { class: d.n >= 20 ? 'l3' : d.n >= 8 ? 'l2' : d.n > 0 ? 'l1' : '', title: `${d.day}: ${d.n} answers` })));
    const groups = [['Grammar', 'g-'], ['Practice', 'u-'], ['Vocabulary and placement', null]];
    const entries = Object.entries(st.stats).filter(([, s]) => s.t > 0);
    const byGroup = (pre) => entries.filter(([k]) => pre ? k.startsWith(pre) : !k.startsWith('g-') && !k.startsWith('u-'));
    const tbl = groups.map(([name, pre]) => {
      const list = byGroup(pre);
      return list.length ? cardBlock(name, list.map(([k, s]) => { const a = s.c / s.t; return h('div', { class: 'trow' }, link(topicHref(k), topicLabels[k] || k), bar(a, barCls(a)), h('span', {}, pct(a) + '%')); })) : null;
    });
    const file = h('input', { type: 'file', accept: 'application/json', style: 'display:none', 'aria-label': 'Choose a backup file' });
    file.addEventListener('change', async () => {
      try { Store.mergeData(await file.files[0].text()); alert('Backup merged into your progress.'); progress(); }
      catch (e) { alert('Could not read that file: ' + e.message); }
    });
    const dueN = dueIds().length, freshN = Math.max(0, Math.min(NEW_PER_DAY - Store.newTodayCount(), newIds().length)), mistN = Store.mistakes().length;
    const act = (t, d, href, cta) => h('div', { class: 'pathrow' }, h('div', {}, h('strong', {}, t), h('div', { class: 'muted' }, d)), link(href, cta, 'btn small' + ' ghost'));
    view(h('h1', {}, 'Review'),
      h('p', { class: 'lead' }, 'Go back over what you have studied: cards that are due, questions you got wrong, and how you are doing overall.'),
      h('section', {}, h('h2', {}, 'Do now'),
        act('Flashcards', `${dueN} due · ${freshN} new today`, '#/review', 'Review'),
        act('My mistakes', mistN ? `${mistN} to learn, each with its explanation` : 'Nothing saved. Wrong answers will appear here.', '#/mistakes', 'Open'),
        act('Mixed review', 'A few questions from grammar, vocabulary and rewriting', '#/course/mix', 'Start'),
        act('Placement test', Store.state.placement ? `Last result: ${Store.state.placement.summary}` : '24 questions, B1 to C1', '#/placement', Store.state.placement ? 'Retake' : 'Start')),
      h('h2', {}, 'Progress'),
      h('div', { class: 'stats' },
        h('div', { class: 'stat' }, h('b', {}, Store.streak()), h('span', {}, 'day streak')),
        h('div', { class: 'stat' }, h('b', {}, Store.totalAnswered()), h('span', {}, 'answers so far')),
        h('div', { class: 'stat' }, h('b', {}, Object.keys(st.cards).length), h('span', {}, 'vocabulary items started')),
        h('div', { class: 'stat' }, h('b', {}, Object.keys(st.scores).length), h('span', {}, 'practice sets completed'))),
      cardBlock('Daily goal', h('p', { class: 'muted' }, 'How many questions or cards do you want to answer each day? Reaching it fills the bar on the home page.'),
        h('div', { class: 'row' }, [10, 20, 40, 60].map((n) => h('button', { class: 'btn small' + (Store.goal() === n ? '' : ' ghost'), onclick: () => { Store.setGoal(n); progress(); } }, n + ' answers')))),
      App.rewards ? App.rewards.shelf() : null,
      cardBlock('Last 12 weeks', heat, h('p', { class: 'muted' }, 'Darker = more answers that day. Answer at least one question to keep your streak.')),
      ...tbl, !entries.length ? h('p', { class: 'muted' }, 'Nothing here yet. Do a lesson or a practice set and your results will appear.') : null,
      App.aiCard ? App.aiCard() : null,
      App.syncCard ? App.syncCard() : null,
      cardBlock('Your data', h('p', { class: 'muted' }, 'Everything is stored in this browser only. Export a backup before clearing browser data or switching device.'),
        h('div', { class: 'row' },
          h('button', { class: 'btn small', onclick: () => {
            const a = h('a', { href: URL.createObjectURL(new Blob([Store.exportData()], { type: 'application/json' })), download: `c1-path-backup-${Store.today()}.json` });
            document.body.append(a); a.click(); a.remove();
          } }, 'Export backup'),
          h('button', { class: 'btn small ghost', onclick: () => file.click() }, 'Import and merge backup'), file,
          h('button', { class: 'btn small ghost', onclick: () => { if (confirm('Erase all progress in this browser?')) { Store.reset(); progress(); } } }, 'Reset progress'))));
  }

  /* ---------- placement ---------- */
  function placement() {
    const items = C1.placement.map((p) => Object.assign({ type: 'mcq' }, p));
    const prev = Store.state.placement;
    const box = h('div');
    box.append(h('h1', {}, 'Placement test'),
      h('p', { class: 'lead' }, `${items.length} questions from B1 up to C1. Do not guess wildly: a wrong answer with an explanation teaches you more than a lucky one. It takes about 15–20 minutes.`),
      prev ? h('div', { class: 'callout' }, `Last result (${prev.date}): ${prev.summary}`) : null,
      quiz(items, {
        source: { topic: 'placement', label: 'Placement test', href: '#/placement' },
        onRetry: placement,
        onScore(c, t, res) {
          Store.record('placement', c, t);
          const lv = { B1: [0, 0], B2: [0, 0], C1: [0, 0] };
          const missed = new Set();
          res.forEach((r, i) => { const l = C1.placement[i].level; lv[l][1]++; if (r.ok) lv[l][0]++; else missed.add(C1.placement[i].topic); });
          const p = (l) => (lv[l][1] ? lv[l][0] / lv[l][1] : 0);
          let summary, plan;
          if (p('B1') < 0.7) { summary = 'Foundations first (around B1).'; plan = 'Start with the grammar lessons in order and use the vocabulary cards daily. Skip the Use of English sets for a couple of weeks.'; }
          else if (p('B2') < 0.65) { summary = 'Solid B1, building towards B2.'; plan = 'Work through the grammar lessons in order, then start the Use of English multiple-choice cloze and open cloze sets.'; }
          else if (p('C1') < 0.55) { summary = 'B2 level, C1 is within reach.'; plan = 'Focus on the lessons you missed below, then do Use of English sets every day.'; }
          else { summary = 'Working at C1 level on these questions.'; plan = 'Go straight to the practice sets and key word transformations. Use lessons as reference for weak spots.'; }
          Store.setPlacement({ date: Store.today(), summary });
          const out = h('div', { class: 'card' }, h('h2', { style: 'margin-top:0' }, summary),
            h('p', {}, `B1: ${lv.B1[0]}/${lv.B1[1]} · B2: ${lv.B2[0]}/${lv.B2[1]} · C1: ${lv.C1[0]}/${lv.C1[1]}`), h('p', {}, plan));
          const links = [...missed].map((id) => grammar.find((x) => x.id === id)).filter(Boolean);
          if (links.length) out.append(h('p', {}, 'Lessons to look at first:'), h('ul', {}, links.map((g) => h('li', {}, link('#/grammar/' + g.id, g.title)))));
          box.append(out);
        }
      }));
    view(box);
  }

  /* ---------- grammar ---------- */
  function grammarList() {
    view(back('#/toolkit', 'Library'), h('h1', {}, 'Grammar'),
      h('p', { class: 'lead' }, 'Each lesson begins with the reason the structure exists. Once you see the reason, the rules stop being arbitrary. Lessons are grouped by theme; work top to bottom or jump to what you need.'),
      ...GRAMMAR_CATS.map((cat) => {
        const list = grammar.filter((g) => g.category === cat.name);
        if (!list.length) return null;
        const done = list.filter((g) => Store.state.lessons[g.id]).length;
        return h('div', {}, sectionHead(cat.name, cat.blurb, h('span', { class: 'muted' }, `${done}/${list.length} read`)),
          h('div', { class: 'grid' }, list.map((g) =>
            h('a', { class: 'card', href: '#/grammar/' + g.id },
              h('div', {}, h('span', { class: 'tag' + (Store.state.lessons[g.id] ? ' ok' : '') }, Store.state.lessons[g.id] ? 'Read' : g.level), accTag('g-' + g.id)),
              h('h3', { style: 'margin:.5em 0 .2em' }, g.title), h('p', { class: 'muted', style: 'margin:0' }, g.tagline)))));
      }));
  }

  function lesson(id) {
    const g = grammar.find((x) => x.id === id);
    if (!g) return notFound();
    const box = h('div');
    const jump = (target) => (e) => { e.preventDefault(); document.getElementById(target).scrollIntoView({ behavior: 'smooth' }); };
    const toc = [['The big idea', 'idea']].concat(g.parts.map((p, i) => [p.h, 'part' + i]));
    if (g.traps) toc.push(['Common traps', 'traps']);
    if (g.exam) toc.push(['In the exams', 'exam']);
    toc.push(['Practice', 'practice']);
    box.append(unitBack() || back('#/grammar', 'All grammar'), partOf('grammar', id),
      h('div', {}, h('span', { class: 'tag' }, g.category || 'Grammar'), h('span', { class: 'tag' }, g.level), Store.state.lessons[id] ? h('span', { class: 'tag ok' }, 'Read')
        : h('button', { class: 'btn small ghost', onclick: (e) => { Store.markLesson(id); e.target.replaceWith(h('span', { class: 'tag ok' }, 'Read')); } }, 'Mark as read')),
      h('h1', {}, g.title), h('p', { class: 'lead' }, g.tagline),
      h('div', { class: 'toc' }, toc.map(([t, target]) => h('a', { href: '#', onclick: jump(target) }, t))),
      h('div', { class: 'callout', id: 'idea' }, h('strong', {}, 'The big idea'), h('div', { html: g.idea })));
    g.parts.forEach((p, i) => box.append(h('h2', { id: 'part' + i }, p.h), h('div', { html: p.body })));
    if (g.traps) box.append(h('h2', { id: 'traps' }, 'Common traps'), h('div', { class: 'callout warn', html: g.traps }));
    if (g.exam) box.append(h('h2', { id: 'exam' }, 'Where it shows up in the exams'), h('div', { html: g.exam }));
    box.append(h('h2', { id: 'practice' }, 'Practice'), h('p', { class: 'muted' }, 'Answer first, then read the explanation for every item, including the ones you got right.'),
      quiz(g.quiz, { source: { topic: 'g-' + id, label: g.title, href: '#/grammar/' + id }, onRetry: () => lesson(id), onScore: (c, t) => { Store.record('g-' + id, c, t); Store.markLesson(id); } }));
    const i = grammar.indexOf(g), pv = grammar[i - 1], nx = grammar[i + 1];
    box.append(unitFooter('grammar', id) || h('div', { class: 'pager' }, pv ? link('#/grammar/' + pv.id, '← ' + pv.title, 'btn ghost small') : h('span'), nx ? link('#/grammar/' + nx.id, nx.title + ' →', 'btn ghost small') : h('span')));
    view(box);
  }

  /* ---------- vocabulary ---------- */
  function cardView(c, showGroup) {
    return h('div', { class: 'vcard' },
      h('div', {}, h('span', { class: 'hl' }, c.phrase), ' ', h('span', { class: 'tag' }, c.kind), showGroup ? h('span', { class: 'muted' }, ' ' + c.groupTitle) : null),
      h('div', {}, c.meaning),
      h('div', { class: 'eg', html: c.ex.replace(/\[\[(.+?)\]\]/g, '<em>$1</em>') }),
      c.logic ? h('div', { class: 'muted' }, '' + c.logic) : null,
      h('button', {
        class: 'btn small ghost', style: 'margin-top:6px', onclick: (e) => {
          Store.addNote({ title: c.phrase, text: `${c.meaning}\n${c.ex.replace(/\[\[|\]\]/g, '')}${c.logic ? '\n' + c.logic : ''}`, tag: 'Vocabulary', href: '#/vocab/' + (c.group || '') });
          e.target.textContent = 'Saved ✓'; e.target.disabled = true;
        }
      }, '＋ Note'));
  }

  function vocab() {
    const due = dueIds().length, fresh = Math.max(0, Math.min(NEW_PER_DAY - Store.newTodayCount(), newIds().length));
    const results = h('div');
    const search = h('input', { type: 'text', class: 'wide', placeholder: 'Search all ' + allCards.length + ' items (phrase or meaning)…', 'aria-label': 'Search vocabulary' });
    search.addEventListener('input', () => {
      const q = search.value.trim().toLowerCase();
      results.replaceChildren();
      if (q.length < 2) return;
      const hits = allCards.filter((c) => (c.phrase + ' ' + c.meaning + ' ' + c.ex).toLowerCase().includes(q)).slice(0, 30);
      results.append(h('div', { class: 'card' }, hits.length ? hits.map((c) => cardView(c, true)) : h('p', { class: 'muted' }, 'No matches.')));
    });
    const sections = VOCAB_SECTIONS.map((sec) => {
      const list = C1.vocab.filter((g) => g.section === sec.name);
      if (!list.length) return null;
      const n = list.reduce((a, g) => a + g.cards.length, 0);
      return h('div', {}, sectionHead(sec.name, sec.blurb, h('span', { class: 'muted' }, n + ' items')),
        h('div', { class: 'grid' }, list.map((g) =>
          h('a', { class: 'card', href: '#/vocab/' + g.id },
            h('span', { class: 'tag' + (cardsSeen(g.id) === g.cards.length ? ' ok' : '') }, `${cardsSeen(g.id)}/${g.cards.length} started`),
            h('h3', { style: 'margin:.5em 0 .2em' }, g.title), h('p', { class: 'muted', style: 'margin:0' }, g.short)))));
    });
    view(back('#/toolkit', 'Library'), h('h1', {}, 'Vocabulary'),
      h('p', { class: 'lead' }, 'Phrasal verbs, collocations, idioms and topic language, grouped by the idea that connects them. Learn the idea and dozens of items become guessable.'),
      h('div', { class: 'card' }, h('h3', { style: 'margin-top:0' }, 'Daily practice'),
        h('p', {}, `${due} due · ${fresh} new available today · ${allCards.length} items in total`),
        h('div', { class: 'row' }, link('#/review', 'Start review', 'btn'), link('#/vquiz', 'Mixed quiz', 'btn ghost'), accTag('v-cards'))),
      search, results, ...sections);
  }

  function vocabGroup(id) {
    const g = C1.vocab.find((x) => x.id === id);
    if (!g) return notFound();
    const i = C1.vocab.indexOf(g), pv = C1.vocab[i - 1], nx = C1.vocab[i + 1];
    const uf = unitFooter('vocab', id);
    view(unitBack() || back('#/vocab', 'Vocabulary'), partOf('vocab', id), h('div', {}, h('span', { class: 'tag' }, g.section || 'Vocabulary')), h('h1', {}, g.title),
      h('div', { class: 'callout' }, h('strong', {}, 'The idea'), h('div', { html: g.idea })),
      h('div', { class: 'row' }, link('#/review/' + g.id + uq(), 'Study with flashcards', 'btn'), link('#/vquiz/' + g.id + uq(), 'Quick quiz', 'btn ghost')),
      h('div', { class: 'card' }, g.cards.map((c) => cardView(Object.assign({ groupTitle: g.title }, c)))),
      uf || h('div', { class: 'pager' }, pv ? link('#/vocab/' + pv.id, '← ' + pv.title, 'btn ghost small') : h('span'), nx ? link('#/vocab/' + nx.id, nx.title + ' →', 'btn ghost small') : h('span')));
  }

  function vocabQuiz(group) {
    const pool = group ? allCards.filter((c) => c.group === group) : allCards;
    const items = sample(pool, group ? 8 : 12).map(vocabItem);
    const g = group && C1.vocab.find((x) => x.id === group);
    const home = g ? '#/vocab/' + g.id + uq() : '#/vocab';
    view(back(home, g ? g.title : 'Vocabulary'), h('h1', {}, g ? g.title + ': quiz' : 'Mixed vocabulary quiz'),
      h('p', { class: 'muted' }, 'Choose the expression that fits the gap and the meaning shown in grey.'),
      quiz(items, { source: { topic: 'v-quiz', label: g ? g.title + ' quiz' : 'Vocabulary quiz', href: '#/vquiz' + (group ? '/' + group : '') }, onRetry: () => vocabQuiz(group), onScore: (c, t) => Store.record('v-quiz', c, t) }));
  }

  function review(group) {
    let queue = shuffle(dueIds().filter((id) => !group || cardById[id].group === group))
      .concat(newIds(group).slice(0, group ? 12 : Math.max(0, NEW_PER_DAY - Store.newTodayCount())));
    if (group && !queue.length) queue = shuffle(allCards.filter((c) => c.group === group).map((c) => c.id)).slice(0, 10);
    const total = queue.length;
    let reviewed = 0;
    const onKey = (e) => {
      if (e.target.matches('input,textarea,select') || e.ctrlKey || e.metaKey) return;
      const rev = box.querySelector('[data-act=reveal]');
      if (rev && (e.key === ' ' || e.key === 'Enter')) { e.preventDefault(); rev.click(); return; }
      if (/^[1-4]$/.test(e.key)) box.querySelector(`[data-rate="${+e.key - 1}"]`)?.click();
    };
    document.addEventListener('keydown', onKey);
    App.cleanup.push(() => document.removeEventListener('keydown', onKey));
    const box = h('div');
    const gBack = group ? '#/vocab/' + group + uq() : '#/vocab';
    view(unitBack() || back(gBack, group ? 'Back to the group' : 'Vocabulary'), h('h1', {}, 'Review'), box);

    function next() {
      box.replaceChildren();
      if (!queue.length) {
        box.append(h('div', { class: 'card' }, h('h2', { style: 'margin-top:0' }, total ? 'Session complete' : 'Nothing due right now'),
          h('p', {}, total ? `You reviewed ${reviewed} card${reviewed === 1 ? '' : 's'}. Cards come back when they are due.` : 'Come back tomorrow, or open a group and study it ahead.'),
          link(unitCtx ? '#/course/' + unitCtx : gBack, unitCtx ? 'Back to the unit' : 'Back', 'btn')));
        return;
      }
      const id = queue[0], c = cardById[id];
      box.append(h('p', { class: 'muted' }, `${queue.length} left · ${c.groupTitle}`));
      const front = h('div', { class: 'card flash' },
        h('div', { class: 'muted' }, 'Which expression fits?'),
        h('div', { class: 'big' }, c.meaning),
        h('div', { class: 'eg', html: c.ex.replace(/\[\[(.+?)\]\]/g, '<span class="blank"></span>') }),
        h('div', {}, h('button', { class: 'btn', 'data-act': 'reveal', onclick: reveal }, 'Show answer'), h('span', { class: 'muted', style: 'margin-left:10px' }, 'Space reveals · 1–4 rates')));
      box.append(front);

      function reveal() {
        front.replaceChildren(
          h('div', { class: 'big hl' }, c.phrase), h('div', {}, c.meaning),
          h('div', { class: 'eg', html: c.ex.replace(/\[\[(.+?)\]\]/g, '<em>$1</em>') }),
          c.logic ? h('div', { class: 'callout' }, '' + c.logic) : null,
          h('div', { class: 'rate' }, [['Again', 0], ['Hard', 1], ['Good', 2], ['Easy', 3]].map(([label, r]) =>
            h('button', { class: 'btn', 'data-rate': r, onclick: () => rateIt(r) }, label, h('small', {}, Store.intervalLabel(id, r))))));
      }
      function rateIt(r) {
        Store.rate(id, r);
        Store.record('v-cards', r >= 2 ? 1 : 0, 1);
        queue.shift();
        if (r === 0) queue.splice(Math.min(3, queue.length), 0, id); else reviewed++;
        next();
      }
    }
    next();
  }

  /* ---------- practice (Use of English and Reading) ---------- */
  function practiceList() {
    view(back('#/toolkit', 'Library'), h('h1', {}, 'Practice'),
      h('p', { class: 'lead' }, 'Exam-style tasks with a strategy for each. Read the strategy first: every task tests one specific skill. Your best score on each set is remembered.'),
      ...PRACTICE_SECTIONS.map((sec) => {
        const list = sec.ids.map((id) => C1.practice.find((p) => p.id === id)).filter(Boolean);
        if (!list.length) return null;
        return h('div', {}, sectionHead(sec.name, sec.blurb),
          h('div', { class: 'grid' }, list.map((p) =>
            h('a', { class: 'card', href: '#/practice/' + p.id },
              h('span', { class: 'tag' + (setsDone(p) === p.sets.length ? ' ok' : '') }, `${setsDone(p)}/${p.sets.length} sets done`), accTag('u-' + p.id),
              h('h3', { style: 'margin:.5em 0 .2em' }, p.title), h('p', { class: 'muted', style: 'margin:0' }, p.short)))));
      }));
  }

  function practiceType(id, setIdx) {
    const p = C1.practice.find((x) => x.id === id);
    if (!p) return notFound();
    if (setIdx == null) {
      view(back('#/practice', 'Practice'), h('h1', {}, p.title), h('p', { class: 'muted' }, p.exam),
        h('div', { class: 'callout' }, h('strong', {}, 'Strategy'), h('div', { html: p.strategy })),
        sectionHead('Sets', `${setsDone(p)} of ${p.sets.length} completed`),
        h('div', { class: 'grid' }, p.sets.map((s, i) =>
          h('a', { class: 'card', href: `#/practice/${id}/${i}` }, h('div', {}, scoreChip(setKey(id, i)) || h('span', { class: 'chip' }, 'new')),
            h('h3', { style: 'margin:.4em 0 .2em' }, s.title), h('p', { class: 'muted', style: 'margin:0' }, s.note || '')))));
      return;
    }
    const s = p.sets[setIdx];
    if (!s) return notFound();
    const uf = unitFooter('practice', id, setIdx);
    view(unitBack() || back('#/practice/' + id, p.title), partOf('practice', id, setIdx), h('h1', {}, s.title), h('p', { class: 'muted' }, p.instruction),
      quiz(s.items, { source: { topic: 'u-' + id, label: p.title + ' · ' + s.title, href: `#/practice/${id}/${setIdx}` }, onRetry: () => practiceType(id, setIdx), onScore: (c, t) => { Store.record('u-' + id, c, t); Store.setScore(setKey(id, setIdx), c, t); } }),
      uf || h('div', { class: 'pager' },
        setIdx > 0 ? link(`#/practice/${id}/${setIdx - 1}`, '← Previous set', 'btn ghost small') : h('span'),
        setIdx + 1 < p.sets.length ? link(`#/practice/${id}/${setIdx + 1}`, 'Next set →', 'btn ghost small') : link('#/practice', 'All practice', 'btn ghost small')));
  }

  /* ---------- course: study by theme ---------- */
  function courseList() {
    const nc = nextCourseStep();
    view(h('h1', {}, 'Course'),
      h('p', { class: 'lead' }, 'Study by theme. Each unit combines vocabulary, grammar and exam practice around one topic and ends with a mixed review, so you revise a little of everything as you go.'),
      nc ? cardBlock(null, h('div', { class: 'pathrow' },
        h('div', {}, h('strong', {}, 'Continue: ' + nc.u.title), h('div', { class: 'muted' }, `Step ${nc.i + 1} of ${nc.total} · ${nc.info.kind.toLowerCase()} · ${nc.info.label}`)),
        link(nc.info.href, 'Continue', 'btn small'))) : null,
      cardBlock(null, h('div', { class: 'pathrow' },
        h('div', {}, h('strong', {}, 'Mixed review'), h('div', { class: 'muted' }, 'Eleven questions from across the whole course: grammar, vocabulary and rewriting.')),
        link('#/course/mix', 'Start', 'btn small ghost'))),
      h('div', { class: 'grid', style: 'margin-top:14px' }, C1.course.map((u, n) => {
        const t = unitSteps(u).length, d = unitDone(u);
        return h('a', { class: 'card', href: '#/course/' + u.id },
          h('div', {}, h('span', { class: 'tag' + (d === t ? ' ok' : '') }, d === t ? 'Complete' : 'Unit ' + (n + 1)), h('span', { class: 'tag' }, u.level)),
          h('h3', { style: 'margin:.5em 0 .2em' }, u.title), h('p', { class: 'muted', style: 'margin:0 0 8px' }, u.goals[0]),
          bar(d / t), h('div', { class: 'muted', style: 'font-size:.85rem;margin-top:4px' }, `${d} of ${t} steps`));
      })));
  }

  function unitPage(id) {
    const u = unitById(id);
    if (!u) return notFound();
    const infos = unitSteps(u), done = infos.filter((x) => x.done).length, n = C1.course.indexOf(u);
    const open = infos.findIndex((x) => !x.done);
    view(back('#/course', 'Course'), h('div', {}, h('span', { class: 'tag' }, 'Unit ' + (n + 1)), h('span', { class: 'tag' }, u.level)),
      h('h1', {}, u.title), h('p', { class: 'lead' }, u.intro),
      h('div', { class: 'callout' }, h('strong', {}, 'By the end you can'), h('ul', {}, u.goals.map((g) => h('li', {}, g)))),
      cardBlock(null, h('div', { class: 'row', style: 'justify-content:space-between;margin-bottom:8px' }, h('strong', {}, `${done} of ${infos.length} steps`),
        open >= 0 ? link(infos[open].href, done ? 'Continue' : 'Start unit', 'btn small') : h('span', { class: 'tag ok' }, 'Unit complete')), bar(done / infos.length)),
      h('ol', { class: 'steps' }, infos.map((x, i) => h('li', { class: 'step' + (x.done ? ' done' : '') },
        h('span', { class: 'dot' }, x.done ? '✓' : String(i + 1)),
        h('a', { href: x.href }, h('strong', {}, x.label), x.sub ? h('div', { class: 'muted' }, x.sub) : null),
        h('span', { class: 'chip' }, icon(x.kind), x.kind)))));
  }

  function unitReview(id) {
    const u = unitById(id);
    if (!u) return notFound();
    const lessons = u.steps.filter((s) => s.t === 'grammar').map((s) => s.id);
    const groups = u.steps.filter((s) => s.t === 'vocab').map((s) => s.id);
    const sets = u.steps.filter((s) => s.t === 'practice').map((s) => C1.practice.find((p) => p.id === s.id).sets[s.set]);
    const kw = kwtPool(sets);
    const kwAll = kwtPool(C1.practice.filter((p) => p.id === 'kwt').flatMap((p) => p.sets));
    const items = grammarItems(lessons, 2).concat(sample(allCards.filter((c) => groups.includes(c.group)), 6).map(vocabItem), sample(kw.length >= 3 ? kw : kwAll, 3));
    view(back('#/course/' + u.id, u.title), h('h1', {}, u.title + ': review'),
      h('p', { class: 'muted' }, 'A mix of questions from the lessons, vocabulary and practice in this unit. Finishing it completes the unit.'),
      quiz(items, { source: { topic: 'unit-review', label: u.title + ' review', href: '#/course/' + u.id + '/review' }, onRetry: () => unitReview(id), onScore: (c, t) => { Store.record('unit-review', c, t); Store.setScore('unit:' + u.id, c, t); } }));
  }

  function dailyMix() {
    const read = grammar.filter((g) => Store.state.lessons[g.id]);
    const gi = sample(read.length >= 3 ? read : grammar, 4).flatMap((g) => sample(g.quiz, 1));
    const started = allCards.filter((c) => Store.card(c.id));
    const vi = sample(started.length >= 8 ? started : allCards, 4).map(vocabItem);
    const kwAll = kwtPool(C1.practice.filter((p) => p.id === 'kwt').flatMap((p) => p.sets));
    view(back('#/course', 'Course'), h('h1', {}, 'Mixed review'),
      h('p', { class: 'muted' }, 'Eleven questions: grammar, vocabulary and rewriting. It draws on the lessons you have read and the cards you have started when possible.'),
      quiz(gi.concat(vi, sample(kwAll, 3)), { source: { topic: 'mix', label: 'Mixed review', href: '#/course/mix' }, onRetry: dailyMix, onScore: (c, t) => Store.record('mix', c, t) }));
  }

  /* ---------- toolkit: study one area of language ---------- */
  function toolkit() {
    const gRead = grammar.filter((x) => Store.state.lessons[x.id]).length;
    const seen = allCards.filter((c) => Store.card(c.id)).length;
    const pDone = practiceTypes.reduce((a, p) => a + setsDone(p), 0), pTot = practiceTypes.reduce((a, p) => a + p.sets.length, 0);
    const sk = App.skillStats ? App.skillStats() : { l: [0, 0], s: [0, 0], w: [0, 0] };
    const tile = (href, title, desc, stat, ic) => h('a', { class: 'card', href }, h('h3', { style: 'margin:0 0 .2em' }, ic ? icon(ic) : null, title), h('p', { class: 'muted', style: 'margin:0 0 8px' }, desc), h('span', { class: 'tag' }, stat));
    const results = h('div');
    const search = h('input', { type: 'search', class: 'wide', placeholder: 'Search lessons, vocabulary and course units…', 'aria-label': 'Search the Library' });
    search.addEventListener('input', () => {
      const q = search.value.trim().toLowerCase();
      results.replaceChildren();
      if (q.length < 2) return;
      const has = (...t) => t.join(' ').toLowerCase().includes(q);
      const hits = []
        .concat(grammar.filter((g) => has(g.title, g.tagline, g.category, g.idea, g.parts.map((p) => p.h + ' ' + p.body).join(' '))).map((g) => ['Grammar', g.title, g.tagline, '#/grammar/' + g.id]))
        .concat(C1.course.filter((u) => has(u.title, u.intro)).map((u) => ['Course', u.title, u.intro.slice(0, 90) + '…', '#/course/' + u.id]))
        .concat(C1.vocab.filter((g) => has(g.title, g.short)).map((g) => ['Vocabulary group', g.title, g.short, '#/vocab/' + g.id]))
        .concat(allCards.filter((c) => has(c.phrase, c.meaning)).slice(0, 15).map((c) => ['Vocabulary', c.phrase, c.meaning, '#/vocab/' + c.group]));
      results.append(h('div', { class: 'card' }, hits.length ? hits.slice(0, 25).map(([kind, t, d, href]) => h('div', { class: 'pathrow' }, h('div', {}, h('span', { class: 'tag' }, kind), h('strong', {}, t), h('div', { class: 'muted' }, d)), link(href, 'Open', 'btn small ghost'))) : h('p', { class: 'muted' }, 'No matches.')));
    });
    view(h('h1', {}, 'Library'),
      search, results,
      h('p', { class: 'lead' }, 'Everything on the site, by area, to study in any order. The ', link('#/course', 'Course'), ' uses these same pieces in a fixed sequence; come here when you know what you need.'),
      sectionHead('Language', 'Understand how English works.'),
      h('div', { class: 'grid' },
        tile('#/grammar', 'Grammar', `${grammar.length} lessons in four themes, each explaining why the structure exists.`, `${gRead}/${grammar.length} read`, 'grammar'),
        tile('#/vocab', 'Vocabulary', 'Phrasal verbs, collocations, idioms and topic language, with flashcards and quizzes.', `${seen}/${allCards.length} started`, 'vocab')),
      sectionHead('Exam papers', 'Practise each paper of the exam.'),
      h('div', { class: 'grid' },
        tile('#/practice', 'Use of English and Reading', 'Exam-style tasks with a strategy for each type.', `${pDone}/${pTot} sets done`, 'practice'),
        tile('#/skills/listening', 'Listening', 'Recordings read aloud by your browser, with exam-style questions, plus dictation.', `${sk.l[0]}/${sk.l[1]} done`, 'listening'),
        tile('#/skills/speaking', 'Speaking', 'Parts 1 to 4 with prompts, a timer, a recorder and a self-assessment.', `${sk.s[0]}/${sk.s[1]} sets done`, 'speaking'),
        tile('#/skills/writing', 'Writing', 'Exam-style tasks with a word count, text analysis and model answers.', `${sk.w[0]}/${sk.w[1]} tasks done`, 'writing')),
      App.limitsNote ? App.limitsNote() : null,
      sectionHead('Reference and tools'),
      h('div', { class: 'row' }, link('#/mock', 'Full tests', 'btn'), link('#/tricks', 'Tricks', 'btn ghost'), link('#/generate', 'Generate with AI', 'btn ghost'), link('#/exams', 'The exams explained', 'btn ghost'), link('#/placement', 'Placement test', 'btn ghost'), link('#/vquiz', 'Vocabulary quiz', 'btn ghost'), link('#/review', 'Flashcards', 'btn ghost')));
  }

  /* ---------- full tests: hub and guided papers ---------- */
  const pickFresh = (list, isDone, n) => {
    const fresh = shuffle(list.filter((x) => !isDone(x))), rest = shuffle(list.filter(isDone));
    return fresh.concat(rest).slice(0, n);
  };
  function guidedPaper(title, lead, minutes, steps, note) {
    view(back('#/mock', 'Full tests'), h('h1', {}, title), h('p', { class: 'lead' }, lead),
      App.timer ? App.timer(minutes * 60, `Suggested time: ${minutes} minutes`) : null,
      h('div', { class: 'steps' }, steps.map((st, i) => h('div', { class: 'step' + (st.done ? ' done' : '') },
        h('span', { class: 'dot' }, i + 1),
        h('div', {}, h('strong', {}, st.label), st.sub ? h('div', { class: 'muted' }, st.sub) : null),
        link(st.href, st.done ? 'Again' : 'Open', 'btn small ghost')))),
      note ? h('div', { class: 'callout' }, note) : null,
      h('p', { class: 'muted' }, 'Start the timer, open each task in order, and come back here for the next one. Sets you have not done yet are chosen first; press the link below for a new selection.'),
      h('a', { class: 'btn ghost small', href: location.hash, onclick: (e) => { e.preventDefault(); route(); } }, 'New selection'));
  }
  function mockListening() {
    const L = C1.listening || [];
    const sets = pickFresh(L, (x) => !!Store.score('listen:' + x.id), 4);
    guidedPaper('Full test: Listening', 'Four recordings, like the four parts of the exam paper. Listen once if you can, as in the exam; the audio plays through your browser, so use the play button once per recording.', 40,
      sets.map((x, i) => ({ label: `Part ${i + 1}: ${x.title}`, sub: x.format, href: '#/skills/listening/' + x.id, done: !!Store.score('listen:' + x.id) })),
      'Answer all the questions of one recording, then check. The real paper has four parts and about 40 minutes; here every set has its own questions and explanations.');
  }
  function mockWriting() {
    const W = (C1.writing || {}).tasks || [];
    const isDone = (x) => !!(Store.skill('writing:' + x.id) || {}).done;
    const essay = pickFresh(W.filter((x) => x.genre === 'essay'), isDone, 1)[0];
    const other = pickFresh(W.filter((x) => x.genre !== 'essay'), isDone, 1)[0];
    const row = (x, label) => x && ({ label: `${label}: ${x.title}`, sub: `${x.genre[0].toUpperCase() + x.genre.slice(1)} · ${x.min}–${x.max} words`, href: '#/skills/writing/' + x.id, done: isDone(x) });
    guidedPaper('Full test: Writing', 'Two tasks in 90 minutes, as in the exam: Part 1 is always an essay, Part 2 is a different text type. Plan for about five minutes, write, and keep five minutes to check.', 90,
      [row(essay, 'Part 1 (essay)'), row(other, 'Part 2')].filter(Boolean),
      'Writing cannot be marked automatically. After each task use the analyser, compare with the model, and assess yourself against the four criteria.');
  }
  function mockSpeaking() {
    const S = (C1.speaking || {}).sets || [];
    const set = pickFresh(S, (x) => !!(Store.skill('speaking:' + x.id) || {}).done, 1)[0];
    guidedPaper('Full test: Speaking', 'The real test lasts about 15 minutes with a partner and two examiners. Practise with a friend if you can; alone, record yourself and listen back.', 15,
      set ? [{ label: `All four parts: ${set.title}`, sub: 'Parts 1 to 4 with timer and recorder', href: '#/skills/speaking/' + set.id, done: !!(Store.skill('speaking:' + set.id) || {}).done }] : [],
      'Speak aloud, in full sentences, and do not stop to correct yourself. Review the recording afterwards.');
  }
  function mockHub() {
    const card = (href, title, desc, tag, ic) => h('a', { class: 'card', href }, h('span', { class: 'tag' }, tag), h('h3', { style: 'margin:.4em 0 .2em' }, icon(ic), title), h('p', { class: 'muted', style: 'margin:0' }, desc));
    view(back('#/toolkit', 'Library'), h('h1', {}, 'Full tests'),
      h('p', { class: 'lead' }, 'Practise a whole exam paper under time pressure instead of one task at a time. Each test picks material you have not done yet.'),
      h('div', { class: 'grid' },
        card('#/mock/reading', 'Reading and Use of English', 'Parts 1 to 5 and 7 on one page, scored by part.', '60 min', 'practice'),
        card('#/mock/listening', 'Listening', 'Four recordings in a row with their questions.', '40 min', 'listening'),
        card('#/mock/writing', 'Writing', 'An essay and a second text type.', '90 min', 'writing'),
        card('#/certacles', 'CertAcles-style paper', 'The four components in a typical university order, with approximate times.', 'Guide', 'review'),
        card('#/mock/speaking', 'Speaking', 'One full set: interview, long turn, discussion.', '15 min', 'speaking')),
      h('div', { class: 'callout' }, 'These tests train timing and stamina. They give no official mark. For a realistic check, do a full paper from a past-paper book too.'));
  }
  const mockRoute = (b) => (b === 'reading' ? mockTest() : b === 'listening' ? mockListening() : b === 'writing' ? mockWriting() : b === 'speaking' ? mockSpeaking() : mockHub());

  /* ---------- full test: Reading and Use of English ---------- */
  const MOCK_PARTS = [
    ['mcq', 'Part 1', 'Multiple-choice cloze'], ['cloze', 'Part 2', 'Open cloze'], ['wf', 'Part 3', 'Word formation'],
    ['kwt', 'Part 4', 'Key word transformation'], ['reading', 'Part 5', 'Multiple-choice reading'], ['gapped', 'Part 7', 'Gapped text']
  ];
  function mockTest() {
    const picks = MOCK_PARTS.map(([id]) => {
      const p = C1.practice.find((x) => x.id === id);
      const fresh = p.sets.map((_, i) => i).filter((i) => !Store.score(setKey(id, i)));
      const pool = fresh.length ? fresh : p.sets.map((_, i) => i);
      return { p, i: pool[Math.floor(Math.random() * pool.length)] };
    });
    const results = {};
    const summary = h('div', { class: 'card', style: 'display:none' });
    const sections = MOCK_PARTS.map(([id, part, name], k) => {
      const { p, i } = picks[k], set = p.sets[i];
      return h('section', {}, h('h2', {}, `${part} · ${name}`), h('p', { class: 'muted' }, p.instruction),
        quiz(set.items, {
          source: { topic: 'u-' + id, label: 'Full test · ' + p.title + ' · ' + set.title, href: `#/practice/${id}/${i}` },
          onRetry: mockTest,
          onScore: (c, t) => {
            Store.record('u-' + id, c, t); Store.setScore(setKey(id, i), c, t);
            results[id] = [c, t];
            if (Object.keys(results).length === MOCK_PARTS.length) {
              const C = Object.values(results).reduce((a, r) => a + r[0], 0), T = Object.values(results).reduce((a, r) => a + r[1], 0);
              summary.style.display = '';
              summary.replaceChildren(h('h2', { style: 'margin-top:0' }, `Full test: ${C} / ${T} (${pct(C / T)}%)`),
                MOCK_PARTS.map(([pid, pt, pn]) => h('div', { class: 'trow' }, h('span', {}, `${pt} · ${pn}`), bar(results[pid][0] / results[pid][1], barCls(results[pid][0] / results[pid][1])), h('span', {}, `${results[pid][0]}/${results[pid][1]}`))),
                h('p', { class: 'muted' }, 'Start with the part that has the lowest bar. Every wrong answer is saved in your mistakes with its explanation.'),
                h('div', { class: 'row' }, h('button', { class: 'btn', onclick: mockTest }, 'Take another test'), link('#/mistakes', 'Review mistakes', 'btn ghost')));
              summary.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
          }
        }));
    });
    view(back('#/mock', 'Full tests'), h('h1', {}, 'Full test: Reading and Use of English'),
      h('p', { class: 'lead' }, 'One task of each kind in the order of the exam paper: Parts 1 to 5 and 7. It takes about an hour. Work without looking anything up, check each part at the end of the part, and read every explanation afterwards.'),
      App.timer ? App.timer(3600, 'Suggested time: 60 minutes') : null,
      h('div', { class: 'callout' }, 'The real paper has eight parts and 90 minutes (Part 6 is a cross-text task not practised here). Sets you have not done yet are chosen first.'),
      ...sections, summary);
  }

  /* ---------- welcome: short introduction, shown on the first visit ---------- */
  function welcome(step) {
    const steps = [
      {
        title: 'Welcome to C1 Path',
        body: () => [
          h('p', { class: 'lead' }, 'A free place to prepare for the C1 level of English, for Cambridge C1 Advanced, Linguaskill and CertAcles.'),
          h('p', {}, 'It is made for learners who already speak English at around B1 or B2 and want to reach C1. You do not need an account, and you can study in short sessions: 15 to 20 minutes a day is enough to make steady progress.'),
          h('div', { class: 'callout' }, h('strong', {}, 'What C1 means. '), 'At C1 you can follow long and demanding texts, express yourself fluently without searching for words, and write clear, well-organised texts on complex subjects.')
        ]
      },
      {
        title: 'How you learn here',
        body: () => [
          h('p', { class: 'lead' }, 'The idea is simple: understand first, then practise, then review.'),
          h('div', { class: 'grid' },
            h('div', { class: 'card' }, h('span', { class: 'tag' }, '1 · Understand'), h('p', {}, 'Every topic starts with the reason behind the language, so a rule stops being something to memorise. Every exercise comes with an explanation of why the answer is right.')),
            h('div', { class: 'card' }, h('span', { class: 'tag' }, '2 · Practise'), h('p', {}, 'Vocabulary, grammar, exam tasks, Listening, Speaking and Writing, always in the format of the real exam.')),
            h('div', { class: 'card' }, h('span', { class: 'tag' }, '3 · Review'), h('p', {}, 'Flashcards come back just before you would forget them, and every mistake is saved with its explanation until you get it right twice.'))),
          h('p', { class: 'muted' }, 'No website can give an official mark. Here you get practice, explanations and honest self-assessment tools.')
        ]
      },
      {
        title: 'Finding your way around',
        body: () => [
          h('div', { class: 'steps' },
            [['Home', 'Your next best step and a quick look at your progress.', '#/'],
              ['Course', 'Ten themed units in a fixed order. The easiest way to follow a plan.', '#/course'],
              ['Library', 'All the material by area, to study anything in any order. Includes full practice tests.', '#/toolkit'],
              ['Review', 'Flashcards due, your saved mistakes, progress and sync between devices.', '#/progress'],
              ['Notes', 'A notebook that opens from any page (button at the top, or Alt+N).', null]].map(([t, d, href], i) =>
              h('div', { class: 'step' }, h('span', { class: 'dot' }, i + 1), h('div', {}, h('strong', {}, t), h('div', { class: 'muted' }, d)), href ? link(href, 'Look', 'btn small ghost') : h('span')))),
          h('p', { class: 'muted' }, 'Your progress is saved in this browser. Sign in at the top if you want it safe and synced across devices.')
        ]
      },
      {
        title: 'Choose where to start',
        body: () => [
          h('p', { class: 'lead' }, 'Not sure? Take the placement test: it shows where to start. You can always change your mind later.'),
          h('div', { class: 'grid' },
            h('a', { class: 'card', href: '#/placement', onclick: () => Store.setWelcomed() }, h('span', { class: 'tag' }, 'Recommended'), h('h3', { style: 'margin:.4em 0 .2em' }, 'Take the placement test'), h('p', { class: 'muted', style: 'margin:0' }, '24 questions from B1 to C1, about 15 to 20 minutes, with an explanation for every answer.')),
            h('a', { class: 'card', href: '#/course/' + C1.course[0].id, onclick: () => Store.setWelcomed() }, h('span', { class: 'tag' }, 'Guided'), h('h3', { style: 'margin:.4em 0 .2em' }, 'Start the Course'), h('p', { class: 'muted', style: 'margin:0' }, 'Begin with the first unit and follow the steps in order.')),
            h('a', { class: 'card', href: '#/toolkit', onclick: () => Store.setWelcomed() }, h('span', { class: 'tag' }, 'Free choice'), h('h3', { style: 'margin:.4em 0 .2em' }, 'Explore the Library'), h('p', { class: 'muted', style: 'margin:0' }, 'Look around and pick what you need.'))),
          h('h2', {}, 'A routine that works'),
          h('p', {}, 'Ten minutes of flashcards, one grammar lesson or practice set, and one skill (a listening, a speaking set or a writing task) a few times a week. Consistency matters more than long sessions.')
        ]
      }
    ];
    const i = Math.max(0, Math.min(steps.length - 1, +step || 0));
    const s = steps[i];
    const last = i === steps.length - 1;
    view(h('p', { class: 'eyebrow' }, `Introduction · ${i + 1} of ${steps.length}`),
      h('h1', {}, s.title),
      ...s.body(),
      h('div', { class: 'pager' },
        i > 0 ? link('#/welcome/' + (i - 1), '← Back', 'btn ghost small') : link('#/', 'Skip the introduction', 'btn ghost small'),
        last ? link('#/', 'Go to Home', 'btn ghost small') : link('#/welcome/' + (i + 1), 'Next →', 'btn')));
    if (last || i === 0) Store.setWelcomed();
  }

  /* ---------- privacy ---------- */
  function privacy() {
    const cloud = window.Cloud && Cloud.enabled;
    view(h('h1', {}, 'Privacy'),
      h('p', { class: 'lead' }, 'C1 Path is a free study tool. It has no advertising, no analytics and no tracking cookies. This page says what is stored, where, and how to delete it.'),
      h('h2', {}, 'Without an account'),
      h('p', {}, 'Your progress, notes, drafts and settings are stored only in your browser (localStorage) on this device. Nobody else receives them. Clearing your browser data erases them, so use the backup button in ', link('#/progress', 'Review'), ' if you want a copy.'),
      cloud ? h('div', {}, h('h2', {}, 'With an account'),
        h('p', {}, 'If you sign in (with Google or an email link), the site stores your email address and a copy of your progress and notes on a Supabase database, only so that your progress can sync between your devices. Signing in with Google gives the site your email address; it does not receive your Google password, contacts or other Google data.'),
        h('ul', {},
          h('li', {}, 'Each account can read and change only its own data (row-level security).'),
          h('li', {}, 'Your data is kept until you delete your account.'),
          h('li', {}, 'To delete your account and all cloud data at any time: open the account menu at the top right and choose "Delete my account". Copies on your own devices stay.'),
          h('li', {}, 'To get a copy of your data: use "Export backup" in Review.'),
          h('li', {}, 'The sign-in session token is kept in your browser\'s localStorage.')),
        h('p', {}, 'Supabase and, if you choose Google sign-in, Google act as service providers under their own privacy policies.')) : null,
      h('h2', {}, 'Optional AI feedback'),
      h('p', {}, 'If you add your own API key (Google Gemini, Groq or Anthropic) and ask for feedback, the text you choose to submit is sent to that provider to produce the feedback. The key stays in your browser. Free plans of some providers may use submitted text to improve their models, so do not include personal details. Without a key, nothing is sent.'),
      h('h2', {}, 'Speech and recording'),
      h('p', {}, 'Voice recordings in Speaking practice stay in your browser. Automatic transcription uses your browser\'s own speech recognition, which in some browsers sends audio to the browser vendor\'s service; check your browser\'s privacy settings if that matters to you.'),
      h('h2', {}, 'Questions or requests'),
      h('p', {}, 'Open an issue at ', h('a', { href: 'https://github.com/AnniDin/c1-path/issues', target: '_blank', rel: 'noopener' }, 'github.com/AnniDin/c1-path/issues'), '. C1 Path is an independent project, not affiliated with Cambridge, Linguaskill or ACLES.'));
  }

  /* ---------- exams ---------- */
  function exams() {
    const E = C1.exams;
    view(back('#/toolkit', 'Library'), h('h1', {}, 'The exams'), h('p', { class: 'lead', html: E.intro }),
      h('div', { class: 'callout warn', html: E.caution }),
      ...E.exams.map((ex) => h('div', {},
        h('h2', {}, ex.name), h('p', { html: ex.summary }),
        h('div', { class: 'tablewrap' }, h('table', {}, h('thead', {}, h('tr', {}, ex.cols.map((c) => h('th', {}, c)))),
          h('tbody', {}, ex.rows.map((r) => h('tr', {}, r.map((c) => h('td', { html: c }))))))),
        ex.notes ? h('div', { class: 'callout', html: ex.notes }) : null)),
      h('h2', {}, 'Which one should you take?'), h('div', { html: E.choose }),
      h('h2', {}, 'How this site maps to the exams'), h('div', { html: E.mapping }));
  }

  function notFound() { view(h('h1', {}, 'Not found'), link('#/', 'Back to home', 'btn')); }

  /* ---------- router ---------- */
  function route() {
    App.cleanup.splice(0).forEach((f) => f());
    Engine.Speech.stop();
    const todo = Store.mistakes().length + dueIds().length, badge = document.getElementById('mbadge');
    if (badge) badge.textContent = todo ? String(todo) : '';
    const [pathPart, query] = location.hash.replace(/^#\/?/, '').split('?');
    unitCtx = new URLSearchParams(query || '').get('u');
    if (unitCtx && !unitById(unitCtx)) unitCtx = null;
    const parts = pathPart.split('/').filter(Boolean).map(decodeURIComponent);
    const [a, b, c] = parts;
    const inLibrary = ['tricks', 'generate', 'certacles', 'grammar', 'vocab', 'practice', 'vquiz', 'skills', 'exams', 'toolkit', 'mock'].includes(a);
    const inReview = ['review', 'mistakes', 'progress', 'placement'].includes(a);
    const navKey = !a ? 'home' : unitCtx && a !== 'course' ? 'course' : inLibrary ? 'toolkit' : inReview ? 'progress' : a;
    document.querySelectorAll('#nav a').forEach((el) => el.classList.toggle('active', el.dataset.r === navKey));
    if (!a && !Store.state.welcomed && !Store.totalAnswered()) { location.replace('#/welcome'); return; }
    if (a === 'welcome') return welcome(b);
    if (!a) return home();
    if (a === 'course') return b === 'mix' ? dailyMix() : c === 'review' ? unitReview(b) : b ? unitPage(b) : courseList();
    if (a === 'toolkit') return toolkit();
    if (App.routes[a]) return App.routes[a](b, c, query);
    if (a === 'placement') return placement();
    if (a === 'progress') return progress();
    if (a === 'grammar') return b ? lesson(b) : grammarList();
    if (a === 'vocab') return b ? vocabGroup(b) : vocab();
    if (a === 'vquiz') return vocabQuiz(b);
    if (a === 'review') return review(b);
    if (a === 'practice') return b ? practiceType(b, c == null ? null : +c) : practiceList();
    if (a === 'exams') return exams();
    if (a === 'mock') return mockRoute(b);
    if (a === 'privacy') return privacy();
    notFound();
  }
  window.addEventListener('hashchange', route);

  const skip = document.querySelector('.skip');
  if (skip) skip.addEventListener('click', (e) => { e.preventDefault(); app.focus(); });

  /* ---------- theme ---------- */
  const root = document.documentElement;
  if (Store.state.theme) root.dataset.theme = Store.state.theme;
  document.getElementById('theme').addEventListener('click', () => {
    const dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = dark ? 'light' : 'dark';
    Store.setTheme(root.dataset.theme);
  });

  window.App = Object.assign(window.App, {
    unitsDone: () => C1.course.filter((u) => unitDone(u) === unitSteps(u).length).length, unitCount: () => C1.course.length,
    icon, view, back, link, bar, cardBlock, sectionHead, notFound, sample, shuffle, vocabItem, allCards, grammar, topicLabels,
    unitBack, unitFooter, uq, partOf, setKey, scoreChip, start: route, route
  });
  Object.defineProperty(window.App, 'unitCtx', { get: () => unitCtx });
})();
