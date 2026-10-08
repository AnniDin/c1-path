window.C1 = window.C1 || {};
C1.listening = C1.listening || [];
/* Listening sets 9 (demanding): a phone-in on charging for rubbish, a history seminar, an interview with an ecologist, a workplace presentation with a sceptical question. */
C1.listening.push(
  {
    id: "phonein-rubbish-weight",
    title: "Paying for rubbish by weight",
    format: "Radio phone-in with a presenter and two callers",
    examPart: "Part 3/4 style: polite disagreement, concessions and a shift of position",
    intro: "You will hear a presenter taking calls on whether households should pay for their rubbish by weight. Harriet is in favour and Neil has doubts. Listen for what each caller concedes and for what Harriet finally says about her own view.",
    script: [
      { who: "Presenter", text: "Welcome to Call Back. Today's question is whether households should pay for their rubbish by weight. Our first caller is Harriet, who lives in a market town, and she is joined by Neil from a village nearby. Harriet, over to you." },
      { who: "Harriet", text: "Thanks. I'm in favour, and I'll tell you why. The council next door started weighing bins two years ago, and general waste fell by a third. People suddenly noticed how much packaging they were throwing away." },
      { who: "Neil", text: "I don't dispute the figure, Harriet. I'd just like to know where the other third went, because on our lane it went into the hedge and in front of the field gates." },
      { who: "Harriet", text: "Dumping did rise at first, I'll grant you that. But the council says it levelled off after about six months." },
      { who: "Neil", text: "Levelled off higher than before, if the local paper is right. And in a village where the lorry only comes every fortnight, charging the people who are already careful seems odd." },
      { who: "Presenter", text: "Harriet, is that fair?" },
      { who: "Harriet", text: "Partly. Careful households are exactly the ones who gain, because they pay less. The ones who lose are big families, and I accept that's a real problem. A family with three children in nappies is hardly being wasteful." },
      { who: "Neil", text: "Which was my point, really. Although I'll admit my own bin is lighter than it was ten years ago, and nobody charged me for that." },
      { who: "Presenter", text: "So what would you both accept?" },
      { who: "Harriet", text: "An allowance for each child, and free collection of nappies. I'd rather have a fair scheme than none at all." },
      { who: "Neil", text: "If it came with a proper fine for dumping, and enforcement that isn't one man with a camera once a month, I wouldn't lie down in the road. But I'd still want the decision made locally, not at county hall." },
      { who: "Presenter", text: "Harriet, the last word is yours." },
      { who: "Harriet", text: "Honestly, I'm less sure than when I rang. If the dumping figures had gone up for a whole year, I'd say wait. But the fall in waste is real, and I wouldn't want to throw that away." },
      { who: "Neil", text: "Nicely put, and I can't say I mind the pun." }
    ],
    skills: "Telling a conceded point from a maintained one, understanding a casual idiom used for acceptance, and reading a speaker's final position when it is hedged.",
    questions: [
      { type: "mcq", q: "What does Neil suggest when he says 'I'd just like to know where the other third went'?", options: ["That the council has exaggerated the figure.", "That some rubbish has been dumped illegally instead.", "That people have found a way to recycle more.", "That the lorries are collecting less often."], answer: 1, why: "He accepts the figure (<em>I don't dispute the figure</em>) and answers his own question: <em>it went into the hedge and in front of the field gates</em>. He does not doubt the number (A), and the fortnightly lorry is a separate complaint (D)." },
      { type: "mcq", q: "What does Harriet concede about fly-tipping?", options: ["That it has never been a problem.", "That it fell as soon as the scheme began.", "That it did increase for a time.", "That it is still rising today."], answer: 2, why: "<em>Dumping did rise at first, I'll grant you that.</em> She adds that it <em>levelled off</em>, which rules out B and D, while Neil, not Harriet, says it levelled off higher than before." },
      { type: "mcq", q: "Which group does Harriet accept could be treated unfairly by the scheme?", options: ["Large families.", "Careful households.", "Village residents.", "People who live near fields."], answer: 0, why: "<em>The ones who lose are big families, and I accept that's a real problem.</em> She says careful households <em>gain</em>, so B is the opposite of her view. Village residents are Neil's concern, not hers." },
      { type: "mcq", q: "What would make Neil willing to accept the scheme?", options: ["An allowance for each child and free nappy collection.", "A weekly lorry in every village.", "Careful households paying nothing at all.", "Penalties for dumping, enforcement and a local decision."], answer: 3, why: "<em>If it came with a proper fine for dumping, and enforcement that isn't one man with a camera once a month... I'd still want the decision made locally.</em> The child allowance is Harriet's proposal (A), not his condition. <em>I wouldn't lie down in the road</em> means he would not fight it, not that he is enthusiastic." },
      { type: "mcq", q: "How would you describe Harriet's position at the end of the call?", options: ["She has completely changed her mind and now opposes the scheme.", "She now thinks the council should wait for a year.", "She still leans towards the scheme but is less certain than before.", "She is as confident as when she first called."], answer: 2, why: "<em>I'm less sure than when I rang</em> shows doubt, but <em>the fall in waste is real, and I wouldn't want to throw that away</em> shows she still leans in favour. Waiting is only a hypothetical (<em>If the dumping figures had gone up for a whole year</em>), so B is a trap." },
      { type: "mcq", q: "What is Neil doing when he says 'I can't say I mind the pun'?", options: ["Complaining about Harriet's choice of words.", "Acknowledging that Harriet's phrase was an amusing play on words.", "Saying he has not understood what she meant.", "Agreeing to support the scheme."], answer: 1, why: "Harriet said she would not <em>throw that away</em>, a pun on rubbish. His <em>I can't say I mind</em> is a mild, friendly way of enjoying it. He says <em>Nicely put</em>, so he is not complaining (A), and he has not agreed to the scheme (D)." }
    ]
  },
  {
    id: "seminar-printing-press",
    title: "Did printing cause the scientific revolution?",
    format: "University seminar with a lecturer and two students",
    examPart: "Part 2/3 style: a challenged claim, qualified answers and a sceptical conclusion",
    intro: "You will hear Dr Morgan, a history lecturer, discussing a popular claim about printing with two students, Imogen and Tom. Listen for how far Dr Morgan accepts the claim and how he answers each challenge.",
    script: [
      { who: "Dr Morgan", text: "Good morning. Today's claim, which you'll find in half your textbooks, is that the printing press made the scientific revolution possible. Imogen, you've read the chapter. Is it right?" },
      { who: "Imogen", text: "Broadly, yes. Books got cheaper, so ideas spread, and people could check each other's work." },
      { who: "Dr Morgan", text: "That's the standard story, and I'd say it is about sixty per cent true. Printing certainly helped scholars compare astronomical tables, and errors in hand-copied tables were a real problem. Though I'd point out that Copernicus was printed in Nuremberg, in an edition very few people could actually read." },
      { who: "Imogen", text: "Isn't that rather the point? It was available, even if it was hard." },
      { who: "Dr Morgan", text: "Available to a few hundred scholars, who were already writing to each other. So did print create that network, or did the network make print useful?" },
      { who: "Imogen", text: "Well, but print also spread nonsense faster, and it did so to far more people, so I'm not sure the effect was only good." },
      { who: "Dr Morgan", text: "Quite. Pamphlets about witchcraft often sold far better than books about astronomy, and printers knew it. That hardly suggests that cheaper books produce better thinking." },
      { who: "Tom", text: "Can I challenge something? The Chinese printed for centuries before Europe, and there was no equivalent revolution. So can the press really be the cause?" },
      { who: "Dr Morgan", text: "A fair challenge, and historians do raise it. Yet I wouldn't call it decisive. Chinese printing was mostly from carved blocks, which suit a fixed text but not a page that needs correcting. Movable type is cheaper to correct. Not that I'd claim the alphabet explains everything." },
      { who: "Tom", text: "So you're saying printing mattered, but only alongside other things." },
      { who: "Dr Morgan", text: "I'm saying it was necessary, perhaps, but nowhere near sufficient. Universities, instruments, trade, money from patrons. Take away any of those and I doubt the press alone would have done it." },
      { who: "Imogen", text: "So the textbooks are wrong." },
      { who: "Dr Morgan", text: "Not wrong. Tidy. I would not tell you to throw the chapter away, only to read it as a summary rather than an explanation. Textbooks like a single cause because it fits on one page, and that is the part I'd ask you to distrust." }
    ],
    skills: "Following how a lecturer partly accepts a claim, grading an answer as a concession or a rejection, and understanding a precise word such as 'tidy' used as criticism.",
    questions: [
      { type: "mcq", q: "What is Dr Morgan's attitude to the textbook claim at the start?", options: ["He thinks it is entirely wrong.", "He thinks it is partly true but needs qualifying.", "He thinks it is completely true.", "He thinks it has never been properly studied."], answer: 1, why: "<em>About sixty per cent true</em> and the examples that follow show a partial acceptance. The claim is neither <em>entirely wrong</em> (A) nor <em>completely true</em> (C)." },
      { type: "mcq", q: "Why does Dr Morgan mention that Copernicus was printed in an edition few people could read?", options: ["To show that Copernicus was not important.", "To argue that printing made scholars unnecessary.", "To suggest that being printed did not mean being widely understood.", "To prove that Nuremberg was the centre of science."], answer: 2, why: "<em>An edition very few people could actually read</em> undermines the idea that print automatically spread ideas to many people. Imogen's reply, <em>It was available</em>, is the point he then challenges with <em>a few hundred scholars</em>." },
      { type: "mcq", q: "What does the example of witchcraft pamphlets support?", options: ["That astronomy was a popular subject.", "That cheaper books did not necessarily improve people's thinking.", "That printers refused to publish science.", "That scholars disliked printed books."], answer: 1, why: "<em>Pamphlets about witchcraft often sold far better than books about astronomy, and printers knew it. That hardly suggests that cheaper books produce better thinking.</em> The example concerns what the public bought, not what scholars liked (D)." },
      { type: "mcq", q: "How does Dr Morgan react to Tom's point about Chinese printing?", options: ["He accepts it as a fair challenge but does not think it settles the matter.", "He dismisses it as irrelevant.", "He agrees that it proves the press was not important.", "He says that Chinese scholars did not use printed books."], answer: 0, why: "<em>A fair challenge... I wouldn't call it decisive</em>, followed by the difference between carved blocks and movable type, and then <em>Not that I'd claim the alphabet explains everything</em>. He neither dismisses it (B) nor concludes the press is unimportant (C)." },
      { type: "mcq", q: "What does Dr Morgan mean by 'necessary, perhaps, but nowhere near sufficient'?", options: ["The press was the main cause and the other factors hardly mattered.", "Other factors, such as universities and patrons, were also needed.", "The press had no effect on the scientific revolution.", "The revolution would have happened without the press."], answer: 1, why: "He lists <em>Universities, instruments, trade, money from patrons</em> and says the press <em>alone</em> would not have been enough. C and D contradict <em>necessary, perhaps</em>, and A reverses <em>nowhere near sufficient</em>." },
      { type: "mcq", q: "What does he imply by describing the textbooks as 'Not wrong. Tidy.'?", options: ["That the books contain many small mistakes.", "That the books are beautifully presented.", "That the books should be written by someone else.", "That the books simplify a complicated history into one cause."], answer: 3, why: "He explains: <em>Textbooks like a single cause because it fits on one page, and that is the part I'd ask you to distrust.</em> His criticism is of oversimplification rather than of mistakes (A), and <em>tidy</em> is not praise for presentation (B)." }
    ]
  },
  {
    id: "interview-bees-ecologist",
    title: "Are the bees really disappearing?",
    format: "Radio interview with an ecologist",
    examPart: "Part 3/4 style: qualifications of earlier statements and a gently corrected headline",
    intro: "You will hear a presenter interviewing Nadia, an ecologist who studies pollinating insects. Listen for the points where she corrects the presenter or qualifies something she said earlier.",
    script: [
      { who: "Presenter", text: "Welcome to Science Today. My guest is Nadia, an ecologist who studies pollinating insects. Nadia, the headlines said honeybees were vanishing and that we would soon go hungry. Was that right?" },
      { who: "Nadia", text: "Well, not quite. The number of managed honeybees worldwide has actually risen over the last fifty years, because beekeepers replace lost hives. What is declining, in several countries, is wild bees." },
      { who: "Presenter", text: "So the panic was misplaced?" },
      { who: "Nadia", text: "The target was. The concern wasn't. I'd rather we said it more carefully: some wild species are in real trouble." },
      { who: "Presenter", text: "And is that serious for our food?" },
      { who: "Nadia", text: "It depends on the crop. Wheat and rice don't need insects at all. Apples, berries and oilseed rape do. But I should be careful. It's often claimed that a third of our food depends on pollinators. That's true by the weight of crops grown, but not by calories, where the share is rather smaller." },
      { who: "Presenter", text: "Yet you said earlier that wild bees do more of the work?" },
      { who: "Nadia", text: "I did say that, and let me qualify it. In some orchards, yes, wild bees are more efficient on each visit. In others, honeybees carry the load. I wouldn't generalise from the studies I know best, which come from temperate regions." },
      { who: "Presenter", text: "What is behind the decline?" },
      { who: "Nadia", text: "Mostly habitat loss. Pesticides get the headlines, and they matter, certainly, but I'd put them second in most of the places I've worked. Less flower-rich grassland means fewer places to feed and to nest, and that is true across most of the countries I know." },
      { who: "Presenter", text: "So banning one chemical wouldn't fix it?" },
      { who: "Nadia", text: "It might help a bit. I wouldn't want anyone to think it was the whole answer, and I'd worry if a ban made people stop looking at the field margins." },
      { who: "Presenter", text: "Is there anything people can do at home?" },
      { who: "Nadia", text: "Leaving a corner of lawn unmown sounds trivial, and individually it is. But a thousand gardens is something else. I'd just ask people not to buy a hive in the belief that they're helping wild species. More honeybees can actually crowd them out." },
      { who: "Presenter", text: "Nadia, thank you." }
    ],
    skills: "Noticing a correction made politely, tracking the scope of statistics, and following a speaker who qualifies her own earlier claims.",
    questions: [
      { type: "mcq", q: "What does Nadia mean by 'The target was. The concern wasn't.'?", options: ["The headlines were right about honeybees, and wild bees are fine.", "The worry about bees was entirely unjustified.", "The headlines focused on the wrong insect, but there is still a real problem.", "The concern about food supplies was misplaced."], answer: 2, why: "She has just explained that honeybees are not declining but <em>wild bees</em> are, so the <em>target</em> (honeybees) was wrong while the <em>concern</em> remains: <em>some wild species are in real trouble</em>." },
      { type: "mcq", q: "What does she say about the claim that a third of food depends on pollinators?", options: ["It is false by every measure.", "It is true by the weight of crops grown, but overstates the share of calories.", "It is true both by crop types and by calories.", "It applies mainly to wheat and rice."], answer: 1, why: "<em>True by the weight of crops grown, but not by calories, where the share is rather smaller.</em> She names wheat and rice as crops that <em>don't need insects at all</em>, so D is the reverse." },
      { type: "mcq", q: "What is she doing when she says 'let me qualify it' about wild bees?", options: ["Admitting her earlier claim was completely wrong.", "Refusing to answer the question.", "Repeating the claim with more confidence.", "Limiting an earlier claim because the evidence does not cover every situation."], answer: 3, why: "She says wild bees are better <em>in some orchards</em>, honeybees <em>in others</em>, and that her studies <em>come from temperate regions</em>. It is a narrowing of the claim, not a retraction (A)." },
      { type: "mcq", q: "How does she rank pesticides as a cause of the decline?", options: ["As the second most important cause in most places she has worked.", "As the most important cause.", "As an unimportant cause.", "As a cause that has not been studied."], answer: 0, why: "<em>Pesticides get the headlines, and they matter... but I'd put them second.</em> Habitat loss comes first. She does not call them unimportant (C): <em>they matter, certainly</em>." },
      { type: "mcq", q: "Why would Nadia worry if a pesticide ban were introduced?", options: ["Because she thinks pesticides are harmless.", "Because people might wrongly feel the problem was solved and ignore habitat.", "Because farmers would lose crops.", "Because honeybees would disappear."], answer: 1, why: "<em>I'd worry if a ban made people stop looking at the field margins</em> shows her concern is complacency. She says a ban <em>might help a bit</em>, so she is not defending pesticides (A)." },
      { type: "mcq", q: "What does she advise about keeping a hive in the garden?", options: ["That it is a good way to help wild bees.", "That it is trivial but harmless.", "That it could harm wild species rather than help them.", "That it should be done by a thousand gardens together."], answer: 2, why: "<em>More honeybees can actually crowd them out.</em> The <em>thousand gardens</em> remark refers to leaving a corner of lawn unmown, not to hives (D)." }
    ]
  },
  {
    id: "presentation-desk-sharing",
    title: "Results of the desk-sharing pilot",
    format: "Workplace presentation with questions from two colleagues",
    examPart: "Part 3/4 style: figures, a sceptical question and a recommendation that is narrower than it first sounds",
    intro: "You will hear Fiona, from facilities, presenting the results of a pilot in which sixty staff shared forty desks. Joel and Zoe ask questions. Listen for what the figures show and what Fiona finally recommends.",
    script: [
      { who: "Fiona", text: "Good morning, everyone. I'm Fiona from facilities, and I'll take ten minutes to report on the desk-sharing pilot on the third floor. Joel and Zoe have both joined us to ask questions." },
      { who: "Fiona", text: "The pilot ran for twelve weeks. We gave sixty staff forty desks, because on an average day only thirty-two of them were in the office. On that basis, rolling the idea out across the building could save around ninety thousand pounds a year in rent." },
      { who: "Joel", text: "Before you go on, how did people feel about it?" },
      { who: "Fiona", text: "Satisfaction fell from seven point four to six point eight out of ten. Staff who work from home two or three days a week were happier, but people who come in daily were not." },
      { who: "Joel", text: "So it was a failure, then." },
      { who: "Fiona", text: "I wouldn't put it quite like that. Most of the drop came from a single complaint, that people couldn't find their colleagues. And there's a catch in the averages. On Tuesdays and Wednesdays attendance reached fifty, so ten people had no desk at all, and many of the rest could not sit beside their team. That is the kind of day people remember." },
      { who: "Joel", text: "Which means the ninety thousand is more of a hope than a saving." },
      { who: "Fiona", text: "It's real money on paper. Whether it's real in practice depends on the busy days, and I'd be misleading you if I said otherwise." },
      { who: "Zoe", text: "Can I ask what you would do tomorrow?" },
      { who: "Fiona", text: "I would not roll it out across the building. I'd extend it to the second floor, but with fixed days for each team, so that colleagues are in on the same days. And I'd give the people who come in daily a guaranteed desk." },
      { who: "Joel", text: "That sounds like a lot of rules for a system meant to be flexible." },
      { who: "Fiona", text: "It does, and I accept that. The alternative is a free-for-all that costs us the goodwill we'd be saving the money for." },
      { who: "Zoe", text: "Then please bring me the second floor figures in the spring, and we will decide about the rest after that." }
    ],
    skills: "Distinguishing a figure from its limits, noticing a speaker who refuses an easy 'failure' label, and identifying the real recommendation behind a tentative offer.",
    questions: [
      { type: "mcq", q: "Why did the organisers give sixty staff only forty desks?", options: ["Because the building had run out of space.", "Because on a normal day about thirty-two people were in.", "Because twenty people refused to take part.", "Because staff asked for fewer desks."], answer: 1, why: "<em>Because on an average day only thirty-two of them were in the office.</em> Nothing is said about space running out (A) or anyone refusing (C)." },
      { type: "mcq", q: "How did the pilot affect satisfaction?", options: ["It fell overall, though people who work from home were happier.", "It rose for everyone.", "It stayed the same.", "It fell only among people who work from home."], answer: 0, why: "<em>Satisfaction fell from seven point four to six point eight</em>, but staff working from home <em>were happier</em>; it was the people who come in daily who were not. D reverses this." },
      { type: "mcq", q: "What does Fiona mean by 'there's a catch in the averages'?", options: ["The averages were calculated incorrectly.", "The average attendance was higher than expected.", "Staff did not like the average desk.", "An average hides busy days when forty desks were not enough."], answer: 3, why: "She goes on: <em>On Tuesdays and Wednesdays attendance reached fifty</em>, ten more than the forty desks. Averages of thirty-two hide that peak; nothing suggests a calculation error (A)." },
      { type: "mcq", q: "How does Fiona respond to Joel's remark that the saving is 'more of a hope than a saving'?", options: ["She angrily rejects it.", "She partly accepts it, saying the saving depends on busy days.", "She agrees that the pilot was a total failure.", "She says the figure has been confirmed in practice."], answer: 1, why: "<em>It's real money on paper. Whether it's real in practice depends on the busy days, and I'd be misleading you if I said otherwise.</em> She concedes the doubt without calling the pilot a failure (C)." },
      { type: "mcq", q: "What does Fiona recommend?", options: ["Introducing desk sharing across the whole building at once.", "Cancelling the idea because of the lower satisfaction.", "Trying it on the second floor, with fixed days and desks for daily staff.", "Keeping the third floor as it is and stopping there."], answer: 2, why: "<em>I would not roll it out across the building. I'd extend it to the second floor, but with fixed days for each team... And I'd give the people who come in daily a guaranteed desk.</em> The recommendation is narrower than the ninety-thousand headline suggests." },
      { type: "mcq", q: "What does Zoe's final answer imply?", options: ["That she has decided to reject the proposal.", "That she has approved a full building rollout.", "That she wants no further information.", "That she accepts the second-floor trial and will judge the wider plan later."], answer: 3, why: "<em>Then please bring me the second floor figures in the spring, and we will decide about the rest after that.</em> It is a conditional go-ahead for the smaller trial, not a rejection (A) or a full approval (B)." }
    ]
  }
);
