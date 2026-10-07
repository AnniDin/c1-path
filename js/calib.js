/* C1 Path – difficulty calibration with other learners' scores (optional, opt-in; needs supabase/calibration.sql).
   The expert rating (data/levels*.js) stays the base. For sets with enough shared first-attempt scores the rating is nudged towards
   what learners actually score, relative to the other sets of the same kind. Nothing is shared unless the learner turns it on. */
(function () {
  const { h } = Engine;
  const A = window.App;
  const SHARE = 'c1path.share', CACHE = 'c1path.calib', SENT = 'c1path.shared';
  const MIN_N = 15;            // learners needed before a set is adjusted
  const get = (k, d) => { try { return JSON.parse(localStorage.getItem(k) || 'null') || d; } catch (e) { return d; } };
  const put = (k, v) => { try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* ignore */ } };
  let rawMemo = null, parsedMemo = {};
  const calib = () => { let raw = null; try { raw = localStorage.getItem(CACHE); } catch (e) { /* ignore */ } if (raw !== rawMemo) { rawMemo = raw; try { parsedMemo = JSON.parse(raw || 'null') || {}; } catch (e) { parsedMemo = {}; } } return parsedMemo; };
  const sharing = () => get(SHARE, 0) === 1;

  /* ---------- the maths: crowd level from the average score, relative to the group (same exam part), blended with the expert rating ---------- */
  const groupOf = (key) => (key.startsWith('listen:') ? 'listen:' : key.split('/')[0] + '/');
  A.calibrate = (group, key, expert) => {
    const rows = calib().rows || {}, prefix = group === 'listening' ? 'listen:' : group + '/';
    const peers = Object.keys(rows).filter((k) => k.startsWith(prefix) && rows[k].n >= MIN_N);
    if (peers.length < 3 || !rows[key] || rows[key].n < MIN_N) return expert;
    const avgs = peers.map((k) => rows[k].avg), mean = avgs.reduce((a, b) => a + b, 0) / avgs.length;
    const sd = Math.max(0.05, Math.sqrt(avgs.reduce((a, b) => a + (b - mean) ** 2, 0) / avgs.length));
    const crowd = Math.min(5, Math.max(1, 3 - 1.1 * ((rows[key].avg - mean) / sd))), w = Math.min(0.5, rows[key].n / 60);
    return Math.min(5, Math.max(1, Math.round((1 - w) * expert + w * crowd)));
  };
  A.calibrationInfo = () => { const c = calib(), rows = c.rows || {}, ok = Object.values(rows).filter((r) => r.n >= MIN_N); return { sets: ok.length, learners: ok.reduce((m, r) => Math.max(m, r.n), 0), at: c.ts || 0 }; };

  /* ---------- download the averages (any visitor, once every 12 hours) ---------- */
  async function refresh() {
    const c = get(CACHE, {});
    if (!window.Cloud || !Cloud.enabled || (c.ts && Date.now() - c.ts < 12 * 36e5)) return;
    try {
      const list = (await Cloud.rpcPublic('set_calibration', {})) || [], rows = {};
      list.forEach((r) => { if (r && typeof r.set_key === 'string' && r.n >= 10 && r.avg_pct >= 0 && r.avg_pct <= 100) rows[r.set_key] = { n: r.n, avg: r.avg_pct / 100 }; });
      put(CACHE, { ts: Date.now(), rows });
    } catch (e) { put(CACHE, Object.assign({}, c, { ts: Date.now() - 11 * 36e5 })); } // not set up or offline: try again in an hour
  }
  setTimeout(refresh, 1500);

  /* ---------- share the first-attempt score of a set (only when switched on and signed in) ---------- */
  A.shareScore = (res, source, pct) => {
    if (!sharing() || !window.Cloud || !Cloud.user || !Cloud.user()) return;
    const m = ((source && source.href) || '').match(/^#\/practice\/([a-z]+)\/(\d+)/), l = ((source && source.href) || '').match(/^#\/skills\/listening\/([a-z0-9-]+)$/);
    const key = m ? m[1] + '/' + m[2] : l ? 'listen:' + l[1] : null;
    if (!key || res.length < 3) return;
    const sc = Store.score(key), sent = get(SENT, {});
    if (!sc || sc.n !== 1 || sent[key]) return; // first attempt only, once
    sent[key] = 1; put(SENT, sent);
    Cloud.rpc('submit_set_score', { p_key: key, p_pct: Math.max(0, Math.min(100, Math.round(pct))) }).catch(() => { delete sent[key]; put(SENT, sent); });
  };
  void groupOf;

  /* ---------- the switch (Review) ---------- */
  A.calibCard = () => {
    if (!window.Cloud || !Cloud.enabled) return null;
    const box = h('div'), msg = h('p', { class: 'muted', role: 'status' });
    const draw = () => {
      const info = A.calibrationInfo(), user = window.Cloud.user && Cloud.user(), on = sharing();
      const status = info.sets ? `Difficulty is already adjusted for ${info.sets} set${info.sets === 1 ? '' : 's'} using the scores of up to ${info.learners} learners.` : 'Not enough scores have been shared yet to adjust any set.';
      box.replaceChildren(A.cardBlock('Help calibrate the difficulty',
        h('p', { class: 'muted' }, 'Each set has an expert difficulty rating. If you switch this on, your score on your FIRST attempt at each set is shared anonymously with the other learners, and the ratings are nudged towards what people really score. Nobody can read your scores: the site only ever sees averages of at least ten learners. You can stop at any time and your shared scores are deleted.'),
        h('p', {}, status),
        !user ? h('p', { class: 'muted' }, 'Sign in (button at the top) to take part.')
          : h('div', { class: 'row' }, on
            ? h('button', { class: 'btn small ghost', onclick: async () => { try { await Cloud.rpc('forget_set_scores', {}); put(SHARE, null); put(SENT, null); msg.textContent = 'Stopped. Your shared scores were deleted.'; draw(); } catch (e) { msg.textContent = 'Could not delete them just now: ' + (e.message || 'try again'); } } }, 'Stop sharing and delete my scores')
            : h('button', { class: 'btn small', onclick: () => { put(SHARE, 1); msg.textContent = 'Thank you. From now on your first attempt at each set is shared.'; draw(); } }, 'Share my first attempts')),
        msg));
    };
    draw();
    if (Cloud.onChange) Cloud.onChange(() => { if (document.body.contains(box)) draw(); });
    return box;
  };
})();
