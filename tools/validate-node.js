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
const swSrc = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
scripts.concat(['css/style.css', 'manifest.webmanifest', 'icons/icon.svg']).forEach((f) => { if (!swSrc.includes('"' + f + '"')) issues.push('sw.js PRECACHE is missing ' + f); });
if (issues.length) { console.error(issues.length + ' content problem(s):\n- ' + issues.join('\n- ')); process.exit(1); }
console.log('Content OK: ' + sandbox.C1.grammar.length + ' lessons, ' + sandbox.C1.vocab.length + ' vocabulary groups, ' + sandbox.C1.practice.reduce((a, p) => a + p.sets.length, 0) + ' practice sets, ' + sandbox.C1.course.length + ' course units.');
