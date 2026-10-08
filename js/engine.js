/* Exercise engine: renders items, checks answers, gives explanatory feedback, text-to-speech. */
(function () {
  function h(tag, attrs, ...kids) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (k === 'class') el.className = v;
      else if (k === 'html') el.innerHTML = v;
      else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
      else if (v !== false && v != null) el.setAttribute(k, v === true ? '' : v);
    }
    for (const kid of kids.flat(Infinity)) if (kid != null && kid !== false) el.append(kid.nodeType ? kid : document.createTextNode(kid));
    return el;
  }
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  /* Normalise for comparison: case, spacing, punctuation and contractions. */
  function norm(s) {
    return String(s).toLowerCase().replace(/[’‘]/g, "'").trim()
      .replace(/\bwon't\b/g, 'will not').replace(/\bcan't\b/g, 'can not').replace(/\bcannot\b/g, 'can not')
      .replace(/n't\b/g, ' not').replace(/'ll\b/g, ' will').replace(/'re\b/g, ' are')
      .replace(/'ve\b/g, ' have').replace(/'m\b/g, ' am')
      .replace(/[.,;:!?"]/g, '').replace(/\s+/g, ' ').trim();
  }
  const matches = (given, answers) => { const g = norm(given); return g !== '' && answers.some((a) => norm(a) === g); };

  function feedback(ok, expected, why) {
    const exp = ok ? '' : `<b>Answer:</b> ${expected.join(' / ')}. `;
    return h('div', { class: 'fb' + (ok ? ' good' : ''), html: (ok ? '<b>Correct.</b> ' : exp) + (why || '') });
  }

  /* ---------- text-to-speech (browser voices; no audio files needed) ---------- */
  const Speech = (() => {
    const supported = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
    let token = 0;
    /* English voices, best first: neural/natural voices, then British ones. */
    function allVoices() {
      const score = (v) => (/natural|neural|online|premium|enhanced/i.test(v.name) ? 5 : /google/i.test(v.name) ? 3 : 0) + (/en[-_]GB/i.test(v.lang) ? 2 : 0) + (/en[-_]US|en[-_]AU|en[-_]IE/i.test(v.lang) ? 1 : 0);
      return speechSynthesis.getVoices().filter((v) => /^en/i.test(v.lang)).map((v, i) => [v, i]).sort((a, b) => score(b[0]) - score(a[0]) || a[1] - b[1]).map((x) => x[0]);
    }
    const GOOD = /natural|neural|online|premium|enhanced|google/i;
    function voicesNow() {
      const vs = allVoices(), good = vs.filter((v) => GOOD.test(v.name)), gb = vs.filter((v) => /en[-_]GB/i.test(v.lang));
      if (good.length >= 2) return good; // natural voices first, whatever the accent
      return gb.length >= 2 ? gb : vs;
    }
    /* true when the browser has at least one natural-sounding English voice installed */
    const hasGoodVoice = () => supported && speechSynthesis.getVoices().some((v) => /^en/i.test(v.lang) && GOOD.test(v.name));
    const pref = (slot) => ((window.Store && Store.state.voices) || {})[slot] || '';
    function listVoices(cb) { ready(() => cb(allVoices())); }
    function ready(cb) {
      if (!supported) return;
      if (speechSynthesis.getVoices().length) return cb();
      let called = false;
      const go = () => { if (!called) { called = true; cb(); } };
      speechSynthesis.addEventListener('voiceschanged', go, { once: true });
      setTimeout(go, 400);
    }
    function stop() { token++; if (supported) speechSynthesis.cancel(); if (api.neural) api.neural.stop(); }
    /* segments: [{who, text}]. Distinct speakers get distinct voices, or distinct pitch when only one voice exists. */
    function play(segments, o) {
      o = o || {};
      if (api.neural && api.neural.active() && !o.browser) { stop(); return api.neural.play(segments, o); }
      if (!supported) { o.onEnd && o.onEnd(false); return; }
      stop();
      const my = token;
      ready(() => {
        const vs = voicesNow(), speakers = [];
        let i = 0;
        const next = () => {
          if (my !== token) return;
          if (i >= segments.length) { o.onEnd && o.onEnd(true); return; }
          const seg = segments[i++];
          let k = speakers.indexOf(seg.who || ''); if (k < 0) { speakers.push(seg.who || ''); k = speakers.length - 1; }
          const u = new SpeechSynthesisUtterance(seg.text);
          u.lang = 'en-GB';
          const chosen = k < 2 ? speechSynthesis.getVoices().find((v) => v.name === pref(k === 0 ? 'a' : 'b')) : null;
          if (chosen) u.voice = chosen; else if (vs.length) u.voice = vs[k % vs.length];
          u.rate = o.rate || 1;
          const sameVoice = k > 0 && (chosen ? chosen === speechSynthesis.getVoices().find((v) => v.name === pref('a')) : vs.length < 2 || speakers.length > vs.length);
          if (sameVoice) u.pitch = [1, 0.82, 1.15][k % 3];
          u.onend = () => setTimeout(next, 250);
          u.onerror = () => { if (my === token) o.onEnd && o.onEnd(false); };
          o.onSegment && o.onSegment(i - 1);
          speechSynthesis.speak(u);
        };
        next();
      });
    }
    const api = { supported, play, stop, listVoices, ready, hasGoodVoice, neural: null, say: (text, rate, onEnd) => play([{ who: '', text }], { rate, onEnd }) };
    return api;
  })();

  /* Word-level comparison of what was typed against a target text. */
  function diffWords(targetText, typedText) {
    const words = (s) => s.replace(/[’]/g, "'").split(/\s+/).filter(Boolean);
    const key = (w) => w.toLowerCase().replace(/[^a-z0-9']/g, '');
    const t = words(targetText), g = words(typedText);
    const L = Array.from({ length: t.length + 1 }, () => new Array(g.length + 1).fill(0));
    for (let i = t.length - 1; i >= 0; i--) for (let j = g.length - 1; j >= 0; j--)
      L[i][j] = key(t[i]) === key(g[j]) ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
    const parts = []; let i = 0, j = 0;
    while (i < t.length || j < g.length) {
      if (i < t.length && j < g.length && key(t[i]) === key(g[j])) { parts.push(`<span class="dok">${t[i]}</span>`); i++; j++; }
      else if (j < g.length && (i >= t.length || L[i][j + 1] >= L[i + 1][j])) { parts.push(`<s class="dextra">${g[j]}</s>`); j++; }
      else { parts.push(`<span class="dmiss">${t[i]}</span>`); i++; }
    }
    return { html: parts.join(' '), acc: L[0][0] / Math.max(t.length, g.length, 1) };
  }

  /* A standalone sentence (plus neighbours for sentence-sized options) for a passage gap, so it can be practised alone later. */
  function gapContext(text, idx, wide) {
    const sentences = text.split(/(?<=[.!?])\s+/);
    const k = sentences.findIndex((s) => s.includes('{' + idx + '}'));
    const parts = wide ? [sentences[k - 1], sentences[k], sentences[k + 1]] : [sentences[k]];
    return parts.filter(Boolean).join(' ').replace(new RegExp('\\{' + idx + '\\}'), '___').replace(/\{\d+\}/g, '…');
  }
  function gapItem(item, i) {
    const g = item.gaps[i], q = gapContext(item.text, i + 1, item.mode === 'mcq');
    if (item.mode === 'mcq') return { type: 'mcq', q, options: g.options, answer: g.answer, why: g.why };
    const hint = item.mode === 'wf' ? ` <span class="muted">(${g.base.toUpperCase()})</span>` : '';
    return { type: 'gap', q: q.replace('___', '___' + hint), answers: g.answers, why: g.why };
  }

  /* Each renderer returns { el, check() -> [{ ok, given, item }] }. `item` is a standalone, re-askable question. */
  const R = {
    mcq(item, n) {
      const name = 'q' + Math.random().toString(36).slice(2);
      const perm = shuffle(item.options.map((_, i) => i));
      const opts = perm.map((orig) =>
        h('label', { class: 'opt' }, h('input', { type: 'radio', name, value: orig }), h('span', { html: item.options[orig] })));
      const box = h('div', { class: 'opts', role: 'radiogroup' }, opts);
      const el = h('div', { class: 'item' }, h('p', { class: 'q' }, h('span', { class: 'num' }, n + '.'), h('span', { html: item.q })), box);
      return {
        el, check() {
          const sel = box.querySelector('input:checked');
          const ok = !!sel && +sel.value === item.answer;
          opts.forEach((o, pos) => {
            o.classList.toggle('right', perm[pos] === item.answer);
            o.classList.toggle('wrong', !!sel && +sel.value === perm[pos] && perm[pos] !== item.answer);
          });
          el.querySelector('.fb')?.remove();
          el.append(feedback(ok, [item.options[item.answer]], item.why));
          return [{ ok, given: sel ? item.options[+sel.value] : '', item }];
        }
      };
    },
    gap(item, n) {
      const input = h('input', { type: 'text', autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false', 'aria-label': 'Answer ' + n });
      const parts = item.q.split('___');
      const q = h('p', { class: 'q' }, h('span', { class: 'num' }, n + '.'), h('span', { html: parts[0] }), input, h('span', { html: parts[1] || '' }));
      const el = h('div', { class: 'item' }, q);
      return {
        el, check() {
          const ok = matches(input.value, item.answers);
          input.classList.toggle('right', ok); input.classList.toggle('wrong', !ok);
          el.querySelector('.fb')?.remove();
          el.append(feedback(ok, item.answers.slice(0, 2), item.why));
          return [{ ok, given: input.value.trim(), item }];
        }
      };
    },
    kwt(item, n) {
      const input = h('input', { type: 'text', class: 'wide', autocomplete: 'off', spellcheck: 'false', 'aria-label': 'Answer ' + n });
      const [a, b] = item.second.split('___');
      const el = h('div', { class: 'item' },
        h('p', { class: 'q' }, h('span', { class: 'num' }, n + '.'), h('span', { html: item.first })),
        h('p', {}, h('span', { class: 'keyword' }, item.key.toUpperCase())),
        h('p', {}, h('span', { html: a }), input, h('span', { html: b || '' })),
        h('p', { class: 'muted' }, 'Use between two and five words, including the key word. Do not change it.'));
      return {
        el, check() {
          const ok = matches(input.value, item.answers);
          input.classList.toggle('right', ok); input.classList.toggle('wrong', !ok);
          el.querySelector('.fb')?.remove();
          el.append(feedback(ok, item.answers.slice(0, 2), item.why));
          return [{ ok, given: input.value.trim(), item }];
        }
      };
    },
    text(item) {
      const el = h('div', { class: 'card readtext' }, item.title ? h('h3', { style: 'margin-top:0' }, item.title) : null,
        item.paras.map((p, i) => h('p', { html: (item.numbered === false ? '' : `<span class="pnum">${i + 1}</span>`) + p })));
      return { el, check: () => [] };
    },
    /* Listening player: item = { title, intro, script:[{who,text}] } */
    audio(item) {
      let plays = 0;
      const status = h('span', { class: 'muted' }, '');
      const rate = h('select', { 'aria-label': 'Speed' }, [['0.85', 'Slow'], ['1', 'Normal'], ['1.15', 'Fast']].map(([v, t]) => h('option', { value: v, selected: v === '1' }, t)));
      const playBtn = h('button', { class: 'btn small', onclick: play }, '▶ Play');
      const stopBtn = h('button', { class: 'btn small ghost', onclick: () => { Speech.stop(); if (clip) { clip.pause(); clip.currentTime = 0; } setIdle(); } }, '■ Stop');
      const tr = h('details', { class: 'transcript' }, h('summary', {}, 'Transcript (try without it first)'),
        item.script.map((s) => h('p', {}, s.who ? h('strong', {}, s.who + ': ') : null, s.text)));
      function setIdle() { playBtn.disabled = false; status.textContent = plays ? `Played ${plays} time${plays === 1 ? '' : 's'}${plays >= 2 ? ' (the exam plays it twice)' : ''}` : ''; }
      /* Recorded audio (made by tools/make_audio.py) when available; otherwise the browser's own voices. */
      const rec = item.audioId && window.C1 && C1.audio && (C1.audio.listening || {})[item.audioId];
      let clip = null;
      if (rec) {
        clip = new Audio(rec.src); clip.preload = 'none';
        clip.addEventListener('timeupdate', () => {
          let i = 0; while (i + 1 < rec.marks.length && clip.currentTime >= rec.marks[i + 1]) i++;
          status.textContent = `Playing… ${i + 1}/${rec.marks.length}`;
        });
        clip.addEventListener('ended', () => setIdle());
        clip.addEventListener('error', () => { clip = null; status.textContent = 'The recording could not be loaded: using your browser voice instead.'; playBtn.disabled = false; });
        rate.addEventListener('change', () => { if (clip) clip.playbackRate = +rate.value; });
        if (window.App && App.cleanup) App.cleanup.push(() => clip && clip.pause());
      }
      function play() {
        plays++; playBtn.disabled = true;
        if (clip) { clip.playbackRate = +rate.value; clip.currentTime = 0; clip.play().catch(() => { clip = null; plays--; playBtn.disabled = false; play(); }); return; }
        Speech.play(item.script, {
          rate: +rate.value,
          onSegment: (i) => { status.textContent = `Playing… ${i + 1}/${item.script.length}`; },
          onEnd: (ok) => { if (ok === false && !Speech.supported) status.textContent = 'Speech is not available in this browser: read the transcript below.'; else setIdle(); }
        });
      }
      const voiceBox = h('details', { class: 'voices' }, h('summary', {}, 'Voices'));
      if (!rec) Speech.listVoices((vs) => {
        const names = vs.map((v) => v.name), cur = (window.Store && Store.state.voices) || {};
        const mk = (slot, label) => h('label', { class: 'muted' }, label + ' ', h('select', { onchange: (e) => { Store.setVoice(slot, e.target.value); } },
          h('option', { value: '' }, 'Automatic'), vs.map((v) => h('option', { value: v.name, selected: cur[slot] === v.name }, v.name + ' (' + v.lang + ')'))));
        voiceBox.append(h('p', { class: 'muted' }, names.some((n) => /natural|neural|online/i.test(n)) ? 'Natural-sounding voices were found and are used automatically.' : 'Tip: Microsoft Edge offers much more natural voices (names containing "Natural") than most browsers.'),
          h('div', { class: 'row' }, mk('a', 'First speaker'), mk('b', 'Second speaker'), h('button', { class: 'btn small ghost', onclick: () => Speech.play([{ who: 'A', text: 'This is the first voice.' }, { who: 'B', text: 'And this is the second voice.' }], { rate: 1 }) }, 'Test')));
      });
      const el = h('div', { class: 'card audio' },
        item.title ? h('h3', { style: 'margin-top:0' }, item.title) : null, item.intro ? h('p', { class: 'muted', html: item.intro }) : null,
        h('div', { class: 'row' }, playBtn, stopBtn, h('label', { class: 'muted' }, 'Speed ', rate), status),
        !rec && !Speech.supported ? h('p', { class: 'fb' }, 'This browser cannot read text aloud, so use the transcript instead.') : null, rec ? null : voiceBox, tr);
      el.addEventListener('quizchecked', () => { tr.open = true; Speech.stop(); if (clip) clip.pause(); });
      return { el, check: () => [] };
    },
    /* Dictation: item = { text } */
    dictation(item, n) {
      const input = h('textarea', { rows: 2, class: 'wide', spellcheck: 'false', autocomplete: 'off', 'aria-label': 'Type what you hear ' + n });
      const out = h('div');
      const el = h('div', { class: 'item' },
        h('p', { class: 'q' }, h('span', { class: 'num' }, n + '.'), 'Listen and type what you hear.'),
        h('div', { class: 'row' },
          h('button', { class: 'btn small', onclick: () => Speech.say(item.text, 1) }, '▶ Play'),
          h('button', { class: 'btn small ghost', onclick: () => Speech.say(item.text, 0.7) }, '▶ Slowly')),
        input, out);
      return {
        el, check() {
          const d = diffWords(item.text, input.value), acc = d.acc, parts = [d.html];
          const ok = acc >= 0.9;
          out.innerHTML = '';
          out.append(h('div', { class: 'fb' + (ok ? ' good' : ''), html: `<b>${Math.round(acc * 100)}% of the words.</b> Green = correct, red = missed, struck-through = extra.<br>` + parts[0] }));
          return [{ ok, given: input.value.trim(), item: null }];
        }
      };
    },
    passage(item, n) {
      const mode = item.mode; // cloze | wf | mcq
      const ctrls = item.gaps.map((g, i) => {
        if (mode === 'mcq') {
          const sel = h('select', { 'aria-label': 'Gap ' + (i + 1) }, h('option', { value: '' }, '–'), g.options.map((o, k) => h('option', { value: k }, o)));
          return { node: sel, get: () => sel.value, text: () => (sel.value === '' ? '' : g.options[+sel.value]) };
        }
        const inp = h('input', { type: 'text', autocomplete: 'off', spellcheck: 'false', style: 'min-width:120px', 'aria-label': 'Gap ' + (i + 1) });
        return { node: inp, get: () => inp.value, text: () => inp.value.trim() };
      });
      const passage = h('div', { class: 'passage' });
      item.text.split(/(\{\d+\})/).forEach((seg) => {
        const m = seg.match(/^\{(\d+)\}$/);
        if (!m) { passage.append(h('span', { html: seg })); return; }
        const i = +m[1] - 1;
        passage.append(h('span', { class: 'gapnum' }, m[1]), ctrls[i].node);
        if (mode === 'wf') passage.append(h('span', { class: 'muted' }, ' (' + item.gaps[i].base.toUpperCase() + ') '));
      });
      const list = h('div');
      const el = h('div', { class: 'item' }, h('h3', {}, item.title), item.intro ? h('p', { class: 'muted', html: item.intro }) : null, passage, list);
      return {
        el, check() {
          list.innerHTML = '';
          return item.gaps.map((g, i) => {
            const v = ctrls[i].get();
            const ok = mode === 'mcq' ? v !== '' && +v === g.answer : matches(v, g.answers);
            ctrls[i].node.classList.toggle('right', ok); ctrls[i].node.classList.toggle('wrong', !ok);
            const shown = mode === 'mcq' ? [g.options[g.answer]] : g.answers.slice(0, 2);
            const fb = feedback(ok, shown, g.why);
            fb.prepend(h('b', {}, (i + 1) + '. '));
            list.append(fb);
            return { ok, given: ctrls[i].text(), item: gapItem(item, i) };
          });
        }
      };
    }
  };

  /* Renders a set of items with a "Check answers" button; reports the score once per attempt.
     opts: onScore(correct, total, results), onRetry(), source: { topic, label, href } to log mistakes. */
  function quiz(items, opts) {
    opts = opts || {};
    const wrap = h('div');
    const rendered = [];
    let n = 0;
    items.forEach((it) => {
      let r;
      if (it.type === 'text' || it.type === 'audio') r = R[it.type](it);
      else { r = R[it.type](it, ++n); if (it.type === 'passage') n += it.gaps.length - 1; }
      rendered.push(r); wrap.append(r.el);
    });
    const hasQuestions = n > 0;
    const result = h('div', { class: 'card', style: 'display:none', role: 'status', 'aria-live': 'polite' });
    const btn = h('button', { class: 'btn', onclick: check }, 'Check answers');
    const again = h('button', { class: 'btn ghost', onclick: () => opts.onRetry && opts.onRetry() }, 'Try again');
    let done = false;
    function check() {
      const res = rendered.flatMap((r) => r.check());
      if (!res.length) return;
      const correct = res.filter((x) => x.ok).length;
      if (!done) {
        done = true;
        if (opts.source && window.Store && Store.logResults) Store.logResults(res, opts.source);
        opts.onScore && opts.onScore(correct, res.length, res);
        if (window.App && App.afterQuiz) { try { App.afterQuiz(res, opts.source || {}, Math.round((100 * correct) / res.length)); } catch (e) { /* diagnosis is optional */ } }
      }
      rendered.forEach((r) => r.el.dispatchEvent(new CustomEvent('quizchecked')));
      const pct = Math.round((100 * correct) / res.length);
      const wrong = res.length - correct;
      result.style.display = '';
      result.innerHTML = '';
      result.append(...[h('div', { class: 'score' }, `${correct} / ${res.length}  (${pct}%)`),
        h('p', { class: 'muted' }, pct >= 80 ? 'Strong. Read any explanation you missed, then move on.' :
          pct >= 50 ? 'Good progress. Read the explanations: they tell you why, not just what.' :
            'This topic needs another look. Re-read the lesson idea, then try again.'),
        window.App && App.recommend ? App.recommend(opts.source, pct, res) : null,
        wrong && opts.source ? h('p', { class: 'muted' }, `${wrong} mistake${wrong === 1 ? '' : 's'} saved. `, h('a', { href: '#/mistakes' }, 'Review them with explanations')) : null,
        h('div', { class: 'row' }, again)].filter(Boolean));
      result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    if (hasQuestions) wrap.append(h('div', { class: 'row', style: 'margin-top:14px' }, btn), result);
    return wrap;
  }

  window.Engine = { h, quiz, norm, matches, Speech, shuffle, diffWords, gapItem };
})();
