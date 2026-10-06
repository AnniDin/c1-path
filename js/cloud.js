/* C1 Path – optional cloud account on Supabase (email sign-in, no passwords) and one row of progress per user.
   Plain REST calls, no library. Configure js/config.js; table and security rules are in supabase/schema.sql. */
(function () {
  const cfg = window.C1_CLOUD || {};
  const SESSION = 'c1path.session';
  const enabled = !!(cfg.url && cfg.anonKey);
  const base = (cfg.url || '').replace(/\/+$/, '');
  const listeners = [];
  const read = () => { try { return JSON.parse(localStorage.getItem(SESSION) || 'null'); } catch (e) { return null; } };
  const write = (s) => { try { if (s) localStorage.setItem(SESSION, JSON.stringify(s)); else localStorage.removeItem(SESSION); } catch (e) { /* optional */ } };
  let session = enabled ? read() : null;
  const emit = () => listeners.forEach((f) => { try { f(); } catch (e) { /* ignore */ } });

  /* Publishable keys are not JWTs, so they go only in the apikey header; the Authorization header carries the user's token once signed in. */
  const headers = (token) => Object.assign({ 'content-type': 'application/json', apikey: cfg.anonKey }, token ? { authorization: 'Bearer ' + token } : {});
  async function errorOf(res) {
    let msg = '';
    try { const j = await res.json(); msg = j.msg || j.message || j.error_description || j.error || ''; } catch (e) { /* no body */ }
    return new Error(String(msg) || 'Request failed (' + res.status + ')');
  }
  function keep(data) {
    const exp = data.expires_at ? data.expires_at * 1000 : Date.now() + (data.expires_in || 3600) * 1000;
    session = { access_token: data.access_token, refresh_token: data.refresh_token, expires_at: exp, id: (data.user || session || {}).id, email: (data.user || session || {}).email };
    write(session); emit();
  }
  async function token() {
    if (!session) throw new Error('Not signed in');
    if (session.expires_at - 60000 > Date.now()) return session.access_token;
    const res = await fetch(base + '/auth/v1/token?grant_type=refresh_token', { method: 'POST', headers: headers(), body: JSON.stringify({ refresh_token: session.refresh_token }) });
    if (!res.ok) { session = null; write(null); emit(); throw new Error('Your session expired. Sign in again.'); }
    keep(await res.json());
    return session.access_token;
  }

  /* Returning from the magic link: Supabase appends the session (or an error) to the URL hash. */
  let arrival = '';
  if (enabled && /[#&](access_token|error)=/.test(location.hash)) {
    const q = new URLSearchParams(location.hash.replace(/^#\/?/, '').replace(/^.*?(?=(access_token|error)=)/, ''));
    let back = '#/'; try { back = sessionStorage.getItem('c1path.return') || '#/'; sessionStorage.removeItem('c1path.return'); } catch (e) { /* optional */ }
    history.replaceState(null, '', location.pathname + location.search + back);
    if (q.get('access_token')) {
      session = { access_token: q.get('access_token'), refresh_token: q.get('refresh_token'), expires_at: Date.now() + (+q.get('expires_in') || 3600) * 1000 };
      write(session);
      fetch(base + '/auth/v1/user', { headers: headers(session.access_token) }).then((r) => (r.ok ? r.json() : null)).then((u) => { if (u) { session.id = u.id; session.email = u.email; write(session); } emit(); });
      arrival = 'Signed in.';
    } else arrival = 'That sign-in link did not work: ' + (q.get('error_description') || q.get('error') || 'it may have expired') + '. Ask for a new one.';
  }

  const uid = () => {
    if (session && session.id) return session.id;
    try { const id = JSON.parse(atob(session.access_token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))).sub; session.id = id; write(session); return id; } catch (e) { throw new Error('Could not read your account id. Sign in again.'); }
  };
  const remember = () => { try { sessionStorage.setItem('c1path.return', location.hash || '#/'); } catch (e) { /* optional */ } };
  const Cloud = {
    enabled,
    arrival: () => { const a = arrival; arrival = ''; return a; },
    user: () => (session ? { id: session.id, email: session.email } : null),
    onChange: (f) => listeners.push(f),

    /* Sends an email with a sign-in link (and a 6-digit code if the email template includes {{ .Token }}). */
    async sendLink(email) {
      remember();
      const redirect = encodeURIComponent(location.origin + location.pathname);
      const res = await fetch(base + '/auth/v1/otp?redirect_to=' + redirect, { method: 'POST', headers: headers(), body: JSON.stringify({ email: email.trim(), create_user: true }) });
      if (!res.ok) throw await errorOf(res);
    },
    signInGoogle() {
      remember();
      location.href = base + '/auth/v1/authorize?provider=google&redirect_to=' + encodeURIComponent(location.origin + location.pathname);
    },
    /* Which sign-in providers the project has switched on (Google is hidden until it is). */
    async providers() {
      try {
        const res = await fetch(base + '/auth/v1/settings', { headers: headers() });
        const j = await res.json();
        return { google: !!(j.external && j.external.google) };
      } catch (e) { return { google: false }; }
    },
    async verifyCode(email, code) {
      const res = await fetch(base + '/auth/v1/verify', { method: 'POST', headers: headers(), body: JSON.stringify({ type: 'email', email: email.trim(), token: code.trim() }) });
      if (!res.ok) throw await errorOf(res);
      keep(await res.json());
    },
    async signOut() {
      try { if (session) await fetch(base + '/auth/v1/logout?scope=local', { method: 'POST', headers: headers(session.access_token) }); } catch (e) { /* offline: local sign-out still works */ }
      session = null; write(null); emit();
    },

    /* Returns the stored progress object, or null if this account has none yet. */
    async pull() {
      const t = await token();
      const res = await fetch(base + '/rest/v1/progress?select=data&limit=1', { headers: headers(t) });
      if (!res.ok) throw await errorOf(res);
      const rows = await res.json();
      return rows.length ? rows[0].data : null;
    },
    async push(data) {
      const t = await token();
      const res = await fetch(base + '/rest/v1/progress?on_conflict=user_id', {
        method: 'POST', headers: Object.assign(headers(t), { prefer: 'resolution=merge-duplicates,return=minimal' }),
        body: JSON.stringify({ user_id: uid(), data, updated_at: new Date().toISOString() })
      });
      if (!res.ok) throw await errorOf(res);
    },
    /* Calls a Postgres function in the project (used by the friends leaderboard). */
    async rpc(name, body) {
      const t = await token();
      const res = await fetch(base + '/rest/v1/rpc/' + name, { method: 'POST', headers: headers(t), body: JSON.stringify(body || {}) });
      if (!res.ok) throw await errorOf(res);
      const txt = await res.text();
      return txt ? JSON.parse(txt) : null;
    },
    async deleteAccount() {
      const t = await token();
      const res = await fetch(base + '/rest/v1/rpc/delete_my_account', { method: 'POST', headers: headers(t), body: '{}' });
      if (!res.ok) throw await errorOf(res);
      session = null; write(null); emit();
    }
  };
  window.Cloud = Cloud;
})();
