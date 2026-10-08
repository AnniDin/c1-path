window.C1 = window.C1 || {};
/* Unit 23: four more speaking sets. Loaded after data/course9.js and speaking4.js. */
(function () {
  const S = (id) => ({ t: 'speaking', id });
  C1.course.push({
    id: 'speaking-lab', title: 'Speaking lab: four more sets', level: 'C1',
    intro: 'Four complete speaking sets, from concrete everyday questions (money) to abstract ones (friendship and social change). For each: answer Part 1 aloud, record the long turn, run the collaborative task with the timer, and compare your discussion answers with the sample ideas.',
    goals: ['Keep a long turn going for a full minute', 'Weigh options and reach a decision with a partner', 'Move from specific answers to abstract opinions in Part 4'],
    steps: ['speak-money', 'speak-city-nature', 'speak-learning-online', 'speak-friendship'].map(S)
  });
})();
