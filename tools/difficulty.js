/* Difficulty report: node tools/difficulty.js
   Shows the expert difficulty ratings (1-5) per practice type and how far they agree with a text-only estimate (long words, sentence length).
   The app lists sets from easier to harder using the ratings. */
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
const sb = { console, localStorage: { getItem: () => null, setItem() {} }, document: { createElement: () => ({}), getElementById: () => null, addEventListener() {} } };
sb.window = sb; vm.createContext(sb);
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
[...html.matchAll(/<script src="(data\/[^"]+)"/g)].forEach((m) => vm.runInContext(fs.readFileSync(path.join(root, m[1]), 'utf8'), sb));
const C1 = sb.C1;

const strip = (s) => String(s || '').replace(/<[^>]+>/g, ' ').replace(/\{\d+\}|___/g, ' ');
const textOf = (item) => item.type === 'passage' ? item.text : item.type === 'text' ? item.paras.join(' ') : item.type === 'kwt' ? item.first + ' ' + item.second : item.type === 'audio' ? '' : (item.q || '');
function stats(text) {
  const words = strip(text).match(/[A-Za-z']+/g) || [], sentences = strip(text).split(/[.!?]+/).filter((x) => /\w/.test(x));
  if (!words.length) return null;
  return { long: words.filter((w) => w.length >= 9).length / words.length, sent: words.length / Math.max(1, sentences.length) };
}
/* score = 60% long-word share (in points) + 40% mean sentence length */
const score = (st) => 60 * st.long * 100 / 10 + 0.4 * st.sent;
const rank = (a) => { const o = a.map((v, i) => [v, i]).sort((x, y) => x[0] - y[0]), r = []; o.forEach(([, i], k) => { r[i] = k; }); return r; };
const corr = (a, b) => { const n = a.length, ma = a.reduce((x, y) => x + y) / n, mb = b.reduce((x, y) => x + y) / n; let s = 0, da = 0, db = 0; a.forEach((v, i) => { s += (v - ma) * (b[i] - mb); da += (v - ma) ** 2; db += (b[i] - mb) ** 2; }); return da && db ? s / Math.sqrt(da * db) : 0; };

/* Expert ratings (data/levels*.js, 1 = warm-up to 5 = hardest) and the text-only estimate side by side: they should broadly agree. */
C1.practice.forEach((p) => {
  const sc = p.sets.map((s) => { const sts = s.items.map((i) => stats(textOf(i))).filter(Boolean); return sts.length ? score({ long: sts.reduce((a, x) => a + x.long, 0) / sts.length, sent: sts.reduce((a, x) => a + x.sent, 0) / sts.length }) : 0; });
  const lv = (C1.levels.practice[p.id] || []), dist = [1, 2, 3, 4, 5].map((n) => lv.filter((x) => x === n).length);
  console.log(p.id.padEnd(9), 'sets', String(p.sets.length).padStart(2), ' ratings 1..5:', dist.join('/'), ' agreement with the text-only estimate:', corr(rank(sc), rank(lv)).toFixed(2));
});
const levelRank = (l) => ({ B2: 1, 'B2-C1': 2, C1: 3 }[String(l).replace('–', '-')] || 0);
console.log('\nCourse order (level):', C1.course.map((u) => u.id + ':' + u.level).join('  '));
const ranks = C1.course.map((u) => levelRank(u.level)), bad = ranks.some((r, i) => i && r < ranks[i - 1]);
console.log(bad ? 'Course levels are NOT non-decreasing' : 'Course levels never go down along the course.');
