window.C1 = window.C1 || {};
/* Adds the Part 6 (cross-text) and Part 8 (multiple matching) sets to units that already have reading practice. Loaded after data/course3.js. */
(function () {
  const place = (unitIdx, id, set) => {
    const u = C1.course[unitIdx];
    if (!u) return;
    let at = -1;
    u.steps.forEach((s, i) => { if (s.t === 'practice') at = i; });
    u.steps.splice(at + 1, 0, { t: 'practice', id, set });
  };
  [[2, 0], [4, 1], [6, 2], [8, 3], [10, 4], [1, 5], [5, 6], [9, 7]].forEach(([u, i]) => place(u, 'cross', i));
  [[3, 0], [5, 1], [7, 2], [9, 3], [11, 4], [0, 5], [4, 6], [12, 7]].forEach(([u, i]) => place(u, 'matching', i));
})();
