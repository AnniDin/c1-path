/* Network-first service worker: always tries the network, falls back to the cache when offline. */
const CACHE = 'c1path-v14';
/* Everything the app needs, so it works offline after the first visit. tools/validate-node.js checks this list against index.html. */
const PRECACHE = ["./", "index.html", "css/style.css", "manifest.webmanifest", "icons/icon.svg", "icons/icon-192.png", "icons/icon-512.png", "data/grammar.js", "data/grammar2.js", "data/grammar3.js", "data/grammar4.js", "data/grammar5.js", "data/vocab.js", "data/vocab2.js", "data/vocab3.js", "data/vocab4.js", "data/vocab5.js", "data/vocab6.js", "data/practice.js", "data/practice2.js", "data/practice3.js", "data/practice4.js", "data/practice5.js", "js/plan.js", "js/diag.js", "js/next.js", "js/calib.js", "js/friends.js", "js/neural.js", "js/pron.js", "data/practice6.js", "data/practice7.js", "data/practice8.js", "data/practice9.js", "data/practice10.js", "data/listening.js", "data/listening2.js", "data/listening3.js", "data/listening4.js", "data/listening5.js", "data/listening6.js", "data/listening7.js", "data/writing.js", "data/writing2.js", "data/writing3.js", "data/writing4.js", "data/writing5.js", "data/speaking.js", "data/speaking2.js", "data/speaking3.js", "data/course.js", "data/course2.js", "data/course3.js", "data/course4.js", "data/course5.js", "data/course6.js", "data/course7.js", "data/course8.js", "data/course9.js", "data/levels1.js", "data/levels2.js", "data/levels3.js", "data/course_order.js", "data/placement.js", "data/exams.js", "data/tricks.js", "data/tricks2.js", "data/tricks3.js", "data/pron.js", "audio/manifest.js", "js/store.js", "js/config.js", "js/cloud.js", "js/engine.js", "js/app.js", "js/ai.js", "js/skills.js", "js/rewards.js", "js/extras.js", "js/sync.js", "js/account.js", "js/main.js"];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)).catch(() => {}).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE && k !== 'c1path-audio').map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || !req.url.startsWith(self.location.origin)) return;
  if (/\.mp3$/.test(req.url)) { e.respondWith(audio(req)); return; }
  e.respondWith(
    fetch(req, { cache: 'no-cache' }).then((res) => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); } // never replace a good cached file with an error page
      return res;
    }).catch(() => caches.match(req).then((hit) => hit || caches.match('index.html')))
  );
});

/* Recorded listening audio: served from the optional offline copy (c1path-audio) when it exists, otherwise from the network.
   Browsers ask for audio in byte ranges, and the Cache API does not slice, so the range is cut here. */
async function audio(req) {
  const hit = await (await caches.open('c1path-audio')).match(req.url);
  if (!hit) return fetch(req);
  const range = req.headers.get('range');
  if (!range) return hit;
  const buf = await hit.arrayBuffer(), m = /bytes=(\d*)-(\d*)/.exec(range);
  const start = +m[1] || 0, end = m[2] ? Math.min(+m[2], buf.byteLength - 1) : buf.byteLength - 1;
  return new Response(buf.slice(start, end + 1), { status: 206, headers: { 'Content-Type': 'audio/mpeg', 'Content-Range': `bytes ${start}-${end}/${buf.byteLength}`, 'Content-Length': String(end - start + 1) } });
}
