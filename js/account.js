/* C1 Path – account button in the header: sign in with Google or email, account menu, sign out, delete account. */
(function () {
  if (!window.Cloud || !Cloud.enabled) return;
  const { h } = Engine;
  const A = window.App;
  const slot = document.getElementById('qnote');
  if (!slot) return;

  const GOOGLE = '<svg viewBox="0 0 48 48" width="18" height="18" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z"/><path fill="#FBBC05" d="M10.5 28.7c-.5-1.5-.8-3-.8-4.7s.3-3.2.8-4.7l-7.9-6.1C.9 16.4 0 20.1 0 24s.9 7.6 2.6 10.8l7.9-6.1z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.9 2.3-8.4 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z"/></svg>';

  const btn = h('button', { id: 'account', class: 'textbtn', 'aria-haspopup': 'true', 'aria-expanded': 'false' }, 'Sign in');
  slot.before(btn);

  /* ---- sign-in dialog ---- */
  const dlg = h('dialog', { id: 'signin', 'aria-labelledby': 'signin-title' });
  document.body.append(dlg);
  let providers = null, sent = '';
  const msg = h('p', { class: 'muted', 'aria-live': 'polite' });
  const say = (t, bad) => { msg.textContent = t; msg.style.color = bad ? 'var(--bad)' : ''; };

  function drawDialog() {
    const email = h('input', { type: 'email', class: 'wide', placeholder: 'you@example.com', autocomplete: 'email', 'aria-label': 'Email address', value: sent });
    const code = h('input', { type: 'text', inputmode: 'numeric', autocomplete: 'one-time-code', placeholder: '6-digit code', 'aria-label': 'Sign-in code', style: 'max-width:10em' });
    const google = providers && providers.google
      ? h('button', { class: 'gbtn', onclick: () => Cloud.signInGoogle() }, h('span', { html: GOOGLE }), 'Continue with Google') : null;
    dlg.replaceChildren(h('div', { class: 'row', style: 'justify-content:space-between' }, h('h2', { id: 'signin-title', style: 'margin:0' }, 'Sign in'),
      h('button', { class: 'icon-btn', 'aria-label': 'Close', onclick: () => dlg.close() }, '✕')),
    h('p', { class: 'muted' }, 'Save your progress and keep it in sync on all your devices. Everything works without an account too.'),
    google,
    google ? h('div', { class: 'or' }, 'or') : null,
    h('label', { class: 'muted', style: 'display:block;margin-bottom:6px' }, google ? 'Use your email instead' : 'Your email'),
    email,
    h('div', { class: 'row', style: 'margin:8px 0' }, h('button', { class: 'btn', onclick: async () => {
      if (!email.value.includes('@')) return say('Enter your email address.', true);
      sent = email.value.trim(); say('Sending…');
      try { await Cloud.sendLink(sent); say('Check your inbox (and spam folder) and open the link in that email on this device.'); drawDialog(); say('Check your inbox (and spam folder) and open the link in that email on this device.'); } catch (e) { say('Could not send the email: ' + e.message, true); }
    } }, 'Email me a sign-in link')),
    sent ? h('div', { class: 'row' }, code, h('button', { class: 'btn small ghost', onclick: async () => {
      try { await Cloud.verifyCode(sent, code.value); sent = ''; dlg.close(); A.toast && A.toast('Signed in'); } catch (e) { say('Could not sign in: ' + e.message, true); }
    } }, 'Use the code from the email')) : null,
    msg,
    h('p', { class: 'muted', style: 'font-size:.85rem' }, 'We store your email and your progress on a Supabase server, only to sync them. You can delete everything from the account menu.'));
  }
  function openSignIn() {
    sent = ''; say('');
    drawDialog();
    if (providers === null) Cloud.providers().then((p) => { providers = p; if (dlg.open) drawDialog(); });
    if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
  }
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
  A.openSignIn = openSignIn;

  /* ---- account menu ---- */
  const menu = h('div', { id: 'account-menu', hidden: true, role: 'menu' });
  document.body.append(menu);
  const label = (u) => (u.email || '?');
  function state() {
    const st = A.syncState ? A.syncState() : { status: 'off' };
    return { ok: 'Synced ' + (A.agoText ? A.agoText(st.at) : 'just now'), busy: 'Syncing…', error: 'Sync problem: ' + st.error, off: 'Waiting to sync' }[st.status] || '';
  }
  function drawMenu() {
    const u = Cloud.user();
    if (!u) { menu.hidden = true; return; }
    menu.replaceChildren(
      h('div', { class: 'am-head' }, h('strong', {}, label(u)), h('div', { class: 'muted' }, state())),
      h('button', { role: 'menuitem', onclick: () => { A.syncNow && A.syncNow(); } }, 'Sync now'),
      h('a', { role: 'menuitem', href: '#/progress', onclick: () => { menu.hidden = true; } }, 'Sync settings and backup'),
      h('button', { role: 'menuitem', onclick: async () => { await Cloud.signOut(); menu.hidden = true; A.toast && A.toast('Signed out. Your progress stays on this device.'); } }, 'Sign out'),
      h('button', { role: 'menuitem', class: 'danger', onclick: async () => {
        if (!confirm('Delete your account and the progress stored in the cloud? Progress on your devices is kept, but it will no longer sync.')) return;
        try { await Cloud.deleteAccount(); menu.hidden = true; A.toast && A.toast('Account deleted'); } catch (e) { alert('Could not delete the account: ' + e.message); }
      } }, 'Delete my account'));
  }
  function paint() {
    const u = Cloud.user();
    btn.textContent = u ? '' : 'Sign in';
    btn.classList.toggle('signed', !!u);
    if (u) { btn.append(h('span', { class: 'avatar', 'aria-hidden': 'true' }, (u.email || '?')[0].toUpperCase())); btn.setAttribute('aria-label', 'Account: ' + label(u)); btn.title = label(u); } else { btn.removeAttribute('aria-label'); btn.title = 'Sign in to sync your progress'; }
    if (!menu.hidden) drawMenu();
  }
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!Cloud.user()) return openSignIn();
    menu.hidden = !menu.hidden; btn.setAttribute('aria-expanded', String(!menu.hidden));
    if (!menu.hidden) { drawMenu(); const r = btn.getBoundingClientRect(); menu.style.top = r.bottom + 6 + 'px'; menu.style.right = Math.max(8, innerWidth - r.right) + 'px'; }
  });
  document.addEventListener('click', (e) => { if (!menu.hidden && !menu.contains(e.target)) { menu.hidden = true; btn.setAttribute('aria-expanded', 'false'); } });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) { menu.hidden = true; btn.focus(); } });
  Cloud.onChange(() => { paint(); if (Cloud.user() && dlg.open) dlg.close(); });
  document.addEventListener('c1sync', paint);

  const a = Cloud.arrival();
  if (a) setTimeout(() => (A.toast ? A.toast(a) : alert(a)), 600);
  paint();
})();
