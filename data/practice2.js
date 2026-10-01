(function () {
  window.C1 = window.C1 || {};
  var P = C1.practice || [];
  var get = function (id) { return P.find(function (p) { return p.id === id; }); };

  /* ---------- Multiple-choice cloze ---------- */
  var mcq = get('mcq');
  if (mcq) mcq.sets.push(
    { title: 'Set 3: Urban beekeeping', items: [{
      type: 'passage', mode: 'mcq', title: 'Bees on the roof',
      text: 'Keeping bees on city rooftops has {1} in popularity in recent years. Enthusiasts claim that urban hives are often more productive than rural ones, which they put {2} to the wide variety of flowers found in parks and gardens. Beginners are strongly {3} to attend a course before buying any equipment, as bees need careful handling. Even so, a healthy colony can {4} several kilograms of honey in a good summer. Some neighbours {5} objections at first, fearing stings, but most soon get {6} to the buzzing overhead. {7} their benefits for pollination, bees face serious threats from disease and pesticides. Beekeepers can therefore {8} a real difference to local wildlife by looking after their hives responsibly. Local clubs often meet monthly to swap advice and exchange spare equipment.',
      gaps: [
        { options: ['raised', 'soared', 'arisen', 'lifted'], answer: 1, why: '<em>Soar</em> = rise very quickly; it is intransitive and fits <em>in popularity</em>. <em>Raised</em> needs an object, and <em>arisen</em> and <em>lifted</em> do not collocate with <em>popularity</em>.' },
        { options: ['off', 'out', 'down', 'away'], answer: 2, why: '<em>Put something down to</em> = attribute it to. The other particles do not give this meaning.' },
        { options: ['insisted', 'suggested', 'proposed', 'urged'], answer: 3, why: '<em>Be urged to do</em> works in the passive with a person as subject. <em>Insist</em>, <em>suggest</em> and <em>propose</em> cannot be used like this.' },
        { options: ['gain', 'earn', 'yield', 'bring'], answer: 2, why: '<em>Yield</em> = produce (a crop or quantity). A colony cannot <em>gain</em> or <em>earn</em> honey, and <em>bring</em> would need <em>in</em>.' },
        { options: ['lifted', 'raised', 'rose', 'arose'], answer: 1, why: 'The collocation is <em>raise objections</em>. <em>Rose</em> and <em>arose</em> are intransitive and cannot take an object.' },
        { options: ['familiar', 'usual', 'used', 'custom'], answer: 2, why: '<em>Get used to</em> + noun = become accustomed to. <em>Familiar</em> takes <em>with</em>, not <em>to</em>.' },
        { options: ['Whereas', 'Although', 'However', 'Despite'], answer: 3, why: '<em>Despite</em> + noun phrase (<em>their benefits</em>). <em>Although</em> and <em>whereas</em> need a full clause, and <em>however</em> is not a preposition.' },
        { options: ['have', 'do', 'make', 'bring'], answer: 2, why: 'The fixed phrase is <em>make a difference</em>.' }
      ]
    }] },
    { title: 'Set 4: Museums go digital', items: [{
      type: 'passage', mode: 'mcq', title: 'Museums go digital',
      text: 'Museums have {1} a great deal of effort into putting their collections online. {2} some critics argue that virtual tours can never replace the real thing, curators say that websites reach people who could never visit in person. Visitors can now zoom {3} on tiny details of paintings, sculptures and manuscripts. Digitising thousands of fragile objects is a slow, {4} and costly process. Staff have to {5} sure that every description is accurate, and smaller museums often {6} on volunteers to help with this work. {7} the cost, most curators agree that the effort is worthwhile, because digital archives preserve items that might otherwise be lost for {8}. Some institutions also invite the public to add their own memories to the online records.',
      gaps: [
        { options: ['made', 'put', 'taken', 'given'], answer: 1, why: '<em>Put effort into</em> something. <em>Make an effort</em> does not combine with <em>into</em>.' },
        { options: ['Despite', 'However', 'Although', 'Unless'], answer: 2, why: '<em>Although</em> introduces a concession clause. <em>Despite</em> needs a noun, <em>however</em> is used with punctuation, and <em>unless</em> gives the wrong meaning.' },
        { options: ['up', 'over', 'in', 'off'], answer: 2, why: '<em>Zoom in on</em> = look at something closely.' },
        { options: ['pained', 'careless', 'painstaking', 'painless'], answer: 2, why: '<em>Painstaking</em> = done with great care and effort. <em>Painless</em> and <em>careless</em> contradict <em>slow</em> and <em>costly</em>.' },
        { options: ['keep', 'make', 'take', 'see'], answer: 1, why: 'The fixed phrase is <em>make sure</em>.' },
        { options: ['insist', 'resort', 'rely', 'concentrate'], answer: 2, why: '<em>Rely on</em> = depend on. <em>Insist on</em> or <em>concentrate on</em> do not fit the meaning, and <em>resort</em> takes <em>to</em>.' },
        { options: ['Wherever', 'Whichever', 'Whatever', 'Whenever'], answer: 2, why: '<em>Whatever the cost</em> = no matter how high the cost is. The others do not work with <em>the cost</em>.' },
        { options: ['once', 'all', 'life', 'good'], answer: 3, why: 'The fixed phrase is <em>lost for good</em> = lost permanently.' }
      ]
    }] },
    { title: 'Set 5: Coral reefs', items: [{
      type: 'passage', mode: 'mcq', title: 'Coral reefs in danger',
      text: 'Coral reefs cover only a small part of the seabed, yet they are home to a huge variety of marine life. Today, however, many reefs are under {1} from rising sea temperatures. When the water becomes too warm, corals {2} their colour, a process known as bleaching. Bleached coral is not necessarily dead, but it is {3} to disease. Recovery is possible {4} conditions improve quickly. Scientists have {5} up a scheme to grow fragments on underwater frames and replant them, and tourists can also {6} to protect reefs by choosing operators that ban anchoring on the coral. Some reefs have already been lost. {7}, it is not too late to act, although experts stress that time is of the {8}.',
      gaps: [
        { options: ['risk', 'harm', 'threat', 'danger'], answer: 2, why: '<em>Under threat</em> is the fixed phrase. (<em>At risk</em> and <em>in danger</em> use different prepositions.)' },
        { options: ['miss', 'drop', 'lose', 'fail'], answer: 2, why: '<em>Lose colour</em>. <em>Miss</em>, <em>drop</em> and <em>fail</em> do not collocate with <em>colour</em> in this sense.' },
        { options: ['likely', 'apt', 'prone', 'tending'], answer: 2, why: '<em>Prone to</em> + noun = likely to suffer from. <em>Likely</em> and <em>apt</em> take an infinitive, not <em>to</em> + noun.' },
        { options: ['despite', 'unless', 'whereas', 'provided'], answer: 3, why: '<em>Provided</em> (that) = on condition that. <em>Unless</em> would reverse the meaning.' },
        { options: ['held', 'set', 'laid', 'sent'], answer: 1, why: '<em>Set up a scheme</em> = establish it.' },
        { options: ['assist', 'aid', 'help', 'support'], answer: 2, why: '<em>Help (to) do something</em>. <em>Assist</em>, <em>aid</em> and <em>support</em> cannot be followed by an infinitive in this way.' },
        { options: ['Otherwise', 'Moreover', 'Consequently', 'Nevertheless'], answer: 3, why: '<em>Nevertheless</em> = despite what has just been said (reefs have been lost). The others give the wrong logical link.' },
        { options: ['matter', 'importance', 'essence', 'urgency'], answer: 2, why: 'The fixed phrase is <em>time is of the essence</em> = speed is vital.' }
      ]
    }] },
    { title: 'Set 6: Marathon running', items: [{
      type: 'passage', mode: 'mcq', title: 'Why we run marathons',
      text: 'Long-distance running has {1} a remarkable boom in recent years. {2} and large, participants are ordinary people rather than professional athletes, and many are inspired by charity events. First-timers are often {3} off by the sheer distance, but coaches insist that there are no {4} to success: training must be built up gradually. Rest is {5} as important as running, and runners who ignore pain {6} the risk of serious injury. Many clubs now organise weekly group runs, which help newcomers to stay motivated. {7} the morning of the race, nearly everyone feels nervous. Once they cross the finish line, however, most feel that the hard work was {8} it. Many of them sign up for another race before the medal has even been put away.',
      gaps: [
        { options: ['earned', 'won', 'enjoyed', 'gained'], answer: 2, why: '<em>Enjoy a boom</em> is the natural collocation for growth in popularity.' },
        { options: ['On', 'By', 'In', 'At'], answer: 1, why: '<em>By and large</em> = mostly, in general.' },
        { options: ['given', 'sent', 'put', 'left'], answer: 2, why: '<em>Put off</em> = discourage. <em>Be put off by</em> is the passive form.' },
        { options: ['skips', 'shortcuts', 'lifts', 'cuts'], answer: 1, why: '<em>There are no shortcuts to success</em> is a common expression.' },
        { options: ['much', 'so', 'just', 'very'], answer: 2, why: '<em>Just as … as</em> = equally. <em>So</em> and <em>very</em> cannot be followed by <em>as</em> like this.' },
        { options: ['make', 'hold', 'run', 'get'], answer: 2, why: 'The fixed phrase is <em>run the risk of</em>.' },
        { options: ['In', 'At', 'On', 'For'], answer: 2, why: 'We say <em>on the morning of</em> a particular day.' },
        { options: ['worthy', 'valuable', 'worth', 'worthwhile'], answer: 2, why: '<em>Worth it</em>: <em>worth</em> is followed directly by a pronoun. <em>Worthwhile</em> cannot take <em>it</em>.' }
      ]
    }] }
  );

  /* ---------- Open cloze ---------- */
  var cloze = get('cloze');
  if (cloze) cloze.sets.push(
    { title: 'Set 3: The story of chocolate', items: [{
      type: 'passage', mode: 'cloze', title: 'The story of chocolate',
      text: 'Chocolate, {1} is now enjoyed all over the world, was first prepared as a bitter drink in Central America. It was not {2} the sixteenth century that Europeans tasted it, and even then it remained a luxury for the wealthy. Sugar was added {3} make the drink more palatable, and it soon became fashionable at court. Early makers, most {4} them small family firms, worked entirely by hand. Demand grew {5} rapidly that machines were eventually introduced. Solid bars appeared only in the nineteenth century, and they quickly became an everyday treat. Buyers today expect to be told exactly {6} their chocolate comes from, {7} it is dark, milk or white. Were it not {8} the cocoa farmers, of course, there would be no industry at all.',
      gaps: [
        { answers: ['which'], why: 'Non-defining relative clause after a comma, referring to <em>chocolate</em>. <em>That</em> cannot follow a comma.' },
        { answers: ['until', 'till', 'before'], why: 'Cleft with <em>not until</em>: <em>It was not until the sixteenth century that…</em>' },
        { answers: ['to'], why: 'Infinitive of purpose: <em>added to make</em> = in order to make.' },
        { answers: ['of'], why: '<em>Most of</em> + pronoun (<em>most of them</em>).' },
        { answers: ['so'], why: '<em>So … that</em> shows result: demand grew so rapidly that…' },
        { answers: ['where'], why: 'Indirect question about place: <em>where their chocolate comes from</em>.' },
        { answers: ['whether'], why: '<em>Whether it is A, B or C</em> = it makes no difference which.' },
        { answers: ['for'], why: '<em>Were it not for</em> = if it were not for (inverted second conditional).' }
      ]
    }] },
    { title: 'Set 4: The gap year', items: [{
      type: 'passage', mode: 'cloze', title: 'The gap year',
      text: 'Every year, thousands of young people take a gap year, {1} they travel or work overseas before starting university. Some do so {2} gain experience for their careers, while others simply want a break from studying. Volunteering, {3} particular, has become popular, as it allows participants to make a real difference. Those {4} take part often say that the experience changed their outlook. Not only {5} they learn practical skills, but they also become more independent. The danger is {6} projects can end up benefiting the volunteers more than the communities they {7} supposed to help. {8} this reason, responsible organisations check carefully that each project meets a genuine local need. Returning volunteers are often asked to share their experiences with the next group, which helps everyone to learn from past mistakes.',
      gaps: [
        { answers: ['when', 'whereby'], why: '<em>When</em> = the period during which; <em>whereby</em> = by which arrangement. (<em>During which</em> would be two words.)' },
        { answers: ['to'], why: '<em>Do so to gain</em> = do so in order to gain (infinitive of purpose).' },
        { answers: ['in'], why: 'Fixed phrase: <em>in particular</em>.' },
        { answers: ['who', 'that'], why: 'Relative pronoun for people as subject of <em>take part</em>: <em>those who</em> (or, less formally, <em>those that</em>).' },
        { answers: ['do'], why: 'Inversion after <em>Not only</em>: <em>Not only do they learn…</em>' },
        { answers: ['that'], why: 'A <em>that</em> clause after <em>The danger is</em>.' },
        { answers: ['are', 'were'], why: '<em>Are supposed to</em> (or <em>were supposed to</em>): passive of <em>suppose</em> expressing expectation.' },
        { answers: ['for'], why: 'Fixed phrase: <em>For this reason</em>.' }
      ]
    }] },
    { title: 'Set 5: Living near volcanoes', items: [{
      type: 'passage', mode: 'cloze', title: 'Living near volcanoes',
      text: 'People have always lived near volcanoes, {1} the obvious dangers. The soil around them is {2} fertile that farmers continue to cultivate even the steepest slopes. Modern monitoring means that, {3} an eruption seem likely, scientists can warn residents long {4} the lava reaches their homes. Some villagers have lived there all {5} lives and are reluctant to leave, so officials have often had great difficulty {6} persuading them to go. Emergency drills, {7} are held every year, are therefore essential. The sooner people are warned, the {8} likely they are to survive. Ash clouds, meanwhile, can disrupt air travel across whole regions for days. Scientists also study old eruptions by examining layers of rock and ash, because these records reveal how often a volcano has erupted in the past.',
      gaps: [
        { answers: ['despite', 'notwithstanding'], why: '<em>Despite</em> + noun phrase = although there are dangers. (<em>In spite of</em> is more than one word.)' },
        { answers: ['so'], why: '<em>So + adjective + that</em> shows result.' },
        { answers: ['should'], why: 'Inverted first conditional: <em>should an eruption seem likely</em> = if an eruption seems likely.' },
        { answers: ['before'], why: '<em>Long before</em> = a long time earlier than.' },
        { answers: ['their'], why: 'Possessive determiner agreeing with <em>villagers</em>: <em>all their lives</em>.' },
        { answers: ['in'], why: '<em>Have difficulty (in) doing</em>.' },
        { answers: ['which'], why: 'Non-defining relative clause after <em>Emergency drills</em>: <em>which are held every year</em>.' },
        { answers: ['more'], why: '<em>The sooner …, the more likely…</em> is the double-comparative structure.' }
      ]
    }] },
    { title: 'Set 6: Public speaking', items: [{
      type: 'passage', mode: 'cloze', title: 'Public speaking',
      text: 'Public speaking is {1} of the most common fears, and yet it is a skill that anyone can learn. The key is preparation: speakers who know their material well are much {2} likely to panic. Rather {3} memorising a script word for word, it is better to learn the main points. Audiences tend to lose interest {4} soon as a speaker begins reading aloud from notes. Ten minutes into a talk, attention starts to drift, {5} is why the best speakers keep it short. Only {6} you have finished will you realise how much you enjoyed it. It is {7} so much what you say as how you say it that matters. Practise in front of a few friends, {8} can give you honest feedback.',
      gaps: [
        { answers: ['one'], why: '<em>One of the most</em> + adjective + plural noun.' },
        { answers: ['less'], why: 'Knowing the material reduces the chance of panic: <em>much less likely</em>.' },
        { answers: ['than'], why: '<em>Rather than</em> + <em>-ing</em> = instead of.' },
        { answers: ['as'], why: '<em>As soon as</em> = the moment that.' },
        { answers: ['which'], why: '<em>Which is why</em>: relative pronoun referring to the whole previous clause.' },
        { answers: ['when', 'after', 'once'], why: 'Inversion after <em>Only</em> + time clause: <em>Only when/after/once you have finished will you…</em>' },
        { answers: ['not'], why: '<em>It is not so much A as B that matters</em> = B matters more than A.' },
        { answers: ['who'], why: 'Non-defining relative pronoun for people: <em>friends, who can…</em>' }
      ]
    }] }
  );

  /* ---------- Word formation ---------- */
  var wf = get('wf');
  if (wf) wf.sets.push(
    { title: 'Set 3: Smartphone photography', items: [{
      type: 'passage', mode: 'wf', title: 'Everyone is a photographer',
      text: 'The {1} of smartphones has transformed photography. Vast numbers of images are taken every day, yet many are {2}: blurred, badly lit or simply forgotten in a phone gallery. Some {3} argue that the ease of taking pictures has made people less {4} in what they actually see. Others reply that it has made the art more {5} to everyone, giving beginners an {6} way to learn. Anyone with a little {7} can now share their work with a global audience, though the {8} of online images means that few attract lasting attention. Museums have even begun to exhibit pictures taken on phones. Whatever the truth of the debate, the humble snapshot has never been so widely discussed, and photography courses are as popular as ever.',
      gaps: [
        { base: 'popular', answers: ['popularity'], why: 'A noun after <em>The</em>, followed by <em>of</em>: <em>the popularity of smartphones</em>.' },
        { base: 'satisfy', answers: ['unsatisfactory', 'unsatisfying'], why: 'An adjective after <em>are</em> with a negative meaning: <em>un-</em> + <em>satisfy</em> + <em>-ory/-ing</em>. Two changes are needed.' },
        { base: 'photograph', answers: ['photographers'], why: 'A plural noun for people, subject of <em>argue</em>: <em>photographers</em>.' },
        { base: 'interest', answers: ['interested'], why: '<em>Be interested in</em>: the participle adjective for people.' },
        { base: 'access', answers: ['accessible'], why: 'An adjective after <em>more</em>: <em>accessible to everyone</em>.' },
        { base: 'expense', answers: ['inexpensive'], why: 'An adjective before <em>way</em>; positive meaning "cheap" needs <em>in-</em> + <em>expense</em> + <em>-ive</em>.' },
        { base: 'patient', answers: ['patience'], why: 'A noun after <em>a little</em>: <em>patience</em>.' },
        { base: 'abundant', answers: ['abundance'], why: 'A noun after <em>the</em>, followed by <em>of</em>: <em>the abundance of</em>.' }
      ]
    }] },
    { title: 'Set 4: Weather forecasting', items: [{
      type: 'passage', mode: 'wf', title: 'Forecasting the weather',
      text: 'Weather forecasting has become far more {1} over the past few decades, thanks largely to satellites and powerful computers. Forecasters can now make {2} several days ahead, which was once thought {3}. Yet the atmosphere is {4} chaotic, and tiny errors can grow quickly, so long-range predictions remain {5}. Farmers, sailors and airline {6} rely heavily on these reports. A sudden storm can have {7} effects on a whole region, and early warnings undoubtedly save lives. Even so, the {8} of forecasts is still a popular subject of jokes. Many people now check the outlook on their phones before they leave the house, and they expect it to be right. Television presenters, meanwhile, have become minor celebrities, and a badly chosen word about sunshine can upset a whole weekend of plans.',
      gaps: [
        { base: 'sophisticate', answers: ['sophisticated'], why: 'An adjective after <em>more</em>: <em>more sophisticated</em>.' },
        { base: 'predict', answers: ['predictions'], why: 'A plural noun after <em>make</em>: <em>make predictions</em>.' },
        { base: 'possible', answers: ['impossible'], why: 'An adjective after <em>thought</em>; the meaning is negative: <em>im-</em> before <em>p</em>.' },
        { base: 'inherent', answers: ['inherently'], why: 'An adverb modifying the adjective <em>chaotic</em>.' },
        { base: 'certain', answers: ['uncertain'], why: 'An adjective after <em>remain</em> with a negative meaning: <em>uncertain</em>.' },
        { base: 'pilot', answers: ['pilots'], why: 'A plural noun for people (subject of <em>rely</em>): <em>airline pilots</em>.' },
        { base: 'devastate', answers: ['devastating'], why: 'An adjective before <em>effects</em> meaning "causing devastation": <em>-ing</em>.' },
        { base: 'reliable', answers: ['reliability'], why: 'A noun after <em>the</em>, followed by <em>of</em>: <em>the reliability of forecasts</em>.' }
      ]
    }] },
    { title: 'Set 5: Green buildings', items: [{
      type: 'passage', mode: 'wf', title: 'Building for the planet',
      text: 'Architects are increasingly {1} to design buildings that are kind to the environment. A truly {2} approach begins with the site itself, using natural light and shade to reduce energy needs. Good {3} can cut heating bills dramatically, and {4} friendly materials such as timber and recycled steel are becoming more common. Concrete, though strong, has some {5} side effects, because its production releases large amounts of carbon dioxide. The {6} of green buildings often notice a difference in their bills and in their health. Critics claim the initial cost is {7} high, but supporters point to long-term savings and greater {8}. Cities around the world are now experimenting with rooftop gardens and living walls, and some governments now offer grants to owners who improve their properties in this way.',
      gaps: [
        { base: 'expect', answers: ['expected'], why: '<em>Be expected to</em> + infinitive: past participle after <em>are</em>.' },
        { base: 'sustain', answers: ['sustainable'], why: 'An adjective before <em>approach</em>: <em>sustain</em> + <em>-able</em>.' },
        { base: 'insulate', answers: ['insulation'], why: 'A noun after <em>Good</em> (uncountable): <em>insulation</em>.' },
        { base: 'environment', answers: ['environmentally'], why: 'An adverb modifying <em>friendly</em>: <em>environmentally friendly</em>.' },
        { base: 'desire', answers: ['undesirable'], why: 'An adjective before <em>side effects</em> with a negative meaning: <em>un-</em> + <em>desir(e)</em> + <em>-able</em>.' },
        { base: 'inhabit', answers: ['inhabitants'], why: 'A plural noun for people, subject of the plural verb <em>notice</em>.' },
        { base: 'excess', answers: ['excessively'], why: 'An adverb modifying <em>high</em>: <em>excess</em> → <em>excessive</em> → <em>excessively</em> = too high.' },
        { base: 'durable', answers: ['durability'], why: 'An uncountable noun after <em>greater</em>: <em>durability</em>.' }
      ]
    }] },
    { title: 'Set 6: Street food', items: [{
      type: 'passage', mode: 'wf', title: 'The appeal of street food',
      text: 'Street food, {1} sold to factory workers on their lunch breaks, has become a tourist attraction in many cities. Its popularity is easy to explain: people value its {2}, and its low prices make it {3} to almost everyone. Vendors offer an astonishing {4} of flavours, from grilled fish to sweet pancakes. Some visitors worry that it may be {5}, but strict {6} in many cities require stalls to be inspected regularly. Behind every stall there is usually a highly {7} cook who has perfected a single recipe over many years. Locals queue {8} for the best dishes, and guidebooks now list the most popular stalls, so that even first-time visitors can find something delicious within minutes of arriving.',
      gaps: [
        { base: 'origin', answers: ['originally'], why: 'An adverb placed before the participle <em>sold</em>: <em>originally sold</em>.' },
        { base: 'convenient', answers: ['convenience'], why: 'A noun after the possessive <em>its</em>: <em>its convenience</em>.' },
        { base: 'afford', answers: ['affordable'], why: 'An adjective after <em>make it</em>: <em>afford</em> + <em>-able</em>.' },
        { base: 'vary', answers: ['variety'], why: 'A singular noun after <em>an astonishing</em>, followed by <em>of</em>: <em>a variety of</em>.' },
        { base: 'hygiene', answers: ['unhygienic'], why: 'Two steps: <em>hygiene</em> → <em>hygienic</em> → <em>unhygienic</em> (negative).' },
        { base: 'regulate', answers: ['regulations'], why: 'A plural noun after <em>strict</em>, subject of the plural verb <em>require</em>.' },
        { base: 'skill', answers: ['skilled', 'skilful'], why: 'An adjective after <em>highly</em>: <em>highly skilled</em> (or <em>skilful</em>).' },
        { base: 'enthusiasm', answers: ['enthusiastically'], why: 'An adverb modifying <em>queue</em>: <em>enthusiasm</em> → <em>enthusiastic</em> → <em>enthusiastically</em>.' }
      ]
    }] }
  );

  /* ---------- Key word transformations ---------- */
  var kwt = get('kwt');
  if (kwt) kwt.sets.push(
    { title: 'Set 4: Passives, causatives and reporting', items: [
      { type: 'kwt', first: 'A local firm repaired our roof last week.', key: 'had', second: 'We ___ repaired by a local firm last week.', answers: ['had our roof', 'had the roof'], why: 'Causative <em>have something done</em>: <em>had our roof repaired</em>.' },
      { type: 'kwt', first: 'They believe the thief entered through the window.', key: 'believed', second: 'The thief ___ entered through the window.', answers: ['is believed to have'], why: 'Reporting passive with a past event: <em>is believed to have</em> + past participle.' },
      { type: 'kwt', first: '"I didn\'t break the vase," said Tom.', key: 'denied', second: 'Tom ___ the vase.', answers: ['denied breaking', 'denied having broken'], why: '<em>Deny</em> + <em>-ing</em> (or <em>having</em> + participle).' },
      { type: 'kwt', first: 'People expect the new bridge to open in May.', key: 'expected', second: 'The new bridge ___ open in May.', answers: ['is expected to'], why: 'Passive reporting structure: <em>is expected to</em> + infinitive.' },
      { type: 'kwt', first: 'They are painting the school hall at the moment.', key: 'being', second: 'The school hall ___ painted at the moment.', answers: ['is being'], why: 'Present continuous passive: <em>is being</em> + past participle.' },
      { type: 'kwt', first: 'Someone should have told me about the change.', key: 'been', second: 'I ___ about the change.', answers: ['should have been told', 'ought to have been told', 'should\'ve been told', 'should have been informed', 'ought to have been informed', 'should\'ve been informed'], why: 'Past passive with a modal of criticism: <em>should have been told</em>.' }
    ] },
    { title: 'Set 5: Conditionals and wishes', items: [
      { type: 'kwt', first: 'I regret not booking earlier.', key: 'wish', second: 'I ___ earlier.', answers: ['wish I had booked', 'wish I\'d booked'], why: '<em>Wish</em> + past perfect expresses regret about the past.' },
      { type: 'kwt', first: 'Lock the door, or someone might get in.', key: 'unless', second: 'Someone might get in ___ the door.', answers: ['unless you lock', 'unless we lock', 'unless you have locked', 'unless we have locked'], why: '<em>Unless</em> = if not; it is followed by a present tense.' },
      { type: 'kwt', first: 'We should have left ages ago.', key: 'time', second: 'It is ___ left.', answers: ['high time we', 'high time that we', 'about time we', 'about time that we'], why: '<em>It is (high) time</em> + subject + past simple.' },
      { type: 'kwt', first: 'I would take that job in your position.', key: 'were', second: 'If I ___ take that job.', answers: ['were you, I\'d', 'were you, I would', 'were you I\'d', 'were you I would'], why: '<em>If I were you</em> is the fixed phrase for giving advice.' },
      { type: 'kwt', first: 'Without your help, we would have failed.', key: 'not', second: 'If it ___ for your help, we would have failed.', answers: ['had not been', 'hadn\'t been'], why: '<em>If it had not been for</em> + noun = but for; third conditional.' },
      { type: 'kwt', first: 'You can borrow my car as long as you drive carefully.', key: 'provided', second: 'You can borrow my car ___ carefully.', answers: ['provided you drive', 'provided that you drive'], why: '<em>Provided (that)</em> = only if.' }
    ] },
    { title: 'Set 6: Inversion', items: [
      { type: 'kwt', first: 'As soon as she sat down, the phone rang.', key: 'hardly', second: '___ down when the phone rang.', answers: ['Hardly had she sat'], why: '<em>Hardly had</em> + subject + past participle … <em>when</em>.' },
      { type: 'kwt', first: 'You must not open this door under any circumstances.', key: 'circumstances', second: 'Under ___ open this door.', answers: ['no circumstances must you', 'no circumstances should you', 'no circumstances may you', 'no circumstances can you', 'no circumstances shall you', 'no circumstances are you to'], why: '<em>Under no circumstances</em> triggers inversion: modal + subject + verb.' },
      { type: 'kwt', first: 'I only realised my mistake when I got home.', key: 'until', second: 'Not ___ home did I realise my mistake.', answers: ['until I got', 'until I arrived', 'until I reached', 'until I came', 'until I returned', 'until I went', 'until I was'], why: '<em>Not until</em> + clause is followed by inversion in the main clause (<em>did I realise</em>).' },
      { type: 'kwt', first: 'The company lost money, and it also lost its reputation.', key: 'only', second: 'Not ___ money, but it also lost its reputation.', answers: ['only did the company lose', 'only did it lose'], why: '<em>Not only</em> at the start of a clause requires an auxiliary before the subject.' },
      { type: 'kwt', first: 'We seldom see such generosity.', key: 'rarely', second: '___ such generosity.', answers: ['Rarely do we see', 'Rarely do you see', 'Rarely do people see', 'Rarely does one see', 'Rarely do we witness', 'Rarely do we encounter'], why: 'Negative adverbs such as <em>rarely</em> at the start take inversion: <em>Rarely do we see</em>.' },
      { type: 'kwt', first: 'If you need any help, call me.', key: 'should', second: '___ any help, call me.', answers: ['Should you need', 'Should you require', 'Should you want', 'Should you ever need'], why: 'Formal inverted conditional: <em>Should you need</em> = if you need.' }
    ] },
    { title: 'Set 7: Modals of deduction and certainty', items: [
      { type: 'kwt', first: 'I\'m sure she was joking when she said that.', key: 'must', second: 'She ___ joking when she said that.', answers: ['must have been'], why: '<em>Must have</em> + past participle = certain deduction about the past.' },
      { type: 'kwt', first: 'Perhaps they missed the train.', key: 'might', second: 'They ___ the train.', answers: ['might have missed', 'might\'ve missed', 'might well have missed'], why: '<em>Might have</em> + past participle = a past possibility.' },
      { type: 'kwt', first: 'I am sure the parcel will arrive tomorrow.', key: 'bound', second: 'The parcel ___ arrive tomorrow.', answers: ['is bound to'], why: '<em>Be bound to</em> + infinitive = certain to happen.' },
      { type: 'kwt', first: 'It is quite probable that the meeting will be cancelled.', key: 'likely', second: 'The meeting is ___ cancelled.', answers: ['likely to be', 'very likely to be', 'quite likely to be', 'highly likely to be'], why: '<em>Be likely to</em> + infinitive (here passive: <em>to be cancelled</em>).' },
      { type: 'kwt', first: 'It is possible that the flight has been delayed.', key: 'may', second: 'The flight ___ delayed.', answers: ['may have been', 'may well have been'], why: '<em>May have been</em> + participle = possibility about the present result of a past event.' },
      { type: 'kwt', first: 'I\'m certain he wasn\'t at the party; I would have noticed him.', key: 'been', second: 'He ___ at the party; I would have noticed him.', answers: ['can\'t have been', 'cannot have been', 'couldn\'t have been', 'could not have been'], why: '<em>Can\'t have been</em> = negative certainty about the past.' }
    ] },
    { title: 'Set 8: Participle clauses and comparison', items: [
      { type: 'kwt', first: 'As I didn\'t know what to do, I asked for advice.', key: 'knowing', second: '___ what to do, I asked for advice.', answers: ['Not knowing'], why: 'Negative participle clause: <em>Not knowing</em> = because I did not know.' },
      { type: 'kwt', first: 'After she had finished her degree, she moved abroad.', key: 'having', second: '___ her degree, she moved abroad.', answers: ['Having finished', 'Having completed'], why: 'A perfect participle clause shows one action before another: <em>Having finished</em>.' },
      { type: 'kwt', first: 'As you practise more, your fluency improves.', key: 'more', second: 'The ___, the better your fluency becomes.', answers: ['more you practise', 'more you practice', 'more often you practise'], why: 'Double comparative: <em>The more …, the better …</em>' },
      { type: 'kwt', first: 'That phone is much more expensive than this one.', key: 'nearly', second: 'This phone is not ___ expensive as that one.', answers: ['nearly as', 'nearly so'], why: '<em>Not nearly as … as</em> = much less … than.' },
      { type: 'kwt', first: 'Nothing is better than a hot bath after a long walk.', key: 'best', second: 'A hot bath after a long walk ___ thing.', answers: ['is the best', 'is simply the best', 'is easily the best', 'is by far the best', 'is the very best', '\'s the best'], why: 'A negative comparison becomes a superlative: <em>the best thing</em>.' },
      { type: 'kwt', first: 'The film was so boring that we left halfway.', key: 'such', second: 'It was ___ film that we left halfway.', answers: ['such a boring'], why: '<em>Such a</em> + adjective + noun, whereas <em>so</em> is used with an adjective alone.' }
    ] },
    { title: 'Set 9: Linkers and verb patterns', items: [
      { type: 'kwt', first: 'He is rich, but he isn\'t happy.', key: 'though', second: 'Rich ___, he isn\'t happy.', answers: ['though he is', 'though he may be'], why: 'Concession with fronted adjective: <em>Rich though he is</em>.' },
      { type: 'kwt', first: 'Although she felt ill, she went to work.', key: 'fact', second: '___ she felt ill, she went to work.', answers: ['Despite the fact that', 'Notwithstanding the fact that', 'Despite the fact', 'Notwithstanding the fact', 'Regardless of the fact that'], why: '<em>Despite</em> needs a noun phrase, so a clause needs <em>the fact that</em>.' },
      { type: 'kwt', first: 'The match was cancelled because of the storm.', key: 'account', second: 'The match was cancelled ___ the storm.', answers: ['on account of'], why: '<em>On account of</em> + noun = because of.' },
      { type: 'kwt', first: 'My brother loves cities, but I prefer the countryside.', key: 'whereas', second: 'My brother loves cities, ___ prefer the countryside.', answers: ['whereas I'], why: '<em>Whereas</em> contrasts two facts within one sentence.' },
      { type: 'kwt', first: 'I\'m sorry that I told him the secret.', key: 'regret', second: 'I ___ him the secret.', answers: ['regret telling', 'regret having told'], why: '<em>Regret</em> + <em>-ing</em> refers to a past action you are sorry about.' },
      { type: 'kwt', first: 'She said she would definitely help us.', key: 'promised', second: 'She ___ us.', answers: ['promised to help', 'promised she would help', 'promised that she would help'], why: '<em>Promise</em> + <em>to</em> + infinitive.' }
    ] },
    { title: 'Set 10: Phrasal verbs and prepositions', items: [
      { type: 'kwt', first: 'They cancelled the trip because of the storm.', key: 'off', second: 'The trip ___ because of the storm.', answers: ['was called off', 'had to be called off', 'had been called off', 'has been called off', 'got called off'], why: '<em>Call off</em> = cancel; here in the passive.' },
      { type: 'kwt', first: 'I can\'t tolerate his rudeness any longer.', key: 'up', second: 'I can\'t ___ his rudeness any longer.', answers: ['put up with'], why: '<em>Put up with</em> = tolerate.' },
      { type: 'kwt', first: 'It took me a while to recover from the flu.', key: 'over', second: 'It took me a while to ___ the flu.', answers: ['get over'], why: '<em>Get over</em> = recover from an illness or a shock.' },
      { type: 'kwt', first: 'She blamed her brother for the mistake.', key: 'responsible', second: 'She held her brother ___ the mistake.', answers: ['responsible for'], why: '<em>Hold someone responsible for</em> = blame.' },
      { type: 'kwt', first: 'Sam is very good at persuading people.', key: 'gift', second: 'Sam ___ persuading people.', answers: ['has a gift for', 'has the gift of', 'has a real gift for', 'has a great gift for', 'has got a gift for'], why: '<em>Have a gift for</em> + <em>-ing</em> = have a natural talent for.' },
      { type: 'kwt', first: 'We were all very impressed by her speech.', key: 'impression', second: 'Her speech ___ on all of us.', answers: ['made an impression', 'made a good impression', 'made a great impression', 'left an impression', 'made a strong impression', 'made a deep impression', 'made a lasting impression', 'made a big impression', 'made quite an impression', 'made a positive impression', 'left a lasting impression'], why: '<em>Make an impression on</em> someone = affect them strongly.' }
    ] },
    { title: 'Set 11: Mixed structures', items: [
      { type: 'kwt', first: '"Why don\'t you apply for the job?" Tom said to me.', key: 'suggested', second: 'Tom ___ for the job.', answers: ['suggested I apply', 'suggested that I apply', 'suggested I should apply', 'suggested that I should apply', 'suggested I applied', 'suggested that I applied', 'suggested my applying'], why: '<em>Suggest</em> is followed by a <em>that</em> clause with the subjunctive, <em>should</em> or a past tense, but never by <em>to</em> + infinitive.' },
      { type: 'kwt', first: 'She is too young to drive.', key: 'enough', second: 'She is not ___ drive.', answers: ['old enough to'], why: '<em>Enough</em> follows an adjective: <em>old enough to</em>.' },
      { type: 'kwt', first: 'She started learning the piano five years ago.', key: 'been', second: 'She ___ the piano for five years.', answers: ['has been learning', '\'s been learning'], why: 'Present perfect continuous with <em>for</em> shows an activity continuing up to now.' },
      { type: 'kwt', first: '"Where do you live?" she asked me.', key: 'where', second: 'She asked me ___.', answers: ['where I lived', 'where I live'], why: 'Reported question: statement word order, no <em>do</em>, and usually a backshift of tense.' },
      { type: 'kwt', first: 'I don\'t mind which team wins.', key: 'matter', second: 'It doesn\'t ___ me which team wins.', answers: ['matter to'], why: '<em>Matter to</em> someone = be important to them.' },
      { type: 'kwt', first: 'Nobody in the team runs faster than Kai.', key: 'fastest', second: 'Kai is ___ in the team.', answers: ['the fastest', 'the fastest runner'], why: 'Superlative: <em>the fastest</em> replaces <em>nobody … faster than</em>.' }
    ] }
  );
})();
