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
      lessons: Object.values(S.lessons).filter(Boolean).length, cards: Object.keys(S.cards).length, sets: Object.keys(S.scores).length,
      listen: Object.keys(S.scores).filter((k) => k.startsWith('listen:')).length, speak: done(/^speaking:/), write: done(/^writing:/),
      units: A.unitsDone ? A.unitsDone() : 0, allUnits: A.unitCount ? A.unitCount() : 99, placement: !!S.placement,
      goals: Object.keys(S.badges || {}).filter((k) => k.startsWith('goal:')).length
    };
  };

  const xpOf = (s) => s.right * 10 + (s.total - s.right) * 2 + s.lessons * 20 + s.sets * 30 + s.cards * 3 + (s.listen + s.speak + s.write) * 40;
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
    ['acc', 'Sharp', '90% or more correct after 200 answers', (s) => s.total >= 200 && s.right / s.total >= 0.9]
  ];

  const toast = (m) => A.toast && A.toast(m);
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
      if (fresh.length && !first) toast('🏅 ' + (fresh.length > 2 ? fresh.length + ' new achievements' : fresh.join(' · ')));
    } finally { busy = false; }
  }
  Store.onChange(() => { if (!busy) check(); });

  /* ---- views ---- */
  A.rewards = {
    level() { const s = stats(), xp = xpOf(s), l = levelOf(xp); return Object.assign({ xp }, l); },
    strip() {
      const l = A.rewards.level();
      return h('div', { class: 'xp' }, h('div', { class: 'xp-top' }, h('strong', {}, `Level ${l.n} · ${l.title}`), h('span', { class: 'muted' }, `${l.xp} XP · ${l.to - l.xp} to level ${l.n + 1}`)),
        A.bar((l.xp - l.from) / (l.to - l.from), 'ok'));
    },
    shelf() {
      const have = Store.state.badges || {}, n = BADGES.filter(([id]) => have[id]).length;
      return A.cardBlock(`Achievements · ${n}/${BADGES.length}`, A.rewards.strip(),
        h('div', { class: 'badges' }, BADGES.map(([id, name, desc]) => h('div', { class: 'badge' + (have[id] ? ' got' : ''), title: desc },
          h('span', { class: 'ico', 'aria-hidden': 'true' }, have[id] ? '🏅' : '🔒'), h('strong', {}, name), h('span', { class: 'muted' }, desc)))),
        h('p', { class: 'muted' }, 'XP: 10 per correct answer, 2 per wrong one (you still learn), plus bonuses for lessons, sets, cards and skills.'));
    }
  };
})();
