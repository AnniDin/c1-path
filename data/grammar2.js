window.C1 = window.C1 || {}; C1.grammar = C1.grammar || []; C1.grammar.push(
{
  id: 'relatives', category: 'Sentence structure', title: 'Relative clauses: defining, non-defining and reduced', level: 'B2–C1', tagline: 'A relative clause answers the question "which one?" or adds a bonus fact.',
  idea: `<p>A relative clause is a small sentence hooked onto a noun. It does one of two jobs, and the whole grammar follows from which one it is:</p>
  <ul><li><strong>Defining</strong>: it tells you <em>which</em> person or thing. Remove it and the sentence loses its meaning (<em>The students who cheated were expelled</em> = only some students).</li>
  <li><strong>Non-defining</strong>: it adds an extra comment about something that is already identified. Remove it and the sentence still works (<em>My brother, who lives in Leeds, is a chef</em>).</li></ul>
  <p>Because a non-defining clause is only a side comment, it is fenced off with commas (or pauses in speech) and it cannot use <em>that</em>. A defining clause is part of the noun phrase, so there are no commas.</p>`,
  parts: [
    { h: 'Choosing the pronoun', body: `<div class="tablewrap"><table><tr><th>Refers to</th><th>Subject</th><th>Object</th><th>Possession</th></tr>
      <tr><td>People</td><td>who / that</td><td>who / whom / that / (nothing)</td><td>whose</td></tr>
      <tr><td>Things</td><td>which / that</td><td>which / that / (nothing)</td><td>whose / of which</td></tr>
      <tr><td>Time, place, reason</td><td colspan="3">when / where / why (or that / nothing)</td></tr></table></div>
      <div class="eg">The man <em>who</em> called was your uncle. <span class="muted">(subject: pronoun is compulsory)</span></div>
      <div class="eg">The man (<em>whom</em>) I called was your uncle. <span class="muted">(object: the pronoun can disappear in a defining clause)</span></div>
      <div class="eg">The novelist <em>whose</em> books I collect has died. <span class="muted">(whose = possession, for people and things)</span></div>` },
    { h: 'Non-defining clauses and "sentence relatives"', body: `<p>Commas, and no <em>that</em>; the pronoun can never be dropped.</p>
      <div class="eg">Marta, <em>who</em> I met at university, now runs a gallery.</div>
      <div class="eg">The report, <em>which</em> was published on Monday, has been widely criticised.</div>
      <p><em>Which</em> can also refer to a <strong>whole clause</strong>: <em>He passed the exam at the first attempt, which surprised everyone.</em> Here <em>which</em> = "the fact that he passed". Also useful with prepositions in formal writing: <em>the person to <strong>whom</strong> the letter was addressed</em>, <em>many of <strong>whom</strong></em>, <em>none of <strong>which</strong></em>.</p>` },
    { h: 'Reduced relative clauses', body: `<p>If the pronoun would be the <em>subject</em> of the clause, you can delete it together with a form of <em>be</em>. What is left is a participle or a phrase.</p>
      <div class="eg">The people <em>invited</em> to the launch were mostly journalists. <span class="muted">(who were invited: passive → -ed)</span></div>
      <div class="eg">Anyone <em>wishing</em> to apply should email us. <span class="muted">(who wishes: active → -ing)</span></div>
      <div class="eg">The only candidate <em>to have refused</em> the offer was Ms Ortiz. <span class="muted">(after first, last, only, superlatives: infinitive)</span></div>
      <p>The logic is the same as for participle clauses: the deleted subject must be recoverable from the noun just before it.</p>` },
    { h: 'Where, when and prepositions', body: `<p>A pronoun needs a job inside its own clause. <em>The house <strong>where</strong> we grew up</em> works because <em>where</em> = <em>in which</em>. Without a place word, the preposition must stay: <em>The house <strong>which</strong> we grew up in</em> or (formal) <em>the house in <strong>which</strong> we grew up</em>. Never both: <s>the house where we grew up in</s>.</p>` }
  ],
  traps: `<ul><li><s>My sister, that lives in Oslo…</s> → <em>who</em>. Non-defining clauses never take <em>that</em>.</li>
    <li>Don't repeat the object: <s>The film which I saw <strong>it</strong> yesterday</s> → <em>The film which I saw yesterday</em>. The pronoun already stands for it.</li>
    <li>You cannot drop a subject pronoun: <s>The woman lives next door is a doctor</s> → <em>The woman <strong>who</strong> lives next door…</em> (unless you reduce it: <em>The woman living next door…</em>).</li>
    <li><em>What</em> is not a relative pronoun for a noun: <s>everything what he said</s> → <em>everything (that) he said</em>. Use <em>what</em> only when it means "the thing(s) that": <em>What he said was true.</em></li>
    <li>Spanish speakers often forget <em>whose</em> and write <s>the man that his car…</s> → <em>the man whose car…</em></li></ul>`,
  exam: `<p>Very common in Use of English transformations (<em>WHOSE, WHICH, WHO, WHERE</em>, and reduced forms such as <em>-ING</em>) and in open cloze (<em>whom, which, whose, where</em> after a preposition). In Writing, non-defining clauses and sentence relatives (<em>…, which suggests that…</em>) are an economical way to add evaluation.</p>`,
  quiz: [
    { type: 'mcq', q: "My sister, ___ lives in Oslo, is visiting us next week.", options: ['that', 'who', 'whom', 'which'], answer: 1, why: "The clause is non-defining (commas, extra information), so <em>that</em> is impossible. The clause needs a subject for <em>lives</em>, and the antecedent is a person: <em>who</em>. <em>Whom</em> is an object form." },
    { type: 'mcq', q: "The house ___ we grew up was demolished last year.", options: ['which', 'that', 'in that', 'where'], answer: 3, why: "<em>Where</em> = <em>in which</em>, so no preposition is needed. <em>Which</em> or <em>that</em> would need <em>in</em> at the end (<em>which we grew up in</em>), and <em>in that</em> is not a possible relative form." },
    { type: 'mcq', q: "The candidates ___ applications arrived late were not considered.", options: ['who', 'whose', 'which', 'whom'], answer: 1, why: "The applications <em>belong to</em> the candidates: possession is expressed by <em>whose</em>." },
    { type: 'gap', q: "He failed his driving test for the third time, ___ surprised no one.", answers: ['which'], why: "The relative pronoun refers to the whole previous clause (the fact that he failed), so it is <em>which</em>, preceded by a comma." },
    { type: 'kwt', first: "I met a novelist. Her books have been translated into forty languages.", key: 'whose', second: "I met a novelist ___ into forty languages.", answers: ['whose books have been translated', 'whose books were translated'], why: "<em>Whose</em> joins the two sentences by replacing <em>her</em> (possession): <em>whose books have been translated</em>." },
    { type: 'kwt', first: "Anyone who wishes to apply must submit a form by Friday.", key: 'wishing', second: "Anyone ___ apply must submit a form by Friday.", answers: ['wishing to'], why: "The subject relative pronoun + a present tense verb can be reduced to an <em>-ing</em> participle: <em>who wishes to</em> becomes <em>wishing to</em>." }
  ]
},
{
  id: 'reporting', category: 'Reporting and voice', title: 'Reported speech and reporting verbs', level: 'B2–C1', tagline: 'Report the meaning, not the words: the verb you choose does the interpreting.',
  idea: `<p>When we report someone's words, we are not recording, we are <strong>summarising from a different place and time</strong>. That is why pronouns, time words and tenses shift: they must make sense for the person hearing the report <em>now</em>.</p>
  <p>At C1 the real skill is the reporting verb. <em>She said she would help</em> is flat; <em>She promised to help</em> tells the reader what kind of speech act it was (a promise). One good verb replaces several words.</p>`,
  parts: [
    { h: 'Backshift: why tenses move back', body: `<p>A tense "moves back" because the words now belong to the past: they were said earlier. If the situation is still true or the report is immediate, backshift is optional.</p>
      <div class="tablewrap"><table><tr><th>Direct</th><th>Reported</th></tr>
      <tr><td>“I <em>work</em> here.”</td><td>She said she <em>worked</em> there.</td></tr>
      <tr><td>“I <em>have finished</em>.”</td><td>She said she <em>had finished</em>.</td></tr>
      <tr><td>“I <em>will</em> call.”</td><td>She said she <em>would</em> call.</td></tr>
      <tr><td>“I <em>can</em> swim.”</td><td>She said she <em>could</em> swim.</td></tr>
      <tr><td>“I <em>was</em> ill.”</td><td>She said she <em>had been</em> ill. <span class="muted">(or stays <em>was</em>)</span></td></tr>
      <tr><td>“<em>Here / now / tomorrow / this</em>”</td><td><em>there / then / the next day / that</em></td></tr></table></div>
      <p><em>Might, should, could, would, must</em> often stay unchanged.</p>` },
    { h: 'Reporting verbs and their patterns', body: `<p>Each verb has its own grammar. Learn them in families:</p>
      <div class="tablewrap"><table><tr><th>Pattern</th><th>Verbs</th><th>Example</th></tr>
      <tr><td>verb + <em>to</em> + infinitive</td><td>promise, offer, refuse, threaten, agree, claim</td><td><em>He refused to sign.</em></td></tr>
      <tr><td>verb + object + <em>to</em> + infinitive</td><td>advise, warn, urge, invite, remind, tell, ask, persuade</td><td><em>She warned us not to go.</em></td></tr>
      <tr><td>verb + <em>-ing</em></td><td>admit, deny, suggest, recommend, propose</td><td><em>He denied taking the money.</em></td></tr>
      <tr><td>verb + object + preposition + <em>-ing</em></td><td>accuse … of, blame … for, congratulate … on, apologise (to …) for, insist on</td><td><em>They accused her of lying.</em></td></tr>
      <tr><td>verb + <em>that</em> clause</td><td>explain, point out, claim, insist, announce, complain</td><td><em>He pointed out that we were late.</em></td></tr></table></div>` },
    { h: 'Questions, commands and other structures', body: `<p><strong>Questions</strong> lose question order (the reported clause is a statement): <em>“Where do you live?”</em> → <em>She asked me where I lived.</em> Yes/no questions use <em>if / whether</em>.</p>
      <p><strong>Commands</strong> use an infinitive: <em>“Don't touch anything!”</em> → <em>He told us not to touch anything.</em></p>
      <p><strong>Suggest</strong> is special: it never takes <em>to</em> + infinitive. <em>She suggested going / that we go / that we should go.</em></p>` }
  ],
  traps: `<ul><li><s>She suggested me to leave</s> → <em>She suggested (that) I leave</em> / <em>suggested my leaving</em>. <em>Suggest</em> can't have <em>object + to</em>.</li>
    <li><s>He said me that…</s> → <em>He told me that…</em> / <em>He said (to me) that…</em>. <em>Tell</em> needs a person; <em>say</em> does not.</li>
    <li><s>She asked me where did I live</s> → <em>where I lived</em>. Reported questions keep statement order.</li>
    <li><em>Deny</em>, <em>admit</em>, <em>suggest</em> + <em>-ing</em> (or a clause), not the infinitive: <s>He denied to take it</s>.</li>
    <li>Don't automatically backshift a fact that is still true: <em>She told me the Earth goes round the Sun.</em></li></ul>`,
  exam: `<p>Transformations are full of reporting verbs (<em>DENIED, ACCUSED, INSISTED, ADMITTED, SUGGESTED, PROMISED, WARNED</em>), and each one tests its pattern. In Writing (reports, reviews) accurate reporting verbs (<em>claim, point out, argue, acknowledge</em>) make your summarising sound precise and academic.</p>`,
  quiz: [
    { type: 'mcq', q: "The manager suggested ___ the meeting until Monday.", options: ['to postpone', 'postponing', 'us to postpone', 'him postpone'], answer: 1, why: "<em>Suggest</em> is followed by <em>-ing</em> (or a <em>that</em>-clause). It never takes <em>to</em> + infinitive, with or without an object." },
    { type: 'mcq', q: "He accused her ___ the confidential documents to the press.", options: ['to leak', 'for leaking', 'of leaking', 'that she leaked'], answer: 2, why: "<em>Accuse somebody of</em> + <em>-ing</em>. The preposition is fixed; <em>blame somebody for</em> is the pattern with <em>for</em>." },
    { type: 'mcq', q: "She ___ to have seen the accident, but it later turned out she was abroad at the time.", options: ['claimed', 'suggested', 'denied', 'warned'], answer: 0, why: "<em>Claim</em> takes a (perfect) infinitive: <em>claimed to have seen</em>. <em>Deny</em> takes <em>-ing</em>, <em>suggest</em> can't take an infinitive and <em>warn</em> needs an object." },
    { type: 'gap', q: "The police warned the public ___ to approach the man.", answers: ['not'], why: "A negative command is reported with <em>not to</em> + infinitive: <em>warned the public not to approach</em>." },
    { type: 'kwt', first: "“Don't touch anything,” the officer told us.", key: 'not', second: "The officer told us ___ anything.", answers: ['not to touch'], why: "An order is reported with <em>tell + object + (not) to + infinitive</em>; the negative goes before <em>to</em>." },
    { type: 'kwt', first: "“I didn't take the money,” said Tom.", key: 'denied', second: "Tom ___ the money.", answers: ['denied taking', 'denied having taken', 'denied he took', 'denied he had taken', 'denied that he had taken'], why: "<em>Deny</em> is followed by <em>-ing</em> (<em>denied taking / having taken</em>) or by a clause (<em>denied that he had taken</em>). It carries the negative meaning itself, so no <em>not</em> is needed." }
  ]
},
{
  id: 'patterns', category: 'Words and patterns', title: 'Verb patterns: -ing or infinitive?', level: 'B2–C1', tagline: 'The pattern is not random: the -ing form looks at the action, the infinitive looks forward.',
  idea: `<p>Many verbs can be followed by <em>-ing</em> or <em>to</em> + infinitive, and choosing wrongly is one of the commonest errors at B2. There is a core logic to lean on:</p>
  <ul><li><strong>-ing</strong> treats the action as a <em>real, existing thing</em>: something already happening, past, general or imagined as a fact (<em>enjoy swimming</em>, <em>remember locking</em>).</li>
  <li><strong>to + infinitive</strong> points <em>forward</em>: a purpose, a plan, an intention, something not yet done (<em>decide to leave</em>, <em>remember to lock</em>).</li></ul>
  <p>That is why verbs like <em>hope, plan, decide, refuse, manage</em> take the infinitive (the action lies in the future), while <em>enjoy, avoid, finish, mind, deny</em> take <em>-ing</em> (the action is real or already imagined).</p>`,
  parts: [
    { h: 'Verbs that change meaning', body: `<div class="tablewrap"><table><tr><th>Verb</th><th>+ -ing</th><th>+ to infinitive</th></tr>
      <tr><td>remember</td><td>recall a past event: <em>I remember locking the door.</em></td><td>not forget to do: <em>Remember to lock the door.</em></td></tr>
      <tr><td>forget</td><td><em>I'll never forget meeting her.</em></td><td><em>Don't forget to phone.</em></td></tr>
      <tr><td>regret</td><td>be sorry about the past: <em>I regret leaving.</em></td><td>formal news: <em>We regret to inform you…</em></td></tr>
      <tr><td>stop</td><td>cease: <em>He stopped smoking.</em></td><td>stop in order to: <em>He stopped to smoke.</em></td></tr>
      <tr><td>try</td><td>experiment: <em>Try adding salt.</em></td><td>make an effort: <em>I tried to lift it.</em></td></tr>
      <tr><td>go on</td><td>continue the same thing: <em>She went on talking.</em></td><td>move to the next thing: <em>She went on to become a judge.</em></td></tr>
      <tr><td>mean</td><td>involve: <em>The job means travelling.</em></td><td>intend: <em>I meant to call.</em></td></tr></table></div>
      <p>In each pair, -ing = the action seen as a fact; infinitive = the action seen as a goal or a task.</p>` },
    { h: 'Little differences and fixed groups', body: `<p><strong>Little change in meaning:</strong> <em>begin, start, continue, like, love, hate, prefer</em>. (<em>I like <strong>to</strong> go</em> = a habit or choice; <em>I like going</em> = the enjoyment. <em>I'd like to go</em> always takes the infinitive.)</p>
      <p><strong>Prepositions take -ing</strong>, even when the preposition is <em>to</em>: <em>look forward to <strong>seeing</strong></em>, <em>be used to <strong>working</strong></em>, <em>in favour of <strong>banning</strong></em>, <em>object to <strong>paying</strong></em>. Test: can you put a noun there? <em>I'm used to <strong>the noise</strong></em>. If yes, it's -ing.</p>
      <p><strong>Perception and permission:</strong> <em>let / make</em> + object + bare infinitive (<em>They made us wait</em>), but passive <em>we were made <strong>to</strong> wait</em>. <em>See / hear</em> + object + bare infinitive (whole action) or -ing (in progress): <em>I saw him cross</em> / <em>I saw him crossing</em>.</p>` },
    { h: 'Structures with -ing/infinitive in phrases', body: `<div class="eg">It's no use / no good / (not) worth <em>+ -ing</em>: <em>It's not worth waiting.</em></div>
      <div class="eg">There's no point (in) <em>+ -ing</em>: <em>There's no point (in) arguing.</em></div>
      <div class="eg">can't help / can't stand / feel like <em>+ -ing</em>: <em>I couldn't help laughing.</em></div>
      <div class="eg">be able / be likely / be about / be due <em>+ to-infinitive</em>: <em>The train is due to arrive.</em></div>` }
  ],
  traps: `<ul><li><em>Look forward to</em> and <em>be used to</em> use the <em>preposition</em> <em>to</em>: <s>I look forward to see you</s> → <em>seeing</em>.</li>
    <li><em>Used to do</em> (past habit) ≠ <em>be used to doing</em> (familiar with).</li>
    <li><s>I enjoy to swim</s>, <s>She suggested to go</s>, <s>He avoided to answer</s>: these verbs need <em>-ing</em>.</li>
    <li><s>I decided going</s>, <s>We hope seeing you</s>: these need the infinitive.</li>
    <li><em>Make</em> + object takes the bare infinitive in the active, but <em>to</em> in the passive.</li></ul>`,
  exam: `<p>Open cloze and multiple-choice cloze love these patterns (a gap before <em>-ing</em> or <em>to</em>). Transformations use <em>POINT, WORTH, USE, FORWARD, REGRET, USED, STOP, TRY</em>. In Speaking, correct patterns after <em>look forward to</em> and <em>be used to</em> quickly show accuracy.</p>`,
  quiz: [
    { type: 'mcq', q: "I remember ___ the door, so it can't have been my fault that the burglars got in.", options: ['locking', 'to lock', 'lock', 'to locking'], answer: 0, why: "The locking is a memory of a past event: <em>remember + -ing</em>. <em>Remember to lock</em> would mean not forgetting a task." },
    { type: 'mcq', q: "Don't forget ___ some milk when you go out.", options: ['buying', 'to buy', 'buy', 'bought'], answer: 1, why: "<em>Forget to do</em> refers to a task still ahead. <em>Forget doing</em> would refer to an event that already happened." },
    { type: 'mcq', q: "He isn't used ___ in an open-plan office.", options: ['to work', 'working', 'to be working', 'worked'], answer: 1, why: "<em>Be used to</em> contains the <em>preposition</em> <em>to</em>, so it is followed by <em>-ing</em> (or a noun). <em>Used to work</em> is a different structure and cannot follow <em>isn't</em>." },
    { type: 'gap', q: "We regret ___ (tell) you that your application has been unsuccessful.", answers: ['to tell'], why: "In formal announcements, <em>regret to</em> + infinitive describes the action being done right now (giving bad news). <em>Regret telling</em> would mean feeling sorry about having told someone." },
    { type: 'kwt', first: "It's pointless to complain to the manager.", key: 'point', second: "There ___ to the manager.", answers: ['is no point complaining', 'is no point in complaining'], why: "<em>There's no point (in)</em> is followed by <em>-ing</em>, because <em>in</em> is a preposition and the -ing form names the action itself." },
    { type: 'kwt', first: "Perhaps you could switch the router off and on again.", key: 'try', second: "___ the router off and on again.", answers: ['Try switching', 'Try turning', 'Why not try switching', 'Why not try turning', 'You could try switching', 'You could try turning'], why: "<em>Try + -ing</em> means to experiment with a possible solution. <em>Try to switch</em> would mean to make an effort to do something difficult." }
  ]
},
{
  id: 'determiners', category: 'Words and patterns', title: 'Articles, determiners and quantifiers', level: 'B2–C1', tagline: 'Articles are not decoration: they tell the listener whether they already know the noun.',
  idea: `<p>A determiner (<em>a, the, some, this, my, much</em>…) answers two questions before the noun even arrives: <strong>Do you know which one I mean?</strong> and <strong>How many/much?</strong></p>
  <ul><li><em>a/an</em> = one of a kind, <em>new</em> to the listener. <em>the</em> = <em>this specific one</em>, already known or unique. No article = general (plural or uncountable) or an abstract idea.</li>
  <li>Quantifiers are chosen by what kind of noun follows: <strong>countable</strong> (<em>many, few, several</em>) or <strong>uncountable</strong> (<em>much, little, a great deal of</em>).</li></ul>
  <p>Spanish uses articles very differently (<em>la vida es dura</em>, <em>me duele la cabeza</em>), which is why explicit rules of thumb matter.</p>`,
  parts: [
    { h: 'a / the / no article', body: `<div class="tablewrap"><table><tr><th>Use</th><th>Example</th></tr>
      <tr><td><em>a/an</em>: first mention, classifying, "one"</td><td><em>I saw a man. He is an architect.</em></td></tr>
      <tr><td><em>the</em>: second mention, only one, defined by context</td><td><em>The man was carrying the keys. / the sun, the government</em></td></tr>
      <tr><td>no article: general plural / uncountable / abstract</td><td><em>Life is hard. Children need love.</em></td></tr>
      <tr><td><em>the</em> + adjective = a group; superlatives; <em>the</em> + rivers, ranges, some countries</td><td><em>the elderly; the best; the Alps; the Netherlands</em></td></tr>
      <tr><td>no article: institutions in their main purpose</td><td><em>in hospital, at university, go to work</em></td></tr></table></div>
      <p>Compare <em>She is at university</em> (she is a student) with <em>She works at the university</em> (a specific building).</p>` },
    { h: 'Quantifiers: countable vs uncountable', body: `<div class="tablewrap"><table><tr><th></th><th>Countable</th><th>Uncountable</th></tr>
      <tr><td>large</td><td>many, a large number of, plenty of</td><td>much, a great deal of, plenty of</td></tr>
      <tr><td>small (positive)</td><td>a few, several</td><td>a little</td></tr>
      <tr><td>small (negative)</td><td>few, hardly any</td><td>little, hardly any</td></tr>
      <tr><td>none / not any</td><td colspan="2">no, none of, neither (two), either (two)</td></tr></table></div>
      <p><strong>A few / a little</strong> = some, enough to be useful. <strong>Few / little</strong> = almost none, a problem. <em>I have a few friends here</em> (fine) vs <em>I have few friends here</em> (lonely).</p>
      <p>Informal: <em>a lot of</em> is normal in affirmatives; <em>much</em> and <em>many</em> are mainly used in questions and negatives (<em>Is there much time?</em>).</p>` },
    { h: 'Some / any, each / every, both / either / neither', body: `<p><em>Some</em> = an unspecified quantity (positive sentences and offers: <em>Would you like some tea?</em>); <em>any</em> = one or more, whichever (questions, negatives, <em>if</em>-clauses; and <em>Any child can do it</em> = every, it doesn't matter which).</p>
      <p><em>Each</em> = individually, of two or more; <em>every</em> = all, seen as a group, of three or more. Both take a singular verb: <em>Every student has a locker.</em></p>
      <p>Two things: <em>both, either, neither</em>. More than two: <em>all, any, none</em>. <em>Neither of them <strong>was / were</strong> late</em>: singular is more formal.</p>` }
  ],
  traps: `<ul><li>Uncountable nouns: <em>advice, information, news, research, furniture, luggage, progress, work, evidence, equipment</em>. No <em>a</em>, no plural: <s>an advice</s>, <s>informations</s> → <em>a piece of advice</em>.</li>
    <li><s>The life is hard</s> / <s>The people need love</s> for general ideas: no article. <em>The</em> only comes when you specify (<em>the life of a sailor</em>).</li>
    <li><em>An</em> depends on the <em>sound</em>, not the letter: <em>an hour, an honour, a university, a European, a one-off</em>.</li>
    <li><s>Many informations</s>, <s>a lot of informations</s> → <em>a lot of information</em>.</li>
    <li><em>None of the four shops had it</em> (not <s>neither</s>, which is only for two).</li></ul>`,
  exam: `<p>Open cloze usually includes at least one article, quantifier or determiner (<em>the, an, few, little, any, each, such, both</em>), and multiple-choice cloze tests <em>few/little/any/no</em> nuances. Transformations use <em>ENOUGH, HARDLY, NONE, NEITHER, ANY, EVERY</em>. Article errors in Writing are the most persistent mistake in Spanish-speaking candidates, so proofread for them.</p>`,
  quiz: [
    { type: 'mcq', q: "There is very ___ hope of finding any more survivors.", options: ['few', 'a few', 'little', 'a little'], answer: 2, why: "<em>Hope</em> is uncountable, so <em>few</em> and <em>a few</em> are excluded. After <em>very</em>, only <em>little</em> works (<em>very little</em>): <em>very a little</em> is not possible." },
    { type: 'mcq', q: "I'd like ___ advice about my essay, if you have a moment.", options: ['an', 'some', 'a few', 'many'], answer: 1, why: "<em>Advice</em> is uncountable, so no <em>an</em>, <em>a few</em> or <em>many</em>. <em>Some</em> is used in requests and offers." },
    { type: 'mcq', q: "I tried four different shops, but ___ of them stocked the book.", options: ['neither', 'none', 'no', 'nothing'], answer: 1, why: "<em>None of</em> is for three or more (<em>neither of</em> is for exactly two). <em>No</em> cannot be followed by <em>of them</em>, and <em>nothing</em> is not a determiner." },
    { type: 'gap', q: "It was ___ honour to meet her.", answers: ['an'], why: "The choice between <em>a</em> and <em>an</em> depends on the sound: <em>honour</em> begins with a vowel sound (the <em>h</em> is silent), so <em>an</em>." },
    { type: 'kwt', first: "Very few people attended the lecture.", key: 'hardly', second: "There were ___ at the lecture.", answers: ['hardly any people', 'hardly any students'], why: "<em>Hardly any</em> means almost none and is followed by a plural countable noun here: <em>hardly any people</em>." },
    { type: 'kwt', first: "There are too few chairs for everyone.", key: 'enough', second: "There ___ chairs for everyone.", answers: ["aren't enough", 'are not enough'], why: "<em>Too few</em> = not enough. <em>Enough</em> goes before the noun, and the plural noun requires <em>are</em>." }
  ]
},
{
  id: 'comparison', category: 'Words and patterns', title: "Comparison: comparatives, correlatives and 'as ... as'", level: 'B2–C1', tagline: 'Compare things, degrees and trends, and say exactly how big the difference is.',
  idea: `<p>Comparison is about <strong>measuring distance</strong> on a scale. The core grammar is simple: <em>-er/more … than</em> for a difference, <em>as … as</em> for equality, <em>the -est/most</em> for the extreme of a group.</p>
  <p>The C1 skill is the <strong>size of the difference</strong>. You can say how large it is (<em>far, slightly, twice as</em>) or link two changing things together (<em>the more … the more …</em>). Those "modifiers" and "correlatives" turn a basic comparison into a precise statement.</p>`,
  parts: [
    { h: 'Modifying the comparison', body: `<div class="tablewrap"><table><tr><th>Size of difference</th><th>Modifiers</th></tr>
      <tr><td>big</td><td><em>far / much / a great deal / considerably / significantly</em> + comparative<br><span class="muted">far more expensive, much easier, a great deal better</span></td></tr>
      <tr><td>small</td><td><em>slightly / a little / a bit / marginally</em> + comparative<br><span class="muted">slightly warmer, a bit cheaper</span></td></tr>
      <tr><td>multiples with as … as</td><td><em>twice / three times / half / nearly / just / not quite / nowhere near</em> + as … as<br><span class="muted">twice as expensive as, not nearly as fast as</span></td></tr>
      <tr><td>never with a comparative</td><td><s>very</s>: <s>very better</s> → <em>much/far better</em></td></tr></table></div>` },
    { h: 'Correlatives: the … the …', body: `<p>Two comparatives, each preceded by <em>the</em>, show that one change goes hand in hand with another. The logic is proportion: A grows, so B grows.</p>
      <div class="eg"><em>The more</em> you practise, <em>the better</em> you become.</div>
      <div class="eg"><em>The sooner</em> we leave, <em>the earlier</em> we'll arrive.</div>
      <div class="eg"><em>The less</em> she said, <em>the more</em> suspicious they became.</div>
      <p>Progressive change (no second part): <em>It's getting warmer and warmer. She grew more and more nervous.</em></p>` },
    { h: 'As … as, than and the rest', body: `<div class="eg">She is <em>not as</em> experienced <em>as</em> her rival. = Her rival is <em>more</em> experienced <em>than</em> she is.</div>
      <div class="eg">The film was <em>nothing like as</em> good as the book.</div>
      <div class="eg"><em>The same</em> as / <em>different from</em> (also <em>to</em>) / <em>similar to</em>: <em>Her accent is similar to mine.</em></div>
      <div class="eg"><em>Like</em> + noun (<em>He looks like his dad</em>) vs <em>as</em> + clause or role (<em>as I said, he works as a guide</em>).</div>
      <p>Superlatives: <em>the</em> + <em>-est/most</em>, and <em>by far / easily / one of the</em> reinforce it: <em>She is by far the best player in the squad.</em></p>` }
  ],
  traps: `<ul><li>Use <em>than</em> after a comparative and <em>as</em> after <em>as</em>: <s>more bigger as</s>, <s>as big than</s>.</li>
    <li>Double comparative: <s>more easier</s> → <em>easier</em>. Two-syllable adjectives ending in <em>-y</em> take <em>-er</em>: <em>happier</em>, <em>easier</em>.</li>
    <li><s>The more you practise, the more better you become</s> → <em>the better</em>. The adjective already carries the comparative.</li>
    <li><em>Very</em> cannot modify a comparative (<s>very cheaper</s>); use <em>much</em> or <em>far</em>.</li>
    <li>In the correlative pattern, do not use <em>more and more</em> unless there is no second clause.</li></ul>`,
  exam: `<p>Transformations regularly test <em>AS … AS, THAN, NOT NEARLY, TWICE, THE + comparative, NO … THAN</em>. In Writing (reports, proposals, essays), "the more … the more…" and modifiers like <em>considerably / marginally</em> are good markers of a C1 register when describing trends.</p>`,
  quiz: [
    { type: 'mcq', q: "The ___ you practise, the more confident you become.", options: ['more', 'most', 'much', 'many'], answer: 0, why: "The correlative structure needs two comparatives: <em>the more … the more</em>. <em>Most</em> is a superlative, and <em>much/many</em> are not comparative forms." },
    { type: 'mcq', q: "This exam was ___ harder than I had expected.", options: ['very', 'far', 'so', 'too'], answer: 1, why: "A comparative needs a comparative modifier such as <em>far / much / a lot</em>. <em>Very, so, too</em> cannot modify a comparative." },
    { type: 'mcq', q: "The new model is twice ___ expensive as the old one.", options: ['as', 'so', 'more', 'than'], answer: 0, why: "Multiples use the <em>as … as</em> structure (<em>twice as expensive as</em>). <em>More</em> and <em>than</em> belong to the comparative structure and cannot follow <em>twice</em> here." },
    { type: 'gap', q: "The sooner we leave, the ___ we'll arrive.", answers: ['sooner', 'earlier'], why: "The correlative structure needs a second comparative, in the same pattern as the first: <em>the sooner … the sooner/earlier</em>." },
    { type: 'kwt', first: "Our rivals aren't as well prepared as we are.", key: 'better', second: "We are ___ our rivals.", answers: ['better prepared than'], why: "<em>Not as … as</em> can be rewritten with the opposite comparative: <em>we are better prepared than they are</em>." },
    { type: 'kwt', first: "As she grew older, she became more cautious.", key: 'the', second: "The older she grew, ___ she became.", answers: ['the more cautious'], why: "The correlative structure has two parts, each starting with <em>the</em> + comparative: <em>the older she grew, the more cautious she became</em>." }
  ]
},
{
  id: 'future', category: 'Verbs and time', title: 'Talking about the future', level: 'B2–C1', tagline: 'There is no future tense in English: you choose a form to show how you see the future.',
  idea: `<p>English has no single future tense. Instead, you pick a form that reveals <strong>your attitude</strong> to the future event: is it a plan, a prediction, an arrangement, a timetable, a decision made just now?</p>
  <p>The speaker's viewpoint decides the form. Same event, different meaning: <em>I'll see the doctor</em> (I've just decided), <em>I'm going to see the doctor</em> (my plan), <em>I'm seeing the doctor at four</em> (it is fixed).</p>`,
  parts: [
    { h: 'The main forms and what they signal', body: `<div class="tablewrap"><table><tr><th>Form</th><th>Signals</th><th>Example</th></tr>
      <tr><td>will + infinitive</td><td>instant decision, promise, prediction from opinion</td><td><em>Leave it. I'll do it.</em> / <em>I think it'll rain.</em></td></tr>
      <tr><td>be going to</td><td>plan already made; prediction from present evidence</td><td><em>I'm going to sell the car.</em> / <em>Look at those clouds! It's going to rain.</em></td></tr>
      <tr><td>present continuous</td><td>personal arrangement, with time and often people</td><td><em>We're meeting at eight.</em></td></tr>
      <tr><td>present simple</td><td>timetables, schedules, fixed events</td><td><em>The train leaves at 6.15.</em></td></tr>
      <tr><td>future continuous (will be -ing)</td><td>in progress at a future moment; polite enquiry</td><td><em>This time tomorrow I'll be flying to Rome.</em></td></tr>
      <tr><td>future perfect (will have + participle)</td><td>completed before a future point</td><td><em>By 2030 she will have retired.</em></td></tr>
      <tr><td>be to / be about to / be due to</td><td>official plans, immediate future, expected time</td><td><em>The Prime Minister is to address the nation.</em> / <em>The play is about to start.</em></td></tr></table></div>` },
    { h: 'Time clauses and the future', body: `<p>After <em>when, as soon as, until, before, after, by the time, once</em> and <em>if</em>, English uses a present tense for the future, because the time word already points forward. <em>I'll call you <strong>when I arrive</strong>.</em> Use the present perfect when the first action must be completed: <em>I'll call you as soon as I've finished.</em></p>` },
    { h: 'The future in the past', body: `<p>To describe what was <em>still to come</em> from a past viewpoint, shift each form back: <em>was going to</em> (an unfulfilled plan: <em>I was going to call, but I forgot</em>), <em>would</em> (<em>She knew she would win</em>), <em>was about to</em> (<em>I was about to leave when it rang</em>), <em>was to</em> (destiny: <em>He was never to see her again</em>).</p>` }
  ],
  traps: `<ul><li><s>I will call you when I will arrive</s> → <em>when I arrive</em>. No <em>will</em> after time words.</li>
    <li>Don't use <em>will</em> for a fixed arrangement: <em>What are you doing on Saturday?</em>, not <s>What will you do?</s> (which asks for a decision).</li>
    <li><em>Shall</em> is mainly used in the first person for offers and suggestions (<em>Shall I open the window?</em>).</li>
    <li><em>Going to</em> with <em>go</em> and <em>come</em> is often replaced: <em>I'm going to the cinema</em>, rather than <em>I'm going to go to the cinema</em>.</li>
    <li>Future perfect is for <em>completion</em>; for an ongoing action use <em>will be -ing</em> or <em>will have been -ing</em>.</li></ul>`,
  exam: `<p>Transformations test <em>ABOUT, DUE, GOING, EXPECTED, WILL BE, UNLESS/WHEN</em> with future meanings. In Listening, tenses show whether a plan is fixed. In Writing, <em>is expected to, is set to, is likely to</em> are useful for predictions about trends.</p>`,
  quiz: [
    { type: 'mcq', q: "“Sorry, I can't find a pen anywhere.” “Wait, I ___ you one from my bag.”", options: ['give', "'ll give", 'am giving', 'gave'], answer: 1, why: "A spontaneous decision made at the moment of speaking takes <em>will</em>. The present simple and the past do not express this." },
    { type: 'mcq', q: "By the time you read this note, I ___ on a plane to Sydney.", options: ['will sit', 'will have sat', 'will be sitting', 'am going to sit'], answer: 2, why: "The action will be in progress at a specific future moment: future continuous. The future perfect (<em>will have sat</em>) would mean it was already complete, which does not make sense for sitting on a plane." },
    { type: 'mcq', q: "The Prime Minister ___ address the nation this evening.", options: ['is to', 'is going', 'will to', 'is about'], answer: 0, why: "<em>Be to</em> + infinitive is used for official plans and announcements. <em>Is going</em> and <em>is about</em> need <em>to</em> after them, and <em>will to</em> is not possible." },
    { type: 'gap', q: "Hurry up! The film is about ___ start.", answers: ['to'], why: "<em>Be about to</em> + infinitive expresses the immediate future." },
    { type: 'kwt', first: "The play will start in a moment.", key: 'about', second: "The play ___ start.", answers: ['is about to', 'is just about to'], why: "<em>Be about to</em> expresses something that will happen very soon." },
    { type: 'kwt', first: "I plan to take the driving test next month.", key: 'going', second: "I ___ the driving test next month.", answers: ['am going to take', 'am going to do'], why: "<em>Be going to</em> expresses a plan that has already been made." }
  ]
},
{
  id: 'formal', category: 'Verbs and time', title: "Formal structures: subjunctive, 'it is essential that', 'suggest that he go'", level: 'C1', tagline: 'When the verb "goes bare", it is formal English talking about what should happen.',
  idea: `<p>The <strong>mandative subjunctive</strong> is used after words that express <em>demand, necessity or recommendation</em> (<em>insist, demand, recommend, suggest, essential, vital, important</em>). The verb takes its <strong>bare base form</strong> for every person: <em>It is essential that he <strong>be</strong> present</em>; <em>The board recommended that she <strong>resign</strong></em>.</p>
  <p>Why the bare form? The clause does not describe a fact; it describes something that <em>ought to be</em> the case. The base form carries no tense and no agreement, so it sounds neutral and official, and that is why it appears in regulations, contracts and formal writing. British English often prefers <em>should</em> (<em>that he should resign</em>); American English uses the bare form more.</p>`,
  parts: [
    { h: 'The pattern', body: `<div class="eg">It is <em>essential / vital / important / necessary / advisable / desirable</em> that every applicant <em>submit</em> the form.</div>
      <div class="eg">The doctor <em>recommended / advised / insisted / demanded / proposed / suggested</em> that she <em>rest</em> for a week.</div>
      <div class="eg">The court <em>ordered</em> that the company <em>pay</em> compensation.</div>
      <p>Negative: <em>not</em> before the verb, with no <em>do</em>: <em>It is vital that he <strong>not</strong> be told.</em> The <em>be</em> passive: <em>It is essential that the documents <strong>be</strong> checked.</em></p>
      <p>Alternatives with the same meaning: <em>should</em> + infinitive (<em>that he should resign</em>); or a plain noun/pronoun + <em>-ing</em> after some verbs (<em>suggested her resigning</em>); or the infinitive (<em>essential for everyone to be present</em>).</p>` },
    { h: 'Were-subjunctive and fixed expressions', body: `<p>The <strong>past subjunctive</strong> <em>were</em> is used for unreal situations: <em>If I <strong>were</strong> you…</em>, <em>I wish she <strong>were</strong> here</em>, <em>as if he <strong>were</strong> the boss</em>. In formal writing use it for all persons; in informal speech <em>was</em> is common.</p>
      <p>Inverted forms: <em><strong>Were</strong> the company to go bankrupt, hundreds would lose their jobs.</em> (= If the company were to go bankrupt…). <em><strong>Should</strong> you need help, call.</em> <em><strong>Had</strong> I known, I'd have come.</em></p>
      <p>Fossilised phrases: <em>Come what <strong>may</strong>; be that as it <strong>may</strong>; God save the King; long live democracy; far be it from me; suffice it to say; so be it</em>.</p>` },
    { h: 'Insist, suggest, demand: two meanings', body: `<p>Some verbs have <strong>two</strong> uses. Compare:</p>
      <div class="eg">She <em>insisted that he go</em> to hospital. <span class="muted">(she demanded it: subjunctive)</span></div>
      <div class="eg">She <em>insisted that he was</em> innocent. <span class="muted">(she claimed it was true: normal tense)</span></div>
      <div class="eg">He <em>suggested that we take</em> a taxi. <span class="muted">(proposal: subjunctive)</span> / He <em>suggested that the train was late</em>. <span class="muted">(an idea about facts: normal tense)</span></div>
      <p>Test: is it about what <em>should be done</em> (subjunctive) or about <em>what is true</em> (indicative)?</p>` }
  ],
  traps: `<ul><li><s>It is essential that he <strong>is</strong> present</s> is not standard formal English → <em>be</em> (or <em>should be</em>).</li>
    <li><s>I suggest that he <strong>goes</strong></s> → <em>go</em> (or <em>should go</em>). Keep to the subjunctive or <em>should</em> in exams.</li>
    <li>Do not use <em>to</em> + infinitive after <em>suggest</em> or <em>insist</em>: <s>I suggest him to go</s>.</li>
    <li>Negative: <em>that she not go</em> (no <em>don't/doesn't</em>): <s>that she doesn't go</s> is not the formal pattern.</li>
    <li>Do not mix the register: subjunctives are for formal writing and speech, not casual conversation.</li></ul>`,
  exam: `<p>Formal transformations (<em>INSISTED, ESSENTIAL, VITAL, RECOMMENDED, WERE, SHOULD, HAD</em>) target these structures, and in Writing (formal letters, proposals, reports) <em>It is essential that…</em> and <em>We recommend that the council <strong>provide</strong>…</em> give an immediate register boost.</p>`,
  quiz: [
    { type: 'mcq', q: "It is essential that every applicant ___ the form before Friday.", options: ['submits', 'submit', 'will submit', 'submitted'], answer: 1, why: "After <em>essential that</em>, the mandative subjunctive uses the bare form of the verb for all persons: <em>submit</em>." },
    { type: 'mcq', q: "The committee recommended that he ___ from his post.", options: ['resign', 'resigns', 'resigned', 'is resigning'], answer: 0, why: "<em>Recommend that</em> + subject + bare infinitive is the formal subjunctive. The other options are indicative tenses." },
    { type: 'mcq', q: "The doctor advised that she ___ heavy objects for at least six weeks.", options: ['lifts', 'not lift', "doesn't lift", 'not to lift'], answer: 1, why: "In a negative subjunctive, <em>not</em> goes before the bare verb, with no <em>do</em>: <em>that she not lift</em>." },
    { type: 'gap', q: "Whatever the difficulties, come what ___, we will stand by our decision.", answers: ['may'], why: "<em>Come what may</em> is a fossilised subjunctive expression meaning \"whatever happens\"." },
    { type: 'kwt', first: "It is vital for the documents to be checked twice.", key: 'that', second: "It is vital ___ twice.", answers: ['that the documents be checked', 'that the documents are checked'], why: "<em>Vital that</em> + subject + bare infinitive (subjunctive) expresses the same necessity: <em>be checked</em>." },
    { type: 'kwt', first: "If the company went bankrupt, hundreds would lose their jobs.", key: 'were', second: "___ bankrupt, hundreds would lose their jobs.", answers: ['Were the company to go', 'Were the company to become'], why: "An inverted conditional replaces <em>if</em> with <em>were</em> + subject + <em>to</em> + infinitive, a formal way of talking about hypothetical situations." }
  ]
},
{
  id: 'concession', category: 'Words and patterns', title: 'Contrast, concession and purpose linkers', level: 'B2–C1', tagline: 'Linkers are grammar too: each one has its own pattern.',
  idea: `<p>Linkers show how two ideas relate. The logic differs for each group: <strong>contrast</strong> says the two ideas oppose each other; <strong>concession</strong> admits something true but says the main point still stands (<em>Although it was risky, they went ahead</em>); <strong>purpose</strong> says <em>why</em> someone does something.</p>
  <p>The difficulty is that words with similar meanings need different grammar. <em>Although</em> takes a clause; <em>despite</em> takes a noun or <em>-ing</em>; <em>however</em> connects two separate sentences. Learn the <strong>pattern</strong>, not just the meaning.</p>`,
  parts: [
    { h: 'Contrast and concession: which pattern?', body: `<div class="tablewrap"><table><tr><th>Followed by</th><th>Linkers</th><th>Example</th></tr>
      <tr><td>clause</td><td>although, even though, though, while, whereas</td><td><em>Although it rained, we went out.</em></td></tr>
      <tr><td>noun / -ing / <em>the fact that</em></td><td>despite, in spite of</td><td><em>Despite the rain / raining / the fact that it rained…</em></td></tr>
      <tr><td>separate sentence (comma after)</td><td>however, nevertheless, nonetheless, even so, still, on the other hand</td><td><em>It rained. However, we went out.</em></td></tr>
      <tr><td>adjective/adverb + clause</td><td>however + adj, no matter how, whatever, whoever</td><td><em>However tired he was, he carried on.</em></td></tr>
      <tr><td>inverted adjective phrase</td><td>as, though (formal)</td><td><em>Tired as he was, he carried on.</em></td></tr></table></div>
      <p><em>While / whereas</em> also contrast two facts: <em>Some people love cities, whereas others prefer the countryside.</em></p>` },
    { h: 'Purpose', body: `<div class="eg"><em>to / in order to / so as to</em> + infinitive: <em>She left early <strong>so as not to</strong> miss the train.</em> (negative: <em>in order not to</em>, <em>so as not to</em>; not <s>not to</s> alone in formal writing)</div>
      <div class="eg"><em>so that / in order that</em> + clause (with <em>can/could/will/would</em>): <em>I spoke slowly <strong>so that</strong> everyone could understand.</em></div>
      <div class="eg"><em>in case</em> + present/past: precaution. <em>Take a map <strong>in case</strong> you get lost.</em> Not the same as <em>if</em>: <em>in case</em> means "because it might happen".</div>
      <div class="eg"><em>with a view to</em> / <em>with the aim of</em> + <em>-ing</em>: <em>She wrote to the council with a view to getting the decision reversed.</em></div>` },
    { h: 'Result and other useful linkers', body: `<p><em>so … that / such … that</em> (result): <em>It was so noisy that nobody slept.</em> <em>Such a noisy night that…</em>. Compare with purpose: <em>so that</em> (intention) vs <em>so … that</em> (result).</p>
      <p><em>Otherwise</em> (= if not): <em>Book now; otherwise you'll miss out.</em> <em>Unless</em> (= if not): <em>Unless you book, you'll miss out.</em></p>` }
  ],
  traps: `<ul><li><s>Despite of</s> → <em>despite</em> (no <em>of</em>) or <em>in spite of</em>.</li>
    <li><s>Although</s> and <s>but</s> together: <s>Although it was raining, but we went out</s> → use only one.</li>
    <li><s>Despite it was raining</s> → <em>Despite the rain / Despite the fact that it was raining</em>.</li>
    <li><em>However</em> is not a conjunction: <s>It rained, however we went out</s> → <em>It rained. However, we went out.</em> (or <em>It rained; however, we…</em>).</li>
    <li><em>In case</em> ≠ <em>if</em>: <em>Take an umbrella in case it rains</em> (precaution) vs <em>Take an umbrella if it rains</em> (only then).</li>
    <li><em>So as to</em>: <em>so as not to</em>, not <s>so as to not</s>.</li></ul>`,
  exam: `<p>Linkers appear in every part: open cloze (<em>despite, whereas, however, in case</em>), transformations (<em>DESPITE, SPITE, ALTHOUGH, CASE, ORDER, HOWEVER</em>) and Writing, where a range of accurate linkers is a key criterion for the Organisation and Language marks.</p>`,
  quiz: [
    { type: 'mcq', q: "___ the heavy rain, the match went ahead as planned.", options: ['Although', 'Despite', 'However', 'Even though'], answer: 1, why: "<em>Despite</em> is followed by a noun phrase (<em>the heavy rain</em>). <em>Although</em> and <em>even though</em> need a clause, and <em>however</em> connects sentences." },
    { type: 'mcq', q: "___ tired he was, he kept working until midnight.", options: ['However', 'Although', 'Whatever', 'Despite'], answer: 0, why: "<em>However</em> + adjective + subject + verb means \"to whatever degree\". <em>Although tired he was</em> and <em>despite tired</em> are ungrammatical, and <em>whatever</em> cannot precede an adjective this way." },
    { type: 'mcq', q: "She took a map with her ___ she should get lost.", options: ['unless', 'so that', 'in case', 'although'], answer: 2, why: "<em>In case</em> introduces a precaution against something that might happen. <em>So that she should get lost</em> would mean she wanted to get lost." },
    { type: 'gap', q: "We left early so as not ___ miss the train.", answers: ['to'], why: "<em>So as not to</em> + infinitive expresses a negative purpose." },
    { type: 'kwt', first: "Although the plan was risky, they went ahead with it.", key: 'despite', second: "They went ahead with the plan ___ risky.", answers: ['despite being', 'despite it being', 'despite its being'], why: "<em>Despite</em> takes <em>-ing</em>, so the clause becomes <em>despite being risky</em> (the subject is the plan, the same as the main clause object; <em>despite it being</em> is also possible)." },
    { type: 'kwt', first: "I'm taking a coat because it might get cold.", key: 'case', second: "I'm taking a coat ___ cold.", answers: ['in case it gets', 'in case it becomes', 'in case it turns', 'in case it should get'], why: "<em>In case</em> introduces a precaution and takes a present tense (or <em>should</em>) for future possibility." }
  ]
},
{
  id: 'ellipsis', category: 'Sentence structure', title: "Substitution and ellipsis: 'so', 'do so', 'one', leaving words out", level: 'C1', tagline: 'Native speakers avoid repeating themselves: the missing words are still "there" in the listener\'s mind.',
  idea: `<p>English hates repeating information that is obvious. It does this in two ways. <strong>Ellipsis</strong> deletes the repeated words entirely (<em>I wanted to go, but she didn't [want to go]</em>). <strong>Substitution</strong> replaces them with a small placeholder (<em>so, not, one, do so, that</em>).</p>
  <p>Both rely on one principle: the listener must be able to <strong>recover</strong> the missing words from the context. That is why the auxiliary is left behind: it "remembers" the tense and the verb: <em>He hasn't finished, but I <strong>have</strong>.</em></p>`,
  parts: [
    { h: 'Substitution: so, not, one, do so', body: `<div class="tablewrap"><table><tr><th>Word</th><th>Replaces</th><th>Example</th></tr>
      <tr><td><em>so / not</em></td><td>a whole clause after <em>think, hope, believe, expect, suppose, be afraid, say</em></td><td><em>Will it rain? — I hope so. / I hope not.</em></td></tr>
      <tr><td><em>do so</em></td><td>a verb phrase (formal)</td><td><em>Customers were asked to update their details, and most did so.</em></td></tr>
      <tr><td><em>one / ones</em></td><td>a countable noun (singular / plural)</td><td><em>I don't like this jacket. Show me a bigger one.</em></td></tr>
      <tr><td><em>that / those</em></td><td>a noun already mentioned (formal, with a specifying phrase)</td><td><em>The population of Spain is larger than that of Portugal.</em></td></tr></table></div>
      <p><strong>Negative with these verbs:</strong> <em>I don't think so</em> (not <s>I think not</s>, which is rather formal), <em>I suppose not</em>, <em>I expect so</em>, but for <em>hope</em> and <em>be afraid</em> only <em>so / not</em>: <em>I hope not.</em></p>` },
    { h: 'Ellipsis: leaving words out', body: `<p><strong>After an auxiliary or modal</strong>, delete everything that repeats the earlier verb phrase:</p>
      <div class="eg">Can you swim? — Yes, I <em>can</em>. / He said he'd call, but he <em>didn't</em>.</div>
      <div class="eg">Tom passed the exam and <em>so did</em> Maria. <span class="muted">(so + auxiliary + subject; negative: <em>nor/neither did Maria</em>)</span></div>
      <p><strong>After to</strong>: keep <em>to</em> and drop the verb: <em>She wanted to apply for the job, but her parents didn't want her <strong>to</strong>.</em> <em>You can borrow my bike if you want [to].</em></p>
      <p><strong>Coordinated clauses:</strong> <em>She opened the door and [she] walked in.</em> <em>He was tired but [he was] happy.</em></p>
      <p><strong>Formal, written ellipsis:</strong> <em>When [she was] asked about the delay, the minister declined to comment.</em> <em>If [it is] necessary, we can arrange an interpreter.</em> <em>Though [he was] tired, he carried on.</em></p>` },
    { h: 'Why the "leftover" auxiliary matters', body: `<p>You cannot delete the auxiliary along with the verb, because it carries tense, mood and polarity. <em>She said she would help, and she <strong>did</strong>.</em> The <em>did</em> tells us "past, positive"; without it the sentence would be unclear. If there is no auxiliary in the original (<em>She likes coffee</em>), <em>do</em> appears as a dummy: <em>She likes coffee, and so <strong>do</strong> I.</em></p>` }
  ],
  traps: `<ul><li><s>I think so not</s> / <s>I hope it not</s>: after <em>hope</em> and <em>be afraid</em> use <em>so</em> or <em>not</em> only: <em>I hope so; I'm afraid not.</em></li>
    <li>Don't repeat the whole verb: <s>He wanted to go, but I didn't want to go</s> sounds clumsy; <em>but I didn't</em> is natural. And with <em>to</em>: <em>I didn't want to</em>.</li>
    <li><em>So did I</em> (agreement) ≠ <em>So I did</em> (confirming a surprise: <em>You left the light on. — So I did!</em>).</li>
    <li>The substitute must match the auxiliary in the first clause: <em>She has never been abroad, and nor <strong>has</strong> her brother</em> (not <s>does</s>).</li>
    <li><em>One</em> replaces only <em>countable</em> nouns: <s>I prefer black coffee to white one</s> → <em>white</em>.</li></ul>`,
  exam: `<p>Open cloze regularly requires <em>so, one, do, did, to, that/those</em> as substitutes, and transformations test <em>SO, NOR, NEITHER, DID SO</em> in a compact rewrite. In Writing, elegant ellipsis and substitution avoid repetition, which examiners reward as "cohesion".</p>`,
  quiz: [
    { type: 'mcq', q: "“Is it going to rain?” “I don't think ___.”", options: ['so', 'it', 'not', 'that'], answer: 0, why: "After <em>think</em>, the clause is replaced by <em>so</em>, and negation moves onto the verb: <em>I don't think so</em>." },
    { type: 'mcq', q: "The council rejected the first plan but approved the second ___.", options: ['one', 'ones', 'it', 'that'], answer: 0, why: "<em>One</em> substitutes for a singular countable noun (<em>plan</em>). <em>Ones</em> is plural, and <em>it/that</em> cannot follow an adjective/ordinal in this way." },
    { type: 'mcq', q: "She wanted to apply for the job, but her parents didn't want her ___.", options: ['to', 'for', 'it', 'so'], answer: 0, why: "In ellipsis after <em>want</em>, <em>to</em> is kept in place of the whole infinitive phrase (<em>to apply for the job</em>)." },
    { type: 'gap', q: "Sara has never been abroad, and nor ___ her brother.", answers: ['has'], why: "<em>Nor</em> + auxiliary + subject repeats the auxiliary of the first clause (<em>has never been</em>): <em>nor has her brother</em>." },
    { type: 'kwt', first: "Tom passed the exam and Maria passed the exam too.", key: 'so', second: "Tom passed the exam and ___.", answers: ['so did Maria'], why: "<em>So</em> + auxiliary + subject means \"the same is true of\". The verb <em>pass</em> is replaced by <em>did</em> (past simple)." },
    { type: 'kwt', first: "The bank told customers to change their passwords and most of them changed their passwords.", key: 'so', second: "The bank told customers to change their passwords and most of them ___.", answers: ['did so'], why: "<em>Do so</em> replaces the verb phrase <em>changed their passwords</em>. <em>Did</em> shows past tense." }
  ]
}
);
