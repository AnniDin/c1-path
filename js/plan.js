/* C1 Path – exam countdown and study plan, weak-spot training, full-test history, offline use and install. */
(function () {
  const { h, quiz, gapItem } = Engine;
  const A = window.App;
  const { view, back, link, bar, cardBlock } = A;
  const DAY = 864e5;
  const midnight = () => new Date(Store.today() + 'T00:00:00');
  const daysTo = (d) => Math.round((new Date(d + 'T00:00:00') - midnight()) / DAY);
  const fmt = (d) => new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const barCls = (a) => (a >= 0.8 ? 'ok' : a >= 0.6 ? 'warn' : 'bad');
  A.topicLabels.weak = 'Weak spots';
  const TRAINABLE = (k) => /^g-/.test(k) || (/^u-/.test(k) && !['u-reading', 'u-cross', 'u-matching'].includes(k)); // topics #/weak can build questions for
  const weakTopics = () => Object.entries(Store.state.stats).filter(([k, s]) => TRAINABLE(k) && s.t >= 5).map(([k, s]) => [k, s.c / s.t]).filter(([, a]) => a < 0.75).sort((a, b) => a[1] - b[1]).slice(0, 3);

  A.weakTopics = weakTopics;

  /* ---------- exam countdown (Home) and plan page ---------- */
  const examDays = () => { const ex = Store.state.exam; return ex && ex.date ? daysTo(ex.date) : null; };
  /* Home: the countdown only when a date is set; otherwise a quiet prompt inside "More". */
  A.planBanner = () => {
    const n = examDays();
    if (n == null || n < 0) return null;
    return h('section', {}, h('div', { class: 'pathrow' }, h('div', {}, h('strong', {}, n === 0 ? 'Your exam is today' : `${n} day${n === 1 ? '' : 's'} to your exam`), h('div', { class: 'muted' }, fmt(Store.state.exam.date))), link('#/plan', 'See my plan', 'btn small ghost')));
  };
  A.planPrompt = () => { const n = examDays(); return n != null && n >= 0 ? null : h('section', {}, h('h2', {}, 'Exam plan'), h('div', { class: 'pathrow' }, h('div', {}, h('strong', {}, 'Have an exam date?'), h('div', { class: 'muted' }, 'Set it and get a weekly study plan.')), link('#/plan', 'Set the date', 'btn small ghost'))); };

  A.routes.plan = () => {
    const ex = Store.state.exam, date = ex && ex.date, n = date ? daysTo(date) : null;
    const input = h('input', { type: 'date', value: date || '', min: Store.today(), 'aria-label': 'Exam date' });
    const row = h('div', { class: 'row' }, input,
      h('button', { class: 'btn small', onclick: () => { if (input.value) { Store.setExam(input.value); A.route(); } } }, 'Save'),
      date ? h('button', { class: 'btn small ghost', onclick: () => { Store.setExam(''); A.route(); } }, 'Remove') : null);
    let body = [h('p', { class: 'muted' }, 'Choose the date of your exam to see a plan based on what you still have to do.')];
    if (n != null && n < 0) body = [h('div', { class: 'callout' }, 'That date has passed. Set a new one if you are taking the exam again.')];
    if (n != null && n >= 0) {
      const weeks = Math.max(1, Math.ceil(n / 7)), s = A.stepsLeft(), left = s.total - s.done;
      const learn = weeks > 3 ? weeks - 2 : weeks, perWeek = Math.ceil(left / learn), mins = Math.min(90, Math.max(15, Math.round((perWeek * 18) / 6 / 5) * 5));
      const weak = weakTopics();
      body = [
        left === 0 ? h('div', { class: 'callout' }, `${n} day${n === 1 ? '' : 's'} left, and every course step is done. Spend the time on full timed tests, your weak spots and the cards due each day.`) : null,
        left === 0 ? null : h('div', { class: 'stats' },
          h('div', { class: 'stat' }, h('b', {}, n), h('span', {}, n === 1 ? 'day left' : 'days left')),
          h('div', { class: 'stat' }, h('b', {}, left), h('span', {}, 'course steps to go')),
          h('div', { class: 'stat' }, h('b', {}, perWeek), h('span', {}, 'steps a week to finish'))),
        perWeek > 14 ? h('div', { class: 'callout bad' }, 'That pace is very high. Focus on Use of English, Listening and Writing, and on your weak spots, rather than the whole course.') : null,
        h('h2', {}, weeks > 3 ? `Now until ${fmt((() => { const x = new Date(date + 'T00:00:00'); x.setDate(x.getDate() - 14); return x.toLocaleDateString('sv'); })())}: learn` : 'Until the exam: learn and practise'),
        left === 0 ? null : h('p', {}, `Aim for about ${perWeek} course step${perWeek === 1 ? '' : 's'} a week, around ${mins} minutes a day on six days. Keep one day for rest.`),
        h('div', { class: 'steps' }, [['Mon', 'Grammar lesson or Use of English set', '#/course'], ['Tue', 'Vocabulary and flashcards', '#/review'], ['Wed', 'Listening set and dictation', '#/skills/listening'],
          ['Thu', 'Writing task: plan, write, analyse', '#/skills/writing'], ['Fri', 'Speaking set and mistakes review', '#/skills/speaking'], ['Sat', 'One full test paper, timed', '#/mock'], ['Sun', 'Rest, or ten minutes of cards', '#/review']].map(([d, t, href]) =>
          h('div', { class: 'step' }, h('span', { class: 'dot' }, d), h('div', {}, h('strong', {}, t)), link(href, 'Open', 'btn small ghost')))),
        weeks > 3 ? h('div', {}, h('h2', {}, 'The last two weeks: exam rehearsal'),
          h('ul', {}, h('li', {}, 'Week 1: Reading and Use of English and Listening full tests, under time. Review every mistake.'), h('li', {}, 'Week 2: Writing and Speaking full tests, plus your weak spots.'), h('li', {}, 'The last two days: light review only. Sleep matters more than one more set.')),
          link('#/mock', 'Open the full tests', 'btn')) : null,
        weak.length ? h('div', {}, h('h2', {}, 'Your weak spots'), weak.map(([k, a]) => h('div', { class: 'trow' }, link(A.topicHref ? A.topicHref(k) : '#/', A.topicLabels[k] || k), bar(a, barCls(a)), h('span', {}, Math.round(a * 100) + '%'))), link('#/weak', 'Train them now', 'btn small')) : null
      ];
    }
    view(back('#/mock', 'Exams'), h('h1', {}, 'Exam plan'), h('p', { class: 'lead' }, 'Tell the site when your exam is and it will spread what is left over the weeks you have.'),
      cardBlock('Exam date', row), ...body.filter(Boolean));
  };

  /* ---------- weak spots: questions only from the topics you get wrong most ---------- */
  A.routes.weak = () => {
    const pool = (k) => {
      if (k.startsWith('g-')) { const g = A.grammar.find((x) => 'g-' + x.id === k); return g ? g.quiz : []; }
      const p = k.startsWith('u-') && C1.practice.find((x) => 'u-' + x.id === k);
      if (!p || ['reading', 'cross', 'matching'].includes(p.id)) return [];
      return p.sets.flatMap((s) => s.items.flatMap((it) => (it.type === 'passage' ? it.gaps.map((_, i) => gapItem(it, i)) : [it]))).filter((q) => ['mcq', 'gap', 'kwt'].includes(q.type));
    };
    const topics = weakTopics().filter(([k]) => pool(k).length);
    if (!topics.length) return view(back('#/progress', 'Review'), h('h1', {}, 'Weak spots'), h('p', { class: 'lead' }, 'Nothing is below 75% yet. Weak spots appear here once you have answered at least five questions on a topic and scored under 75%.'), link('#/course/mix', 'Do a mixed review', 'btn'));
    const items = topics.flatMap(([k]) => A.shuffle(pool(k)).slice(0, 4).map((q) => Object.assign({}, q, { _topic: k })));
    view(back('#/progress', 'Review'), h('h1', {}, 'Weak spots'),
      h('p', { class: 'lead' }, 'Questions only from the topics you get wrong most: ' + topics.map(([k, a]) => `${A.topicLabels[k] || k} (${Math.round(a * 100)}%)`).join(', ') + '.'),
      quiz(items, {
        source: { topic: 'weak', label: 'Weak spots', href: '#/weak' }, onRetry: A.routes.weak,
        onScore: (c, t, res) => { const by = {}; res.forEach((r) => { const k = r.item && r.item._topic; if (k) { const o = by[k] || (by[k] = [0, 0]); o[1]++; if (r.ok) o[0]++; } }); Object.entries(by).forEach(([k, [cc, tt]]) => Store.record(k, cc, tt)); }
      }));
  };

  /* ---------- this week against last week (Review) ---------- */
  A.weekCard = () => {
    const sum = (from, to) => { let t = 0, d = 0; for (let i = from; i < to; i++) { const dd = midnight(); dd.setDate(dd.getDate() - i); const x = dd.toLocaleDateString('sv'), n = Store.state.days[x] || 0; t += n; if (n > 0) d++; } return [t, d]; };
    const [a, da] = sum(0, 7), [b] = sum(7, 14);
    if (!a && !b) return null;
    const diff = a - b, msg = !b ? 'Your first full week of data. Keep going.' : diff > 0 ? `${diff} more answers than last week.` : diff < 0 ? `${-diff} fewer answers than last week. A short daily session beats a long one on Sunday.` : 'The same as last week.';
    return cardBlock('Your last 7 days', h('div', { class: 'stats' }, h('div', { class: 'stat' }, h('b', {}, a), h('span', {}, 'answers')), h('div', { class: 'stat' }, h('b', {}, da + '/7'), h('span', {}, 'days practised')), h('div', { class: 'stat' }, h('b', {}, b), h('span', {}, 'the week before'))), h('p', { class: 'muted' }, msg));
  };

  /* ---------- full-test history (Review) ---------- */
  A.historyCard = () => {
    const m = (Store.state.mocks || []).slice(-8).reverse();
    if (!m.length) return null;
    return cardBlock('Full test history', ...m.map((x) => h('div', { class: 'trow' }, h('span', {}, new Date(x.ts).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) + ' · ' + x.kind),
      bar(x.c / x.t, barCls(x.c / x.t)), h('span', {}, `${x.c}/${x.t}`))), h('p', { class: 'muted' }, 'Scores of the Reading and Use of English full test, newest first. Watch the trend, not a single score.'));
  };

  /* ---------- offline audio and install (Review) ---------- */
  let installEvent = null;
  window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); installEvent = e; });
  const audioFiles = () => Object.values(((window.C1 || {}).audio || {}).listening || {}).map((a) => new URL(a.src, location.href).href)
    .concat(((window.C1 || {}).vocabAudio || []).map((s) => new URL('audio/vocab/' + s + '.mp3', location.href).href));
  A.offlineCard = () => {
    const files = audioFiles(), status = h('p', { class: 'muted', role: 'status' }), canCache = 'caches' in window && files.length;
    const btn = h('button', { class: 'btn small', onclick: async () => {
      btn.disabled = true; let n = 0;
      try {
        const c = await caches.open('c1path-audio');
        for (const u of files) { if (!(await c.match(u))) { const r = await fetch(u); if (r.ok) await c.put(u, r); } status.textContent = `Downloading… ${++n}/${files.length}`; }
        status.textContent = 'Done: the recordings now play without a connection.';
      } catch (e) { status.textContent = 'The download stopped. Check your connection and try again.'; btn.disabled = false; }
    } }, `Download the ${files.length} recordings (about 22 MB)`);
    if (canCache) caches.open('c1path-audio').then((c) => Promise.all(files.map((u) => c.match(u)))).then((r) => { if (r.every(Boolean)) { status.textContent = 'All recordings are saved on this device.'; btn.textContent = 'Saved'; btn.disabled = true; } });
    const install = installEvent ? h('button', { class: 'btn small ghost', onclick: () => { installEvent.prompt(); installEvent = null; } }, 'Add to home screen') : null;
    return cardBlock('Use it offline', h('p', { class: 'muted' }, 'This page keeps its lessons and exercises in your browser, so they work offline after your first visit. The recorded listenings are large (about 6.5 MB), so they are saved only if you ask.'),
      h('div', { class: 'row' }, canCache ? btn : null, install), status,
      install ? null : h('p', { class: 'muted' }, 'To keep a shortcut on your phone or desktop, use "Add to Home Screen" or "Install" in your browser menu. It is still this website: nothing extra is installed.'));
  };

  /* ---------- Home stays up to date while it is open ---------- */
  const onHome = () => ['', '#/'].includes(location.hash);
  let t, day = Store.today();
  const refresh = () => { if (onHome() && !document.querySelector('#app :focus')) { const y = window.scrollY; A.route(); window.scrollTo(0, y); } };
  Store.onChange(() => { clearTimeout(t); t = setTimeout(refresh, 500); });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) refresh(); });
  setInterval(() => { if (Store.today() !== day) { day = Store.today(); refresh(); } }, 60000);
})();
