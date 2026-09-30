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
  return issues;
};
