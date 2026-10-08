/* C1 Path – XP, levels and badges. Everything is derived from the saved progress; only the date a badge was earned is stored (and synced). */
(function () {
  const { h } = Engine;
  const A = window.App;
  const TITLES = ['Newcomer', 'Explorer', 'Learner', 'Practitioner', 'Skilled', 'Advanced', 'Expert', 'Master', 'C1 Ready'];

  const stats = () => {
    const S = Store.state, vals = Object.values(S.stats);
    const total = vals.reduce((a, s) => a + s.t, 0), right = vals.reduce((a, s) => a + s.c, 0);
    const days = Object.keys(S.days).filter((d) => S.days[d] > 0).sort();
    let best = 0, run = 0, prev = null;
    days.forEach((d) => { run = prev && Math.round((new Date(d) - new Date(prev)) / 864e5) === 1 ? run + 1 : 1; best = Math.max(best, run); prev = d; });
    const done = (re) => Object.keys(S.skills).filter((k) => re.test(k) && S.skills[k].done).length;
    return {
      total, right, best: Math.max(best, Store.streak()),
      lessons: Object.values(S.lessons).filter(Boolean).length, cards: Object.keys(S.cards).length, sets: Object.keys(S.scores).filter((k) => /^[a-z]+\/\d+$/.test(k)).length,
      listen: Object.keys(S.scores).filter((k) => k.startsWith('listen:')).length, speak: done(/^speaking:/), write: done(/^writing:/),
      units: A.unitsDone ? A.unitsDone() : 0, allUnits: A.unitCount ? A.unitCount() : 99, placement: !!S.placement,
      mocks: (S.mocks || []).length,
      improved: Object.values(S.skills).some((k) => { const a = (k && k.ai) || [], sum = (x) => Object.values(x.scores || {}).reduce((t, v) => t + (+v || 0), 0); return a.length > 1 && sum(a[a.length - 1]) > sum(a[0]); }),
      goals: Object.keys(S.badges || {}).filter((k) => k.startsWith('goal:')).length,
      quests: Object.keys(S.badges || {}).filter((k) => k.startsWith('quest:')).length
    };
  };

  const xpOf = (s) => s.right * 10 + (s.total - s.right) * 2 + s.lessons * 20 + s.sets * 30 + s.cards * 3 + (s.listen + s.speak + s.write) * 40 + s.quests * 50;
  const levelOf = (xp) => { const n = Math.floor(Math.sqrt(xp / 100)) + 1; return { n, title: TITLES[Math.min(n - 1, TITLES.length - 1)], from: 100 * (n - 1) * (n - 1), to: 100 * n * n }; };

  const BADGES = [
    ['first', 'First step', 'Answer your first question', (s) => s.total >= 1],
    ['a100', 'Hundred', 'Answer 100 questions', (s) => s.total >= 100],
    ['a500', 'Five hundred', 'Answer 500 questions', (s) => s.total >= 500],
    ['a2000', 'Two thousand', 'Answer 2,000 questions', (s) => s.total >= 2000],
    ['st3', 'On a roll', 'Practise 3 days in a row', (s) => s.best >= 3],
    ['st7', 'Full week', 'Practise 7 days in a row', (s) => s.best >= 7],
    ['st30', 'Habit', 'Practise 30 days in a row', (s) => s.best >= 30],
    ['goal7', 'Goal getter', 'Reach your daily goal on 7 days', (s) => s.goals >= 7],
    ['g1', 'Understood', 'Read your first grammar lesson', (s) => s.lessons >= 1],
    ['g10', 'Grammar fan', 'Read 10 grammar lessons', (s) => s.lessons >= 10],
    ['v50', 'Word collector', 'Start 50 vocabulary items', (s) => s.cards >= 50],
    ['v300', 'Walking dictionary', 'Start 300 vocabulary items', (s) => s.cards >= 300],
    ['p10', 'Practice makes perfect', 'Finish 10 practice sets', (s) => s.sets >= 10],
    ['p40', 'Exam machine', 'Finish 40 practice sets', (s) => s.sets >= 40],
    ['place', 'Know your level', 'Take the placement test', (s) => s.placement],
    ['ear', 'Good ear', 'Finish a listening set', (s) => s.listen >= 1],
    ['mouth', 'Speak up', 'Complete a speaking set', (s) => s.speak >= 1],
    ['pen', 'Writer', 'Complete a writing task', (s) => s.write >= 1],
    ['u1', 'Unit complete', 'Finish a course unit', (s) => s.units >= 1],
    ['u5', 'Halfway there', 'Finish 5 course units', (s) => s.units >= 5],
    ['uall', 'Course complete', 'Finish every course unit', (s) => s.units >= s.allUnits],
    ['q3', 'Quest runner', 'Complete all daily quests 3 times', (s) => s.quests >= 3],
    ['q15', 'Quest master', 'Complete all daily quests 15 times', (s) => s.quests >= 15],
    ['ear10', 'Sharp ear', 'Finish 10 listening sets', (s) => s.listen >= 10],
    ['pen5', 'Wordsmith', 'Complete 5 writing tasks', (s) => s.write >= 5],
    ['mock1', 'Test day', 'Finish a full timed test', (s) => s.mocks >= 1],
    ['rewrite', 'Rewriter', 'Raise your AI writing score by rewriting', (s) => s.improved],
    ['acc', 'Sharp', '90% or more correct after 200 answers', (s) => s.total >= 200 && s.right / s.total >= 0.9]
  ];

  const toast = (m) => A.toast && A.toast(m);

  /* Daily quests: three small goals that reset every day. Finishing all three is worth 50 bonus XP. */
  const quests = () => [
    { label: `Answer ${Store.goal()} questions`, now: Store.todayCount(), max: Store.goal(), href: '#/course/mix' },
    { label: 'Start 5 new vocabulary cards', now: Store.newTodayCount(), max: 5, href: '#/review' },
    { label: 'Finish a lesson, a practice set or a skill task', now: Store.didToday() ? 1 : 0, max: 1, href: '#/course' }
  ].map((q) => Object.assign(q, { done: q.now >= q.max }));

  /* A short burst of confetti (skipped when the user prefers reduced motion). */
  function confetti() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cols = ['#a63d15', '#d9962b', '#4d6a22', '#2f6f73', '#c4503a', '#7a4a7e'];
    const box = h('div', { class: 'confetti', 'aria-hidden': 'true' });
    for (let i = 0; i < 40; i++) box.append(h('i', { style: `left:${Math.random() * 100}%;background:${cols[i % cols.length]};animation-delay:${Math.random() * .4}s;animation-duration:${1.6 + Math.random() * 1.2}s;transform:rotate(${Math.random() * 360}deg)` }));
    document.body.append(box); setTimeout(() => box.remove(), 3200);
  }
  A.confetti = confetti;
  let busy = false;
  function check() {
    if (busy) return; busy = true;
    try {
      const s = stats(), S = Store.state, first = !Object.keys(S.badges || {}).length && s.total > 10; // existing learners: earn old badges silently
      const fresh = [];
      BADGES.forEach(([id, name, , ok]) => { if (ok(s) && Store.earn(id)) fresh.push(name); });
      const lv = levelOf(xpOf(s)).n;
      if (lv > 1 && Store.earn('lvl:' + lv)) fresh.push('Level ' + lv + ' · ' + levelOf(xpOf(s)).title);
      if (Store.todayCount() >= Store.goal() && Store.earn('goal:' + Store.today())) fresh.push('Daily goal reached');
      if (quests().every((q) => q.done) && Store.earn('quest:' + Store.today())) fresh.push('All daily quests done (+50 XP)');
      if (fresh.length && !first) confetti();
      if (fresh.length && !first) toast('🏅 ' + (fresh.length > 2 ? fresh.length + ' new achievements' : fresh.join(' · ')));
    } finally { busy = false; }
  }
  Store.onChange(() => { if (!busy) check(); });

  /* ---- views ---- */
  A.rewards = {
    level() { const s = stats(), xp = xpOf(s), l = levelOf(xp); return Object.assign({ xp }, l); },
    strip() {
      const l = A.rewards.level();
      return h('div', { class: 'xp' }, h('span', { class: 'lvl', 'aria-hidden': 'true' }, l.n),
        h('div', { class: 'xp-main' }, h('div', { class: 'xp-top' }, h('strong', {}, `Level ${l.n} · ${l.title}`), h('span', { class: 'muted' }, `${l.xp} XP · ${l.to - l.xp} to level ${l.n + 1}`)),
          A.bar((l.xp - l.from) / (l.to - l.from), 'ok')));
    },
    quests() {
      const qs = quests(), n = qs.filter((q) => q.done).length;
      return h('section', { class: 'quests' }, h('h2', {}, `Today's quests · ${n}/${qs.length}`),
        ...qs.map((q) => h('a', { class: 'quest' + (q.done ? ' done' : ''), href: q.href },
          h('span', { class: 'qdot', 'aria-hidden': 'true' }, q.done ? '✓' : ''), h('span', { class: 'qtext' }, q.label), A.bar(Math.min(1, q.now / q.max), q.done ? 'ok' : ''),
          h('span', { class: 'muted qn' }, `${Math.min(q.now, q.max)}/${q.max}`))),
        h('p', { class: 'muted' }, n === qs.length ? 'All done today: +50 XP. See you tomorrow.' : 'Finish all three for 50 bonus XP.'));
    },
    /* The latest badges earned (newest first), for Home. */
    recent() {
      const have = Store.state.badges || {}, ago = (ts) => { const d = Math.floor((Date.now() - ts) / 864e5); return d <= 0 ? 'today' : d === 1 ? 'yesterday' : d + ' days ago'; };
      const list = BADGES.filter(([id]) => have[id]).sort((a, b) => have[b[0]] - have[a[0]]).slice(0, 3);
      if (!list.length) return null;
      return h('section', { class: 'recent' }, h('h2', {}, 'Latest achievements'),
        ...list.map(([id, name, desc]) => h('a', { class: 'pathrow', href: '#/progress/progress' }, h('div', {}, h('strong', {}, '🏅 ' + name), h('div', { class: 'muted' }, desc)), h('span', { class: 'muted' }, ago(have[id])))));
    },
    shelf() {
      const have = Store.state.badges || {}, n = BADGES.filter(([id]) => have[id]).length, day = (ts) => new Date(ts).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
      return A.cardBlock(`Achievements · ${n}/${BADGES.length}`, A.rewards.strip(),
        h('div', { class: 'badges' }, BADGES.slice().sort((a, b) => (have[b[0]] || 0) - (have[a[0]] || 0)).map(([id, name, desc]) => h('div', { class: 'ach' + (have[id] ? ' got' : '') + (have[id] && Date.now() - have[id] < 3 * 864e5 ? ' fresh' : ''), title: desc },
          h('span', { class: 'ico', 'aria-hidden': 'true' }, have[id] ? '🏅' : '🔒'), h('strong', {}, name), h('span', { class: 'muted' }, desc), have[id] ? h('span', { class: 'when' }, (Date.now() - have[id] < 3 * 864e5 ? 'New · ' : '') + day(have[id])) : null))),
        h('p', { class: 'muted' }, 'XP: 10 per correct answer, 2 per wrong one (you still learn), plus bonuses for lessons, sets, cards and skills.'));
    }
  };
})();
