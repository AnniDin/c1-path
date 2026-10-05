/* C1 Path – mistakes log, notes drawer and the Skills section (listening, writing, speaking). */
(function () {
  const { h, quiz, Speech } = Engine;
  const A = window.App;
  const { view, back, link, bar, cardBlock, sectionHead, notFound, sample } = A;
  const pct = (x) => Math.round(x * 100);
  const strip = (html) => String(html).replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ');
  A.topicLabels.listen = 'Listening';
  A.topicLabels.dictation = 'Dictation';
  A.topicLabels.retry = 'Mistake practice';

  function toast(msg) {
    const t = h('div', { class: 'toast', role: 'status' }, msg);
    document.body.append(t);
    setTimeout(() => t.classList.add('show'), 10);
    setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 2200);
  }
  const fmtDate = (ts) => new Date(ts).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  /* =====================================================================
     AI FEEDBACK (optional, learner's own API key)
     ===================================================================== */
  const SCORE_LABELS = { content: 'Content', communicative: 'Communicative achievement', organisation: 'Organisation', language: 'Language', grammar_vocabulary: 'Grammar and vocabulary', discourse: 'Discourse management', interaction: 'Interaction' };
  function aiCard() {
    const box = h('div');
    function draw() {
      const p = AI.provider(), id = AI.providerId();
      const provider = h('select', { 'aria-label': 'AI provider', onchange: (e) => { AI.setProvider(e.target.value); draw(); } },
        Object.entries(AI.PROVIDERS).map(([k, v]) => h('option', { value: k, selected: k === id }, v.name)));
      const key = h('input', { type: 'password', class: 'wide', placeholder: p.keyHint, autocomplete: 'off', 'aria-label': p.name + ' API key' });
      const known = p.models.some(([v]) => v === AI.model());
      const model = h('select', { 'aria-label': 'Model', onchange: (e) => { AI.setModel(e.target.value); other.value = ''; } }, p.models.map(([v, t]) => h('option', { value: v, selected: v === AI.model() }, t)));
      const other = h('input', { type: 'text', placeholder: 'Other model name (optional)', 'aria-label': 'Other model name', value: known ? '' : AI.model(), onchange: (e) => { if (e.target.value.trim()) AI.setModel(e.target.value); else AI.setModel(model.value); } });
      const status = h('p', { class: 'muted' }, AI.configured() ? `A key ending ${AI.keyHint()} is saved in this browser.` : 'No key saved. The site works fully without one.');
      const show = (t, bad) => { status.textContent = t; status.className = bad ? 'a-warn' : 'muted'; };
      box.replaceChildren(
        h('p', { class: 'muted' }, 'Writing, Speaking and mistake explanations can get examiner-style feedback from an AI model. It uses your own key, so the site never sees it. Google Gemini and Groq have free plans; Anthropic Claude is paid and usually gives the most detailed feedback.'),
        h('div', { class: 'row' }, provider),
        h('p', {}, p.free ? 'Free: ' : 'Paid: ', h('a', { href: p.keyUrl, target: '_blank', rel: 'noopener' }, 'get a key at ' + p.keyUrl.replace('https://', '')),
          h('span', { class: 'muted' }, p.free ? ' (sign in, press "Create API key", copy it). Free plans have daily limits and may use your text to improve their models; keep personal details out of what you send.' : ' (add credit and set a low monthly spend limit).')),
        h('div', { class: 'callout warn' }, h('strong', {}, 'Privacy. '), `The key is stored only in this browser and sent only to ${p.host}. Only the text you ask feedback on is sent. Do not save a key on a shared computer, and remove it if you stop using it.`),
        key, h('div', { class: 'row', style: 'margin:8px 0' }, model, other),
        h('div', { class: 'row' },
          h('button', { class: 'btn small', onclick: () => { if (!key.value.trim()) return show('Paste a key first.', true); AI.setKey(key.value); key.value = ''; show(`Saved (ending ${AI.keyHint()}). Press Test to check it.`); } }, 'Save key'),
          h('button', { class: 'btn small ghost', onclick: async () => { show('Testing…'); try { await AI.test(); show('The key works.'); } catch (e) { show(e.message, true); } } }, 'Test'),
          h('button', { class: 'btn small ghost', onclick: () => { AI.setKey(''); draw(); } }, 'Remove key')),
        status);
    }
    draw();
    return cardBlock('AI feedback (optional)', box);
  }
  A.aiCard = aiCard;

  function feedbackPanel(d, title) {
    const li = (arr) => h('ul', {}, (arr || []).map((x) => h('li', {}, String(x))));
    const box = h('div', { class: 'card aifb' }, h('h3', { style: 'margin-top:0' }, title || 'AI feedback'),
      h('p', { class: 'muted' }, 'A second opinion from an AI model, not an official mark. Check anything that surprises you.'));
    if (d.level) box.append(h('p', {}, h('strong', {}, 'Estimated level: '), String(d.level)));
    Object.entries(d.scores || {}).forEach(([k, v]) => { const n = Math.max(0, Math.min(5, +v || 0)); box.append(h('div', { class: 'trow' }, h('span', {}, SCORE_LABELS[k] || k), bar(n / 5, n >= 4 ? 'ok' : n >= 3 ? 'warn' : 'bad'), h('span', {}, n + '/5'))); });
    if (d.summary) box.append(h('p', {}, String(d.summary)));
    if ((d.strengths || []).length) box.append(h('h3', {}, 'Strengths'), li(d.strengths));
    if ((d.corrections || []).length) box.append(h('h3', {}, 'Corrections'), h('div', { class: 'tablewrap' }, h('table', {}, h('thead', {}, h('tr', {}, ['You wrote', 'Better', 'Why'].map((t) => h('th', {}, t)))),
      h('tbody', {}, d.corrections.map((c) => h('tr', {}, h('td', {}, String(c.original || '')), h('td', {}, String(c.better || '')), h('td', {}, String(c.why || ''))))))));
    if ((d.improvements || []).length) box.append(h('h3', {}, 'Next steps'), li(d.improvements));
    if (d.upgrade) box.append(h('h3', {}, 'A stronger version'), h('p', { class: 'notetext' }, String(d.upgrade)));
    box.append(h('button', { class: 'btn small ghost', onclick: () => { Store.addNote({ title: (title || 'AI feedback') + ' ' + fmtDate(Date.now()), tag: 'Writing', text: [d.summary, '', 'Corrections:', ...(d.corrections || []).map((c) => `- ${c.original} → ${c.better} (${c.why})`), '', 'Next steps:', ...(d.improvements || []).map((x) => '- ' + x)].join('\n') }); toast('Saved to notes'); } }, 'Save to notes'));
    return box;
  }
  /* A button that runs `job()` (returns feedback data) and shows the result in `target`. */
  function aiButton(label, target, job, title) {
    if (!AI.configured()) return h('span', { class: 'muted' }, 'AI feedback: ', link('#/progress', 'add a free API key'), ' (optional)');
    const b = h('button', { class: 'btn ghost', onclick: async () => {
      b.disabled = true; target.replaceChildren(h('p', { class: 'muted' }, 'Reading your work… this takes a few seconds.'));
      try { target.replaceChildren(feedbackPanel(await job(), title)); }
      catch (e) { target.replaceChildren(h('p', { class: 'fb' }, e.message)); }
      b.disabled = false;
    } }, label);
    return b;
  }

  /* =====================================================================
     MISTAKES
     ===================================================================== */
  const MGROUPS = [
    ['All', () => true],
    ['Grammar', (m) => m.topic.startsWith('g-')],
    ['Use of English and Reading', (m) => m.topic.startsWith('u-')],
    ['Vocabulary', (m) => m.topic.startsWith('v-')],
    ['Listening', (m) => m.topic === 'listen'],
    ['Other', (m) => !/^(g-|u-|v-)/.test(m.topic) && m.topic !== 'listen']
  ];
  const promptHtml = (it) => it.type === 'kwt'
    ? `${it.first}<br><span class="keyword">${it.key.toUpperCase()}</span> ${it.second.replace('___', '<span class="blank"></span>')}`
    : it.q.replace('___', '<span class="blank"></span>');
  const correctText = (it) => (it.type === 'mcq' ? it.options[it.answer] : it.answers.slice(0, 2).join(' / '));

  function mistakes() {
    let cur = 'All', sort = 'recent';
    const list = h('div');
    const chips = h('div', { class: 'toc' });
    function filtered() {
      const f = MGROUPS.find((g) => g[0] === cur)[1];
      const all = Store.mistakes().filter(f);
      return sort === 'repeated' ? all.sort((a, b) => b.count - a.count || b.ts - a.ts) : all;
    }
    function card(m) {
      const it = m.item, extra = h('div');
      return h('div', { class: 'card mistake' },
        h('div', { class: 'row', style: 'justify-content:space-between' },
          h('div', {}, link(m.href, m.label, 'tag'), m.count > 1 ? h('span', { class: 'chip' }, `missed ×${m.count}`) : null, h('span', { class: 'chip' }, fmtDate(m.ts))),
          h('div', { class: 'row' },
            h('button', { class: 'btn small ghost', onclick: () => { Store.addNote({ title: 'Mistake: ' + m.label, text: `${strip(promptHtml(it))}\nMy answer: ${m.given || '(blank)'}\nCorrect: ${correctText(it)}\n${strip(it.why || '')}`, tag: 'Mistakes', href: '#/mistakes' }); toast('Saved to notes'); } }, '＋ Note'),
            AI.configured() ? h('button', { class: 'btn small ghost', onclick: async (e) => {
              e.target.disabled = true; extra.textContent = 'Thinking…';
              try { extra.textContent = await AI.explain(it, m.given); extra.className = 'fb good notetext'; } catch (err) { extra.textContent = err.message; extra.className = 'fb'; }
              e.target.disabled = false;
            } }, 'Explain more') : null,
            h('button', { class: 'btn small ghost', onclick: () => { Store.removeMistake(m.id); draw(); } }, 'Got it'))),
        h('p', { class: 'q', html: promptHtml(it) }),
        h('div', { class: 'fb' }, h('b', {}, 'Your answer: '), m.given || '(blank)'),
        h('div', { class: 'fb good' }, h('b', {}, 'Correct: '), correctText(it)),
        h('div', { class: 'why', html: '<b>Why:</b> ' + (it.why || '') }), extra);
    }
    function draw() {
      const all = Store.mistakes();
      chips.replaceChildren(...MGROUPS.map(([name, f]) => h('a', {
        href: '#', class: cur === name ? 'on' : '', onclick: (e) => { e.preventDefault(); cur = name; draw(); }
      }, `${name} (${all.filter(f).length})`)));
      const items = filtered();
      list.replaceChildren(...(items.length ? items.map(card) : [h('div', { class: 'card' }, h('p', {}, all.length ? 'No mistakes in this category.' : 'No mistakes saved. Every wrong answer from lessons, practice and quizzes appears here with its explanation, so you can revise exactly what you got wrong.'),
        link('#/course', 'Go to the course', 'btn'))]));
      document.getElementById('mbadge').textContent = all.length ? String(all.length) : '';
    }
    const n = Store.mistakes().length;
    view(back('#/progress', 'Review'), h('h1', {}, 'My mistakes'),
      h('p', { class: 'lead' }, 'Every question you answered wrongly is saved here with the correct answer and the reason. A mistake disappears after you answer it correctly twice in a row, so this list shows what you still need to learn.'),
      h('div', { class: 'row' },
        n ? link('#/mistakes/practice', `Practise ${Math.min(n, 10)} of them`, 'btn') : null,
        h('label', { class: 'muted' }, 'Sort ', h('select', { onchange: (e) => { sort = e.target.value; draw(); } }, h('option', { value: 'recent' }, 'Newest first'), h('option', { value: 'repeated' }, 'Most repeated'))),
        n ? h('button', { class: 'btn small ghost', onclick: () => { if (confirm('Remove all saved mistakes?')) { Store.clearMistakes(); draw(); } } }, 'Clear all') : null),
      chips, list);
    draw();
  }

  function mistakePractice() {
    const items = sample(Store.mistakes(), 10).map((m) => m.item);
    if (!items.length) { location.hash = '#/mistakes'; return; }
    view(back('#/mistakes', 'My mistakes'), h('h1', {}, 'Practise your mistakes'),
      h('p', { class: 'muted' }, 'Answer correctly twice (in two sessions) and a mistake leaves your list.'),
      quiz(items, { source: { topic: 'retry', label: 'Mistake practice', href: '#/mistakes' }, onRetry: mistakePractice, onScore: (c, t) => Store.record('retry', c, t) }));
  }

  /* =====================================================================
     NOTES: a drawer available on every page (Alt+N), dockable on wide screens
     ===================================================================== */
  const TAGS = ['Grammar', 'Vocabulary', 'Writing', 'Listening', 'Speaking', 'Mistakes', 'Other'];
  const tagSelect = (val) => h('select', { 'aria-label': 'Tag' }, TAGS.map((t) => h('option', { value: t, selected: t === val }, t)));

  function setupNotes() {
    const root = document.body;
    let cur = 'All', query = '', open = false;
    const pinKey = 'c1path.notes.pin';
    const getPin = () => { try { return localStorage.getItem(pinKey) === '1'; } catch (e) { return false; } };
    const setPin = (v) => { try { localStorage.setItem(pinKey, v ? '1' : '0'); } catch (e) { /* optional */ } };
    const wide = () => matchMedia('(min-width: 1180px)').matches;

    const text = h('textarea', { rows: 4, 'aria-label': 'Note text', placeholder: 'A rule in your own words, a new expression, a question…' });
    const tag = tagSelect('Other');
    const ctx = h('div', { class: 'muted notes-ctx' });
    const list = h('div', { class: 'notes-list' });
    const filter = h('select', { 'aria-label': 'Filter by tag', onchange: (e) => { cur = e.target.value; draw(); } });
    const search = h('input', { type: 'text', placeholder: 'Search notes', 'aria-label': 'Search notes', oninput: (e) => { query = e.target.value; draw(); } });
    const pinBtn = h('button', { class: 'icon-btn', title: 'Dock beside the page', 'aria-label': 'Dock notes beside the page', onclick: () => { setPin(!getPin()); apply(); } }, '▯');
    const panel = h('aside', { id: 'notes', 'aria-label': 'Notes', 'aria-hidden': 'true' },
      h('div', { class: 'notes-head' }, h('h2', {}, 'Notes'), h('div', { class: 'row' }, pinBtn, h('button', { class: 'icon-btn', 'aria-label': 'Close notes', onclick: () => toggle(false) }, '✕'))),
      h('div', { class: 'notes-new' }, text,
        h('div', { class: 'row' }, tag, h('button', { class: 'btn small', onclick: save }, 'Save'), h('span', { class: 'muted' }, 'Ctrl+Enter')),
        ctx),
      h('div', { class: 'notes-tools' }, search, filter),
      list,
      h('div', { class: 'notes-foot' }, h('button', { class: 'btn small ghost', onclick: exportMd }, 'Download as Markdown')));
    const handle = document.getElementById('qnote');
    handle.append(h('span', { id: 'notes-count', class: 'badge' }));
    root.append(panel);

    const here = () => ({ href: location.hash || '#/', label: ((document.querySelector('#app h1') || {}).textContent || '').trim() });
    function refreshCtx() {
      const p = here();
      ctx.textContent = p.label ? 'Linked to: ' + p.label : '';
    }
    function save() {
      if (!text.value.trim()) { text.focus(); return; }
      const p = here();
      Store.addNote({ title: '', text: text.value.trim(), tag: tag.value, href: p.href, source: p.label });
      text.value = ''; text.focus();
    }
    text.addEventListener('keydown', (e) => { if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); save(); } });

    function noteCard(n) {
      const el = h('article', { class: 'note' });
      function show() {
        el.replaceChildren(...[
          n.title ? h('h3', {}, n.title) : null,
          h('div', { class: 'notetext' }, n.text),
          h('div', { class: 'note-meta' },
            h('span', { class: 'tag' }, n.tag), h('span', { class: 'muted' }, fmtDate(n.ts)),
            n.href ? link(n.href, n.source || 'source', 'src') : null,
            h('span', { class: 'spacer' }),
            h('button', { class: 'linkbtn', onclick: edit }, 'Edit'),
            h('button', { class: 'linkbtn', onclick: () => { if (confirm('Delete this note?')) { Store.deleteNote(n.id); draw(); } } }, 'Delete'))].filter(Boolean));
      }
      function edit() {
        const t = h('input', { type: 'text', placeholder: 'Title (optional)', value: n.title }), g = tagSelect(n.tag), b = h('textarea', { rows: 5 }, n.text);
        el.replaceChildren(t, b, h('div', { class: 'row' }, g,
          h('button', { class: 'btn small', onclick: () => { Store.updateNote(n.id, { title: t.value.trim(), tag: g.value, text: b.value }); draw(); } }, 'Save'),
          h('button', { class: 'btn small ghost', onclick: draw }, 'Cancel')));
        b.value = n.text; b.focus();
      }
      show();
      return el;
    }
    function draw() {
      const all = Store.notes();
      const q = query.trim().toLowerCase();
      const shown = all.filter((n) => (cur === 'All' || n.tag === cur) && (!q || (n.title + ' ' + n.text).toLowerCase().includes(q)));
      filter.replaceChildren(...['All'].concat(TAGS).map((t) => h('option', { value: t, selected: t === cur }, `${t} (${t === 'All' ? all.length : all.filter((n) => n.tag === t).length})`)));
      list.replaceChildren(...(shown.length ? shown.map(noteCard) : [h('p', { class: 'muted' }, all.length ? 'No notes match.' : 'Nothing here yet. Select text on any page and press Alt+N to start a note from it.')]));
      const c = document.getElementById('notes-count'); if (c) c.textContent = all.length ? String(all.length) : '';
    }
    function exportMd() {
      const md = Store.notes().reverse().map((n) => `## ${n.title || n.text.split('\n')[0].slice(0, 60)}\n*${n.tag} · ${fmtDate(n.ts)}*\n\n${n.text}\n`).join('\n');
      const a = h('a', { href: URL.createObjectURL(new Blob([md], { type: 'text/markdown' })), download: 'c1-path-notes.md' });
      document.body.append(a); a.click(); a.remove();
    }
    function apply() {
      const docked = open && getPin() && wide();
      root.classList.toggle('notes-open', open);
      root.classList.toggle('notes-docked', docked);
      panel.setAttribute('aria-hidden', open ? 'false' : 'true');
      handle.setAttribute('aria-expanded', open ? 'true' : 'false');
      pinBtn.classList.toggle('on', getPin());
      pinBtn.hidden = !wide();
    }
    function toggle(force) {
      open = force == null ? !open : force;
      apply();
      if (open) {
        const sel = String(getSelection()).trim();
        if (sel && !text.value) text.value = sel;
        refreshCtx(); draw(); text.focus();
      }
    }
    // keep the drawer in sync when notes are added from buttons elsewhere
    const add = Store.addNote;
    Store.addNote = (n) => { const r = add.call(Store, Object.assign({ source: here().label }, n)); draw(); return r; };
    window.addEventListener('hashchange', refreshCtx);
    window.addEventListener('resize', apply);
    document.addEventListener('keydown', (e) => {
      if (e.altKey && e.key.toLowerCase() === 'n') { e.preventDefault(); toggle(); }
      else if (e.key === 'Escape' && open && !getPin()) toggle(false);
    });
    handle.addEventListener('click', () => toggle());
    A.openNotes = () => toggle(true);
    draw(); apply();
    if (getPin() && wide()) toggle(true);
  }

  A.limitsNote = () => h('div', { class: 'callout warn' }, h('strong', {}, 'Honest limits. '), 'No website can give you an official mark. Speaking and Writing come with analysers that spot weak points, models to compare with and criteria to assess yourself against. ', AI.configured() ? 'AI feedback is switched on. ' : h('span', {}, 'For examiner-style feedback you can optionally ', link('#/progress', 'add your own AI key'), '. '), 'If you can, also share your recordings and texts with a teacher or language partner.');
  A.timer = timer;
  A.skillStats = () => {
    const L = C1.listening || [], W = (C1.writing || {}).tasks || [], S = (C1.speaking || {}).sets || [];
    return {
      l: [L.filter((x) => Store.score('listen:' + x.id)).length, L.length],
      s: [S.filter((x) => (Store.skill('speaking:' + x.id) || {}).done).length, S.length],
      w: [W.filter((x) => (Store.skill('writing:' + x.id) || {}).done).length, W.length]
    };
  };

  /* =====================================================================
     LISTENING
     ===================================================================== */
  function listeningList() {
    const L = C1.listening || [];
    view(back('#/toolkit', 'Library'), h('h1', {}, 'Listening'),
      h('p', { class: 'lead' }, 'Each recording is read aloud by your browser\'s text-to-speech voices. Listen first without the transcript, answer, then read the transcript to see what you missed.'),
      !Speech.supported ? h('div', { class: 'callout bad' }, 'This browser cannot read text aloud. You can still do the tasks from the transcripts, or try Chrome or Edge.') : null,
      h('div', { class: 'callout' }, h('strong', {}, 'How to practise. '), h('ol', {}, h('li', {}, 'Read the questions first and underline the key words.'), h('li', {}, 'Play the recording. The real exam plays it twice, so allow yourself two plays.'), h('li', {}, 'Answer, check, then open the transcript and find the evidence for every answer, including the ones you got right.'))),
      sectionHead('Recordings'),
      h('div', { class: 'grid' }, L.map((x) => h('a', { class: 'card', href: '#/skills/listening/' + x.id },
        h('div', {}, A.scoreChip('listen:' + x.id) || h('span', { class: 'chip' }, 'new')), h('h3', { style: 'margin:.4em 0 .2em' }, x.title), h('p', { class: 'muted', style: 'margin:0' }, x.format)))),
      sectionHead('Dictation and your own audio', 'Train your ear for connected speech.'),
      h('a', { class: 'card', href: '#/skills/listening/own' }, h('h3', { style: 'margin:0 0 .2em' }, 'Practise with your own audio'), h('p', { class: 'muted', style: 'margin:0' }, 'Load a real recording (a past exam track, a podcast, a video soundtrack): slow it down, loop a difficult passage, write what you hear and compare it with the transcript.')),
      h('a', { class: 'card', style: 'margin-top:14px', href: '#/skills/dictation' }, h('h3', { style: 'margin:0 0 .2em' }, 'Listen and type'), h('p', { class: 'muted', style: 'margin:0' }, 'Six sentences from the vocabulary you are learning. You hear each one and type it; the app shows exactly which words you missed.')));
  }

  function listeningSet(id) {
    const l = (C1.listening || []).find((x) => x.id === id);
    if (!l) return notFound();
    const items = [{ type: 'audio', title: l.title, intro: l.intro, script: l.script }].concat(l.questions);
    const uf = A.unitFooter('listening', id);
    view(A.unitBack() || back('#/skills/listening', 'Listening'), A.partOf('listening', id), h('div', {}, h('span', { class: 'tag' }, l.format), h('span', { class: 'tag' }, l.examPart)),
      h('h1', {}, l.title), l.skills ? h('p', { class: 'muted' }, 'Trains: ' + l.skills) : null,
      quiz(items, {
        source: { topic: 'listen', label: 'Listening · ' + l.title, href: '#/skills/listening/' + id },
        onRetry: () => listeningSet(id), onScore: (c, t) => { Store.record('listen', c, t); Store.setScore('listen:' + id, c, t); }
      }),
      uf || h('div', { class: 'pager' }, link('#/skills/listening', 'All recordings', 'btn ghost small')));
  }

  function ownAudio() {
    let url = null, a = null, b = null, loop = false;
    const file = h('input', { type: 'file', accept: 'audio/*,video/*', 'aria-label': 'Audio file' });
    const player = h('audio', { controls: true, style: 'width:100%;display:none;margin-top:10px' });
    const rate = h('select', { 'aria-label': 'Speed', onchange: () => { player.playbackRate = +rate.value; } }, [0.6, 0.75, 0.9, 1, 1.15, 1.3].map((v) => h('option', { value: v, selected: v === 1 }, v + '×')));
    const loopInfo = h('span', { class: 'muted' }, 'Set A and B to repeat a short passage.');
    const heard = h('textarea', { rows: 6, class: 'wide', placeholder: 'Type what you hear…', 'aria-label': 'What you understood' });
    const official = h('textarea', { rows: 6, class: 'wide', placeholder: 'Paste the official transcript here (optional)…', 'aria-label': 'Official transcript' });
    const out = h('div');
    file.addEventListener('change', () => {
      if (url) URL.revokeObjectURL(url);
      if (!file.files[0]) return;
      url = URL.createObjectURL(file.files[0]); player.src = url; player.style.display = ''; a = b = null; loop = false; loopInfo.textContent = 'Set A and B to repeat a short passage.';
    });
    player.addEventListener('timeupdate', () => { if (loop && b != null && a != null && player.currentTime >= b) player.currentTime = a; });
    const fmt = (t) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`;
    A.cleanup.push(() => { player.pause(); if (url) URL.revokeObjectURL(url); });
    view(back('#/skills/listening', 'Listening'), h('h1', {}, 'Practise with your own audio'),
      h('p', { class: 'lead' }, 'Use a real recording: the file stays on your computer and is never uploaded. Slow it down, loop what you cannot catch, write it out, and compare with the transcript.'),
      cardBlock(null, file, player,
        h('div', { class: 'row', style: 'margin-top:10px' }, h('label', { class: 'muted' }, 'Speed ', rate),
          h('button', { class: 'btn small ghost', onclick: () => { a = player.currentTime; loopInfo.textContent = `A = ${fmt(a)}${b != null ? ', B = ' + fmt(b) : ''}`; } }, 'Set A here'),
          h('button', { class: 'btn small ghost', onclick: () => { b = player.currentTime; loopInfo.textContent = `A = ${a != null ? fmt(a) : '–'}, B = ${fmt(b)}`; } }, 'Set B here'),
          h('button', { class: 'btn small', onclick: (e) => { loop = !loop; if (loop && a != null) player.currentTime = a; e.target.textContent = loop ? 'Loop: on' : 'Loop: off'; } }, 'Loop: off'),
          loopInfo)),
      h('h3', {}, 'What I heard'), heard, h('h3', {}, 'Official transcript'), official,
      h('div', { class: 'row', style: 'margin-top:10px' },
        h('button', { class: 'btn', onclick: () => {
          if (!official.value.trim()) { out.replaceChildren(h('p', { class: 'fb' }, 'Paste the transcript to compare.')); return; }
          const d = Engine.diffWords(official.value, heard.value);
          out.replaceChildren(h('div', { class: 'fb' + (d.acc >= 0.9 ? ' good' : ''), html: `<b>${Math.round(d.acc * 100)}% of the words.</b> Green = heard, red = missed, struck-through = extra.<br>` + d.html }));
        } }, 'Compare'),
        h('button', { class: 'btn ghost', onclick: () => { Store.addNote({ title: 'My listening notes', text: heard.value, tag: 'Listening', href: '#/skills/listening/own' }); toast('Saved to notes'); } }, 'Save to notes')),
      out);
  }

  function dictation() {
    const started = A.allCards.filter((c) => Store.card(c.id));
    const okLen = (s) => { const n = s.split(/\s+/).length; return n >= 5 && n <= 16; };
    const pool = (started.length >= 8 ? started : A.allCards).map((c) => c.ex.replace(/\[\[|\]\]/g, '')).filter(okLen);
    const spoken = (C1.listening || []).flatMap((l) => l.script.flatMap((x) => x.text.split(/(?<=[.!?])\s+/))).filter(okLen);
    const items = sample(pool, 3).concat(sample(spoken, 3)).map((text) => ({ type: 'dictation', text }));
    view(back('#/skills/listening', 'Listening'), h('h1', {}, 'Dictation'),
      h('p', { class: 'muted' }, 'Three sentences come from your vocabulary and three from the listening recordings. Play each sentence, type what you hear, then check. You can replay as often as you like. 90% of the words counts as correct.'),
      !Speech.supported ? h('div', { class: 'callout bad' }, 'This browser cannot read text aloud, so dictation is unavailable here.') : null,
      quiz(items, { onRetry: dictation, onScore: (c, t) => Store.record('dictation', c, t) }));
  }

  /* =====================================================================
     TIMER and RECORDER widgets
     ===================================================================== */
  function timer(seconds, label) {
    let left = seconds, iv = null;
    const out = h('span', { class: 'timer-time', 'aria-live': 'off' }, '');
    const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
    const btn = h('button', { class: 'btn small', onclick: toggle }, 'Start');
    const reset = h('button', { class: 'btn small ghost', onclick: () => { stop(); left = seconds; paint(); } }, 'Reset');
    function paint() { out.textContent = fmt(left); out.classList.toggle('over', left === 0); }
    function stop() { clearInterval(iv); iv = null; btn.textContent = 'Start'; }
    function toggle() {
      if (iv) return stop();
      if (left === 0) left = seconds;
      btn.textContent = 'Pause';
      iv = setInterval(() => { left--; paint(); if (left <= 0) { stop(); left = 0; paint(); toast('Time is up'); } }, 1000);
    }
    A.cleanup.push(stop);
    paint();
    return h('div', { class: 'timer row' }, label ? h('span', { class: 'muted' }, label) : null, out, btn, reset);
  }

  const FILLERS = ['um', 'uh', 'er', 'erm', 'you know', 'i mean', 'sort of', 'kind of', 'basically', 'like'];

  function analyseSpeech(text, seconds, segments, part) {
    const words = (text.toLowerCase().match(/[a-z]+(?:'[a-z]+)?/g) || []);
    const rows = [], row = (label, value, note, status) => rows.push({ label, value, note, status: status || '' });
    row('Words', String(words.length), part === 2 ? 'A one-minute long turn is usually about 130–170 words.' : '', part === 2 ? (words.length >= 110 && words.length <= 200 ? 'ok' : 'warn') : '');
    if (seconds > 5) {
      const wpm = Math.round(words.length / (seconds / 60));
      row('Speed', `${wpm} words per minute (${Math.round(seconds)} s)`, wpm < 90 ? 'Slow or hesitant: prepare chunks of language and keep going.' : wpm > 190 ? 'Very fast: slow down so you are easy to follow.' : 'A natural pace (about 110–170 is typical).', wpm < 90 || wpm > 190 ? 'warn' : 'ok');
    }
    const joined = ' ' + words.join(' ') + ' ';
    const fill = FILLERS.map((f) => [f, (joined.match(new RegExp(' ' + f + ' ', 'g')) || []).length]).filter(([, n]) => n);
    const nf = fill.reduce((a, [, n]) => a + n, 0);
    row('Filler words', nf ? fill.map(([f, n]) => `${f} ×${n}`).join(', ') : 'none found', nf > words.length / 25 ? 'Quite a few: replace with a short pause or a phrase like "let me think".' : 'Fine.', nf > words.length / 25 ? 'warn' : 'ok');
    const reps = []; for (let k = 1; k < words.length; k++) if (words[k] === words[k - 1] && words[k].length < 6) reps.push(words[k]);
    if (reps.length) row('Repeated words', reps.slice(0, 6).join(', '), 'Repetition usually signals searching for the next word.', 'warn');
    const types = new Set(words); row('Vocabulary variety', words.length ? Math.round(100 * types.size / words.length) + '%' : '–', '');
    const linkRows = Object.entries(LINKERS).map(([cat, list]) => [cat, list.filter((l) => new RegExp('(^|[^a-z])' + l + '([^a-z]|$)', 'i').test(text))]).filter(([, u]) => u.length);
    const struct = STRUCTS.filter(([, re]) => re.test(text)).map((x) => x[0]);
    const weak = (segments || []).filter((x) => x.conf && x.conf < 0.85 && x.text).sort((x, y) => x.conf - y.conf).slice(0, 3);
    return { rows, linkRows, struct, weak };
  }

  /* Recorder + live transcript (browser speech recognition) + analysis + optional AI feedback for one part. */
  function speechCoach(partNo, promptText, setTitle) {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    let rec = null, stream = null, chunks = [], recog = null, recording = false, segments = [], t0 = 0, seconds = 0;
    const status = h('span', { class: 'muted' }, 'Record yourself, then listen back and assess.');
    const audio = h('audio', { controls: true, style: 'display:none;max-width:100%' });
    const dl = h('a', { class: 'btn small ghost', style: 'display:none', download: 'my-recording.webm' }, 'Download');
    const btn = h('button', { class: 'btn small', onclick: toggle }, '● Record');
    const transcript = h('textarea', { rows: 5, placeholder: SR ? 'Your words appear here while you speak. Fix recognition mistakes before analysing.' : 'This browser has no speech recognition (try Chrome or Edge). Type or paste what you said to analyse it.', 'aria-label': 'Transcript' });
    const out = h('div'), aiOut = h('div');

    function startRecog() {
      if (!SR) return;
      try {
        recog = new SR(); recog.lang = 'en-GB'; recog.continuous = true; recog.interimResults = true;
        recog.onresult = (e) => {
          let interim = '';
          for (let k = e.resultIndex; k < e.results.length; k++) {
            const r = e.results[k];
            if (r.isFinal) segments.push({ text: r[0].transcript.trim(), conf: r[0].confidence }); else interim += r[0].transcript;
          }
          transcript.value = segments.map((x) => x.text).join(' ') + (interim ? ' ' + interim : '');
        };
        recog.onend = () => { if (recording) { try { recog.start(); } catch (e) { /* already started */ } } };
        recog.onerror = (e) => { if (e.error === 'not-allowed') status.textContent = 'Speech recognition was blocked: allow the microphone.'; };
        recog.start();
      } catch (e) { recog = null; }
    }
    async function toggle() {
      if (recording) { recording = false; seconds = (Date.now() - t0) / 1000; if (recog) { try { recog.stop(); } catch (e) { /* ignore */ } } if (rec && rec.state === 'recording') rec.stop(); btn.textContent = '● Record again'; return; }
      if (!navigator.mediaDevices || !window.MediaRecorder) { status.textContent = 'Recording is not available here (it needs localhost or https).'; return; }
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        chunks = []; segments = []; transcript.value = ''; rec = new MediaRecorder(stream);
        rec.ondataavailable = (e) => chunks.push(e.data);
        rec.onstop = () => {
          stream.getTracks().forEach((t) => t.stop());
          const url = URL.createObjectURL(new Blob(chunks, { type: rec.mimeType || 'audio/webm' }));
          audio.src = url; audio.style.display = ''; dl.href = url; dl.style.display = '';
          status.textContent = 'Listen back, check the transcript, then press Analyse.';
        };
        rec.start(); recording = true; t0 = Date.now(); btn.textContent = '■ Stop'; status.textContent = 'Recording… speak now.';
        startRecog();
      } catch (e) { status.textContent = 'Microphone not available: ' + (e.name === 'NotAllowedError' ? 'permission was denied.' : e.message); }
    }
    A.cleanup.push(() => { recording = false; if (recog) { try { recog.stop(); } catch (e) { /* ignore */ } } if (rec && rec.state === 'recording') rec.stop(); if (stream) stream.getTracks().forEach((t) => t.stop()); });

    function analyse() {
      const text = transcript.value.trim();
      if (text.split(/\s+/).length < 8) { out.replaceChildren(h('p', { class: 'fb' }, 'Record an answer or type at least a few sentences first.')); return; }
      const r = analyseSpeech(text, seconds, segments, partNo);
      out.replaceChildren(cardBlock('Analysis of your answer',
        h('p', { class: 'muted' }, 'Based on an automatic transcript without punctuation, so treat it as a rough guide. It cannot judge pronunciation.'),
        h('div', { class: 'tablewrap' }, h('table', {}, h('tbody', {}, r.rows.map((x) => h('tr', {}, h('th', {}, x.label), h('td', {}, x.value), h('td', { class: x.status === 'warn' ? 'a-warn' : x.status === 'ok' ? 'a-ok' : '' }, x.note)))))),
        h('h3', {}, 'Linking words'), r.linkRows.length ? h('ul', {}, r.linkRows.map(([c, u]) => h('li', {}, h('strong', {}, c + ': '), u.join(', ')))) : h('p', { class: 'a-warn' }, 'No linking words found: connect your ideas (however, as a result, on top of that…).'),
        r.struct.length ? h('p', {}, h('strong', {}, 'Structures spotted: '), r.struct.join(', ')) : null,
        r.weak.length ? h('div', {}, h('h3', {}, 'Parts the recogniser was least sure about'), h('p', { class: 'muted' }, 'This can point to unclear pronunciation, or to background noise. Listen to these bits again.'), h('ul', {}, r.weak.map((x) => h('li', {}, `"${x.text}" (${Math.round(x.conf * 100)}% confidence)`)))) : null));
      aiOut.replaceChildren();
    }
    const stats = () => { const r = analyseSpeech(transcript.value, seconds, segments, partNo); return r.rows.map((x) => `${x.label}: ${x.value}`).join('; '); };
    return h('div', { class: 'recorder' }, h('div', { class: 'row' }, btn, status, dl), audio,
      h('p', { class: 'muted', style: 'font-size:.85rem;margin:4px 0' }, 'Recordings stay in this page and are lost when you leave it, unless you download them.'),
      transcript,
      h('div', { class: 'row', style: 'margin-top:8px' }, h('button', { class: 'btn small', onclick: analyse }, 'Analyse my answer'),
        aiButton('AI feedback on this answer', aiOut, () => AI.speaking(`${setTitle}, Part ${partNo}`, partNo + ': ' + promptText, transcript.value, stats()), 'AI feedback: Speaking Part ' + partNo)),
      out, aiOut);
  }

  const speakBtn = (text, label) => h('button', { class: 'btn small ghost', onclick: () => Speech.say(text, 0.95) }, label || '▶ Hear it');

  /* =====================================================================
     SPEAKING
     ===================================================================== */
  function speakingList() {
    const S = (C1.speaking || {}).sets || [];
    view(back('#/toolkit', 'Library'), h('h1', {}, 'Speaking'),
      h('p', { class: 'lead' }, 'Speak aloud, out loud, every time. Each set follows the four parts of the exam with a timer and a recorder so you can listen back to yourself.'),
      h('div', { class: 'row' }, link('#/skills/speaking/guide', 'Guide: the 4 parts, criteria and useful phrases', 'btn ghost')),
      sectionHead('Practice sets'),
      h('div', { class: 'grid' }, S.map((x) => { const d = Store.skill('speaking:' + x.id) || {}; return h('a', { class: 'card', href: '#/skills/speaking/' + x.id },
        h('div', {}, d.done ? h('span', { class: 'tag ok' }, 'Done') : h('span', { class: 'chip' }, 'new')), h('h3', { style: 'margin:.4em 0 .2em' }, x.title), h('p', { class: 'muted', style: 'margin:0' }, x.part1[0])); })));
  }

  function speakingGuide() {
    const G = (C1.speaking || {}).guide;
    if (!G) return notFound();
    view(back('#/skills/speaking', 'Speaking'), h('h1', {}, 'Speaking guide'),
      sectionHead('The four parts'),
      ...G.parts.map((p) => h('div', { class: 'card' }, h('h3', { style: 'margin-top:0' }, `Part ${p.n}: ${p.name}`), h('p', { class: 'muted' }, p.time), h('p', {}, p.what), h('ul', {}, p.tips.map((t) => h('li', {}, t))))),
      sectionHead('What the examiners listen for'),
      ...G.criteria.map((c) => h('div', { class: 'card' }, h('h3', { style: 'margin-top:0' }, c.name), h('p', {}, c.c1), h('p', { class: 'muted' }, 'To improve: ' + c.tips))),
      sectionHead('Useful phrases'),
      h('div', { class: 'grid' }, G.phrases.map((g) => h('div', { class: 'card' }, h('h3', { style: 'margin-top:0' }, g.h), h('ul', {}, g.items.map((i) => h('li', {}, i)))))),
      sectionHead('Self-check after recording'), h('ul', {}, G.checklist.map((c) => h('li', {}, c))));
  }

  function speakingSet(id) {
    const S = (C1.speaking || {}), set = (S.sets || []).find((x) => x.id === id);
    if (!set) return notFound();
    const panels = {
      1: () => h('div', {}, h('p', { class: 'muted' }, 'The examiner asks you questions about yourself. Aim for two or three sentences per answer, not one word and not a speech.'),
        timer(120, 'Suggested time'),
        h('ol', {}, set.part1.map((q) => h('li', {}, q, ' ', speakBtn(q, '▶ Hear the question'))))),
      2: () => h('div', {}, h('p', { class: 'muted', html: set.part2.intro }),
        h('div', { class: 'grid' }, h('div', { class: 'card' }, h('strong', {}, 'Photograph A'), h('p', {}, set.part2.photoA)), h('div', { class: 'card' }, h('strong', {}, 'Photograph B'), h('p', {}, set.part2.photoB))),
        h('div', { class: 'callout' }, h('strong', {}, 'Your task. '), set.part2.task, ' ', speakBtn(set.part2.task, '▶ Hear the task')),
        timer(60, 'Long turn: one minute'),
        h('p', { class: 'muted' }, 'Then your partner answers: ' + set.part2.followUp),
        h('details', {}, h('summary', {}, 'Model answer (try first!)'), h('p', {}, set.part2.sample), speakBtn(set.part2.sample, '▶ Hear the model'))),
      3: () => h('div', {}, h('p', { class: 'muted' }, set.part3.situation),
        h('div', { class: 'callout' }, h('strong', {}, set.part3.centre)),
        h('div', { class: 'bubbles' }, set.part3.options.map((o) => h('span', { class: 'bubble' }, o))),
        h('p', {}, h('strong', {}, 'Then decide: '), set.part3.decision), timer(180, 'Discussion (2 min) + decision (1 min)'),
        h('p', { class: 'muted' }, 'No partner? Say both sides aloud: ask yourself questions, disagree politely, then decide.'),
        h('details', {}, h('summary', {}, 'Sample interaction (try first!)'), set.part3.sample.split('\n').map((l) => h('p', { style: 'margin:.2em 0' }, l)))),
      4: () => h('div', {}, h('p', { class: 'muted' }, 'Broader questions about the topic. Give an opinion, a reason and an example or a contrast.'), timer(240, 'Suggested time'),
        h('ol', {}, set.part4.map((q) => h('li', {}, q, ' ', speakBtn(q, '▶ Hear the question')))))
    };
    const promptFor = (n) => (n === 1 ? set.part1.join(' / ') : n === 2 ? `${set.part2.task} (Photograph A: ${set.part2.photoA} Photograph B: ${set.part2.photoB})` : n === 3 ? `${set.part3.centre} Options: ${set.part3.options.join(', ')}. ${set.part3.decision}` : set.part4.join(' / '));
    const crit = (S.guide && S.guide.criteria) || [];
    const prev = Store.skill('speaking:' + id) || {};
    const ratings = Object.assign({}, prev.self || {});
    const body = h('div');
    const tabs = h('div', { class: 'tabs', role: 'tablist' });
    let cur = 1;
    function show(n) {
      cur = n; A.cleanup.splice(0).forEach((f) => f());
      tabs.replaceChildren(...[1, 2, 3, 4].map((k) => h('button', { class: 'tab' + (k === cur ? ' on' : ''), role: 'tab', onclick: () => show(k) }, 'Part ' + k)));
      body.replaceChildren(panels[n](), speechCoach(n, promptFor(n), set.title));
    }
    const selfBox = cardBlock('Self-assessment', h('p', { class: 'muted' }, 'After listening back, rate yourself honestly: 1 = needs a lot of work, 5 = confident at C1.'),
      ...crit.map((c) => h('div', { class: 'trow' }, h('span', {}, c.name), h('div', { class: 'row' }, [1, 2, 3, 4, 5].map((v) => {
        const b = h('button', { class: 'btn small' + (ratings[c.name] === v ? '' : ' ghost'), onclick: () => { ratings[c.name] = v; Store.setSkill('speaking:' + id, { self: ratings }); selfBox.querySelectorAll(`[data-c="${c.name}"]`).forEach((x) => x.classList.add('ghost')); b.classList.remove('ghost'); } }, String(v));
        b.dataset.c = c.name; return b;
      })), h('span'))),
      h('button', { class: 'btn', onclick: () => { Store.setSkill('speaking:' + id, { done: true, self: ratings }); toast('Set marked as done'); } }, 'Mark this set as done'));
    const uf = A.unitFooter('speaking', id);
    view(A.unitBack() || back('#/skills/speaking', 'Speaking'), A.partOf('speaking', id), h('h1', {}, set.title), tabs, body, selfBox,
      uf || h('div', { class: 'pager' }, link('#/skills/speaking', 'All sets', 'btn ghost small'), link('#/skills/speaking/guide', 'Guide', 'btn ghost small')));
    show(1);
  }

  /* =====================================================================
     WRITING
     ===================================================================== */
  const LINKERS = {
    'Addition': ['moreover', 'furthermore', 'in addition', 'besides', 'what is more', 'as well as', 'not only', 'also'],
    'Contrast': ['however', 'nevertheless', 'nonetheless', 'although', 'even though', 'whereas', 'while', 'despite', 'in spite of', 'on the other hand', 'by contrast', 'yet'],
    'Cause and result': ['because', 'since', 'as a result', 'consequently', 'therefore', 'thus', 'hence', 'due to', 'owing to', 'so that', 'as a consequence', 'leading to'],
    'Sequence': ['firstly', 'first of all', 'secondly', 'finally', 'lastly', 'to begin with', 'subsequently', 'meanwhile', 'ultimately', 'in the end'],
    'Opinion and emphasis': ['in my opinion', 'i would argue', 'arguably', 'undoubtedly', 'in fact', 'indeed', 'above all', 'it seems', 'clearly'],
    'Conclusion': ['in conclusion', 'to sum up', 'to conclude', 'all in all', 'overall', 'on balance', 'in short']
  };
  const STRUCTS = [
    ['Inversion after a negative adverbial', /(^|[.!?]\s+)(never|rarely|seldom|hardly|scarcely|little|not only|no sooner|under no circumstances|not until|only (when|after|then))\b/i, 'Rarely do people…, Not only did she…'],
    ['Passive voice', /\b(is|are|was|were|be|been|being)\s+(\w+ly\s+)?\w+(ed|en)\b/i, 'The scheme was introduced in…'],
    ['Reporting passive', /\b(is|are|was|were)\s+(said|believed|thought|expected|reported|considered|known|claimed|understood)\s+to\b/i, 'It is widely believed that… / X is said to…'],
    ['Participle clause', /(^|[.!?]\s+)(?!during|according|including|concerning|regarding|following)(having\s+\w+|\w+ing|\w+ed)\s[^,.]{2,50},/i, 'Having considered both sides, I…'],
    ['Cleft sentence', /\b(it (is|was) [^.]{1,45}\b(that|who)\b|what [^.]{3,45} (is|was)\b)/i, 'What matters most is… / It is X that…'],
    ['Conditional (including inverted)', /\b(if|unless|provided|as long as|supposing)\b|(^|[.!?]\s+)(had|should|were)\s+\w+/i, 'Had they invested earlier, …'],
    ['Preposition + relative pronoun', /\b(in|of|to|for|with|by|on)\s+(which|whom|whose)\b/i, 'the way in which…, a policy of which…'],
    ['Modal perfect', /\b(must|might|may|could|should|would|can't|cannot)\s+have\s+\w+/i, 'This may have contributed to…'],
    ['Concessive structure', /\b(although|even though|whereas|despite|in spite of|while|much as|however [a-z]+ )\b/i, 'Despite being…, Much as I admire…']
  ];
  const BLAND = ['good', 'bad', 'nice', 'very', 'really', 'thing', 'things', 'a lot', 'lots of', 'big', 'get', 'got', 'getting', 'say', 'said', 'stuff', 'kind of', 'sort of'];
  const STOP = new Set('the a an and or but of to in on at for with by from as is are was were be been it this that these those they them their he she his her you your we our i my me not no so if then than there which who whom what when where will would can could should may might have has had do does did also more most such into about over under between very just'.split(' '));

  function analyse(text, genre, minW, maxW, guide) {
    const words = text.match(/[A-Za-z]+(?:'[a-z]+)?/g) || [];
    const lower = text.toLowerCase();
    const sentences = text.split(/(?<=[.!?])\s+/).map((s) => s.trim()).filter(Boolean);
    const lens = sentences.map((s) => (s.match(/\S+/g) || []).length);
    const paras = text.split(/\n\s*\n|\n/).filter((p) => p.trim()).length;
    const out = [];
    const row = (label, value, note, status) => out.push({ label, value, note, status: status || '' });
    const wc = (text.match(/\S+/g) || []).length;
    row('Word count', `${wc}`, `Target ${minW}–${maxW}`, wc >= minW && wc <= maxW ? 'ok' : wc < minW ? 'bad' : 'warn');
    row('Paragraphs', `${paras}`, paras >= 3 ? 'Good: clear paragraphing.' : 'Aim for at least 3–4 clear paragraphs (or headed sections).', paras >= 3 ? 'ok' : 'warn');
    const avg = lens.length ? wc / lens.length : 0;
    row('Average sentence length', avg.toFixed(1) + ' words', avg < 12 ? 'Short on average: combine ideas with relative or participle clauses.' : avg > 28 ? 'Long on average: check readability.' : 'A healthy mix.', avg < 12 || avg > 28 ? 'warn' : 'ok');
    const longest = Math.max(0, ...lens);
    if (longest > 38) row('Longest sentence', longest + ' words', 'Consider splitting it.', 'warn');
    const tokens = words.map((w) => w.toLowerCase()), first = tokens.slice(0, 200);
    const ttr = first.length ? new Set(first).size / first.length : 0;
    row('Vocabulary variety', pct(ttr) + '%', ttr >= 0.62 ? 'Good range of words.' : 'Many repeated words: use synonyms or restructure.', ttr >= 0.62 ? 'ok' : 'warn');
    const longW = tokens.filter((w) => w.length >= 8).length;
    row('Longer words (8+ letters)', pct(tokens.length ? longW / tokens.length : 0) + '%', 'C1 writing usually sits around 15–25%.', '');
    const freq = {}; tokens.forEach((w) => { if (!STOP.has(w) && w.length > 3) freq[w] = (freq[w] || 0) + 1; });
    const reps = Object.entries(freq).filter(([, n]) => n >= 4).sort((a, b) => b[1] - a[1]).slice(0, 5);
    if (reps.length) row('Repeated words', reps.map(([w, n]) => `${w} ×${n}`).join(', '), 'Vary these with synonyms or pronouns.', 'warn');
    const bland = BLAND.map((w) => [w, (lower.match(new RegExp('\\b' + w + '\\b', 'g')) || []).length]).filter(([, n]) => n);
    if (bland.length) row('Basic words', bland.map(([w, n]) => `${w} ×${n}`).join(', '), 'Swap for more precise words (e.g. good → beneficial, thing → factor, get → obtain / become).', 'warn');
    const gen = ((guide && guide.genres) || []).find((g) => g.id === genre);
    const formal = gen && /formal/i.test(gen.register) && !/semi/i.test(gen.register);
    const contr = (text.match(/\b\w+(n't|'re|'ve|'ll|'d|'m)\b/gi) || []);
    if (contr.length) row('Contractions', `${contr.length}`, formal ? 'This is a formal task: write the full forms (do not, it is).' : 'Fine in a neutral or informal register; avoid them in formal parts.', formal ? 'warn' : '');
    if (/\bI think\b/i.test(text) && (text.match(/\bI think\b/gi) || []).length > 1) row('"I think"', `${(text.match(/\bI think\b/gi) || []).length}`, 'Vary: In my view, It could be argued that, I would suggest…', 'warn');
    const linkRows = Object.entries(LINKERS).map(([cat, list]) => {
      const used = list.filter((l) => new RegExp('(^|[^a-z])' + l + '([^a-z]|$)', 'i').test(text));
      return [cat, used];
    });
    const struct = STRUCTS.map(([name, re, ex]) => [name, re.test(text), ex]);
    return { rows: out, linkRows, struct };
  }

  function writingList() {
    const W = (C1.writing || {}).tasks || [];
    view(back('#/toolkit', 'Library'), h('h1', {}, 'Writing'),
      h('p', { class: 'lead' }, 'Write a full text under exam conditions, check it with the analyser, then compare it with an annotated model. Your draft is saved in this browser as you type.'),
      h('div', { class: 'row' }, link('#/skills/writing/guide', 'Guide: criteria, text types and checklist', 'btn ghost')),
      sectionHead('Tasks'),
      h('div', { class: 'grid' }, W.map((t) => { const d = Store.draft(t.id), sk = Store.skill('writing:' + t.id) || {};
        return h('a', { class: 'card', href: '#/skills/writing/' + t.id },
          h('div', {}, h('span', { class: 'tag' }, t.genre[0].toUpperCase() + t.genre.slice(1)), sk.done ? h('span', { class: 'tag ok' }, 'Done') : d ? h('span', { class: 'chip' }, d.words + ' words drafted') : h('span', { class: 'chip' }, 'new')),
          h('h3', { style: 'margin:.4em 0 .2em' }, t.title), h('p', { class: 'muted', style: 'margin:0' }, `${t.min}–${t.max} words`)); })));
  }

  function writingGuide() {
    const G = (C1.writing || {}).guide;
    if (!G) return notFound();
    view(back('#/skills/writing', 'Writing'), h('h1', {}, 'Writing guide'),
      sectionHead('What examiners assess'),
      ...G.criteria.map((c) => h('div', { class: 'card' }, h('h3', { style: 'margin-top:0' }, c.name), h('p', { class: 'muted' }, c.question), h('p', {}, c.c1), h('p', { class: 'muted' }, 'To improve: ' + c.tips))),
      sectionHead('Text types'),
      ...G.genres.map((g) => h('div', { class: 'card' }, h('h3', { style: 'margin-top:0' }, `${g.name} (${g.register})`), h('p', {}, g.purpose),
        h('strong', {}, 'Structure'), h('ol', {}, g.structure.map((s) => h('li', {}, s))),
        h('div', { class: 'grid' }, h('div', {}, h('strong', {}, 'Opening frames'), h('ul', {}, g.openers.map((o) => h('li', {}, o)))), h('div', {}, h('strong', {}, 'Closing frames'), h('ul', {}, g.closers.map((o) => h('li', {}, o))))),
        h('p', { class: 'muted' }, g.headings), h('strong', {}, 'Common mistakes'), h('ul', {}, g.mistakes.map((m) => h('li', {}, m))))),
      sectionHead('Before you hand in'), h('ul', {}, G.checklist.map((c) => h('li', {}, c))));
  }

  function writingTask(id) {
    const W = C1.writing || {}, t = (W.tasks || []).find((x) => x.id === id);
    if (!t) return notFound();
    const saved = Store.draft(id), prev = Store.skill('writing:' + id) || {};
    const area = h('textarea', { class: 'writearea', rows: 16, placeholder: 'Write your answer here. It saves automatically.', 'aria-label': 'Your answer' });
    area.value = saved ? saved.text : '';
    const counter = h('span', { class: 'muted' }), savedMsg = h('span', { class: 'muted' }, saved ? 'Draft restored.' : '');
    const analysis = h('div'), modelBox = h('div'), aiOut = h('div');
    let timerBox;
    const count = () => (area.value.match(/\S+/g) || []).length;
    function paint() {
      const n = count(), ok = n >= t.min && n <= t.max;
      counter.textContent = `${n} words · target ${t.min}–${t.max}`;
      counter.className = ok ? 'tag ok' : n > t.max ? 'tag warn' : 'muted';
    }
    let to = null;
    area.addEventListener('input', () => { paint(); savedMsg.textContent = 'Saving…'; clearTimeout(to); to = setTimeout(() => { Store.saveDraft(id, area.value); savedMsg.textContent = 'Saved.'; }, 700); });
    A.cleanup.push(() => { clearTimeout(to); Store.saveDraft(id, area.value); });

    function runAnalysis() {
      if (count() < 40) { analysis.replaceChildren(h('p', { class: 'fb' }, 'Write at least a few sentences first.')); return; }
      const r = analyse(area.value, t.genre, t.min, t.max, W.guide);
      const found = r.struct.filter((s) => s[1]), missing = r.struct.filter((s) => !s[1]);
      analysis.replaceChildren(cardBlock('Analysis',
        h('p', { class: 'muted' }, 'A rough, automatic read of your text. It cannot judge content or accuracy, so use it to spot patterns, not to decide your level.'),
        h('div', { class: 'tablewrap' }, h('table', {}, h('tbody', {}, r.rows.map((x) => h('tr', {}, h('th', {}, x.label), h('td', {}, x.value), h('td', { class: x.status === 'warn' || x.status === 'bad' ? 'a-warn' : x.status === 'ok' ? 'a-ok' : '' }, x.note)))))),
        h('h3', {}, 'Linking words'),
        h('ul', {}, r.linkRows.map(([cat, used]) => h('li', {}, h('strong', {}, cat + ': '), used.length ? used.join(', ') : h('span', { class: 'a-warn' }, 'none used')))),
        h('h3', {}, 'Advanced structures spotted'),
        found.length ? h('ul', {}, found.map((s) => h('li', {}, '✓ ' + s[0]))) : h('p', { class: 'muted' }, 'None detected.'),
        missing.length ? h('details', {}, h('summary', {}, `Could you add some? (${missing.length} not used)`), h('ul', {}, missing.map((s) => h('li', {}, h('strong', {}, s[0] + ': '), h('em', {}, s[2]))))) : null));
    }
    function showModel() {
      if (count() < 60 && !confirm('Try writing your own answer first: you learn far more by comparing. Show the model anyway?')) return;
      const notes = t.notes || [];
      modelBox.replaceChildren(cardBlock('Model answer', h('p', { class: 'muted' }, 'Read it with the annotations. Compare structure, linking and word choice with your own text.'),
        ...t.model.map((p, i) => h('div', {}, h('div', { class: 'modelp', html: p }), notes.filter((n) => n.para === i).map((n) => h('div', { class: 'annot', html: '' + n.text })))),
        h('p', { class: 'muted' }, `Approximately ${strip(t.model.join(' ')).split(/\s+/).filter(Boolean).length} words.`)));
      modelBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    const crit = (W.guide && W.guide.criteria) || [], ratings = Object.assign({}, prev.self || {});
    const selfBox = cardBlock('Self-assessment', h('p', { class: 'muted' }, 'Compare your text with the model and the criteria, then rate each area honestly (1 = weak, 5 = strong).'),
      ...crit.map((c) => h('div', { class: 'trow' }, h('span', {}, c.name), h('div', { class: 'row' }, [1, 2, 3, 4, 5].map((v) => {
        const b = h('button', { class: 'btn small' + (ratings[c.name] === v ? '' : ' ghost'), onclick: () => { ratings[c.name] = v; Store.setSkill('writing:' + id, { self: ratings }); b.parentNode.querySelectorAll('button').forEach((x) => x.classList.add('ghost')); b.classList.remove('ghost'); } }, String(v));
        return b;
      })), h('span'))),
      h('div', { class: 'row' }, h('button', { class: 'btn', onclick: () => { Store.saveDraft(id, area.value); Store.setSkill('writing:' + id, { done: true, self: ratings }); toast('Task marked as done'); } }, 'Mark task as done'),
        h('button', { class: 'btn ghost', onclick: () => { Store.addNote({ title: t.title + ' (draft)', text: area.value, tag: 'Writing', href: '#/skills/writing/' + id }); toast('Draft saved to notes'); } }, 'Save draft to notes')));

    timerBox = timer((t.minutes || 45) * 60, 'Exam time');
    const uf = A.unitFooter('writing', id);
    view(A.unitBack() || back('#/skills/writing', 'Writing'), A.partOf('writing', id), h('div', {}, h('span', { class: 'tag' }, t.genre[0].toUpperCase() + t.genre.slice(1)), h('span', { class: 'tag' }, `${t.min}–${t.max} words`)),
      h('h1', {}, t.title), h('div', { class: 'card' }, h('div', { html: t.prompt }), t.points && t.points.length ? h('ul', {}, t.points.map((p) => h('li', { html: p }))) : null),
      h('div', { class: 'grid' },
        h('details', { class: 'card' }, h('summary', {}, 'Plan your answer'), h('ol', {}, t.plan.map((p) => h('li', { html: p })))),
        h('details', { class: 'card' }, h('summary', {}, 'Useful language'), t.language.map((g) => h('div', {}, h('strong', {}, g.h), h('ul', {}, g.items.map((i) => h('li', {}, i))))))),
      timerBox, area, h('div', { class: 'row', style: 'justify-content:space-between' }, counter, savedMsg),
      h('div', { class: 'row', style: 'margin:10px 0' }, h('button', { class: 'btn', onclick: runAnalysis }, 'Analyse my text'), h('button', { class: 'btn ghost', onclick: showModel }, 'Show model answer'),
        aiButton('AI feedback', aiOut, async () => { if (count() < 60) throw new Error('Write at least 60 words first.'); return AI.writing(t, area.value); }, 'AI feedback: ' + t.title)),
      analysis, aiOut, modelBox, selfBox,
      uf || h('div', { class: 'pager' }, link('#/skills/writing', 'All tasks', 'btn ghost small'), link('#/skills/writing/guide', 'Guide', 'btn ghost small')));
    paint();
  }

  /* ---------- routes ---------- */
  A.routes.mistakes = (b) => (b === 'practice' ? mistakePractice() : mistakes());
  A.routes.notebook = () => { A.openNotes && A.openNotes(); location.replace('#/'); };
  A.routes.skills = (b, c) => {
    if (!b) { location.replace('#/toolkit'); return; }
    if (b === 'listening') return c === 'own' ? ownAudio() : c ? listeningSet(c) : listeningList();
    if (b === 'dictation') return dictation();
    if (b === 'speaking') return c === 'guide' ? speakingGuide() : c ? speakingSet(c) : speakingList();
    if (b === 'writing') return c === 'guide' ? writingGuide() : c ? writingTask(c) : writingList();
    return notFound();
  };
  setupNotes();
})();
