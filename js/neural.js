/* C1 Path – optional neural voices that run in the browser (Kokoro, Apache-2.0, via kokoro-js).
   Off by default. When the learner turns it on, the library (jsDelivr) and the model (Hugging Face, about 90 MB) are downloaded once
   and kept by the browser; the text is spoken on the learner's own device and never sent anywhere. Used by dictation and by any
   listening without a recording, such as AI-generated ones. */
(function () {
  const { h, Speech } = Engine;
  const A = window.App;
  const KEY = 'c1path.neural';
  const LIB = 'https://cdn.jsdelivr.net/npm/kokoro-js@1.2.1/+esm', MODEL = 'onnx-community/Kokoro-82M-v1.0-ONNX';
  const VOICES = ['bf_emma', 'bm_george', 'bf_isabella', 'bm_lewis'];
  const flag = () => { try { return localStorage.getItem(KEY) === '1'; } catch (e) { return false; } };
  const setFlag = (v) => { try { if (v) localStorage.setItem(KEY, '1'); else localStorage.removeItem(KEY); } catch (e) { /* ignore */ } };

  let loading = null, tok = 0, audio = null;
  const cache = new Map();
  const busy = h('div', { class: 'toast', role: 'status' }, 'Preparing the voice…');
  document.body.append(busy);
  const showBusy = (on) => busy.classList.toggle('show', on);

  function load(onProgress) {
    if (!loading) {
      loading = import(LIB).then((m) => m.KokoroTTS.from_pretrained(MODEL, { dtype: 'q8', device: 'wasm', progress_callback: onProgress || (() => {}) }))
        .catch((e) => { loading = null; throw e; });
    }
    return loading;
  }
  async function clip(text, voice, speed) {
    const k = voice + '|' + speed + '|' + text;
    if (!cache.has(k)) cache.set(k, load().then((tts) => tts.generate(text, { voice, speed })).then((a) => URL.createObjectURL(a.toBlob())));
    return cache.get(k);
  }
  function stop() { tok++; if (audio) { audio.pause(); audio = null; } showBusy(false); }
  const played = (url) => new Promise((res, rej) => { audio = new Audio(url); audio.onended = res; audio.onerror = rej; audio.play().catch(rej); });

  async function play(segments, o) {
    const my = ++tok, speakers = [], speed = o.rate || 1;
    if (audio) { audio.pause(); audio = null; }
    const voiceOf = (who) => { let k = speakers.indexOf(who || ''); if (k < 0) { speakers.push(who || ''); k = speakers.length - 1; } return VOICES[k % VOICES.length]; };
    const voices = segments.map((s) => voiceOf(s.who));
    try {
      let next = clip(segments[0].text, voices[0], speed);
      for (let i = 0; i < segments.length; i++) {
        const t = setTimeout(() => my === tok && showBusy(true), 300);
        const url = await next; clearTimeout(t); showBusy(false);
        if (my !== tok) return;
        next = i + 1 < segments.length ? clip(segments[i + 1].text, voices[i + 1], speed) : null;
        o.onSegment && o.onSegment(i);
        await played(url);
        if (my !== tok) return;
        if (next) await new Promise((r) => setTimeout(r, 200));
      }
      o.onEnd && o.onEnd(true);
    } catch (e) {
      showBusy(false);
      if (my !== tok) return;
      setFlag(false); // the model could not run here: go back to the browser voices
      Speech.play(segments, Object.assign({}, o, { browser: true }));
    }
  }
  Speech.neural = { active: flag, play, stop };

  /* ---------- Review card and hint ---------- */
  A.neuralHint = () => (flag() ? null : h('p', { class: 'muted' }, 'Do the voices sound robotic? ', h('a', { href: '#/progress' }, 'Turn on neural voices'), ' (a one-time download of about 90 MB).'));
  A.neuralCard = () => {
    const status = h('p', { class: 'muted', role: 'status' }), bar = h('progress', { max: 100, value: 0, style: 'width:100%;display:none' });
    const btn = h('button', { class: 'btn small', type: 'button' });
    const draw = () => { btn.textContent = flag() ? 'Turn off' : 'Turn on neural voices'; btn.className = 'btn small' + (flag() ? ' ghost' : ''); };
    btn.addEventListener('click', async () => {
      if (flag()) { setFlag(false); stop(); status.textContent = 'Back to your browser\'s voices.'; return draw(); }
      btn.disabled = true; bar.style.display = ''; const files = {};
      status.textContent = 'Downloading the voice (about 90 MB, only the first time)…';
      try {
        await load((p) => { if (p && p.file && p.total) { files[p.file] = [p.loaded, p.total]; const v = Object.values(files); bar.value = (100 * v.reduce((a, x) => a + x[0], 0)) / v.reduce((a, x) => a + x[1], 0); } });
        setFlag(true); status.textContent = 'Ready. Dictation and listenings without a recording now use it.';
      } catch (e) { status.textContent = 'The download failed. Check your connection and try again.'; }
      bar.style.display = 'none'; btn.disabled = false; draw();
    });
    draw();
    return A.cardBlock('Better voices', h('p', { class: 'muted' }, 'Dictation and AI-generated listenings use your browser\'s voices, which can sound robotic. You can switch on a neural voice that runs on your own device. It downloads about 90 MB once (from jsDelivr and Hugging Face), then works from your browser\'s cache. Your text is never sent anywhere. It is slower than the browser voices: each sentence takes a moment to prepare.'),
      h('div', { class: 'row' }, btn), bar, status);
  };
})();
