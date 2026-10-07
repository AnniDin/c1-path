/* Practice sets, batch 10: Part 3 word formation (Sets 12-15) and Part 4 key word transformations (Sets 17-19). */
window.C1 = window.C1 || {};
(function () {
  const get = (id) => C1.practice.find((p) => p.id === id);
  const add = (id, set) => get(id).sets.push(set);
  C1._p9 = C1._p9 || {};
  ['wf', 'kwt'].forEach((id) => { C1._p9[id] = get(id).sets.length; });

  /* ---------- Word formation (Part 3) ---------- */
  add('wf', { title: 'Set 12: Sleep and teenagers', items: [{
    type: 'passage', mode: 'wf', title: 'Why teenagers cannot get up',
    text: 'Teenagers are often accused of {1} when they struggle to get out of bed, but scientists suggest that the {2} may be biological. During adolescence the body clock shifts, so young people feel {3} awake late at night. Early school start times therefore clash with natural rhythms, and an {4} to sleep enough is linked with poor concentration and low mood. Several schools that have started lessons later report {5} improvements in both attendance and results. Parents can help by limiting screen time before bed, although this is {6} easy when phones are part of daily life. Doctors stress that sleep is not an {7} but a basic need, and that its {8} should never be underestimated.',
    gaps: [
      { base: 'lazy', answers: ['laziness'], why: 'A noun after <em>accused of</em>: <em>laziness</em> (y becomes i before -ness).' },
      { base: 'explain', answers: ['explanation', 'explanations'], why: 'A noun after <em>the</em>: <em>explanation</em> (note the spelling change: explan-ation).' },
      { base: 'nature', answers: ['naturally'], why: 'An adverb modifying <em>awake</em>: <em>naturally</em>.' },
      { base: 'able', answers: ['inability'], why: 'A noun after <em>an</em>, followed by <em>to</em>; the meaning is negative: <em>inability</em> (able becomes ability).' },
      { base: 'notice', answers: ['noticeable'], why: 'An adjective before <em>improvements</em>. The <em>e</em> stays before <em>-able</em> after c: <em>noticeable</em>.' },
      { base: 'rare', answers: ['rarely'], why: 'An adverb of frequency before <em>easy</em>: <em>rarely easy</em> (= not often).' },
      { base: 'indulge', answers: ['indulgence'], why: 'A noun after <em>an</em> (the vowel sound makes <em>a</em> impossible): <em>indulgence</em>.' },
      { base: 'important', answers: ['importance'], why: 'A noun after the possessive <em>its</em>: <em>importance</em>.' }
    ]
  }] });

  add('wf', { title: 'Set 13: A restored railway line', items: [{
    type: 'passage', mode: 'wf', title: 'The line that came back',
    text: 'The branch line had been {1} for forty years when a group of volunteers decided to bring it back to life. Their {2} was met with {3} at first, since many locals thought the plan hopelessly {4}. Work was slow, and funds were always short. Yet the {5} of the old stations, the replacement of rotten sleepers and the {6} of a steam locomotive were achieved within a decade. Today the line carries tourists as well as commuters, and its {7} to the village economy is widely acknowledged. Visitors praise the {8} views, which can be enjoyed from the carriage windows.',
    gaps: [
      { base: 'use', answers: ['unused', 'disused'], why: 'A participle adjective after <em>had been</em>; negative meaning: <em>unused</em>.' },
      { base: 'ambitious', answers: ['ambition', 'ambitions'], why: 'A noun after the possessive <em>their</em>: <em>ambition</em> (the -ious ending is dropped).' },
      { base: 'sceptical', answers: ['scepticism', 'skepticism'], why: 'An uncountable noun after <em>met with</em>: <em>scepticism</em> (US <em>skepticism</em>).' },
      { base: 'realistic', answers: ['unrealistic'], why: 'An adjective after <em>hopelessly</em>; the plan seemed impossible: <em>unrealistic</em>.' },
      { base: 'restore', answers: ['restoration', 'restoring'], why: 'A noun after <em>the</em>, followed by <em>of</em>: <em>restoration</em> (the <em>e</em> disappears).' },
      { base: 'acquire', answers: ['acquisition', 'acquiring'], why: 'A noun in a list of noun phrases: <em>the acquisition of</em>.' },
      { base: 'contribute', answers: ['contribution'], why: 'A noun after the possessive <em>its</em>, followed by <em>to</em>: <em>contribution</em>.' },
      { base: 'breath', answers: ['breathtaking'], why: 'Two changes: <em>breath</em> + <em>take</em> + <em>-ing</em> gives the compound adjective <em>breathtaking</em>.' }
    ]
  }] });

  add('wf', { title: 'Set 14: The ethics of self-driving cars', items: [{
    type: 'passage', mode: 'wf', title: 'Who should the car protect?',
    text: 'The {1} of self-driving cars raises questions that engineers alone cannot answer, and the public debate has only just begun. If a collision is {2}, should the vehicle protect its passengers or pedestrians? Manufacturers are {3} to discuss such dilemmas openly, fearing that customers will lose {4} in the technology. Yet supporters argue that human drivers cause far more accidents, and that machines are {5} by fatigue or anger. Philosophers point out that {6} to save the most lives is not always the same as acting {7}. Governments must therefore establish clear {8} before cars take to the roads without a safety driver.',
    gaps: [
      { base: 'introduce', answers: ['introduction'], why: 'A noun after <em>the</em>, followed by <em>of</em>: <em>introduction</em> (introduc- becomes introduct-).' },
      { base: 'avoid', answers: ['unavoidable'], why: 'Two changes: an adjective after <em>is</em> with negative meaning (cannot be avoided): <em>unavoidable</em>.' },
      { base: 'willing', answers: ['unwilling'], why: 'An adjective after <em>are</em>, followed by <em>to</em>; the meaning is negative: <em>unwilling</em>.' },
      { base: 'confident', answers: ['confidence'], why: 'A noun after <em>lose</em>: <em>lose confidence in</em>.' },
      { base: 'affect', answers: ['unaffected'], why: 'A participle adjective followed by <em>by</em>; the meaning is negative (not influenced): <em>unaffected</em>.' },
      { base: 'decide', answers: ['deciding'], why: 'A gerund as the subject of the clause: <em>Deciding to save</em>.' },
      { base: 'moral', answers: ['morally'], why: 'An adverb after the verb <em>acting</em>: <em>acting morally</em>.' },
      { base: 'regulate', answers: ['regulations', 'regulation'], why: 'A noun after <em>clear</em>; usually plural: <em>regulations</em>.' }
    ]
  }] });

  add('wf', { title: 'Set 15: A museum\'s digital archive', items: [{
    type: 'passage', mode: 'wf', title: 'Opening the archive',
    text: 'The museum\'s decision to {1} its entire collection has transformed the way researchers work. Previously, access to fragile documents was {2}, and scholars often travelled long distances only to be refused. Now anyone can browse high-quality images, and the {3} of the website has been {4} praised. Curators admit that the project was extremely costly, but they believe it was {5} worth the expense. Not everyone is convinced, though. Some critics fear that online viewing will leave visitors {6} to see the real objects, and warn that the {7} of storage formats could put the archive at risk within a few decades, unless long-term {8} is guaranteed.',
    gaps: [
      { base: 'digital', answers: ['digitise', 'digitize'], why: 'A verb after <em>to</em>: <em>digitise</em> (suffix -ise makes a verb; US <em>digitize</em>).' },
      { base: 'limit', answers: ['limited'], why: 'A participle adjective after <em>was</em>: <em>limited</em> (= restricted).' },
      { base: 'usable', answers: ['usability'], why: 'A noun after <em>the</em>, followed by <em>of</em>: <em>usability</em> (-able becomes -ability).' },
      { base: 'wide', answers: ['widely'], why: 'An adverb before the participle <em>praised</em>: <em>widely praised</em>.' },
      { base: 'ultimate', answers: ['ultimately'], why: 'An adverb after <em>was</em>: <em>ultimately worth</em> (= in the end).' },
      { base: 'inclined', answers: ['disinclined'], why: 'An adjective after <em>leave visitors</em>, followed by <em>to</em>; the meaning is negative: <em>disinclined</em>.' },
      { base: 'obsolete', answers: ['obsolescence'], why: 'A noun after <em>the</em>, followed by <em>of</em>: <em>obsolescence</em> (formats becoming out of date).' },
      { base: 'fund', answers: ['funding'], why: 'An uncountable noun after the adjective <em>long-term</em>: <em>funding</em>.' }
    ]
  }] });

  /* ---------- Key word transformations (Part 4) ---------- */
  add('kwt', { title: 'Set 17: Everyday structures', items: [
    { type: 'kwt', first: 'We had only just sat down when the lights went out.', key: 'scarcely', second: '___ down when the lights went out.', answers: ['Scarcely had we sat'], why: 'Negative adverb at the start: inversion with the past perfect, <em>Scarcely had we sat … when</em>.' },
    { type: 'kwt', first: 'A mechanic serviced our car last week.', key: 'got', second: 'We ___ serviced last week.', answers: ['got our car', 'got the car'], why: 'Causative with <em>get</em>: <em>get + object + past participle</em> (someone else did the job).' },
    { type: 'kwt', first: 'People think that the painting was stolen in 1990.', key: 'thought', second: 'The painting ___ stolen in 1990.', answers: ['is thought to have been'], why: 'Reporting passive; the theft came before the thinking, so a perfect infinitive: <em>is thought to have been</em>.' },
    { type: 'kwt', first: 'I didn\'t accept the job, so I am not living in Oslo now.', key: 'would', second: 'If I had accepted the job, I ___ in Oslo now.', answers: ['would be living', 'would live'], why: 'Mixed conditional: past condition (<em>had accepted</em>), present result (<em>would be living</em>).' },
    { type: 'kwt', first: 'It is becoming harder and harder to find a parking space.', key: 'increasingly', second: 'Finding a parking space ___ difficult.', answers: ['is becoming increasingly', 'is getting increasingly', 'is increasingly'], why: '<em>Harder and harder</em> is expressed by <em>increasingly</em> + adjective after <em>become/get</em>.' },
    { type: 'kwt', first: 'You can borrow it if you promise to return it.', key: 'long', second: 'You can borrow it ___ to return it.', answers: ['as long as you promise', 'so long as you promise'], why: '<em>As long as</em> = on condition that, followed by a present tense clause.' }
  ] });

  add('kwt', { title: 'Set 18: Idiom and style', items: [
    { type: 'kwt', first: 'You really should start looking for a job.', key: 'high', second: 'It\'s ___ looking for a job.', answers: ['high time you started'], why: '<em>It\'s (high) time</em> + subject + past simple: something should be done now.' },
    { type: 'kwt', first: 'The box was so heavy that she could not lift it.', key: 'too', second: 'The box was ___ lift.', answers: ['too heavy for her to'], why: '<em>Too + adjective + (for someone) + to-infinitive</em> replaces <em>so … that … not</em>.' },
    { type: 'kwt', first: 'She spoke to the manager directly. She did not send an email.', key: 'instead', second: 'She spoke to the manager directly ___ an email.', answers: ['instead of sending'], why: '<em>Instead of</em> + gerund expresses the alternative that was rejected.' },
    { type: 'kwt', first: 'Nobody paid any attention to the warning.', key: 'notice', second: 'Nobody ___ the warning.', answers: ['took any notice of', 'took notice of'], why: 'Collocation: <em>take notice of</em> = pay attention to.' },
    { type: 'kwt', first: 'The idea occurred to me during the walk.', key: 'came', second: 'The idea ___ during the walk.', answers: ['came to me'], why: 'Collocation: an idea <em>comes to</em> someone (= occurs to them).' },
    { type: 'kwt', first: 'It is unusual for him to lose his temper.', key: 'seldom', second: '___ his temper.', answers: ['Seldom does he lose'], why: 'Negative adverb at the start of the sentence: inversion with <em>do</em> auxiliary.' }
  ] });

  add('kwt', { title: 'Set 19: Fine distinctions', items: [
    { type: 'kwt', first: 'If it hadn\'t been for your help, we would have failed.', key: 'but', second: '___ your help, we would have failed.', answers: ['But for'], why: '<em>But for</em> + noun = <em>if it had not been for</em> (a formal alternative).' },
    { type: 'kwt', first: 'People expect the new tunnel to open in May.', key: 'supposed', second: 'The new tunnel ___ open in May.', answers: ['is supposed to'], why: '<em>Be supposed to</em> expresses an expected plan or arrangement.' },
    { type: 'kwt', first: 'It was a mistake not to ask for advice.', key: 'ought', second: 'I ___ asked for advice.', answers: ['ought to have'], why: '<em>Ought to have</em> + participle: criticism of a past action (= should have).' },
    { type: 'kwt', first: 'My flat is half the size of hers.', key: 'twice', second: 'Her flat is ___ mine.', answers: ['twice the size of', 'twice as big as', 'twice as large as'], why: 'Multiples: <em>twice the size of</em> or <em>twice as + adjective + as</em>.' },
    { type: 'kwt', first: 'I can\'t understand what he is saying.', key: 'make', second: 'I can\'t ___ what he is saying.', answers: ['make out', 'make sense of', 'make head or tail of'], why: 'Collocation / phrasal verb: <em>make out</em> or <em>make sense of</em> = understand.' },
    { type: 'kwt', first: 'The company rejected her application.', key: 'turned', second: 'Her application ___ down by the company.', answers: ['was turned', 'got turned'], why: 'Phrasal verb in the passive: <em>was turned down</em> (reject).' }
  ] });
})();
