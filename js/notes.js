/* C1 Path – the notes drawer (Alt+N): Markdown formatting with a toolbar, sub-notes, categories of your own, and an optional AI button that proposes an organisation.
   The pure helpers (md, tree, categories) are on window.Notes so tools/test.js and tools/smoke.js can check them. */
(function () {
  const DEFAULT_CATS = ['Grammar', 'Vocabulary', 'Writing', 'Listening', 'Speaking', 'Mistakes', 'Other'];
  const MAX_DEPTH = 3;

  /* ---------- Markdown, safely: everything is escaped first, then a small set of marks is turned into tags ---------- */
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  function inline(s) {
    const codes = [];
    s = esc(s).replace(/`([^`\n]+)`/g, (m, c) => { codes.push(c); return '\u0000' + (codes.length - 1) + '\u0000'; });
    s = s.replace(/\[([^\]\n]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      .replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>')
      .replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>')
      .replace(/~~([^~\n]+)~~/g, '<s>$1</s>')
      .replace(/==([^=\n]+)==/g, '<mark>$1</mark>');
    return s.replace(/\u0000(\d+)\u0000/g, (m, i) => '<code>' + codes[+i] + '</code>');
  }
  function md(src) {
    const out = [], lines = String(src || '').replace(/\r\n?/g, '\n').split('\n');
    let list = null, para = [];
    const flushPara = () => { if (para.length) { out.push('<p>' + para.map(inline).join('<br>') + '</p>'); para = []; } };
    const flushList = () => { if (list) { out.push('</' + list + '>'); list = null; } };
    lines.forEach((ln) => {
      let m;
      if ((m = /^(#{1,3})\s+(.*)$/.exec(ln))) { flushPara(); flushList(); out.push('<h4>' + inline(m[2]) + '</h4>'); }
      else if ((m = /^\s*[-*]\s+(.*)$/.exec(ln))) { flushPara(); if (list !== 'ul') { flushList(); out.push('<ul>'); list = 'ul'; } out.push('<li>' + inline(m[1]) + '</li>'); }
      else if ((m = /^\s*\d+[.)]\s+(.*)$/.exec(ln))) { flushPara(); if (list !== 'ol') { flushList(); out.push('<ol>'); list = 'ol'; } out.push('<li>' + inline(m[1]) + '</li>'); }
      else if ((m = /^>\s?(.*)$/.exec(ln))) { flushPara(); flushList(); out.push('<blockquote>' + inline(m[1]) + '</blockquote>'); }
      else if (!ln.trim()) { flushPara(); flushList(); }
      else { flushList(); para.push(ln); }
    });
    flushPara(); flushList();
    return out.join('');
  }

  /* ---------- structure ---------- */
  /* notes as a forest: a note whose parent is missing (or not in this list) is top-level; loops cannot occur because depth is capped */
  function tree(notes, sortChildren) {
    const ids = new Set(notes.map((n) => n.id)), kids = {}, roots = [];
    notes.forEach((n) => { if (n.parent && ids.has(n.parent) && n.parent !== n.id) (kids[n.parent] = kids[n.parent] || []).push(n); else roots.push(n); });
    const build = (n, depth, seen) => ({ note: n, depth, children: depth >= MAX_DEPTH - 1 ? [] : (kids[n.id] || []).filter((c) => c.id !== n.id && !seen.has(c.id)).sort(sortChildren || ((a, b) => a.ts - b.ts)).map((c) => build(c, depth + 1, new Set([...seen, n.id]))) });
    /* a cycle among notes would leave them unreachable from any root: show them as top-level instead */
    const reach = new Set(), mark = (t) => { reach.add(t.note.id); t.children.forEach(mark); };
    const top = roots.map((n) => build(n, 0, new Set())); top.forEach(mark);
    notes.forEach((n) => { if (!reach.has(n.id)) { const t = build(n, 0, new Set()); top.push(t); mark(t); } });
    return top;
  }
  /* the default categories first, then the ones in use, sorted */
  const categories = (notes) => DEFAULT_CATS.concat([...new Set(notes.map((n) => n.tag).filter((t) => t && !DEFAULT_CATS.includes(t)))].sort((a, b) => a.localeCompare(b)));
  /* can `id` be placed under `parent`? not under itself or one of its own sub-notes, and not too deep */
  function canMove(notes, id, parent) {
    if (!parent) return true;
    if (parent === id) return false;
    const byId = Object.fromEntries(notes.map((n) => [n.id, n]));
    let d = 1, p = byId[parent];
    while (p && d < 8) { if (p.id === id) return false; p = byId[p.parent]; d++; }
    const sub = (nid, dd) => Math.max(dd, ...notes.filter((x) => x.parent === nid).map((c) => sub(c.id, dd + 1)));
    let depth = 1; p = byId[parent]; while (p && p.parent && depth < 8) { p = byId[p.parent]; depth++; }
    return depth + sub(id, 1) <= MAX_DEPTH;
  }
  window.Notes = { md, tree, categories, canMove, MAX_DEPTH, DEFAULT_CATS };

  if (!window.App || !window.Engine || !document.getElementById) return; /* the tests load only the helpers above */
  const A = window.App, { h } = Engine;
  const fmtDate = (ts) => new Date(ts).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  const heading = (n) => n.title || String(n.text).split('\n')[0].replace(/[#*~=`>\-]/g, '').trim().slice(0, 50) || 'Untitled note';

  /* ---------- the editor: a textarea with a formatting toolbar and the usual shortcuts ---------- */
  function editor(value, rows) {
    const ta = h('textarea', { rows: rows || 4, 'aria-label': 'Note text', placeholder: 'A rule in your own words, a new expression, a question…' });
    ta.value = value || '';
    const wrap = (a, b, ph) => {
      const s = ta.selectionStart, e = ta.selectionEnd, sel = ta.value.slice(s, e) || ph;
      ta.setRangeText(a + sel + b, s, e, 'end');
      ta.selectionStart = s + a.length; ta.selectionEnd = s + a.length + sel.length; ta.focus();
    };
    const prefix = (p, numbered) => {
      const s = ta.value.lastIndexOf('\n', ta.selectionStart - 1) + 1; let e = ta.value.indexOf('\n', ta.selectionEnd); if (e < 0) e = ta.value.length;
      const block = ta.value.slice(s, e).split('\n').map((l, i) => (numbered ? (i + 1) + '. ' : p) + l.replace(/^(#{1,3}\s+|[-*]\s+|\d+[.)]\s+|>\s?)/, '')).join('\n');
      ta.setRangeText(block, s, e, 'end'); ta.focus();
    };
    const link = () => { const url = prompt('Link address (https://…)', 'https://'); if (url && /^https?:\/\//.test(url)) wrap('[', '](' + url + ')', 'text'); };
    const B = (label, title, fn, cls) => h('button', { type: 'button', class: 'tb ' + (cls || ''), title, 'aria-label': title, onclick: fn }, label);
    const bar = h('div', { class: 'note-toolbar', role: 'toolbar', 'aria-label': 'Formatting' },
      B('B', 'Bold (Ctrl+B)', () => wrap('**', '**', 'bold'), 'b'), B('I', 'Italic (Ctrl+I)', () => wrap('*', '*', 'italic'), 'i'),
      B('S', 'Strikethrough', () => wrap('~~', '~~', 'text'), 's'), B('H', 'Highlight', () => wrap('==', '==', 'text'), 'mk'),
      B('</>', 'Code', () => wrap('`', '`', 'code')), B('Title', 'Heading', () => prefix('# ')),
      B('• List', 'Bulleted list', () => prefix('- ')), B('1. List', 'Numbered list', () => prefix('', true)), B('“ ”', 'Quote', () => prefix('> ')), B('Link', 'Link', link));
    ta.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && !e.shiftKey && !e.altKey) {
        const k = e.key.toLowerCase();
        if (k === 'b') { e.preventDefault(); wrap('**', '**', 'bold'); } else if (k === 'i') { e.preventDefault(); wrap('*', '*', 'italic'); }
      }
    });
    return { el: h('div', { class: 'note-editor' }, bar, ta), ta, get: () => ta.value, set: (v) => { ta.value = v; }, focus: () => ta.focus() };
  }

  /* a category <select> with the categories in use and "New category…" */
  function catSelect(notes, val) {
    const sel = h('select', { 'aria-label': 'Category' });
    const fill = (v) => { sel.replaceChildren(...categories(notes).concat(v && !categories(notes).includes(v) ? [v] : []).map((t) => h('option', { value: t, selected: t === v }, t)), h('option', { value: '\u0001new' }, '+ New category…')); };
    fill(val); let last = val;
    sel.addEventListener('change', () => {
      if (sel.value !== '\u0001new') { last = sel.value; return; }
      const name = (prompt('Name of the new category') || '').replace(/[<>]/g, '').trim().slice(0, 24);
      if (name) { fill(name); last = name; } else sel.value = last;
    });
    return sel;
  }

  function setup() {
    const root = document.body;
    let cur = 'All', query = '', open = false, proposal = null, undo = null;
    const pinKey = 'c1path.notes.pin', foldKey = 'c1path.notes.fold';
    const getPin = () => { try { return localStorage.getItem(pinKey) === '1'; } catch (e) { return false; } };
    const setPin = (v) => { try { localStorage.setItem(pinKey, v ? '1' : '0'); } catch (e) { /* optional */ } };
    const folded = () => { try { return JSON.parse(localStorage.getItem(foldKey) || '{}'); } catch (e) { return {}; } };
    const setFold = (id, v) => { try { const f = folded(); if (v) f[id] = 1; else delete f[id]; localStorage.setItem(foldKey, JSON.stringify(f)); } catch (e) { /* optional */ } };
    const wide = () => matchMedia('(min-width: 1180px)').matches;

    const ed = editor('', 4), text = ed.ta;
    const tag = catSelect(Store.notes(), 'Other');
    const ctx = h('div', { class: 'muted notes-ctx' });
    const list = h('div', { class: 'notes-list' });
    const status = h('div', { class: 'notes-status', role: 'status', 'aria-live': 'polite' });
    const filter = h('select', { 'aria-label': 'Filter by category', onchange: (e) => { cur = e.target.value; draw(); } });
    const search = h('input', { type: 'text', placeholder: 'Search notes', 'aria-label': 'Search notes', oninput: (e) => { query = e.target.value; draw(); } });
    const catTools = h('div', { class: 'row notes-cat' });
    const pinBtn = h('button', { class: 'icon-btn', title: 'Dock beside the page', 'aria-label': 'Dock notes beside the page', onclick: () => { setPin(!getPin()); apply(); } }, '▯');
    const organiseBtn = h('button', { class: 'btn small ghost', onclick: organise }, 'Organise with AI');
    const panel = h('aside', { id: 'notes', 'aria-label': 'Notes', 'aria-hidden': 'true' },
      h('div', { class: 'notes-head' }, h('h2', {}, 'Notes'), h('div', { class: 'row' }, pinBtn, h('button', { class: 'icon-btn', 'aria-label': 'Close notes', onclick: () => toggle(false) }, '✕'))),
      h('div', { class: 'notes-new' }, ed.el,
        h('div', { class: 'row' }, tag, h('button', { class: 'btn small', onclick: save }, 'Save'), h('span', { class: 'muted' }, 'Ctrl+Enter')),
        ctx),
      h('div', { class: 'notes-tools' }, search, filter),
      catTools, status,
      list,
      h('div', { class: 'notes-foot' }, organiseBtn, h('button', { class: 'btn small ghost', onclick: exportMd }, 'Download as Markdown')));
    const handle = document.getElementById('qnote');
    handle.append(h('span', { id: 'notes-count', class: 'badge' }));
    root.append(panel);

    const here = () => ({ href: location.hash || '#/', label: ((document.querySelector('#app h1') || {}).textContent || '').trim() });
    function refreshCtx() { const p = here(); ctx.textContent = p.label ? 'Linked to: ' + p.label : ''; }
    function save() {
      if (!text.value.trim()) { text.focus(); return; }
      const p = here();
      Store.addNote({ title: '', text: text.value.trim(), tag: tag.value, href: p.href, source: p.label });
      ed.set(''); text.focus();
    }
    text.addEventListener('keydown', (e) => { if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); save(); } });

    /* one note: its text, its actions, its sub-notes */
    function noteCard(t) {
      const n = t.note, el = h('article', { class: 'note' + (t.depth ? ' sub' : '') }), box = h('div', { class: 'note-main' }), kids = h('div', { class: 'note-kids' });
      const isFolded = !!folded()[n.id];
      function show() {
        box.replaceChildren(...[
          n.title ? h('h3', {}, n.title) : null,
          h('div', { class: 'notetext rich', html: md(n.text) }),
          h('div', { class: 'note-meta' },
            t.children.length ? h('button', { class: 'linkbtn', 'aria-expanded': String(!isFolded), onclick: () => { setFold(n.id, !isFolded); draw(); } }, (isFolded ? '▸ ' : '▾ ') + t.children.length + (t.children.length === 1 ? ' sub-note' : ' sub-notes')) : null,
            h('span', { class: 'tag' }, n.tag), h('span', { class: 'muted' }, fmtDate(n.ts)),
            n.href ? A.link(n.href, n.source || 'source', 'src') : null,
            h('span', { class: 'spacer' }),
            t.depth < MAX_DEPTH - 1 ? h('button', { class: 'linkbtn', onclick: addSub }, '+ Sub-note') : null,
            h('button', { class: 'linkbtn', onclick: edit }, 'Edit'),
            h('button', { class: 'linkbtn', onclick: del }, 'Delete'))].filter(Boolean));
      }
      function del() {
        const n2 = Store.noteDescendants(n.id).length;
        if (confirm(n2 ? `Delete this note and its ${n2} sub-note${n2 === 1 ? '' : 's'}?` : 'Delete this note?')) { Store.deleteNote(n.id); draw(); }
      }
      function addSub() {
        const e2 = editor('', 3);
        const form = h('div', { class: 'subform' }, h('strong', {}, 'New sub-note'), e2.el, h('div', { class: 'row' },
          h('button', { class: 'btn small', onclick: () => { if (!e2.get().trim()) { e2.focus(); return; } Store.addNote({ title: '', text: e2.get().trim(), tag: n.tag, href: n.href, source: n.source, parent: n.id }); setFold(n.id, false); draw(); } }, 'Save sub-note'),
          h('button', { class: 'btn small ghost', onclick: () => form.remove() }, 'Cancel')));
        box.after(form); e2.focus();
      }
      function edit() {
        const all = Store.notes(), ti = h('input', { type: 'text', placeholder: 'Title (optional)', value: n.title }), g = catSelect(all, n.tag), e2 = editor(n.text, 5);
        const under = h('select', { 'aria-label': 'Move under' }, h('option', { value: '' }, '(top level)'),
          ...all.filter((x) => x.id !== n.id && canMove(all, n.id, x.id)).sort((a, b) => heading(a).localeCompare(heading(b))).map((x) => h('option', { value: x.id, selected: x.id === n.parent }, 'under: ' + heading(x))));
        box.replaceChildren(ti, e2.el, h('div', { class: 'row' }, g, under,
          h('button', { class: 'btn small', onclick: () => { Store.updateNote(n.id, { title: ti.value.trim(), tag: g.value, text: e2.get(), parent: under.value }); draw(); } }, 'Save'),
          h('button', { class: 'btn small ghost', onclick: draw }, 'Cancel')));
        e2.focus();
      }
      show();
      el.append(box);
      if (t.children.length && !isFolded) { kids.append(...t.children.map(noteCard)); el.append(kids); }
      return el;
    }

    function draw() {
      const all = Store.notes(), cats = categories(all), q = query.trim().toLowerCase();
      if (cur !== 'All' && !cats.includes(cur)) cur = 'All';
      const shown = all.filter((n) => (cur === 'All' || n.tag === cur) && (!q || (n.title + ' ' + n.text).toLowerCase().includes(q)));
      filter.replaceChildren(...['All'].concat(cats).map((t) => h('option', { value: t, selected: t === cur }, `${t} (${t === 'All' ? all.length : all.filter((n) => n.tag === t).length})`)));
      catTools.replaceChildren(...(cur === 'All' ? [] : [
        h('button', { class: 'linkbtn', onclick: () => { const name = (prompt('Rename the category "' + cur + '" to', cur) || '').replace(/[<>]/g, '').trim().slice(0, 24); if (name && name !== cur) { all.filter((n) => n.tag === cur).forEach((n) => Store.updateNote(n.id, { tag: name })); cur = name; draw(); } } }, 'Rename category'),
        cur === 'Other' ? null : h('button', { class: 'linkbtn', onclick: () => { const k = all.filter((n) => n.tag === cur).length; if (confirm(`Delete the category "${cur}"? Its ${k} note${k === 1 ? '' : 's'} will move to Other.`)) { all.filter((n) => n.tag === cur).forEach((n) => Store.updateNote(n.id, { tag: 'Other' })); cur = 'All'; draw(); } } }, 'Delete category')].filter(Boolean)));
      let body;
      if (!shown.length) body = [h('p', { class: 'muted' }, all.length ? 'No notes match.' : 'Nothing here yet. Select text on any page and press Alt+N to start a note from it.')];
      else if (cur === 'All' && !q) {
        /* by category, each a collapsible group with its notes as a tree */
        body = cats.map((c) => { const mine = shown.filter((n) => n.tag === c); return mine.length ? h('details', { class: 'notes-group', open: true }, h('summary', {}, h('strong', {}, c), ` (${mine.length})`), tree(mine, (a, b) => a.ts - b.ts).map(noteCard)) : null; }).filter(Boolean);
      } else body = tree(shown).map(noteCard);
      list.replaceChildren(...body);
      organiseBtn.disabled = all.length < 2;
      const c = document.getElementById('notes-count'); if (c) c.textContent = all.length ? String(all.length) : '';
    }

    /* AI organisation: ask, show what would change, apply only on a click, and offer to undo */
    async function organise() {
      const all = Store.notes();
      if (!window.AI || !AI.configured()) { status.replaceChildren(h('p', { class: 'fb' }, 'Add an AI key in Account (AI feedback) to use this.')); return; }
      organiseBtn.disabled = true; status.replaceChildren(h('p', { class: 'muted' }, 'Pica is sorting your notes…'));
      try {
        const r = await AI.organizeNotes(all, categories(all)), byId = Object.fromEntries(all.map((n) => [n.id, n]));
        const diff = r.changes.filter((c) => c.category !== byId[c.id].tag || (c.parent || '') !== (byId[c.id].parent || ''));
        if (!diff.length) { status.replaceChildren(h('p', { class: 'muted' }, 'Your notes already look organised.')); organiseBtn.disabled = false; return; }
        proposal = diff;
        const lines = diff.map((c) => { const n = byId[c.id], bits = []; if (c.category !== n.tag) bits.push('category ' + n.tag + ' → ' + c.category); if ((c.parent || '') !== (n.parent || '')) bits.push(c.parent ? 'under “' + heading(byId[c.parent]) + '”' : 'to top level'); return h('li', {}, h('strong', {}, heading(n)), ': ' + bits.join(', ')); });
        status.replaceChildren(h('div', { class: 'proposal card' }, h('strong', {}, `Pica suggests ${diff.length} change${diff.length === 1 ? '' : 's'}`),
          r.sent < r.total ? h('p', { class: 'muted' }, `Only the ${r.sent} most recent of ${r.total} notes were sent.`) : null,
          h('ul', {}, lines), h('p', { class: 'muted' }, 'Your notes\' text is never changed. Nothing happens until you apply.'),
          h('div', { class: 'row' }, h('button', { class: 'btn small', onclick: apply2 }, 'Apply'), h('button', { class: 'btn small ghost', onclick: () => { proposal = null; status.replaceChildren(); } }, 'Cancel'))));
      } catch (e) { status.replaceChildren(h('p', { class: 'fb' }, e.message)); }
      organiseBtn.disabled = Store.notes().length < 2;
    }
    function apply2() {
      const all = Store.notes(), byId = Object.fromEntries(all.map((n) => [n.id, n]));
      undo = proposal.map((c) => ({ id: c.id, tag: byId[c.id].tag, parent: byId[c.id].parent || '' }));
      proposal.forEach((c) => Store.updateNote(c.id, { tag: c.category, parent: c.parent || '' }));
      status.replaceChildren(h('p', { class: 'muted' }, `Applied ${proposal.length} change${proposal.length === 1 ? '' : 's'}. `, h('button', { class: 'linkbtn', onclick: () => { undo.forEach((u) => Store.updateNote(u.id, { tag: u.tag, parent: u.parent })); undo = null; status.replaceChildren(h('p', { class: 'muted' }, 'Undone.')); draw(); } }, 'Undo')));
      proposal = null; draw();
    }

    function exportMd() {
      const all = Store.notes().slice().reverse(), out = [];
      categories(all).forEach((c) => {
        const mine = all.filter((n) => n.tag === c); if (!mine.length) return;
        out.push('# ' + c + '\n');
        const walk = (t) => { const n = t.note; out.push('#'.repeat(Math.min(2 + t.depth, 4)) + ' ' + heading(n) + '\n*' + fmtDate(n.ts) + '*\n\n' + n.text + '\n'); t.children.forEach(walk); };
        tree(mine).forEach(walk);
      });
      const a = h('a', { href: URL.createObjectURL(new Blob([out.join('\n')], { type: 'text/markdown' })), download: 'c1-path-notes.md' });
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
      if (!open && panel.contains(document.activeElement)) handle.focus(); /* closing with the keyboard returns you to the Notes button */
      apply();
      if (open) {
        const sel = String(getSelection()).trim();
        if (sel && !text.value) ed.set(sel);
        refreshCtx(); draw();
        setTimeout(() => text.focus(), 40); /* the drawer is still hidden for an instant while it slides in, and a hidden box cannot take focus */
      }
    }
    /* keep the drawer in sync when notes are added from buttons elsewhere */
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
  setup();
})();
