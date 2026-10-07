window.C1 = window.C1 || {};
/* Units 18 and 19: everyday English. Loaded after data/course5.js, vocab6.js and listening5.js. */
(function () {
  const V = (id) => ({ t: 'vocab', id });
  const L = (id) => ({ t: 'listening', id });
  C1.course.push(
    {
      id: 'everyday-places', title: 'Everyday English: places and services', level: 'B2-C1',
      intro: 'The language of real situations that textbooks skip: ordering and complaining politely in a restaurant, returning faulty goods, describing symptoms to a doctor, asking for directions, and getting through airports and hotels. The point is to sound natural and polite, not just correct.',
      goals: ['Handle restaurants, shops, health and travel situations with natural phrases', 'Choose the right level of politeness for a request or a complaint', 'Follow two real-life conversations at natural speed'],
      steps: [V('life-restaurant'), V('life-shopping-returns'), V('life-doctor-pharmacy'), V('life-directions-transport'), V('life-airport-hotel'), L('restaurant-mixup'), L('doctor-cough')]
    },
    {
      id: 'everyday-people', title: 'Everyday English: people, plans and work', level: 'B2-C1',
      intro: 'Making plans and cancelling them, small talk, gossip, flirting, school and university life, looks and fitness, and the phrases of work emails and video calls. You will also hear a work call and the voicemail that follows it.',
      goals: ['Make, change and turn down plans naturally', 'Keep small talk going and react to news', 'Write and say the phrases of work emails and online meetings'],
      steps: [V('life-work-email-calls'), V('life-friends-plans'), V('life-small-talk'), V('life-dating-flirting'), V('life-school-university'), V('life-hair-beauty'), V('life-gym-fitness'), L('call-then-voicemail')]
    }
  );
})();
