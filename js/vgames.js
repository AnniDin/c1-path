/* C1 Path – vocabulary games: other ways to practise the same cards without the review queue (nothing here changes when a card is due).
   Match the pairs, type the expression from its meaning, type the missing words of an example, choose the meaning, hear and type, or a mix.
   The question builders are on window.VGames so tools/test.js can check them. */
(function () {
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const first = (c) => c.meaning.split(';')[0].trim();
  const typable = (c) => /^[a-z' -]{3,40}$/i.test(c.phrase) && !/\b(sb|sth|someone|something|one's)\b/i.test(c.phrase);
  const answersOf = (c) => [c.phrase].concat(/^to /i.test(c.phrase) ? [c.phrase.replace(/^to /i, '')] : []);

  /* builders: each takes a card (and the pool it came from) and returns an Engine item */
  function builders(pool, shuffle, exOf) {
    const mean = (c) => {
      const near = shuffle(pool.filter((x) => x !== c && first(x) !== first(c) && (x.group === c.group || x.kind === c.kind)));
      const rest = shuffle(pool.filter((x) => x !== c && first(x) !== first(c) && !near.includes(x)));
      const opts = [], seen = new Set([first(c)]);
      near.concat(rest).forEach((x) => { if (opts.length < 3 && !seen.has(first(x))) { seen.add(first(x)); opts.push(first(x)); } });
      const all = shuffle([first(c)].concat(opts));
      return { type: 'mcq', uid: 'vm:' + c.id, q: 'What does <strong>' + esc(c.phrase) + '</strong> mean?', options: all, answer: all.indexOf(first(c)), why: '<em>' + esc(c.phrase) + '</em>: ' + esc(c.meaning) + '. ' + (c.logic || '') };
    };
    const type = (c) => ({ type: 'gap', uid: 'vt:' + c.id, q: '<span class="muted">' + esc(c.meaning) + '</span><br>Type the expression: ___', answers: answersOf(c), why: '<em>' + esc(c.phrase) + '</em>: ' + esc(c.meaning) + '. ' + (c.logic || '') });
    const gapOf = (c) => { const e = (exOf(c) || []).find((x) => (x.match(/\[\[/g) || []).length === 1); return e ? { c, e } : null; };
    const gap = (c) => {
      const g = gapOf(c), m = /\[\[(.+?)\]\]/.exec(g.e);
      return { type: 'gap', uid: 'vg:' + c.id, q: '<span class="muted">' + esc(c.meaning) + '</span><br>' + esc(g.e.replace(/\[\[(.+?)\]\]/, '___')), answers: [m[1]], why: '<em>' + esc(c.phrase) + '</em>: ' + esc(c.meaning) + '. ' + (c.logic || '') };
    };
    const hear = (c) => ({ type: 'hear', uid: 'vh:' + c.id, cardId: c.id, phrase: c.phrase, q: 'Listen and type what you hear: ___', answers: answersOf(c), why: '<em>' + esc(c.phrase) + '</em>: ' + esc(c.meaning) + '.' });
    return { mean, type, gap, hear, ok: { mean: () => true, type: typable, gap: (c) => !!gapOf(c), hear: typable } };
  }
  /* n items of one kind (or a mix) from the pool, each from a different card */
  function build(kind, pool, n, shuffle, exOf) {
    const B = builders(pool, shuffle, exOf), kinds = kind === 'mix' ? ['mean', 'type', 'gap'] : [kind], out = [], used = new Set();
    const cards = shuffle(pool);
    for (const c of cards) {
      if (out.length >= n) break;
      const ks = shuffle(kinds).filter((k) => B.ok[k](c));
      if (ks.length && !used.has(c.id)) { used.add(c.id); out.push(B[ks[0]](c)); }
    }
    return out;
  }
  window.VGames = { first, typable, answersOf, build };

  if (!window.App || !window.Engine || !document.getElementById) return; /* the tests load only the helpers above */
  const A = window.App, { h, quiz } = Engine, C1 = window.C1;
  const POOLKEY = 'c1path.vgpool';
  const pref = () => { try { return localStorage.getItem(POOLKEY) === 'all' ? 'all' : 'mine'; } catch (e) { return 'mine'; } };
  const setPref = (v) => { try { localStorage.setItem(POOLKEY, v); } catch (e) { /* optional */ } };
  /* the cards to play with: those you have started (if there are enough), or everything; or one group */
  function poolFor(group) {
    const all = A.allCards, list = group ? all.filter((c) => c.group === group) : all;
    if (group || pref() === 'all') return list;
    const mine = list.filter((c) => Store.card(c.id));
    return mine.length >= 12 ? mine : list;
  }

  /* hear it, type it: a play button above the usual typed answer */
  Engine.R.hear = (item, n) => {
    const r = Engine.R.gap(Object.assign({}, item, { q: item.q }), n);
    const card = A.allCards.find((c) => c.id === item.cardId);
    const play = h('button', { class: 'btn small', type: 'button', onclick: () => card && A.sayPhrase(card) }, '▶ Play');
    r.el.prepend(h('div', { class: 'row' }, play, h('span', { class: 'muted' }, 'You can play it as often as you like.')));
    return r;
  };

  const MODES = {
    match: ['Match the pairs', 'Six expressions and six meanings: pair them up.', 6],
    type: ['Type it', 'You see the meaning. Type the expression from memory.', 10],
    gap: ['Fill the gap', 'Type the missing words of an example sentence.', 10],
    mean: ['What does it mean?', 'You see the expression. Choose its meaning.', 10],
    hear: ['Hear it, type it', 'Listen to the expression and type it. Good for spelling.', 8],
    mix: ['Surprise me', 'Ten questions mixing the three kinds above.', 10]
  };

  function match(group) {
    const cards = A.sample(poolFor(group).filter((c) => first(c).length <= 60), 6), box = h('div'), status = h('p', { class: 'muted', role: 'status', 'aria-live': 'polite' });
    if (cards.length < 4) { A.view(A.back('#/vgames', 'Vocabulary games'), h('h1', {}, MODES.match[0]), h('p', {}, 'Not enough cards in this set to play.')); return; }
    const left = cards, right = A.shuffle(cards);
    let sel = null, matched = 0, slips = 0;
    const tiles = [];
    const mk = (side, c, label) => {
      const b = h('button', { class: 'vg-tile', type: 'button', 'aria-pressed': 'false', onclick: () => pick(b, side, c) }, label);
      tiles.push(b); return b;
    };
    function pick(b, side, c) {
      if (b.disabled) return;
      if (sel && sel.side === side) { sel.b.setAttribute('aria-pressed', 'false'); sel.b.classList.remove('on'); if (sel.b === b) { sel = null; return; } }
      if (!sel || sel.side === side) { sel = { b, side, c }; b.setAttribute('aria-pressed', 'true'); b.classList.add('on'); return; }
      const ok = sel.c === c;
      if (ok) {
        [sel.b, b].forEach((x) => { x.disabled = true; x.classList.remove('on'); x.classList.add('done'); x.setAttribute('aria-pressed', 'false'); });
        matched++; status.textContent = `${matched} of ${cards.length} matched`;
        if (matched === cards.length) finish();
      } else {
        slips++; status.textContent = 'Not a pair. Try again.';
        const a = sel.b; a.classList.remove('on'); a.setAttribute('aria-pressed', 'false'); b.classList.add('bad'); a.classList.add('bad');
        setTimeout(() => { a.classList.remove('bad'); b.classList.remove('bad'); }, 600);
      }
      sel = null;
    }
    function finish() {
      const right1 = Math.max(0, cards.length - slips);
      Store.record('v-games', right1, cards.length);
      box.append(h('div', { class: 'card', role: 'status' }, h('div', { class: 'score' }, slips ? `${slips} slip${slips === 1 ? '' : 's'}` : 'No slips'), h('p', { class: 'muted' }, slips ? 'Look at the pairs you hesitated on, then play again.' : 'Clean round. Try a typing game next.'),
        h('div', { class: 'row' }, h('button', { class: 'btn', onclick: () => A.route() }, 'Play again'), A.link('#/vgames', 'Other games', 'btn ghost'))));
    }
    box.append(h('p', { class: 'muted' }, 'Choose an expression, then its meaning.'),
      h('div', { class: 'vg-cols' }, h('div', { class: 'vg-col' }, left.map((c) => mk('l', c, c.phrase))), h('div', { class: 'vg-col' }, right.map((c) => mk('r', c, first(c))))), status);
    A.view(A.back('#/vgames', 'Vocabulary games'), h('h1', {}, MODES.match[0]), box);
  }
  function play(mode, group) {
    const items = window.VGames.build(mode, poolFor(group), MODES[mode][2], A.shuffle, A.exOf);
    if (items.length < 4) { A.view(A.back('#/vgames', 'Vocabulary games'), h('h1', {}, MODES[mode][0]), h('p', {}, 'Not enough suitable cards in this set for this game. Try another game or "All vocabulary".')); return; }
    A.view(A.back('#/vgames', 'Vocabulary games'), h('h1', {}, MODES[mode][0]), h('p', { class: 'muted' }, MODES[mode][1]),
      quiz(items, { source: { topic: 'v-games', label: 'Vocabulary games · ' + MODES[mode][0], href: '#/vgames/' + mode + (group ? '/' + group : '') }, onRetry: () => A.route(), onScore: (c, t) => Store.record('v-games', c, t) }));
  }

  function hub() {
    const mine = A.allCards.filter((c) => Store.card(c.id)).length, using = pref() === 'all' || mine < 12 ? 'all the vocabulary' : `the ${mine} cards you have started`;
    const card = (m) => h('a', { class: 'card', href: '#/vgames/' + m }, h('h3', { style: 'margin:0 0 .3em' }, MODES[m][0]), h('p', { class: 'muted', style: 'margin:0' }, MODES[m][1]));
    A.view(A.back('#/vocab', 'Vocabulary'), h('h1', {}, 'Vocabulary games'),
      h('p', { class: 'lead' }, 'The same words, in different ways. Games never change when a card is due, so play as many or as few as you like.'),
      h('p', { class: 'muted' }, `Playing with ${using}. `, mine >= 12 ? h('button', { class: 'linkbtn', onclick: () => { setPref(pref() === 'all' ? 'mine' : 'all'); A.route(); } }, pref() === 'all' ? 'Use only my started cards' : 'Use all the vocabulary') : null),
      h('div', { class: 'grid' }, ['mix', 'match', 'type', 'gap', 'mean', 'hear'].map(card)),
      h('p', {}, h('label', { class: 'row' }, 'Only one group: ', (() => {
        const sel = h('select', { 'aria-label': 'Group', onchange: () => { if (sel.value) sessionStorage.setItem('c1path.vggroup', sel.value); else sessionStorage.removeItem('c1path.vggroup'); } },
          h('option', { value: '' }, 'All (default)'), ...C1.vocab.map((g) => h('option', { value: g.id }, g.title)));
        try { sel.value = sessionStorage.getItem('c1path.vggroup') || ''; } catch (e) { /* optional */ }
        return sel;
      })())));
  }

  A.routes.vgames = (mode, group) => {
    if (!mode) return hub();
    if (!MODES[mode]) return A.notFound();
    let g = group; if (!g) { try { g = sessionStorage.getItem('c1path.vggroup') || ''; } catch (e) { g = ''; } }
    if (g && !C1.vocab.some((x) => x.id === g)) g = '';
    return mode === 'match' ? match(g) : play(mode, g);
  };
})();
