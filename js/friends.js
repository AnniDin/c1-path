/* C1 Path – optional friends leaderboard (needs an account and supabase/friends.sql). Opt-in: nothing is shared until you join. */
(function () {
  const { h } = Engine;
  const A = window.App;
  const KEY = 'c1path.board';
  const get = () => { try { const v = JSON.parse(localStorage.getItem(KEY) || 'null'); const u = window.Cloud && Cloud.user && Cloud.user(); return v && u && v.uid && v.uid !== u.id ? null : v; } catch (e) { return null; } }; // another account on this browser is not joined
  const put = (v) => { try { if (v) localStorage.setItem(KEY, JSON.stringify(v)); else localStorage.removeItem(KEY); } catch (e) { /* ignore */ } };
  const monday = () => { const d = new Date(); d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); return d.toLocaleDateString('sv'); };
  const weekAnswers = () => Object.entries(Store.state.days).filter(([k]) => k >= monday()).reduce((a, [, n]) => a + n, 0);
  const friendly = (e) => (/function|schema cache|404/i.test(e.message || '') ? 'The friends feature is not set up on the server yet (supabase/friends.sql has not been run).' : e.message || 'Something went wrong.');

  async function publish() {
    if (!get() || !window.Cloud || !Cloud.user()) return;
    const lv = A.rewards ? A.rewards.level().n : 1;
    await Cloud.rpc('update_board', { p_week: monday(), p_answers: weekAnswers(), p_streak: Store.streak(), p_level: lv });
  }
  let t;
  Store.onChange(() => { if (get()) { clearTimeout(t); t = setTimeout(() => publish().catch(() => {}), 8000); } });

  A.friendsCard = () => {
    const box = h('div');
    const card = (...kids) => A.cardBlock('Friends', ...kids);
    const msg = h('p', { class: 'muted', role: 'status' });
    const draw = async () => {
      if (!window.Cloud || !Cloud.enabled) return box.replaceChildren();
      if (!Cloud.user()) return box.replaceChildren(card(h('p', { class: 'muted' }, 'Sign in (button at the top) to join a friends leaderboard: a weekly ranking by questions answered, shared only with people who have your code.')));
      const me = get();
      if (!me) {
        const name = h('input', { type: 'text', maxlength: 24, placeholder: 'Display name', 'aria-label': 'Display name', value: String((Cloud.user().email || '').split('@')[0]).slice(0, 24) });
        return box.replaceChildren(card(
          h('p', { class: 'muted' }, 'Compete with friends in a weekly ranking. It is optional. If you join, your display name, questions answered this week, streak and level are visible only to people who add your friend code, or whose code you add: a friendship is mutual. You can leave at any time and it is deleted.'),
          h('div', { class: 'row' }, name, h('button', { class: 'btn small', onclick: async () => {
            try { const code = await Cloud.rpc('join_board', { p_name: name.value || 'Learner' }); put({ code, uid: Cloud.user().id }); await publish(); draw(); } catch (e) { msg.textContent = friendly(e); }
          } }, 'Join')), msg));
      }
      box.replaceChildren(card(h('p', { class: 'muted' }, 'Loading…')));
      try {
        await publish();
        const rows = ((await Cloud.rpc('friend_board', {})) || []).map((r) => Object.assign({}, r, { answers: r.week === monday() ? r.answers : 0 })).sort((a, b) => b.answers - a.answers || b.streak - a.streak);
        const friend = h('input', { type: 'text', maxlength: 8, placeholder: 'Friend code', 'aria-label': 'Friend code', style: 'text-transform:uppercase;width:9em' });
        box.replaceChildren(card(
          h('p', {}, 'Your friend code: ', h('strong', { class: 'fcode' }, me.code), ' ', h('button', { class: 'btn small ghost', onclick: () => { navigator.clipboard && navigator.clipboard.writeText(me.code); msg.textContent = 'Code copied. Send it to a friend.'; } }, 'Copy')),
          rows.length > 1 ? null : h('p', { class: 'muted' }, 'Add a friend with their code to see the ranking.'),
          ...rows.map((r, i) => h('div', { class: 'trow friend' + (r.me ? ' me' : '') }, h('span', {}, `${i + 1}. ${r.name}${r.me ? ' (you)' : ''}`), A.bar(Math.min(1, r.answers / Math.max(1, rows[0].answers || 1)), r.me ? 'ok' : ''),
            h('span', { class: 'muted' }, `${r.answers} this week · 🔥${r.streak} · L${r.level}`),
            r.me ? h('span') : h('button', { class: 'icon-btn', 'aria-label': 'Remove ' + r.name, onclick: async () => { await Cloud.rpc('remove_friend', { p_code: r.code }); draw(); } }, '✕'))),
          h('div', { class: 'row' }, friend, h('button', { class: 'btn small', onclick: async () => {
            try { const ok = await Cloud.rpc('add_friend', { p_code: friend.value }); if (ok) draw(); else msg.textContent = 'No one has that code. Check it with your friend.'; } catch (e) { msg.textContent = friendly(e); }
          } }, 'Add friend'), h('button', { class: 'btn small ghost', onclick: async () => { if (confirm('Leave the leaderboard? Your name and scores are deleted from it.')) { await Cloud.rpc('leave_board', {}); put(null); draw(); } } }, 'Leave')), msg));
      } catch (e) { box.replaceChildren(card(h('p', { class: 'muted' }, friendly(e)))); }
    };
    draw();
    if (window.Cloud && Cloud.onChange) Cloud.onChange(() => { if (document.body.contains(box)) draw(); });
    return box;
  };
})();
