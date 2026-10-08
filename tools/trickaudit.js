/* node tools/trickaudit.js [key]: how many exercises each trick in data/trickmap.js catches, with a few examples to judge precision by eye. */
const fs = require('fs'), vm = require('vm'), path = require('path');
const root = path.join(__dirname, '..');
const sb = { console }; sb.window = sb; vm.createContext(sb);
const idx = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
[...idx.matchAll(/<script src="((?:data|audio)\/[^"]+)"/g)].forEach((m) => { try { vm.runInContext(fs.readFileSync(path.join(root, m[1]), 'utf8'), sb, { filename: m[1] }); } catch (e) { /* ignore */ } });
const C1 = sb.C1, plain = (t) => String(t == null ? '' : t).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
const items = [], seen = new Set();
(function walk(o, d) {
  if (!o || typeof o !== 'object' || d > 9 || seen.has(o)) return; seen.add(o);
  if (typeof o.why === 'string' && (o.answer !== undefined || o.answers)) items.push(o);
  Object.keys(o).forEach((k) => { if (o[k] && typeof o[k] === 'object') walk(o[k], d + 1); });
})(C1, 0);
const wrong = (it) => it.options ? it.options.find((o, i) => i !== it.answer) : '';
const exp = (it) => it.answers ? it.answers : [it.options ? it.options[it.answer] : it.answer];
const q = (it) => it.q || (it.first + ' [' + it.key + '] ' + it.second);
const by = {};
items.forEach((it) => { const r = C1.trickFor(q(it), wrong(it), exp(it)); if (r) (by[r.key] = by[r.key] || []).push(it); });
console.log(items.length + ' exercises with an explanation; ' + Object.values(by).reduce((a, b) => a + b.length, 0) + ' get a trick');
const want = process.argv[2];
Object.keys(by).sort().forEach((k) => {
  console.log(k + ': ' + by[k].length);
  if (want === k || want === 'all') by[k].slice(0, want === 'all' ? 3 : 12).forEach((it) => console.log('    - ' + plain(q(it)).slice(0, 110) + '  => ' + plain(exp(it)[0]).slice(0, 30)));
});
