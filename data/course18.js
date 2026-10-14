window.C1 = window.C1 || {};
/* Places the five Part 5-8 sets of data/practice14.js in units whose topic fits. Loaded after the other course files. */
(function () {
  const unit = (id) => C1.course.find((u) => u.id === id);
  const place = (unitId, id, set) => {
    const u = unit(unitId);
    if (!u) return;
    let at = -1;
    u.steps.forEach((s, i) => { if (s.t === 'practice') at = i; });
    u.steps.splice(at + 1, 0, { t: 'practice', id, set });
  };
  const n = (id) => C1._p14[id];
  [['nature', 'reading', n('reading')], ['travel', 'reading', n('reading') + 1],
   ['health', 'cross', n('cross')], ['technology', 'gapped', n('gapped')], ['culture', 'matching', n('matching')]].forEach(([u, id, set]) => place(u, id, set));
})();
