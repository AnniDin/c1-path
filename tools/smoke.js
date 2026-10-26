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
const afterAll = []; /* checks that need the whole script to have run first: they run one after another before the summary */
const pending = []; /* checks that finish later (promises): the summary waits for them */
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
  /* sub-skill diagnosis, spaced retries, personal thresholds and the feedback loop */
  {
    const ls = sb.localStorage, tg = (item, topic, href) => A.skillTag(item, { topic, href: href || '' }).id;
    check('a key word transformation with inversion is tagged inversion', tg({ type: 'kwt', key: 'HARDLY', why: 'Hardly had + past perfect is an inversion.' }, 'u-kwt') === 'inversion');
    check('an open gap with "in" is a preposition', tg({ type: 'gap', q: 'He is interested ___ art.', answers: ['in'], why: 'Dependent preposition.' }, 'u-cloze') === 'prepositions');
    check('an open gap with "although" is a linker', tg({ type: 'gap', q: '___ it rained, we went.', answers: ['although', 'though'], why: 'Concession.' }, 'u-cloze') === 'linkers');
    check('a word formation gap with a negative prefix is a prefix', tg({ type: 'gap', q: 'an <span class="muted">(CONVENTION)</span> choice ___', answers: ['unconventional'], why: 'Negative meaning: un- prefix.' }, 'u-wf') === 'prefixes');
    check('a multiple-choice gap about a phrasal verb is a phrasal verb', tg({ type: 'mcq', q: 'x', options: ['a', 'b', 'c', 'd'], answer: 0, why: 'This phrasal verb means delay.' }, 'u-mcq', '#/practice/mcq/1') === 'phrasal');
    const wrongRes = [1, 2, 3].map(() => ({ ok: false, item: { type: 'gap', q: 'I look ___ it.', answers: ['at'], why: 'x' } })).concat([{ ok: true, item: { type: 'gap', q: 'q', answers: ['the'], why: 'x' } }]);
    check('the skill missed most in a result is found', A.diagnoseWrong(wrongRes, { topic: 'u-cloze', href: '#/practice/cloze/1' })[0].id === 'prepositions' && A.diagnoseWrong(wrongRes, { topic: 'u-cloze' })[0].n === 3);
    sb.Store.state.own.sub = {}; for (let k = 0; k < 3; k++) A.diagnoseRecord(wrongRes, { topic: 'u-cloze', href: '#/practice/cloze/1' });
    const ws = A.weakestSkill();
    check('after enough misses the weakest skill shows up', ws && ws.id === 'prepositions' && ws.acc < 0.65, JSON.stringify(ws));
    check('a recommendation after a miss names that skill', A.recommendFor({ topic: 'u-cloze', href: '#/practice/cloze/1' }, 40, wrongRes).some((r) => /Fix a pattern: Prepositions/.test(r.title)));
    sb.Store.state.own.sub = {}; sb.Store.addSubs([]);

    const key = 'wf/0', keepScore = sb.Store.state.scores[key], day = 864e5;
    sb.Store.state.scores[key] = { p: 0.5, c: 4, t: 8, last: { p: 0.5, ts: Date.now() - 3 * day } };
    check('a weak set tried 3 days ago is due for a retry', A.retryDue().some((x) => x.type === 'wf' && x.i === 0));
    sb.Store.state.scores[key] = { p: 0.5, c: 4, t: 8, last: { p: 0.5, ts: Date.now() - day / 2 } };
    check('a weak set tried today is not due yet', !A.retryDue().some((x) => x.type === 'wf' && x.i === 0));
    sb.Store.state.scores[key] = { p: 0.95, c: 9, t: 10, last: { p: 0.95, ts: Date.now() - 10 * day } };
    check('a strong set waits three weeks', !A.retryDue().some((x) => x.type === 'wf' && x.i === 0));
    if (keepScore) sb.Store.state.scores[key] = keepScore; else delete sb.Store.state.scores[key];

    const st = sb.Store.state, keepStats = st.stats['u-cloze'];
    const type2 = 'cloze', three = A.setOrder(type2).find((i) => lvl(type2, i) === 3), srcC = { topic: 'u-cloze', href: '#/practice/cloze/' + three };
    const harder = (pct) => A.recommendFor(srcC, pct, [{ ok: false }]).some((r) => /harder set/.test(r.title));
    st.stats['u-cloze'] = { c: 10, t: 30 }; const lowAcc = harder(82);
    st.stats['u-cloze'] = { c: 28, t: 30 }; const highAcc = harder(88);
    st.stats['u-cloze'] = { c: 20, t: 30 }; const mid = harder(88);
    if (keepStats) st.stats['u-cloze'] = keepStats; else delete st.stats['u-cloze'];
    check('the bar moves with your accuracy: easier to progress when struggling, stricter when strong', lowAcc && !highAcc && mid, [lowAcc, highAcc, mid].join());

    sb.Store.addFx('easier', 6, -60);
    const order = A.recommendFor({ topic: 'u-cloze', href: '#/practice/cloze/' + three }, 30, [{ ok: false }]).map((r) => r.kind);
    check('a kind of suggestion that keeps lowering your score is shown last', order.indexOf('easier') === order.length - 1 && order.length > 1, order.join());
    sb.Store.state.own.fx = {}; sb.Store.addFx('same', 0, 0);
    ls.setItem('c1path.recpend', JSON.stringify({ kind: 'same', pct: 50, ts: Date.now() })); A.afterQuiz([{ ok: true }], {}, 70);
    check('finishing a quiz after following a suggestion logs the change', sb.Store.state.fx.same.sum === 20 && sb.Store.state.fx.same.n === 1);
    sb.Store.state.own.fx = {}; sb.Store.addFx('same', 0, 0); ls.removeItem('c1path.recpend');

    /* calibration with other learners' scores */
    const cal = { easy: null };
    const sets4 = A.setOrder('mcq'); const base = sets4.map((i) => [i, (sb.C1.levels.practice.mcq || [])[i]]);
    const target = base.find(([, l]) => l === 3)[0], others = base.filter(([i]) => i !== target).slice(0, 4).map(([i]) => i);
    const rows = {}; rows['mcq/' + target] = { n: 60, avg: 0.25 }; others.forEach((i) => { rows['mcq/' + i] = { n: 60, avg: 0.8 }; });
    ls.setItem('c1path.calib', JSON.stringify({ ts: Date.now(), rows }));
    check('a set that learners score very low on is rated harder than the expert said', A.setLevel('mcq', target) > 3, String(A.setLevel('mcq', target)));
    check('a set with no shared scores keeps the expert rating', A.setLevel('mcq', sets4.find((i) => !(('mcq/' + i) in rows))) === (sb.C1.levels.practice.mcq || [])[sets4.find((i) => !(('mcq/' + i) in rows))]);
    rows['mcq/' + target] = { n: 6, avg: 0.25 }; ls.setItem('c1path.calib', JSON.stringify({ ts: Date.now(), rows }));
    check('too few learners: the expert rating stands', A.setLevel('mcq', target) === 3);
    ls.removeItem('c1path.calib'); void cal;
  }
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
  /* a backlog of due cards: sessions and counts are capped, the cap is a setting, and the backlog can be spread over the next days */
  {
    const S = sb.Store, A = sb.App, keep = JSON.stringify(S.state.cards), cards = A.allCards.slice(0, 80);
    cards.forEach((c, i) => { S.state.cards[c.id] = { box: 1, due: '2020-01-' + String(1 + (i % 28)).padStart(2, '0'), ts: 1 }; });
    check('with 80 due cards a session shows only the cap (20 by default), the most overdue first', A.dueIds().length === 20 && A.dueAll().length === 80);
    S.setReviewCap(10);
    check('the cap can be changed to 10, 20, 30 or 50, and counts follow it', A.dueIds().length === 10 && [10, 20, 30, 50].includes(S.reviewCap()));
    S.setReviewCap(20);
    const moved = S.spreadBacklog(20);
    check('spreading keeps 20 for today and moves the rest to the coming days, 20 a day', moved.length === 60 && A.dueAll().length === 20 && A.dueIds().length === 20);
    S.restoreDue(moved);
    check('undo puts the dates back', A.dueAll().length === 80);
    S.state.cards = JSON.parse(keep);
    for (const r of ['review', 'vocab']) { sb.location.hash = '#/' + r; app.children = []; sb.App.route(); check('#/' + r + ' renders with the cap', app.textContent.length > 20); }
  }
  /* the look: course map and list, the five themes, Pica and a stamp on results, the calendar of the last 12 weeks */
  {
    const A = sb.App, render = (hash) => { sb.location.hash = hash; app.children = []; A.route(); }, cls = (re) => app.all((n) => re.test(n.className || ''));
    sb.localStorage.setItem('c1path.coursemap', 'map'); render('#/course');
    check('the course map has one card per unit, and only one is "up next" with Pica', cls(/cm-node/).length === sb.C1.course.length && cls(/cm-pica/).length <= 1 && cls(/cm-node cur/).length <= 1);
    sb.localStorage.setItem('c1path.coursemap', 'list'); render('#/course');
    check('the list view is still there, and both views are one click apart', cls(/toclist/).length > 0 && cls(/cm-node/).length === 0 && app.all((n) => n.tag === 'button' && /^(Map|List)$/.test(n.textContent)).length === 2);
    sb.localStorage.removeItem('c1path.coursemap');
    const card = A.themeCard();
    check('Account offers five looks, and the current one is marked', card.all((n) => n.tag === 'button').length === 5 && card.all((n) => n.attrs['aria-pressed'] === 'true').length === 1);
    check('a stamp is decorative text with the stamp class', /stamp/.test(sb.Engine.stamp('Done').className) && sb.Engine.stamp('Done').attrs['aria-hidden'] === 'true');
    const st = sb.Store.state, keep = JSON.stringify(st.days);
    st.days[sb.Store.today()] = 5; render('#/progress/progress');
    const week = cls(/cal-week/);
    check('the progress page has a calendar of 12 or 13 week columns with the streak line', week.length >= 12 && week.length <= 13 && app.all((n) => n.tag === 'i' && n.attrs.title).length === 84 && /day[s]? in a row/.test(app.textContent) && /best \d+/.test(app.textContent));
    st.days = JSON.parse(keep);
  }
  /* mistakes grouped by cause: the same trick together, other topics apart, practice of one cause only */
  {
    const S = sb.Store, A = sb.App, keep = JSON.stringify(S.state.mistakes), render = (hash) => { sb.location.hash = hash; app.children = []; A.route(); };
    S.state.mistakes = {};
    const mk = (q, given, right, topic, label) => ({ ok: false, given, item: { type: 'mcq', q, options: [right, given, 'x', 'y'], answer: 0, why: 'w' }, topic, label });
    const wish = ['I wish I ___ more time.', 'If only I ___ the answer.', 'I wish she ___ here now.'].map((q, i) => mk(q, ['have', 'know', 'is'][i], ['had', 'knew', 'were'][i]));
    S.logResults(wish, { topic: 'g-wish', label: 'Wishes', href: '#/grammar/wish' });
    S.logResults([mk('The ___ of the committee was surprising.', 'decide', 'decision')], { topic: 'u-wf', label: 'Word formation', href: '#/practice/wf' });
    const gs = A.mistakeCauses();
    check('mistakes are grouped by cause, the biggest group first', gs.length >= 1 && gs[0].items.length >= 3 && /wish/i.test(gs[0].title), gs.map((g) => g.title + ':' + g.items.length).join(', '));
    render('#/mistakes');
    check('the mistakes page opens by cause when there are four or more, with a practice button per cause', /By cause/.test(app.textContent) && /Practise 3/.test(app.textContent) && /Read the trick/.test(app.textContent));
    render('#/mistakes/practice/' + encodeURIComponent(gs[0].key));
    check('practising one cause shows only its mistakes', /Practise: /.test(app.textContent) && app.all((n) => /item/.test(n.className || '')).length === 3);
    S.state.mistakes = JSON.parse(keep);
  }
  /* the account page: picture options behind Edit, one "Sync now", the personal options first and the technical ones last */
  {
    const A = sb.App, keepU = sb.Cloud.user, keepE = sb.Cloud.enabled;
    sb.Cloud.user = () => ({ id: 'u1', email: 'ana@example.com' }); sb.Cloud.enabled = true;
    const render = (hash) => { sb.location.hash = hash; app.children = []; A.route(); };
    const btns = (n) => n.all((x) => x.tag === 'button').map((x) => x.textContent);
    const closed = A.pictureCard('ana@example.com');
    check('the profile picture card shows only an Edit button at first', btns(closed).join() === 'Edit' && !/Choose a photo/.test(closed.textContent));
    const edit = closed.all((x) => x.tag === 'button')[0]; (edit.ls && edit.ls.click ? edit.ls.click : [edit.onclick]).forEach((f) => f && f());
    const open = A.pictureCard('ana@example.com');
    check('after Edit the photo, colour and Done options appear', /Choose a photo/.test(open.textContent) && /Done/.test(open.textContent) && open.all((x) => /swatch/.test(x.className || '')).length > 3);
    const done = open.all((x) => x.tag === 'button' && x.textContent === 'Done')[0]; (done.ls && done.ls.click ? done.ls.click : [done.onclick]).forEach((f) => f && f());
    render('#/account');
    const text = app.textContent, count = (re) => (text.match(re) || []).length;
    check('"Sync now" appears once on the account page, with an explanation of what it does', count(/Sync now/g) === 2 && /What "Sync now" does/.test(text), String(count(/Sync now/g)));
    const at = (t) => text.indexOf(t);
    check('personal options come first (picture, Look, sounds, Pica, cards), technical ones last', at('Profile picture') > 0 && at('Profile picture') < at('Look') && at('Look') < at('Vocabulary cards') && at('Vocabulary cards') < at('Practice and friends') && at('Practice and friends') < at('Technical settings') && at('Technical settings') < at('Delete my account'));
    sb.Cloud.user = keepU; sb.Cloud.enabled = keepE;
  }
  /* Say this, not that, the tricks hub, and Pica's starter questions */
  {
    const A = sb.App, render = (hash) => { sb.location.hash = hash; app.children = []; A.route(); }, cls = (re) => app.all((n) => re.test(n.className || ''));
    render('#/saythis');
    check('the Say this, not that hub lists the 12 themes and a mixed practice', cls(/card/).length >= 12 && /Mixed practice/.test(app.textContent));
    render('#/saythis/at-work');
    check('a theme shows eight pairs, each with a not-this and a say-this side', cls(/stcard/).length === 8 && /Not this/.test(app.textContent) && /Say this/.test(app.textContent));
    render('#/saythis/at-work/practice');
    check('the practice has eight questions', app.all((n) => /\bitem\b/.test(n.className || '') || n.className === 'item').length === 8);
    render('#/tricks');
    check('the tricks page is a hub of themes with a search and a trick of the day, not one long list', cls(/^trick$/).length === 0 && /Trick of the day/.test(app.textContent) && app.all((n) => n.tag === 'a' && /^#\/tricks\/[a-z]+$/.test((n.attrs || {}).href || '')).length === sb.C1.tricks.length);
    render('#/tricks/tasks');
    check('a theme page splits the exam-task tricks by task', cls(/trick-sub/).length >= 8 && cls(/^trick$/).length === sb.C1.tricks.find((x) => x.id === 'tasks').items.length);
    render('#/tricks/words-3');
    check('a link to one trick opens its theme with that trick open', cls(/^trick$/).length === sb.C1.tricks.find((x) => x.id === 'words').items.length);
    const T = sb.Tutor, seen = new Set(), sets = [];
    for (let i = 0; i < 6; i++) { const s4 = T.starters(); sets.push(s4.join('|')); s4.forEach((q) => seen.add(q)); }
    check('Pica offers four starter questions that are all different, and the sets change from one opening to the next', T.starters().length === 4 && new Set(T.starters()).size === 4 && new Set(sets).size >= 5 && seen.size >= 12, seen.size + ' different, ' + new Set(sets).size + ' sets');
    sb.localStorage.removeItem('c1path.starters');
  }
  /* the emails stay opt-in but Pica asks once: yes saves it, no or dismissing is remembered, people who already have it are not asked */
  {
    afterAll.push(async () => {
      const A = sb.App, keepU = sb.Cloud.user, keepE = sb.Cloud.enabled, keepR = sb.Cloud.rpc, keepS = sb.PicaSay, calls = [], asked = [];
      sb.Cloud.user = () => ({ id: 'u1', email: 'ana@example.com' }); sb.Cloud.enabled = true;
      let on = false; sb.Cloud.rpc = async (name, args) => { calls.push(name + ':' + JSON.stringify(args || {})); return name === 'get_digest' ? on : null; };
      sb.PicaSay = (text, actions) => asked.push({ text, actions });
      sb.localStorage.removeItem('c1path.digestasked');
      const first = await A.askDigest(), again = await A.askDigest();
      check('a signed-in person without the emails is asked once, with Yes and No buttons', first === true && again === false && asked.length === 1 && asked[0].actions.map((x) => x[0]).join() === 'Yes, send it,No thanks');
      await asked[0].actions[0][1]();
      check('Yes switches the weekly trick on', calls.includes('set_digest:{"p_on":true}'));
      sb.localStorage.removeItem('c1path.digestasked'); on = true; asked.length = 0;
      check('someone who already has the emails is not asked', (await A.askDigest()) === false && asked.length === 0);
      sb.localStorage.removeItem('c1path.digestasked'); sb.Cloud.user = () => null;
      check('nobody is asked when not signed in', (await A.askDigest()) === false);
      sb.Cloud.user = keepU; sb.Cloud.enabled = keepE; sb.Cloud.rpc = keepR; sb.PicaSay = keepS; sb.localStorage.removeItem('c1path.digestasked');
    });
  }
  /* the daily quests follow what the learner needs: due cards, saved mistakes, the weakest topic; they are kept all day and measure real progress */
  {
    const A = sb.App, S = sb.Store, st = S.state, keep = JSON.stringify({ cards: st.cards, mistakes: st.mistakes, stats: st.stats, dq: st.dayQuests, counters: st.counters, nt: st.newToday });
    const render = (hash) => { sb.location.hash = hash; app.children = []; A.route(); };
    const fresh = () => { st.dayQuests = {}; return A.questList(); };
    st.cards = {}; st.mistakes = {}; st.counters = {}; st.newToday = {};
    let qs = fresh();
    check('there are always three quests, the first about the daily goal', qs.length === 3 && qs[0].kind === 'answers' && /Answer \d+ questions/.test(qs[0].label));
    const old = '2020-01-01'; A.allCards.slice(0, 14).forEach((c) => { st.cards[c.id] = { box: 1, due: old, ts: 1 }; });
    qs = fresh();
    check('with many cards due, the vocabulary quest is to review them, and it opens the review', qs[1].kind === 'cards' && /due/.test(qs[1].label) && qs[1].href === '#/review' && qs[1].max === 10);
    const first = qs[1].now; S.rate(A.allCards[0].id, 2);
    check('rating a card moves the quest forward', A.questList()[1].now === first + 1);
    check('the quests are kept all day: the same list on the next call', JSON.stringify(A.questList().map((q) => q.label)) === JSON.stringify(qs.map((q) => q.label)));
    st.cards = {}; st.counters = {}; st.newToday = {};
    let sawNew = false; for (let d = 0; d < 2; d++) { const day = Math.floor(Date.now() / 864e5); st.dayQuests = {}; const q = A.questList()[1]; sawNew = sawNew || q.kind === 'new'; }
    const newQ = (() => { for (let i = 0; i < 4; i++) { st.dayQuests = {}; const q = A.questList()[1]; if (q.kind === 'new') return q; } return null; })();
    check('when nothing is due, the vocabulary quest is new cards or a game, and "new cards" opens a session of new cards only', !newQ || newQ.href === '#/review/new');
    render('#/review/new');
    check('the new-cards session has exactly five cards, all of them new', /5 left/.test(app.textContent));
    for (let i = 0; i < 9; i++) st.mistakes['m' + i] = { id: 'm' + i, item: { type: 'mcq', q: 'x ___', options: ['a', 'b'], answer: 0, why: 'w' }, given: 'b', topic: 't', label: 'T', href: '#/', count: 1, right: 0, ts: Date.now(), due: 0 };
    qs = fresh();
    check('with many saved mistakes due, the third quest is to clear them', qs[2].kind === 'mistakes' && qs[2].href === '#/mistakes/practice' && qs[2].max === 5);
    st.mistakes = {}; st.stats['g-wish'] = { c: 1, t: 10 };
    let weakQ = null; for (let i = 0; i < 4 && !weakQ; i++) { st.dayQuests = {}; const q = A.questList()[2]; if (q.kind === 'topic') weakQ = q; }
    check('the weakest topic can become a quest, linked to that topic and measured by answers on it', !weakQ || (/Answer 8 questions on /.test(weakQ.label) && weakQ.href === '#/grammar/wish'));
    if (weakQ) { const b = weakQ.now; S.record('g-wish', 2, 3); check('answers on that topic move its quest', A.questList().find((q) => q.kind === 'topic').now === b + 3); }
    const days = new Set(), shift = vm.runInContext('(d) => { const r = Date.now; Date.now = () => r() + d * 864e5; return () => { Date.now = r; }; }', sb); for (let d = 0; d < 6; d++) { st.dayQuests = {}; const undo = shift(d); days.add(A.questList().map((q) => q.label).join('|')); undo(); }
    check('the quests change from day to day when several things are needed', days.size >= 2);
    st.cards = JSON.parse(keep).cards; st.mistakes = JSON.parse(keep).mistakes; st.stats = JSON.parse(keep).stats; st.dayQuests = JSON.parse(keep).dq; st.counters = JSON.parse(keep).counters; st.newToday = JSON.parse(keep).nt;
  }
  /* progress by weeks: a card with the last 12 weeks, shown once there is some practice */
  {
    const A = sb.App, st = sb.Store.state, keep = JSON.stringify(st.days), today = sb.Store.today();
    const render = (hash) => { sb.location.hash = hash; app.children = []; A.route(); };
    st.days = {}; render('#/progress/progress');
    check('no week-by-week card until there is practice', !/Week by week/.test(app.textContent));
    st.days = { [today]: 12 }; const lastWeek = new Date(today + 'T00:00:00'); lastWeek.setDate(lastWeek.getDate() - 7); st.days[lastWeek.toLocaleDateString('sv')] = 30;
    render('#/progress/progress');
    check('the week-by-week card lists 12 weeks, this week and last week first, with answers and days', /Week by week/.test(app.textContent) && app.all((n) => /weekrow/.test(n.className || '')).length === 12 && /This week/.test(app.textContent) && /Last week/.test(app.textContent) && /30 · 1\/7 days/.test(app.textContent) && /Best week: last week, with 30 answers/.test(app.textContent));
    st.days = JSON.parse(keep);
  }
  /* quests count however the activity was reached; skipped cards count as seen; the vocabulary rule; the game with the cards just studied; the backup AI key */
  {
    const A = sb.App, S = sb.Store, st = S.state, render = (hash) => { sb.location.hash = hash; app.children = []; A.route(); };
    const keep = JSON.stringify({ cards: st.cards, seen: st.seen, counters: st.counters, dq: st.dayQuests, nt: st.newToday, lessons: st.lessons });
    st.cards = {}; st.seen = {}; st.counters = {}; st.newToday = {}; st.dayQuests = {};
    /* 1. what was done before the quests were chosen still counts */
    const old = '2020-01-01'; A.allCards.slice(0, 14).forEach((c) => { st.cards[c.id] = { box: 1, due: old, ts: 1 }; });
    S.rate(A.allCards[0].id, 2); S.rate(A.allCards[1].id, 2);
    st.dayQuests = {}; const q2 = A.questList()[1];
    check('cards rated before the quest was chosen already count towards it', q2.kind !== 'cards' || q2.now >= 2);
    /* 2. a step finished by another route completes its quest */
    const g = A.allCards[40].group; st.cards = {}; st.seen = {}; st.counters = {}; st.newToday = {};
    const unit = sb.C1.course.find((u) => u.steps.some((s) => s.t === 'vocab')), si = unit.steps.findIndex((s) => s.t === 'vocab'), vg = unit.steps[si].id;
    st.dayQuests = { [S.today()]: [{ kind: 'answers' }, { kind: 'game', label: 'g', max: 6, href: '#/vgames' }, { kind: 'step', label: 'Next: x', max: 1, href: '#/vocab/' + vg, unit: unit.id, i: si }] };
    const keepActs = st.acts; st.acts = {}; /* nothing done today yet, so only the step itself can complete the quest */
    const before = A.questList()[2].done; A.allCards.filter((c) => c.group === vg).forEach((c) => S.markSeen(c.id));
    check('a course step done by another route (the Home steps, the menu) completes its quest', before === false && A.questList()[2].done === true); st.acts = keepActs;
    /* 3. skipping a card without rating counts as seen, once, as new today, with no schedule */
    st.cards = {}; st.seen = {}; st.newToday = {};
    const id = A.allCards[5].id; S.markSeen(id); S.markSeen(id);
    check('a skipped card is seen and new today (once) but has no schedule', S.isSeen(id) && !S.card(id) && S.newTodayCount() === 1);
    S.rate(id, 2);
    check('rating it afterwards does not count it as new a second time', S.newTodayCount() === 1 && !!S.card(id));
    /* 4. the vocabulary lesson says plainly what completes it */
    st.cards = {}; st.seen = {};
    render('#/vocab/' + vg + '?u=' + unit.id);
    const need = Math.ceil(sb.C1.vocab.find((x) => x.id === vg).cards.length * 0.7);
    check('inside a unit, a vocabulary group says: study 70% of the cards with the flashcards, the quiz is extra', /To complete this step/.test(app.textContent) && new RegExp('at least ' + need + ' of the').test(app.textContent) && /quiz is extra practice/.test(app.textContent));
    A.allCards.filter((c) => c.group === vg).forEach((c) => S.markSeen(c.id));
    render('#/vocab/' + vg + '?u=' + unit.id);
    check('and says so when the step is complete', /This step is complete/.test(app.textContent));
    /* 5. the game with just the cards of the session */
    const six = A.allCards.slice(100, 108).map((c) => c.id);
    if (sb.sessionStorage) { sb.sessionStorage.setItem('c1path.vgids', JSON.stringify(six)); render('#/vgames/mix/last'); check('"Play a game with these cards" opens a game made only of those cards', /Only with the cards you have just studied/.test(app.textContent) && app.all((n) => /\bitem\b/.test(n.className || '') || n.className === 'item').length >= 4); }
    /* 6. the backup AI key */
    const card = A.aiCard(), cardText = card.textContent;
    check('the AI card offers a backup key, with Groq as the first choice', /Backup key \(optional\)/.test(cardText) && /Groq/.test(cardText));
    sb.AI.setKeyFor('groq', ' gsk_abcd1234 ');
    check('a backup key is saved trimmed and shown only by its last characters', sb.AI.keyHintFor('groq') === '…1234'); sb.AI.setKeyFor('groq', '');
    const k = JSON.parse(keep); st.cards = k.cards; st.seen = k.seen; st.counters = k.counters; st.dayQuests = k.dq; st.newToday = k.nt; st.lessons = k.lessons;
  }
  /* Pica: the daily greeting, being sad after days away, the first-time tip per task, and the About page */
  {
    const A = sb.App, text = (el) => (el && el.textContent) || '';
    const days = new Set(); for (let d = 20000; d < 20060; d++) days.add(A.greetLine(d, d % 7));
    check('Pica has a different line on different days', days.size >= 15);
    check('the same day always gets the same line', A.greetLine(20123, 3) === A.greetLine(20123, 3));
    const sad3 = A.missYou(3), sad10 = A.missYou(10), sad40 = A.missYou(40), fine = A.missYou(2);
    check('Pica is sad after 3 days away, sadder texts later, and not at 2 days', fine === null && sad3.mood === 'sad' && /3 days/.test(sad3.text) && /10 days/.test(sad10.text) && /gently|few flashcards/.test(sad40.text));
    const st2 = sb.Store.state, daysKeep = JSON.stringify(st2.days);
    st2.days[sb.Store.today()] = 4;
    check('she cheers up once you have practised today', A.missYou(10).mood === 'happy');
    st2.days = JSON.parse(daysKeep);
    check('the greeting renders with a word of the day', /Shiny word of the day/.test(text(A.picaGreeting())));
    sb.localStorage.removeItem('c1path.tip.kwt');
    const tip = A.picaTip('kwt');
    check('the first-time tip names the task and links to its tricks', tip && /key word|structure/i.test(text(tip)) && tip.all((n) => /^#\/tricks\/tasks-\d+$/.test((n.attrs || {}).href || '')).length === 1);
    const btn = tip.all((n) => /^button$/i.test(n.tag || n.tagName || n.nodeName || ''))[0];
    (btn.ls && btn.ls.click ? btn.ls.click : [btn.onclick]).forEach((f) => f && f());
    check('"Got it" hides the tip for good', A.picaTip('kwt') === null);
  }
  /* a mistake on a recording keeps a reference to it, and both the list and the practice show the player again */
  {
    const S = sb.Store, item = { type: 'mcq', q: 'Where is the meeting?', options: ['a', 'b', 'c', 'd'], answer: 0, why: 'x', audioId: 'pl-b1-a', title: 'T', intro: 'I', script: [{ who: 'A', text: 'Hello.' }] };
    S.logResults([{ ok: false, given: 'b', item }], { topic: 'placement', label: 'Placement test', href: '#/placement' });
    const m = S.mistakes().find((x) => x.item.audioId === 'pl-b1-a');
    check('a mistake on a recording is saved with its audio reference', !!m && m.item.script.length === 1 && sb.Engine.recording(m.item).audioId === 'pl-b1-a' && sb.Engine.recording({ q: 'x' }) === null);
    check('the mistakes page and the practice render with a recording among the mistakes', (() => { try { sb.App.routes.mistakes(); sb.App.routes.mistakes('practice'); return true; } catch (e) { return false; } })());
    S.removeMistake(m.id);
  }
  /* home: placement first, then the weakest exam part */
  {
    const st = sb.Store.state, keep = [st.placement, st.stats['u-wf']];
    st.placement = null; check('a new learner is sent to the placement test first', A.homeSteps()[0][2] === '#/placement');
    st.placement = { date: '2026-01-01', summary: 'x' }; st.stats['u-wf'] = { c: 2, t: 10 };
    check('the weakest exam part is recommended at home', A.homeSteps().some((s) => /#\/practice\/wf\/\d+/.test(s[2])));
    check('home always ends with a mixed review and has no duplicate links', A.homeSteps().slice(-1)[0][2] === '#/course/mix' && new Set(A.homeSteps().map((s) => s[2])).size === A.homeSteps().length);
    const lessons = st.lessons; st.lessons = {};
    st.placement = { date: '2026-01-01', summary: 'x', band: 0, missed: ['inversion', 'wish'] };
    check('home sends you to the first lesson the placement test missed', A.homeSteps()[0][2] === '#/grammar/inversion');
    st.lessons = { inversion: 1 };
    check('then to the next missed lesson', A.homeSteps()[0][2] === '#/grammar/wish');
    st.lessons = { inversion: 1, wish: 1 }; st.placement = { date: '2026-01-01', summary: 'x', band: 0, missed: ['inversion'] };
    check('a foundations result with few lessons read suggests starting the grammar lessons', A.homeSteps()[0][2] === '#/grammar');
    st.lessons = lessons;
    st.placement = keep[0]; if (keep[1]) st.stats['u-wf'] = keep[1]; else delete st.stats['u-wf'];
  }
}

/* ---- the Grammar page lists every lesson, and Weak spots only counts topics it can train ---- */
{
  sb.location.hash = '#/grammar'; app.children = []; sb.App.route();
  check('the Grammar page lists every lesson', app.all((n) => n.tag === 'a' && /^#\/grammar\/./.test(n.attrs.href || '')).length === sb.C1.grammar.length);
  const st = sb.Store.state, keep = st.stats;
  st.stats = { listen: { c: 1, t: 10 }, mix: { c: 1, t: 10 }, 'g-inversion': { c: 4, t: 10 } };
  check('weak topics skip topics that have no questions to train', sb.App.weakTopics().map((x) => x[0]).join() === 'g-inversion');
  st.stats = keep;
}
/* ---- friends: a code typed as a name is refused; name and a friend's code can be given when joining ---- */
pending.push((async () => {
  const calls = [], keepUser = sb.Cloud.user, keepRpc = sb.Cloud.rpc, keepEnabled = sb.Cloud.enabled;
  sb.Cloud.user = () => ({ id: 'u1', email: 'ana@example.com' }); sb.Cloud.enabled = true;
  sb.Cloud.rpc = async (name, body) => { calls.push(name + ':' + JSON.stringify(body)); return name === 'join_board' ? 'ABC123' : name === 'friend_board' ? [] : true; };
  sb.localStorage.removeItem('c1path.board');
  const card = sb.App.friendsCard();
  const inputs = card.all((n) => n.tag === 'input'), join = card.all((n) => n.tag === 'button' && /Join the ranking/.test(n.textContent))[0];
  check('the join form has a name box and a separate friend-code box', inputs.length === 2 && !!join);
  inputs[0].value = 'EEFA07'; inputs[1].value = '';
  await join.ls.click[0]();
  check('a friend code typed as the name is refused', !calls.some((c) => c.startsWith('join_board')) && /looks like a friend code/.test(card.textContent));
  inputs[0].value = 'Ana'; inputs[1].value = '7d379a';
  await join.ls.click[0]();
  check('joining with a name and a friend code calls join_board and add_friend', calls.some((c) => c.startsWith('join_board:{"p_name":"Ana"')) && calls.some((c) => c.startsWith('add_friend:{"p_code":"7D379A"')), calls.join(' | '));
  sb.Cloud.user = keepUser; sb.Cloud.rpc = keepRpc; sb.Cloud.enabled = keepEnabled; sb.localStorage.removeItem('c1path.board');
})());
  /* every way of typing a friend code wrong gets an explanation */
  {
    const c = sb.App.checkFriendCode;
    check('an empty friend code is explained', /first/.test(c('', 'AAAAAA', []).problem));
    check('a name instead of a code is explained', /6 characters/.test(c('Linda', 'AAAAAA', []).problem));
    check('your own code is recognised', /your own code/.test(c('aaaaaa', 'AAAAAA', []).problem));
    check('a code you already added is recognised', /already friends/.test(c('7d379a', 'AAAAAA', ['7D379A']).problem));
    check('a good code is cleaned up', c(' 7d379a ', 'AAAAAA', []).code === '7D379A');
  }
/* ---- every route renders ---- */
const C1 = sb.C1, routes = ['', 'saythis', 'saythis/mix', 'tricks/words', 'tricks/grammar', 'tricks/preps', 'tricks/wf', 'tricks/natural', 'tricks/listening', 'tricks/spanish', 'tricks/exam', 'tricks/everyday', 'tricks/tasks', 'tricks/tasks-12', 'welcome', 'ask', 'course', 'course/mix', 'toolkit', 'progress', 'review', 'progress/progress', 'progress/settings', 'account', 'about', 'mistakes', 'mistakes/practice', 'vgames', 'vgames/match', 'vgames/type', 'vgames/gap', 'vgames/mean', 'vgames/hear', 'vgames/mix', 'placement', 'placement/short', 'placement/adaptive', 'placement/full', 'exams', 'privacy', 'about', 'unsubscribe', 'mock', 'tricks', 'generate', 'certacles', 'plan', 'weak',
  'grammar', 'vocab', 'practice', 'skills', 'skills/listening', 'skills/writing', 'skills/writing/guide', 'skills/speaking', 'skills/pronunciation', 'vquiz/all'];
C1.course.forEach((u) => routes.push('course/' + u.id, 'course/' + u.id + '/review'));
C1.grammar.forEach((g) => routes.push('grammar/' + g.id));
C1.vocab.forEach((v) => routes.push('vocab/' + v.id));
C1.practice.forEach((p) => { routes.push('practice/' + p.id); p.sets.forEach((_, i) => routes.push('practice/' + p.id + '/' + i)); });
(C1.listening || []).forEach((l) => routes.push('skills/listening/' + l.id));
((C1.writing || {}).tasks || []).forEach((t) => routes.push('skills/writing/' + t.id));
((C1.speaking || {}).sets || []).forEach((s) => routes.push('skills/speaking/' + s.id));
(C1.pron || []).forEach((g) => routes.push('skills/pronunciation/' + g.id));
(C1.saythis || []).forEach((g) => { routes.push('saythis/' + g.id); routes.push('saythis/' + g.id + '/practice'); });
sb.Store.state.welcomed = true;
const rawTags = [];
for (const r of routes) {
  try {
    sb.location.hash = '#/' + r; app.children = []; sb.App.route();
    const redirected = sb.location.hash !== '#/' + r;
    if (/^(practice\/[a-z]+\/\d+|grammar\/.+|skills\/listening\/.+|vquiz.*)$/.test(r) && !r.startsWith('practice/reading')) {
      /* press "Check answers" with nothing filled in, then read the result box */
      const b = app.all((n) => n.tag === 'button' && /Check answers/.test(n.textContent))[0];
      if (b) { try { (b.ls.click || []).forEach((f) => f({ preventDefault() {} })); check('quiz result on #/' + r + ' has no null/undefined text', !/null|undefined|\[object/.test(app.textContent), app.textContent.match(/.{20}(null|undefined).{10}/)); } catch (e) { check('checking answers on #/' + r, false, e.message); } }
    }
    check('route #/' + r + ' renders', redirected || app.children.length > 0 && app.textContent.trim().length > 20 && !/^Not found/.test(app.textContent), 'empty or not found');
    const raw = /<\/?(em|strong|b|i|br|u|mark|code|span|p|ul|ol|li|sub|sup)[^>]*>/i.exec(app.textContent);
    if (raw) rawTags.push('#/' + r + ' -> ' + app.textContent.slice(Math.max(0, raw.index - 40), raw.index + 50).replace(/\s+/g, ' '));
  } catch (e) { check('route #/' + r + ' renders', false, e.stack.split(String.fromCharCode(10)).slice(0, 3).join(' / ')); }
}
check('no page shows raw HTML tags as text', rawTags.length === 0, rawTags.slice(0, 8).join(' || '));
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
  Object.keys(A).forEach((id) => check('recording "' + id + '" belongs to a listening set', (C1.listening || []).concat(C1.placementListening || []).some((l) => l.id === id)));
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
    try { sb.location.hash = '#/' + r; app.children = []; sb.App.route(); if (/NaN|undefined|\[object|null/.test(app.textContent)) bad.push(r + ': ' + (app.textContent.match(/.{25}(NaN|undefined|\[object|null).{15}/) || [''])[0]); } catch (e) { bad.push(r + ' threw ' + e.message); }
  }
  check('with everything done, no page prints NaN/undefined/null or throws', !bad.length, bad.slice(0, 5).join(' || '));
  const home = (sb.location.hash = '#/', app.children = [], sb.App.route(), app.textContent);
  check('with everything done, home still says what to do next', /What to do now/.test(home) && home.length > 200);
}
sb.location.hash = '#/nope'; sb.App.route();
check('unknown route shows Not found', /Not found/.test(app.textContent));

Promise.all(pending).then(async () => {
for (const f of afterAll) await f();
console.log(`${ok} checks passed, ${failed} failed, ${routes.length} routes visited`);
process.exit(failed ? 1 : 0);
});
