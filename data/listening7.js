window.C1 = window.C1 || {};
C1.listening = C1.listening || [];
/* Listening sets 7: a friendly argument about documentaries, a museum tour with a change of plan, a radio interview on teenagers and sleep. */
C1.listening.push(
  {
    id: "friends-documentary",
    title: "Is nature television honest?",
    format: "Conversation between two friends",
    examPart: "Part 3/4 style: opinions, partial agreement and a change of mind",
    intro: "You will hear two friends, Zoe and Tom, talking about a wildlife documentary they have just watched. Listen for what each of them thinks and how Tom's view changes.",
    script: [
      { who: "Zoe", text: "Right, I've got to say, I loved that. The bit with the snow leopard was unbelievable." },
      { who: "Tom", text: "It was beautiful, I'll give you that. But honestly, I felt a bit cheated. Did you notice the commentary made it sound as if one cameraman had sat on that ridge all winter?" },
      { who: "Zoe", text: "Well, they don't just wander up to a leopard, do they? It's a long lens." },
      { who: "Tom", text: "No, but then the credits rolled and there were about forty names. So much for the lone hero." },
      { who: "Zoe", text: "Fair enough, but that's just how filming works. Nobody calls a drama dishonest because there's a crew behind the camera." },
      { who: "Tom", text: "A drama doesn't claim to be real, though. This one promised nature as it truly is. And the cubs in the den? I read that was a studio, with a model den." },
      { who: "Zoe", text: "Hang on, was that this series? I thought it was a different one. Anyway, so what if it was? Filming real cubs in a real den would have frightened the mother off." },
      { who: "Tom", text: "Right, so say that. One line at the end: some scenes were recreated. That's all I'm asking." },
      { who: "Zoe", text: "Hmm. I think they did put it in the credits. In tiny writing." },
      { who: "Tom", text: "Tiny writing nobody reads. Look, I don't mind the staging, I mind the pretending." },
      { who: "Zoe", text: "But if they added disclaimers every five minutes, nobody would watch. People want to be moved, Tom. That's what makes them care about leopards in the first place." },
      { who: "Tom", text: "That's the argument, yes, and I'm not sure it's wrong. If a film makes people give money to protect the habitat, then, fine, I can live with a bit of staging." },
      { who: "Zoe", text: "So we agree?" },
      { who: "Tom", text: "Not entirely. I still want that honest line at the end. But I'll grumble a lot less next time. Is it the one about the ocean?" },
      { who: "Zoe", text: "It is. Thursday, my place." }
    ],
    skills: "Following a friendly disagreement, separating what a speaker accepts from what he still objects to, and noticing a gradual change of mind ('I'm not sure it's wrong', 'not entirely').",
    questions: [
      { type: "mcq", q: "What does Tom first criticise about the documentary?", options: ["How close the shots were to the animals.", "The high cost of making the series.", "The commentary suggesting one cameraman worked alone.", "The way the leopard was treated."], answer: 2, why: "He says the commentary <em>made it sound as if one cameraman had sat on that ridge all winter</em>, then points to the <em>forty names</em> in the credits. The long lens is Zoe's explanation for the close shots, not his complaint (A)." },
      { type: "mcq", q: "According to Zoe, why might the cubs have been filmed in a studio?", options: ["Real filming would have frightened the mother away.", "It was cheaper than filming in the wild.", "Cubs cannot be filmed outdoors.", "The real den had been destroyed."], answer: 0, why: "She says <em>filming real cubs in a real den would have frightened the mother off</em>. Cost is never mentioned (B), and she is not even sure the scene was from this series." },
      { type: "mcq", q: "What is Tom's main objection?", options: ["That some scenes were staged.", "That the film was too short.", "That the credits were too long.", "That the film pretends nothing was staged."], answer: 3, why: "<em>I don't mind the staging, I mind the pretending</em> shows that staging itself is not the problem (A). The film promised <em>nature as it truly is</em>, and he wants an honest line at the end." },
      { type: "mcq", q: "What is Zoe's argument for keeping the film as it is?", options: ["Viewers prefer drama to facts.", "Emotional impact makes people care about wildlife.", "Disclaimers are not allowed in documentaries.", "Documentary-makers deserve more credit."], answer: 1, why: "She says <em>People want to be moved... That's what makes them care about leopards</em>. She does argue that constant disclaimers would drive viewers away, but she never says viewers prefer drama to facts (A)." },
      { type: "mcq", q: "How does Tom feel at the end?", options: ["Completely persuaded by Zoe.", "Still angry and unwilling to watch another film.", "Partly persuaded, but he still wants a note about recreated scenes.", "Uninterested in the subject of the next film."], answer: 2, why: "He is not fully won over: <em>Not entirely. I still want that honest line</em>, though he will <em>grumble a lot less</em>. He is willing to watch the ocean film, so B and D are wrong." }
    ]
  },
  {
    id: "museum-tour",
    title: "The ironworks tour",
    format: "Guided tour of a small museum",
    examPart: "Part 1/2 style: detail, correction and change of plan",
    intro: "You will hear a guide leading two visitors, Luis and Priya, around a small industrial-heritage museum. Listen for dates, a correction and a change to the plan.",
    script: [
      { who: "Guide", text: "Welcome, everyone, to the Millbrook Ironworks Museum. I'm your guide for the next hour, so please do stop me if you have questions. A little background first. The ironworks opened in eighteen forty-one, and, hang on, no, sorry, that's the date on the old sign." },
      { who: "Guide", text: "The first furnace was actually lit in eighteen thirty-eight. The sign was only added when the company registered." },
      { who: "Luis", text: "So the sign is three years out?" },
      { who: "Guide", text: "Exactly, Luis. Now, the tour normally starts in the forge, but there's a school group in there until half past eleven, so we'll begin upstairs in the pattern shop." },
      { who: "Priya", text: "Is that where they made the moulds?" },
      { who: "Guide", text: "Close. They made the wooden patterns that the moulds were shaped around. A good patternmaker could take three weeks over a single engine part." },
      { who: "Priya", text: "Three weeks! For one part?" },
      { who: "Guide", text: "Yes, it had to be perfect. After that we'd go down to the casting floor, and the steam hammer demonstration is at a quarter past twelve. It used to be at twelve, but it's been moved so it doesn't clash with the school lunch." },
      { who: "Luis", text: "Sorry, can I ask something? I'm afraid I have to leave by half past eleven for a train. Is there any chance of seeing the hammer before that?" },
      { who: "Guide", text: "Ah. Let me think. The engineer could probably do a short run at twenty past eleven, if I ask him nicely. Shall I check?" },
      { who: "Luis", text: "That would be marvellous, if it's not a nuisance." },
      { who: "Guide", text: "No trouble at all. Right, so, change of plan. Pattern shop first, then straight to the hammer, then the forge once the children have gone, which will be too late for you, Luis, I'm afraid." },
      { who: "Luis", text: "That's fine. I'd far rather see the hammer." },
      { who: "Priya", text: "Is photography allowed?" },
      { who: "Guide", text: "Yes, but no flash near the old looms, and no tripods anywhere. The café's by the main entrance, and the shop closes at five, not half past four as it says on the leaflet. Follow me, and mind the step." }
    ],
    skills: "Catching self-corrections ('hang on, no, sorry'), tracking times and dates when two are given, and following how a request changes a plan.",
    questions: [
      { type: "mcq", q: "When was the first furnace lit?", options: ["In 1841.", "In 1838.", "In 1835.", "In 1848."], answer: 1, why: "The guide first says <em>eighteen forty-one</em> but corrects herself: <em>that's the date on the old sign. The first furnace was actually lit in eighteen thirty-eight</em>. So 1841 (A) is the tempting wrong answer." },
      { type: "mcq", q: "Why does the tour begin in the pattern shop?", options: ["The forge is closed for repairs.", "The guide likes it best.", "Priya asked to see it first.", "A school group is using the forge until half past eleven."], answer: 3, why: "<em>There's a school group in there until half past eleven</em>, so the usual starting point is unavailable. Nobody mentions repairs (A), and Priya only asks a question about the moulds." },
      { type: "mcq", q: "What was made in the pattern shop?", options: ["Wooden shapes used to form moulds.", "The finished engine parts.", "The iron for the furnace.", "The signs for the company."], answer: 0, why: "Priya suggests <em>the moulds</em> and the guide corrects her: <em>Close. They made the wooden patterns that the moulds were shaped around.</em> The engine parts were cast later, on the casting floor." },
      { type: "mcq", q: "What does the guide offer to do for Luis?", options: ["Move the main demonstration to twelve o'clock.", "Delay his train.", "Ask the engineer for a short hammer run at twenty past eleven.", "Let him tour the forge before the children."], answer: 2, why: "She says <em>the engineer could probably do a short run at twenty past eleven, if I ask him nicely</em>. The normal demonstration is at <em>a quarter past twelve</em> and is not moved again, and Luis will miss the forge." },
      { type: "mcq", q: "Which part of the tour will Luis miss?", options: ["The pattern shop.", "The forge.", "The hammer.", "The café."], answer: 1, why: "The forge visit comes after the children have left, <em>which will be too late for you, Luis</em>. He sees the pattern shop first and the hammer in the short run." },
      { type: "mcq", q: "When does the museum shop close?", options: ["At half past four.", "At six o'clock.", "At half past five.", "At five o'clock."], answer: 3, why: "The guide says <em>the shop closes at five, not half past four as it says on the leaflet</em>. Half past four (A) is the printed, wrong time." }
    ]
  },
  {
    id: "radio-teen-sleep",
    title: "Why teenagers can't get up",
    format: "Radio interview",
    examPart: "Part 2/3 style: findings, a misconception and a reservation",
    intro: "You will hear a radio presenter interviewing Dr Morgan, a sleep researcher, about teenagers and sleep. Listen for the research findings, the misconception he corrects and the advice he gives.",
    script: [
      { who: "Presenter", text: "Welcome back. Many parents watch their teenagers sleep until noon and wonder whether they're simply lazy. Dr Morgan, a sleep researcher, is here to tell us. Dr Morgan, are they?" },
      { who: "Dr Morgan", text: "In most cases, no, and that's the misconception I'd most like to clear up. A teenager's body clock shifts later during puberty, so they genuinely don't feel sleepy until eleven at night, sometimes later. It's biology, not attitude." },
      { who: "Presenter", text: "You've just completed a study in several secondary schools. What did you find?" },
      { who: "Dr Morgan", text: "We followed about nine hundred pupils, aged fourteen to sixteen, for a year. The headline was that those who slept fewer than seven hours on school nights were nearly twice as likely to report low mood. I should stress that's a link, not a cause. It may well work the other way round." },
      { who: "Presenter", text: "And you also tested a later start to the school day, didn't you?" },
      { who: "Dr Morgan", text: "One school moved its first lesson from a quarter to nine to half past nine. We expected pupils to gain about three quarters of an hour of sleep, but it was nearer forty minutes, because many went to bed later. Even so, attendance improved and pupils felt more alert." },
      { who: "Presenter", text: "So every school should do the same?" },
      { who: "Dr Morgan", text: "I'd be cautious. It's one school, and later finishes cause real difficulties for sport, part-time jobs and bus timetables. It's promising, but it isn't proven." },
      { who: "Presenter", text: "What can families do in the meantime?" },
      { who: "Dr Morgan", text: "Three small things. Put screens away an hour before bed. Keep weekend wake-up times within about two hours of weekday ones, because a huge lie-in is a bit like giving yourself jet lag. And don't rely on strong coffee in the afternoon, because caffeine stays in the body for hours." },
      { who: "Presenter", text: "Some parents swear a phone ban at night works. Does it?" },
      { who: "Dr Morgan", text: "It can help, though blue light matters less than the excitement of the messages. A bedtime ban is sensible, but I wouldn't promise miracles." }
    ],
    skills: "Separating a correlation from a cause, following figures that are close to each other, and recognising a speaker's reservation ('I'd be cautious', 'promising, but not proven').",
    questions: [
      { type: "mcq", q: "Which misconception does Dr Morgan want to correct?", options: ["Teenagers sleep too much.", "Teenagers need less sleep than adults.", "Teenagers who sleep late are just lazy.", "Teenagers cannot fall asleep at all."], answer: 2, why: "The presenter asks whether they are <em>simply lazy</em> and he replies <em>In most cases, no, and that's the misconception I'd most like to clear up</em>. He explains it is <em>biology, not attitude</em>. They do fall asleep, only later, so D is wrong." },
      { type: "mcq", q: "What was the main finding about sleep and mood?", options: ["Pupils who slept under seven hours were more likely to report low mood.", "Pupils who slept more than nine hours were happier.", "Low mood made no difference to sleep.", "Pupils who slept under seven hours did worse in exams."], answer: 0, why: "Those with <em>fewer than seven hours</em> were <em>nearly twice as likely to report low mood</em>. Exam results are never mentioned, so D is wrong." },
      { type: "mcq", q: "What does Dr Morgan say about the link between poor sleep and low mood?", options: ["Poor sleep clearly causes low mood.", "It may be a link only, and the cause could run the other way.", "Low mood is the only cause of poor sleep.", "There is no link at all."], answer: 1, why: "<em>That's a link, not a cause. It may well work the other way round</em>. So he refuses to claim that poor sleep causes low mood (A)." },
      { type: "mcq", q: "What was the effect of the later school start?", options: ["Pupils gained three quarters of an hour of sleep.", "Pupils went to bed earlier than before.", "Attendance got worse.", "Pupils gained less sleep than expected but were more alert."], answer: 3, why: "They gained <em>nearer forty minutes</em>, not the <em>three quarters of an hour</em> expected (A), because many <em>went to bed later</em> (so B is wrong), yet <em>attendance improved</em> and pupils felt <em>more alert</em>." },
      { type: "mcq", q: "Why is Dr Morgan cautious about all schools starting later?", options: ["The evidence comes from only one school, and later finishes cause practical problems.", "Pupils did not like the change.", "Parents opposed it.", "It made pupils go to bed much later."], answer: 0, why: "<em>It's one school, and later finishes cause real difficulties</em> for sport, jobs and buses. Later bedtimes are mentioned as a result, not as his reason for caution (D)." },
      { type: "mcq", q: "What advice does he give about weekends?", options: ["Avoid lie-ins completely.", "Sleep as long as possible to catch up.", "Wake up within about two hours of the weekday time.", "Drink coffee to stay awake until the evening."], answer: 2, why: "<em>Keep weekend wake-up times within about two hours of weekday ones</em>, since a huge lie-in is <em>like giving yourself jet lag</em>. He does not forbid lie-ins altogether (A), and he warns against coffee, not for it (D)." }
    ]
  }
);
