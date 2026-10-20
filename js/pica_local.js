/* C1 Path – Pica without an AI key: she answers from what is already on the site (lessons, tricks, vocabulary) and says plainly when she cannot.
   No network, nothing leaves the browser. window.PicaLocal.answer(question) and .explain(screenText) return text with **bold** and [label](link inside the site) links. */
(function () {
  const STOP = new Set('a an the of to and or but is are was were be been am do does did have has had i you he she it we they me my your our this that these those what which who how when where why not no yes about between difference different vs versus use using say mean means meaning word words phrase sentence english please explain tell some any there than then so if as into out up down over under more most very much many'.split(' '));
  const plain = (s) => String(s == null ? '' : s).replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\[\[|\]\]/g, '').replace(/\s+/g, ' ').trim();
  const WEAK = new Set(['for', 'in', 'on', 'at', 'from', 'with', 'by']);
  const stem = (w) => { const s = w.replace(/(ing|ed|es|s|e|ly)$/, ''); return s.length >= 3 ? s : w; }; /* writing, writes and write meet at "writ" */
  const tokens = (s) => plain(s).toLowerCase().replace(/[^a-z0-9' -]/g, ' ').split(/\s+/).map((w) => w.replace(/^'+|'+$/g, '')).filter((w) => w.length > 1 && !STOP.has(w));
  const clip = (s, n) => { s = plain(s); return s.length <= n ? s : s.slice(0, n).replace(/\s+\S*$/, '') + '…'; };

  let index = null;
  /* one record per thing Pica can point to: its title words weigh most, its body words less */
  function build() {
    const C1 = window.C1 || {}, docs = [];
    (C1.grammar || []).forEach((g) => docs.push({ kind: 'lesson', title: g.title, head: tokens(g.title + ' ' + g.tagline), body: tokens(plain(g.idea) + ' ' + (g.parts || []).map((p) => p.h + ' ' + plain(p.body)).join(' ')), g }));
    (C1.tricks || []).forEach((s) => s.items.forEach((t, i) => docs.push({ kind: 'trick', title: plain(t.t), head: tokens(t.t), body: tokens(plain(t.tip) + ' ' + plain(t.ex) + ' ' + plain(t.why)), t, key: s.id + '-' + i })));
    (C1.vocab || []).forEach((grp) => grp.cards.forEach((c) => docs.push({ kind: 'word', title: c.phrase, head: tokens(c.phrase), body: tokens(c.meaning + ' ' + plain(c.logic)), c, grp })));
    docs.forEach((d) => { d.hs = new Set(d.head.map(stem)); d.bs = new Set(d.body.map(stem)); });
    return docs;
  }
  function search(q) {
    index = index || build();
    const qt = [...new Set(tokens(q).map(stem))], strong = qt.filter((w) => !WEAK.has(w));
    if (!qt.length) return [];
    return index.map((d) => {
      let s = 0, hit = 0, head = 0, strongHead = 0, strongHit = 0;
      qt.forEach((w) => {
        const weak = WEAK.has(w); /* small words such as "for" help, but never find a page on their own */
        if (d.hs.has(w)) { s += weak ? 1 : 3; hit++; head++; if (!weak) { strongHead++; strongHit++; } } else if (d.bs.has(w)) { s += weak ? 0.2 : 1; hit++; if (!weak) strongHit++; }
      });
      /* the more of the asked words it holds, the better; a vocabulary card must match with its phrase (two words when two were asked) */
      if (hit === qt.length) s += 2;
      if (d.kind === 'word' && head < Math.min(2, qt.length)) s = 0;
      if (s && d.kind !== 'word') s += 0.6; /* a lesson or a trick explains more than a single phrase */
      return { d, s: s / Math.sqrt(1 + d.hs.size * 0.1), hit, head, strongHead, strongHit };
    }).filter((r) => (strong.length ? r.strongHead >= 1 && r.strongHit / strong.length >= (strong.length >= 3 ? 0.6 : 0.5) : r.head >= 1) && r.s >= 2).sort((a, b) => b.s - a.s);
  }

  const link = (label, href) => `[${label}](${href})`;
  function show(d) {
    if (d.kind === 'trick') {
      const t = d.t, drills = ((window.C1 || {}).trickDrills || {})[d.key];
      return `**${d.title}**\n\n${clip(t.tip, 380)}${t.ex ? `\n\nExample: ${clip(t.ex, 200)}` : ''}${t.why ? `\n\n${clip(t.why, 200)}` : ''}\n\n${link('Open this trick', '#/tricks/' + d.key)}${drills && drills.length >= 3 ? ' · ' + link('Practise it', '#/tricks/practice/' + d.key) : ''}`;
    }
    if (d.kind === 'lesson') return `**${d.title}**: ${plain(d.g.tagline)}\n\n${clip(d.g.idea, 420)}\n\n${link('Read the lesson', '#/grammar/' + d.g.id)}`;
    const c = d.c;
    return `**${c.phrase}**: ${plain(c.meaning)}.${c.logic ? ' ' + clip(c.logic, 240) : ''}${c.ex ? `\n\nExample: ${plain(c.ex)}` : ''}\n\n${link('Open the group', '#/vocab/' + d.grp.id)}`;
  }

  const NOTE = '\n\nI am answering from the lessons on this site. For any question, add a free AI key on your account page.';
  function answer(question) {
    const q = String(question || '').slice(0, 300), r = search(q);
    if (!r.length) {
      return 'I could not find that in the lessons here. Try one or two key words ("since", "third conditional", "make or do"), or look in ' + link('Grammar', '#/grammar') + ', ' + link('Tricks', '#/tricks') + ' and ' + link('Vocabulary', '#/vocab') + '.' + NOTE;
    }
    const lead = show(r[0].d), others = r.slice(1, 3).filter((x) => x.d.title !== r[0].d.title).map((x) => `${x.d.title} (${x.d.kind === 'trick' ? link('trick', '#/tricks/' + x.d.key) : x.d.kind === 'lesson' ? link('lesson', '#/grammar/' + x.d.g.id) : link('word', '#/vocab/' + x.d.grp.id)})`);
    return 'Here is what I found.\n\n' + lead + (others.length ? '\n\nAlso related: ' + others.join(', ') + '.' : '') + NOTE;
  }

  /* a wrong answer taken to Pica: the explanation the exercise already has, and the trick that fits if there is one */
  function explain(screen) {
    const m = /Exercise question: ([\s\S]*?)\nMy answer: ([\s\S]*?)\nCorrect answer: ([\s\S]*?)(?:\nThe given explanation: ([\s\S]*))?$/.exec(String(screen || ''));
    if (!m) return answer('');
    const [, q, given, correct, why] = m, C1 = window.C1 || {}, tr = C1.trickFor ? C1.trickFor(q, given === '(blank)' ? '' : given, [correct]) : null;
    return `Let us look at it.\n\nYou wrote **${plain(given)}**; the answer is **${plain(correct)}**.${why ? '\n\n' + plain(why) : ''}${tr ? `\n\nThis trick fits: ${link(tr.title || 'open it', '#/tricks/' + tr.key)}.` : ''}\n\nThis is the explanation the exercise already has. A free AI key lets me explain it in more ways.`;
  }
  window.PicaLocal = { answer, explain, search, plain };
})();
