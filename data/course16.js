window.C1 = window.C1 || {};
/* Adds the four newest demanding recordings to the listening lab. Loaded after data/course15.js. */
(function () {
  const lab = C1.course.find((u) => u.id === 'listening-lab');
  if (!lab) return;
  ['tutorial-library-essay', 'council-evening-buses', 'podcast-processed-food', 'debate-recording-meetings'].forEach((id) => lab.steps.push({ t: 'listening', id }));
  lab.title = lab.title.replace('fourteen more', 'eighteen more');
  lab.intro = lab.intro.replace(/^Fourteen recorded listenings/, 'Eighteen recorded listenings');
})();
