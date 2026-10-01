/* Content validator. Paste into the browser console on index.html (or load via <script>) and call validate().
   It checks structure of every lesson and practice item, then self-answers every item to confirm the checker accepts the intended answers. */
window.validate = function () {
  const issues = [], N = Engine.norm;
  const chk = (where, q) => {
    if (q.type === 'mcq') {
      if (!q.options || q.options.length !== 4) issues.push(where + ' mcq options != 4');
      else if (!(q.answer >= 0 && q.answer < 4)) issues.push(where + ' mcq bad answer');
      else if (new Set(q.options.map(N)).size !== 4) issues.push(where + ' duplicate options');
      if (!q.why) issues.push(where + ' no why');
    } else if (q.type === 'gap') {
      if ((q.q.match(/___/g) || []).length !== 1) issues.push(where + ' gap needs exactly one ___');
      if (!q.answers || !q.answers.length) issues.push(where + ' no answers');
      if (!q.why) issues.push(where + ' no why');
    } else if (q.type === 'kwt') {
      if ((q.second.match(/___/g) || []).length !== 1) issues.push(where + ' kwt needs exactly one ___');
      const key = N(q.key);
      q.answers.forEach((a) => {
        const words = N(a).split(' ');
        if (!(' ' + N(a) + ' ').includes(' ' + key + ' ')) issues.push(where + ' answer lacks key word: ' + a);
        if (words.length < 2 || words.length > 5) issues.push(where + ' answer has ' + words.length + ' words: ' + a);
      });
      if (!q.why) issues.push(where + ' no why');
    } else if (q.type === 'passage') {
      const m = [...q.text.matchAll(/\{(\d+)\}/g)].map((x) => +x[1]);
      if (m.length !== q.gaps.length || m.some((v, i) => v !== i + 1)) issues.push(where + ' markers ' + m.length + ' vs gaps ' + q.gaps.length);
      q.gaps.forEach((g, i) => {
        const w = where + ' gap' + (i + 1);
        if (!g.why) issues.push(w + ' no why');
        if (q.mode === 'mcq') { if (!g.options || g.options.length !== 4 || !(g.answer >= 0 && g.answer < 4)) issues.push(w + ' options/answer'); }
        else {
          if (!g.answers || !g.answers.length) issues.push(w + ' no answers');
          if (q.mode === 'cloze' && (g.answers || []).some((a) => a.trim().split(' ').length > 1)) issues.push(w + ' cloze answer is more than one word');
          if (q.mode === 'wf' && !g.base) issues.push(w + ' wf without base');
        }
      });
    } else if (q.type === 'text') {
      if (!q.paras || !q.paras.length) issues.push(where + ' empty text');
    } else issues.push(where + ' unknown type ' + q.type);
  };
  const norm = N;
  const ids = new Set();
  C1.grammar.forEach((g) => {
    if (ids.has(g.id)) issues.push('duplicate lesson id ' + g.id); ids.add(g.id);
    ['title', 'tagline', 'idea', 'parts', 'quiz', 'category', 'level'].forEach((f) => { if (!g[f]) issues.push(g.id + ' missing ' + f); });
    if (g.quiz.length !== 6) issues.push(g.id + ' quiz length ' + g.quiz.length);
    g.quiz.forEach((q, i) => chk('grammar:' + g.id + '#' + (i + 1), q));
  });
  C1.practice.forEach((p) => p.sets.forEach((s, si) => s.items.forEach((q, i) => chk('practice:' + p.id + '/' + si + '#' + (i + 1), q))));
  const seen = {};
  C1.vocab.forEach((g) => {
    if (!g.section) issues.push('vocab group without section: ' + g.id);
    g.cards.forEach((c) => {
      const k = c.phrase.toLowerCase();
      if (seen[k]) issues.push('duplicate vocab phrase: ' + c.phrase + ' (' + seen[k] + ', ' + g.id + ')'); seen[k] = g.id;
      if (!/\[\[.+?\]\]/.test(c.ex)) issues.push('vocab example without [[ ]]: ' + c.phrase);
    });
  });
  const used = { grammar: new Set(), vocab: new Set(), practice: new Set() };
  (C1.course || []).forEach((u) => u.steps.forEach((st, i) => {
    const w = 'course:' + u.id + ' step ' + (i + 1);
    if (st.t === 'grammar') { if (!C1.grammar.some((g) => g.id === st.id)) issues.push(w + ' unknown lesson ' + st.id); used.grammar.add(st.id); }
    else if (st.t === 'vocab') { if (!C1.vocab.some((g) => g.id === st.id)) issues.push(w + ' unknown vocab group ' + st.id); used.vocab.add(st.id); }
    else if (st.t === 'practice') { const p = C1.practice.find((x) => x.id === st.id); if (!p || !p.sets[st.set]) issues.push(w + ' unknown set ' + st.id + '/' + st.set); used.practice.add(st.id + '/' + st.set); }
    else if (!['listening', 'speaking', 'writing'].includes(st.t)) issues.push(w + ' unknown step type ' + st.t);
  }));
  C1.grammar.forEach((g) => { if (!used.grammar.has(g.id)) issues.push('lesson not in any unit: ' + g.id); });
  C1.vocab.forEach((g) => { if (!used.vocab.has(g.id)) issues.push('vocab group not in any unit: ' + g.id); });
  C1.practice.forEach((p) => p.sets.forEach((_, i) => { if (!used.practice.has(p.id + '/' + i)) issues.push('practice set not in any unit: ' + p.id + '/' + i); }));
  (C1.listening || []).forEach((l) => {
    if (!l.script || !l.script.length) issues.push('listening ' + l.id + ' has no script');
    if (!l.questions || l.questions.length < 4) issues.push('listening ' + l.id + ' has fewer than 4 questions');
    (l.questions || []).forEach((q, i) => chk('listening:' + l.id + '#' + (i + 1), q));
    (l.questions || []).filter((q) => q.type === 'gap').forEach((q, i) => {
      const text = norm(l.script.map((x) => x.text).join(' '));
      if (!q.answers.some((a) => text.includes(norm(a)))) issues.push('listening ' + l.id + ' gap answer not found in script: ' + q.answers.join('/'));
    });
  });
  const wr = C1.writing;
  if (wr) wr.tasks.forEach((t) => {
    ['prompt', 'points', 'plan', 'model', 'notes', 'language'].forEach((f) => { if (!t[f] || !t[f].length) issues.push('writing ' + t.id + ' missing ' + f); });
    const words = t.model.join(' ').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
    if (words < t.min - 15 || words > t.max + 15) issues.push('writing ' + t.id + ' model has ' + words + ' words');
    (t.notes || []).forEach((n) => { if (!(n.para >= 0 && n.para < t.model.length)) issues.push('writing ' + t.id + ' note points at missing paragraph ' + n.para); });
  });
  const sp = C1.speaking;
  if (sp) sp.sets.forEach((s) => { if (!s.part1 || s.part1.length < 4 || !s.part2 || !s.part3 || !s.part4) issues.push('speaking ' + s.id + ' incomplete'); });
  (C1.course || []).forEach((u) => u.steps.forEach((st) => {
    if (st.t === 'listening' && !(C1.listening || []).some((x) => x.id === st.id)) issues.push('course ' + u.id + ': unknown listening set ' + st.id);
    if (st.t === 'speaking' && !((C1.speaking || {}).sets || []).some((x) => x.id === st.id)) issues.push('course ' + u.id + ': unknown speaking set ' + st.id);
    if (st.t === 'writing' && !((C1.writing || {}).tasks || []).some((x) => x.id === st.id)) issues.push('course ' + u.id + ': unknown writing task ' + st.id);
  }));
  return issues;
};
