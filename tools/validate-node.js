/* Runs tools/validate.js in Node (no browser): node tools/validate-node.js
   Loads the data files and js/store.js + js/engine.js in the order index.html lists them, with a minimal DOM stub. */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script src="([^"]+)"/g)].map((m) => m[1]);
const needed = scripts.filter((s) => s.startsWith('data/') || s === 'js/store.js' || s === 'js/engine.js');

const noop = () => {};
const el = () => new Proxy(function () {}, { get: (t, k) => (k === 'style' || k === 'dataset' || k === 'classList' ? el() : k === Symbol.toPrimitive ? () => '' : el()), apply: () => el() });
const sandbox = {
  console,
  localStorage: { getItem: () => null, setItem: noop, removeItem: noop },
  document: { createElement: el, getElementById: () => null, addEventListener: noop, querySelectorAll: () => [], body: el(), documentElement: el() },
  speechSynthesis: { getVoices: () => [], addEventListener: noop, cancel: noop },
  SpeechSynthesisUtterance: function () {},
  matchMedia: () => ({ matches: false, addEventListener: noop }),
  navigator: {},
  location: { hash: '' },
  addEventListener: noop,
  setTimeout, clearTimeout
};
sandbox.window = sandbox;
vm.createContext(sandbox);
for (const f of needed.concat(['tools/validate.js'])) {
  try { vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), sandbox, { filename: f }); }
  catch (e) { console.error('Could not load ' + f + ': ' + e.message); process.exit(2); }
}
const issues = sandbox.validate();
/* every trick key in data/trickmap.js must point at a real trick, and every pattern must compile */
sandbox.C1.trickMap.forEach(([key, pat]) => {
  const [sec, i] = key.split('-'), s = sandbox.C1.tricks.find((x) => x.id === sec);
  if (!s || !s.items[+i]) issues.push('trickmap: no trick ' + key);
  try { pat.split('&').forEach((p) => new RegExp(p, 'i')); } catch (e) { issues.push('trickmap: bad pattern for ' + key); }
});
/* trick drills: real trick, well-formed multiple-choice items */
Object.entries(sandbox.C1.trickDrills || {}).forEach(([key, list]) => {
  const [sec, i] = key.split('-'), s = sandbox.C1.tricks.find((x) => x.id === sec);
  if (!s || !s.items[+i]) issues.push('trickdrills: no trick ' + key);
  list.forEach((it, n) => { if (it.type !== 'mcq' || !/___/.test(it.q) || !it.options || it.options.length < 3 || new Set(it.options).size !== it.options.length || !(it.answer >= 0 && it.answer < it.options.length) || !it.why) issues.push('trickdrills: ' + key + ' #' + n + ' is malformed'); });
});
/* cards with several senses: one example per sense, each marking the phrase */
const cardsByPhrase = {}; sandbox.C1.vocab.forEach((g) => g.cards.forEach((c) => { cardsByPhrase[c.phrase] = c; }));
Object.entries(sandbox.C1.vocabMulti || {}).forEach(([ph, list]) => {
  const c = cardsByPhrase[ph];
  if (!c) { issues.push('vocabmulti: no card ' + ph); return; }
  const n = c.meaning.split(';').map((x) => x.trim()).filter(Boolean).length;
  if (list.length !== n) issues.push('vocabmulti: ' + ph + ' has ' + list.length + ' examples for ' + n + ' senses');
  list.forEach((e, i) => { if ((e.match(/\[\[.+?\]\]/g) || []).length !== 1) issues.push('vocabmulti: ' + ph + ' example ' + (i + 1) + ' needs exactly one [[phrase]] marker'); });
});
/* a stray control character (a backspace from a mis-escaped word boundary in a regular expression) silently breaks the pattern */
['js', 'tools', 'data'].forEach((d) => fs.readdirSync(path.join(root, d)).filter((f) => f.endsWith('.js')).forEach((f) => { if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(fs.readFileSync(path.join(root, d, f), 'utf8'))) issues.push(d + '/' + f + ' contains a control character (a broken escape, such as a backspace inside a regular expression?)'); }));
/* drawings of the theory pages: for a real lesson, in a real place, well formed */
{
  try { vm.runInContext(fs.readFileSync(path.join(root, 'js/diagrams.js'), 'utf8'), sandbox, { filename: 'js/diagrams.js' }); } catch (e) { issues.push('js/diagrams.js does not load: ' + e.message); }
  Object.entries(sandbox.C1.visuals || {}).forEach(([id, list]) => {
    const g = sandbox.C1.grammar.find((x) => x.id === id);
    if (!g) { issues.push('visuals: no lesson "' + id + '"'); return; }
    list.forEach((v, i) => {
      const slot = v.after || 'idea', ok = slot === 'idea' || (/^part\d+$/.test(slot) && +slot.slice(4) < g.parts.length);
      if (!ok) issues.push('visuals ' + id + '#' + i + ': the place "' + slot + '" does not exist in the lesson');
      const p = sandbox.Diagrams.check(v);
      if (p.length) issues.push('visuals ' + id + '#' + i + ' (' + v.type + '): ' + p.join('; '));
    });
  });
}
/* "Say this, not that": every pair has what it needs, one gap, two different phrases, and no phrase is taught twice */
{
  const seen = new Set();
  (sandbox.C1.saythis || []).forEach((g) => {
    if (g.items.length < 6) issues.push('saythis: theme ' + g.id + ' has fewer than 6 pairs');
    g.items.forEach((it, i) => {
      const w = 'saythis ' + g.id + '#' + i;
      if (!it.not || !it.say || !it.ctx || !it.why) issues.push(w + ': a field is missing');
      else if ((it.ctx.match(/___/g) || []).length !== 1) issues.push(w + ': the situation needs exactly one gap');
      else if (it.not.trim().toLowerCase() === it.say.trim().toLowerCase()) issues.push(w + ': both phrases are the same');
      if (!['neutral', 'informal', 'formal'].includes(it.reg) || !['B1', 'B2', 'C1'].includes(it.level) || !['wrong', 'unnatural'].includes(it.kind)) issues.push(w + ': reg, level or kind is not valid');
      if (/<[a-z]/i.test(it.not + it.say + it.ctx + it.why)) issues.push(w + ': HTML in a plain-text field');
      const k = (it.say + '|' + it.not).toLowerCase();
      if (seen.has(k)) issues.push(w + ': repeated pair');
      seen.add(k);
    });
  });
}
Object.values(cardsByPhrase).forEach((c) => { if (/<[a-z\/][^>]*>/i.test(c.phrase + c.meaning)) issues.push('vocabulary: the card "' + c.phrase + '" has HTML in its phrase or meaning (they are shown as plain text)'); });
Object.values(cardsByPhrase).forEach((c) => { if (c.meaning.includes(';') && !(sandbox.C1.vocabMulti || {})[c.phrase]) issues.push('vocabmulti: missing examples for ' + c.phrase); });
const swSrc = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
{ const want = require('./stamp_sw').expected().name; if (!swSrc.includes("'" + want + "'")) issues.push('sw.js cache name is out of date: run node tools/stamp_sw.js'); }
{ const list = JSON.parse(/const PRECACHE = (\[.*?\]);/s.exec(swSrc)[1]); list.filter((f) => f !== './' && !fs.existsSync(path.join(root, f))).forEach((f) => issues.push('sw.js PRECACHE lists a missing file (it would stop every update): ' + f)); }
scripts.concat(['css/style.css', 'manifest.webmanifest', 'icons/icon.svg']).forEach((f) => { if (!swSrc.includes('"' + f + '"')) issues.push('sw.js PRECACHE is missing ' + f); });
if (issues.length) { console.error(issues.length + ' content problem(s):\n- ' + issues.join('\n- ')); process.exit(1); }
console.log('Content OK: ' + sandbox.C1.grammar.length + ' lessons, ' + sandbox.C1.vocab.length + ' vocabulary groups, ' + sandbox.C1.practice.reduce((a, p) => a + p.sets.length, 0) + ' practice sets, ' + sandbox.C1.course.length + ' course units.');
