window.C1 = window.C1 || {};
/* Places the six writing tasks of data/writing8.js in units whose topic fits. Loaded after data/course13.js. */
(function () {
  [['society-work', 'essay-sleep-work'], ['consumer-arts', 'essay-sustainable-fashion'], ['family', 'email-remote-friendship'],
   ['society-work', 'report-open-plan-office'], ['education', 'proposal-public-library'], ['culture', 'review-novel-small-rooms']].forEach(([uid, id]) => {
    const u = C1.course.find((x) => x.id === uid);
    if (u) u.steps.push({ t: 'writing', id });
  });
})();
