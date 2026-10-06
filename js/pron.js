/* C1 Path – pronunciation lab: listen to a model sentence, say it, and see which words a speech recogniser did not understand. */
(function () {
  const { h, Speech, diffWords } = Engine;
  const A = window.App;
  const { view, back, link, cardBlock } = A;
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  A.topicLabels.pron = 'Pronunciation lab';

  function sentence(text, group) {
    const out = h('div'), mine = h('audio', { controls: true, style: 'display:none;max-width:100%;margin-top:6px' });
    const say = h('button', { class: 'btn small ghost', type: 'button', onclick: () => Speech.say(text, 0.9) }, '▶ Listen');
    const slow = h('button', { class: 'btn small ghost', type: 'button', onclick: () => Speech.say(text, 0.7) }, '▶ Slowly');
    let recog = null, stream = null, rec = null, chunks = [];
    const btn = h('button', { class: 'btn small', type: 'button' }, '● Say it');
    const finish = () => { btn.disabled = false; btn.textContent = '● Say it'; if (stream) { stream.getTracks().forEach((t) => t.stop()); stream = null; } };
    btn.addEventListener('click', async () => {
      if (!SR) { out.replaceChildren(h('p', { class: 'muted' }, 'This browser has no speech recognition. Try Chrome or Edge. You can still listen and record yourself with your own device.')); return; }
      Speech.stop(); btn.disabled = true; btn.textContent = 'Listening…'; out.replaceChildren(); mine.style.display = 'none';
      try { stream = await navigator.mediaDevices.getUserMedia({ audio: true }); chunks = []; rec = new MediaRecorder(stream); rec.ondataavailable = (e) => chunks.push(e.data); rec.onstop = () => { mine.src = URL.createObjectURL(new Blob(chunks, { type: rec.mimeType || 'audio/webm' })); mine.style.display = ''; }; rec.start(); } catch (e) { out.replaceChildren(h('p', { class: 'muted' }, 'The microphone is not available: allow it in your browser.')); return finish(); }
      recog = new SR(); recog.lang = 'en-GB'; recog.interimResults = false; recog.maxAlternatives = 1;
      recog.onresult = (e) => {
        const r = e.results[0][0], d = diffWords(text, r.transcript), ok = d.acc >= 0.9;
        const missed = (d.html.match(/class="dmiss">([^<]+)</g) || []).map((m) => m.replace(/.*>/, '').replace('<', ''));
        Store.record('pron', ok ? 1 : 0, 1); Store.setSkill('pron:' + group, { done: true });
        out.replaceChildren(h('div', { class: 'fb' + (ok ? ' good' : ''), html: `<b>${ok ? 'Clear: every word was understood.' : Math.round(d.acc * 100) + '% of the words were understood.'}</b> The recogniser heard: <br>${d.html}` + (missed.length ? `<br>Not heard: <b>${missed.join(', ')}</b>. Listen to the model again and exaggerate those sounds.` : '') + (r.confidence && r.confidence < 0.75 ? '<br>It understood you, but with low confidence: aim for clearer sounds.' : '') }));
      };
      recog.onerror = (e) => out.replaceChildren(h('p', { class: 'muted' }, e.error === 'no-speech' ? 'Nothing was heard. Try again, closer to the microphone.' : 'Recognition stopped (' + e.error + ').'));
      recog.onend = () => { if (rec && rec.state === 'recording') rec.stop(); finish(); };
      try { recog.start(); } catch (e) { finish(); }
    });
    A.cleanup.push(() => { try { recog && recog.abort(); } catch (e) { /* ignore */ } if (stream) stream.getTracks().forEach((t) => t.stop()); });
    return h('div', { class: 'item' }, h('p', { class: 'q' }, text), h('div', { class: 'row' }, say, slow, btn), mine, out);
  }

  A.routes.pronunciation = (id) => {
    const groups = C1.pron || [];
    const g = groups.find((x) => x.id === id);
    if (!g) {
      return view(back('#/skills/speaking', 'Speaking'), h('h1', {}, A.icon('speaking'), 'Pronunciation lab'),
        h('p', { class: 'lead' }, 'Listen to a model sentence, say it, and see which words a speech recogniser did not understand. It is not a teacher: it tells you whether a computer understood you, not whether you sound native. Words it misses are the ones to practise.'),
        A.neuralHint ? A.neuralHint() : null,
        h('div', { class: 'grid' }, groups.map((x) => h('a', { class: 'card', href: '#/skills/pronunciation/' + x.id }, h('h3', { style: 'margin:0 0 .2em' }, x.title), h('p', { class: 'muted', style: 'margin:0' }, x.items.length + ' sentences')))));
    }
    view(back('#/skills/pronunciation', 'Pronunciation lab'), h('h1', {}, g.title),
      h('div', { class: 'callout', html: '<strong>The trick. </strong>' + g.tip }),
      !SR ? h('div', { class: 'callout bad' }, 'This browser has no speech recognition, so you can listen but not get feedback. Chrome or Edge work.') : null,
      ...g.items.map((t) => sentence(t, g.id)),
      h('p', { class: 'muted' }, 'Tip: use headphones so the model sentence is not picked up by the microphone.'));
  };
})();
