window.C1 = window.C1 || {};
/* Places the eight Part 5-8 sets of data/practice13.js in units whose topic fits. Loaded after the other course files. */
(function () {
  const unit = (id) => C1.course.find((u) => u.id === id);
  const place = (unitId, id, set) => {
    const u = unit(unitId);
    if (!u) return;
    let at = -1;
    u.steps.forEach((s, i) => { if (s.t === 'practice') at = i; });
    u.steps.splice(at + 1, 0, { t: 'practice', id, set });
  };
  const n = (id) => C1._p13[id];
  [['society', 'reading', n('reading')], ['culture', 'reading', n('reading') + 1],
   ['nature', 'cross', n('cross')], ['education', 'cross', n('cross') + 1],
   ['cities', 'gapped', n('gapped')], ['health', 'gapped', n('gapped') + 1],
   ['consumer-arts', 'matching', n('matching')], ['nature', 'matching', n('matching') + 1]].forEach(([u, id, set]) => place(u, id, set));
})();
