window.C1 = window.C1 || {};
/* Three further writing tasks (an essay, a report and a review), added to the existing list. Loaded after data/writing3.js. */
C1.writing.tasks.push(
  {
    id: 'essay-science-funding',
    genre: 'essay',
    unit: null,
    title: 'Should governments fund science with no immediate use?',
    level: 'C1',
    min: 220,
    max: 260,
    minutes: 45,
    prompt: '<p>In your English class you have been discussing science, public spending and the future. Now your teacher has asked you to write an essay.</p><p><strong>Write an essay discussing two of the following points. You should explain which point is more important, giving reasons in support of your opinion.</strong></p><blockquote>Governments should fund basic scientific research even when it has no immediate practical use.</blockquote><p>Consider:</p><ul><li>economic return</li><li>curiosity and long-term discoveries</li><li>(your own idea)</li></ul><p>Write your essay in <strong>220-260 words</strong>.</p>',
    points: [
      'Discuss curiosity and long-term discoveries, with an example',
      'Discuss economic return (or your own idea), with a reason',
      'State which point is more important and explain why',
      'Keep a formal or neutral register throughout'
    ],
    plan: [
      'Decide your opinion first: should the state pay for research with no obvious use? Everything else must support it.',
      'Introduction: set the context and pose the question without copying the statement.',
      'Paragraph 2: the case for curiosity-driven research, with a real example of an unexpected benefit.',
      'Paragraph 3: the economic argument, including the strongest objection to it.',
      'Optional short paragraph: your own idea (for example, competing public priorities).',
      'Conclusion: state which point matters more and why, with a balanced final thought.'
    ],
    model: [
      'Few budget decisions provoke as much debate as the funding of research with no obvious use. Yet history suggests that governments which insist on immediate results may be undermining the very discoveries that society will later depend upon.',
      'The strongest argument is that curiosity-driven work has repeatedly produced breakthroughs nobody could have predicted. Lasers began as an abstract question about light, and today they underpin surgery, telecommunications and supermarket scanners. Had funding been limited to projects with a clear application, such advances might never have emerged.',
      'The economic case is, admittedly, harder to prove. Critics point out that most basic research yields nothing marketable, and taxpayers are entitled to ask what they receive in return. Nevertheless, the occasional spectacular success tends to repay many failures, while the trained scientists such work produces go on to found companies and strengthen industry. Not only does this create jobs, but it also gives a country the expertise to respond quickly in a crisis.',
      'A further consideration is competing priorities. With hospitals and schools short of money, spending on abstract physics can seem self-indulgent. Even so, research accounts for a small fraction of most national budgets, so the choice is rarely as stark as it appears.',
      'On balance, I would argue that governments should continue to fund basic research, since the long-term benefits, though impossible to guarantee, far outweigh the modest cost. What matters is that such support is steady rather than dependent on fashion.'
    ],
    notes: [
      { para: 0, text: '<em>Few budget decisions provoke as much debate as …</em> opens with a general claim instead of copying the prompt. <em>the very discoveries that society will later depend upon</em> hints at the writer\'s position without stating it yet, which creates interest.' },
      { para: 1, text: '<em>has repeatedly produced breakthroughs nobody could have predicted</em> states the main point in one clause, and the laser example proves it. Naming three uses (<em>surgery, telecommunications and supermarket scanners</em>) shows how far a pure question can travel.' },
      { para: 1, text: '<em>Had funding been limited to …, such advances might never have emerged</em> is an inverted third conditional. It makes the argument by imagining the alternative, which is more persuasive than simply asserting that funding matters.' },
      { para: 2, text: '<em>The economic case is, admittedly, harder to prove</em> concedes a weakness before the opposition can raise it. <em>admittedly</em> placed inside the sentence sounds more natural than a mechanical <em>However</em>.' },
      { para: 2, text: '<em>Critics point out that … and taxpayers are entitled to ask …</em> gives the opposing view fairly, in the critics\' own terms. <em>Nevertheless, the occasional spectacular success tends to repay many failures</em> answers it with a general pattern, hedged by <em>tends to</em>.' },
      { para: 2, text: '<em>Not only does this create jobs, but it also gives …</em> uses inversion after <em>Not only</em> to add a second benefit. The final point, <em>respond quickly in a crisis</em>, links the economic argument to a concrete need.' },
      { para: 3, text: 'The own-idea paragraph is short and opens with a topic sentence, <em>A further consideration is competing priorities</em>. <em>Even so, research accounts for a small fraction of …</em> shows the objection is real but answers it with a fact, so the paragraph does not distract from the two main points.' },
      { para: 4, text: '<em>I would argue that …, since …, though impossible to guarantee,</em> gives a clear answer, a reason and an honest limit in a single sentence. <em>steady rather than dependent on fashion</em> ends with a practical condition instead of a slogan.' }
    ],
    language: [
      { h: 'Opening an essay', items: ['Few decisions provoke as much debate as …', 'Yet history suggests that …', 'the very discoveries that … depend upon', 'It is often assumed that …'] },
      { h: 'Conceding and answering', items: ['is, admittedly, harder to prove', 'Critics point out that …', 'taxpayers are entitled to ask …', 'Nevertheless, … tends to repay …', 'Even so, … is rarely as stark as it appears.'] },
      { h: 'Science and funding vocabulary', items: ['basic research', 'curiosity-driven work', 'a breakthrough', 'to underpin', 'public spending', 'a small fraction of the budget'] },
      { h: 'Adding and concluding', items: ['Not only does …, but it also …', 'Had … been …, … might never have …', 'A further consideration is …', 'On balance, I would argue that …', 'far outweigh the modest cost'] }
    ]
  },

  {
    id: 'report-library-services',
    genre: 'report',
    unit: null,
    title: 'A report on the student library',
    level: 'C1',
    min: 220,
    max: 260,
    minutes: 45,
    prompt: '<p>You are a student representative at a university. The head of the university has asked you to write a report on the main student library. The report should say what works well in the library, what does not, and what could be done to improve it.</p><p>Write your <strong>report</strong>. In your report you should:</p><ul><li>explain what the library does well</li><li>describe the main problems students face</li><li>recommend improvements</li></ul><p>Write your report in <strong>220-260 words</strong>.</p>',
    points: [
      'Say clearly what the library does well, with evidence',
      'Describe the main problems and their effect on students',
      'Make specific, realistic recommendations that answer the problems',
      'Use headings and a formal, objective register'
    ],
    plan: [
      'Headings: Introduction / What works well / Areas of concern / Recommendations / Conclusion.',
      'Introduction: say what the report is based on (a survey, your own observation) and what it covers.',
      'What works well: two strengths, supported by an invented figure or detail.',
      'Areas of concern: two problems, each with its effect on students.',
      'Recommendations: one for each problem, using modals and passives (should be, could be, it is recommended that).',
      'Conclusion: a balanced summary and a note on the likely result.'
    ],
    model: [
      '<strong>Introduction</strong><br>This report evaluates the main student library, drawing on a survey of 150 undergraduates and my own observations, and puts forward proposals for improvement.',
      '<strong>What works well</strong><br>Opening hours are widely praised: nearly two thirds of respondents mentioned the late closing time during examinations. Moreover, staff are consistently described as approachable, and the online catalogue makes locating books straightforward, while the ground-floor computers are seldom out of service.',
      '<strong>Areas of concern</strong><br>Despite these strengths, the building suffers from a shortage of quiet study space. At peak times students queue for desks, while group discussions regularly disturb those working alone. Several respondents admitted that they now study at home or in cafés instead. Furthermore, key textbooks are so scarce that waiting lists can exceed a month, which disadvantages students who cannot afford their own copies.',
      '<strong>Recommendations</strong><br>First, the upper floor should be designated a silent zone, with bookable rooms provided for group work, so that students need not choose between silence and collaboration. Second, it is recommended that the library purchase additional copies of the most heavily borrowed titles, funded by a small reduction in its journal subscriptions. Finally, a trial of round-the-clock opening during examination weeks would meet a clear demand.',
      '<strong>Conclusion</strong><br>Overall, the library is valued for its service rather than its space. Were these changes implemented, satisfaction would almost certainly rise, at a cost that remains modest in relation to the university\'s budget.'
    ],
    notes: [
      { para: 0, text: '<em>drawing on a survey of 150 undergraduates and my own observations</em> tells the reader where the evidence comes from, which gives the report authority. <em>puts forward proposals</em> shows the purpose in a formal verb phrase.' },
      { para: 1, text: '<em>nearly two thirds of respondents</em> turns an opinion into evidence, and the colon introduces the proof. Starting with a strength shows the report is fair, so the criticism that follows is easier to accept.' },
      { para: 1, text: '<em>Moreover, staff are consistently described as approachable</em> uses a passive with a reporting verb. It keeps the tone objective because it reports what students said instead of giving the writer\'s own view.' },
      { para: 2, text: '<em>Despite these strengths, the building suffers from …</em> is a concessive opener that links the two paragraphs. The noun phrase <em>a shortage of quiet study space</em> replaces a longer clause (nominalisation), which is typical of formal reports.' },
      { para: 2, text: '<em>so scarce that waiting lists can exceed a month, which disadvantages students who …</em> gives a result and then the people affected. The relative clause explains WHY the problem matters, not just that it exists.' },
      { para: 3, text: 'The three recommendations are signalled with <em>First, … Second, … Finally, …</em> and use different structures: <em>should be designated</em>, <em>it is recommended that the library purchase</em> (subjunctive), and <em>would meet a clear demand</em>. The first two answer the problems in paragraph 2; the third builds on the strength praised in paragraph 1.' },
      { para: 3, text: '<em>funded by a small reduction in its journal subscriptions</em> makes the proposal realistic by saying where the money comes from. A report that ignores cost sounds naive.' },
      { para: 4, text: '<em>Were these changes implemented, satisfaction would almost certainly rise</em> uses an inverted conditional with a hedge (<em>almost certainly</em>), so the prediction is confident but not exaggerated.' }
    ],
    language: [
      { h: 'Stating the purpose and sources', items: ['This report evaluates …', 'drawing on a survey of …', 'and puts forward proposals for …', 'The findings are based on …'] },
      { h: 'Describing strengths and weaknesses', items: ['is widely praised', 'nearly two thirds of respondents', 'Despite these strengths, …', 'suffers from a shortage of …', 'which disadvantages …'] },
      { h: 'Library and study vocabulary', items: ['a silent zone', 'bookable rooms', 'waiting lists', 'heavily borrowed titles', 'journal subscriptions', 'at peak times'] },
      { h: 'Recommending and concluding', items: ['should be designated …', 'It is recommended that the library purchase …', 'funded by …', 'would meet a clear demand', 'Overall, … is valued for … rather than …', 'at a cost that remains modest'] }
    ]
  },

  {
    id: 'review-podcast',
    genre: 'review',
    unit: null,
    title: 'A review of a podcast series',
    level: 'C1',
    min: 220,
    max: 260,
    minutes: 45,
    prompt: '<p>An English-language magazine for people who enjoy learning about the world is asking readers to send in reviews of podcast series or documentaries they have recently enjoyed.</p><p>Write a <strong>review</strong> of a podcast series or a documentary. In your review you should:</p><ul><li>describe what it is about and how it is presented</li><li>explain what is good about it and what you have reservations about</li><li>say whether you would recommend it, and to whom</li></ul><p>Write your review in <strong>220-260 words</strong>.</p>',
    points: [
      'Describe the subject and the style of presentation',
      'Give strengths with examples, and one honest reservation',
      'Show your personal reaction to what you heard or saw',
      'Recommend it to a particular kind of listener or viewer'
    ],
    plan: [
      'Choose a series you know well (real or invented) so that details come easily.',
      'Write a title that sums up the experience, perhaps with a colon.',
      'Paragraph 1: hook, then what the series is, who makes it and how long each episode lasts.',
      'Paragraph 2: its main strengths, with an example of an episode or moment.',
      'Paragraph 3: your reservation, said fairly and specifically.',
      'Final paragraph: verdict, who will enjoy it, and where to start.'
    ],
    model: [
      '<strong>Salt and Signal: the quiet drama of lighthouses</strong>',
      'It sounds like an unpromising subject, yet this eight-part podcast about the history of lighthouses and coastal communication is one of the most absorbing series I have heard this year. Each thirty-minute episode follows a single station, from storm-battered rocks off Cornwall to a remote beacon in Patagonia.',
      'What sets it apart is the storytelling. The presenter, a former sailor, has a warm, unhurried voice, and she weaves interviews with keepers\' descendants into a narrative that is never dull. Particularly memorable is the episode on a keeper who kept a light burning for three weeks while ill, a story told with such restraint that it is genuinely moving. The sound design, with crashing waves and creaking stairs, adds to the effect.',
      'Not everything succeeds, however. Midway through the series, the pace slackens, and two episodes devote far too much time to technical details of lenses and fuel, which will be of interest only to enthusiasts. A few more voices from the present day would also have prevented the series from seeming faintly nostalgic.',
      'Even so, I would wholeheartedly recommend it to anyone who enjoys history told through people rather than dates. If you are short of time, start with the third episode, which captures everything that is best about the series. The closing episode, about the last keeper to leave his post, lingers in the mind for days.'
    ],
    notes: [
      { para: 0, text: 'The title combines the name of the series with a colon and an intriguing phrase, <em>the quiet drama of lighthouses</em>. The contrast between <em>quiet</em> and <em>drama</em> promises something unexpected, which is exactly what the review goes on to argue.' },
      { para: 1, text: '<em>It sounds like an unpromising subject, yet …</em> hooks the reader with a surprise, and <em>one of the most absorbing series I have heard this year</em> gives the verdict early. The facts (<em>eight-part</em>, <em>thirty-minute</em>, <em>Cornwall to Patagonia</em>) let the reader picture the series at once.' },
      { para: 2, text: '<em>What sets it apart is the storytelling</em> is a cleft sentence that puts the main strength in focus. The description of the presenter\'s <em>warm, unhurried voice</em> makes the quality something the reader can imagine.' },
      { para: 2, text: '<em>Particularly memorable is the episode on …</em> uses inversion to highlight a specific example. <em>told with such restraint that it is genuinely moving</em> says WHY the story works: the emotion comes from understatement.' },
      { para: 3, text: '<em>Not everything succeeds, however</em> introduces the reservation tactfully. The criticism is specific (<em>two episodes devote far too much time to technical details</em>) and limited by <em>which will be of interest only to enthusiasts</em>, so it sounds fair and not dismissive.' },
      { para: 3, text: '<em>A few more voices … would also have prevented the series from seeming faintly nostalgic</em> uses <em>would have prevented</em> (an implied third conditional) with a hedge, <em>faintly</em>. This offers a second, milder criticism as a suggestion, which a C1 reviewer would prefer to a complaint.' },
      { para: 4, text: '<em>Even so, I would wholeheartedly recommend it to anyone who …</em> returns to a positive verdict after the reservation. The final tip, <em>start with the third episode</em>, is practical and gives the reader a reason to act.' }
    ],
    language: [
      { h: 'Hooking the reader', items: ['It sounds like an unpromising subject, yet …', 'one of the most absorbing … I have heard this year', 'a gripping eight-part series', 'is never dull'] },
      { h: 'Praising specific qualities', items: ['What sets it apart is …', 'a warm, unhurried voice', 'Particularly memorable is …', 'told with such restraint that …', 'the sound design adds to the effect'] },
      { h: 'Podcast and documentary vocabulary', items: ['an episode', 'the presenter', 'to weave interviews into a narrative', 'the pace slackens', 'a thoughtful commentary', 'a remote location'] },
      { h: 'Voicing reservations and recommending', items: ['Not everything succeeds, however.', 'will be of interest only to …', 'would have prevented … from seeming …', 'Even so, I would wholeheartedly recommend it to …', 'If you are short of time, start with …'] }
    ]
  }
);
