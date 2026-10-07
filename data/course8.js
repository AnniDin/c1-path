window.C1 = window.C1 || {};
/* Unit 21: six more writing tasks, each with an annotated model. Loaded after data/course7.js, writing4.js and writing5.js. */
(function () {
  const W = (id) => ({ t: 'writing', id });
  C1.course.push({
    id: 'writing-workshop', title: 'Writing workshop: six more tasks', level: 'C1',
    intro: 'Two Part 1 essays on everyday debates, a Part 1-style essay on research funding, a complaint email, a report and a review. For each one: plan, write under time, analyse your text, compare it with the annotated model, and (with an optional free key) get AI feedback on the four exam criteria. Rewrite once and check again to see the scores move.',
    goals: ['Write a balanced essay that covers two given points and adds your own', 'Match register to the reader in an email, a report and a review', 'Use the annotated models to borrow structures, not sentences', 'Improve a text by rewriting it after feedback'],
    steps: ['essay-media-attention', 'essay-transport-cities', 'essay-science-funding', 'email-complaint-course', 'report-library-services', 'review-podcast'].map(W)
  });
})();
