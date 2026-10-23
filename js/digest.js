/* C1 Path – the optional emails: the switches on the account page (a weekly trick, a monthly summary) and the unsubscribe page for the link in
   every email. The sending itself is tools/send_digest.js (a weekly GitHub Action); the list lives in Supabase (supabase/digest.sql and digest_monthly.sql). */
(function () {
  const { h } = Engine;
  const A = window.App;
  const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const cloudOn = () => !!(window.Cloud && Cloud.enabled);

  A.digestCard = () => {
    const msg = h('p', { class: 'muted', role: 'status' });
    const mk = (id) => h('input', { type: 'checkbox', id, disabled: true });
    const weekly = mk('digest-on'), monthly = mk('digest-monthly');
    const monthlyRow = h('label', { for: 'digest-monthly', class: 'row', hidden: true }, monthly, ' A summary of my last 30 days, on the first Thursday of the month');
    const save = (box, rpc, on, off) => async () => {
      box.disabled = true; msg.textContent = 'Saving…';
      try { await Cloud.rpc(rpc, { p_on: box.checked }); msg.textContent = box.checked ? on : off; }
      catch (e) { box.checked = !box.checked; msg.textContent = 'Could not save this: ' + e.message; }
      box.disabled = false;
    };
    weekly.addEventListener('change', save(weekly, 'set_digest', 'Done. The next trick arrives on Thursday morning, about 9:30 (Spanish time).', 'Done. No more trick emails.'));
    monthly.addEventListener('change', save(monthly, 'set_monthly', 'Done. The first summary arrives on the first Thursday of next month.', 'Done. No monthly summary.'));
    /* the summary needs digest_monthly.sql; without it the card still offers the weekly trick */
    Cloud.rpc('get_digest_prefs').then((p) => { weekly.checked = !!(p && p.weekly); monthly.checked = !!(p && p.monthly); monthlyRow.hidden = false; weekly.disabled = monthly.disabled = false; })
      .catch(() => Cloud.rpc('get_digest').then((on) => { weekly.checked = !!on; weekly.disabled = false; })
        .catch(() => { msg.textContent = 'Emails are not available on this copy of the site yet.'; }));
    return A.cardBlock('Emails (optional)',
      h('p', { class: 'muted' }, 'Both are off unless you switch them on, and every email has a link that stops them all. The weekly one shows your own last 7 days and, only if you have joined the friends ranking, the answers your friends gave this week: the same figures they already show you in the app. They go to ', h('strong', {}, (Cloud.user() || {}).email || 'your email'), '.'),
      h('label', { for: 'digest-on', class: 'row' }, weekly, ' One little trick a week, on Thursday morning, about 9:30 (Spanish time), with a link to practise it, a summary of your week and, if you are in the friends ranking, how your friends are doing'),
      monthlyRow,
      h('p', { class: 'muted' }, 'The monthly summary is built from the progress copy you keep in the cloud: answers, streak and the topics to revisit. It is not an exam score.'), msg);
  };

  /* The emails stay opt-in: consent has to be an explicit yes, never a pre-ticked box or a list people are put on. But nobody should have to hunt for the
     switch, so once per device Pica asks a signed-in person who has not got the emails: "Yes, send it" or "No thanks". Dismissing counts as an answer too. */
  const ASKED = 'c1path.digestasked';
  A.askDigest = () => {
    if (!cloudOn() || !window.PicaSay || !Cloud.user || !Cloud.user() || document.body.classList.contains('exam-focus')) return Promise.resolve(false);
    try { if (localStorage.getItem(ASKED)) return Promise.resolve(false); } catch (e) { return Promise.resolve(false); }
    return Cloud.rpc('get_digest').then((on) => {
      try { localStorage.setItem(ASKED, '1'); } catch (e) { /* optional */ }
      if (on) return false;
      window.PicaSay('Would you like one little trick by email every Thursday morning? It takes a minute to read, and every email has a link that stops them.', [
        ['Yes, send it', () => Cloud.rpc('set_digest', { p_on: true }).then(() => { if (A.toast) A.toast('Done. The first trick arrives on Thursday morning.'); }).catch(() => { if (A.toast) A.toast('Could not save that. You can switch it on in your account page.'); })],
        ['No thanks', () => {}]
      ]);
      return true;
    }).catch(() => false);
  };
  /* a few seconds after the page opens, and again right after signing in */
  setTimeout(() => A.askDigest(), 6000);
  if (cloudOn() && Cloud.onChange) { let had = !!(Cloud.user && Cloud.user()); Cloud.onChange(() => { const has = !!(Cloud.user && Cloud.user()); if (has && !had) setTimeout(() => A.askDigest(), 3000); had = has; }); }

  A.routes.unsubscribe = (token) => {
    const out = h('p', { role: 'status' }, 'One moment…');
    A.view(h('h1', {}, 'Emails from C1 Path'), out, A.link('#/', 'Back to the site', 'btn'));
    if (!UUID.test(token || '')) { out.textContent = 'This link is not complete. Open it again from the email, or switch the emails off in your account page.'; return; }
    if (!cloudOn()) { out.textContent = 'This copy of the site cannot reach the email list.'; return; }
    Cloud.rpcPublic('unsubscribe_digest', { p_token: token })
      .then((done) => { out.textContent = done ? 'Done: you will not receive any more emails from C1 Path. You can switch them on again in your account page.' : 'You are already unsubscribed, or this link is old.'; })
      .catch((e) => { out.textContent = 'Could not unsubscribe just now (' + e.message + '). Try again, or switch the emails off in your account page.'; });
  };
})();
