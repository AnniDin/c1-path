window.C1 = window.C1 || {}; C1.vocab = C1.vocab || [];
(function () {
  const pv = (phrase, meaning, ex, logic) => ({ phrase, kind: 'phrasal verb', meaning, ex, logic: logic || '' });
  const co = (phrase, meaning, ex, logic) => ({ phrase, kind: 'collocation', meaning, ex, logic: logic || '' });
  const id = (phrase, meaning, ex, logic) => ({ phrase, kind: 'idiom', meaning, ex, logic: logic || '' });
  const ex = (phrase, meaning, ex, logic) => ({ phrase, kind: 'expression', meaning, ex, logic: logic || '' });

  const groups = [
    {
      id: 'topic-travel', title: 'Travel and transport', short: 'Commuting, flights, congestion and journeys.',
      section: 'Topic vocabulary',
      idea: `<p>Transport questions often ask how to make cities and journeys <strong>better, cheaper or greener</strong>. The chunks here cover <strong>daily travel</strong> (<em>rush-hour traffic, commuter belt, ease congestion, a congestion charge</em>), <strong>long-distance trips</strong> (<em>a connecting flight, baggage allowance, suffer from jet lag, touch down</em>) and <strong>practical situations</strong> (<em>cause major disruption, pull over, see someone off, en route to</em>). Use <em>hit the road</em> and <em>draw up an itinerary</em> when you describe your own trips.</p>`,
      cards: [
        co('rush-hour traffic', 'the heavy traffic at the times when most people travel to or from work', 'I leave at six to avoid the [[rush-hour traffic]].', 'The "rush" is the busy period, which is not literally one hour. Compare <em>off-peak</em>.'),
        co('ease congestion', 'to make traffic or crowding less severe', 'New tram lines should [[ease congestion]] in the city centre.', 'To ease = to make less painful or tight. Also <em>reduce / alleviate congestion</em>.'),
        co('a congestion charge', 'a fee drivers pay to enter a busy part of a city', 'The council introduced [[a congestion charge]] to discourage unnecessary car journeys.', 'You pay for adding to the congestion. Used with <em>introduce, pay, scrap</em>.'),
        co('a connecting flight', 'a flight that you take after landing, to continue the same journey', 'We missed [[a connecting flight]] in Frankfurt because the first plane was late.', 'The second flight connects with the first. Compare <em>a direct flight</em>.'),
        co('baggage allowance', 'the amount of luggage an airline lets you take', 'Budget airlines often have a very small [[baggage allowance]].', 'An allowance is the amount you are permitted. Also <em>luggage allowance</em>.'),
        co('cause major disruption', 'to seriously interrupt normal services or plans', 'Heavy snow [[caused major disruption]] to rail services across the north.', 'Disruption is uncountable here. Other adjectives: <em>severe, widespread, minor</em>.'),
        co('suffer from jet lag', 'to feel tired and confused because you have crossed time zones', 'I always [[suffer from jet lag]] for days after flying to Asia.', 'Your body clock lags behind local time. Do not say "have a jet lag".'),
        co('draw up an itinerary', 'to prepare a detailed plan of a journey', 'We [[drew up an itinerary]] covering six cities in ten days.', 'An itinerary lists places and times in order. Also <em>a tight / packed itinerary</em>.'),
        pv('touch down', 'to land (of an aircraft)', 'The plane [[touched down]] twenty minutes ahead of schedule.', 'The wheels touch the ground. Noun: <em>a touchdown</em>. Opposite: <em>take off</em>.'),
        pv('pull over', 'to move a vehicle to the side of the road and stop', 'The police officer signalled for her to [[pull over]].', 'You pull the car towards the side. Can also be transitive: <em>pull the car over</em>.'),
        pv('see someone off', 'to go with someone to the station or airport to say goodbye', 'Her whole family came to [[see her off]] at the airport.', 'You watch them leave. Not the same as <em>see off an opponent</em> (defeat).'),
        id('hit the road', 'to start a journey, especially by car', 'It is getting late, so we should [[hit the road]] before the traffic builds up.', 'Informal. The road is where your trip begins.'),
        ex('en route to', 'on the way to a place', 'The delegation stopped in Dubai [[en route to]] Singapore.', 'Borrowed from French. It can also be used without <em>to</em>: <em>we were en route</em>.'),
        co('the commuter belt', 'the towns and villages around a city where many people live and travel into the city to work', 'Many families move to [[the commuter belt]] for cheaper housing.', 'A belt is a ring around the city. Related: <em>commute, commuter train</em>.')
      ]
    },
    {
      id: 'topic-tourism', title: 'Tourism and holidays', short: 'Resorts, crowds, local culture and relaxing.',
      section: 'Topic vocabulary',
      idea: `<p>Tourism questions weigh <strong>benefits against costs</strong>. First, the kinds of holiday and place (<em>package holiday, self-catering accommodation, tourist hotspot, off the beaten track</em>), then the effects of crowds (<em>peak season, mass tourism, tourist trap, a World Heritage Site</em>) and finally the personal side: what holidays do for us (<em>get away from it all, recharge your batteries, soak up the atmosphere, a relaxed pace of life, rough it</em>). A good answer links the economic and the personal side.</p>`,
      cards: [
        id('off the beaten track', 'in a place that few people visit', 'We found a tiny village [[off the beaten track]] and had it to ourselves.', 'A "beaten track" is a path worn by many feet; you avoid it. AmE often says <em>off the beaten path</em>.'),
        co('peak season', 'the time of year when a place is busiest and most expensive', 'Hotel prices double in [[peak season]].', 'Peak = highest point. Opposite: <em>low / off season</em>.'),
        co('package holiday', 'a holiday in which travel and accommodation are sold together at one price', 'They booked a cheap [[package holiday]] to the Canaries.', 'Everything comes in one "package". AmE often says <em>vacation package</em>.'),
        co('self-catering accommodation', 'a rented flat or house where you prepare your own meals', 'We chose [[self-catering accommodation]] because we have two small children.', 'You cater (supply food) for yourself. Compare <em>half board</em> and <em>full board</em>.'),
        co('a tourist trap', 'a place that attracts many tourists and is overpriced and disappointing', 'The restaurant by the cathedral is [[a tourist trap]]; walk two streets away instead.', 'Visitors are "caught" and lose money. Informal and critical.'),
        co('mass tourism', 'tourism on a very large scale, often damaging to a place', '[[Mass tourism]] has pushed up rents and changed the character of the old town.', 'Mass = very large numbers. Compare <em>sustainable tourism</em>.'),
        co('a tourist hotspot', 'a place that is very popular with tourists', 'The island has become [[a tourist hotspot]] in less than a decade.', 'A hotspot is a place of intense activity.'),
        id('get away from it all', 'to go somewhere quiet to escape daily stress and routine', 'We rented a cabin in the mountains to [[get away from it all]].', '"It all" means work, noise and worries. Often used as <em>a chance to get away from it all</em>.'),
        co('soak up the atmosphere', 'to enjoy and absorb the feeling of a place', 'We spent the evening in the square, [[soaking up the atmosphere]].', 'Like a sponge absorbing liquid. Also <em>soak up the sun</em>.'),
        co('a relaxed pace of life', 'a way of living that is calm and unhurried', 'Visitors love the island for its [[relaxed pace of life]].', 'Pace = speed. Opposite: <em>the fast pace of city life</em>.'),
        co('a whistle-stop tour', 'a very fast visit to several places', 'They did [[a whistle-stop tour]] of Italy in a week.', 'The image is a train that stops only briefly at each station. Follow with <em>of</em> + places.'),
        co('a World Heritage Site', 'a place protected internationally for its cultural or natural importance', 'The ancient city was declared [[a World Heritage Site]] in 1987.', 'Capital letters in the official name. Often shortened to <em>a heritage site</em>.'),
        id('recharge your batteries', 'to rest so that you feel energetic again', 'A week of doing nothing was just what I needed to [[recharge my batteries]].', 'You are like a phone that needs power.'),
        id('rough it', 'to live in basic, uncomfortable conditions for a while', 'We decided to [[rough it]] and sleep in a tent for the whole trip.', 'Informal. Rough = lacking comfort. Mostly used for choosing simple conditions on purpose.')
      ]
    },
    {
      id: 'topic-family', title: 'Family and relationships', short: 'Upbringing, closeness, conflict and generations.',
      section: 'Topic vocabulary',
      idea: `<p>Family topics appear in Speaking and in essays on how society is changing. The chunks move from <strong>structure</strong> (<em>the extended family, a close-knit family, the generation gap</em>) to <strong>upbringing and resemblance</strong> (<em>a strict upbringing, run in the family, a chip off the old block, the black sheep of the family</em>) and then <strong>how relationships work</strong> (<em>get on like a house on fire, bury the hatchet, fall out with, drift apart, lean on, sibling rivalry</em>). <em>Blood is thicker than water</em> is useful in a conclusion.</p>`,
      cards: [
        co('a close-knit family', 'a family whose members are very close and support each other', 'She grew up in [[a close-knit family]] where everyone ate together every Sunday.', 'Knit = joined tightly, like wool. Also <em>a close-knit community</em>.'),
        co('a strict upbringing', 'the way a child is raised with firm rules and discipline', 'Despite her [[strict upbringing]], she became a very free-thinking adult.', 'Upbringing = the way you were raised. Other adjectives: <em>sheltered, privileged, religious</em>.'),
        id('run in the family', 'to be a quality or ability found in several members of a family', 'Musical talent seems to [[run in the family]]: her mother and brother both play professionally.', 'The quality "runs" down the generations. Also used for illnesses.'),
        id('get on like a house on fire', 'to become friends very quickly and very well', 'My sister and my new flatmate [[got on like a house on fire]].', 'Positive meaning: the friendship develops fast and strongly.'),
        pv('fall out with', 'to have an argument and stop being friendly with someone', 'He [[fell out with]] his brother over the inheritance.', 'Noun: <em>a falling-out</em>. Opposite: <em>make up</em>.'),
        co('the generation gap', 'the difference in attitudes and understanding between younger and older people', 'Technology has widened [[the generation gap]] in many families.', 'A gap = empty space between two groups. Verbs: <em>bridge, widen, narrow</em>.'),
        co('sibling rivalry', 'competition and jealousy between brothers and sisters', '[[Sibling rivalry]] is normal, but parents should avoid comparing their children.', 'Sibling = brother or sister. Fairly formal, mainly in writing.'),
        co('the extended family', 'relatives beyond parents and children, such as grandparents, aunts and cousins', 'In many cultures [[the extended family]] lives close together and shares childcare.', 'Compare <em>the nuclear family</em> (parents and children only).'),
        id('blood is thicker than water', 'family relationships are stronger than other ties', 'They argue constantly, but [[blood is thicker than water]] when anyone needs help.', 'Blood stands for family. A proverb, usually used as a full sentence.'),
        id('the black sheep of the family', 'a member of a family who is regarded as a disgrace or as different from the others', 'As the only one who dropped out of university, he was [[the black sheep of the family]].', 'A black sheep stands out in a white flock. Also <em>the black sheep</em> alone.'),
        id('a chip off the old block', 'a child who is very like one of its parents', 'He loves cooking just like his father; he is [[a chip off the old block]].', 'A piece of the same material. Usually said of a son with his father, but used more widely now.'),
        pv('drift apart', 'to gradually become less close', 'After university the friends [[drifted apart]] and now meet once a year.', 'Slow, without a big argument. Compare <em>grow apart</em>.'),
        id('bury the hatchet', 'to end a quarrel and become friendly again', 'After years of silence, the two cousins finally [[buried the hatchet]].', 'Informal. Often used when families or friends settle an old disagreement.'),
        pv('lean on', 'to depend on someone for support', 'During her illness she [[leaned on]] her sisters for emotional support.', 'Like leaning on a wall for support.')
      ]
    },
    {
      id: 'topic-identity', title: 'Identity, migration and language', short: 'Belonging, culture, moving abroad and learning languages.',
      section: 'Topic vocabulary',
      idea: `<p>This topic links <strong>who we are</strong> with <strong>where we live and which languages we speak</strong>. The chunks cover identity (<em>a sense of belonging, cultural identity, a melting pot, an ethnic minority</em>), the experience of moving (<em>an economic migrant, an asylum seeker, culture shock, put down roots, fit in, integrate into society</em>) and language (<em>a lingua franca, a language barrier, get by in, an endangered language</em>). In essays, remember that <em>economic migrant</em> and <em>asylum seeker</em> are not the same thing.</p>`,
      cards: [
        co('a sense of belonging', 'the feeling of being accepted as part of a group or place', 'Clubs and festivals give newcomers [[a sense of belonging]].', 'To belong = to be part of. Verbs: <em>give, feel, lack, develop</em>.'),
        co('cultural identity', 'the feeling of belonging to a particular culture, shaped by language, customs and beliefs', 'For many migrants, food is a link to their [[cultural identity]].', 'Identity = who you feel you are. Also <em>national / personal identity</em>.'),
        ex('a lingua franca', 'a common language used between people whose first languages are different', 'English has become [[a lingua franca]] in international business.', 'Latin for "Frankish language". Often used with <em>become, serve as</em>. Contrast with <em>mother tongue</em>.'),
        co('a language barrier', 'a difficulty in communicating because people speak different languages', 'The [[language barrier]] made it hard for her to see a doctor abroad.', 'A barrier blocks the way. Verbs: <em>overcome, break down</em>.'),
        co('culture shock', 'the confusion felt when you live in a very different country or culture', 'He experienced severe [[culture shock]] during his first month in Japan.', 'Uncountable. Verbs: <em>experience, suffer from, get over</em>.'),
        co('an ethnic minority', 'a group of people who share a cultural or national background and are fewer in number than the rest of the population', 'The government has promised better services for [[ethnic minorities]].', 'Minority = smaller part of a population. Opposite: <em>the majority</em>.'),
        co('an economic migrant', 'a person who moves to another country to find work or a better standard of living', 'An [[economic migrant]] is not the same as a refugee fleeing danger.', 'The reason for moving is economic. Contrast with <em>refugee</em>.'),
        co('an asylum seeker', 'a person who asks a country for protection because they are in danger at home', 'Each [[asylum seeker]] has the right to a fair hearing.', 'Asylum = safe protection. Do not confuse with <em>an immigrant</em> (anyone arriving to settle).'),
        co('integrate into society', 'to become a full, accepted part of a community', 'Language classes help newcomers [[integrate into society]] more quickly.', 'Preposition: <em>integrate into / with</em>. Noun: <em>integration</em>.'),
        ex('a melting pot', 'a place where people of many cultures live together and mix', 'New York is often described as [[a melting pot]] of cultures.', 'Cultures blend like metals melted together. Some people prefer <em>a mosaic</em>, which keeps differences visible.'),
        id('put down roots', 'to settle permanently in a place and build a life there', 'After years of moving, they decided to [[put down roots]] in Valencia.', 'Like a plant that grows roots into the soil.'),
        pv('fit in', 'to be accepted as part of a group', 'It took her a while to [[fit in]] at her new school.', 'You fit like a piece in a puzzle. Often followed by <em>with</em> a group.'),
        pv('get by in', 'to manage to communicate or live with only limited ability', 'I can [[get by in]] German, but I am nowhere near fluent.', 'You manage, but without comfort. <em>Get by on</em> is used for money.'),
        co('an endangered language', 'a language that is in danger of disappearing because few people speak it', 'Schools in the region now teach [[an endangered language]] to protect local heritage.', 'Like an endangered species. Related: <em>language revival</em>.')
      ]
    },
    {
      id: 'topic-sport', title: 'Sport, fitness and competition', short: 'Training, teamwork, fairness and winning or losing.',
      section: 'Topic vocabulary',
      idea: `<p>Sport can be used to talk about health, teamwork and fairness. The chunks cover <strong>fitness</strong> (<em>stay in shape, build up stamina, a rigorous training regime</em>), <strong>competition</strong> (<em>a competitive edge, home advantage, team spirit, be knocked out of, pull out of</em>) and <strong>fairness and attitude</strong> (<em>performance-enhancing drugs, a level playing field, a sore loser, move the goalposts</em>). The idioms <em>throw in the towel</em> and <em>a game of two halves</em> also work well outside sport.</p>`,
      cards: [
        co('stay in shape', 'to keep your body healthy and fit', 'She swims twice a week to [[stay in shape]].', 'Shape = physical condition. Opposite: <em>be out of shape</em>.'),
        co('a competitive edge', 'an advantage over rivals', 'Better coaching gave the team [[a competitive edge]].', 'An edge is a small lead. Also <em>gain / give / lose an edge</em>. Used in business too.'),
        id('a level playing field', 'a situation in which everyone has the same chances and follows the same rules', 'Richer clubs can sign the best players, so there is no [[level playing field]].', 'A flat pitch favours neither side. Used about fairness in business and politics as well.'),
        co('home advantage', 'the benefit a team has when playing at its own ground', 'The noisy crowd gave the team a strong [[home advantage]].', 'Familiar place and supporters. Compare <em>play away</em>.'),
        co('build up stamina', 'to gradually increase your ability to keep doing physical effort for a long time', 'Beginners should [[build up stamina]] slowly instead of training hard from day one.', 'Stamina = staying power. Also <em>have great stamina</em>.'),
        co('team spirit', 'the feeling of unity and shared purpose in a team', 'The coach believes that [[team spirit]] matters more than individual talent.', 'Spirit = shared attitude. Uncountable. Verbs: <em>build, foster</em>.'),
        co('performance-enhancing drugs', 'substances used illegally to improve sporting results', 'The athlete was banned for using [[performance-enhancing drugs]].', 'To enhance = to improve. The activity is often called <em>doping</em>.'),
        pv('pull out of', 'to withdraw from an event or agreement', 'The champion had to [[pull out of]] the tournament with a knee injury.', 'You take yourself out of it. Compare <em>drop out of</em>.'),
        pv('be knocked out of', 'to be eliminated from a competition', 'The home team was [[knocked out of]] the cup in the quarter-finals.', 'Usually passive. A <em>knockout</em> competition eliminates the loser in each round.'),
        id('throw in the towel', 'to give up because you cannot win', 'After a third failed attempt, he finally [[threw in the towel]].', 'Boxing image: a team can throw a towel into the ring to stop the fight.'),
        ex('a game of two halves', 'a situation that changes completely part-way through', 'The match was [[a game of two halves]]: dull before the break and thrilling after it.', 'Football language, but can be used for any situation with a clear change.'),
        id('move the goalposts', 'to change the rules or targets unfairly during a process', 'The company kept [[moving the goalposts]], so the staff could never reach their targets.', 'The target is shifted in the middle of the game. Always critical.'),
        co('a rigorous training regime', 'a strict and demanding programme of exercise', 'Olympic swimmers follow [[a rigorous training regime]] from childhood.', 'Rigorous = strict and thorough. A <em>regime</em> is a fixed system or routine.'),
        co('a sore loser', 'someone who gets angry or resentful when they lose', 'Nobody wants to play with him because he is [[a sore loser]].', 'Sore = hurt or bitter. Opposite: <em>a good loser</em>.')
      ]
    },
    {
      id: 'topic-traditions', title: 'Festivals, customs and traditions', short: 'Heritage, rituals, celebrations and change.',
      section: 'Topic vocabulary',
      idea: `<p>Questions on traditions ask whether they should be <strong>kept, changed or dropped</strong>. The chunks cover how traditions exist (<em>an age-old tradition, a time-honoured custom, deep-rooted customs, cultural heritage</em>), how they are kept or lost (<em>pass down, keep up, observe a tradition, revive a tradition, die out, break with tradition</em>) and how we celebrate (<em>a rite of passage, mark the occasion, a lavish celebration, tie the knot</em>). Choose one verb of keeping and one of losing for a balanced argument.</p>`,
      cards: [
        co('an age-old tradition', 'a custom that has existed for a very long time', 'Lighting bonfires on that night is [[an age-old tradition]] in the village.', 'Age-old = very old, from ages ago. Also <em>an age-old problem</em>.'),
        co('a time-honoured custom', 'a custom respected because it has existed for a long time', 'Giving bread and salt to new neighbours is [[a time-honoured custom]] there.', 'Honoured by time. Formal and positive. AmE spelling: <em>time-honored</em>.'),
        co('deep-rooted customs', 'customs that are firmly established and hard to change', 'Change is slow where [[deep-rooted customs]] shape daily life.', 'Like a tree with deep roots. Also <em>deep-rooted prejudice</em>.'),
        co('cultural heritage', 'the traditions, buildings and values passed down by a society', 'Folk dances are an important part of the region\'s [[cultural heritage]].', 'Heritage = what is inherited. Uncountable. Verbs: <em>preserve, protect</em>.'),
        pv('pass down', 'to give knowledge or customs to younger generations', 'The recipe has been [[passed down]] from mother to daughter for generations.', 'It moves down the family line. Often passive, with <em>from ... to ...</em>.'),
        pv('keep up', 'to continue doing something regularly', 'Some families still [[keep up]] the custom of eating together on holidays.', 'You do not let it drop. Collocates with <em>a tradition, appearances, payments</em>.'),
        pv('die out', 'to gradually disappear completely', 'Many local crafts have [[died out]] because young people prefer other jobs.', 'Like a fire that goes out. Used for species, customs and languages.'),
        co('observe a tradition', 'to follow a custom or rule faithfully', 'Most families in the area still [[observe the tradition]] of fasting before the festival.', 'Observe = follow and respect. Also used for holidays: <em>observe a public holiday</em>.'),
        co('revive a tradition', 'to bring back a custom that had almost disappeared', 'Volunteers have [[revived the tradition]] of the spring procession.', 'To revive = to bring back to life. Noun: <em>a revival</em>.'),
        co('break with tradition', 'to do something differently from the established way', 'The couple [[broke with tradition]] and held the ceremony on a beach.', 'Preposition <em>with</em>. Often used for brave or surprising choices.'),
        co('a rite of passage', 'an event or experience that marks an important change in a person\'s life', 'Getting a driving licence is [[a rite of passage]] for many teenagers.', 'Passage = move from one stage of life to another. Rites are ceremonies.'),
        co('mark the occasion', 'to celebrate or recognise a special event in some way', 'They opened a bottle of champagne to [[mark the occasion]].', 'You put a "mark" on the day. Often with <em>appropriately, fittingly</em>.'),
        co('a lavish celebration', 'a very generous and expensive party', 'The wedding was [[a lavish celebration]] with three hundred guests.', 'Lavish = given in very large amounts. Opposite: <em>a modest celebration</em>.'),
        id('tie the knot', 'to get married', 'They [[tied the knot]] in a small ceremony last June.', 'Informal and light-hearted. The knot stands for the marriage bond.')
      ]
    }
  ];

  C1.vocab.push(...groups);
})();
