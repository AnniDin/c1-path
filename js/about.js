/* C1 Path – the About page and the "Report a mistake" link (opens a prefilled GitHub issue for the page the learner was on). */
(function () {
  const { h } = Engine;
  const A = window.App;
  const REPO = 'https://github.com/AnniDin/c1-path';
  let lastPage = /^#\/about/.test(location.hash) ? '#/' : location.hash || '#/', lastTitle = '';

  /* the page the learner was reading, not the About page itself */
  const track = () => { if (!/^#\/about/.test(location.hash)) { lastPage = location.hash || '#/'; lastTitle = ((document.querySelector('#app h1') || {}).textContent || '').trim(); } paint(); };
  const issueUrl = () => {
    const title = (lastTitle || 'C1 Path').slice(0, 80);
    const body = `Page: ${location.origin}${location.pathname}${lastPage}\n\nWhat is wrong?\n\n\nWhat should it say, and why?\n\n(Do not include personal information: issues on GitHub are public.)`;
    return `${REPO}/issues/new?title=${encodeURIComponent('Content: ' + title)}&body=${encodeURIComponent(body)}`;
  };
  function paint() {
    document.querySelectorAll('a.reportlink').forEach((a) => { a.href = issueUrl(); });
  }
  window.addEventListener('hashchange', () => setTimeout(track, 0));
  const foot = document.querySelector('footer.foot');
  if (foot) foot.append(' · ', h('a', { class: 'reportlink', href: REPO + '/issues/new', target: '_blank', rel: 'noopener' }, 'Report a mistake'), ' · ', h('a', { href: '#/about' }, 'About'));
  setTimeout(track, 0);

  A.routes.about = () => {
    const C = window.C1, n = (x) => (x || []).length;
    const sets = (C.practice || []).reduce((a, p) => a + p.sets.length, 0);
    const stat = (num, label) => h('div', { class: 'stat' }, h('b', {}, String(num)), h('span', {}, label));
    A.view(h('h1', {}, 'About C1 Path'),
      h('p', { class: 'lead' }, 'A free study site for the C1 English exams (Cambridge C1 Advanced, Linguaskill, CertAcles). It is built for people who want to understand the language, not memorise answers: every exercise says why an answer is right.'),
      h('div', { class: 'stats' }, stat(n(C.grammar), 'grammar lessons'), stat(n(C.vocab), 'vocabulary groups'), stat(sets, 'practice sets'), stat(n(C.listening), 'listenings'),
        stat(((C.writing || {}).tasks || []).length, 'writing tasks'), stat(((C.speaking || {}).sets || []).length, 'speaking sets')),
      h('h2', {}, 'What it cannot do'),
      h('ul', {},
        h('li', {}, 'It cannot give you an official mark. Scores here show what you got right in these exercises, not what an examiner would give you.'),
        h('li', {}, 'Speaking and Writing are practised, not marked. You get models, criteria and (optionally, with your own AI key) feedback from an AI, which can be wrong.'),
        h('li', {}, 'It is independent: not affiliated with Cambridge, Linguaskill or ACLES, and the tasks are original, not past papers.')),
      h('h2', {}, 'How reliable is the content?'),
      h('p', {}, 'The material was written with the help of AI and then checked in separate review passes for accuracy, naturalness and a single defensible answer per question. It has not yet been reviewed by a native-speaking examiner, so mistakes are possible. When something looks wrong, trust your teacher or a good dictionary over this site, and tell us.'),
      h('h2', {}, 'Found a mistake?'),
      h('p', {}, 'Open the page with the problem and use ', h('strong', {}, 'Report a mistake'), ' at the bottom of the page, or use the button below: it opens a GitHub issue with the page address already filled in. GitHub issues are public, so do not write personal information in them. You need a free GitHub account.'),
      h('p', {}, h('a', { class: 'btn reportlink', href: issueUrl(), target: '_blank', rel: 'noopener' }, 'Report a mistake on the last page I was reading')),
      h('h2', {}, 'Your data'),
      h('p', {}, 'No advertising, no analytics, no tracking cookies. Your progress stays in your browser unless you choose to sign in. ', h('a', { href: '#/privacy' }, 'Read the privacy page'), '.'),
      h('h2', {}, 'Credits'),
      h('p', { class: 'muted' }, 'Recorded listening and vocabulary audio: Kokoro, an open-source speech model (Apache-2.0). Phonetic transcriptions: derived from open pronunciation lexicons. Accessibility checks: axe-core. Source code and issue tracker: ', h('a', { href: REPO, target: '_blank', rel: 'noopener' }, 'github.com/AnniDin/c1-path'), '.'));
    paint();
  };
})();
