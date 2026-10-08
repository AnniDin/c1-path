window.C1 = window.C1 || {};
/* Unit 21: six more writing tasks, each with an annotated model. Loaded after data/course7.js, writing4.js and writing5.js. */
(function () {
  const W = (id) => ({ t: 'writing', id });
  C1.course.push({
    id: 'writing-workshop', title: 'Writing workshop: ten more tasks', level: 'C1',
    intro: 'Ten tasks that climb from a concrete letter to abstract essays: Part 1 essays, a complaint email, letters, reports and a review. For each one: plan, write under time, analyse your text, compare it with the annotated model, and (with an optional free key) get AI feedback on the four exam criteria. Rewrite once and check again to see the scores move.',
    goals: ['Write a balanced essay that covers two given points and adds your own', 'Match register to the reader in an email, a report and a review', 'Use the annotated models to borrow structures, not sentences', 'Improve a text by rewriting it after feedback'],
    steps: ['letter-council-noise', 'essay-media-attention', 'essay-transport-cities', 'email-complaint-course', 'report-library-services', 'review-podcast', 'report-student-wellbeing', 'essay-science-funding', 'essay-heritage-tourism', 'essay-ai-work'].map(W)
  });
})();
