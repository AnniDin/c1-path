/* The pure parts of the emails (no network, no secrets), used by tools/send_digest.js and tested by tools/test.js:
   the trick of the week, the monthly summary of someone's progress, and the HTML/text of both emails. */
const fs = require('fs'), vm = require('vm'), path = require('path');
const root = path.join(__dirname, '..');
const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');
const SITE = (process.env.SITE || 'https://annidin.github.io/c1-path/').replace(/\/?$/, '/');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const plain = (h) => String(h).replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

let site = null; // the site's own data (tricks, grammar titles...) loaded once
function siteData() {
  if (site) return site;
  const sb = { console }; sb.window = sb; vm.createContext(sb);
  ['tricks', 'tricks2', 'tricks3', 'trickdrills', 'grammar', 'grammar2', 'grammar3', 'grammar4', 'grammar5', 'practice'].forEach((f) => {
    try { vm.runInContext(read('data/' + f + '.js'), sb, { filename: f }); } catch (e) { /* a data file the sender does not need */ }
  });
  return (site = sb.C1);
}

/* the trick of the week: the same for everybody, rotating through every trick on the site */
function pickTrick(now) {
  const C1 = siteData(), all = [];
  C1.tricks.forEach((s) => s.items.forEach((t, i) => { if (t.tip) all.push({ key: s.id + '-' + i, section: s.title, t }); }));
  const pick = Object.assign({}, all[Math.floor(now / (7 * 864e5)) % all.length]);
  pick.practice = ((C1.trickDrills || {})[pick.key] || []).length >= 3;
  return pick;
}

const shell = (kicker, title, body, stopUrl, why) => `<!doctype html><html><body style="margin:0;background:#fff;color:#111;font:16px/1.55 Georgia,serif">
<div style="max-width:560px;margin:0 auto;padding:24px">
<table role="presentation" style="margin:0 0 14px"><tr><td style="padding:0 12px 0 0"><img src="${SITE}icons/icon-192.png" width="48" height="48" alt="Pica, the C1 Path magpie" style="display:block;border-radius:10px"></td><td style="font:600 13px Arial,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#0b3d91">${kicker}</td></tr></table>
<h1 style="font:700 26px/1.2 Arial,sans-serif;margin:0 0 4px;border-bottom:4px solid #111;padding-bottom:10px">${title}</h1>
${body}
<hr style="border:0;border-top:1px solid #ccc;margin:28px 0 12px">
<p style="font:13px/1.5 Arial,sans-serif;color:#666">${why} C1 Path is an independent study tool, not affiliated with Cambridge, Linguaskill or ACLES.
<a href="${stopUrl}" style="color:#666">Stop these emails</a>.</p>
</div></body></html>`;
const hello = (t) => `<p style="margin:18px 0 0">${t}</p>`;
const signoff = '<p style="margin:22px 0 0">See you soon,<br><strong>Pica</strong></p>';
const button = (href, label) => `<a href="${href}" style="background:#0b3d91;color:#fff;text-decoration:none;font:600 15px Arial,sans-serif;padding:10px 16px">${label}</a>`;

function renderWeekly(p, token) {
  const link = SITE + '#/tricks/' + p.key, drill = SITE + '#/tricks/practice/' + p.key, stop = SITE + '#/unsubscribe/' + token;
  const body = `${hello('Hello, Pica here. I found a little trick for you this week.')}<p style="margin:18px 0">${p.t.tip}</p>
${p.t.ex ? `<p style="border-left:4px solid #0b3d91;padding:2px 0 2px 12px;margin:18px 0">${p.t.ex}</p>` : ''}
${p.t.why ? `<p style="color:#555">${p.t.why}</p>` : ''}
<p style="margin:26px 0">${button(link, 'Open this trick')}${p.practice ? ` &nbsp; <a href="${drill}" style="color:#0b3d91;font:600 15px Arial,sans-serif">Practise it (6 questions)</a>` : ''}</p>${signoff}`;
  const text = `Hello, Pica here. I found a little trick for you this week.\n\n${plain(p.t.t)}\n\n${plain(p.t.tip)}\n${p.t.ex ? '\n' + plain(p.t.ex) + '\n' : ''}${p.t.why ? '\n' + plain(p.t.why) + '\n' : ''}\nOpen this trick: ${link}\n${p.practice ? 'Practise it: ' + drill + '\n' : ''}\nSee you soon,\nPica\n\n--\nYou receive this because you switched on "A little trick by email" in your C1 Path account.\nStop these emails: ${stop}\n`;
  return { subject: 'Pica\'s little trick: ' + plain(p.t.t), html: shell(`C1 Path · this week's trick · ${esc(p.section)}`, esc(plain(p.t.t)), body, stop, 'You receive this because you switched on "A little trick by email" in your C1 Path account.'), text, stop };
}

/* what someone did in the last 30 days, from the progress copy they chose to keep in the cloud. It reuses the site's own js/store.js, so
   merging devices, streaks and mistakes are counted exactly as in the app. `data` is the saved progress (an object or its JSON text). */
function summarise(data, nowMs) {
  const C1 = siteData(), mem = {};
  const noop = () => {}, el = () => new Proxy(function () {}, { get: (t, k) => (k === Symbol.toPrimitive ? () => '' : el()), apply: () => el() });
  const sb = { console, localStorage: { getItem: (k) => (k in mem ? mem[k] : null), setItem: (k, v) => { mem[k] = String(v); }, removeItem: (k) => { delete mem[k]; } },
    document: { createElement: el, getElementById: () => null, addEventListener: noop, querySelectorAll: () => [], body: el(), documentElement: el() },
    matchMedia: () => ({ matches: false, addEventListener: noop }), navigator: {}, location: { hash: '' }, addEventListener: noop, setTimeout, clearTimeout };
  sb.window = sb; vm.createContext(sb);
  vm.runInContext(read('js/store.js'), sb, { filename: 'js/store.js' });
  try { sb.Store.mergeData(typeof data === 'string' ? data : JSON.stringify(data)); } catch (e) { /* no usable progress copy: summarise as an empty account */ }
  const st = sb.Store.state, now = nowMs || Date.now();
  const since = new Date(now - 30 * 864e5).toLocaleDateString('sv');
  const days = Object.entries(st.days || {}).filter(([d, n]) => d >= since && n > 0);
  const totals = Object.values(st.stats || {}).reduce((a, s) => ({ c: a.c + s.c, t: a.t + s.t }), { c: 0, t: 0 });
  const label = (k) => {
    const g = k.startsWith('g-') && (C1.grammar || []).find((x) => x.id === k.slice(2));
    const u = k.startsWith('u-') && (C1.practice || []).find((x) => x.id === k.slice(2));
    return g ? g.title : u ? u.title : null;
  };
  const weak = Object.entries(st.stats || {}).filter(([k, s]) => s.t >= 5 && label(k)).map(([k, s]) => ({ title: label(k), pct: Math.round((100 * s.c) / s.t), n: s.t }))
    .filter((x) => x.pct < 75).sort((a, b) => a.pct - b.pct).slice(0, 3);
  return {
    answers: days.reduce((a, [, n]) => a + n, 0), activeDays: days.length, streak: sb.Store.streak(),
    accuracy: totals.t ? Math.round((100 * totals.c) / totals.t) : null, total: totals.t, weak, mistakesDue: sb.Store.dueMistakes().length
  };
}

function renderMonthly(s, token) {
  const stop = SITE + '#/unsubscribe/' + token, none = !s.answers;
  const li = (t) => `<li style="margin:4px 0">${t}</li>`;
  const lines = [
    none ? 'You did not answer any questions in the last 30 days. A few minutes a day is plenty: even one quiz keeps the streak alive.' : `${s.answers} answers over ${s.activeDays} day${s.activeDays === 1 ? "" : "s"} in the last 30 days.`,
    s.streak ? `Current streak: ${s.streak} day${s.streak === 1 ? '' : 's'}.` : null,
    s.accuracy != null ? `Overall, ${s.accuracy}% of your ${s.total} answers so far were right.` : null,
    s.mistakesDue ? `${s.mistakesDue} saved mistake${s.mistakesDue === 1 ? ' is' : 's are'} ready to review.` : null
  ].filter(Boolean);
  const weak = s.weak.length ? `<h2 style="font:700 18px Arial,sans-serif;margin:22px 0 6px">Worth another look</h2><ul style="padding-left:20px">${s.weak.map((w) => li(`${esc(w.title)}: ${w.pct}% over ${w.n} answers`)).join('')}</ul>` : '';
  const body = `${hello('Hello, Pica here. I kept count of your last 30 days.')}<ul style="padding-left:20px;margin:18px 0">${lines.map(li).join('')}</ul>${weak}
<p style="color:#555">These numbers show your practice on the site. They are not an exam score.</p>
<p style="margin:26px 0">${button(SITE + (s.weak.length ? '#/weak' : '#/'), s.weak.length ? 'Train your weak spots' : 'Open C1 Path')}</p>${signoff}`;
  const text = 'Hello, Pica here. I kept count of your last 30 days.\n\n' + lines.join('\n') + (s.weak.length ? '\n\nWorth another look:\n' + s.weak.map((w) => `- ${w.title}: ${w.pct}% over ${w.n} answers`).join('\n') : '') + `\n\nThese numbers show your practice on the site, not an exam score.\nOpen C1 Path: ${SITE}\n\nSee you soon,\nPica\n\n--\nYou receive this because you switched on "A monthly summary" in your C1 Path account.\nStop these emails: ${stop}\n`;
  return { subject: 'Pica: your month on C1 Path', html: shell('C1 Path · your last 30 days', 'Your month on C1 Path', body, stop, 'You receive this because you switched on "A monthly summary" in your C1 Path account.'), text, stop };
}

module.exports = { SITE, pickTrick, renderWeekly, summarise, renderMonthly, plain };
