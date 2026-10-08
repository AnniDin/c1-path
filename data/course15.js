window.C1 = window.C1 || {};
/* Places the six speaking sets of data/speaking6.js in units whose topic fits. Loaded after data/course13.js. */
(function () {
  [['lifestyle-language', 'speak-sleep-routine'], ['nature', 'speak-weather-climate'], ['family', 'speak-memory-childhood'],
   ['society-work', 'speak-entrepreneurship'], ['cities', 'speak-public-spaces'], ['culture', 'speak-gifts-celebrations']].forEach(([unitId, id]) => {
    const u = C1.course.find((x) => x.id === unitId);
    if (!u) return;
    let at = -1;
    u.steps.forEach((s, i) => { if (s.t === 'speaking') at = i; });
    u.steps.splice(at + 1, 0, { t: 'speaking', id });
  });
})();
