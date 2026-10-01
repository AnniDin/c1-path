window.C1 = window.C1 || {};
/* level: B1 | B2 | C1. topic: id of the grammar lesson to recommend if missed ('vocab' = no lesson). */
C1.placement = [
  { level: 'B1', topic: 'conditionals', q: 'If it rains tomorrow, we ___ at home.', options: ['stay', 'will stay', 'would stay', 'stayed'], answer: 1, why: 'A real future condition: present simple in the <em>if</em> clause, <em>will</em> in the result.' },
  { level: 'B1', topic: 'aspect', q: 'I ___ here since 2019.', options: ['live', 'lived', 'have lived', 'am living'], answer: 2, why: '<em>Since</em> + a point in time needs the present perfect.' },
  { level: 'B1', topic: 'passive', q: 'This bridge ___ in 1950.', options: ['built', 'was built', 'has built', 'is building'], answer: 1, why: 'Past passive: the bridge did not build itself.' },
  { level: 'B1', topic: 'modals', q: 'You ___ wear a seatbelt; it\'s the law.', options: ['must', 'might', 'can', 'would'], answer: 0, why: '<em>Must</em> expresses obligation.' },
  { level: 'B1', topic: 'vocab', q: 'I\'m looking forward ___ you next week.', options: ['to see', 'to seeing', 'seeing', 'for seeing'], answer: 1, why: 'In <em>look forward to</em>, <em>to</em> is a preposition, so a <em>-ing</em> form follows.' },
  { level: 'B1', topic: 'vocab', q: 'He is much taller ___ his brother.', options: ['than', 'that', 'as', 'from'], answer: 0, why: 'Comparative + <em>than</em>.' },
  { level: 'B1', topic: 'vocab', q: 'We have run ___ of petrol.', options: ['away', 'out', 'off', 'up'], answer: 1, why: '<em>Run out of</em> = use all of.' },
  { level: 'B1', topic: 'conditionals', q: 'If I ___ you, I would take the job.', options: ['am', 'was being', 'were', 'will be'], answer: 2, why: 'Unreal present: past form, and <em>were</em> is standard after <em>If I</em>.' },

  { level: 'B2', topic: 'wish', q: 'I wish I ___ speak French.', options: ['can', 'could', 'would', 'will'], answer: 1, why: 'A wish about the present takes a past form: <em>could</em>.' },
  { level: 'B2', topic: 'aspect', q: 'By the time we arrived, the concert ___.', options: ['started', 'has started', 'had started', 'was starting'], answer: 2, why: 'The concert began before we arrived: past perfect.' },
  { level: 'B2', topic: 'vocab', q: 'She suggested ___ a taxi.', options: ['to take', 'taking', 'take', 'to taking'], answer: 1, why: '<em>Suggest</em> is followed by <em>-ing</em> (or <em>that</em> + clause).' },
  { level: 'B2', topic: 'passive', q: 'The house ___ painted at the moment.', options: ['is being', 'is', 'has', 'was'], answer: 0, why: 'Present continuous passive: <em>is being painted</em>.' },
  { level: 'B2', topic: 'modals', q: 'You ___ have told me earlier! Now it\'s too late.', options: ['should', 'must', 'can', 'would'], answer: 0, why: '<em>Should have</em> + participle = criticism about the past.' },
  { level: 'B2', topic: 'vocab', q: 'He denied ___ the money.', options: ['to take', 'taking', 'take', 'to have take'], answer: 1, why: '<em>Deny</em> is followed by <em>-ing</em>.' },
  { level: 'B2', topic: 'vocab', q: 'The film, ___ I saw last week, was brilliant.', options: ['what', 'that', 'which', 'who'], answer: 2, why: 'A non-defining relative clause (between commas) cannot use <em>that</em>.' },
  { level: 'B2', topic: 'wish', q: 'I\'d rather you ___ tell anyone about this.', options: ['to not', 'didn\'t', 'won\'t', 'not'], answer: 1, why: '<em>Would rather</em> + another subject + past simple.' },

  { level: 'C1', topic: 'inversion', q: 'Not until the end of the film ___ who the murderer was.', options: ['we discovered', 'did we discover', 'we did discover', 'discovered we'], answer: 1, why: 'A fronted <em>Not until</em> phrase triggers inversion in the main clause.' },
  { level: 'C1', topic: 'conditionals', q: '___ the bad weather, we would have gone out.', options: ['Had it not been for', 'Were it not for', 'If it hadn\'t for', 'Without to be'], answer: 0, why: 'Unreal past: <em>Had it not been for</em> = If it hadn\'t been for.' },
  { level: 'C1', topic: 'cleft', q: 'It was Sarah ___ found the error.', options: ['which', 'who', 'whose', 'what'], answer: 1, why: 'An it-cleft with a person as focus: <em>who</em>.' },
  { level: 'C1', topic: 'participle', q: '___ by the noise, the baby started crying.', options: ['Waking', 'Woken', 'Having woken', 'To wake'], answer: 1, why: 'The baby <em>was woken</em>: passive meaning, past participle.' },
  { level: 'C1', topic: 'passive', q: 'The suspect is believed ___ the country last night.', options: ['to leave', 'to have left', 'leaving', 'to be leaving'], answer: 1, why: 'The leaving happened before the believing: perfect infinitive.' },
  { level: 'C1', topic: 'modals', q: 'She can\'t ___ last week\'s exam; she barely studied.', options: ['have passed', 'be passing', 'pass', 'has passed'], answer: 0, why: 'Negative certainty about the past: <em>can\'t have</em> + participle.' },
  { level: 'C1', topic: 'inversion', q: 'Only when the manager arrived ___ the problem.', options: ['they solved', 'did they solve', 'they did solve', 'solved they'], answer: 1, why: 'After <em>Only when … </em>, the main clause takes question order.' },
  { level: 'C1', topic: 'aspect', q: 'By this time next month, she ___ for the company for a decade.', options: ['will work', 'will have been working', 'is working', 'has worked'], answer: 1, why: 'A duration up to a future point: future perfect continuous.' }
];
