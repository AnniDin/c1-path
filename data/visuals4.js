window.C1 = window.C1 || {}; C1.visuals = C1.visuals || {};
/* Drawings for the Speaking/Writing skills lessons and several grammar lessons (shapes: see js/diagrams.js). */
Object.assign(C1.visuals, {
  'sk-part1': [
    { after: 'idea', type: 'chooser', title: 'Which micro-skill?', rows: [
      { q: 'You did not catch the question', a: 'Ask for repetition', ex: 'Sorry, could you repeat the question, please?' },
      { q: 'You need two seconds to think', a: 'Buy thinking time', ex: 'Let me think for a moment.' },
      { q: 'Your answer is only one line long', a: 'Add information', ex: "What's more, I can walk to work." },
      { q: 'The exact word escapes you', a: 'Paraphrase', ex: "It's a tool you use for tightening screws." }] },
    { after: 'part1', type: 'blocks', title: 'The 3-move answer', caption: 'About 15-20 seconds, then stop.', rows: [
      { label: '1 Answer', parts: [{ t: 'I live', k: 'subj' }, { t: 'in a medium-sized town', k: 'prep' }, { t: 'on the coast.', k: 'prep' }] },
      { label: '2 Reason or detail', parts: [{ t: 'What I like about it', k: 'wh' }, { t: 'is that', k: 'aux' }, { t: 'everything is within', k: 'main' }, { t: 'walking distance.', k: 'obj' }] },
      { label: '3 Contrast or example', parts: [{ t: 'Having said that,', k: 'adv' }, { t: 'it can get a bit dull', k: 'main' }, { t: 'in winter.', k: 'time' }] }] },
    { after: 'part2', type: 'compare', title: 'Forgot a word?', left: { title: 'Stopping', items: ["I don't know how to say it in English.", 'The conversation stops.'], tone: 'bad' }, right: { title: 'Describing', items: ["It's a kind of...", "It's the person who looks after the money.", "It's the opposite of generous, a bit like mean."], tone: 'ok' },
      say: 'Describe it: a category, a use, or a near word. The listener can supply the missing one.' }
  ],
  'sk-part2': [
    { after: 'idea', type: 'compare', title: 'Describing or comparing?', left: { title: 'Only describing', items: ['In this photo there is a man, he has a blue shirt, there is a table.'], tone: 'bad' }, right: { title: 'Comparing and guessing', items: ['Both photos show people working, but he looks more stressed.', 'Maybe a deadline is coming.'], tone: 'ok' } },
    { after: 'part1', type: 'blocks', title: 'Whereas joins two clauses', rows: [
      { label: 'One sentence', parts: [{ t: 'Whereas', k: 'if' }, { t: 'the first photo', k: 'subj' }, { t: 'is bright,', k: 'verb' }, { t: 'the second', k: 'subj' }, { t: 'is dark.', k: 'verb' }] },
      { label: 'Starts a new sentence', parts: [{ t: 'In contrast,', k: 'adv' }, { t: 'the second photo', k: 'subj' }, { t: 'is dark.', k: 'verb' }] }] },
    { after: 'part2', type: 'scale', title: 'How sure are you?', from: 'Possible', to: 'Almost sure',
      marks: [{ x: 14, label: 'might / could', sub: 'possible' }, { x: 55, label: 'probably', sub: 'hedged' }, { x: 88, label: 'must be', sub: 'almost sure' }],
      say: "For a strong positive guess use must be, not can be. The negative is can't be." }
  ],
  'sk-part34': [
    { after: 'idea', type: 'blocks', title: 'Respond, add, hand over', rows: [
      { label: 'Respond', parts: [{ t: "That's a good point", k: 'adv' }, { t: 'about cost.', k: 'obj' }] },
      { label: 'Add', parts: [{ t: "I'd add that", k: 'main' }, { t: "it's also quicker.", k: 'obj' }] },
      { label: 'Hand over', parts: [{ t: 'What do you', k: 'wh' }, { t: 'think?', k: 'wh' }] }] },
    { after: 'part0', type: 'compare', title: 'Disagreeing', left: { title: 'Too blunt', items: ['You are wrong.', 'Rubbish. Next point.'], tone: 'bad' }, right: { title: 'Polite', items: ["I'm not sure I'd agree with that.", "I take your point, but I'm inclined to think...", 'Do you really think so?'], tone: 'ok' },
      say: "Question the claim, never the person: \"I'm not sure I'd agree\" beats \"You are wrong\"." },
    { after: 'part1', type: 'chooser', title: 'Which tag?', rows: [
      { q: 'Positive statement', a: 'Negative tag', ex: "It's a difficult choice, isn't it?" },
      { q: 'Negative statement', a: 'Positive tag', ex: "We can't do both, can we?" },
      { q: 'Nothing, hardly, never...', a: 'Positive tag', ex: 'Nothing happened, did it?' },
      { q: 'I am...', a: "aren't I", ex: "I'm right, aren't I?" },
      { q: "Let's...", a: 'shall we', ex: "Let's go, shall we?" }] }
  ],
  'sk-hedging': [
    { after: 'idea', type: 'chooser', title: 'Which hedge?', rows: [
      { q: 'Not sure where you heard it', a: 'As far as I know', ex: 'As far as I know, the museum closes at six.' },
      { q: 'Not completely true', a: 'To a certain extent', ex: 'The plan has worked, to a certain extent.' },
      { q: 'True of most people, not all', a: 'Tend to', ex: 'Teenagers tend to sleep later than adults.' },
      { q: 'You do not want to own the opinion', a: 'It could be argued that', ex: 'It could be argued that the tax is unfair.' }] },
    { after: 'part2', type: 'scale', title: 'Formal or informal?', from: 'Informal speech', to: 'Formal writing',
      marks: [{ x: 10, label: 'sort of, kind of', sub: 'fine in Speaking' }, { x: 48, label: 'as far as I know', sub: 'neutral' }, { x: 88, label: 'arguably, tends to', sub: 'formal writing' }] },
    { after: 'part3', type: 'compare', title: 'How many hedges?', left: { title: 'Enough', items: ['Teenagers tend to sleep later than adults.', 'Facts need none: The Earth goes round the Sun.'], tone: 'ok' }, right: { title: 'Too much', items: ['I think maybe it could possibly be somewhat of a kind of problem.', 'The Earth goes round the Sun, more or less.'], tone: 'bad' },
      say: 'One hedge per claim is usually enough, and facts need none.' }
  ],
  'sk-concede': [
    { after: 'idea', type: 'blocks', title: 'Concession, then turn', caption: 'No "but" after "although".', rows: [
      { label: 'Two sentences', parts: [{ t: 'Granted,', k: 'if' }, { t: 'the course is expensive.', k: 'obj' }, { t: 'Even so,', k: 'adv' }, { t: 'it is excellent value.', k: 'main' }] },
      { label: 'One sentence', parts: [{ t: 'Although', k: 'if' }, { t: 'he trained hard,', k: 'if' }, { t: 'he lost.', k: 'main' }] }] },
    { after: 'part1', type: 'chooser', title: 'Which challenge?', rows: [
      { q: 'The claim is too general', a: 'Not necessarily.', ex: '"Expensive means better." Not necessarily.' },
      { q: 'You agree only partly', a: 'Up to a point.', ex: '"Money brings happiness." Up to a point, but...' },
      { q: 'You doubt the evidence', a: 'Is that really the case?', ex: 'Is that really the case in rural areas?' },
      { q: 'Formal counter-argument', a: 'One could object that...', ex: 'One could object that fewer people can afford it.' }] },
    { after: 'part2', type: 'blocks', title: 'A 4-step paragraph', rows: [
      { label: '1 Claim', parts: [{ t: 'Remote working', k: 'subj' }, { t: 'benefits', k: 'verb' }, { t: 'employees.', k: 'obj' }] },
      { label: '2 Support', parts: [{ t: 'They save', k: 'verb' }, { t: 'time and money', k: 'obj' }, { t: 'on commuting.', k: 'prep' }] },
      { label: '3 Concede', parts: [{ t: 'Admittedly,', k: 'if' }, { t: 'some feel isolated.', k: 'main' }] },
      { label: '4 Resolve', parts: [{ t: 'Even so,', k: 'adv' }, { t: 'firms that offer', k: 'subj' }, { t: 'a hybrid model', k: 'obj' }, { t: 'seem to avoid', k: 'verb' }, { t: 'these problems.', k: 'obj' }] }] }
  ],
  'sk-signpost': [
    { after: 'idea', type: 'scale', title: 'Where a talk is going', from: 'Start of talk', to: 'End of talk',
      marks: [{ x: 6, label: 'Preview', sub: "I'll begin by..." }, { x: 28, label: 'First of all', sub: 'first point' }, { x: 55, label: 'Moving on to...', sub: 'next point' }, { x: 82, label: 'Finally', sub: 'last point' }, { x: 96, label: 'To sum up', sub: 'ending' }] },
    { after: 'part0', type: 'compare', title: 'Opening a list', left: { title: 'To begin', items: ["I'll begin by looking at the cost.", "I'll begin with the cost.", 'To begin with, ...'], tone: 'ok' }, right: { title: 'At first means...', items: ['At first the plan seemed simple, but then it grew.', 'It describes a change, not the first point.'], tone: 'neutral' } },
    { after: 'part2', type: 'chooser', title: 'What you hear, what to do', rows: [
      { q: 'There are three main factors...', a: 'Number three items' },
      { q: 'That brings me to...', a: 'A new section starts' },
      { q: 'In other words...', a: 'Look for the main idea' },
      { q: 'The most important point is...', a: 'Write it down' },
      { q: 'So, to sum up...', a: 'Expect the conclusion' }],
      say: 'After a preview, leave a gap in your notes and fill it in as each signpost arrives.' }
  ],
  questions: [
    { after: 'idea', type: 'chooser', title: 'What is the question for?', rows: [
      { q: 'Ask politely', a: 'Indirect question', ex: 'Could you tell me where the station is?' },
      { q: 'Ask for agreement', a: 'Question tag', ex: "You're coming, aren't you?" },
      { q: 'Show you are listening', a: 'Echo question', ex: "A: I've bought a car. B: Have you?" },
      { q: 'Make a suggestion', a: "Why don't we...?", ex: "Why don't we eat out tonight?" }],
      say: 'With a tag, falling intonation expects a yes; rising intonation really asks.' },
    { after: 'part0', type: 'blocks', title: 'From direct to polite', caption: 'The embedded question keeps statement order.', rows: [
      { label: 'Direct', parts: [{ t: 'Where', k: 'wh' }, { t: 'is', k: 'aux' }, { t: 'the station?', k: 'subj' }] },
      { label: 'Indirect (polite)', parts: [{ t: 'Could you tell me', k: 'main' }, { t: 'where', k: 'wh' }, { t: 'the station', k: 'subj' }, { t: 'is?', k: 'aux' }] },
      { label: 'Yes/no inside', parts: [{ t: 'Do you know', k: 'main' }, { t: 'whether', k: 'wh' }, { t: 'he', k: 'subj' }, { t: 'has left?', k: 'verb' }] },
      { label: 'Subject question: no do', parts: [{ t: 'Who', k: 'wh' }, { t: 'called', k: 'verb' }, { t: 'you?', k: 'obj' }] }] },
    { after: 'part2', type: 'compare', title: 'So or neither?', left: { title: 'so + positive', items: ['I love jazz. So do I.', "I've finished. So have I."], tone: 'ok' }, right: { title: 'neither / nor + negative', items: ["I can't swim. Neither can I.", "I don't like it. Nor do I."], tone: 'ok' } }
  ],
  obligation: [
    { after: 'idea', type: 'scale', title: 'How strong is the rule?', from: 'You are free', to: 'Forbidden',
      marks: [{ x: 8, label: "don't have to", sub: 'no obligation' }, { x: 36, label: 'should', sub: 'advice' }, { x: 66, label: 'must / have to', sub: 'strong obligation' }, { x: 94, label: "mustn't", sub: 'prohibition' }],
      say: "Mustn't forbids. Don't have to sets you free. Opposite meanings." },
    { after: 'part1', type: 'compare', title: "Needn't have or didn't need to?", left: { title: "needn't have + participle", items: ["I needn't have brought an umbrella.", 'I brought it, and it was a waste.'], tone: 'neutral' }, right: { title: "didn't need to + verb", items: ["I didn't need to bring an umbrella.", 'It was not necessary; we do not say whether I did.'], tone: 'neutral' } },
    { after: 'part2', type: 'chooser', title: 'Could, was able to, managed to', rows: [
      { q: 'General ability in the past', a: 'could', ex: 'When I was ten I could swim a mile.' },
      { q: 'One successful event', a: 'was able to', ex: 'Everyone was able to escape.' },
      { q: 'Success after difficulty', a: 'managed to', ex: 'She managed to open the safe.' },
      { q: 'One failure', a: "couldn't", ex: "I couldn't find it." }] }
  ],
  nominalisation: [
    { after: 'idea', type: 'compare', title: 'Verbs or nouns?', left: { title: 'Verb style (speech)', items: ['Prices rose sharply, which worried people.'], tone: 'neutral' }, right: { title: 'Noun style (formal writing)', items: ['The sharp rise in prices caused widespread concern.'], tone: 'neutral' } },
    { after: 'part1', type: 'blocks', title: 'Before and after the noun', caption: 'Light words before; heavy information after.', rows: [
      { label: 'Example 1', parts: [{ t: 'the recent sharp', k: 'adv' }, { t: 'rise', k: 'subj' }, { t: 'in the price', k: 'prep' }, { t: 'of imported fuel', k: 'prep' }] },
      { label: 'Example 2', parts: [{ t: 'a growing public', k: 'adv' }, { t: 'awareness', k: 'subj' }, { t: 'of the risks', k: 'prep' }, { t: 'associated with', k: 'verb' }, { t: 'processed food', k: 'obj' }] }] },
    { after: 'part2', type: 'chooser', title: 'Learn the noun with its preposition', rows: [
      { q: 'to increase', a: 'an increase in', ex: 'an increase in crime' },
      { q: 'to demand', a: 'a demand for', ex: 'a demand for housing' },
      { q: 'to affect', a: 'an effect on', ex: 'an effect on health' },
      { q: 'to approve of', a: 'approval of', ex: 'approval of the plan' }],
      say: 'Use nouns to summarise a point, and verbs to say what happens.' }
  ],
  negation: [
    { after: 'idea', type: 'compare', title: 'One negative per clause', left: { title: 'Two negatives', items: ["I didn't see nobody.", 'Not standard English.'], tone: 'bad' }, right: { title: 'One negative', items: ["I didn't see anybody.", 'I saw nobody.'], tone: 'ok' } },
    { after: 'part1', type: 'blocks', title: 'Fronted negatives invert', caption: 'The auxiliary moves to the front of the main clause.', rows: [
      { label: 'Not until', parts: [{ t: 'Not until', k: 'neg' }, { t: 'I read the letter', k: 'if' }, { t: 'did', k: 'aux' }, { t: 'I', k: 'subj' }, { t: 'understand.', k: 'verb' }] },
      { label: 'Scarcely', parts: [{ t: 'Scarcely', k: 'neg' }, { t: 'had', k: 'aux' }, { t: 'she', k: 'subj' }, { t: 'sat down', k: 'verb' }, { t: 'when the phone rang.', k: 'time' }] },
      { label: 'Under no circumstances', parts: [{ t: 'Under no circumstances', k: 'neg' }, { t: 'should', k: 'aux' }, { t: 'you', k: 'subj' }, { t: 'open it.', k: 'verb' }] }] },
    { after: 'part2', type: 'chooser', title: 'Where does the negative go?', rows: [
      { q: 'With think, believe, suppose', a: 'In the main verb', ex: "I don't think he'll win." },
      { q: 'With hope', a: 'The negative stays low', ex: "I hope it doesn't rain." },
      { q: 'Verb with negative meaning', a: 'No "not" needed', ex: 'She denied having seen him.' },
      { q: 'Near-negative such as hardly', a: 'No second negative', ex: 'I can hardly hear you.' }] }
  ],
  fronting: [
    { after: 'idea', type: 'blocks', title: 'Given first, new last', caption: 'Known topic first, news at the end.', rows: [
      { label: 'Sentence 1', parts: [{ t: 'I', k: 'subj' }, { t: 'met', k: 'verb' }, { t: 'an old friend', k: 'obj' }, { t: 'yesterday.', k: 'time' }] },
      { label: 'Sentence 2', parts: [{ t: 'My friend', k: 'subj' }, { t: 'has just moved to', k: 'verb' }, { t: 'Bilbao.', k: 'obj' }] }] },
    { after: 'part0', type: 'blocks', title: 'When the verb moves too', rows: [
      { label: 'Normal order', parts: [{ t: 'The ball', k: 'subj' }, { t: 'rolled', k: 'verb' }, { t: 'down the hill.', k: 'prep' }] },
      { label: 'Fronted: verb first', parts: [{ t: 'Down the hill', k: 'prep' }, { t: 'rolled', k: 'verb' }, { t: 'the ball.', k: 'subj' }] },
      { label: 'Pronoun: no inversion', parts: [{ t: 'Down the hill', k: 'prep' }, { t: 'it', k: 'subj' }, { t: 'rolled.', k: 'verb' }] },
      { label: 'Fronted object: no inversion', parts: [{ t: 'This', k: 'obj' }, { t: 'I', k: 'subj' }, { t: 'cannot accept.', k: 'verb' }] }] },
    { after: 'part1', type: 'compare', title: 'Such or so?', left: { title: 'Such + be + noun', items: ['Such was the noise that nobody could sleep.'], tone: 'ok' }, right: { title: 'So + adjective + be + noun', items: ['So great was the demand that the shop sold out.', 'Not: So was the demand.'], tone: 'ok' },
      say: 'Fronting is emphasis: one in an essay is a feature, five is a mannerism.' }
  ]
});
