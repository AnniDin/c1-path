window.C1 = window.C1 || {};
/* Six further writing tasks (two essays, an email, a report, a proposal and a book review). Loaded after data/writing7.js. */
C1.writing.tasks.push(
  {
    id: 'essay-sleep-work',
    genre: 'essay',
    unit: null,
    title: 'Should the working day start later?',
    level: 'C1',
    min: 220,
    max: 260,
    minutes: 45,
    prompt: '<p>In your class you have been discussing sleep, health and productivity. Your teacher has asked you to write an essay with the following title:</p><p><em>Some companies now let employees start work at ten o\'clock instead of eight. Should later starts become the normal pattern?</em></p><p>Write an <strong>essay</strong> discussing <strong>two</strong> of the following:</p><ul><li>employees\' health and alertness</li><li>the needs of customers and colleagues</li><li>fairness to people with different lives and body clocks</li></ul><p>You should explain which point you think is more important, giving reasons in support of your answer. Write your essay in <strong>220-260 words</strong>.</p>',
    points: [
      'Discuss two of the three given points, one in each body paragraph',
      'Give reasons and examples, not just opinions',
      'State clearly which point matters more, and why',
      'Use a neutral, formal register with linking words that show contrast and result'
    ],
    plan: [
      'Introduction: put the question in your own words and say what your answer will depend on. This tells the reader you have understood the problem and not just repeated the title.',
      'Paragraph 2: take the strongest argument for later starts (health) and follow the chain: cause, effect, result. Reasons that link together convince more than a list of claims.',
      'Paragraph 3: take the strongest limit (customers and colleagues) and give concrete examples of jobs where it applies, so the objection is real and not vague.',
      'Weigh the two against each other somewhere in the essay. The task asks you to say which is more important, so a balanced description alone is not enough.',
      'Conclusion: give your opinion in a new form of words and end on a general idea, not on a new argument.'
    ],
    model: [
      'It is often assumed that a good employee is the one who arrives first, yet a growing number of firms now allow staff to start at ten rather than eight. Whether this should become the norm depends, in my view, on what we expect work to achieve.',
      'The strongest argument in favour concerns health. Many adults sleep less than they need because early starts leave little room to rest, and the result is slower thinking and more mistakes. If a later start allowed people to sleep a little longer, the extra hours at home might well be repaid by sharper work in the afternoon. Moreover, some people are naturally alert in the evening, and a fixed early timetable wastes their best hours.',
      'Against this, later starts are not equally practical for every business. A bakery, a school or a call centre serving customers in another time zone cannot simply move its opening hours, and colleagues who start at different times may struggle to arrange meetings. Parents who must take children to school at eight would also gain little, since they would be up early anyway.',
      'On balance, I believe that the needs of customers and colleagues are the more important consideration, because a service that is closed when people need it helps nobody. Health matters, but it is better protected by flexibility than by one later timetable: where the job allows it, letting staff choose their start time within reasonable limits would safeguard sleep without harming service. After all, a company\'s real aim is good work, not early arrival.'
    ],
    notes: [
      { para: 0, text: '<em>It is often assumed that</em> opens by naming a common belief that the essay will test. It is more interesting than copying the title, and <em>depends, in my view, on</em> promises a reasoned answer rather than a flat yes or no.' },
      { para: 1, text: '<em>because early starts leave little room to rest, and the result is</em> builds a chain of cause and effect. A reader can follow each step, which is what turns an opinion into an argument.' },
      { para: 1, text: '<em>might well be repaid</em> uses a modal with <em>well</em> to predict without exaggerating. Writing "will be repaid" would claim more than the writer can know.' },
      { para: 2, text: '<em>Against this</em> marks the turn to the opposite side with one short phrase. The examples (bakery, school, call centre) are different kinds of job, so the limit is shown to be general and not just a single special case.' },
      { para: 2, text: '<em>would also gain little, since they would be up early anyway</em> turns the objection back on the main argument: the benefit the first paragraph promised may not reach everyone. This is a deeper point than simply listing a disadvantage.' },
      { para: 3, text: '<em>On balance, I believe that … are the more important consideration</em> answers the demand in the task to say which point matters more, and gives a reason with <em>because</em>. <em>After all</em> ends with a general idea that gives the essay a clear, memorable point of view.' }
    ],
    language: [
      { h: 'Opening and framing', items: ['It is often assumed that …', 'Whether … depends, in my view, on …', 'yet a growing number of … now …', 'what we expect … to achieve'] },
      { h: 'Building cause and effect', items: ['and the result is …', 'might well be repaid by …', 'because … leave little room to …', 'Moreover, …'] },
      { h: 'Turning to the other side', items: ['Against this, …', '… is not equally practical for every …', 'cannot simply …', 'can also clash with …'] },
      { h: 'Weighing and concluding', items: ['On balance, I believe that …', '… is better protected by … than by …', 'within reasonable limits', 'After all, …'] }
    ]
  },
  {
    id: 'essay-sustainable-fashion',
    genre: 'essay',
    unit: null,
    title: 'Who should make fashion more sustainable?',
    level: 'C1',
    min: 220,
    max: 260,
    minutes: 45,
    prompt: '<p>You have read a magazine article about clothing that is bought cheaply, worn a few times and thrown away. Your teacher has asked you to write an essay responding to this statement:</p><p><em>Shoppers, not manufacturers, are responsible for making fashion more sustainable.</em></p><p>Write an <strong>essay</strong> in which you say to what extent you agree. You should consider:</p><ul><li>what individual shoppers can realistically do</li><li>what manufacturers and governments could do</li></ul><p>You may also add an idea of your own. Write your essay in <strong>220-260 words</strong>.</p>',
    points: [
      'Take a position and keep to it, but acknowledge the other side',
      'Cover the role of shoppers and the role of producers or governments',
      'Give a reason for every claim you make',
      'Use concession and contrast to show balanced thinking in a formal register'
    ],
    plan: [
      'Introduction: begin with a concrete image and then state your position. A "to what extent" essay needs an answer by the end of paragraph 1, not only at the end.',
      'Paragraph 2: concede what is true in the statement (shoppers have some power), then use <em>nevertheless</em> to show its limit. Conceding first makes your disagreement more credible.',
      'Paragraph 3: argue for the other side with specific actions (design, labelling, take-back rules) and say what each would change.',
      'Include your own idea inside paragraph 3 (for example, rules that protect honest firms). A new idea shows initiative without taking you off the topic.',
      'Conclusion: restate your position in a more precise form, such as "agree only in part".'
    ],
    model: [
      'Few of us stop to ask why a shirt can cost less than a sandwich. The answer, I would argue, is that the real price of cheap clothing is paid elsewhere, by workers, rivers and landfill sites, and that shoppers alone cannot be expected to put this right.',
      'It is certainly true that consumers hold some power. If buyers kept clothes for longer, mended them and bought second-hand more often, demand for new garments would fall and fewer would be produced. Nevertheless, shoppers can only choose among the options on sale, and reliable information about how a garment was made is rarely available at the point of purchase. Asking individuals to make ethical choices without that information is somewhat unreasonable.',
      'Responsibility therefore lies chiefly with producers and governments. Companies could design clothes to last, and legislation could require them to disclose where and how their products are made, or to take back worn-out items for recycling. They could also reward firms that repair or resell their own garments. Such rules would make sustainable fashion the default rather than a luxury for the well-informed, and they would stop honest firms from being undercut by those that cut corners.',
      'To conclude, I agree only in part that the problem begins with the shopper. Consumers can encourage change, but it is the industry, backed by firm regulation, that must make it possible.'
    ],
    notes: [
      { para: 0, text: '<em>why a shirt can cost less than a sandwich</em> is a concrete image that raises the question before the thesis arrives. <em>I would argue</em> introduces a clear position politely, and the list <em>workers, rivers and landfill sites</em> makes an abstract idea visible.' },
      { para: 1, text: '<em>It is certainly true that</em> concedes a point to the other side. <em>Nevertheless</em> then turns it, so the reader sees that you considered the statement fairly before disagreeing.' },
      { para: 1, text: '<em>If buyers kept clothes for longer … demand would fall</em> is a second conditional used for a hypothetical chain of events. It correctly signals "this is what would happen", not "this is what happens".' },
      { para: 2, text: '<em>therefore lies chiefly with</em> states a conclusion that follows from paragraph 2, and <em>chiefly</em> keeps it measured. The actions (design, disclosure, take-back) are specific, so the claim is not just "governments should do something".' },
      { para: 2, text: '<em>stop honest firms from being undercut by those that cut corners</em> is the writer\'s own idea: rules protect good companies. It adds a reason for regulation that the prompt did not give, which shows independent thinking.' },
      { para: 3, text: '<em>I agree only in part</em> answers the "to what extent" question precisely. A more exact answer than "I disagree" is usually a mark of C1 thinking, and the closing contrast <em>encourage … make it possible</em> sums up the whole argument.' }
    ],
    language: [
      { h: 'Opening with an image and a position', items: ['Few of us stop to ask why …', 'The answer, I would argue, is that …', 'is paid elsewhere, by …', 'cannot be expected to …'] },
      { h: 'Conceding then contrasting', items: ['It is certainly true that …', 'Nevertheless, …', 'can only choose among …', 'somewhat unreasonable'] },
      { h: 'Assigning responsibility', items: ['Responsibility therefore lies chiefly with …', 'could require them to …', 'the default rather than a luxury for …', 'backed by firm regulation'] },
      { h: 'Answering "to what extent"', items: ['I agree only in part that …', 'Consumers can encourage …, but …', 'must make it possible', 'To conclude, …'] }
    ]
  },
  {
    id: 'email-remote-friendship',
    genre: 'email',
    unit: null,
    title: 'Keeping in touch with a friend abroad',
    level: 'C1',
    min: 220,
    max: 260,
    minutes: 40,
    prompt: '<p>Your close friend Inés moved to another country six months ago for a job. She has sent you an email. This is part of it:</p><blockquote>"I don\'t want to make a fuss, but we hardly talk any more. Messages take days to get answered and I\'m starting to feel we\'re drifting apart. Perhaps this is just what happens when someone moves away?"</blockquote><p>Write an <strong>email</strong> to Inés. In your email you should:</p><ul><li>respond to her worries honestly and kindly</li><li>suggest some practical ways to stay close</li><li>propose a plan to see each other</li></ul><p>Write your email in <strong>220-260 words</strong>.</p>',
    points: [
      'Respond directly to what she wrote, with warmth and honesty',
      'Offer two or three specific, realistic ideas',
      'Propose a concrete plan and ask for her reply',
      'Use a warm, semi-informal register: contractions are fine, but keep the sentences well built'
    ],
    plan: [
      'Greeting and thanks: refer to her message in your first line so she knows you took it seriously. Opening with an excuse would sound defensive.',
      'Respond to the worry: be honest about your part (busy, not indifferent) and say that feeling distant is normal. Reassurance works better when it is specific.',
      'Practical ideas: give two or three that fit the real problem (time zones, slow replies) and say why each helps; a plan that solves the problem is better than "let\'s try harder".',
      'The plan to meet: name a time and a place and ask for her view, so the email calls for an answer.',
      'Closing: finish warmly and informally, with a short sign-off that sounds like you.'
    ],
    model: [
      'Dear Inés,<br>Thank you for your message. I read it twice, and I was sorry to hear that you feel we\'re drifting apart. If I\'ve seemed distant, it\'s because the past few months have been hectic at work, not because you matter any less to me.',
      'I think what\'s happening is quite normal, though. When we lived ten minutes apart, our friendship ran on small, unplanned moments, and those have disappeared. Quick messages can\'t replace them, which is probably why they feel so unsatisfying.',
      'So perhaps we should stop relying on messages and set up something regular. How about a video call on the first Sunday of every month? Knowing it\'s in the diary would stop us from putting it off, and the time difference is small enough for a morning for you and an afternoon for me. In between, we could send each other voice notes while we\'re walking or cooking; they\'re far quicker than typing and sound much more like us. We could even read the same book each month and compare notes.',
      'I\'d also love to visit you. I can take a few days off in April, if the weather is kind and you have a sofa to spare. Would that suit you? If not, tell me which weekends work and I\'ll fit around them.',
      'Please don\'t apologise for writing to me; I\'m glad you did. Say hello to your new city for me, and let me know about April soon.<br>Take care,<br>Marta'
    ],
    notes: [
      { para: 0, text: '<em>I read it twice</em> shows effort with three words, and <em>not because you matter any less to me</em> names the fear she has and denies it directly. Contractions (<em>we\'re, I\'ve</em>) keep it friendly.' },
      { para: 1, text: '<em>I think what\'s happening is quite normal, though</em> uses <em>though</em> at the end to soften a disagreement with her feeling. The explanation (<em>friendship ran on small, unplanned moments</em>) treats her worry as reasonable instead of dismissing it.' },
      { para: 2, text: '<em>How about … ?</em> and <em>perhaps we should</em> offer ideas as suggestions between equals, which suits a friend. Each idea comes with a reason (<em>would stop us from putting it off, far quicker than typing</em>), so they sound like solutions to her actual problem.' },
      { para: 2, text: '<em>they\'re far quicker than typing and sound much more like us</em> uses a comparative with <em>far</em> and <em>much</em> for emphasis, a natural, informal way to be persuasive.' },
      { para: 3, text: '<em>if the weather is kind and you have a sofa to spare</em> adds a light joke, which keeps the tone relaxed. <em>Would that suit you?</em> asks her opinion, and the last sentence offers flexibility, so the plan does not feel like an order.' },
      { para: 4, text: '<em>Please don\'t apologise for writing to me; I\'m glad you did</em> repairs the awkwardness of her first message. The sign-off <em>Take care</em> is warm without being formal.' }
    ],
    language: [
      { h: 'Responding to a worry', items: ['I was sorry to hear that …', 'I read it twice', 'not because you matter any less to me', 'I think what\'s happening is quite normal, though.'] },
      { h: 'Suggesting among friends', items: ['How about …?', 'Perhaps we should …', 'we could even …', 'would stop us from putting it off'] },
      { h: 'Making plans', items: ['I can take a few days off in …', 'Would that suit you?', 'tell me which weekends work', 'I\'ll fit around them'] },
      { h: 'Warm informal closings', items: ['Please don\'t apologise for …', 'I\'m glad you did.', 'let me know about … soon', 'Take care,'] }
    ]
  },
  {
    id: 'report-open-plan-office',
    genre: 'report',
    unit: null,
    title: 'A report on an open-plan office',
    level: 'C1',
    min: 220,
    max: 260,
    minutes: 45,
    prompt: '<p>You work for a company that moved into a new open-plan office a year ago. Several employees have complained that it is noisy, while others say it has improved teamwork. The director has asked you to find out how staff feel and to report back.</p><p>Write a <strong>report</strong> for the director. In your report you should:</p><ul><li>describe what you found out about working in the open-plan office</li><li>explain the main advantages and disadvantages for staff</li><li>recommend what should be done</li></ul><p>Write your report in <strong>220-260 words</strong>.</p>',
    points: [
      'Use clear headings and a neutral, impersonal style',
      'Report findings without inventing numbers: say what staff told you',
      'Balance advantages and disadvantages before recommending',
      'Make recommendations that follow logically from the problems you describe'
    ],
    plan: [
      'Headings first: Introduction / Findings / Advantages / Disadvantages / Recommendations. A busy director can find each part at a glance.',
      'Introduction: say what the report is for and how you collected the information (conversations, observation). Readers trust findings when they know where they came from.',
      'Findings and advantages: report what staff said using reporting verbs, not "everybody thinks". Present the positives fairly so the report does not look biased.',
      'Disadvantages: describe the real problem (noise, interruptions) and what it does to the work itself, not just to people\'s moods.',
      'Recommendations: each one must answer one of the problems above. Short, practical and realistic ideas beat a total redesign.'
    ],
    model: [
      '<strong>Introduction</strong><br>The aim of this report is to describe how staff experience the open-plan office and to recommend improvements. It is based on informal conversations with employees from every department and on my own observations over two weeks.',
      '<strong>Findings</strong><br>Opinions are divided. Staff in the marketing and design teams generally welcomed the new layout, whereas those who spend much of the day on the phone or writing detailed documents were far less positive.',
      '<strong>Advantages</strong><br>Several employees said that questions are now answered immediately instead of by email, and that newer colleagues find it easier to learn by listening to experienced ones. The shared space has also made it simpler to spot when a team needs help.',
      '<strong>Disadvantages</strong><br>The main complaint is noise. Phone calls and conversations constantly interrupt people who need to concentrate, and some admitted that they now take work home in order to finish it. A few staff also said that they feel uncomfortable being visible all day, which can lower morale.',
      '<strong>Recommendations</strong><br>I suggest creating one or two quiet rooms that may be booked for focused work or private calls. In addition, the company could agree simple rules, such as using headphones as a sign that someone should not be disturbed. Teams that need to talk all day could also be seated together, away from those doing concentrated work. Finally, a short survey in six months would show whether these measures have worked.'
    ],
    notes: [
      { para: 0, text: '<em>The aim of this report is to … and to …</em> states the purpose in the first sentence, and <em>is based on</em> tells the director how reliable the information is. Impersonal structure keeps the tone formal.' },
      { para: 1, text: '<em>whereas</em> contrasts two groups inside one sentence, and giving a reason for the difference (phone work, detailed writing) turns "opinions are divided" into a useful finding.' },
      { para: 2, text: '<em>Several employees said that</em> reports opinions without exaggeration. The report gives the positives their own heading so that the later criticism looks fair and not like a complaint.' },
      { para: 3, text: '<em>some admitted that they now take work home in order to finish it</em> shows a real consequence of the noise on the work itself. This is stronger than saying staff are "unhappy", and the writer does not claim any figure that could not be checked.' },
      { para: 4, text: '<em>I suggest creating</em> and <em>the company could agree</em> keep recommendations polite and practical. Each answers a problem: quiet rooms and a seating plan for noise, headphones for interruptions, a survey for uncertainty. <em>may be booked</em> is a formal passive.' }
    ],
    language: [
      { h: 'Stating the purpose and method', items: ['The aim of this report is to …', 'It is based on …', 'informal conversations with …', 'my own observations over …'] },
      { h: 'Reporting what people said', items: ['Opinions are divided.', 'Several employees said that …', 'some admitted that …', 'A few staff also said that …'] },
      { h: 'Contrast and consequence', items: ['whereas those who …', 'far less positive', 'in order to finish it', 'which can lower …'] },
      { h: 'Recommending', items: ['I suggest creating …', 'that may be booked for …', 'such as …', 'would show whether … have worked'] }
    ]
  },
  {
    id: 'proposal-public-library',
    genre: 'proposal',
    unit: null,
    title: 'A proposal for the town library',
    level: 'C1',
    min: 220,
    max: 260,
    minutes: 45,
    prompt: '<p>The public library in your town closes at five o\'clock every day, when most people are still at work or school. The town council has invited residents to propose ways of making better use of public buildings.</p><p>Write a <strong>proposal</strong> for the council. In your proposal you should:</p><ul><li>explain why the present opening hours are a problem</li><li>suggest how the library could be used in the evenings</li><li>say what it would cost and what the town would gain</li></ul><p>Write your proposal in <strong>220-260 words</strong>.</p>',
    points: [
      'Use headings and formal, persuasive language',
      'Explain the problem for particular groups of people',
      'Suggest specific evening activities, not vague improvements',
      'Be honest about costs and realistic about the benefits'
    ],
    plan: [
      'Headings: Introduction / The problem / Proposal / Costs and benefits / Conclusion. A council reads many proposals, so a clear layout helps yours be found and remembered.',
      'Introduction: state your idea in one sentence and say whom it is for, so the council knows at once what it is asked to approve.',
      'The problem: name the groups who cannot use the library now and explain why, because a proposal is only convincing if a real need is shown.',
      'Proposal: suggest a short trial with concrete features. A trial is easier to approve than a permanent change because it limits the risk.',
      'Costs and benefits: give staffing as the main cost and say how it could be reduced; then link each benefit to the people in the problem section.'
    ],
    model: [
      '<strong>Introduction</strong><br>The purpose of this proposal is to recommend that the town library stay open until nine o\'clock on three evenings a week as a six-month trial. The idea comes from conversations with library users, parents and local employers.',
      '<strong>The problem</strong><br>Because the library closes at five, it is effectively closed to anyone who works or studies during the day. Teenagers preparing for exams have few quiet places to study after school, and shift workers and parents with young children cannot use the books and computers that their taxes help to pay for.',
      '<strong>Proposal</strong><br>During the extra hours, the library would offer a quiet study area, free access to computers and printers, and a monthly evening for adult learners to practise English or improve their digital skills. Local clubs, such as a reading group, could also use the main room, which is empty at present.',
      '<strong>Costs and benefits</strong><br>The main expense would be the wages of one additional member of staff, and some of this could be offset by volunteers supervising the study area. The benefits would be harder to count but real: students would have somewhere to learn, adults would have a chance to retrain, and the building would finally serve the whole community instead of only part of it.',
      '<strong>Conclusion</strong><br>A trial would involve limited risk and would show whether demand justifies a permanent change. I therefore urge the council to approve it.'
    ],
    notes: [
      { para: 0, text: '<em>stay open until nine o\'clock on three evenings a week as a six-month trial</em> is specific: hours, days and duration. The subjunctive-like <em>recommend that the town library stay</em> is typical formal British usage, and naming the sources shows the idea comes from the community.' },
      { para: 1, text: '<em>effectively closed to anyone who works or studies during the day</em> turns an opening time into a problem for named groups. <em>that their taxes help to pay for</em> adds an argument of fairness in a relative clause, without repeating the point.' },
      { para: 2, text: '<em>would offer</em> lists three different uses that match different groups of people from the previous paragraph, so the proposal answers the need it described. <em>which is empty at present</em> also shows that existing space is wasted.' },
      { para: 3, text: '<em>some of this could be offset by volunteers</em> admits the main cost and suggests a way to lower it, which makes the council more likely to trust the proposal. <em>harder to count but real</em> avoids inventing figures.' },
      { para: 4, text: '<em>would involve limited risk</em> answers the council\'s probable objection before it is raised. <em>I therefore urge</em> is stronger than <em>hope</em>, which suits a proposal that has already given the evidence.' }
    ],
    language: [
      { h: 'Recommending formally', items: ['The purpose of this proposal is to recommend that … stay …', 'as a six-month trial', 'The idea comes from …', 'I therefore urge the council to …'] },
      { h: 'Defining a problem', items: ['it is effectively closed to anyone who …', 'have few quiet places to …', 'that their taxes help to pay for', 'cannot use …'] },
      { h: 'Describing a proposal', items: ['would offer …', 'such as …', 'could also use …', 'which is empty at present'] },
      { h: 'Costs and benefits', items: ['The main expense would be …', 'could be offset by …', 'harder to count but real', 'instead of only part of it'] }
    ]
  },
  {
    id: 'review-novel-small-rooms',
    genre: 'review',
    unit: null,
    title: 'A review of a novel',
    level: 'C1',
    min: 220,
    max: 260,
    minutes: 40,
    prompt: '<p>An online magazine for readers in their twenties and thirties is publishing reviews of books that have made a strong impression on readers. You have recently read a novel and decided to submit a review.</p><p>Write a <strong>review</strong> of a book you have read. In your review you should:</p><ul><li>briefly describe what the book is about, without giving away the ending</li><li>explain what you liked and what disappointed you</li><li>say whether you would recommend it and to whom</li></ul><p>Write your review in <strong>220-260 words</strong>.</p>',
    points: [
      'Give a clear impression of the book in your opening, with an attractive title for the review',
      'Summarise without spoiling the ending',
      'Support both praise and criticism with specific examples',
      'Use a lively, semi-formal register with a clear recommendation at the end'
    ],
    plan: [
      'Title and opening: begin with a hook or a short verdict. A review is public writing that competes for attention, so the first sentence must make readers want more.',
      'What it is about: give the setting, the main character and the central question in a few lines, and stop before the ending. A summary is only context, so keep it short.',
      'What works: choose one or two strengths and show them with an example. "It was very good" tells readers nothing.',
      'What disappoints: be fair and specific. A balanced review is more credible, and one clear weakness is better than a list of small ones.',
      'Recommendation: say who will enjoy it and who will not, in a closing line that sums up your judgement.'
    ],
    model: [
      '<strong>A Year of Small Rooms: a quiet novel with a loud effect</strong><br>It is rare for a book in which so little seems to happen to keep me reading late into the night, but <em>A Year of Small Rooms</em> managed it.',
      'The novel follows Nora, a translator who rents a different room each season in a different Spanish town, hoping to finish a long-overdue book. As the year passes, her landladies, neighbours and the people she meets in cafés gradually reveal what she is really trying to avoid.',
      'What impressed me most is the writing. The sentences are simple, almost plain, yet they capture exact details, such as the smell of a stairwell after rain or the way a stranger folds a map. The author also resists the temptation to explain Nora\'s feelings, leaving readers to work them out for themselves, which makes the quiet moments surprisingly powerful.',
      'Unfortunately, the middle section drags. Two entire chapters describe journeys that add little to the story, and some minor characters seem to appear only to deliver a piece of advice. I also found the final pages slightly rushed after such a patient build-up, although they were still moving.',
      'Despite these flaws, I would recommend the book to anyone who enjoys character-driven fiction and does not mind a slow pace. Those who need a gripping plot will probably be disappointed. For the rest of us, it is a gentle, thoughtful and memorable read.'
    ],
    notes: [
      { para: 0, text: 'The title contrasts <em>quiet</em> and <em>loud</em>, and the first sentence repeats the surprise (<em>so little seems to happen</em> yet <em>reading late into the night</em>). It gives the verdict immediately and stirs curiosity.' },
      { para: 1, text: '<em>hoping to finish a long-overdue book</em> and <em>what she is really trying to avoid</em> give the situation and the question of the story and stop there. The writer promises a mystery without revealing the answer, which is how to summarise without spoiling.' },
      { para: 2, text: '<em>such as the smell of a stairwell after rain</em> is the specific example that proves the claim about exact details. <em>resists the temptation to explain</em> and <em>leaving readers to work them out</em> praise a technique, not just a feeling.' },
      { para: 3, text: '<em>Unfortunately</em> introduces the criticism, and the reasons are concrete (two chapters, minor characters). <em>slightly rushed … although they were still moving</em> softens the criticism, which keeps the review fair.' },
      { para: 4, text: '<em>Despite these flaws</em> links the criticism to the recommendation, and <em>anyone who enjoys … Those who need … will probably be disappointed</em> tells different readers whether the book is for them, which is the practical purpose of a review.' }
    ],
    language: [
      { h: 'Opening with a hook', items: ['It is rare for a book in which … to …', 'managed it', 'a quiet novel with a loud effect', 'keep me reading late into the night'] },
      { h: 'Summarising without spoiling', items: ['The novel follows …', 'As the year passes, …', 'gradually reveal what …', 'is really trying to avoid'] },
      { h: 'Praising and criticising', items: ['What impressed me most is …', 'resists the temptation to …', 'Unfortunately, the middle section drags.', 'seem to appear only to …'] },
      { h: 'Recommending', items: ['Despite these flaws, …', 'I would recommend … to anyone who …', 'does not mind a slow pace', 'a memorable read'] }
    ]
  }
);
