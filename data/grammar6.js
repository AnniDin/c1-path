window.C1 = window.C1 || {}; C1.grammar = C1.grammar || []; C1.grammar.push(
{
  id: 'itthere', category: 'Sentence structure', title: 'Introductory "it" and "there"', level: 'C1', tagline: 'English needs a subject in every clause, so it borrows an empty one.',
  idea: `<p>Compare: <em>To learn a language takes time.</em> and <em>It takes time to learn a language.</em> The second sounds natural. English dislikes a long, heavy subject at the start of a sentence, and it also insists that every clause has a subject (Spanish can say <em>Llueve</em> or <em>Hay un problema</em>; English cannot say <em>Rains</em> or <em>Is a problem</em>).</p>
  <p>The solution is a <strong>dummy subject</strong>. <em>It</em> stands in for the real subject, which is moved to the end (a clause or an infinitive). <em>There</em> stands in for a subject that is new information, so that the sentence can introduce it: <em>There is a problem.</em> Neither word refers to anything; they just fill the slot and push the important idea to where it gets the stress.</p>
  <p>So the rule of thumb: <strong>it</strong> + a known or whole idea that comes later; <strong>there</strong> + something whose existence you are announcing.</p>`,
  parts: [
    { h: 'It as preparatory subject or object', body: `<p>The real subject is a <em>that</em>-clause or an infinitive, placed after the verb.</p>
      <div class="eg"><em>It</em> is said / believed / thought / known <strong>that</strong> prices will rise. (impersonal reporting)</div>
      <div class="eg"><em>It</em> takes / costs / is worth / is no use: <em>It took her a year to recover. It is no use complaining. It is not worth waiting.</em></div>
      <p>The same trick works for the <strong>object</strong> after find, think, make, consider, feel, take:</p>
      <div class="eg">I find <em>it</em> hard to concentrate. She made <em>it</em> clear that she was leaving. We take <em>it</em> for granted that the trains run.</div>
      <p>Without <em>it</em> the sentence is wrong: <em>I find hard to concentrate.</em> The verb needs an object before the adjective.</p>` },
    { h: 'There + be and its relatives', body: `<p><em>There</em> introduces something new, so the verb agrees with what comes <em>after</em> it: <em>There is a book / There are two books</em>.</p>
      <div class="eg">There <em>seems / appears / happens / tends</em> to be a lack of interest.</div>
      <div class="eg">There is thought / expected / said <em>to be</em> a connection between sleep and memory.</div>
      <div class="eg">There is <em>no point in</em> arguing. There is <em>no need to</em> hurry. There is <em>no knowing</em> what will happen.</div>
      <p>Both <em>It is said that…</em> and <em>X is said to…</em> report opinion; with <em>there</em> the second form is <em>There is said to be…</em>, because the new subject is introduced by <em>there</em>.</p>` },
    { h: 'It or there? A quick test', body: `<div class="tablewrap"><table><tr><th>If the sentence…</th><th>Use</th><th>Example</th></tr>
      <tr><td>announces something exists</td><td>there</td><td><em>There is a risk of flooding.</em></td></tr>
      <tr><td>is about weather, time, distance, or a delayed clause</td><td>it</td><td><em>It is raining. It is a long way. It is obvious that he lied.</em></td></tr>
      <tr><td>identifies a thing already known</td><td>it</td><td><em>It is a risk we cannot take.</em></td></tr></table></div>` }
  ],
  traps: `<ul><li><em>It is a shortage of teachers</em> (wrong). To say that something exists, use <em>There is a shortage…</em>.</li>
    <li>Spanish speakers drop the dummy subject: <em>Is important to rest</em> (wrong) → <em>It is important to rest.</em></li>
    <li>After <em>It is no use / no good / worth</em>, the verb is the <strong>-ing</strong> form: <em>It is no use <strong>to</strong> try</em> is wrong. But <em>It takes… <strong>to</strong> + infinitive</em>.</li>
    <li><em>There</em> agrees with the following noun: <em>There <strong>are</strong> several reasons</em>, not <em>There is several reasons</em>.</li>
    <li>Drop <em>it</em> after <em>find / make / think + adjective</em> and the sentence breaks: <em>She made clear</em> (wrong).</li></ul>`,
  exam: `<p>Key word transformations love these: <em>People say he is rich → he <strong>IS</strong> said to be rich / It is said that he is rich</em>; <em>It is pointless to argue → <strong>POINT</strong> There is no point in arguing</em>; <em>COST / TAKE</em>. In Writing, impersonal <em>It is widely believed that…</em> and <em>There seems to be…</em> give an essay a formal, balanced register.</p>`,
  quiz: [
    { type: 'mcq', q: '___ is thought to be a shortage of qualified teachers in rural areas.', options: ['It', 'There', 'They', 'That'], answer: 1, why: 'A shortage is announced as new information, so <em>there</em> is the subject: <em>There is thought to be…</em>. <em>It</em> would need a clause (<em>It is thought that there is…</em>).' },
    { type: 'mcq', q: 'The students find ___ difficult to concentrate in such a noisy room.', options: ['that', 'this', 'there', 'it'], answer: 3, why: '<em>Find + it + adjective + infinitive</em>: <em>it</em> is the preparatory object and the infinitive is the real one.' },
    { type: 'mcq', q: 'It is no use ___ to persuade him; he never changes his mind.', options: ['trying', 'to try', 'try', 'to trying'], answer: 0, why: 'The fixed pattern is <em>It is no use / no good / worth + -ing</em>.' },
    { type: 'mcq', q: 'It took us nearly three hours ___ the report.', options: ['finish', 'that we finished', 'to finish', 'for finishing'], answer: 2, why: '<em>It takes + time + to-infinitive</em> is the normal pattern.' },
    { type: 'mcq', q: 'There ___ to be no easy solution to the problem.', options: ['is seeming', 'seems', 'it seems', 'seeming'], answer: 1, why: '<em>There seems to be…</em>. <em>Seem</em> is a stative verb, so it is not used in the continuous.' },
    { type: 'mcq', q: 'The manager made ___ clear that she disapproved of the plan.', options: ['that', 'this', 'there', 'it'], answer: 3, why: '<em>Make it clear that…</em>: <em>it</em> is the preparatory object, and the <em>that</em>-clause follows.' }
  ]
},
{
  id: 'cohesion', category: 'Words and patterns', title: 'Reference and cohesion', level: 'C1', tagline: 'Every "this", "such" and "the latter" points back to something. Find it.',
  idea: `<p>A paragraph is not a list of separate sentences; it is a chain. Each sentence picks up something from the previous one and adds something new. The pointing words (<em>this, that, such, so, the former, the latter, the same</em>, and pronouns) are the links. If the link has nothing to hold on to, the text feels broken.</p>
  <p>That is exactly why these words are the key to gapped-text tasks (Reading Part 7). A missing paragraph must <strong>begin</strong> with a reference that fits the text before it, and <strong>end</strong> with something that the next paragraph points back to. You are not guessing the topic; you are matching the links.</p>
  <p>The same logic tells you how to write: a reference word needs a clear <strong>antecedent</strong>, the thing it refers to.</p>`,
  parts: [
    { h: 'The main reference words', body: `<div class="tablewrap"><table><tr><th>Word</th><th>What it does</th><th>Example</th></tr>
      <tr><td><em>this / these</em></td><td>points to what was just said (close)</td><td>Rents are rising. <em>This</em> forces students to share flats.</td></tr>
      <tr><td><em>that / those</em></td><td>points to something further away or contrasted; also with relative clauses</td><td>Salaries differ; <em>those</em> in the north are lower.</td></tr>
      <tr><td><em>such (a)</em></td><td>refers to a type: "of that kind"</td><td>The council banned cars. <em>Such a measure</em> was unpopular.</td></tr>
      <tr><td><em>the former / the latter</em></td><td>first / second of two things</td><td>Anna and Maria applied. <em>The former</em> has a law degree; <em>the latter</em> has experience.</td></tr>
      <tr><td><em>the same</em>, <em>so</em>, <em>do so</em></td><td>replace a whole idea or action</td><td>He failed. <em>The same</em> is true of Tom. / I think <em>so</em>. / She asked him to leave and he did <em>so</em>.</td></tr></table></div>` },
    { h: 'Why a sentence needs an antecedent', body: `<p>A pronoun or <em>this</em> is only a pointer. If two things in the previous sentence could be the target, the reader stops.</p>
      <div class="eg">Unclear: <em>The minister met the union leader, and he promised changes. This was welcomed.</em> (Who promised? What was welcomed?)</div>
      <div class="eg">Clear: <em>…and the minister promised changes. This <strong>promise</strong> was widely welcomed.</em></div>
      <p>The cure for a vague <em>this</em> is a <strong>summary noun</strong> after it: <em>this decision, this trend, this view, such an approach</em>. The noun also adds to the meaning, which shows range in Writing.</p>` },
    { h: 'Using links to solve gapped texts', body: `<p>When you read the paragraph before the gap, ask: <strong>what idea does it end on?</strong> Then check the candidate paragraph's first words:</p>
      <ul><li><em>This / Such / The latter / These</em> at the start → a clue that something was named just before.</li>
      <li><em>However, Even so, In fact</em> → check that the logic (contrast, example) fits.</li>
      <li>A pronoun with no name before it (<em>She</em>, <em>They</em>) → the person must already be introduced in the text above, not in the options below.</li></ul>
      <p>Then read the first sentence <em>after</em> the gap: does it point back to what the missing paragraph says?</p>` }
  ],
  traps: `<ul><li><em>Such</em> needs an article with a singular countable noun: <em>such <strong>a</strong> measure</em>, not <em>such measure</em>. With <em>this</em> you do not use an article: <em>this measure</em>.</li>
    <li><em>The former / the latter</em> are only for <strong>two</strong> things. For three or more, use <em>the first / the last</em>.</li>
    <li><em>So</em> replaces a clause only after certain verbs: <em>I think so / I hope not / I believe so</em>. Not <em>I think it</em> or <em>I think that</em> on its own.</li>
    <li>A vague <em>This is why…</em> after a long paragraph gives the reader work. Name the idea: <em>This shift in attitudes is why…</em>.</li>
    <li>Repeating the same noun is not an error; it is better than a pronoun that could mean two things.</li></ul>`,
  exam: `<p>Reading Part 7 (gapped text) is almost entirely a cohesion task: reference words, linking adverbials and repeated vocabulary. Use of English cloze and transformations also test <em>so</em> and <em>such</em>, <em>the same</em>, and <em>do so</em>. In Writing, summary nouns after <em>this</em> are a mark of a C1 text.</p>`,
  quiz: [
    { type: 'mcq', q: 'The report found that staff were overworked. ___ finding surprised nobody.', options: ['Those', 'Such', 'This', 'These'], answer: 2, why: '<em>This + singular noun</em> points back to the one finding just mentioned. <em>Such</em> would need <em>a</em> (<em>such a finding</em>).' },
    { type: 'mcq', q: 'Anna and Maria both applied. The former has a law degree; ___ has ten years of experience.', options: ['the latter', 'the later', 'a latter', 'latter'], answer: 0, why: '<em>The former</em> is the first of two, <em>the latter</em> the second. <em>Later</em> is about time.' },
    { type: 'mcq', q: 'Are the results reliable? I think ___.', options: ['it', 'that', 'such', 'so'], answer: 3, why: '<em>So</em> replaces the whole clause after verbs like <em>think, hope, believe, suppose</em>.' },
    { type: 'mcq', q: 'The council banned cars from the centre. ___ a measure was bound to be unpopular.', options: ['Like', 'Such', 'So', 'Thus'], answer: 1, why: '<em>Such a measure</em> = a measure of that kind. <em>So</em> would need an adjective directly (<em>so drastic a measure</em>).' },
    { type: 'mcq', q: 'Tom likes jazz, and ___ does his sister.', options: ['so', 'the same', 'such', 'too'], answer: 0, why: '<em>So + auxiliary + subject</em> adds a parallel statement: <em>so does his sister</em>.' },
    { type: 'mcq', q: 'She was offered the job but turned it down, ___ surprised everyone.', options: ['that', 'which', 'what', 'it'], answer: 1, why: 'A non-defining <em>which</em> after a comma refers to the whole previous clause. <em>That</em> cannot follow a comma; <em>what</em> has no antecedent.' }
  ]
},
{
  id: 'nounclauses', category: 'Sentence structure', title: 'Noun clauses', level: 'C1', tagline: 'A whole clause can do the job of a single noun.',
  idea: `<p>Compare: <em>I know the answer.</em> and <em>I know that she is right.</em> and <em>I know what she wants.</em> In each sentence, the part after <em>know</em> is the thing known. A noun is one way to fill that slot; a whole clause is another. A clause that works as a noun (subject, object, complement, or after a preposition) is a <strong>noun clause</strong>.</p>
  <p>They begin with <em>that</em>, a <em>wh-</em> word (<em>what, where, why, how, who, which</em>) or <em>whether / if</em>. The linking word is not decoration: it tells the listener what kind of information follows (a fact, a reason, a place, a choice).</p>
  <p>Inside the noun clause, the word order is <strong>statement order</strong>, even when the meaning is a question.</p>`,
  parts: [
    { h: 'That, wh- words, whether', body: `<div class="eg"><em>That</em>-clause: She said <em>that</em> she was tired. The fact <em>that</em> nobody told me annoyed me. <span class="muted">(<em>that</em> is often dropped after verbs: <em>She said she was tired</em>, but not normally after a noun like <em>fact</em>, and not when the clause is the subject.)</span></div>
      <div class="eg">Wh-clause: <em>What</em> she said made everyone laugh. I wonder <em>where</em> he lives. We talked about <em>how</em> we could help.</div>
      <div class="eg">Whether / if: I don't know <em>whether</em> (or <em>if</em>) it is true. The question is <em>whether</em> to accept.</div>
      <p><strong>What vs that:</strong> <em>what</em> = "the thing that" and is itself the subject or object inside the clause. <em>That</em> is only a linker. <em>What she said</em> (the thing she said) is a complete noun clause; <em>That she said</em> is not.</p>` },
    { h: 'Subject clauses and preparatory it', body: `<p>A noun clause can be the subject, but a long subject at the start sounds heavy, so English often uses <em>it</em>:</p>
      <div class="eg"><em>That he lied</em> is obvious. → <em>It</em> is obvious <em>that he lied</em>.</div>
      <div class="eg"><em>It</em> is a pity / a shame / strange / surprising <em>that</em> nobody came. <span class="muted">(after words of necessity the verb is often <em>should</em> or the subjunctive: <em>It is vital that he <strong>be</strong> told.</em>)</span></div>
      <p><em>Whether</em> is required, not <em>if</em>, when the clause is the subject, comes right after a preposition, or is followed by <em>to</em>: <em>Whether he comes doesn't matter. It depends on whether we win. I can't decide whether to go.</em></p>` },
    { h: 'Indirect questions inside statements', body: `<p>A direct question uses inversion: <em>Where is the station?</em> Once it becomes part of a longer sentence, it is a noun clause, and the order goes back to normal, with <strong>no do-support</strong>:</p>
      <div class="eg">Where is the station? → I wonder <em>where the station is</em>.</div>
      <div class="eg">What did she say? → Nobody knows <em>what she said</em>.</div>
      <p>After a preposition, only a wh-clause or <em>whether</em> can follow: <em>We are interested in <strong>what</strong> you think. She is worried about <strong>whether</strong> he will come.</em> (not <em>about that</em> or <em>about if</em>; the few exceptions are fixed, such as <em>in that</em> and <em>except that</em>).</p>` }
  ],
  traps: `<ul><li><em>I wonder where is the station</em> (wrong) → <em>where the station is</em>. No inversion in indirect questions.</li>
    <li><em>She asked me what did I want</em> (wrong) → <em>what I wanted</em>. No <em>do</em> either.</li>
    <li><em>if</em> cannot start a subject clause or follow a preposition: <em>It depends <strong>on whether</strong> he agrees</em>, not <em>on if</em>.</li>
    <li>Keep <em>that</em> after nouns like <em>fact, idea, news, belief</em>: <em>the fact that she left</em>. Do not replace it with <em>what</em> or <em>which</em>.</li>
    <li><em>What</em> vs <em>that</em>: <em>All what I need</em> is wrong; use <em>All that I need</em> or <em>What I need</em>.</li></ul>`,
  exam: `<p>Common in Use of English transformations (reported speech and indirect questions: <em>I wonder whether…</em>, <em>I had no idea what…</em>) and in cloze gaps (<em>whether, what, that, how</em>). In Writing, noun clauses let you build balanced formal sentences: <em>It is widely accepted that…, What matters most is whether…</em>.</p>`,
  quiz: [
    { type: 'mcq', q: 'I can\'t remember ___ I left my keys.', options: ['where', 'where did', 'that where', 'did where'], answer: 0, why: 'Indirect question: wh-word + statement order, with no <em>did</em>.' },
    { type: 'mcq', q: 'I wonder ___ the meeting has been cancelled.', options: ['that', 'what', 'whether', 'which'], answer: 2, why: 'A yes/no question inside a statement needs <em>whether</em> (or <em>if</em>). <em>That</em> gives a statement, <em>what/which</em> ask for information.' },
    { type: 'mcq', q: '___ she said made everyone laugh.', options: ['That', 'What', 'Which', 'Whatever that'], answer: 1, why: '<em>What</em> = "the thing that", and it is the object of <em>said</em> inside the clause. <em>That</em> cannot be the object in a subject clause.' },
    { type: 'mcq', q: 'He was disappointed by the fact ___ nobody had told him.', options: ['what', 'which', 'of', 'that'], answer: 3, why: 'After <em>the fact</em>, the clause is introduced by <em>that</em>, which is normally kept here.' },
    { type: 'mcq', q: 'We were talking about ___ we should do next.', options: ['that', 'what', 'which', 'if'], answer: 1, why: 'After a preposition a noun clause begins with a wh-word. <em>If</em> and <em>that</em> cannot follow a preposition.' },
    { type: 'mcq', q: 'The real question is ___ to hire another assistant.', options: ['whether', 'if', 'that', 'what if'], answer: 0, why: '<em>Whether + to-infinitive</em> is correct; <em>if</em> cannot be followed by <em>to</em>.' }
  ]
},
{
  id: 'questions', category: 'Sentence structure', title: 'Question forms and tags', level: 'B2–C1', tagline: 'Questions are not only for asking: they soften, check and show interest.',
  idea: `<p>Beyond <em>Do you like tea?</em>, English questions do a lot of social work. <em>Could you tell me where the station is?</em> is softer than <em>Where is the station?</em>; <em>You're coming, aren't you?</em> asks for confirmation, not information; <em>Oh, did you?</em> shows you are listening.</p>
  <p>The reason there are so many forms is politeness and function. A direct question can sound abrupt, so we hide it inside a longer, polite frame (and the word order changes back to normal). A tag turns a statement into a request to agree. Echo and checking questions keep the conversation moving.</p>
  <p>Learn the patterns as tools for a purpose, not as separate rules.</p>`,
  parts: [
    { h: 'Direct, indirect and subject questions', body: `<div class="eg">Direct: <em>Where is the station? What time does it open?</em></div>
      <div class="eg">Indirect (polite): <em>Could you tell me where the station is? Do you know what time it opens?</em> <span class="muted">(statement order, no do-support in the embedded part)</span></div>
      <div class="eg">Subject questions have <strong>no do</strong>: <em>Who called you? What happened? Which team won?</em> <span class="muted">(compare object question: <em>Who did you call?</em>)</span></div>
      <p>After <em>Do you know / Could you tell me / I wonder</em>, the embedded question is a noun clause: the frame keeps its own order (<em>Do you know…</em>) but the embedded part does not invert. Yes/no questions inside use <em>if</em> or <em>whether</em>: <em>Do you know whether he has left?</em></p>` },
    { h: 'Question tags and negative questions', body: `<p>Rule: positive statement → negative tag; negative statement → positive tag. The tag repeats the auxiliary (or <em>do</em> if there is none) and a pronoun.</p>
      <div class="eg">You live here, <em>don't you</em>? She hasn't left, <em>has she</em>?</div>
      <div class="eg">Irregulars: <em>I am late, <strong>aren't I</strong>? Let's go, <strong>shall we</strong>? Open the door, <strong>will you</strong>? Don't be late, <strong>will you</strong>? Nobody called, <strong>did they</strong>?</em></div>
      <p>Tone matters: <strong>falling</strong> intonation = you expect agreement; <strong>rising</strong> = a real question. <strong>Negative questions</strong> (<em>Isn't it a lovely day? Didn't you hear?</em>) express surprise, criticism or an invitation; <em>Why don't we…?</em> makes a suggestion.</p>` },
    { h: 'Echo questions, short answers and "so / neither"', body: `<div class="eg">A: <em>I've bought a car.</em> B: <em>Have you?</em> <span class="muted">(echo: shows interest; same auxiliary, same tense)</span></div>
      <div class="eg">A: <em>She's moved to Leeds.</em> B: <em>She's moved where?</em> <span class="muted">(checking a word you missed)</span></div>
      <div class="eg">Short answers: <em>Are you ready? Yes, I am.</em> (not <em>Yes, I'm</em>)</div>
      <div class="eg"><em>I love jazz. So do I.</em> / <em>I can't swim. Neither can I. / Nor can I.</em> <span class="muted">(so + positive, neither/nor + negative, then auxiliary + subject)</span></div>` }
  ],
  traps: `<ul><li><em>Could you tell me where is the station?</em> (wrong) → <em>where the station is</em>.</li>
    <li><em>Who did call you?</em> (wrong, unless emphatic) → <em>Who called you?</em> A subject question takes no <em>do</em>.</li>
    <li><em>I am late, <strong>am I not</strong>?</em> is stiff; the usual tag is <em>aren't I</em>. Not <em>amn't I</em>, which is non-standard.</li>
    <li>Imperatives take <em>will you / won't you / can you</em> as tag: <em>Close the window, will you?</em> (not <em>don't you</em>). After <em>Let's</em>, use <em>shall we</em>.</li>
    <li><em>So</em> goes with positive and <em>neither/nor</em> with negative: <em>I don't like it. So don't I</em> is wrong. Spanish <em>yo tampoco</em> = <em>neither do I</em>.</li>
    <li>Negative questions: <em>Don't you like it? — No, I don't</em> means you do not like it; in English the answer follows the facts, not the form of the question.</li></ul>`,
  exam: `<p>Use of English transformations often turn a direct question into an indirect one (<em>She asked me what time…</em>). Listening items rely on tags, echo and negative questions for attitude (does the speaker agree, doubt or complain?). In Speaking Part 3 and 4, polite indirect questions (<em>Could I ask what you think about…?</em>) and echo questions sustain interaction.</p>`,
  quiz: [
    { type: 'mcq', q: 'Could you tell me where ___?', options: ['does the station', 'is the station', 'was the station', 'the station is'], answer: 3, why: 'After a polite frame, the question is a noun clause in statement order: <em>where the station is</em>.' },
    { type: 'mcq', q: 'Let\'s go for a walk, ___?', options: ['don\'t we', 'shall we', 'will we', 'do we'], answer: 1, why: 'After <em>Let\'s</em> the tag is <em>shall we</em>.' },
    { type: 'mcq', q: 'I\'m late again, ___?', options: ['aren\'t I', 'ain\'t I', 'am not I', 'isn\'t I'], answer: 0, why: '<em>Aren\'t I</em> is the standard tag after <em>I am</em>.' },
    { type: 'mcq', q: 'Who ___ the last biscuit?', options: ['did ate', 'did eaten', 'ate', 'eat did'], answer: 2, why: 'When <em>who</em> is the subject, the verb follows directly, with no <em>do</em>.' },
    { type: 'mcq', q: 'A: I don\'t like horror films. B: ___.', options: ['So do I', 'Neither am I', 'So don\'t I', 'Neither do I'], answer: 3, why: 'A negative statement takes <em>neither / nor + auxiliary</em>, and the auxiliary copies the original (<em>don\'t</em> → <em>do</em>).' },
    { type: 'mcq', q: 'Open the window, ___?', options: ['don\'t you', 'will you', 'do you', 'are you'], answer: 1, why: 'A tag after an imperative is usually <em>will you</em> (or <em>won\'t you</em>, <em>can you</em>) and makes the order sound like a request.' }
  ]
}
);
