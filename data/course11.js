window.C1 = window.C1 || {};
/* Places the newest Part 5-8 sets and the four newest recordings in units whose topic fits. Loaded after data/course10.js. */
(function () {
  const unit = (id) => C1.course.find((u) => u.id === id);
  const place = (unitId, id, set) => {
    const u = unit(unitId);
    if (!u) return;
    let at = -1;
    u.steps.forEach((s, i) => { if (s.t === 'practice') at = i; });
    u.steps.splice(at + 1, 0, { t: 'practice', id, set });
  };
  [['education', 'reading', 9], ['cities', 'reading', 10], ['technology', 'reading', 11],
   ['work', 'gapped', 7], ['word-power', 'gapped', 8], ['society-work', 'gapped', 9],
   ['nature', 'cross', 8], ['society', 'cross', 9], ['cities', 'cross', 10],
   ['travel', 'matching', 8], ['nature', 'matching', 9], ['work', 'matching', 10]].forEach(([u, id, set]) => place(u, id, set));
  const lab = unit('listening-lab');
  if (lab) {
    ['phonein-rubbish-weight', 'seminar-printing-press', 'interview-bees-ecologist', 'presentation-desk-sharing'].forEach((id) => lab.steps.push({ t: 'listening', id }));
    lab.title = lab.title.replace('ten more', 'fourteen more');
    lab.intro = lab.intro.replace(/^Ten recorded listenings/, 'Fourteen recorded listenings');
  }
})();
