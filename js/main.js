/* Start the app once every view module has registered its routes. */
App.start();

/* Offline use and installability. Network-first, so updated files are never hidden behind a stale cache. */
if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
  navigator.serviceWorker.register('sw.js').catch(() => { /* optional feature */ });
}
