/* Network-first service worker: always tries the network, falls back to the cache when offline. */
const CACHE = 'c1path-v5';
/* Everything the app needs, so it works offline after the first visit. tools/validate-node.js checks this list against index.html. */
const PRECACHE = ["./", "index.html", "css/style.css", "manifest.webmanifest", "icons/icon.svg", "data/grammar.js", "data/grammar2.js", "data/grammar3.js", "data/vocab.js", "data/vocab2.js", "data/vocab3.js", "data/vocab4.js", "data/practice.js", "data/practice2.js", "data/practice3.js", "data/practice4.js", "data/practice5.js", "data/listening.js", "data/listening2.js", "data/listening3.js", "data/writing.js", "data/writing2.js", "data/writing3.js", "data/speaking.js", "data/speaking2.js", "data/speaking3.js", "data/course.js", "data/course2.js", "data/course3.js", "data/placement.js", "data/exams.js", "audio/manifest.js", "js/store.js", "js/config.js", "js/cloud.js", "js/engine.js", "js/app.js", "js/ai.js", "js/skills.js", "js/sync.js", "js/account.js", "js/main.js"];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)).catch(() => {}).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || !req.url.startsWith(self.location.origin)) return;
  if (/\.mp3$/.test(req.url)) return; // audio is streamed with range requests: let the browser handle it
  e.respondWith(
    fetch(req, { cache: 'no-cache' }).then((res) => {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(req, copy));
      return res;
    }).catch(() => caches.match(req).then((hit) => hit || caches.match('index.html')))
  );
});
