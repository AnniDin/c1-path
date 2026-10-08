/* C1 Path – optional friends leaderboard (needs an account and supabase/friends.sql). Opt-in: nothing is shared until you join. */
(function () {
  const { h } = Engine;
  const A = window.App;
  const KEY = 'c1path.board';
  const get = () => { try { const v = JSON.parse(localStorage.getItem(KEY) || 'null'); const u = window.Cloud && Cloud.user && Cloud.user(); return v && u && v.uid && v.uid !== u.id ? null : v; } catch (e) { return null; } }; // another account on this browser is not joined
  const put = (v) => { try { if (v) localStorage.setItem(KEY, JSON.stringify(v)); else localStorage.removeItem(KEY); } catch (e) { /* ignore */ } };
  const monday = () => { const d = new Date(); d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); return d.toLocaleDateString('sv'); };
  const weekAnswers = () => Object.entries(Store.state.days).filter(([k]) => k >= monday()).reduce((a, [, n]) => a + n, 0);
  const CODE = /^[0-9A-F]{6}$/;
  /* what a person typed into a friend-code box: returns { code } or { problem } with a plain explanation */
  const checkCode = (raw, mine, known) => {
    const c = String(raw || '').trim().toUpperCase();
    if (!c) return { problem: 'Type your friend\'s code first.' };
    if (!CODE.test(c)) return { problem: 'A friend code is 6 characters, digits and the letters A to F, like 7D379A. Names do not work here: ask your friend for the code under "Your friend code" in their account page.' };
    if (mine && c === mine) return { problem: 'That is your own code. Send it to your friend, and ask them for theirs.' };
    if ((known || []).includes(c)) return { problem: 'You are already friends with that person.' };
    return { code: c };
  };
  A.checkFriendCode = checkCode;
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
        const name = h('input', { type: 'text', id: 'fname', maxlength: 24, placeholder: 'Your name', value: String((Cloud.user().email || '').split('@')[0]).slice(0, 24) });
        const code0 = h('input', { type: 'text', id: 'fcode0', maxlength: 8, placeholder: 'Their code (optional)', style: 'text-transform:uppercase;width:12em' });
        return box.replaceChildren(card(
          h('p', { class: 'muted' }, 'Compete with friends in a weekly ranking. It is optional. If you join, your display name, questions answered this week, streak and level are visible only to people who add your friend code, or whose code you add: a friendship is mutual. You can leave at any time and it is deleted.'),
          h('div', { class: 'row' }, h('label', { for: 'fname' }, 'Your name, shown to your friends'), name),
          h('div', { class: 'row' }, h('label', { for: 'fcode0' }, 'A friend\'s code, if you have one'), code0),
          h('button', { class: 'btn small', onclick: async () => {
            if (CODE.test(name.value.trim().toUpperCase())) { msg.textContent = 'That looks like a friend code, not a name. Put the code in the second box, and your name in the first.'; return; }
            const first = code0.value.trim() ? checkCode(code0.value) : null;
            if (first && first.problem) { msg.textContent = first.problem; return; }
            try {
              const code = await Cloud.rpc('join_board', { p_name: name.value.trim() || 'Learner' }); put({ code, uid: Cloud.user().id });
              if (first) { try { const added = await Cloud.rpc('add_friend', { p_code: first.code }); if (!added) A.toast && A.toast('Joined, but no one has that friend code yet. Check it and add it again below.'); } catch (e) { /* the code can be added again later */ } }
              await publish(); draw();
            } catch (e) { msg.textContent = friendly(e); }
          } }, 'Join the ranking'), msg));
      }
      box.replaceChildren(card(h('p', { class: 'muted' }, 'Loading…')));
      try {
        await publish();
        const rows = ((await Cloud.rpc('friend_board', {})) || []).map((r) => Object.assign({}, r, { answers: r.week === monday() ? r.answers : 0 })).sort((a, b) => b.answers - a.answers || b.streak - a.streak);
        const friend = h('input', { type: 'text', maxlength: 8, placeholder: 'Friend code', 'aria-label': 'Friend code', style: 'text-transform:uppercase;width:9em' });
        box.replaceChildren(card(
          h('p', { class: 'muted' }, 'Give your code to a friend and they type it under "Add a friend" below: you will see each other.'),
          h('p', {}, 'Your friend code: ', h('strong', { class: 'fcode' }, me.code), ' ', h('button', { class: 'btn small ghost', onclick: () => { navigator.clipboard && navigator.clipboard.writeText(me.code); msg.textContent = 'Code copied. Send it to a friend.'; } }, 'Copy')),
          rows.length > 1 ? null : h('p', { class: 'muted' }, 'Add a friend with their code to see the ranking.'),
          ...rows.map((r, i) => h('div', { class: 'trow friend' + (r.me ? ' me' : '') }, h('span', {}, `${i + 1}. ${r.name}${r.me ? ' (you)' : ''}`), A.bar(Math.min(1, r.answers / Math.max(1, rows[0].answers || 1)), r.me ? 'ok' : ''),
            h('span', { class: 'muted' }, `${r.answers} this week · 🔥${r.streak} · L${r.level}`),
            r.me ? h('span') : h('button', { class: 'icon-btn', 'aria-label': 'Remove ' + r.name, onclick: async () => { await Cloud.rpc('remove_friend', { p_code: r.code }); draw(); } }, '✕'))),
          h('div', { class: 'row' }, h('label', { for: 'fname2' }, 'Your name'), h('input', { type: 'text', id: 'fname2', maxlength: 24, value: ((rows.find((r) => r.me) || {}).name) || '' }),
            h('button', { class: 'btn small ghost', onclick: async () => { const v = document.getElementById('fname2').value.trim(); if (!v) return; if (CODE.test(v.toUpperCase())) { msg.textContent = 'That looks like a friend code, not a name.'; return; } try { await Cloud.rpc('join_board', { p_name: v }); draw(); } catch (e) { msg.textContent = friendly(e); } } }, 'Change name')),
          h('p', { class: 'muted', style: 'margin-bottom:4px' }, 'Add a friend: type their code.'),
          h('div', { class: 'row' }, friend, h('button', { class: 'btn small', onclick: async () => {
            const chk = checkCode(friend.value, me.code, rows.map((r) => r.code)); if (chk.problem) { msg.textContent = chk.problem; return; }
            try { const ok = await Cloud.rpc('add_friend', { p_code: chk.code }); if (ok) { A.toast && A.toast('Friend added. You can see each other now.'); draw(); } else msg.textContent = 'No one has that code. Check it with your friend: it is the code under "Your friend code" on their account page, not their name.'; } catch (e) { msg.textContent = friendly(e); }
          } }, 'Add friend'), h('button', { class: 'btn small ghost', onclick: async () => { if (confirm('Leave the leaderboard? Your name and scores are deleted from it.')) { await Cloud.rpc('leave_board', {}); put(null); draw(); } } }, 'Leave')), msg));
      } catch (e) { box.replaceChildren(card(h('p', { class: 'muted' }, friendly(e)))); }
    };
    draw();
    if (window.Cloud && Cloud.onChange) Cloud.onChange(() => { if (document.body.contains(box)) draw(); });
    return box;
  };
})();
