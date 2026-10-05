/* Practice sets, batch 4: Unit A (Law, crime and the media) and Unit B (Consumers, arts and character).
   Loaded after practice3.js. C1._p4[typeId] = index of the first set added here for that type. */
window.C1 = window.C1 || {};
(function () {
  const get = (id) => C1.practice.find((p) => p.id === id);
  const add = (id, set) => get(id).sets.push(set);
  C1._p4 = {};
  ['mcq', 'cloze', 'wf', 'kwt'].forEach((id) => { C1._p4[id] = get(id).sets.length; });

  /* ---------- Open cloze ---------- */
  add('cloze', { title: 'Set 7: News and the fear of crime', items: [{
    type: 'passage', mode: 'cloze', title: 'How the news shapes our picture of crime',
    text: 'Most people have never met a burglar or witnessed a robbery, so their picture of crime is shaped almost entirely {1} what they read and watch. Editors know that violent stories attract readers, and they therefore give them far more space than they give {2} ordinary offences such as shoplifting, which hardly ever make the headlines. The result is that audiences tend to believe crime is rising even {3} official figures show a steady fall. Researchers call this the "mean world" effect: the more news viewers consume, {4} more likely they are to see the world as dangerous. Journalists reply that they are only reporting events {5} take place, and that readers would soon complain if reports were less dramatic. Nevertheless, the way a story is told matters. Not only {6} a single dramatic image stay in the memory for years, but it can also influence how juries and politicians think. Some newsrooms have now agreed to publish regular statistics alongside crime reports, {7} that readers can judge the real scale of a problem for themselves. Whether or {8} this will change public attitudes remains to be seen.',
    gaps: [
      { answers: ['by'], why: 'Passive: <em>is shaped by</em> introduces the agent (what they read and watch). <em>Entirely by</em> is the natural pairing.' },
      { answers: ['to'], why: '<em>Give space to</em> something. The comparison <em>more space than they give to ordinary offences</em> repeats the verb, so <em>to</em> is needed.' },
      { answers: ['though', 'when', 'as'], why: '<em>Even though</em> introduces a fact that contradicts the belief (official figures really do show a fall). <em>Even when</em> and <em>even as</em> also work. <em>Even if</em> would treat the fall as hypothetical, so it does not fit.' },
      { answers: ['the'], why: 'Double comparative: <em>The more …, the more likely …</em> Both halves need <em>the</em>.' },
      { answers: ['that', 'which'], why: 'Defining relative clause with no comma, referring to <em>events</em> (a thing): <em>that</em> or <em>which</em>. <em>Who</em> is only for people.' },
      { answers: ['does'], why: 'Negative adverbial <em>Not only</em> at the start of a clause triggers inversion: <em>Not only does a single image stay …</em> The auxiliary is <em>does</em> because the main verb <em>stay</em> is present simple.' },
      { answers: ['so'], why: '<em>So that</em> + clause expresses purpose: they publish statistics <em>so that</em> readers can judge. (<em>In order that</em> needs more words, and one word only is allowed.)' },
      { answers: ['not'], why: 'Fixed pattern: <em>whether or not</em> = regardless of whether it will change attitudes.' }
    ]
  }] });

  add('cloze', { title: 'Set 8: Advertising and impulse buying', items: [{
    type: 'passage', mode: 'cloze', title: 'Why we buy what we do not need',
    text: 'Advertisers have long known that people often buy things {1} first weighing up the alternatives. Instead, they are persuaded by a feeling, {2} is why so many adverts show smiling families rather than technical details. Supermarkets place sweets near the tills {3} that shoppers who are tired of queueing will reach for one without thinking. Online, the same principle applies: a countdown timer beside a product creates the impression {4} stock is running out, and customers click "buy" before they have had time to change their minds. Psychologists call this impulse buying, and they estimate that it accounts {5} nearly half of all spending in some shops. {6} shoppers been given a few more minutes to reflect, many of the items in their baskets would have stayed on the shelf. Consumer groups urge people to make a list before they go out and to stick {7} it. It is also worth remembering that the adverts we notice least are often the ones that influence us {8}.',
    gaps: [
      { answers: ['without'], why: '<em>Often buy things without first weighing up</em>: <em>without</em> + <em>-ing</em> form = not doing something beforehand. <em>Before</em> would not fit the meaning.' },
      { answers: ['which'], why: 'Non-defining relative clause after a comma, referring to the whole previous idea (being persuaded by a feeling). Only <em>which</em> can do this; <em>that</em> cannot follow a comma.' },
      { answers: ['so'], why: '<em>So that</em> + clause = purpose: the sweets are placed there so that tired shoppers will reach for one.' },
      { answers: ['that'], why: 'The noun <em>impression</em> is followed by a <em>that</em>-clause giving its content: <em>the impression that stock is running out</em>.' },
      { answers: ['for'], why: '<em>Account for</em> = make up a part or proportion: <em>accounts for nearly half of all spending</em>.' },
      { answers: ['had'], why: 'Inverted third conditional: <em>Had shoppers been given …</em> = If shoppers had been given … The main clause <em>would have stayed</em> confirms it is a past unreal condition.' },
      { answers: ['to'], why: '<em>Stick to</em> (a list, a plan) = follow it faithfully, without changing.' },
      { answers: ['most'], why: 'Superlative adverb parallel to <em>least</em> in the first half: the adverts we notice <em>least</em> influence us <em>most</em>. No article is used with an adverb.' }
    ]
  }] });

  /* ---------- Word formation ---------- */
  add('wf', { title: 'Set 7: Justice and privacy', items: [{
    type: 'passage', mode: 'wf', title: 'Trial by timeline',
    text: 'A fair trial is the {1} of any justice system, yet lawyers warn that it is increasingly {2} by the speed of online news. When a suspect is named on social media, thousands of strangers reach a verdict in minutes, and the damage to a reputation is almost impossible to undo, even if the {3} is later shown to be false. Courts have always tried to protect {4} against this kind of pressure; jurors are told to ignore anything they have read outside the courtroom. Critics say such instructions are {5} in the age of smartphones. Privacy campaigners add that victims of crime also suffer when their addresses and photographs are published, and they call for stricter {6} of personal data. Governments, however, are {7} to limit press freedom, since a free press exposes corruption and holds the powerful to account. The challenge for the law is therefore to protect individuals without {8} the public\'s right to know.',
    gaps: [
      { base: 'found', answers: ['foundation'], why: 'A noun after <em>the</em>, followed by <em>of</em>: <em>the foundation of any justice system</em>. The suffix <em>-ation</em> turns the verb <em>found</em> into a noun.' },
      { base: 'threat', answers: ['threatened'], why: 'A passive participle after <em>is increasingly</em> and before <em>by</em>: <em>is threatened by</em>. The noun <em>threat</em> becomes a verb with <em>-en</em>.' },
      { base: 'accuse', answers: ['accusation'], why: 'A singular noun after <em>the</em> and before <em>is</em>: <em>the accusation is shown to be false</em>.' },
      { base: 'defend', answers: ['defendants'], why: 'A plural person noun with no article, object of <em>protect</em>: <em>defendants</em>. A singular would need <em>a</em> or <em>the</em>.' },
      { base: 'real', answers: ['unrealistic'], why: 'A negative adjective after <em>are</em>: <em>un-</em> + <em>real</em> + <em>-istic</em>. Two changes are needed. It means that the instructions do not match how people actually behave.' },
      { base: 'regulate', answers: ['regulation', 'regulations'], why: 'A noun after <em>stricter</em>, followed by <em>of</em>: <em>regulation of personal data</em>. Both singular and plural are natural.' },
      { base: 'willing', answers: ['unwilling'], why: 'The sense is negative (governments do not want to limit press freedom), so the prefix <em>un-</em> is added to the adjective <em>willing</em>.' },
      { base: 'danger', answers: ['endangering'], why: 'A <em>-ing</em> form after the preposition <em>without</em>. <em>En-</em> + <em>danger</em> makes the verb <em>endanger</em> = put at risk.' }
    ]
  }] });

  add('wf', { title: 'Set 8: Streaming and the arts', items: [{
    type: 'passage', mode: 'wf', title: 'The infinite shelf',
    text: 'Streaming services have {1} changed the way people discover films, music and television. A generation ago, a viewer who wanted to see a {2} classic had to hunt through video shops or wait for a late-night broadcast. Today the {3} of films on offer is almost overwhelming, and many users spend longer scrolling than watching. Supporters point out that small producers can now reach {4} audiences without a studio behind them. Critics, however, fear that algorithms push people towards what they already like, while optimists claim that good recommendations can {5} viewers\' horizons. Museums face a related challenge. Many have begun to stream guided tours, hoping to attract visitors who might otherwise be {6} to travel. Whether a screen can reproduce the {7} of standing in front of an original painting is doubtful, but few curators now deny the {8} of an online presence.',
    gaps: [
      { base: 'dramatic', answers: ['dramatically'], why: 'An adverb is needed to modify the verb <em>changed</em>: <em>dramatically changed</em>.' },
      { base: 'forget', answers: ['forgotten'], why: 'A participle adjective before <em>classic</em>: <em>a forgotten classic</em> = one that people no longer remember. <em>Unforgettable</em> cannot follow <em>a</em>.' },
      { base: 'vary', answers: ['variety'], why: 'A singular noun after <em>the</em> that agrees with <em>is</em> and is followed by <em>of films</em>: <em>the variety of films</em>.' },
      { base: 'globe', answers: ['global'], why: 'An adjective before <em>audiences</em>: <em>global audiences</em>. The noun <em>globe</em> becomes an adjective with <em>-al</em>, and the final <em>e</em> is dropped.' },
      { base: 'broad', answers: ['broaden'], why: 'A verb after the modal <em>can</em>: <em>broaden horizons</em>. The suffix <em>-en</em> turns the adjective into a verb.' },
      { base: 'able', answers: ['unable'], why: 'A negative adjective in <em>be unable to travel</em>. The prefix <em>un-</em> gives the opposite meaning, which fits <em>otherwise</em> (if they could not come in person).' },
      { base: 'excite', answers: ['excitement'], why: 'An uncountable noun after <em>the</em>, followed by <em>of standing</em>: <em>the excitement of</em>. The suffix <em>-ment</em> makes the noun.' },
      { base: 'important', answers: ['importance'], why: 'A noun after <em>the</em>, followed by <em>of</em>, object of <em>deny</em>: <em>deny the importance of</em>.' }
    ]
  }] });

  /* ---------- Key word transformations ---------- */
  add('kwt', { title: 'Set 12: Law and the media', items: [
    { type: 'kwt', first: 'It is alleged that the company dumped waste in the river.', key: 'alleged', second: 'The company ___ dumped waste in the river.', answers: ['is alleged to have'], why: 'Reporting passive for a past event: subject + <em>is alleged to have</em> + past participle. The dumping happened before the allegation, so the perfect infinitive is needed.' },
    { type: 'kwt', first: 'Reporters surrounded her as soon as she left the court.', key: 'sooner', second: 'No ___ left the court than reporters surrounded her.', answers: ['sooner had she'], why: '<em>No sooner … than</em> takes the past perfect with inversion: <em>No sooner had she left</em>. The earlier action (leaving) uses <em>had</em>.' },
    { type: 'kwt', first: 'The journalist must not, in any circumstances, reveal her source.', key: 'circumstances', second: 'Under no ___ the journalist reveal her source.', answers: ['circumstances must', 'circumstances should', 'circumstances can', 'circumstances may'], why: 'A negative adverbial at the start (<em>Under no circumstances</em>) forces inversion: the modal comes before the subject. <em>Must</em> keeps the original obligation; <em>should</em> is also acceptable.' },
    { type: 'kwt', first: 'Critics said the editor was to blame for the leak.', key: 'blamed', second: 'The editor ___ the leak by critics.', answers: ['was blamed for'], why: '<em>Blame someone for something</em>. In the passive: <em>was blamed for</em>. The agent <em>by critics</em> confirms that a passive is needed.' },
    { type: 'kwt', first: 'She took the newspaper to court because it printed false claims about her.', key: 'sued', second: 'She ___ for printing false claims about her.', answers: ['sued the newspaper', 'sued the paper', 'sued it'], why: '<em>Sue</em> = take legal action against someone, and it takes a direct object with no preposition: <em>sued the newspaper</em>.' },
    { type: 'kwt', first: 'The defendant will only be released if he pays bail.', key: 'provided', second: 'The defendant will be released ___ pays bail.', answers: ['provided he', 'provided that he'], why: '<em>Provided (that)</em> = only if. It introduces a condition and is followed by a clause with the subject: <em>provided he pays</em>. The present simple is used for a future condition.' }
  ] });

  add('kwt', { title: 'Set 13: Character, comparison and regret', items: [
    { type: 'kwt', first: 'No one in the family is more stubborn than my grandfather.', key: 'most', second: 'My grandfather is ___ stubborn person in the family.', answers: ['the most', 'by far the most', 'easily the most'], why: 'A negative comparison becomes a superlative: <em>the most stubborn</em>. Longer adjectives such as <em>stubborn</em> use <em>most</em> rather than <em>-est</em>. <em>Easily</em> or <em>by far</em> can strengthen it.' },
    { type: 'kwt', first: 'It is a pity that I did not take the job in Madrid.', key: 'wish', second: 'I ___ the job in Madrid.', answers: ['wish I had taken', 'wish I\'d taken', 'wish I had accepted', 'wish I\'d accepted'], why: 'To express regret about the past, <em>wish</em> is followed by the past perfect: <em>wish I had taken</em>.' },
    { type: 'kwt', first: 'She is sorry that she lost her temper with the waiter.', key: 'regrets', second: 'She ___ her temper with the waiter.', answers: ['regrets losing', 'regrets having lost'], why: '<em>Regret</em> + <em>-ing</em> for something done earlier. <em>Having lost</em> makes it clear that the loss came first.' },
    { type: 'kwt', first: "Nobody else in the office is as easy-going as Jake's sister.", key: 'most', second: "Jake's sister is ___ easy-going person in the office.", answers: ['the most', 'by far the most'], why: "<em>Nobody else is as ... as</em> means she is at the top of the scale, which is a superlative. A long adjective takes <em>the most</em> (<em>the most easy-going</em>); <em>by far</em> is an optional intensifier." },
    { type: 'kwt', first: 'Maria is so tactless that she often upsets people.', key: 'such', second: 'Maria is ___ tactless person that she often upsets people.', answers: ['such a'], why: '<em>So</em> goes before an adjective alone, but <em>such</em> goes before an adjective + noun and needs <em>a</em> with a singular countable noun: <em>such a tactless person</em>.' },
    { type: 'kwt', first: 'I wish I had listened to my sister\'s warning.', key: 'only', second: 'If ___ to my sister\'s warning!', answers: ['only I had listened', "only I'd listened", 'only I had paid attention', "only I'd paid attention"], why: '<em>If only</em> + past perfect expresses strong regret about the past, just like <em>wish</em> + past perfect. The word order stays as in a normal clause: <em>if only I had listened</em>.' }
  ] });

  /* ---------- Multiple-choice cloze ---------- */
  add('mcq', { title: 'Set 7: Celebrity and the press', items: [{
    type: 'passage', mode: 'mcq', title: 'Fame and the camera',
    text: 'Celebrity magazines {1} on gossip, and few famous people can stay out of their pages for long. Photographers {2} in wait outside restaurants and hotels, hoping to {3} the first picture of a couple\'s newborn baby. Stars who complain about intrusion are often told that it is simply part and {4} of being famous, and that they cannot expect to have it both ways. Yet several have {5} legal action after their children were photographed on the way to school, arguing that the line between public interest and mere curiosity had been {6}. Editors, for their part, {7} that readers would not buy their magazines if they did not want to read about famous lives. The courts have so far been {8} to set firm rules, preferring to judge each case on its own facts. Many of those who are photographed, however, say that they never agreed to be part of this game, and that choosing a public career should not mean surrendering the whole of one\'s private life.',
    gaps: [
      { options: ['develop', 'profit', 'thrive', 'rise'], answer: 2, why: '<em>Thrive on</em> = do well because of something. <em>Profit</em> takes <em>from</em>, and <em>develop</em> and <em>rise</em> do not combine with <em>on gossip</em>.' },
      { options: ['lie', 'sit', 'stay', 'hide'], answer: 0, why: '<em>Lie in wait</em> is a fixed phrase meaning to hide and wait to surprise someone.' },
      { options: ['ensure', 'assure', 'secure', 'insure'], answer: 2, why: '<em>Secure</em> = obtain something after effort. <em>Ensure</em> means make certain, <em>assure</em> needs a person as object, and <em>insure</em> means protect with insurance.' },
      { options: ['package', 'portion', 'piece', 'parcel'], answer: 3, why: 'The idiom is <em>part and parcel of</em> = an essential part of something.' },
      { options: ['made', 'done', 'taken', 'put'], answer: 2, why: 'The collocation is <em>take legal action</em> (against someone). <em>Make</em>, <em>do</em> and <em>put</em> do not form this phrase.' },
      { options: ['passed', 'crossed', 'jumped', 'broken'], answer: 1, why: '<em>Cross the line</em> = go beyond what is acceptable. The other verbs do not collocate with <em>line</em> in this figurative sense.' },
      { options: ['contain', 'maintain', 'retain', 'sustain'], answer: 1, why: '<em>Maintain that</em> + clause = keep stating that something is true. <em>Contain</em>, <em>retain</em> and <em>sustain</em> cannot be followed by a <em>that</em>-clause like this.' },
      { options: ['long', 'late', 'slow', 'behind'], answer: 2, why: '<em>Be slow to do something</em> = take a long time to act. <em>Late</em>, <em>long</em> and <em>behind</em> do not take a <em>to</em>-infinitive in this meaning.' }
    ]
  }] });

  add('mcq', { title: 'Set 8: Personality and taste', items: [{
    type: 'passage', mode: 'mcq', title: 'Is taste a matter of character?',
    text: 'Why do some people {1} towards bold abstract paintings while others prefer quiet landscapes? Psychologists who study taste are {2} to the view that personality plays a larger part than education or income. People who score high for openness to experience tend to {3} out new and unfamiliar works, whereas more cautious individuals feel at {4} among images they already know. The same pattern appears in shopping. An impulsive buyer will {5} on a bargain at once, while a methodical one {6} the options for weeks before spending a penny. None of this means that taste is {7} in stone: people\'s preferences shift as they grow older and meet new experiences. Even so, researchers {8} out that a person\'s first strong reaction to a picture or a product often says more about the viewer than about the object itself.',
    gaps: [
      { options: ['slide', 'gravitate', 'roll', 'settle'], answer: 1, why: '<em>Gravitate towards</em> = be naturally attracted to. <em>Slide</em> and <em>roll</em> describe physical movement, and <em>settle</em> does not take <em>towards</em> in this sense.' },
      { options: ['tended', 'prone', 'inclined', 'apt'], answer: 2, why: '<em>Be inclined to the view that</em> = tend to think that. <em>Prone</em> and <em>apt</em> are followed by <em>to</em> + verb, not by a noun phrase like <em>the view</em>, and <em>tended</em> would need a following verb.' },
      { options: ['make', 'keep', 'seek', 'run'], answer: 2, why: '<em>Seek out</em> = look for deliberately and find. <em>Make out</em>, <em>keep out</em> and <em>run out</em> have different meanings.' },
      { options: ['liberty', 'ease', 'rest', 'leisure'], answer: 1, why: '<em>Feel at ease</em> = feel relaxed and comfortable. <em>At rest</em>, <em>at leisure</em> and <em>at liberty</em> are real phrases but do not follow <em>feel</em> with this meaning.' },
      { options: ['dash', 'jerk', 'pounce', 'fling'], answer: 2, why: '<em>Pounce on</em> = seize quickly and eagerly. The other verbs do not combine with <em>on</em> to mean this.' },
      { options: ['measures', 'weighs', 'counts', 'handles'], answer: 1, why: '<em>Weigh the options</em> = consider the good and bad points of each. The other verbs do not collocate with <em>options</em>.' },
      { options: ['set', 'laid', 'put', 'held'], answer: 0, why: 'The idiom <em>set in stone</em> = fixed and impossible to change. The other past participles cannot replace <em>set</em> in this idiom.' },
      { options: ['show', 'carry', 'point', 'tell'], answer: 2, why: '<em>Point out that</em> = draw attention to a fact. <em>Show out</em>, <em>carry out that</em> and <em>tell out</em> do not fit.' }
    ]
  }] });
})();
