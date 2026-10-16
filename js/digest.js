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
      h('p', { class: 'muted' }, 'Both are off unless you switch them on, and every email has a link that stops them all. They go to ', h('strong', {}, (Cloud.user() || {}).email || 'your email'), '.'),
      h('label', { for: 'digest-on', class: 'row' }, weekly, ' One little trick a week, on Thursday morning, about 9:30 (Spanish time), with a link to practise it'),
      monthlyRow,
      h('p', { class: 'muted' }, 'The monthly summary is built from the progress copy you keep in the cloud: answers, streak and the topics to revisit. It is not an exam score.'), msg);
  };

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
