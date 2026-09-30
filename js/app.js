/* C1 Path – views and hash router. */
(function () {
  const { h, quiz } = Engine;
  const C1 = window.C1;
  const app = document.getElementById('app');
  const pct = (x) => Math.round(x * 100);

  /* ---------- structure of the course ---------- */
  const GRAMMAR_CATS = [
    { name: 'Verbs and time', blurb: 'How verbs express time, certainty and unreality.' },
    { name: 'Sentence structure', blurb: 'Building, reshaping and emphasising clauses.' },
    { name: 'Reporting and voice', blurb: 'Who does what, and who said what.' },
    { name: 'Words and patterns', blurb: 'Patterns that words demand: forms, quantities, comparisons, linkers.' }
  ];
  const VOCAB_SECTIONS = [
    { name: 'Phrasal verbs', blurb: 'Grouped by the particle or verb that gives them their logic.' },
    { name: 'Collocations and patterns', blurb: 'Word partners, prepositions and confusing pairs.' },
    { name: 'Idioms and expressions', blurb: 'Fixed images and formal phrases for Speaking and Writing.' },
    { name: 'Topic vocabulary', blurb: 'Useful language for the themes that come up in every exam.' }
  ];
  const PRACTICE_SECTIONS = [
    { name: 'Use of English', ids: ['mcq', 'cloze', 'wf', 'kwt'], blurb: 'Cambridge Reading and Use of English, Parts 1–4, and similar tasks in Linguaskill and CertAcles.' },
    { name: 'Reading', ids: ['reading', 'gapped'], blurb: 'Longer texts: understanding attitude, reference and text structure.' }
  ];

  const grammar = GRAMMAR_CATS.flatMap((c) => C1.grammar.filter((g) => g.category === c.name))
    .concat(C1.grammar.filter((g) => !GRAMMAR_CATS.some((c) => c.name === g.category)));
  const practiceTypes = PRACTICE_SECTIONS.flatMap((s) => s.ids.map((id) => C1.practice.find((p) => p.id === id)).filter(Boolean));
  const setKey = (typeId, i) => typeId + '/' + i;

  const topicLabels = { 'v-cards': 'Vocabulary cards', 'v-quiz': 'Vocabulary quizzes', placement: 'Placement test' };
  C1.grammar.forEach((g) => (topicLabels['g-' + g.id] = g.title));
  C1.practice.forEach((p) => (topicLabels['u-' + p.id] = p.title));
  const topicHref = (k) => k.startsWith('g-') ? '#/grammar/' + k.slice(2) : k.startsWith('u-') ? '#/practice/' + k.slice(2) : k.startsWith('v-') ? '#/vocab' : '#/';

  const allCards = C1.vocab.flatMap((g) => g.cards.map((c, i) => Object.assign({ id: g.id + '-' + i, group: g.id, groupTitle: g.title, section: g.section }, c)));
  const cardById = Object.fromEntries(allCards.map((c) => [c.id, c]));

  /* ---------- helpers ---------- */
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const link = (href, text, cls) => h('a', { href, class: cls || '' }, text);
  const back = (href, text) => h('p', { class: 'crumbs' }, link(href, '← ' + text));
  const bar = (p, cls) => h('div', { class: 'bar ' + (cls || '') }, h('i', { style: `width:${Math.max(2, pct(p))}%` }));
  const barCls = (a) => (a >= 0.8 ? 'ok' : a >= 0.6 ? 'warn' : 'bad');
  const accTag = (topic) => {
    const a = Store.accuracy(topic);
    return a == null ? null : h('span', { class: 'tag' + (a >= 0.8 ? ' ok' : '') }, pct(a) + '% correct');
  };
  const dueIds = () => allCards.filter((c) => Store.isDue(c.id)).map((c) => c.id);
  const newIds = (group) => allCards.filter((c) => !Store.card(c.id) && (!group || c.group === group)).map((c) => c.id);
  const NEW_PER_DAY = 10;
  const sectionHead = (title, blurb, right) => h('div', { class: 'section-h' }, h('div', {}, h('h2', {}, title), blurb ? h('div', { class: 'muted' }, blurb) : null), right || null);
  const scoreChip = (key) => { const s = Store.score(key); return s ? h('span', { class: 'chip best' }, 'best ' + pct(s.p) + '%') : null; };
  const setsDone = (p) => p.sets.filter((_, i) => Store.score(setKey(p.id, i))).length;
  const cardsSeen = (group) => allCards.filter((c) => c.group === group && Store.card(c.id)).length;

  function view(...nodes) { app.replaceChildren(...nodes); window.scrollTo(0, 0); }
  const cardBlock = (title, ...kids) => h('div', { class: 'card' }, title ? h('h2', { style: 'margin-top:0' }, title) : null, ...kids);

  /* ---------- home ---------- */
  function nextPractice() {
    for (const p of practiceTypes) for (let i = 0; i < p.sets.length; i++) if (!Store.score(setKey(p.id, i))) return { p, i };
    return null;
  }

  function home() {
    const st = Store.state;
    const due = dueIds().length;
    const fresh = Math.max(0, Math.min(NEW_PER_DAY - Store.newTodayCount(), newIds().length));
    const nextLesson = grammar.find((g) => !st.lessons[g.id]);
    const np = nextPractice();

    const steps = [];
    if (!st.placement) steps.push(['Take the placement test', 'Twenty-four questions, B1 to C1. It shows where to start.', '#/placement', 'Start']);
    if (due + fresh > 0) steps.push([`Review ${due + fresh} vocabulary card${due + fresh === 1 ? '' : 's'}`, `${due} due · ${fresh} new`, '#/review', 'Review']);
    if (nextLesson) steps.push([`Lesson: ${nextLesson.title}`, nextLesson.tagline, '#/grammar/' + nextLesson.id, 'Open']);
    if (np) steps.push([`Practise: ${np.p.title}`, np.p.sets[np.i].title, `#/practice/${np.p.id}/${np.i}`, 'Practise']);

    const today = cardBlock('Today', steps.length ? steps.slice(0, 4).map(([t, d, href, cta]) =>
      h('div', { class: 'pathrow' }, h('div', {}, h('strong', {}, t), h('div', { class: 'muted' }, d)), link(href, cta, 'btn small'))) : h('p', {}, 'You are fully up to date. Come back tomorrow for your review.'));

    const gDone = grammar.filter((g) => st.lessons[g.id]).length;
    const seen = allCards.filter((c) => Store.card(c.id)).length;
    const pTotal = practiceTypes.reduce((a, p) => a + p.sets.length, 0);
    const pDone = practiceTypes.reduce((a, p) => a + setsDone(p), 0);
    const row = (label, href, done, total) => h('div', { class: 'pathrow' }, h('div', {}, h('a', { href }, label), h('div', { class: 'muted' }, `${done} of ${total}`), bar(total ? done / total : 0)), h('strong', {}, pct(total ? done / total : 0) + '%'));
    const path = cardBlock('Your path',
      row('Grammar lessons read', '#/grammar', gDone, grammar.length),
      row('Vocabulary items started', '#/vocab', seen, allCards.length),
      row('Practice sets completed', '#/practice', pDone, pTotal));

    const acc = (() => { const t = Store.totalAnswered(); const c = Object.values(st.stats).reduce((a, s) => a + s.c, 0); return t ? pct(c / t) + '%' : '–'; })();
    const weak = Object.entries(st.stats).filter(([, s]) => s.t >= 5).map(([k, s]) => [k, s.c / s.t]).filter(([, a]) => a < 0.75).sort((a, b) => a[1] - b[1]).slice(0, 3);

    view(h('h1', {}, 'Understand it. Then use it.'),
      h('p', { class: 'lead' }, 'Practice for Cambridge C1 Advanced, Linguaskill and CertAcles. Every topic starts with the idea behind the language, so you reason your way to the answer instead of memorising rules.'),
      h('div', { class: 'stats' },
        h('div', { class: 'stat' }, h('b', {}, Store.streak()), h('span', {}, 'day streak')),
        h('div', { class: 'stat' }, h('b', {}, Store.totalAnswered()), h('span', {}, 'answers so far')),
        h('div', { class: 'stat' }, h('b', {}, acc), h('span', {}, 'overall accuracy')),
        h('div', { class: 'stat' }, h('b', {}, due), h('span', {}, 'cards due today'))),
      today, path,
      weak.length ? cardBlock('Needs work', weak.map(([k, a]) => h('div', { class: 'trow' }, link(topicHref(k), topicLabels[k] || k), bar(a, 'bad'), h('span', {}, pct(a) + '%'))),
        h('p', { class: 'muted' }, 'Topics below 75% after at least 5 answers.')) : null,
      h('p', { class: 'muted' }, link('#/progress', 'See full progress →')));
  }

  /* ---------- progress ---------- */
  function progress() {
    const st = Store.state;
    const heat = h('div', { class: 'heat' }, Store.lastDays(84).map((d) =>
      h('i', { class: d.n >= 20 ? 'l3' : d.n >= 8 ? 'l2' : d.n > 0 ? 'l1' : '', title: `${d.day}: ${d.n} answers` })));
    const groups = [['Grammar', 'g-'], ['Practice', 'u-'], ['Vocabulary and placement', null]];
    const entries = Object.entries(st.stats).filter(([, s]) => s.t > 0);
    const byGroup = (pre) => entries.filter(([k]) => pre ? k.startsWith(pre) : !k.startsWith('g-') && !k.startsWith('u-'));
    const tbl = groups.map(([name, pre]) => {
      const list = byGroup(pre);
      return list.length ? cardBlock(name, list.map(([k, s]) => { const a = s.c / s.t; return h('div', { class: 'trow' }, link(topicHref(k), topicLabels[k] || k), bar(a, barCls(a)), h('span', {}, pct(a) + '%')); })) : null;
    });
    const file = h('input', { type: 'file', accept: 'application/json', style: 'display:none' });
    file.addEventListener('change', async () => {
      try { Store.importData(await file.files[0].text()); alert('Progress restored.'); progress(); }
      catch (e) { alert('Could not read that file: ' + e.message); }
    });
    view(h('h1', {}, 'Progress'),
      h('div', { class: 'stats' },
        h('div', { class: 'stat' }, h('b', {}, Store.streak()), h('span', {}, 'day streak')),
        h('div', { class: 'stat' }, h('b', {}, Store.totalAnswered()), h('span', {}, 'answers so far')),
        h('div', { class: 'stat' }, h('b', {}, Object.keys(st.cards).length), h('span', {}, 'vocabulary items started')),
        h('div', { class: 'stat' }, h('b', {}, Object.keys(st.scores).length), h('span', {}, 'practice sets completed'))),
      cardBlock('Last 12 weeks', heat, h('p', { class: 'muted' }, 'Darker = more answers that day. Answer at least one question to keep your streak.')),
      ...tbl, !entries.length ? h('p', { class: 'muted' }, 'Nothing here yet. Do a lesson or a practice set and your results will appear.') : null,
      cardBlock('Your data', h('p', { class: 'muted' }, 'Everything is stored in this browser only. Export a backup before clearing browser data or switching device.'),
        h('div', { class: 'row' },
          h('button', { class: 'btn small', onclick: () => {
            const a = h('a', { href: URL.createObjectURL(new Blob([Store.exportData()], { type: 'application/json' })), download: `c1-path-backup-${Store.today()}.json` });
            document.body.append(a); a.click(); a.remove();
          } }, 'Export backup'),
          h('button', { class: 'btn small ghost', onclick: () => file.click() }, 'Import backup'), file,
          h('button', { class: 'btn small ghost', onclick: () => { if (confirm('Erase all progress in this browser?')) { Store.reset(); progress(); } } }, 'Reset progress'))));
  }

  /* ---------- placement ---------- */
  function placement() {
    const items = C1.placement.map((p) => Object.assign({ type: 'mcq' }, p));
    const prev = Store.state.placement;
    const box = h('div');
    box.append(h('h1', {}, 'Placement test'),
      h('p', { class: 'lead' }, `${items.length} questions from B1 up to C1. Do not guess wildly: a wrong answer with an explanation teaches you more than a lucky one. It takes about 15–20 minutes.`),
      prev ? h('div', { class: 'callout' }, `Last result (${prev.date}): ${prev.summary}`) : null,
      quiz(items, {
        onRetry: placement,
        onScore(c, t, res) {
          Store.record('placement', c, t);
          const lv = { B1: [0, 0], B2: [0, 0], C1: [0, 0] };
          const missed = new Set();
          res.forEach((r, i) => { const l = C1.placement[i].level; lv[l][1]++; if (r.ok) lv[l][0]++; else missed.add(C1.placement[i].topic); });
          const p = (l) => (lv[l][1] ? lv[l][0] / lv[l][1] : 0);
          let summary, plan;
          if (p('B1') < 0.7) { summary = 'Foundations first (around B1).'; plan = 'Start with the grammar lessons in order and use the vocabulary cards daily. Skip the Use of English sets for a couple of weeks.'; }
          else if (p('B2') < 0.65) { summary = 'Solid B1, building towards B2.'; plan = 'Work through the grammar lessons in order, then start the Use of English multiple-choice cloze and open cloze sets.'; }
          else if (p('C1') < 0.55) { summary = 'B2 level, C1 is within reach.'; plan = 'Focus on the lessons you missed below, then do Use of English sets every day.'; }
          else { summary = 'Working at C1 level on these questions.'; plan = 'Go straight to the practice sets and key word transformations. Use lessons as reference for weak spots.'; }
          Store.setPlacement({ date: Store.today(), summary });
          const out = h('div', { class: 'card' }, h('h2', { style: 'margin-top:0' }, summary),
            h('p', {}, `B1: ${lv.B1[0]}/${lv.B1[1]} · B2: ${lv.B2[0]}/${lv.B2[1]} · C1: ${lv.C1[0]}/${lv.C1[1]}`), h('p', {}, plan));
          const links = [...missed].map((id) => grammar.find((x) => x.id === id)).filter(Boolean);
          if (links.length) out.append(h('p', {}, 'Lessons to look at first:'), h('ul', {}, links.map((g) => h('li', {}, link('#/grammar/' + g.id, g.title)))));
          box.append(out);
        }
      }));
    view(box);
  }

  /* ---------- grammar ---------- */
  function grammarList() {
    view(h('h1', {}, 'Grammar'),
      h('p', { class: 'lead' }, 'Each lesson begins with the reason the structure exists. Once you see the reason, the rules stop being arbitrary. Lessons are grouped by theme; work top to bottom or jump to what you need.'),
      ...GRAMMAR_CATS.map((cat) => {
        const list = grammar.filter((g) => g.category === cat.name);
        if (!list.length) return null;
        const done = list.filter((g) => Store.state.lessons[g.id]).length;
        return h('div', {}, sectionHead(cat.name, cat.blurb, h('span', { class: 'muted' }, `${done}/${list.length} read`)),
          h('div', { class: 'grid' }, list.map((g) =>
            h('a', { class: 'card', href: '#/grammar/' + g.id },
              h('div', {}, h('span', { class: 'tag' + (Store.state.lessons[g.id] ? ' ok' : '') }, Store.state.lessons[g.id] ? 'Read' : g.level), accTag('g-' + g.id)),
              h('h3', { style: 'margin:.5em 0 .2em' }, g.title), h('p', { class: 'muted', style: 'margin:0' }, g.tagline)))));
      }));
  }

  function lesson(id) {
    const g = grammar.find((x) => x.id === id);
    if (!g) return notFound();
    const box = h('div');
    const jump = (target) => (e) => { e.preventDefault(); document.getElementById(target).scrollIntoView({ behavior: 'smooth' }); };
    const toc = [['The big idea', 'idea']].concat(g.parts.map((p, i) => [p.h, 'part' + i]));
    if (g.traps) toc.push(['Common traps', 'traps']);
    if (g.exam) toc.push(['In the exams', 'exam']);
    toc.push(['Practice', 'practice']);
    box.append(back('#/grammar', 'All grammar'),
      h('div', {}, h('span', { class: 'tag' }, g.category || 'Grammar'), h('span', { class: 'tag' }, g.level)),
      h('h1', {}, g.title), h('p', { class: 'lead' }, g.tagline),
      h('div', { class: 'toc' }, toc.map(([t, target]) => h('a', { href: '#', onclick: jump(target) }, t))),
      h('div', { class: 'callout', id: 'idea' }, h('strong', {}, 'The big idea'), h('div', { html: g.idea })));
    g.parts.forEach((p, i) => box.append(h('h2', { id: 'part' + i }, p.h), h('div', { html: p.body })));
    if (g.traps) box.append(h('h2', { id: 'traps' }, 'Common traps'), h('div', { class: 'callout warn', html: g.traps }));
    if (g.exam) box.append(h('h2', { id: 'exam' }, 'Where it shows up in the exams'), h('div', { html: g.exam }));
    box.append(h('h2', { id: 'practice' }, 'Practice'), h('p', { class: 'muted' }, 'Answer first, then read the explanation for every item, including the ones you got right.'),
      quiz(g.quiz, { onRetry: () => lesson(id), onScore: (c, t) => { Store.record('g-' + id, c, t); Store.markLesson(id); } }));
    const i = grammar.indexOf(g), pv = grammar[i - 1], nx = grammar[i + 1];
    box.append(h('div', { class: 'pager' }, pv ? link('#/grammar/' + pv.id, '← ' + pv.title, 'btn ghost small') : h('span'), nx ? link('#/grammar/' + nx.id, nx.title + ' →', 'btn ghost small') : h('span')));
    view(box);
  }

  /* ---------- vocabulary ---------- */
  function cardView(c, showGroup) {
    return h('div', { class: 'vcard' },
      h('div', {}, h('span', { class: 'hl' }, c.phrase), ' ', h('span', { class: 'tag' }, c.kind), showGroup ? h('span', { class: 'muted' }, ' ' + c.groupTitle) : null),
      h('div', {}, c.meaning),
      h('div', { class: 'eg', html: c.ex.replace(/\[\[(.+?)\]\]/g, '<em>$1</em>') }),
      c.logic ? h('div', { class: 'muted' }, '💡 ' + c.logic) : null);
  }

  function vocab() {
    const due = dueIds().length, fresh = Math.max(0, Math.min(NEW_PER_DAY - Store.newTodayCount(), newIds().length));
    const results = h('div');
    const search = h('input', { type: 'text', class: 'wide', placeholder: 'Search all ' + allCards.length + ' items (phrase or meaning)…', 'aria-label': 'Search vocabulary' });
    search.addEventListener('input', () => {
      const q = search.value.trim().toLowerCase();
      results.replaceChildren();
      if (q.length < 2) return;
      const hits = allCards.filter((c) => (c.phrase + ' ' + c.meaning + ' ' + c.ex).toLowerCase().includes(q)).slice(0, 30);
      results.append(h('div', { class: 'card' }, hits.length ? hits.map((c) => cardView(c, true)) : h('p', { class: 'muted' }, 'No matches.')));
    });
    const sections = VOCAB_SECTIONS.map((sec) => {
      const list = C1.vocab.filter((g) => g.section === sec.name);
      if (!list.length) return null;
      const n = list.reduce((a, g) => a + g.cards.length, 0);
      return h('div', {}, sectionHead(sec.name, sec.blurb, h('span', { class: 'muted' }, n + ' items')),
        h('div', { class: 'grid' }, list.map((g) =>
          h('a', { class: 'card', href: '#/vocab/' + g.id },
            h('span', { class: 'tag' + (cardsSeen(g.id) === g.cards.length ? ' ok' : '') }, `${cardsSeen(g.id)}/${g.cards.length} started`),
            h('h3', { style: 'margin:.5em 0 .2em' }, g.title), h('p', { class: 'muted', style: 'margin:0' }, g.short)))));
    });
    view(h('h1', {}, 'Vocabulary'),
      h('p', { class: 'lead' }, 'Phrasal verbs, collocations, idioms and topic language, grouped by the idea that connects them. Learn the idea and dozens of items become guessable.'),
      h('div', { class: 'card' }, h('h3', { style: 'margin-top:0' }, 'Daily practice'),
        h('p', {}, `${due} due · ${fresh} new available today · ${allCards.length} items in total`),
        h('div', { class: 'row' }, link('#/review', 'Start review', 'btn'), link('#/vquiz', 'Mixed quiz', 'btn ghost'), accTag('v-cards'))),
      search, results, ...sections);
  }

  function vocabGroup(id) {
    const g = C1.vocab.find((x) => x.id === id);
    if (!g) return notFound();
    const i = C1.vocab.indexOf(g), pv = C1.vocab[i - 1], nx = C1.vocab[i + 1];
    view(back('#/vocab', 'Vocabulary'), h('div', {}, h('span', { class: 'tag' }, g.section || 'Vocabulary')), h('h1', {}, g.title),
      h('div', { class: 'callout' }, h('strong', {}, 'The idea'), h('div', { html: g.idea })),
      h('div', { class: 'row' }, link('#/review/' + g.id, 'Study with flashcards', 'btn'), link('#/vquiz/' + g.id, 'Quick quiz', 'btn ghost')),
      h('div', { class: 'card' }, g.cards.map((c) => cardView(Object.assign({ groupTitle: g.title }, c)))),
      h('div', { class: 'pager' }, pv ? link('#/vocab/' + pv.id, '← ' + pv.title, 'btn ghost small') : h('span'), nx ? link('#/vocab/' + nx.id, nx.title + ' →', 'btn ghost small') : h('span')));
  }

  function vocabQuiz(group) {
    const pool = group ? allCards.filter((c) => c.group === group) : allCards;
    const picks = shuffle(pool).slice(0, group ? 8 : 12);
    const items = picks.map((c) => {
      let same = allCards.filter((x) => x.kind === c.kind && x.phrase !== c.phrase && (!group || x.group === c.group || x.section === c.section));
      if (same.length < 3) same = allCards.filter((x) => x.phrase !== c.phrase);
      const opts = shuffle([c.phrase].concat(shuffle(same).slice(0, 3).map((x) => x.phrase)));
      return {
        type: 'mcq', options: opts, answer: opts.indexOf(c.phrase),
        q: `<span class="muted">${c.meaning}</span><br>` + c.ex.replace(/\[\[(.+?)\]\]/g, '<span class="blank"></span>'),
        why: `<em>${c.phrase}</em>: ${c.meaning}. ${c.logic || ''}`
      };
    });
    const g = group && C1.vocab.find((x) => x.id === group);
    view(back(g ? '#/vocab/' + g.id : '#/vocab', g ? g.title : 'Vocabulary'), h('h1', {}, g ? g.title + ': quiz' : 'Mixed vocabulary quiz'),
      h('p', { class: 'muted' }, 'Choose the expression that fits the gap and the meaning shown in grey.'),
      quiz(items, { onRetry: () => vocabQuiz(group), onScore: (c, t) => Store.record('v-quiz', c, t) }));
  }

  function review(group) {
    let queue = shuffle(dueIds().filter((id) => !group || cardById[id].group === group))
      .concat(newIds(group).slice(0, Math.max(0, NEW_PER_DAY - Store.newTodayCount())));
    if (group && !queue.length) queue = shuffle(allCards.filter((c) => c.group === group).map((c) => c.id)).slice(0, 10);
    const total = queue.length;
    let reviewed = 0;
    const box = h('div');
    view(back('#/vocab', 'Vocabulary'), h('h1', {}, 'Review'), box);

    function next() {
      box.replaceChildren();
      if (!queue.length) {
        box.append(h('div', { class: 'card' }, h('h2', { style: 'margin-top:0' }, total ? 'Session complete' : 'Nothing due right now'),
          h('p', {}, total ? `You reviewed ${reviewed} card${reviewed === 1 ? '' : 's'}. Cards come back when they are due.` : 'Come back tomorrow, or open a group and study it ahead.'),
          link('#/vocab', 'Back to vocabulary', 'btn')));
        return;
      }
      const id = queue[0], c = cardById[id];
      box.append(h('p', { class: 'muted' }, `${queue.length} left · ${c.groupTitle}`));
      const front = h('div', { class: 'card flash' },
        h('div', { class: 'muted' }, 'Which expression fits?'),
        h('div', { class: 'big' }, c.meaning),
        h('div', { class: 'eg', html: c.ex.replace(/\[\[(.+?)\]\]/g, '<span class="blank"></span>') }),
        h('div', {}, h('button', { class: 'btn', onclick: reveal }, 'Show answer')));
      box.append(front);

      function reveal() {
        front.replaceChildren(
          h('div', { class: 'big hl' }, c.phrase), h('div', {}, c.meaning),
          h('div', { class: 'eg', html: c.ex.replace(/\[\[(.+?)\]\]/g, '<em>$1</em>') }),
          c.logic ? h('div', { class: 'callout' }, '💡 ' + c.logic) : null,
          h('div', { class: 'rate' }, [['Again', 0], ['Hard', 1], ['Good', 2], ['Easy', 3]].map(([label, r]) =>
            h('button', { class: 'btn', onclick: () => rateIt(r) }, label, h('small', {}, Store.intervalLabel(id, r))))));
      }
      function rateIt(r) {
        Store.rate(id, r);
        Store.record('v-cards', r >= 2 ? 1 : 0, 1);
        queue.shift();
        if (r === 0) queue.splice(Math.min(3, queue.length), 0, id); else reviewed++;
        next();
      }
    }
    next();
  }

  /* ---------- practice (Use of English and Reading) ---------- */
  function practiceList() {
    view(h('h1', {}, 'Practice'),
      h('p', { class: 'lead' }, 'Exam-style tasks with a strategy for each. Read the strategy first: every task tests one specific skill. Your best score on each set is remembered.'),
      ...PRACTICE_SECTIONS.map((sec) => {
        const list = sec.ids.map((id) => C1.practice.find((p) => p.id === id)).filter(Boolean);
        if (!list.length) return null;
        return h('div', {}, sectionHead(sec.name, sec.blurb),
          h('div', { class: 'grid' }, list.map((p) =>
            h('a', { class: 'card', href: '#/practice/' + p.id },
              h('span', { class: 'tag' + (setsDone(p) === p.sets.length ? ' ok' : '') }, `${setsDone(p)}/${p.sets.length} sets done`), accTag('u-' + p.id),
              h('h3', { style: 'margin:.5em 0 .2em' }, p.title), h('p', { class: 'muted', style: 'margin:0' }, p.short)))));
      }));
  }

  function practiceType(id, setIdx) {
    const p = C1.practice.find((x) => x.id === id);
    if (!p) return notFound();
    if (setIdx == null) {
      view(back('#/practice', 'Practice'), h('h1', {}, p.title), h('p', { class: 'muted' }, p.exam),
        h('div', { class: 'callout' }, h('strong', {}, 'Strategy'), h('div', { html: p.strategy })),
        sectionHead('Sets', `${setsDone(p)} of ${p.sets.length} completed`),
        h('div', { class: 'grid' }, p.sets.map((s, i) =>
          h('a', { class: 'card', href: `#/practice/${id}/${i}` }, h('div', {}, scoreChip(setKey(id, i)) || h('span', { class: 'chip' }, 'new')),
            h('h3', { style: 'margin:.4em 0 .2em' }, s.title), h('p', { class: 'muted', style: 'margin:0' }, s.note || '')))));
      return;
    }
    const s = p.sets[setIdx];
    if (!s) return notFound();
    view(back('#/practice/' + id, p.title), h('h1', {}, s.title), h('p', { class: 'muted' }, p.instruction),
      quiz(s.items, { onRetry: () => practiceType(id, setIdx), onScore: (c, t) => { Store.record('u-' + id, c, t); Store.setScore(setKey(id, setIdx), c, t); } }),
      h('div', { class: 'pager' },
        setIdx > 0 ? link(`#/practice/${id}/${setIdx - 1}`, '← Previous set', 'btn ghost small') : h('span'),
        setIdx + 1 < p.sets.length ? link(`#/practice/${id}/${setIdx + 1}`, 'Next set →', 'btn ghost small') : link('#/practice', 'All practice', 'btn ghost small')));
  }

  /* ---------- exams ---------- */
  function exams() {
    const E = C1.exams;
    view(h('h1', {}, 'The exams'), h('p', { class: 'lead', html: E.intro }),
      h('div', { class: 'callout warn', html: E.caution }),
      ...E.exams.map((ex) => h('div', {},
        h('h2', {}, ex.name), h('p', { html: ex.summary }),
        h('div', { class: 'tablewrap' }, h('table', {}, h('thead', {}, h('tr', {}, ex.cols.map((c) => h('th', {}, c)))),
          h('tbody', {}, ex.rows.map((r) => h('tr', {}, r.map((c) => h('td', { html: c }))))))),
        ex.notes ? h('div', { class: 'callout', html: ex.notes }) : null)),
      h('h2', {}, 'Which one should you take?'), h('div', { html: E.choose }),
      h('h2', {}, 'How this site maps to the exams'), h('div', { html: E.mapping }));
  }

  function notFound() { view(h('h1', {}, 'Not found'), link('#/', 'Back to home', 'btn')); }

  /* ---------- router ---------- */
  function route() {
    const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent);
    const [a, b, c] = parts;
    document.querySelectorAll('#nav a').forEach((el) => el.classList.toggle('active', el.dataset.r === (a === 'review' || a === 'vquiz' ? 'vocab' : a || 'home')));
    if (!a) return home();
    if (a === 'placement') return placement();
    if (a === 'progress') return progress();
    if (a === 'grammar') return b ? lesson(b) : grammarList();
    if (a === 'vocab') return b ? vocabGroup(b) : vocab();
    if (a === 'vquiz') return vocabQuiz(b);
    if (a === 'review') return review(b);
    if (a === 'practice') return b ? practiceType(b, c == null ? null : +c) : practiceList();
    if (a === 'exams') return exams();
    notFound();
  }
  window.addEventListener('hashchange', route);

  /* ---------- theme ---------- */
  const root = document.documentElement;
  if (Store.state.theme) root.dataset.theme = Store.state.theme;
  document.getElementById('theme').addEventListener('click', () => {
    const dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = dark ? 'light' : 'dark';
    Store.setTheme(root.dataset.theme);
  });

  route();
})();
