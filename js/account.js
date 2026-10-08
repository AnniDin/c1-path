/* C1 Path – account button in the header: sign in with Google or email, the account page (friends, sync, backup, sign out, delete account). */
(function () {
  const { h } = Engine;
  const A = window.App;
  const cloudOn = () => !!(window.Cloud && Cloud.enabled);

  /* ---- profile picture: a photo cropped to a small square, or an initial on a colour. Kept on this device only. ---- */
  const AK = 'c1path.avatar', CK = 'c1path.avatarcolour';
  const COLOURS = ['#a63d15', '#4d6a22', '#2f6f73', '#7a4a7e', '#b5801a', '#3d5a80'];
  const lget = (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const lset = (k, v) => { try { if (v) localStorage.setItem(k, v); else localStorage.removeItem(k); return true; } catch (e) { return false; } };
  A.avatarOf = (name, photo, small) => h('span', { class: 'avatar' + (small ? ' small' : ''), 'aria-hidden': 'true' }, photo ? h('img', { src: photo, alt: '' }) : String(name || '?')[0].toUpperCase());
  A.myAvatar = () => lget(AK) || '';
  /* picture saved with the friends board on another device: keep it here too when this device has none */
  A.adoptAvatar = (src) => { if (src && !lget(AK) && /^data:image\/jpeg;base64,/.test(src)) { lset(AK, src); document.dispatchEvent(new CustomEvent('c1avatar')); } };
  A.avatar = (name, big) => {
    const photo = lget(AK), col = lget(CK);
    const el = h('span', { class: 'avatar' + (big ? ' big' : ''), 'aria-hidden': 'true' }, photo ? h('img', { src: photo, alt: '' }) : String(name || '?')[0].toUpperCase());
    if (!photo && col) { el.style.background = col; el.style.color = '#fff'; }
    return el;
  };
  /* centre-crop to a 128px square and re-encode, so a phone photo becomes a few kilobytes */
  const squarePhoto = (file) => new Promise((ok, no) => {
    const url = URL.createObjectURL(file), img = new Image();
    img.onload = () => {
      const s = Math.min(img.width, img.height), c = document.createElement('canvas');
      c.width = c.height = 128;
      c.getContext('2d').drawImage(img, (img.width - s) / 2, (img.height - s) / 2, s, s, 0, 0, 128, 128);
      URL.revokeObjectURL(url); ok(c.toDataURL('image/jpeg', .85));
    };
    img.onerror = () => { URL.revokeObjectURL(url); no(new Error('That file is not an image the browser can read.')); };
    img.src = url;
  });
  const pictureCard = A.pictureCard = (name) => {
    const msg = h('p', { class: 'muted', role: 'status' });
    const redraw = () => { document.dispatchEvent(new CustomEvent('c1avatar')); if (A.shareAvatar) A.shareAvatar(); A.route(); };
    const file = h('input', { type: 'file', accept: 'image/*', style: 'display:none', 'aria-label': 'Choose a profile picture' });
    file.addEventListener('change', async () => {
      if (!file.files[0]) return;
      try { if (lset(AK, await squarePhoto(file.files[0]))) redraw(); else msg.textContent = 'Could not save the picture: browser storage is full or blocked.'; }
      catch (e) { msg.textContent = e.message; }
    });
    return A.cardBlock('Profile picture',
      h('div', { class: 'row' }, A.avatar(name, true),
        h('button', { class: 'btn small', onclick: () => file.click() }, lget(AK) ? 'Change photo' : 'Choose a photo'), file,
        lget(AK) ? h('button', { class: 'btn small ghost', onclick: () => { lset(AK, null); redraw(); } }, 'Remove photo') : null),
      lget(AK) ? null : h('div', { class: 'row swatches', role: 'group', 'aria-label': 'Colour for your initial' }, COLOURS.map((c) =>
        h('button', { class: 'swatch' + ((lget(CK) || COLOURS[0]) === c ? ' on' : ''), style: 'background:' + c, 'aria-label': 'Colour ' + c, 'aria-pressed': String((lget(CK) || COLOURS[0]) === c), onclick: () => { lset(CK, c); redraw(); } }))),
      h('p', { class: 'muted' }, 'The photo is cropped to a small square. If you have joined the friends ranking, the friends you add can see it next to your name (it is deleted if you leave the ranking or delete your account). Otherwise it stays on this device.'), msg);
  };

  /* ---- the account page (#/account): who you are, friends, sync, backup ---- */
  A.routes.account = () => {
    const user = cloudOn() && Cloud.user && Cloud.user();
    const st = A.syncState ? A.syncState() : { status: 'off' };
    const sync = { ok: 'Synced ' + (A.agoText ? A.agoText(st.at) : 'just now'), busy: 'Syncing…', error: 'Sync problem: ' + st.error, off: 'Waiting to sync' }[st.status] || '';
    const who = !cloudOn()
      ? A.cardBlock('Account', h('p', { class: 'muted' }, 'Accounts are not set up on this copy of the site. Your progress stays in this browser; use the backup and sync options below to move it between devices.'))
      : user
        ? A.cardBlock('Signed in', h('p', {}, h('strong', {}, user.email || 'your account')), h('p', { class: 'muted', role: 'status' }, sync),
          h('div', { class: 'row' }, h('button', { class: 'btn small', onclick: () => A.syncNow && A.syncNow() }, 'Sync now'),
            h('button', { class: 'btn small ghost', onclick: async () => { await Cloud.signOut(); A.toast && A.toast('Signed out. Your progress stays on this device.'); A.route(); } }, 'Sign out')))
        : A.cardBlock('Not signed in', h('p', { class: 'muted' }, 'Sign in to keep your progress in sync on all your devices and to use the friends ranking. Everything else works without an account.'),
          h('div', { class: 'row' }, h('button', { class: 'btn small', onclick: () => A.openSignIn && A.openSignIn() }, 'Sign in')));
    const del = user ? A.cardBlock('Delete my account', h('p', { class: 'muted' }, 'Deletes your account, your cloud copy of the progress, your friends data and any shared scores. Progress on your devices is kept, but it will no longer sync.'),
      h('button', { class: 'btn small ghost danger', onclick: async () => {
        if (!confirm('Delete your account and the progress stored in the cloud? Progress on your devices is kept, but it will no longer sync.')) return;
        try { await Cloud.deleteAccount(); A.toast && A.toast('Account deleted'); A.route(); } catch (e) { alert('Could not delete the account: ' + e.message); }
      } }, 'Delete my account')) : null;
    A.view(h('h1', {}, 'My account'), h('p', { class: 'lead' }, 'Who you are, your friends, settings, syncing between devices and your data.'),
      who, user ? pictureCard(user.email) : null, A.friendsCard ? A.friendsCard() : null, A.calibCard ? A.calibCard() : null, A.syncCard ? A.syncCard() : null,
      h('h2', {}, 'Settings'), h('p', { class: 'muted' }, 'AI feedback, better voices, offline use and sounds.'),
      A.aiCard ? A.aiCard() : null, window.Sound ? window.Sound.card() : null, A.neuralCard ? A.neuralCard() : null, A.offlineCard ? A.offlineCard() : null,
      A.dataCard(() => A.routes.account()), del);
  };
  if (cloudOn() && Cloud.onChange) Cloud.onChange(() => { if (location.hash === '#/account' && !document.querySelector('#app :focus')) A.route(); });

  if (!cloudOn()) return;
  const slot = document.getElementById('qnote');
  if (!slot) return;

  const GOOGLE = '<svg viewBox="0 0 48 48" width="18" height="18" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z"/><path fill="#FBBC05" d="M10.5 28.7c-.5-1.5-.8-3-.8-4.7s.3-3.2.8-4.7l-7.9-6.1C.9 16.4 0 20.1 0 24s.9 7.6 2.6 10.8l7.9-6.1z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.9 2.3-8.4 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z"/></svg>';

  const btn = h('button', { id: 'account', class: 'textbtn', }, 'Sign in');
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
    h('p', { class: 'muted', style: 'font-size:.85rem' }, 'We store your email and your progress on a Supabase server, only to sync them. You can delete everything from your account page.'));
  }
  function openSignIn() {
    sent = ''; say('');
    drawDialog();
    if (providers === null) Cloud.providers().then((p) => { providers = p; if (dlg.open) drawDialog(); });
    if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
  }
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
  A.openSignIn = openSignIn;

  const label = (u) => (u.email || '?');
  function paint() {
    const u = Cloud.user();
    btn.textContent = u ? '' : 'Account';
    btn.classList.toggle('signed', !!u);
    if (u) { btn.append(A.avatar(u.email)); btn.setAttribute('aria-label', 'Account: ' + label(u)); btn.title = label(u); } else { btn.removeAttribute('aria-label'); btn.title = 'Account, settings and sync'; }
  }
  btn.addEventListener('click', () => { location.hash = '#/account'; });
  Cloud.onChange(() => { paint(); if (Cloud.user() && dlg.open) dlg.close(); });
  document.addEventListener('c1sync', paint);
  document.addEventListener('c1avatar', paint);

  const a = Cloud.arrival();
  if (a) setTimeout(() => (A.toast ? A.toast(a) : alert(a)), 600);
  paint();
})();
