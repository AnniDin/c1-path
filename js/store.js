/* Progress storage (localStorage with in-memory fallback), streaks and spaced repetition. */
(function () {
  const KEY = 'c1path.v1';
  const fresh = () => ({ stats: {}, days: {}, cards: {}, newToday: {}, lessons: {}, scores: {}, placement: null, theme: null, mistakes: {}, notes: [], drafts: {}, skills: {}, goal: 20, voices: { a: '', b: '' }, welcomed: false, badges: {}, acts: {}, exam: null, mocks: [], dev: '', own: { stats: {}, days: {}, newToday: {} }, peers: {}, tomb: {} });
  let mem = null;

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return Object.assign(fresh(), JSON.parse(raw));
    } catch (e) { /* storage unavailable */ }
    return mem || fresh();
  }
  let state = load();
  const listeners = [];
  /* Each device counts its own answers (own) and remembers the latest counts it received from the others (peers);
     the totals shown in the app (stats, days, newToday) are always own + peers, so merging never double-counts or loses answers. */
  const clone = (o) => JSON.parse(JSON.stringify(o || {}));
  function migrate() {
    if (!state.dev) {
      state.dev = 'd' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
      state.own = { stats: clone(state.stats), days: clone(state.days), newToday: clone(state.newToday) };
    }
    state.own.sub = state.own.sub || {}; state.own.fx = state.own.fx || {}; state.own.wk = state.own.wk || {}; state.own.dk = state.own.dk || {};
    state.peers = state.peers || {}; state.tomb = state.tomb || {};
  }
  function recompute() {
    const stats = {}, days = {}, nt = {}, subs = {}, fx = {}, wk = {}, dk = {};
    [state.own].concat(Object.values(state.peers)).forEach((p) => {
      Object.keys(p.stats || {}).forEach((k) => { const a = stats[k] || (stats[k] = { c: 0, t: 0 }); a.c += p.stats[k].c; a.t += p.stats[k].t; });
      Object.keys(p.days || {}).forEach((k) => { days[k] = (days[k] || 0) + p.days[k]; });
      Object.keys(p.newToday || {}).forEach((k) => { nt[k] = (nt[k] || 0) + p.newToday[k]; });
      Object.keys(p.sub || {}).forEach((k) => { const a = subs[k] || (subs[k] = { label: p.sub[k].label, href: p.sub[k].href, c: 0, t: 0 }); a.c += p.sub[k].c; a.t += p.sub[k].t; });
      Object.keys(p.fx || {}).forEach((k) => { const a = fx[k] || (fx[k] = { n: 0, sum: 0 }); a.n += p.fx[k].n; a.sum += p.fx[k].sum; });
      Object.keys(p.wk || {}).forEach((w) => Object.keys(p.wk[w]).forEach((id) => { const a = ((wk[w] = wk[w] || {})[id] = wk[w][id] || [0, 0]); a[0] += p.wk[w][id][0]; a[1] += p.wk[w][id][1]; }));
      Object.keys(p.dk || {}).forEach((w) => Object.keys(p.dk[w]).forEach((id) => { const a = ((dk[w] = dk[w] || {})[id] = dk[w][id] || [0, 0]); a[0] += p.dk[w][id][0]; a[1] += p.dk[w][id][1]; }));
    });
    state.stats = stats; state.days = days; state.newToday = nt; state.sub = subs; state.fx = fx; state.wk = wk; state.dk = dk;
  }
  const act = (kind) => { const d = dayStr(); state.acts = state.acts || {}; (state.acts[d] = state.acts[d] || {})[kind] = 1; Object.keys(state.acts).sort().slice(0, -14).forEach((k) => delete state.acts[k]); };
  const bury = (kind, id) => { state.tomb[kind + ':' + id] = Date.now(); };
  migrate();
  function save() {
    mem = state;
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
    listeners.forEach((f) => { try { f(); } catch (e) { /* ignore */ } });
  }

  const dayStr = (d) => (d || new Date()).toLocaleDateString('sv'); // YYYY-MM-DD, local time
  const weekStr = () => { const d = new Date(); d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); return dayStr(d); }; // the Monday of this week
  const addDays = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return dayStr(d); };

  const Store = {
    get state() { return state; },
    today: () => dayStr(),

    record(topic, correct, total) {
      const s = state.stats[topic] || (state.stats[topic] = { c: 0, t: 0 });
      s.c += correct; s.t += total;
      state.days[dayStr()] = (state.days[dayStr()] || 0) + total;
      const o = state.own.stats[topic] || (state.own.stats[topic] = { c: 0, t: 0 });
      o.c += correct; o.t += total;
      state.own.days[dayStr()] = (state.own.days[dayStr()] || 0) + total;
      save();
    },
    accuracy(topic) {
      const s = state.stats[topic];
      return s && s.t ? s.c / s.t : null;
    },
    streak() {
      let n = 0, i = 0;
      if (!state.days[addDays(0)]) i = -1; // today not yet practised: streak still alive from yesterday
      while (state.days[addDays(i)]) { n++; i--; }
      return n;
    },
    totalAnswered() { return Object.values(state.stats).reduce((a, s) => a + s.t, 0); },
    lastDays(n) {
      const out = [];
      for (let i = n - 1; i >= 0; i--) out.push({ day: addDays(-i), n: state.days[addDays(-i)] || 0 });
      return out;
    },
    setScore(key, c, t) {
      act('set');
      const p = t ? c / t : 0;
      const last = { p, ts: Date.now() }, old = state.scores[key];
      const n = (old ? old.n || 1 : 0) + 1;
      state.scores[key] = !old || p > old.p ? { p, c, t, last, n } : Object.assign({}, old, { last, n }); // best score, the latest attempt and how many attempts
      save();
    },
    score(key) { return state.scores[key] || null; },
    /* sub-skill tallies (rows: [{ id, label, href, c, t }]) and the log of how suggestions worked, counted per device and added up on merge */
    addSubs(rows) {
      const w = (state.own.wk[weekStr()] = state.own.wk[weekStr()] || {}), dd = (state.own.dk[dayStr()] = state.own.dk[dayStr()] || {});
      rows.forEach((r) => {
        const o = state.own.sub[r.id] || (state.own.sub[r.id] = { label: r.label, href: r.href, c: 0, t: 0 }); o.c += r.c; o.t += r.t;
        const x = w[r.id] || (w[r.id] = [0, 0]); x[0] += r.c; x[1] += r.t;
        const y = dd[r.id] || (dd[r.id] = [0, 0]); y[0] += r.c; y[1] += r.t;
      });
      Object.keys(state.own.dk).sort().slice(0, -60).forEach((k) => delete state.own.dk[k]);
      Object.keys(state.own.wk).sort().slice(0, -26).forEach((k) => delete state.own.wk[k]); // half a year of weeks is plenty
      recompute(); save();
    },
    addFx(kind, n, sum) { const o = state.own.fx[kind] || (state.own.fx[kind] = { n: 0, sum: 0 }); o.n += n; o.sum += sum; recompute(); save(); },
    exportData() { return JSON.stringify(state); },
    importData(json) {
      const d = JSON.parse(json);
      if (!d || typeof d !== 'object' || !d.stats || !d.days) throw new Error('Not a C1 Path backup');
      state = Object.assign(fresh(), d); migrate(); recompute(); save();
    },

    /* Merge another device's data into this one. Nothing is lost on either side: counts are kept per device and added up,
       the more advanced result wins for cards, scores and lessons, notes are combined, and deletions are remembered. */
    mergeData(json) {
      const d = typeof json === 'string' ? JSON.parse(json) : json;
      if (!d || typeof d !== 'object' || !d.stats || !d.days) throw new Error('Not a C1 Path backup');
      const r = Object.assign(fresh(), d), s = state;
      const each = (o, fn) => Object.keys(o || {}).forEach((k) => fn(k, o[k]));
      const weight = (p) => Object.values((p && p.stats) || {}).reduce((a, x) => a + x.t, 0) + Object.keys((p && p.days) || {}).length + Object.values((p && p.sub) || {}).reduce((a, x) => a + x.t, 0) + Object.values((p && p.fx) || {}).reduce((a, x) => a + x.n, 0);
      // per-device counters
      const incoming = Object.assign({}, r.peers);
      incoming[r.dev || 'legacy'] = r.own && r.dev ? r.own : { stats: r.stats, days: r.days, newToday: r.newToday };
      each(incoming, (id, p) => {
        if (id === s.dev) { if (weight(p) > weight(s.own)) s.own = clone(p); return; } // restoring this device from its own backup
        if (!s.peers[id] || weight(p) > weight(s.peers[id])) s.peers[id] = clone(p);
      });
      recompute();
      // deletions: remember the newest, then drop anything that was deleted after it was last changed
      each(r.tomb, (k, v) => { s.tomb[k] = Math.max(s.tomb[k] || 0, v); });
      const cutoff = Date.now() - 90 * 86400000;
      each(s.tomb, (k, v) => { if (v < cutoff) delete s.tomb[k]; });
      each(r.cards, (k, v) => { const c = s.cards[k]; if (!c || (v.ts && c.ts ? v.ts > c.ts : v.box > c.box || (v.box === c.box && v.due > c.due))) s.cards[k] = v; }); // newest rating wins, so Again on one device sticks; copies without a time keep the old rule
      each(r.lessons, (k, v) => { if (v) s.lessons[k] = v; });
      each(r.scores, (k, v) => { const o = s.scores[k], best = !o || v.p > o.p ? Object.assign({}, v) : Object.assign({}, o), la = [o && o.last, v.last].filter(Boolean).sort((a, b) => b.ts - a.ts)[0]; if (la) best.last = la; best.n = Math.max((o && o.n) || (o ? 1 : 0), v.n || 1); s.scores[k] = best; });
      each(r.mistakes, (k, v) => { const m = s.mistakes[k]; if (!m || v.ts > m.ts) s.mistakes[k] = v; else if (v.ts === m.ts) m.right = Math.max(m.right || 0, v.right || 0); });
      each(s.mistakes, (k, v) => { if ((s.tomb['m:' + k] || 0) >= v.ts) delete s.mistakes[k]; });
      each(r.drafts, (k, v) => { if (!s.drafts[k] || v.ts > s.drafts[k].ts) s.drafts[k] = v; });
      /* a skill record holds several fields (done, self-ratings, AI checks): merge field by field so one device never erases what the other did */
      const mergeSkill = (a, b) => {
        if (!a) return b;
        const m = (b.ts || 0) > (a.ts || 0) ? Object.assign({}, a, b) : Object.assign({}, b, a);
        if (a.done || b.done) m.done = true;
        if (a.ai || b.ai) { const seen = new Set(); m.ai = (a.ai || []).concat(b.ai || []).filter((x) => !seen.has(x.ts) && seen.add(x.ts)).sort((x, y) => x.ts - y.ts).slice(-6); }
        m.ts = Math.max(a.ts || 0, b.ts || 0);
        return m;
      };
      each(r.skills, (k, v) => { s.skills[k] = mergeSkill(s.skills[k], v); });
      (r.notes || []).forEach((n) => { const i = s.notes.findIndex((x) => x.id === n.id); if (i < 0) s.notes.push(n); else if (n.ts > s.notes[i].ts) s.notes[i] = n; });
      s.notes = s.notes.filter((n) => (s.tomb['n:' + n.id] || 0) < n.ts);
      if (r.welcomed) s.welcomed = true;
      if (r.exam && (!s.exam || r.exam.ts > s.exam.ts)) s.exam = r.exam;
      s.mocks = s.mocks || []; (r.mocks || []).forEach((m) => { if (!s.mocks.some((x) => x.ts === m.ts)) s.mocks.push(m); }); s.mocks.sort((a, b) => a.ts - b.ts); s.mocks = s.mocks.slice(-60);
      s.acts = s.acts || {}; each(r.acts, (d, v) => { s.acts[d] = Object.assign(s.acts[d] || {}, v); });
      s.badges = s.badges || {}; each(r.badges, (k, v) => { if (!s.badges[k] || v < s.badges[k]) s.badges[k] = v; });
      if (r.placement && (!s.placement || (r.placement.ts || 0) > (s.placement.ts || 0) || (!r.placement.ts && !s.placement.ts && r.placement.date > s.placement.date))) s.placement = r.placement;
      if ((r.goalTs || 0) > (s.goalTs || 0)) { s.goal = r.goal; s.goalTs = r.goalTs; }
      save();
    },

    /* ---- mistakes log ---- */
    itemId(item) {
      const str = item.uid ? 'uid|' + item.uid : (item.type || '') + '|' + (item.q || item.first || item.second || '') + '|' + (item.options ? item.options.join('/') : '');
      let hsh = 5381; for (let i = 0; i < str.length; i++) hsh = ((hsh * 33) ^ str.charCodeAt(i)) >>> 0;
      return 'm' + hsh.toString(36);
    },
    /* results: [{ ok, given, item }]. A wrong answer is saved; a mistake is cleared after two correct answers. */
    logResults(results, source) {
      results.forEach((r) => {
        if (!r.item) return;
        const id = Store.itemId(r.item), m = state.mistakes[id];
        if (!r.ok) {
          state.mistakes[id] = {
            id, item: r.item, given: r.given || '', topic: m ? m.topic : source.topic, label: m ? m.label : source.label, href: m ? m.href : source.href,
            count: (m ? m.count : 0) + 1, right: 0, ts: Date.now()
          };
        } else if (m) {
          m.right = (m.right || 0) + 1;
          if (m.right >= 2) { delete state.mistakes[id]; bury('m', id); }
        }
      });
      const ids = Object.keys(state.mistakes);
      if (ids.length > 400) ids.sort((a, b) => state.mistakes[a].ts - state.mistakes[b].ts).slice(0, ids.length - 400).forEach((k) => delete state.mistakes[k]);
      save();
    },
    mistakes() { return Object.values(state.mistakes).sort((a, b) => b.ts - a.ts); },
    removeMistake(id) { delete state.mistakes[id]; bury('m', id); save(); },
    clearMistakes() { Object.keys(state.mistakes).forEach((id) => bury('m', id)); state.mistakes = {}; save(); },

    /* ---- notebook ---- */
    notes() { return state.notes.slice().sort((a, b) => b.ts - a.ts); },
    addNote(n) {
      const note = { id: 'n' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5), title: n.title || '', text: n.text || '', tag: n.tag || 'Other', href: n.href || '', source: n.source || '', ts: Date.now() };
      state.notes.push(note); save(); return note;
    },
    updateNote(id, patch) { const n = state.notes.find((x) => x.id === id); if (n) { Object.assign(n, patch, { ts: Date.now() }); save(); } },
    deleteNote(id) { state.notes = state.notes.filter((x) => x.id !== id); bury('n', id); save(); },

    /* ---- writing drafts, skills self-assessment, daily goal ---- */
    draft(id) { return state.drafts[id] || null; },
    saveDraft(id, text) { state.drafts[id] = { text, ts: Date.now(), words: (text.trim().match(/\S+/g) || []).length }; save(); },
    skill(key) { return state.skills[key] || null; },
    setSkill(key, data) { act('skill'); state.skills[key] = Object.assign({}, state.skills[key], data, { ts: Date.now() }); save(); },
    setVoice(slot, name) { state.voices = Object.assign({ a: '', b: '' }, state.voices, { [slot]: name }); save(); },
    goal() { return state.goal || 20; },
    setGoal(n) { state.goal = n; state.goalTs = Date.now(); save(); },
    todayCount() { return state.days[dayStr()] || 0; },
    markLesson(id) { act('lesson'); state.lessons[id] = true; save(); },
    setPlacement(p) { state.placement = Object.assign({}, p, { ts: Date.now() }); save(); },
    setTheme(t) { state.theme = t; save(); },
    setExam(date) { state.exam = date ? { date, ts: Date.now() } : { date: '', ts: Date.now() }; save(); },
    addMock(m) { state.mocks = (state.mocks || []).concat([m]).slice(-60); save(); },
    earn(id) { state.badges = state.badges || {}; if (state.badges[id]) return false; state.badges[id] = Date.now(); save(); return true; },
    setWelcomed() { if (!state.welcomed) { state.welcomed = true; save(); } },
    reset() { state = fresh(); migrate(); save(); },
    onChange(fn) { listeners.push(fn); },

    /* ---- spaced repetition (Leitner boxes) ---- */
    INTERVALS: [0, 1, 2, 4, 7, 14, 30, 60],
    card(id) { return state.cards[id]; },
    isDue(id) { const c = state.cards[id]; return !!c && c.due <= dayStr(); },
    rate(id, rating) { // 0 again, 1 hard, 2 good, 3 easy
      const isNew = !state.cards[id];
      const c = state.cards[id] || { box: 0, due: dayStr() };
      const max = Store.INTERVALS.length - 1;
      if (rating === 0) c.box = 0;
      else if (rating === 2) c.box = Math.min(max, c.box + 1);
      else if (rating === 3) c.box = Math.min(max, c.box + 2);
      else c.box = Math.max(1, c.box);
      c.due = rating === 0 ? dayStr() : addDays(Store.INTERVALS[c.box]);
      c.ts = Math.max(Date.now(), (c.ts || 0) + 1); // always newer than the copy it replaces
      state.cards[id] = c;
      if (isNew) { state.newToday[dayStr()] = (state.newToday[dayStr()] || 0) + 1; state.own.newToday[dayStr()] = (state.own.newToday[dayStr()] || 0) + 1; }
      save();
      return c;
    },
    didToday(kind) { const a = (state.acts || {})[dayStr()] || {}; return kind ? !!a[kind] : Object.keys(a).length > 0; },
    newTodayCount() { return state.newToday[dayStr()] || 0; },
    intervalLabel(id, rating) {
      const c = state.cards[id] || { box: 0 };
      const max = Store.INTERVALS.length - 1;
      let b = c.box;
      if (rating === 0) return 'today';
      if (rating === 2) b = Math.min(max, b + 1);
      if (rating === 3) b = Math.min(max, b + 2);
      if (rating === 1) b = Math.max(1, b);
      const d = Store.INTERVALS[b];
      return d === 1 ? '1 day' : d + ' days';
    }
  };
  window.Store = Store;
})();
