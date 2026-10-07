window.C1 = window.C1 || {};
C1.listening = C1.listening || [];
/* Listening sets 6: a radio talk on urban foxes, a three-way panel on remote study, an interview with a business founder about a failure. */
C1.listening.push(
  {
    id: "radio-foxes",
    title: "Foxes in the suburbs",
    format: "Radio talk with an ecologist",
    examPart: "Part 2/lecture style: facts, figures and a corrected myth",
    intro: "You will hear a radio presenter talking to Dr Hill, an ecologist who has studied urban foxes. Listen for the facts, the numbers and the things that surprised the researchers.",
    script: [
      { who: "Presenter", text: "Good evening, and welcome to Nature Notes. Tonight we're talking about the red fox, which now lives in the middle of most of our cities. With me is Dr Hill, who has spent nine years following foxes through the streets of one northern town." },
      { who: "Dr Hill", text: "Thanks. Happy to be here." },
      { who: "Presenter", text: "First, a confession. I always assumed foxes had moved into town because the countryside was running out of food." },
      { who: "Dr Hill", text: "Yes, that's what most people think, but it isn't really the story. Foxes began settling in suburbs about ninety years ago, when new housing estates with big gardens appeared. They didn't flee anything, they simply found somewhere good." },
      { who: "Presenter", text: "And how many are we talking about?" },
      { who: "Dr Hill", text: "In our study town, roughly one fox for every hundred households. That surprises people. They hear a fox screaming at night and imagine dozens, but it's usually the same three animals." },
      { who: "Presenter", text: "Now, I've always heard they're a danger to pets." },
      { who: "Dr Hill", text: "That's the big myth, I'm afraid. We checked local vets' records over six years. Only two cats out of several thousand were definitely injured by a fox. Cars were far more dangerous." },
      { who: "Presenter", text: "So what do they eat? Bins, presumably." },
      { who: "Dr Hill", text: "Well, that's half a myth. Bins do feature, but when we analysed what the foxes had eaten, about a third of it was earthworms and beetles. Worms! Not what you'd expect from a city scavenger." },
      { who: "Presenter", text: "And I gather you found something unexpected about how far they travel." },
      { who: "Dr Hill", text: "Yes. We fitted collars to twelve foxes, expecting them to roam widely. In fact most stayed within an area about the size of four football pitches, and one female spent a whole winter living under a single garden shed." },
      { who: "Presenter", text: "Does that mean feeding them is harmless?" },
      { who: "Dr Hill", text: "Not quite. A little is harmless, but when people leave out whole plates of food every night, the foxes lose their wariness, and that's when the trouble starts. Best to leave them alone." },
      { who: "Presenter", text: "Dr Hill, thank you very much." },
      { who: "Dr Hill", text: "My pleasure." }
    ],
    skills: "Following a chain of facts and figures, spotting a myth that is corrected ('That's the big myth'), and not choosing the first idea the presenter suggests.",
    questions: [
      { type: "mcq", q: "According to Dr Hill, why did foxes first settle in suburbs?", options: ["The countryside no longer had enough food.", "Farmers had begun to drive them away.", "New housing estates offered them good places to live.", "People had started to feed them regularly."], answer: 2, why: "She says foxes settled when <em>new housing estates with big gardens appeared</em> and <em>They didn't flee anything</em>. The presenter's own assumption about food shortage (A) is exactly what she rejects." },
      { type: "mcq", q: "What does Dr Hill say about the number of foxes in her study town?", options: ["There are fewer than most people imagine.", "There are about one hundred in total.", "There are far more than the screaming suggests.", "The number has fallen over nine years."], answer: 0, why: "<em>one fox for every hundred households</em> and <em>it's usually the same three animals</em> show that the noise exaggerates the numbers. The figure of one hundred (B) refers to households, not foxes." },
      { type: "mcq", q: "What did the vets' records show about pets?", options: ["Foxes injured a large number of cats.", "Dogs were hurt more often than cats.", "Vets could not tell what had caused most injuries.", "Foxes were rarely responsible for injuries to cats."], answer: 3, why: "<em>Only two cats out of several thousand were definitely injured by a fox</em>, and she adds that cars were far more dangerous. Nothing is said about dogs (B)." },
      { type: "mcq", q: "What was surprising about the foxes' diet?", options: ["They ate no food from bins at all.", "A large part of it was earthworms and beetles.", "They preferred cat food to other scraps.", "Most of it came from gardens with ponds."], answer: 1, why: "<em>about a third of it was earthworms and beetles</em>. Dr Hill calls the bin idea <em>half a myth</em>, so bins still feature and option A is wrong." },
      { type: "mcq", q: "What did the collars reveal about the foxes' movements?", options: ["Most travelled many kilometres each night.", "Females moved around more than males.", "Most stayed in quite a small area.", "Twelve foxes spent the winter under one shed."], answer: 2, why: "<em>most stayed within an area about the size of four football pitches</em>. Only one female lived under a shed all winter, so D overstates it." },
      { type: "mcq", q: "What is Dr Hill's view on feeding foxes?", options: ["Small amounts do little harm, but regular large meals cause problems.", "It should be banned in all towns.", "It helps foxes survive hard winters.", "It makes no difference to how they behave."], answer: 0, why: "<em>A little is harmless, but when people leave out whole plates of food every night, the foxes lose their wariness</em>. She does not call for a ban (B); she only advises leaving them alone." }
    ]
  },
  {
    id: "panel-remote-study",
    title: "Should study move online?",
    format: "Panel discussion between a lecturer, a student and a parent",
    examPart: "Part 4 style: agreement, disagreement and changing opinions",
    intro: "You will hear Helen, a university lecturer, Dev, a student, and Gemma, a parent, discussing online study. Listen for who changes their mind and what each person finally agrees to.",
    script: [
      { who: "Helen", text: "Right, so the question for today is whether more of our teaching should move online. Dev, you've done both, so what's your honest view?" },
      { who: "Dev", text: "I'd say remote study is brilliant for lectures. I can pause, rewind, make a coffee. But seminars? I switched my camera off half the time, to be honest, and I'm not proud of it." },
      { who: "Gemma", text: "As a parent, I was sceptical at first. My daughter did her first term from her bedroom and I assumed she'd just fall behind. But she actually did better in her essays." },
      { who: "Helen", text: "That's interesting, Gemma, because the data I've seen is mixed. Grades went up slightly in our department, but I wouldn't say that proves anything. It may simply be that exams were easier to sit at home." },
      { who: "Dev", text: "Or that people could work when they're awake. I'm useless before ten." },
      { who: "Gemma", text: "Fair point. Though she did say she felt lonely, and I didn't take that seriously enough at the time." },
      { who: "Helen", text: "That worries me most. Isolation. I'll admit I used to think of it as a minor issue, but the students who left last year were mostly the ones who never came to anything in person." },
      { who: "Dev", text: "Hang on, though, Helen. Some of them had jobs. For them, online was the only way they could study at all." },
      { who: "Helen", text: "You're right, and I should have said that. Okay, so access is a real gain." },
      { who: "Gemma", text: "So are we saying it's a compromise? Mostly in person, with some online?" },
      { who: "Dev", text: "I'd flip it. Mostly online, but with compulsory face to face weeks. Otherwise, why pay for a campus?" },
      { who: "Helen", text: "Well, labs can't go online, and neither can the library, which students use more than they admit." },
      { who: "Dev", text: "Hmm. I hadn't thought about labs. Fine, I'll give you that one." },
      { who: "Gemma", text: "I suppose I'd settle for Helen's version, mostly in person, as long as the fees come down for the online parts." },
      { who: "Helen", text: "That, I think, is a conversation for another day." },
      { who: "Dev", text: "Ha. Of course it is." }
    ],
    skills: "Tracking opinions that shift during a discussion ('I'll admit I used to think...', 'Fair point'), spotting concessions, and telling an initial view from a final one.",
    questions: [
      { type: "mcq", q: "What is Dev's main criticism of online study?", options: ["Lectures are too long to watch.", "Seminars are hard to take part in properly.", "It is difficult to work before ten.", "He cannot afford the equipment."], answer: 1, why: "He says remote study is <em>brilliant for lectures</em> but of seminars, <em>I switched my camera off half the time</em>. Being useless before ten (C) is a reason why home study suited some people, not a criticism." },
      { type: "mcq", q: "How did Gemma's opinion change?", options: ["She stopped believing her daughter's essays were good.", "She now thinks online study is better for everyone.", "She became sure that grades always rise at home.", "She began to take her daughter's loneliness more seriously."], answer: 3, why: "She first felt <em>sceptical</em> and then admits <em>I didn't take that seriously enough at the time</em>. Her daughter's essays did improve, so A is wrong, and Helen warns that the data proves nothing (C)." },
      { type: "mcq", q: "What does Helen say about the improved grades?", options: ["They do not prove that online study is better.", "They were caused by more generous marking.", "They appeared in every department.", "They were unrelated to the exams."], answer: 0, why: "<em>I wouldn't say that proves anything</em>. She only suggests exams may have been easier at home (<em>It may simply be</em>), not that marking was generous (B), and she refers only to her own department." },
      { type: "mcq", q: "What does Helen concede to Dev?", options: ["Students who left were all working.", "Online study makes seminars better.", "Online study allows some students to study at all.", "A campus is not worth the fees."], answer: 2, why: "After Dev says <em>online was the only way they could study at all</em>, Helen replies <em>You're right... access is a real gain</em>. She does not say all the students who left had jobs (A); Dev says <em>some</em> of them did." },
      { type: "mcq", q: "Why does Dev accept Helen's position on in-person teaching?", options: ["He is persuaded by the cost of fees.", "He realises some activities cannot be done online.", "He wants to use the library more.", "Gemma has convinced him."], answer: 1, why: "He says <em>I hadn't thought about labs. Fine, I'll give you that one</em>, after Helen says labs <em>can't go online</em>. The library is mentioned by Helen, not as his reason (C), and fees are Gemma's concern." },
      { type: "mcq", q: "What do the speakers finally agree on?", options: ["Study should be entirely online.", "A pay reduction for lecturers is needed.", "Mostly online study with no campus weeks.", "Some mix of both is best, but the fees question is left open."], answer: 3, why: "Gemma would <em>settle for Helen's version</em> of a mix, <em>as long as the fees come down</em>, and Helen says that is <em>a conversation for another day</em>. Dev's idea of mostly online (C) is not accepted by the group." }
    ]
  },
  {
    id: "interview-founder",
    title: "The shop that grew too fast",
    format: "Radio interview with a business founder",
    examPart: "Part 1/3 style: attitude, regret, irony and hedging",
    intro: "You will hear a radio presenter interviewing Rachel, who founded a small online wool business. Listen for what went wrong, how she feels about it now and what she says she learned.",
    script: [
      { who: "Presenter", text: "My guest today is Rachel, who started a small business selling hand dyed wool from her spare room, and who has agreed to talk about the year it nearly fell apart." },
      { who: "Rachel", text: "Thank you. Though I'm surprised you wanted to hear about the bad bit." },
      { who: "Presenter", text: "Well, success stories are ten a penny. So what happened?" },
      { who: "Rachel", text: "In our third year, orders doubled. I was delighted. And I thought, right, this is it, I need a proper workshop and a bigger team, and I borrowed a fairly large sum to pay for it." },
      { who: "Presenter", text: "Which sounds sensible." },
      { who: "Rachel", text: "It did sound sensible. That's the irony. Every adviser said grow while you can. What none of them said, and perhaps I didn't ask the right question, was what happens if the boom is only a season." },
      { who: "Presenter", text: "And was it?" },
      { who: "Rachel", text: "Well, partly. A famous knitter wore one of our scarves on television, and orders flooded in for about four months. Then, quite suddenly, they dried up. By then I'd signed a two year lease and hired six people." },
      { who: "Presenter", text: "That must have been frightening." },
      { who: "Rachel", text: "Frightening isn't quite the word. It was a slow, sinking feeling. I kept telling myself it was a blip. If I'm honest, I was in denial for about two months." },
      { who: "Presenter", text: "Do you regret the expansion?" },
      { who: "Rachel", text: "Not the ambition, no. I regret not testing it first. I could have rented a unit for three months before signing anything. I think I was frightened that if I waited, the moment would pass. And it passed anyway." },
      { who: "Presenter", text: "So how did you come through it?" },
      { who: "Rachel", text: "By doing the thing I'd been avoiding, really. I told my staff the truth. Two of them took a pay cut to stay, which astonished me. And I sold the new machinery and went back to the spare room." },
      { who: "Presenter", text: "And what would you say to someone about to expand?" },
      { who: "Rachel", text: "Don't ask whether the demand is real. Ask how cheaply you can find out. The shop is smaller now, and, oddly, much happier." }
    ],
    skills: "Understanding hedged and ironic statements ('That's the irony', 'Frightening isn't quite the word'), separating what the speaker regrets from what she does not, and following a story told in order.",
    questions: [
      { type: "mcq", q: "Why did Rachel decide to expand the business?", options: ["Her advisers warned that she would lose customers.", "A bank encouraged her to take a loan.", "She wanted to employ her friends.", "Orders had doubled and she wanted to make the most of it."], answer: 3, why: "<em>In our third year, orders doubled</em> and she decided she needed <em>a proper workshop and a bigger team</em>. Advisers told her to grow, not that she would lose customers (A); no bank is mentioned." },
      { type: "mcq", q: "What does Rachel mean by saying 'That's the irony'?", options: ["The advice sounded foolish but was actually correct.", "Her expansion made her business much more profitable.", "The advice seemed sensible but led her into difficulty.", "The loan was easier to get than she expected."], answer: 2, why: "She says it <em>did sound sensible</em>, yet the boom <em>was only a season</em> and the expansion nearly sank her. So sensible-sounding advice produced a bad result; the advice was not correct for her case (A)." },
      { type: "mcq", q: "What caused the sudden rise in orders?", options: ["A discount she offered for four months.", "A scarf being worn on television.", "A large order from a shop.", "A new workshop she opened."], answer: 1, why: "<em>A famous knitter wore one of our scarves on television</em>. The workshop came afterwards, as a reaction to the orders, so D reverses the sequence." },
      { type: "mcq", q: "How did Rachel feel when orders stopped?", options: ["Reluctant to admit it was serious.", "Instantly terrified.", "Certain she had made no mistake.", "Relieved to have more free time."], answer: 0, why: "She says <em>Frightening isn't quite the word</em>, describes a slow sinking feeling, and admits <em>I was in denial for about two months</em>. So not instantly terrified (B), but unwilling to face it." },
      { type: "mcq", q: "What does Rachel say she regrets?", options: ["Hiring staff at all.", "Having been too ambitious.", "Signing the lease without testing the idea first.", "Telling her staff the truth."], answer: 2, why: "<em>Not the ambition, no. I regret not testing it first.</em> She explicitly rejects regret about ambition (B), and telling her staff the truth is what helped her recover (D)." },
      { type: "mcq", q: "How does Rachel feel about her business now?", options: ["Disappointed that it is smaller.", "Embarrassed that two staff took pay cuts.", "Determined to expand again soon.", "Content with it despite its smaller size."], answer: 3, why: "She says <em>the shop is smaller now, and, oddly, much happier</em>. The pay cuts <em>astonished</em> her, not embarrassed her (B), and she gives no sign of planning to expand again (C)." }
    ]
  }
);
