/* Practice sets, batch 9: more Part 1 (multiple-choice cloze) and Part 2 (open cloze). Loaded after practice8.js.
   C1._p9[typeId] = index of the first set added here for that type. */
window.C1 = window.C1 || {};
(function () {
  const get = (id) => C1.practice.find((p) => p.id === id);
  const add = (id, set) => get(id).sets.push(set);
  C1._p9 = C1._p9 || {};
  ['mcq', 'cloze'].forEach((id) => { C1._p9[id] = get(id).sets.length; });

  /* ---------- Multiple-choice cloze (Part 1) ---------- */
  add('mcq', { title: 'Set 12: The return of night trains', items: [{
    type: 'passage', mode: 'mcq', title: 'The return of night trains',
    text: `After decades of decline, night trains are {1} a comeback across Europe. Several routes that were {2} out in the 2000s have reopened, and new operators have {3} plans to link cities as far apart as Stockholm and Vienna. Campaigners say that a sleeper offers a welcome alternative {4} flying, saving travellers both a hotel bill and a day of lost time. People who once {5} by cheap flights now say they are prepared to pay a little more {6} the sake of lowering their carbon footprint. Not everything runs smoothly, {7}. Ageing carriages are in short supply, and building new ones can {8} years. Even so, bookings for next summer are already well ahead of last year, and several governments have promised financial support.`,
    gaps: [
      { options: [`doing`, `giving`, `making`, `taking`], answer: 2, why: `The fixed collocation is <em>make a comeback</em>. <em>Take</em> is tempting because of <em>take a stand</em>, but nobody <em>takes a comeback</em>.` },
      { options: [`faded`, `phased`, `eased`, `weaned`], answer: 1, why: `<em>Phase out</em> = stop something slowly, step by step. <em>Fade out</em> is for sounds and colours, <em>ease out</em> is for people, and <em>wean</em> is for babies and habits.` },
      { options: [`told`, `announced`, `said`, `spoken`], answer: 1, why: `<em>Announce plans</em> takes a direct object. <em>Told</em> needs a person after it, and <em>said</em> and <em>spoken</em> do not take <em>plans</em> as an object.` },
      { options: [`to`, `for`, `of`, `from`], answer: 0, why: `The noun <em>alternative</em> is followed by <em>to</em>: <em>an alternative to flying</em>. <em>For</em> is tempting, but it is not used with this noun.` },
      { options: [`promised`, `insisted`, `trusted`, `swore`], answer: 3, why: `<em>Swear by</em> = have complete faith in something. <em>Trust</em> is close in meaning, but <em>trusted by cheap flights</em> does not work, because <em>by</em> would show who does the trusting.` },
      { options: [`in`, `on`, `for`, `by`], answer: 2, why: `<em>For the sake of</em> is a fixed phrase meaning "in order to get or help something". <em>In the sake of</em> does not exist.` },
      { options: [`although`, `however`, `whereas`, `despite`], answer: 1, why: `<em>However</em> can come at the end of a sentence to add a contrast. <em>Although</em> and <em>whereas</em> must join two clauses, and <em>despite</em> needs a noun after it.` },
      { options: [`spend`, `pass`, `take`, `run`], answer: 2, why: `<em>Take</em> + a period of time = need that much time. A building project cannot <em>spend</em> or <em>pass</em> years in this meaning.` }
    ]
  }] });

  add('mcq', { title: 'Set 13: A community that runs its own shop', items: [{
    type: 'passage', mode: 'mcq', title: 'A community that runs its own shop',
    text: `When the last shop in the village closed in 2016, residents were {1} with a stark choice: lose the building or buy it. They raised the money by selling shares, {2} each household invest as little or as much as it wished. The shop is open seven days a week, which is impressive {3} that it is staffed entirely by volunteers, who {4} turns behind the counter. Prices are slightly higher than in the supermarket, but customers {5} it a small price to pay for a service on their doorstep. The shop has also {6} a meeting place for the elderly, many of whom would otherwise go days without seeing anyone. {7} the early doubts, it has made a profit every year since opening, and the surplus is channelled {8} local projects.`,
    gaps: [
      { options: [`taken`, `struck`, `faced`, `joined`], answer: 2, why: `<em>Be faced with</em> a choice or problem is the fixed passive. <em>Taken with</em> means attracted by, and <em>struck</em> and <em>joined</em> do not fit this pattern.` },
      { options: [`allowing`, `letting`, `permitting`, `enabling`], answer: 1, why: `Only <em>let</em> is followed by an object and a bare infinitive (<em>letting each household invest</em>). <em>Allow</em>, <em>permit</em> and <em>enable</em> all need <em>to</em>.` },
      { options: [`given`, `due`, `owing`, `thanks`], answer: 0, why: `<em>Given that</em> + clause = considering the fact that. <em>Due</em>, <em>owing</em> and <em>thanks</em> all need <em>to</em> after them, so none of them can be followed by <em>that</em>.` },
      { options: [`make`, `take`, `do`, `keep`], answer: 1, why: `<em>Take turns</em> is a fixed phrase meaning "do something one after another". <em>Make turns</em> and <em>do turns</em> are not used in this way.` },
      { options: [`regard`, `view`, `take`, `consider`], answer: 3, why: `<em>Consider it a small price</em> needs no extra word. <em>Regard</em> and <em>view</em> need <em>as</em>: <em>regard it as</em>.` },
      { options: [`gone`, `become`, `risen`, `turned`], answer: 1, why: `<em>Become</em> + noun = change into. <em>Turned</em> would need <em>into</em> (<em>turned into a meeting place</em>), and <em>gone</em> and <em>risen</em> cannot take a noun here.` },
      { options: [`although`, `whereas`, `despite`, `however`], answer: 2, why: `<em>Despite</em> is followed by a noun phrase (<em>the early doubts</em>). <em>Although</em> and <em>whereas</em> need a full clause, and <em>however</em> cannot start a noun phrase.` },
      { options: [`into`, `at`, `over`, `onto`], answer: 0, why: `<em>Channel</em> money <em>into</em> something = direct it there. <em>Onto</em> is tempting, but it is used for physical movement, not for money.` }
    ]
  }] });

  add('mcq', { title: 'Set 14: Why we forget dreams', items: [{
    type: 'passage', mode: 'mcq', title: 'Why we forget dreams',
    text: `Most people can only {1} a fraction of what they dream, and within minutes of waking even that fades. Scientists put this {2} to the way the brain works during sleep. The areas that store memories are far less active, so dreams are rarely {3} to long-term memory. Dream diaries can help, {4} they are kept beside the bed and written in the moment the dreamer wakes. People who do this often {5} themselves remembering more over time. Waking up gently also {6} a difference, since a loud alarm tends to wipe the images away. Yet not everyone {7} with this approach. Some researchers argue that forgetting is a useful way of {8} clutter from the mind.`,
    gaps: [
      { options: [`remind`, `recall`, `reflect`, `rehearse`], answer: 1, why: `<em>Recall</em> = bring a memory back into your mind. <em>Remind</em> needs a person (<em>remind me</em>), and <em>reflect</em> and <em>rehearse</em> have different meanings.` },
      { options: [`down`, `up`, `off`, `out`], answer: 0, why: `<em>Put something down to</em> = say that it is caused by. <em>Put up</em> and <em>put off</em> are different phrasal verbs.` },
      { options: [`submitted`, `entered`, `committed`, `admitted`], answer: 2, why: `<em>Commit something to memory</em> is a fixed phrase. <em>Entered</em> would need <em>into</em>, and <em>submitted</em> and <em>admitted</em> do not collocate with <em>memory</em>.` },
      { options: [`providing`, `unless`, `whereas`, `despite`], answer: 0, why: `<em>Providing</em> (= <em>provided that</em>) introduces a condition that must be met. <em>Unless</em> would reverse the meaning, and <em>despite</em> cannot take a clause.` },
      { options: [`make`, `keep`, `find`, `let`], answer: 2, why: `<em>Find yourself doing</em> = realise that you are doing something without having planned it. <em>Keep</em> and <em>make</em> do not fit this pattern with a reflexive pronoun.` },
      { options: [`does`, `gives`, `takes`, `makes`], answer: 3, why: `<em>Make a difference</em> is a fixed collocation. <em>Do a difference</em> does not exist, and <em>give</em> and <em>take</em> are not used with this noun.` },
      { options: [`approves`, `accepts`, `agrees`, `supports`], answer: 2, why: `<em>Agree with</em> a view takes <em>with</em>. <em>Approve</em> would need <em>of</em>, and <em>accept</em> and <em>support</em> do not take <em>with</em> before an idea.` },
      { options: [`preventing`, `protecting`, `discharging`, `clearing`], answer: 3, why: `<em>Clear clutter from</em> something is a natural collocation. <em>Prevent clutter</em> and <em>protect clutter</em> would mean the writer wants to keep the clutter safe or stop it, which makes no sense here.` }
    ]
  }] });

  add('mcq', { title: 'Set 15: The history of the pencil', items: [{
    type: 'passage', mode: 'mcq', title: 'The history of the pencil',
    text: `The pencil came {1} by accident. In the 16th century, shepherds in Cumbria found a soft black mineral beneath a fallen tree, and soon discovered it could be used to {2} their sheep apart. The material, which was in fact graphite, proved so useful that merchants began to {3} in it, selling it in rough sticks. Supplies were limited, and {4} the mine was guarded night and day, thieves still smuggled graphite out. The modern pencil dates {5} to 1795, when a French chemist found that powder mixed with clay could be baked into rods of different hardness. Pencils have since {6} their own in classrooms and studios, even in the {7} of competition from the computer. Few inventions can claim to have stood the {8} of time so well.`,
    gaps: [
      { options: [`about`, `across`, `round`, `over`], answer: 0, why: `<em>Come about</em> = happen, or start to exist. <em>Come across</em> means "find" and needs an object.` },
      { options: [`divide`, `separate`, `distinguish`, `tell`], answer: 3, why: `<em>Tell</em> something <em>apart</em> = see the difference between things. <em>Separate</em> and <em>divide</em> already mean "put apart", so <em>apart</em> would be repeated.` },
      { options: [`trade`, `sell`, `market`, `shop`], answer: 0, why: `<em>Trade in</em> something = buy and sell it. <em>Sell</em> and <em>market</em> take a direct object without <em>in</em>.` },
      { options: [`despite`, `although`, `however`, `whereas`], answer: 1, why: `<em>Although</em> + clause shows contrast. <em>Despite</em> needs a noun, and <em>however</em> cannot join two clauses.` },
      { options: [`from`, `up`, `after`, `back`], answer: 3, why: `<em>Date back to</em> = have existed since. <em>Date from</em> is also a phrase, but it is not followed by <em>to</em>.` },
      { options: [`held`, `kept`, `made`, `stood`], answer: 0, why: `<em>Hold your own</em> = do well against competition. <em>Stood</em> is tempting because of <em>stand your ground</em>, but <em>stand your own</em> does not exist.` },
      { options: [`view`, `sight`, `cause`, `face`], answer: 3, why: `<em>In the face of</em> = despite something difficult. <em>In view of</em> has no <em>the</em> and means "because of", so it cannot fit here.` },
      { options: [`trial`, `test`, `proof`, `measure`], answer: 1, why: `<em>Stand the test of time</em> is a fixed phrase. <em>Trial</em> and <em>proof</em> are related words, but they are not used in this idiom.` }
    ]
  }] });

  /* ---------- Open cloze (Part 2) ---------- */
  add('cloze', { title: 'Set 12: A village without Sunday cars', items: [{
    type: 'passage', mode: 'cloze', title: 'A village without Sunday cars',
    text: `Cars have been banned from the centre of Hallow Brook every Sunday {1} three years now. The idea came from a group of parents, {2} argued that children no longer played in the street. At first, shopkeepers feared that fewer customers would come; {3} the contrary, takings have risen. Not {4} did visitors arrive on foot, but many stayed longer to eat and shop. Some residents objected, among {5} were several elderly people who cannot walk far, so a minibus now runs for {6} who find walking hard. Had the council not agreed to the trial, the plan would never {7} got off the ground. Today, hardly {8} in the village would wish to go back.`,
    gaps: [
      { answers: [`for`], why: `<em>For</em> + a period of time (<em>for three years now</em>) is used with the present perfect.` },
      { answers: [`who`], why: `A non-defining relative clause about people (<em>parents</em>) needs <em>who</em>. <em>That</em> cannot follow a comma.` },
      { answers: [`on`], why: `<em>On the contrary</em> is a fixed phrase meaning "the opposite is true".` },
      { answers: [`only`], why: `<em>Not only did visitors arrive</em>, with inversion, followed by <em>but</em> (<em>also</em>).` },
      { answers: [`whom`], why: `<em>Among whom were</em> joins the clause to <em>residents</em>. <em>Among them</em> would create a comma splice.` },
      { answers: [`those`, `people`], why: `<em>Those who</em> = the people who. <em>Anyone</em> does not work, because the verb is plural (<em>find</em>).` },
      { answers: [`have`], why: `<em>Had the council not agreed</em> is an inverted third conditional, so the result clause needs <em>would never have</em> + past participle.` },
      { answers: [`anyone`, `anybody`], why: `<em>Hardly anyone</em> = almost nobody. <em>Hardly</em> already makes the sentence negative, so <em>anyone</em>, not <em>someone</em>, is used.` }
    ]
  }] });

  add('cloze', { title: 'Set 13: Learning a language through music', items: [{
    type: 'passage', mode: 'cloze', title: 'Learning a language through music',
    text: `Many learners find that songs help them acquire a language more quickly {1} textbooks alone. The rhythm and rhyme of a chorus make words easy {2} remember, and the more often you hear a line, {3} more likely it is to stay with you for life. Singing along also forces learners to focus on pronunciation, {4} is something that classroom exercises often neglect. Of course, lyrics are not always a reliable model of grammar. A singer may bend the rules {5} the sake of a rhyme, so it is worth checking unfamiliar phrases in a dictionary before using {6}. Teachers who include music in their lessons report that students are twice {7} likely to take part when the activity is enjoyable. It is {8} wonder, then, that several language apps now offer playlists of songs chosen for learners.`,
    gaps: [
      { answers: [`than`], why: `A comparison with <em>more quickly</em> needs <em>than</em>.` },
      { answers: [`to`], why: `<em>Easy to remember</em>: adjective + <em>to</em> + infinitive.` },
      { answers: [`the`], why: `The comparative pattern <em>the more..., the more...</em> needs <em>the</em> in both halves.` },
      { answers: [`which`], why: `A relative pronoun that refers to the whole idea (focusing on pronunciation) and comes after a comma: <em>which</em>. <em>That</em> cannot follow a comma.` },
      { answers: [`for`], why: `<em>For the sake of</em> is a fixed phrase meaning "in order to get or achieve".` },
      { answers: [`them`], why: `The object pronoun for <em>phrases</em> (plural): <em>using them</em>.` },
      { answers: [`as`], why: `<em>Twice as likely</em>: multiplier + <em>as</em> + adjective.` },
      { answers: [`no`, `little`, `small`], why: `<em>It is no/little wonder that...</em> = it is not surprising that...` }
    ]
  }] });

  add('cloze', { title: 'Set 14: The four-day week trial', items: [{
    type: 'passage', mode: 'cloze', title: 'The four-day week trial',
    text: `Last year, sixty companies took part in the largest trial of a four-day week ever held in Britain. Employees worked thirty-two hours a week instead {1} forty but were paid the same salary, {2} a view to finding out whether productivity would suffer. {3} the end of the six months, most firms said they would carry on. Managers admitted that they had expected the opposite; {4} anything, staff seemed to get more done in less time. Meetings were shorter, and people were {5} likely to check their phones. Not all the results were positive, {6}. A few firms dropped out of the trial, one {7} them citing staff shortages. {8} the evidence so far, the idea is unlikely to go away, and more trials are planned for next year.`,
    gaps: [
      { answers: [`of`], why: `<em>Instead of</em> + noun is a fixed phrase.` },
      { answers: [`with`], why: `<em>With a view to</em> + <em>-ing</em> = with the aim of. It is a fixed phrase.` },
      { answers: [`by`, `at`, `towards`, `near`], why: `<em>By/at the end of</em> a period. <em>Towards the end of</em> also fits the meaning.` },
      { answers: [`if`], why: `<em>If anything</em> = to the extent that there was any difference. It is a fixed phrase.` },
      { answers: [`less`], why: `The sense is that phones were used <em>less</em>, so <em>less likely</em> fits. <em>More likely</em> would not fit the positive picture of shorter meetings and better focus.` },
      { answers: [`though`, `however`], why: `At the end of a sentence <em>though</em> or <em>however</em> adds a small contrast. <em>Although</em> cannot be used in this position.` },
      { answers: [`of`], why: `<em>One of them</em> = one member of the group. A pronoun in the plural follows <em>of</em>.` },
      { answers: [`given`, `considering`, `judging`], why: `<em>Given the evidence</em> = taking the evidence into account. <em>Despite</em> would give the wrong logic, because the evidence is positive.` }
    ]
  }] });

  add('cloze', { title: 'Set 15: How bees communicate', items: [{
    type: 'passage', mode: 'cloze', title: 'How bees communicate',
    text: `Bees have no spoken language, yet they can tell one another exactly where to find food. A forager that returns to the hive performs a figure-of-eight movement known {1} the waggle dance. The length of the waggle corresponds {2} the distance, while the angle of the run shows the direction of the flower patch {3} relation to the sun. The more enthusiastic the dance, {4} richer the source is likely to be. Even {5} dancing in total darkness, the bees are followed by sisters who feel the vibrations with their antennae. Scientists once doubted {6} such a system could exist in an insect, but experiments in the 1940s proved it beyond doubt. Were it not for this behaviour, hives would waste a {7} deal of energy searching at random. It is little wonder, {8}, that researchers still study it.`,
    gaps: [
      { answers: [`as`], why: `<em>Known as</em> + a name is the fixed pattern.` },
      { answers: [`to`, `with`], why: `<em>Correspond to/with</em> = match or be equal to. The verb takes <em>to</em>.` },
      { answers: [`in`], why: `<em>In relation to</em> = compared with. It is a fixed phrase.` },
      { answers: [`the`], why: `The comparative pattern <em>The more..., the richer...</em> needs <em>the</em> in both halves.` },
      { answers: [`when`, `while`, `though`], why: `<em>Even when/while</em> + <em>-ing</em> = although they are doing this. A reduced time clause.` },
      { answers: [`that`, `whether`, `if`], why: `<em>Doubt</em> is followed by <em>that</em> or <em>whether/if</em> in a clause like this.` },
      { answers: [`great`, `good`, `fair`], why: `<em>A great/good deal of</em> = a large amount of. It is a fixed phrase with an uncountable noun.` },
      { answers: [`then`, `therefore`], why: `<em>It is little wonder, then, that...</em>: <em>then</em> means "as a result". <em>Therefore</em> has the same sense.` }
    ]
  }] });
})();
