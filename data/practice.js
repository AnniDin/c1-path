window.C1 = window.C1 || {};
C1.practice = [
{
  id: 'mcq', title: 'Multiple-choice cloze', short: 'Pick the word that fits meaning, collocation and grammar.',
  exam: 'Cambridge C1 Advanced: Reading and Use of English, Part 1 · Linguaskill: multiple-choice gapped text',
  instruction: 'Choose the best option for each gap.',
  strategy: `<ol><li>Read the whole text first for meaning; ignore the gaps.</li>
    <li>For each gap decide what <strong>type</strong> of problem it is: fixed phrase, collocation, phrasal verb, linking word or meaning difference.</li>
    <li>Try each option <strong>in the sentence</strong>; the wrong ones fail because of a small partner word (a preposition, a following verb form), not because they mean something different.</li>
    <li>Do not leave blanks: if two remain, choose by which fits the words <em>after</em> the gap.</li></ol>`,
  sets: [
    { title: 'Set 1: The changing high street', items: [{
      type: 'passage', mode: 'mcq', title: 'The changing high street',
      text: 'Town centres across the country are struggling to {1} with changing shopping habits. Many independent shops have been {2} to close, unable to compete with online retailers. Councils have therefore {3} a range of measures, from cheaper parking to free wifi. Some have gone {4} far as to convert empty units into homes or community spaces. According {5} experts, the high street will survive only if it offers something the internet cannot. Independent shops, {6} the other hand, can offer personal service that a website cannot match. In {7} of these efforts, however, not every town will succeed. Much will {8} on local leadership.',
      gaps: [
        { options: ['cope', 'keep', 'face', 'get'], answer: 0, why: '<em>Cope with</em> = manage a difficult situation. The other options do not take <em>with</em> in this sense.' },
        { options: ['forced', 'allowed', 'persuaded', 'encouraged'], answer: 0, why: '<em>Forced to close</em> = had no choice. Nobody is <em>persuaded</em> or <em>encouraged</em> to close because they cannot compete.' },
        { options: ['taken', 'made', 'done', 'put'], answer: 0, why: 'The collocation is <em>take measures</em>.' },
        { options: ['such', 'so', 'too', 'very'], answer: 1, why: '<em>Go so far as to</em> + verb is a fixed phrase meaning "even do something extreme".' },
        { options: ['to', 'with', 'by', 'for'], answer: 0, why: '<em>According to</em> is the fixed preposition.' },
        { options: ['on', 'in', 'at', 'by'], answer: 0, why: '<em>On the other hand</em>, fixed contrast phrase.' },
        { options: ['spite', 'view', 'case', 'favour'], answer: 0, why: '<em>In spite of</em> = despite. <em>In view of</em> would mean "because of", which conflicts with <em>however</em>.' },
        { options: ['depend', 'consist', 'result', 'insist'], answer: 0, why: '<em>Depend on</em> = be determined by. <em>Consist of</em> and <em>result in</em> take different prepositions.' }
      ]
    }] },
    { title: 'Set 2: The science of habit', items: [{
      type: 'passage', mode: 'mcq', title: 'The science of habit',
      text: 'Habits are behaviours we perform almost {1}, without conscious thought. Psychologists have long {2} attention to the fact that repeated actions become stored in a part of the brain that requires little effort. This explains why breaking a bad habit is often easier {3} than done. Simply relying on willpower is rarely enough; it is far more effective to {4} control of the cues that trigger the behaviour. Someone trying to {5} down on snacks, for instance, might keep them out of sight. Over time, new routines take {6} and begin to feel natural. Of course, setbacks are {7} to happen, but they need not {8} the whole process.',
      gaps: [
        { options: ['automatically', 'accidentally', 'absolutely', 'occasionally'], answer: 0, why: '<em>Automatically</em> = without thinking, which matches "without conscious thought".' },
        { options: ['drawn', 'held', 'kept', 'set'], answer: 0, why: '<em>Draw attention to</em> is a fixed collocation.' },
        { options: ['said', 'told', 'spoken', 'stated'], answer: 0, why: 'The proverb is <em>easier said than done</em>.' },
        { options: ['take', 'make', 'do', 'bring'], answer: 0, why: '<em>Take control of</em> is the collocation.' },
        { options: ['cut', 'put', 'turn', 'break'], answer: 0, why: '<em>Cut down on</em> = reduce.' },
        { options: ['hold', 'turn', 'pace', 'care'], answer: 0, why: '<em>Take hold</em> = become established.' },
        { options: ['bound', 'tied', 'fixed', 'forced'], answer: 0, why: '<em>Be bound to</em> + infinitive = certain to happen.' },
        { options: ['derail', 'relate', 'recover', 'dispose'], answer: 0, why: '<em>Derail a process</em> = make it fail. <em>Relate</em>, <em>recover</em> and <em>dispose</em> cannot take this object.' }
      ]
    }] }
  ]
},
{
  id: 'cloze', title: 'Open cloze', short: 'Fill each gap with one word: grammar words, not vocabulary.',
  exam: 'Cambridge C1 Advanced: Reading and Use of English, Part 2 · Linguaskill: open gapped text',
  instruction: 'Write ONE word in each gap. Contractions count as two words in the real exam, so avoid them.',
  strategy: `<ol><li>Open cloze tests <strong>grammar words</strong>: auxiliaries, prepositions, pronouns, linkers, determiners, quantifiers. There is no "clever vocabulary".</li>
    <li>Decide which category the missing word belongs to, using the words on both sides of the gap.</li>
    <li>Watch for fixed phrases and inversion (<em>Little ___ they know</em>, <em>no ___ surprise</em>).</li>
    <li>Read the completed sentence aloud in your head: it must sound natural.</li></ol>`,
  sets: [
    { title: 'Set 1: Remote work', items: [{
      type: 'passage', mode: 'cloze', title: 'Remote work',
      text: 'Working from home, {1} was once a rare privilege, has become commonplace over the past decade. Many employees say they would not go back to the office {2} given the choice, and some companies have responded by abandoning their headquarters altogether. {3} the flexibility this offers, however, remote work is not without its drawbacks. Workers often find it hard to switch off, {4} they end up working longer hours than before. Others miss the casual conversations {5} used to take place beside the coffee machine. Little {6} employers realise how important these moments are for creativity. It is {7} surprise, then, that a growing number of firms are adopting hybrid models, in {8} staff spend part of the week on site.',
      gaps: [
        { answers: ['which'], why: 'A non-defining relative clause referring to the whole idea "working from home": <em>which</em>.' },
        { answers: ['if', 'when', 'once'], why: '<em>If given the choice</em> = if they were given the choice (a reduced clause); <em>when</em> and <em>once</em> also fit.' },
        { answers: ['despite', 'notwithstanding'], why: '<em>Despite the flexibility</em> introduces a contrast with the drawbacks. (<em>In spite of</em> is two words.)' },
        { answers: ['so', 'and'], why: '<em>So</em> shows result: they cannot switch off, so they work longer. (<em>And</em> also links the two clauses.)' },
        { answers: ['that', 'which'], why: 'Relative pronoun for "conversations" as the subject of <em>used to take place</em>.' },
        { answers: ['do'], why: 'Inversion after <em>Little</em>: <em>Little do employers realise</em>.' },
        { answers: ['no', 'little'], why: 'Fixed phrase: <em>It is no/little surprise that…</em>.' },
        { answers: ['which'], why: 'Preposition + relative pronoun (formal): <em>in which</em> = where.' }
      ]
    }] },
    { title: 'Set 2: Sleep', items: [{
      type: 'passage', mode: 'cloze', title: 'The value of sleep',
      text: 'Most of us know that sleep is essential, {1} few of us give it the priority it deserves. Researchers have {2} that adults who regularly sleep less than six hours are more likely to develop health problems. Not {3} does poor sleep affect concentration, but it also weakens the immune system. Had people {4} aware of these risks earlier, perhaps fewer would have sacrificed rest for work. There is no {5} in trying to catch up at weekends, {6} the body cannot fully recover lost sleep in this way. Experts suggest going to bed at a regular time, {7} matter how busy the day has been. {8} you follow this advice, you should notice an improvement within weeks.',
      gaps: [
        { answers: ['yet', 'but', 'though', 'although', 'while', 'whereas'], why: 'A contrast: we know it is essential, <em>yet/but</em> (or <em>though/although/while/whereas</em>) few give it priority.' },
        { answers: ['shown', 'found', 'discovered', 'established', 'demonstrated', 'proved', 'revealed', 'confirmed', 'suggested', 'indicated', 'concluded', 'reported'], why: 'A reporting verb in the present perfect that takes a <em>that</em> clause. Several are possible.' },
        { answers: ['only'], why: '<em>Not only … but also</em>, with inversion after <em>not only</em>.' },
        { answers: ['been', 'become'], why: 'Inverted third conditional: <em>Had people been/become aware…</em> = If people had been aware…' },
        { answers: ['point', 'sense', 'benefit', 'use', 'value', 'purpose'], why: '<em>There is no point in doing</em> = it is useless.' },
        { answers: ['since', 'as', 'because', 'for'], why: 'A reason for why catching up is pointless.' },
        { answers: ['no'], why: '<em>No matter how</em> + adjective = however.' },
        { answers: ['if', 'provided', 'providing', 'once'], why: 'A condition: <em>If/Provided you follow this advice…</em>.' }
      ]
    }] }
  ]
},
{
  id: 'wf', title: 'Word formation', short: 'Change the base word: prefix, suffix, part of speech.',
  exam: 'Cambridge C1 Advanced: Reading and Use of English, Part 3',
  instruction: 'Use the word in capitals to form a word that fits the gap.',
  strategy: `<ol><li>Decide what <strong>part of speech</strong> the gap needs (noun, adjective, adverb, verb) from the words around it.</li>
    <li>Then ask: <strong>positive or negative</strong>? A negative prefix (<em>un-, in-, im-, dis-, mis-</em>) is often needed. Check the meaning of the whole sentence.</li>
    <li>Then <strong>singular or plural</strong> for nouns; check spelling (<em>-y → -ie-</em>, doubled consonants).</li>
    <li>Sometimes two changes are needed (prefix + suffix): <em>unhappiness</em>.</li></ol>`,
  sets: [
    { title: 'Set 1: Cycling', items: [{
      type: 'passage', mode: 'wf', title: 'The bicycle comeback',
      text: 'Cycling to work was once seen as an {1} choice, made only by enthusiasts. But rising fuel prices and growing {2} about pollution have changed attitudes. City councils have responded with {3} cycle lanes, and the results have been {4}: journeys by bike have doubled. Commuters value the {5} of a journey that avoids traffic jams, and many report being {6} as well. However, cyclists still feel {7} at busy junctions, so the {8} to improve safety must continue.',
      gaps: [
        { base: 'convention', answers: ['unconventional'], why: 'An adjective before "choice"; negative meaning (not the usual choice): <em>unconventional</em>.' },
        { base: 'concern', answers: ['concern', 'concerns'], why: 'A noun after <em>growing</em>: <em>growing concern</em> (or <em>concerns</em>).' },
        { base: 'extend', answers: ['extensive', 'extended'], why: 'An adjective before <em>cycle lanes</em>. <em>Extensive</em> = covering a wide area.' },
        { base: 'impress', answers: ['impressive'], why: 'An adjective after <em>have been</em>: <em>impressive</em>.' },
        { base: 'reliable', answers: ['reliability'], why: 'A noun after <em>the</em>, followed by <em>of</em>: <em>the reliability of</em>.' },
        { base: 'health', answers: ['healthier', 'healthy'], why: 'Adjective after <em>being</em>: <em>healthier</em> (than before) or <em>healthy</em>.' },
        { base: 'safe', answers: ['unsafe'], why: 'After <em>feel</em> we need an adjective; the meaning is negative: <em>unsafe</em>.' },
        { base: 'commit', answers: ['commitment'], why: 'A noun after <em>the</em> + <em>to</em> infinitive: <em>the commitment to improve</em>.' }
      ]
    }] },
    { title: 'Set 2: Learning a language', items: [{
      type: 'passage', mode: 'wf', title: 'Learning a language as an adult',
      text: 'Many adults believe it is {1} to learn a new language after a certain age. Yet adults have important {2} over children, such as better study skills. They can compare grammar with their own language and often show greater {3}. The biggest obstacle is usually a lack of {4}, not ability. Learners who set {5} goals and practise {6} make far quicker progress. Mistakes should be seen as a {7} part of the process, rather than as a sign of {8}.',
      gaps: [
        { base: 'possible', answers: ['impossible'], why: 'An adjective after <em>is</em>; the belief is negative: <em>impossible</em>.' },
        { base: 'advantage', answers: ['advantages'], why: 'A plural noun after <em>important</em> (there are several): <em>advantages</em>.' },
        { base: 'determine', answers: ['determination'], why: 'An abstract noun after <em>greater</em>: <em>determination</em>.' },
        { base: 'motivate', answers: ['motivation'], why: '<em>A lack of</em> + noun.' },
        { base: 'real', answers: ['realistic'], why: 'An adjective before <em>goals</em>: <em>realistic</em>.' },
        { base: 'regular', answers: ['regularly'], why: 'An adverb modifying the verb <em>practise</em>.' },
        { base: 'nature', answers: ['natural'], why: 'An adjective before <em>part</em>: <em>a natural part</em>.' },
        { base: 'fail', answers: ['failure'], why: '<em>A sign of</em> + noun: <em>failure</em>.' }
      ]
    }] }
  ]
},
{
  id: 'kwt', title: 'Key word transformations', short: 'Rewrite a sentence with a given word, keeping the meaning.',
  exam: 'Cambridge C1 Advanced: Reading and Use of English, Part 4 · similar rewrite tasks in Linguaskill and many CertAcles exams',
  instruction: 'Complete the second sentence so that it means the same as the first. Use the key word without changing it. Use between two and five words.',
  strategy: `<ol><li>Identify the <strong>grammar structure</strong> being tested (passive, conditional, inversion, reported speech, modal…).</li>
    <li>The key word <strong>tells you</strong> which structure: <em>UNLESS</em> → conditional; <em>SAID</em> → reporting passive; <em>WISH</em> → regret.</li>
    <li>Write the answer, then check: same meaning, key word unchanged, right number of words.</li>
    <li>Never repeat words already in the second sentence outside the gap.</li></ol>`,
  sets: [
    { title: 'Set 1', items: [
      { type: 'kwt', first: 'She hasn\'t got as much experience as her colleague.', key: 'less', second: 'She has ___ her colleague.', answers: ['less experience than'], why: '<em>Less … than</em> replaces <em>not as much … as</em>.' },
      { type: 'kwt', first: '"Don\'t touch the wires," the electrician told us.', key: 'warned', second: 'The electrician ___ the wires.', answers: ['warned us not to touch', 'warned us against touching'], why: '<em>Warn someone (not) to do</em>: reported warning.' },
      { type: 'kwt', first: 'I\'m sure they didn\'t hear the alarm.', key: 'have', second: 'They ___ heard the alarm.', answers: ['can\'t have', 'cannot have', 'couldn\'t have'], why: 'Negative certainty about the past: <em>can\'t have</em> + participle.' },
      { type: 'kwt', first: 'Although the weather was terrible, they went hiking.', key: 'despite', second: '___ terrible weather, they went hiking.', answers: ['Despite the'], why: '<em>Despite</em> + noun phrase. It has no <em>of</em> (unlike <em>in spite of</em>).' },
      { type: 'kwt', first: 'People say that the mayor will resign.', key: 'said', second: 'The mayor ___ resign.', answers: ['is said to'], why: 'Reporting passive with a future idea: <em>is said to</em> + infinitive (or <em>is said to be going to</em>).' },
      { type: 'kwt', first: 'He didn\'t speak until the meeting had ended.', key: 'not', second: 'It ___ the meeting had ended that he spoke.', answers: ['was not until', 'wasn\'t until'], why: 'Cleft with <em>not until</em>: <em>It was not until … that…</em>' }
    ] },
    { title: 'Set 2', items: [
      { type: 'kwt', first: 'I\'d prefer you not to smoke here.', key: 'rather', second: 'I\'d ___ smoke here.', answers: ['rather you didn\'t', 'rather you did not'], why: '<em>Would rather</em> + different subject + past simple.' },
      { type: 'kwt', first: 'She succeeded in solving the puzzle after several attempts.', key: 'managed', second: 'She ___ the puzzle after several attempts.', answers: ['managed to solve'], why: '<em>Manage to</em> + infinitive = succeed in doing.' },
      { type: 'kwt', first: 'They succeeded because they worked hard.', key: 'thanks', second: 'They succeeded ___ hard work.', answers: ['thanks to their'], why: '<em>Thanks to</em> + noun: the cause of a positive result.' },
      { type: 'kwt', first: 'The last time I saw her was in 2015.', key: 'since', second: 'I haven\'t ___ 2015.', answers: ['seen her since'], why: '<em>Since</em> + a point in time with the present perfect.' },
      { type: 'kwt', first: 'Nobody has ever spoken to me so rudely.', key: 'never', second: '___ spoken to so rudely.', answers: ['Never have I been', 'Never before have I been'], why: 'Inversion after a fronted negative: <em>Never have I been</em>.' },
      { type: 'kwt', first: 'I didn\'t take the umbrella, so I got wet.', key: 'had', second: 'If ___ the umbrella, I wouldn\'t have got wet.', answers: ['I had taken', 'I had brought'], why: 'Third conditional: <em>If + past perfect</em>.' }
    ] },
    { title: 'Set 3', items: [
      { type: 'kwt', first: 'It is not likely that the plan will work.', key: 'unlikely', second: 'The plan ___ work.', answers: ['is unlikely to'], why: '<em>Be unlikely to</em> + infinitive.' },
      { type: 'kwt', first: 'He apologised for being late.', key: 'sorry', second: 'He said ___ late.', answers: ['he was sorry for being', 'he was sorry to be', 'he was sorry about being'], why: '<em>Be sorry for</em> + <em>-ing</em> or <em>to be</em>.' },
      { type: 'kwt', first: 'You are not permitted to smoke here.', key: 'allowed', second: 'Smoking ___ here.', answers: ['is not allowed', 'isn\'t allowed'], why: 'Passive: <em>be allowed</em>.' },
      { type: 'kwt', first: 'It\'s not worth arguing with him.', key: 'point', second: 'There ___ arguing with him.', answers: ['is no point in', '\'s no point in'], why: '<em>There is no point in</em> + <em>-ing</em>.' },
      { type: 'kwt', first: 'As soon as she saw him, she recognised him.', key: 'sooner', second: '___ seen him than she recognised him.', answers: ['No sooner had she'], why: '<em>No sooner had</em> + subject + participle … <em>than</em>.' },
      { type: 'kwt', first: 'Unless you apologise, she won\'t speak to you.', key: 'condition', second: 'She will speak to you ___ apologise.', answers: ['on condition that you', 'on condition you', 'only on condition that you', 'only on condition you'], why: '<em>On condition (that)</em> = only if.' }
    ] }
  ]
}
];
