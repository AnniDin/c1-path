/* C1 Path – margin doodles: small hand-drawn line drawings beside the page titles, like sketches in an exam notebook.
   window.Doodle('name') returns a decorative span (hidden from screen readers). */
(function () {
  const BLOB = '<path d="M14 40 Q10 18 34 14 Q62 8 80 20 Q92 34 76 56 Q54 66 28 60 Q16 54 14 40Z" fill="#ffe27a" stroke="none" opacity=".75"/>';
  const D = {
    home: '<path d="M22 62 L26 46 L60 12 L72 24 L38 58 Z"/><path d="M26 46 L38 58"/><path d="M60 12 L72 24"/><path d="M50 22 L62 34"/><path d="M12 68 q6 -5 12 0 t12 0 t12 0"/><path d="M82 8 v12 M76 14 h12"/><path d="M84 40 l2 4 M90 34 l4 2"/>',
    course: '<path d="M10 62 C28 62 20 42 40 42 C60 42 50 24 72 24"/><circle cx="10" cy="62" r="3"/><path d="M74 24 V6 L90 12 L74 18"/><path d="M30 66 h2 M46 62 h2 M58 52 h2" stroke-dasharray="1 5"/>',
    study: '<path d="M48 22 C36 14 22 14 10 18 V60 C22 56 36 56 48 64 C60 56 74 56 86 60 V18 C74 14 60 14 48 22Z"/><path d="M48 22 V64"/><path d="M18 28 q10 -3 22 2 M18 38 q10 -3 22 2 M18 48 q10 -3 22 2"/><path d="M60 30 q10 -4 18 -1"/><path d="M80 4 l2 6 6 2 -6 2 -2 6 -2 -6 -6 -2 6 -2Z"/>',
    progress: '<path d="M8 64 H88 M8 64 V10"/><path d="M18 64 V50 H32 V64 M40 64 V38 H54 V64 M62 64 V26 H76 V64"/><path d="M16 38 q20 -2 36 -18 t30 -12"/><path d="M72 6 L84 8 L82 20"/>',
    exams: '<path d="M18 8 H64 L76 20 V66 H18 Z"/><path d="M64 8 V20 H76"/><path d="M26 30 H56 M26 40 H66 M26 50 H48"/><path d="M52 56 L60 64 L82 38" stroke-width="3.5"/><circle cx="84" cy="14" r="8"/><path d="M84 9 V14 L88 16"/>',
    empty: '<path d="M22 10 H70 V64 H22 Z"/><path d="M30 22 H62 M30 32 H62 M30 42 H50"/><path d="M48 54 L56 62 L78 36" stroke-width="3.5"/><path d="M14 14 v8 M10 18 h8"/>',
    trophy: '<path d="M30 10 H66 V32 Q66 50 48 50 Q30 50 30 32 Z"/><path d="M30 16 H18 Q18 34 32 36 M66 16 H78 Q78 34 64 36"/><path d="M48 50 V60 M34 64 H62"/><path d="M40 24 l4 4 8 -9"/><path d="M84 8 v10 M79 13 h10"/>',
    account: '<circle cx="48" cy="38" r="26"/><circle cx="38" cy="32" r="2.5" fill="currentColor"/><circle cx="58" cy="32" r="2.5" fill="currentColor"/><path d="M34 46 Q48 60 62 46"/><path d="M26 16 q-6 -8 2 -12 M70 14 q8 -6 12 2"/>'
  };
  window.Doodle = (name, cls) => {
    const s = document.createElement('span');
    s.className = 'doodle ' + (cls || ''); s.setAttribute('aria-hidden', 'true');
    s.innerHTML = `<svg viewBox="0 0 96 72" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" focusable="false">${BLOB}${D[name] || ''}</svg>`;
    return s;
  };
})();
