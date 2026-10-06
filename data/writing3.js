window.C1 = window.C1 || {};
/* Three further writing tasks (a proposal, an essay and a review), added to the existing list. Loaded after data/writing2.js. */
C1.writing.tasks.push(
  {
    id: 'proposal-travel',
    genre: 'proposal',
    unit: null,
    title: 'Making visitor tourism more sustainable',
    level: 'C1',
    min: 220,
    max: 260,
    minutes: 45,
    prompt: '<p>You live in a popular coastal town. Every summer the number of visitors causes problems for residents and for the environment. The town council has invited local people to suggest ways of making tourism more sustainable.</p><p>Write a <strong>proposal</strong> for the council. In your proposal you should:</p><ul><li>explain what problems tourism currently causes</li><li>suggest measures that would make tourism more sustainable</li><li>say what the benefits and costs would be</li></ul><p>Write your proposal in <strong>220-260 words</strong>.</p>',
    points: [
      'Explain the current problems caused by visitors, with evidence',
      'Suggest practical measures and say how each one would work',
      'Say what the benefits and costs would be, and mention a possible drawback',
      'Recommend a next step, using headings and a formal register'
    ],
    plan: [
      'Headings: Introduction / Current situation / Proposed measures / Benefits and costs / Recommendation.',
      'Introduction: one sentence for the purpose, and name the aim (sustainable, not less tourism).',
      'Current situation: invent one or two facts (a percentage rise, a month when the problem peaks) and say who is affected.',
      'Proposed measures: two or three, each answering a problem. Use modals of proposal (would, could, should) and vary the structures.',
      'Benefits and costs: say who gains, who pays, and admit one drawback honestly.',
      'Recommendation: a small, safe next step, such as a pilot.'
    ],
    model: [
      '<strong>Introduction</strong>',
      'The aim of this proposal is to outline how the council could make tourism in Marlow Bay more sustainable, so that visitors continue to support the local economy without eroding what draws them here.',
      '<strong>Current situation</strong>',
      'Visitor numbers have risen by roughly a quarter in five years, and the effects are increasingly visible. Most tourists arrive in July and August, when the harbour car park overflows and residents struggle to reach the town centre. Moreover, because day trippers spend little, the income they generate is modest compared with the pressure they place on footpaths and public toilets.',
      '<strong>Proposed measures</strong>',
      'First, a modest visitor levy of two pounds per night should be introduced for hotel and campsite guests, with the revenue ring-fenced for path repair and public toilets. Second, the council could encourage off-season visits by working with local businesses to offer discounted guided walks and food festivals in spring and autumn. Finally, a park-and-ride service from the edge of town would ease congestion while cutting emissions.',
      '<strong>Benefits and costs</strong>',
      'Together, these measures would ease pressure in the peak weeks and spread demand more evenly through the year, thereby protecting both the coastline and residents’ quality of life. The levy might deter a few budget travellers, but the experience of comparable resorts suggests that any loss would be small. The main expense would be the initial outlay for the shuttle buses, which the levy would gradually offset.',
      '<strong>Recommendation</strong>',
      'I recommend that the council approve a one-year pilot of the levy and the shuttle service, and review the results before deciding whether to make them permanent.'
    ],
    notes: [
      { para: 1, text: '<em>The aim of this proposal is to outline how … could</em> states the purpose in one sentence. The purpose clause <em>so that visitors continue to support … without eroding …</em> shows the aim is balance, not banning tourists, which frames every later measure.' },
      { para: 3, text: '<em>roughly a quarter in five years</em> is a hedged figure: <em>roughly</em> keeps it credible when the numbers are invented, and a precise period makes the problem measurable rather than an impression.' },
      { para: 3, text: '<em>Moreover, because day trippers spend little, …</em> adds a second problem and gives its cause. The contrast <em>modest … compared with the pressure</em> explains WHY the visitors are a net burden, which is what justifies the measures that follow.' },
      { para: 5, text: 'Three measures are signalled with <em>First, … Second, … Finally, …</em>, and each uses a different structure: passive <em>should be introduced</em>, <em>the council could encourage</em>, and <em>would ease</em>. Each answers a problem from paragraph 3: the levy pays for paths and toilets, off-season events reduce the summer peak, and park-and-ride relieves the overflowing car park.' },
      { para: 5, text: '<em>ring-fenced for</em> is precise financial vocabulary: it tells the council the money will not disappear into the general budget. <em>while cutting emissions</em> adds a second benefit with a participle clause.' },
      { para: 7, text: '<em>thereby protecting</em> is a result participle that links the measures to the aim. <em>might deter a few budget travellers</em> is an honest drawback, and <em>suggests that any loss would be small</em> answers it with evidence rather than reassurance.' },
      { para: 7, text: 'The costs are stated as well as the benefits, as the task required: <em>The main expense would be … which the levy would gradually offset</em>. The relative clause shows the cost is manageable.' },
      { para: 9, text: '<em>I recommend that the council approve</em> uses the subjunctive after <em>recommend</em>. A one-year pilot with a review is a modest, realistic next step, which makes the proposal easier to accept.' }
    ],
    language: [
      { h: 'Stating the purpose', items: ['The aim of this proposal is to outline how …', 'so that … without eroding …', 'This proposal sets out measures to …', 'I have been asked to suggest ways of …'] },
      { h: 'Describing the problem', items: ['Visitor numbers have risen by roughly …', 'the pressure placed on …', 'residents struggle to …', 'compared with …', 'the income generated is modest'] },
      { h: 'Travel and tourism vocabulary', items: ['a visitor levy', 'off-season visits', 'day trippers', 'park-and-ride', 'sustainable tourism', 'to ease congestion', 'ring-fenced revenue'] },
      { h: 'Proposing and recommending', items: ['should be introduced', 'the council could encourage …', 'would ease … while cutting …', 'thereby protecting …', 'I recommend that the council approve …', 'a one-year pilot'] }
    ]
  },

  {
    id: 'essay-family-identity',
    genre: 'essay',
    unit: null,
    title: 'What holds a family together?',
    level: 'C1',
    min: 220,
    max: 260,
    minutes: 45,
    prompt: '<p>In your English class you have been discussing family, relationships and identity. Now your teacher has asked you to write an essay.</p><p><strong>Write an essay discussing two of the following points. You should explain which point is more important, giving reasons in support of your opinion.</strong></p><blockquote>A family is held together more by a shared language and shared traditions than by shared values.</blockquote><p>Consider:</p><ul><li>shared language and traditions</li><li>shared values</li><li>(your own idea)</li></ul><p>Write your essay in <strong>220-260 words</strong>.</p>',
    points: [
      'Discuss shared language and traditions, with a reason or example',
      'Discuss shared values (or your own idea), with a reason or example',
      'State which point is more important and explain why',
      'Keep a formal or neutral register throughout'
    ],
    plan: [
      'Decide your opinion first: what really keeps a family close? Everything else must support it.',
      'Introduction: set the context (families spread across countries or generations) and pose the question without copying the statement.',
      'Paragraph 2: the case for language and tradition, with an example (a family meal, grandparents’ stories).',
      'Paragraph 3: the case for values, with an example, and say why tradition alone is not enough.',
      'Optional short paragraph: your own idea (for example, willingness to talk openly).',
      'Conclusion: state which matters more and why, then add a balanced final thought.'
    ],
    model: [
      'In an era of migration and rapid social change, many families find themselves spread across countries, generations and even languages. This raises the question of what truly keeps them united: the customs they inherit or the principles they share.',
      'There is undeniable appeal in the first view. A common language allows grandparents to tell stories to their grandchildren in their own words, and rituals such as a weekly Sunday meal give a family a rhythm and a sense of belonging. Where such practices fade, relatives can drift apart without ever quarrelling.',
      'Nevertheless, tradition alone is a fragile bond. Families have often kept up customs long after they have ceased to mean anything, and a ritual performed out of habit can mask deep resentment. Shared values, by contrast, determine how people treat one another when it matters, whether in forgiving a mistake or in caring for an ageing parent. A household that agrees on honesty and loyalty can survive disagreement over almost everything else, including religion.',
      'A further factor is the willingness to listen. Were relatives to talk openly about their differences, even those who no longer share a language or a faith could remain close.',
      'On balance, I would argue that shared values matter more, since they give traditions their meaning rather than the other way round. That said, the two are rarely in competition: a family that preserves its customs while living by common principles is likely to be the most resilient.'
    ],
    notes: [
      { para: 0, text: '<em>In an era of migration and rapid social change</em> sets a wide context before narrowing to the question. <em>the customs they inherit or the principles they share</em> restates both points of the prompt in new words, with a parallel structure, instead of copying them.' },
      { para: 1, text: '<em>There is undeniable appeal in the first view</em> concedes a point before the essay argues against it, which sounds fair. The two concrete examples (grandparents’ stories, a Sunday meal) show WHY language and tradition create closeness.' },
      { para: 1, text: '<em>Where such practices fade, relatives can drift apart</em> uses <em>where</em> as a conditional. <em>without ever quarrelling</em> is a precise point: the risk is gradual distance, not conflict, which is the strongest argument for the first view.' },
      { para: 2, text: '<em>Nevertheless, tradition alone is a fragile bond</em> pivots to the opposing argument at once. The reason follows in the next sentence: a custom can survive <em>long after it has ceased to mean anything</em>, so it cannot be what truly unites people.' },
      { para: 2, text: '<em>Shared values, by contrast, determine how people treat one another when it matters</em> contrasts the two points directly. The example, <em>forgiving a mistake</em> or <em>caring for an ageing parent</em>, moves from the abstract to real situations, and <em>can survive disagreement over almost everything else</em> shows how strong the bond is.' },
      { para: 3, text: 'The short own-idea paragraph uses an inverted conditional, <em>Were relatives to talk openly</em>, to predict a result. Keeping it brief stops it from distracting from the two main points the task asked for.' },
      { para: 4, text: '<em>I would argue that shared values matter more, since they give traditions their meaning</em> answers the task and gives a reason. <em>That said, the two are rarely in competition</em> balances the conclusion, which is what a C1 essay needs instead of a one-sided slogan.' }
    ],
    language: [
      { h: 'Introducing the question', items: ['In an era of …, many families …', 'This raises the question of what truly …', 'the customs they inherit or the principles they share', 'Few topics divide opinion as sharply as …'] },
      { h: 'Conceding and challenging', items: ['There is undeniable appeal in …', 'Nevertheless, … alone is a fragile bond.', 'by contrast, …', 'can mask deep resentment', 'long after they have ceased to mean anything'] },
      { h: 'Family and identity vocabulary', items: ['a sense of belonging', 'to drift apart', 'shared values', 'to pass on traditions', 'loyalty', 'an ageing parent', 'mutual respect'] },
      { h: 'Concluding with balance', items: ['On balance, I would argue that …', 'since they give … their meaning', 'That said, the two are rarely in competition.', 'is likely to be the most resilient', 'Were … to …, …'] }
    ]
  },

  {
    id: 'review-sport',
    genre: 'review',
    unit: null,
    title: 'A review of a local sporting event',
    level: 'C1',
    min: 220,
    max: 260,
    minutes: 45,
    prompt: '<p>An English-language magazine for visitors to your region is asking readers to send in reviews of local sporting events and traditions that visitors could enjoy.</p><p>Write a <strong>review</strong> of a sporting event or sporting tradition you know well. In your review you should:</p><ul><li>describe what the event is and what happens</li><li>explain what is good and what is not so good about it</li><li>say whether you would recommend it, and to whom</li></ul><p>Write your review in <strong>220-260 words</strong>.</p>',
    points: [
      'Describe the event so that a visitor can picture it',
      'Give both strengths and weaknesses, with examples',
      'Show personal impressions and the atmosphere',
      'Recommend the event to a type of reader, with practical advice'
    ],
    plan: [
      'Choose an event you know well, so that details come easily (real or invented).',
      'Write a catchy title that sums up the experience.',
      'Paragraph 1: hook, then what, where and when, and your own experience of it.',
      'Paragraph 2: the main attraction, described vividly.',
      'Paragraph 3: the weaknesses, said fairly, with specific examples.',
      'Paragraph 4: the atmosphere, and why the weaknesses do not spoil it.',
      'Final paragraph: overall verdict, who it suits, and practical tips.'
    ],
    model: [
      '<strong>Oars, bunting and a little rivalry: the Riverside Regatta</strong>',
      'Each September, the quiet market town of Ashford fills with spectators for a rowing regatta that has been held, with only brief interruptions, since 1887. Having watched it for a decade, I can say that it combines serious competition with the atmosphere of a village fête.',
      'The racing itself is the main draw. Crews from schools, clubs and local firms sprint along a 500-metre course past the old stone bridge, and the final, in which rival towns compete for a battered silver trophy, is genuinely thrilling. Equally appealing is the easy access: spectators can stand a few metres from the water and hear the coxes shouting.',
      'Not everything runs smoothly, however. Facilities are stretched, with queues for the refreshment stalls often exceeding twenty minutes, and the lack of seating means that elderly visitors may struggle to see anything. The commentary, moreover, is so poorly amplified that it is hardly audible from more than a few metres away.',
      'Even so, these shortcomings are outweighed by the warmth of the occasion. Local families picnic on the bank, children wave flags, and the losing crews are cheered as loudly as the winners.',
      'All in all, I would recommend the regatta to anyone who enjoys a relaxed day out, particularly families with children. Bring a folding chair, arrive early to secure a good spot and, if possible, travel by train, since parking is limited.'
    ],
    notes: [
      { para: 0, text: 'A catchy title built from a list of three images and a colon. <em>a little rivalry</em> hints at the friendly competition described later, so the title already gives the reader a feel for the event.' },
      { para: 1, text: '<em>that has been held, with only brief interruptions, since 1887</em> uses the present perfect passive for an unbroken tradition. <em>Having watched it for a decade, I can say that</em> gives the writer authority to judge.' },
      { para: 2, text: '<em>The racing itself is the main draw</em> puts the main attraction first. The relative clause <em>in which rival towns compete for a battered silver trophy</em> adds a vivid detail, and <em>Equally appealing is …</em> uses inversion to add a second strength.' },
      { para: 3, text: '<em>Not everything runs smoothly, however</em> is a tactful way to introduce criticism. Specific examples (<em>queues … exceeding twenty minutes</em>, <em>the lack of seating</em>, <em>poorly amplified</em>) make the criticism fair and useful, rather than a general complaint.' },
      { para: 4, text: '<em>Even so, these shortcomings are outweighed by the warmth of the occasion</em> balances the previous paragraph and says WHY the verdict stays positive. The final detail, <em>the losing crews are cheered as loudly as the winners</em>, shows the atmosphere rather than just naming it.' },
      { para: 5, text: 'The verdict names the readers it suits (<em>anyone who enjoys a relaxed day out, particularly families</em>). The imperatives, <em>Bring a folding chair, arrive early</em>, are acceptable in a review because the reader is addressed directly, and each tip answers a weakness from paragraph 3 or a practical problem, with <em>since parking is limited</em> as the reason.' }
    ],
    language: [
      { h: 'Describing a sporting event', items: ['a tradition dating back to …', 'fills with spectators', 'a thrilling final', 'a lively atmosphere', 'the main draw', 'to cheer on the crews'] },
      { h: 'Strong adjectives', items: ['thrilling', 'relaxed', 'overcrowded', 'poorly amplified', 'unmissable', 'battered', 'welcoming'] },
      { h: 'Balancing positives and negatives', items: ['Not everything runs smoothly, however.', 'Even so, … are outweighed by …', 'The only drawback is …', 'Equally appealing is …', 'moreover, …'] },
      { h: 'Recommending', items: ['I would recommend … to anyone who …', 'particularly families with children', 'arrive early to secure a good spot', 'It is well worth a visit if you …', 'since parking is limited'] }
    ]
  }
);
