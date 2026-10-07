window.C1 = window.C1 || {};
C1.listening = C1.listening || [];
/* Listening sets 5: everyday transactions. Polite versus direct phrasing, describing symptoms and advice, hedged requests in a work call. */
C1.listening.push(
  {
    id: "restaurant-mixup",
    title: "A table for Friday, not Thursday",
    format: "Conversation in a restaurant",
    examPart: "Part 1/3 style: attitude, register and outcome",
    intro: "You will hear Hannah and Oliver, a couple, dealing with a waiter, Callum, and later a manager, Imogen, in a restaurant. Listen for what each person wants and how they say it.",
    script: [
      { who: "Callum", text: "Good evening. Do you have a reservation?" },
      { who: "Hannah", text: "We do, yes. It should be under Clarke, for two, at half past seven." },
      { who: "Callum", text: "Let me just have a look. Hmm. I've got a Clarke, but it's down for Thursday, not Friday." },
      { who: "Hannah", text: "Oh dear. Thursday? I'm almost certain I said Friday when I rang." },
      { who: "Oliver", text: "She did. I was standing right next to her." },
      { who: "Callum", text: "I'm terribly sorry, that may well have been our mistake. The thing is, we're full until about eight. I could seat you by the door now, though it's a bit draughty, or you could have a drink at the bar and I'll find you something better in twenty minutes or so." },
      { who: "Hannah", text: "What do you think, Oliver? I wouldn't mind waiting, actually. It's been a long week and I'd rather not sit in a draught." },
      { who: "Oliver", text: "Fine by me, as long as there's food at the end of it." },
      { who: "Callum", text: "Of course. The first round's on us." },
      { who: "Callum", text: "Your table's ready, if you'd like to follow me. Have you decided?" },
      { who: "Hannah", text: "I'll have the pumpkin risotto, please, but could I ask for it without mushrooms? I'm afraid I can't eat them." },
      { who: "Oliver", text: "And I'll have the lamb, medium. We'll share the burrata to start." },
      { who: "Callum", text: "One risotto, one lamb. Enjoy." },
      { who: "Hannah", text: "Thank you. Um, I'm so sorry to be a nuisance, but I think there are mushrooms in this. I don't suppose it could be remade?" },
      { who: "Oliver", text: "Honestly, they should check these things. We've already waited half an hour. Take it back, please." },
      { who: "Hannah", text: "Oliver, it's fine. Mistakes happen." },
      { who: "Imogen", text: "Good evening, I'm the manager. I'm so sorry about all of this. Your new risotto is on its way, and I've taken the risotto off the bill." },
      { who: "Oliver", text: "That's very kind. When you bring the bill, could we pay separately, if that's not too much trouble? We'll split the burrata between us, and I'll pay for the lamb on mine." },
      { who: "Imogen", text: "Not at all. I'll bring two card machines." }
    ],
    skills: "Telling polite, indirect phrasing ('I don't suppose it could be...', 'if that's not too much trouble') from blunt requests, following who wants what, and tracking the final outcome of a long exchange.",
    questions: [
      { type: "mcq", q: "What went wrong with the booking?", options: ["The restaurant gave their table to another couple.", "Hannah booked the table for the wrong number of people.", "The restaurant wrote down the wrong day.", "They arrived half an hour late."], answer: 2, why: "Callum finds <em>a Clarke, but it's down for Thursday, not Friday</em>, and Hannah says she asked for Friday. The table was not given away (A), and neither the number of people (B) nor their arrival time (D) is the problem." },
      { type: "mcq", q: "Why does Hannah prefer to wait at the bar?", options: ["She doesn't want to sit in a draught.", "She wants a quiet corner table.", "She is hoping for a free meal.", "She is waiting for friends to arrive."], answer: 0, why: "She says <em>I'd rather not sit in a draught</em>, which is why she rejects the table by the door. The free drinks are an offer from Callum, not her motive (C)." },
      { type: "mcq", q: "How does Hannah raise the problem with her risotto?", options: ["She asks Callum for a refund.", "She apologises and asks indirectly whether it could be remade.", "She asks the manager to speak to Callum.", "She says nothing and eats around the mushrooms."], answer: 1, why: "<em>I'm so sorry to be a nuisance... I don't suppose it could be remade?</em> is a very indirect, polite request. It is Oliver, not Hannah, who sounds more demanding." },
      { type: "mcq", q: "How do Hannah and Oliver differ in their reaction to the mistakes?", options: ["Hannah is angrier than Oliver.", "Both are equally patient with the staff.", "Oliver is more relaxed than Hannah.", "Oliver is blunter and Hannah more forgiving."], answer: 3, why: "Oliver says <em>Take it back, please</em> and complains about the wait, while Hannah answers <em>it's fine. Mistakes happen.</em> So Oliver is the blunter of the two." },
      { type: "mcq", q: "How is the bill settled at the end?", options: ["The restaurant pays for the burrata.", "The whole meal is half price.", "The risotto is free, and they pay separately, sharing the cost of the burrata.", "Oliver pays the whole bill."], answer: 2, why: "The manager has <em>taken the risotto off the bill</em>, and Oliver asks to pay separately, <em>split the burrata</em> and pay for his lamb. So Hannah's main is free, the burrata is not free (A), nothing is half price (B), and Oliver does not pay everything (D). The drinks were offered earlier." }
    ]
  },
  {
    id: "doctor-cough",
    title: "A cough that won't go away",
    format: "Consultation with a doctor, then a pharmacist",
    examPart: "Part 1/3 style: detail, advice and attitude",
    intro: "You will hear Kevin talking to his doctor, Fiona, about a cough, and then to a pharmacist, Rashid. Listen for the symptoms, what is ruled out and what advice he is given.",
    script: [
      { who: "Fiona", text: "Come in, Kevin, and take a seat. What can I do for you?" },
      { who: "Kevin", text: "Well, it's probably nothing, but my wife insisted I come. I've had this cough for about five weeks now." },
      { who: "Fiona", text: "Five weeks. Is it constant, or does it come and go?" },
      { who: "Kevin", text: "Sort of on and off, really. It's worse in the mornings, and it tends to flare up when I've been out in the cold. Some days I barely notice it." },
      { who: "Fiona", text: "Any fever? Night sweats?" },
      { who: "Kevin", text: "No, nothing like that. I felt a bit run-down at first, but that passed." },
      { who: "Fiona", text: "And do you bring anything up when you cough?" },
      { who: "Kevin", text: "Not much. It's mostly dry. Oh, and there's a tightness in my chest if I climb the stairs, but I don't know whether that's related. I might just be out of shape." },
      { who: "Fiona", text: "Do you smoke?" },
      { who: "Kevin", text: "I gave up eight years ago. Before that, about ten a day." },
      { who: "Fiona", text: "Good for you. Right, let me have a listen. Breathe in and out. Lovely. Your chest sounds clear, which is reassuring. I don't think this is an infection. So I won't be giving you antibiotics, because they wouldn't help." },
      { who: "Kevin", text: "Oh. I was rather hoping for something, to be honest." },
      { who: "Fiona", text: "I understand. But the more likely explanation is mild asthma, and I'd like to check for that first. I'm prescribing an inhaler, to be used only when you feel tight or start coughing. I'd also like you to blow into a small meter twice a day for two weeks and write the readings down." },
      { who: "Kevin", text: "And if it doesn't get better?" },
      { who: "Fiona", text: "Then we'll arrange a chest X-ray, just to be thorough. I'm not worried, but I'd rather be sure. Come back in two weeks." },
      { who: "Rashid", text: "Good afternoon. Here's your inhaler. Use it just as the doctor explained, and the leaflet in the box shows you how." },
      { who: "Kevin", text: "Is there a risk of getting hooked on it?" },
      { who: "Rashid", text: "No, that's not something to worry about with this one. Some people notice a slight tremor in their hands at first. If it bothers you, do tell your GP." }
    ],
    skills: "Understanding how symptoms are described ('on and off', 'flare up', 'persistent'), noticing what the doctor rules out and why, and reading a speaker's feelings from mild phrases such as 'I was rather hoping for something'.",
    questions: [
      { type: "mcq", q: "How does Kevin describe his cough?", options: ["It is constant and gets worse at night.", "It comes and goes and is worse in the mornings and in the cold.", "It is only a problem when he climbs the stairs.", "It started yesterday and is getting worse."], answer: 1, why: "He says <em>on and off</em>, <em>worse in the mornings</em> and that it <em>flares up</em> in the cold. The cough has lasted five weeks, so D is wrong, and the chest tightness on the stairs is a separate symptom." },
      { type: "mcq", q: "Why does the doctor decide not to prescribe antibiotics?", options: ["Kevin gave up smoking years ago.", "Kevin has asked her not to.", "She wants to wait for an X-ray first.", "She thinks it is not an infection."], answer: 3, why: "<em>I don't think this is an infection</em>, and she bases this on his chest sounding <em>clear</em>. Smoking is not mentioned as the reason (A), and the X-ray is only a later option (C)." },
      { type: "mcq", q: "What does the doctor think is the most likely cause?", options: ["Mild asthma.", "Damage from smoking.", "A chest infection.", "Lack of fitness."], answer: 0, why: "She calls <em>mild asthma</em> the more likely explanation and wants to rule it out first. Kevin himself suggests he might be out of shape, but she does not offer that as her explanation." },
      { type: "mcq", q: "How does Kevin feel about not being given antibiotics?", options: ["Relieved, because he dislikes medicines.", "Angry with the doctor.", "A little disappointed.", "Worried that it is serious."], answer: 2, why: "<em>I was rather hoping for something, to be honest</em> is a mild, polite way of showing disappointment. It is not anger or relief, and he does not say he is worried." },
      { type: "mcq", q: "What is Kevin asked to do?", options: ["Take the inhaler daily and have an X-ray now.", "Use the inhaler when needed, record meter readings and return in two weeks.", "Stop going out in the cold and come back in a month.", "Record his symptoms in a diary and avoid stairs."], answer: 1, why: "The inhaler is <em>only when you feel tight or start coughing</em>, he must blow into the meter twice a day, and he returns in two weeks. The X-ray happens only <em>if it doesn't get better</em>." }
    ]
  },
  {
    id: "call-then-voicemail",
    title: "Can we bring the deadline forward?",
    format: "Work video call, followed by a voicemail",
    examPart: "Part 1/3 style: who agrees to what, hedging and implied meaning",
    intro: "You will hear part of a team video call led by Harriet, with Vikram, Neil and Zoe, and then a voicemail Harriet leaves afterwards. Listen for who agrees to do what and what is really meant.",
    script: [
      { who: "Harriet", text: "Right, I think we can make a start. Vikram, you're first, I believe." },
      { who: "Vikram", text: "Sure. So, the supplier survey. Sorry, Neil, I think you're on mute." },
      { who: "Neil", text: "Sorry, sorry. Can you hear me now? I was just saying I haven't seen the figures yet." },
      { who: "Vikram", text: "No problem. I'll share my screen. Okay, the response rate is sixty-two per cent, which is better than last year." },
      { who: "Zoe", text: "Sorry I'm late, everybody. My last call overran. Have I missed much?" },
      { who: "Harriet", text: "Not at all, Zoe. We're just on the survey. The response rate is up to sixty-two per cent." },
      { who: "Zoe", text: "Great news." },
      { who: "Harriet", text: "Now, I wonder if we might look at the deadline. Would it be at all possible to have the draft by Friday, rather than the Tuesday after? The client has moved their board meeting forward." },
      { who: "Neil", text: "Friday's a bit tight for me, I'm afraid. I've got the audit all week. I could possibly manage my section by Monday morning, if that's any use." },
      { who: "Harriet", text: "Hmm, Monday's cutting it fine. Zoe?" },
      { who: "Zoe", text: "I'd have to check, but I think I could take Neil's section on if someone sent me his notes. I wouldn't want to promise anything before I've seen them." },
      { who: "Vikram", text: "I'll send them to you straight after this call, Zoe. And I'll write the executive summary myself. That's not a problem." },
      { who: "Harriet", text: "That would be a huge help. So Vikram sends the notes and does the summary, Zoe has a look at Neil's section, and Neil, you'll proofread the finished draft?" },
      { who: "Neil", text: "Happy to." },
      { who: "Harriet", text: "Hi Zoe, it's Harriet. Just a quick message following the call. Vikram's sending the notes this afternoon. When you've had a chance to look, could you let me know by lunchtime tomorrow whether Neil's section is doable? It would be really good to know, because otherwise I'll have to ask the client for a bit more time. No pressure, of course." }
    ],
    skills: "Decoding softened requests ('I wonder if we might', 'would it be at all possible'), separating firm commitments from tentative offers, and reading implied urgency behind phrases such as 'no pressure'.",
    questions: [
      { type: "mcq", q: "Who agrees to send notes and write the executive summary?", options: ["Neil.", "Zoe.", "Vikram.", "Harriet."], answer: 2, why: "Vikram says <em>I'll send them to you straight after this call</em> and <em>I'll write the executive summary myself</em>. Zoe only receives the notes, and Neil will proofread." },
      { type: "mcq", q: "How firm is Zoe's offer to take over Neil's section?", options: ["Tentative: she wants to see the notes before promising.", "Completely firm.", "She refuses because she is too busy.", "She says Neil should do it himself."], answer: 0, why: "<em>I'd have to check... I wouldn't want to promise anything before I've seen them</em> makes it conditional. Harriet later describes it as Zoe having <em>a look</em>, not a promise." },
      { type: "mcq", q: "What is Harriet really doing when she says 'I wonder if we might look at the deadline'?", options: ["Asking for advice on the client's meeting.", "Inviting the team to extend the deadline.", "Suggesting that someone else leads the project.", "Politely asking the team to deliver the draft sooner."], answer: 3, why: "The hedged question leads straight to <em>Would it be at all possible to have the draft by Friday</em>, which is an earlier date. It is a polite request that the team move the deadline forward, not back." },
      { type: "mcq", q: "How does Neil respond to the request for Friday?", options: ["He accepts, but only for part of the draft.", "He politely refuses and offers a later date for his own section.", "He says the audit is more important than the report.", "He asks Zoe to do his section."], answer: 1, why: "<em>Friday's a bit tight for me, I'm afraid</em> is a polite refusal, followed by an offer of <em>Monday morning</em>. It is Zoe, not Neil, who raises the idea of taking his section on." },
      { type: "mcq", q: "What does Harriet imply in the voicemail?", options: ["Zoe should take no action until next week.", "Zoe has made a mistake in the notes.", "She needs Zoe's answer soon, despite saying there is no pressure.", "The client has cancelled the board meeting."], answer: 2, why: "She asks for a reply <em>by lunchtime tomorrow</em> and says that otherwise she must ask the client for more time, so <em>No pressure, of course</em> is a polite formula that hides real urgency." }
    ]
  }
);
