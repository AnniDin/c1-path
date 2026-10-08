window.C1 = window.C1 || {};
/* Places the six writing tasks of data/writing7.js in units whose topic fits. Loaded after data/course11.js. */
(function () {
  [['cities', 'proposal-repair-cafe'], ['education', 'proposal-language-exchange'], ['culture', 'review-exhibition-rivers'],
   ['consumer-arts', 'review-budget-app'], ['society-work', 'letter-application-youth-trust'], ['sport', 'report-leisure-centre']].forEach(([uid, id]) => {
    const u = C1.course.find((x) => x.id === uid);
    if (u) u.steps.push({ t: 'writing', id });
  });
})();
