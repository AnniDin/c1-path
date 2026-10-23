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

/* --- mistakes come back on a schedule --- */
{
  const D = device(), item = { type: 'mcq', q: 'Test ___', options: ['a', 'b'], answer: 0, why: 'x' };
  D.Store.logResults([{ ok: false, given: 'b', item }], { topic: 't', label: 'T', href: '#/' });
  eq('a new mistake is not due for a day', D.Store.dueMistakes().length, 0);
  const m = D.Store.mistakes()[0]; m.due = Date.now() - 1;
  eq('and is due once the day has passed', D.Store.dueMistakes().length, 1);
  D.Store.logResults([{ ok: true, item }], { topic: 't', label: 'T', href: '#/' });
  eq('one right answer pushes it three days out', [D.Store.dueMistakes().length, D.Store.mistakes().length, m.due > Date.now() + 2 * 864e5], [0, 1, true]);
}

/* --- the emails: the trick of the week and the monthly summary --- */
{
  const L = require('./digest_lib'), trickKeys = new Set(), NIL = '00000000-0000-0000-0000-000000000000';
  for (let w = 0; w < 120; w++) {
    const p = L.pickTrick(w * 7 * 864e5 + 1), m = L.renderWeekly(p, NIL);
    trickKeys.add(p.key);
    if (!p.t.t || !p.t.tip || !m.html.includes('#/unsubscribe/' + NIL) || !m.text.includes('Stop these emails')) { eq('weekly email ' + w + ' is complete', p.key, 'complete'); break; }
  }
  eq('the trick rotates through many tricks', trickKeys.size > 50, true);
  eq('two people get the same trick in the same week', L.pickTrick(5e9).key, L.pickTrick(5e9 + 1000).key);
  /* a person with progress on two devices */
  const A = device(), B = device(), item = { type: 'mcq', q: 'S ___', options: ['a', 'b'], answer: 0, why: 'x' };
  A.Store.record('g-wish', 2, 8); A.Store.bump && A.Store.bump(); B.Store.record('g-wish', 1, 4);
  A.Store.logResults([{ ok: false, given: 'b', item }], { topic: 't', label: 'T', href: '#/' });
  sync(A, B);
  const s = L.summarise(JSON.parse(A.Store.exportData()));
  eq('summary adds both devices and names the weak topic', [s.total, s.weak.length && s.weak[0].pct], [12, 25]);
  const mail = L.renderMonthly(s, NIL);
  eq('monthly email says it is not an exam score and can be stopped', [/not an exam score/.test(mail.html), mail.html.includes('#/unsubscribe/'), /your month/i.test(mail.subject), /Pica/.test(mail.text) && /Pica/.test(mail.html) && /icon-192.png/.test(mail.html)], [true, true, true, true]);
  eq('an empty account still gets a sensible summary', /did not answer any questions/.test(L.renderMonthly(L.summarise({}), NIL).html), true);
}

/* --- the placement test: bank, three sizes, verdict and the adaptive step --- */
{
  const D = device(['data/grammar.js', 'data/grammar2.js', 'data/grammar3.js', 'data/grammar4.js', 'data/grammar5.js', 'data/placement.js', 'data/placement2.js', 'data/listening11.js', 'js/placement.js']), P = D.Placement, bank = P.bank();
  const topics = new Set(D.C1.grammar.map((g) => g.id)); topics.add('vocab'); topics.add('reading'); topics.add('listening');
  const bad = bank.filter((q) => q.options.length !== 4 || !(q.answer >= 0 && q.answer < 4) || new Set(q.options).size !== 4 || !topics.has(q.topic) || !q.why || (!q.skill && !/___/.test(q.q)) || (q.skill === 'reading' && q.q.length < 200));
  eq('every placement question is well formed', bad.map((q) => q.q), []);
  eq('no placement question is repeated', new Set(bank.map((q) => q.q)).size, bank.length);
  eq('each level has enough for the complete test', ['B1', 'B2', 'C1'].map((l) => bank.filter((q) => q.level === l).length >= P.MODES.full.per), [true, true, true]);
  const lv = (items) => ['B1', 'B2', 'C1'].map((l) => items.filter((q) => q.level === l).length);
  eq('the complete test has 12 per level, easiest first', [lv(P.pick(bank, 12)), P.pick(bank, 12).map((q) => q.level).join('') === 'B1'.repeat(12) + 'B2'.repeat(12) + 'C1'.repeat(12)], [[12, 12, 12], true]);
  const mixed = P.pick(bank, 12, P.MIX.full), sk = (items, k) => ['B1', 'B2', 'C1'].map((l) => items.filter((q) => q.level === l && q.skill === k).length);
  eq('the complete test mixes in 2 reading items per level and keeps 12 per level', [lv(mixed), sk(mixed, 'reading')], [[12, 12, 12], [2, 2, 2]]);
  eq('the short test has one reading item per level and the default has none', [sk(P.pick(bank, 4, P.MIX.short), 'reading'), P.pick(bank, 12).some((q) => q.skill)], [[1, 1, 1], false]);
  eq('the complete test has one listening item per level, with its recording', [sk(mixed, 'listening'), mixed.filter((q) => q.skill === 'listening').every((q) => q.audioId && q.script.length && q.options.length === 4)], [[1, 1, 1], true]);
  eq('the short test and the default have no listening items', [sk(P.pick(bank, 4, P.MIX.short), 'listening'), P.pick(bank, 12).some((q) => q.skill === 'listening')], [[0, 0, 0], false]);
  eq('the short test has 4 per level and no repeats', [lv(P.pick(bank, 4)), new Set(P.pick(bank, 4)).size], [[4, 4, 4], 12]);
  eq('verdict bands', [{ B1: [3, 8], B2: [0, 8], C1: [0, 8] }, { B1: [8, 8], B2: [3, 8], C1: [0, 8] }, { B1: [8, 8], B2: [7, 8], C1: [2, 8] }, { B1: [8, 8], B2: [7, 8], C1: [6, 8] }].map((x) => P.verdict(x).band), [0, 1, 2, 3]);
  eq('adaptive starts at B2, goes up after a right answer and down after a wrong one', [P.next([]), P.next([{ level: 'B2', ok: true }]), P.next([{ level: 'B2', ok: false }]), P.next([{ level: 'C1', ok: true }]), P.next([{ level: 'B1', ok: false }])], [1, 2, 0, 2, 0]);
  const top = P.adaptiveLevels([{ level: 'B2', ok: true }, { level: 'C1', ok: true }, { level: 'C1', ok: true }, { level: 'C1', ok: false }]);
  eq('adaptive: passing C1 counts B1 as passed, and the verdict is C1 work', [top.B1, P.verdict(top).band], [[1, 1], 3]);
  const low = P.adaptiveLevels([{ level: 'B2', ok: false }, { level: 'B1', ok: false }, { level: 'B1', ok: false }]);
  eq('adaptive: failing B1 counts C1 as failed, and the verdict is foundations', [low.C1, P.verdict(low).band], [[0, 1], 0]);
}

let swDone = Promise.resolve();
/* --- the service worker: scripts come from the cache without the network, the page itself is network-first, installs bypass the HTTP cache --- */
{
  const store = {}, calls = [], handlers = {};
  class Req { constructor(u, o) { this.url = u.url || new URL(u, 'https://x.test/c1-path/').href; this.method = 'GET'; this.mode = (o && o.mode) || 'no-cors'; this.cache = o && o.cache; this.headers = { get: () => null }; } }
  const cacheObj = (n) => ({ addAll: async (rs) => { rs.forEach((r) => { calls.push('add ' + r.cache); (store[n] = store[n] || {})[r.url] = 'x'; }); }, put: async (r, v) => { (store[n] = store[n] || {})[r.url] = v; }, match: async (r) => (store[n] || {})[r.url] });
  const sw = { self: { location: { origin: 'https://x.test' }, addEventListener: (k, f) => { handlers[k] = f; }, skipWaiting() {}, clients: { claim() {} } }, URL, Request: Req, Response: class {},
    caches: { open: async (n) => cacheObj(n), match: async (r) => { for (const n in store) if (store[n][r.url]) return store[n][r.url]; }, keys: async () => Object.keys(store), delete: async () => {} },
    fetch: async (r, o) => { calls.push('net ' + new URL(r.url).pathname + (o ? ' ' + o.cache : '')); return { ok: true, clone() { return this; } }; }, console };
  vm.createContext(sw); vm.runInContext(read('sw.js'), sw);
  let w; handlers.install({ waitUntil: (p) => { w = p; } });
  swDone = w.then(async () => {
    const adds = calls.splice(0), go = async (url, mode) => { let p; handlers.fetch({ request: new Req(url, { mode }), respondWith: (x) => { p = x; } }); if (p) await p; return calls.splice(0); };
    eq('install fetches every file past the HTTP cache', [adds.length > 100, adds.every((c) => c === 'add reload')], [true, true]);
    eq('the worker takes over only after every file is cached', /addAll\([^;]*\)\)\.then\(\(\) => self\.skipWaiting/.test(read('sw.js')), true);
    eq('a script is served from the cache with no network', await go('js/app.js'), []);
    eq('the page is network-first', [await go('index.html', 'navigate'), await go('./', 'navigate')], [['net /c1-path/index.html no-cache'], ['net /c1-path/ no-cache']]);
    eq('a file that was not precached is fetched once, then cached', [(await go('icons/new.png')).length, (await go('icons/new.png')).length], [1, 0]);
  });
}

/* --- notes: safe Markdown, sub-notes, categories, and the AI organiser's answer is checked before anything changes --- */
let notesDone = Promise.resolve();
{
  const N = device(['js/notes.js']).Notes, md = N.md;
  eq('Markdown marks become tags', md('**b** *i* ~~s~~ ==m== `c`'), '<p><strong>b</strong> <em>i</em> <s>s</s> <mark>m</mark> <code>c</code></p>');
  eq('HTML in a note is escaped, not run', [md('<script>alert(1)</script> <img src=x onerror=y>').includes('<script'), md('<b>x</b>').includes('&lt;b&gt;'), md('[x](javascript:alert(1))').includes('<a ')], [false, true, false]);
  eq('only http(s) links become links, opened safely', md('[site](https://example.com/a?b=1)'), '<p><a href="https://example.com/a?b=1" target="_blank" rel="noopener">site</a></p>');
  eq('lists, headings and quotes', [md('- a\n- b'), md('1. a\n2. b'), md('# T'), md('> q')], ['<ul><li>a</li><li>b</li></ul>', '<ol><li>a</li><li>b</li></ol>', '<h4>T</h4>', '<blockquote>q</blockquote>']);
  eq('formatting inside code is left alone and plain text keeps its line breaks', [md('`**x**`'), md('a\nb')], ['<p><code>**x**</code></p>', '<p>a<br>b</p>']);
  const n = (id, parent, ts, tag) => ({ id, parent: parent || '', ts: ts || 1, tag: tag || 'Other', title: id, text: id });
  const ids = (ts) => ts.map((x) => x.note.id + ':' + x.depth + '(' + x.children.map((c) => c.note.id).join(',') + ')');
  eq('sub-notes nest under their parent, oldest first', ids(N.tree([n('a'), n('b', 'a', 3), n('c', 'a', 2)])), ['a:0(c,b)']);
  eq('a note whose parent is missing is top-level', N.tree([n('x', 'gone')]).map((x) => x.note.id), ['x']);
  const flat = (ts) => ts.flatMap((x) => [x.note.id].concat(flat(x.children)));
  eq('a loop of parents still shows every note exactly once', flat(N.tree([n('p', 'q'), n('q', 'p')])).sort(), ['p', 'q']);
  eq('nesting stops at 3 levels in the display', N.tree([n('a'), n('b', 'a'), n('c', 'b'), n('d', 'c')]).length >= 1 && JSON.stringify(N.tree([n('a'), n('b', 'a'), n('c', 'b'), n('d', 'c')])).includes('"depth":3'), false);
  eq('categories: defaults first, then the ones in use', N.categories([n('a', '', 1, 'Zebra'), n('b', '', 1, 'Idioms'), n('c', '', 1, 'Grammar')]).slice(-2), ['Idioms', 'Zebra']);
  const all = [n('a'), n('b', 'a'), n('c', 'b'), n('d')];
  eq('a note cannot move under itself or its own descendants, or beyond 3 levels', [N.canMove(all, 'a', 'a'), N.canMove(all, 'a', 'c'), N.canMove(all, 'd', 'c'), N.canMove(all, 'd', 'b'), N.canMove(all, 'b', '')], [false, false, false, true, true]);
  /* deleting a note deletes its sub-notes, and the deletion syncs */
  const D = device(), a1 = D.Store.addNote({ text: 'a' }), b1 = D.Store.addNote({ text: 'b', parent: a1.id }), c1 = D.Store.addNote({ text: 'c', parent: b1.id }), o1 = D.Store.addNote({ text: 'other' });
  eq('descendants are found at any depth', D.Store.noteDescendants(a1.id).map((x) => x.text).sort(), ['b', 'c']);
  D.Store.deleteNote(a1.id);
  eq('deleting a note takes its sub-notes with it and leaves the rest', D.Store.notes().map((x) => x.text), ['other']);
  /* the tutor: at most two check questions per chat, one answer per question */
  const AIc = device(['js/ai.js']).AI, tut = (t) => ({ role: 'tutor', text: t }), usr = { role: 'user', text: 'q' };
  eq('Pica may set a check question at first', /may end with one check question/.test(AIc.checkRule([usr])), true);
  eq('after a check question she only marks the answer', /answering your check question/.test(AIc.checkRule([usr, tut('Because...\nTry it: I ___ (go)'), usr])), true);
  eq('after two check questions she sets no more', /may NOT set any exercise/.test(AIc.checkRule([usr, tut('A\nTry it: x'), usr, tut('ok'), usr, tut('B\nTry it: y'), usr, tut('ok'), usr])), true);
  /* the organiser: a made-up answer from the model is cleaned before it can change anything */
  const notes = [n('n1', '', 5, 'Grammar'), n('n2', '', 4, 'Grammar'), n('n3', '', 3, 'Other'), n('n4', '', 2, 'Other')];
  const reply = { notes: [{ id: 'n1', category: 'Tenses <b>!</b>', parent: '' }, { id: 'n2', category: 'Tenses', parent: 'n1' }, { id: 'n3', category: 'Idioms', parent: 'n3' }, { id: 'n4', category: '', parent: 'nope' }, { id: 'zzz', category: 'X', parent: '' }] };
  const AIo = device(['js/ai.js']);
  AIo.localStorage.setItem('c1path.apikey.gemini', 'test-key');
  AIo.fetch = async () => ({ ok: true, json: async () => ({ candidates: [{ content: { parts: [{ text: 'Here you go: ' + JSON.stringify(reply) }] } }] }) });
  notesDone = AIo.AI.organizeNotes(notes, ['Grammar', 'Other']).then((r) => {
    const by = Object.fromEntries(r.changes.map((c) => [c.id, c]));
    eq('the organiser keeps every note once, strips markup from categories and drops bad parents', [r.changes.length, by.n1.category, by.n2.parent, by.n3.parent, by.n4.category, by.n4.parent], [4, 'Tenses', 'n1', '', 'Other', '']);
  });
}

/* --- streaks: the best run of days --- */
{
  const D = device(), day = (n) => new Date(Date.UTC(2026, 0, 1 + n)).toISOString().slice(0, 10);
  eq('no practice, no best streak', D.Store.bestStreak(), 0);
  [0, 1, 2, 5, 6, 7, 8, 9, 20].forEach((n) => { D.Store.state.days[day(n)] = 3; });
  D.Store.state.days[day(3)] = 0;
  eq('the best streak is the longest run of days with answers (days 5 to 9 here)', D.Store.bestStreak(), 5);
}

/* --- Pica without an AI key: answers come from the site, and nothing is invented --- */
{
  const D = device(['data/grammar.js', 'data/grammar2.js', 'data/grammar3.js', 'data/grammar4.js', 'data/grammar5.js', 'data/tricks.js', 'data/tricks2.js', 'data/tricks3.js', 'data/tricks4.js', 'data/trickdrills.js', 'data/trickdrills2.js', 'data/vocab.js', 'data/vocab2.js', 'data/vocab3.js', 'data/vocab4.js', 'data/vocab5.js', 'data/vocab6.js', 'data/trickmap.js', 'js/pica_local.js']), P = D.PicaLocal;
  const links = (s) => [...s.matchAll(/\]\(([^)]*)\)/g)].map((m) => m[1]);
  const a1 = P.answer('what is the difference between since and for?');
  eq('a question about since and for finds the trick and links to it', [/since/i.test(a1), links(a1).some((l) => /^#\/tricks\/[a-z]+-\d+$|^#\/grammar\//.test(l))], [true, true]);
  const a2 = P.answer('When do I use the third conditional?');
  eq('the third conditional finds the conditionals lesson', links(a2).includes('#/grammar/conditionals'), true);
  const a3 = P.answer('Can you give me a recipe for paella?');
  eq('something it does not know gets an honest "not found" and pointers, not an invented answer', [/could not find that/.test(a3), links(a3).every((l) => /^#\//.test(l))], [true, true]);
  eq('an empty question is handled', /could not find that/.test(P.answer('')), true);
  const outs = ['since or for', 'inversion', 'make or do', 'break the ice', 'wish', 'used to', 'despite although'].map(P.answer);
  eq('answers hold no HTML and only links inside the site', [outs.some((o) => /<[a-z\/]/i.test(o)), outs.every((o) => links(o).every((l) => /^#\//.test(l)))], [false, true]);
  const ex = P.explain('Exercise question: I wish I ___ more time.\nMy answer: have\nCorrect answer: had\nThe given explanation: A wish about the present takes a past form.');
  eq('a wrong answer is explained with the exercise\'s own explanation', [/\*\*have\*\*/.test(ex), /\*\*had\*\*/.test(ex), /past form/.test(ex)], [true, true, true]);
}

/* --- Say this, not that: the questions built from the pairs --- */
{
  const D = device(['data/saythis.js', 'data/saythis2.js', 'data/saythis3.js', 'data/saythis4.js', 'js/saythis.js']), S = D.SayThis, shuffle = (a) => a.slice().sort(() => Math.random() - 0.5);
  const pairs = S.all();
  eq('there are at least 90 pairs in 12 themes', [pairs.length >= 90, D.C1.saythis.length], [true, 12]);
  const qs = S.practice(pairs, pairs.length, shuffle), bad = qs.filter((q, i) => q.type !== 'mcq' || q.options.length !== 2 || q.answer < 0 || !/___/.test(q.q) || !q.why);
  eq('every pair becomes a two-option question with the gap, the reason and the right answer', [qs.length, bad.length, new Set(qs.map((q) => q.uid)).size], [pairs.length, 0, pairs.length]);
  const p = pairs[0], q = S.item(p, shuffle);
  eq('the right option is the natural phrase and the other is the learner\'s version', [q.options[q.answer], q.options[1 - q.answer]], [S.esc(p.say), S.esc(p.not)]);
  eq('the text of a pair is escaped so it can never become markup', S.item({ not: '<b>x</b>', say: 'y & z', ctx: 'A: ___ <i>', why: 'w' }, shuffle).q, 'A: ___ &lt;i&gt;');
}

/* --- vocabulary games: every question is well formed and has one answer --- */
{
  const D = device(['data/vocab.js', 'data/vocab2.js', 'data/vocab3.js', 'data/vocab4.js', 'data/vocab5.js', 'data/vocab6.js', 'data/vocabmulti.js', 'js/vgames.js']), G = D.VGames;
  const all = D.C1.vocab.flatMap((g) => g.cards.map((c, i) => Object.assign({ id: g.id + '-' + i, group: g.id, groupTitle: g.title, section: g.section }, c)));
  const shuffle = (a) => a.slice().sort(() => Math.random() - 0.5), exOf = (c) => [c.ex];
  for (const kind of ['mean', 'type', 'gap', 'hear', 'mix']) {
    const items = G.build(kind, all, 40, shuffle, exOf), uids = new Set(items.map((i) => i.uid));
    const bad = items.filter((it) => !it.why || !it.uid || (it.type === 'mcq' ? it.options.length !== 4 || new Set(it.options).size !== 4 || !(it.answer >= 0 && it.answer < 4) : !it.answers.length || it.answers.some((a) => !a.trim()) || !/___/.test(it.q)));
    eq('game "' + kind + '": 40 well formed questions from different cards', [items.length, uids.size, bad.length], [40, 40, 0]);
  }
  const g = G.build('gap', all, 5, shuffle, exOf)[0];
  eq('a fill-the-gap question hides the expression and accepts it', [/\[\[/.test(g.q), g.answers.length], [false, 1]);
  const t = G.build('type', all, 30, shuffle, exOf);
  eq('typed questions only use expressions that can be typed', t.every((it) => it.answers.every((a) => /^[a-z' -]+$/i.test(a))), true);
  eq('"to" can be left out when typing a verb phrase', G.answersOf({ phrase: 'to break the ice' }), ['to break the ice', 'break the ice']);
}


/* --- AI requests: a passing failure is tried again (3 tries), a refusal is not --- */
let retryDone = Promise.resolve();
{
  const mk = (replies) => {
    const D = device(['js/ai.js']), seen = [];
    D.localStorage.setItem('c1path.apikey.gemini', 'k'); D.AI.retryDelays = [0, 0];
    D.fetch = async () => { const r = replies[Math.min(seen.length, replies.length - 1)]; seen.push(1); if (r === 'net') throw new Error('offline'); return r; };
    D.D = { seen, retries: [] }; D.AI.onRetry = (n, t) => D.D.retries.push(n + '/' + t);
    return D;
  };
  const okRes = { ok: true, status: 200, json: async () => ({ candidates: [{ content: { parts: [{ text: 'OK' }] } }] }) };
  const bad = (status) => ({ ok: false, status, json: async () => ({ error: { message: 'x' } }) });
  const A1 = mk([bad(503), bad(503), okRes]), A2 = mk([bad(401)]), A3 = mk(['net']), A4 = mk([bad(429), okRes]);
  retryDone = Promise.all([A1.AI.test(), A2.AI.test().catch((e) => 'ERR'), A3.AI.test().catch((e) => e.message), A4.AI.test()]).then(([r1, r2, r3, r4]) => {
    eq('two busy answers and then a good one: Pica gets the answer, after 3 tries', [r1, A1.D.seen.length, A1.D.retries], ['OK', 3, ['2/3', '3/3']]);
    eq('a refused key is not tried again', [r2, A2.D.seen.length], ['ERR', 1]);
    eq('no connection: 3 tries, then the error to show', [r3, A3.D.seen.length], ['Could not reach the API. Check your connection.', 3]);
    eq('a 429 (busy) is tried again', [r4, A4.D.seen.length], ['OK', 2]);
  });
}

swDone.then(() => notesDone).then(() => retryDone).then(() => {
  console.log(`${passed} passed, ${failed} failed`);
  process.exit(failed ? 1 : 0);
});
