/* Renders every page of the site in Node with a small fake DOM: node tools/smoke.js
   Loads index.html's scripts in order, then visits each route and checks nothing throws and the page is not empty.
   Also checks that h() and view() flatten nested arrays and skip null/false. */
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script src="([^"]+)"/g)].map((m) => m[1]);

class Text_ { constructor(d) { this.data = String(d); this.nodeType = 3; } }
class Node_ {
  constructor(tag) { this.tag = tag; this.children = []; this.attrs = {}; this.className = ''; this.innerHTML = ''; this.style = {}; this.dataset = {}; this.value = ''; this.nodeType = 1; }
  get textContent() { return this.children.map((c) => (c.nodeType === 3 ? c.data : c.textContent)).join('') || this._t || ''; }
  set textContent(v) { this.children = []; this._t = String(v); }
  append(...k) { k.forEach((c) => this.children.push(typeof c === 'string' ? new Text_(c) : c)); }
  appendChild(c) { this.append(c); return c; }
  prepend(...k) { this.children.unshift(...k); }
  replaceChildren(...k) { this.children = []; this._t = ''; this.append(...k); }
  setAttribute(k, v) { this.attrs[k] = String(v); }
  getAttribute(k) { return k in this.attrs ? this.attrs[k] : null; }
  removeAttribute(k) { delete this.attrs[k]; }
  addEventListener() {} removeEventListener() {}
  get classList() {
    const s = this, has = (c) => s.className.split(' ').includes(c);
    return { add: (c) => { if (!has(c)) s.className = (s.className + ' ' + c).trim(); }, remove: (c) => { s.className = s.className.split(' ').filter((x) => x && x !== c).join(' '); }, contains: has,
      toggle(c, on) { (on === undefined ? !has(c) : on) ? this.add(c) : this.remove(c); } };
  }
  querySelector() { return null; } querySelectorAll() { return []; } closest() { return null; }
  before() {} after() {} focus() {} blur() {} click() {} scrollIntoView() {} remove() {} insertBefore(c) { this.append(c); return c; }
  getBoundingClientRect() { return { top: 0, left: 0, width: 0, height: 0 }; }
  get parentNode() { return null; } get firstChild() { return this.children[0] || null; }
}

const mem = {};
const app = new Node_('main');
const document = {
  createElement: (t) => new Node_(t), createTextNode: (d) => new Text_(d), createDocumentFragment: () => new Node_('#frag'),
  getElementById: (id) => (id === 'app' ? app : new Node_('div')), querySelector: () => null, querySelectorAll: () => [],
  addEventListener() {}, removeEventListener() {}, body: new Node_('body'), documentElement: new Node_('html'), hidden: false, title: '', activeElement: null
};
const sb = {
  console, document, setTimeout: () => 0, clearTimeout() {}, setInterval: () => 0, clearInterval() {},
  localStorage: { getItem: (k) => (k in mem ? mem[k] : null), setItem: (k, v) => { mem[k] = String(v); }, removeItem: (k) => { delete mem[k]; } },
  speechSynthesis: { getVoices: () => [], addEventListener() {}, cancel() {}, speak() {} }, SpeechSynthesisUtterance: function () {},
  matchMedia: () => ({ matches: false, addEventListener() {} }), navigator: { userAgent: 'node' },
  location: { hash: '', href: 'http://localhost/', protocol: 'http:', replace(h) { this.hash = h; } },
  addEventListener() {}, removeEventListener() {}, scrollTo() {}, scrollY: 0, requestAnimationFrame: () => 0, fetch: () => Promise.reject(new Error('offline')),
  confirm: () => true, alert() {}, URL, URLSearchParams, Blob: function () {}, Audio: function () { this.play = () => Promise.resolve(); this.pause = () => {}; this.addEventListener = () => {}; this.removeEventListener = () => {}; this.load = () => {}; this.style = {}; },
  getComputedStyle: () => ({}), history: { replaceState() {} }
};
sb.window = sb; sb.self = sb;
vm.createContext(sb);
for (const f of scripts.filter((s) => !/^(https?:)?\/\//.test(s))) {
  try { vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), sb, { filename: f }); }
  catch (e) { console.error('Could not load ' + f + ': ' + e.stack); process.exit(2); }
}

let failed = 0, ok = 0;
const check = (name, cond, info) => { if (cond) ok++; else { failed++; console.error('FAIL ' + name + (info ? ': ' + info : '')); } };

/* ---- h() and view() flatten nested children and skip null/false ---- */
{
  const { h } = sb.Engine;
  const el = h('div', {}, 'a', [h('b', {}, 'b'), [null, false, h('i', {}, 'c')]], null, false, 0);
  check('h() flattens nested arrays', el.children.length === 4 && el.children[1].tag === 'b' && el.children[2].tag === 'i');
  check('h() keeps the number 0', el.children[3].data === '0');
  const a = h('a', { href: '#/x', hidden: false, 'data-k': null, class: 'c' });
  check('h() skips false/null attributes', a.attrs.href === '#/x' && !('hidden' in a.attrs) && !('data-k' in a.attrs) && a.className === 'c');
  sb.App.view(h('h1', {}, 'T'), [h('p', {}, 'x'), [null, h('p', {}, 'y')]], false, null);
  check('view() flattens and skips null/false', app.children.length === 3 && app.children.every((c) => c.tag));
}

/* ---- every route renders ---- */
const C1 = sb.C1, routes = ['', 'welcome', 'course', 'course/mix', 'toolkit', 'progress', 'review', 'mistakes', 'mistakes/practice', 'placement', 'exams', 'privacy', 'mock', 'tricks', 'generate', 'certacles', 'plan', 'weak',
  'grammar', 'vocab', 'practice', 'skills', 'skills/listening', 'skills/writing', 'skills/writing/guide', 'skills/speaking', 'skills/pronunciation', 'vquiz/all'];
C1.course.forEach((u) => routes.push('course/' + u.id, 'course/' + u.id + '/review'));
C1.grammar.forEach((g) => routes.push('grammar/' + g.id));
C1.vocab.forEach((v) => routes.push('vocab/' + v.id));
C1.practice.forEach((p) => { routes.push('practice/' + p.id); p.sets.forEach((_, i) => routes.push('practice/' + p.id + '/' + i)); });
(C1.listening || []).forEach((l) => routes.push('skills/listening/' + l.id));
((C1.writing || {}).tasks || []).forEach((t) => routes.push('skills/writing/' + t.id));
((C1.speaking || {}).sets || []).forEach((s) => routes.push('skills/speaking/' + s.id));
(C1.pron || []).forEach((g) => routes.push('skills/pronunciation/' + g.id));
sb.Store.state.welcomed = true;
for (const r of routes) {
  try {
    sb.location.hash = '#/' + r; app.children = []; sb.App.route();
    const redirected = sb.location.hash !== '#/' + r;
    check('route #/' + r + ' renders', redirected || app.children.length > 0 && app.textContent.trim().length > 20 && !/^Not found/.test(app.textContent), 'empty or not found');
  } catch (e) { check('route #/' + r + ' renders', false, e.message); }
}
/* ---- recordings and links ---- */
{
  const A = (C1.audio || {}).listening || {};
  (C1.listening || []).forEach((l) => {
    const a = A[l.id];
    check('listening "' + l.id + '" has a recording', !!a);
    if (!a) return;
    check('recording of "' + l.id + '" exists on disk', fs.existsSync(path.join(root, a.src)));
    check('recording of "' + l.id + '" has one mark per line', a.marks.length === l.script.length, a.marks.length + ' marks, ' + l.script.length + ' lines');
  });
  Object.keys(A).forEach((id) => check('recording "' + id + '" belongs to a listening set', (C1.listening || []).some((l) => l.id === id)));
  const known = new Set(['', 'welcome', 'course', 'toolkit', 'progress', 'review', 'mistakes', 'placement', 'exams', 'privacy', 'mock', 'grammar', 'vocab', 'practice', 'vquiz', 'skills', 'notebook', 'pronunciation', ...Object.keys(sb.App.routes)]);
  const ids = { grammar: C1.grammar.map((g) => g.id), vocab: C1.vocab.map((v) => v.id), course: C1.course.map((u) => u.id).concat(['mix']), practice: C1.practice.map((p) => p.id) };
  const bad = new Set();
  for (const f of fs.readdirSync(path.join(root, 'js')).map((x) => 'js/' + x).concat(fs.readdirSync(path.join(root, 'data')).map((x) => 'data/' + x), ['index.html'])) {
    const src = fs.readFileSync(path.join(root, f), 'utf8');
    for (const m of src.matchAll(/#\/([a-z]*)(?:\/([a-z0-9-]+))?/g)) {
      if (!known.has(m[1])) bad.add(f + ' -> #/' + m[1]);
      else if (ids[m[1]] && m[2] && !ids[m[1]].includes(m[2])) bad.add(f + ' -> #/' + m[1] + '/' + m[2]);
    }
  }
  check('every #/ link in the code points to a real page', !bad.size, [...bad].join('; '));
}
{
  /* pages that only show with data: practised days, a full test, an exam date */
  const d = (n) => new Date(Date.now() - n * 864e5).toLocaleDateString('sv');
  sb.Store.state.days[d(0)] = 12; sb.Store.state.days[d(9)] = 4; sb.Store.addMock({ ts: 1, kind: 'Reading', c: 30, t: 60 }); sb.Store.setExam(d(-30));
  for (const r of ['progress', '', 'plan']) { sb.location.hash = '#/' + r; app.children = []; try { sb.App.route(); check('route #/' + r + ' renders with data', /last 7 days|Exam plan|days? to your exam|Level/.test(app.textContent)); } catch (e) { check('route #/' + r + ' renders with data', false, e.message); } }
}
sb.location.hash = '#/nope'; sb.App.route();
check('unknown route shows Not found', /Not found/.test(app.textContent));

console.log(`${ok} checks passed, ${failed} failed, ${routes.length} routes visited`);
process.exit(failed ? 1 : 0);
