/* C1 Path – the weekly "little trick" email: the switch on the account page and the unsubscribe page for the link in every email.
   The sending itself is tools/send_digest.js (a weekly GitHub Action); the list lives in Supabase (supabase/digest.sql). */
(function () {
  const { h } = Engine;
  const A = window.App;
  const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const cloudOn = () => !!(window.Cloud && Cloud.enabled);

  A.digestCard = () => {
    const msg = h('p', { class: 'muted', role: 'status' });
    const box = h('input', { type: 'checkbox', id: 'digest-on', disabled: true });
    box.addEventListener('change', async () => {
      box.disabled = true; msg.textContent = 'Saving…';
      try { await Cloud.rpc('set_digest', { p_on: box.checked }); msg.textContent = box.checked ? 'Done. The next trick arrives on Monday morning.' : 'Done. No more emails.'; }
      catch (e) { box.checked = !box.checked; msg.textContent = 'Could not save this: ' + e.message; }
      box.disabled = false;
    });
    Cloud.rpc('get_digest').then((on) => { box.checked = !!on; box.disabled = false; }).catch(() => { msg.textContent = 'Weekly emails are not available on this copy of the site yet.'; });
    return A.cardBlock('A little trick by email',
      h('p', { class: 'muted' }, 'Once a week, on Monday, one short trick that settles a common doubt, with a link to practise it. Off unless you switch it on. Every email has a link to stop them.'),
      h('label', { for: 'digest-on', class: 'row' }, box, ' Send me one trick a week at ', h('strong', {}, (Cloud.user() || {}).email || 'my email')), msg);
  };

  A.routes.unsubscribe = (token) => {
    const out = h('p', { role: 'status' }, 'One moment…');
    A.view(h('h1', {}, 'Weekly trick emails'), out, A.link('#/', 'Back to the site', 'btn'));
    if (!UUID.test(token || '')) { out.textContent = 'This link is not complete. Open it again from the email, or switch the emails off in your account page.'; return; }
    if (!cloudOn()) { out.textContent = 'This copy of the site cannot reach the email list.'; return; }
    Cloud.rpcPublic('unsubscribe_digest', { p_token: token })
      .then((done) => { out.textContent = done ? 'Done: you will not receive any more trick emails. You can switch them on again in your account page.' : 'You are already unsubscribed, or this link is old.'; })
      .catch((e) => { out.textContent = 'Could not unsubscribe just now (' + e.message + '). Try again, or switch the emails off in your account page.'; });
  };
})();
