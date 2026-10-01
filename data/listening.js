window.C1 = window.C1 || {};
/* Listening sets, one per course unit (id = unit id). The browser reads each script aloud with text-to-speech. */
C1.listening = [
  {
    id: "work",
    title: "A four-day week?",
    format: "Conversation between two colleagues",
    examPart: "Part 3 style: conversation",
    intro: "You will hear two colleagues, Anna and Mark, discussing a trial at their company. Listen and answer the questions.",
    script: [
      { who: "Anna", text: "Did you see the email from management about the trial? They want us to try a four-day week, starting in January." },
      { who: "Mark", text: "I did. To be honest, I'm torn. On paper it sounds wonderful, but I can't see how the clients will accept it." },
      { who: "Anna", text: "Well, that worries me too. Although they say the same hours will simply be squeezed into four longer days, so nobody's really working less." },
      { who: "Mark", text: "Hmm, so it's not what I'd call a day off, more a rearrangement. I'd have thought they'd cut the hours and keep the pay, like that company in the news." },
      { who: "Anna", text: "Actually, they did consider it, but the finance director said it was too risky for a firm of our size." },
      { who: "Mark", text: "Fair enough. My real concern is Fridays. That's when most of our clients phone with urgent problems." },
      { who: "Anna", text: "True. They've suggested a rota, so one person from each team stays on call every Friday, and gets a day off the following week." },
      { who: "Mark", text: "That sounds reasonable. I suppose I'm just resistant to change. I've done the same routine for eleven years." },
      { who: "Anna", text: "You, resistant? You were the first to try the new booking software!" },
      { who: "Mark", text: "That's different. Software doesn't change my weekend." },
      { who: "Anna", text: "Ha. Well, I'm quite excited, actually. I'd use the extra day for my pottery course. I've been on the waiting list for two years." },
      { who: "Mark", text: "Then you should put your name down for the first group of volunteers. The deadline is the fourteenth of November. Are you going to?" },
      { who: "Anna", text: "I will. What about you?" },
      { who: "Mark", text: "I'll wait and see how the first group gets on. If they come back looking exhausted, I'll stay put. If not, I'll sign up for the second round in spring." },
      { who: "Anna", text: "Very sensible. Though if everyone waits, there won't be a trial at all." },
      { who: "Mark", text: "Ha, that's a risk. All right, you've persuaded me. I'll talk to my team leader tomorrow, and I'll let you know." }
    ],
    skills: "Understanding what is really being proposed, separating rejected ideas from the actual plan, and following how a speaker's attitude changes.",
    questions: [
      { type: "mcq", q: "What does Anna say about the proposed schedule?", options: ["Total working time will be reduced.", "Staff will do the same hours over fewer days.", "Salaries will be cut to pay for it.", "Only some departments will take part."], answer: 1, why: "Anna says <em>the same hours will simply be squeezed into four longer days</em>, so the hours stay the same. A is wrong: Mark suggests shorter hours, but that is not the plan. C and D are never mentioned." },
      { type: "mcq", q: "Why was the idea of shorter hours with the same pay rejected?", options: ["Clients would complain.", "The company is too small to take the risk.", "Employees preferred longer days.", "Other firms had tried it and failed."], answer: 1, why: "Anna reports that the finance director said it was <em>too risky for a firm of our size</em>. Clients (A) are Mark's separate worry about the four-day week, and C and D are not mentioned. The company <em>in the news</em> is only an example Mark gives." },
      { type: "gap", q: "Urgent client calls on Fridays will be covered by a ___ system.", answers: ["rota"], why: "Anna says <em>They've suggested a rota</em>, with one person from each team on call every Friday." },
      { type: "gap", q: "Anna would like to spend her extra day on a ___ course.", answers: ["pottery"], why: "Anna says <em>I'd use the extra day for my pottery course</em>." },
      { type: "mcq", q: "How does Mark feel about volunteering by the end of the conversation?", options: ["He has decided to wait until spring whatever happens.", "He is now willing to consider joining the first group.", "He thinks the trial should be cancelled.", "He wants Anna to decide for him."], answer: 1, why: "Mark first says he will wait for the second round, but then <em>you've persuaded me. I'll talk to my team leader tomorrow</em>, so he now considers the first group. A is what he said earlier, not at the end. C and D are never suggested." }
    ]
  },
  {
    id: "technology",
    title: "Why we cannot predict technology",
    format: "Talk to a community group",
    examPart: "Part 2 style: monologue",
    intro: "You will hear a journalist, Rachel, giving a talk about new technology. Listen and answer the questions.",
    script: [
      { who: "Rachel", text: "Good evening, everyone. Tonight I'd like to talk about why we're so bad at predicting which technologies will change our lives. Take the electric light. When it arrived, many people assumed it would simply replace candles, and that was that. Nobody guessed that it would reshape the working day, allow night shifts, and even change how we sleep. We tend to imagine new inventions as better versions of what we already have. Real change usually comes from the side effects." },
      { who: "Rachel", text: "Now, mobile phones are an obvious example. In the early nineties, the idea was that you could make calls while walking. Very few people foresaw that the call itself would become one of the least important functions. Today, most of us would be more upset to lose our maps and messages than our ability to phone." },
      { who: "Rachel", text: "So what's the lesson? I think it's twofold. First, be suspicious of confident predictions, including the ones from technology companies, who naturally want us to believe that their latest product is a revolution. Second, and this is where I'd disagree with the pessimists, we shouldn't assume the worst either. Every generation has worried that a new device will make us lazy or lonely. Books were once accused of ruining memory. Yet here we are, still remembering things." },
      { who: "Rachel", text: "That said, I don't want to be complacent. The speed of change now is much faster, which leaves less time for society to adapt its rules. Take artificial intelligence. The technology itself may matter less than the habits that form around it: whether students use it to think or to avoid thinking. So my advice is simple. Watch the habits, not the headlines. Ask what people actually do with a tool after six months, not what the advert promised on day one. Thank you. I'm happy to take questions." }
    ],
    skills: "Following a speaker's argument across a long talk, recognising examples used to support a point, and identifying opinion and advice.",
    questions: [
      { type: "mcq", q: "What point does the speaker make about the electric light?", options: ["It spread more slowly than people expected.", "Its most important effects were not foreseen.", "It was first introduced to help people sleep.", "Workers refused to accept it at first."], answer: 1, why: "She says people <em>assumed it would simply replace candles</em> and <em>nobody guessed</em> it would reshape working life. A and D are never said. C twists the mention of sleep, which was only one unexpected side effect." },
      { type: "gap", q: "In the early nineties, people saw the mobile phone mainly as a way of making ___ on the move.", answers: ["calls", "phone calls"], why: "She says <em>the idea was that you could make calls while walking</em>. Maps and messages came later." },
      { type: "mcq", q: "What is the speaker's attitude to predictions made by technology companies?", options: ["They are usually accurate.", "They should be treated with caution.", "They are deliberately dishonest.", "They should be ignored completely."], answer: 1, why: "She says <em>be suspicious of confident predictions</em> because companies <em>naturally want us to believe</em> in their product. That is caution, not proof of dishonesty (C), and she does not say to ignore them (D). A contradicts her argument." },
      { type: "mcq", q: "According to the speaker, why is the present situation different from the past?", options: ["Devices are more addictive than before.", "Society has less time to adjust.", "Technology companies are more powerful.", "People have become more pessimistic."], answer: 1, why: "She says <em>the speed of change now is much faster, which leaves less time for society to adapt its rules</em>. Addiction, power and pessimism are not given as reasons; she says earlier generations were pessimistic too." },
      { type: "gap", q: "The speaker thinks what matters most is the ___ that develop around a technology.", answers: ["habits"], why: "She says the technology <em>may matter less than the habits that form around it</em>, and ends with <em>watch the habits, not the headlines</em>." }
    ]
  },
  {
    id: "health",
    title: "Do we really need eight hours?",
    format: "Radio interview with a sleep researcher",
    examPart: "Part 3 style: interview",
    intro: "You will hear a radio presenter interviewing a sleep researcher, Dr Hill. Listen and answer the questions.",
    script: [
      { who: "Presenter", text: "Today we're talking about sleep, and with me is Dr Hill, a sleep researcher. Dr Hill, many of us believe we can cope on five hours a night. Can we?" },
      { who: "Dr Hill", text: "Well, most people can't, though they often think they can. That's the interesting part. In studies, volunteers who sleep too little for a week tell us they feel fine, yet their performance on memory tasks drops sharply. They've simply lost the ability to notice the problem." },
      { who: "Presenter", text: "So feeling alert isn't a reliable guide." },
      { who: "Dr Hill", text: "Exactly. And caffeine makes it worse, because it hides tiredness without removing it." },
      { who: "Presenter", text: "A lot of listeners write to us about napping. Is that a good habit or a bad one?" },
      { who: "Dr Hill", text: "It depends on when and how long. A short nap, say twenty minutes, in the early afternoon can improve concentration. The trouble starts when people nap for an hour or more late in the day, because that takes the edge off the pressure to sleep at night, and then they lie awake." },
      { who: "Presenter", text: "And what about screens before bed? I'm sure I'm guilty." },
      { who: "Dr Hill", text: "Everyone is, and I'd be careful not to blame the blue light alone. That's the popular explanation, but the evidence is mixed. I'd say the content matters more. If you're reading stressful emails or arguing online, your mind stays busy, and the light is almost beside the point." },
      { who: "Presenter", text: "So what's your single best piece of advice for our listeners?" },
      { who: "Dr Hill", text: "Keep regular hours. Going to bed and getting up at roughly the same time, even at weekends, does more than any gadget or supplement. People hope for a clever trick, but consistency is dull, and it works." },
      { who: "Presenter", text: "Dr Hill, thank you very much for joining us." },
      { who: "Dr Hill", text: "My pleasure. Sleep well, everyone." }
    ],
    skills: "Understanding an expert's explanation, noticing when a popular belief is challenged, and matching paraphrases to what was said.",
    questions: [
      { type: "mcq", q: "What does Dr Hill say about people who regularly sleep for five hours?", options: ["They perform well but feel unwell.", "They fail to realise that their performance has declined.", "They make up for it by remembering more.", "They need less sleep as they grow older."], answer: 1, why: "Volunteers <em>tell us they feel fine, yet their performance on memory tasks drops sharply</em>; they have <em>lost the ability to notice the problem</em>. A reverses this. C and D are never mentioned." },
      { type: "gap", q: "A nap of about ___ minutes in the early afternoon can help concentration.", answers: ["twenty", "20"], why: "Dr Hill says <em>A short nap, say twenty minutes, in the early afternoon can improve concentration</em>." },
      { type: "mcq", q: "Why can a long nap late in the day cause problems?", options: ["It causes headaches in the evening.", "It makes it harder to fall asleep later.", "It reduces the benefit of caffeine.", "It replaces the need to sleep at night."], answer: 1, why: "A long late nap <em>takes the edge off the pressure to sleep at night, and then they lie awake</em>, so falling asleep is harder. Headaches and caffeine are not mentioned. D is the opposite: people lie awake because they still want to sleep." },
      { type: "mcq", q: "What is Dr Hill's view of blue light from screens?", options: ["It is the main reason screens harm sleep.", "Its role is less certain than many people believe.", "It has no effect on anyone.", "It can easily be removed with a filter."], answer: 1, why: "She calls it <em>the popular explanation</em> but says <em>the evidence is mixed</em> and the content matters more. She does not say it has no effect (C), and filters are not discussed." },
      { type: "gap", q: "In her opinion, the most effective habit is going to bed at ___ times.", answers: ["regular", "the same", "regular times"], why: "Her best advice is <em>Keep regular hours</em>: going to bed and getting up at roughly the same time, even at weekends." }
    ]
  },
  {
    id: "nature",
    title: "Beavers return to the valley",
    format: "Extract from a radio programme",
    examPart: "Part 1 style: radio programme extract",
    intro: "You will hear part of a radio programme about reintroducing beavers to a river valley. Listen and answer the questions.",
    script: [
      { who: "Presenter", text: "Welcome to Countryside Today. This week we look at a project that's dividing opinion: the return of beavers to a river valley in the west of England. Our reporter, Tom Reed, went to see it." },
      { who: "Tom", text: "I'm standing beside a stream that looks very different from how it did five years ago. The beavers arrived in a fenced area, and they've built dams that have created a series of pools. The first thing you notice is the sound, a gentle trickle rather than a rush. Local ecologists say the pools hold back water after heavy rain, which has reduced flooding in the village downstream. They also say fish, frogs and dragonflies have increased. Not everybody is convinced though. I spoke to Helen Marsh, who farms the land next door." },
      { who: "Helen", text: "I'll be honest, I was dead against it at the start. I thought they'd ruin my fields. Actually, the dams have been less of a problem than I feared, and my neighbour's lower fields stay greener in summer. But my worry now is the future. The beavers don't recognise fences, and if they spread further, somebody will have to decide who pays when a tree falls on a barn or a ditch gets blocked." },
      { who: "Tom", text: "So you're not against them?" },
      { who: "Helen", text: "Not against, no. I'd just like clear rules before the numbers grow. The scientists are very enthusiastic, which is fine, but they don't have to live with the consequences." },
      { who: "Tom", text: "The project managers accept that. They're proposing a fund, paid for by the visitors who come to watch the beavers at dusk, to compensate landowners for any damage." },
      { who: "Presenter", text: "Thanks, Tom. A fair compromise, perhaps, though the debate is far from over. After the break, we'll hear from a bird expert about the first cuckoos of spring." }
    ],
    skills: "Picking out the main change described by a reporter, following how one person's opinion has developed, and linking a criticism to its target.",
    questions: [
      { type: "mcq", q: "What does the reporter say is the most immediately noticeable change at the stream?", options: ["The water is much deeper.", "The water sounds calmer.", "The banks are covered in new plants.", "The stream has become clearer."], answer: 1, why: "Tom says <em>The first thing you notice is the sound, a gentle trickle rather than a rush</em>. Depth, plants and clarity are never mentioned; wildlife is mentioned only later." },
      { type: "gap", q: "Ecologists believe that the pools have helped to reduce ___ in the village.", answers: ["flooding"], why: "Ecologists say the pools hold back water, <em>which has reduced flooding in the village downstream</em>." },
      { type: "mcq", q: "How does Helen feel about the beavers now?", options: ["Her original fears have mostly proved correct.", "She worries less about the dams but fears future problems.", "She strongly supports spreading them further.", "She wants them removed from the valley."], answer: 1, why: "She says <em>the dams have been less of a problem than I feared</em> but <em>my worry now is the future</em>. A contradicts the first part, C and D are too extreme: she says <em>Not against, no</em>, but wants rules." },
      { type: "mcq", q: "What does Helen criticise about the scientists?", options: ["They exaggerate the benefits.", "They do not face the consequences of the project.", "They have ignored the problem of fences.", "They have refused to pay for damage."], answer: 1, why: "She says <em>they don't have to live with the consequences</em>. She calls them enthusiastic, not dishonest (A). Fences and payment are her own worries, not criticisms of scientists." },
      { type: "gap", q: "Claims for damage would be paid from money raised from ___.", answers: ["visitors"], why: "Tom reports a fund <em>paid for by the visitors who come to watch the beavers</em>." }
    ]
  },
  {
    id: "cities",
    title: "Closing the high street",
    format: "Discussion between three people",
    examPart: "Part 4 style: discussion",
    intro: "You will hear three people, Priya, Luis and Dan, discussing a plan to close their high street to traffic. Listen and answer the questions.",
    script: [
      { who: "Priya", text: "So the council wants to close the high street to traffic on Saturdays. What do you two think?" },
      { who: "Luis", text: "I'm in favour, mainly because of the noise and fumes. I run a café there, and customers say it's far nicer to sit outside when there are no buses roaring past." },
      { who: "Dan", text: "I'm less sure. I own a shoe shop, and most of my regular customers are older people who drive in and park nearby. If they can't, I'm afraid they'll simply go to the retail park." },
      { who: "Priya", text: "But isn't that what shops always say? When they pedestrianised the centre in another city, takings actually rose." },
      { who: "Dan", text: "That's true in some places, but this isn't a big city. We have poor bus links, so it isn't a fair comparison." },
      { who: "Luis", text: "I'd agree with Dan on the buses. The council should sort out the service first, otherwise the plan is half finished." },
      { who: "Priya", text: "So you both want the same thing, really, just in a different order." },
      { who: "Luis", text: "Possibly. I'd say try it for three months and review it, instead of arguing endlessly." },
      { who: "Dan", text: "A trial I could live with, provided the council offers a free shuttle from the car park. And provided they ask traders before choosing the dates. Last time, they announced a street market on the same day as our summer sale without a word to anyone." },
      { who: "Priya", text: "Which brings us to communication. Honestly, I think that's the real problem, not the road closure itself." },
      { who: "Luis", text: "Agreed. People resist change they haven't been asked about." },
      { who: "Dan", text: "Well, put like that, I'd be willing to write a joint letter. If the three of us sign it, they might actually listen." },
      { who: "Priya", text: "I'll draft it tonight and send it round." }
    ],
    skills: "Keeping track of who holds which opinion, spotting partial agreement, and recognising when speakers reach a shared conclusion.",
    questions: [
      { type: "mcq", q: "Luis supports the closure mainly because", options: ["it will attract more people to eat out.", "traffic currently makes his customers uncomfortable.", "the council has promised him financial help.", "buses cause delays for his deliveries."], answer: 1, why: "He mentions <em>the noise and fumes</em> and says customers prefer sitting outside <em>when there are no buses roaring past</em>. A is not said by Luis, and C and D are never mentioned." },
      { type: "mcq", q: "Why does Dan doubt the comparison with the other city?", options: ["The other city's shops sold different goods.", "Public transport here is weaker, so the situation is different.", "Takings there only rose for a short time.", "The council there had consulted traders."], answer: 1, why: "Dan says <em>this isn't a big city. We have poor bus links, so it isn't a fair comparison</em>. The other options are not mentioned." },
      { type: "gap", q: "Dan would accept a trial if there were a free ___ from the car park.", answers: ["shuttle"], why: "Dan says <em>provided the council offers a free shuttle from the car park</em>." },
      { type: "gap", q: "The council once held a street ___ on the same day as Dan's sale without telling traders.", answers: ["market"], why: "Dan says <em>they announced a street market on the same day as our summer sale without a word to anyone</em>." },
      { type: "mcq", q: "Which point do all three speakers finally agree on?", options: ["The closure should become permanent.", "The council has not consulted people properly.", "Bus services in the town are already good.", "Saturday is the wrong day for a closure."], answer: 1, why: "Priya says communication is <em>the real problem</em>, Luis says <em>People resist change they haven't been asked about</em>, and Dan agrees to sign a joint letter. A is not discussed, C is the opposite of what Dan and Luis say, and the day is never questioned." }
    ]
  },
  {
    id: "education",
    title: "Why cramming fails",
    format: "Extract from a university lecture",
    examPart: "Part 2 style: lecture",
    intro: "You will hear part of a lecture about how people learn. Listen and answer the questions.",
    script: [
      { who: "Dr Morgan", text: "Good morning. Today I want to look at one of the most robust findings in learning research, which is sometimes called the spacing effect. Put simply, we remember more when we spread our study over time than when we cram it into one session. Now, you may be thinking that this is obvious, and your teachers have been telling you this for years. But what's striking is that students who know this still cram. Why is that?" },
      { who: "Dr Morgan", text: "The reason, I'd suggest, is that cramming feels productive. When you read the same page five times the night before an exam, the material seems familiar, and familiarity is easily mistaken for knowledge. Spaced practice feels harder, because you've partly forgotten the material by the time you return to it, and you have to work to retrieve it. Researchers call this a desirable difficulty. The effort is precisely what strengthens memory." },
      { who: "Dr Morgan", text: "Let me give you an example from vocabulary learning. In one study, two groups of adult learners studied the same forty words. One group did all their studying in a single afternoon. The other group did the same total amount of study, but split across four days. A week later, the second group recalled considerably more. Interestingly, when asked which method had worked better, most of the first group said theirs." },
      { who: "Dr Morgan", text: "Now, I'm not suggesting that cramming is useless. If your test is tomorrow, it will probably get you through. The problem is that the knowledge disappears quickly, which matters if you're learning a language you intend to use for years." },
      { who: "Dr Morgan", text: "So what should you do? Review new material after a day, then after a few days, then after a week or so. You don't need elaborate software, although there are some good apps. A simple notebook and a calendar will do. Next week, we'll turn to the role of sleep in consolidating these memories." }
    ],
    skills: "Understanding causes and explanations in academic speech, distinguishing what researchers found from what participants believed, and noting qualified statements.",
    questions: [
      { type: "mcq", q: "According to the lecturer, why do students who know about spacing still cram?", options: ["Nobody has explained it to them properly.", "Cramming gives a misleading impression of learning.", "Cramming takes less time overall.", "Their teachers encourage it."], answer: 1, why: "She says cramming <em>feels productive</em> and <em>familiarity is easily mistaken for knowledge</em>. A contradicts <em>your teachers have been telling you this for years</em>; C and D are not mentioned." },
      { type: "gap", q: "Spaced practice demands effort because learners have partly ___ the material.", answers: ["forgotten"], why: "She says spaced practice feels harder <em>because you've partly forgotten the material by the time you return to it</em>." },
      { type: "mcq", q: "What point does the lecturer make about the first group in the vocabulary study?", options: ["They studied for less time than the second group.", "They misjudged how effective their method was.", "They forgot most of the words within a day.", "They scored higher on the test."], answer: 1, why: "Most of that group <em>said theirs</em> had worked better, although the other group <em>recalled considerably more</em>. A is wrong because the total amount of study was the same. C and D are not true or not mentioned." },
      { type: "mcq", q: "What is the lecturer's view of cramming?", options: ["It never works.", "It can work for a test tomorrow but the knowledge does not last.", "It is the best method for learning languages.", "It works better with specialist software."], answer: 1, why: "She says <em>I'm not suggesting that cramming is useless</em>, but <em>the knowledge disappears quickly</em>. A is too strong, and C and D are the opposite of or unrelated to her point." },
      { type: "gap", q: "To organise reviews, learners only need a notebook and a ___.", answers: ["calendar"], why: "She says <em>A simple notebook and a calendar will do</em>." }
    ]
  },
  {
    id: "society",
    title: "How do we get our news?",
    format: "Extract from a podcast",
    examPart: "Part 4 style: discussion",
    intro: "You will hear two presenters, Sofia and James, discussing how people follow the news. Listen and answer the questions.",
    script: [
      { who: "Sofia", text: "Welcome back to Think Twice, the podcast where we question what we think we know. I'm Sofia." },
      { who: "James", text: "And I'm James. Today's topic is how we get our news, and whether we trust it." },
      { who: "Sofia", text: "I'll start with a confession. I get most of my news from my phone, usually in the queue for coffee. A headline, a quick glance, and I move on." },
      { who: "James", text: "Which is exactly what worries me. When you only read headlines, you end up with opinions based on a sentence. And headlines are written to attract attention, not to inform." },
      { who: "Sofia", text: "Hold on, though. I'd argue it's not that different from the past. People used to skim the front page of a newspaper on the way to work. The medium changed, the habit didn't." },
      { who: "James", text: "Partly. But the difference is who chooses what you see. A newspaper editor decided the front page for everyone. Now an algorithm decides, and it learns what you click on. So two neighbours can live in completely different information worlds." },
      { who: "Sofia", text: "I'll concede that. Though some people claim algorithms trap us in bubbles, and I'm not convinced it's as bad as it's made out. Research suggests that many people still come across opposing views, often because their friends post them." },
      { who: "James", text: "Often to disagree with them, though." },
      { who: "Sofia", text: "Fair point. Anyway, the survey we saw this week said most people trust the news less than they did ten years ago. Does that surprise you?" },
      { who: "James", text: "Not at all. But I think some distrust is healthy. The real danger is when people stop trusting anything, because then they believe whoever shouts loudest." },
      { who: "Sofia", text: "So what do we do about it?" },
      { who: "James", text: "Pick two or three sources you trust, and read at least one article properly every day." },
      { who: "Sofia", text: "Ha, challenge accepted. We'll tell you next week how we got on." }
    ],
    skills: "Following agreement, concession and disagreement between speakers, and identifying the exact point on which two opinions differ.",
    questions: [
      { type: "mcq", q: "What is Sofia's argument about reading headlines on a phone?", options: ["Phones have made people more careless than before.", "The way people skim the news is not really new.", "Newspapers used to be more accurate.", "Editors gave readers more information."], answer: 1, why: "She says <em>People used to skim the front page of a newspaper</em> and <em>The medium changed, the habit didn't</em>. A is the opposite, and C and D are never claimed." },
      { type: "mcq", q: "What does James see as the key difference from the past?", options: ["Headlines are now longer.", "Content is chosen separately for each person.", "People read fewer sources than before.", "Editors no longer check the facts."], answer: 1, why: "He says a newspaper editor <em>decided the front page for everyone</em>, whereas now <em>an algorithm decides, and it learns what you click on</em>, so neighbours see different things. Headline length, number of sources and fact checking are not mentioned." },
      { type: "gap", q: "Sofia doubts that algorithms create ___ as seriously as some people claim.", answers: ["bubbles", "bubble"], why: "Sofia says <em>some people claim algorithms trap us in bubbles, and I'm not convinced it's as bad as it's made out</em>." },
      { type: "mcq", q: "What is James's opinion of people's distrust of the news?", options: ["All distrust is harmful.", "Some distrust is healthy, but total distrust is dangerous.", "The survey results are not reliable.", "People should trust only one source."], answer: 1, why: "He says <em>some distrust is healthy</em> but <em>the real danger is when people stop trusting anything</em>. A is too strong. C is not said, and D contradicts his advice to choose <em>two or three sources</em>." },
      { type: "gap", q: "James challenges listeners to read one complete ___ carefully each day.", answers: ["article"], why: "James says <em>read at least one article properly every day</em>." }
    ]
  },
  {
    id: "culture",
    title: "Planning a cycling trip",
    format: "Phone message and conversation",
    examPart: "Part 1 style: message and conversation",
    intro: "You will hear a phone message left by Rosa, and then a conversation between Rosa and her friend Ben. Listen and answer the questions.",
    script: [
      { who: "Rosa", text: "Hi Ben, it's Rosa. Sorry to miss you. I'm calling about the cycling trip in the Basque Country. I've looked at the dates you suggested, and the first week of June is booked solid at the guesthouse, so I wondered about moving to the second week. Also, the guidebook says the festival in the village is on the twelfth, which would be a lovely thing to include. Call me back when you can, I'm at the office until six. Bye." },
      { who: "Ben", text: "Hi Rosa, it's Ben, returning your call. I got your message." },
      { who: "Rosa", text: "Oh, great. So, second week of June? I'd quite like to be there for the festival." },
      { who: "Ben", text: "Honestly, I'm not sure. Festivals are always packed, and for me the best part of a trip like this is having a quiet road to yourself. It's not really for me, I'm afraid." },
      { who: "Rosa", text: "I take your point, but part of the pleasure of travelling is seeing how local people celebrate. Still, I don't want to force it. What if we spend one night there and see?" },
      { who: "Ben", text: "One night I can live with. Provided we're not stuck without a room." },
      { who: "Rosa", text: "Booking's no problem. The guesthouse owner said she'd keep two rooms if we confirm by Friday." },
      { who: "Ben", text: "What about the route? I saw that some of the climbs are steep. I'm not as fit as I'd like to be." },
      { who: "Rosa", text: "Neither am I. But the guidebook marks an alternative on every hard stage that goes round the hills, so we needn't push ourselves." },
      { who: "Ben", text: "Right, that makes me feel better. Should we take our own bikes on the train, or hire some there?" },
      { who: "Rosa", text: "Hire. Apparently taking bikes on the regional trains involves a hefty fee and a reservation." },
      { who: "Ben", text: "Hire it is, then. I'll transfer my share of the deposit tonight." },
      { who: "Rosa", text: "Brilliant. I'll confirm with the guesthouse in the morning." }
    ],
    skills: "Picking out the reason for a change of plan in a message, recognising polite reluctance, and following how a problem is solved in conversation.",
    questions: [
      { type: "mcq", q: "Why does Rosa suggest changing the dates?", options: ["She is too busy at work in the first week.", "The accommodation is not available in the first week.", "The festival has been moved to an earlier date.", "Ben told her he preferred the later date."], answer: 1, why: "She says the first week <em>is booked solid at the guesthouse</em>. Working until six is only when Ben can call back, and the festival date is given as a bonus, not a change. D is not mentioned." },
      { type: "gap", q: "Rosa has read that the village festival takes place on the ___ of the month.", answers: ["twelfth", "12th", "12"], why: "In her message Rosa says <em>the festival in the village is on the twelfth</em>." },
      { type: "mcq", q: "How does Ben react to the idea of going to the festival?", options: ["He dislikes all local celebrations.", "He would prefer to avoid crowds but agrees to a short visit.", "He has been to the festival before.", "He cannot afford to stay there."], answer: 1, why: "He says <em>Festivals are always packed</em> and he prefers <em>a quiet road</em>, but then <em>One night I can live with</em>. A is too extreme, and C and D are never mentioned." },
      { type: "gap", q: "Ben's worry about steep climbs is solved because every hard stage has an ___ route.", answers: ["alternative", "alternative route"], why: "Rosa says <em>the guidebook marks an alternative on every hard stage that goes round the hills</em>." },
      { type: "mcq", q: "Why do they decide to hire bicycles?", options: ["It is cheaper than buying new ones.", "Taking bikes on the train is costly and needs booking.", "The guesthouse owner offers a discount.", "Ben's bicycle is too old for the route."], answer: 1, why: "Rosa says carrying bikes on regional trains <em>involves a hefty fee and a reservation</em>. Cheaper than buying, a discount, and the age of Ben's bike are never mentioned." }
    ]
  }
];
