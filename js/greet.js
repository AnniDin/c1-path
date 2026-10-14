/* C1 Path – Pica greets you on Home: a different line each day, a word of the day, and one useful remark about today (optional, on by default). */
(function () {
  const { h } = Engine;
  const A = window.App;
  const KEY = 'c1path.greet';
  const on = () => { try { return localStorage.getItem(KEY) !== '0'; } catch (e) { return true; } };
  const set = (v) => { try { localStorage.setItem(KEY, v ? '1' : '0'); } catch (e) { /* optional */ } };

  /* one line a day, in order, so the same day always gets the same line */
  const LINES = [
    'Another day, another handful of shiny words.',
    'Ten minutes today beat an hour on Sunday. I checked.',
    'A mistake is a useful find: I keep mine in a very safe nest.',
    'Collocations are words that like to sit together, like magpies on a fence.',
    'You do not need to be perfect, only back again tomorrow.',
    'Small steps. A nest is built one twig at a time.',
    'Reading something in English today? Even a menu counts.',
    'Listening gets easier when you listen a little every day. I have excellent ears.',
    'Try saying today\'s shiny word out loud once. It sticks better.',
    'Grammar is only the reason behind a pattern. We will find it together.',
    'Some words are shy at first. Be patient with them.',
    'Have you written anything in English today? Even three lines count.',
    'Nobody learns a language in a day, but everybody can start today.',
    'Stuck on something? Ask me. I am in the corner, as always.',
    'Spaced review is my favourite trick: meet a word just before you forget it.',
    'Phrasal verbs are tricky, but they are shiny, and I collect them.',
    'Say it, hear it, write it. Three doors into the same word.',
    'Your English is a little better than it was yesterday. That is how it works.',
    'Curious about why a rule exists? So am I. Ask away.',
    'Even a short session today keeps the habit warm.'
  ];
  const WEEKDAY = { 1: 'A new week and a fresh start. Let us see how fast we begin.', 4: 'Thursday: if you switched on the emails, today\'s little trick is on its way.', 0: 'Sunday: a good day for one calm listening, with a cup of something warm.' };

  /* how long you were away: the gap between the last visit before this page load and today (0 on a first visit) */
  const VISIT = 'c1path.lastvisit';
  const dayOf = (s) => Math.floor(Date.parse(s + 'T00:00:00Z') / 864e5);
  let away = 0;
  try {
    const prev = localStorage.getItem(VISIT), today = Store.today();
    if (prev && /^\d{4}-\d{2}-\d{2}$/.test(prev)) away = Math.max(0, dayOf(today) - dayOf(prev));
    localStorage.setItem(VISIT, today);
  } catch (e) { /* optional */ }
  A.awayDays = () => away;

  function dayNumber() { const d = new Date(); return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 864e5); }
  const hello = () => { const hr = new Date().getHours(); return hr < 12 ? 'Good morning' : hr < 19 ? 'Good afternoon' : 'Good evening'; };

  /* the word of the day: one card, the same all day */
  function wordOfTheDay() {
    const cards = [];
    (window.C1.vocab || []).forEach((g) => (g.cards || []).forEach((c) => cards.push({ g, c })));
    return cards.length ? cards[(dayNumber() * 7) % cards.length] : null;
  }

  /* one remark about today, the most useful first */
  function remark() {
    const today = Store.today(), n = (Store.state.days || {})[today] || 0, streak = Store.streak(), due = A.dueIds ? A.dueIds().length : 0;
    if (n >= 20) return `You have answered ${n} questions today. I am impressed, and slightly jealous.`;
    if (n > 0) return `${n} answer${n === 1 ? '' : 's'} so far today. Lovely.`;
    if (streak >= 2) return `Your ${streak}-day streak is waiting for today's practice.`;
    if (due > 0) return `${due} flashcard${due === 1 ? ' is' : 's are'} ready to review.`;
    return null;
  }

  /* away for 3 days or more: Pica is sad, and gently says so. Once you have answered something today she cheers up. */
  function missYou() {
    const answered = (Store.state.days || {})[Store.today()] || 0;
    if (away < 3) return null;
    if (answered > 0) return { mood: 'happy', text: `You came back after ${away} days, and you are already practising. I am delighted.` };
    const text = away < 7 ? `Oh, there you are. It has been ${away} days. I kept your shiny words warm.`
      : away < 30 ? `I missed you. ${away} days is a long time in magpie years. Five minutes today is enough to start again.`
        : 'I had almost given up waiting. Welcome back. Shall we start gently, with a few flashcards?';
    return { mood: 'sad', text };
  }

  A.picaGreeting = () => {
    if (!on() || !window.PicaSVG) return null;
    const sad = missYou();
    if (sad) {
      const due = A.dueIds ? A.dueIds().length : 0;
      return h('div', { class: 'picasays greeting ' + sad.mood },
        h('span', { class: 'picaface', 'aria-hidden': 'true', html: window.PicaSVG(sad.mood) }),
        h('div', { class: 'picasay' }, h('p', {}, h('strong', {}, hello() + '. '), sad.text),
          sad.mood === 'sad' ? h('p', {}, h('a', { class: 'btn small', href: due ? '#/review' : '#/course/mix' }, due ? 'Review a few cards' : 'Try a short mixed review')) : null));
    }
    const d = dayNumber(), line = WEEKDAY[new Date().getDay()] && d % 3 === 0 ? WEEKDAY[new Date().getDay()] : LINES[d % LINES.length];
    const w = wordOfTheDay(), r = remark();
    return h('div', { class: 'picasays greeting' },
      h('span', { class: 'picaface', 'aria-hidden': 'true', html: window.PicaSVG('happy') }),
      h('div', { class: 'picasay' },
        h('p', {}, h('strong', {}, hello() + '! '), line, r ? ' ' + r : ''),
        w ? h('p', { class: 'muted' }, 'Shiny word of the day: ', h('a', { href: '#/vocab/' + w.g.id }, h('strong', {}, w.c.phrase)), ' — ' + w.c.meaning.split(';')[0].trim() + '.') : null));
  };

  /* the settings card: Pica's greeting and her friend alerts */
  A.picaCard = () => {
    const mk = (label, get, put) => { const c = h('input', { type: 'checkbox', checked: get() }); c.addEventListener('change', () => put(c.checked)); return h('label', { class: 'row' }, c, ' ' + label); };
    return A.cardBlock('Pica', h('p', { class: 'muted' }, 'Pica is the site\'s guide. You can quieten her.'),
      mk('Greet me on Home, with a word of the day', on, set),
      A.overtakeOn ? mk('Tell me when a friend passes me this week', A.overtakeOn, A.setOvertake) : null);
  };
})();
