/* C1 Path – sync between devices: a cloud account (Supabase, see js/cloud.js), a shared file in a synced folder, or a copy-and-paste code. */
(function () {
  const { h } = Engine;
  const A = window.App;
  const FILE_API = !!(window.showSaveFilePicker && window.showOpenFilePicker && window.indexedDB);
  const LAST = 'c1path.sync.last';
  const read = () => { try { return JSON.parse(localStorage.getItem(LAST) || 'null'); } catch (e) { return null; } };
  const write = (v) => { try { localStorage.setItem(LAST, JSON.stringify(v)); } catch (e) { /* optional */ } };

  const sync = { status: 'off', name: '', at: read() && read().at, error: '' }; // off | ok | busy | paused | error
  const emit = () => document.dispatchEvent(new CustomEvent('c1sync'));

  /* The chosen file handle lives in IndexedDB so it survives page reloads. */
  const db = () => new Promise((res, rej) => {
    const r = indexedDB.open('c1path-sync', 1);
    r.onupgradeneeded = () => r.result.createObjectStore('h');
    r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error);
  });
  const idb = async (mode, fn) => { const d = await db(); return new Promise((res, rej) => { const t = d.transaction('h', mode), q = fn(t.objectStore('h')); t.oncomplete = () => res(q && q.result); t.onerror = () => rej(t.error); }); };
  const getHandle = () => (FILE_API ? idb('readonly', (s) => s.get('file')).catch(() => null) : Promise.resolve(null));
  const putHandle = (hd) => idb('readwrite', (s) => s.put(hd, 'file'));
  const dropHandle = () => idb('readwrite', (s) => s.delete('file'));

  /* ---- automatic sync ---- */
  let running = false, timer = null, armed = false;
  const ROUTES_SAFE = ['', '#/', '#/course', '#/toolkit'];
  const safeRoute = () => ROUTES_SAFE.includes(location.hash) || location.hash.startsWith('#/progress') || location.hash === '#/account';
  /* redraw after a background merge, unless the learner is in the middle of typing; keep the scroll position */
  const redraw = () => {
    if (document.querySelector('#app :focus') || [...document.querySelectorAll('#app input, #app textarea')].some((i) => i.type !== 'checkbox' && i.type !== 'radio' && i.value)) return;
    const y = window.scrollY; A.route(); window.scrollTo(0, y);
  };
  async function run(interactive) {
    if (running) return;
    const hd = await getHandle();
    if (!hd) { sync.status = 'off'; emit(); return; }
    sync.name = hd.name;
    running = true;
    try {
      if ((await hd.queryPermission({ mode: 'readwrite' })) !== 'granted') {
        if (!interactive) { sync.status = 'paused'; arm(); emit(); return; }
        if ((await hd.requestPermission({ mode: 'readwrite' })) !== 'granted') { sync.status = 'paused'; emit(); return; }
      }
      sync.status = 'busy'; emit();
      const before = Store.exportData();
      const text = await (await hd.getFile()).text();
      if (text.trim()) Store.mergeData(text);
      const merged = Store.exportData();
      if (merged !== text) { const w = await hd.createWritable(); await w.write(merged); await w.close(); }
      sync.status = 'ok'; sync.error = ''; sync.at = Date.now(); write({ at: sync.at });
      if (merged !== before && safeRoute() && A.route) redraw();
    } catch (e) {
      sync.status = 'error'; sync.error = e.message || String(e);
    } finally { running = false; emit(); }
  }
  /* Browsers only allow asking for file access after a click, so after a reload the first click anywhere resumes syncing. */
  function arm() {
    if (armed) return; armed = true;
    const go = () => { armed = false; document.removeEventListener('pointerdown', go, true); document.removeEventListener('keydown', go, true); run(true); };
    document.addEventListener('pointerdown', go, true); document.addEventListener('keydown', go, true);
  }
  Store.onChange(() => {
    if (running || cloudRunning) return;
    const fileOn = sync.status !== 'off', cloudOn = !!(window.Cloud && Cloud.enabled && Cloud.user());
    if (!fileOn && !cloudOn) return;
    clearTimeout(timer);
    timer = setTimeout(() => { if (fileOn) run(false); if (cloudOn) runCloud(); }, 4000);
  });
  if (FILE_API) getHandle().then((hd) => { if (hd) { sync.status = 'paused'; sync.name = hd.name; run(false); } });

  /* ---- cloud account sync ---- */
  const cloud = { status: 'off', at: null, error: '' }; // off | ok | busy | error
  const stable = (o) => JSON.stringify(o, (k, v) => (v && typeof v === 'object' && !Array.isArray(v) ? Object.keys(v).sort().reduce((r, x) => { r[x] = v[x]; return r; }, {}) : v));
  let cloudRunning = false;
  async function runCloud() {
    if (!window.Cloud || !Cloud.enabled || !Cloud.user() || cloudRunning) return;
    cloudRunning = true; cloud.status = 'busy'; emit();
    try {
      const remote = await Cloud.pull();
      const before = Store.exportData();
      if (remote) Store.mergeData(remote);
      const merged = JSON.parse(Store.exportData());
      if (!remote || stable(remote) !== stable(merged)) await Cloud.push(merged);
      cloud.status = 'ok'; cloud.error = ''; cloud.at = Date.now();
      if (Store.exportData() !== before && safeRoute() && A.route) redraw();
    } catch (e) { cloud.status = 'error'; cloud.error = e.message || String(e); }
    finally { cloudRunning = false; emit(); }
  }
  if (window.Cloud && Cloud.enabled) {
    Cloud.onChange(() => { if (Cloud.user()) runCloud(); else { cloud.status = 'off'; emit(); } });
    document.addEventListener('visibilitychange', () => { if (!document.hidden) runCloud(); });
    if (Cloud.user()) runCloud();
  }

  /* ---- transfer code: gzip + base64url of the progress data ---- */
  const unb64 = (str) => Uint8Array.from(atob(str.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0));
  const enc = (bytes) => { const parts = []; for (let i = 0; i < bytes.length; i += 8192) parts.push(String.fromCharCode(...bytes.subarray(i, i + 8192))); return btoa(parts.join('')).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); };
  async function toCode() {
    const bytes = new TextEncoder().encode(Store.exportData());
    if (!window.CompressionStream) return 'C1P0.' + enc(bytes);
    return 'C1P1.' + enc(new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(new CompressionStream('gzip'))).arrayBuffer()));
  }
  async function fromCode(code) {
    const m = code.trim().match(/^(C1P[01])\.([\w-]+)$/);
    if (!m) throw new Error('that is not a C1 Path code');
    const bytes = unb64(m[2]);
    if (m[1] === 'C1P0') return new TextDecoder().decode(bytes);
    if (!window.DecompressionStream) throw new Error('this browser cannot read compressed codes');
    return new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).text();
  }

  const ago = (t) => { if (!t) return 'not yet'; const m = Math.round((Date.now() - t) / 60000); return m < 1 ? 'just now' : m < 60 ? m + ' min ago' : new Date(t).toLocaleString('en-GB'); };

  function syncCard() {
    const root = h('div', { class: 'card' });
    const msg = h('p', { class: 'muted', 'aria-live': 'polite' });
    const say = (t, bad) => { msg.textContent = t; msg.style.color = bad ? 'var(--bad)' : ''; };
    let choosing = false;

    async function choose(create) {
      try {
        const types = [{ description: 'C1 Path sync file', accept: { 'application/json': ['.json'] } }];
        const hd = create ? await showSaveFilePicker({ suggestedName: 'c1path-sync.json', types }) : (await showOpenFilePicker({ types }))[0];
        await putHandle(hd); choosing = false; sync.name = hd.name;
        await run(true);
      } catch (e) { if (e.name !== 'AbortError') say('Could not use that file: ' + e.message, true); }
    }

    function filePart() {
      if (!FILE_API) return h('p', { class: 'muted' }, 'Automatic sync needs Chrome or Edge on a computer. Anywhere else, move your progress with a code (below).');
      if (sync.status === 'off') {
        return h('div', {},
          h('p', {}, 'Keep your progress on all your devices, with no account. Pick a file inside a folder that Google Drive, Dropbox or OneDrive already syncs. Do the same on your other computer and the two stay in step by themselves.'),
          choosing
            ? h('div', { class: 'row' },
              h('button', { class: 'btn small', onclick: () => choose(true) }, 'First device: create the file'),
              h('button', { class: 'btn small ghost', onclick: () => choose(false) }, 'Already set up elsewhere: choose the file'))
            : h('button', { class: 'btn', onclick: () => { choosing = true; draw(); } }, 'Set up sync'));
      }
      const label = { ok: 'Synced ' + ago(sync.at), busy: 'Syncing…', paused: 'Paused: click anywhere on the page to resume', error: 'Problem: ' + sync.error }[sync.status];
      return h('div', {},
        h('p', {}, h('span', { class: 'sdot ' + sync.status, 'aria-hidden': 'true' }), h('strong', {}, 'Connected to ' + sync.name), h('span', { class: 'muted' }, ' · ' + label + (sync.status === 'ok' ? ' · automatic' : ''))),
        h('div', { class: 'row' },
          h('button', { class: 'btn small', onclick: () => run(true) }, 'Sync now'),
          h('button', { class: 'btn small ghost', onclick: async () => { await dropHandle(); sync.status = 'off'; draw(); } }, 'Disconnect')));
    }

    let othersOpen = false;
    function accountPart() {
      const u = Cloud.user();
      if (!u) {
        return h('div', {},
          h('p', {}, 'Create a free account to keep your progress safe and in step on every device. Sign in with Google or your email; no password to remember.'),
          h('button', { class: 'btn', onclick: () => A.openSignIn && A.openSignIn() }, 'Sign in'));
      }
      const label = { ok: 'Synced ' + ago(cloud.at) + ' · automatic', busy: 'Syncing…', error: 'Problem: ' + cloud.error, off: 'Waiting to sync' }[cloud.status];
      return h('div', {},
        h('p', {}, h('span', { class: 'sdot ' + (cloud.status === 'off' ? 'paused' : cloud.status), 'aria-hidden': 'true' }), h('strong', {}, 'Signed in as ' + (u.email || 'your account')), h('span', { class: 'muted' }, ' · ' + label)),
        h('div', { class: 'row' }, h('button', { class: 'btn small', onclick: () => runCloud() }, 'Sync now'), h('span', { class: 'muted' }, 'Sign out or delete your account from the account menu at the top.')));
    }

    const out = h('textarea', { rows: 3, readonly: true, 'aria-label': 'Your transfer code', placeholder: 'Press "Create code", then send it to your other device.' });
    const inp = h('textarea', { rows: 3, 'aria-label': 'Paste a transfer code', placeholder: 'Paste a code from your other device here.' });
    const codePart = () => h('details', { open: !FILE_API },
      h('summary', {}, 'Phone or another browser? Use a code'),
      h('p', { class: 'muted' }, 'On the first device press Create code and send the text to yourself (email, chat). On the other device paste it and press Merge code. Repeat in the other direction whenever you want to bring both up to date.'),
      h('div', { class: 'row' },
        h('button', { class: 'btn small ghost', onclick: async () => { try { out.value = await toCode(); out.select(); say(`Code created (${out.value.length} characters).`); } catch (e) { say(e.message, true); } } }, 'Create code'),
        h('button', { class: 'btn small ghost', onclick: async () => { if (!out.value) return; try { await navigator.clipboard.writeText(out.value); say('Copied.'); } catch (e) { out.select(); say('Select the code and copy it.'); } } }, 'Copy')),
      out, inp,
      h('div', { class: 'row' }, h('button', { class: 'btn small ghost', onclick: async () => {
        try { Store.mergeData(await fromCode(inp.value)); inp.value = ''; say('Merged: your progress now includes the other device.'); if (A.route) A.route(); } catch (e) { say('Could not apply the code: ' + e.message, true); }
      } }, 'Merge code')));

    function draw() {
      const others = [filePart(), codePart()];
      root.replaceChildren(h('h2', { style: 'margin-top:0' }, 'Sync between devices'),
        ...(window.Cloud && Cloud.enabled ? [accountPart(), h('details', { open: othersOpen, ontoggle: (e) => { othersOpen = e.target.open; } }, h('summary', {}, 'Other ways to sync (shared file or code)'), ...others)] : others), msg,
        h('p', { class: 'muted' }, 'Merging never loses work: answers are counted per device and added up, notes are combined, deletions are remembered, and the more advanced result wins for flashcards and scores. Resetting progress on one device is undone by the next sync, so disconnect first if you really want to start over.'));
    }
    const onSync = () => { if (root.isConnected) draw(); else document.removeEventListener('c1sync', onSync); };
    document.addEventListener('c1sync', onSync);
    draw();
    return root;
  }
  A.syncCard = syncCard;
  A.syncState = () => cloud;
  A.syncNow = runCloud;
  A.agoText = ago;
})();
