window.C1 = window.C1 || {}; C1.visuals = C1.visuals || {};
/* Drawings for the theory pages, second batch (see js/diagrams.js for the shapes). */
Object.assign(C1.visuals, {
  inversion: [
    { after: 'idea', type: 'compare', title: "Same facts, different effect",
      left: { title: "Normal order", items: ["I have never seen such courage.", "Neutral, everyday."], tone: 'neutral' },
      right: { title: "Inverted order", items: ["Never have I seen such courage.", "Formal and dramatic."], tone: 'ok' } },
    { after: 'part0', type: 'blocks', title: "Trigger first, then question order", rows: [
      { label: "Normal", parts: [{ t: "I", k: 'subj' }, { t: "have", k: 'aux' }, { t: "never", k: 'neg' }, { t: "seen", k: 'verb' }, { t: "such courage", k: 'obj' }] },
      { label: "Inverted", parts: [{ t: "Never", k: 'neg' }, { t: "have", k: 'aux' }, { t: "I", k: 'subj' }, { t: "seen", k: 'verb' }, { t: "such courage", k: 'obj' }] },
      { label: "No auxiliary: do appears", parts: [{ t: "Rarely", k: 'neg' }, { t: "does", k: 'aux' }, { t: "she", k: 'subj' }, { t: "complain", k: 'verb' }] }] },
    { after: 'part1', type: 'chooser', title: "Which pattern follows the opener?", rows: [
      { q: "Hardly / scarcely ...", a: "... when", ex: "Hardly had we sat down when the music stopped." },
      { q: "No sooner ...", a: "... than", ex: "No sooner had we sat down than the music stopped." },
      { q: "Not only ...", a: "auxiliary + subject", ex: "Not only did he lie, he also blamed me." },
      { q: "Only after / Not until ...", a: "inversion in the main clause", ex: "Only after the storm did we realise the damage." },
      { q: "Always, often, sometimes ...", a: "no inversion", ex: "She often complains." }] }
  ],

  conditionals: [
    { after: 'idea', type: 'scale', title: "Distance from reality", from: "Real", to: "Unreal and over",
      marks: [{ x: 12, label: "present simple", sub: "If I win, I'll buy a house." }, { x: 50, label: "past simple", sub: "If I won, I'd buy a house." }, { x: 88, label: "past perfect", sub: "If I had won... (too late)" }],
      say: "A past tense here is not about time: it signals distance from reality." },
    { after: 'part1', type: 'blocks', title: "Mixed: choose each half separately", rows: [
      { label: "Past cause, present result", parts: [{ t: "If I had taken that job", k: 'if' }, { t: "I would be living", k: 'main' }, { t: "in Paris now", k: 'time' }] },
      { label: "General trait, past result", parts: [{ t: "If she weren't so shy", k: 'if' }, { t: "she would have", k: 'main' }, { t: "introduced herself", k: 'verb' }, { t: "at the party", k: 'time' }] }] },
    { after: 'part2', type: 'compare', title: "Dropping if: formal inversion",
      left: { title: "With if", items: ["If I had known, I would have called."], tone: 'neutral' },
      right: { title: "Inverted (formal)", items: ["Had I known, I would have called.", "Only had, were and should can lead."], tone: 'ok' } }
  ],

  cleft: [
    { after: 'idea', type: 'compare', title: "Putting the news in the spotlight",
      left: { title: "Plain sentence", items: ["Someone broke the window."], tone: 'neutral' },
      right: { title: "It-cleft", items: ["It was Tom who broke the window.", "The focus comes right after was."], tone: 'ok' } },
    { after: 'part1', type: 'blocks', title: "Wh-cleft: headline, equals sign, focus", rows: [
      { label: "Wh-cleft", parts: [{ t: "What", k: 'wh' }, { t: "I need", k: 'subj' }, { t: "is", k: 'aux' }, { t: "a long holiday", k: 'obj' }] },
      { label: "With All", parts: [{ t: "All", k: 'wh' }, { t: "she wanted", k: 'subj' }, { t: "was", k: 'aux' }, { t: "some peace", k: 'obj' }] },
      { label: "Reversed wh-cleft", parts: [{ t: "A long holiday", k: 'obj' }, { t: "is what", k: 'aux' }, { t: "I need", k: 'subj' }] }] },
    { after: 'part2', type: 'chooser', title: "Which cleft?", rows: [
      { q: "Correct or contrast one detail", a: "It-cleft", ex: "It was Tuesday, not Monday, that he called." },
      { q: "Headline first, answer last", a: "Wh-cleft", ex: "What I need is a long holiday." },
      { q: "Start with the focus itself", a: "Reversed wh-cleft", ex: "A long holiday is what I need." },
      { q: "Give the reason", a: "The reason ... is that", ex: "The reason I left is that I was bored." }] }
  ],

  passive: [
    { after: 'idea', type: 'compare', title: "Choose what the story is about",
      left: { title: "Active", items: ["A company completed the bridge in 1998.", "The story is about the company."], tone: 'neutral' },
      right: { title: "Passive", items: ["The bridge was completed in 1998.", "The story is about the bridge."], tone: 'ok' } },
    { after: 'part0', type: 'blocks', title: "The tense lives in be", rows: [
      { label: "Past", parts: [{ t: "The bridge", k: 'subj' }, { t: "was", k: 'aux' }, { t: "built", k: 'verb' }, { t: "in 1998", k: 'time' }] },
      { label: "Future", parts: [{ t: "The bridge", k: 'subj' }, { t: "will be", k: 'aux' }, { t: "built", k: 'verb' }, { t: "next year", k: 'time' }] },
      { label: "In progress", parts: [{ t: "The bridge", k: 'subj' }, { t: "is being", k: 'aux' }, { t: "built", k: 'verb' }, { t: "now", k: 'time' }] },
      { label: "With a modal, in the past", parts: [{ t: "The work", k: 'subj' }, { t: "should have been", k: 'aux' }, { t: "done", k: 'verb' }] }] },
    { after: 'part2', type: 'chooser', title: "Infinitive after is said / believed", rows: [
      { q: "Same time as the saying", a: "to be", ex: "The company is said to be in trouble." },
      { q: "Earlier than the saying", a: "to have + participle", ex: "The company is believed to have lost millions." },
      { q: "In progress at that time", a: "to be + -ing", ex: "The company is thought to be losing money." }],
      say: "Earlier than the believing? Look back with to have + participle." }
  ],

  modals: [
    { after: 'idea', type: 'blocks', title: "The form after the modal gives the time", rows: [
      { label: "Present or future", parts: [{ t: "She", k: 'subj' }, { t: "must", k: 'aux' }, { t: "be", k: 'verb' }, { t: "tired", k: 'obj' }] },
      { label: "Happening now", parts: [{ t: "She", k: 'subj' }, { t: "must", k: 'aux' }, { t: "be working", k: 'verb' }] },
      { label: "Past", parts: [{ t: "She", k: 'subj' }, { t: "must", k: 'aux' }, { t: "have left", k: 'verb' }] }],
      say: "Two questions: how sure am I, and when?" },
    { after: 'part0', type: 'scale', title: "How sure are you? (positive deductions)", from: "Possible", to: "Almost sure",
      marks: [{ x: 14, label: "may / might / could", sub: "possibly" }, { x: 52, label: "should / ought to", sub: "probably" }, { x: 88, label: "must", sub: "almost sure" }],
      caption: "For a negative deduction use can't, not mustn't." },
    { after: 'part1', type: 'compare', title: "Two ways to say it wasn't necessary",
      left: { title: "needn't have + participle", items: ["You needn't have bought a gift.", "You did buy it, and it was unnecessary."], tone: 'neutral' },
      right: { title: "didn't need to + verb", items: ["I didn't need to buy a gift.", "Not necessary; we don't know if I bought one."], tone: 'neutral' } }
  ],

  wish: [
    { after: 'idea', type: 'timeline', title: "Which tense for a regret?", now: 50,
      marks: [{ x: 22, label: "wish + past perfect", sub: "not true then" }, { x: 50, label: "wish + past simple", sub: "not true now" }] },
    { after: 'part0', type: 'chooser', title: "What do you want to say?", rows: [
      { q: "Regret about now", a: "wish + past simple", ex: "I wish I had more time." },
      { q: "Regret about the past", a: "wish + past perfect", ex: "If only I hadn't said that." },
      { q: "Annoyed at someone's behaviour", a: "wish + would", ex: "I wish you would listen." },
      { q: "A preference about another person", a: "would rather + past", ex: "I'd rather you didn't smoke here." },
      { q: "It should already be done", a: "it's time + past", ex: "It's time we left." }] },
    { after: 'part1', type: 'compare', title: "Would is for change",
      left: { title: "wish + would: behaviour", items: ["I wish it would stop raining.", "Something that could change."], tone: 'ok' },
      right: { title: "wish + were: a state", items: ["I wish I were taller.", "Not: I wish I would be taller."], tone: 'neutral' } }
  ],

  participle: [
    { after: 'idea', type: 'blocks', title: "The same subject does both actions", rows: [
      { label: "Full clause", parts: [{ t: "While I was walking home", k: 'time' }, { t: "I", k: 'subj' }, { t: "saw", k: 'verb' }, { t: "an accident", k: 'obj' }] },
      { label: "Participle clause", parts: [{ t: "Walking home", k: 'time' }, { t: "I", k: 'subj' }, { t: "saw", k: 'verb' }, { t: "an accident", k: 'obj' }] }] },
    { after: 'part0', type: 'chooser', title: "Which form?", rows: [
      { q: "The subject does it, at the same time", a: "-ing", ex: "Walking home, I saw an accident." },
      { q: "It is done to the subject", a: "-ed", ex: "Built in 1880, the bridge is still in use." },
      { q: "It happened first", a: "having + -ed", ex: "Having finished the report, she went home." },
      { q: "A negative", a: "Not + -ing", ex: "Not knowing the way, we asked a stranger." }] },
    { after: 'part1', type: 'compare', title: "Check the subject",
      left: { title: "Dangling: wrong", items: ["Walking down the street, a car nearly hit me.", "The car was not walking."], tone: 'bad' },
      right: { title: "Same subject: right", items: ["Walking down the street, I was nearly hit by a car."], tone: 'ok' } }
  ],

  aspect: [
    { after: 'idea', type: 'chooser', title: "Choose your viewpoint", rows: [
      { q: "The event as a whole: a fact, a habit", a: "Simple", ex: "I live here." },
      { q: "In progress, temporary, unfinished", a: "Continuous", ex: "I'm living here." },
      { q: "Looking back from a point in time", a: "Perfect", ex: "I've lived here for years." }] },
    { after: 'part0', type: 'timeline', title: "Perfect: up to a point", now: 50,
      marks: [{ x: 6, label: "the film had started", sub: "before we arrived" }, { x: 25, to: 50, label: "I have lived here", sub: "up to now" }, { x: 84, label: "she will have retired", sub: "before 2030" }] },
    { after: 'part1', type: 'compare', title: "Result or activity?",
      left: { title: "Perfect simple", items: ["I've written three emails.", "Focus on result or quantity."], tone: 'neutral' },
      right: { title: "Perfect continuous", items: ["I've been writing emails all morning.", "Focus on activity or duration."], tone: 'neutral' } }
  ],

  relatives: [
    { after: 'idea', type: 'compare', title: "Two commas change who is punished",
      left: { title: "Defining: no commas", items: ["The students who cheated were expelled.", "Only the cheaters were expelled."], tone: 'neutral' },
      right: { title: "Non-defining: commas", items: ["The students, who cheated, were expelled.", "All the students cheated and were expelled."], tone: 'neutral' } },
    { after: 'part1', type: 'chooser', title: "Which pronoun?", rows: [
      { q: "A person, subject of the clause", a: "who or that", ex: "The man who called was your uncle." },
      { q: "A person, object, defining clause", a: "whom, who, that or nothing", ex: "The man I called was your uncle." },
      { q: "Belonging to", a: "whose", ex: "The novelist whose books I collect has died." },
      { q: "A whole previous clause", a: "which", ex: "He passed the exam at the first attempt, which surprised everyone." },
      { q: "A person, non-defining clause", a: "who (never that)", ex: "My brother, who lives in Leeds, is a chef." }] },
    { after: 'part2', type: 'blocks', title: "Reduced relative clauses", rows: [
      { label: "Full: passive", parts: [{ t: "The people", k: 'subj' }, { t: "who", k: 'wh' }, { t: "were", k: 'aux' }, { t: "invited", k: 'verb' }, { t: "to the launch", k: 'prep' }] },
      { label: "Reduced: -ed", parts: [{ t: "The people", k: 'subj' }, { t: "invited", k: 'verb' }, { t: "to the launch", k: 'prep' }] },
      { label: "Full: active", parts: [{ t: "Anyone", k: 'subj' }, { t: "who", k: 'wh' }, { t: "wishes", k: 'verb' }, { t: "to apply", k: 'obj' }] },
      { label: "Reduced: -ing", parts: [{ t: "Anyone", k: 'subj' }, { t: "wishing", k: 'verb' }, { t: "to apply", k: 'obj' }] }] }
  ],

  reporting: [
    { after: 'idea', type: 'blocks', title: "Told from a different place and time", rows: [
      { label: "Direct: said then", parts: [{ t: "I", k: 'subj' }, { t: "will", k: 'aux' }, { t: "help", k: 'verb' }, { t: "you", k: 'obj' }, { t: "tomorrow", k: 'time' }] },
      { label: "Reported: told now", parts: [{ t: "she", k: 'subj' }, { t: "would", k: 'aux' }, { t: "help", k: 'verb' }, { t: "me", k: 'obj' }, { t: "the next day", k: 'time' }] }],
      say: "A good reporting verb does the interpreting for you." },
    { after: 'part1', type: 'chooser', title: "Reporting verb families", rows: [
      { q: "Promise, offer, refuse, threaten", a: "verb + to + infinitive", ex: "He refused to sign." },
      { q: "Advise, warn, urge, remind, tell", a: "verb + object + to + inf.", ex: "She warned us not to go." },
      { q: "Admit, deny, suggest, recommend", a: "verb + -ing", ex: "He denied taking the money." },
      { q: "Accuse, blame, congratulate", a: "object + preposition + -ing", ex: "They accused her of lying." },
      { q: "Explain, point out, complain", a: "verb + that clause", ex: "He pointed out that we were late." }] },
    { after: 'part2', type: 'compare', title: "Reported questions keep statement order",
      left: { title: "Direct question", items: ["“Where do you live?”"], tone: 'neutral' },
      right: { title: "Reported question", items: ["She asked me where I lived.", "Statement order, no do."], tone: 'ok' } }
  ],

  patterns: [
    { after: 'idea', type: 'compare', title: "-ing looks at it, to looks ahead",
      left: { title: "-ing: a real action", items: ["He stopped smoking. (He gave up.)", "I remember locking the door."], tone: 'neutral' },
      right: { title: "to + infinitive: forward", items: ["He stopped to smoke. (To light one.)", "Remember to lock the door."], tone: 'neutral' } },
    { after: 'part0', type: 'chooser', title: "Same verb, different meaning", rows: [
      { q: "Remember: a past event", a: "remember + -ing", ex: "I remember locking the door." },
      { q: "Remember: a task ahead", a: "remember + to", ex: "Remember to lock the door." },
      { q: "Try: an experiment", a: "try + -ing", ex: "Try adding salt." },
      { q: "Try: an effort", a: "try + to", ex: "I tried to lift it." },
      { q: "Regret: formal news", a: "regret + to", ex: "We regret to inform you that..." }] },
    { after: 'part1', type: 'compare', title: "To can be a preposition",
      left: { title: "Preposition + -ing", items: ["I look forward to seeing you.", "I'm used to working here.", "Test: can a noun go there?"], tone: 'ok' },
      right: { title: "Common errors", items: ["Not: I look forward to see you.", "Not: I'm used to work here."], tone: 'bad' } }
  ],

  determiners: [
    { after: 'idea', type: 'compare', title: "One small word, different news",
      left: { title: "a / an", items: ["I saw a man.", "New to the listener."], tone: 'neutral' },
      right: { title: "the", items: ["I saw the man.", "The listener knows which one."], tone: 'neutral' } },
    { after: 'part1', type: 'scale', title: "How much? Quantifiers", from: "almost none", to: "a lot",
      marks: [{ x: 8, label: "hardly any", sub: "almost none" }, { x: 30, label: "few / little", sub: "a problem" }, { x: 58, label: "a few / a little", sub: "enough to be useful" }, { x: 90, label: "plenty of", sub: "a lot" }] },
    { after: 'part2', type: 'chooser', title: "Which determiner?", rows: [
      { q: "Exactly two things", a: "both, either, neither", ex: "Neither of them was late." },
      { q: "Three or more, not one", a: "none of", ex: "None of the four shops had it." },
      { q: "All of a group, three or more", a: "every + singular verb", ex: "Every student has a locker." },
      { q: "An offer or a request", a: "some", ex: "Would you like some tea?" },
      { q: "A question or a negative", a: "any", ex: "Have you got any questions?" }] }
  ],

  comparison: [
    { after: 'idea', type: 'scale', title: "Size of the difference", from: "small gap", to: "big gap",
      marks: [{ x: 10, label: "a bit", sub: "a bit cheaper" }, { x: 36, label: "slightly", sub: "slightly warmer" }, { x: 64, label: "much", sub: "much easier" }, { x: 90, label: "far", sub: "far more expensive" }] },
    { after: 'part0', type: 'compare', title: "Never very before a comparative",
      left: { title: "Wrong", items: ["Not: very better", "Not: very cheaper"], tone: 'bad' },
      right: { title: "Right", items: ["much better", "far cheaper"], tone: 'ok' } },
    { after: 'part1', type: 'blocks', title: "The ... the ...: two comparatives", rows: [
      { label: "Practice and progress", parts: [{ t: "The more", k: 'adv' }, { t: "you", k: 'subj' }, { t: "practise", k: 'verb' }, { t: "the better", k: 'adv' }, { t: "you", k: 'subj' }, { t: "become", k: 'verb' }] },
      { label: "Leaving and arriving", parts: [{ t: "The sooner", k: 'adv' }, { t: "we", k: 'subj' }, { t: "leave", k: 'verb' }, { t: "the earlier", k: 'adv' }, { t: "we'll", k: 'subj' }, { t: "arrive", k: 'verb' }] }] }
  ],

  future: [
    { after: 'idea', type: 'chooser', title: "Same event, different attitude", rows: [
      { q: "I have just decided", a: "will", ex: "I'll see the doctor." },
      { q: "It is my plan", a: "be going to", ex: "I'm going to see the doctor." },
      { q: "It is a fixed arrangement", a: "present continuous", ex: "I'm seeing the doctor at four." },
      { q: "It is on a timetable", a: "present simple", ex: "The train leaves at 6.15." }] },
    { after: 'part0', type: 'timeline', title: "Three more forms on the timeline", now: 10,
      marks: [{ x: 28, label: "is about to start", sub: "the immediate future" }, { x: 56, label: "I'll be flying", sub: "in progress, this time tomorrow" }, { x: 86, label: "will have retired", sub: "finished before 2030" }] },
    { after: 'part1', type: 'compare', title: "No will after time words",
      left: { title: "Present tense: right", items: ["I'll call you when I arrive.", "I'll call you as soon as I've finished."], tone: 'ok' },
      right: { title: "will after when: wrong", items: ["Not: I'll call you when I will arrive."], tone: 'bad' } }
  ],

  formal: [
    { after: 'part0', type: 'blocks', title: "The bare verb: no tense, no -s", rows: [
      { label: "After essential that", parts: [{ t: "It is essential that", k: 'note' }, { t: "every student", k: 'subj' }, { t: "be", k: 'verb' }, { t: "present", k: 'obj' }] },
      { label: "After recommend", parts: [{ t: "The board recommended", k: 'note' }, { t: "that she", k: 'subj' }, { t: "resign", k: 'verb' }] },
      { label: "Negative: not, no do", parts: [{ t: "It is vital that", k: 'note' }, { t: "he", k: 'subj' }, { t: "not", k: 'neg' }, { t: "be told", k: 'verb' }] }] },
    { after: 'part1', type: 'chooser', title: "Formal openers", rows: [
      { q: "An unreal situation", a: "Were + subject + to", ex: "Were the company to go bankrupt, hundreds would lose their jobs." },
      { q: "A possibility", a: "Should + subject", ex: "Should you need help, call." },
      { q: "An unreal past", a: "Had + subject", ex: "Had I known, I'd have come." },
      { q: "Whatever happens", a: "come what may", ex: "Come what may, we will stand by our decision." }] },
    { after: 'part2', type: 'compare', title: "Insist: should be done or is true?",
      left: { title: "Demand: bare verb", items: ["She insisted that he go to hospital.", "She demanded it."], tone: 'ok' },
      right: { title: "Claim: normal tense", items: ["She insisted that he was innocent.", "She claimed it was true."], tone: 'neutral' },
      say: "Ask: is it what should be done, or what is true?" }
  ]
});
