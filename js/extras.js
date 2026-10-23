/* C1 Path – Tricks, AI-generated practice and the CertAcles-style paper. */
(function () {
  const { h, quiz } = Engine;
  const A = window.App;
  const { view, back, link, icon } = A;
  A.topicLabels.ai = 'AI-generated practice';

  /* ---------- tricks ---------- */
  /* the exercises a trick settles: every short exercise whose trick (see data/trickmap.js) is this one */
  let trickPool = null;
  const poolFor = (key) => {
    if (!trickPool) {
      trickPool = {}; const seen = new Set();
      (function walk(o, d) {
        if (!o || typeof o !== 'object' || d > 9 || seen.has(o)) return; seen.add(o);
        if (typeof o.why === 'string' && (o.type === 'mcq' || o.type === 'kwt' || o.type === 'gap') && (o.q || o.first)) {
          const exp = o.answers || [o.options && o.options[o.answer]], other = o.options ? o.options.find((x, i) => i !== o.answer) : '';
          const r = C1.trickFor(o.q || (o.first + ' ' + o.key + ' ' + o.second), other, exp);
          if (r) (trickPool[r.key] = trickPool[r.key] || []).push(o);
        }
        Object.keys(o).forEach((k) => { if (o[k] && typeof o[k] === 'object') walk(o[k], d + 1); });
      })({ p: C1.practice, g: C1.grammar }, 0);
      /* data/trickdrills.js: exercises written for one trick each ({ 'words-0': [items] }) */
      Object.entries(C1.trickDrills || {}).forEach(([k, list]) => { trickPool[k] = (trickPool[k] || []).concat(list); });
    }
    return trickPool[key] || [];
  };
  A.trickPool = poolFor;
  /* the tricks written for one kind of task (data/tricks4.js, section 'tasks'): a collapsed list for the task's own page */
  A.taskTricks = (task) => {
    const s = C1.tricks.find((x) => x.id === 'tasks');
    const list = s ? s.items.map((t, i) => [t, i]).filter(([t]) => t.task === task) : [];
    if (!list.length) return null;
    return h('details', { class: 'callout tasktricks' }, h('summary', {}, h('strong', {}, `Tricks for this task (${list.length})`)),
      h('ul', {}, list.map(([t, i]) => h('li', {}, link('#/tricks/tasks-' + i, t.t)))));
  };
  function trickPractice(key) {
    const items = A.sample(poolFor(key), 8), s = C1.tricks.find((x) => x.id === key.split('-')[0]), t = s && s.items[+key.split('-')[1]];
    if (!t || !items.length) { location.hash = '#/tricks'; return; }
    view(back('#/tricks/' + key, 'Tricks'), h('h1', {}, 'Practise: ' + t.t),
      h('p', { class: 'muted' }, 'Short exercises where this trick settles the doubt. Read the trick first if you need it.'),
      quiz(items, { source: { topic: 'trick', label: 'Trick practice', href: '#/tricks/' + key }, onRetry: () => trickPractice(key), onScore: (c, n) => Store.record('trick', c, n) }));
  }
  /* the tricks page: a hub of themes instead of one giant list, a page per theme, a search over every trick, and a trick of the day */
  const TRICK_GROUPS = [
    ['By exam task', 'Technique for each part of the exam.', ['tasks', 'exam']],
    ['Words and grammar', 'Rules and pairs that settle the usual doubts.', ['words', 'grammar', 'preps', 'wf']],
    ['Sound natural', 'Say it the way people really say it.', ['natural', 'everyday', 'spanish', 'listening']]
  ];
  const TASK_NAMES = { mcq: 'Use of English: multiple-choice cloze', cloze: 'Use of English: open cloze', wf: 'Use of English: word formation', kwt: 'Use of English: key word transformation', reading: 'Reading: Part 5', cross: 'Reading: cross-text, Part 6', gapped: 'Reading: gapped text, Part 7', matching: 'Reading: multiple matching, Part 8', listening: 'Listening', writing: 'Writing', speaking: 'Speaking' };
  const plainT = (s) => String(s == null ? '' : s).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const trickBox = (s, x, i, open) => {
    const key = s.id + '-' + i, n = poolFor(key).length;
    return h('details', { class: 'trick', id: 'trick-' + key, open: !!open }, h('summary', {}, x.t),
      h('p', { html: x.tip }), x.why ? h('p', { class: 'muted', html: x.why }) : null, x.ex ? h('p', { class: 'trickex', html: x.ex }) : null,
      n >= 3 ? link('#/tricks/practice/' + key, 'Practise this (' + Math.min(8, n) + ' questions)', 'btn small ghost') : null);
  };
  const allTricks = () => C1.tricks.flatMap((s) => s.items.map((x, i) => ({ s, x, i, key: s.id + '-' + i })));

  function sectionPage(s, want) {
    const find = h('input', { type: 'search', class: 'wide', placeholder: 'Search in ' + s.title + '…', 'aria-label': 'Search in this theme' });
    const body = h('div');
    const draw = () => {
      const q = find.value.trim().toLowerCase(), rows = s.items.map((x, i) => [x, i]).filter(([x]) => !q || plainT(x.t + ' ' + x.tip + ' ' + (x.ex || '')).toLowerCase().includes(q));
      if (!rows.length) { body.replaceChildren(h('p', { class: 'muted' }, 'No tricks match.')); return; }
      /* the exam-task theme is split by task so it reads as several short lists, not one long one */
      const names = s.id === 'tasks' ? [...new Set(rows.map(([x]) => x.task))] : [null];
      body.replaceChildren(...names.flatMap((t) => [t ? h('h2', { class: 'trick-sub' }, TASK_NAMES[t] || t) : null].concat(rows.filter(([x]) => !t || x.task === t).map(([x, i]) => trickBox(s, x, i, q ? false : want === s.id + '-' + i)))).filter(Boolean));
    };
    find.addEventListener('input', draw);
    draw();
    view(back('#/tricks', 'Tricks'), h('h1', {}, s.title), h('p', { class: 'lead' }, s.blurb || ''), find, body,
      h('div', { class: 'callout' }, 'No trick replaces knowing the language. Use these to avoid losing marks you already deserve, and keep practising in the ', link('#/practice', 'exam tasks'), '.'));
    if (want) setTimeout(() => { const d = document.getElementById('trick-' + want); if (d) { d.open = true; d.scrollIntoView({ block: 'center' }); } }, 0);
  }

  function trickHub() {
    const day = Math.floor(Date.now() / 864e5), pool = allTricks().filter((t) => t.x.tip), today = pool[(day * 7) % pool.length];
    const find = h('input', { type: 'search', class: 'wide', placeholder: 'Search all ' + allTricks().length + ' tricks (e.g. make, since, wish)…', 'aria-label': 'Search all the tricks' });
    const results = h('div', { 'aria-live': 'polite' });
    const groupsEl = h('div');
    const secById = Object.fromEntries(C1.tricks.map((s) => [s.id, s]));
    const placed = new Set(TRICK_GROUPS.flatMap((g) => g[2]));
    const rest = C1.tricks.filter((s) => !placed.has(s.id)).map((s) => s.id);
    groupsEl.append(...TRICK_GROUPS.map(([title, blurb, ids], gi) => h('section', {}, h('h2', {}, title), h('p', { class: 'muted' }, blurb),
      h('div', { class: 'grid' }, ids.concat(gi === TRICK_GROUPS.length - 1 ? rest : []).map((id) => secById[id]).filter(Boolean).map((s) =>
        h('a', { class: 'card', href: '#/tricks/' + s.id }, h('h3', { style: 'margin:0 0 .2em' }, s.title), h('p', { class: 'muted', style: 'margin:0 0 6px' }, s.blurb || ''), h('span', { class: 'tag' }, s.items.length + ' tricks')))))));
    find.addEventListener('input', () => {
      const q = find.value.trim().toLowerCase();
      groupsEl.hidden = q.length >= 2;
      if (q.length < 2) { results.replaceChildren(); return; }
      const hits = allTricks().filter((t) => plainT(t.x.t + ' ' + t.x.tip + ' ' + (t.x.ex || '')).toLowerCase().includes(q)).slice(0, 40);
      results.replaceChildren(...(hits.length ? [h('ul', { class: 'trick-hits' }, hits.map((t) => h('li', {}, link('#/tricks/' + t.key, plainT(t.x.t)), h('span', { class: 'muted' }, ' · ' + t.s.title))))] : [h('p', { class: 'muted' }, 'No tricks match.')]));
    });
    view(back('#/toolkit', 'Study'), h('h1', {}, 'Tricks'),
      h('p', { class: 'lead' }, 'Small tricks that settle the doubts everyone has: which word, which preposition, which form. Pick a theme, or search.'),
      find, results,
      h('div', { class: 'card tod' }, h('div', { class: 'muted' }, 'Trick of the day'), h('strong', {}, plainT(today.x.t)), h('p', { html: today.x.tip }), link('#/tricks/' + today.key, 'Open it', 'btn small')),
      groupsEl,
      A.routes.saythis ? h('div', { class: 'card' }, h('strong', {}, 'Say this, not that'), h('p', { class: 'muted' }, 'Short pairs: what learners say and what a UK English speaker says, with the reason.'), link('#/saythis', 'Open', 'btn small ghost')) : null);
  }

  A.routes.tricks = (want, c) => {
    if (want === 'practice' && c) return trickPractice(c);
    if (!want) return trickHub();
    const sec = C1.tricks.find((x) => x.id === want);
    if (sec) return sectionPage(sec, null);
    const cut = want.lastIndexOf('-'), s2 = cut > 0 && C1.tricks.find((x) => x.id === want.slice(0, cut)), idx = Number(want.slice(cut + 1));
    if (s2 && Number.isInteger(idx) && s2.items[idx]) return sectionPage(s2, want);
    return trickHub();
  };

  /* ---------- generate with AI ---------- */
  const KINDS = [
    ['mcq', 'Multiple-choice cloze', 'Eight sentences with four options', 'practice'],
    ['cloze', 'Open cloze', 'A short text with eight one-word gaps', 'grammar'],
    ['kwt', 'Key word transformation', 'Six rewrite tasks', 'writing'],
    ['listening', 'Listening dialogue', 'A new conversation read by your browser voice, with questions', 'listening']
  ];
  A.routes.generate = () => {
    const out = h('div'), status = h('p', { class: 'muted', role: 'status' });
    let kind = 'mcq';
    const topic = h('input', { type: 'text', class: 'wide', placeholder: 'Topic, e.g. remote work, volunteering, space tourism (optional)', 'aria-label': 'Topic', maxlength: 120 });
    const picks = h('div', { class: 'grid' }, KINDS.map(([id, name, desc, ic]) => {
      const b = h('button', { class: 'card pick' + (id === kind ? ' on' : ''), type: 'button', 'aria-pressed': String(id === kind), onclick: () => {
        kind = id; picks.querySelectorAll('.pick').forEach((x) => { const on = x === b; x.classList.toggle('on', on); x.setAttribute('aria-pressed', String(on)); });
      } }, h('h3', { style: 'margin:0 0 .2em' }, icon(ic), name), h('span', { class: 'muted' }, desc));
      return b;
    }));
    const go = h('button', { class: 'btn', type: 'button', onclick: async () => {
      go.disabled = true; out.replaceChildren(); status.textContent = 'Writing new material… this takes 10 to 30 seconds.';
      try {
        const set = await AI.generate(kind, topic.value);
        status.textContent = '';
        const show = () => out.replaceChildren(h('div', { class: 'callout' }, h('strong', {}, 'Made by AI. '), 'It can contain mistakes: if an answer looks wrong, trust your grammar books and the explanation, and tell me in the notes. Results count towards your progress and wrong answers go to your mistakes.'),
          h('h2', {}, set.title || 'Generated practice'),
          quiz(set.items, { source: { topic: 'ai', label: 'AI-generated · ' + (set.title || kind), href: '#/generate' }, onScore: (c, t) => Store.record('ai', c, t), onRetry: show }));
        show();
      } catch (e) { status.textContent = e.message; }
      go.disabled = false;
    } }, 'Generate');
    view(back('#/toolkit', 'Study'), h('h1', {}, 'Generate with AI'),
      h('p', { class: 'lead' }, 'Ask for a new set of exam-style tasks on any topic. It uses your own free API key, so nothing is stored on a server.'),
      AI.configured() ? null : h('div', { class: 'callout' }, 'You need a free key first: ', link('#/account', 'add one under Account, in Settings'), ' (Google Gemini or Groq, a couple of minutes).'),
      h('h2', {}, '1 · Choose the task'), picks,
      h('h2', {}, '2 · Choose a topic'), topic,
      h('div', { class: 'row', style: 'margin:14px 0' }, go), status, out);
  };

  /* ---------- CertAcles-style paper ---------- */
  A.routes.certacles = () => {
    const row = (label, sub, href) => h('div', { class: 'step' }, h('span', { class: 'dot' }, '›'), h('div', {}, h('strong', {}, label), h('div', { class: 'muted' }, sub)), link(href, 'Open', 'btn small ghost'));
    view(back('#/mock', 'Exams'), h('h1', {}, 'CertAcles-style paper'),
      h('p', { class: 'lead' }, 'Each university designs its own CertAcles exam, so there is no single official format. This guide puts the usual four components in a typical order, using the closest tasks on this site.'),
      h('div', { class: 'steps' },
        row('1 · Reading and use of language', 'Typically 60 to 90 minutes. Full Reading and Use of English test (gapped texts, rewriting, comprehension).', '#/mock/reading'),
        row('2 · Listening', 'Typically 30 to 45 minutes. Four recordings with questions.', '#/mock/listening'),
        row('3 · Writing', 'Typically 60 to 90 minutes. An essay plus a second text such as an email or report.', '#/mock/writing'),
        row('4 · Speaking', 'Typically 10 to 20 minutes, often with a partner. Interview, long turn and discussion.', '#/mock/speaking')),
      h('div', { class: 'callout' }, h('strong', {}, 'Times are approximate. '), 'Ask the language centre where you will sit it for its exam model and past papers, and adjust the timer in each test to match. See also ', link('#/exams', 'the exams explained'), '.'));
  };
})();
