/* C1 Path – sync without accounts: a shared file in a cloud-synced folder, or a copy-and-paste transfer code. */
(function () {
  const { h } = Engine;
  const A = window.App;
  const LAST = 'c1path.sync.last';
  const lastSync = () => { try { return localStorage.getItem(LAST) || ''; } catch (e) { return ''; } };
  const setLast = () => { try { localStorage.setItem(LAST, new Date().toLocaleString('en-GB')); } catch (e) { /* optional */ } };

  /* The chosen file handle lives in IndexedDB so it survives page reloads. */
  const db = () => new Promise((res, rej) => {
    const r = indexedDB.open('c1path-sync', 1);
    r.onupgradeneeded = () => r.result.createObjectStore('h');
    r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error);
  });
  const idb = async (mode, fn) => { const d = await db(); return new Promise((res, rej) => { const t = d.transaction('h', mode), q = fn(t.objectStore('h')); t.oncomplete = () => res(q && q.result); t.onerror = () => rej(t.error); }); };
  const getHandle = () => idb('readonly', (s) => s.get('file')).catch(() => null);
  const putHandle = (hd) => idb('readwrite', (s) => s.put(hd, 'file'));
  const dropHandle = () => idb('readwrite', (s) => s.delete('file'));

  /* Transfer code: gzip + base64url of the progress JSON. */
  const b64 = (bytes) => btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const unb64 = (str) => Uint8Array.from(atob(str.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0));
  async function toCode() {
    const bytes = new TextEncoder().encode(Store.exportData());
    if (!window.CompressionStream) return 'C1P0.' + b64(bytes);
    const buf = await new Response(new Blob([bytes]).stream().pipeThrough(new CompressionStream('gzip'))).arrayBuffer();
    const out = new Uint8Array(buf), chunks = [];
    for (let i = 0; i < out.length; i += 8192) chunks.push(String.fromCharCode(...out.subarray(i, i + 8192)));
    return 'C1P1.' + btoa(chunks.join('')).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  async function fromCode(code) {
    const m = code.trim().match(/^(C1P[01])\.([\w-]+)$/);
    if (!m) throw new Error('That is not a C1 Path code');
    const bytes = unb64(m[2]);
    if (m[1] === 'C1P0') return new TextDecoder().decode(bytes);
    if (!window.DecompressionStream) throw new Error('This browser cannot read compressed codes');
    return new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).text();
  }

  function syncCard() {
    const msg = h('p', { class: 'muted', 'aria-live': 'polite' });
    const say = (t, bad) => { msg.textContent = t; msg.style.color = bad ? 'var(--bad)' : ''; };
    const refresh = () => { if (A.route) A.route(); };

    /* ---- shared file ---- */
    const fileBox = h('div');
    async function drawFile() {
      if (!window.showSaveFilePicker) {
        fileBox.replaceChildren(h('p', { class: 'muted' }, 'A shared sync file needs Chrome or Edge on a computer. On other browsers or on a phone, use the transfer code below.'));
        return;
      }
      const hd = await getHandle();
      const status = h('p', { class: 'muted' }, hd ? `Sync file: ${hd.name}${lastSync() ? ' · last synced ' + lastSync() : ''}` : 'No sync file chosen yet.');
      fileBox.replaceChildren(status, h('div', { class: 'row' },
        hd ? h('button', { class: 'btn small', onclick: syncNow }, 'Sync now') : null,
        h('button', { class: 'btn small' + (hd ? ' ghost' : ''), onclick: () => choose(true) }, 'Create sync file'),
        h('button', { class: 'btn small ghost', onclick: () => choose(false) }, 'Use an existing file'),
        hd ? h('button', { class: 'btn small ghost', onclick: async () => { await dropHandle(); drawFile(); } }, 'Forget file') : null));
    }
    async function choose(create) {
      try {
        const types = [{ description: 'C1 Path sync file', accept: { 'application/json': ['.json'] } }];
        const hd = create ? await showSaveFilePicker({ suggestedName: 'c1path-sync.json', types }) : (await showOpenFilePicker({ types }))[0];
        await putHandle(hd);
        await syncNow();
      } catch (e) { if (e.name !== 'AbortError') say('Could not use that file: ' + e.message, true); }
    }
    async function syncNow() {
      try {
        const hd = await getHandle();
        if (!hd) return drawFile();
        if ((await hd.queryPermission({ mode: 'readwrite' })) !== 'granted' && (await hd.requestPermission({ mode: 'readwrite' })) !== 'granted') throw new Error('permission was not granted');
        const text = await (await hd.getFile()).text();
        if (text.trim()) Store.mergeData(text);
        const w = await hd.createWritable(); await w.write(Store.exportData()); await w.close();
        setLast(); say('Synced: this browser and the file now hold the same progress.'); drawFile(); refresh();
      } catch (e) { say('Sync failed: ' + e.message, true); }
    }
    drawFile();

    /* ---- transfer code ---- */
    const out = h('textarea', { rows: 3, readonly: true, 'aria-label': 'Your transfer code', placeholder: 'Press "Create code", then copy it to your other device.' });
    const inp = h('textarea', { rows: 3, 'aria-label': 'Paste a transfer code', placeholder: 'Paste a code from your other device.' });
    const code = h('div', {},
      h('div', { class: 'row' },
        h('button', { class: 'btn small ghost', onclick: async () => { try { out.value = await toCode(); out.select(); say(`Code created (${out.value.length} characters). Copy it and paste it on the other device.`); } catch (e) { say(e.message, true); } } }, 'Create code'),
        h('button', { class: 'btn small ghost', onclick: async () => { if (!out.value) return; try { await navigator.clipboard.writeText(out.value); say('Copied.'); } catch (e) { out.select(); say('Select and copy the code manually.'); } } }, 'Copy')),
      out,
      inp,
      h('div', { class: 'row' }, h('button', { class: 'btn small ghost', onclick: async () => {
        try { Store.mergeData(await fromCode(inp.value)); inp.value = ''; setLast(); say('Merged. Your progress now includes the other device.'); refresh(); } catch (e) { say('Could not apply the code: ' + e.message, true); }
      } }, 'Merge code')));

    return h('div', { class: 'card' }, h('h2', { style: 'margin-top:0' }, 'Sync between devices'),
      h('p', { class: 'muted' }, 'No account needed. Syncing merges the two sides, so nothing you did on either device is lost: the more advanced result wins, notes are combined, and counters keep the higher value. A note or mistake you deleted on one device can come back after a merge.'),
      h('h3', {}, 'Option 1: a shared file'),
      h('p', { class: 'muted' }, 'Create the file inside a folder that Google Drive, Dropbox or OneDrive keeps in sync, then choose that same file on your other computer. Press Sync now whenever you start or finish studying.'),
      fileBox,
      h('h3', {}, 'Option 2: a transfer code'),
      h('p', { class: 'muted' }, 'Works everywhere, including phones. Create a code on one device, send it to yourself (email, chat), and merge it on the other.'),
      code, msg);
  }
  A.syncCard = syncCard;
})();
