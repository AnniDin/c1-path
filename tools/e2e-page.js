/* The scenarios run by tools/e2e.html (see there). Each check prints FAIL lines; the last line is E2E-RESULT passed=N failed=M. */
(async () => {
  const out = document.getElementById('out'), f = document.getElementById('f');
  let pass = 0, fail = 0;
  const log = (s) => { out.textContent += s + '\n'; };
  const ok = (name, cond, info) => { if (cond) pass++; else { fail++; log('FAIL ' + name + (info ? ': ' + info : '')); } };
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  async function boot(width) {
    localStorage.clear();
    f.style.width = (width || 1024) + 'px';
    const loaded = new Promise((r) => { f.onload = r; });
    f.src = '../index.html?e2e=' + Date.now() + '#/';
    await loaded; await sleep(400);
    const w = f.contentWindow;
    w.Store.state.welcomed = true;
    w.location.hash = '#/x'; await sleep(50); w.location.hash = '#/'; await sleep(300);
    return w;
  }
  const go = async (w, hash, wait) => { w.location.hash = hash; await sleep(wait || 350); };
  const $ = (w, sel) => w.document.querySelector(sel);
  const $$ = (w, sel) => [...w.document.querySelectorAll(sel)];
  const button = (w, re) => $$(w, 'button').find((b) => re.test(b.textContent));
  const text = (w) => w.document.getElementById('app').innerText;

  /* ---------- 1. navigation ---------- */
  let w = await boot(1024);
  ok('home shows the five tabs', $$(w, '#nav a').map((a) => a.textContent.trim().replace(/\s+\d+$/, '')).join('|') === 'Home|Course|Library|Exams|Review');
  for (const [hash, tab] of [['#/mock', 'Exams'], ['#/certacles', 'Exams'], ['#/exams', 'Exams'], ['#/plan', 'Exams'], ['#/practice', 'Library'], ['#/progress', 'Review'], ['#/course', 'Course']]) {
    await go(w, hash); const active = $$(w, '#nav a.active').map((a) => a.textContent.trim().replace(/\s+\d+$/, ''));
    ok('tab for ' + hash + ' is highlighted', active.join() === tab, active.join());
  }

  /* ---------- 2. the difficulty ladder is visible ---------- */
  await go(w, '#/practice/mcq');
  const chips = $$(w, '#app .card .chip.lv').map((c) => ['Warm-up', 'Easier', 'Medium', 'Harder', 'Hardest'].indexOf(c.textContent.trim()));
  ok('practice sets are listed from easier to harder', chips.length >= 10 && chips.every((v, i) => !i || v >= chips[i - 1]), chips.join());

  /* ---------- 3. a perfect quiz: praise, no "null", clickable next steps, announced result ---------- */
  await go(w, '#/practice/cloze/2', 600);
  const set = w.C1.practice.find((p) => p.id === 'cloze').sets[2], gaps = set.items[0].gaps;
  $$(w, '#app input[type=text]').forEach((inp, i) => { inp.value = gaps[i].answers[0]; inp.dispatchEvent(new w.Event('input', { bubbles: true })); });
  button(w, /Check answers/).click(); await sleep(400);
  w = f.contentWindow;
  const res = w.document.querySelector('.score');
  ok('a perfect cloze set scores 100%', res && /\(100%\)/.test(res.textContent), res && res.textContent);
  const card = res && res.closest('.card');
  ok('the result has no stray null/undefined', card && !/\bnull\b|undefined|NaN/.test(card.innerText), card && card.innerText.slice(0, 200));
  ok('the result says what to do next', card && /What to do next/.test(card.innerText) && card.querySelectorAll('.nextrow').length >= 1);
  ok('the result card is announced to screen readers', card && (card.getAttribute('role') === 'status' || card.getAttribute('aria-live')), card && card.outerHTML.slice(0, 120));
  const firstRec = card && card.querySelector('.nextrow a');
  const hashBefore = w.location.hash, appBefore = $(w, '#app').innerText.slice(0, 80);
  if (firstRec) { firstRec.click(); await sleep(500); }
  ok('the first suggestion leads somewhere', !!firstRec && (w.location.hash !== hashBefore || $(w, '#app').innerText.slice(0, 80) !== appBefore));

  /* ---------- 4. a failed quiz suggests a way back ---------- */
  await go(w, '#/practice/cloze/4', 600);
  button(w, /Check answers/).click(); await sleep(400);
  const bad = w.document.querySelector('.score') && w.document.querySelector('.score').closest('.card');
  ok('a failed set suggests an easier set or the base', bad && /Step down|Build the base|Fix a pattern|Practise your/.test(bad.innerText), bad && bad.innerText.slice(0, 200));

  /* ---------- 5. Writing drafts: typing is kept, merely opening a task is not ---------- */
  await go(w, '#/skills/writing/essay-work', 500);
  const area = $(w, 'textarea.writearea');
  area.value = 'This is my draft about a four-day working week and what it would change for everyone.'; area.dispatchEvent(new w.Event('input', { bubbles: true }));
  await sleep(1100);
  await go(w, '#/skills/writing'); await go(w, '#/skills/writing/essay-work', 500);
  ok('a typed draft is restored', /four-day working week/.test($(w, 'textarea.writearea').value));
  await go(w, '#/skills/writing/email-technology', 500); await go(w, '#/skills/writing');
  ok('opening a task without typing leaves no draft', !w.Store.draft('email-technology'));

  /* ---------- 6. the Review page and the Exams tab ---------- */
  await go(w, '#/progress', 500);
  ok('Review shows the weekly and calibration cards', /last 7 days|Help calibrate the difficulty/i.test(text(w)));
  await go(w, '#/mock', 400);
  ok('Exams offers the four papers and the CertAcles paper', ['Reading and Use of English', 'Listening', 'Writing', 'Speaking', 'CertAcles'].every((t) => text(w).includes(t)));

  /* ---------- 7. keyboard: every control has a name, nothing is a dead end ---------- */
  for (const hash of ['#/', '#/mock', '#/progress', '#/practice/mcq', '#/skills/writing/essay-work']) {
    await go(w, hash, 500);
    const controls = $$(w, 'a[href], button, input:not([type=hidden]), select, textarea').filter((e) => e.offsetParent !== null);
    const unnamed = controls.filter((e) => !((e.getAttribute('aria-label') || e.textContent || e.getAttribute('title') || (e.labels && e.labels[0] && e.labels[0].textContent) || e.getAttribute('placeholder') || '').trim()));
    ok('every control on ' + hash + ' has an accessible name', !unnamed.length, unnamed.slice(0, 3).map((e) => e.outerHTML.slice(0, 80)).join(' | '));
    ok('nothing on ' + hash + ' is removed from the tab order', !controls.some((e) => e.tabIndex < 0 && e.tagName !== 'INPUT' && !e.disabled));
  }
  const skip = $(w, '.skip');
  ok('the skip link exists and points to the main content', !!skip && skip.getAttribute('href') === '#app');

  /* ---------- 8. phone width and both themes: no sideways scroll, no axe violations ---------- */
  const ROUTES = ['#/', '#/course', '#/course/work', '#/toolkit', '#/mock', '#/certacles', '#/exams', '#/plan', '#/progress', '#/practice', '#/practice/mcq', '#/practice/mcq/0', '#/grammar', '#/grammar/inversion',
    '#/vocab', '#/skills/listening', '#/skills/listening/work', '#/skills/writing', '#/skills/writing/essay-work', '#/skills/speaking', '#/skills/pronunciation', '#/tricks', '#/generate', '#/weak', '#/mistakes', '#/privacy', '#/placement', '#/review'];
  const seen = new Map();
  let axeRuns = 0;
  for (const width of [375, 1024]) {
    w = await boot(width);
    if (window.axe) await new Promise((res) => { const sc = w.document.createElement('script'); sc.src = 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.0/axe.min.js'; sc.onload = res; sc.onerror = res; w.document.head.appendChild(sc); }); // axe has to run inside the page it checks
    for (const theme of ['light', 'dark']) {
      w.document.documentElement.dataset.theme = theme;
      for (const hash of ROUTES) {
        await go(w, hash, 300);
        const over = w.document.documentElement.scrollWidth - w.innerWidth;
        ok(`no sideways scroll on ${hash} (${width}px, ${theme})`, over <= 1, over + 'px too wide');
        if (!w.axe) continue;
        axeRuns++;
        const r = await w.axe.run(w.document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa'], resultTypes: ['violations'] });
        r.violations.forEach((v) => { const k = v.id + ' @ ' + hash; if (!seen.has(k)) seen.set(k, `${v.impact} · ${v.help} · ${v.nodes.length} node(s) · e.g. ${v.nodes[0].target.join(' ')} [${width}px ${theme}]`); });
      }
    }
  }
  /* ---------- 9. pages that only show with data: skills, suggestions, calibration, weekly card, a quiz result with suggestions ---------- */
  for (const width of [375, 1024]) {
    w = await boot(width);
    await new Promise((res) => { const sc = w.document.createElement('script'); sc.src = 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.0/axe.min.js'; sc.onload = res; sc.onerror = res; w.document.head.appendChild(sc); });
    const d = (n) => new Date(Date.now() - n * 864e5).toLocaleDateString('sv');
    w.Store.addSubs([{ id: 'prepositions', label: 'Prepositions', href: '#/grammar/prepositions', c: 3, t: 12 }, { id: 'linkers', label: 'Linkers', href: '#/grammar/concession', c: 9, t: 12 }]);
    w.Store.addFx('easier', 6, -30); w.Store.addFx('same', 3, 12);
    w.Store.state.days[d(0)] = 14; w.Store.state.days[d(8)] = 6; w.Store.setExam(d(-12)); w.Store.addMock({ ts: Date.now(), kind: 'Reading', c: 33, t: 60 });
    w.Store.state.stats['u-cloze'] = { c: 3, t: 12 };
    for (const theme of ['light', 'dark']) {
      w.document.documentElement.dataset.theme = theme;
      for (const hash of ['#/progress', '#/', '#/mock', '#/plan']) {
        await go(w, hash, 400);
        ok(`no sideways scroll on ${hash} with data (${width}px, ${theme})`, w.document.documentElement.scrollWidth - w.innerWidth <= 1);
        if (!w.axe) continue; axeRuns++;
        const r = await w.axe.run(w.document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa'], resultTypes: ['violations'] });
        r.violations.forEach((v) => { const k = v.id + ' @ ' + hash + ' (with data)'; if (!seen.has(k)) seen.set(k, `${v.impact} · ${v.help} · ${v.nodes.length} node(s) · e.g. ${v.nodes[0].target.join(' ')} [${width}px ${theme}]`); });
      }
      /* a quiz result: one bad, one perfect */
      for (const mode of ['bad', 'perfect']) {
        await go(w, '#/practice/cloze/' + (mode === 'bad' ? 3 : 2), 500);
        const gp = w.C1.practice.find((p) => p.id === 'cloze').sets[mode === 'bad' ? 3 : 2].items[0].gaps;
        if (mode === 'perfect') $$(w, '#app input[type=text]').forEach((inp, i) => { inp.value = gp[i].answers[0]; });
        button(w, /Check answers/).click(); await sleep(400);
        ok(`no sideways scroll on a ${mode} quiz result (${width}px, ${theme})`, w.document.documentElement.scrollWidth - w.innerWidth <= 1);
        if (!w.axe) continue; axeRuns++;
        const r = await w.axe.run(w.document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa'], resultTypes: ['violations'] });
        r.violations.forEach((v) => { const k = v.id + ' @ quiz result (' + mode + ')'; if (!seen.has(k)) seen.set(k, `${v.impact} · ${v.help} · ${v.nodes.length} node(s) · e.g. ${v.nodes[0].target.join(' ')} [${width}px ${theme}]`); });
      }
    }
  }
  log(`axe-core scanned ${axeRuns} page views`);
  ok('axe-core ran on the pages (needs internet to load it from cdnjs)', axeRuns > 100, axeRuns + ' runs');
  seen.forEach((info, k) => { fail++; log('AXE ' + k + ': ' + info); });
  if (window.axe && !seen.size) { pass++; }

  log(`E2E-RESULT passed=${pass} failed=${fail}`);
  document.title = `E2E DONE ${pass}/${fail}`;
})().catch((e) => { document.getElementById('out').textContent += 'E2E-CRASH ' + (e && e.stack || e) + '\nE2E-RESULT passed=0 failed=1\n'; });
