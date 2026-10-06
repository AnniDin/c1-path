/* C1 Path – Tricks, AI-generated practice and the CertAcles-style paper. */
(function () {
  const { h, quiz } = Engine;
  const A = window.App;
  const { view, back, link, icon } = A;
  A.topicLabels.ai = 'AI-generated practice';

  /* ---------- tricks ---------- */
  A.routes.tricks = () => {
    const sections = C1.tricks;
    const nav = h('p', { class: 'row' }, sections.map((s) => h('a', { class: 'btn small ghost', href: '#tricks-' + s.id, onclick: (e) => { e.preventDefault(); document.getElementById('tricks-' + s.id).scrollIntoView({ behavior: 'smooth' }); } }, s.title)));
    view(back('#/toolkit', 'Library'), h('h1', {}, 'Tricks'),
      h('p', { class: 'lead' }, 'Short strategies for each part of the exam, and the traps Spanish speakers fall into. Each one says why it works, so you can adapt it instead of memorising it.'),
      nav,
      ...sections.map((s) => h('section', { id: 'tricks-' + s.id },
        h('h2', {}, s.title), h('p', { class: 'muted' }, s.blurb),
        s.items.map((x) => h('details', { class: 'trick' }, h('summary', {}, x.t),
          h('p', { html: x.tip }), h('p', { class: 'muted' }, h('strong', {}, 'Why it works: '), x.why),
          x.ex ? h('p', { class: 'trickex', html: x.ex }) : null)))),
      h('div', { class: 'callout' }, 'No trick replaces knowing the language. Use these to avoid losing marks you already deserve, and keep practising in the ', link('#/practice', 'exam tasks'), '.'));
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
    view(back('#/toolkit', 'Library'), h('h1', {}, 'Generate with AI'),
      h('p', { class: 'lead' }, 'Ask for a new set of exam-style tasks on any topic. It uses your own free API key, so nothing is stored on a server.'),
      AI.configured() ? null : h('div', { class: 'callout' }, 'You need a free key first: ', link('#/progress', 'add one in Review, under AI feedback'), ' (Google Gemini or Groq, a couple of minutes).'),
      h('h2', {}, '1 · Choose the task'), picks,
      h('h2', {}, '2 · Choose a topic'), topic,
      h('div', { class: 'row', style: 'margin:14px 0' }, go), status, out);
  };

  /* ---------- CertAcles-style paper ---------- */
  A.routes.certacles = () => {
    const row = (label, sub, href) => h('div', { class: 'step' }, h('span', { class: 'dot' }, '›'), h('div', {}, h('strong', {}, label), h('div', { class: 'muted' }, sub)), link(href, 'Open', 'btn small ghost'));
    view(back('#/mock', 'Full tests'), h('h1', {}, 'CertAcles-style paper'),
      h('p', { class: 'lead' }, 'Each university designs its own CertAcles exam, so there is no single official format. This guide puts the usual four components in a typical order, using the closest tasks on this site.'),
      h('div', { class: 'steps' },
        row('1 · Reading and use of language', 'Typically 60 to 90 minutes. Full Reading and Use of English test (gapped texts, rewriting, comprehension).', '#/mock/reading'),
        row('2 · Listening', 'Typically 30 to 45 minutes. Four recordings with questions.', '#/mock/listening'),
        row('3 · Writing', 'Typically 60 to 90 minutes. An essay plus a second text such as an email or report.', '#/mock/writing'),
        row('4 · Speaking', 'Typically 10 to 20 minutes, often with a partner. Interview, long turn and discussion.', '#/mock/speaking')),
      h('div', { class: 'callout' }, h('strong', {}, 'Times are approximate. '), 'Ask the language centre where you will sit it for its exam model and past papers, and adjust the timer in each test to match. See also ', link('#/exams', 'the exams explained'), '.'));
  };
})();
