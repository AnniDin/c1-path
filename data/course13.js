window.C1 = window.C1 || {};
/* Places the six speaking sets of data/speaking5.js in units whose topic fits. Loaded after data/course11.js. */
(function () {
  [['cities', 'speak-housing'], ['society-work', 'speak-volunteering'], ['education', 'speak-science'],
   ['society', 'speak-news'], ['consumer-arts', 'speak-public-art'], ['lifestyle-language', 'speak-commuting']].forEach(([unitId, id]) => {
    const u = C1.course.find((x) => x.id === unitId);
    if (!u) return;
    let at = -1;
    u.steps.forEach((s, i) => { if (s.t === 'speaking') at = i; });
    u.steps.splice(at + 1, 0, { t: 'speaking', id });
  });
})();
