window.C1 = window.C1 || {};
/* Two further writing tasks (a report and an essay), added to the existing list. Loaded after data/writing.js. */
C1.writing.tasks.push(
  {
    id: 'report-law-media',
    genre: 'report',
    unit: null,
    title: 'Crime coverage in the local media',
    level: 'C1',
    min: 220,
    max: 260,
    minutes: 45,
    prompt: '<p>The town council is concerned that the way crime is reported in the local newspaper and on social media is making residents fearful and damaging the town’s reputation. As a member of a community group, you have been asked to look into the matter. You have read a month of coverage and interviewed 60 residents.</p><p>Write a <strong>report</strong> for the council. In your report you should:</p><ul><li>describe how crime is currently covered</li><li>assess the effect of this coverage on residents</li><li>recommend how the coverage could be improved</li></ul><p>Write your report in <strong>220-260 words</strong>.</p>',
    points: [
      'Describe how the newspaper and social media currently cover crime',
      'Assess the effect on residents, with evidence from your survey',
      'Make recommendations that follow logically from the findings',
      'Use headings and an impersonal, factual style'
    ],
    plan: [
      'Decide the headings: Introduction / Current coverage / Effects on residents / Recommendations.',
      'Invent your evidence: the number of articles or posts you read, the number of people you interviewed, and two or three percentages.',
      'Introduction: purpose and sources in two sentences (a month of coverage, 60 interviews).',
      'Coverage: contrast the newspaper with social media. Keep to what you found, not what you feel.',
      'Effects: link the coverage to residents’ perceptions with a figure, and add one counterpoint (for example, people also value being informed).',
      'Recommendations: three actions, each answering one finding, using different structures; end on the expected result.'
    ],
    model: [
      '<strong>Introduction</strong>',
      'This report examines how crime is covered by the local newspaper and on social media, and what effect this has on residents. It is based on a review of one month’s coverage and on interviews with 60 residents.',
      '<strong>Current coverage</strong>',
      'The newspaper reports serious offences promptly, but headlines tend to be sensational, and of the 42 crime stories published, over half featured the most dramatic incidents. On social media, by contrast, unverified accounts circulate within minutes, and several posts named individuals who were later cleared of any wrongdoing.',
      '<strong>Effects on residents</strong>',
      'Perhaps unsurprisingly, 70 per cent of those interviewed believe that crime has risen sharply, although police figures show it has remained stable. Nearly half said they now avoid the town centre after dark. Nevertheless, most respondents valued being kept informed, which suggests that the problem lies in the manner of reporting rather than in the reporting itself.',
      '<strong>Recommendations</strong>',
      'It is recommended that the newspaper publish local crime statistics alongside individual stories, so that readers can judge how typical an incident is. Moreover, the council should consider working with the police to publish verified updates on its own channels, thereby reducing the space for rumour. Finally, a short guide to responsible sharing could be distributed through schools and community centres. Were these measures adopted, residents would be better informed and, in all likelihood, less fearful.'
    ],
    notes: [
      { para: 1, text: 'A report opens with its <em>purpose</em> and its <em>sources</em> at once. <em>It is based on a review of … and on interviews with …</em> tells the council the findings can be trusted, and the impersonal subject keeps the register neutral.' },
      { para: 3, text: '<em>promptly, but headlines tend to be sensational</em> balances a positive and a negative. <em>tend to be</em> is a hedge that stops a generalisation from sounding exaggerated, which suits a factual report.' },
      { para: 3, text: 'Precise figures (<em>Of the 42 crime stories … over half</em>) turn an impression into evidence. A fronted <em>of</em>-phrase shows variety in how data is introduced.' },
      { para: 3, text: '<em>by contrast</em> sets two media side by side, and the participle phrase <em>who were later cleared of any wrongdoing</em> gives the single most telling example of harm, without a personal story.' },
      { para: 5, text: '<em>Perhaps unsurprisingly</em> comments on the finding and <em>although police figures show</em> sets perception against fact. This contrast is the heart of the argument, so it sits in the first sentence of the section.' },
      { para: 5, text: 'The last sentence draws a conclusion from the data: <em>which suggests that the problem lies in the manner of reporting rather than in the reporting itself</em>. The relative clause comments on the whole previous clause, and it prepares the recommendations logically.' },
      { para: 7, text: 'Each recommendation uses a different structure (<em>It is recommended that … publish</em> with the subjunctive, <em>should consider working</em>, <em>could be distributed</em>), and each answers a finding: statistics against exaggeration, verified updates against rumour.' },
      { para: 7, text: 'Purpose clauses (<em>so that readers can judge</em>) and a result participle (<em>thereby reducing</em>) explain WHY each action helps. The inverted conditional <em>Were these measures adopted</em> and the hedge <em>in all likelihood</em> end on a realistic outcome.' }
    ],
    language: [
      { h: 'Introducing the report', items: ['This report examines how … and what effect this has on …', 'It is based on a review of … and on interviews with …', 'The findings are presented under three headings.', 'The purpose of this report is to assess …'] },
      { h: 'Presenting and contrasting findings', items: ['over half of the … featured …', 'By contrast, …', 'Perhaps unsurprisingly, …', 'although the figures show that …', 'which suggests that the problem lies in …'] },
      { h: 'Law, crime and media vocabulary', items: ['a sensational headline', 'unverified claims', 'to circulate rumours', 'to name a suspect', 'crime statistics', 'responsible reporting', 'to fuel fear'] },
      { h: 'Recommending', items: ['It is recommended that … publish …', 'The council should consider working with …', 'so that readers can …', 'thereby reducing …', 'Were these measures adopted, …'] }
    ]
  },

  {
    id: 'essay-consumer-arts',
    genre: 'essay',
    unit: null,
    title: 'Public funding of the arts',
    level: 'C1',
    min: 220,
    max: 260,
    minutes: 45,
    prompt: '<p>In your English class you have been discussing consumer choice, culture and the arts. Now your teacher has asked you to write an essay.</p><p><strong>Write an essay discussing two of the following points. You should explain which point is more important, giving reasons in support of your opinion.</strong></p><blockquote>In an age of consumer choice, governments should no longer spend public money on the arts.</blockquote><p>Consider:</p><ul><li>the cost to taxpayers</li><li>the value of the arts for society and character</li><li>(your own idea)</li></ul><p>Write your essay in <strong>220-260 words</strong>.</p>',
    points: [
      'Discuss the cost to taxpayers, with a reason or example',
      'Discuss the value of the arts for society and character (or your own idea), with a reason or example',
      'State which point is more important and explain why',
      'Keep a formal or neutral register throughout'
    ],
    plan: [
      'Underline the statement. Decide your opinion first: should public money still support the arts? Everything else must serve it.',
      'Introduction: set the context (streaming, a huge choice of entertainment) and say the question is less simple than it looks, without copying the prompt.',
      'Paragraph 2: the argument for cutting funding (cost, and the market gives people what they want), with a reason and an example.',
      'Paragraph 3: the argument against (the market ignores what is not profitable; arts shape character and community), with an example.',
      'Optional short paragraph: your own idea (for instance, arts education in schools).',
      'Conclusion: say which point carries more weight and why, and end with a practical recommendation.'
    ],
    model: [
      'Never before have consumers had such a wide choice of entertainment, with whole libraries of films and music available at the touch of a screen. It is therefore tempting to ask why taxpayers should still subsidise theatres, museums and orchestras.',
      'The case against public funding is not without force. Money is limited, and every pound spent on an opera house is a pound not spent on hospitals or schools. Moreover, if an art form is truly valued, one could argue, enough people will pay for it, so that the market, rather than the state, decides what survives.',
      'This reasoning, however, overlooks what the market does badly. Commercial success rewards what is popular, not what is important, and experimental work, which often takes years to find an audience, would rarely survive without support. Nor are the benefits purely personal. A child who learns an instrument or acts in a school play gains patience and empathy, and such qualities shape character far beyond the stage.',
      'A further point is access. Were funding withdrawn, ticket prices would rise, and the arts would become the preserve of the wealthy.',
      'On balance, I would argue that the value of the arts to society outweighs the cost. Public spending on culture is modest compared with other budgets, yet its effects are lasting. A sensible compromise would be to protect funding for education and community projects, and to ask well-established institutions to earn more of their income themselves.'
    ],
    notes: [
      { para: 0, text: '<em>Never before have consumers had</em> opens with negative inversion for emphasis, and it sets the context without copying the prompt. <em>It is therefore tempting to ask why</em> turns the statement into a question the essay will answer.' },
      { para: 1, text: '<em>The case against public funding is not without force</em> is a litotes: a double negative that concedes a point politely. Conceding first makes the later disagreement sound fair rather than dismissive.' },
      { para: 1, text: 'The parallel <em>every pound spent on … is a pound not spent on …</em> makes the opportunity cost vivid in one sentence. <em>one could argue</em> keeps the opposing view at a distance, so the writer does not sound as if they hold it.' },
      { para: 2, text: 'The paragraph begins with a reference phrase and a pivot: <em>This reasoning, however, overlooks what the market does badly</em>. <em>This reasoning</em> links back to the previous paragraph, and the pivot states the point of the paragraph at once.' },
      { para: 2, text: '<em>rewards what is popular, not what is important</em> uses a contrast to define the problem, and the non-defining relative clause <em>which often takes years to find an audience</em> explains why experimental work needs support.' },
      { para: 2, text: '<em>Nor are the benefits purely personal</em> is an inversion that adds a second argument. The example, a child learning an instrument, links the arts to character, which the task asked for, and moves from the concrete to the general.' },
      { para: 3, text: 'The short own-idea paragraph uses <em>Were funding withdrawn</em>, an inverted conditional, to predict a consequence. A brief paragraph shows control of length and does not distract from the main argument.' },
      { para: 4, text: 'The conclusion answers the task: <em>I would argue that the value of the arts … outweighs the cost</em>. It then offers a compromise, because C1 essays reward a balanced, practical final position rather than a one-sided slogan.' }
    ],
    language: [
      { h: 'Introducing the debate', items: ['Never before have … had such …', 'It is therefore tempting to ask why …', 'Few issues divide opinion as sharply as …', 'There is no shortage of arguments for and against …'] },
      { h: 'Conceding and then challenging', items: ['The case against … is not without force.', 'One could argue that …', 'This reasoning, however, overlooks …', 'Nor are the benefits purely …', 'That said, …'] },
      { h: 'Consumers, arts and character vocabulary', items: ['to subsidise', 'the taxpayer', 'consumer choice', 'commercially viable', 'to nurture empathy', 'cultural heritage', 'the preserve of the wealthy'] },
      { h: 'Concluding with a compromise', items: ['On balance, I would argue that …', '… outweighs the cost', 'A sensible compromise would be to …', 'All things considered, …', 'The key lies in striking a balance between … and …'] }
    ]
  }
);
