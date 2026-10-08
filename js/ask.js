/* C1 Path – the tutor: a small chat panel, available on every page, for questions about English and the exams.
   Uses the learner's own AI key (see js/ai.js). The conversation lives only in this page and is lost on reload. */
(function () {
  const { h } = Engine;
  const A = window.App;
  const EXAMPLES = ['What is the difference between "since" and "for"?', 'When do I use the third conditional?', 'How is Part 4 of Reading and Use of English marked?', 'Is "make a decision" or "take a decision" correct?'];
  let history = [], last = 0, opened = false;

  /* Pica, drawn with a few shapes so it stays sharp at any size. Moods: idle, think (looks up), happy (closed eye). */
  const PICA = (mood) => `<svg class="pica ${mood || 'idle'}" viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true" focusable="false">`
    + `<path class="tail" d="M10 46 L1 58 L18 52 Z" fill="currentColor"/>`
    + `<ellipse cx="30" cy="40" rx="20" ry="17" fill="currentColor"/>`
    + `<path d="M22 44 Q32 60 46 44 Q38 38 22 44 Z" fill="#fff"/>`
    + `<path class="wing" d="M14 38 Q26 28 40 40 Q26 50 14 38 Z" fill="#8db1ff" stroke="#0b3d91" stroke-width="1.5"/>`
    + `<circle cx="44" cy="22" r="13" fill="currentColor"/>`
    + `<path class="beak" d="M54 20 L63 24 L54 28 Z" fill="#d98e04"/>`
    + (mood === 'happy' ? `<path class="eye" d="M44 20 Q47 16 50 20" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>`
      : `<circle class="eye" cx="47" cy="${mood === 'think' ? 18 : 20}" r="3.2" fill="#fff"/><circle cx="48" cy="${mood === 'think' ? 17 : 20.5}" r="1.5" fill="#111"/>`)
    + `<path d="M38 11 Q42 6 47 9" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`;
  const pica = (mood, cls) => h('span', { class: 'picawrap ' + (cls || ''), html: PICA(mood) });

  /* **bold** and line breaks, built with DOM nodes so nothing from the model is ever inserted as HTML */
  const rich = (text) => h('div', {}, String(text).split(/\n{2,}/).map((para) => h('p', {}, para.split('\n').flatMap((line, i) =>
    (i ? [h('br')] : []).concat(line.split('**').map((bit, k) => (k % 2 ? h('strong', {}, bit) : bit)))))));

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
    h('p', { class: 'muted chatnote' }, 'English and the C1 exams only. Pica is an AI and can be wrong: check important points.'),
    log, msg, h('div', { class: 'chatbox' }, box, h('label', { class: 'chatpage', for: 'tutor-page' }, withPage, ' Show Pica what is on my screen'), h('div', { class: 'chatbtns' }, send, reset)));
  const fab = h('button', { id: 'tutor-btn', type: 'button', 'aria-expanded': 'false', 'aria-controls': 'tutor', title: 'Ask Pica, the tutor, a question about English' }, pica('idle', 'fabpica'), h('span', {}, 'Ask Pica'));

  function draw() {
    const keyless = !AI.configured();
    log.replaceChildren(...(history.length
      ? history.map((m) => h('div', { class: 'turn ' + m.role }, h('strong', {}, m.role === 'user' ? 'You' : 'Pica'), m.role === 'user' ? h('p', {}, m.text) : rich(m.text)))
      : [keyless ? h('div', { class: 'callout' }, 'Pica uses your own free AI key. ', h('a', { href: '#/account', onclick: () => toggle(false) }, 'Add one on your account page'), ' (Google Gemini and Groq both have free plans).') : null,
        h('div', { class: 'picahello' }, pica('happy', 'big'), h('p', {}, h('strong', {}, 'Hi, I am Pica.'), ' I collect shiny words, and I am happy to share them. Ask me about grammar, vocabulary, pronunciation or the C1 exams. For example:')),
        h('div', { class: 'chatex' }, EXAMPLES.map((q) => h('button', { class: 'btn small ghost', type: 'button', onclick: () => ask(q) }, q)))].filter(Boolean)));
    log.scrollTop = history.length ? log.scrollHeight : 0;
  }
  const onScreen = () => { const m = document.getElementById('app'); return m ? m.innerText.replace(/\s+/g, ' ').trim() : ''; };
  async function ask(text, screen) {
    text = String(text || box.value).trim();
    if (!text || send.disabled) return;
    if (Date.now() - last < 2000) { msg.textContent = 'One moment, then ask again.'; return; }
    last = Date.now();
    history.push({ role: 'user', text }); box.value = ''; msg.textContent = 'Pica is thinking…'; portrait.replaceChildren(pica('think')); send.disabled = true; draw();
    try { history.push({ role: 'tutor', text: await AI.chat(history, screen || (withPage.checked ? onScreen() : '')) }); msg.textContent = ''; }
    catch (e) { msg.textContent = e.message; }
    send.disabled = false; portrait.replaceChildren(pica(history.length && history[history.length - 1].role === 'tutor' ? 'happy' : 'idle')); draw();
  }
  function toggle(show) {
    opened = show == null ? !opened : !!show;
    panel.hidden = !opened; fab.setAttribute('aria-expanded', String(opened)); fab.classList.toggle('on', opened);
    if (opened) { draw(); box.focus(); } else if (document.activeElement && panel.contains(document.activeElement)) fab.focus();
  }
  send.addEventListener('click', () => ask());
  reset.addEventListener('click', () => { history = []; msg.textContent = ''; portrait.replaceChildren(pica('idle')); draw(); });
  close.addEventListener('click', () => toggle(false));
  fab.addEventListener('click', () => toggle());
  box.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); ask(); } });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && opened && !document.querySelector('dialog[open]')) toggle(false); });
  document.body.append(panel, fab);

  /* a wrong answer taken to Pica: the question, the learner's answer and the right one go with the question */
  function explain(x) {
    toggle(true);
    ask('Why is my answer wrong? Please explain.', 'Exercise question: ' + x.q + '\nMy answer: ' + (x.given || '(blank)') + '\nCorrect answer: ' + x.correct + (x.why ? '\nThe given explanation: ' + x.why : ''));
  }
  window.Tutor = { open: () => toggle(true), toggle, explain };
  /* #/ask keeps old links working: it opens the panel over the Study page */
  A.routes.ask = () => { location.replace('#/toolkit'); setTimeout(() => toggle(true), 50); };
})();
