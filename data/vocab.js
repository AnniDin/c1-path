window.C1 = window.C1 || {};
(function () {
  const pv = (phrase, meaning, ex, logic) => ({ phrase, kind: 'phrasal verb', meaning, ex, logic: logic || '' });
  const co = (phrase, meaning, ex, logic) => ({ phrase, kind: 'collocation', meaning, ex, logic: logic || '' });
  const id = (phrase, meaning, ex, logic) => ({ phrase, kind: 'idiom', meaning, ex, logic: logic || '' });
  const ex = (phrase, meaning, ex, logic) => ({ phrase, kind: 'expression', meaning, ex, logic: logic || '' });

  C1.vocab = [
    {
      id: 'up', section: 'Phrasal verbs', title: 'Phrasal verbs with UP', short: 'Completion, increase, approach, creation.',
      idea: `<p><em>Up</em> is not random. It often carries one of three ideas: <strong>higher/more</strong> (turn up the volume), <strong>towards you / into view</strong> (come up with, bring up) and <strong>completely</strong> (use up, tidy up). These are memory aids, not rules: many verbs with <em>up</em> are simply idiomatic (put up with, give up), so learn each one as a chunk.</p>`,
      cards: [
        pv('bring up', 'to mention a topic; to raise a child', 'She was afraid to [[bring up]] the subject of money.', 'A topic is lifted into view, so everybody can see it.'),
        pv('come up with', 'to think of an idea or a solution', 'Nobody could [[come up with]] a better plan.', 'The idea rises to the surface of your mind.'),
        pv('draw up', 'to prepare a formal document or plan', 'The lawyers [[drew up]] a contract within days.', 'You "pull" the plan up onto the table.'),
        pv('end up', 'to finally be in a place or situation, often one you did not plan', 'We got lost and [[ended up]] in a different town.', 'Often followed by -ing or a place: <em>ended up paying double</em>. The story lands somewhere unplanned.'),
        pv('give up', 'to stop trying; to stop doing a habit', 'He [[gave up]] smoking ten years ago.', 'Followed by a noun or -ing, never an infinitive: <em>give up smoking</em>. <em>Give up on</em> someone = stop hoping they will change.'),
        pv('look up to', 'to admire and respect', 'I have always [[looked up to]] my grandmother.', 'Opposite: <em>look down on</em>. Three-part verb, so the object always comes last.'),
        pv('make up for', 'to compensate for something bad', 'Flowers won\'t [[make up for]] forgetting our anniversary.', '<em>Up</em> = completion: you fill the gap until it is level.'),
        pv('put up with', 'to tolerate something unpleasant', 'I can\'t [[put up with]] this noise any longer.', 'Inseparable three-part verb, followed by a noun or -ing: <em>put up with being ignored</em>. Hook: you hold up a burden without dropping it.'),
        pv('set up', 'to establish a business, organisation or system', 'They [[set up]] a charity for refugees.', 'Something is placed upright so it can stand.'),
        pv('take up', 'to begin a hobby or activity; to occupy space or time', 'She [[took up]] climbing at the age of fifty.', 'You lift the new activity into your life.'),
        pv('turn up', 'to arrive or appear, often unexpectedly (also: to increase the volume)', 'He [[turned up]] an hour late without an apology.', 'Informal for "arrive". Not the same as <em>turn up the volume</em> (separable) or <em>turn up</em> as a noun.'),
        pv('keep up with', 'to stay at the same level or speed as', 'It is hard to [[keep up with]] new technology.', 'You keep level with something that is moving forward.')
      ]
    },
    {
      id: 'out', section: 'Phrasal verbs', title: 'Phrasal verbs with OUT', short: 'Leaving, exhausting, discovering, distributing.',
      idea: `<p><em>Out</em> means <strong>moving from inside to outside</strong>, and from that comes: <strong>discovered</strong> (finding out brings facts outside), <strong>used up/finished</strong> (run out, sell out: nothing remains inside), and <strong>distributed / clearly visible</strong> (hand out, stand out). Treat these as hooks rather than rules: many <em>out</em> verbs (turn out, work out) are idiomatic.</p>`,
      cards: [
        pv('carry out', 'to perform or complete a task, study or order', 'Scientists [[carried out]] a survey of 2,000 households.', 'You carry the plan all the way out into the real world.'),
        pv('figure out', 'to understand or find the answer by thinking', 'I can\'t [[figure out]] how this app works.', 'Separable: <em>figure it out</em>. Informal-neutral; close to <em>work out</em> but with no idea of calculating.'),
        pv('find out', 'to discover a fact', 'She [[found out]] that her flight was cancelled.', 'The fact comes out into view.'),
        pv('point out', 'to draw attention to a fact', 'He [[pointed out]] that the figures were wrong.', 'You extend a finger outward towards it.'),
        pv('run out of', 'to have no more of something left', 'We\'ve [[run out of]] milk again.', 'Inseparable three-part verb. Without <em>of</em>, the supply is the subject: <em>Time ran out</em>.'),
        pv('sort out', 'to deal with and solve a practical problem or arrangement', 'I\'ll [[sort out]] the tickets tomorrow.', 'Separable: <em>sort it out</em>. Informal; also means to put things in order.'),
        pv('turn out', 'to prove to be in the end; to attend (an event)', 'The rumour [[turned out]] to be false.', 'Usually <em>turn out to be</em> + noun or adjective: the result differs from what you expected.'),
        pv('work out', 'to calculate an amount; to find a solution by thinking (also: to do physical exercise)', 'Can you [[work out]] the total cost?', 'Separable for calculations: <em>work it out</em>. Intransitive <em>work out</em> also means "to go well" or "to exercise".'),
        pv('back out (of)', 'to withdraw from an agreement', 'At the last minute, the investors [[backed out]] of the deal.', 'You reverse out of a commitment.'),
        pv('break out', 'to start suddenly (war, fire, disease)', 'A fire [[broke out]] in the warehouse.', 'It escapes from containment.'),
        pv('fall out (with)', 'to quarrel and stop being friendly', 'She [[fell out]] with her sister over money.', 'You drop out of the relationship.'),
        pv('stand out', 'to be easy to notice; to be better than others', 'Her application really [[stood out]] from the rest.', 'It projects outward from the crowd.')
      ]
    },
    {
      id: 'off', section: 'Phrasal verbs', title: 'Phrasal verbs with OFF', short: 'Separation, starting, cancelling.',
      idea: `<p><em>Off</em> means <strong>separated from</strong> (take off a coat) and, by extension, <strong>the end of a connection</strong> (call off, write off), <strong>the start of a movement away</strong> (set off, take off, kick off) and <strong>completion</strong> (pay off, finish off).</p>`,
      cards: [
        pv('call off', 'to cancel', 'The match was [[called off]] because of the weather.', 'You cut the event away from the schedule.'),
        pv('put off', 'to postpone; to discourage', 'Don\'t [[put off]] the decision any longer.', 'Separable: <em>put it off</em>. Second sense: <em>The smell put me off</em>. Followed by -ing: <em>put off going</em>.'),
        pv('set off', 'to begin a journey; to trigger', 'We [[set off]] at dawn to avoid traffic.', 'You detach from your starting point.'),
        pv('take off', 'to leave the ground; to become successful', 'Her career really [[took off]] after the award.', 'Intransitive in these two senses (planes and careers take off). Clothes you <em>take off</em> are separable.'),
        pv('show off', 'to display skills to impress others', 'He\'s always [[showing off]] his expensive watch.', 'You put yourself forward, away from the background.'),
        pv('pay off', 'to bring good results in the end; to finish paying a debt', 'All that hard work finally [[paid off]].', 'For success it has no object: <em>It paid off</em>. For debt it is separable: <em>pay it off</em>.'),
        pv('write off', 'to consider a failure; to officially cancel a debt or vehicle', 'The car was [[written off]] after the crash.', 'You remove it from the books.'),
        pv('doze off', 'to fall asleep unintentionally', 'I [[dozed off]] during the film.', 'A light, short sleep you did not plan; <em>nod off</em> is similar and informal.'),
        pv('brush off', 'to dismiss casually', 'She [[brushed off]] the criticism with a smile.', 'You wipe it away like dust.'),
        pv('rip off', 'to cheat by overcharging (informal)', 'Tourists are often [[ripped off]] in this area.', 'Informal. The noun <em>a rip-off</em> = a price that is far too high.'),
        pv('kick off', 'to begin (an event, a match)', 'The festival [[kicks off]] on Friday.', 'From the football kick that starts the game.'),
        pv('see off', 'to accompany someone who is leaving', 'We went to the station to [[see]] her [[off]].', 'You watch them go away.')
      ]
    },
    {
      id: 'in', section: 'Phrasal verbs', title: 'Phrasal verbs with IN / INTO', short: 'Entering, absorbing, getting involved.',
      idea: `<p><em>In/into</em> gives the picture of <strong>entering a space</strong>, which extends to <strong>absorbing</strong> information (take in), <strong>becoming involved</strong> (get into, join in) and <strong>giving way</strong> (give in: you stop resisting). Several verbs here are also separable or take <em>into</em> in a longer form (break in / break into, get in / get into).</p>`,
      cards: [
        pv('fill in for', 'to substitute for someone', 'Can you [[fill in for]] me on Thursday?', 'You fill the empty space they leave.'),
        pv('give in', 'to surrender or agree after resisting', 'The child eventually [[gave in]] and ate the vegetables.', 'Often <em>give in to</em> pressure, temptation or demands. Similar to <em>back down</em> but you lose the argument.'),
        pv('take in', 'to understand and absorb information (also: to deceive, usually passive)', 'It\'s hard to [[take in]] so much information at once.', 'Separable: <em>take it in</em>. <em>Be taken in by</em> a trick = be fooled.'),
        pv('break in', 'to enter a building illegally by force', 'Thieves [[broke in]] through the back window.', 'With the place named, use <em>break into</em>: <em>broke into the house</em>. Noun: a break-in.'),
        pv('bring in', 'to introduce (a law); to earn money', 'The government [[brought in]] a new tax law.', 'You carry it into the system.'),
        pv('look into', 'to investigate', 'The police are [[looking into]] the incident.', 'Your eyes go inside the problem.'),
        pv('run into', 'to meet someone by chance; to encounter a difficulty', 'I [[ran into]] an old friend at the airport.', 'Inseparable. <em>Run into trouble / problems</em> is a very common chunk.'),
        pv('get into', 'to be admitted to a school or university; to become interested in', 'She managed to [[get into]] a top university.', 'Also <em>get into trouble / the habit of</em>. Contrast <em>get in</em> (arrive, enter a car).'),
        pv('drop in', 'to visit casually and without notice', 'Feel free to [[drop in]] any time.', 'Informal. Often <em>drop in on</em> a person or <em>drop in at</em> a place.'),
        pv('join in', 'to take part in an activity', 'Everyone was singing, so I [[joined in]].', 'You become part of the group.')
      ]
    },
    {
      id: 'down', section: 'Phrasal verbs', title: 'Phrasal verbs with DOWN', short: 'Reduction, failure, recording, calming.',
      idea: `<p><em>Down</em> = <strong>lower</strong>. That gives <strong>reduce</strong> (cut down, turn down the volume), <strong>fail/disappoint</strong> (let down, break down), <strong>settle/calm</strong> (calm down, settle down) and <strong>record</strong> (write down). It can also mean <strong>reach the bottom of a search</strong> (track down).</p>`,
      cards: [
        pv('break down', 'to stop working; to lose control emotionally; to analyse', 'Our car [[broke down]] on the motorway.', 'Machines and talks break down; people break down in tears. Noun: <em>a breakdown</em>.'),
        pv('cut down on', 'to reduce consumption', 'I\'m trying to [[cut down on]] sugar.', 'You lower the quantity.'),
        pv('let down', 'to disappoint', 'I\'m sorry I [[let]] you [[down]] last night.', 'You drop them from the level they expected.'),
        pv('turn down', 'to refuse an offer or request; to lower the volume', 'He [[turned down]] the job offer.', 'Separable: <em>turn it down</em>. Opposite for volume: <em>turn up</em>. You turn down offers, invitations and applications.'),
        pv('track down', 'to find after searching', 'Detectives finally [[tracked down]] the suspect.', 'You follow the trail to the end.'),
        pv('water down', 'to make weaker or less strong', 'The proposal was [[watered down]] before it became law.', 'You add water, reducing the strength.'),
        pv('play down', 'to make something seem less important', 'The minister [[played down]] the risks.', 'You lower its importance.'),
        pv('back down', 'to retreat from a position or demand', 'She refused to [[back down]] in the argument.', 'You retreat from your higher position.'),
        pv('settle down', 'to become calm; to start a stable life', 'They [[settled down]] in Valencia and had two children.', 'Movement comes to rest.'),
        pv('wind down', 'to relax; to gradually reduce activity', 'After a long day I need time to [[wind down]].', 'Hook: like a clock spring slowly losing its energy. Also used for businesses and projects that are closing gradually.')
      ]
    },
    {
      id: 'on-over', section: 'Phrasal verbs', title: 'Verbs with ON, OVER, ABOUT, AROUND', short: 'Continuing, dealing with, covering, causing.',
      idea: `<p><em>On</em> often means <strong>continuing</strong> or <strong>attaching to</strong> (carry on, take on a role). <em>Over</em> means <strong>covering something from start to finish</strong> (go over, think over) or <strong>passing above an obstacle</strong> (get over an illness). <em>About</em> and <em>across</em> often point to causing or chance (bring about, come across), and <em>round</em> to finding the time (get round to).</p>`,
      cards: [
        pv('carry on', 'to continue', '[[Carry on]] working; I won\'t be long.', 'The movement stays on its path.'),
        pv('get on with', 'to have a friendly relationship with someone (also: to continue with a task)', 'I [[get on]] well [[with]] my colleagues.', 'Same sense as <em>get along with</em> for people. <em>Get on with it!</em> = start or continue working.'),
        pv('pick on', 'to treat someone unfairly, repeatedly', 'He was always [[picking on]] the smallest boy.', 'You choose one target.'),
        pv('take on', 'to accept a responsibility or task; to hire', 'She [[took on]] too much work last year.', 'Separable when hiring: <em>take them on</em>. You can also <em>take on</em> a rival (compete with).'),
        pv('go over', 'to review carefully', 'Let\'s [[go over]] the figures once more.', 'Your eyes pass over everything.'),
        pv('get over', 'to recover from an illness or disappointment', 'It took months to [[get over]] the shock.', 'You climb over an obstacle.'),
        pv('think over', 'to consider carefully', 'I need to [[think over]] the offer.', 'You cover every angle.'),
        pv('come across', 'to find something by chance while doing something else', 'I [[came across]] my old diary in the attic.', 'Inseparable. <em>Come across as</em> + adjective = give an impression: <em>comes across as shy</em>.'),
        pv('bring about', 'to cause to happen', 'The reforms [[brought about]] a huge change.', 'The subject is the cause: <em>Technology brought about change</em>. Neutral-formal synonym of <em>cause</em>.'),
        pv('get round to', 'to finally find time to do', 'I still haven\'t [[got round to]] answering that email.', 'Followed by -ing: <em>get round to replying</em>. Often negative: you keep postponing the task.')
      ]
    },
    {
      id: 'away-back-through', section: 'Phrasal verbs', title: 'Verbs with AWAY, BACK, THROUGH', short: 'Escaping, reserving, surviving, seeing clearly.',
      idea: `<p><em>Away</em> = distance, <em>back</em> = return or reserve, <em>through</em> = from one side to the other, so <strong>surviving or completing a difficult process</strong> (get through, go through), or <strong>seeing to the truth</strong> (see through).</p>`,
      cards: [
        pv('get away with', 'to avoid punishment for something wrong', 'He [[got away with]] cheating for years.', 'You escape the consequences.'),
        pv('give away', 'to donate; to reveal a secret accidentally', 'His smile [[gave]] the surprise [[away]].', 'Separable: <em>give it away</em>. A <em>giveaway</em> = something that reveals the truth.'),
        pv('run away', 'to escape from a place or situation', 'The boy [[ran away]] from home at fifteen.', 'You move quickly away from danger.'),
        pv('back up', 'to support; to make a copy of data', 'The report [[backs up]] her argument.', 'Support stands behind an idea.'),
        pv('fall back on', 'to rely on as a reserve', 'It\'s good to have savings to [[fall back on]].', 'You step back onto a safe base.'),
        pv('look back on', 'to remember a past period', 'I often [[look back on]] my student days.', 'You turn your head to the past.'),
        pv('go through', 'to experience something difficult; to examine', 'She has [[gone through]] a lot this year.', 'You pass from one side of the hardship to the other.'),
        pv('get through', 'to survive or finish a difficult period or task', 'We [[got through]] the crisis together.', 'Inseparable in this sense. For the telephone sense see <em>get through to</em>.'),
        pv('see through', 'to recognise a lie or deception', 'I could immediately [[see through]] his excuse.', 'Your eyes pass through the surface like glass.'),
        pv('pull through', 'to recover from serious illness or difficulty', 'The doctors think she\'ll [[pull through]].', 'You are pulled out of danger.')
      ]
    },
    {
      id: 'collocations', section: 'Collocations and patterns', title: 'Collocations', short: 'Words that "go together" for natural sounding English.',
      idea: `<p>We say <em>heavy rain</em>, but not <em>strong rain</em>. Nobody can explain why; it is simply the pair English speakers use. These word partners (called <em>collocations</em>) are how natives recognise fluent English, and Cambridge tests them in every multiple-choice cloze. <strong>Learn the whole chunk</strong>, never the word alone, and notice the patterns: verbs of <em>reaching</em> (reach, draw) go with abstract results (a compromise, a conclusion); <em>adverb + adjective</em> pairs are fixed (highly unlikely, deeply rooted).</p>`,
      cards: [
        co('draw a conclusion', 'to decide something after considering facts', 'It is too early to [[draw a conclusion]] from these data.', 'You "draw" the answer out of the evidence.'),
        co('reach a compromise', 'to agree by each side giving up something', 'After hours of talks they [[reached a compromise]].', 'Reach = arrive at an outcome.'),
        co('take into account', 'to consider when deciding', 'The plan must [[take into account]] local opinion.', 'You put the fact into your calculation.'),
        co('raise awareness', 'to make people notice an issue', 'The campaign aims to [[raise awareness]] of mental health.', 'You lift the topic up so it becomes visible.'),
        co('pose a threat', 'to be a danger', 'Plastic waste [[poses a threat]] to marine life.', '<em>Pose</em> here means "present".'),
        co('bear in mind', 'to remember and consider', '[[Bear in mind]] that the shop closes at six.', 'You carry it in your mind.'),
        co('meet a deadline', 'to finish by the required time', 'We worked all night to [[meet the deadline]].', 'You and the deadline meet at a point in time.'),
        co('run the risk of', 'to expose yourself to the possibility of something bad', 'If you lie, you [[run the risk of]] losing your job.', 'Followed by -ing: <em>run the risk of failing</em>. Compare <em>take a risk</em>, which is deliberate.'),
        co('come to terms with', 'to accept a difficult situation', 'He is still [[coming to terms with]] the loss.', 'Followed by a noun or -ing: <em>come to terms with being alone</em>. Hook: you finally accept the terms of reality.'),
        co('keep pace with', 'to stay level with changes', 'Salaries have not [[kept pace with]] inflation.', 'You walk at the same speed.'),
        co('highly unlikely', 'very improbable', 'It is [[highly unlikely]] that it will snow in July.', '<em>Highly</em> pairs with abstract adjectives: likely, unlikely, effective, recommended.'),
        co('deeply rooted', 'firmly established in society or a person', 'These beliefs are [[deeply rooted]] in the culture.', 'Like a tree: roots go deep.'),
        co('widely believed', 'believed by many people', 'It is [[widely believed]] that sleep improves memory.', '<em>Widely</em> = across many people.'),
        co('fiercely competitive', 'extremely competitive', 'The job market is [[fiercely competitive]].', 'Intensifiers are fixed: fiercely competitive / loyal / independent. Do not say "very competitive" in every essay.'),
        co('a sharp contrast', 'a very clear difference', 'There is [[a sharp contrast]] between the two cities.', 'Also <em>in sharp contrast to</em>. Sharp = clearly defined, like a knife edge.')
      ]
    },
    {
      id: 'idioms', section: 'Idioms and expressions', title: 'Idioms', short: 'Fixed images with a meaning you can guess.',
      idea: `<p>Idioms are <strong>pictures</strong>. If you see the picture, you keep the meaning without memorising it. Use idioms sparingly in Writing (examiners like accuracy), but you need to recognise them in Listening and Reading.</p>`,
      cards: [
        id('the tip of the iceberg', 'a small visible part of a much bigger problem', 'The scandal is just [[the tip of the iceberg]].', 'Most of an iceberg is hidden underwater.'),
        id('a blessing in disguise', 'something that seems bad but turns out good', 'Losing that job was [[a blessing in disguise]].', 'A good thing wearing a bad costume.'),
        id('bite the bullet', 'to face something unpleasant bravely', 'I decided to [[bite the bullet]] and tell her the truth.', 'Hook: clench your teeth and get on with the painful thing. Informal.'),
        id('break the ice', 'to make people feel comfortable at first meeting', 'A joke helped [[break the ice]].', 'Hook: a frozen silence is cracked so that talking can start. Related noun: <em>an icebreaker</em>.'),
        id('call it a day', 'to stop working for now', 'We\'re exhausted; let\'s [[call it a day]].', 'You declare that today\'s work is finished.'),
        id('cost an arm and a leg', 'to be very expensive', 'That car [[cost an arm and a leg]].', 'Informal. Hook: the price is so high it feels like losing body parts.'),
        id('get the hang of', 'to learn how to do something', 'It took me a while to [[get the hang of]] the software.', 'Informal. About a skill or tool: <em>get the hang of</em> + noun or -ing.'),
        id('hit the nail on the head', 'to describe exactly the point', 'You [[hit the nail on the head]] with that comment.', 'A carpenter drives the nail perfectly.'),
        id('in the same boat', 'in the same difficult situation', 'We\'re all [[in the same boat]] with rising prices.', 'Everyone shares the risk.'),
        id('miss the boat', 'to lose an opportunity', 'If you don\'t apply now, you\'ll [[miss the boat]].', 'The boat leaves without you.'),
        id('once in a blue moon', 'very rarely', 'I eat fast food [[once in a blue moon]].', 'A blue moon is a rare event.'),
        id('the last straw', 'the final problem that makes you lose patience', 'When he shouted at me, it was [[the last straw]].', 'From "the straw that broke the camel\'s back": one tiny extra weight is too much. Also <em>the final straw</em>.'),
        id('under the weather', 'slightly ill', 'I\'m feeling a bit [[under the weather]] today.', 'Informal; used after <em>feel</em> or <em>be</em>. Hook: bad weather presses you down.'),
        id('go the extra mile', 'to make more effort than expected', 'She always [[goes the extra mile]] for her clients.', 'You walk one more mile than required.'),
        id('back to square one', 'back to the beginning after failure', 'The test failed, so we\'re [[back to square one]].', 'Hook: in a board game you return to the first square. Used after a failed attempt.')
      ]
    },
    {
      id: 'discourse', section: 'Idioms and expressions', title: 'Linking and stance expressions', short: 'Formal phrases for essays, reports and speaking.',
      idea: `<p>Compare <em>Tourism brings jobs. It damages the coast.</em> with <em>On the whole, tourism brings jobs; to a certain extent, however, it damages the coast.</em> The second tells the reader how to take each idea: as a general view, then as a limit. These phrases do that job, and fall into four groups: <strong>generalising</strong> (on the whole), <strong>limiting</strong> (to a certain extent), <strong>giving a reason</strong> (in view of), <strong>time frames</strong> (for the time being, in the long run). Using them naturally lifts a Writing or Speaking performance from B2 to C1.</p>`,
      cards: [
        ex('by and large', 'mostly; in the great majority of cases', '[[By and large]], the project has been a success.', 'Fixed phrase: you cannot change any word. A safe generalising opener.'),
        ex('on the whole', 'in general, even if there are some exceptions', '[[On the whole]], I agree with the author.', 'Often opens the sentence, followed by a comma. Not the same as <em>as a whole</em>.'),
        ex('to a certain extent', 'partly, but not completely', 'I agree with you [[to a certain extent]].', 'Limits your agreement: safe, balanced opinion. Also <em>to some extent</em>.'),
        ex('with regard to', 'concerning (formal)', '[[With regard to]] your request, we are unable to help.', 'Formal replacement for <em>about</em>. Singular <em>regard</em> is the safe exam form (<em>with regards to</em> is a common mistake).'),
        ex('in view of', 'because of (formal)', '[[In view of]] the weather, the event is cancelled.', 'Followed by a noun or <em>the fact that</em>. Hook: you "view" the fact as the reason.'),
        ex('for the time being', 'temporarily; for now', 'You can stay here [[for the time being]].', 'Suggests the situation will change later. Neutral register; synonym of <em>for now</em>.'),
        ex('in the long run', 'over a long period; eventually', 'Cheap shoes cost more [[in the long run]].', 'Hook: judge it at the end of a long race, not at the start. Opposite: <em>in the short term</em>.'),
        ex('all things considered', 'after weighing up every factor, before a final judgement', '[[All things considered]], it was a good decision.', 'A summarising sentence opener, typical of conclusions.'),
        ex('on the grounds that', 'for the reason that (formal)', 'He was refused entry [[on the grounds that]] he had no visa.', '"Ground" = foundation for a claim.'),
        ex('in the event of', 'if something happens (formal)', '[[In the event of]] fire, use the stairs.', 'Noun phrase after it: <em>in the event of rain</em>.'),
        ex('that said', 'however; despite that', 'It\'s expensive. [[That said]], it\'s worth it.', 'Adds a contrast to what was just said.'),
        ex('by no means', 'not at all', 'The results are [[by no means]] conclusive.', 'Strong negative; triggers inversion if fronted: <em>By no means is it certain.</em>')
      ]
    }
  ];
})();
