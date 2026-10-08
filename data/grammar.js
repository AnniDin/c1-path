window.C1 = window.C1 || {};
C1.grammar = [
{
  id: 'inversion', category: 'Sentence structure', title: 'Inversion', level: 'C1', tagline: 'Why "Never have I seen…" is not just fancy word order.',
  idea: `<p>Compare: <em>I have never seen such courage.</em> and <em>Never have I seen such courage.</em> Same facts, but the second one makes the listener stop and listen. It sounds formal and dramatic, like a speech, not like chat at the bus stop.</p>
  <p>How? Put a negative or limiting word at the very front (<em>Never, Rarely, Only when…</em>) and the rest of the sentence switches to <strong>question order</strong>: auxiliary (helping verb) first, then the subject. The odd word order is the signal that you are deliberately stressing the idea.</p>
  <p>So inversion = <strong>emphasis + formality</strong>. If you don't need either, don't use it.</p>`,
  parts: [
    { h: 'How it works', body: `<p>Take a normal sentence, move the trigger phrase to the front, then treat the rest like a question.</p>
      <div class="eg">I have never seen such courage. → <em>Never have I</em> seen such courage.</div>
      <div class="eg">She rarely complains. → <em>Rarely does she</em> complain. <span class="muted">(no auxiliary in the original, so <em>do</em> appears, exactly as in a question: <em>Does she complain?</em>)</span></div>` },
    { h: 'What triggers it', body: `<p>The opener is usually <strong>negative or limiting</strong> ("not", "only", "hardly"), because those are the words a speaker wants to stress; <em>so/such ... that</em> is the one dramatic exception. <em>Always, often, sometimes</em> do not trigger it.</p><div class="tablewrap"><table><tr><th>Trigger</th><th>Pattern</th></tr>
      <tr><td>Never, rarely, seldom, little, at no time</td><td><em>Rarely do we get such good weather.</em></td></tr>
      <tr><td>Hardly / scarcely … when; No sooner … than</td><td><em>No sooner had we sat down than the music stopped.</em></td></tr>
      <tr><td>Not only … (but also)</td><td><em>Not only did he lie, he also blamed me.</em></td></tr>
      <tr><td>Under no circumstances, on no account, in no way</td><td><em>Under no circumstances should you open this door.</em></td></tr>
      <tr><td>Only + time/condition (only when, only after, only then)</td><td><em>Only after the storm did we realise the damage.</em></td></tr>
      <tr><td>Not until</td><td><em>Not until she left did I understand her.</em></td></tr>
      <tr><td>So + adjective … that; Such … that</td><td><em>So loud was the noise that nobody slept.</em></td></tr></table></div>` },
    { h: 'The logic behind the patterns', body: `<p><strong>Why "Only after… <em>did</em> we realise", but not inversion in the first half?</strong> The question order happens in the part that <em>follows</em> the fronted phrase, the main clause. "Only after the storm" is just the opener, so it stays in normal order.</p>
      <p><strong>Why <em>Not only</em> inverts but <em>but also</em> doesn't?</strong> Only the negative element is fronted. <em>But also</em> arrives later in an ordinary position.</p>
      <p><strong>Inverted conditionals</strong> follow the same idea: drop <em>if</em> and put the auxiliary first. <em>Had I known</em> = <em>If I had known</em>; <em>Should you need help</em> = <em>If you should need help</em>; <em>Were she here</em> = <em>If she were here</em>. See the Conditionals lesson.</p>` }
  ],
  traps: `<ul><li><em>No sooner … <strong>than</strong></em>, but <em>Hardly … <strong>when</strong></em>. Mixing them up is a classic error.</li>
    <li>Don't invert after <em>not only</em> when it doesn't start the sentence: <em>He not only sang, but also danced.</em></li>
    <li>After inversion the main verb goes back to its base form, because the auxiliary carries the tense: <em>Rarely did she <strong>complain</strong></em>, not <em>complained</em>.</li>
    <li>Adverbs like <em>always, often, sometimes</em> do <strong>not</strong> trigger inversion; only negative or restrictive ones do.</li></ul>`,
  exam: `<p>Key word transformations often require an inverted structure (<em>LITTLE, SOONER, HARDLY, NOT</em>). In Writing, one well-placed inversion in an essay or formal letter shows range, but overuse sounds unnatural.</p>`,
  quiz: [
    { type: 'mcq', q: 'Never ___ such a beautiful sunset.', options: ['I have seen', 'have I seen', 'did I saw', 'I saw'], answer: 1, why: '<em>Never</em> is fronted, so the auxiliary <em>have</em> comes before the subject, and the main verb stays a participle.' },
    { type: 'mcq', q: 'No sooner had the film started ___ the power went out.', options: ['than', 'when', 'that', 'then'], answer: 0, why: '<em>No sooner</em> is a comparative idea (sooner <em>than</em>). <em>Hardly/scarcely</em> pair with <em>when</em>.' },
    { type: 'gap', q: 'Rarely ___ she complain about her workload.', answers: ['does', 'did'], why: 'There is no auxiliary in <em>She rarely complains</em>, so <em>do</em> is added (in the right form) as in a question, and the verb becomes base form. <em>Does</em> (habit) or <em>did</em> (a past occasion) both fit, because the sentence gives no time clue.' },
    { type: 'mcq', q: 'Only after the results were published ___ how badly they had done.', options: ['they realised', 'did they realise', 'they did realise', 'realised they'], answer: 1, why: 'The main clause follows <em>Only after…</em>, so it takes question order: <em>did they realise</em>.' },
    { type: 'kwt', first: 'I did not realise at all that the shop was about to close.', key: 'little', second: '___ that the shop was about to close.', answers: ['Little did I realise', 'Little did I know'], why: '<em>Little</em> here means "not at all". Fronted, it triggers inversion: <em>Little did I realise</em>.' },
    { type: 'mcq', q: 'Not only ___ late, but he also forgot the documents.', options: ['he was', 'was he', 'did he was', 'he did'], answer: 1, why: '<em>Not only</em> starts the sentence, so the verb <em>be</em> moves before the subject: <em>was he</em>. (<em>Be</em> needs no <em>do</em>.)' }
  ]
},
{
  id: 'conditionals', category: 'Verbs and time', title: 'Conditionals: mixed and inverted', level: 'C1', tagline: 'Past tenses that are not about the past.',
  idea: `<p>Compare: <em>If I win, I'll buy a house.</em> (I might win.) and <em>If I won, I'd buy a house.</em> (I probably won't.) Both are about the future, yet the second uses a <em>past</em> tense. So here the past tense is not about time: it signals <strong>distance from reality</strong>. One more step back (<em>If I had won…</em>) means "it didn't happen, and it's too late to change".</p>
  <p>Once you see that, mixed conditionals are logical. Choose the distance for the <em>if</em> part and for the result part separately, because each can point to a different time.</p>`,
  parts: [
    { h: 'The distance scale', body: `<div class="tablewrap"><table><tr><th>Situation</th><th>If-part</th><th>Result</th></tr>
      <tr><td>Real / possible</td><td>present simple</td><td>will / can / imperative</td></tr>
      <tr><td>Unreal now or in general</td><td>past simple</td><td>would + infinitive</td></tr>
      <tr><td>Unreal past</td><td>past perfect</td><td>would have + participle</td></tr></table></div>` },
    { h: 'Mixed conditionals', body: `<p><strong>Past cause → present result:</strong> <em>If I had taken that job, I would be living in Paris now.</em> (the choice was in the past; the result is now)</p>
      <p><strong>Present state → past result:</strong> <em>If she weren't so shy, she would have introduced herself at the party.</em> (shyness is a general trait; the result was one past event)</p>
      <p>Test: ask "when is the <em>condition</em>?" and "when is the <em>result</em>?" and pick the form for each. (Past perfect in the if-part = not real, and over; <em>would be</em> = the result still holds now.)</p>` },
    { h: 'Inverted conditionals (formal)', body: `<p>In formal writing and speeches you can drop <em>if</em> and flip the order, as in a question. It sounds more serious.</p><div class="eg"><em>Had</em> I known, I would have called. = If I had known…</div>
      <div class="eg"><em>Were</em> he to apply, he would probably get the job. = If he were to apply…</div>
      <div class="eg"><em>Should</em> you need anything, ring reception. = If you should need…</div>
      <p>Only <em>had</em>, <em>were</em> and <em>should</em> can lead. Negatives use <em>not</em> after the subject: <em>Had I not known…</em></p>` },
    { h: 'Other ways to express a condition', body: `<ul><li><strong>Unless</strong> = if … not (<em>Unless you hurry, we'll miss it</em>)</li>
      <li><strong>Provided / providing / as long as</strong> = only if (<em>Provided you pay, you can stay</em>)</li>
      <li><strong>Otherwise</strong> = if not (<em>Leave now; otherwise you'll be late</em>)</li>
      <li><strong>But for / If it hadn't been for / Without</strong> + noun (<em>But for your help, I would have failed</em>)</li></ul>` }
  ],
  traps: `<ul><li>Never put <em>would</em> in the <em>if</em> clause: <s>If I would have known</s> → <em>If I had known</em>. (Exception: polite requests, <em>If you would wait here…</em>)</li>
    <li><em>Were</em> is standard for all persons in formal unreal conditions: <em>If I were you</em>, <em>If she were</em>.</li>
    <li><em>Unless</em> does not combine well with unreal past: <s>Unless I had known…</s></li></ul>`,
  exam: `<p>Key word transformations regularly test <em>PROVIDED, UNLESS, HAD, WERE, BUT, OTHERWISE</em>. Open cloze texts often need <em>had, were, would, should</em> in a conditional.</p>`,
  quiz: [
    { type: 'mcq', q: 'If I ___ harder at school, I would have a better job now.', options: ['worked', 'had worked', 'would work', 'have worked'], answer: 1, why: 'The studying was in the past (past perfect), the result is now (would + infinitive): a mixed conditional.' },
    { type: 'mcq', q: '___ you need any help, please contact reception.', options: ['Would', 'Had', 'Should', 'Were'], answer: 2, why: '<em>Should you need</em> = <em>If you should need</em>: a formal, slightly unlikely possibility.' },
    { type: 'gap', q: 'Had it not been for your support, I ___ given up long ago.', answers: ['would have', 'would\'ve', '\'d have', 'might have', 'could have'], why: 'An inverted unreal-past conditional needs a perfect modal in the result: usually <em>would have</em> + participle (<em>might/could have</em> also work).' },
    { type: 'mcq', q: '___ I taken your advice at the time, I wouldn\'t be in this mess now.', options: ['Have', 'Had', 'Were', 'Would'], answer: 1, why: 'Inverted unreal-past condition (<em>If I had taken</em> = <em>Had I taken</em>) with a present result (<em>wouldn\'t be</em>): a mixed conditional.' },
    { type: 'kwt', first: 'I\'ll lend you the money only if you promise to pay it back.', key: 'provided', second: 'I\'ll lend you the money ___ to pay it back.', answers: ['provided you promise', 'provided that you promise'], why: '<em>Provided (that)</em> means "only if", and it takes a present tense for a real future condition.' },
    { type: 'mcq', q: 'Which sentence is correct?', options: ['If I would have known, I would have told you.', 'If I had known, I would have told you.', 'If I knew, I would have told you.', 'If I have known, I would tell you.'], answer: 1, why: 'Unreal past = past perfect in the <em>if</em> clause. <em>Would</em> never goes there.' }
  ]
},
{
  id: 'cleft', category: 'Sentence structure', title: 'Cleft sentences', level: 'C1', tagline: 'Split a sentence in two to put the important part where it will be heard.',
  idea: `<p>Your flatmate says <em>You broke my mug!</em> and you reply <em>It wasn't me who broke it, it was Tom.</em> You didn't just say "Tom broke it": you split the sentence so that the name <em>Tom</em> lands where it will be heard.</p>
  <p>That is the point of a cleft sentence ("cleft" means split). Normally the most important news comes at the end of a sentence. A cleft splits one sentence in two, so that the piece you want to stress gets its own spotlight right after <em>is/was</em>: <em>Someone broke the window</em> → <em>It was Tom who broke the window.</em></p>`,
  parts: [
    { h: 'It-clefts', body: `<p>Use these to say "this one, not another". Pattern: <em>It is/was</em> + focus + <em>that/who</em> + rest.</p>
      <div class="eg">It was <em>in Lisbon</em> that we first met.</div>
      <div class="eg">It wasn't <em>until midnight</em> that the storm died down.</div>
      <div class="eg">It is <em>her honesty</em> that I admire.</div>
      <p>Use it to correct or contrast: <em>It was Tuesday, not Monday, that he called.</em></p>` },
    { h: 'Wh-clefts (pseudo-clefts)', body: `<p>Here you announce a "headline" first and give the answer last, like a small drum roll: <em>What / All / The thing / The reason / The place</em> + clause + <em>be</em> + focus.</p>
      <div class="eg"><em>What</em> I need <em>is</em> a long holiday.</div>
      <div class="eg"><em>All</em> she wanted <em>was</em> some peace.</div>
      <div class="eg"><em>What</em> happened <em>was</em> that the printer jammed.</div>
      <div class="eg"><em>What</em> he did <em>was</em> (to) call the police.</div>
      <p>The logic: the wh-clause is a headline ("the thing I need"), <em>be</em> is an equals sign, and the focus completes it.</p>` },
    { h: 'Reversed wh-clefts', body: `<p>Same meaning, turned round: the focus comes first, for an even stronger start.</p><div class="eg">A long holiday <em>is what</em> I need.</div><div class="eg">His attitude <em>is what</em> annoys me.</div>` }
  ],
  traps: `<ul><li><em>The reason … is <strong>that</strong> …</em>, not <s>because</s>: <em>The reason I left is that I was bored.</em></li>
    <li>Match the verb after <em>What</em>: <em>What annoys me is…</em> The verb <em>be</em> agrees with what follows: <em>What I need are more hours.</em> (plural) is acceptable, though <em>is</em> is very common.</li>
    <li>In <em>What he did was…</em> the verb after <em>be</em> can take <em>to</em> or the bare infinitive; both are fine.</li></ul>`,
  exam: `<p>Common in transformations (<em>IT, WHAT, ALL, REASON</em>) and in Writing, where a cleft adds emphasis to an argument: <em>What matters most is…</em></p>`,
  quiz: [
    { type: 'mcq', q: '___ annoys me most is his constant lateness.', options: ['That', 'What', 'It', 'Which'], answer: 1, why: '<em>What</em> here means "the thing that" and starts a wh-cleft.' },
    { type: 'mcq', q: 'It wasn\'t until midnight ___ the storm died down.', options: ['when', 'which', 'that', 'than'], answer: 2, why: 'In an it-cleft, the focus is followed by <em>that</em> (or <em>who</em> for people).' },
    { type: 'gap', q: 'What she did ___ to ignore the message completely.', answers: ['was'], why: 'The wh-clause "What she did" is past, so <em>be</em> is <em>was</em>.' },
    { type: 'mcq', q: 'The reason I left the company is ___ I was bored.', options: ['because', 'that', 'why', 'for'], answer: 1, why: 'After <em>The reason … is</em> we use <em>that</em>. <em>Because</em> repeats the meaning of <em>reason</em>.' },
    { type: 'kwt', first: 'Maria was the only person to notice the mistake.', key: 'it', second: '___ noticed the mistake.', answers: ['It was only Maria who', 'It was Maria alone who', 'It was only Maria that', 'It was Maria alone that'], why: 'An it-cleft: <em>It was</em> + focus + <em>who</em> + rest.' },
    { type: 'mcq', q: 'All I want ___ a quiet evening.', options: ['is', 'are', 'be', 'being'], answer: 0, why: '<em>All I want</em> is a singular headline, so <em>is</em> equals "a quiet evening".' }
  ]
},
{
  id: 'passive', category: 'Reporting and voice', title: 'Passives, causatives and reporting structures', level: 'B2–C1', tagline: 'Choose your subject on purpose.',
  idea: `<p>Compare <em>A company completed the bridge in 1998.</em> and <em>The bridge was completed in 1998.</em> In the second, who did it doesn't matter: the story is about the bridge. That is the passive: you choose <strong>what you want to talk about</strong>, and you can leave out the doer when it is unknown, obvious or unimportant.</p>
  <p>English likes to start with what the listener already knows and end with the news, so the passive helps you put the thing you are discussing first.</p>`,
  parts: [
    { h: 'Form and time', body: `<p>The form is <em>be</em> (in the tense you need) + the past participle (<em>done, built, stolen</em>). The tense lives in <em>be</em>: <em>is built, was built, will be built</em>. With modals: <em>must be done</em>, <em>should have been done</em>. In progress: <em>is being built</em>.</p>` },
    { h: 'Causative: have / get something done', body: `<p>You don't service your own car: a garage does it, and you arrange it. <em>Have</em> (or the more informal <em>get</em>) + thing + past participle says that without naming the garage. It also covers things that happen <em>to</em> you (usually with <em>get</em>, or <em>have</em> for bad luck).</p>
      <div class="eg">I <em>had my car serviced</em> last week.</div>
      <div class="eg">She <em>got her bag stolen</em>. <span class="muted">(unlucky experience)</span></div>
      <p>Compare <em>I cut my hair</em> (I did it) and <em>I had my hair cut</em> (someone did it for me).</p>` },
    { h: 'Reporting passives', body: `<p>Newspapers and reports say what people believe without saying <em>who</em>: "everyone says…", "experts think…". Put the news itself in the subject:</p>
      <div class="eg"><em>It is said that</em> the company is in trouble. = The company <em>is said to be</em> in trouble.</div>
      <div class="eg">The company <em>is believed to have lost</em> millions. <span class="muted">(the losing came before the saying/believing, so <em>to have lost</em>)</span></div>
      <p>The logic of the infinitive after <em>said / believed / thought</em>: <em>to be</em> = same time as the saying/believing, <em>to have</em> + past participle = earlier, <em>to be -ing</em> = in progress.</p>` }
  ],
  traps: `<ul><li>Intransitive verbs have no passive: <s>was happened</s>, <s>was arrived</s>.</li>
    <li>Don't use the passive just because it sounds academic: <em>Mistakes were made</em> hides the doer, so use it only when that is your intention.</li>
    <li>Word order with two objects: <em>She was given a prize</em> (person as subject) is more natural than <em>A prize was given (to) her</em>.</li></ul>`,
  exam: `<p>Very frequent in transformations (<em>SAID, BELIEVED, HAD, GOT, BEING</em>) and in formal writing. Reporting passives are a favourite with the examiners.</p>`,
  quiz: [
    { type: 'mcq', q: 'The company is believed ___ millions last year.', options: ['to lose', 'to have lost', 'losing', 'to be losing'], answer: 1, why: 'The losing happened before the belief, so use the perfect infinitive <em>to have lost</em>.' },
    { type: 'mcq', q: 'I had my car ___ yesterday.', options: ['repair', 'repaired', 'repairing', 'to repair'], answer: 1, why: 'Causative <em>have + object + past participle</em>.' },
    { type: 'gap', q: 'The new bridge ___ built at the moment.', answers: ['is being', '\'s being'], why: 'Present continuous passive: <em>is being</em> + participle.' },
    { type: 'mcq', q: 'The accident ___ at about six o\'clock.', options: ['was happened', 'happened', 'has been happened', 'got happened'], answer: 1, why: '<em>Happen</em> is intransitive: it has no object, so it cannot be made passive.' },
    { type: 'kwt', first: 'Someone stole my bike outside the library.', key: 'had', second: 'I ___ stolen outside the library.', answers: ['had my bike', 'had my bicycle'], why: '<em>Have + object + participle</em> also describes something unpleasant that happens to you.' },
    { type: 'mcq', q: 'It is thought that the painting was stolen in 1990. = The painting ___ in 1990.', options: ['is thought to steal', 'is thought to have been stolen', 'thought to be stolen', 'is thinking to be stolen'], answer: 1, why: 'Earlier time + passive meaning → <em>to have been stolen</em>.' }
  ]
},
{
  id: 'modals', category: 'Verbs and time', title: 'Modals of deduction and criticism', level: 'B2–C1', tagline: 'Modals measure how sure you are. The form after them tells you the time.',
  idea: `<p>You see the lights are on. <em>She must be at home</em> (I'm nearly sure) and <em>She might be at home</em> (it's possible) say different things about the <em>same</em> facts: the modal shows the speaker's <strong>attitude</strong>: here, how certain you are (elsewhere: how obliged, how critical). What follows the modal shows <strong>time</strong>:</p>
  <ul><li>modal + infinitive → present or future (<em>She must be tired</em>)</li>
  <li>modal + <em>be -ing</em> → happening now (<em>She must be working</em>)</li>
  <li>modal + <em>have</em> + participle → past (<em>She must have left</em>)</li></ul>
  <p>So there are only two questions to answer: <em>how sure am I?</em> and <em>when?</em></p>`,
  parts: [
    { h: 'Certainty scale', body: `<div class="tablewrap"><table><tr><th>Certainty</th><th>Positive</th><th>Negative</th></tr>
      <tr><td>Almost sure</td><td>must (have)</td><td>can't / couldn't (have)</td></tr>
      <tr><td>Probably</td><td>should / ought to</td><td>shouldn't</td></tr>
      <tr><td>Possibly</td><td>may / might / could (have)</td><td>may not / might not (have)</td></tr></table></div>
      <p><em>Mustn't</em> is about prohibition, not deduction. For a negative deduction use <em>can't</em>: <em>He can't be at work; I've just seen him.</em></p>` },
    { h: 'Past criticism and regret', body: `<div class="eg">You <em>should have called</em>. <span class="muted">(you didn't; I'm criticising)</span></div>
      <div class="eg">You <em>needn't have bought</em> a gift. <span class="muted">(you did, and it wasn't necessary)</span></div>
      <div class="eg">I <em>didn't need to buy</em> a gift. <span class="muted">(it wasn't necessary; we don't know whether I bought one)</span></div>
      <div class="eg">We <em>could have won</em>. <span class="muted">(it was possible, but we didn't)</span></div>` }
  ],
  traps: `<ul><li><em>Must</em> for deduction has no true negative: use <em>can't</em>.</li>
    <li><em>Might have</em> and <em>could have</em> for a past possibility. <em>Could have</em> also expresses a missed opportunity.</li>
    <li><em>Should have</em> alone = criticism/regret; <em>should</em> + <em>be</em> = expectation.</li></ul>`,
  exam: `<p>Constant in transformations (<em>MUST, CAN'T, MIGHT, NEEDN'T, SHOULD</em>), in Listening (speaker attitude) and in Reading (author's certainty).</p>`,
  quiz: [
    { type: 'mcq', q: 'The lights are off, so they ___ be at home.', options: ['must', 'can\'t', 'mustn\'t', 'should'], answer: 1, why: 'Negative deduction ("I\'m sure they are not") uses <em>can\'t</em>. <em>Mustn\'t</em> means "forbidden".' },
    { type: 'mcq', q: 'I\'m not sure, but she ___ have left already.', options: ['must', 'might', 'can\'t', 'needn\'t'], answer: 1, why: '"Not sure" = a possibility: <em>might have</em>.' },
    { type: 'mcq', q: 'He looks delighted and he studied for weeks. He ___ the exam.', options: ['must have passed', 'can\'t have passed', 'might pass', 'should pass'], answer: 0, why: 'A strong deduction about the past: <em>must have</em> + participle.' },
    { type: 'gap', q: 'The streets are wet. You are almost certain: it ___ have rained during the night.', answers: ['must'], why: 'Strong positive deduction about the past = <em>must have</em>.' },
    { type: 'mcq', q: 'You ___ have bought a present. It wasn\'t necessary, although it\'s lovely.', options: ['needn\'t', 'mustn\'t', 'can\'t', 'wouldn\'t'], answer: 0, why: '<em>Needn\'t have done</em> = you did it, but it was unnecessary.' },
    { type: 'kwt', first: 'I\'m sure she didn\'t see us.', key: 'can\'t', second: 'She ___ seen us.', answers: ['can\'t have'], why: 'Negative certainty about the past: <em>can\'t have</em> + participle.' }
  ]
},
{
  id: 'wish', category: 'Verbs and time', title: 'Wishes, regrets and preferences', level: 'B2–C1', tagline: 'The same "distance" logic as conditionals.',
  idea: `<p><em>I have more time</em> is a fact. <em>I wish I had more time</em> says the opposite is true: I don't. <em>Wish</em>, <em>if only</em>, <em>would rather</em> and <em>it's time</em> all talk about things that are <strong>not real</strong>, so they borrow the "distance" tense you met in conditionals: past simple = "not true now", past perfect = "not true then".</p>`,
  parts: [
    { h: 'The patterns', body: `<div class="tablewrap"><table><tr><th>You want to say</th><th>Pattern</th><th>Example</th></tr>
      <tr><td>Regret about now</td><td>wish / if only + past simple</td><td><em>I wish I had more time.</em></td></tr>
      <tr><td>Regret about the past</td><td>wish / if only + past perfect</td><td><em>If only I hadn't said that.</em></td></tr>
      <tr><td>Annoyance / wanting change in others</td><td>wish + <em>would</em></td><td><em>I wish you would listen.</em></td></tr>
      <tr><td>Preference about another person</td><td>would rather + subject + past</td><td><em>I'd rather you didn't smoke here.</em></td></tr>
      <tr><td>It should already be done</td><td>it's (high) time + past</td><td><em>It's time we left.</em></td></tr></table></div>` },
    { h: 'Why "would" only works for change', body: `<p><em>Would</em> expresses willingness or refusal, so it suits someone's <strong>behaviour</strong> that could change: <em>I wish it would stop raining.</em> You cannot use it about yourself for a state: <s>I wish I would be taller</s> → <em>I wish I were taller</em>.</p>` }
  ],
  traps: `<ul><li>After <em>wish</em>, <em>were</em> is standard for every person in formal English: <em>I wish he were here.</em></li>
    <li><em>Would rather</em> with the <strong>same</strong> subject takes the bare infinitive: <em>I'd rather stay.</em> With a <strong>different</strong> subject it takes the past: <em>I'd rather you stayed.</em></li>
    <li><em>It's time you left</em> = you should already have gone; <em>It's time to leave</em> = neutral.</li></ul>`,
  exam: `<p>Highly predictable in transformations (<em>WISH, RATHER, TIME, ONLY</em>) and a good source of natural-sounding sentences in Speaking.</p>`,
  quiz: [
    { type: 'mcq', q: 'I wish I ___ more free time these days.', options: ['have', 'had', 'would have', 'have had'], answer: 1, why: 'Regret about the present: past simple.' },
    { type: 'mcq', q: 'If only I ___ that email yesterday!', options: ['didn\'t send', 'wouldn\'t send', 'hadn\'t sent', 'haven\'t sent'], answer: 2, why: 'Regret about the past: past perfect.' },
    { type: 'mcq', q: 'I wish you ___ stop interrupting me.', options: ['will', 'would', 'did', 'had'], answer: 1, why: 'Annoyance about someone\'s behaviour: <em>wish + would</em>.' },
    { type: 'gap', q: 'It\'s high time we ___ (leave).', answers: ['left'], why: '<em>It\'s (high) time</em> is followed by the past simple, showing it is already late.' },
    { type: 'mcq', q: 'I\'d rather you ___ smoke in here.', options: ['don\'t', 'didn\'t', 'won\'t', 'not to'], answer: 1, why: '<em>Would rather</em> + a different subject + past simple.' },
    { type: 'kwt', first: 'I regret not learning to drive earlier.', key: 'wish', second: 'I ___ learnt to drive earlier.', answers: ['wish I had', 'wish I\'d'], why: 'Regret about the past: <em>wish + past perfect</em>.' }
  ]
},
{
  id: 'participle', category: 'Sentence structure', title: 'Participle clauses', level: 'C1', tagline: 'Shorten a clause without losing meaning.',
  idea: `<p>Compare <em>While I was walking home, I saw an accident.</em> and <em>Walking home, I saw an accident.</em> Same meaning, but the second is shorter and smoother: the words <em>while I was</em> have simply gone. This is how written English packs two actions into one sentence.</p>
  <p>It works only if <strong>the short clause has the same subject as the main clause</strong>: whoever is walking is the person who saw. The subject has been deleted, so the listener must pick it up from the main clause. (We call the short form a participle clause.)</p>
  <p>The form tells you how the two actions relate: <em>-ing</em> = the subject does it, <em>-ed</em> = it is done to the subject, <em>having + -ed</em> = it happened first.</p>`,
  parts: [
    { h: 'The three forms', body: `<div class="eg"><em>Walking</em> home, I saw an accident. <span class="muted">(while I was walking)</span></div>
      <div class="eg"><em>Built</em> in 1880, the bridge is still in use. <span class="muted">(which was built)</span></div>
      <div class="eg"><em>Having finished</em> the report, she went home. <span class="muted">(after she had finished)</span></div>
      <div class="eg"><em>Not knowing</em> the way, we asked a stranger. <span class="muted">(negative: not comes first)</span></div>
      <div class="eg"><em>Having been warned</em> about the storm, the villagers stayed indoors. <span class="muted">(earlier + passive)</span></div>` },
    { h: 'What relationship do they express?', body: `<p>Context decides: time (<em>Opening the door, he…</em>), cause (<em>Being tired, he…</em>), condition (<em>Used properly, this tool lasts years</em>), contrast (<em>Although exhausted…</em>). Conjunctions can stay for clarity: <em>Although living abroad, she…</em>, <em>While waiting…</em>, <em>After leaving…</em>.</p>` }
  ],
  traps: `<ul><li><strong>Dangling participle:</strong> <s>Walking down the street, a car nearly hit me.</s> The car was not walking. Fix: <em>Walking down the street, I was nearly hit by a car.</em></li>
    <li>Use <em>having done</em> only for an action <em>completed before</em> the main one. If they are simultaneous, use <em>-ing</em>.</li>
    <li>Use <em>being</em> for the passive in progress: <em>Being ignored, he left.</em></li></ul>`,
  exam: `<p>Key word transformations (<em>HAVING, BEING, NOT</em>), Writing (compact, formal style) and Speaking (natural connectors).</p>`,
  quiz: [
    { type: 'mcq', q: '___ the report, she sent it to her manager.', options: ['Finishing', 'Having finished', 'Finished', 'To finish'], answer: 1, why: 'Finishing came before sending, so use <em>having + participle</em>.' },
    { type: 'mcq', q: '___ in 1880, the bridge is still used every day.', options: ['Building', 'Having built', 'Built', 'To build'], answer: 2, why: 'The bridge <em>was built</em>: passive meaning, so the past participle.' },
    { type: 'mcq', q: 'Walking down the street, ___', options: ['a car nearly hit me.', 'I was nearly hit by a car.', 'the car nearly hit.', 'it nearly hit me a car.'], answer: 1, why: 'The subject of the participle (I) must also be the subject of the main clause. Otherwise it dangles.' },
    { type: 'gap', q: '___ the way (not know), we asked a stranger.', answers: ['Not knowing'], why: 'The negative goes before the participle: <em>Not knowing</em>.' },
    { type: 'mcq', q: 'Having been warned about the storm, ___', options: ['the storm was expected.', 'the villagers stayed indoors.', 'the rain began.', 'staying indoors was wise.'], answer: 1, why: 'The people who were warned must be the subject of the main clause: <em>the villagers</em>.' },
    { type: 'kwt', first: 'Because he had lost his keys, he couldn\'t get in.', key: 'having', second: '___ his keys, he couldn\'t get in.', answers: ['Having lost'], why: 'Losing happened before the main action: <em>Having lost</em>.' }
  ]
},
{
  id: 'aspect', category: 'Verbs and time', title: 'Tense and aspect: choosing your viewpoint', level: 'B2–C1', tagline: 'Tenses show how you look at time, not only when.',
  idea: `<p><em>I live here</em>, <em>I'm living here</em> and <em>I've lived here</em> are all about now, but they say different things: a fact, a temporary situation, a story that began earlier. Every verb form combines <strong>time</strong> (past, present, future) with your <strong>viewpoint</strong> on the event (grammar books call this aspect):</p>
  <ul><li><strong>Simple</strong>: the event as a whole, a fact, a habit.</li>
  <li><strong>Continuous</strong>: in progress at a moment; temporary; unfinished.</li>
  <li><strong>Perfect</strong>: looking back from a point in time; the earlier event matters to that point.</li></ul>
  <p>Combine them and you can reach any moment: <em>By next June I will have been working here for ten years.</em></p>`,
  parts: [
    { h: 'Perfect = "up to / before that point"', body: `<div class="eg">present perfect: up to <em>now</em> (<em>I have lived here for years</em>)</div>
      <div class="eg">past perfect: before <em>then</em> (<em>By the time we arrived, the film had started</em>)</div>
      <div class="eg">future perfect: before <em>a future point</em> (<em>By 2030 she will have retired</em>)</div>` },
    { h: 'Perfect continuous = perfect + "in progress / visible effect"', body: `<div class="eg">She's tired because she <em>has been working</em> all day. <span class="muted">(activity, and the result you can see)</span></div>
      <div class="eg">I <em>had been waiting</em> for an hour when the bus came.</div>
      <p>Simple perfect focuses on <strong>result or quantity</strong> (<em>I've written three emails</em>); continuous perfect on <strong>activity or duration</strong> (<em>I've been writing emails all morning</em>).</p>` },
    { h: 'Future continuous', body: `<div class="eg">This time tomorrow we <em>will be lying</em> on a beach. <span class="muted">(in progress at that future moment)</span></div>
      <div class="eg">Will you <em>be using</em> the car tonight? <span class="muted">(polite: asks about a plan, not a request)</span></div>` }
  ],
  traps: `<ul><li><strong>State verbs</strong> (know, believe, belong, want, understand, prefer: they describe a state, not an action) usually avoid the continuous: <em>I have known her for years</em>, not <s>I have been knowing</s>.</li>
    <li><em>Since</em> + point in time, <em>for</em> + duration.</li>
    <li>After <em>by the time</em>, <em>when</em>, <em>as soon as</em> use a present tense for the future: <em>By the time you arrive, I will have left.</em></li></ul>`,
  exam: `<p>Multiple-choice cloze and open cloze test auxiliary choice all the time (<em>had, been, have, will</em>). Writing rewards precise tenses: careful use of perfect forms marks a C1 text.</p>`,
  quiz: [
    { type: 'mcq', q: 'By this time next year, I ___ my degree.', options: ['will complete', 'will have completed', 'am completing', 'will be complete'], answer: 1, why: '"By" a future point = future perfect: the action is finished before then.' },
    { type: 'mcq', q: 'She\'s exhausted because she ___ all day.', options: ['works', 'had worked', 'has been working', 'is working'], answer: 2, why: 'An activity in progress up to now with a visible effect: present perfect continuous.' },
    { type: 'mcq', q: 'This time tomorrow we ___ on a beach.', options: ['will lie', 'will be lying', 'will have lain', 'are lain'], answer: 1, why: 'In progress at a specific future moment: future continuous.' },
    { type: 'mcq', q: 'I ___ him for years, but I still don\'t understand him.', options: ['am knowing', 'have been knowing', 'have known', 'know'], answer: 2, why: '<em>Know</em> is a state verb, so no continuous. <em>For years</em> up to now needs the present perfect.' },
    { type: 'gap', q: 'By the time we got there, the film ___ already started.', answers: ['had'], why: 'The film started before the moment we arrived: past perfect.' },
    { type: 'kwt', first: 'I began learning Spanish three years ago and I still do.', key: 'been', second: 'I ___ Spanish for three years.', answers: ['have been learning', 'have been studying'], why: 'An activity that started in the past and continues now: present perfect continuous.' }
  ]
}
];
