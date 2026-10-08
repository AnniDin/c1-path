/* C1 Path – optional feedback sounds. Off by default. Short tones made with the Web Audio API (no audio files),
   played after checking answers and when an achievement, level or daily quest is earned. */
(function () {
  const { h } = Engine;
  const KEY = 'c1path.sound';
  const on = () => { try { return localStorage.getItem(KEY) === '1'; } catch (e) { return false; } };
  const set = (v) => { try { if (v) localStorage.setItem(KEY, '1'); else localStorage.removeItem(KEY); } catch (e) { /* ignore */ } };
  let ctx = null;
  /* notes: [frequency in Hz, start, length] in seconds */
  const TUNES = {
    right: [[659, 0, .12], [880, .11, .22]],
    ok: [[523, 0, .14], [587, .13, .2]],
    wrong: [[330, 0, .16], [262, .15, .28]],
    win: [[523, 0, .12], [659, .11, .12], [784, .22, .12], [1047, .33, .35]]
  };
  function play(name) {
    if (!on() || !TUNES[name]) return;
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      if (ctx.state === 'suspended') ctx.resume();
      const t0 = ctx.currentTime + .02;
      TUNES[name].forEach(([f, at, len]) => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.type = 'sine'; o.frequency.value = f;
        g.gain.setValueAtTime(0, t0 + at); g.gain.linearRampToValueAtTime(.16, t0 + at + .02); g.gain.exponentialRampToValueAtTime(.0001, t0 + at + len);
        o.connect(g); g.connect(ctx.destination); o.start(t0 + at); o.stop(t0 + at + len + .02);
      });
    } catch (e) { /* no audio available: stay silent */ }
  }
  const card = () => {
    const box = h('input', { type: 'checkbox', id: 'snd', checked: on() });
    box.addEventListener('change', () => { set(box.checked); if (box.checked) play('win'); });
    return window.App.cardBlock('Feedback sounds',
      h('p', { class: 'muted' }, 'Short tones after you check an exercise and when you earn an achievement or finish a daily quest. Off by default.'),
      h('label', { class: 'row', for: 'snd' }, box, ' Play feedback sounds'));
  };
  window.Sound = { play, on, card };
})();
