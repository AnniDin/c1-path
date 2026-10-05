window.C1 = window.C1 || {};
/* Units 9 and 10. Loaded after data/course.js and data/practice4.js (C1._p4 holds the index of the first new set of each practice type). */
(function () {
  const V = (id) => ({ t: 'vocab', id });
  const G = (id) => ({ t: 'grammar', id });
  const P = (id, off) => ({ t: 'practice', id, set: (C1._p4 && C1._p4[id] != null ? C1._p4[id] : 0) + off });

  C1.course.push(
    {
      id: 'law-media', title: 'Law, crime and the media', level: 'C1',
      intro: 'How the press, television and social media shape what we think about crime and justice. You will learn the language of law and news first, then the grammar that lets you report, attribute and be precise about who did what to whom.',
      goals: ['Discuss crime, punishment and press freedom with precise vocabulary', 'Choose the right preposition after verbs, adjectives and nouns', 'Report claims and attribute opinions without committing to them'],
      steps: [V('topic-crime'), V('topic-media'), G('prepositions'), G('reporting'), G('passive'), P('cloze', 0), P('wf', 0), P('kwt', 0), P('mcq', 0)]
    },
    {
      id: 'consumer-arts', title: 'Consumers, arts and character', level: 'C1',
      intro: 'Why we buy, what we enjoy and who we are. The grammar focus is word building and description: turning one word into its related forms, and using adjectives and adverbs with a precise degree of strength.',
      goals: ['Talk about advertising, shopping habits and the arts', 'Build and recognise related word forms', 'Describe people and things with well-chosen adjectives and adverbs'],
      steps: [V('topic-consumer'), V('topic-arts'), V('topic-personality'), G('wordformation'), G('adjectives'), G('comparison'), P('cloze', 1), P('wf', 1), P('kwt', 1), P('mcq', 1)]
    }
  );

  const WRITING = { 'law-media': 'report-law-media', 'consumer-arts': 'essay-consumer-arts' };
  C1.course.filter((u) => WRITING[u.id]).forEach((u) => u.steps.push({ t: 'listening', id: u.id }, { t: 'speaking', id: u.id }, { t: 'writing', id: WRITING[u.id] }));
})();
