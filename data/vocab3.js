window.C1 = window.C1 || {}; C1.vocab = C1.vocab || [];
(function () {
  const pv = (phrase, meaning, ex, logic) => ({ phrase, kind: 'phrasal verb', meaning, ex, logic: logic || '' });
  const co = (phrase, meaning, ex, logic) => ({ phrase, kind: 'collocation', meaning, ex, logic: logic || '' });
  const id = (phrase, meaning, ex, logic) => ({ phrase, kind: 'idiom', meaning, ex, logic: logic || '' });
  const ex = (phrase, meaning, ex, logic) => ({ phrase, kind: 'expression', meaning, ex, logic: logic || '' });

  const groups = [
    {
      id: 'topic-crime', title: 'Crime, law and justice', short: 'Courts, punishment, prevention and fairness.',
      section: 'Topic vocabulary',
      idea: `<p>Crime is a common theme in discussion questions and essays about society. The chunks here follow the <strong>path of a case</strong>: first the act and its consequences (<em>get away with, turn a blind eye</em>), then the legal process (<em>press charges, stand trial, reach a verdict</em>), then the outcome (<em>serve a sentence, community service</em>) and finally the <strong>wider debate</strong> about prevention and fairness (<em>act as a deterrent, crack down on, miscarriage of justice</em>). Use them to argue, not just to narrate.</p>`,
      cards: [
        co('press charges', 'to make an official accusation against someone so that they are prosecuted', 'The shop owner decided not to [[press charges]] against the teenager.', 'You push the accusation forward to the authorities. The verb is always <em>press</em>.'),
        co('stand trial', 'to be judged in a court of law', 'The former director will [[stand trial]] on charges of fraud next spring.', 'The accused literally stands before the court. Followed by <em>for</em> or <em>on charges of</em>.'),
        co('reach a verdict', 'to decide formally whether someone is guilty or not', 'The jury took nine hours to [[reach a verdict]].', 'A verdict is the final decision; you "arrive" at it after discussion.'),
        co('plead guilty', 'to say officially in court that you committed the crime', 'He [[pleaded guilty]] to dangerous driving and was fined.', 'Opposite: <em>plead not guilty</em>. Past tense is often <em>pleaded</em> (BrE), <em>pled</em> (AmE).'),
        co('serve a sentence', 'to spend time in prison as punishment', 'She [[served a sentence]] of three years for embezzlement.', 'You "serve" the time like a duty. Also <em>serve time</em> (informal).'),
        co('community service', 'unpaid work done for society instead of prison', 'The court gave him 200 hours of [[community service]].', 'The punishment is paid back to the community, not to the state.'),
        co('a miscarriage of justice', 'a situation in which the legal system makes an unfair or wrong decision', 'Her conviction was later recognised as [[a miscarriage of justice]].', 'Justice is "carried" badly, like a failed pregnancy (<em>miscarriage</em>). Common in news reports.'),
        ex('beyond reasonable doubt', 'so clearly proved that no sensible person could doubt it', 'The prosecution must prove guilt [[beyond reasonable doubt]].', 'The legal standard in criminal cases. Fixed order: do not say "without reasonable doubt" in this sense.'),
        co('a suspended sentence', 'a prison sentence that is not served unless the person offends again', 'The judge gave her [[a suspended sentence]] because it was her first offence.', 'The punishment is "hung up" (suspended) and waits to fall. Compare <em>serve a sentence</em>.'),
        pv('crack down on', 'to deal very firmly with something illegal or undesirable', 'The police have promised to [[crack down on]] street theft.', 'Hook: authority "cracks" down like a whip. Noun: <em>a crackdown</em>.'),
        id('turn a blind eye to', 'to pretend not to notice something wrong', 'Officials [[turned a blind eye to]] the illegal dumping of waste.', 'You look away on purpose, so you do not have to act.'),
        co('act as a deterrent', 'to discourage people from doing something by fear of the consequences', 'Harsh penalties may [[act as a deterrent]] to potential offenders.', 'Deter = frighten away. Preposition: <em>a deterrent to / against</em> something.'),
        co('a law-abiding citizen', 'a person who obeys the law', 'Innocent, [[law-abiding citizens]] should not fear surveillance, supporters argue.', '<em>Abide by</em> = obey. A hyphenated adjective before the noun.'),
        co('petty crime', 'minor offences such as small thefts or vandalism', 'Youth clubs help to reduce [[petty crime]] in poorer districts.', 'Petty = small and unimportant. Uncountable; opposite <em>serious / violent crime</em>.')
      ]
    },
    {
      id: 'topic-media', title: 'Media, news and fame', short: 'Headlines, social media, reputation and privacy.',
      section: 'Topic vocabulary',
      idea: `<p>Questions about the media usually ask whether it informs or manipulates, and whether fame is worth its price. The chunks are grouped by <strong>how information travels</strong> (<em>breaking news, go viral, media coverage</em>), <strong>how it is shaped</strong> (<em>sensationalise, bias, spread misinformation</em>) and <strong>what it does to people</strong> (<em>in the public eye, invasion of privacy, overnight sensation</em>). Combine one from each group for a balanced paragraph.</p>`,
      cards: [
        id('hit the headlines', 'to become the main subject of news reports', 'The scandal [[hit the headlines]] on Monday and stayed there all week.', 'A headline is the big title on the front page; you land on it.'),
        co('breaking news', 'news that has just happened and is reported immediately', 'We interrupt this programme with some [[breaking news]].', 'Uncountable: <em>a piece of breaking news</em>, never "a breaking news".'),
        co('clickbait', 'online headlines designed to make people click, often exaggerated', 'Most of the articles on that site are just [[clickbait]].', 'Bait on a hook: it attracts clicks. Uncountable noun.'),
        co('news outlet', 'an organisation that publishes or broadcasts news', 'Several major [[news outlets]] reported the story at once.', 'An outlet is a channel through which news flows out to the public.'),
        co('the tabloid press', 'newspapers that focus on celebrities and scandal rather than serious news', 'The [[tabloid press]] camped outside her house for weeks.', 'Opposite: <em>the quality press</em>. A <em>tabloid</em> originally meant a small page format.'),
        co('the 24-hour news cycle', 'constant news reporting that leaves little time for reflection', 'The [[24-hour news cycle]] pushes reporters to publish before checking facts.', 'News goes round and round, all day. Always with <em>the</em>.'),
        co('press freedom', 'the right of journalists to report without government control', 'In a democracy, [[press freedom]] is a basic safeguard against corruption.', 'The press = journalists in general. Also <em>freedom of the press</em>.'),
        co('an invasion of privacy', 'an act that interferes with someone\'s private life without permission', 'Publishing the photographs was clearly [[an invasion of privacy]].', 'Someone "invades" your private territory, like an army.'),
        co('in the public eye', 'often seen, known and discussed by ordinary people', 'Children who grow up [[in the public eye]] rarely have a normal childhood.', 'Many eyes are looking at you. Typical of actors, politicians, athletes.'),
        co('an overnight sensation', 'someone who becomes famous very suddenly', 'The singer became [[an overnight sensation]] after one television appearance.', 'Often ironic: the "overnight" success usually followed years of effort.'),
        ex('fifteen minutes of fame', 'a brief period of public attention', 'Most reality-show contestants get only [[fifteen minutes of fame]].', 'From a famous remark that everyone will be world-famous for a quarter of an hour.'),
        co('fact-check', 'to examine a statement to see whether it is true', 'Journalists now [[fact-check]] politicians\' speeches almost as they are being delivered.', 'A fact is checked against evidence. Also a noun: <em>a fact-check</em>.'),
        co('sensationalise a story', 'to present events in an exaggerated way to shock or excite people', 'Some outlets [[sensationalise]] stories to attract more readers.', 'Sensation = strong reaction. Also spelled <em>sensationalize</em> (AmE).'),
        co('media bias', 'unfair favouring of one side in news reporting', 'Readers should be alert to [[media bias]] when they compare sources.', 'Bias = leaning to one side. Preposition: <em>bias against / towards / in favour of</em>.')
      ]
    },
    {
      id: 'topic-consumer', title: 'Shopping, advertising and consumer society', short: 'Spending, persuasion, brands and waste.',
      section: 'Topic vocabulary',
      idea: `<p>Shopping and advertising lead to opinion questions: <em>Are we too materialistic? Does advertising manipulate us?</em> The chunks are organised into three steps. <strong>Persuasion</strong> (<em>targeted advertising, celebrity endorsement, brand loyalty</em>), <strong>the act of buying</strong> (<em>impulse buying, shop around, splash out on, ripped off</em>) and <strong>the consequences</strong> (<em>status symbol, throwaway society, planned obsolescence</em>). Use the third group to move from description to evaluation.</p>`,
      cards: [
        co('targeted advertising', 'adverts shown to specific people based on information about them', '[[Targeted advertising]] relies on data about what we search for and buy.', 'The advert has a "target", like an arrow. Related: <em>a target audience</em>.'),
        co('celebrity endorsement', 'a famous person publicly supporting a product, usually for payment', 'A single [[celebrity endorsement]] can double a brand\'s sales.', 'To endorse = to publicly approve. Verb: <em>endorse a product</em>.'),
        co('brand loyalty', 'the habit of buying the same make again and again', 'Teenagers often show strong [[brand loyalty]] to a particular trainer maker.', 'Loyal like a friend. Uncountable. Collocates with <em>build, foster, break</em>.'),
        co('impulse buying', 'purchasing things suddenly without planning', 'Sweets by the checkout are designed to encourage [[impulse buying]].', 'An impulse is a sudden urge. Also <em>an impulse buy / purchase</em>.'),
        pv('shop around', 'to compare prices and quality in several places before buying', 'It pays to [[shop around]] before you sign a phone contract.', 'You move around between shops. Intransitive: no object follows.'),
        pv('splash out on', 'to spend a lot of money on something enjoyable', 'They [[splashed out on]] a luxury hotel for their anniversary.', 'Like money splashing out of your pocket. Informal.'),
        id('a rip-off', 'something that costs far more than it is worth', 'Ten pounds for a bottle of water is [[a rip-off]].', 'Someone "rips off" your money. Verb: <em>be ripped off</em> = be cheated on price.'),
        co('a status symbol', 'a possession that shows high social position', 'In some cities, a large car is still seen as [[a status symbol]].', 'It is a symbol of your status in society.'),
        id('keep up with the Joneses', 'to try to own what your neighbours or friends own, to avoid seeming worse off', 'Many families get into debt trying to [[keep up with the Joneses]].', 'From a comic strip about a family, the Joneses, whose neighbours must always match them.'),
        ex('retail therapy', 'shopping done to cheer yourself up', 'After a hard week, she went for some [[retail therapy]].', 'Humorous: shopping is treated as medicine for your mood. Uncountable.'),
        co('planned obsolescence', 'deliberately making products that will soon become useless or outdated', 'Critics accuse phone makers of [[planned obsolescence]].', 'Obsolete = no longer used. The product is "planned" to die.'),
        co('a throwaway society', 'a culture in which things are used briefly and then thrown away', 'We live in [[a throwaway society]], where repairing is rarer than replacing.', 'Adjective from the verb <em>throw away</em>. Compare <em>disposable income</em>.'),
        pv('be taken in by', 'to be deceived by', 'Many shoppers are [[taken in by]] "limited offer" labels.', 'Something takes you inside its story. Passive form is the usual one.'),
        co('consumer demand', 'the desire of buyers for a product or service', 'Rising [[consumer demand]] for organic food has changed farming.', 'Demand is uncountable here. Collocates: <em>meet, boost, fall in</em> demand.')
      ]
    },
    {
      id: 'topic-arts', title: 'Entertainment and the arts', short: 'Films, books, performance and critics.',
      section: 'Topic vocabulary',
      idea: `<p>For Speaking and Writing you need language to <strong>evaluate</strong> an experience, not just name it. The chunks are grouped by role. <em>The work</em> (<em>a gripping plot, a masterpiece, thought-provoking</em>), <em>the performers</em> (<em>steal the show, stage fright, take centre stage</em>) and <em>the audience and critics</em> (<em>rave reviews, critically acclaimed, live up to the hype, standing ovation</em>). A review has these three voices, so you can build one from these groups.</p>`,
      cards: [
        co('critically acclaimed', 'praised by professional reviewers', 'Her [[critically acclaimed]] debut novel won two awards.', 'Acclaim = public praise. Adverb + participle, like <em>widely admired</em>.'),
        co('rave reviews', 'extremely enthusiastic critical opinions', 'The play received [[rave reviews]] when it opened in London.', 'To rave = to speak with great excitement. Usually plural.'),
        co('a box-office hit', 'a film or show that earns a lot of money from tickets', 'The sequel turned out to be [[a box-office hit]].', 'The box office is where tickets are sold. Opposite: <em>a box-office flop</em>.'),
        id('steal the show', 'to attract more attention than the other performers', 'The child actor [[stole the show]] with a hilarious scene.', 'You "steal" the audience\'s attention from the stars.'),
        id('live up to the hype', 'to be as good as the publicity claimed', 'Few blockbusters manage to [[live up to the hype]].', 'Hype = exaggerated publicity. Also <em>live up to expectations</em>.'),
        co('a gripping plot', 'a story that holds your attention completely', 'The novel has [[a gripping plot]], and I read it in one night.', 'It "grips" you like a hand. Other adjectives: <em>complex, predictable, far-fetched</em>.'),
        co('thought-provoking', 'making people think seriously about a subject', 'It is a funny but deeply [[thought-provoking]] documentary.', 'To provoke = to cause a reaction. Hyphenated adjective, often with <em>deeply</em>.'),
        co('a masterpiece', 'an outstanding work of art', 'Many critics regard the film as [[a masterpiece]] of modern cinema.', 'Originally the work that proved a craftsman was a master. Compare <em>a tour de force</em>.'),
        co('take centre stage', 'to become the most important focus of attention', 'In the final act, the young pianist [[takes centre stage]].', 'Centre of the stage = where everyone looks. AmE spelling <em>center</em>. Also used outside the theatre.'),
        co('stage fright', 'nervousness felt before performing in public', 'Even experienced actors can suffer from [[stage fright]].', 'Fright = fear on the stage. Uncountable.'),
        co('a standing ovation', 'applause given by an audience that stands up', 'The cast received [[a standing ovation]] at the end of the show.', 'An ovation is enthusiastic applause. Verb: <em>give someone a standing ovation</em>.'),
        co('a cult following', 'a small but extremely devoted group of fans', 'The cartoon series has built up [[a cult following]] among students.', 'Like a cult, fans share a strong, special devotion. Also <em>a cult classic</em>.'),
        pv('be moved by', 'to feel strong emotion because of something', 'I was deeply [[moved by]] the final scene.', 'Emotion "moves" you from your normal state. Adverbs: <em>deeply, profoundly</em>.'),
        co('an ensemble cast', 'a group of actors who share the importance equally', 'The film features [[an ensemble cast]] of well-known British actors.', 'Ensemble = group working together. No single star dominates.')
      ]
    },
    {
      id: 'topic-personality', title: 'Personality and character', short: 'Describing people, strengths and flaws.',
      section: 'Topic vocabulary',
      idea: `<p>Describing people is easy with B1 adjectives (<em>nice, friendly</em>) but C1 needs precision. Here the chunks go from <strong>positive traits</strong> (<em>down-to-earth, level-headed, open-minded</em>) through <strong>neutral or mixed traits</strong> (<em>set in one's ways, strong-willed, a people person</em>) to <strong>negative traits</strong> (<em>quick-tempered, big-headed, two-faced</em>). Many are compound adjectives or idioms built on a <strong>body part</strong>: head, heart, skin, tongue. The image behind each one is what makes it easy to remember.</p>`,
      cards: [
        co('down-to-earth', 'practical and realistic, without pretending to be important', 'Despite her fame, she is remarkably [[down-to-earth]].', 'Feet on the ground, not in the clouds. A compliment about attitude.'),
        co('level-headed', 'calm and sensible, especially in a crisis', 'A [[level-headed]] pilot landed the plane safely.', 'Your head stays level, not tilted by emotion.'),
        co('open-minded', 'willing to consider new or different ideas', 'Good teachers stay [[open-minded]] about unusual answers.', 'Your mind is open, not closed. Opposite: <em>narrow-minded, closed-minded</em>.'),
        co('strong-willed', 'determined to do what you want, even if others disagree', 'Their [[strong-willed]] daughter refused to change her mind.', 'Will = power to decide. Neutral: can be admiring or critical.'),
        co('thick-skinned', 'not easily upset by criticism', 'Politicians need to be [[thick-skinned]].', 'Thick skin protects you from hurt. Opposite: <em>thin-skinned</em>, over-sensitive.'),
        co('quick-tempered', 'easily made angry', 'My [[quick-tempered]] uncle shouts at the slightest mistake.', 'Your temper "starts" quickly.'),
        id('wear one\'s heart on one\'s sleeve', 'to show your feelings openly', 'He can\'t hide anything; he [[wears his heart on his sleeve]].', 'The heart is displayed on the outside, where everyone can see it.'),
        id('have a short fuse', 'to lose your temper very quickly', 'Be careful what you say; he [[has a short fuse]].', 'A short fuse burns quickly, then the explosion comes.'),
        id('be set in one\'s ways', 'to be unwilling to change habits or opinions', 'My grandfather is [[set in his ways]] and refuses to use a mobile phone.', 'Your habits are "set" like concrete.'),
        id('a people person', 'someone who enjoys being with others and is good at it', 'She is [[a people person]], which is ideal for customer service.', 'Informal. Opposite is often <em>a loner</em> or <em>an introvert</em>.'),
        co('big-headed', 'having too high an opinion of your own importance', 'He became [[big-headed]] after winning the award.', 'The head is swollen with pride. Informal. Near synonym: <em>conceited</em>.'),
        co('two-faced', 'saying one thing to someone\'s face and another behind their back', 'I don\'t trust her; she is [[two-faced]].', 'She shows a different face to different people.'),
        pv('come across as', 'to give a particular impression', 'He [[comes across as]] shy, but he is actually very confident.', 'Your image "crosses" to the other person. Followed by an adjective or <em>a</em> + noun.'),
        pv('bring out the best in', 'to make someone show their best qualities', 'A good coach [[brings out the best in]] every player.', 'The best was inside; you bring it out. Opposite: <em>bring out the worst in</em>.')
      ]
    }
  ];

  C1.vocab.push(...groups);
})();
