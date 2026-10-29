/* C1 Path – the tutor: a small chat panel, available on every page, for questions about English and the exams.
   Uses the learner's own AI key (see js/ai.js). The conversation lives only in this page and is lost on reload. */
(function () {
  const { h } = Engine;
  const A = window.App;
  /* starter questions: a big pool, four shown each time Pica opens (one about the page you are on, the rest at random, never the same four twice in a row) */
  const POOL = [
    'What is the difference between "since" and "for"?', 'When do I use the third conditional?', 'Is "make a decision" or "take a decision" correct?',
    'How is Part 4 of Reading and Use of English marked?', 'When do I use "used to" and when "would"?', 'What is the difference between "affect" and "effect"?',
    'Why do we say "I wish I had" and not "I wish I have"?', 'How do I choose between the present perfect and the past simple?', 'When can I leave out "that" in a sentence?',
    'What does "it depends" mean as an answer, and when is it a good one?', 'How do I use "despite" and "although" correctly?', 'What is inversion and when is it used?',
    'How can I tell which preposition goes after an adjective?', 'What is the difference between "say" and "tell"?', 'When do I use "the" with general ideas?',
    'What does "break the ice" mean?', 'How do I use "whether" and "if"?', 'What is a cleft sentence?', 'How do I make my writing sound more formal?',
    'What is a good way to start an essay for the Writing paper?', 'How do I use linkers such as "however" and "nevertheless"?', 'What are the most common mistakes Spanish speakers make with articles?',
    'How should I prepare for Speaking Part 2?', 'What can I do if I forget a word while speaking?', 'How do I get better at listening to fast speech?',
    'How do I spot the answer in a gapped-text task?', 'What is the best way to learn phrasal verbs?', 'How can I remember collocations?',
    'What is the difference between "bored" and "boring"?', 'When do I use "who" and when "whom"?', 'How do I use the passive with "it is said that"?',
    'What is the difference between "lose" and "miss"?', 'How do I report a question in indirect speech?', 'When do I use the future perfect?',
    'What is the difference between "economic" and "economical"?', 'How do I use "as" and "like" correctly?', 'What does "I look forward to hearing from you" teach about "to"?',
    'How do I know whether a gap needs a prefix or a suffix?', 'How many words should I write in a key word transformation?', 'What is the difference between "rob" and "steal"?'
  ];
  const LASTKEY = 'c1path.starters';
  const pickStarters = () => {
    const keyless = !AI.configured() && window.PicaLocal;
    /* without an AI key Pica can only answer from the site, so offer only questions she can answer */
    const pool = keyless ? POOL.filter((q) => PicaLocal.search(q).length) : POOL.slice();
    let prev = []; try { prev = JSON.parse(sessionStorage.getItem(LASTKEY) || '[]'); } catch (e) { /* optional */ }
    const ctx = pageQuestion(), fresh = shuffle(pool.filter((q) => !prev.includes(q) && q !== ctx));
    const out = (ctx ? [ctx] : []).concat(fresh).slice(0, 4);
    try { sessionStorage.setItem(LASTKEY, JSON.stringify(out)); } catch (e) { /* optional */ }
    return out;
  };
  /* a question about where the learner is: the lesson, task, trick or theme on screen, or else the topic they find hardest */
  function pageQuestion() {
    const C1 = window.C1 || {}, parts = location.hash.replace(/^#\/?/, '').split('?')[0].split('/').filter(Boolean), [r, b] = parts;
    const title = (list, id) => { const x = (list || []).find((y) => y.id === id); return x && x.title; };
    let q = null;
    if (r === 'grammar' && b) { const t = title(C1.grammar, b); if (t) q = 'Explain "' + t + '" in simple words, with an example'; }
    else if (r === 'practice' && b) { const t = title(C1.practice, b); if (t) q = 'Give me a tip for ' + t.toLowerCase(); }
    else if (r === 'vocab' && b) { const t = title(C1.vocab, b); if (t) q = 'What is the idea behind "' + t + '"?'; }
    else if (r === 'saythis') q = 'Why do learners say these things, and why do they sound odd in English?';
    else if (r === 'mistakes') q = 'Why do I keep making the same mistakes, and how do I stop?';
    else if (r === 'skills' && ['writing', 'speaking', 'listening'].includes(b)) q = 'How do I get better at ' + b + ' for the C1 exam?';
    if (!q && window.App && App.weakTopics) {
      const w = App.weakTopics()[0], g = w && w[0].startsWith('g-') && (C1.grammar || []).find((x) => x.id === w[0].slice(2));
      if (g) q = 'Why is "' + g.title + '" so hard for me? Help me understand it';
    }
    return q && q.length < 120 ? q : null;
  }
  const shuffle = (arr) => arr.slice().sort(() => Math.random() - 0.5);
  let chips = [];
  let history = [], last = 0, opened = false;

  /* Pica, drawn with a few shapes so it stays sharp at any size. Moods: idle, think (looks up), happy (closed eye). */
  const PICA = (mood) => `<svg class="pica ${mood || 'idle'}" viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true" focusable="false">`
    + `<path class="tail" d="M10 46 L1 58 L18 52 Z" fill="currentColor"/>`
    + `<ellipse cx="30" cy="40" rx="20" ry="17" fill="currentColor"/>`
    + `<path class="belly" d="M22 44 Q32 60 46 44 Q38 38 22 44 Z" fill="#fff"/>`
    + `<path class="wing" d="M14 38 Q26 28 40 40 Q26 50 14 38 Z" fill="#8db1ff" stroke="#0b3d91" stroke-width="1.5"/>`
    + `<circle cx="44" cy="22" r="13" fill="currentColor"/>`
    + `<path class="beak" d="M54 20 L63 24 L54 28 Z" fill="#d98e04"/>`
    + (mood === 'sad' ? `<circle class="eye" cx="47" cy="21" r="3.2" fill="#fff"/><circle cx="47.5" cy="22.4" r="1.5" fill="#111"/><path d="M41 15 L51 18.5" stroke="#fff" stroke-width="2" stroke-linecap="round"/><path d="M49.6 25 q-2.6 4 0 5.6 q2.6 -1.6 0 -5.6Z" fill="#8db1ff" stroke="#0b3d91" stroke-width=".6"/>`
      : mood === 'happy' ? `<path class="eye" d="M44 20 Q47 16 50 20" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>`
      : `<circle class="eye" cx="47" cy="${mood === 'think' ? 18 : 20}" r="3.2" fill="#fff"/><circle cx="48" cy="${mood === 'think' ? 17 : 20.5}" r="1.5" fill="#111"/>`)
    + `<path d="M38 11 Q42 6 47 9" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`;
  /* Pica is the logo: a small one beside the site name in the header (the name alone is still there without JavaScript) */
  const brand = document.querySelector('.brand');
  if (brand) brand.prepend(h('span', { class: 'brandpica', 'aria-hidden': 'true', html: PICA('idle') }));
  const pica = (mood, cls) => h('span', { class: 'picawrap ' + (cls || ''), html: PICA(mood) });

  /* **bold** and line breaks, built with DOM nodes so nothing from the model is ever inserted as HTML */
  /* [label](link to a page of this site) becomes a link, for pages of this site only (a model can never send the reader elsewhere) */
  const bold = (s) => s.split('**').map((bit, k) => (k % 2 ? h('strong', {}, bit) : bit));
  const inline = (line) => line.split(/(\[[^\]]+\]\(#\/[^)\s]*\))/).flatMap((seg) => {
    const m = /^\[([^\]]+)\]\((#\/[^)\s]*)\)$/.exec(seg);
    return m ? [h('a', { href: m[2], onclick: () => toggle(false) }, m[1])] : bold(seg);
  });
  const rich = (text) => h('div', {}, String(text).split(/\n{2,}/).map((para) => h('p', {}, para.split('\n').flatMap((line, i) => (i ? [h('br')] : []).concat(inline(line))))));

  const log = h('div', { class: 'chatlog', role: 'log', 'aria-live': 'polite', 'aria-label': 'Conversation with the tutor' });
  const msg = h('p', { class: 'muted chatmsg', role: 'status' });
  const portrait = h('span', { class: 'picahead' }, pica('idle'));
  const box = h('textarea', { rows: 2, maxlength: 600, placeholder: 'Ask about English or the exam…', 'aria-label': 'Your question' });
  const send = h('button', { class: 'btn small', type: 'button' }, 'Ask');
  const withPage = h('input', { type: 'checkbox', id: 'tutor-page' });
  const reset = h('button', { class: 'btn small ghost', type: 'button', title: 'Clear the conversation' }, 'Clear');
  const close = h('button', { class: 'icon-btn', type: 'button', 'aria-label': 'Close the tutor' }, '✕');
  const panel = h('section', { id: 'tutor', role: 'dialog', 'aria-label': 'Tutor', hidden: true },
    h('header', {}, portrait, h('div', { class: 'picatitle' }, h('strong', {}, 'Pica'), h('span', { class: 'muted' }, 'your C1 tutor')), close),
    h('p', { class: 'muted chatnote' }, 'English and the C1 exams only. With an AI key Pica can be wrong, so check important points; without one she only quotes this site.'),
    log, msg, h('div', { class: 'chatbox' }, box, h('label', { class: 'chatpage', for: 'tutor-page' }, withPage, ' Show Pica what is on my screen'), h('div', { class: 'chatbtns' }, send, reset)));
  const fab = h('button', { id: 'tutor-btn', type: 'button', 'aria-expanded': 'false', 'aria-controls': 'tutor', title: 'Ask Pica, the tutor, a question about English' }, pica('idle', 'fabpica'), h('span', {}, 'Ask Pica'));

  function draw() {
    const keyless = !AI.configured();
    log.replaceChildren(...(history.length
      ? history.map((m) => h('div', { class: 'turn ' + m.role }, h('strong', {}, m.role === 'user' ? 'You' : 'Pica'), m.role === 'user' ? h('p', {}, m.text) : rich(m.text)))
      : [keyless ? h('div', { class: 'callout' }, 'Without an AI key, Pica answers from the lessons, tricks and vocabulary on this site. For any question, ', h('a', { href: '#/account', onclick: () => toggle(false) }, 'add a free key on your account page'), ' (Google Gemini and Groq both have free plans).') : null,
        h('div', { class: 'picahello' }, pica('happy', 'big'), h('p', {}, h('strong', {}, 'Hi, I am Pica.'), ' I collect shiny words, and I am happy to share them. Ask me about grammar, vocabulary, pronunciation or the C1 exams. For example:')),
        h('div', { class: 'chatex' }, (chips.length ? chips : (chips = pickStarters())).map((q) => h('button', { class: 'btn small ghost', type: 'button', onclick: () => ask(q) }, q)))].filter(Boolean)));
    log.scrollTop = history.length ? log.scrollHeight : 0;
  }
  const onScreen = () => { const m = document.getElementById('app'); return m ? m.innerText.replace(/\s+/g, ' ').trim() : ''; };
  async function ask(text, screen) {
    text = String(text || box.value).trim();
    if (!text) return;
    if (send.disabled) { msg.textContent = 'Pica is still answering the last question. One moment.'; return; }
    if (Date.now() - last < 800) { msg.textContent = 'One moment, then ask again.'; return; }
    last = Date.now();
    history.push({ role: 'user', text }); box.value = '';
    const shown = screen || (withPage.checked ? onScreen() : '');
    await run(shown);
  }
  /* answers the last question; if it still fails after the automatic tries, the question stays and "Try again" asks it once more */
  async function run(screen) {
    /* no AI key: Pica answers from the lessons, tricks and vocabulary of the site, on this device */
    if (!AI.configured() && window.PicaLocal) {
      const last = history[history.length - 1];
      history.push({ role: 'tutor', text: /^Exercise question:/.test(screen || '') ? PicaLocal.explain(screen) : PicaLocal.answer(last ? last.text : '') });
      msg.textContent = ''; portrait.replaceChildren(pica('happy')); draw(); return;
    }
    msg.textContent = 'Pica is thinking…'; portrait.replaceChildren(pica('think')); send.disabled = true; draw();
    AI.onRetry = (n, total, other) => { msg.textContent = other ? `Pica could not reach the AI. Trying ${other} instead…` : `Pica could not reach the AI. Trying again (${n} of ${total})…`; };
    try { history.push({ role: 'tutor', text: await AI.chat(history, screen) }); msg.textContent = ''; }
    catch (e) {
      /* after the automatic tries: try again, or take an answer from the lessons of the site (no AI needed) */
      const local = () => { const last = history[history.length - 1]; history.push({ role: 'tutor', text: /^Exercise question:/.test(screen || '') && window.PicaLocal ? PicaLocal.explain(screen) : PicaLocal.answer(last ? last.text : '') }); msg.textContent = ''; draw(); };
      msg.replaceChildren(...[e.message + ' ', AI.configured() ? h('button', { class: 'btn small', type: 'button', onclick: () => run(screen) }, 'Try again') : null, window.PicaLocal ? h('button', { class: 'btn small ghost', type: 'button', onclick: local }, 'Answer from the lessons') : null].filter(Boolean));
    }
    AI.onRetry = null;
    send.disabled = false; portrait.replaceChildren(pica(history.length && history[history.length - 1].role === 'tutor' ? 'happy' : 'idle')); draw();
  }
  function toggle(show) {
    opened = show == null ? !opened : !!show;
    panel.hidden = !opened; fab.setAttribute('aria-expanded', String(opened)); fab.classList.toggle('on', opened);
    if (opened) { if (!history.length) chips = []; draw(); box.focus(); } else if (document.activeElement && panel.contains(document.activeElement)) fab.focus();
  }
  send.addEventListener('click', () => ask());
  reset.addEventListener('click', () => { history = []; chips = []; msg.textContent = ''; portrait.replaceChildren(pica('idle')); draw(); });
  close.addEventListener('click', () => toggle(false));
  fab.addEventListener('click', () => toggle());
  box.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); ask(); } });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && opened && !document.querySelector('dialog[open]')) toggle(false); });
  document.body.append(panel, fab);

  /* a wrong answer taken to Pica: the question, the learner's answer and the right one go with the question */
  function explain(x) {
    toggle(true);
    ask('Why is my answer wrong? (' + String(x.q).slice(0, 80) + ')','Exercise question: ' + x.q + '\nMy answer: ' + (x.given || '(blank)') + '\nCorrect answer: ' + x.correct + (x.why ? '\nThe given explanation: ' + x.why : ''));
  }
  /* Pica speaks up: a bubble above her button with a few words and optional buttons ([[label, href or function]...]). It stays until closed or 25 s pass. */
  let notice = null, noticeTimer = 0;
  function say(text, actions) {
    if (notice) notice.remove();
    clearTimeout(noticeTimer);
    const dismiss = () => { if (notice) { notice.remove(); notice = null; } clearTimeout(noticeTimer); };
    const close = h('button', { class: 'icon-btn', type: 'button', 'aria-label': 'Dismiss' }, '✕');
    notice = h('div', { id: 'pica-notice', role: 'status' }, h('span', { class: 'picaface', 'aria-hidden': 'true', html: PICA('happy') }),
      h('div', { class: 'picasay' }, h('p', {}, h('strong', {}, 'Pica: '), text),
        h('div', { class: 'row' }, (actions || []).map(([label, go]) => (typeof go === 'function'
          ? h('button', { class: 'btn small', type: 'button', onclick: () => { go(); dismiss(); } }, label)
          : h('a', { class: 'btn small', href: go, onclick: dismiss }, label))))), close);
    close.addEventListener('click', dismiss);
    document.body.append(notice);
    noticeTimer = setTimeout(dismiss, 25000);
  }
  window.PicaSay = say;
  window.PicaSVG = PICA; // the welcome pages draw her too
  window.Tutor = { open: () => toggle(true), toggle, explain, starters: pickStarters };
  /* #/ask keeps old links working: it opens the panel over the Study page */
  A.routes.ask = () => { location.replace('#/toolkit'); setTimeout(() => toggle(true), 50); };
})();
