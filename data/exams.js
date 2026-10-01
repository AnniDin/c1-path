window.C1 = window.C1 || {};
C1.exams = {
  intro: 'Three exams are commonly used to show a C1 level. They test similar abilities with different formats. Knowing the format removes surprises and saves time in the exam.',
  caution: '<strong>Check the official sources before booking.</strong> Timings, task counts and scoring change from time to time. The summaries below are for orientation. Cambridge publishes sample papers for C1 Advanced and Linguaskill; for CertAcles, look for the exam model of the university where you will sit it.',
  exams: [
    {
      name: 'Cambridge C1 Advanced (CAE)',
      summary: 'A four-paper certificate. You can take it on paper or on computer, on fixed dates in authorised centres. Marks are reported on the Cambridge English Scale (160–210); 180–199 is C1, and 200+ shows C2-level performance.',
      cols: ['Paper', 'Time', 'Content'],
      rows: [
        ['Reading and Use of English', 'about 90 min', '<strong>8 parts.</strong> Parts 1–4: multiple-choice cloze, open cloze, word formation, key word transformations. Parts 5–8: long text with multiple choice, cross-text matching, gapped text, multiple matching.'],
        ['Writing', 'about 90 min', '<strong>2 parts.</strong> Part 1: compulsory essay. Part 2: one task chosen from letter or email, proposal, report or review. About 220–260 words each.'],
        ['Listening', 'about 40 min', '<strong>4 parts.</strong> Short extracts with multiple choice; sentence completion; a longer interview or discussion with multiple choice; multiple matching.'],
        ['Speaking', 'about 15 min', '<strong>4 parts</strong> with a partner and two examiners: interview, individual long turn, collaborative task, further discussion.']
      ],
      notes: '<strong>Good to know:</strong> a Use of English section (Parts 1–4) is worth a large share of the reading paper. That is where this site\'s grammar, phrasal verbs and collocations pay off directly.'
    },
    {
      name: 'Linguaskill (Cambridge)',
      summary: 'An online, on-demand test. Reading and Listening are adaptive: the questions get easier or harder depending on your answers. Writing and Speaking are completed on the computer and marked by Cambridge, largely with automated marking. Results are reported as a score on the Cambridge English Scale with a CEFR level, usually within a couple of days.',
      cols: ['Module', 'Approximate time', 'Content'],
      rows: [
        ['Reading', 'about 60 min', 'Adaptive. Task types include: read and select, gapped sentences, multiple-choice gapped text, open gapped text and extended reading.'],
        ['Listening', 'about 40 min', 'Adaptive. Listening to a range of recordings and answering comprehension questions, mostly multiple choice.'],
        ['Writing', 'about 45 min', 'Two tasks, for example a short email and a longer piece (about 180 words), assessed for range, accuracy and organisation.'],
        ['Speaking', 'about 15 min', 'Several short parts recorded on the computer, for example reading aloud, answering questions, a long turn and giving opinions.']
      ],
      notes: '<strong>Good to know:</strong> the "open gapped text" and "multiple-choice gapped text" tasks are the same skills as Cambridge Parts 2 and 1. Modules can be taken separately.'
    },
    {
      name: 'CertAcles (ACLES)',
      summary: 'ACLES is the Spanish association of university language centres. CertAcles is its accreditation system: each university designs its own exam within a common framework aligned with the CEFR, so it is widely recognised in the Spanish university system. Because centres design the papers, <strong>the exact format and timings differ from one university to another</strong>.',
      cols: ['Component', 'Typically includes'],
      rows: [
        ['Reading', 'Comprehension of several texts, multiple choice, matching or short answers.'],
        ['Listening', 'Recorded dialogues, talks or interviews with comprehension questions.'],
        ['Writing', 'One or two texts (e.g. an essay, an email or a report) with required length and register.'],
        ['Speaking', 'Interview and interaction tasks with examiners, sometimes with a partner.'],
        ['Use of language', 'Some centres include a separate grammar and vocabulary section; others assess it inside the four skills.']
      ],
      notes: '<strong>Good to know:</strong> ask the language centre where you will sit it for the official exam model and past papers. Everything on this site about grammar, vocabulary and rewriting transfers directly; only the task wording changes.'
    }
  ],
  choose: `<ul>
    <li><strong>Cambridge C1 Advanced</strong> is the best-known certificate worldwide. Choose it if you need an internationally recognised, non-expiring qualification and can plan for fixed exam dates.</li>
    <li><strong>Linguaskill</strong> is quicker and more flexible: on-demand booking and fast results. Choose it if the institution or employer accepts it and you need a level report soon.</li>
    <li><strong>CertAcles</strong> is widely accepted by Spanish universities and can be cheaper (check the fees at each centre). Choose it if your goal is a university requirement in Spain (degree completion, mobility, grants).</li></ul>
    <p>In all cases, ask the requesting institution which certificates it accepts <em>before</em> you register.</p>`,
  mapping: `<div class="tablewrap"><table><tr><th>This site</th><th>Prepares for</th></tr>
    <tr><td>Grammar lessons</td><td>Use of English Parts 1–4, Writing accuracy, Speaking range</td></tr>
    <tr><td>Vocabulary (phrasal verbs, collocations, idioms, linkers, topic language)</td><td>Multiple-choice cloze, word formation, Reading, Listening, Writing, Speaking</td></tr>
    <tr><td>Use of English sets</td><td>Cambridge Reading and Use of English Parts 1–4; Linguaskill gapped texts; rewrite tasks in CertAcles</td></tr>
    <tr><td>Skills: Listening, Speaking, Writing</td><td>Cambridge Listening, Speaking and Writing papers; Linguaskill modules; the oral, listening and written components of CertAcles</td></tr>
    <tr><td>Reading comprehension and gapped text</td><td>Cambridge Reading Part 5 and a Part 7-style task; Linguaskill extended reading and gapped sentences; CertAcles reading</td></tr></table></div>
    <p class="muted">Listening, Speaking and Writing are in the Skills section. They cannot be marked automatically, so use official sample papers and, when you can, a teacher or language partner alongside them.</p>`
};
