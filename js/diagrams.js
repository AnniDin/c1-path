/* C1 Path – diagrams for the theory pages: a small set of drawings (timeline, scale, sentence blocks, side by side, chooser) that are drawn from data,
   so each lesson can have a picture without a hand-made image. data/visuals*.js hold the specs: C1.visuals[lessonId] = [{ after: 'idea' | 'part0' | 'part1' …, type, … }].
   Everything is escaped text in SVG or HTML (readable by a screen reader, in every theme). window.Diagrams = { render, check } (check is used by tools/validate-node.js). */
(function () {
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const KINDS = ['subj', 'aux', 'verb', 'obj', 'adv', 'if', 'main', 'wh', 'neg', 'time', 'prep', 'note'];
  const TYPES = ['timeline', 'scale', 'blocks', 'compare', 'chooser'];
  const num = (x) => typeof x === 'number' && x >= 0 && x <= 100;
  const str = (x, max) => typeof x === 'string' && x.trim().length > 0 && x.length <= max;

  /* the problems of a spec, or [] when it is fine */
  function check(s) {
    const p = [];
    if (!s || typeof s !== 'object') return ['not an object'];
    if (!TYPES.includes(s.type)) return ['unknown type ' + s.type];
    if (!str(s.title, 60)) p.push('title (1 to 60 characters)');
    if (s.caption != null && !str(s.caption, 160)) p.push('caption (up to 160 characters)');
    if (s.say != null && !str(s.say, 140)) p.push('say (up to 140 characters)');
    if (s.type === 'timeline') {
      if (!Array.isArray(s.marks) || s.marks.length < 1 || s.marks.length > 6) p.push('1 to 6 marks');
      else s.marks.forEach((m, i) => { if (!num(m.x) || !str(m.label, 22) || (m.sub != null && !str(m.sub, 34)) || (m.to != null && (!num(m.to) || m.to <= m.x))) p.push('mark ' + i); });
      if (s.now != null && !num(s.now)) p.push('now');
    }
    if (s.type === 'scale') {
      if (!str(s.from, 20) || !str(s.to, 20)) p.push('from and to (up to 20 characters)');
      if (!Array.isArray(s.marks) || s.marks.length < 2 || s.marks.length > 6) p.push('2 to 6 marks');
      else s.marks.forEach((m, i) => { if (!num(m.x) || !str(m.label, 20) || (m.sub != null && !str(m.sub, 30))) p.push('mark ' + i); });
    }
    if (s.type === 'blocks') {
      if (!Array.isArray(s.rows) || s.rows.length < 1 || s.rows.length > 4) p.push('1 to 4 rows');
      else s.rows.forEach((r, i) => {
        if (!Array.isArray(r.parts) || r.parts.length < 2 || r.parts.length > 9) p.push('row ' + i + ': 2 to 9 parts');
        else r.parts.forEach((x, j) => { if (!str(x.t, 24) || !KINDS.includes(x.k)) p.push('row ' + i + ' part ' + j); });
        if (r.label != null && !str(r.label, 40)) p.push('row ' + i + ' label');
      });
    }
    if (s.type === 'compare') {
      ['left', 'right'].forEach((side) => {
        const c = s[side];
        if (!c || !str(c.title, 30) || !Array.isArray(c.items) || c.items.length < 1 || c.items.length > 5 || !c.items.every((x) => str(x, 70)) || !['ok', 'bad', 'neutral'].includes(c.tone || 'neutral')) p.push(side + ' side');
      });
    }
    if (s.type === 'chooser') {
      if (!Array.isArray(s.rows) || s.rows.length < 2 || s.rows.length > 5) p.push('2 to 5 rows');
      else s.rows.forEach((r, i) => { if (!str(r.q, 60) || !str(r.a, 30) || (r.ex != null && !str(r.ex, 80))) p.push('row ' + i); });
    }
    return p;
  }

  /* ---- SVG pieces ---- */
  const W = 640;
  const tx = (x) => 30 + (x / 100) * (W - 60);
  function timelineSvg(s) {
    const nowX = tx(s.now == null ? 50 : s.now), y = 84, parts = [];
    parts.push(`<line class="dg-line" x1="20" y1="${y}" x2="${W - 20}" y2="${y}"/><polygon class="dg-arrow" points="${W - 14},${y} ${W - 28},${y - 6} ${W - 28},${y + 6}"/>`);
    parts.push(`<text class="dg-end" x="24" y="${y + 36}">PAST</text><text class="dg-end" x="${W - 24}" y="${y + 36}" text-anchor="end">FUTURE</text>`);
    parts.push(`<line class="dg-now" x1="${nowX}" y1="${y - 40}" x2="${nowX}" y2="${y + 40}"/><text class="dg-nowt" x="${nowX}" y="${y + 56}" text-anchor="middle">NOW</text>`);
    s.marks.forEach((m, i) => {
      const x = tx(m.x), above = i % 2 === 0, ty = above ? y - 30 : y + 34, sy = above ? y - 14 : y + 50;
      if (m.to != null) parts.push(`<rect class="dg-span" x="${x}" y="${y - 7}" width="${Math.max(6, tx(m.to) - x)}" height="14" rx="7"/>`);
      else parts.push(`<circle class="dg-dot" cx="${x}" cy="${y}" r="7"/>`);
      const cx = m.to != null ? (x + tx(m.to)) / 2 : x;
      parts.push(`<text class="dg-txt" x="${cx}" y="${ty}" text-anchor="middle">${esc(m.label)}</text>`);
      if (m.sub) parts.push(`<text class="dg-sub" x="${cx}" y="${sy}" text-anchor="middle">${esc(m.sub)}</text>`);
    });
    return `<svg viewBox="0 0 ${W} 170" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true">${parts.join('')}</svg>`;
  }
  function scaleSvg(s) {
    const y = 78, parts = [`<defs><linearGradient id="dgg${s._n}" x1="0" x2="1"><stop offset="0" style="stop-color:var(--heat1)"/><stop offset="1" style="stop-color:var(--heat3)"/></linearGradient></defs>`,
      `<rect class="dg-bar" x="30" y="${y - 9}" width="${W - 60}" height="18" rx="9" fill="url(#dgg${s._n})"/>`,
      `<text class="dg-end" x="30" y="${y + 40}">${esc(s.from)}</text><text class="dg-end" x="${W - 30}" y="${y + 40}" text-anchor="end">${esc(s.to)}</text>`];
    s.marks.forEach((m, i) => {
      const x = tx(m.x), above = i % 2 === 0;
      parts.push(`<line class="dg-tick" x1="${x}" y1="${y - 14}" x2="${x}" y2="${y + 14}"/>`);
      parts.push(`<text class="dg-txt" x="${x}" y="${above ? y - 26 : y + 66}" text-anchor="middle">${esc(m.label)}</text>`);
      if (m.sub) parts.push(`<text class="dg-sub" x="${x}" y="${above ? y - 42 : y + 82}" text-anchor="middle">${esc(m.sub)}</text>`);
    });
    return `<svg viewBox="0 0 ${W} 160" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true">${parts.join('')}</svg>`;
  }

  /* what a screen reader says for a drawing: its title, then its content as plain sentences */
  function describe(s) {
    if (s.type === 'timeline') return s.title + '. A timeline from past to future, with the present marked. ' + s.marks.slice().sort((a, b) => a.x - b.x).map((m) => m.label + (m.sub ? ' (' + m.sub + ')' : '')).join(', then ') + '.';
    if (s.type === 'scale') return s.title + '. A scale from ' + s.from + ' to ' + s.to + ': ' + s.marks.slice().sort((a, b) => a.x - b.x).map((m) => m.label + (m.sub ? ' (' + m.sub + ')' : '')).join(', ') + '.';
    return s.title;
  }

  let counter = 0;
  function render(spec) {
    const { h } = Engine, s = Object.assign({ _n: ++counter }, spec), say = s.say && window.PicaSVG
      ? h('div', { class: 'dg-say' }, h('span', { class: 'picaface', 'aria-hidden': 'true', html: window.PicaSVG('happy') }), h('p', {}, s.say)) : (s.say ? h('p', { class: 'dg-say-text' }, s.say) : null);
    const cap = h('figcaption', {}, h('strong', {}, s.title), s.caption ? h('span', { class: 'muted' }, ' ' + s.caption) : null);
    let body;
    if (s.type === 'timeline' || s.type === 'scale') {
      body = h('div', { class: 'dg-svg', role: 'img', 'aria-label': describe(s), html: s.type === 'timeline' ? timelineSvg(s) : scaleSvg(s) });
    } else if (s.type === 'blocks') {
      body = h('div', { class: 'dg-blocks' }, s.rows.map((r) => h('div', { class: 'dg-row' }, r.label ? h('span', { class: 'dg-label' }, r.label) : null,
        h('span', { class: 'dg-chips' }, r.parts.map((x) => h('span', { class: 'dg-chip dg-k-' + x.k }, x.t))))));
    } else if (s.type === 'compare') {
      const side = (c) => h('div', { class: 'dg-side dg-t-' + (c.tone || 'neutral') }, h('strong', {}, c.title), h('ul', {}, c.items.map((x) => h('li', {}, x))));
      body = h('div', { class: 'dg-compare' }, side(s.left), h('span', { class: 'dg-vs', 'aria-hidden': 'true' }, 'vs'), side(s.right));
    } else {
      body = h('div', { class: 'dg-chooser' }, s.rows.map((r) => h('div', { class: 'dg-crow' }, h('span', { class: 'dg-q' }, r.q), h('span', { class: 'dg-go', 'aria-hidden': 'true' }, '→'), h('span', { class: 'dg-a' }, h('strong', {}, r.a), r.ex ? h('em', {}, r.ex) : null))));
    }
    return h('figure', { class: 'dg dg-' + s.type }, cap, body, say);
  }
  window.Diagrams = { render, check, TYPES, KINDS };
})();
