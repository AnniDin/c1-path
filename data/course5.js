window.C1 = window.C1 || {};
/* Units 14 to 17: word power, speaking and discussion skills, society and work, lifestyle and language.
   Loaded after data/course4.js, practice8.js, grammar4.js, grammar5.js, vocab5.js and listening4.js (C1._p8 holds the index of the first new set of each type). */
(function () {
  const V = (id) => ({ t: 'vocab', id });
  const G = (id) => ({ t: 'grammar', id });
  const P = (id, off) => ({ t: 'practice', id, set: (C1._p8 && C1._p8[id] != null ? C1._p8[id] : 0) + off });
  const L = (id) => ({ t: 'listening', id });

  C1.course.push(
    {
      id: 'word-power', title: 'Word power', level: 'C1',
      intro: 'How English builds words and how it grades them. You will learn word families, prefixes, the nouns that behave oddly, verbs that change meaning, and the adjectives that refuse "very". This is the toolkit behind word formation and many Use of English answers.',
      goals: ['Build the right word from a root with the right suffix or prefix', 'Handle uncountable, collective and plural-looking nouns correctly', 'Choose between "very" and "absolutely" and between stative and dynamic verbs'],
      steps: [G('wordfamilies'), G('prefixes'), G('oddnouns'), G('statives'), G('gradable'), V('adj-noun-sets'), V('confusable-abstract'), P('reading', 0), P('gapped', 0)]
    },
    {
      id: 'talk-skills', title: 'Speaking and discussion skills', level: 'C1',
      intro: 'The language of talking well: buying time, comparing and speculating, agreeing and disagreeing politely, hedging, conceding and signposting. Then four listenings that train you to follow lectures, hear attitude, avoid distractors and compare two speakers.',
      goals: ['Keep going in Speaking Parts 1 to 4 when a word escapes you', 'Disagree, concede and hedge politely', 'Recognise signposts and attitude when you listen'],
      steps: [G('sk-part1'), G('sk-part2'), G('sk-part34'), G('sk-hedging'), G('sk-concede'), G('sk-signpost'), V('hedging-disagreeing'), L('lecture-waiting'), L('attitude-novel'), L('distractors-party'), L('synthesis-market-street')]
    },
    {
      id: 'society-work', title: 'Society, work and the natural world', level: 'C1',
      intro: 'Wildlife, the gig economy, social media and volunteering: four themes that come up in essays and discussions. The grammar here is about how likely things are, so you can predict, warn and speculate with precision.',
      goals: ['Discuss conservation, new ways of working, online life and charity', 'Express likelihood and certainty accurately', 'Read longer texts and gapped texts on these themes'],
      steps: [V('topic-wildlife'), V('topic-gig-careers'), V('topic-social-media'), V('topic-volunteering'), G('likelihood'), P('reading', 1), P('gapped', 1)]
    },
    {
      id: 'lifestyle-language', title: 'Lifestyle, money and language', level: 'C1',
      intro: 'Language use, film and streaming, food and health, weather and climate, money and debt, and solving problems. A mixed unit of topic vocabulary for Speaking and Writing, with two long reading tasks.',
      goals: ['Talk about language learning, entertainment, diet, climate and money', 'Describe problems and how people solve them', 'Practise Part 5 and Part 7 reading on fresh topics'],
      steps: [V('topic-language-use'), V('topic-film-streaming'), V('topic-food-diet'), V('topic-weather-climate'), V('topic-money-debt'), V('topic-problem-solving'), P('reading', 2), P('gapped', 2)]
    }
  );
})();
