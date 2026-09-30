/* Progress storage (localStorage with in-memory fallback), streaks and spaced repetition. */
(function () {
  const KEY = 'c1path.v1';
  const fresh = () => ({ stats: {}, days: {}, cards: {}, newToday: {}, lessons: {}, scores: {}, placement: null, theme: null });
  let mem = null;

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return Object.assign(fresh(), JSON.parse(raw));
    } catch (e) { /* storage unavailable */ }
    return mem || fresh();
  }
  let state = load();
  function save() {
    mem = state;
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
  }

  const dayStr = (d) => (d || new Date()).toLocaleDateString('sv'); // YYYY-MM-DD, local time
  const addDays = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return dayStr(d); };

  const Store = {
    get state() { return state; },
    today: () => dayStr(),

    record(topic, correct, total) {
      const s = state.stats[topic] || (state.stats[topic] = { c: 0, t: 0 });
      s.c += correct; s.t += total;
      state.days[dayStr()] = (state.days[dayStr()] || 0) + total;
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
      const p = t ? c / t : 0;
      if (!state.scores[key] || p > state.scores[key].p) state.scores[key] = { p, c, t };
      save();
    },
    score(key) { return state.scores[key] || null; },
    exportData() { return JSON.stringify(state); },
    importData(json) {
      const d = JSON.parse(json);
      if (!d || typeof d !== 'object' || !d.stats || !d.days) throw new Error('Not a C1 Path backup');
      state = Object.assign(fresh(), d); save();
    },
    markLesson(id) { state.lessons[id] = true; save(); },
    setPlacement(p) { state.placement = p; save(); },
    setTheme(t) { state.theme = t; save(); },
    reset() { state = fresh(); save(); },

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
      state.cards[id] = c;
      if (isNew) state.newToday[dayStr()] = (state.newToday[dayStr()] || 0) + 1;
      save();
      return c;
    },
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
