/* C1 Path – placement test in three sizes: complete (12 per level), short (4 per level) and adaptive (one question at a time, harder after a right answer, easier after a wrong one).
   The pure logic (pick, verdict, adaptive step) is on window.Placement so tools/test.js can check it. */
(function () {
  const LEVELS = ['B1', 'B2', 'C1'];
  const MODES = {
    full: { name: 'Complete', per: 12, blurb: '36 questions, about 25 minutes. The most reliable result.' },
    short: { name: 'Short', per: 4, blurb: '12 questions, about 8 minutes. A quick first idea.' },
    adaptive: { name: 'Adaptive', blurb: 'About 12 questions, one at a time. It gets harder when you are right and easier when you are not.' }
  };
  const MIX = { full: { reading: 2, listening: 1 }, short: { reading: 1, listening: 0 } };
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  /* the placement bank: the grammar/vocabulary items, the reading items (data/placement2.js) and one item per short placement clip (C1.placementListening) */
  const bank = () => (window.C1.placement || []).concat((window.C1.placementListening || []).filter((l) => l.questions && l.questions[0]).map((l) => {
    const q = l.questions[0];
    return { level: l.placementLevel, topic: 'listening', skill: 'listening', audioId: l.id, title: l.title, intro: l.intro, script: l.script, q: q.q, options: q.options, answer: q.answer, why: q.why };
  }));

  /* `per` random questions from each level, easiest level first, of which mix = { reading: n, listening: n } are reading and listening items (if there are enough);
     the rest are grammar and vocabulary. Without a mix: grammar and vocabulary only. */
  const pick = (items, per, mix) => LEVELS.flatMap((l) => {
    const at = items.filter((q) => q.level === l), skills = ['reading', 'listening'].flatMap((k) => shuffle(at.filter((q) => q.skill === k)).slice(0, (mix || {})[k] || 0));
    return shuffle(skills.concat(shuffle(at.filter((q) => !q.skill)).slice(0, per - skills.length)));
  });

  /* the verdict from right/total per level: { B1: [right, total], B2: [...], C1: [...] } */
  function verdict(lv) {
    const p = (l) => (lv[l][1] ? lv[l][0] / lv[l][1] : 0);
    if (p('B1') < 0.7) return { band: 0, summary: 'Foundations first (around B1).', plan: 'Start with the grammar lessons in order and use the vocabulary cards daily. Skip the Use of English sets for a couple of weeks.' };
    if (p('B2') < 0.65) return { band: 1, summary: 'Solid B1, building towards B2.', plan: 'Work through the grammar lessons in order, then start the Use of English multiple-choice cloze and open cloze sets.' };
    if (p('C1') < 0.55) return { band: 2, summary: 'B2 level, C1 is within reach.', plan: 'Focus on the lessons you missed below, then do Use of English sets every day.' };
    return { band: 3, summary: 'Working at C1 level on these questions.', plan: 'Go straight to the practice sets and key word transformations. Use lessons as reference for weak spots.' };
  }

  /* adaptive: the level (0 to 2) of the next question, from the answers so far ([{ level, ok }]) */
  const next = (answers) => {
    if (!answers.length) return 1;
    const last = answers[answers.length - 1], i = LEVELS.indexOf(last.level);
    return Math.max(0, Math.min(2, i + (last.ok ? 1 : -1)));
  };
  /* adaptive result: a question answered at a level counts for that level; a level nobody reached counts as right if a harder one was passed, wrong if an easier one was failed */
  function adaptiveLevels(answers) {
    const lv = { B1: [0, 0], B2: [0, 0], C1: [0, 0] };
    answers.forEach((a) => { lv[a.level][1]++; if (a.ok) lv[a.level][0]++; });
    const passed = (l) => lv[l][1] > 0 && lv[l][0] / lv[l][1] >= 0.6;
    LEVELS.forEach((l, i) => {
      if (lv[l][1]) return;
      if (LEVELS.slice(i + 1).some(passed)) lv[l] = [1, 1];
      else if (LEVELS.slice(0, i).some((k) => lv[k][1] && !passed(k))) lv[l] = [0, 1];
    });
    return lv;
  }
  window.Placement = { LEVELS, MODES, MIX, bank, pick, verdict, next, adaptiveLevels };
  if (!window.App || !window.Engine) return; /* the tests load only the logic above */

  const A = window.App, { h } = Engine;
  const sum = (lv) => lv.B1[0] + lv.B2[0] + lv.C1[0];
  const total = (lv) => lv.B1[1] + lv.B2[1] + lv.C1[1];

  function result(box, items, res, mode, prev) {
    const lv = { B1: [0, 0], B2: [0, 0], C1: [0, 0] }, missed = new Set();
    res.forEach((r, i) => { const l = items[i].level; lv[l][1]++; if (r.ok) lv[l][0]++; else missed.add(items[i].topic); });
    const shown = mode === 'adaptive' ? adaptiveLevels(res.map((r, i) => ({ level: items[i].level, ok: r.ok }))) : lv;
    const v = verdict(shown);
    Store.record('placement', res.filter((r) => r.ok).length, res.length);
    Store.setPlacement({ date: Store.today(), summary: v.summary, lv: shown, mode, band: v.band, missed: [...missed].filter((id) => A.grammar.some((g) => g.id === id)) });
    const out = h('div', { class: 'card' }, h('h2', { style: 'margin-top:0' }, v.summary),
      h('p', {}, mode === 'adaptive'
        ? `${res.filter((r) => r.ok).length} of ${res.length} right. B1: ${lv.B1[0]}/${lv.B1[1]} · B2: ${lv.B2[0]}/${lv.B2[1]} · C1: ${lv.C1[0]}/${lv.C1[1]}`
        : `B1: ${lv.B1[0]}/${lv.B1[1]} · B2: ${lv.B2[0]}/${lv.B2[1]} · C1: ${lv.C1[0]}/${lv.C1[1]}`),
      h('p', {}, v.plan));
    const sk = (k) => { const x = items.map((q, i) => [q, res[i]]).filter(([q]) => q.skill === k); return x.length ? `${x.filter(([, r]) => r.ok).length}/${x.length}` : null; };
    if (sk('reading') || sk('listening')) out.append(h('p', { class: 'muted' }, 'Reading: ' + (sk('reading') || 'not asked') + ' · Listening: ' + (sk('listening') || 'not asked') + '. A few questions only: a hint, not a measurement.'));
    if (prev && prev.lv) out.append(h('p', { class: 'muted' }, `Last time (${prev.date}): ${sum(prev.lv)}/${total(prev.lv)}. Now: ${sum(shown)}/${total(shown)}. The questions come from a bank of ${bank().length}, so they are not always the same.`));
    const links = [...missed].map((id) => A.grammar.find((x) => x.id === id)).filter(Boolean);
    if (links.length) out.append(h('p', {}, 'Lessons to look at first:'), h('ul', {}, links.map((g) => h('li', {}, A.link('#/grammar/' + g.id, g.title)))));
    if (missed.has('vocab')) out.append(h('p', {}, 'You also slipped on set phrases and verb patterns: ', A.link('#/vocab', 'the vocabulary cards'), ' and ', A.link('#/vquiz', 'quizzes'), ' help.'));
    out.append(h('p', {}, h('a', { class: 'btn small', href: v.band === 0 ? '#/grammar' : '#/course' }, v.band === 0 ? 'Start with the grammar lessons' : 'Start the course'), ' ', h('a', { class: 'btn small ghost', href: '#/placement' }, 'Take another version')));
    box.append(out);
  }

  const source = { topic: 'placement', label: 'Placement test', href: '#/placement' };

  /* complete and short: all questions on one page, checked together */
  function fixed(mode) {
    const prev = Store.state.placement, items = pick(bank(), MODES[mode].per, MIX[mode]).map((p) => Object.assign({ type: 'mcq' }, p));
    /* a listening question is preceded by its recording (not numbered, not scored) */
    const shownItems = items.flatMap((p) => [Engine.recording(p), p].filter(Boolean));
    const box = h('div', {}, A.back('#/placement', 'Placement tests'), h('h1', {}, MODES[mode].name + ' placement test'),
      h('p', { class: 'lead' }, `${items.length} questions from B1 up to C1. Do not guess wildly: a wrong answer with an explanation teaches you more than a lucky one.`),
      Engine.quiz(shownItems, { source, onRetry: () => fixed(mode), onScore: (c, t, res) => result(box, items, res, mode, prev) }));
    A.view(box);
  }

  /* adaptive: one question at a time */
  function adaptive() {
    const prev = Store.state.placement, MAX = 12, used = new Set(), answers = [], logged = [], items = [];
    const box = h('div', {}, A.back('#/placement', 'Placement tests'), h('h1', {}, 'Adaptive placement test'));
    const stage = h('div');
    box.append(stage);
    A.view(box);
    function ask() {
      const all = bank(), pool = (lvl) => all.filter((q) => q.level === LEVELS[lvl] && !used.has(q));
      let lvl = next(answers);
      /* if that level has run out, take the nearest one that has not */
      const order = [lvl, lvl - 1, lvl + 1, lvl - 2, lvl + 2].filter((i) => i >= 0 && i <= 2);
      lvl = order.find((i) => pool(i).length);
      const q = shuffle(pool(lvl))[0];
      used.add(q);
      const it = Object.assign({ type: 'mcq' }, q), r = Engine.item(it, answers.length + 1);
      const rec = Engine.recording(q) ? Engine.item(Engine.recording(q)) : null;
      const go = h('button', { class: 'btn', onclick: check }, 'Check');
      stage.replaceChildren(...[h('p', { class: 'muted' }, `Question ${answers.length + 1} of ${MAX}`), rec ? rec.el : null, r.el, h('div', { class: 'row', style: 'margin-top:14px' }, go)].filter(Boolean));
      function check() {
        if (!r.el.querySelector('input:checked')) return;
        const [x] = r.check();
        answers.push({ level: q.level, ok: x.ok }); logged.push(x); items.push(q);
        go.remove();
        const last = answers.length >= MAX;
        stage.append(h('div', { class: 'row', style: 'margin-top:14px' }, h('button', { class: 'btn', onclick: last ? finish : ask }, last ? 'See my result' : 'Next question')));
      }
    }
    function finish() {
      if (window.Store && Store.logResults) Store.logResults(logged, source);
      stage.replaceChildren();
      result(box, items, logged, 'adaptive', prev);
    }
    ask();
  }

  function chooser() {
    const prev = Store.state.placement;
    const card = (mode) => h('a', { class: 'card', href: '#/placement/' + mode }, h('span', { class: 'tag' }, MODES[mode].name), h('p', { class: 'muted', style: 'margin:.5em 0 0' }, MODES[mode].blurb));
    A.view(h('h1', {}, 'Placement test'),
      h('p', { class: 'lead' }, 'Find out where to start. Three versions, one idea: the questions go from B1 up to C1, and every answer has an explanation.'),
      prev ? h('div', { class: 'callout' }, `Last result (${prev.date}): ${prev.summary}`) : '',
      h('div', { class: 'grid' }, card('short'), card('adaptive'), card('full')));
  }

  A.routes.placement = (b) => (b === 'full' || b === 'short' ? fixed(b) : b === 'adaptive' ? adaptive() : chooser());
})();
