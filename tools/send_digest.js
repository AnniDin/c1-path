/* The weekly "little trick" email and the optional monthly summary.  node tools/send_digest.js [--dry-run] [--to someone@example.com]
   Run weekly by .github/workflows/digest.yml. Needs Node 18+ and, only for real sending, `npm i nodemailer`.
   Secrets (environment): SUPABASE_URL, SUPABASE_SERVICE_KEY (service_role), GMAIL_USER, GMAIL_APP_PASSWORD.
   The monthly summary goes out on the first Thursday of the month, to people who switched it on.
   Scheduled runs (EVENT=schedule) send only on Thursday from 9:00 Madrid time.
   --dry-run   writes tools/digest-preview.html and tools/digest-preview-monthly.html and sends nothing.
   --to ADDR   sends this week's trick and a sample monthly summary to ADDR only (a test); the list and the "last sent" dates are not touched. */
const fs = require('fs'), path = require('path');
const { pickTrick, renderWeekly, summarise, renderMonthly, plain } = require('./digest_lib');
const args = process.argv.slice(2), dry = args.includes('--dry-run'), to = args.includes('--to') ? args[args.indexOf('--to') + 1] : null;
const NIL = '00000000-0000-0000-0000-000000000000';
const SAMPLE = { days: { [new Date().toLocaleDateString('sv')]: 14 }, stats: { 'g-wish': { c: 2, t: 8 } } }; // for previews only (sample numbers)

/* scheduled runs only send on Thursday from 9:00 in Madrid (the workflow has two UTC times to cover summer and winter time) */
function madridNow() {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Madrid', weekday: 'short', day: 'numeric', hour: 'numeric', hour12: false }).formatToParts(new Date()).map((x) => [x.type, x.value]));
  return { day: p.weekday, date: +p.day, hour: +p.hour % 24 };
}

async function rpc(name, body) {
  const res = await fetch(process.env.SUPABASE_URL.replace(/\/+$/, '') + '/rest/v1/rpc/' + name, {
    method: 'POST', headers: { 'content-type': 'application/json', apikey: process.env.SUPABASE_SERVICE_KEY, authorization: 'Bearer ' + process.env.SUPABASE_SERVICE_KEY }, body: JSON.stringify(body || {})
  });
  if (!res.ok) throw new Error(name + ' failed: ' + res.status + ' ' + (await res.text()).slice(0, 200));
  const t = await res.text();
  return t ? JSON.parse(t) : null;
}
const pause = () => new Promise((r) => setTimeout(r, 1500)); // gentle pace: Gmail limits sending

(async () => {
  const m = madridNow();
  if (process.env.EVENT === 'schedule' && (m.day !== 'Thu' || m.hour < 9)) { console.log(`Not the time yet (${m.day} ${m.hour}:00 in Madrid): nothing sent.`); return; }
  const trick = pickTrick(Date.now());
  console.log('Trick of the week:', trick.key, '-', plain(trick.t.t));
  if (dry) {
    const w = renderWeekly(trick, NIL), mo = renderMonthly(summarise(SAMPLE), NIL);
    fs.writeFileSync(path.join(__dirname, 'digest-preview.html'), w.html);
    fs.writeFileSync(path.join(__dirname, 'digest-preview-monthly.html'), mo.html);
    console.log('Subjects:', w.subject, '|', mo.subject, '\nWrote the two preview files in tools/ (nothing sent).');
    return;
  }
  for (const k of ['GMAIL_USER', 'GMAIL_APP_PASSWORD']) if (!process.env[k]) throw new Error('Missing ' + k);
  const mailer = require('nodemailer').createTransport({ service: 'gmail', auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD } });
  const send = (addr, mail) => mailer.sendMail({ from: `"Pica from C1 Path" <${process.env.GMAIL_USER}>`, to: addr, subject: mail.subject, text: mail.text, html: mail.html, headers: { 'List-Unsubscribe': `<${mail.stop}>` } });
  if (to) {
    await send(to, renderWeekly(trick, NIL)); await send(to, renderMonthly(summarise(SAMPLE), NIL));
    console.log('Two test emails sent to', to, '(the monthly one uses sample numbers)'); return;
  }
  for (const k of ['SUPABASE_URL', 'SUPABASE_SERVICE_KEY']) if (!process.env[k]) throw new Error('Missing ' + k);

  const due = (await rpc('digest_due')) || [], done = [];
  console.log(due.length + ' people are due a trick.');
  for (const u of due) {
    try { await send(u.email, renderWeekly(trick, u.token)); done.push(u.user_id); } catch (e) { console.error('Could not send to one address:', e.message); }
    await pause();
  }
  if (done.length) await rpc('digest_mark', { p_ids: done });
  console.log(done.length + ' sent.');

  /* the monthly summary: first Thursday of the month (day 1 to 7), only for people who switched it on */
  if (m.date <= 7 || process.env.EVENT !== 'schedule') {
    let monthly = [];
    try { monthly = (await rpc('monthly_due')) || []; } catch (e) { console.log('Monthly summaries not set up yet (' + e.message.slice(0, 80) + ').'); }
    const sent = [];
    console.log(monthly.length + ' people are due a monthly summary.');
    for (const u of monthly) {
      try { await send(u.email, renderMonthly(summarise(u.data), u.token)); sent.push(u.user_id); } catch (e) { console.error('Could not send a summary to one address:', e.message); }
      await pause();
    }
    if (sent.length) await rpc('monthly_mark', { p_ids: sent });
    console.log(sent.length + ' summaries sent.');
  }
})().catch((e) => { console.error(e.message); process.exit(1); });
