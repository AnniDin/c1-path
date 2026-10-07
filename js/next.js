/* C1 Path – difficulty ladder and "What to do next": after every quiz the learner gets two or three concrete next steps,
   chosen from the score, the exam part, the difficulty of the sets (C1.levels) and what is still undone. */
(function () {
  const { h } = Engine;
  const A = window.App;
  const { link } = A;
  const LV = () => window.C1.levels || {};
  const LABEL = ['', 'Warm-up', 'Easier', 'Medium', 'Harder', 'Hardest'];

  /* ---------- difficulty: practice sets run from easier to harder (progress is stored by set number, so only the display order changes) ---------- */
  const setLevel = (type, i) => (((LV().practice || {})[type] || [])[i]) || 3;
  const setOrder = (type) => { const p = C1.practice.find((x) => x.id === type); return p ? p.sets.map((_, i) => i).sort((a, b) => setLevel(type, a) - setLevel(type, b) || a - b) : []; };
  const levelChip = (n) => h('span', { class: 'chip lv lv' + n, title: `Estimated difficulty ${n} of 5` }, LABEL[n] || 'Medium');
  /* listening sets, writing tasks and speaking sets: rated by id; lists show them from easier to harder */
  const itemLevel = (kind, id) => ((LV()[kind] || {})[id]) || 3;
  A.ranked = (kind, list) => list.map((x, i) => [x, i]).sort((a, b) => itemLevel(kind, a[0].id) - itemLevel(kind, b[0].id) || a[1] - b[1]).map((x) => x[0]);
  A.itemChip = (kind, id) => levelChip(itemLevel(kind, id));
  A.setLevel = setLevel; A.setOrder = setOrder; A.levelChip = levelChip;

  const done = (type, i) => !!Store.score(type + '/' + i);
  /* the neighbour of set i on the difficulty ladder, preferring a set not done yet */
  function stepSet(type, i, dir) {
    const ord = setOrder(type), pos = ord.indexOf(i);
    if (pos < 0) return null;
    const rest = dir > 0 ? ord.slice(pos + 1) : ord.slice(0, pos).reverse();
    const strict = (x) => (dir > 0 ? setLevel(type, x) > setLevel(type, i) : setLevel(type, x) < setLevel(type, i));
    const j = rest.find((x) => !done(type, x) && strict(x));
    if (j == null) { const k = rest.find((x) => !done(type, x)); if (k != null) return { j: k, again: false }; }
    return j != null ? { j, again: false } : rest.length ? { j: rest[0], again: true } : null;
  }
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

  function build(source, pct, res) {
    const recs = [], seen = new Set();
    const R = (title, sub, href) => { if (href && !seen.has(href)) { seen.add(href); recs.push({ title, sub, href }); } };
    const wrong = res.filter((x) => !x.ok).length, href = source.href || '', topic = source.topic || '';
    const strong = pct >= 85, fair = pct >= 60, mistakes = Store.mistakes().length;
    const mistakeRec = () => mistakes && R(`Practise your ${mistakes} saved mistake${mistakes === 1 ? '' : 's'}`, 'Answer them correctly in two sessions and they leave your list.', '#/mistakes/practice');
    let m;

    if ((m = href.match(/^#\/practice\/([a-z]+)\/(\d+)/))) {
      const type = m[1], i = +m[2], p = C1.practice.find((x) => x.id === type);
      if (p) {
        const unitNext = A.nextInUnit('practice', type, i), up = stepSet(type, i, 1), down = stepSet(type, i, -1);
        if (strong) {
          if (unitNext) R('Continue your unit: ' + unitNext.label, `You scored ${pct}%: this part is solid, so move on.`, unitNext.href);
          if (up) R(`${up.again ? 'Repeat a harder set' : 'Try a harder set'}: ${p.sets[up.j].title}`, `${pct}% is strong. Difficulty ${setLevel(type, up.j)} of 5 next (this one was ${setLevel(type, i)}).`, `#/practice/${type}/${up.j}`);
          else { const lp = leastPracticed(type); R('You have reached the hardest set of ' + p.title, 'Broaden your practice instead.', '#/practice'); lp && R('Practise ' + lp.title, `You have done ${lp.d} of ${lp.n} sets of that exam part.`, '#/practice/' + lp.id); }
          const lp2 = leastPracticed(type); lp2 && lp2.d < lp2.n && R('Practise ' + lp2.title, `Your least practised exam part: ${lp2.d} of ${lp2.n} sets done.`, '#/practice/' + lp2.id);
        } else if (fair) {
          mistakeRec();
          const sl = sameLevel(type, i);
          sl != null && R('Another set at this level: ' + p.sets[sl].title, `${pct}%: you are close. One more set of the same difficulty will show whether it is a pattern or bad luck.`, `#/practice/${type}/${sl}`);
          R('Re-read the strategy for ' + p.title, 'Two minutes on the method often fixes the gaps you lost.', '#/practice/' + type);
        } else {
          if (down) R(`${down.again ? 'Repeat an easier set' : 'Step down to an easier set'}: ${p.sets[down.j].title}`, `${pct}% means this level is too hard right now. Difficulty ${setLevel(type, down.j)} of 5 first, then come back.`, `#/practice/${type}/${down.j}`);
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

    /* always useful: cards due, weak spots, the exam date, the next course step */
    const due = A.dueIds().length;
    if (recs.length < 3 && due) R(`Review ${due} flashcard${due === 1 ? '' : 's'} due today`, 'Short spaced reviews fix vocabulary.', '#/review');
    const weak = A.weakTopics ? A.weakTopics() : [];
    if (recs.length < 3 && weak.length && !strong) R('Train your weak spots', weak.map(([k]) => A.topicLabels[k] || k).join(', '), '#/weak');
    const ex = Store.state.exam && Store.state.exam.date;
    if (recs.length < 3 && ex) { const n = Math.round((new Date(ex + 'T00:00:00') - new Date(Store.today() + 'T00:00:00')) / 864e5); if (n >= 0 && n <= 21) R('Do a full timed test', `${n} day${n === 1 ? '' : 's'} to your exam: practise stamina and timing.`, '#/mock'); }
    const nc = A.nextCourseStep && A.nextCourseStep();
    if (recs.length < 3 && nc) R('Continue the course: ' + nc.info.label, 'The next step on your path.', nc.info.href);
    return recs;
  }

  A.recommend = (source, pct, res) => {
    try {
      const recs = build(source || {}, pct, res || []).slice(0, 3);
      if (!recs.length) return null;
      return h('div', { class: 'next' }, h('h3', {}, 'What to do next'),
        recs.map((r, i) => h('div', { class: 'nextrow' }, h('div', {}, h('strong', {}, r.title), h('div', { class: 'muted' }, r.sub)), link(r.href, i ? 'Open' : 'Go', 'btn small' + (i ? ' ghost' : '')))));
    } catch (e) { return null; }
  };
  A.recommendFor = build; // used by the tests
})();
