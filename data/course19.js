window.C1 = window.C1 || {};
/* Places the eight new grammar lessons (data/grammar6.js, grammar7.js) in units whose topic fits, just before each unit's practice. Loaded after the other course files. */
(function () {
  const unit = (id) => C1.course.find((u) => u.id === id);
  const place = (unitId, id) => {
    const u = unit(unitId);
    if (!u || u.steps.some((s) => s.t === 'grammar' && s.id === id)) return;
    let at = -1;
    u.steps.forEach((s, i) => { if (s.t === 'grammar') at = i; });
    u.steps.splice(at + 1, 0, { t: 'grammar', id });
  };
  [['law-media', 'itthere'], ['use-of-english-lab', 'cohesion'], ['education', 'nounclauses'], ['everyday-people', 'questions'],
   ['work', 'obligation'], ['writing-workshop', 'nominalisation'], ['society-work', 'negation'], ['culture', 'fronting']].forEach(([u, id]) => place(u, id));
})();
