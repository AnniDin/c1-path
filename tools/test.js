/* Behaviour tests for the progress store, merging between devices, and XP/levels/quests: node tools/test.js
   Each "device" is its own sandbox with its own in-memory localStorage, running the real js/store.js. */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const root = path.join(__dirname, '..');
const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');

const noop = () => {};
const el = () => new Proxy(function () {}, { get: (t, k) => (k === Symbol.toPrimitive ? () => '' : el()), apply: () => el() });
function device(extra) {
  const mem = {};
  const sb = {
    console,
    localStorage: { getItem: (k) => (k in mem ? mem[k] : null), setItem: (k, v) => { mem[k] = String(v); }, removeItem: (k) => { delete mem[k]; } },
    document: { createElement: el, getElementById: () => null, addEventListener: noop, querySelectorAll: () => [], body: el(), documentElement: el() },
    speechSynthesis: { getVoices: () => [], addEventListener: noop, cancel: noop }, SpeechSynthesisUtterance: function () {},
    matchMedia: () => ({ matches: false, addEventListener: noop }), navigator: {}, location: { hash: '' }, addEventListener: noop, setTimeout, clearTimeout
  };
  sb.window = sb;
  vm.createContext(sb);
  vm.runInContext(read('js/store.js'), sb, { filename: 'js/store.js' });
  (extra || []).forEach((f) => vm.runInContext(read(f), sb, { filename: f }));
  return sb;
}

let failed = 0, passed = 0;
const eq = (name, got, want) => {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  if (ok) passed++; else { failed++; console.error(`FAIL ${name}\n  got:  ${JSON.stringify(got)}\n  want: ${JSON.stringify(want)}`); }
};
const sync = (a, b) => { b.Store.mergeData(a.Store.exportData()); a.Store.mergeData(b.Store.exportData()); };

/* --- answers add up across devices, and merging twice changes nothing --- */
{
  const A = device(), B = device();
  A.Store.record('g-x', 8, 10); B.Store.record('g-x', 3, 5); B.Store.record('u-y', 1, 2);
  sync(A, B);
  eq('stats add across devices', [A.Store.state.stats['g-x'], B.Store.state.stats['g-x']], [{ c: 11, t: 15 }, { c: 11, t: 15 }]);
  eq('answers today add up', A.Store.todayCount(), 17);
  const before = A.Store.exportData();
  sync(A, B); sync(A, B);
  eq('merging again is idempotent', A.Store.state.stats, JSON.parse(before).stats);
}

/* --- badges keep the earliest date; acts, mocks, exam merge --- */
{
  const A = device(), B = device();
  A.Store.earn('first'); B.Store.earn('first'); B.Store.earn('g1');
  const tA = A.Store.state.badges.first;
  A.Store.state.badges.first = tA + 5000; // A earned it later than B
  A.Store.markLesson('inversion'); B.Store.setScore('mcq/0', 3, 4);
  A.Store.addMock({ ts: 111, kind: 'Reading', c: 30, t: 60 }); B.Store.addMock({ ts: 222, kind: 'Reading', c: 40, t: 60 }); B.Store.addMock({ ts: 111, kind: 'Reading', c: 30, t: 60 });
  A.Store.setExam('2027-01-10');
  const later = Date.now() + 10;
  B.Store.state.exam = { date: '2027-02-01', ts: later };
  sync(A, B);
  eq('badge earned on both: earliest date wins', A.Store.state.badges.first === B.Store.state.badges.first && A.Store.state.badges.first <= tA + 1, true);
  eq('badge from the other device arrives', Object.keys(A.Store.state.badges).sort(), ['first', 'g1']);
  eq('daily activity merges', [A.Store.didToday('lesson'), A.Store.didToday('set')], [true, true]);
  eq('full tests merge by timestamp, no duplicates', A.Store.state.mocks.map((m) => m.ts), [111, 222]);
  eq('newest exam date wins', [A.Store.state.exam.date, B.Store.state.exam.date], ['2027-02-01', '2027-02-01']);
}

/* --- a task done on one device and an AI check on the other: both survive --- */
{
  const A = device(), B = device();
  A.Store.setSkill('writing:w1', { done: true, self: { Content: 4 } });
  B.Store.setSkill('writing:w1', { ai: [{ ts: 5, scores: { content: 3 } }] });
  B.Store.state.skills['writing:w1'].ts = Date.now() + 1000; // B's record is newer but has no "done"
  sync(A, B);
  eq('done on one device survives a newer record from the other', [A.Store.skill('writing:w1').done, B.Store.skill('writing:w1').done], [true, true]);
  eq('AI checks reach the other device', A.Store.skill('writing:w1').ai.length, 1);
  A.Store.setSkill('writing:w1', { ai: A.Store.skill('writing:w1').ai.concat({ ts: 9, scores: { content: 4 } }) });
  sync(A, B); sync(A, B);
  eq('AI history merges without duplicates', B.Store.skill('writing:w1').ai.map((x) => x.ts), [5, 9]);
}

/* --- deleting a note on one device removes it on the other --- */
{
  const A = device(), B = device();
  A.Store.addNote({ text: 'hello' });
  sync(A, B);
  const id = A.Store.state.notes[0].id;
  eq('note reaches the other device', B.Store.state.notes.length, 1);
  A.Store.deleteNote(id);
  sync(A, B);
  eq('deleted note disappears everywhere', [A.Store.state.notes.length, B.Store.state.notes.length], [0, 0]);
}

/* --- streak --- */
{
  const A = device(), day = (n) => { const d = new Date(); d.setDate(d.getDate() - n); return d.toLocaleDateString('sv'); };
  A.Store.state.days[day(0)] = 3; A.Store.state.days[day(1)] = 2; A.Store.state.days[day(2)] = 1; A.Store.state.days[day(4)] = 9;
  eq('streak counts consecutive days ending today', A.Store.streak(), 3);
  delete A.Store.state.days[day(0)];
  eq('streak stays alive when today is not yet practised', A.Store.streak(), 2);
}

/* --- XP, levels, quests (js/rewards.js with a small App stub) --- */
{
  const D = device();
  D.Engine = { h: (tag, attrs, ...kids) => ({ tag, attrs, kids }), Speech: {}, quiz: noop };
  D.App = { bar: noop, cardBlock: noop, toast: noop, unitsDone: () => 0, unitCount: () => 13 };
  vm.runInContext(read('js/rewards.js'), D, { filename: 'js/rewards.js' });
  eq('a new learner starts at level 1 with 0 XP', [D.App.rewards.level().n, D.App.rewards.level().xp], [1, 0]);
  D.Store.record('t', 10, 10); // 100 XP
  eq('100 XP is level 2', D.App.rewards.level().n, 2);
  D.Store.record('t', 0, 10); // +20 XP for wrong answers
  eq('wrong answers still give a little XP', D.App.rewards.level().xp, 120 + 0);
  eq('first-answer badge is earned', !!D.Store.state.badges.first, true);
  const goal = D.Store.goal();
  D.Store.record('t', goal, goal);
  eq('reaching the daily goal records it once', Object.keys(D.Store.state.badges).filter((k) => k.startsWith('goal:')).length, 1);
}

/* --- rewriting a text and raising the AI score earns a badge --- */
{
  const D = device();
  D.Engine = { h: (tag, attrs, ...kids) => ({ tag, attrs, kids }), Speech: {}, quiz: noop };
  D.App = { bar: noop, cardBlock: noop, toast: noop, unitsDone: () => 0, unitCount: () => 13 };
  vm.runInContext(read('js/rewards.js'), D, { filename: 'js/rewards.js' });
  D.Store.setSkill('writing:w1', { ai: [{ ts: 1, scores: { content: 3, language: 3 } }] });
  eq('one AI check is not an improvement', !!D.Store.state.badges.rewrite, false);
  D.Store.setSkill('writing:w1', { ai: [{ ts: 1, scores: { content: 3, language: 3 } }, { ts: 2, scores: { content: 4, language: 3 } }] });
  eq('a higher second AI score earns Rewriter', !!D.Store.state.badges.rewrite, true);
}

/* --- a flashcard lapse, the daily goal, the placement result and mistake progress all sync the right way --- */
{
  const A = device(), B = device();
  A.Store.rate('c1', 3); A.Store.rate('c1', 3); // easy twice: a long interval
  sync(A, B);
  B.Store.rate('c1', 0); // forgotten on B: due today
  sync(A, B);
  eq('"Again" on one device is not undone by the other', [A.Store.card('c1').box, B.Store.card('c1').box], [0, 0]);
  A.Store.setGoal(60); sync(A, B);
  eq('the daily goal follows the newest choice', [B.Store.goal(), A.Store.goal()], [60, 60]);
  A.Store.setPlacement({ date: '2026-05-01', summary: 'A' }); B.Store.setPlacement({ date: '2026-05-01', summary: 'B' });
  B.Store.state.placement.ts += 5000; sync(A, B);
  eq('the newer placement result wins even on the same day', [A.Store.state.placement.summary, B.Store.state.placement.summary], ['B', 'B']);
  const item = { type: 'mcq', q: 'x', options: ['a', 'b', 'c', 'd'], answer: 0, uid: 'v:card7' }, shuffled = Object.assign({}, item, { options: ['d', 'c', 'b', 'a'], answer: 3 });
  eq('a vocabulary card gives one mistake entry however its options are shuffled', A.Store.itemId(item), A.Store.itemId(shuffled));
}

/* --- the latest attempt of a set travels with the best score --- */
{
  const A = device(), B = device();
  A.Store.setScore('wf/1', 9, 10); B.Store.setScore('wf/1', 4, 10);
  B.Store.state.scores['wf/1'].last.ts += 5000; // B tried again later, with a worse result
  sync(A, B);
  const a = A.Store.score('wf/1'), b = B.Store.score('wf/1');
  eq('the best score is kept on both devices', [a.p, b.p], [0.9, 0.9]);
  eq('the most recent attempt is kept on both devices', [a.last.p, b.last.p], [0.4, 0.4]);
}

/* --- sub-skill tallies and the suggestion log add up across devices --- */
{
  const A = device(), B = device();
  A.Store.addSubs([{ id: 'prepositions', label: 'Prepositions', href: '#/grammar/prepositions', c: 3, t: 10 }]); B.Store.addSubs([{ id: 'prepositions', label: 'Prepositions', href: '#/grammar/prepositions', c: 5, t: 6 }]);
  A.Store.addFx('easier', 1, 10); B.Store.addFx('easier', 2, -4);
  sync(A, B); sync(A, B);
  eq('sub-skill tallies add up on both devices', [A.Store.state.sub.prepositions, B.Store.state.sub.prepositions], [{ label: 'Prepositions', href: '#/grammar/prepositions', c: 8, t: 16 }, { label: 'Prepositions', href: '#/grammar/prepositions', c: 8, t: 16 }]);
  eq('the suggestion log adds up and merging twice changes nothing', [A.Store.state.fx.easier, B.Store.state.fx.easier], [{ n: 3, sum: 6 }, { n: 3, sum: 6 }]);
  A.Store.setScore('wf/2', 5, 10); A.Store.setScore('wf/2', 9, 10);
  eq('the number of attempts of a set is counted', A.Store.score('wf/2').n, 2);
}

/* --- weekly sub-skill buckets add up across devices, and merging twice changes nothing --- */
{
  const A = device(), B = device();
  A.Store.addSubs([{ id: 'prep', label: 'Prepositions', href: '#/x', c: 3, t: 5 }]);
  B.Store.addSubs([{ id: 'prep', label: 'Prepositions', href: '#/x', c: 1, t: 4 }, { id: 'link', label: 'Linkers', href: '#/y', c: 2, t: 2 }]);
  sync(A, B); sync(A, B);
  const week = Object.keys(A.Store.state.wk)[0];
  eq('weekly buckets from two devices are summed', [Object.keys(A.Store.state.wk).length, A.Store.state.wk[week].prep, A.Store.state.wk[week].link], [1, [4, 9], [2, 2]]);
  eq('the other device sees the same weeks', B.Store.state.wk, A.Store.state.wk);
  eq('daily buckets are summed too', [Object.keys(A.Store.state.dk).length, A.Store.state.dk[Object.keys(A.Store.state.dk)[0]].prep], [1, [4, 9]]);
  eq('weekly total matches the running total', A.Store.state.wk[week].prep[1], A.Store.state.sub.prep.t);
}

/* --- content data sanity: tricks and pronunciation --- */
{
  const C = device(['data/tricks.js', 'data/tricks2.js', 'data/tricks3.js', 'data/pron.js']).C1;
  const ids = new Set(); let bad = [];
  C.tricks.forEach((s) => { if (ids.has(s.id)) bad.push('dup section ' + s.id); ids.add(s.id); s.items.forEach((x) => { if (!x.t || !x.tip) bad.push(s.id + ': ' + (x.t || '?')); }); });
  C.pron.forEach((g) => { if (!g.id || !g.tip || g.items.length < 3) bad.push('pron ' + g.id); });
  eq('tricks and pronunciation entries are complete', bad, []);
}

/* --- a wrong answer finds its trick, and a comprehension question does not --- */
{
  const T = device(['data/tricks.js', 'data/tricks2.js', 'data/tricks3.js', 'data/trickmap.js']).C1.trickFor;
  eq('wish gets the "wish" trick', T('I wish I ___ more free time.', 'have', ['had']).title, 'Wish and if only: go one step back in time');
  eq('so/such gets its trick', (T('It was ___ film that we left halfway.', 'so a boring', ['such a boring']) || {}).key, 'grammar-6');
  eq('long comprehension answers get none', T('What does the writer conclude?', 'He used to think so', ['He used to think that the experiment was flawed and said so']), null);
}

console.log(`${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
