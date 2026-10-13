/* The weekly "little trick" email.  node tools/send_digest.js [--dry-run] [--to someone@example.com]
   Run weekly by .github/workflows/digest.yml. Needs Node 18+ and, only for real sending, `npm i nodemailer`.
   Secrets (environment): SUPABASE_URL, SUPABASE_SERVICE_KEY (service_role), GMAIL_USER, GMAIL_APP_PASSWORD.
   --dry-run   writes tools/digest-preview.html and sends nothing.
   Scheduled runs (EVENT=schedule) send only on Thursday from 9:00 Madrid time.
   --to ADDR   sends this week's email to ADDR only (a test); the list and the "last sent" dates are not touched. */
const fs = require('fs'), vm = require('vm'), path = require('path');
const root = path.join(__dirname, '..');
const SITE = (process.env.SITE || 'https://annidin.github.io/c1-path/').replace(/\/?$/, '/');
const args = process.argv.slice(2), dry = args.includes('--dry-run'), to = args.includes('--to') ? args[args.indexOf('--to') + 1] : null;

/* the trick of the week: the same for everybody, rotating through every trick on the site */
function pickTrick(now) {
  const sb = { console }; sb.window = sb; vm.createContext(sb);
  ['tricks', 'tricks2', 'tricks3', 'trickdrills'].forEach((f) => vm.runInContext(fs.readFileSync(path.join(root, 'data', f + '.js'), 'utf8'), sb, { filename: f }));
  const all = [];
  sb.C1.tricks.forEach((s) => s.items.forEach((t, i) => { if (t.tip) all.push({ key: s.id + '-' + i, section: s.title, t }); }));
  const week = Math.floor(now / (7 * 864e5));
  const pick = all[week % all.length];
  pick.practice = ((sb.C1.trickDrills || {})[pick.key] || []).length >= 3;
  return pick;
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const plain = (h) => String(h).replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

function render(p, token) {
  const link = SITE + '#/tricks/' + p.key, drill = SITE + '#/tricks/practice/' + p.key, stop = SITE + '#/unsubscribe/' + token;
  const subject = 'A little trick: ' + plain(p.t.t);
  const html = `<!doctype html><html><body style="margin:0;background:#fff;color:#111;font:16px/1.55 Georgia,serif">
<div style="max-width:560px;margin:0 auto;padding:24px">
<p style="font:600 13px Arial,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#0b3d91;margin:0 0 8px">C1 Path · this week's trick · ${esc(p.section)}</p>
<h1 style="font:700 26px/1.2 Arial,sans-serif;margin:0 0 4px;border-bottom:4px solid #111;padding-bottom:10px">${esc(plain(p.t.t))}</h1>
<p style="margin:18px 0">${p.t.tip}</p>
${p.t.ex ? `<p style="border-left:4px solid #0b3d91;padding:2px 0 2px 12px;margin:18px 0">${p.t.ex}</p>` : ''}
${p.t.why ? `<p style="color:#555">${p.t.why}</p>` : ''}
<p style="margin:26px 0"><a href="${link}" style="background:#0b3d91;color:#fff;text-decoration:none;font:600 15px Arial,sans-serif;padding:10px 16px">Open this trick</a>
${p.practice ? ` &nbsp; <a href="${drill}" style="color:#0b3d91;font:600 15px Arial,sans-serif">Practise it (6 questions)</a>` : ''}</p>
<hr style="border:0;border-top:1px solid #ccc;margin:28px 0 12px">
<p style="font:13px/1.5 Arial,sans-serif;color:#666">You receive this because you switched on "A little trick by email" in your C1 Path account. C1 Path is an independent study tool, not affiliated with Cambridge, Linguaskill or ACLES.
<a href="${stop}" style="color:#666">Stop these emails</a>.</p>
</div></body></html>`;
  const text = `${plain(p.t.t)}\n\n${plain(p.t.tip)}\n${p.t.ex ? '\n' + plain(p.t.ex) + '\n' : ''}${p.t.why ? '\n' + plain(p.t.why) + '\n' : ''}\nOpen this trick: ${link}\n${p.practice ? 'Practise it: ' + drill + '\n' : ''}\n--\nYou receive this because you switched on "A little trick by email" in your C1 Path account.\nStop these emails: ${stop}\n`;
  return { subject, html, text, stop };
}

async function rpc(name, body) {
  const res = await fetch(process.env.SUPABASE_URL.replace(/\/+$/, '') + '/rest/v1/rpc/' + name, {
    method: 'POST', headers: { 'content-type': 'application/json', apikey: process.env.SUPABASE_SERVICE_KEY, authorization: 'Bearer ' + process.env.SUPABASE_SERVICE_KEY }, body: JSON.stringify(body || {})
  });
  if (!res.ok) throw new Error(name + ' failed: ' + res.status + ' ' + (await res.text()).slice(0, 200));
  const t = await res.text();
  return t ? JSON.parse(t) : null;
}

/* scheduled runs only send on Thursday from 9:00 in Madrid (the workflow has two UTC times to cover summer and winter time) */
function madridNow() {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Madrid', weekday: 'short', hour: 'numeric', hour12: false }).formatToParts(new Date()).map((x) => [x.type, x.value]));
  return { day: p.weekday, hour: +p.hour % 24 };
}

(async () => {
  if (process.env.EVENT === 'schedule') {
    const m = madridNow();
    if (m.day !== 'Thu' || m.hour < 9) { console.log(`Not the time yet (${m.day} ${m.hour}:00 in Madrid): nothing sent.`); return; }
  }
  const trick = pickTrick(Date.now());
  console.log('Trick of the week:', trick.key, '-', plain(trick.t.t));
  if (dry) {
    const m = render(trick, '00000000-0000-0000-0000-000000000000');
    fs.writeFileSync(path.join(__dirname, 'digest-preview.html'), m.html);
    console.log('Subject:', m.subject, '\nWrote tools/digest-preview.html (nothing sent).');
    return;
  }
  for (const k of ['GMAIL_USER', 'GMAIL_APP_PASSWORD']) if (!process.env[k]) throw new Error('Missing ' + k);
  const mailer = require('nodemailer').createTransport({ service: 'gmail', auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD } });
  const send = (addr, token) => {
    const m = render(trick, token);
    return mailer.sendMail({ from: `"C1 Path" <${process.env.GMAIL_USER}>`, to: addr, subject: m.subject, text: m.text, html: m.html, headers: { 'List-Unsubscribe': `<${m.stop}>` } });
  };
  if (to) { await send(to, '00000000-0000-0000-0000-000000000000'); console.log('Test email sent to', to); return; }
  for (const k of ['SUPABASE_URL', 'SUPABASE_SERVICE_KEY']) if (!process.env[k]) throw new Error('Missing ' + k);
  const due = (await rpc('digest_due')) || [], done = [];
  console.log(due.length + ' people are due a trick.');
  for (const u of due) {
    try { await send(u.email, u.token); done.push(u.user_id); } catch (e) { console.error('Could not send to one address:', e.message); }
    await new Promise((r) => setTimeout(r, 1500)); // gentle pace: Gmail limits sending
  }
  if (done.length) await rpc('digest_mark', { p_ids: done });
  console.log(done.length + ' sent.');
})().catch((e) => { console.error(e.message); process.exit(1); });
