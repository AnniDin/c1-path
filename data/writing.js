window.C1 = window.C1 || {};
/* Writing practice: guide (criteria, genres, checklist) and 10 tasks with plan, annotated model and language banks.
   Writing cannot be marked automatically, so the value is in the planning scaffold, the model and self-assessment. */
C1.writing = {
  guide: {
    criteria: [
      {
        name: 'Content',
        question: 'Have you done what the task asked, and is everything you wrote relevant?',
        c1: 'Every part of the task is covered and developed with reasons or examples. Nothing is missing and nothing is padding.',
        tips: 'Underline the content points in the question and tick them off in your plan. Give each point one clear idea plus a reason or example. Cut any sentence that does not help the reader.'
      },
      {
        name: 'Communicative achievement',
        question: 'Does the text sound right for this reader, and does it do its job (persuade, inform, recommend, complain)?',
        c1: 'The tone, level of formality and format fit the situation, and the reader is held with a confident, natural voice. The purpose of the text is clear from the first paragraph.',
        tips: 'Decide who is reading before you write. Keep one register from start to finish, use the conventions of the genre (greeting, headings, sign-off) and state your purpose early.'
      },
      {
        name: 'Organisation',
        question: 'Can the reader follow the text easily from beginning to end?',
        c1: 'Ideas are grouped logically into clear paragraphs, each with a main point, and the links between sentences and paragraphs feel natural rather than mechanical.',
        tips: 'Plan one idea per paragraph. Vary your linking: reference words (this, such, the latter), contrast and addition phrases, and topic sentences, not only however and moreover.'
      },
      {
        name: 'Language',
        question: 'Is the range of vocabulary and grammar wide, and is it used accurately?',
        c1: 'A good variety of vocabulary (including less common words and collocations) and of structures is used flexibly. Errors are rare and do not get in the way of meaning.',
        tips: 'Aim for precise words rather than difficult ones. Include a few controlled advanced structures (inversion, participle clauses, conditionals) and then proofread for the mistakes you personally make most often.'
      }
    ],
    genres: [
      {
        id: 'essay',
        name: 'Essay',
        register: 'formal / neutral',
        purpose: 'To discuss an issue, weigh two or three viewpoints and defend your own conclusion.',
        structure: [
          'Introduction: present the topic and why it matters, without copying the question',
          'Paragraph 1: the first given point, with a reason and an example',
          'Paragraph 2: the second point you choose to discuss, with a reason and an example',
          'Optional paragraph: your own idea, briefly developed',
          'Conclusion: say which point is more important and why'
        ],
        openers: [
          'It is often claimed that … , but the reality is considerably more nuanced.',
          'Few issues divide opinion as sharply as …',
          'There is no doubt that … ; what is less clear is whether …',
          'In recent years, … has become an increasingly pressing concern.'
        ],
        closers: [
          'On balance, I would argue that … is the more significant factor, since …',
          'All things considered, … , although this should not blind us to …',
          'Ultimately, the answer lies in striking a balance between … and …'
        ],
        headings: 'No headings. An essay is continuous prose in clearly separated paragraphs.',
        mistakes: [
          'Writing a list of points without saying which one is more important',
          'Copying the wording of the question in the introduction',
          'Overusing linkers (firstly, secondly, moreover) while the ideas are not connected',
          'Using in my opinion in every paragraph, or being too informal (a lot of, kids, stuff)'
        ]
      },
      {
        id: 'email',
        name: 'Email',
        register: 'semi-formal (formal to a stranger, friendlier to an acquaintance)',
        purpose: 'To communicate with a specific person: to complain, request, inform or suggest, and to get a result.',
        structure: [
          'Greeting suited to the reader (Dear Ms Walker, or Dear Sir or Madam,)',
          'Opening paragraph: say why you are writing',
          'Body: explain the situation, facts first, then your feelings or opinion',
          'Say clearly what you want to happen (request, refund, action)',
          'Closing line and sign-off (Kind regards / Yours sincerely)'
        ],
        openers: [
          'I am writing to complain about … / to enquire about …',
          'I am writing in connection with …, which I purchased on …',
          'Further to our telephone conversation of …',
          'I would like to draw your attention to a problem with …'
        ],
        closers: [
          'I would be grateful if you could look into this matter and reply at your earliest convenience.',
          'I look forward to hearing from you shortly.',
          'Thank you in advance for your assistance.'
        ],
        headings: 'No headings. Use a short subject line only if the task asks for one.',
        mistakes: [
          'Starting with a vague or over-familiar greeting (Hi, I want to …) when the reader is a stranger',
          'Using contractions and spoken phrases in a formal complaint',
          'Translating Spanish formulas literally (I remain at your disposal, Without other particular)',
          'Forgetting to say what you want the reader to do'
        ]
      },
      {
        id: 'letter',
        name: 'Formal letter',
        register: 'formal',
        purpose: 'To give your views to an editor, official or organisation, or to apply, complain or request in a formal setting.',
        structure: [
          'Greeting: Dear Sir or Madam, (name unknown) or Dear Mr / Ms + surname',
          'Opening: reason for writing and reference to what prompted it',
          'Body paragraphs: your main points, each with support or examples',
          'Final paragraph: what you suggest or request',
          'Sign-off: Yours faithfully (if you used Dear Sir or Madam) or Yours sincerely (if you used a name), then your name'
        ],
        openers: [
          'I am writing in response to your article/editorial of …, in which you claim that …',
          'I read with interest your report on … and would like to put forward a different view.',
          'I am writing to express my concern about …'
        ],
        closers: [
          'I would therefore urge you to reconsider … / to give further attention to …',
          'I trust that you will give these points careful consideration.',
          'I look forward to seeing this issue addressed in a future edition.'
        ],
        headings: 'No headings. Do not number the paragraphs.',
        mistakes: [
          'Mixing up Yours faithfully and Yours sincerely',
          'Using contractions, slang or exclamation marks',
          'Being aggressive instead of firm and polite',
          'Spanish-style long opening formulas (I take this opportunity to …) that sound unnatural in English'
        ]
      },
      {
        id: 'proposal',
        name: 'Proposal',
        register: 'semi-formal / formal',
        purpose: 'To suggest a plan to a decision-maker and persuade them it is worthwhile and realistic.',
        structure: [
          'Introduction: the aim of the proposal',
          'Current situation or need (briefly)',
          'The proposal: what exactly you suggest, with practical detail',
          'Benefits, and costs or possible problems',
          'Conclusion: a clear recommendation'
        ],
        openers: [
          'The aim of this proposal is to outline …',
          'This proposal sets out how … could be …',
          'The purpose of this document is to suggest …'
        ],
        closers: [
          'I therefore recommend that … be adopted on a trial basis.',
          'In my view, the benefits clearly outweigh the costs, and I strongly recommend going ahead.',
          'I would be happy to discuss the details of this proposal at your convenience.'
        ],
        headings: 'Yes. Short headings help the reader find each part quickly. Use them consistently.',
        mistakes: [
          'Describing a problem at length instead of making a concrete suggestion',
          'Writing in the first person plural or too informally (we should really do this)',
          'Giving no benefits, costs or reasons',
          'Using a headline for each sentence, so the text becomes a list of notes'
        ]
      },
      {
        id: 'report',
        name: 'Report',
        register: 'neutral / formal',
        purpose: 'To present information you have collected, evaluate it and make recommendations.',
        structure: [
          'Introduction: purpose and sources of information',
          'Two or three sections on the findings, each under a heading',
          'Recommendations (in the last section)',
          'Optional one-line conclusion'
        ],
        openers: [
          'The purpose of this report is to evaluate … and to make recommendations.',
          'This report is based on a survey of … and on my own observations.',
          'This report examines … with a view to …'
        ],
        closers: [
          'It is recommended that … should be …',
          'Overall, … , and the measures above would help to …',
          'I am confident that these changes would lead to …'
        ],
        headings: 'Yes. Use a heading for each section, and keep the style impersonal and factual.',
        mistakes: [
          'Telling a personal story instead of reporting findings',
          'Giving recommendations that do not follow from the findings',
          'Mixing opinion and fact without signalling the difference (it seems that …, the survey shows that …)',
          'Using only simple sentences under each heading'
        ]
      },
      {
        id: 'review',
        name: 'Review',
        register: 'neutral to informal, engaging',
        purpose: 'To describe and evaluate an event, place, film or book, and help the reader decide whether to try it.',
        structure: [
          'Title and a hook that grabs attention',
          'Description: what it is, where, when',
          'Evaluation: strengths with examples',
          'Weaknesses, said fairly',
          'Recommendation: who would enjoy it and who would not'
        ],
        openers: [
          'If you are looking for …, look no further than …',
          'Having attended … for the past three years, I can confirm that …',
          'Few events capture the spirit of … as well as …'
        ],
        closers: [
          'All in all, I would thoroughly recommend it to anyone who …',
          'It is not perfect, but it is well worth the effort for …',
          'Go with an open mind, and you will not be disappointed.'
        ],
        headings: 'Optional. A catchy title is usual, but there are normally no section headings.',
        mistakes: [
          'Summarising without giving an opinion',
          'Using only basic adjectives (good, nice, beautiful, interesting)',
          'Giving a long list of facts and no personal impressions',
          'Forgetting to say who the review is for or to recommend (or not) at the end'
        ]
      }
    ],
    checklist: [
      'Have I covered every content point in the task, and developed each with a reason or example?',
      'Is my word count between 220 and 260?',
      'Is each paragraph about one main idea, with an obvious first sentence?',
      'Is the register consistent from beginning to end (no contractions in formal texts, no slang)?',
      'Does the format match the genre (greeting and sign-off, headings only where suitable)?',
      'Have I used a variety of linking devices, not only however, moreover and firstly?',
      'Have I included some less common vocabulary and collocations, used accurately?',
      'Have I used at least three different advanced structures (e.g. inversion, passive, participle clause, conditional)?',
      'Have I checked my usual errors: tenses, articles, prepositions, agreement, spelling and false friends?',
      'Have I finished with a clear conclusion or recommendation, and would the reader know what to do or think?'
    ]
  },

  tasks: [
    {
      id: 'essay-work',
      genre: 'essay',
      unit: 'work',
      title: 'Remote and hybrid working',
      level: 'C1',
      min: 220,
      max: 260,
      minutes: 45,
      prompt: '<p>In your English class you have been discussing changes in the world of work. Now your teacher has asked you to write an essay.</p><p><strong>Write an essay discussing two of the following points. You should explain which point is more important, giving reasons in support of your opinion.</strong></p><blockquote>Remote and hybrid working should become the normal way of working in offices.</blockquote><p>Consider:</p><ul><li>flexibility and quality of life</li><li>team spirit and training</li><li>(your own idea)</li></ul><p>Write your essay in <strong>220-260 words</strong>.</p>',
      points: [
        'Discuss flexibility and quality of life, with a reason or example',
        'Discuss team spirit and training (or your own idea instead), with a reason or example',
        'State which point is more important and explain why',
        'Keep a formal or neutral register throughout'
      ],
      plan: [
        'Underline the statement and the three prompts. Decide which TWO you will discuss (the third may be your own idea).',
        'Decide your final opinion first: which of the two is more important? Everything else supports it.',
        'Introduction: put the topic in a wider context, then say the issue is not clear-cut (no copying of the question).',
        'Paragraph 2: point one, with a reason and one concrete example.',
        'Paragraph 3: point two, with a contrasting reason, ideally a personal or realistic example.',
        'Conclusion: state your opinion and give the main reason; end on a recommendation.'
      ],
      model: [
        'Few developments have reshaped office life as profoundly as the spread of remote working. Whether it should become the norm is, however, far from clear-cut, since its benefits and drawbacks affect employers and employees quite differently.',
        'The most obvious advantage is flexibility. Not having to commute frees up hours that can be devoted to family, exercise or rest, and employees who control their own schedules tend to be more productive. Companies, too, stand to save considerably on office space, which is why many have embraced hybrid arrangements.',
        'Against this, working from home can undermine team spirit. Had I not met my colleagues in person during my first week, I doubt I would have felt able to ask for help later on. Junior staff, in particular, learn largely by observing others, and this informal training is difficult to replicate on a video call.',
        'A third consideration is the effect on the wider community. City-centre cafés and shops depend on office workers, and their absence could leave neighbourhoods noticeably poorer.',
        'On balance, I would argue that flexibility matters more. Offered the choice, most people would not give up the freedom to organise their day, yet the social drawbacks can largely be addressed by requiring staff to meet in the office a couple of days a week. A hybrid model, therefore, offers the best of both worlds without forcing anyone into a rigid routine.'
      ],
      notes: [
        { para: 0, text: 'A strong opening avoids copying the question. <em>Few developments have reshaped office life as profoundly as</em> uses a negative subject for a comparison with emphasis.' },
        { para: 0, text: 'The second sentence introduces the debate neutrally: <em>far from clear-cut</em> is a useful fixed phrase for "not simple".' },
        { para: 1, text: 'Precise collocation: <em>frees up hours that can be devoted to</em> (a passive inside a relative clause) and <em>stand to save</em> (= are likely to save).' },
        { para: 1, text: 'A relative clause with <em>which is why</em> links a fact to its consequence without starting a new sentence.' },
        { para: 2, text: 'The paragraph opens with a contrast linker, <em>Against this</em>, a neat alternative to "however". It makes the structure of the argument visible.' },
        { para: 2, text: 'Inverted third conditional for a personal example: <em>Had I not met my colleagues in person</em>. Formal and economical.' },
        { para: 2, text: '<em>Junior staff, in particular, learn largely by observing others</em> uses "in particular" between commas to narrow the claim.' },
        { para: 3, text: 'The own-idea point is kept short: <em>A third consideration is</em> is a neutral way to add a point without a long list.' },
        { para: 4, text: 'The opinion is signalled with a hedged phrase, <em>I would argue that</em>, and a participle clause, <em>Offered the choice</em>, which means "If they were offered the choice".' },
        { para: 4, text: '<em>the best of both worlds</em> is an idiom used in the right place, closing the essay with a clear recommendation.' }
      ],
      language: [
        { h: 'Introducing a topic', items: ['Few developments have reshaped … as profoundly as …', 'It is often claimed that …', '… is far from clear-cut', 'There is no shortage of opinions on …', 'In recent years, … has become increasingly widespread'] },
        { h: 'Contrasting and conceding', items: ['Against this, …', 'That said, …', 'While it is true that …, …', 'Admittedly, … ; nevertheless, …', 'On the other hand, …', 'This does not alter the fact that …'] },
        { h: 'Work vocabulary', items: ['to commute', 'work-life balance', 'to work flexible hours', 'to boost productivity', 'team spirit', 'a rigid routine', 'to stay in touch'] },
        { h: 'Giving your opinion and concluding', items: ['I would argue that …', 'On balance, …', 'To my mind, … carries more weight than …', 'All things considered, …', 'Ultimately, … should take priority'] }
      ]
    },

    {
      id: 'email-technology',
      genre: 'email',
      unit: 'technology',
      title: 'A complaint about a smart speaker',
      level: 'C1',
      min: 220,
      max: 260,
      minutes: 45,
      prompt: '<p>You recently bought a smart speaker from an online shop, but it has not worked properly and the customer service has been unhelpful. You decide to write to the manager of the shop.</p><p>Read the notes you made, then write an <strong>email</strong> to the manager.</p><ul><li>explain what is wrong with the product</li><li>describe your experience of contacting customer service</li><li>say what you want the shop to do</li><li>suggest how the service could be improved</li></ul><p>Write your email in <strong>220-260 words</strong>.</p>',
      points: [
        'Explain what is wrong with the product (specific problems)',
        'Describe your experience of contacting customer service',
        'State clearly what you want (replacement or refund) and a deadline',
        'Suggest at least two ways the service could be improved'
      ],
      plan: [
        'Choose a name, the product name, the date of purchase and the price. Specific details sound real.',
        'Greeting and purpose: say at once that you are complaining AND making suggestions.',
        'Paragraph 2: the problem and the poor service, facts first (what, when, how many times).',
        'Paragraph 3: what you expect (one clear request) and what will happen if nothing changes.',
        'Paragraph 4: constructive suggestions for improvement.',
        'Closing line and sign-off. Check that the tone is firm but polite, with no contractions.'
      ],
      model: [
        'Dear Mr Hargreaves,',
        'I am writing to complain about the Nova Hub speaker I bought from your online store on 3 March, and to suggest a few ways in which your after-sales service might be improved.',
        'Although the device was delivered promptly, it has never worked as advertised. It disconnects from my wifi network several times a day, and the voice assistant fails to respond to even the simplest commands. What troubled me most, though, was the response I received. I contacted your helpline on three separate occasions, yet each time I was asked to repeat the same information and was promised a call back. Nobody has rung me to date.',
        'Given that I paid a premium price for a product described as effortless, I would be grateful if you would either replace the speaker with a working model or refund the full amount of £189. Should I not hear from you within ten days, I shall have no option but to take the matter further.',
        'Looking ahead, I would strongly recommend introducing a ticket system, so that customers need not explain their problem more than once. Offering live chat would also be welcome, as would clearer setup instructions, which I found baffling.',
        'I trust you will treat this matter with the urgency it deserves, and I look forward to your reply.',
        'Yours sincerely,',
        'Maria Santos'
      ],
      notes: [
        { para: 1, text: 'The purpose is stated in the first sentence: <em>I am writing to complain about</em>. A second infinitive adds the suggestion, so the reader knows what to expect.' },
        { para: 2, text: 'Contrast with <em>Although the device was delivered promptly</em>: positive information first makes the complaint sound fair and credible.' },
        { para: 2, text: 'A cleft sentence emphasises the real problem: <em>What troubled me most, though, was the response I received</em>.' },
        { para: 2, text: 'Precise, formal vocabulary: <em>on three separate occasions</em>, <em>to date</em>, <em>was promised a call back</em> (passive, no need to name the agent).' },
        { para: 3, text: 'A polite but firm request: <em>I would be grateful if you would</em> is formal and indirect. The either … or structure gives the manager two clear options.' },
        { para: 3, text: 'Inverted conditional without if: <em>Should I not hear from you within ten days</em> sounds firm without being rude.' },
        { para: 4, text: 'Subject-verb inversion after <em>as would</em> avoids repeating the verb: <em>Offering live chat would also be welcome, as would clearer setup instructions</em>.' },
        { para: 5, text: 'A formal closing: <em>I trust you will treat this matter with the urgency it deserves</em> and a forward-looking final clause.' },
        { para: 6, text: 'Layout: <em>Yours sincerely</em> matches a greeting with a name (<em>Dear Mr Hargreaves</em>).' }
      ],
      language: [
        { h: 'Stating the purpose', items: ['I am writing to complain about …', 'I am writing in connection with …', 'I would like to draw your attention to …', 'I regret to say that …', 'I am writing to express my dissatisfaction with …'] },
        { h: 'Describing a problem', items: ['It has never worked as advertised.', 'It fails to …', 'On three separate occasions …', 'To date, nobody has …', 'The product proved to be faulty/defective.'] },
        { h: 'Making demands politely', items: ['I would be grateful if you would …', 'I expect a full refund of …', 'Should I not hear from you by …, …', 'I have no option but to …', 'I would appreciate it if you could look into this matter.'] },
        { h: 'Suggesting improvements', items: ['I would strongly recommend introducing …', 'It might be worth considering …', 'A clearer system for … would be welcome.', 'Customers should not have to …', 'This would spare customers the frustration of …'] }
      ]
    },

    {
      id: 'essay-health',
      genre: 'essay',
      unit: 'health',
      title: 'Employers and employees’ health',
      level: 'C1',
      min: 220,
      max: 260,
      minutes: 45,
      prompt: '<p>In your English class you have been discussing sleep, exercise and health. Now your teacher has asked you to write an essay.</p><p><strong>Write an essay discussing two of the following points. You should explain which point is more important, giving reasons in support of your opinion.</strong></p><blockquote>Employers should take responsibility for the sleep and fitness of their staff.</blockquote><p>Consider:</p><ul><li>working hours and schedules</li><li>facilities such as gyms and rest rooms</li><li>(your own idea)</li></ul><p>Write your essay in <strong>220-260 words</strong>.</p>',
      points: [
        'Discuss working hours and schedules, with a reason or example',
        'Discuss facilities (or your own idea), with a reason or example',
        'State which is more important and why',
        'Use a balanced, formal tone'
      ],
      plan: [
        'Decide your opinion: does the employer have any real responsibility? Which prompt matters more?',
        'Introduction: begin with a general fact or claim about tiredness/inactivity, then raise the question of responsibility.',
        'Paragraph 2: working hours: a cause-and-effect argument with an example (late emails, shifts).',
        'Paragraph 3: facilities: show a limitation or counter-argument (perks are not enough).',
        'Optional short paragraph: your own idea (e.g. city design, home environment).',
        'Conclusion: say which point is more important, with the main reason.'
      ],
      model: [
        'It is widely accepted that chronic tiredness and inactivity cost economies billions each year. What is less clear is whether employers ought to shoulder responsibility for their staff’s wellbeing, or whether this remains a purely personal matter.',
        'There is certainly a case for employer involvement where working hours are concerned. Staff who are expected to answer emails late at night, or to work irregular shifts, can hardly be blamed for sleeping badly. Organisations that respect rest periods not only protect their employees’ health but also benefit from sharper, more motivated teams.',
        'Providing facilities is another matter. Subsidised gym membership or a quiet room for a short break may sound generous, but such perks are of little use to people who are simply too exhausted or too busy to take advantage of them. Nor does everyone wish their employer to take an interest in how they spend their free time.',
        'A further factor, which is often overlooked, is the home environment. Were cities better designed, with safe cycle lanes and accessible parks, exercise would become part of daily life rather than a chore.',
        'Overall, I believe that working hours are the more significant issue. While individuals must ultimately choose to exercise, no amount of willpower can compensate for a schedule that leaves no time to rest. Employers should therefore concentrate first on reasonable demands, and only then on gym passes.'
      ],
      notes: [
        { para: 0, text: 'Opening with a general truth, <em>It is widely accepted that</em>, and then a cleft sentence, <em>What is less clear is whether</em>, to introduce the question.' },
        { para: 1, text: 'Notice the passive with an infinitive inside a relative clause: <em>Staff who are expected to answer emails</em> and the collocation <em>can hardly be blamed for</em>.' },
        { para: 1, text: '<em>not only … but also</em> joins two benefits inside one clause, a way of adding a second advantage with more weight than "and".' },
        { para: 2, text: 'The topic sentence <em>Providing facilities is another matter</em> uses a gerund subject and a short idiomatic phrase to switch point.' },
        { para: 2, text: 'Concession with <em>may sound generous, but</em>, then <em>of little use to people who are simply too exhausted … to take advantage of them</em>.' },
        { para: 2, text: 'Inversion with a negative adverb: <em>Nor does everyone wish their employer to take an interest in</em>. Adds a fresh counter-point briefly.' },
        { para: 3, text: 'Inverted second conditional without if: <em>Were cities better designed</em>, with <em>would become</em> in the result clause, to speculate about a different world.' },
        { para: 4, text: 'The conclusion begins with <em>Overall, I believe that</em> and answers the question: which is more important? <em>no amount of willpower can compensate for</em> is a powerful, quotable phrase.' }
      ],
      language: [
        { h: 'Cause and effect', items: ['… can hardly be blamed for …', '… leads to / results in …', 'This, in turn, …', 'as a direct consequence of …', 'Little wonder that …'] },
        { h: 'Health and wellbeing', items: ['chronic tiredness', 'a sedentary lifestyle', 'to take regular exercise', 'to suffer from sleep deprivation', 'to boost morale', 'subsidised gym membership'] },
        { h: 'Adding a counter-argument', items: ['Nor does/is …', 'Equally, …', 'That is not to say that …', '… is of little use to …', 'There is also the question of …'] },
        { h: 'Comparing importance', items: ['… is the more significant issue', '… takes priority over …', 'No amount of … can compensate for …', 'First and foremost, …', '… matters far more than …'] }
      ]
    },

    {
      id: 'proposal-nature',
      genre: 'proposal',
      unit: 'nature',
      title: 'A community garden',
      level: 'C1',
      min: 220,
      max: 260,
      minutes: 45,
      prompt: '<p>Your town council has asked residents to suggest local green projects that deserve funding. You have decided to propose turning a disused car park in the town centre into a community garden.</p><p>Write a <strong>proposal</strong> to the council. In your proposal you should:</p><ul><li>describe what the project would involve</li><li>explain what the benefits would be for residents and for the environment</li><li>suggest how the project could be paid for and run</li></ul><p>Write your proposal in <strong>220-260 words</strong>.</p>',
      points: [
        'Describe what the garden would include and who would use it',
        'Explain benefits for the community and the environment',
        'Give a realistic estimate of costs and how to pay for them',
        'End with a clear recommendation'
      ],
      plan: [
        'Invent the details: the site, how long it has been unused, a figure for the cost.',
        'Headings: Introduction / The proposed project / Benefits / Costs and recommendation.',
        'Introduction: state the aim in one formal sentence.',
        'Project: be concrete (beds, orchard, seating, school involvement).',
        'Benefits: one environmental, one social; support with a reason.',
        'Costs and recommendation: figures, sponsorship, volunteers; end with "I recommend that …".'
      ],
      model: [
        '<strong>Introduction</strong>',
        'The aim of this proposal is to outline how the disused car park behind the town library could be converted into a community garden, and to assess whether the project merits council funding.',
        '<strong>The proposed project</strong>',
        'The site, which has stood empty for almost five years, would be divided into raised vegetable beds, a small orchard and a shaded seating area. Local schools would be invited to run a weekly gardening club, while residents could rent individual plots for a nominal fee. Rainwater would be collected from the library roof, thereby reducing the need for mains water.',
        '<strong>Benefits</strong>',
        'Were the garden to go ahead, its benefits would be felt well beyond the site itself. Planting trees and flowers would improve air quality and provide a habitat for bees and birds, which are increasingly rare in the town centre. Equally important is the social value: gardening brings together people of different ages who might otherwise never meet, and several studies suggest that it reduces stress and loneliness.',
        '<strong>Costs and recommendation</strong>',
        'Initial costs, estimated at £12,000, would cover soil, tools, fencing and water tanks. Not only could half of this sum be raised through local business sponsorship, but volunteers would also provide most of the labour. I therefore recommend that the council approve the project and contribute the remaining funds, on the understanding that a residents’ committee manages the garden thereafter.'
      ],
      notes: [
        { para: 1, text: 'A standard proposal opening: <em>The aim of this proposal is to outline</em>. The passive <em>could be converted into</em> keeps the tone impersonal and formal.' },
        { para: 3, text: 'A non-defining relative clause adds detail without a new sentence: <em>The site, which has stood empty for almost five years</em>.' },
        { para: 3, text: '<em>would be invited to run</em> / <em>could rent … for a nominal fee</em>: modal verbs of proposal keep the text tentative but practical. <em>thereby reducing</em> is a participle clause of result.' },
        { para: 5, text: 'Inverted conditional: <em>Were the garden to go ahead</em> is a formal alternative to "If the garden went ahead".' },
        { para: 5, text: 'A gerund as subject, <em>Planting trees and flowers would improve</em>, and a non-defining relative clause, <em>habitat for bees and birds, which are increasingly rare</em>.' },
        { para: 5, text: 'The colon in <em>Equally important is the social value:</em> introduces a second type of benefit, and <em>might otherwise never meet</em> is a neat use of "otherwise".' },
        { para: 7, text: 'Negative inversion with <em>Not only could half of this sum be raised … but volunteers would also</em> adds a persuasive financial argument.' },
        { para: 7, text: 'The subjunctive after recommend, <em>I therefore recommend that the council approve</em>, is a mark of formal British English (should approve is also correct). <em>on the understanding that</em> sets a condition.' }
      ],
      language: [
        { h: 'Stating the aim', items: ['The aim of this proposal is to outline …', 'This proposal sets out how …', 'The purpose of this document is to …', 'I have been asked to put forward suggestions for …', 'It will assess whether … merits …'] },
        { h: 'Describing the plan', items: ['would be divided into …', 'would be invited to …', 'could be converted into …', 'would include …, as well as …', 'on a regular/weekly basis'] },
        { h: 'Environment vocabulary', items: ['to improve air quality', 'a habitat for wildlife', 'to cut carbon emissions', 'green space', 'biodiversity', 'sustainable', 'to reduce waste'] },
        { h: 'Recommending', items: ['I therefore recommend that …', 'I strongly suggest that …', 'on the understanding that …', 'It is advisable to …', 'The benefits clearly outweigh the costs.'] }
      ]
    },

    {
      id: 'report-cities',
      genre: 'report',
      unit: 'cities',
      title: 'Public transport and public space',
      level: 'C1',
      min: 220,
      max: 260,
      minutes: 45,
      prompt: '<p>The city council has asked you, as a member of a residents’ group, to write a report on public transport and the use of public space in the city centre. You have carried out a short survey and spent time observing the area.</p><p>Write a <strong>report</strong> for the council. In your report you should:</p><ul><li>evaluate the current public transport</li><li>comment on how public space is used</li><li>recommend improvements</li></ul><p>Write your report in <strong>220-260 words</strong>.</p>',
      points: [
        'Evaluate the present public transport (good and bad)',
        'Comment on the way public space is used',
        'Make recommendations that follow logically from the findings',
        'Use headings and an impersonal, factual style'
      ],
      plan: [
        'Decide the headings: Introduction / Public transport / Urban space / Recommendations.',
        'Invent your evidence: the number of people surveyed and two or three findings.',
        'Introduction: purpose + sources of information (survey, observation).',
        'Transport: positive point, then the main problem, with evidence.',
        'Space: one success and one problem.',
        'Recommendations: 3 specific actions, each linked to a finding; end with an expected result.'
      ],
      model: [
        '<strong>Introduction</strong>',
        'This report evaluates public transport and the use of public space in the city centre, and suggests ways of making both more attractive to residents. It is based on a survey of 150 commuters and on my own observations over a period of two months.',
        '<strong>Public transport</strong>',
        'Overall, the bus network is extensive, but it is let down by unreliable timetables. Over half of those surveyed complained that buses were frequently late during rush hour, which discourages people from leaving their cars at home. The tram line, by contrast, was widely praised, although tickets are considered expensive for short journeys. Several respondents also pointed out that evening services stop far too early.',
        '<strong>Urban space</strong>',
        'Of greater concern is the amount of space given over to traffic. Not a single street in the historic quarter is closed to cars, so pavements are crowded and cafés struggle to attract customers. The riverside promenade, on the other hand, is a notable success, being used by walkers, cyclists and families alike.',
        '<strong>Recommendations</strong>',
        'First, I recommend introducing dedicated bus lanes, which would make journeys faster and more predictable. Secondly, a daily or weekly travel pass should be introduced to make the tram more affordable. Finally, the council ought to consider pedestrianising at least two central streets at weekends. These measures would, in all likelihood, reduce congestion and bring new life to the centre.'
      ],
      notes: [
        { para: 1, text: 'Reports state purpose and sources at once: <em>It is based on a survey of 150 commuters and on my own observations</em>. Figures make findings credible.' },
        { para: 3, text: 'The first sentence balances good and bad: <em>is extensive, but it is let down by</em>. The phrasal verb <em>let down by</em> is natural in an evaluation.' },
        { para: 3, text: 'A reporting verb in the passive keeps the style impersonal: <em>was widely praised</em>, <em>are considered expensive</em>. <em>by contrast</em> and <em>although</em> compare.' },
        { para: 3, text: 'A non-defining relative clause that comments on the whole previous clause: <em>which discourages people from leaving their cars at home</em> (cause and effect in one sentence).' },
        { para: 5, text: 'Of greater concern is…: inverted structure with a complement in first position, <em>Of greater concern is the amount of space given over to traffic</em>. The participle <em>given over to</em> reduces a relative clause.' },
        { para: 5, text: 'Negative emphasis: <em>Not a single street … is closed to cars</em>. A participle clause, <em>being used by walkers, cyclists and families alike</em>, adds the reason for the success.' },
        { para: 7, text: 'Each recommendation uses a different structure: <em>I recommend introducing</em>, <em>should be introduced</em>, <em>ought to consider pedestrianising</em>. Avoids repeating the same verb pattern.' },
        { para: 7, text: 'The final sentence evaluates the effect, with a parenthetical hedge: <em>in all likelihood</em>. Reports usually close on a result, not on a summary.' }
      ],
      language: [
        { h: 'Introducing the report', items: ['This report evaluates …', 'It is based on a survey of … and on …', 'The purpose of this report is to …', 'The findings are presented under three headings.', 'Information was gathered from …'] },
        { h: 'Presenting findings', items: ['Over half of those surveyed …', 'The majority of respondents …', 'It emerged that …', 'A notable success/shortcoming is …', 'Of greater concern is …', 'Not a single … '] },
        { h: 'Transport and city vocabulary', items: ['rush hour', 'to ease congestion', 'a dedicated bus lane', 'to pedestrianise', 'a travel pass', 'public amenities', 'urban regeneration'] },
        { h: 'Recommending', items: ['It is recommended that …', 'I recommend introducing …', '… should be introduced', 'The council ought to consider …', 'These measures would, in all likelihood, …'] }
      ]
    },

    {
      id: 'essay-education',
      genre: 'essay',
      unit: 'education',
      title: 'Online learning versus the classroom',
      level: 'C1',
      min: 220,
      max: 260,
      minutes: 45,
      prompt: '<p>In your English class you have been discussing education. Now your teacher has asked you to write an essay.</p><p><strong>Write an essay discussing two of the following points. You should explain which point is more important, giving reasons in support of your opinion.</strong></p><blockquote>Online courses are now as effective as classroom teaching.</blockquote><p>Consider:</p><ul><li>convenience and cost</li><li>motivation and contact with teachers</li><li>(your own idea)</li></ul><p>Write your essay in <strong>220-260 words</strong>.</p>',
      points: [
        'Discuss convenience and cost with a reason or example',
        'Discuss motivation and contact with teachers (or your own idea)',
        'Say which point carries more weight and why',
        'Use appropriately formal language'
      ],
      plan: [
        'Decide your position: are online courses equally effective? Probably "it depends", so say on what.',
        'Introduction: refer to a recent change (pandemic, growth of online platforms) and raise the question.',
        'Paragraph 2: strongest argument for online learning, with a type of student who benefits.',
        'Paragraph 3: strongest problem (motivation) with a concrete image of a student alone.',
        'Short paragraph: your own idea (practical skills, language practice).',
        'Conclusion: which is more important + recommendation (blended learning).'
      ],
      model: [
        'The pandemic forced millions of students to study from home almost overnight, and many have never returned to the classroom. This raises the question of whether online learning can truly rival face-to-face teaching.',
        'The strongest argument in its favour is accessibility. Learners who live far from a university, or who must combine study with work, can follow lectures at a time that suits them, and fees are often considerably lower. For such people, online courses are not merely a convenient alternative but the only realistic route to a qualification.',
        'Motivation, however, is a different story. It is one thing to enrol on a course and quite another to finish it, and completion rates for online programmes are strikingly low. In a classroom, teachers notice when a student is struggling, and classmates provide the encouragement that keeps everyone going. Working alone in front of a screen, many students find it all too easy to give up.',
        'Another point worth making is that practical skills, such as conducting experiments or practising a language, are hard to teach remotely. Technology may eventually overcome this, but it has yet to do so.',
        'Taking everything into account, I consider contact with teachers and peers to be the decisive factor. Online learning works admirably for self-disciplined adults, but most students need the structure that only a physical classroom provides. A blend of the two is, in my view, the most sensible way forward.'
      ],
      notes: [
        { para: 0, text: 'The introduction sets a context with a fact, then poses the question indirectly: <em>This raises the question of whether</em> is a standard essay phrase.' },
        { para: 1, text: 'A clear topic sentence: <em>The strongest argument in its favour is accessibility</em>. Readers know the point of the paragraph at once.' },
        { para: 1, text: 'Contrast structure <em>not merely a convenient alternative but the only realistic route to</em> (a correlative pair) strengthens the claim.' },
        { para: 2, text: 'A linker in the middle of the first sentence, <em>Motivation, however, is a different story</em>, is more elegant than starting with However. The idiom signals a change of direction.' },
        { para: 2, text: 'Contrast through a fixed pattern: <em>It is one thing to enrol on a course and quite another to finish it</em>. Very natural at C1 and good for balancing ideas.' },
        { para: 2, text: 'A participle clause opens the sentence: <em>Working alone in front of a screen, many students find it all too easy to give up</em>. It paints a picture and keeps the sentence short; the subject of the participle and of the main clause is the same.' },
        { para: 3, text: 'The own-idea point uses a short, well-chosen frame, <em>Another point worth making is that</em>, and <em>has yet to do so</em> is a compact way to say "has not done so yet".' },
        { para: 4, text: 'The conclusion explicitly answers the task: <em>I consider contact with teachers and peers to be the decisive factor</em>. Then <em>A blend of the two is, in my view, the most sensible way forward</em> offers a recommendation.' }
      ],
      language: [
        { h: 'Introducing a point', items: ['This raises the question of whether …', 'The strongest argument in favour of … is …', 'Another point worth making is that …', 'A further consideration is …', 'It is worth bearing in mind that …'] },
        { h: 'Balancing ideas', items: ['It is one thing to … and quite another to …', '… is a different story', 'Not merely … but …', 'Admittedly, … ; even so, …', 'Whereas …, …'] },
        { h: 'Education vocabulary', items: ['to enrol on a course', 'completion rates', 'self-disciplined', 'a qualification', 'face-to-face teaching', 'to keep up with the syllabus', 'distance learning'] },
        { h: 'Concluding', items: ['Taking everything into account, …', 'I consider … to be the decisive factor', 'A blend of … and … is the most sensible way forward.', 'In my view, …', 'The key lies in …'] }
      ]
    },

    {
      id: 'letter-society',
      genre: 'letter',
      unit: 'society',
      title: 'A letter to a newspaper editor',
      level: 'C1',
      min: 220,
      max: 260,
      minutes: 45,
      prompt: '<p>You have read an editorial in your local newspaper claiming that social media does more harm than good to young people. You disagree in part and decide to write a letter to the editor.</p><p>Write a <strong>formal letter</strong> to the editor. In your letter you should:</p><ul><li>say which parts of the editorial you agree or disagree with</li><li>give an example to support your view</li><li>suggest what should be done</li></ul><p>Write your letter in <strong>220-260 words</strong>.</p>',
      points: [
        'Refer to the editorial and say why you are writing',
        'Present a balanced view: partly agree, partly disagree',
        'Give a specific example',
        'Make a suggestion and finish politely, with correct formal layout'
      ],
      plan: [
        'Greeting: Dear Sir or Madam, then end with Yours faithfully.',
        'Opening: refer to the editorial (date) and say your view is more nuanced.',
        'Paragraph 2: concede a point, then challenge the one-sidedness; add one real-sounding example.',
        'Paragraph 3: solution: who should do what (schools, parents, media).',
        'Final paragraph: a polite request addressed to the editor.',
        'Check: no contractions, no exclamation marks, no emotional language.'
      ],
      model: [
        'Dear Sir or Madam,',
        'I am writing in response to your editorial of 12 May, in which you claimed that social media has done more harm than good to young people. While I share some of your concerns, I feel the picture is rather more complicated than you suggested.',
        'It is undeniable that platforms designed to hold our attention can damage self-esteem and sleep, and teenagers are particularly vulnerable. Nevertheless, to blame the technology alone is to overlook the many young people who use it constructively. Only last year, a group of students in my town organised a successful campaign to save their local youth centre, entirely through online networks.',
        'What is needed, in my opinion, is not a ban but better education. Schools should teach pupils how to recognise misleading content and manage the time they spend online, just as they teach road safety. Parents, too, have a part to play, and the media could help by reporting on positive examples as readily as on scandals. Such measures would tackle the root of the problem rather than its symptoms.',
        'I would therefore urge your newspaper to adopt a more balanced approach and to invite young people themselves to contribute to the debate. After all, they are the ones best placed to describe what it is like to grow up online.',
        'Yours faithfully,',
        'Elena Ruiz'
      ],
      notes: [
        { para: 1, text: 'The reason for writing refers precisely to the source: <em>in response to your editorial of 12 May, in which you claimed that</em>. The relative clause with a preposition is typical of formal letters.' },
        { para: 1, text: 'Concession plus contrast: <em>While I share some of your concerns, I feel</em>. Politely disagreeing is a key skill at C1.' },
        { para: 2, text: 'A formal concession with <em>It is undeniable that</em> followed by <em>Nevertheless</em>. Then an infinitive as subject: <em>to blame the technology alone is to overlook</em>.' },
        { para: 2, text: 'Evidence makes the argument stronger: <em>Only last year, a group of students … organised a successful campaign</em>. A concrete example is worth more than a general claim.' },
        { para: 3, text: 'A cleft sentence presents the proposal: <em>What is needed, in my opinion, is not a ban but better education</em>. Parenthetical opinion phrases are softer than "I think".' },
        { para: 3, text: 'A comparison with <em>just as they teach road safety</em> and <em>as readily as</em>. Nice parallel, an effective strategy for persuasion.' },
        { para: 4, text: 'The closing request uses <em>I would therefore urge your newspaper to</em>, polite but firm. <em>After all</em> adds a persuasive final thought.' },
        { para: 0, text: 'Layout matters: the greeting <em>Dear Sir or Madam</em> is used when the name is unknown.' },
        { para: 5, text: 'It is always closed with <em>Yours faithfully</em>; <em>Yours sincerely</em> is used only when you know the name.' }
      ],
      language: [
        { h: 'Referring to the article', items: ['I am writing in response to your editorial of …', 'I read with interest your article on …', 'In your report you claimed that …', 'I was surprised/dismayed to read that …', 'I would like to put forward a different view.'] },
        { h: 'Partly agreeing', items: ['While I share some of your concerns, …', 'It is undeniable that …', 'There is some truth in the claim that …', 'Nevertheless, …', 'That said, to … is to overlook …', 'To a certain extent, …'] },
        { h: 'Media and society vocabulary', items: ['misleading content', 'to spread misinformation', 'self-esteem', 'a balanced approach', 'to hold public debate', 'media literacy', 'online networks'] },
        { h: 'Urging and closing', items: ['I would therefore urge you to …', 'I trust you will give these points careful consideration.', 'What is needed is …', 'After all, …', 'Yours faithfully (Dear Sir or Madam) / Yours sincerely (Dear Ms Brown)'] }
      ]
    },

    {
      id: 'review-culture',
      genre: 'review',
      unit: 'culture',
      title: 'A review of a local festival',
      level: 'C1',
      min: 220,
      max: 260,
      minutes: 45,
      prompt: '<p>An English-language travel magazine is inviting readers to send in reviews of festivals or cultural events that visitors can enjoy in their region.</p><p>Write a <strong>review</strong> of a festival or cultural event you know well. In your review you should:</p><ul><li>describe what the event is and what takes place</li><li>explain what is good and what is not so good about it</li><li>say whether you would recommend it, and to whom</li></ul><p>Write your review in <strong>220-260 words</strong>.</p>',
      points: [
        'Describe the event so that a foreigner can picture it',
        'Give both strong points and weaknesses, with examples',
        'Show personal impressions and feelings',
        'Recommend the event to a type of reader, with advice'
      ],
      plan: [
        'Choose an event you know really well, so details come easily.',
        'Think of a catchy title that summarises the experience.',
        'Paragraph 1: hook + what/where/when + your experience of it.',
        'Paragraph 2: the best thing, described vividly with strong adjectives.',
        'Paragraph 3: the downsides, said fairly with a tip.',
        'Final paragraph: overall verdict and practical advice (who, when, what to bring).'
      ],
      model: [
        '<strong>Fire, noise and fun: Alicante’s Hogueras</strong>',
        'Every June, the Mediterranean city of Alicante celebrates the summer solstice with a festival of enormous papier-mâché sculptures, fireworks and street parties. Having attended for the past three years, I can confirm that it is as spectacular as it is exhausting.',
        'What sets the Hogueras apart is the sheer scale of the spectacle. Each neighbourhood builds a satirical monument, some of them taller than a five-storey building, and on the final night they are set alight in a blaze that lights up the whole city. Equally memorable are the firework displays on the beach, which are among the most impressive I have ever seen.',
        'That said, the festival is not for the faint-hearted. The noise starts at eight in the morning and rarely stops before dawn, and accommodation is both scarce and overpriced. Visitors who dislike crowds would be well advised to avoid the main square after midnight.',
        'Nevertheless, the warmth of the locals more than makes up for these drawbacks. Strangers will happily invite you to share a table, and the food, particularly the grilled sardines, is outstanding. Indeed, some of my fondest memories are of impromptu singing in the street at two in the morning.',
        'All in all, I would thoroughly recommend the festival to anyone with energy to spare. Book your room well in advance, pack earplugs and, above all, go with an open mind.'
      ],
      notes: [
        { para: 0, text: 'A catchy title built on a short list and a colon: <em>Fire, noise and fun</em>. Reviews are allowed to be playful.' },
        { para: 1, text: 'Perfect participle clause as a credential: <em>Having attended for the past three years, I can confirm that</em>. It establishes authority at once.' },
        { para: 1, text: 'Parallel comparison: <em>as spectacular as it is exhausting</em> gives a verdict (good and bad) in a single phrase.' },
        { para: 2, text: 'Wh-cleft for emphasis: <em>What sets the Hogueras apart is the sheer scale of the spectacle</em>. The strongest point comes first in the paragraph.' },
        { para: 2, text: 'Inversion with a complement: <em>Equally memorable are the firework displays</em>, and a superlative with a post-modifier, <em>among the most impressive I have ever seen</em>.' },
        { para: 3, text: 'Idiom as a polite signal of weakness: <em>not for the faint-hearted</em>. <em>That said</em> introduces the criticism fairly.' },
        { para: 3, text: 'Soft advice with <em>would be well advised to avoid</em> is more tactful than "you must".' },
        { para: 4, text: 'The phrasal expression <em>more than makes up for</em> balances the criticism and keeps a positive overall tone.' },
        { para: 5, text: 'The conclusion gives practical, direct advice using imperatives: <em>Book your room well in advance, pack earplugs</em>. Acceptable in a review because the reader is addressed.' }
      ],
      language: [
        { h: 'Describing events', items: ['sheer scale', 'a feast for the senses', 'steeped in tradition', 'a riot of colour', 'to draw crowds from all over', 'a lively atmosphere'] },
        { h: 'Strong adjectives', items: ['spectacular', 'unforgettable', 'overpriced', 'exhausting', 'outstanding', 'overcrowded', 'unmissable'] },
        { h: 'Balancing positives and negatives', items: ['That said, …', 'It is not for the faint-hearted.', '… more than makes up for …', 'The only drawback is …', 'Despite … , …', 'Nevertheless, …'] },
        { h: 'Recommending', items: ['I would thoroughly recommend it to …', 'Visitors would be well advised to …', 'Book well in advance.', 'Whatever you do, …', 'It is well worth a visit if you …', 'Go with an open mind.'] }
      ]
    },

    {
      id: 'proposal-work',
      genre: 'proposal',
      unit: null,
      title: 'A mentoring scheme for new employees',
      level: 'C1',
      min: 220,
      max: 260,
      minutes: 45,
      prompt: '<p>You work for a medium-sized company. The human resources director has asked staff for ideas to help new employees settle in and stay with the company. You have decided to propose a mentoring scheme.</p><p>Write a <strong>proposal</strong> for the director. In your proposal you should:</p><ul><li>explain why the company needs the scheme</li><li>describe how the scheme would work</li><li>say what the benefits and costs would be</li></ul><p>Write your proposal in <strong>220-260 words</strong>.</p>',
      points: [
        'Explain the current problem and why a scheme is needed',
        'Describe how the scheme would work in practice',
        'Say what the benefits and costs would be',
        'Recommend a next step'
      ],
      plan: [
        'Headings: Introduction / Current situation / The proposed scheme / Benefits and costs / Recommendation.',
        'Introduction: one sentence for the purpose.',
        'Current situation: evidence of the problem (induction, exit interviews), with figures.',
        'The scheme: who, how often, for how long, what training. Use modal verbs of proposal.',
        'Benefits and costs: realistic and persuasive; mention a possible drawback.',
        'Recommendation: a small, safe next step (a pilot).'
      ],
      model: [
        '<strong>Introduction</strong>',
        'The purpose of this proposal is to recommend a mentoring scheme for new employees, with a view to improving retention during the first year of employment.',
        '<strong>Current situation</strong>',
        'At present, newcomers receive a two-day induction and are then largely left to fend for themselves. In exit interviews, almost a third of those who left within twelve months mentioned feeling isolated and uncertain about what was expected of them. Not only is this unfortunate for the individuals concerned, but it is also costly, since recruiting a replacement can take up to three months.',
        '<strong>The proposed scheme</strong>',
        'Each new starter would be paired with an experienced colleague from a different department, who would meet them fortnightly for the first six months. Mentors would be volunteers and would receive a half-day of training in giving constructive feedback. The meetings, held during working hours, would cover not only practical matters but also career development.',
        '<strong>Benefits and costs</strong>',
        'The scheme would cost very little, as the main expense is the time mentors spend away from their desks. In return, staff would integrate faster, and mentors themselves would develop leadership skills. It might also strengthen links between departments, which currently operate in relative isolation.',
        '<strong>Recommendation</strong>',
        'I suggest piloting the scheme with the next intake of recruits in September and reviewing its impact after six months before rolling it out company-wide.'
      ],
      notes: [
        { para: 1, text: 'Formal opening with a purpose clause: <em>with a view to improving retention</em> (+ -ing) is a precise way to give the aim.' },
        { para: 3, text: 'Colloquial idiom in a formal text works when it is exact: <em>left to fend for themselves</em>. Notice the passive with <em>largely</em>.' },
        { para: 3, text: 'Evidence as a proportion: <em>almost a third of those who left within twelve months</em>. Vague claims are weaker than numbers.' },
        { para: 3, text: 'Inversion after a negative opener: <em>Not only is this unfortunate for the individuals concerned, but it is also costly</em>, followed by a reason with <em>since</em>.' },
        { para: 5, text: 'Modals of proposal: <em>would be paired with</em>, <em>would meet them fortnightly</em>. Using would throughout marks the plan as hypothetical.' },
        { para: 5, text: 'Reduced passive relative clause, <em>The meetings, held during working hours, would cover</em>, then <em>not only … but also</em> for a precise scope.' },
        { para: 7, text: 'Low cost is argued, not just asserted: <em>The scheme would cost very little, as</em>. The hedge <em>It might also strengthen links</em> is honest and credible.' },
        { para: 9, text: 'A modest, sensible recommendation: <em>I suggest piloting the scheme</em> (suggest + -ing) and <em>rolling it out company-wide</em> (phrasal verb in a business register).' }
      ],
      language: [
        { h: 'Stating the purpose', items: ['The purpose of this proposal is to recommend …', 'with a view to + -ing', 'This proposal sets out …', 'I have been asked to suggest ways of …', 'The aim is to improve …'] },
        { h: 'Describing a problem', items: ['At present, …', 'left to fend for themselves', 'a third of those who …', 'It is costly, since …', 'This is a cause for concern.'] },
        { h: 'Work vocabulary', items: ['retention', 'induction', 'a mentor', 'to integrate into a team', 'leadership skills', 'to roll out', 'career development'] },
        { h: 'Weighing benefits and costs', items: ['The scheme would cost very little.', 'In return, …', 'It might also …', 'The main drawback is …', 'on a trial basis', 'I suggest piloting …'] }
      ]
    },

    {
      id: 'report-technology',
      genre: 'report',
      unit: null,
      title: 'Students and technology',
      level: 'C1',
      min: 220,
      max: 260,
      minutes: 45,
      prompt: '<p>The director of your college has asked you to write a report on how students use technology to study. You have surveyed 80 students and talked to some teachers.</p><p>Write a <strong>report</strong> for the director. In your report you should:</p><ul><li>describe how students currently use technology</li><li>identify any problems</li><li>recommend what the college should do</li></ul><p>Write your report in <strong>220-260 words</strong>.</p>',
      points: [
        'Describe how students use technology for study',
        'Identify at least two problems, with evidence',
        'Make recommendations linked to the problems',
        'Use headings and an impersonal style'
      ],
      plan: [
        'Headings: Introduction / Current use of technology / Problems identified / Recommendations.',
        'Introduction: purpose and sources (survey of 80 students + talks with teachers).',
        'Current use: what the majority do; use fractions and approximations.',
        'Problems: two or three, ordered by importance, each with a figure or example.',
        'Recommendations: one for each problem, using different structures.',
        'Check that the style is neutral and impersonal, with no personal stories.'
      ],
      model: [
        '<strong>Introduction</strong>',
        'This report examines how students at the college use technology to support their studies and makes recommendations for improvement. It draws on a questionnaire completed by 80 students and on informal discussions with teaching staff.',
        '<strong>Current use of technology</strong>',
        'The great majority of respondents rely on their phones to photograph the board, look up vocabulary and communicate with classmates. The online learning platform is used regularly by two thirds of students, mainly to download materials and submit homework. A growing number also consult AI tools to check their writing, although several teachers expressed concern about this practice.',
        '<strong>Problems identified</strong>',
        'Two issues emerged clearly. First, wifi in the main building is so unreliable that lessons are often interrupted. Secondly, students who cannot afford a laptop are at a distinct disadvantage when completing long assignments, as the library has only twenty computers. In addition, nearly half of those surveyed admitted that notifications distract them in class.',
        '<strong>Recommendations</strong>',
        'It is recommended that the college upgrade its wifi network as a matter of priority. A laptop loan scheme, funded perhaps through the student support budget, would help to even out inequalities in access. Finally, staff and students should jointly agree guidelines on when devices may be used in lessons, so that technology supports learning rather than undermining it. These changes would require only a modest investment but would benefit the whole student body.'
      ],
      notes: [
        { para: 1, text: 'The report states its scope and sources: <em>It draws on a questionnaire completed by 80 students</em>. A reduced relative clause (<em>completed by</em>) is compact and formal.' },
        { para: 3, text: 'Quantifiers give variety without repetition: <em>The great majority of respondents</em>, <em>two thirds of students</em>, <em>A growing number</em>.' },
        { para: 3, text: 'Contrast with <em>although several teachers expressed concern about this practice</em> shows that you have collected more than one point of view.' },
        { para: 5, text: 'Result clause with so … that: <em>wifi in the main building is so unreliable that lessons are often interrupted</em>. Cause and effect in one sentence.' },
        { para: 5, text: 'Sequencing through <em>Two issues emerged clearly. First, … Secondly, …</em> helps the director to find each problem. <em>at a distinct disadvantage</em> is a precise collocation.' },
        { para: 7, text: 'The impersonal recommendation <em>It is recommended that the college upgrade</em> uses the subjunctive after recommend. <em>as a matter of priority</em> signals urgency.' },
        { para: 7, text: 'Hedged proposals: <em>funded perhaps through the student support budget, would help to even out inequalities</em> (participle clause + a phrasal verb).' },
        { para: 7, text: 'The ending links technology to the purpose, <em>so that technology supports learning rather than undermining it</em>: parallel structure, and a purpose clause for a final impact.' }
      ],
      language: [
        { h: 'Introducing the report', items: ['This report examines …', 'It draws on …', 'The findings are based on …', 'The survey was completed by …', 'The aim is to identify …'] },
        { h: 'Quantifying', items: ['the great majority of respondents', 'two thirds of students', 'nearly half of those surveyed', 'a growing number of …', 'only a small minority …'] },
        { h: 'Technology vocabulary', items: ['an online learning platform', 'to be a distraction', 'notifications', 'a reliable connection', 'unequal access', 'to consult AI tools', 'a device'] },
        { h: 'Making recommendations', items: ['It is recommended that the college upgrade …', '… as a matter of priority', 'would help to even out …', 'Staff and students should agree …', 'so that … rather than …'] }
      ]
    }
  ]
};
