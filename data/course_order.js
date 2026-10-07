window.C1 = window.C1 || {};
/* Course order and levels. Loaded after every course file. The course goes from B2 to C1: everyday English and word-building come early,
   the skills labs close the course. tools/validate.js checks that levels never go down along this order. Progress is stored by unit id, so reordering is safe. */
(function () {
  const ORDER = ['work', 'technology', 'everyday-places', 'everyday-people', 'health', 'word-power', 'nature', 'cities', 'education', 'society', 'culture', 'law-media', 'consumer-arts',
    'travel', 'family', 'sport', 'talk-skills', 'society-work', 'lifestyle-language', 'listening-lab', 'writing-workshop', 'use-of-english-lab'];
  const LEVEL = { work: 'B2', technology: 'B2', 'everyday-places': 'B2–C1', 'everyday-people': 'B2–C1', health: 'B2–C1', 'word-power': 'B2–C1' };
  C1.course.forEach((u) => { u.level = LEVEL[u.id] || 'C1'; });
  C1.course.sort((a, b) => ORDER.indexOf(a.id) - ORDER.indexOf(b.id));
})();
