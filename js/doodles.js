/* C1 Path – margin doodles: small hand-drawn scenes beside the page titles, like sketches in an exam notebook. Pica, the magpie, is in every one.
   window.Doodle('name', 'inline') returns a decorative span (hidden from screen readers). Colours come from CSS (see .doodle in css/style.css),
   so the scenes follow the light and dark themes. */
(function () {
  /* Pica at (x, y), scaled: her own drawing is about 62 x 52 units, facing right. flip mirrors her to face left. */
  const pica = (x, y, s, flip, mood) => {
    const eye = mood === 'happy' ? '<path class="pe" d="M44 20 Q47 16 50 20" fill="none" stroke-width="2"/>' : '<circle class="pw2" cx="47" cy="20" r="3.2"/><circle class="pp" cx="48" cy="20.5" r="1.5"/>';
    const t = flip ? `translate(${x + 64 * s} ${y}) scale(${-s} ${s})` : `translate(${x} ${y}) scale(${s})`;
    return `<g class="pica-d" transform="${t}" stroke-width="${(2.2 / s).toFixed(2)}"><path class="pb" d="M10 46 L1 58 L18 52 Z"/><ellipse class="pb" cx="30" cy="40" rx="20" ry="17"/>`
      + `<path class="pbelly" d="M22 44 Q32 60 46 44 Q38 38 22 44 Z"/><path class="pwing" d="M14 38 Q26 28 40 40 Q26 50 14 38 Z"/><circle class="pb" cx="44" cy="22" r="13"/>`
      + `<path class="pk" d="M54 20 L63 24 L54 28 Z"/>${eye}<path class="pb-line" d="M38 11 Q42 6 47 9" fill="none" stroke-width="3"/></g>`;
  };
  const SPARK = (x, y, r) => `<path class="acc" fill="none" d="M${x} ${y - r} V${y + r} M${x - r} ${y} H${x + r}"/>`;
  const D = {
    /* a notebook with a pencil, Pica perched on its corner */
    home: () => `<path class="swash" d="M10 72 Q50 84 110 66 Q112 74 100 78 Q50 90 12 80Z"/>
      <rect class="paper" x="24" y="38" width="62" height="42" rx="2"/><path class="line" d="M34 52 H76 M34 61 H76 M34 70 H62"/><path class="line" d="M24 44 h-4 M24 54 h-4 M24 64 h-4 M24 74 h-4"/>
      <path class="pencil" d="M78 64 L94 30 L102 34 L86 68 Z"/><path class="tip" d="M78 64 L86 68 L76 74 Z"/><path class="line" d="M94 30 L102 34"/>
      ${pica(30, 4, 0.62, false, 'happy')}${SPARK(108, 14, 5)}${SPARK(14, 24, 3)}`,
    /* a winding path to a flag, Pica setting out */
    course: () => `<path class="swash" d="M8 70 Q60 82 112 62 Q114 70 104 74 Q58 90 10 80Z"/>
      <path class="dash" d="M18 74 C40 74 34 56 58 56 C82 56 70 38 96 36"/><circle class="acc-fill" cx="18" cy="74" r="3.5"/>
      <path class="line" d="M98 36 V10"/><path class="flag" d="M98 10 L116 16 L98 24 Z"/>
      ${pica(2, 44, 0.5, false)}${SPARK(70, 14, 4)}`,
    /* an open book, Pica reading from the top edge */
    study: () => `<path class="swash" d="M10 76 Q60 88 112 72 Q114 80 100 84 Q58 94 12 86Z"/>
      <path class="paper" d="M60 38 C46 30 28 30 14 36 V76 C28 70 46 70 60 78 C74 70 92 70 106 76 V36 C92 30 74 30 60 38Z"/><path class="line" d="M60 38 V78"/>
      <path class="line" d="M24 46 q16 -3 30 2 M24 56 q16 -3 30 2 M24 66 q16 -3 30 2 M68 48 q14 -5 30 -2 M68 58 q14 -5 30 -2"/>
      ${pica(52, 2, 0.58, true, 'happy')}${SPARK(108, 20, 5)}`,
    /* bars that grow, Pica on the tallest */
    progress: () => `<path class="line" d="M10 80 H112"/>
      <rect class="col" x="18" y="58" width="20" height="22"/><rect class="col" x="46" y="44" width="20" height="36"/><rect class="col hi" x="74" y="26" width="20" height="54"/>
      <path class="acc" fill="none" d="M20 48 Q44 42 60 26"/><path class="acc" fill="none" d="M52 24 L61 25 L60 34"/>
      ${pica(68, -3, 0.5, false)}${SPARK(108, 40, 4)}`,
    /* a test paper with a tick, a stopwatch, Pica checking it */
    exams: () => `<path class="swash" d="M10 76 Q60 88 112 72 Q114 80 100 84 Q58 94 12 86Z"/>
      <path class="paper" d="M22 24 H64 L76 36 V80 H22 Z"/><path class="line" d="M64 24 V36 H76"/><path class="line" d="M30 46 H66 M30 55 H66 M30 64 H50"/>
      <path class="tick" d="M52 66 L60 74 L84 44"/>
      <circle class="paper" cx="98" cy="62" r="13"/><path class="line" d="M98 62 V54 M98 62 L104 66 M94 46 H102 M98 46 V49"/>
      ${pica(26, -1, 0.44, false)}`,
    /* Pica framed like a profile picture */
    account: () => `<circle class="paper" cx="60" cy="46" r="34"/><circle class="line" fill="none" cx="60" cy="46" r="40" stroke-dasharray="2 6"/>
      ${pica(38, 25, 0.7, false, 'happy')}${SPARK(106, 14, 5)}${SPARK(12, 20, 4)}`,
    /* nothing here yet: a tidy sheet and Pica ticking it off */
    empty: () => `<path class="paper" d="M30 14 H84 V76 H30 Z"/><path class="line" d="M40 28 H74 M40 38 H74 M40 48 H60"/><path class="tick" d="M56 62 L64 70 L90 40"/>
      ${pica(2, 47, 0.5, false, 'happy')}${SPARK(100, 14, 4)}`,
    /* Pica beside a trophy */
    trophy: () => `<path class="swash" d="M30 78 Q70 88 112 74 Q112 82 100 84 Q60 92 32 86Z"/>
      <path class="gold" d="M62 14 H98 V36 Q98 54 80 54 Q62 54 62 36 Z"/><path class="line" d="M62 20 H50 Q50 38 64 40 M98 20 H110 Q110 38 96 40"/><path class="line" d="M80 54 V68 M66 72 H94"/><path class="line" d="M72 28 l5 5 10 -11"/>
      ${pica(0, 41, 0.55, false, 'happy')}${SPARK(112, 6, 4)}`
  };
  window.Doodle = (name, cls) => {
    const s = document.createElement('span');
    s.className = 'doodle ' + (cls || ''); s.setAttribute('aria-hidden', 'true');
    s.innerHTML = `<svg viewBox="0 0 120 90" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" focusable="false">${(D[name] || (() => ''))()}</svg>`;
    return s;
  };
})();
