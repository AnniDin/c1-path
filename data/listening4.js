window.C1 = window.C1 || {};
C1.listening = C1.listening || [];
/* Listening sets 4: lecture signposts, attitude and inference, distractor spotting, synthesis of two sources. */
C1.listening.push(
  {
    id: "lecture-waiting",
    title: "The psychology of waiting",
    format: "University lecture with a short Q&A",
    examPart: "Part 3/4 style: lecture and following the structure",
    intro: "You will hear part of a university lecture by Dr Helen Marsh, followed by a question from a student, Tom. Listen for how the talk is organised and answer the questions.",
    script: [
      { who: "Helen", text: "Good morning, everyone. Today's topic is something we all do and nobody enjoys: waiting. Why does a wait feel long or short, and what can organisations, from airports to hospitals, do about it?" },
      { who: "Helen", text: "There are two things I want to cover. First, the surprising finding that the actual length of a wait matters less than how long it feels. Second, the role of fairness." },
      { who: "Helen", text: "So, first, perception. A story you often hear involves a hotel whose guests kept complaining about the slow lifts. Did the owners buy faster lifts? No. They put mirrors in the lobby, and the complaints almost disappeared. Why? Because people were busy checking their hair instead of watching the clock." },
      { who: "Helen", text: "The lesson is that occupied time feels shorter than empty time. One airport learned this too. It moved its baggage carousels further from the arrival gates, so passengers walked for longer and waited for less, and complaints fell sharply." },
      { who: "Helen", text: "Turning now to fairness. Have you ever stood in a queue that suddenly split into two? Annoying, isn't it? Studies suggest that a single queue feeding several counters is judged fairer, even when it isn't any faster. People will accept a longer wait if they believe it's shared equally." },
      { who: "Helen", text: "There's also a third factor, which I'll mention only briefly: uncertainty. Not knowing how long you'll wait is worse than knowing it'll be long." },
      { who: "Helen", text: "So, to sum up: keep people occupied, be fair, and tell them the truth. Any questions?" },
      { who: "Tom", text: "Yes. You mentioned hospitals at the start of the session. Were you going to say something about those?" },
      { who: "Helen", text: "Ah, I nearly forgot. Thank you, Tom. Actually, I'm going to leave hospitals for next week, because the ethics of triage deserve a full session of their own." },
      { who: "Tom", text: "Is there anything we should read before then?" },
      { who: "Helen", text: "The chapter on queue discipline, please, not the one on pricing. Pricing can wait until the week after." },
      { who: "Tom", text: "Is the mirror study in it?" },
      { who: "Helen", text: "It is, along with the airport figures." },
      { who: "Tom", text: "See you then." }
    ],
    skills: "Using signposts ('there are two things', 'turning now to', 'to sum up') and rhetorical questions to follow the structure of a lecture, and separating main points from brief side remarks.",
    questions: [
      { type: "mcq", q: "Which two main points does the lecturer say she will cover?", options: ["Perceived waiting time and fairness.", "Fairness and uncertainty.", "Lifts and airports.", "Hospitals and pricing."], answer: 0, why: "She announces <em>there are two things I want to cover</em>: how long a wait feels, and fairness. B is wrong because uncertainty is only a brief third factor, C gives her examples, and D mentions topics she postpones." },
      { type: "mcq", q: "Why does the lecturer describe the hotel with the mirrors?", options: ["To show that faster lifts are too expensive.", "To prove that guests dislike lobbies.", "To illustrate that occupied time feels shorter.", "To explain why hotels have complaints."], answer: 2, why: "The mirrors kept guests busy, and she concludes <em>occupied time feels shorter than empty time</em>. A is not said (the owners simply did not buy lifts), and B and D are not the point of the story." },
      { type: "mcq", q: "What is the purpose of her question about a queue that splits in two?", options: ["To introduce the idea of fairness.", "To complain about modern shops.", "To move on to the topic of uncertainty.", "To check that students are listening."], answer: 0, why: "After <em>Turning now to fairness</em> the question introduces the idea that a single queue feels fairer. It is a rhetorical question used as a signpost, not a real check on the audience." },
      { type: "mcq", q: "How does the lecturer treat the topic of uncertainty?", options: ["As the most important point of the lecture.", "As a short extra point.", "As the subject of next week's session.", "As a point she disagrees with."], answer: 1, why: "She says she will <em>mention it only briefly</em> as a third factor. Next week's topic is hospitals, so C is wrong." },
      { type: "mcq", q: "What will happen next week?", options: ["The lecture will be about pricing.", "The students will take a test on queue discipline.", "The lecturer will cover the airport study again.", "The lecture will deal with hospitals."], answer: 3, why: "She says she will <em>leave hospitals for next week</em>. Pricing is for <em>the week after</em>, so A is wrong, and there is no mention of a test." }
    ]
  },
  {
    id: "attitude-novel",
    title: "What do you really think of the novel?",
    format: "Conversation between two flatmates",
    examPart: "Part 1/3 style: attitude and implied meaning",
    intro: "You will hear Gemma and Raj talking about a novel written by their friend Callum. Listen for what the speakers mean as well as what they say, then answer the questions.",
    script: [
      { who: "Gemma", text: "So, did you finish Callum's novel? He keeps asking me whether you've said anything." },
      { who: "Raj", text: "I got to the end, yes. Eventually. It's, er, certainly ambitious." },
      { who: "Gemma", text: "Ambitious. That's your polite word, isn't it?" },
      { who: "Raj", text: "Well, there's a lot going on. Three timelines, four narrators, a dragon in chapter nine, which I didn't see coming. I'm not sure it needed all of that." },
      { who: "Gemma", text: "Hmm. He did spend six years on it." },
      { who: "Raj", text: "I know, and I admire that. The opening chapter is honestly really strong. If the whole book were like that, I'd be recommending it to everyone." },
      { who: "Gemma", text: "But?" },
      { who: "Raj", text: "But somewhere around page eighty I caught myself checking how many pages were left. Which isn't a good sign, is it?" },
      { who: "Gemma", text: "Not really. So what are you going to tell him?" },
      { who: "Raj", text: "I thought I'd say the opening is excellent and suggest he think about cutting a narrator or two. Do you think that's too blunt?" },
      { who: "Gemma", text: "I'd say it's kind. The last time someone was properly honest with him, he didn't speak to them for a month." },
      { who: "Raj", text: "Right. That's a little worrying. Maybe I'll put it in an email, so he can sulk in private." },
      { who: "Gemma", text: "Ha. Well, he's sending it to agents next month, so he does need to hear something before then." },
      { who: "Raj", text: "Exactly my thinking. Better from me than from twenty rejection letters." },
      { who: "Gemma", text: "True. And thanks for doing it. I'd have just said 'lovely' and run away." },
      { who: "Raj", text: "Oh, I nearly did. I had the word ready." },
      { who: "Gemma", text: "Well, you're braver than me. Let me know how he takes it." }
    ],
    skills: "Inferring attitude from hedging ('certainly ambitious'), understatement ('isn't a good sign') and humour, and telling what a speaker implies from what is said directly.",
    questions: [
      { type: "mcq", q: "What does Raj imply when he calls the novel 'certainly ambitious'?", options: ["He is jealous of Callum's success.", "He has reservations about it.", "He thinks it is too short.", "He found it easy to read."], answer: 1, why: "The hesitation (<em>er</em>) and the word <em>certainly</em> signal polite criticism, and Gemma confirms it: <em>that's your polite word, isn't it?</em> Nothing suggests jealousy or that the book is short." },
      { type: "mcq", q: "What does Raj mean by 'checking how many pages were left'?", options: ["He was running out of time.", "He wanted to read the ending first.", "He was impatient to finish it.", "He was enjoying the story too much."], answer: 2, why: "He says it <em>isn't a good sign</em>: understatement meaning he was bored and wanted it to end. He does not mention time pressure, and enjoyment would not make him count pages." },
      { type: "mcq", q: "What does Gemma suggest about Callum?", options: ["He rarely asks friends for their opinion.", "He has given up writing before.", "He has already sent the novel to agents.", "He reacts badly to criticism."], answer: 3, why: "Her story about someone being <em>properly honest</em> and then ignored for a month implies that Callum takes criticism badly. She never says so directly." },
      { type: "mcq", q: "Why does Raj mention writing an email?", options: ["He is joking that Callum may react badly.", "He is too busy to meet Callum.", "He wants Callum to reply quickly.", "He wants to avoid giving his real opinion."], answer: 0, why: "<em>So he can sulk in private</em> is a joke that acknowledges Callum's likely reaction. He still plans to give his real opinion, so D is wrong." },
      { type: "mcq", q: "What does Gemma mean by 'I'd have just said lovely and run away'?", options: ["She did not enjoy the novel either.", "She admires Raj for being honest with Callum.", "She would like to read the book herself.", "She thinks Raj is being unkind."], answer: 1, why: "She says she would have avoided the conversation, and adds <em>you're braver than me</em>, so she admires Raj. She gives no opinion of the book, so A and C are unsupported, and D contradicts her earlier comment that his plan is kind." }
    ]
  },
  {
    id: "distractors-party",
    title: "Planning a surprise leaving party",
    format: "Conversation between two colleagues",
    examPart: "Part 1 style: details and distractors",
    intro: "You will hear two colleagues, Isla and Dev, planning a leaving party for a co-worker called Margaret. Many details are mentioned, but not all are the final decision. Listen carefully and answer the questions.",
    script: [
      { who: "Isla", text: "Right, the party for Margaret. I was thinking the canteen, but I assume that's too small." },
      { who: "Dev", text: "Far too small, and it smells of soup. What about the Riverside Café?" },
      { who: "Isla", text: "I rang them. They'll do it, but they're closed on Mondays, and her last day is Monday the fourteenth." },
      { who: "Dev", text: "Hm. So the Friday before, the eleventh?" },
      { who: "Isla", text: "That's what I first suggested to the group, but Sandra pointed out that Margaret always leaves early on Fridays to see her grandchildren. So it's Thursday the tenth." },
      { who: "Dev", text: "Fine. And the time? Six o'clock?" },
      { who: "Isla", text: "Half past five, so people can come straight from work." },
      { who: "Dev", text: "Numbers? I'd guessed about forty." },
      { who: "Isla", text: "About thirty. Forty would include the Leeds office, and they've said they can't make it." },
      { who: "Dev", text: "Budget, then. Last year we had about fifteen pounds a head." },
      { who: "Isla", text: "Yes, but this year finance says twelve. Anyway, the café does a buffet at ten pounds fifty, so we're comfortably inside that." },
      { who: "Dev", text: "Perfect. And the present? I thought a garden voucher, since she's always on about her allotment." },
      { who: "Isla", text: "Sandra suggested that too, but Margaret's just sold the allotment. A framed photo of the whole team is better, I think." },
      { who: "Dev", text: "A photo is a bit safe, but fine. Who's organising it?" },
      { who: "Isla", text: "I will. You're doing the cake." },
      { who: "Dev", text: "Chocolate? She loves chocolate." },
      { who: "Isla", text: "Actually, she's gone off it. Lemon, apparently." },
      { who: "Dev", text: "Lemon it is. And how do we get her there without suspicion?" },
      { who: "Isla", text: "I'm telling her it's a team meeting." }
    ],
    skills: "Spotting distractors in multiple-choice listening: options that are mentioned but rejected, said by the other speaker, true but not asked, or changed later.",
    questions: [
      { type: "mcq", q: "On which day will the party take place?", options: ["Monday the fourteenth", "Friday the eleventh", "Thursday the tenth", "Wednesday the ninth"], answer: 2, why: "Final decision: <em>it's Thursday the tenth</em>. The fourteenth is her last day (true but not asked, and the café is closed). The eleventh was <em>changed later</em>. The ninth is never mentioned." },
      { type: "mcq", q: "How many guests do they expect?", options: ["Thirty", "Forty", "Twenty", "Fifty"], answer: 0, why: "Isla says <em>about thirty</em>. Forty is Dev's guess, <em>said by the other speaker</em> and then rejected because the Leeds office cannot come. Twenty and fifty are never mentioned." },
      { type: "mcq", q: "How much will the buffet cost per person?", options: ["Fifteen pounds", "Twelve pounds", "Ten pounds", "Ten pounds fifty"], answer: 3, why: "The café's buffet is <em>ten pounds fifty</em>. Fifteen was last year's budget (true but not asked), and twelve is the finance limit (a limit, not the price). Ten pounds is not mentioned." },
      { type: "mcq", q: "What present will they give Margaret?", options: ["A garden voucher", "A framed team photo", "A cake", "A book about gardening"], answer: 1, why: "Isla chooses <em>a framed photo of the whole team</em>. The voucher was <em>mentioned but rejected</em> because Margaret has sold the allotment. The cake is for the party, not a present, and the book is never mentioned." },
      { type: "mcq", q: "What kind of cake will Dev make?", options: ["Chocolate", "Carrot", "Lemon", "Vanilla"], answer: 2, why: "Dev first says chocolate, but Isla corrects him: <em>she's gone off it. Lemon</em>. So chocolate is <em>changed later</em>. Carrot and vanilla are never mentioned." }
    ]
  },
  {
    id: "synthesis-market-street",
    title: "Should Market Street close to cars?",
    format: "Discussion between a shop owner and a town planner",
    examPart: "Part 3/4 style: two views on one issue",
    intro: "You will hear Carol, who owns a shop, and Jamal, a town planner, discussing a plan to close Market Street to traffic. Listen to what each person thinks and answer the questions.",
    script: [
      { who: "Carol", text: "I'll be straight with you, Jamal. I think closing Market Street to cars would kill my shop. Half my customers drive in." },
      { who: "Jamal", text: "I hear that a lot, but the surveys show most shoppers on that street arrive on foot or by bus. Drivers are about a fifth." },
      { who: "Carol", text: "A fifth is still a fifth. And they spend more, because they buy big things." },
      { who: "Jamal", text: "That's fair, they can spend more per visit. But pedestrians visit more often, so over a month it tends to balance out. In some towns that tried this, takings went up. One study I read said eight per cent." },
      { who: "Carol", text: "Eight per cent where? Not here. Our high street is steep, and it rains nine months of the year." },
      { who: "Jamal", text: "Okay, I can't plan the weather away. But I do agree with you on one thing: the buses must come right to the edge of the pedestrian zone. Otherwise older people can't get in." },
      { who: "Carol", text: "Yes! That's what worries me most, my older customers. Though I'd add deliveries. My stock arrives at seven in the morning." },
      { who: "Jamal", text: "Deliveries before ten would still be allowed. That's in the draft." },
      { who: "Carol", text: "Then I've no objection to that part. What I do object to is the trial being only three months. Nobody's habits change in three months." },
      { who: "Jamal", text: "Funny, I'd have said the opposite. A long trial is hard to undo cheaply, so a short one is a safeguard. But I accept three may be too short. Say six." },
      { who: "Carol", text: "Six I could live with. And parking? You're taking out forty spaces." },
      { who: "Jamal", text: "We'd replace them with a car park five minutes away, with cheaper rates for the first two hours." },
      { who: "Carol", text: "Cheaper parking would help, I admit. So we both want older people and delivery drivers looked after." },
      { who: "Jamal", text: "Exactly. We disagree about whether it'll boost trade, but not about access." },
      { who: "Carol", text: "Fair summary. I'll still be watching the till, though." }
    ],
    skills: "Combining two speakers' views: deciding who said what, separating points of agreement from points of disagreement, and noticing when a speaker changes position.",
    questions: [
      { type: "mcq", q: "Who says what about shoppers' visits?", options: ["Both say pedestrians come more often.", "Jamal says drivers spend more per visit; Carol says pedestrians come more often.", "Both say drivers spend more per visit.", "Carol says drivers spend more per visit; Jamal says pedestrians come more often."], answer: 3, why: "Carol argues that drivers <em>spend more</em>, and Jamal concedes this but replies that <em>pedestrians visit more often</em>. The other options swap or merge their views." },
      { type: "mcq", q: "What do both speakers want to protect?", options: ["The forty parking spaces.", "Access for older people and deliveries.", "A three-month trial.", "The eight per cent rise in takings."], answer: 1, why: "Carol and Jamal both want older people and delivery drivers looked after (Carol: <em>we both want...</em>). Jamal wants to remove the spaces, Carol rejects three months, and the eight per cent figure is Jamal's claim only." },
      { type: "mcq", q: "Why does Jamal prefer a short trial?", options: ["It is easier to reverse if it fails.", "Shops would lose too much money.", "Shoppers get used to changes quickly.", "The council has only a small budget."], answer: 0, why: "He says a long trial <em>is hard to undo cheaply</em>, so a short one is <em>a safeguard</em>. It is Carol, not Jamal, who argues that habits take time to change." },
      { type: "mcq", q: "Why does Carol doubt the eight per cent figure?", options: ["She thinks the surveys were dishonest.", "She says her customers spend more than others.", "She has never seen the council's draft.", "She believes local conditions are different."], answer: 3, why: "She replies <em>Not here</em>, pointing to the steep street and the rain. She does not question whether the surveys are honest, so A is wrong." },
      { type: "mcq", q: "How does Jamal sum up the conversation?", options: ["They agree on the trade effect but not on access.", "They disagree on both trade and access.", "They disagree on the trade effect but not on access.", "They agree on everything except parking."], answer: 2, why: "He says <em>we disagree about whether it'll boost trade, but not about access</em>, and Carol calls this a fair summary." }
    ]
  }
);
