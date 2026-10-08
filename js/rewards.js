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
      quests: Object.keys(S.badges || {}).filter((k) => k.startsWith('quest:')).length,
      daysN: days.length,
      perfect: Object.keys(S.scores).filter((k) => /^[a-z]+\/\d+$/.test(k) && S.scores[k].p >= 1).length,
      gTotal: (A.grammar || []).length || 99, cTotal: (A.allCards || []).length || 9999,
      mockBest: Math.max(0, ...(S.mocks || []).map((m) => (m && m.t ? Math.round((100 * (m.c || 0)) / m.t) : 0)))
    };
  };

  const xpOf = (s) => s.right * 10 + (s.total - s.right) * 2 + s.lessons * 20 + s.sets * 30 + s.cards * 3 + (s.listen + s.speak + s.write) * 40 + s.quests * 50;
  const levelOf = (xp) => { const n = Math.floor(Math.sqrt(xp / 100)) + 1; return { n, title: TITLES[Math.min(n - 1, TITLES.length - 1)], from: 100 * (n - 1) * (n - 1), to: 100 * n * n }; };

  /* [id, name, description, test, category] */
  const CATS = [['start', 'Getting started'], ['volume', 'Questions and practice sets'], ['habit', 'Habits and streaks'], ['words', 'Grammar and vocabulary'], ['skills', 'Listening, speaking and writing'], ['exam', 'Tests and accuracy'], ['course', 'The course'], ['quest', 'Daily quests']];
  const BADGES = [
    ['first', 'First step', 'Answer your first question', (s) => s.total >= 1, 'start'],
    ['g1', 'Understood', 'Read your first grammar lesson', (s) => s.lessons >= 1, 'start'],
    ['place', 'Know your level', 'Take the placement test', (s) => s.placement, 'start'],
    ['ear', 'Good ear', 'Finish a listening set', (s) => s.listen >= 1, 'start'],
    ['mouth', 'Speak up', 'Complete a speaking set', (s) => s.speak >= 1, 'start'],
    ['pen', 'Writer', 'Complete a writing task', (s) => s.write >= 1, 'start'],
    ['u1', 'Unit complete', 'Finish a course unit', (s) => s.units >= 1, 'start'],

    ['a100', 'Hundred', 'Answer 100 questions', (s) => s.total >= 100, 'volume'],
    ['a500', 'Five hundred', 'Answer 500 questions', (s) => s.total >= 500, 'volume'],
    ['a1000', 'One thousand', 'Answer 1,000 questions', (s) => s.total >= 1000, 'volume'],
    ['a2000', 'Two thousand', 'Answer 2,000 questions', (s) => s.total >= 2000, 'volume'],
    ['a5000', 'Five thousand', 'Answer 5,000 questions', (s) => s.total >= 5000, 'volume'],
    ['a10000', 'Ten thousand', 'Answer 10,000 questions', (s) => s.total >= 10000, 'volume'],
    ['p10', 'Practice makes perfect', 'Finish 10 practice sets', (s) => s.sets >= 10, 'volume'],
    ['p25', 'Quarter century', 'Finish 25 practice sets', (s) => s.sets >= 25, 'volume'],
    ['p40', 'Exam machine', 'Finish 40 practice sets', (s) => s.sets >= 40, 'volume'],
    ['p75', 'Seventy-five', 'Finish 75 practice sets', (s) => s.sets >= 75, 'volume'],
    ['p100', 'Century', 'Finish 100 practice sets', (s) => s.sets >= 100, 'volume'],
    ['perf1', 'Flawless', 'Score 100% on a practice set', (s) => s.perfect >= 1, 'volume'],
    ['perf5', 'Full marks, five times', 'Score 100% on 5 practice sets', (s) => s.perfect >= 5, 'volume'],
    ['perf15', 'Untouchable', 'Score 100% on 15 practice sets', (s) => s.perfect >= 15, 'volume'],

    ['st3', 'On a roll', 'Practise 3 days in a row', (s) => s.best >= 3, 'habit'],
    ['st7', 'Full week', 'Practise 7 days in a row', (s) => s.best >= 7, 'habit'],
    ['st14', 'Fortnight', 'Practise 14 days in a row', (s) => s.best >= 14, 'habit'],
    ['st30', 'Habit', 'Practise 30 days in a row', (s) => s.best >= 30, 'habit'],
    ['st60', 'Two months', 'Practise 60 days in a row', (s) => s.best >= 60, 'habit'],
    ['st100', 'Centurion', 'Practise 100 days in a row', (s) => s.best >= 100, 'habit'],
    ['d20', 'Regular', 'Practise on 20 different days', (s) => s.daysN >= 20, 'habit'],
    ['d100', 'Dedicated', 'Practise on 100 different days', (s) => s.daysN >= 100, 'habit'],
    ['goal7', 'Goal getter', 'Reach your daily goal on 7 days', (s) => s.goals >= 7, 'habit'],
    ['goal30', 'Goal machine', 'Reach your daily goal on 30 days', (s) => s.goals >= 30, 'habit'],

    ['g10', 'Grammar fan', 'Read 10 grammar lessons', (s) => s.lessons >= 10, 'words'],
    ['g20', 'Grammar scholar', 'Read 20 grammar lessons', (s) => s.lessons >= 20, 'words'],
    ['gall', 'The whole grammar', 'Read every grammar lesson', (s) => s.lessons >= s.gTotal, 'words'],
    ['v50', 'Word collector', 'Start 50 vocabulary items', (s) => s.cards >= 50, 'words'],
    ['v150', 'Growing vocabulary', 'Start 150 vocabulary items', (s) => s.cards >= 150, 'words'],
    ['v300', 'Walking dictionary', 'Start 300 vocabulary items', (s) => s.cards >= 300, 'words'],
    ['v600', 'Word hoarder', 'Start 600 vocabulary items', (s) => s.cards >= 600, 'words'],
    ['vall', 'Every word', 'Start every vocabulary item', (s) => s.cards >= s.cTotal, 'words'],

    ['ear5', 'Tuned in', 'Finish 5 listening sets', (s) => s.listen >= 5, 'skills'],
    ['ear10', 'Sharp ear', 'Finish 10 listening sets', (s) => s.listen >= 10, 'skills'],
    ['ear25', 'All ears', 'Finish 25 listening sets', (s) => s.listen >= 25, 'skills'],
    ['mouth5', 'Chatterbox', 'Complete 5 speaking sets', (s) => s.speak >= 5, 'skills'],
    ['mouth12', 'Fluent talker', 'Complete 12 speaking sets', (s) => s.speak >= 12, 'skills'],
    ['pen5', 'Wordsmith', 'Complete 5 writing tasks', (s) => s.write >= 5, 'skills'],
    ['pen15', 'Author', 'Complete 15 writing tasks', (s) => s.write >= 15, 'skills'],
    ['rewrite', 'Rewriter', 'Raise your AI writing score by rewriting', (s) => s.improved, 'skills'],

    ['mock1', 'Test day', 'Finish a full timed test', (s) => s.mocks >= 1, 'exam'],
    ['mock5', 'Seasoned', 'Finish 5 full timed tests', (s) => s.mocks >= 5, 'exam'],
    ['mock10', 'Exam veteran', 'Finish 10 full timed tests', (s) => s.mocks >= 10, 'exam'],
    ['mock80', 'Ready for the real thing', 'Score 80% or more in a full timed test', (s) => s.mockBest >= 80, 'exam'],
    ['acc', 'Sharp', '90% or more correct after 200 answers', (s) => s.total >= 200 && s.right / s.total >= 0.9, 'exam'],
    ['acc80', 'Consistent', '80% or more correct after 1,000 answers', (s) => s.total >= 1000 && s.right / s.total >= 0.8, 'exam'],
    ['acc95', 'Precise', '95% or more correct after 500 answers', (s) => s.total >= 500 && s.right / s.total >= 0.95, 'exam'],

    ['u5', 'Halfway there', 'Finish 5 course units', (s) => s.units >= 5, 'course'],
    ['u10', 'Ten units', 'Finish 10 course units', (s) => s.units >= 10, 'course'],
    ['u15', 'Nearly there', 'Finish 15 course units', (s) => s.units >= 15, 'course'],
    ['uall', 'Course complete', 'Finish every course unit', (s) => s.units >= s.allUnits, 'course'],

    ['q3', 'Quest runner', 'Complete all daily quests 3 times', (s) => s.quests >= 3, 'quest'],
    ['q15', 'Quest master', 'Complete all daily quests 15 times', (s) => s.quests >= 15, 'quest'],
    ['q30', 'Quest legend', 'Complete all daily quests 30 times', (s) => s.quests >= 30, 'quest']
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
    const cols = ['#0b3d91', '#111111', '#7f9bd4', '#d98e04', '#17692f', '#b3261e'];
    const box = h('div', { class: 'confetti', 'aria-hidden': 'true' });
    for (let i = 0; i < 40; i++) box.append(h('i', { style: `left:${Math.random() * 100}%;background:${cols[i % cols.length]};animation-delay:${Math.random() * .4}s;animation-duration:${1.6 + Math.random() * 1.2}s;transform:rotate(${Math.random() * 360}deg)` }));
    document.body.append(box); setTimeout(() => box.remove(), 3200);
  }
  A.confetti = confetti;
  const QUIPS = ['A shiny find!', 'Into the nest it goes.', 'Nicely done.', 'Another one for the collection.', 'Look at you go.', 'I knew you had it in you.'];
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
      if (fresh.length && !first) { confetti(); if (window.Sound) Sound.play('win'); }
      if (fresh.length && !first) toast('Pica: ' + QUIPS[Math.floor(Math.random() * QUIPS.length)] + ' ' + (fresh.length > 2 ? fresh.length + ' new achievements' : fresh.join(' · ')));
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
      const fresh = (id) => have[id] && Date.now() - have[id] < 3 * 864e5;
      const one = ([id, name, desc]) => h('div', { class: 'ach' + (have[id] ? ' got' : '') + (fresh(id) ? ' fresh' : '') },
        h('span', { class: 'ico', 'aria-hidden': 'true' }, have[id] ? '🏅' : '🔒'), h('strong', {}, name), h('span', { class: 'muted' }, desc),
        have[id] ? h('span', { class: 'when' }, (fresh(id) ? 'New · ' : '') + day(have[id])) : null);
      const groups = CATS.map(([key, title]) => {
        const list = BADGES.filter((b) => b[4] === key).sort((a, b) => (have[b[0]] || 0) - (have[a[0]] || 0)), got = list.filter((b) => have[b[0]]).length;
        const el = h('details', { class: 'achcat' }, h('summary', {}, h('span', {}, title), h('span', { class: 'muted' }, `${got}/${list.length}`)), h('div', { class: 'badges' }, list.map(one)));
        if (list.some((b) => fresh(b[0]))) el.open = true; // a category with something new in it opens by itself
        return el;
      });
      return A.cardBlock(`Achievements · ${n}/${BADGES.length}`, A.rewards.strip(), ...groups,
        h('p', { class: 'muted' }, 'XP: 10 per correct answer, 2 per wrong one (you still learn), plus bonuses for lessons, sets, cards and skills.'));
    }
  };
})();
