window.C1 = window.C1 || {};
C1.listening = C1.listening || [];
/* Listening sets 11 (demanding): a radio interview with a translator, a phone call about a deposit, a lecture extract on noise and health, a three-way discussion about a village shop, a guide's talk at a tide mill; plus six short clips (B1, B2, C1) used by the placement test. */
C1.listening.push(
  {
    id: "radio-translator-machines",
    title: "Can a machine translate a novel?",
    format: "Radio interview with a presenter and a professional translator",
    examPart: "Part 3/4 style: a qualified opinion, a rejected cliche and a self-correction",
    intro: "You will hear a radio interview with Neil, a literary translator, about machine translation. Listen for what he thinks software does well, what it misses, and what he would advise a young person who wants to enter the profession.",
    script: [
      { who: "Presenter", text: "Today on Word for Word, Neil Ashby, a professional translator, who says machine translation has made his job both easier and stranger. Neil, are you out of work yet?" },
      { who: "Neil", text: "Not yet, no. Though I get asked that at every dinner party, usually just after someone has shown me their phone. And to be fair, for a menu or a train timetable the apps are remarkable. Where they fall down is tone." },
      { who: "Presenter", text: "Tone?" },
      { who: "Neil", text: "Well, take a novel. A character says something that's polite on the surface and furious underneath. The software gives you the polite surface, perfectly accurately, and you've lost the whole scene. It's, how can I put it, correct and wrong at the same time." },
      { who: "Presenter", text: "So you still do the novels by hand." },
      { who: "Neil", text: "I do, though not entirely by hand any more. I'll run a chapter through the software, partly to see what it makes of it, and then I throw most of it away. It's a bit like having a very quick assistant who has never read a book." },
      { who: "Presenter", text: "There's a famous list of untranslatable words, isn't there? The Portuguese saudade and so on." },
      { who: "Neil", text: "Oh, those lists drive me up the wall. Nothing is untranslatable. It just takes more words. What's actually hard isn't a single word, it's a joke, or a rhythm, or something a whole culture takes for granted. I once spent two days on a pun in a children's book. Two days! In the end I replaced it with a different pun altogether, and the editor never knew." },
      { who: "Presenter", text: "Is that allowed?" },
      { who: "Neil", text: "It's what the author would have done, if she'd been writing in English. That's my test, really. Not 'is this faithful?' but 'would she sign this?'" },
      { who: "Presenter", text: "Would you advise a young person to enter translation now?" },
      { who: "Neil", text: "I'd say yes, with a condition: don't be a person who converts sentences. Be a person who knows a subject, law, medicine, football, and happens to work in two languages. That person will be fine. The pure sentence-converter, well, I'd be worried. Actually, no, I'd be worried for the work, not for the person, because the work itself is changing." }
    ],
    skills: "Telling a limited compliment from a criticism, following an example to the point it illustrates, and catching a speaker's self-correction.",
    questions: [
      { type: "mcq", q: "According to Neil, where does machine translation work well?", options: ["On novels with complex characters.", "On jokes and wordplay.", "On practical texts such as menus and timetables.", "On texts in which tone matters."], answer: 2, why: "<em>For a menu or a train timetable the apps are remarkable. Where they fall down is tone.</em> Novels, wordplay and tone are exactly where he says they struggle (A, B, D)." },
      { type: "mcq", q: "What does the example of the character who is polite but furious show?", options: ["That angry characters are the hardest to translate.", "That software often mistranslates simple words.", "That polite language is the same in every culture.", "That software can be accurate and still miss the meaning."], answer: 3, why: "The software gives <em>the polite surface, perfectly accurately</em>, yet <em>you've lost the whole scene</em>: <em>correct and wrong at the same time</em>. He does not say the words are mistranslated (B)." },
      { type: "mcq", q: "How does Neil use translation software when working on a novel?", options: ["He relies on it for a first draft that he lightly edits.", "He tries it out for comparison and then discards most of the result.", "He refuses to use it at all.", "He uses it only to check his spelling."], answer: 1, why: "<em>I'll run a chapter through the software, partly to see what it makes of it, and then I throw most of it away.</em> It is not a first draft he keeps (A), but he does not refuse it either (C)." },
      { type: "mcq", q: "What is Neil's attitude to lists of untranslatable words?", options: ["He is annoyed by them, since any word can be translated with more words.", "He thinks they are useful for language learners.", "He believes some words really cannot be translated at all.", "He thinks translators should leave such words in the original."], answer: 0, why: "<em>Those lists drive me up the wall. Nothing is untranslatable. It just takes more words.</em> That rules out C, and he never recommends leaving words untranslated (D)." },
      { type: "mcq", q: "What does Neil mean by the test 'would she sign this?'", options: ["Whether the translation keeps to the original word for word.", "Whether the editor will accept the translation.", "Whether the author would be happy to put her name to it in English.", "Whether the author has already seen the translation."], answer: 2, why: "He says it is <em>what the author would have done, if she'd been writing in English</em>, and contrasts it with <em>is this faithful?</em>, so strict faithfulness (A) is not the test. The editor never knew about the pun, so the editor is not the judge (B)." },
      { type: "mcq", q: "What is Neil's final point?", options: ["That specialists in law and medicine will soon be replaced.", "That young people should not enter translation.", "That translators who know a subject will struggle.", "That the plain conversion of sentences is changing as a kind of work."], answer: 3, why: "He corrects himself: <em>I'd be worried for the work, not for the person, because the work itself is changing.</em> The person who <em>knows a subject</em> <em>will be fine</em> (A, C), and he does say yes to young people with a condition (B)." }
    ]
  },
  {
    id: "phone-deposit-dispute",
    title: "A deposit and a carpet",
    format: "Phone conversation between a former tenant and a letting agent",
    examPart: "Part 1/3 style: purpose of a call, a correction, a partial concession and next steps",
    intro: "You will hear a phone call between Zoe, who has just moved out of a flat, and Tom, a letting agent, about money kept from her deposit. Listen for what Zoe disputes, what she accepts, and what happens next.",
    script: [
      { who: "Zoe", text: "Hello, is that Tom? It's Zoe Marsh, I rented the flat on Albert Road until the end of August. I've had your email about my deposit." },
      { who: "Tom", text: "Yes, Zoe, hello. I was about to ring you, actually. So the inspection report shows a few deductions, two hundred and forty pounds in total." },
      { who: "Zoe", text: "That's what I'm calling about. The email says a hundred and eighty for 'professional carpet cleaning'. But I had it done the week before I left. I've got the receipt from the company, I mean the hire shop, I hired a machine and did it myself." },
      { who: "Tom", text: "Ah, that's the thing, though. The tenancy agreement says professional cleaning, and a hired machine isn't, strictly speaking, a professional." },
      { who: "Zoe", text: "Hold on. It says 'cleaned to a professional standard'. I read it again last night. Not 'by a professional'." },
      { who: "Tom", text: "Let me look. Hm. You may be right. I'll have to check with the landlord, but I'd say that's open to argument." },
      { who: "Zoe", text: "Thank you. And the sixty pounds for the oven?" },
      { who: "Tom", text: "That one I wouldn't fight, to be honest. The photographs from the check-out are fairly clear." },
      { who: "Zoe", text: "Yes, all right, I can't really dispute that. I did mean to do it, and then I ran out of time." },
      { who: "Tom", text: "What I can do is get back to you by Friday about the carpet. If he agrees, you'd have a hundred and eighty pounds back within ten days." },
      { who: "Zoe", text: "And if he doesn't?" },
      { who: "Tom", text: "Then you can take it to the deposit scheme's adjudication service. It's free, but it's slow, six weeks at least. Honestly, I'd try to settle it before that." },
      { who: "Zoe", text: "Fine. I'll wait until Friday, then. Could you put what we've said about the receipt in an email, so I have it in writing?" },
      { who: "Tom", text: "Of course. I'll send it this afternoon." }
    ],
    skills: "Following a self-correction mid-sentence, separating a disputed charge from an accepted one, and noting the order of next steps.",
    questions: [
      { type: "mcq", q: "Why is Zoe phoning Tom?", options: ["To query one of the deductions from her deposit.", "To ask when her deposit will be returned.", "To complain about the inspection photographs.", "To ask him for a reference."], answer: 0, why: "She has had his email about the deductions and says <em>That's what I'm calling about</em>, then challenges the carpet charge. She is not asking about timing in general (B), and the photographs are only mentioned later by Tom (C)." },
      { type: "mcq", q: "How did Zoe clean the carpet?", options: ["She paid a cleaning company.", "She asked the landlord to do it.", "She left it for the agency to clean.", "She hired a machine and did it herself."], answer: 3, why: "She starts to say <em>the company</em> and corrects herself: <em>I mean the hire shop, I hired a machine and did it myself.</em> The receipt is from the hire shop, so no company cleaned it (A)." },
      { type: "mcq", q: "What is Zoe's argument about the tenancy agreement?", options: ["That it forbids hired machines.", "That it asks for a professional standard, not for a professional cleaner.", "That the landlord had already agreed to the cleaning.", "That the photographs show the carpet was clean."], answer: 1, why: "<em>It says 'cleaned to a professional standard'... Not 'by a professional'.</em> Tom's reading was the opposite (A). The landlord has not yet been asked, and no one mentions photographs of the carpet (C, D)." },
      { type: "mcq", q: "What does Zoe accept?", options: ["The carpet charge, but not the oven charge.", "Neither of the charges.", "The oven charge only.", "Both of the charges."], answer: 2, why: "Of the oven, she says <em>I can't really dispute that</em>, while she still disputes the carpet and is waiting for the landlord's answer." },
      { type: "mcq", q: "What will happen next?", options: ["Tom will ask the landlord and reply by Friday.", "Zoe will go to adjudication straight away.", "Tom will send the refund this afternoon.", "Zoe will arrange professional cleaning."], answer: 0, why: "<em>I'll have to check with the landlord</em> and <em>get back to you by Friday.</em> Adjudication is a fallback, and a slow one (B); only the email is promised for this afternoon, not a refund (C)." }
    ]
  },
  {
    id: "lecture-noise-health",
    title: "Does noise make us ill?",
    format: "Lecture extract with a question from a student",
    examPart: "Part 3/4 style: a hedged claim, an objection and a practical consequence",
    intro: "You will hear part of a lecture on urban noise and health. Dr Morgan is the lecturer and Lena is a student who asks questions. Listen for how the view of noise has changed, how far the lecturer is willing to go, and what she says about reducing the harm.",
    script: [
      { who: "Dr Morgan", text: "So far I've talked about noise as a nuisance. I want to turn now to noise as a health matter, because the evidence has shifted quite a lot in the last decade. The old assumption was that the damage was to hearing, and that you needed something like a factory floor to cause it. What we now see is that quite moderate traffic noise, the kind you stop noticing, is associated with higher blood pressure. Now, 'associated' is doing real work in that sentence, and I'll come back to it. The proposed mechanism is stress. The body reacts to sudden sounds even in sleep, with a rise in heart rate, even though the sleeper doesn't wake. People are often surprised by that. They say 'I sleep fine', and they may, by their own account, but the measurements disagree." },
      { who: "Lena", text: "Sorry, could I ask something? Doesn't that just mean noisy areas are poorer areas? So it would be income, not noise, causing the blood pressure." },
      { who: "Dr Morgan", text: "That's exactly the right objection, and it's the one the researchers worried about first. The better studies compare people on the same street, one with a bedroom at the front, one at the back. Same rent, same income, same air, different noise. The gap shrinks, but it doesn't vanish. So income explains some of it, not all of it. Whether noise is the cause remains, I'd say, probable rather than proven." },
      { who: "Lena", text: "And is there anything that can be done, apart from moving?" },
      { who: "Dr Morgan", text: "Surprisingly, yes. Triple glazing helps, naturally, but the cheapest effect found is lowering the speed limit from thirty to twenty. Not because the average level falls very much. It doesn't. It's because the sudden peaks, the acceleration and the braking, drop. And it's the peaks, remember, that the sleeping body responds to. Right, next week we'll look at light." }
    ],
    skills: "Recognising a hedged claim, following how a researcher answers an objection, and linking a practical measure back to the mechanism.",
    questions: [
      { type: "mcq", q: "What change in thinking does Dr Morgan describe?", options: ["Noise is now thought to damage hearing only in factories.", "Noise is now thought to be merely annoying.", "Moderate traffic noise is now linked to health problems beyond hearing.", "Noise is now thought to have no effect on sleep."], answer: 2, why: "<em>Quite moderate traffic noise... is associated with higher blood pressure.</em> The old assumption was damage to hearing in places like a factory floor, which is what has been replaced (A)." },
      { type: "mcq", q: "Why does she say that 'associated' is doing real work?", options: ["Because it does not by itself prove that noise is the cause.", "Because it shows the studies are very reliable.", "Because it is the technical term for blood pressure.", "Because it means the effect is large."], answer: 0, why: "She promises to <em>come back to it</em>, and at the end calls the cause <em>probable rather than proven</em>: association is weaker than causation." },
      { type: "mcq", q: "What surprises people about noise and sleep?", options: ["Sleepers wake up at every sound.", "Noise has no effect once a person is asleep.", "People who sleep badly are more sensitive to noise.", "Heart rate can rise even when the sleeper does not wake."], answer: 3, why: "<em>A rise in heart rate, even though the sleeper doesn't wake.</em> People who say <em>I sleep fine</em> may be right about waking, but <em>the measurements disagree</em> (B)." },
      { type: "mcq", q: "How do researchers deal with Lena's objection about income?", options: ["They agree that income explains all of the difference.", "They compare people on the same street with bedrooms at the front and at the back.", "They study only wealthy neighbourhoods.", "They ask residents how much noise they hear."], answer: 1, why: "<em>Same rent, same income, same air, different noise.</em> The gap <em>shrinks, but it doesn't vanish</em>, so income does not explain everything (A)." },
      { type: "mcq", q: "Why does a lower speed limit help, according to Dr Morgan?", options: ["It makes engines much quieter.", "It keeps traffic away from bedrooms.", "It reduces the sudden peaks of noise that affect sleepers.", "It encourages people to fit triple glazing."], answer: 2, why: "She says the average level does <em>not</em> fall much; <em>the sudden peaks... drop</em>, and <em>it's the peaks that the sleeping body responds to</em>. That rules out A." }
    ]
  },
  {
    id: "discussion-village-shop",
    title: "Saving the village shop",
    format: "Discussion between three members of a village committee",
    examPart: "Part 3/4 style: caution, enthusiasm, a disagreement and a staged compromise",
    intro: "You will hear three members of a village committee discussing whether to take over the empty village shop. Fiona chairs, Vikram has worked out the figures and Isla has spoken to residents. Listen for each person's main concern, the point where they disagree, and what they finally agree.",
    script: [
      { who: "Fiona", text: "Right, the shop. The parish council has offered us the building on a very low rent, if we can show the village will really run it. Vikram, you've done the sums." },
      { who: "Vikram", text: "I have, and I'm afraid they're sobering. To break even we need about four hundred pounds a day, which means roughly a third of the village shopping there for something every week. I'm not sure we get that when there's a supermarket twelve minutes away." },
      { who: "Isla", text: "But people say they'd use it. At the open day, nearly everyone I spoke to said they'd shop there, I mean for the basics, milk, bread." },
      { who: "Vikram", text: "Said, Isla. People also say they'd pay for local news. And milk and bread are exactly the worry, because that's the low-margin stuff. The money's in the extras, the cheese, the gifts, the post office counter." },
      { who: "Fiona", text: "Which is why I'd push for the post office. If the counter is there, people have to come in." },
      { who: "Isla", text: "Can I disagree a little? I don't think we should plan around people being forced in. A shop should be somewhere people want to be. If it had a café corner, even two tables, the older residents who don't see anyone all week..." },
      { who: "Vikram", text: "That I like, actually. Though a café means licences, staff and the rest. I'd start without it and see." },
      { who: "Fiona", text: "So where does that leave us? Isla wants the café, Vikram wants caution and I want the post office." },
      { who: "Isla", text: "Could we do the post office first, and have the café as a second phase if the first six months go well?" },
      { who: "Vikram", text: "I could live with that, provided the six months have a number attached. If we haven't reached, say, three hundred a day by then, we stop." },
      { who: "Fiona", text: "Three hundred feels fair. Then I'll go back to the council and say yes, in principle, with a review point." },
      { who: "Isla", text: "And I'll get volunteers to sign up, properly, not just nodding at an open day." }
    ],
    skills: "Distinguishing what people say they will do from what they will do, tracking three positions at once, and hearing a conditional agreement.",
    questions: [
      { type: "mcq", q: "What is Vikram's main concern?", options: ["That the council will withdraw its offer.", "That too few people will actually spend enough in the shop.", "That volunteers will be hard to find.", "That the building is in poor condition."], answer: 1, why: "He needs <em>about four hundred pounds a day</em> and is <em>not sure we get that</em> with a supermarket nearby. The council's offer is not in doubt (A)." },
      { type: "mcq", q: "What does Vikram mean by 'Said, Isla'?", options: ["That Isla has misreported what residents told her.", "That the open day was badly organised.", "That he disagrees with Isla's wish for a café.", "That what people say they will do is not a reliable guide to what they will do."], answer: 3, why: "He compares it with <em>People also say they'd pay for local news</em>: a stated intention is cheap. He is not accusing her of inventing it (A)." },
      { type: "mcq", q: "Why does Fiona favour a post office counter?", options: ["It would give people a reason to come into the shop.", "It would make the shop cheaper to run.", "It would replace the need for a café.", "It was requested by the parish council."], answer: 0, why: "<em>If the counter is there, people have to come in.</em> She does not call it cheaper, and the café is a separate idea (B, C)." },
      { type: "mcq", q: "What is the main point of Isla's disagreement with Fiona?", options: ["She thinks the post office is too expensive.", "She thinks the shop should open in the evenings.", "She thinks a shop should attract people by choice, not by obligation.", "She thinks Vikram's figures are wrong."], answer: 2, why: "<em>I don't think we should plan around people being forced in. A shop should be somewhere people want to be.</em> She does not question the figures; Vikram even says he likes her café idea (D)." },
      { type: "mcq", q: "What do the three finally agree?", options: ["To open the café first and add the post office later.", "To wait a year before deciding anything.", "To drop the plan because the figures are poor.", "To begin with the post office and review it before adding more."], answer: 3, why: "Isla proposes <em>post office first, café as a second phase</em>, Vikram attaches <em>three hundred a day</em> as the stopping point and Fiona accepts it with <em>a review point</em>. The order in A is the reverse." },
      { type: "mcq", q: "What does Isla offer to do?", options: ["Find volunteers who make firm commitments.", "Organise another open day.", "Write the application for a licence.", "Speak to the supermarket."], answer: 0, why: "<em>I'll get volunteers to sign up, properly, not just nodding at an open day.</em> She wants real commitments, not another open day (B)." }
    ]
  },
  {
    id: "talk-tide-mill",
    title: "The mill that waits for the sea",
    format: "Monologue: a guide's introduction at a heritage site",
    examPart: "Part 1/2 style: explanation, a correction of a common mistake and practical instructions",
    intro: "You will hear a guide introducing a historic mill to a group of visitors before they go in. Listen for what makes the mill unusual, what she says about its history, and what she asks the visitors to do.",
    script: [
      { who: "Guide", text: "Good morning, everyone, and welcome to Saltmarsh tide mill. Before we go in, a word about what you're looking at, because most visitors assume, understandably, that a mill needs a river. This one doesn't. It uses the sea. At high tide, water flows in through that gate, there, and fills the pond behind me. When the tide turns, the gate closes itself, the water is trapped, and a few hours later, when the sea has dropped far enough, the miller opens the sluice and lets the pond run out across the wheel. So the mill doesn't work to the clock. It works to the tide, which comes about fifty minutes later each day. That meant a miller's working day might begin at three in the morning one week and at noon the next. Millers, I'm told, were not famous for being early risers. They simply had no choice." },
      { who: "Guide", text: "There's been a mill on this spot since at least the twelfth century, though what you'll see is mostly from 1760, rebuilt after the previous one was flooded. A common mistake in the guidebooks is to say it ground corn right up to the First World War. In fact, it switched to grinding animal feed in 1890, which paid better, and the last grinding was in 1936. It's now run by volunteers, and we grind a small amount of flour every Saturday, mainly for the café and, to be honest, for the pleasure of it." },
      { who: "Guide", text: "A practical point. The stairs inside are steep and the floors are original, so please watch your heads. We'll start on the ground floor, where you'll see the wheel, then go up to the stones. Photographs are fine, but there are no naked lights anywhere in the building. Dust in a mill can be explosive, which sounds dramatic, but it's why we have no candles and no smoking. Shall we go in?" }
    ],
    skills: "Following a process described in order, noticing a correction of a common error, and distinguishing reasons from consequences.",
    questions: [
      { type: "mcq", q: "What does the guide say visitors often assume about a mill?", options: ["That it is powered by wind.", "That it needs a river.", "That it is still used commercially.", "That it was built recently."], answer: 1, why: "<em>Most visitors assume, understandably, that a mill needs a river. This one doesn't. It uses the sea.</em>" },
      { type: "mcq", q: "Why did a miller's working hours vary so much?", options: ["The miller worked only on market days.", "The wheel was too heavy to turn in winter.", "The sluice had to be opened by hand every hour.", "The tide comes about fifty minutes later each day."], answer: 3, why: "<em>It works to the tide, which comes about fifty minutes later each day</em>, so a day could start at three in the morning one week and at noon the next. The sluice is opened once, when the sea has dropped (C)." },
      { type: "mcq", q: "What mistake does the guide say some guidebooks make?", options: ["They say it ground corn until the First World War.", "They give the wrong century for the first mill.", "They say the mill is powered by a river.", "They claim it still grinds flour every day."], answer: 0, why: "<em>A common mistake in the guidebooks is to say it ground corn right up to the First World War. In fact, it switched to grinding animal feed in 1890.</em> She says the mill has been there since at least the twelfth century without objecting to that date (B)." },
      { type: "mcq", q: "Why is most of the present building from 1760?", options: ["The first mill was too small.", "The owners wanted to change to animal feed.", "An earlier mill had been destroyed by flooding.", "The mill was moved from another site."], answer: 2, why: "<em>Mostly from 1760, rebuilt after the previous one was flooded.</em> The switch to animal feed came much later, in 1890 (B)." },
      { type: "mcq", q: "Why are there no naked lights in the building?", options: ["Because the floors are old and may burn.", "Because dust in a mill can explode.", "Because the guide wants visitors to take photographs without flash.", "Because candles damage the wheel."], answer: 1, why: "<em>Dust in a mill can be explosive... it's why we have no candles and no smoking.</em> Photographs are explicitly allowed (C)." },
      { type: "mcq", q: "Why does the mill grind flour today?", options: ["To sell it to visitors in large quantities.", "To supply local bakeries.", "To keep an old licence valid.", "Mainly for the café and for the pleasure of doing it."], answer: 3, why: "<em>A small amount of flour every Saturday, mainly for the café and, to be honest, for the pleasure of it.</em> It is a small amount, so large sales or bakeries are not the purpose (A, B)." }
    ]
  }
);
C1.placementListening = C1.placementListening || [];
C1.placementListening.push(
  {
    id: "pl-b1-a",
    placementLevel: "B1",
    title: "Which platform?",
    format: "Short exchange at a railway station",
    examPart: "Placement clip: simple everyday detail",
    intro: "You will hear a short conversation at a station. Choose the best answer.",
    script: [
      { who: "Hannah", text: "Excuse me, does the train to Leeds leave from platform four?" },
      { who: "Ben", text: "It did, but they've changed it. It's platform six now, and it leaves at ten past three, not three o'clock." },
      { who: "Hannah", text: "Ten past three, platform six. Thank you." },
      { who: "Ben", text: "And you'll need to hurry. It's at the other end of the station." }
    ],
    skills: "Picking out changed details in a simple conversation.",
    questions: [
      { type: "mcq", q: "Where must Hannah go now?", options: ["Platform four, for the three o'clock train.", "Platform six, for a train at ten past three.", "Platform six, for a train at three o'clock.", "Platform four, for a train at ten past three."], answer: 1, why: "Ben says <em>It's platform six now, and it leaves at ten past three, not three o'clock.</em> Platform four and three o'clock are the old details." }
    ]
  },
  {
    id: "pl-b1-b",
    placementLevel: "B1",
    title: "A change of plan",
    format: "Short voicemail message",
    examPart: "Placement clip: simple everyday gist",
    intro: "You will hear a voicemail message. Choose the best answer.",
    script: [
      { who: "Fiona", text: "Hi Dad, it's Fiona. Just a quick message. I can't come on Saturday after all, because I have to work. But I could come on Sunday instead, in the afternoon. If that's not good for you, please call me tonight. And I'll bring the lemon cake you like. Bye for now!" }
    ],
    skills: "Understanding the main point of a short everyday message.",
    questions: [
      { type: "mcq", q: "What is Fiona's new plan?", options: ["To come on Saturday and bring a cake.", "To come on Sunday morning because she has to work.", "To stay away from home this weekend.", "To come on Sunday afternoon instead of Saturday."], answer: 3, why: "<em>I can't come on Saturday... I could come on Sunday instead, in the afternoon.</em> The cake is something she will bring, not the reason for the change." }
    ]
  },
  {
    id: "pl-b2-a",
    placementLevel: "B2",
    title: "Dinner on Friday",
    format: "Short exchange between two friends",
    examPart: "Placement clip: a plan with a clear distractor",
    intro: "You will hear two friends making a plan. Choose the best answer.",
    script: [
      { who: "Anna", text: "Shall we try the new Thai place on Friday?" },
      { who: "Tom", text: "I'd love to, but I've heard it's always full on Fridays. We might not get in without a booking." },
      { who: "Anna", text: "I'll ring them. Actually, wait, I think they only take bookings for groups of six or more." },
      { who: "Tom", text: "Then let's go early, say six o'clock, before it fills up. And if there's a queue, we'll go to the Italian round the corner." }
    ],
    skills: "Following a plan that changes as a problem appears.",
    questions: [
      { type: "mcq", q: "What do they decide to do?", options: ["Go at six and use the Italian restaurant as a back-up.", "Book a table at the Thai place by phone.", "Go to the Italian restaurant on Friday.", "Go to the Thai place on a different day."], answer: 0, why: "Booking is ruled out (<em>only take bookings for groups of six or more</em>), so Tom suggests <em>go early... and if there's a queue, we'll go to the Italian.</em> The Italian is only the back-up." }
    ]
  },
  {
    id: "pl-b2-b",
    placementLevel: "B2",
    title: "Cycling to work",
    format: "Short exchange between two colleagues",
    examPart: "Placement clip: a stated reason against a distractor",
    intro: "You will hear two colleagues talking about the journey to work. Choose the best answer.",
    script: [
      { who: "Rosa", text: "I'm thinking of cycling to work instead of taking the car." },
      { who: "Dev", text: "Isn't it a bit far? It's nearly ten miles." },
      { who: "Rosa", text: "It is, but the car park charge has gone up again, and in rush hour the journey takes about the same time either way. I'm not doing it for fitness, honestly, though I suppose that's a bonus." }
    ],
    skills: "Identifying the real reason when other reasons are mentioned and rejected.",
    questions: [
      { type: "mcq", q: "What is Rosa's main reason for wanting to cycle?", options: ["To get more exercise.", "To arrive at work sooner.", "To save money on parking.", "To avoid driving in the dark."], answer: 2, why: "<em>The car park charge has gone up again.</em> She says the journey takes <em>about the same time</em> (not sooner) and that fitness is <em>a bonus</em>, not the reason." }
    ]
  },
  {
    id: "pl-c1-a",
    placementLevel: "C1",
    title: "A thorough presentation",
    format: "Short exchange between two colleagues",
    examPart: "Placement clip: implied attitude",
    intro: "You will hear two colleagues talking about a presentation. Choose the best answer.",
    script: [
      { who: "Carol", text: "So what did you make of the presentation?" },
      { who: "Jamal", text: "Oh, it was very thorough. Forty-two slides. I particularly admired the graph that nobody could read." },
      { who: "Carol", text: "Did you pick up anything useful?" },
      { who: "Jamal", text: "One thing, certainly: how to look interested for an hour." }
    ],
    skills: "Reading irony and understanding what a speaker implies rather than states.",
    questions: [
      { type: "mcq", q: "What does Jamal really think of the presentation?", options: ["It was clear and well explained.", "It was too short to be useful.", "It was thorough and informative.", "It was long and confusing, and he was not impressed."], answer: 3, why: "His praise is ironic: <em>thorough</em> means forty-two slides, he <em>admired the graph that nobody could read</em>, and the only thing he learned was <em>how to look interested for an hour</em>." }
    ]
  },
  {
    id: "pl-c1-b",
    placementLevel: "C1",
    title: "Thursday, at some point",
    format: "Short voicemail message with corrections",
    examPart: "Placement clip: following self-correction",
    intro: "You will hear a voicemail message about a meeting. Choose the best answer.",
    script: [
      { who: "Marta", text: "Hello, it's Marta about the meeting. It's on Thursday at ten, no, sorry, Thursday at eleven, I was mixing it up with my dentist. Room twelve on the second floor, or is it the third? Yes, the third. Anyway, do bring the report, the printed one if you can." }
    ],
    skills: "Keeping track of a speaker's corrections and deciding which version stands.",
    questions: [
      { type: "mcq", q: "When and where is the meeting?", options: ["Thursday at eleven, on the third floor.", "Thursday at ten, on the third floor.", "Thursday at eleven, on the second floor.", "Thursday at ten, on the second floor."], answer: 0, why: "She corrects the time (<em>no, sorry, Thursday at eleven</em>) and the floor (<em>or is it the third? Yes, the third</em>), so the corrected versions stand." }
    ]
  }
);
