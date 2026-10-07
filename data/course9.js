window.C1 = window.C1 || {};
/* Unit 22: fifteen more Use of English sets. Loaded after data/course8.js, practice9.js and practice10.js (C1._p9 holds the index of the first new set of each type). */
(function () {
  const P = (id, off) => ({ t: 'practice', id, set: C1._p9[id] + off });
  C1.course.push({
    id: 'use-of-english-lab', title: 'Use of English lab: more sets', level: 'C1',
    intro: 'The four Use of English tasks in a second round: multiple-choice cloze, open cloze, word formation and key word transformation. Do one of each in a sitting, under time, and read every explanation: the same few patterns decide most gaps.',
    goals: ['Choose the right collocation or phrasal verb in a multiple-choice gap', 'Spot which grammar word an open gap needs', 'Form the right word from a base, with the right prefix and suffix', 'Rewrite a sentence in 2 to 5 words without changing the key word'],
    steps: [P('mcq', 0), P('cloze', 0), P('wf', 0), P('kwt', 0), P('mcq', 1), P('cloze', 1), P('wf', 1), P('kwt', 1), P('mcq', 2), P('cloze', 2), P('wf', 2), P('kwt', 2), P('mcq', 3), P('cloze', 3), P('wf', 3)]
  });
})();
