window.C1 = window.C1 || {}; C1.visuals = C1.visuals || {};
/* Drawings for the theory pages, set 3 (see js/diagrams.js for the shapes). */
Object.assign(C1.visuals, {
  concession: [
    { after: 'idea', type: 'chooser', title: 'Which linker?', rows: [
      { q: 'A clause follows', a: 'although / even though', ex: 'Although it rained, we went out.' },
      { q: 'A noun or -ing follows', a: 'despite / in spite of', ex: 'Despite the rain, we went out.' },
      { q: 'A separate sentence follows', a: 'however', ex: 'It rained. However, we went out.' },
      { q: 'Why you do something (purpose)', a: 'in order to / so as to', ex: 'She left early so as not to miss the train.' }] },
    { after: 'part0', type: 'blocks', title: 'Same idea, three patterns', rows: [
      { label: 'Clause', parts: [{ t: 'Although', k: 'if' }, { t: 'it', k: 'subj' }, { t: 'rained,', k: 'verb' }, { t: 'we went out', k: 'main' }] },
      { label: 'Noun', parts: [{ t: 'Despite', k: 'if' }, { t: 'the rain,', k: 'obj' }, { t: 'we went out', k: 'main' }] },
      { label: 'Two sentences', parts: [{ t: 'It rained.', k: 'main' }, { t: 'However,', k: 'if' }, { t: 'we went out.', k: 'main' }] },
      { label: 'Adjective first', parts: [{ t: 'However', k: 'if' }, { t: 'tired', k: 'adv' }, { t: 'he was,', k: 'subj' }, { t: 'he carried on', k: 'main' }] }],
      say: 'Learn the pattern, not just the meaning.' },
    { after: 'part2', type: 'compare', title: 'Purpose or result?', left: { title: 'so that: purpose', items: ['The speaker wants something to happen.', 'I spoke slowly so that everyone could understand.'], tone: 'ok' }, right: { title: 'so ... that: result', items: ['Something happened as a consequence.', 'It was so noisy that nobody slept.'], tone: 'neutral' } }
  ],
  ellipsis: [
    { after: 'idea', type: 'compare', title: 'Robot or natural?', left: { title: 'Repeating everything', items: ['Will it rain? I hope it is going to rain.'], tone: 'bad' }, right: { title: 'Substitution', items: ['Will it rain? I hope so.', 'He hasn\'t finished, but I have.'], tone: 'ok' },
      say: 'Leave out what the listener can fill in.' },
    { after: 'part0', type: 'chooser', title: 'Which placeholder?', rows: [
      { q: 'A whole clause after hope, think, expect', a: 'so / not', ex: 'Will it rain? I hope not.' },
      { q: 'A verb phrase (formal)', a: 'do so', ex: 'Most customers did so.' },
      { q: 'A countable noun', a: 'one / ones', ex: 'Show me a bigger one.' },
      { q: 'A noun with a phrase (formal)', a: 'that / those', ex: 'The population of Spain is larger than that of Portugal.' }] },
    { after: 'part1', type: 'blocks', title: 'What stays behind', rows: [
      { label: 'Auxiliary stays', parts: [{ t: 'Can you swim?', k: 'note' }, { t: 'Yes, I', k: 'subj' }, { t: 'can.', k: 'aux' }] },
      { label: 'so + auxiliary + subject', parts: [{ t: 'Tom passed the exam', k: 'main' }, { t: 'and', k: 'note' }, { t: 'so', k: 'adv' }, { t: 'did', k: 'aux' }, { t: 'Maria.', k: 'subj' }] },
      { label: 'After to, keep to', parts: [{ t: 'She wanted to apply,', k: 'main' }, { t: 'but her parents', k: 'subj' }, { t: 'didn\'t want her', k: 'neg' }, { t: 'to.', k: 'prep' }] }] }
  ],
  prepositions: [
    { after: 'idea', type: 'compare', title: 'One small word, two messages', left: { title: 'in time', items: ['early enough', 'I arrived in time for the film.'], tone: 'neutral' }, right: { title: 'on time', items: ['exactly when planned', 'The train left on time.'], tone: 'neutral' } },
    { after: 'part1', type: 'blocks', title: 'After a preposition: -ing', rows: [
      { label: 'insist on', parts: [{ t: 'She', k: 'subj' }, { t: 'insisted', k: 'verb' }, { t: 'on', k: 'prep' }, { t: 'paying.', k: 'obj' }] },
      { label: 'apologise for', parts: [{ t: 'He', k: 'subj' }, { t: 'apologised', k: 'verb' }, { t: 'for', k: 'prep' }, { t: 'being late.', k: 'obj' }] },
      { label: 'to is a preposition here', parts: [{ t: 'They are', k: 'subj' }, { t: 'committed', k: 'verb' }, { t: 'to', k: 'prep' }, { t: 'improving it.', k: 'obj' }] }],
      say: 'Test: can a noun follow "to"? Then use -ing.' },
    { after: 'part2', type: 'chooser', title: 'at, on or in?', rows: [
      { q: 'A clock time or a point', a: 'at', ex: 'at 6, at night, at the weekend' },
      { q: 'A day or a date', a: 'on', ex: 'on Friday, on 5 May' },
      { q: 'A month, a year, a season', a: 'in', ex: 'in May, in 2019, in summer' },
      { q: 'Transport', a: 'in / on', ex: 'in a taxi, on a train' }] }
  ],
  wordformation: [
    { after: 'idea', type: 'blocks', title: 'One root, four jobs', rows: [
      { label: 'Noun after a / the', parts: [{ t: 'He made', k: 'subj' }, { t: 'a', k: 'note' }, { t: 'decision.', k: 'obj' }] },
      { label: 'Verb', parts: [{ t: 'He', k: 'subj' }, { t: 'decided', k: 'verb' }, { t: 'to go.', k: 'obj' }] },
      { label: 'Adjective before a noun', parts: [{ t: 'She gave', k: 'subj' }, { t: 'a', k: 'note' }, { t: 'decisive', k: 'adv' }, { t: 'answer.', k: 'obj' }] },
      { label: 'Adverb beside a verb', parts: [{ t: 'She', k: 'subj' }, { t: 'answered', k: 'verb' }, { t: 'decisively.', k: 'adv' }] }] },
    { after: 'part1', type: 'chooser', title: 'Which negative prefix?', rows: [
      { q: 'Most adjectives: the usual choice', a: 'un-', ex: 'unhappy, unlikely, unfair' },
      { q: 'Opposite or lack, often on verbs', a: 'dis-', ex: 'dishonest, disagree, disappear' },
      { q: 'Done wrongly or badly', a: 'mis-', ex: 'misunderstand, misuse, misjudge' },
      { q: 'Latin-based words', a: 'in- (im-, il-, ir-)', ex: 'inaccurate, impossible, illegal' }] },
    { after: 'part3', type: 'compare', title: 'raise or rise?', left: { title: 'raise + object', items: ['someone does it to something', 'The government raised prices.'], tone: 'ok' }, right: { title: 'rise, no object', items: ['it happens by itself', 'Prices rose.'], tone: 'neutral' } }
  ],
  adjectives: [
    { after: 'part0', type: 'blocks', title: 'Adjective order', rows: [
      { label: 'Usual order before a noun', parts: [{ t: 'opinion', k: 'subj' }, { t: 'size', k: 'aux' }, { t: 'age', k: 'verb' }, { t: 'shape', k: 'obj' }, { t: 'colour', k: 'adv' }, { t: 'origin', k: 'time' }, { t: 'material', k: 'prep' }, { t: 'purpose', k: 'note' }] },
      { label: 'Example', parts: [{ t: 'lovely', k: 'subj' }, { t: 'old', k: 'verb' }, { t: 'stone', k: 'prep' }, { t: 'cottage', k: 'main' }] },
      { label: 'Example', parts: [{ t: 'small', k: 'aux' }, { t: 'black', k: 'adv' }, { t: 'Italian', k: 'time' }, { t: 'leather', k: 'prep' }, { t: 'handbag', k: 'main' }] }] },
    { after: 'part1', type: 'scale', title: 'Gradable or extreme?', from: 'mild', to: 'extreme', marks: [
      { x: 14, label: 'a bit cold', sub: 'gradable' },
      { x: 50, label: 'very cold', sub: 'very works on a scale' },
      { x: 88, label: 'freezing', sub: 'say absolutely freezing' }],
      say: 'Really works with both groups, so it is the safe choice.' },
    { after: 'part3', type: 'compare', title: 'Position changes meaning', left: { title: 'Only Anna lent me money.', items: ['Nobody else lent me money.'], tone: 'neutral' }, right: { title: 'Anna only lent me money.', items: ['She did not give it to me.'], tone: 'neutral' } }
  ],
  wordfamilies: [
    { after: 'idea', type: 'compare', title: 'Who does it, who gets it', left: { title: '-er / -or: the doer', items: ['employer, trainer, director', 'The employer pays the employee.'], tone: 'ok' }, right: { title: '-ee: the receiver', items: ['employee, trainee, interviewee', 'The trainer teaches the trainee.'], tone: 'neutral' } },
    { after: 'part1', type: 'chooser', title: 'Which abstract noun ending?', rows: [
      { q: 'From an adjective: kind', a: '-ness', ex: 'kind, kindness' },
      { q: 'From a Latin-based adjective: able', a: '-ity', ex: 'able, ability' },
      { q: 'From a verb: achieve', a: '-ment', ex: 'achieve, achievement' },
      { q: 'From a verb: educate, decide', a: '-tion / -sion', ex: 'decide, decision' },
      { q: 'Old and irregular: grow, long', a: '-th', ex: 'grow, growth' }] },
    { after: 'part3', type: 'blocks', title: 'Spelling when you add a suffix', rows: [
      { label: 'Drop -e before a vowel', parts: [{ t: 'create', k: 'verb' }, { t: '+ ive', k: 'note' }, { t: 'creative', k: 'obj' }] },
      { label: 'Keep -e before a consonant', parts: [{ t: 'achieve', k: 'verb' }, { t: '+ ment', k: 'note' }, { t: 'achievement', k: 'obj' }] },
      { label: 'y becomes i', parts: [{ t: 'happy', k: 'verb' }, { t: '+ ness', k: 'note' }, { t: 'happiness', k: 'obj' }] },
      { label: 'Double the consonant', parts: [{ t: 'begin', k: 'verb' }, { t: '+ er', k: 'note' }, { t: 'beginner', k: 'obj' }] }] }
  ],
  prefixes: [
    { after: 'part0', type: 'chooser', title: 'Look at the first letter of the root', rows: [
      { q: 'Root starts with b, m or p', a: 'im-', ex: 'impossible, immature, imbalance' },
      { q: 'Root starts with l', a: 'il-', ex: 'illegal, illogical' },
      { q: 'Root starts with r', a: 'ir-', ex: 'irregular, irresponsible' },
      { q: 'Adjectives, adverbs: the default', a: 'un-', ex: 'unhappy, unfairly, unable' },
      { q: 'Opposite or lack, verbs and nouns too', a: 'dis-', ex: 'disagree, disadvantage' }] },
    { after: 'part1', type: 'scale', title: 'under- and over-', from: 'too little', to: 'too much', marks: [
      { x: 12, label: 'underestimate', sub: 'think it is less' },
      { x: 50, label: 'the real amount' },
      { x: 88, label: 'overestimate', sub: 'think it is more' }] },
    { after: 'part2', type: 'compare', title: 'A prefix that surprises', left: { title: 'invaluable', items: ['extremely valuable', 'Her advice was invaluable.'], tone: 'ok' }, right: { title: 'valueless / worthless', items: ['without any value', 'The old coins were worthless.'], tone: 'neutral' },
      say: 'Invaluable does not mean "without value"!' }
  ],
  oddnouns: [
    { after: 'part0', type: 'chooser', title: 'Which verb?', rows: [
      { q: 'Subject or disease ending in -s: news', a: 'singular verb', ex: 'The news is good.' },
      { q: 'Pair nouns: jeans, scissors', a: 'plural verb', ex: 'My jeans are too tight.' },
      { q: 'No -s but plural: the police', a: 'plural verb', ex: 'The police are looking for him.' },
      { q: 'Uncountable: advice, furniture', a: 'singular + a piece of', ex: 'a piece of advice' }] },
    { after: 'part1', type: 'compare', title: 'Collective nouns', left: { title: 'Singular: one unit', items: ['The committee has made its decision.'], tone: 'ok' }, right: { title: 'Plural: individuals', items: ['The committee are arguing among themselves.'], tone: 'ok' },
      say: 'Stay consistent inside one sentence.' },
    { after: 'part2', type: 'blocks', title: 'The + adjective', rows: [
      { label: 'A group: plural verb', parts: [{ t: 'The', k: 'note' }, { t: 'unemployed', k: 'subj' }, { t: 'are', k: 'aux' }, { t: 'finding it hard.', k: 'verb' }] },
      { label: 'One person: add a noun', parts: [{ t: 'An', k: 'note' }, { t: 'unemployed man', k: 'subj' }, { t: 'is', k: 'aux' }, { t: 'finding it hard.', k: 'verb' }] }] }
  ],
  statives: [
    { after: 'idea', type: 'timeline', title: 'State or action in progress?', now: 50, marks: [
      { x: 4, to: 96, label: 'I have a car', sub: 'a state: no middle' },
      { x: 38, to: 62, label: 'I\'m having lunch', sub: 'an action in progress' }] },
    { after: 'part1', type: 'chooser', title: 'Simple or continuous?', rows: [
      { q: 'An opinion', a: 'think (simple)', ex: 'I think she is right.' },
      { q: 'Your mind is busy with it now', a: 'be thinking', ex: 'I\'m thinking about changing jobs.' },
      { q: 'How the food seems', a: 'tastes (simple)', ex: 'The soup tastes salty.' },
      { q: 'Someone is testing it', a: 'be tasting', ex: 'The chef is tasting the soup.' }] },
    { after: 'part2', type: 'compare', title: 'Character or behaviour?', left: { title: 'is + adjective', items: ['the kind of person he is', 'He is careless.'], tone: 'neutral' }, right: { title: 'is being + adjective', items: ['how he behaves now', 'He is being careless today.'], tone: 'neutral' } }
  ],
  gradable: [
    { after: 'idea', type: 'scale', title: 'How cold?', from: 'mild', to: 'extreme', marks: [
      { x: 12, label: 'a bit cold' },
      { x: 36, label: 'quite cold' },
      { x: 60, label: 'very cold' },
      { x: 88, label: 'freezing', sub: 'absolutely freezing' }],
      say: 'Really works with both groups, so it is the safe choice.' },
    { after: 'part1', type: 'chooser', title: 'How strong is it?', rows: [
      { q: 'A mild, pleasant verdict', a: 'fairly', ex: 'The film was fairly good.' },
      { q: 'Often surprise or something negative', a: 'rather', ex: 'It\'s rather expensive.' },
      { q: 'Informal, like quite', a: 'pretty', ex: 'I\'m pretty tired.' },
      { q: 'A small degree, mild criticism', a: 'a bit / slightly', ex: 'The train was a bit late.' },
      { q: 'With an extreme adjective: completely', a: 'quite', ex: 'It was quite amazing.' }] },
    { after: 'part2', type: 'compare', title: 'Comparatives', left: { title: 'much / far / a lot', items: ['She is much taller than her sister.', 'The new model is far more efficient.'], tone: 'ok' }, right: { title: 'very', items: ['Not: She is very taller than her sister.', 'Never very with a comparative.'], tone: 'bad' } }
  ],
  likelihood: [
    { after: 'idea', type: 'scale', title: 'The likelihood scale', from: 'impossible', to: 'certain', marks: [
      { x: 6, label: 'no way', sub: 'out of the question' },
      { x: 26, label: 'unlikely', sub: 'be unlikely to' },
      { x: 48, label: 'might / could', sub: 'possible, no strong view' },
      { x: 67, label: 'may well', sub: 'quite likely' },
      { x: 82, label: 'likely', sub: 'be likely to' },
      { x: 95, label: 'bound to', sub: 'very confident' }] },
    { after: 'part1', type: 'compare', title: 'possible or probable?', left: { title: 'possible', items: ['it can happen', 'It is possible that he\'ll come.'], tone: 'neutral' }, right: { title: 'probable', items: ['more likely than not', 'It is probable that it will rain.'], tone: 'neutral' } },
    { after: 'part3', type: 'chooser', title: 'Same zone, new structure', rows: [
      { q: 'I am sure the train will be late.', a: 'be bound to', ex: 'The train is bound to be late.' },
      { q: 'It is quite likely that she will refuse.', a: 'be likely to / may well', ex: 'She may well refuse.' },
      { q: 'There is almost no chance he\'ll apologise.', a: 'be highly unlikely to', ex: 'He is highly unlikely to apologise.' },
      { q: 'Perhaps we will find a taxi.', a: 'might just', ex: 'We might just find a taxi.' }],
      say: 'Find the zone first, then change the phrase.' }
  ],
  itthere: [
    { after: 'idea', type: 'compare', title: 'Heavy start or dummy subject?', left: { title: 'Heavy subject', items: ['To learn a language takes time.'], tone: 'neutral' }, right: { title: 'Dummy it', items: ['It takes time to learn a language.', 'This is the natural one.'], tone: 'ok' },
      say: 'It stands in for an idea; there announces that something exists.' },
    { after: 'part1', type: 'blocks', title: 'There + be and its relatives', rows: [
      { label: 'The verb agrees with what follows', parts: [{ t: 'There', k: 'note' }, { t: 'are', k: 'aux' }, { t: 'two books.', k: 'obj' }] },
      { label: 'seem, appear, tend', parts: [{ t: 'There', k: 'note' }, { t: 'seems', k: 'verb' }, { t: 'to be', k: 'aux' }, { t: 'a lack of interest.', k: 'obj' }] },
      { label: 'Reporting', parts: [{ t: 'There', k: 'note' }, { t: 'is said', k: 'verb' }, { t: 'to be', k: 'aux' }, { t: 'a link with memory.', k: 'obj' }] }] },
    { after: 'part2', type: 'chooser', title: 'It or there?', rows: [
      { q: 'Announcing that something exists', a: 'there', ex: 'There is a risk of flooding.' },
      { q: 'Weather, time or distance', a: 'it', ex: 'It is a long way.' },
      { q: 'The real subject comes later', a: 'it', ex: 'It is obvious that he lied.' },
      { q: 'Naming something already known', a: 'it', ex: 'It is a risk we cannot take.' }] }
  ],
  cohesion: [
    { after: 'idea', type: 'blocks', title: 'A chain of sentences', rows: [
      { label: 'Sentence 1 gives the idea', parts: [{ t: 'Rents', k: 'subj' }, { t: 'are rising.', k: 'verb' }] },
      { label: 'Sentence 2 points back', parts: [{ t: 'This', k: 'if' }, { t: 'forces', k: 'verb' }, { t: 'students', k: 'obj' }, { t: 'to share flats.', k: 'obj' }] }] },
    { after: 'part0', type: 'chooser', title: 'Which reference word?', rows: [
      { q: 'What was just said', a: 'this / these', ex: 'Rents are rising. This forces students to share flats.' },
      { q: 'A type: "of that kind"', a: 'such (a)', ex: 'Such a measure was unpopular.' },
      { q: 'The first of two things', a: 'the former', ex: 'The former has a law degree.' },
      { q: 'The second of two things', a: 'the latter', ex: 'The latter has experience.' },
      { q: 'Replacing a whole action', a: 'do so', ex: 'She asked him to leave and he did so.' }] },
    { after: 'part1', type: 'compare', title: 'Give "this" a clear target', left: { title: 'Unclear', items: ['The minister met the union leader, and he promised changes.', 'Who promised: the minister or the leader?'], tone: 'bad' }, right: { title: 'Clear', items: ['Name the person: the minister promised changes.', 'Add a summary noun: This promise was widely welcomed.'], tone: 'ok' },
      say: 'A vague "this" needs a summary noun: this decision, this trend.' }
  ],
  nounclauses: [
    { after: 'idea', type: 'blocks', title: 'A clause in a noun slot', rows: [
      { label: 'Noun', parts: [{ t: 'I', k: 'subj' }, { t: 'know', k: 'verb' }, { t: 'the answer.', k: 'obj' }] },
      { label: 'That-clause', parts: [{ t: 'I', k: 'subj' }, { t: 'know', k: 'verb' }, { t: 'that', k: 'note' }, { t: 'she is right.', k: 'obj' }] },
      { label: 'Wh-clause', parts: [{ t: 'I', k: 'subj' }, { t: 'know', k: 'verb' }, { t: 'what', k: 'wh' }, { t: 'she wants.', k: 'obj' }] }] },
    { after: 'part1', type: 'chooser', title: 'whether or if?', rows: [
      { q: 'The clause is the subject', a: 'whether', ex: 'Whether he comes doesn\'t matter.' },
      { q: 'Right after a preposition', a: 'whether', ex: 'It depends on whether we win.' },
      { q: 'Followed by to', a: 'whether', ex: 'I can\'t decide whether to go.' },
      { q: 'After know, wonder, ask', a: 'whether or if', ex: 'I don\'t know if it is true.' }] },
    { after: 'part2', type: 'blocks', title: 'Question order goes back to normal', rows: [
      { label: 'Direct question', parts: [{ t: 'Where', k: 'wh' }, { t: 'is', k: 'aux' }, { t: 'the station?', k: 'subj' }] },
      { label: 'Inside a statement', parts: [{ t: 'I wonder', k: 'main' }, { t: 'where', k: 'wh' }, { t: 'the station', k: 'subj' }, { t: 'is.', k: 'aux' }] }],
      say: 'No inversion and no do-support inside the clause.' }
  ]
});
