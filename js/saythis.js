/* C1 Path – "Say this, not that": short pairs of what learners often say next to what a UK English speaker says, each with the reason.
   Study them (optionally with the natural side covered), then practise: a mini situation with a gap, choose the natural one.
   The pure helpers are on window.SayThis so tools/test.js can check them. */
(function () {
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const hash = (s) => { let x = 5381; for (let i = 0; i < s.length; i++) x = ((x * 33) ^ s.charCodeAt(i)) >>> 0; return x.toString(36); };

  /* one pair as a two-option question: the situation with a gap, the natural phrase and the learner's version in random order */
  function item(it, shuffle) {
    const opts = shuffle([it.say, it.not]);
    return {
      type: 'mcq', uid: 'st:' + hash(it.say + '|' + it.not), q: esc(it.ctx), options: opts.map(esc), answer: opts.indexOf(it.say),
      why: '<strong>' + esc(it.say) + '</strong>. ' + esc(it.why) + (it.es ? ' <span class="muted">In Spanish: <em>' + esc(it.es) + '</em></span>' : '')
    };
  }
  /* n questions from a list of pairs, a random pick, each pair once */
  const practice = (items, n, shuffle) => shuffle(items).slice(0, n).map((it) => item(it, shuffle));
  const all = () => (window.C1.saythis || []).flatMap((g) => g.items.map((it) => Object.assign({ group: g.id }, it)));
  window.SayThis = { item, practice, all, esc };

  if (!window.App || !window.Engine || !document.getElementById) return; /* the tests load only the helpers above */
  const A = window.App, { h, quiz } = Engine, C1 = window.C1;
  const groups = () => C1.saythis || [];
  const TOPIC = 'saythis';
  const REG = { informal: 'informal', formal: 'formal' };

  /* the card of one pair; when the answers are covered, the natural side waits behind a button */
  function card(it, covered) {
    let shown = !covered;
    const el = h('article', { class: 'stcard' });
    const hear = h('button', { class: 'icon-btn say', type: 'button', title: 'Listen', 'aria-label': 'Listen to: ' + it.say, onclick: () => Engine.Speech.say(it.say, 1) }, A.icon ? A.icon('listening') : '▶');
    function draw() {
      el.replaceChildren(...[
        h('p', { class: 'st-not' }, h('span', { class: 'st-tag' }, 'Not this'), ' ', h('s', {}, it.not)),
        shown
          ? h('div', {}, h('p', { class: 'st-say' }, h('span', { class: 'st-tag ok' }, 'Say this'), ' ', h('strong', {}, it.say), hear),
            h('p', { class: 'st-why' }, it.why),
            h('p', { class: 'muted st-meta' }, it.es ? h('span', {}, 'In Spanish: ', h('em', {}, it.es), ' · ') : null, it.level, REG[it.reg] ? ' · ' + REG[it.reg] : ''))
          : h('p', {}, h('button', { class: 'btn small', type: 'button', onclick: () => { shown = true; draw(); } }, 'Show the natural way'))
      ].filter(Boolean));
    }
    draw();
    return el;
  }

  function study(g) {
    let covered = false;
    const list = h('div', { class: 'stlist' });
    const cover = h('input', { type: 'checkbox', id: 'st-cover' });
    const draw = () => list.replaceChildren(...g.items.map((it) => card(it, covered)));
    cover.addEventListener('change', () => { covered = cover.checked; draw(); });
    draw();
    A.view(A.back('#/saythis', 'Say this, not that'), h('h1', {}, g.title), h('p', { class: 'lead' }, g.blurb),
      h('div', { class: 'row' }, h('label', { class: 'row', for: 'st-cover' }, cover, ' Cover the natural way, to test yourself'), A.link('#/saythis/' + g.id + '/practice', 'Practise these ' + g.items.length, 'btn')),
      list,
      h('div', { class: 'row' }, A.link('#/saythis/' + g.id + '/practice', 'Practise these ' + g.items.length, 'btn'), A.link('#/saythis', 'All themes', 'btn ghost')));
  }

  function run(title, back, items, again) {
    A.view(A.back(back, 'Say this, not that'), h('h1', {}, title), h('p', { class: 'muted' }, 'Read the situation and choose what a UK English speaker would say.'),
      quiz(items, { source: { topic: TOPIC, label: 'Say this, not that · ' + title, href: back }, onRetry: again, onScore: (c, t) => Store.record(TOPIC, c, t) }));
  }
  function practiceGroup(g) { run(g.title + ': practice', '#/saythis/' + g.id, practice(g.items, 8, A.shuffle), () => A.route()); }
  function mix() { run('Mixed practice', '#/saythis', practice(all(), 10, A.shuffle), () => A.route()); }

  function hub() {
    const total = all().length, acc = A.accTag ? null : null;
    const tag = Store.accuracy(TOPIC);
    A.view(A.back('#/toolkit', 'Study'), h('h1', {}, 'Say this, not that'),
      h('p', { class: 'lead' }, 'What learners often say, and what a UK English speaker says instead, with the reason. Many slips are word-for-word translations from Spanish: once you see the reason, you stop making them.'),
      h('div', { class: 'row' }, A.link('#/saythis/mix', 'Mixed practice: 10 pairs', 'btn'), tag == null ? null : h('span', { class: 'tag' + (tag >= 0.8 ? ' ok' : '') }, Math.round(tag * 100) + '% correct so far'), h('span', { class: 'muted' }, total + ' pairs in ' + groups().length + ' themes')),
      h('div', { class: 'grid' }, groups().map((g) => h('a', { class: 'card', href: '#/saythis/' + g.id }, h('h3', { style: 'margin:0 0 .2em' }, g.title), h('p', { class: 'muted', style: 'margin:0 0 6px' }, g.blurb), h('span', { class: 'tag' }, g.items.length + ' pairs')))));
  }

  A.routes.saythis = (a, b) => {
    if (!a) return hub();
    if (a === 'mix') return mix();
    const g = groups().find((x) => x.id === a);
    if (!g) return A.notFound();
    return b === 'practice' ? practiceGroup(g) : study(g);
  };
})();
