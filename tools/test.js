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

/* --- content data sanity: tricks and pronunciation --- */
{
  const C = device(['data/tricks.js', 'data/pron.js']).C1;
  const ids = new Set(); let bad = [];
  C.tricks.forEach((s) => { if (ids.has(s.id)) bad.push('dup section ' + s.id); ids.add(s.id); s.items.forEach((x) => { if (!x.t || !x.tip) bad.push(s.id + ': ' + (x.t || '?')); }); });
  C.pron.forEach((g) => { if (!g.id || !g.tip || g.items.length < 3) bad.push('pron ' + g.id); });
  eq('tricks and pronunciation entries are complete', bad, []);
}

console.log(`${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
