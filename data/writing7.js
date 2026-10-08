window.C1 = window.C1 || {};
/* Six further writing tasks (two proposals, two reviews, a letter of application and a report), added to the existing list. Loaded after data/writing6.js. */
C1.writing.tasks.push(
  {
    id: 'proposal-repair-cafe',
    genre: 'proposal',
    unit: null,
    title: 'A proposal for a community repair café',
    level: 'C1',
    min: 220,
    max: 260,
    minutes: 45,
    prompt: '<p>Your local council has set aside money for projects that improve life in neighbourhoods. A building near your home, the former post office, has stood empty for two years. It could be put to better use, and the council has invited residents to submit proposals.</p><p>Write a <strong>proposal</strong> for the council. In your proposal you should:</p><ul><li>describe the present state of the building and why it matters to residents</li><li>suggest how it could be used</li><li>explain what the council would need to provide and what the community would gain</li></ul><p>Write your proposal in <strong>220-260 words</strong>.</p>',
    points: [
      'Describe the present situation with specific details',
      'Make a clear suggestion and say who would take part',
      'Explain the costs honestly and the benefits convincingly',
      'Use headings and a persuasive but formal register'
    ],
    plan: [
      'Choose headings first: Introduction / Present situation / Proposal / Costs and benefits / Conclusion. Readers on a council scan for the part they need.',
      'Introduction: state the idea in one sentence and say what it is based on, so the reader knows at once what you want.',
      'Present situation: show the problem and whom it affects, because a proposal is only convincing if the need is clear.',
      'Proposal: give two or three concrete features, and for each one say who benefits and why it suits the place.',
      'Costs and benefits: admit what the council must pay for, then show why the project will not keep costing money; honesty here builds trust.',
      'Conclusion: end with a short, confident request for approval.'
    ],
    model: [
      '<strong>Introduction</strong><br>The purpose of this proposal is to recommend that the empty former post office on Aldwick Road be turned into a repair café, with support from the council\'s neighbourhood fund. It is based on conversations with residents and with staff at the two local schools.',
      '<strong>Present situation</strong><br>The building has been empty for two years and is gradually falling into disrepair, yet it stands on a busy street in a densely populated area where few people have anywhere to meet. Residents told me that they throw away broken items because repairs cost too much, and several said that the shuttered shop makes the street feel neglected, particularly to older people who live alone.',
      '<strong>Proposal</strong><br>I suggest opening the building two afternoons a week, with volunteer repairers helping visitors to mend small electrical items, clothes and bicycles. A tea corner would give neighbours a reason to stop and talk. The schools could send pupils to learn repair skills, which would bring younger and older residents into regular contact.',
      '<strong>Costs and benefits</strong><br>Initial costs would cover basic repairs to the building, tools and workbenches, and the council\'s help would be needed for these. Thereafter, the café should largely sustain itself, since volunteers would provide the labour and voluntary donations could pay for materials. The benefits are difficult to measure but would include less waste, lower household costs and stronger relationships between neighbours.',
      '<strong>Conclusion</strong><br>A modest investment could turn an eyesore into a place that residents value and look after themselves. I therefore hope that the council will approve the project.'
    ],
    notes: [
      { para: 0, text: '<em>The purpose of this proposal is to recommend that</em> says what is being asked for in the first line. <em>be turned</em> (subjunctive-style, passive) keeps the tone impersonal, and naming the sources at the end shows that the idea comes from the community and not only from the writer.' },
      { para: 1, text: '<em>yet it stands on a busy street in a densely populated area where few people have anywhere to meet</em> sets a contrast that explains why the land matters. A reader who knows nothing about the place can see the need at once.' },
      { para: 1, text: '<em>Residents told me that</em> and <em>several said that</em> report opinions instead of asserting them. This is safer and more persuasive than writing "everyone wants a repair café", which nobody could check.' },
      { para: 2, text: '<em>I suggest creating</em> is the natural verb of a proposal: firm but not demanding. The features answer different needs (skills, company, school links), so the proposal looks thought through and not like a wish list.' },
      { para: 2, text: '<em>A tea corner would give neighbours a reason to stop and talk</em> gives a reason for a choice, and <em>which would bring younger and older residents into regular contact</em> uses a relative clause to add a second benefit without a new sentence.' },
      { para: 3, text: '<em>the council\'s help would be needed for these</em> is honest about money, which makes the later claim <em>should largely sustain itself</em> believable. <em>should</em> and <em>would</em> keep predictions modest.' },
      { para: 3, text: '<em>difficult to measure but would include</em> admits a limit and still lists the gains. Admitting that benefits are hard to measure is more credible than inventing figures.' },
      { para: 4, text: '<em>turn an eyesore into a place that residents value and look after themselves</em> contrasts before and after in one image. <em>I therefore hope that</em> ends politely: the writer asks and does not demand.' }
    ],
    language: [
      { h: 'Introducing a proposal', items: ['The purpose of this proposal is to recommend that …', 'It is based on …', 'with support from …', 'I suggest creating …'] },
      { h: 'Describing a problem', items: ['has been empty for … and is gradually falling into …', 'yet it lies in …', 'Residents told me that …', 'particularly to …'] },
      { h: 'Justifying your ideas', items: ['would give … a reason to …', 'which would bring … into regular contact', 'would be needed for …', 'should largely sustain itself, since …'] },
      { h: 'Closing a proposal', items: ['A modest investment could turn … into …', 'I therefore hope that …', 'would include …', 'stronger relationships between …'] }
    ]
  },

  {
    id: 'proposal-language-exchange',
    genre: 'proposal',
    unit: null,
    title: 'A proposal for a language exchange scheme',
    level: 'C1',
    min: 220,
    max: 260,
    minutes: 45,
    prompt: '<p>You are a student at a language college that has many international students. The principal has asked students to suggest ways of helping students from different backgrounds to get to know each other and to improve their language skills outside the classroom.</p><p>Write a <strong>proposal</strong> for the principal. In your proposal you should:</p><ul><li>explain why such a scheme is needed</li><li>suggest how it could work in practice</li><li>say what it would cost and what the college would gain</li></ul><p>Write your proposal in <strong>220-260 words</strong>.</p>',
    points: [
      'Explain the need, using what students have told you',
      'Describe how the scheme would run, with practical details',
      'Deal with cost and with the college\'s benefit',
      'Use headings, recommending language and a clear closing request'
    ],
    plan: [
      'Headings: Introduction / Why the scheme is needed / The proposal / Cost and benefits / Conclusion.',
      'Introduction: say what you propose and when, then say how you found out what students need.',
      'Need: describe the gap between the two groups; the scheme should answer a real problem, not just sound attractive.',
      'Proposal: explain who is paired, how often, where and what support they get. Practical detail is what makes a proposal workable.',
      'Cost and benefits: show that the cost is small and the gain is bigger than language practice alone.',
      'Conclusion: recommend a trial with an evaluation, which is easier for a principal to accept than a permanent commitment.'
    ],
    model: [
      '<strong>Introduction</strong><br>This proposal outlines a scheme in which international students are paired with local students to practise each other\'s languages, and explains why it would be worth introducing next term. It draws on informal discussions with students from both groups.',
      '<strong>Why the scheme is needed</strong><br>International students told me that they study in English all day but seldom speak it with native speakers outside lessons, so their progress in conversation is slow. Meanwhile, many local students are learning a foreign language yet have no one to practise it with. The two groups remain largely separate, partly because they have few natural opportunities to meet.',
      '<strong>The proposal</strong><br>I propose that pairs be matched at the start of each term according to the languages they wish to practise and their timetables. Each pair would meet for an hour a week, spending half of the time in each language, in a designated room in the library. A short guidance sheet with conversation topics would help those who feel unsure how to begin, and a member of staff would check progress at the end of each month.',
      '<strong>Cost and benefits</strong><br>The scheme would cost very little, since it needs only a room, some printing and a few hours of staff time. Participants would gain fluency and confidence, whereas the college would benefit from a more integrated community, which in turn might make it more attractive to prospective students.',
      '<strong>Conclusion</strong><br>Given the modest outlay and the potential gains, I strongly recommend a pilot of one term, after which participants could be asked to evaluate it.'
    ],
    notes: [
      { para: 0, text: '<em>This proposal outlines a scheme in which</em> uses a relative structure (<em>in which</em>) to define the idea precisely in one sentence. The mention of <em>informal discussions</em> is honest about the evidence: it does not pretend to be a formal survey.' },
      { para: 1, text: '<em>study in English all day but seldom speak it with native speakers</em> identifies the exact problem. The contrast between <em>study</em> and <em>speak</em> explains why more lessons would not solve it, which justifies a new kind of activity.' },
      { para: 1, text: '<em>Meanwhile</em> turns to the second group, and <em>yet have no one to practise it with</em> shows that the scheme helps both sides. A proposal with two beneficiaries is more convincing than one with a single one.' },
      { para: 2, text: '<em>I propose that pairs be matched</em> uses the subjunctive form after <em>propose that</em>, a formal structure that suits the genre. The matching criteria (<em>languages</em> and <em>timetables</em>) show that the writer has thought about practical obstacles.' },
      { para: 2, text: '<em>spending half of the time in each language</em> is a participle clause that explains the exchange principle in a few words, and <em>a short guidance sheet</em> anticipates the objection that students would not know what to say.' },
      { para: 3, text: '<em>since it needs only a room, some printing and a few hours of staff time</em> gives reasons for calling the cost small, and a list of three is quick for a busy reader to take in. <em>whereas</em> separates the gain for students from the gain for the college.' },
      { para: 3, text: '<em>which in turn might make it more attractive</em> adds a longer-term benefit but hedges it with <em>might</em>, so the writer does not promise more than can be delivered.' },
      { para: 4, text: '<em>Given the modest outlay and the potential gains</em> opens with <em>Given</em>, used like a preposition, to summarise the argument, and <em>a pilot of one term</em> makes saying yes easy for the principal because the risk is limited.' }
    ],
    language: [
      { h: 'Outlining an idea', items: ['This proposal outlines a scheme in which …', 'It draws on …', 'I propose that pairs be matched …', 'according to …'] },
      { h: 'Showing a need', items: ['seldom … outside …', 'yet have no one to … with', 'remain largely separate', 'partly because …'] },
      { h: 'Practical detail', items: ['spending half of the time in …', 'in a designated room', 'would help those who feel unsure how to …', 'check progress at the end of each month'] },
      { h: 'Cost and recommendation', items: ['would cost very little, since …', 'which in turn might …', 'Given the modest outlay …', 'I strongly recommend a pilot of …'] }
    ]
  },

  {
    id: 'review-exhibition-rivers',
    genre: 'review',
    unit: null,
    title: 'A review of a museum exhibition',
    level: 'C1',
    min: 220,
    max: 260,
    minutes: 45,
    prompt: '<p>You regularly write for an online magazine about things to do in your area. The editor has asked you to review an exhibition you have recently visited at a local museum.</p><p>Write a <strong>review</strong> for the magazine. In your review you should:</p><ul><li>describe what the exhibition is about and how it is presented</li><li>explain what was successful and what was less so</li><li>say whether you would recommend it and to whom</li></ul><p>Write your review in <strong>220-260 words</strong>.</p>',
    points: [
      'Say what the exhibition is and how it presents its subject',
      'Give examples of the strongest features',
      'Give fair criticism with specific examples',
      'Make a final recommendation for a particular kind of reader, in a lively but controlled style'
    ],
    plan: [
      'Think about your reader: someone deciding how to spend an afternoon. Everything you write should help that decision.',
      'Paragraph 1: hook the reader and summarise the subject and the method of presentation in two sentences.',
      'Paragraph 2: the best feature, described vividly enough that the reader can imagine it.',
      'Paragraph 3: the weaknesses, each with a specific example; vague criticism is useless to a reader.',
      'Paragraph 4: balance the verdict, say who would enjoy it, and add practical advice.',
      'Register: semi-formal and engaged, with opinions clearly signalled; contractions are acceptable but not essential.'
    ],
    model: [
      'Rarely does an exhibition manage to be both scholarly and enjoyable, but "Lost Rivers of the City", now showing at the Municipal Museum, comes close. It traces the streams that once ran through our town and have since been buried beneath roads and buildings, using old maps, photographs and a number of ingenious interactive displays.',
      'The strongest feature is the way it makes the invisible visible. A large floor map lights up as you walk across it, showing the original course of each river, and the sudden realisation that the shopping centre stands on a former marsh is memorable. Short films of residents recalling floods and childhood games by the water add a personal touch that a purely historical account would lack.',
      'Not everything succeeds, however. The central room is overcrowded with text panels, many of which are too long to read while standing, and the audio guide, although informative, repeats what the labels already say. On the day I visited, several touchscreens were out of order, which was particularly frustrating for the school groups waiting to use them.',
      'Nevertheless, these are minor blemishes in an otherwise thoughtful exhibition. Anyone curious about how towns change, whether or not they are keen on history, will find it rewarding. I would suggest allowing at least ninety minutes and going on a weekday morning, when it is quieter. Admission is free, which makes the occasional flaw easier to forgive.'
    ],
    notes: [
      { para: 0, text: '<em>Rarely does an exhibition manage to be both scholarly and enjoyable</em> uses inversion after a negative adverb to create a striking opening, and it tells the reader the review will weigh two qualities. <em>comes close</em> is a measured verdict that is already half positive.' },
      { para: 0, text: '<em>that once ran through our town and have since been buried</em> packs the whole subject into one relative clause, with <em>once</em> and <em>since</em> showing change over time. <em>using old maps, photographs and…</em> describes the method in a participle phrase.' },
      { para: 1, text: '<em>makes the invisible visible</em> is a short, memorable summary of the exhibition\'s idea. The example that follows (the floor map and the shopping centre on a marsh) proves the claim instead of just praising.' },
      { para: 1, text: '<em>a personal touch that a purely historical account would lack</em> compares the films with an alternative approach, so the praise has a reason, and a reader sees why the films are worth the visit.' },
      { para: 2, text: '<em>Not everything succeeds, however</em> signals the turn to criticism politely. <em>many of which are too long to read while standing</em> is specific and useful: a reader learns exactly what to expect.' },
      { para: 2, text: '<em>although informative</em> concedes a merit inside the criticism, which keeps the review fair, and <em>On the day I visited</em> limits the complaint about the touchscreens to what the writer actually saw.' },
      { para: 3, text: '<em>minor blemishes in an otherwise thoughtful exhibition</em> puts the faults in proportion. <em>whether or not they are keen on history</em> widens the audience, which is exactly what a recommendation to a general reader should do.' },
      { para: 3, text: '<em>I would suggest allowing at least ninety minutes</em> gives practical advice, and the last sentence closes on the free admission, a concrete point that links the verdict back to the reader\'s own decision.' }
    ],
    language: [
      { h: 'Opening with impact', items: ['Rarely does … manage to be both … and …', 'comes close', 'traces the … that once …', 'using … and a number of …'] },
      { h: 'Praising with a reason', items: ['The strongest feature is the way it …', 'makes the invisible visible', 'adds a personal touch that … would lack', 'is memorable'] },
      { h: 'Criticising fairly', items: ['Not everything succeeds, however.', 'is overcrowded with …', 'although informative, …', 'On the day I visited, …', 'which was particularly frustrating'] },
      { h: 'Recommending', items: ['minor blemishes in an otherwise thoughtful …', 'Anyone curious about … will find it rewarding.', 'I would suggest …', 'easier to forgive'] }
    ]
  },

  {
    id: 'review-budget-app',
    genre: 'review',
    unit: null,
    title: 'A review of a smartphone app',
    level: 'C1',
    min: 220,
    max: 260,
    minutes: 45,
    prompt: '<p>A lifestyle website is publishing reviews written by readers. You have used a smartphone app regularly for at least a month, and you decide to send in a review.</p><p>Write a <strong>review</strong> of the app for the website. In your review you should:</p><ul><li>describe what the app does and how you use it</li><li>explain its advantages and disadvantages</li><li>say whether you would recommend it and to whom</li></ul><p>Write your review in <strong>220-260 words</strong>.</p>',
    points: [
      'Explain what the app is for and what your experience of it has been',
      'Give concrete advantages, with an example from your own use',
      'Give concrete disadvantages, again with examples',
      'Make a balanced recommendation aimed at a specific kind of user'
    ],
    plan: [
      'Pick one app you can talk about concretely. Real, specific detail makes a review believable.',
      'Paragraph 1: say what the app does and how long you have used it, so that readers can judge how much weight to give your opinion.',
      'Paragraph 2: the main advantage first, supported by one small example from your own experience.',
      'Paragraph 3: the drawbacks, with examples; group them so the paragraph does not become a list of complaints.',
      'Paragraph 4: a verdict that distinguishes between kinds of users, because no app suits everyone.',
      'Register: informal-neutral and personal (I, my), but still accurate and controlled.'
    ],
    model: [
      'When I downloaded "PennyWise", a budgeting app aimed at young adults, I expected little more than a digital notebook. After three months of daily use, I can say that it is more useful than that, although it is not without drawbacks.',
      'Its main strength is simplicity. Once you have linked your bank account, purchases are sorted into categories automatically, and a single screen shows how much remains for the month. A weekly summary points out spending that you might not have noticed, such as small subscriptions, and this alone persuaded me to cancel two I never used. The design is clean, and the app runs smoothly even on an older phone.',
      'On the other hand, the free version is rather limited. Setting savings goals and exporting your data both require a paid subscription, which seems unreasonable for features many people consider basic. The automatic sorting is also far from flawless: it classified a train ticket as entertainment, and correcting such mistakes soon becomes tedious. Finally, some users may be uneasy about sharing banking details with a company they have never heard of.',
      'Overall, I would recommend PennyWise to anyone who wants to understand where their money goes without keeping a spreadsheet. Those who need detailed planning, however, would be better served by a more advanced and costlier alternative. For my part, I shall carry on using the free version, though I doubt that I will ever pay for the rest.'
    ],
    notes: [
      { para: 0, text: '<em>I expected little more than a digital notebook</em> starts from a modest expectation, so the surprise that follows (<em>more useful than that</em>) feels honest. <em>After three months of daily use</em> gives the reader a reason to trust the opinion.' },
      { para: 0, text: '<em>although it is not without drawbacks</em> is a double negative that sounds more diplomatic than "it has drawbacks", and it warns the reader that criticism is coming.' },
      { para: 1, text: '<em>Its main strength is simplicity</em> is a clear topic sentence. The details after it (<em>Once you have linked…</em>) describe how the app works without a separate description paragraph, which saves words.' },
      { para: 1, text: '<em>such as small subscriptions, and this alone persuaded me to cancel two I never used</em> turns a general feature into a personal result. A concrete benefit is far more persuasive than the adjective "useful".' },
      { para: 2, text: '<em>On the other hand</em> marks the change of direction, and <em>which seems unreasonable for features many people consider basic</em> gives the writer\'s reason for objecting, not just the objection.' },
      { para: 2, text: '<em>far from flawless: it classified a train ticket as entertainment</em> uses a colon to introduce the example. The ironic understatement <em>far from flawless</em> is milder, and so more credible, than "terrible".' },
      { para: 2, text: '<em>some users may be uneasy about</em> raises a worry without claiming it as a fact, which is the right hedge for a risk the writer has not experienced.' },
      { para: 3, text: '<em>anyone who wants… Those who need…, however, would be better served by</em> divides readers into two groups, which is what makes a recommendation useful. <em>though I doubt that I will ever pay</em> ends with a personal and slightly humorous note.' }
    ],
    language: [
      { h: 'Describing an app', items: ['aimed at …', 'Once you have linked …, …', 'is sorted into categories automatically', 'runs smoothly even on …'] },
      { h: 'Personal evidence', items: ['After three months of daily use, …', 'this alone persuaded me to …', 'points out … that you might not have noticed'] },
      { h: 'Softening criticism', items: ['is not without drawbacks', 'is rather limited', 'far from flawless', 'some users may be uneasy about …', 'soon becomes tedious'] },
      { h: 'Recommending to a group', items: ['I would recommend … to anyone who …', 'would be better served by …', 'For my part, …', 'Overall, …'] }
    ]
  },

  {
    id: 'letter-application-youth-trust',
    genre: 'letter',
    unit: null,
    title: 'A letter of application for a summer job',
    level: 'C1',
    min: 220,
    max: 260,
    minutes: 45,
    prompt: '<p>You have seen this advertisement on the website of a charity.</p><blockquote><strong>Summer activities coordinator wanted</strong><br>Brightside Youth Trust is looking for an enthusiastic person to help organise a summer programme for young people aged eight to fourteen. Experience of working with children is an advantage. Apply to Ms Rosa Carter, Programme Manager.</blockquote><p>Write a <strong>letter of application</strong>. In your letter you should:</p><ul><li>explain why you are interested in the post</li><li>describe your relevant experience and skills</li><li>say when you are available</li></ul><p>Write your letter in <strong>220-260 words</strong>.</p>',
    points: [
      'State which post you are applying for and where you saw it',
      'Present experience and skills that match the advertisement, with examples',
      'Give your availability and mention any enclosure',
      'Use correct formal layout and a confident but polite tone'
    ],
    plan: [
      'Greeting: the advertisement gives a name, so write Dear Ms Carter and end with Yours sincerely (Yours faithfully is only for Dear Sir or Madam).',
      'Opening: name the post and the source of the advertisement; the reader may be dealing with several vacancies at once.',
      'Paragraph 2: your strongest relevant experience, with examples of what you did and what it taught you. Examples prove skills; adjectives do not.',
      'Paragraph 3: further qualities and qualifications that fit the job, linked to the needs of the charity.',
      'Paragraph 4: availability, any enclosure, and an offer to give more information.',
      'Close with a short formal sentence, then the sign-off and your name. No contractions.'
    ],
    model: [
      'Dear Ms Carter,',
      'I am writing to apply for the post of summer activities coordinator advertised on your website. I have long admired the Trust\'s work with young people, and I believe that my experience would allow me to contribute from the first day.',
      'For the past two years I have helped to run a weekly sports club for children aged eight to twelve at my local community centre. This has taught me how to plan sessions for mixed abilities, how to keep a lively group calm without raising my voice, and how to work with parents who are understandably anxious. Last summer I also organised a three-day trip to a nature reserve for thirty children, which involved managing a small budget and arranging safe transport.',
      'I am studying for a degree in Education, so I am well aware of the importance of encouraging shy participants as well as confident ones. In addition, I hold a current first-aid certificate and speak both Spanish and English fluently, which might be useful when communicating with families who prefer to use Spanish.',
      'I am available for the whole of July and August and could attend an interview at any time that suits you. I enclose a reference from the manager of the community centre, and I would be glad to provide any further information you may require.',
      'I look forward to hearing from you.',
      'Yours sincerely,',
      'Daniel Rivera'
    ],
    notes: [
      { para: 0, text: '<em>Dear Ms Carter</em> is correct because the advertisement names the person. A named greeting means the letter must end with <em>Yours sincerely</em> (the closing line), and using the name shows that the writer read the advertisement carefully.' },
      { para: 1, text: '<em>I am writing to apply for the post of … advertised on your website</em> identifies the job and the source in one sentence. <em>I have long admired the Trust\'s work</em> gives a reason for interest without exaggerating, and <em>would allow me to contribute from the first day</em> shifts the focus to what the Trust will gain.' },
      { para: 2, text: '<em>For the past two years I have helped to run</em> uses the present perfect for an experience that continues up to now. The details (<em>children aged eight to twelve</em>) fall within the age range in the advertisement, so the employer sees the relevance at once.' },
      { para: 2, text: '<em>how to plan sessions for mixed abilities, how to keep a lively group calm without raising my voice, and how to work with parents</em> is a parallel list of what the experience taught, so it names skills through actions, not through adjectives like "responsible".' },
      { para: 2, text: '<em>which involved managing a small budget and arranging safe transport</em> uses a relative clause to add more responsibilities to a single example, which saves words and shows organisation, the very skill a coordinator needs.' },
      { para: 3, text: '<em>I am well aware of the importance of</em> links the writer\'s studies to the job. <em>as well as confident ones</em> shows an understanding of how groups really behave, and <em>which might be useful</em> offers the language skill as a possible extra, without boasting.' },
      { para: 4, text: '<em>at any time that suits you</em> is polite and flexible, and <em>I enclose a reference</em> is the standard formal way to mention a document. <em>any further information you may require</em> keeps the register formal.' },
      { para: 5, text: '<em>I look forward to hearing from you</em> is the usual closing line in a letter of application, short and neutral, and it needs no more.' }
    ],
    language: [
      { h: 'Applying', items: ['I am writing to apply for the post of …', 'advertised on your website', 'I have long admired …', 'would allow me to contribute from …'] },
      { h: 'Presenting experience', items: ['For the past two years I have …', 'This has taught me how to …', 'which involved managing …', 'I also organised …'] },
      { h: 'Adding qualities', items: ['I am well aware of the importance of …', 'as well as …', 'I hold a current … certificate', 'which might be useful when …'] },
      { h: 'Availability and closing', items: ['I am available for …', 'at any time that suits you', 'I enclose …', 'any further information you may require', 'Yours sincerely'] }
    ]
  },

  {
    id: 'report-leisure-centre',
    genre: 'report',
    unit: null,
    title: 'A report on a local leisure centre',
    level: 'C1',
    min: 220,
    max: 260,
    minutes: 45,
    prompt: '<p>You belong to a sports club in your town. The town council is planning to update the leisure centre and has asked local clubs to report on how well the centre meets the needs of the people who use it.</p><p>Write a <strong>report</strong> for the council. In your report you should:</p><ul><li>describe how the centre is used at present</li><li>identify the main problems users have</li><li>recommend improvements</li></ul><p>Write your report in <strong>220-260 words</strong>.</p>',
    points: [
      'Say how you collected your information',
      'Describe the strengths and the main problems with specific examples',
      'Make recommendations that answer the problems',
      'Use headings and an objective, formal register'
    ],
    plan: [
      'Headings: Introduction / Findings / Recommendations / Conclusion, so councillors can find each part quickly.',
      'Introduction: state the aim and what the report is based on; the sources give the report its authority.',
      'Findings: start with what works, then give the problems in order of importance, each with a detail that makes it concrete.',
      'Recommendations: link each one to a problem, otherwise the reader cannot see why it is needed.',
      'Conclusion: summarise in two sentences and look ahead to the likely benefit.',
      'Report facts and what people said; avoid personal feelings and emotional words.'
    ],
    model: [
      '<strong>Introduction</strong><br>This report evaluates the Riverside Leisure Centre, focusing on how well it serves local residents, and makes recommendations for improvement. It is based on a survey of 120 users and on my own observations over the course of a month.',
      '<strong>Findings</strong><br>The swimming pool and the gym are the most popular facilities, and users praise the friendly, knowledgeable staff. However, the changing rooms are in poor condition, with broken lockers and inadequate ventilation, and a majority of those surveyed mentioned this as their main complaint. Furthermore, most classes take place in the early evening, which makes them difficult to attend for people who finish work late or have caring responsibilities. Finally, the centre is hard to reach by public transport, since the last bus leaves before the evening sessions end.',
      '<strong>Recommendations</strong><br>The changing rooms should be refurbished as a priority, since this would improve every visitor\'s experience. In addition, the centre could offer a wider range of classes at lunchtime and at weekends, which would attract older people and parents of young children. It would also be worth discussing with the bus company an extension of the evening service or, failing that, providing a secure cycle shelter.',
      '<strong>Conclusion</strong><br>The centre has a solid foundation in its staff and main facilities. With modest changes to the buildings and the timetable, it could become a more inclusive resource that people of all ages would use regularly.'
    ],
    notes: [
      { para: 0, text: '<em>evaluates … focusing on how well it serves local residents</em> states the aim as a question of quality, not just description. <em>a survey of 120 users and … my own observations</em> names two kinds of evidence, which is more reliable than one.' },
      { para: 1, text: '<em>users praise the friendly, knowledgeable staff</em> begins with a strength, so the criticism that follows reads as fair, not hostile. <em>However</em> turns to the problems.' },
      { para: 1, text: '<em>with broken lockers and inadequate ventilation, and a majority of those surveyed mentioned this</em> combines a physical detail with survey evidence. The writer gives proof, not just opinion.' },
      { para: 1, text: '<em>which makes them difficult to attend for people who finish work late or have caring responsibilities</em> says who is affected, so the problem has a human consequence, and <em>Furthermore</em> and <em>Finally</em> mark the sequence of difficulties.' },
      { para: 1, text: '<em>since the last bus leaves before the evening sessions end</em> gives the reason why transport matters, so the third problem is linked to the second (evening classes) and the report reads as a connected argument.' },
      { para: 2, text: '<em>should be refurbished as a priority</em> uses a passive to keep the report impersonal, and <em>since this would improve every visitor\'s experience</em> gives the reason, so the council can see why this comes first.' },
      { para: 2, text: '<em>which would attract older people and parents of young children</em> links the timetable change to specific groups. <em>It would also be worth discussing</em> and <em>failing that</em> offer a fallback, which shows that the writer is realistic about what the council can achieve.' },
      { para: 3, text: '<em>a solid foundation in its staff and main facilities</em> ends with a positive point, and <em>With modest changes … it could become</em> predicts a benefit with a conditional, keeping the claim cautious and persuasive.' }
    ],
    language: [
      { h: 'Introducing the report', items: ['This report evaluates …, focusing on …', 'It is based on a survey of … and on …', 'over the course of a month', 'makes recommendations for improvement'] },
      { h: 'Presenting findings', items: ['users praise …', 'a majority of those surveyed mentioned …', 'is in poor condition, with …', 'which makes them difficult to attend for …'] },
      { h: 'Sequencing problems', items: ['However, …', 'Furthermore, …', 'Finally, …', 'since …'] },
      { h: 'Recommending', items: ['should be refurbished as a priority', 'It would also be worth discussing …', 'or, failing that, …', 'could become a more inclusive resource'] }
    ]
  }
);
