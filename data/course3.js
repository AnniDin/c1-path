window.C1 = window.C1 || {};
/* Units 11 to 13. Loaded after data/course2.js and data/practice5.js (C1._p5 holds the index of the first new set of each practice type). */
(function () {
  const V = (id) => ({ t: 'vocab', id });
  const G = (id) => ({ t: 'grammar', id });
  const P = (id, off) => ({ t: 'practice', id, set: (C1._p5 && C1._p5[id] != null ? C1._p5[id] : 0) + off });

  C1.course.push(
    {
      id: 'travel', title: 'Travel and tourism', level: 'C1',
      intro: 'How we travel, why tourism is changing and what it does to the places people visit. You will meet the vocabulary first, then the grammar for talking about plans, quantities and the right preposition after each travel word.',
      goals: ['Discuss transport, holidays and the effects of tourism', 'Use future forms and quantifiers precisely', 'Choose the correct preposition after travel verbs, adjectives and nouns'],
      steps: [V('topic-travel'), V('topic-tourism'), G('future'), G('determiners'), G('prepositions'), P('cloze', 0), P('wf', 0), P('kwt', 0), P('mcq', 0)]
    },
    {
      id: 'family', title: 'Family, relationships and identity', level: 'C1',
      intro: 'Families, friendships, language and belonging. The grammar here is about stance: modals to speculate and advise, wishes and regrets about the past, and relative clauses to add detail about people.',
      goals: ['Describe relationships and how families are changing', 'Talk about regret, advice and possibility with modals and wishes', 'Add information about people with relative clauses'],
      steps: [V('topic-family'), V('topic-identity'), G('modals'), G('wish'), G('relatives'), P('cloze', 1), P('wf', 1), P('kwt', 1), P('mcq', 1)]
    },
    {
      id: 'sport', title: 'Sport, leisure and traditions', level: 'C1',
      intro: 'Competition, fitness, festivals and customs. The grammar focus is comparison and contrast: comparing things precisely, conceding a point and describing what happens with participle clauses.',
      goals: ['Talk about sport, fitness and competition', 'Compare and contrast with comparatives, correlatives and concession', 'Use participle clauses to describe events concisely'],
      steps: [V('topic-sport'), V('topic-traditions'), G('comparison'), G('concession'), G('participle'), P('cloze', 2), P('wf', 2), P('kwt', 2), P('mcq', 2)]
    }
  );

  const WRITING = { travel: 'proposal-travel', family: 'essay-family-identity', sport: 'review-sport' };
  C1.course.filter((u) => WRITING[u.id]).forEach((u) => u.steps.push({ t: 'listening', id: u.id }, { t: 'speaking', id: u.id }, { t: 'writing', id: WRITING[u.id] }));
})();
