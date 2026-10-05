window.C1 = window.C1 || {};
C1.listening = C1.listening || [];
/* Listening sets for the units "Law, crime and the media" and "Consumers, arts and character". */
C1.listening.push(
  {
    id: "law-media",
    title: "Should trials be filmed?",
    format: "Radio discussion between three people",
    examPart: "Part 4 style: discussion",
    intro: "You will hear a radio presenter talking to a barrister, Nadia, and a crime reporter, Colin, about filming court trials. Listen and answer the questions.",
    script: [
      { who: "Presenter", text: "Today's question is whether trials should be filmed. With me are Nadia Okafor, a barrister, and Colin Reid, who has reported on crime for twenty years. Nadia, you first." },
      { who: "Nadia", text: "I'm against it, mainly because of witnesses. Giving evidence is frightening enough in front of a room of strangers. If people know that their faces could be online for ever, some of them simply won't come forward, and then the court never hears the full story." },
      { who: "Colin", text: "I understand that, but I think we're being too nervous. In principle, courts are already public. Anyone can sit in the gallery. The trouble is that hardly anybody can take a day off work to do it. Filming would mean justice is seen to be done, not just done." },
      { who: "Nadia", text: "There's a big difference between a gallery of thirty people and a clip shared a million times. Clips lose context. Thirty seconds of me questioning a witness firmly makes me look like a bully, when my job is to test the evidence." },
      { who: "Colin", text: "Fair enough, which is why I'd limit it. Don't film the witnesses at all. Film only the judge's sentencing remarks. At the moment most people see a headline saying someone got a light sentence, and they're furious, without ever hearing the judge's reasons." },
      { who: "Presenter", text: "Nadia, could you accept that?" },
      { who: "Nadia", text: "Sentencing remarks, yes, I could live with that. Judges write them with great care, and they're read out in public anyway. My worry is what comes next. Once the door is open, there will be pressure to widen it." },
      { who: "Colin", text: "That's the slippery slope argument, and people used it when reporters were first allowed to post updates from court. Nothing collapsed." },
      { who: "Nadia", text: "Something did change, though, and it's the jury. A while ago a juror looked up the defendant online, and the trial had to start again with a new jury. Anything that turns a case into entertainment makes it harder to find twelve people who arrive with an open mind." },
      { who: "Colin", text: "But that's a problem with jurors and their phones, not with cameras in the courtroom." },
      { who: "Nadia", text: "Related, though, I'd say. Anyway, if we do try it, I'd want an independent panel to review the experiment, not the broadcasters themselves." },
      { who: "Colin", text: "I can agree to that. Start with sentencing, and look again after two years." }
    ],
    skills: "Keeping track of two opinions, noticing a compromise that one speaker accepts with reservations, and telling apart two problems that sound alike.",
    questions: [
      { type: "mcq", q: "What is Nadia's main objection to filming trials?", options: ["Judges would speak less honestly.", "Witnesses might be unwilling to give evidence.", "Barristers would be paid less.", "Trials would take much longer."], answer: 1, why: "She says some people <em>simply won't come forward</em> if their faces could be online for ever, so the court would not hear everything. The other options are never mentioned." },
      { type: "gap", q: "Nadia says that short clips lose ___.", answers: ["context"], why: "Nadia says <em>Clips lose context</em> and gives the example of a thirty-second clip of her questioning a witness." },
      { type: "mcq", q: "What does Nadia say about Colin's suggestion of filming sentencing remarks?", options: ["She rejects it completely.", "She accepts it but fears it may lead to further changes.", "She thinks it should apply to witnesses as well.", "She believes judges would refuse to take part."], answer: 1, why: "She says <em>I could live with that</em> but adds <em>My worry is what comes next</em>, because there will be <em>pressure to widen it</em>. A is wrong because she accepts it, and C is the opposite of her view. D is never said." },
      { type: "gap", q: "When a juror researched the defendant online, the trial had to start again with a new ___.", answers: ["jury"], why: "Nadia says <em>the trial had to start again with a new jury</em>." },
      { type: "mcq", q: "How does Colin react to Nadia's example about the juror?", options: ["He says it shows that cameras are dangerous.", "He says it is a different problem from the one under discussion.", "He admits that the trial was badly managed.", "He argues that jurors should be filmed."], answer: 1, why: "Colin says it is <em>a problem with jurors and their phones, not with cameras</em>, so he treats it as a separate issue. Nadia, not Colin, says it is related. The other options are not mentioned." }
    ]
  },
  {
    id: "consumer-arts",
    title: "A refund and a painter's portraits",
    format: "Phone conversation between two friends",
    examPart: "Part 1 style: conversation",
    intro: "You will hear two friends, Lena and Omar, talking on the phone. Listen and answer the questions.",
    script: [
      { who: "Lena", text: "You'll never guess what happened. I finally got a full refund for that speaker." },
      { who: "Omar", text: "The one that kept cutting out after two weeks? Honestly, I'd have given up ages ago." },
      { who: "Lena", text: "It took four calls. First they offered me a replacement, but I said no, because it was the same model and I'd lost my trust in it. Then they offered a voucher, and I said I wanted my money back. On the fourth call, a manager agreed." },
      { who: "Omar", text: "I admire you for that. I hate confrontation. I'd say thank you, put the thing in a drawer and never mention it again." },
      { who: "Lena", text: "It isn't confrontation, it's being polite and stubborn at the same time." },
      { who: "Omar", text: "Maybe. My sister's just like you. She'll queue for an hour to complain. I always feel I'm being a nuisance." },
      { who: "Lena", text: "Well, companies count on people like you. Anyway, are we still on for Saturday? The exhibition at the Harbour Gallery?" },
      { who: "Omar", text: "Definitely. I checked the website. Tickets are fourteen pounds, but nine pounds with a student card, so I'm lucky. You can only book the morning slot online. For the afternoon you pay at the door." },
      { who: "Lena", text: "I'm working until noon, so it'll have to be the afternoon. I read that most people rush through the early landscapes and miss the best part, which is the last room." },
      { who: "Omar", text: "The self-portraits?" },
      { who: "Lena", text: "Yes, painted over thirty years. You can watch her change, and I'd much rather see that than a pretty hillside." },
      { who: "Omar", text: "I'm curious about her character, to be honest. Apparently she refused to deal with art dealers and gave most of her paintings to friends." },
      { who: "Lena", text: "That's why so few are in museums. The gallery had to borrow them from private owners, which is why the show's so unusual." },
      { who: "Omar", text: "Right. Let's meet at one o'clock by the café. I'll buy the coffee, since you spent your week on the phone to that shop." },
      { who: "Lena", text: "Deal." }
    ],
    skills: "Understanding reasons behind decisions, picking out attitudes to a social situation, and linking a fact to the explanation that follows it.",
    questions: [
      { type: "mcq", q: "Why did Lena turn down the offer of a replacement speaker?", options: ["She preferred a different model.", "She no longer trusted that model.", "The replacement would have arrived too late.", "She had already bought a new one."], answer: 1, why: "She says the replacement was <em>the same model and I'd lost my trust in it</em>. A is not what she says, and C and D are never mentioned." },
      { type: "gap", q: "Lena got her money back when a ___ agreed to the refund.", answers: ["manager"], why: "Lena says <em>On the fourth call, a manager agreed</em>." },
      { type: "mcq", q: "How does Omar feel about making complaints?", options: ["He enjoys arguing with companies.", "He worries that he is causing trouble.", "He thinks complaining never works.", "He prefers to let his sister do it."], answer: 1, why: "He says <em>I always feel I'm being a nuisance</em>. A is the opposite of <em>I hate confrontation</em>. C and D are not said; his sister is only an example of someone who does complain." },
      { type: "gap", q: "Omar's ticket will cost ___ pounds because he has a student card.", answers: ["nine", "9"], why: "Omar says tickets are fourteen pounds, <em>but nine pounds with a student card</em>." },
      { type: "mcq", q: "According to Omar, why are so few of the painter's works in museums?", options: ["She sold most of them to private collectors through dealers.", "She gave many of them to her friends.", "Many were lost over the years.", "She refused to let galleries show them."], answer: 1, why: "Omar says she <em>refused to deal with art dealers and gave most of her paintings to friends</em>, and Lena adds that the gallery had to borrow them from private owners. A contradicts the refusal to use dealers. C and D are never mentioned." }
    ]
  }
);
