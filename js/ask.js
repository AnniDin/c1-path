/* C1 Path – the tutor: a small chat panel, available on every page, for questions about English and the exams.
   Uses the learner's own AI key (see js/ai.js). The conversation lives only in this page and is lost on reload. */
(function () {
  const { h } = Engine;
  const A = window.App;
  const EXAMPLES = ['What is the difference between "since" and "for"?', 'When do I use the third conditional?', 'How is Part 4 of Reading and Use of English marked?', 'Is "make a decision" or "take a decision" correct?'];
  let history = [], last = 0, opened = false;

  /* **bold** and line breaks, built with DOM nodes so nothing from the model is ever inserted as HTML */
  const rich = (text) => h('div', {}, String(text).split(/\n{2,}/).map((para) => h('p', {}, para.split('\n').flatMap((line, i) =>
    (i ? [h('br')] : []).concat(line.split('**').map((bit, k) => (k % 2 ? h('strong', {}, bit) : bit)))))));

  const log = h('div', { class: 'chatlog', role: 'log', 'aria-live': 'polite', 'aria-label': 'Conversation with the tutor' });
  const msg = h('p', { class: 'muted chatmsg', role: 'status' });
  const box = h('textarea', { rows: 2, maxlength: 600, placeholder: 'Ask about English or the exam…', 'aria-label': 'Your question' });
  const send = h('button', { class: 'btn small', type: 'button' }, 'Ask');
  const reset = h('button', { class: 'btn small ghost', type: 'button', title: 'Clear the conversation' }, 'Clear');
  const close = h('button', { class: 'icon-btn', type: 'button', 'aria-label': 'Close the tutor' }, '✕');
  const panel = h('section', { id: 'tutor', role: 'dialog', 'aria-label': 'Tutor', hidden: true },
    h('header', {}, h('strong', {}, 'Ask the tutor'), close),
    h('p', { class: 'muted chatnote' }, 'English and the C1 exams only. AI can be wrong; check important points.'),
    log, msg, h('div', { class: 'chatbox' }, box, h('div', { class: 'chatbtns' }, send, reset)));
  const fab = h('button', { id: 'tutor-btn', type: 'button', 'aria-expanded': 'false', 'aria-controls': 'tutor', title: 'Ask the tutor a question about English' }, 'Ask');

  function draw() {
    const keyless = !AI.configured();
    log.replaceChildren(...(history.length
      ? history.map((m) => h('div', { class: 'turn ' + m.role }, h('strong', {}, m.role === 'user' ? 'You' : 'Tutor'), m.role === 'user' ? h('p', {}, m.text) : rich(m.text)))
      : [keyless ? h('div', { class: 'callout' }, 'The tutor uses your own free AI key. ', h('a', { href: '#/account', onclick: () => toggle(false) }, 'Add one on your account page'), ' (Google Gemini and Groq both have free plans).') : null,
        h('p', { class: 'muted' }, 'Ask a question about English or the C1 exams. For example:'),
        h('div', { class: 'chatex' }, EXAMPLES.map((q) => h('button', { class: 'btn small ghost', type: 'button', onclick: () => ask(q) }, q)))].filter(Boolean)));
    log.scrollTop = log.scrollHeight;
  }
  async function ask(text) {
    text = String(text || box.value).trim();
    if (!text || send.disabled) return;
    if (Date.now() - last < 2000) { msg.textContent = 'One moment, then ask again.'; return; }
    last = Date.now();
    history.push({ role: 'user', text }); box.value = ''; msg.textContent = 'The tutor is thinking…'; send.disabled = true; draw();
    try { history.push({ role: 'tutor', text: await AI.chat(history) }); msg.textContent = ''; }
    catch (e) { msg.textContent = e.message; }
    send.disabled = false; draw();
  }
  function toggle(show) {
    opened = show == null ? !opened : !!show;
    panel.hidden = !opened; fab.setAttribute('aria-expanded', String(opened)); fab.classList.toggle('on', opened);
    if (opened) { draw(); box.focus(); } else if (document.activeElement && panel.contains(document.activeElement)) fab.focus();
  }
  send.addEventListener('click', () => ask());
  reset.addEventListener('click', () => { history = []; msg.textContent = ''; draw(); });
  close.addEventListener('click', () => toggle(false));
  fab.addEventListener('click', () => toggle());
  box.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); ask(); } });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && opened && !document.querySelector('dialog[open]')) toggle(false); });
  document.body.append(panel, fab);

  window.Tutor = { open: () => toggle(true), toggle };
  /* #/ask keeps old links working: it opens the panel over the Study page */
  A.routes.ask = () => { location.replace('#/toolkit'); setTimeout(() => toggle(true), 50); };
})();
