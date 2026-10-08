window.C1 = window.C1 || {};
/* Four further writing tasks (two essays, a letter and a report), added to the existing list. Loaded after data/writing5.js. */
C1.writing.tasks.push(
  {
    id: 'essay-ai-work',
    genre: 'essay',
    unit: null,
    title: 'Will artificial intelligence destroy more jobs than it creates?',
    level: 'C1',
    min: 220,
    max: 260,
    minutes: 45,
    prompt: '<p>In your English class you have been discussing technology and the future of work. Now your teacher has asked you to write an essay.</p><p><strong>Write an essay discussing two of the following points. You should explain which point is more important, giving reasons in support of your opinion.</strong></p><blockquote>Artificial intelligence will transform the world of work within a generation.</blockquote><p>Consider:</p><ul><li>whether new jobs will replace those that are lost</li><li>who will benefit from the extra productivity</li><li>(your own idea)</li></ul><p>Write your essay in <strong>220-260 words</strong>.</p>',
    points: [
      'Evaluate the claim that new jobs will replace old ones',
      'Discuss who gains from increased productivity (or your own idea)',
      'State which point matters more and justify your choice',
      'Keep an objective, formal register and weigh competing claims fairly'
    ],
    plan: [
      'Decide your position first: is the real issue the number of jobs, or how the gains are shared?',
      'Introduction: place AI in the history of automation and hint at what is different this time.',
      'Paragraph 2: the optimists\' claim, the historical evidence for it, and its weakness.',
      'Paragraph 3: the question of who benefits, with the optimists\' view and your objection.',
      'Short paragraph: your own idea, such as the quality of work that remains.',
      'Conclusion: say which point is more important and why, without exaggerating.'
    ],
    model: [
      'Every wave of automation has been accompanied by predictions of mass unemployment, and each has proved partly right and partly wrong. Artificial intelligence, however, may differ from its predecessors because it threatens tasks once thought to require human judgement.',
      'The first claim is that new technology creates more jobs than it destroys. Historically this has held: the loom displaced weavers, yet manufacturing, and later services, absorbed the workforce. Nevertheless, this reassurance rests on an assumption that the new roles will appear quickly and suit those who lost the old ones. A fifty-year-old accountant cannot easily become a data scientist, so a favourable figure may conceal considerable individual hardship.',
      'The second claim concerns who gains from productivity. Optimists argue that cheaper goods and shorter working weeks will benefit everyone. That outcome is far from automatic, though. Unless profits are widely shared, through taxation or ownership, the rewards may flow entirely to the owners of the technology, widening inequality rather than narrowing it.',
      'A point that receives less attention is the nature of the work that remains. Even where jobs survive, employees may find themselves supervising software, with less autonomy and fewer chances to develop skills. Whether this amounts to progress depends on whether workers are consulted about how the tools are introduced.',
      'In my view, the second consideration matters more, because the effect on employment will be determined less by what the technology can do than by the choices societies make about retraining and distribution. Neither panic nor complacency is justified; deliberate policy is.'
    ],
    notes: [
      { para: 0, text: '<em>has been accompanied by predictions of</em> … <em>each has proved partly right and partly wrong</em> opens with a historical generalisation and already shows balance. <em>Artificial intelligence, however, may differ</em> places the contrast inside the sentence and hedges it with <em>may</em>.' },
      { para: 1, text: '<em>The first claim is that</em> names the argument being evaluated instead of presenting it as the writer\'s own. This is the key skill in an abstract essay: weighing a claim, not just repeating it.' },
      { para: 1, text: '<em>Historically this has held: the loom displaced weavers, yet</em> gives evidence in a compact form, and the colon introduces the proof. <em>absorbed the workforce</em> is a precise verb choice that avoids repeating the phrase "create jobs".' },
      { para: 1, text: '<em>this reassurance rests on an assumption that</em> exposes the hidden weakness in the optimists\' case. The example of the accountant makes the abstract objection concrete, and <em>may conceal considerable individual hardship</em> is suitably cautious.' },
      { para: 2, text: '<em>That outcome is far from automatic, though</em> rejects the claim briefly, with <em>though</em> placed at the end for a natural, less mechanical contrast. <em>Unless profits are widely shared</em> states a condition rather than an absolute.' },
      { para: 2, text: '<em>widening inequality rather than narrowing it</em> uses a participle clause to give the consequence in a few words, with a neat parallel between <em>widening</em> and <em>narrowing</em>.' },
      { para: 3, text: '<em>A point that receives less attention is</em> introduces the own idea as an addition to the debate, which keeps it subordinate to the two main points. <em>Whether this amounts to progress depends on whether</em> ends the paragraph with a condition instead of a verdict.' },
      { para: 4, text: '<em>less by what the technology can do than by the choices societies make</em> is a comparison that justifies the choice of the second point. <em>Neither panic nor complacency is justified; deliberate policy is.</em> ends on a balanced, memorable contrast.' }
    ],
    language: [
      { h: 'Weighing a claim', items: ['The first claim is that …', 'rests on an assumption that …', 'is far from automatic', 'may conceal …', 'Historically this has held.'] },
      { h: 'Contrasting and conceding', items: ['however, may differ from …', 'Nevertheless, …', 'Optimists argue that …', '… rather than …', 'yet …'] },
      { h: 'Work and technology vocabulary', items: ['automation', 'to displace workers', 'productivity', 'retraining', 'inequality', 'autonomy'] },
      { h: 'Concluding an argument', items: ['In my view, … matters more, because …', 'is determined less by … than by …', 'depends on whether …', 'Neither … nor … is justified.'] }
    ]
  },

  {
    id: 'essay-heritage-tourism',
    genre: 'essay',
    unit: null,
    title: 'Should historic sites limit the number of visitors?',
    level: 'C1',
    min: 220,
    max: 260,
    minutes: 45,
    prompt: '<p>In your English class you have been discussing tourism and cultural heritage. Now your teacher has asked you to write an essay.</p><p><strong>Write an essay discussing two of the following points. You should explain which point is more important, giving reasons in support of your opinion.</strong></p><blockquote>Famous historic sites should limit the number of people who visit them each year.</blockquote><p>Consider:</p><ul><li>protecting the sites themselves</li><li>income for local communities</li><li>(your own idea)</li></ul><p>Write your essay in <strong>220-260 words</strong>.</p>',
    points: [
      'Discuss the physical protection of the sites, with an example',
      'Discuss the economic argument, and test whether it is as strong as it seems',
      'Add your own idea (for example fairness of access) and state your overall view',
      'Use a formal register and weigh the competing claims'
    ],
    plan: [
      'Decide your view: are limits justified, and under what conditions?',
      'Introduction: set out the tension between preservation and access without copying the statement.',
      'Paragraph 2: the case for limits, based on damage, with a concrete example.',
      'Paragraph 3: the economic objection, then a challenge to its hidden assumption.',
      'Paragraph 4: your own idea, such as fairness and virtual alternatives.',
      'Conclusion: state which consideration takes priority and why.'
    ],
    model: [
      'Few places illustrate the tension between preservation and access as vividly as the world\'s most celebrated historic sites. Millions of visitors may be a tribute to their appeal, yet they also threaten the very qualities that attract them.',
      'The case for limiting numbers rests primarily on physical damage. Footsteps wear down ancient stone, humidity from breathing affects painted walls, and crowds make quiet reflection impossible. Some caves containing paintings have been closed after the presence of visitors encouraged mould. If the purpose of heritage is to hand something intact to future generations, restraint is arguably a duty rather than an inconvenience.',
      'Opponents emphasise the economic benefits for local communities, and this should not be dismissed. Often, tourism pays for conservation as well as for hotels and restaurants. That said, the argument assumes that revenue rises in step with numbers, which is not necessarily so. Higher prices, timed tickets and the promotion of lesser-known sites can raise income while reducing pressure.',
      'A further issue is fairness. Quotas risk turning heritage into a privilege for those who can book early or pay more, whereas such places are often described as belonging to everyone. Virtual tours offer a partial remedy, although few people would claim that they replace standing in front of the original.',
      'On balance, I believe that limits are justified, provided they are flexible and accompanied by measures that spread both visitors and revenue. Ensuring a site\'s survival must take precedence, since income from something that no longer exists is no income at all.'
    ],
    notes: [
      { para: 0, text: '<em>Few places illustrate the tension between preservation and access</em> names the real issue in the first sentence, and the abstract nouns <em>preservation</em> and <em>access</em> frame the whole essay. <em>Millions of visitors may be a tribute to their appeal, yet they also threaten</em> shows the paradox that drives the argument.' },
      { para: 1, text: '<em>rests primarily on physical damage</em> signals the main basis of the argument. The three-part list (ancient stone, painted walls, quiet reflection) moves from the physical to the experiential, which broadens the case.' },
      { para: 1, text: '<em>restraint is arguably a duty rather than an inconvenience</em> reframes the issue morally. <em>arguably</em> keeps the claim defensible, because a bold statement with no hedge would invite easy objections.' },
      { para: 2, text: '<em>Opponents emphasise</em> the economic benefits and then <em>this should not be dismissed</em>, which treats the other side with respect before answering it. <em>That said</em> then introduces the counter-argument smoothly.' },
      { para: 2, text: '<em>the argument assumes that revenue rises in step with numbers, which is not necessarily so</em> attacks the logic of the claim, not its conclusion. This is evaluation rather than description, and it is exactly what a harder essay demands.' },
      { para: 2, text: '<em>Higher prices, timed tickets and the promotion of lesser-known sites</em> gives realistic alternatives, so the objection is answered with substance and not just with doubt.' },
      { para: 3, text: '<em>A further issue is fairness</em> is a short, clear topic sentence for the own idea. <em>whereas such places are often described as belonging to everyone</em> uses contrast to expose the problem, and <em>although few people would claim that</em> concedes a limit to the proposed remedy.' },
      { para: 4, text: '<em>provided they are flexible and accompanied by measures</em> gives an opinion with conditions attached. The closing <em>income from something that no longer exists is no income at all</em> turns the economic argument against itself, which is more persuasive than a generic final remark.' }
    ],
    language: [
      { h: 'Framing the issue', items: ['Few places illustrate … as vividly as …', 'the tension between … and …', 'may be a tribute to …, yet …', 'the very qualities that attract them'] },
      { h: 'Handling an opposing view', items: ['Opponents emphasise …', 'this should not be dismissed', 'That said, …', 'the argument assumes that …', 'which is not necessarily so'] },
      { h: 'Heritage and tourism vocabulary', items: ['conservation', 'visitor numbers', 'timed tickets', 'a quota', 'to hand something intact to future generations', 'lesser-known sites'] },
      { h: 'Giving a conditional verdict', items: ['On balance, I believe that …', 'provided they are …', 'must take precedence', 'since … is no … at all', 'A further issue is …'] }
    ]
  },

  {
    id: 'letter-council-noise',
    genre: 'letter',
    unit: null,
    title: 'A letter to the town council about night-time noise',
    level: 'C1',
    min: 220,
    max: 260,
    minutes: 45,
    prompt: '<p>You live near a park in the centre of your town, where the council allows concerts and markets on summer evenings. Residents have been disturbed by noise late at night. You decide to write to the town council.</p><p>Write a <strong>formal letter</strong> to the town council. In your letter you should:</p><ul><li>explain what the problem is and how it affects residents</li><li>acknowledge the value of the events</li><li>propose practical solutions</li></ul><p>Write your letter in <strong>220-260 words</strong>.</p>',
    points: [
      'State the reason for writing and who you represent',
      'Describe the problem with specific details',
      'Acknowledge the benefits of the events fairly',
      'Propose clear solutions and finish with a polite request, in correct formal layout'
    ],
    plan: [
      'Greeting: Dear Sir or Madam, then end with Yours faithfully.',
      'Opening: say who you are writing for and what the letter is about.',
      'Paragraph 2: describe the noise, the times and the people affected.',
      'Paragraph 3: acknowledge the benefits, then give two or three specific proposals.',
      'Final paragraph: a polite request for action, such as a discussion at a meeting.',
      'Check: no contractions, no angry language, and every complaint matched by a solution.'
    ],
    model: [
      'Dear Sir or Madam,',
      'I am writing on behalf of residents of Mill Lane and the surrounding streets to express our concern about the noise caused by evening events in Castle Park, and to suggest ways in which the problem might be resolved.',
      'Over the summer, outdoor concerts and the weekend market have regularly continued until well after midnight. Amplified music can be heard clearly in our homes, and the clearing up afterwards, with lorries reversing and bottles being emptied into bins, often goes on until two in the morning. Several elderly neighbours have told me that they cannot sleep, and parents of young children are equally affected. Complaints to the events office have so far produced only a polite acknowledgement.',
      'We fully appreciate that these events bring visitors to the town and benefit local traders, and we have no wish to see them cancelled. We would, however, ask the council to consider three measures. First, music should finish by 10.30 pm on weekdays and 11 pm at weekends. Second, deliveries and cleaning should not be permitted between midnight and 7 am. Finally, a named officer should be appointed to deal with complaints, so that residents know whom to contact.',
      'I would be grateful if you could confirm whether these proposals can be discussed at the next meeting of the licensing committee. I would also be happy to arrange for a small group of residents to describe their experiences in person.',
      'Yours faithfully,',
      'Helen Marsh'
    ],
    notes: [
      { para: 0, text: 'The greeting <em>Dear Sir or Madam</em> is correct because no name is known, so the ending must be "Yours faithfully" (paragraph 5).' },
      { para: 1, text: '<em>on behalf of residents of Mill Lane</em> gives the letter weight, because a group speaks with more authority than one person. <em>to suggest ways in which the problem might be resolved</em> tells the reader at once that solutions will follow.' },
      { para: 2, text: '<em>regularly continued until well after midnight</em> is precise about the times, so the complaint cannot be dismissed as vague. The detail <em>lorries reversing and bottles being emptied into bins</em> helps the reader to hear the problem.' },
      { para: 2, text: '<em>Several elderly neighbours have told me that they cannot sleep</em> shows the effect on people through reported evidence, which is more formal and more convincing than saying that it is terrible.' },
      { para: 2, text: '<em>Complaints to the events office have so far produced only a polite acknowledgement</em> explains why the writer is going to the council, and the tone stays measured: it states a fact and does not criticise anyone.' },
      { para: 3, text: '<em>We fully appreciate that</em> the events help the town and <em>we have no wish to see them cancelled</em>, which makes the request reasonable and prepares the council to listen. <em>We would, however, ask the council to consider</em> is polite but firm.' },
      { para: 3, text: '<em>First,</em> <em>Second,</em> and <em>Finally,</em> set out three separate proposals with times and a responsible person, so each is specific and easy to act on. <em>should finish</em>, <em>should not be permitted</em> and <em>should be appointed</em> keep the tone impersonal.' },
      { para: 4, text: '<em>I would be grateful if you could confirm whether</em> is a standard polite request, and the offer in <em>I would also be happy to arrange</em> shows willingness to help, which ends the letter constructively.' }
    ],
    language: [
      { h: 'Stating your purpose', items: ['I am writing on behalf of …', 'to express our concern about …', 'and to suggest ways in which the problem might be resolved', 'I am writing to draw your attention to …'] },
      { h: 'Describing the problem', items: ['has regularly continued until well after …', 'can be heard clearly in our homes', 'are equally affected', 'have so far produced only …'] },
      { h: 'Making proposals', items: ['We fully appreciate that …', 'We would, however, ask the council to consider …', 'should be appointed to …', 'should not be permitted between … and …', 'so that residents know whom to contact'] },
      { h: 'Requesting action politely', items: ['I would be grateful if you could confirm whether …', 'at the next meeting of the committee', 'I would also be happy to arrange …', 'Yours faithfully'] }
    ]
  },

  {
    id: 'report-student-wellbeing',
    genre: 'report',
    unit: null,
    title: 'A report on student wellbeing services',
    level: 'C1',
    min: 220,
    max: 260,
    minutes: 45,
    prompt: '<p>You are a student representative at a university. The university\'s management has asked you to write a report on the wellbeing and counselling services available to students. The report should describe what students think of the services and recommend improvements.</p><p>Write your <strong>report</strong>. In your report you should:</p><ul><li>summarise what you found out about the current services</li><li>explain the main difficulties students experience</li><li>recommend changes</li></ul><p>Write your report in <strong>220-260 words</strong>.</p>',
    points: [
      'Say how you collected your information',
      'Summarise the findings, including a strength and the main difficulties',
      'Make specific recommendations that answer the difficulties',
      'Use headings and a formal, objective register'
    ],
    plan: [
      'Headings: Introduction / Findings / Recommendations / Conclusion.',
      'Introduction: say what the report covers and what it is based on.',
      'Findings: one strength, then two or three difficulties, each with a figure or detail.',
      'Recommendations: one for each difficulty, using should, it is advisable to, would ensure.',
      'Conclusion: a balanced summary and the expected benefit.',
      'Keep the register objective: report what students said instead of giving personal feelings.'
    ],
    model: [
      '<strong>Introduction</strong><br>This report examines the wellbeing services available to students at the university, drawing on an online questionnaire completed by 200 students and on discussions with the counselling team, and recommends a number of changes.',
      '<strong>Findings</strong><br>The counselling service is highly regarded by those who have used it, with most describing staff as sympathetic and professional. Unfortunately, demand has outstripped capacity: the average wait for a first appointment is now five weeks, and several respondents said they gave up before being seen. In addition, many students were unaware that support exists at all, particularly those living off campus. Finally, services operate only during office hours, which excludes students who work part-time or find evenings the most difficult.',
      '<strong>Recommendations</strong><br>First, the university should employ at least two further counsellors, so that no student has to wait longer than ten days. Second, a short introductory session during the first week of term would ensure that newcomers know what help is available and how to reach it. Third, it is advisable to extend opening hours until 8 pm on two evenings a week and to introduce an online chat option, which many students would find less daunting than visiting an office.',
      '<strong>Conclusion</strong><br>The quality of the existing service is not in doubt; the difficulty lies in access. If these measures were adopted, students would be considerably more likely to seek help before problems become serious, which would benefit both individuals and the university.'
    ],
    notes: [
      { para: 0, text: '<em>drawing on an online questionnaire completed by 200 students</em> and <em>on discussions with the counselling team</em> state the sources, which gives the report credibility. <em>recommends a number of changes</em> tells the reader what to expect.' },
      { para: 1, text: '<em>highly regarded by those who have used it</em> opens with a strength in a passive-style phrase, and the restriction <em>by those who have used it</em> keeps the claim accurate. This sets up the contrast that follows.' },
      { para: 1, text: '<em>demand has outstripped capacity</em> is a compact, formal way of saying there are too few counsellors for the students who want help. The colon then introduces the evidence, <em>five weeks</em>, so the claim is not just an opinion.' },
      { para: 1, text: '<em>several respondents said they gave up before being seen</em> reports what students said without commenting on it, which keeps the register objective and shows the effect of the delay.' },
      { para: 1, text: '<em>In addition</em> and <em>Finally</em> organise the difficulties into a clear list. <em>which excludes students who work part-time</em> uses a relative clause to say who suffers, so the problem has a human consequence.' },
      { para: 2, text: '<em>First,</em> <em>Second,</em> and <em>Third,</em> match each recommendation to a difficulty above: staffing, awareness and opening hours. The targets (<em>two further counsellors</em>, <em>ten days</em>, <em>8 pm on two evenings</em>) make each one measurable.' },
      { para: 2, text: 'The structures vary: <em>should employ</em>, <em>would ensure that</em> and <em>it is advisable to</em>. <em>which many students would find less daunting</em> gives the reason for the online option in a relative clause.' },
      { para: 3, text: '<em>The quality of the existing service is not in doubt; the difficulty lies in access</em> sums up the whole report in one balanced sentence. <em>If these measures were adopted, students would be considerably more likely to</em> is a second conditional that predicts a result without overpromising.' }
    ],
    language: [
      { h: 'Introducing the report', items: ['This report examines …', 'drawing on a questionnaire completed by …', 'and on discussions with …', 'and recommends a number of changes'] },
      { h: 'Presenting findings', items: ['is highly regarded by those who …', 'demand has outstripped capacity', 'several respondents said that …', 'which excludes students who …', 'were unaware that …'] },
      { h: 'Wellbeing vocabulary', items: ['counselling', 'to seek help', 'a first appointment', 'support services', 'opening hours', 'daunting'] },
      { h: 'Recommending and concluding', items: ['should employ …', 'would ensure that …', 'it is advisable to …', 'The difficulty lies in …', 'which would benefit both … and …'] }
    ]
  }
);
