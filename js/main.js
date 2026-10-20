/* Start the app once every view module has registered its routes. */
App.start();

/* Offline use and installability. The service worker downloads a second copy of every file to cache it, so it starts only after the page has finished
   loading and a couple of seconds have passed: on a first visit the page gets the whole connection first. */
if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
  const register = () => setTimeout(() => navigator.serviceWorker.register('sw.js').catch(() => { /* optional feature */ }), 2500);
  if (document.readyState === 'complete') register(); else window.addEventListener('load', register, { once: true });
}
