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
  append(...k) { k.forEach((c) => this.children.push(c && c.nodeType ? c : new Text_(c))); } // like a browser: append(null) writes the text "null"
  appendChild(c) { this.append(c); return c; }
  prepend(...k) { this.children.unshift(...k); }
  replaceChildren(...k) { this.children = []; this._t = ''; this.append(...k); }
  setAttribute(k, v) { this.attrs[k] = String(v); }
  getAttribute(k) { return k in this.attrs ? this.attrs[k] : null; }
  removeAttribute(k) { delete this.attrs[k]; }
  addEventListener(t, f) { (this.ls = this.ls || {})[t] = (this.ls[t] || []).concat(f); } removeEventListener() {}
  all(pred, out = []) { this.children.forEach((c) => { if (c.nodeType === 1) { if (pred(c)) out.push(c); c.all(pred, out); } }); return out; }
  get classList() {
    const s = this, has = (c) => s.className.split(' ').includes(c);
    return { add: (c) => { if (!has(c)) s.className = (s.className + ' ' + c).trim(); }, remove: (c) => { s.className = s.className.split(' ').filter((x) => x && x !== c).join(' '); }, contains: has,
      toggle(c, on) { (on === undefined ? !has(c) : on) ? this.add(c) : this.remove(c); } };
  }
  querySelector() { return null; } querySelectorAll() { return []; } closest() { return null; }
  dispatchEvent() { return true; }
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
  CustomEvent: function (t, o) { this.type = t; this.detail = o && o.detail; }, confirm: () => true, alert() {}, URL, URLSearchParams, Blob: function () {}, Audio: function () { this.play = () => Promise.resolve(); this.pause = () => {}; this.addEventListener = () => {}; this.removeEventListener = () => {}; this.load = () => {}; this.style = {}; },
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

/* ---- a perfect score: the result box must not print "null" ---- */
{
  const wrap = sb.Engine.quiz([{ type: 'gap', q: 'She ___ home.', answers: ['went'], why: 'Past simple.' }], { source: { topic: 't', label: 'T', href: '#/' } });
  wrap.all((n) => n.tag === 'input')[0].value = 'went';
  wrap.all((n) => n.tag === 'button' && /Check answers/.test(n.textContent))[0].ls.click.forEach((f) => f({}));
  const text = wrap.textContent;
  check('perfect score shows the praise and no "null"', /Strong/.test(text) && /What to do next/.test(text) && !/null|undefined/.test(text), text.slice(-120));
}

/* ---- difficulty ladder and recommendations ---- */
{
  const A = sb.App, lvl = (t, i) => A.setLevel(t, i);
  sb.C1.practice.forEach((p) => {
    const ord = A.setOrder(p.id), levels = ord.map((i) => lvl(p.id, i));
    check('sets of ' + p.id + ' are listed from easier to harder', levels.every((v, k) => !k || v >= levels[k - 1]) && ord.length === p.sets.length);
  });
  const hrefOf = (src, pct, wrongN) => A.recommendFor(src, pct, Array.from({ length: 6 }, (_, k) => ({ ok: k >= wrongN }))).map((r) => r.href);
  /* a set with room above and below: pick a mid-level mcq set */
  const type = 'mcq', mid = A.setOrder(type).find((i) => lvl(type, i) === 3), src = { topic: 'u-mcq', href: '#/practice/mcq/' + mid };
  const levelOfHref = (h) => lvl(type, +h.split('/').pop());
  const strong = A.recommendFor(src, 100, []), weak = A.recommendFor(src, 30, [{ ok: false }]);
  const up = strong.map((r) => r.href).filter((h) => /#\/practice\/mcq\/\d+/.test(h)), down = weak.map((r) => r.href).filter((h) => /#\/practice\/mcq\/\d+/.test(h));
  check('a perfect score recommends a harder or equal set, never the same one', up.length > 0 && up.every((h) => levelOfHref(h) >= 3 && h !== src.href), up.join());
  check('a low score recommends an easier set, never the same one', down.length > 0 && down.every((h) => levelOfHref(h) <= 3 && h !== src.href), down.join());
  check('a low score also recommends building the base', weak.some((r) => /^#\/(vocab|grammar)/.test(r.href)));
  check('every recommendation points to a real page', [...strong, ...weak].every((r) => r.title && r.sub && /^#\//.test(r.href)));
  const lesson = A.grammar[0], lsrc = { topic: 'g-' + lesson.id, href: '#/grammar/' + lesson.id };
  check('a strong lesson score recommends practice or the next lesson', A.recommendFor(lsrc, 100, []).some((r) => /practice|grammar/.test(r.href) && r.href !== lsrc.href));
  check('a weak lesson score recommends re-reading it', A.recommendFor(lsrc, 30, [{ ok: false }]).some((r) => r.href === lsrc.href));
  const lis = sb.C1.listening[0], isrc = { topic: 'listen', href: '#/skills/listening/' + lis.id };
  check('a weak listening score recommends dictation', A.recommendFor(isrc, 20, [{ ok: false }]).some((r) => /dictation/.test(r.href)));
  check('unknown quiz sources still get advice', A.recommendFor({ topic: 'mix', href: '#/course/mix' }, 50, [{ ok: false }]).length >= 1);
  check('at most three recommendations are shown', A.recommend(src, 50, [{ ok: false }]).children.slice(1).length <= 3);
  void hrefOf;
  /* adaptive: the harder set follows the learner's level, and a score counts against the set's difficulty */
  {
    const one = (t, l) => A.setOrder(t).find((i) => lvl(t, i) === l), lowSet = one('cloze', 1), hiSet = one('cloze', 5), midSet = one('cloze', 3);
    const recsAt = (set, pct) => A.recommendFor({ topic: 'u-cloze', href: '#/practice/cloze/' + set }, pct, [{ ok: false }]);
    check('90% on a difficulty-1 set is not "strong" enough to jump up', !recsAt(lowSet, 90).some((r) => /harder set/.test(r.title)), recsAt(lowSet, 90).map((r) => r.title).join('|'));
    check('75% on a difficulty-5 set counts as strong', recsAt(hiSet, 75).some((r) => /Practise|harder|Continue|every set/.test(r.title)) && !recsAt(hiSet, 75).some((r) => /Step down/.test(r.title)));
    sb.Store.setScore('cloze/' + midSet, 9, 10);
    check('after passing a difficulty-3 set the next one is difficulty 3 or above', A.competence('cloze') >= 3 && recsAt(midSet, 95).filter((r) => /practice\/cloze\/\d+/.test(r.href)).every((r) => lvl('cloze', +r.href.split('/').pop()) >= 3));
    delete sb.Store.state.scores['cloze/' + midSet];
  }
  /* home: placement first, then the weakest exam part */
  {
    const st = sb.Store.state, keep = [st.placement, st.stats['u-wf']];
    st.placement = null; check('a new learner is sent to the placement test first', A.homeSteps()[0][2] === '#/placement');
    st.placement = { date: '2026-01-01', summary: 'x' }; st.stats['u-wf'] = { c: 2, t: 10 };
    check('the weakest exam part is recommended at home', A.homeSteps().some((s) => /#\/practice\/wf\/\d+/.test(s[2])));
    check('home always ends with a mixed review and has no duplicate links', A.homeSteps().slice(-1)[0][2] === '#/course/mix' && new Set(A.homeSteps().map((s) => s[2])).size === A.homeSteps().length);
    st.placement = keep[0]; if (keep[1]) st.stats['u-wf'] = keep[1]; else delete st.stats['u-wf'];
  }
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
    if (/^(practice\/[a-z]+\/\d+|grammar\/.+|skills\/listening\/.+|vquiz.*)$/.test(r) && !r.startsWith('practice/reading')) {
      /* press "Check answers" with nothing filled in, then read the result box */
      const b = app.all((n) => n.tag === 'button' && /Check answers/.test(n.textContent))[0];
      if (b) { try { (b.ls.click || []).forEach((f) => f({ preventDefault() {} })); check('quiz result on #/' + r + ' has no null/undefined text', !/null|undefined|\[object/.test(app.textContent), app.textContent.match(/.{20}(null|undefined).{10}/)); } catch (e) { check('checking answers on #/' + r, false, e.message); } }
    }
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
/* ---- a learner who has done everything: every page must still render with no NaN, undefined or null in the text ---- */
{
  const S = sb.Store.state, d = (n) => new Date(Date.now() - n * 864e5).toLocaleDateString('sv');
  C1.practice.forEach((p) => { p.sets.forEach((_, i) => { S.scores[p.id + '/' + i] = { p: 0.9, c: 9, t: 10 }; }); S.stats['u-' + p.id] = { c: 90, t: 100 }; });
  C1.grammar.forEach((g) => { S.lessons[g.id] = true; S.stats['g-' + g.id] = { c: 8, t: 10 }; });
  C1.listening.forEach((l) => { S.scores['listen:' + l.id] = { p: 1, c: 4, t: 4 }; });
  ((C1.writing || {}).tasks || []).forEach((t) => { S.skills['writing:' + t.id] = { done: true, ts: 1, ai: [{ ts: 1, scores: { content: 3, language: 3 }, level: 'B2+' }, { ts: 2, scores: { content: 4, language: 4 }, level: 'C1' }] }; });
  for (let i = 0; i < 30; i++) S.days[d(i)] = 20 + i;
  sb.Store.state.stats['weak-x'] = { c: 1, t: 9 };
  const bad = [];
  for (const r of routes.filter((x) => !/^(welcome)$/.test(x))) {
    try { sb.location.hash = '#/' + r; app.children = []; sb.App.route(); if (/NaN|undefined|\[object|null/.test(app.textContent)) bad.push(r + ': ' + (app.textContent.match(/.{25}(NaN|undefined|\[object|null).{15}/) || [''])[0]); } catch (e) { bad.push(r + ' threw ' + e.message); }
  }
  check('with everything done, no page prints NaN/undefined/null or throws', !bad.length, bad.slice(0, 5).join(' || '));
  const home = (sb.location.hash = '#/', app.children = [], sb.App.route(), app.textContent);
  check('with everything done, home still says what to do next', /Next up/.test(home) && home.length > 200);
}
sb.location.hash = '#/nope'; sb.App.route();
check('unknown route shows Not found', /Not found/.test(app.textContent));

console.log(`${ok} checks passed, ${failed} failed, ${routes.length} routes visited`);
process.exit(failed ? 1 : 0);
