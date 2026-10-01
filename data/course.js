window.C1 = window.C1 || {};
/* Themed course. Each unit is a sequence of steps that point at content defined elsewhere:
   V(groupId)        vocabulary group          (data/vocab*.js)
   G(lessonId)       grammar lesson            (data/grammar*.js)
   P(typeId, set)    practice set by index     (data/practice*.js)
   A unit review (mixed questions from the unit) is added automatically as the last step. */
(function () {
  const V = (id) => ({ t: 'vocab', id });
  const G = (id) => ({ t: 'grammar', id });
  const P = (id, set) => ({ t: 'practice', id, set });

  C1.course = [
    {
      id: 'work', title: 'Work and careers', level: 'B2',
      intro: 'Talk about jobs, careers and changing working patterns. You will meet the language first (vocabulary), then the grammar that lets you describe a career from different points in time, and finally use it in exam tasks.',
      goals: ['Discuss working patterns, job security and career change', 'Describe a career with perfect and continuous forms', 'Refer to the future accurately: plans, predictions, arrangements'],
      steps: [V('topic-work'), V('get'), V('idioms-money-time'), G('aspect'), G('future'), P('cloze', 0), P('kwt', 0), P('kwt', 1), P('gapped', 3), P('gapped', 2)]
    },
    {
      id: 'technology', title: 'Technology and change', level: 'B2',
      intro: 'Technology is a favourite exam topic. The grammar focus is the passive and clefts: two ways of choosing what to put first in a sentence, which is how technical and journalistic English is written.',
      goals: ['Describe innovations and their effects', 'Choose active or passive on purpose', 'Add emphasis with it-clefts and wh-clefts'],
      steps: [V('topic-technology'), V('up'), V('word-patterns'), G('passive'), G('cleft'), P('wf', 2), P('mcq', 3), P('kwt', 3), P('gapped', 0)]
    },
    {
      id: 'health', title: 'Health, habits and the mind', level: 'B2–C1',
      intro: 'Health, sleep, memory and sport psychology. Grammar for this theme is about certainty and regret: modals of deduction and wishes, which you need to speculate and to give opinions.',
      goals: ['Speculate about causes and past events', 'Express regret and preferences with wish and would rather', 'Read longer texts about attitude and implication'],
      steps: [V('topic-health'), V('take'), V('on-over'), G('modals'), G('wish'), P('mcq', 1), P('cloze', 1), P('kwt', 6), P('reading', 1), P('reading', 3), P('mcq', 5)]
    },
    {
      id: 'nature', title: 'Nature and the environment', level: 'C1',
      intro: 'Climate, wildlife, energy and buildings. Conditionals and comparison are the tools of environmental argument: what would happen if, and how much more or less.',
      goals: ['Argue about causes, risks and solutions', 'Use mixed and inverted conditionals', 'Compare with correlatives and modified comparatives'],
      steps: [V('topic-environment'), V('out'), V('confusing-words'), G('conditionals'), G('comparison'), P('mcq', 2), P('mcq', 4), P('cloze', 4), P('wf', 4), P('kwt', 4), P('gapped', 1)]
    },
    {
      id: 'cities', title: 'Cities, food and consumer life', level: 'C1',
      intro: 'High streets, street food, urban design and waste. The grammar is about adding information precisely: relative clauses and determiners, which C1 writers use to pack detail into a sentence.',
      goals: ['Describe places and habits in detail', 'Use defining, non-defining and reduced relative clauses', 'Handle quantifiers, articles and dependent prepositions with confidence'],
      steps: [V('dep-prepositions'), V('off'), V('collocations'), V('separable'), G('relatives'), G('determiners'), P('mcq', 0), P('wf', 5), P('kwt', 9), P('kwt', 2), P('reading', 0), P('reading', 5)]
    },
    {
      id: 'education', title: 'Learning and communication', level: 'C1',
      intro: 'Education, language learning, gap years and public speaking. The grammar here is compression: verb patterns and participle clauses let you say more in fewer words.',
      goals: ['Talk about learning, study and communication', 'Choose between -ing forms and infinitives', 'Shorten clauses with participles'],
      steps: [V('topic-education'), V('look-turn'), V('in'), V('go-come'), G('patterns'), G('participle'), P('wf', 1), P('cloze', 3), P('cloze', 5), P('kwt', 7), P('reading', 2)]
    },
    {
      id: 'society', title: 'Society, media and opinion', level: 'C1',
      intro: 'Media, inequality and public debate. This unit is about reporting what others think and structuring an argument: reporting structures, concession and formal grammar, which is what Writing Part 1 rewards.',
      goals: ['Report claims and opinions accurately', 'Balance arguments with concession and contrast', 'Use formal structures and register appropriately'],
      steps: [V('topic-society-media'), V('put'), V('discourse'), V('down'), V('register'), G('reporting'), G('concession'), G('formal'), P('wf', 3), P('kwt', 8), P('kwt', 10)]
    },
    {
      id: 'culture', title: 'Culture, travel and style', level: 'C1',
      intro: 'Food history, remote places, cycling and cultural life. The language focus is style: emphatic inversion and ellipsis, plus idioms and strong collocations that make speech and writing sound natural.',
      goals: ['Describe places, experiences and feelings vividly', 'Add emphasis with negative inversion', 'Avoid repetition with substitution and ellipsis'],
      steps: [V('adverb-adjective'), V('idioms'), V('idioms-feelings'), V('make-bring-hold'), V('away-back-through'), G('inversion'), G('ellipsis'), P('cloze', 2), P('wf', 0), P('kwt', 5), P('reading', 4)]
    }
  ];
  // Skills steps: one listening set and one speaking set per unit (same id), plus a writing task.
  const WRITING = { work: 'essay-work', technology: 'email-technology', health: 'essay-health', nature: 'proposal-nature', cities: 'report-cities', education: 'essay-education', society: 'letter-society', culture: 'review-culture' };
  C1.course.forEach((u) => u.steps.push({ t: 'listening', id: u.id }, { t: 'speaking', id: u.id }, { t: 'writing', id: WRITING[u.id] }));
})();
