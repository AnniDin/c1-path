window.C1 = window.C1 || {};
C1.listening = C1.listening || [];
/* Listening sets 8 (demanding): a radio debate on urban farming, a lecture on memory myths, an interview with an architect, a budget meeting. */
C1.listening.push(
  {
    id: "debate-urban-farming",
    title: "Should cities grow their own food?",
    format: "Radio debate with three speakers",
    examPart: "Part 3/4 style: interruptions, concessions and a final shift of position",
    intro: "You will hear a radio presenter chairing a debate between Gemma, who runs a rooftop growing project, and Oliver, a planning consultant. Listen for what each speaker concedes and how their positions change.",
    script: [
      { who: "Presenter", text: "Welcome to Open Ground. Tonight: should councils give empty land and rooftops over to urban farming? With me are Gemma, who runs a rooftop growing project, and Oliver, a planning consultant. Gemma, you first." },
      { who: "Gemma", text: "Thanks. The case is simple, really. Food travels too far, cities have acres of wasted space, and people who grow together look after their neighbourhoods. We've supplied four hundred households from one car park roof." },
      { who: "Oliver", text: "Four hundred households getting a bag of salad leaves a week. Let's not confuse a lovely community project with food security." },
      { who: "Gemma", text: "I never said it replaced supermarkets, I said..." },
      { who: "Oliver", text: "No, but the council's leaflet does. And land isn't free. A hectare in the centre is worth millions, so we'd be choosing allotments over homes." },
      { who: "Gemma", text: "Housing matters, of course it does. But most of what I'm asking for is roofs and verges, not sites you could build on." },
      { who: "Presenter", text: "Oliver, is that a fair distinction?" },
      { who: "Oliver", text: "Partly. Roofs, I'll concede, are a better argument than fields. Although most old roofs can't take the weight of soil without strengthening, and somebody has to pay for that." },
      { who: "Gemma", text: "Which is why we use lightweight growing bags. It costs a fraction." },
      { who: "Oliver", text: "For lettuces, yes. Not for anything you'd call a meal." },
      { who: "Presenter", text: "Gemma, the charge is that this is a feel-good hobby." },
      { who: "Gemma", text: "A hobby? Eleven of our volunteers have since found catering jobs through the scheme. But I'll be honest, the yields are small. If anyone told you it would feed a city, you'd have been misled." },
      { who: "Oliver", text: "That's refreshingly candid. It's more than the council's managed." },
      { who: "Presenter", text: "So where does that leave the policy?" },
      { who: "Oliver", text: "I came in meaning to say scrap it. But if the money went on roof surveys first, and schemes were judged on training rather than tonnes of vegetables, I could back that. What I can't support is handing over the empty plots." },
      { who: "Gemma", text: "Which I'd never ask for. Well, perhaps one site, the old depot, but only until building starts." },
      { who: "Presenter", text: "Closing thoughts, briefly." },
      { who: "Gemma", text: "I've shifted a little. I'd sooner lose the food claims than the training." },
      { who: "Oliver", text: "And I'd sooner have a flawed scheme on a roof than a fight over a field." }
    ],
    skills: "Tracking concessions and counter-concessions, separating who proposes what, and noticing that both speakers move towards the middle by the end.",
    questions: [
      { type: "mcq", q: "What is Oliver implying when he says 'Let's not confuse a lovely community project with food security'?", options: ["That Gemma has been careless with her figures.", "That the project costs too much for the council to support.", "That the project is worthwhile but is being presented as more important than it is.", "That Gemma wants rooftop farms to replace supermarkets."], answer: 2, why: "He calls the project <em>lovely</em> and then blames <em>the council's leaflet</em> for the bigger claim, so his target is exaggeration, not the project. D is what Oliver suggests others imply; Gemma actually replies <em>I never said it replaced supermarkets</em>." },
      { type: "mcq", q: "What does Gemma admit in the middle of the debate?", options: ["That the claims made for urban farming can be overstated.", "That none of her volunteers has found work through the scheme.", "That most old roofs cannot carry soil.", "That housing should always come before growing space."], answer: 0, why: "<em>I'll be honest, the yields are small. If anyone told you it would feed a city, you'd have been misled.</em> The roof-weight point is Oliver's (C), she says eleven volunteers found jobs (B), and <em>housing matters</em> is a courtesy, not a priority ranking (D)." },
      { type: "mcq", q: "Who first suggests judging schemes by training rather than by the amount of food produced?", options: ["Gemma, in her closing remarks.", "The presenter.", "The council's leaflet.", "Oliver."], answer: 3, why: "Oliver says <em>schemes were judged on training rather than tonnes of vegetables</em>. Gemma only repeats the idea at the end (<em>I'd sooner lose the food claims than the training</em>), which is why A is tempting." },
      { type: "mcq", q: "How does Oliver react to Gemma's point about roofs and verges?", options: ["He rejects it because city land is worth millions.", "He accepts the distinction but raises an objection about cost.", "He agrees completely and drops his opposition.", "He claims her growing bags are too heavy."], answer: 1, why: "<em>Roofs, I'll concede, are a better argument than fields. Although...</em> he then mentions strengthening that <em>somebody has to pay for</em>. The land-value point (A) was about sites, and lightweight bags are Gemma's solution, not a problem he raises (D)." },
      { type: "mcq", q: "How has Gemma's position changed by the end?", options: ["She now wants the depot built on at once.", "She now accepts that housing matters more than her project.", "She would give up the food-supply claims before the training.", "She wants the council to stop promoting the scheme."], answer: 2, why: "<em>I'd sooner lose the food claims than the training.</em> She asks for the depot only <em>until building starts</em>, which is not the same as wanting it built on (A), and she never ranks housing above her scheme (B)." },
      { type: "mcq", q: "What is Oliver's final position?", options: ["He would support schemes judged on training, funded after roof surveys, but not the use of empty plots.", "He still wants the whole policy scrapped.", "He supports use of the empty plots but not roofs.", "He now backs the policy without conditions."], answer: 0, why: "<em>I came in meaning to say scrap it</em> shows he began opposed, but he would <em>back that</em> if surveys came first and success meant training, while <em>What I can't support is handing over the empty plots</em>. His last line, <em>a flawed scheme on a roof</em>, confirms a conditional, partial change." }
    ]
  },
  {
    id: "lecture-memory-myths",
    title: "Three myths about memory",
    format: "University seminar: lecturer and student",
    examPart: "Part 2/3 style: qualified claims, hedging and imprecise paraphrase",
    intro: "You will hear Dr Hill, a psychology lecturer, discussing three popular beliefs about memory with a student, Dan. Listen carefully to exactly what Dr Hill claims, and to how Dan's summaries differ from it.",
    script: [
      { who: "Dr Hill", text: "Right, today I'll deal with three beliefs I hear every year from first-years. Please hold my corrections loosely. First: that memory works like a video recording." },
      { who: "Dan", text: "So it doesn't? I thought we store everything and just struggle to retrieve it." },
      { who: "Dr Hill", text: "That's the popular version, Dan, and it's mostly wrong. Retrieval isn't playback, it's reconstruction. In one classic study, about a third of participants came to accept a childhood event that never happened, after a few gentle prompts. About a third, mind, and it depends heavily on how the questions are asked." },
      { who: "Dan", text: "So a third of people have false memories." },
      { who: "Dr Hill", text: "No. A third of people in that study, in that condition, accepted one suggested event. Quite different. Second belief: the more confident a witness is, the more accurate they are." },
      { who: "Dan", text: "Which is true, surely, or courts wouldn't weigh it." },
      { who: "Dr Hill", text: "Courts have, and it's a worry. Confidence at the first identification tells you something, provided the procedure was fair. But confidence months later, after the witness has been told they chose well, is a poor guide. So it depends when you measure it." },
      { who: "Dan", text: "So confidence is useless as evidence." },
      { who: "Dr Hill", text: "I said poor later on, not useless. Be careful with that. Third: that brain-training games make you better at remembering in general." },
      { who: "Dan", text: "I've got an app. My scores doubled in a month." },
      { who: "Dr Hill", text: "And I'd bet you got much better at the game. People improve at the trained tasks, but the benefit for unrelated memory is small, a few per cent at most in the larger reviews, and it often fades within months." },
      { who: "Dan", text: "So the apps are a waste of money." },
      { who: "Dr Hill", text: "I wouldn't go that far. If you enjoy it, fine. Just don't expect it to help you remember where you parked." },
      { who: "Dan", text: "Right. So what does help?" },
      { who: "Dr Hill", text: "Spacing your practice. Dull, I know. Revising over three evenings beats three hours in one sitting, by a good margin, though not for every kind of material." },
      { who: "Dan", text: "So no more all-nighters." },
      { who: "Dr Hill", text: "Fewer, as a rule. For an exam tomorrow, cramming can work. It's what you still remember in June that suffers." }
    ],
    skills: "Hearing the exact scope of a claim (about a third, in that condition, a few per cent) and spotting when a paraphrase turns a qualified statement into an absolute one.",
    questions: [
      { type: "mcq", q: "What mistake does Dan make when he says 'So a third of people have false memories'?", options: ["He believes memory works like a recording.", "He turns a result from one study and one condition into a general claim.", "He thinks only a third of people can retrieve memories.", "He ignores that the study asked about adult events."], answer: 1, why: "Dr Hill replies <em>A third of people in that study, in that condition, accepted one suggested event. Quite different.</em> A is Dan's earlier belief, not this error, and the study concerned childhood events, not adult ones (D)." },
      { type: "mcq", q: "What is Dr Hill's view of witness confidence?", options: ["It is the best guide courts have.", "It is worthless in every case.", "It only matters if the witness is sure months later.", "It is informative early on with a fair procedure, but unreliable later."], answer: 3, why: "<em>Confidence at the first identification tells you something, provided the procedure was fair. But confidence months later... is a poor guide.</em> Option C reverses this, and Dan's <em>useless</em> is the overstatement she corrects." },
      { type: "mcq", q: "Why does Dr Hill respond as she does to Dan's score of doubling?", options: ["She thinks he has improved at the game, not at remembering in general.", "She doubts that his scores really doubled.", "She thinks the app has damaged his memory.", "She believes the improvement will last for years."], answer: 0, why: "<em>I'd bet you got much better at the game</em>, followed by <em>the benefit for unrelated memory is small</em>. She never doubts the figure (B), and benefits <em>often fade within months</em>, so D is the opposite of her claim." },
      { type: "mcq", q: "Which of Dan's summaries does Dr Hill correct by pointing back to a word she had used earlier?", options: ["'So no more all-nighters.'", "'So the apps are a waste of money.'", "'So confidence is useless as evidence.'", "'So a third of people have false memories.'"], answer: 2, why: "She had said confidence was a <em>poor guide</em> only <em>later on</em>, and objects: <em>I said poor later on, not useless.</em> The other three get different replies: <em>No. A third of people in that study...</em>, <em>I wouldn't go that far</em> and <em>Fewer, as a rule</em>." },
      { type: "mcq", q: "What is Dr Hill's attitude to cramming?", options: ["She says it never works.", "She says it can work in the short term but harms long-term recall.", "She recommends it for most material.", "She says it works for every kind of material."], answer: 1, why: "<em>For an exam tomorrow, cramming can work. It's what you still remember in June that suffers.</em> Her claim about spacing was also qualified: <em>not for every kind of material</em>, which rules out D." },
      { type: "mcq", q: "What is the lecturer's general approach to the beliefs she discusses?", options: ["She dismisses each one completely.", "She accepts each one with small changes.", "She challenges them with figures and conditions rather than blanket denials.", "She asks Dan to decide which are true."], answer: 2, why: "Her phrases <em>mostly wrong</em>, <em>it depends</em>, <em>a few per cent at most</em> and <em>I wouldn't go that far</em> show qualified correction. She opens by asking students to <em>hold my corrections loosely</em>, which is incompatible with complete dismissal (A)." }
    ]
  },
  {
    id: "interview-architect",
    title: "The building nobody loves",
    format: "Radio interview with an architect",
    examPart: "Part 3/4 style: irony, understatement, face-saving and avoided questions",
    intro: "You will hear a presenter interviewing Rashid, the architect of a controversial civic centre. Listen for what he implies rather than states, and for the questions he avoids.",
    script: [
      { who: "Presenter", text: "With me is Rashid, architect of the Marlow Exchange, the civic centre which one poll recently named the least loved building in the city. Rashid, welcome." },
      { who: "Rashid", text: "Thank you. It's always lovely to be introduced with such warmth." },
      { who: "Presenter", text: "Well, let's start there. Did the poll surprise you?" },
      { who: "Rashid", text: "Surprise is a strong word. I'd say it confirmed that people feel entitled to an opinion about a building they pass every day, which is no bad thing." },
      { who: "Presenter", text: "Many of them call it the Toaster." },
      { who: "Rashid", text: "So I've heard. Toasters are, I believe, quite popular household objects." },
      { who: "Presenter", text: "But did you design it to look like one?" },
      { who: "Rashid", text: "The brief asked for something robust, fireproof and cheap to heat. Whether the committee also wanted it loved is a question for the committee." },
      { who: "Presenter", text: "You wanted copper cladding, I understand." },
      { who: "Rashid", text: "I did, until the budget was cut by a third in the second year. Then the panels you see became, shall we say, the practical choice." },
      { who: "Presenter", text: "So the cladding wasn't your decision?" },
      { who: "Rashid", text: "I wouldn't put it like that. Every design is a negotiation, and I signed the drawings. The building is mine in the way a compromise belongs to everyone who made it." },
      { who: "Presenter", text: "Critics say the entrance is dark and unwelcoming." },
      { who: "Rashid", text: "It gets less light than I'd hoped in winter. The planners moved it back from the road, which is why, but the staff tell me the offices are warm, and that's something." },
      { who: "Presenter", text: "Would you build it again?" },
      { who: "Rashid", text: "Not that building, no. That spot, certainly. And I don't think the city's been unfair. I think it's been early. Concrete tends to be forgiven around its fiftieth birthday." },
      { who: "Presenter", text: "So you expect it to be loved eventually?" },
      { who: "Rashid", text: "I expect it to be defended. Usually when someone proposes knocking it down." },
      { who: "Presenter", text: "And what would you change?" },
      { who: "Rashid", text: "The money, mostly. Possibly the colour. But please don't quote me on the colour. The committee chose it, and I'm still invited to dinner there." }
    ],
    skills: "Reading irony and understatement, recognising when a question is deflected, and inferring who a speaker blames while he avoids saying so.",
    questions: [
      { type: "mcq", q: "What does Rashid imply by 'It's always lovely to be introduced with such warmth'?", options: ["That he found the introduction slightly unfair.", "That he is delighted by the poll result.", "That he has no strong feelings about the poll.", "That the presenter has misunderstood the poll."], answer: 0, why: "The introduction was blunt (<em>least loved building</em>), so his <em>lovely</em> and <em>warmth</em> are ironic. He answers politely, so he is not openly angry, but he is not delighted either (B)." },
      { type: "mcq", q: "How does Rashid deal with the question 'did you design it to look like one?'", options: ["He admits that he did.", "He denies it forcefully.", "He avoids answering and points to the brief and the committee.", "He says that toasters are admired."], answer: 2, why: "The presenter asks directly, but he talks about the brief and says <em>a question for the committee</em>. His toaster joke came earlier and answered nothing; it does not mean he says toasters are admired (D)." },
      { type: "mcq", q: "What does Rashid suggest about the cladding?", options: ["That it was exactly what he wanted.", "That the committee's budget cut changed it, but he accepts formal responsibility.", "That the planners insisted on it.", "That he refuses to take any responsibility for it."], answer: 1, why: "<em>Until the budget was cut by a third... the practical choice</em> hints at blame, yet <em>I signed the drawings</em> accepts it. The planners are blamed for the entrance, not the cladding (C)." },
      { type: "mcq", q: "What does Rashid mean by 'I expect it to be defended'?", options: ["That he wants to protect it against demolition.", "That critics will gradually come to love it.", "That the building will be fifty years old soon.", "That people will only value it when it is under threat."], answer: 3, why: "<em>Usually when someone proposes knocking it down</em> implies love arrives only with the threat of loss. The <em>fiftieth birthday</em> remark is a separate point about forgiveness, not his answer here (C), and he stops short of predicting affection (B)." },
      { type: "mcq", q: "Why does Rashid ask not to be quoted on the colour?", options: ["He is embarrassed by his own choice of colour.", "He thinks the colour is the building's main fault.", "He wants to avoid offending the committee, whom he still deals with.", "He believes the colour will be changed."], answer: 2, why: "<em>The committee chose it, and I'm still invited to dinner there</em> is humorous but shows he values the relationship. The colour was the committee's choice, so he is not embarrassed by his own (A), and <em>possibly</em> shows it is not his main complaint (B), unlike <em>the money, mostly</em>." },
      { type: "mcq", q: "What is Rashid's overall attitude to the criticism of the building?", options: ["He is angry and bitter about it.", "He agrees entirely that the building failed.", "He thinks the public has judged too early, while privately blaming budget and planning decisions.", "He considers the critics ignorant."], answer: 3, why: "<em>I don't think the city's been unfair. I think it's been early</em> together with the budget and planners remarks. He never calls critics ignorant: he says people are <em>entitled to an opinion</em>, and his manner is dry, not bitter (A)." }
    ]
  },
  {
    id: "meeting-budget-cuts",
    title: "Which project goes?",
    format: "Work meeting with four speakers",
    examPart: "Part 3/4 style: changing positions and an implied decision",
    intro: "You will hear four colleagues, Helen, Mark, Priya and Callum, deciding which of three projects to cut. Listen for who changes position and what is finally agreed.",
    script: [
      { who: "Helen", text: "Right, we have to cut one of three projects and save at least a hundred and twenty thousand pounds by March. The portal redesign, the warehouse scanners or the training academy. Mark, you first." },
      { who: "Mark", text: "I'd drop the portal. It's the most expensive, and customers haven't complained about the old one." },
      { who: "Priya", text: "They haven't complained because they've stopped using it. Calls to the helpline are up twenty per cent since spring." },
      { who: "Mark", text: "Calls are up because of the billing error, not the portal." },
      { who: "Priya", text: "Partly. I wouldn't bet the whole redesign on that, though." },
      { who: "Callum", text: "Can I come in? From the warehouse side, the scanners are the one thing I can't live without. We lose about three pallets a week." },
      { who: "Helen", text: "Three pallets. That's a few thousand pounds?" },
      { who: "Callum", text: "Roughly eight thousand a month, and that's only the goods, not the hours spent searching." },
      { who: "Mark", text: "Which is why the academy's the soft target. Nobody's job depends on it." },
      { who: "Priya", text: "Staff retention does. We lost six new starters this year, and the academy's meant to fix that." },
      { who: "Mark", text: "Meant to. The first cohort doesn't finish until next summer, so we can't show it works." },
      { who: "Helen", text: "Callum, could you accept the scanners being delayed rather than cut?" },
      { who: "Callum", text: "A few months, I could just about manage. Past the summer, no." },
      { who: "Mark", text: "Then maybe I've been looking at this wrongly. If the scanners are safe, and Priya's right about the helpline, I'd rather halve the portal than drop it." },
      { who: "Priya", text: "Halving it saves what, sixty thousand? We need a hundred and twenty." },
      { who: "Helen", text: "Which leaves sixty to find. Mark, if the academy ran one cohort instead of two?" },
      { who: "Mark", text: "I could live with that. Priya?" },
      { who: "Priya", text: "Reluctantly. As long as the six leavers are tracked, and I'm allowed to say so in March." },
      { who: "Helen", text: "Good. I'll draw up the numbers and we'll see whether it adds up." }
    ],
    skills: "Following shifting positions across four voices, separating proposals from agreements, and recognising a decision that is implied rather than announced.",
    questions: [
      { type: "mcq", q: "Why does Priya say 'They haven't complained because they've stopped using it'?", options: ["She wants the helpline closed.", "She accepts that the old portal is fine.", "She thinks the billing error caused the problem.", "She is challenging Mark's reason for cutting the portal."], answer: 3, why: "Mark's reason was that <em>customers haven't complained</em>, and she answers with the helpline figure to undermine it. The billing error is Mark's explanation, not hers (C): she says <em>Partly</em>." },
      { type: "mcq", q: "Which speaker changes position most during the meeting?", options: ["Callum, who first says the scanners are essential and then drops them.", "Mark, who first wants the portal dropped and then wants it halved.", "Priya, who first defends the academy and then wants it cut.", "Helen, who first favours the scanners and then the portal."], answer: 1, why: "Mark begins <em>I'd drop the portal</em> and later says <em>I'd rather halve the portal than drop it</em>. Callum's accepted delay is not abandoning the scanners (A), and Priya ends reluctantly keeping the academy, with conditions (C)." },
      { type: "mcq", q: "What condition does Callum attach to a delay of the scanners?", options: ["That it lasts no longer than the summer.", "That he gets sixty thousand pounds.", "That the academy is cut instead.", "That his team is retrained first."], answer: 0, why: "<em>A few months, I could just about manage. Past the summer, no.</em> The sixty thousand figure belongs to the portal saving and Priya's calculation, not to him." },
      { type: "mcq", q: "Why does Mark call the academy 'the soft target'?", options: ["Because the academy has failed to stop staff leaving.", "Because nobody in the company supports it.", "Because it costs the most of the three projects.", "Because he believes its value can't yet be shown."], answer: 3, why: "He says <em>Nobody's job depends on it</em> and then <em>we can't show it works</em>. The portal, not the academy, was called <em>the most expensive</em> (C), and Priya, not Mark, mentions the six leavers (A)." },
      { type: "mcq", q: "What outcome does the conversation imply?", options: ["The scanners will be cut.", "The academy will be cancelled completely.", "The portal will be halved, the academy will run one cohort, and the scanners will be kept.", "The portal will be dropped completely."], answer: 2, why: "Mark proposes halving the portal, Helen suggests one cohort for the academy and Callum's delay is possible. Helen says only <em>I'll draw up the numbers</em>, so the decision is implied rather than announced. Dropping the portal was Mark's first position, now abandoned." },
      { type: "mcq", q: "How does Priya feel about the final arrangement?", options: ["Delighted that the academy is protected.", "Reluctantly accepting, with a condition attached.", "Strongly opposed to any change.", "Indifferent, since the portal is her only concern."], answer: 1, why: "<em>Reluctantly. As long as the six leavers are tracked, and I'm allowed to say so in March.</em> She is not delighted (A), since the academy loses a cohort, and she is not opposed, because she agrees." }
    ]
  }
);
