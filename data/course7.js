window.C1 = window.C1 || {};
/* Unit 20: six more listenings (talk, panel, interview, friends, guided tour, interview with research). Loaded after data/course6.js, listening6.js and listening7.js. */
(function () {
  const L = (id) => ({ t: 'listening', id });
  C1.course.push({
    id: 'listening-lab', title: 'Listening lab: ten more recordings', level: 'C1',
    intro: 'Ten recorded listenings in the styles of the exam, from a radio talk to a four-person work meeting, the last four being deliberately demanding: a radio talk with a myth to correct, a three-way panel where people change their minds, an interview about a failure, two friends disagreeing, a guided tour with corrections, and a research interview with reservations. Listen once, answer, then read the script and see how each distractor was built.',
    goals: ['Follow facts and figures and spot the corrected myth', 'Track who changes position in a discussion', 'Hear regret, irony and hedging in an interview', 'Catch corrections of dates and times'],
    steps: ['radio-foxes', 'panel-remote-study', 'interview-founder', 'friends-documentary', 'museum-tour', 'radio-teen-sleep', 'meeting-budget-cuts', 'interview-architect', 'debate-urban-farming', 'lecture-memory-myths'].map(L)
  });
})();
