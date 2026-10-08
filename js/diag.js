/* C1 Path – sub-skill diagnosis: every answered question is tagged with the skill it tests (prepositions, inversion, collocations...),
   so "what to do next" can say WHAT you keep missing, not just how much. Tags come from the item itself (key words, answer, explanation),
   and the tallies are counted per device and added up when devices sync. */
(function () {
  const A = window.App;
  const KEY = 'c1path.sub';
  const words = (s) => new Set(s.split(' '));
  const PREP = words('in on at by for from of with to into onto about against between among through over under after before during without within towards upon across along');
  const AUX = words('is are was were be been being have has had do does did will would can could shall should may might must');
  const LINK = words('although though while whereas despite however whatever whether unless since because yet but so as than if until once');
  const REL = words('who whom whose which that it its they them he she we one ones itself themselves himself herself');
  const DET = words('the a an some any no much many few little each every all both either neither such enough more most another other several');

  const TAGS = {
    inversion: ['Inversion', '#/grammar/inversion'], passive: ['Passives and reporting structures', '#/grammar/passive'], conditionals: ['Conditionals', '#/grammar/conditionals'],
    wish: ['Wishes and preferences', '#/grammar/wish'], reporting: ['Reported speech', '#/grammar/reporting'], modals: ['Modals of deduction and criticism', '#/grammar/modals'],
    relatives: ['Relative clauses and pronouns', '#/grammar/relatives'], comparison: ['Comparison', '#/grammar/comparison'], participle: ['Participle clauses', '#/grammar/participle'],
    cleft: ['Cleft sentences', '#/grammar/cleft'], patterns: ['Verb patterns', '#/grammar/patterns'], determiners: ['Articles, determiners and quantifiers', '#/grammar/determiners'],
    prepositions: ['Prepositions', '#/grammar/prepositions'], linkers: ['Linkers: contrast, concession and purpose', '#/grammar/concession'], auxiliaries: ['Auxiliaries and tenses', '#/grammar/aspect'],
    prefixes: ['Negative and other prefixes', '#/grammar/prefixes'], wordfamilies: ['Word families and suffixes', '#/grammar/wordfamilies'], wordformation: ['Word formation', '#/grammar/wordformation'],
    phrasal: ['Phrasal verbs', '#/vocab'], collocations: ['Collocations', '#/vocab'], fixed: ['Fixed phrases and idioms', '#/vocab'], meaning: ['Word meaning and near-synonyms', '#/vocab'],
    recall: ['Vocabulary recall', '#/review'], transformation: ['Key word transformations', '#/practice/kwt'], clozeother: ['Open cloze: grammar words', '#/practice/cloze'],
    discourse: ['Gapped texts: linking and reference', '#/practice/gapped'], reading: ['Reading: attitude, purpose and detail', '#/practice/reading'],
    cross: ['Cross-text questions: comparing opinions', '#/practice/cross'], matching: ['Matching: paraphrase', '#/practice/matching'], listening: ['Listening for detail and attitude', '#/skills/listening']
  };
  const tag = (id) => ({ id, label: TAGS[id][0], href: TAGS[id][1] });
  const plain = (s) => String(s || '').replace(/<[^>]+>/g, ' ').toLowerCase();
  const first = (list, text) => { const hit = list.find(([re]) => re.test(text)); return hit && hit[1]; };

  const KWT = [[/inversion|inverted|hardly had|no sooner|not only did|under no circumstances|seldom|rarely|scarcely/, 'inversion'], [/passive|causative|reporting verb|is said|is thought|is believed|allegedly|get .* done|have .* done/, 'passive'],
    [/conditional|if only|unless|as long as|provided|supposing|otherwise|but for/, 'conditionals'], [/wish|would rather|had better|it'?s time|high time|prefer/, 'wish'], [/reported|reporting|speech/, 'reporting'],
    [/modal|deduction|must have|can'?t have|ought|should have|needn'?t|might have/, 'modals'], [/relative|whose|whom/, 'relatives'], [/compar|twice as|the more|as .* as/, 'comparison'],
    [/participle|having .* ed|-ing clause/, 'participle'], [/cleft|what i|it was .* that/, 'cleft'], [/gerund|infinitive|used to|remember|regret|pattern/, 'patterns']];
  const MCQ = [[/phrasal verb/, 'phrasal'], [/collocation|collocat/, 'collocations'], [/fixed phrase|idiom|fixed expression|set phrase/, 'fixed'], [/preposition/, 'prepositions'], [/linker|contrast|concession|however/, 'linkers'], [/pattern|followed by|infinitive|-ing form/, 'patterns']];

  /* one tag for one answered question; `source` says where it came from (topic and href of the quiz) */
  function tagOf(item, source) {
    const topic = (source && source.topic) || '', m = ((source && source.href) || '').match(/^#\/practice\/([a-z]+)\//), type = m && m[1];
    const why = plain(item.why), text = plain(item.q || (item.first || '') + ' ' + (item.second || ''));
    if (topic === 'listen') return tag('listening');
    if (item.uid && /^v:/.test(item.uid)) return tag('recall');
    if (topic.startsWith('g-')) { const g = A.grammar && A.grammar.find((x) => 'g-' + x.id === topic); if (g) return { id: topic, label: g.title, href: '#/grammar/' + g.id }; }
    if (item.type === 'kwt') return tag(first(KWT, why + ' ' + plain(item.key)) || 'transformation');
    if (item.type === 'gap' && /\([A-Z][A-Z-]{2,}\)/.test(String(item.q || ''))) {
      if (/negative|prefix|opposite|\bun-|\bin-|\bim-|\bdis-|\bmis-|\bir-/.test(why)) return tag('prefixes');
      return tag(/adjective|adverb|noun|verb|suffix|plural/.test(why) ? 'wordfamilies' : 'wordformation');
    }
    if (item.type === 'gap') {
      const a = plain((item.answers || [])[0]).trim();
      if (/fixed phrase|idiom|fixed expression/.test(why)) return tag('fixed');
      return tag(LINK.has(a) ? 'linkers' : PREP.has(a) ? 'prepositions' : AUX.has(a) ? 'auxiliaries' : REL.has(a) ? 'relatives' : DET.has(a) ? 'determiners' : 'clozeother');
    }
    if (type === 'gapped') return tag('discourse');
    if (type === 'reading' || type === 'cross' || type === 'matching') return tag(type);
    void text;
    return tag(first(MCQ, why) || 'meaning');
  }

  /* tallies from before they were synced (localStorage) move into the Store once */
  try { const old = JSON.parse(localStorage.getItem(KEY) || 'null'); if (old) { Store.addSubs(Object.entries(old).map(([id, o]) => ({ id, label: o.label, href: o.href, c: o.c, t: o.t }))); localStorage.removeItem(KEY); } } catch (e) { /* ignore */ }
  const load = () => Store.state.sub || {};
  A.skillTag = tagOf;

  /* tally this quiz: running totals per tag on this device */
  A.diagnoseRecord = (res, source) => {
    const by = {};
    res.forEach((r) => { if (!r.item) return; const t = tagOf(r.item, source), o = by[t.id] || (by[t.id] = { id: t.id, label: t.label, href: t.href, c: 0, t: 0 }); o.t++; if (r.ok) o.c++; });
    const rows = Object.values(by); if (rows.length) Store.addSubs(rows);
  };
  /* the skills missed most in THIS result: [{ id, label, href, n }] */
  A.diagnoseWrong = (res, source) => {
    const by = {};
    res.filter((r) => !r.ok && r.item).forEach((r) => { const t = tagOf(r.item, source); (by[t.id] = by[t.id] || Object.assign({ n: 0 }, t)).n++; });
    return Object.values(by).sort((a, b) => b.n - a.n);
  };
  /* the weakest sub-skill over time (at least 8 answers, under 65%): { id, label, href, acc, n } or null */
  A.weakestSkill = () => {
    const rows = Object.entries(load()).filter(([, o]) => o.t >= 8 && o.c / o.t < 0.65).map(([id, o]) => ({ id, label: o.label, href: o.href, acc: o.c / o.t, n: o.t })).sort((a, b) => a.acc - b.acc);
    return rows[0] || null;
  };
  /* ---- the trend: accuracy per day (last 14 days) or per week (last 8 weeks) for the skills you practise most ---- */
  const MODES = { day: { n: 14, min: 2, unit: 'day', src: 'dk' }, week: { n: 8, min: 3, unit: 'week', src: 'wk' } };
  let trendMode = 'week';
  A.skillTrend = (mode) => {
    const M = MODES[mode] || MODES.week, data = Store.state[M.src] || {}, keys = Object.keys(data).sort();
    const back = (i) => { const d = new Date(); if (M.unit === 'day') d.setDate(d.getDate() - i); else d.setDate(d.getDate() - ((d.getDay() + 6) % 7) - 7 * i); return d.toLocaleDateString('sv'); };
    const slots = Array.from({ length: M.n }, (_, i) => back(M.n - 1 - i));
    const ids = {};
    keys.forEach((k) => Object.keys(data[k]).forEach((id) => { ids[id] = (ids[id] || 0) + data[k][id][1]; }));
    const label = (id) => { const s = (Store.state.sub || {})[id]; return s ? s.label : id; };
    const acc = (cells) => cells.map((c) => (c && c[1] >= M.min ? c[0] / c[1] : null));
    const all = slots.map((w) => Object.values(data[w] || {}).reduce((a, x) => [a[0] + x[0], a[1] + x[1]], [0, 0]));
    const rows = Object.keys(ids).sort((a, b) => ids[b] - ids[a]).slice(0, 5).map((id) => ({ id, label: label(id), href: ((Store.state.sub || {})[id] || {}).href, vals: acc(slots.map((w) => (data[w] || {})[id])), total: ids[id] }));
    return { slots, overall: acc(all), rows, since: keys[0] || null, M };
  };
  A.skillTrendCard = () => {
    const { h } = Engine, tr = A.skillTrend(trendMode), M = tr.M, N = M.n;
    const switcher = h('div', { class: 'row', role: 'group', 'aria-label': 'Chart period' }, [['day', 'By day'], ['week', 'By week']].map(([k, t]) =>
      h('button', { class: 'btn small' + (trendMode === k ? '' : ' ghost'), type: 'button', 'aria-pressed': String(trendMode === k), onclick: () => { trendMode = k; A.route(); } }, t)));
    const known = tr.overall.filter((v) => v != null).length;
    if (!tr.since) return A.cardBlock('Your progress over time', h('p', { class: 'muted' }, 'This chart fills in as you practise: it shows how many of your answers were right, overall and for the skills you practise most, by day or by week. Come back after a few days of exercises.'), switcher);
    const W = 220, H = 44, x = (i) => 6 + (i * (W - 12)) / (N - 1), y = (v) => H - 6 - v * (H - 12);
    const spark = (vals, label) => {
      let d = '', pen = false;
      vals.forEach((v, i) => { if (v == null) { pen = false; return; } d += (pen ? 'L' : 'M') + x(i).toFixed(1) + ' ' + y(v).toFixed(1); pen = true; });
      const dots = vals.map((v, i) => (v == null ? '' : `<circle cx="${x(i).toFixed(1)}" cy="${y(v).toFixed(1)}" r="${N > 10 ? 2.2 : 2.6}" fill="currentColor"/>`)).join('');
      const valid = vals.filter((v) => v != null);
      const text = valid.length ? `Accuracy per ${M.unit} for ${label}: ` + vals.map((v) => (v == null ? 'no data' : Math.round(v * 100) + '%')).join(', ') + ` (oldest to newest ${M.unit})` : 'No data yet for ' + label;
      return h('span', { class: 'spark', role: 'img', 'aria-label': text, html: `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" aria-hidden="true"><line x1="6" x2="${W - 6}" y1="${y(0.75)}" y2="${y(0.75)}" stroke="currentColor" stroke-opacity=".25" stroke-dasharray="3 3"/><path d="${d}" fill="none" stroke="currentColor" stroke-width="2"/>${dots}</svg>` });
    };
    const change = (vals) => { const v = vals.filter((q) => q != null); if (v.length < 2) return ''; const d = Math.round((v[v.length - 1] - v[0]) * 100); return d === 0 ? 'steady' : (d > 0 ? '+' : '') + d + ' points'; };
    const line = (label, vals, href) => h('div', { class: 'trendrow' }, href ? h('a', { href }, label) : h('span', {}, label), spark(vals, label), h('span', { class: 'muted' }, vals.some((v) => v != null) ? Math.round(vals.filter((v) => v != null).pop() * 100) + '% · ' + change(vals) : 'not enough answers yet'));
    return A.cardBlock('Your progress over time',
      switcher,
      h('p', { class: 'muted' }, `Share of correct answers in each of the last ${N} ${M.unit}s, oldest to newest. The dashed line is 75%. A ${M.unit} needs at least ${M.min} answers to count. ` + (trendMode === 'day' ? 'Daily tracking is new, so older days are empty.' : `Tracking started in the week of ${tr.since}.`)),
      known ? line('All skills together', tr.overall) : null,
      ...tr.rows.map((r) => line(r.label, r.vals, r.href)),
      known ? null : h('p', { class: 'muted' }, `Only one ${M.unit} so far: the lines appear when you practise in at least two different ${M.unit}s.`));
  };
  A.subSkillStats = () => Object.entries(load()).map(([id, o]) => ({ id, label: o.label, href: o.href, c: o.c, t: o.t })).sort((a, b) => a.c / a.t - b.c / b.t);
})();
