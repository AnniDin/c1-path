/* C1 Path – mistakes log, notebook and the Skills section (listening, writing, speaking). */
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
      const it = m.item;
      return h('div', { class: 'card mistake' },
        h('div', { class: 'row', style: 'justify-content:space-between' },
          h('div', {}, link(m.href, m.label, 'tag'), m.count > 1 ? h('span', { class: 'chip' }, `missed ×${m.count}`) : null, h('span', { class: 'chip' }, fmtDate(m.ts))),
          h('div', { class: 'row' },
            h('button', { class: 'btn small ghost', onclick: () => { Store.addNote({ title: 'Mistake: ' + m.label, text: `${strip(promptHtml(it))}\nMy answer: ${m.given || '(blank)'}\nCorrect: ${correctText(it)}\n${strip(it.why || '')}`, tag: 'Mistakes', href: '#/mistakes' }); toast('Saved to notebook'); } }, '＋ Notebook'),
            h('button', { class: 'btn small ghost', onclick: () => { Store.removeMistake(m.id); draw(); } }, 'Got it'))),
        h('p', { class: 'q', html: promptHtml(it) }),
        h('div', { class: 'fb' }, h('b', {}, 'Your answer: '), m.given || '(blank)'),
        h('div', { class: 'fb good' }, h('b', {}, 'Correct: '), correctText(it)),
        h('div', { class: 'why', html: '<b>Why:</b> ' + (it.why || '') }));
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
    view(h('h1', {}, 'My mistakes'),
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
     NOTEBOOK
     ===================================================================== */
  const TAGS = ['Grammar', 'Vocabulary', 'Writing', 'Listening', 'Speaking', 'Mistakes', 'Other'];
  const tagSelect = (val) => h('select', { 'aria-label': 'Tag' }, TAGS.map((t) => h('option', { value: t, selected: t === val }, t)));

  function notebook() {
    let cur = 'All', query = '';
    const list = h('div');
    const chips = h('div', { class: 'toc' });
    const title = h('input', { type: 'text', class: 'wide', placeholder: 'Title (optional)', 'aria-label': 'Note title' });
    const tag = tagSelect('Other');
    const text = h('textarea', { rows: 5, class: 'wide', placeholder: 'Write a note: a rule in your own words, a new expression, a question for your teacher…', 'aria-label': 'Note text' });

    function noteCard(n) {
      const el = h('div', { class: 'card note' });
      function show() {
        el.replaceChildren(
          h('div', { class: 'row', style: 'justify-content:space-between' },
            h('div', {}, h('span', { class: 'tag' }, n.tag), h('span', { class: 'chip' }, fmtDate(n.ts)), n.href ? link(n.href, 'source', 'chip') : null),
            h('div', { class: 'row' },
              h('button', { class: 'btn small ghost', onclick: edit }, 'Edit'),
              h('button', { class: 'btn small ghost', onclick: () => { if (confirm('Delete this note?')) { Store.deleteNote(n.id); draw(); } } }, 'Delete'))),
          n.title ? h('h3', { style: 'margin:.4em 0' }, n.title) : null,
          h('div', { class: 'notetext' }, n.text));
      }
      function edit() {
        const t = h('input', { type: 'text', class: 'wide', value: n.title }), g = tagSelect(n.tag), b = h('textarea', { rows: 6, class: 'wide' }, n.text);
        el.replaceChildren(t, h('div', { style: 'margin:8px 0' }, g), b, h('div', { class: 'row', style: 'margin-top:8px' },
          h('button', { class: 'btn small', onclick: () => { Store.updateNote(n.id, { title: t.value.trim(), tag: g.value, text: b.value }); draw(); } }, 'Save'),
          h('button', { class: 'btn small ghost', onclick: draw }, 'Cancel')));
        b.value = n.text; t.value = n.title; b.focus();
      }
      show();
      return el;
    }
    function draw() {
      const all = Store.notes();
      const q = query.trim().toLowerCase();
      const shown = all.filter((n) => (cur === 'All' || n.tag === cur) && (!q || (n.title + ' ' + n.text).toLowerCase().includes(q)));
      chips.replaceChildren(...['All'].concat(TAGS).map((t) => h('a', { href: '#', class: cur === t ? 'on' : '', onclick: (e) => { e.preventDefault(); cur = t; draw(); } },
        `${t} (${t === 'All' ? all.length : all.filter((n) => n.tag === t).length})`)));
      list.replaceChildren(...(shown.length ? shown.map(noteCard) : [h('p', { class: 'muted' }, all.length ? 'No notes match.' : 'Your notebook is empty. Write your first note above, or press ✎ at the top of any page to jot something down while you study.')]));
    }
    function exportMd() {
      const md = Store.notes().reverse().map((n) => `## ${n.title || 'Untitled'}\n*${n.tag} · ${fmtDate(n.ts)}*\n\n${n.text}\n`).join('\n');
      const a = h('a', { href: URL.createObjectURL(new Blob([md], { type: 'text/markdown' })), download: 'c1-path-notebook.md' });
      document.body.append(a); a.click(); a.remove();
    }
    view(h('h1', {}, 'Notebook'),
      h('p', { class: 'lead' }, 'Your own space for rules in your own words, new expressions and questions. Press the ✎ button at the top of any page to add a note without leaving what you are doing.'),
      cardBlock(null, title, h('div', { style: 'margin:8px 0' }, tag), text,
        h('div', { class: 'row', style: 'margin-top:8px' }, h('button', { class: 'btn', onclick: () => {
          if (!text.value.trim() && !title.value.trim()) return;
          Store.addNote({ title: title.value.trim(), text: text.value, tag: tag.value }); title.value = ''; text.value = ''; draw(); toast('Note saved');
        } }, 'Save note'))),
      h('div', { class: 'row', style: 'justify-content:space-between' },
        h('input', { type: 'text', class: 'wide', placeholder: 'Search notes…', 'aria-label': 'Search notes', oninput: (e) => { query = e.target.value; draw(); } }),
        h('button', { class: 'btn small ghost', onclick: exportMd }, 'Download as Markdown')),
      chips, list);
    draw();
  }

  function setupQuickNote() {
    const dlg = h('dialog', { id: 'qn' });
    const title = h('input', { type: 'text', class: 'wide', placeholder: 'Title (optional)', 'aria-label': 'Note title' });
    const tag = tagSelect('Other'), text = h('textarea', { rows: 5, class: 'wide', 'aria-label': 'Note text' });
    dlg.append(h('form', { method: 'dialog' }, h('h3', { style: 'margin-top:0' }, 'Quick note'), title, h('div', { style: 'margin:8px 0' }, tag), text,
      h('div', { class: 'row', style: 'margin-top:10px' },
        h('button', { class: 'btn', type: 'button', onclick: () => {
          if (text.value.trim() || title.value.trim()) { Store.addNote({ title: title.value.trim(), text: text.value, tag: tag.value, href: location.hash }); toast('Saved to notebook'); }
          title.value = ''; text.value = ''; dlg.close();
        } }, 'Save'),
        h('button', { class: 'btn ghost', type: 'button', onclick: () => dlg.close() }, 'Cancel'),
        link('#/notebook', 'Open notebook', 'muted'))));
    document.body.append(dlg);
    document.getElementById('qnote').addEventListener('click', () => {
      const sel = String(getSelection());
      if (sel.trim() && !text.value) text.value = sel.trim();
      if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
      text.focus();
    });
    dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
    document.addEventListener('keydown', (e) => {
      if (e.altKey && e.key.toLowerCase() === 'n') { e.preventDefault(); document.getElementById('qnote').click(); }
    });
  }

  /* =====================================================================
     SKILLS HOME
     ===================================================================== */
  function skillsHome() {
    const L = C1.listening || [], W = (C1.writing || {}).tasks || [], S = (C1.speaking || {}).sets || [];
    const lDone = L.filter((x) => Store.score('listen:' + x.id)).length;
    const wDone = W.filter((x) => (Store.skill('writing:' + x.id) || {}).done).length;
    const sDone = S.filter((x) => (Store.skill('speaking:' + x.id) || {}).done).length;
    const tile = (href, title, desc, stat) => h('a', { class: 'card', href }, h('h3', { style: 'margin:0 0 .2em' }, title), h('p', { class: 'muted', style: 'margin:0 0 8px' }, desc), h('span', { class: 'tag' }, stat));
    view(h('h1', {}, 'Skills'),
      h('p', { class: 'lead' }, 'The exam papers that are not about grammar: Listening, Speaking and Writing. They need a different kind of practice. Listening uses your browser\'s voices, Speaking gives you a timer and a recorder, and Writing gives you a workspace with an analyser and annotated models.'),
      h('div', { class: 'grid' },
        tile('#/skills/listening', 'Listening', 'Eight recordings read aloud by your browser, with exam-style questions, plus dictation.', `${lDone}/${L.length} done`),
        tile('#/skills/speaking', 'Speaking', 'Parts 1 to 4 with prompts, a timer, a voice recorder and a self-assessment.', `${sDone}/${S.length} sets done`),
        tile('#/skills/writing', 'Writing', 'Exam-style tasks, a writing area with word count and text analysis, and model answers.', `${wDone}/${W.length} tasks done`)),
      h('div', { class: 'callout warn' }, h('strong', {}, 'Honest limits. '), 'This site cannot mark your speaking or writing. It gives you what you need to improve without a teacher: timed practice, models to compare with, criteria to assess yourself against, and an analyser that spots weak points. If you can, share your recordings and texts with a teacher or language exchange partner too.'));
  }

  /* =====================================================================
     LISTENING
     ===================================================================== */
  function listeningList() {
    const L = C1.listening || [];
    view(back('#/skills', 'Skills'), h('h1', {}, 'Listening'),
      h('p', { class: 'lead' }, 'Each recording is read aloud by your browser\'s text-to-speech voices. Listen first without the transcript, answer, then read the transcript to see what you missed.'),
      !Speech.supported ? h('div', { class: 'callout bad' }, 'This browser cannot read text aloud. You can still do the tasks from the transcripts, or try Chrome or Edge.') : null,
      h('div', { class: 'callout' }, h('strong', {}, 'How to practise. '), h('ol', {}, h('li', {}, 'Read the questions first and underline the key words.'), h('li', {}, 'Play the recording. The real exam plays it twice, so allow yourself two plays.'), h('li', {}, 'Answer, check, then open the transcript and find the evidence for every answer, including the ones you got right.'))),
      sectionHead('Recordings'),
      h('div', { class: 'grid' }, L.map((x) => h('a', { class: 'card', href: '#/skills/listening/' + x.id },
        h('div', {}, A.scoreChip('listen:' + x.id) || h('span', { class: 'chip' }, 'new')), h('h3', { style: 'margin:.4em 0 .2em' }, x.title), h('p', { class: 'muted', style: 'margin:0' }, x.format)))),
      sectionHead('Dictation', 'Train your ear for connected speech.'),
      h('a', { class: 'card', href: '#/skills/dictation' }, h('h3', { style: 'margin:0 0 .2em' }, 'Listen and type'), h('p', { class: 'muted', style: 'margin:0' }, 'Six sentences from the vocabulary you are learning. You hear each one and type it; the app shows exactly which words you missed.')));
  }

  function listeningSet(id) {
    const l = (C1.listening || []).find((x) => x.id === id);
    if (!l) return notFound();
    const items = [{ type: 'audio', title: l.title, intro: l.intro, script: l.script }].concat(l.questions);
    const uf = A.unitFooter('listening', id);
    view(A.unitBack() || back('#/skills/listening', 'Listening'), h('div', {}, h('span', { class: 'tag' }, l.format), h('span', { class: 'tag' }, l.examPart)),
      h('h1', {}, l.title), l.skills ? h('p', { class: 'muted' }, 'Trains: ' + l.skills) : null,
      quiz(items, {
        source: { topic: 'listen', label: 'Listening · ' + l.title, href: '#/skills/listening/' + id },
        onRetry: () => listeningSet(id), onScore: (c, t) => { Store.record('listen', c, t); Store.setScore('listen:' + id, c, t); }
      }),
      uf || h('div', { class: 'pager' }, link('#/skills/listening', 'All recordings', 'btn ghost small')));
  }

  function dictation() {
    const started = A.allCards.filter((c) => Store.card(c.id));
    const pool = (started.length >= 8 ? started : A.allCards).map((c) => c.ex.replace(/\[\[|\]\]/g, '')).filter((s) => { const n = s.split(/\s+/).length; return n >= 5 && n <= 16; });
    const items = sample(pool, 6).map((text) => ({ type: 'dictation', text }));
    view(back('#/skills/listening', 'Listening'), h('h1', {}, 'Dictation'),
      h('p', { class: 'muted' }, 'Play each sentence, type what you hear, then check. You can replay as often as you like. 90% of the words counts as correct.'),
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

  function recorder() {
    let rec = null, stream = null, chunks = [];
    const status = h('span', { class: 'muted' }, 'Record yourself, then listen back and assess.');
    const audio = h('audio', { controls: true, style: 'display:none;max-width:100%' });
    const dl = h('a', { class: 'btn small ghost', style: 'display:none', download: 'my-recording.webm' }, 'Download');
    const btn = h('button', { class: 'btn small', onclick: toggle }, '● Record');
    async function toggle() {
      if (rec && rec.state === 'recording') { rec.stop(); return; }
      if (!navigator.mediaDevices || !window.MediaRecorder) { status.textContent = 'Recording is not available in this browser or context (it needs localhost or https).'; return; }
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        chunks = []; rec = new MediaRecorder(stream);
        rec.ondataavailable = (e) => chunks.push(e.data);
        rec.onstop = () => {
          stream.getTracks().forEach((t) => t.stop());
          const url = URL.createObjectURL(new Blob(chunks, { type: rec.mimeType || 'audio/webm' }));
          audio.src = url; audio.style.display = ''; dl.href = url; dl.style.display = '';
          btn.textContent = '● Record again'; status.textContent = 'Listen back: where did you hesitate, repeat words or make grammar slips?';
        };
        rec.start(); btn.textContent = '■ Stop'; status.textContent = 'Recording… speak now.';
      } catch (e) { status.textContent = 'Microphone not available: ' + (e.name === 'NotAllowedError' ? 'permission was denied.' : e.message); }
    }
    A.cleanup.push(() => { if (rec && rec.state === 'recording') rec.stop(); if (stream) stream.getTracks().forEach((t) => t.stop()); });
    return h('div', { class: 'recorder' }, h('div', { class: 'row' }, btn, status, dl), audio,
      h('p', { class: 'muted', style: 'font-size:.85rem;margin:4px 0 0' }, 'Recordings stay in this page only and are lost when you leave it, unless you download them.'));
  }

  const speakBtn = (text, label) => h('button', { class: 'btn small ghost', onclick: () => Speech.say(text, 0.95) }, label || '▶ Hear it');

  /* =====================================================================
     SPEAKING
     ===================================================================== */
  function speakingList() {
    const S = (C1.speaking || {}).sets || [];
    view(back('#/skills', 'Skills'), h('h1', {}, 'Speaking'),
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
    const crit = (S.guide && S.guide.criteria) || [];
    const prev = Store.skill('speaking:' + id) || {};
    const ratings = Object.assign({}, prev.self || {});
    const body = h('div');
    const tabs = h('div', { class: 'tabs', role: 'tablist' });
    let cur = 1;
    function show(n) {
      cur = n; A.cleanup.splice(0).forEach((f) => f());
      tabs.replaceChildren(...[1, 2, 3, 4].map((k) => h('button', { class: 'tab' + (k === cur ? ' on' : ''), role: 'tab', onclick: () => show(k) }, 'Part ' + k)));
      body.replaceChildren(panels[n](), recorder());
    }
    const selfBox = cardBlock('Self-assessment', h('p', { class: 'muted' }, 'After listening back, rate yourself honestly: 1 = needs a lot of work, 5 = confident at C1.'),
      ...crit.map((c) => h('div', { class: 'trow' }, h('span', {}, c.name), h('div', { class: 'row' }, [1, 2, 3, 4, 5].map((v) => {
        const b = h('button', { class: 'btn small' + (ratings[c.name] === v ? '' : ' ghost'), onclick: () => { ratings[c.name] = v; Store.setSkill('speaking:' + id, { self: ratings }); selfBox.querySelectorAll(`[data-c="${c.name}"]`).forEach((x) => x.classList.add('ghost')); b.classList.remove('ghost'); } }, String(v));
        b.dataset.c = c.name; return b;
      })), h('span'))),
      h('button', { class: 'btn', onclick: () => { Store.setSkill('speaking:' + id, { done: true, self: ratings }); toast('Set marked as done'); } }, 'Mark this set as done'));
    const uf = A.unitFooter('speaking', id);
    view(A.unitBack() || back('#/skills/speaking', 'Speaking'), h('h1', {}, set.title), tabs, body, selfBox,
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
    view(back('#/skills', 'Skills'), h('h1', {}, 'Writing'),
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
    const analysis = h('div'), modelBox = h('div');
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
        ...t.model.map((p, i) => h('div', {}, h('div', { class: 'modelp', html: p }), notes.filter((n) => n.para === i).map((n) => h('div', { class: 'annot', html: '💡 ' + n.text })))),
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
        h('button', { class: 'btn ghost', onclick: () => { Store.addNote({ title: t.title + ' (draft)', text: area.value, tag: 'Writing', href: '#/skills/writing/' + id }); toast('Draft saved to notebook'); } }, 'Save draft to notebook')));

    timerBox = timer((t.minutes || 45) * 60, 'Exam time');
    const uf = A.unitFooter('writing', id);
    view(A.unitBack() || back('#/skills/writing', 'Writing'), h('div', {}, h('span', { class: 'tag' }, t.genre[0].toUpperCase() + t.genre.slice(1)), h('span', { class: 'tag' }, `${t.min}–${t.max} words`)),
      h('h1', {}, t.title), h('div', { class: 'card' }, h('div', { html: t.prompt }), t.points && t.points.length ? h('ul', {}, t.points.map((p) => h('li', { html: p }))) : null),
      h('div', { class: 'grid' },
        h('details', { class: 'card' }, h('summary', {}, 'Plan your answer'), h('ol', {}, t.plan.map((p) => h('li', { html: p })))),
        h('details', { class: 'card' }, h('summary', {}, 'Useful language'), t.language.map((g) => h('div', {}, h('strong', {}, g.h), h('ul', {}, g.items.map((i) => h('li', {}, i))))))),
      timerBox, area, h('div', { class: 'row', style: 'justify-content:space-between' }, counter, savedMsg),
      h('div', { class: 'row', style: 'margin:10px 0' }, h('button', { class: 'btn', onclick: runAnalysis }, 'Analyse my text'), h('button', { class: 'btn ghost', onclick: showModel }, 'Show model answer')),
      analysis, modelBox, selfBox,
      uf || h('div', { class: 'pager' }, link('#/skills/writing', 'All tasks', 'btn ghost small'), link('#/skills/writing/guide', 'Guide', 'btn ghost small')));
    paint();
  }

  /* ---------- routes ---------- */
  A.routes.mistakes = (b) => (b === 'practice' ? mistakePractice() : mistakes());
  A.routes.notebook = () => notebook();
  A.routes.skills = (b, c) => {
    if (!b) return skillsHome();
    if (b === 'listening') return c ? listeningSet(c) : listeningList();
    if (b === 'dictation') return dictation();
    if (b === 'speaking') return c === 'guide' ? speakingGuide() : c ? speakingSet(c) : speakingList();
    if (b === 'writing') return c === 'guide' ? writingGuide() : c ? writingTask(c) : writingList();
    return notFound();
  };
  setupQuickNote();
})();
