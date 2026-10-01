window.C1 = window.C1 || {}; C1.vocab = C1.vocab || [];
(function () {
  const pv = (phrase, meaning, ex, logic) => ({ phrase, kind: 'phrasal verb', meaning, ex, logic: logic || '' });
  const co = (phrase, meaning, ex, logic) => ({ phrase, kind: 'collocation', meaning, ex, logic: logic || '' });
  const id = (phrase, meaning, ex, logic) => ({ phrase, kind: 'idiom', meaning, ex, logic: logic || '' });
  const ex = (phrase, meaning, ex, logic) => ({ phrase, kind: 'expression', meaning, ex, logic: logic || '' });

  const groups = [
    /* ===================== PHRASAL VERBS ===================== */
    {
      id: 'get', title: 'Phrasal verbs with GET', short: 'Reaching, managing, escaping, communicating.',
      section: 'Phrasal verbs',
      idea: `<p><em>Get</em> is a "reaching" verb: its basic idea is <strong>arriving at a new state or place</strong>. The particle says which one: <em>across</em> = reaching the listener (get across), <em>ahead</em> = moving in front, <em>by</em> = passing without difficulty (just about managing), <em>out of</em> = escaping an obligation. Ask yourself: what is being reached, and how?</p>`,
      cards: [
        pv('get across', 'to make an idea clearly understood', 'It is difficult to [[get]] complex ideas [[across]] in a short talk.', 'The message crosses the gap between you and the listener.'),
        pv('get ahead', 'to be successful in your career or life', 'If you want to [[get ahead]] in this industry, you need contacts.', 'You move in front of the others.'),
        pv('get along with', 'to have a friendly relationship with', 'I [[get along with]] most of my neighbours.', 'You move forward together without friction. Very close to <em>get on with</em>.'),
        pv('get at', 'to suggest indirectly; to reach something difficult', 'What exactly are you [[getting at]]?', 'You are trying to reach a point that you have not said openly.'),
        pv('get by', 'to manage to live with just enough money or ability', 'She can [[get by]] in Italian, but she is not fluent.', 'You pass by, without being stopped or being outstanding.'),
        pv('get down to', 'to begin to give serious attention to', 'Let\'s [[get down to]] business.', 'You go down to the real substance of the matter.'),
        pv('get out of', 'to avoid a duty or task', 'He always manages to [[get out of]] washing up.', 'You slip out of the obligation.'),
        pv('get round', 'to persuade someone by charm; to find a way around a rule or problem', 'She knows how to [[get round]] her father.', 'Hook: you go around the obstacle instead of through it. Also spelled <em>get around</em>.'),
        pv('get through to', 'to make someone understand; to reach by telephone', 'I just can\'t [[get through to]] him; he never listens.', 'Your message passes through a barrier.'),
        pv('get up to', 'to be involved in (often something naughty)', 'What have the children been [[getting up to]]?', 'A hook: you have got yourself "up to" some activity.'),
        pv('get back to', 'to reply to someone later', 'I\'ll [[get back to]] you as soon as I have the figures.', 'Your reply returns to the person who asked.'),
        pv('get behind with', 'to fail to keep up with payments or work', 'He [[got behind with]] his rent after losing his job.', 'Opposite of getting ahead: you fall behind the schedule.')
      ]
    },
    {
      id: 'take', title: 'Phrasal verbs with TAKE', short: 'Resembling, accepting, taking control, removing.',
      section: 'Phrasal verbs',
      idea: `<p><em>Take</em> means to <strong>receive or move something towards yourself</strong>. Combined with particles: <em>over</em> = you take control, <em>back</em> = you return what was given, <em>apart</em> = you separate the pieces, <em>to</em> = you start to feel attracted to someone or something. Notice that many <em>take</em> verbs are separable when an object is involved.</p>`,
      cards: [
        pv('take after', 'to resemble an older relative in appearance or character', 'She [[takes after]] her mother: both are very stubborn.', 'You "follow" the family model.'),
        pv('take over', 'to gain control of; to replace someone', 'A German company [[took over]] the firm last year.', 'Control passes over to you.'),
        pv('take to', 'to start liking someone or something quickly', 'The children [[took to]] their new teacher immediately.', 'You move towards it emotionally.'),
        pv('take back', 'to withdraw something you said; to return', 'I\'m sorry, I didn\'t mean it. I [[take]] it [[back]].', 'The words return to the speaker.'),
        pv('take down', 'to write down what someone says; to remove from a high position', 'The secretary [[took down]] every word of the speech.', 'Separable: <em>take it down</em>. Also a website can be <em>taken down</em>.'),
        pv('take apart', 'to separate something into pieces; to criticise heavily', 'He [[took]] the engine [[apart]] to find the fault.', '<em>Apart</em> = in separate pieces.'),
        pv('take out', 'to obtain a loan, mortgage or insurance policy (also: to remove)', 'They had to [[take out]] a mortgage to buy the flat.', 'Separable: <em>take it out</em>. Typical chunks: take out a loan / a mortgage / insurance.'),
        pv('take up on', 'to accept an offer someone has made', 'I\'ll [[take]] you [[up on]] your offer of a lift.', 'Always with a person and an offer: <em>take someone up on an offer / invitation</em>.'),
        pv('be taken aback', 'to be shocked or surprised', 'I was completely [[taken aback]] by her rude reply.', 'Hook: surprise pushes you backwards.'),
        pv('take it out on', 'to treat someone badly because you are upset with something else', 'Don\'t [[take it out on]] me; I didn\'t cause the problem.', 'Your anger is released onto the wrong person.'),
        pv('take away', 'to subtract; to remove something from a total or place', 'If you [[take away]] the tax, the price is £50.', 'Separable. Noun <em>a takeaway</em> (BrE) = hot food you carry home. Compare <em>take out</em>.'),
        pv('take through', 'to guide someone step by step', 'Could you [[take]] me [[through]] the procedure again?', 'You go with the person from start to finish.')
      ]
    },
    {
      id: 'put', title: 'Phrasal verbs with PUT', short: 'Placing, expressing, tolerating, organising.',
      section: 'Phrasal verbs',
      idea: `<p><em>Put</em> is about <strong>placing something somewhere</strong>. Extended: you place <em>an idea</em> in someone\'s mind (put across, put forward), you place <em>a thing</em> aside for later (put aside, put away), or you place <em>a cause</em> on a reason (put down to). Picture the movement and the meaning follows.</p>`,
      cards: [
        pv('put across', 'to express an idea so that it is understood', 'She [[put across]] her point of view very clearly.', 'You place the idea across the gap to the listener.'),
        pv('put aside', 'to save for later; to ignore differences', 'They [[put aside]] their differences to work together.', 'You place it to one side.'),
        pv('put down to', 'to think that something is caused by', 'I [[put]] his bad mood [[down to]] tiredness.', 'You write the cause down in the "reason" column.'),
        pv('put forward', 'to suggest for consideration', 'Several candidates were [[put forward]] for the job.', 'You place the idea in front of the group.'),
        pv('put on', 'to gain weight; to organise (a show)', 'The school [[puts on]] a play every Christmas.', 'You place the show on a stage.'),
        pv('put out', 'to extinguish; to inconvenience', 'Firefighters [[put out]] the blaze in an hour.', 'You push the flame out of existence.'),
        pv('put together', 'to assemble; to prepare', 'She [[put together]] a convincing case for reform.', 'You place the pieces together.'),
        pv('put through', 'to connect by telephone', 'Could you [[put]] me [[through]] to the manager, please?', 'The call passes through the switchboard.'),
        pv('put up', 'to provide someone with a bed for the night', 'Friends offered to [[put]] us [[up]] for the night.', 'Separable: <em>put us up</em>. Other senses: <em>put up a tent / put up prices</em>.'),
        pv('put away', 'to return something to its proper place (also: to save money regularly)', 'Please [[put]] your toys [[away]] before bed.', 'Separable: <em>put them away</em>. For money it is informal: <em>put away £50 a month</em>.'),
        pv('put down', 'to criticise or humiliate; to suppress by force', 'He is always [[putting]] his colleagues [[down]].', 'You lower their status.')
      ]
    },
    {
      id: 'go-come', title: 'Phrasal verbs with GO and COME', short: 'Happening, agreeing, doing without, arriving at.',
      section: 'Phrasal verbs',
      idea: `<p><em>Go</em> often suggests <strong>moving away or proceeding</strong> (go along with, go on to, go off) while <em>come</em> suggests <strong>arriving or approaching</strong> (come round, come forward, come about). Use this contrast as a hook only: <em>go off</em> = something leaves its normal state (food goes bad, an alarm sounds), <em>come down to</em> = what remains when everything else is removed.</p>`,
      cards: [
        pv('go about', 'to start dealing with a task or problem', 'How should we [[go about]] solving this?', 'You move around the job, looking for a way in.'),
        pv('go along with', 'to accept an idea or plan', 'I\'ll [[go along with]] your plan, but I have doubts.', 'You move in the same direction as someone else.'),
        pv('go for', 'to choose; to attack; to try to get', 'I think I\'ll [[go for]] the fish, please.', 'You head towards your choice.'),
        pv('go in for', 'to like or regularly take part in (often used in negatives)', 'I don\'t really [[go in for]] extreme sports.', 'Three-part, inseparable. Also: <em>go in for</em> a competition = enter it.'),
        pv('go off', 'to explode or ring; to become bad (food); to stop liking', 'The alarm [[went off]] at 3 a.m.', 'It leaves its normal state.'),
        pv('go without', 'to manage without something needed', 'During the war many families had to [[go without]] food.', '<em>Without</em> is the key: you continue in its absence.'),
        pv('come about', 'to happen or develop (used with how and why)', 'How did the misunderstanding [[come about]]?', 'Mostly in questions: <em>How did it come about?</em> Neutral-formal synonym of <em>happen</em>.'),
        pv('come down to', 'to be the most important factor', 'In the end it all [[comes down to]] money.', 'After everything is stripped away, this is left.'),
        pv('come round', 'to change your opinion; to regain consciousness; to visit', 'He\'ll [[come round]] to the idea eventually.', 'You turn round to face a new direction.'),
        pv('come up against', 'to face a problem or opposition', 'We [[came up against]] strong resistance from local people.', 'You arrive and meet a barrier.'),
        pv('come forward', 'to offer information or help publicly', 'Police asked witnesses to [[come forward]].', 'You step forward out of the crowd.'),
        pv('come into', 'to inherit; to receive (money)', 'She [[came into]] a fortune when her uncle died.', 'Common chunk: <em>come into money</em>. Other uses (<em>come into view</em>) have different meanings.'),
        pv('go on to', 'to do something next, after finishing something else', 'She [[went on to]] win a Nobel Prize.', 'You proceed to the next stage of your life.')
      ]
    },
    {
      id: 'look-turn', title: 'Phrasal verbs with LOOK and TURN', short: 'Watching, respecting, changing direction and state.',
      section: 'Phrasal verbs',
      idea: `<p><em>Look</em> is about <strong>direction of attention</strong>: <em>after</em> = care for, <em>forward to</em> = attention pointing into the future, <em>down on</em> = attention from above (superiority). <em>Turn</em> is about <strong>changing direction or state</strong>: <em>into</em> = becoming something else, <em>against</em> = becoming an enemy, <em>away</em> = refusing entry.</p>`,
      cards: [
        pv('look after', 'to take care of', 'Who will [[look after]] the cat while you are away?', 'Your eyes follow the person or thing to keep it safe.'),
        pv('look forward to', 'to await with pleasure', 'I\'m really [[looking forward to]] the holidays.', 'Your attention points to the future. Followed by -ing: <em>looking forward to seeing you</em>.'),
        pv('look down on', 'to consider inferior', 'She [[looks down on]] people who haven\'t been to university.', 'Your eyes are literally above them.'),
        pv('look out for', 'to watch carefully in order to find or avoid', '[[Look out for]] pickpockets in crowded areas.', 'You stay alert with your eyes outwards.'),
        pv('look over', 'to examine quickly', 'Could you [[look over]] my essay before I send it?', 'Your eyes pass over the surface.'),
        pv('look up', 'to search for a fact in a book, list or online; to improve', 'I had to [[look]] the word [[up]] in a dictionary.', 'Separable for searching: <em>look it up</em>. Intransitive: <em>Things are looking up</em> = improving.'),
        pv('turn against', 'to become hostile towards', 'His friends [[turned against]] him after the scandal.', 'You turn your face and body to oppose.'),
        pv('turn away', 'to refuse to let someone in or help', 'Hundreds of fans were [[turned away]] at the door.', 'You turn them away from the entrance.'),
        pv('turn into', 'to change and become', 'The small village has [[turned into]] a tourist trap.', 'Into = entering a new state.'),
        pv('turn to', 'to go to someone for help', 'When she was in trouble, she [[turned to]] her brother.', 'You face towards the person who can help.'),
        pv('turn in', 'to go to bed (informal); to hand something in', 'I\'m exhausted; I think I\'ll [[turn in]] early.', 'Informal for "go to bed". <em>Turn someone in</em> = hand them to the police; <em>turn in work</em> = submit it.'),
        pv('turn over', '(of a business) to have sales of a given amount; to flip', 'The company [[turned over]] £3 million last year.', 'Noun <em>turnover</em> = total sales. Hook: money "turns over" through the business.')
      ]
    },
    {
      id: 'make-bring-hold', title: 'Phrasal verbs with MAKE, BRING, HOLD, KEEP', short: 'Creating, delivering, delaying, restraining.',
      section: 'Phrasal verbs',
      idea: `<p>Four verbs, four ideas. <em>Make</em> = creating or inventing (make up, make out). <em>Bring</em> = causing something to come or change (bring forward, bring down). <em>Hold</em> = keeping in place (hold back, hold up). <em>Keep</em> = staying in a state (keep to, keep on). Grouping by main verb helps you reuse the particle logic you already know.</p>`,
      cards: [
        pv('make out', 'to see or understand with difficulty; to claim falsely', 'I couldn\'t [[make out]] what she was saying over the noise.', 'You produce meaning from unclear signals.'),
        pv('make up', 'to invent; to form; to reconcile', 'He [[made up]] an excuse to leave early.', 'You create something from nothing.'),
        pv('make do with', 'to accept something less than ideal', 'We\'ll have to [[make do with]] sandwiches tonight.', 'You "do" the job with what you have.'),
        pv('hold back', 'to stop yourself; to prevent from advancing', 'She couldn\'t [[hold back]] her tears.', 'You keep something behind a line.'),
        pv('hold up', 'to delay; to rob; to remain strong', 'A serious accident [[held up]] traffic for hours.', 'You keep things up in the air, not moving.'),
        pv('hold out', 'to last; to resist; to offer', 'How long can the food supplies [[hold out]]?', 'You continue to stand firm.'),
        pv('hold on to', 'to keep something; to grip tightly', 'Try to [[hold on to]] your savings.', 'Your hands stay on it.'),
        pv('bring down', 'to cause to fall; to reduce', 'The scandal [[brought down]] the government.', 'You cause a downward movement.'),
        pv('bring forward', 'to move to an earlier time', 'The meeting has been [[brought forward]] to Tuesday.', 'You pull it towards the present.'),
        pv('bring out', 'to reveal a quality; to release for sale', 'Stress can [[bring out]] the worst in people.', 'Separable. Also <em>bring out</em> a book or a product = publish or launch it.'),
        pv('bring off', 'to succeed in doing something difficult', 'Nobody believed the plan would work, but they [[brought it off]].', 'You carry the difficult task away successfully.'),
        pv('keep to', 'to follow (a rule or plan); to stay within', 'Please [[keep to]] the timetable.', 'You do not leave the path.'),
        pv('keep on', 'to continue', 'She [[kept on]] trying despite repeated failure.', '<em>On</em> = continuing. Followed by -ing.'),
        pv('keep from', 'to stop yourself (or someone) doing something', 'I couldn\'t [[keep from]] laughing.', 'Followed by -ing. Usually negative: <em>couldn\'t keep from smiling</em>.')
      ]
    },
    {
      id: 'separable', title: 'Separable vs inseparable verbs', short: 'The pronoun rule in twelve examples.',
      section: 'Phrasal verbs',
      idea: `<p><strong>The rule.</strong> A phrasal verb with an object is either <em>separable</em> (the object can go between verb and particle) or <em>inseparable</em> (it cannot). With a <strong>noun</strong> you can often choose: <em>hand in the form / hand the form in</em>. With a <strong>pronoun</strong> a separable verb <em>must</em> be split: <em>hand it in</em> (never <em>hand in it</em>). Inseparable verbs never split: <em>deal with it</em>. Verbs with two particles (look forward to, put up with) are always inseparable.</p>`,
      cards: [
        pv('switch off', 'to stop a machine or light by pressing a button', 'Please [[switch]] the lights [[off]] when you leave.', 'Separable: with a pronoun, <em>switch them off</em>, never <em>switch off them</em>.'),
        pv('throw away', 'to get rid of as rubbish', 'You should never [[throw]] good food [[away]].', 'Separable: <em>throw it away</em>.'),
        pv('hand in', 'to give work or a document to someone in authority', 'Students must [[hand]] their essays [[in]] by Friday.', 'Separable: <em>hand them in</em>.'),
        pv('try on', 'to wear clothing to see if it fits', 'She [[tried]] the jacket [[on]] before buying it.', 'Separable: <em>try it on</em>.'),
        pv('pick up', 'to collect; to learn casually', 'I\'ll [[pick]] the kids [[up]] from school.', 'Separable: <em>pick them up</em>. Also <em>pick up</em> a language or an accent = learn it without formal study.'),
        pv('fill in', 'to complete a form', 'Could you [[fill]] this form [[in]], please?', 'Separable: <em>fill it in</em>. British English; American English prefers <em>fill out</em>.'),
        pv('tidy up', 'to make a place neat', 'Please [[tidy]] your room [[up]] before dinner.', 'Separable: <em>tidy it up</em>.'),
        pv('mix up', 'to confuse one thing with another', 'I always [[mix]] the twins [[up]].', 'Separable: <em>mix them up</em>.'),
        pv('deal with', 'to handle a problem or person', 'The manager will [[deal with]] the complaint.', 'Inseparable: <em>deal with it</em>. The object always follows the whole verb.'),
        pv('cope with', 'to manage a difficult situation successfully', 'How do you [[cope with]] so much stress?', 'Inseparable: <em>cope with it</em>.'),
        pv('rely on', 'to depend on with confidence', 'You can always [[rely on]] Marta.', 'Inseparable: <em>rely on her</em>.'),
        pv('stand for', 'to represent; to tolerate', 'What does the abbreviation NGO [[stand for]]?', 'Inseparable. The "tolerate" sense is mostly negative: <em>I won\'t stand for it</em>.')
      ]
    },

    /* ===================== COLLOCATIONS AND PATTERNS ===================== */
    {
      id: 'dep-prepositions', title: 'Dependent prepositions', short: 'Adjective, verb or noun + the correct preposition.',
      section: 'Collocations and patterns',
      idea: `<p>Prepositions after adjectives, verbs and nouns are <strong>not translatable from Spanish</strong>: <em>depend on</em> (not <em>depend of</em>), <em>interested in</em>, <em>a solution to</em> (not <em>of</em>). Learn them as fixed chunks, ideally with the noun or adjective family: <em>solution / answer / key / reaction / response + to</em>, <em>increase / rise / fall / decrease + in</em>. After the preposition comes a noun or an -ing form, never an infinitive.</p>`,
      cards: [
        co('be capable of', 'to have the ability to do something', 'She is [[capable of]] running a marathon in under four hours.', 'Followed by -ing: <em>capable of doing</em>.'),
        co('blame someone for', 'to say that a person is responsible for something bad', 'Don\'t [[blame]] me [[for]] the mistake.', 'Pattern: blame + person + for + thing. The alternative is <em>blame something on someone</em>.'),
        co('a solution to', 'an answer to a problem', 'There is no easy [[solution to]] this problem.', 'Noun + <em>to</em> for answers and reactions: solution, answer, key, response, reaction.'),
        co('be sceptical about', 'to doubt that something is true or useful', 'Many experts remain [[sceptical about]] the benefits.', 'Also <em>sceptical of</em>. Doubt is directed at the topic.'),
        co('be prone to', 'to be likely to suffer from something bad', 'This region is [[prone to]] flooding.', 'Always followed by something negative: prone to error / injury / accidents. Noun or -ing after it.'),
        co('be committed to', 'to be loyal and dedicated to a cause', 'The company is [[committed to]] reducing waste.', 'Here <em>to</em> is a preposition, so -ing follows.'),
        co('comply with', 'to obey a rule or law', 'All employees must [[comply with]] safety regulations.', 'Verb + with: comply, agree, cope, deal.'),
        co('an increase in', 'a rise in the amount of something', 'There has been a sharp [[increase in]] house prices.', 'Change nouns take <em>in</em> for the thing, <em>of</em> for the size: <em>an increase of 5%</em>.'),
        co('a demand for', 'a need or wish for something to be provided', 'There is a growing [[demand for]] renewable energy.', 'Also <em>a need for</em>, <em>a reason for</em>, <em>a taste for</em>.'),
        co('be oblivious to', 'not to notice or care about', 'He was completely [[oblivious to]] the danger.', 'Also <em>oblivious of</em>. Formal.'),
        co('object to', 'to feel or express opposition to', 'Some residents [[object to]] the new road.', 'Here <em>to</em> is a preposition: <em>object to being asked</em>.'),
        co('be subject to', 'to be affected by (rules, change, possibility)', 'All prices are [[subject to]] change without notice.', 'Formal; used in contracts.'),
        co('be entitled to', 'to have the legal right to', 'Employees are [[entitled to]] four weeks of paid leave.', 'Entitled to + noun (<em>a refund</em>). Also entitled to + infinitive: <em>entitled to claim</em>.'),
        co('be familiar with', 'to know something well', 'Are you [[familiar with]] this software?', 'Contrast: <em>familiar to</em> = known by someone: <em>The name is familiar to me</em>.')
      ]
    },
    {
      id: 'word-patterns', title: 'Delexical verbs: make, do, take, have, give', short: 'Common verbs that take their meaning from the noun.',
      section: 'Collocations and patterns',
      idea: `<p>In these expressions the verb is nearly empty (<em>delexical</em>): the noun carries the meaning. So you must learn which verb goes with which noun. Loose guide: <strong>make</strong> = create or produce a result (decision, effort, mistake), <strong>do</strong> = activity or work (research, harm, justice), <strong>take</strong> = action or choice (advantage, a stand, precautions), <strong>have</strong> = experience or state (an impact, second thoughts), <strong>give</strong> = offer or produce (priority, rise to, a talk).</p>`,
      cards: [
        co('make a decision', 'to choose after thinking', 'It\'s time to [[make a decision]] about your future.', '<em>Make a decision</em> is the safest form. British English also accepts <em>take a decision</em> (common in business).'),
        co('do research', 'to study a subject carefully', 'She has been [[doing research]] into rare diseases.', '<em>Research</em> is uncountable: never <em>a research</em>.'),
        co('take a stand', 'to state a firm opinion or take action publicly', 'The mayor refused to [[take a stand]] on the issue.', 'You "stand" visibly for a position.'),
        co('have an impact on', 'to influence strongly', 'Social media [[has an impact on]] teenagers\' self-esteem.', 'Also <em>have an effect / influence on</em>.'),
        co('give priority to', 'to treat as most important', 'The hospital must [[give priority to]] emergency cases.', '<em>Priority</em> is normally singular in this sense.'),
        co('make headway', 'to make progress, especially slowly', 'We are finally [[making headway]] with the negotiations.', 'A ship makes headway when it moves forward.'),
        co('do justice to', 'to show or treat something in a way that shows its full quality', 'The photo doesn\'t [[do justice to]] the view.', 'You "do" what is fair for it.'),
        co('take advantage of', 'to use an opportunity; to use someone unfairly', 'You should [[take advantage of]] the free training.', 'Context decides positive or negative meaning.'),
        co('have a tendency to', 'to be likely to do something habitually', 'He [[has a tendency to]] exaggerate.', 'Also <em>tend to</em>.'),
        co('give rise to', 'to cause', 'The report [[gave rise to]] serious concern.', 'Formal; things "rise" out of their cause.'),
        co('make a contribution to', 'to help achieve something', 'Volunteers [[make]] a valuable [[contribution to]] the community.', 'Contribution + <em>to</em>, not <em>for</em>. Also <em>contribute to</em> + noun.'),
        co('do harm', 'to cause damage', 'A few negative comments won\'t [[do]] any [[harm]].', 'Contrast: <em>do good</em>, <em>do damage</em>.'),
        co('take precautions', 'to act carefully to avoid danger', 'Travellers should [[take precautions]] against malaria.', 'Plural: <em>precautions</em>.'),
        co('have second thoughts', 'to start to doubt a decision', 'She began to [[have second thoughts]] about moving abroad.', 'Your first thought is reconsidered.')
      ]
    },
    {
      id: 'adverb-adjective', title: 'Strong adverb + adjective pairs', short: 'Natural intensifiers and adjective + noun partners.',
      section: 'Collocations and patterns',
      idea: `<p>Intensifiers are not interchangeable: you can be <em>bitterly disappointed</em> but not <em>bitterly happy</em>. Most strong adverbs have an <strong>emotional or physical colour</strong> that matches the adjective (bitterly = sad/cold, blatantly = something bad you can\'t miss, painfully = uncomfortable truth). Learn the pair as one unit, and add adjective + noun pairs the same way.</p>`,
      cards: [
        co('bitterly disappointed', 'extremely sad because hopes were not met', 'Fans were [[bitterly disappointed]] by the result.', '<em>Bitterly</em> pairs with negative feelings: cold, resentful, ashamed.'),
        co('painfully shy', 'so shy that it is uncomfortable', 'As a child, he was [[painfully shy]].', '<em>Painfully</em> also goes with slow, obvious, aware.'),
        co('blatantly obvious', 'so clear that it is offensive or shameless', 'It was [[blatantly obvious]] that he was lying.', 'Usually for bad behaviour: blatant lie, blatant disregard.'),
        co('strictly confidential', 'to be kept absolutely secret', 'This information is [[strictly confidential]].', '<em>Strictly</em> = with no exceptions.'),
        co('acutely aware', 'extremely conscious of something, often a problem', 'We are [[acutely aware]] of the risks.', 'Acute = sharp, sudden, intense.'),
        co('vastly different', 'extremely different; different by a great degree', 'The two versions are [[vastly different]].', '<em>Vastly</em> also pairs with comparatives: vastly superior, vastly improved.'),
        co('perfectly natural', 'entirely normal and expected', 'It\'s [[perfectly natural]] to feel nervous before an exam.', 'Perfectly + fine, natural, reasonable.'),
        co('sheer coincidence', 'nothing but chance', 'It was [[sheer coincidence]] that we met.', '<em>Sheer</em> = complete, with nothing else. Used before nouns only.'),
        co('a heated debate', 'an argument with strong emotions', 'The proposal caused a [[heated debate]] in parliament.', 'The temperature of feelings rises.'),
        co('a vicious circle', 'a bad situation that keeps causing itself', 'Poverty and poor health form a [[vicious circle]].', 'A loop with no exit.'),
        co('a steep learning curve', 'a period when you must learn a lot very fast', 'The new software involves a [[steep learning curve]].', 'Used for something hard at first. (Technically a steep curve means fast learning; the idiom stresses the effort.)'),
        co('a growing body of evidence', 'more and more proof', 'There is a [[growing body of evidence]] linking sugar to illness.', 'Academic writing phrase.'),
        co('a long-standing tradition', 'a custom that has existed for many years', 'Football is a [[long-standing tradition]] in this town.', 'Also long-standing: dispute, friendship, problem.'),
        co('bitterly cold', 'extremely cold in an unpleasant way', 'The wind was [[bitterly cold]] that morning.', 'Physical use of <em>bitterly</em>.')
      ]
    },
    {
      id: 'confusing-words', title: 'Often-confused words', short: 'Pairs that look alike but work differently.',
      section: 'Collocations and patterns',
      idea: `<p>Cambridge loves near-synonyms. The trick is to learn each word <strong>inside a chunk</strong> and to notice the contrast: <em>affect</em> is a verb but <em>effect</em> is a noun; <em>lend</em> goes out but <em>borrow</em> comes in; <em>raise</em> needs an object while <em>rise</em> doesn\'t. The meaning on the front of each card tells you the contrast; the example shows the chunk.</p>`,
      cards: [
        co('have an effect on', 'noun: the result or influence; the partner verb is <em>affect</em>', 'Sleep loss can [[have an effect on]] memory.', 'Effect = noun ("an effect"). Note: <em>effect a change</em> (verb) is formal and rare.'),
        co('adversely affect', 'verb: to influence, usually negatively (its noun form is different)', 'Noise can [[adversely affect]] concentration.', 'Affect = verb ("it affects me").'),
        co('economic growth', 'relating to the economy of a country (not about saving money)', 'The country is expecting strong [[economic growth]].', 'Economic = about the economy (economic policy, crisis, growth). The school subject is <em>economics</em>.'),
        co('an economical car', 'cheap to run; not wasteful (not about the economy)', 'A small engine makes for [[an economical car]].', 'Economical = saving money or resources. Compare <em>economic</em>, which is about the economy.'),
        co('lend someone money', 'to give something for a short time, expecting it to be returned', 'Could you [[lend]] me ten pounds until Friday?', 'Lend: it leaves you. Pattern: lend someone something.'),
        co('borrow from', 'to take and use something with the plan of returning it', 'I [[borrowed]] a book [[from]] the library.', 'Borrow: it comes to you. You borrow <em>from</em>, not <em>to</em>.'),
        co('raise a question', 'to bring up a subject; to lift (needs an object)', 'The accident has [[raised a question]] about safety standards.', 'Raise is transitive: someone or something raises a question. Do not use <em>rise</em> here.'),
        co('a rise in prices', 'an increase in the level of something (noun); the verb is used with no object', 'There has been a steady [[rise in prices]].', 'Rise: irregular (rise, rose, risen); no object. Compare <em>raise, raised, raised</em> (needs an object).'),
        co('the principal reason', 'main, most important (the school head is also <em>principal</em>)', 'The [[principal reason]] for the delay was the weather.', 'Principal = main. <em>Principle</em> = rule or belief.'),
        ex('imply', 'to suggest something without saying it directly (the speaker does this)', 'Are you [[implying]] that I am lying?', 'Imply = the speaker suggests. Infer = the listener concludes. Followed by <em>that</em>.'),
        ex('infer', 'to reach a conclusion from evidence (the listener does this)', 'From her silence I [[inferred]] that she was angry.', 'Infer = the listener concludes. Noun: <em>inference</em>. Often <em>infer from</em>.'),
        co('a sensible decision', 'practical and showing good judgement', 'Wearing a helmet is [[a sensible decision]].', 'Sensible = reasonable. Not the same as <em>sensitive</em>, which is about feelings.'),
        co('a sensitive issue', 'easily hurt, or needing careful handling', 'Religion is a [[sensitive issue]] in this region.', 'Sensitive = about feelings or delicacy.'),
        co('a historic occasion', 'important enough to be remembered in history', 'It was [[a historic occasion]] for the country.', 'Historic = important. Historical = connected with the past.')
      ]
    },

    /* ===================== IDIOMS AND EXPRESSIONS ===================== */
    {
      id: 'idioms-money-time', title: 'Idioms: money, time and effort', short: 'Being short of cash, racing the clock, working hard.',
      section: 'Idioms and expressions',
      idea: `<p>Money and time idioms use everyday pictures: <strong>tight budgets</strong> (making ends meet, on a shoestring), <strong>too much cost</strong> (pay through the nose, break the bank), and <strong>time pressure</strong> (against the clock, at the eleventh hour). Each has a picture: recall the picture and you recall the meaning. Use them sparingly in writing but freely in speaking.</p>`,
      cards: [
        id('make ends meet', 'to earn just enough money to live on', 'With two jobs, she barely [[makes ends meet]].', 'Picture: the two ends of your income and expenses barely touch.'),
        id('on a shoestring', 'with very little money', 'They ran the whole campaign [[on a shoestring]].', 'A shoestring is thin and cheap: a very small budget.'),
        id('pay through the nose', 'to pay far too much', 'We had to [[pay through the nose]] for a hotel room.', 'Hook: a painful, unpleasant payment.'),
        id('break the bank', 'to cost more than you can afford', 'A weekend away won\'t exactly [[break the bank]].', 'Usually used in the negative: it won\'t be too expensive.'),
        id('cut corners', 'to do something cheaply or quickly by leaving out steps', 'The builders [[cut corners]] and the roof leaked.', 'Picture: you cut across the corner instead of walking the whole route.'),
        id('in the nick of time', 'just before it is too late', 'The ambulance arrived [[in the nick of time]].', 'Fixed phrase; <em>nick</em> here means the exact moment. Hook: a tiny gap before the deadline.'),
        id('against the clock', 'trying to finish before time runs out', 'Rescuers were working [[against the clock]].', 'You race a clock as if it were an opponent.'),
        id('at the eleventh hour', 'at the last possible moment', 'The deal was saved [[at the eleventh hour]].', 'Eleven is nearly twelve, the end.'),
        id('burn the candle at both ends', 'to work or party until you are exhausted', 'He\'s been [[burning the candle at both ends]] all term.', 'A candle lit at both ends is used up twice as fast.'),
        id('save for a rainy day', 'to keep money for future problems', 'It\'s wise to [[save for a rainy day]].', 'A "rainy day" = a time of trouble.'),
        id('from scratch', 'from the very beginning, using nothing that already exists', 'They built the company [[from scratch]].', 'Hook: you start at the very first line with nothing prepared. Also <em>cook from scratch</em>.'),
        id('kill time', 'to do something while waiting', 'We played cards to [[kill time]] at the airport.', 'Time is seen as an enemy that passes slowly.'),
        id('a drop in the ocean', 'a very small amount compared with what is needed', 'The donation was just [[a drop in the ocean]].', 'One drop against a whole ocean.'),
        id('bend over backwards', 'to make a great effort to help', 'The staff [[bent over backwards]] to make us comfortable.', 'A hard, uncomfortable physical effort.')
      ]
    },
    {
      id: 'idioms-feelings', title: 'Idioms: feelings, relationships and opinions', short: 'Delight, irritation, agreement, hesitation.',
      section: 'Idioms and expressions',
      idea: `<p>English talks about emotion with <strong>body, weather and physical position</strong>: <em>on cloud nine</em> (high above), <em>down in the dumps</em> (low), <em>cold feet</em> (fear), <em>get something off your chest</em> (relief). Sort the idioms into two mood groups (up or down) and one relationship group (agreement or friction) and they are easier to recall.</p>`,
      cards: [
        id('over the moon', 'extremely happy', 'She was [[over the moon]] about the news.', 'High = happy. Compare <em>on cloud nine</em>.'),
        id('down in the dumps', 'sad and depressed', 'He\'s been [[down in the dumps]] since the break-up.', 'Low = unhappy.'),
        id('on cloud nine', 'blissfully happy', 'After the wedding, they were [[on cloud nine]].', 'You float above the ground.'),
        id('get cold feet', 'to become too nervous to go on with a plan', 'He [[got cold feet]] the night before the wedding.', 'Fear makes your feet feel cold.'),
        id('have a chip on one\'s shoulder', 'to feel resentful about a past injustice', 'He\'s got [[a chip on his shoulder]] about not going to university.', 'Hook: you carry a grievance you are ready to defend.'),
        id('drive someone up the wall', 'to make someone extremely irritated or frustrated', 'His constant humming [[drives]] me [[up the wall]].', 'Informal. Stronger than <em>get on someone\'s nerves</em>; hook: you are pushed to the edge.'),
        id('get on someone\'s nerves', 'to annoy someone by doing something repeatedly', 'The noise from next door is [[getting on]] my [[nerves]].', 'Hook: nerves = the sensitive parts of your body. Milder than <em>drive someone up the wall</em>.'),
        id('see eye to eye', 'to agree fully', 'We don\'t always [[see eye to eye]] on politics.', 'You look at the same thing from the same level.'),
        id('hit it off', 'to become friends quickly', 'They [[hit it off]] straight away.', 'Informal. Two people hit it off, or you hit it off <em>with</em> someone. Not used in the continuous.'),
        id('be on the same wavelength', 'to think in a similar way', 'We\'re [[on the same wavelength]] when it comes to design.', 'Like two radios tuned to one signal.'),
        id('give someone the cold shoulder', 'to ignore someone on purpose', 'Since the argument, she\'s been [[giving]] me [[the cold shoulder]].', 'You show no warmth.'),
        id('sit on the fence', 'to refuse to choose between two sides', 'The minister continues to [[sit on the fence]].', 'You are on neither side of the wall.'),
        id('at the end of one\'s tether', 'unable to cope any longer', 'The new parents were [[at the end of their tether]].', 'Picture: an animal at the end of its rope.'),
        id('get something off one\'s chest', 'to say what has been worrying you', 'I feel better now that I\'ve [[got]] it [[off my chest]].', 'You remove a weight from your chest.')
      ]
    },
    {
      id: 'register', title: 'Formal vs informal: register', short: 'Formal expressions for essays, reports and emails.',
      section: 'Idioms and expressions',
      idea: `<p>C1 writing needs the right <strong>register</strong>: the same idea can be phrased informally in speech and formally in reports, letters and academic essays. Each card gives you the informal equivalent on the front, and you must produce the formal chunk. Rule of thumb: formal English prefers <em>longer, Latin-based words</em> and <em>noun phrases</em>; informal English prefers short verbs and phrasal verbs.</p>`,
      cards: [
        ex('commence', 'formal version of "begin" or "start"', 'The ceremony will [[commence]] at noon.', 'Latin-based, same job as <em>start</em>.'),
        ex('in the absence of', 'formal way of saying "without" or "if there is no"', '[[In the absence of]] clear evidence, no action was taken.', 'Followed by a noun.'),
        ex('be inclined to', 'formal or careful way of saying "tend to" or "usually think"', 'I am [[inclined to]] agree with the committee.', 'Softens an opinion.'),
        ex('endeavour to', 'formal way of saying "try to"', 'We [[endeavour to]] reply to all queries within 24 hours.', 'Corporate letters. American spelling: endeavor.'),
        ex('in excess of', 'formal way of saying "more than"', 'Fines [[in excess of]] £500 may be imposed.', 'Used with numbers and amounts.'),
        ex('prior to', 'formal way of saying "before"', 'Please arrive 30 minutes [[prior to]] the event.', 'Followed by a noun or -ing form.'),
        ex('with a view to', 'formal way of saying "in order to" or "aiming to"', 'She studied law [[with a view to]] becoming a judge.', 'Here <em>to</em> is a preposition: use -ing.'),
        ex('notwithstanding', 'formal way of saying "in spite of"', '[[Notwithstanding]] the risks, the project went ahead.', 'Legal English; can also follow the noun.'),
        ex('be in a position to', 'formal way of saying "be able to"', 'We are not yet [[in a position to]] comment.', 'Polite and careful: used in diplomacy.'),
        ex('on the part of', 'formal way of saying "from" or "by" (a person or group)', 'There was little interest [[on the part of]] the public.', 'Places the responsibility on a person.'),
        ex('ascertain', 'formal way of saying "find out"', 'Officials are trying to [[ascertain]] the cause of the fire.', 'Reports and legal language.'),
        ex('in the vicinity of', 'formal way of saying "near"', 'There are several schools [[in the vicinity of]] the station.', 'Rarely used in speech.'),
        ex('be obliged to', 'formal way of saying "have to"', 'Employers are [[obliged to]] provide a safe workplace.', 'Also <em>be required to</em>.'),
        ex('subsequent to', 'formal way of saying "after"', '[[Subsequent to]] the meeting, a report was published.', 'Compare <em>prior to</em>.')
      ]
    },

    /* ===================== TOPIC VOCABULARY ===================== */
    {
      id: 'topic-work', title: 'Topic: Work and careers', short: 'Language for jobs, workplaces and career choices.',
      section: 'Topic vocabulary',
      idea: `<p>Work is a favourite topic in the Speaking and Writing papers. Instead of memorising words such as <em>job</em> and <em>work</em>, build a bank of <strong>chunks</strong> in three areas: <em>conditions</em> (flexible hours, job security), <em>progress</em> (climb the ladder, glass ceiling) and <em>problems</em> (burn out, snowed under). A varied set of chunks is exactly what raises a vocabulary score.</p>`,
      cards: [
        co('work-life balance', 'the right division between your job and your private life', 'Many young people prefer a good [[work-life balance]] to a high salary.', 'Usually <em>a good work-life balance</em>. Hyphenated noun phrase; do not say "balance between life and job".'),
        id('climb the career ladder', 'to progress to more senior jobs', 'It took her ten years to [[climb the career ladder]].', 'A ladder = grades of seniority.'),
        co('job security', 'the certainty that you will keep your job', 'Public jobs offer more [[job security]].', 'Uncountable: never "a job security". Compare <em>job satisfaction</em>.'),
        co('flexible working hours', 'a system that lets employees choose when they work', '[[Flexible working hours]] can improve productivity.', 'Plural <em>hours</em>. Also <em>flexitime</em> (British English).'),
        co('a heavy workload', 'a large amount of work to do', 'Teachers often complain about [[a heavy workload]].', 'Heavy = "weight" of tasks.'),
        id('the glass ceiling', 'an invisible barrier stopping women or minorities from top jobs', 'Many women still hit [[the glass ceiling]].', 'You can see the top jobs, but a transparent barrier stops you.'),
        pv('burn out', 'to become exhausted through too much work', 'Doctors often [[burn out]] after years of night shifts.', 'A fire that uses up all its fuel. Noun: <em>burnout</em>.'),
        pv('lay off', 'to dismiss workers because there is no work for them', 'The factory [[laid off]] 200 workers.', 'A business decision, not the workers\' fault. British English also says <em>make redundant</em>.'),
        pv('step down', 'to resign from an important position', 'The chairman will [[step down]] next month.', 'You move down from the post.'),
        ex('hand in one\'s notice', 'to formally say that you are leaving your job', 'She [[handed in her notice]] last Friday.', 'You give the notice to the manager.'),
        co('juggle commitments', 'to try to manage several responsibilities at once', 'Parents often [[juggle commitments]] between work and children.', 'Like a juggler keeping several balls in the air.'),
        id('be snowed under', 'to have too much work', 'I can\'t come; I\'m [[snowed under]] at the moment.', 'Buried by work like snow.')
      ]
    },
    {
      id: 'topic-environment', title: 'Topic: Environment', short: 'Climate, pollution, resources and solutions.',
      section: 'Topic vocabulary',
      idea: `<p>Environmental essays need two kinds of language: <strong>describing problems</strong> (irreversible damage, endangered species) and <strong>proposing solutions</strong> (cut emissions, phase out, renewable energy). Aim to use one problem chunk and one solution chunk in each paragraph.</p>`,
      cards: [
        co('carbon footprint', 'the amount of CO2 produced by a person or activity', 'Flying frequently increases your [[carbon footprint]].', 'Footprint = the mark you leave.'),
        co('renewable energy', 'power from sources that do not run out', 'Wind and solar are forms of [[renewable energy]].', 'Uncountable. Plural <em>renewables</em> also used.'),
        co('fossil fuels', 'coal, oil and gas', 'Governments must reduce dependence on [[fossil fuels]].', 'Usually plural. Dependent preposition: <em>dependence on</em>.'),
        co('endangered species', 'animals or plants at risk of extinction', 'The tiger is an [[endangered species]].', 'Endanger = put in danger.'),
        co('cut emissions', 'to reduce gas released into the atmosphere', 'Countries have promised to [[cut emissions]] by 2030.', 'Formal alternative: <em>reduce emissions</em>.'),
        co('irreversible damage', 'harm that cannot be undone', 'Deforestation causes [[irreversible damage]].', 'Reverse + <em>-ible</em>; the prefix <em>ir-</em> means "not". Opposite: reversible.'),
        co('sustainable development', 'growth that does not use up resources for the future', 'The summit focused on [[sustainable development]].', 'Sustain = keep going.'),
        pv('phase out', 'to stop using something gradually', 'The government plans to [[phase out]] petrol cars.', 'You remove it in stages ("phases").'),
        pv('wipe out', 'to destroy completely', 'Hunting has [[wiped out]] many species.', 'Like wiping a board clean.'),
        co('a throwaway culture', 'a society in which things are used once and discarded', 'We live in [[a throwaway culture]].', 'Compare <em>disposable</em>.'),
        co('take drastic action', 'to do something extreme to deal with a problem', 'We must [[take drastic action]] before it is too late.', 'Drastic = severe and immediate.'),
        co('dispose of waste', 'to get rid of rubbish', 'Factories must [[dispose of waste]] safely.', 'Dispose <em>of</em>: dependent preposition.')
      ]
    },
    {
      id: 'topic-technology', title: 'Topic: Technology', short: 'Digital life, benefits and risks.',
      section: 'Topic vocabulary',
      idea: `<p>Technology topics usually ask for a balance: <strong>benefits</strong> (user-friendly, breakthrough, automate) and <strong>risks</strong> (data breach, digital divide, hooked on). Learn the collocations so that you avoid the basic <em>very good</em> and <em>very bad</em>.</p>`,
      cards: [
        co('cutting-edge technology', 'the most advanced technology', 'The lab uses [[cutting-edge technology]].', 'The sharp edge of a knife at the front of progress.'),
        co('a user-friendly interface', 'a design that is easy to use', 'The app has a [[user-friendly interface]].', 'Friendly to users.'),
        co('the digital divide', 'the gap between people with technology and those without', '[[The digital divide]] leaves rural areas behind.', 'A divide is a gap.'),
        co('a data breach', 'an incident in which private data is exposed', 'A [[data breach]] exposed millions of passwords.', 'Breach = break through a defence.'),
        id('go viral', 'to spread very quickly on the internet', 'The video [[went viral]] within hours.', 'Spreads like a virus.'),
        pv('sign up for', 'to register to receive a service', 'Millions have [[signed up for]] the platform.', 'You add your name to the list.'),
        pv('hack into', 'to enter a computer system illegally', 'Criminals [[hacked into]] the bank\'s database.', 'You cut your way in.'),
        co('a technological breakthrough', 'an important new discovery in technology', 'It was hailed as a [[technological breakthrough]].', 'You break through the barrier.'),
        co('automate tasks', 'to make machines do jobs previously done by people', 'Software can [[automate]] repetitive [[tasks]].', 'Noun: automation.'),
        co('excessive screen time', 'too much time looking at devices', '[[Excessive screen time]] can harm sleep.', 'Excessive = more than is healthy.'),
        id('be hooked on', 'to be unable to stop using something', 'She\'s [[hooked on]] her phone.', 'Like a fish on a hook.'),
        co('spread misinformation', 'to pass on false information', 'Some accounts [[spread misinformation]] deliberately.', 'Uncountable. <em>Misinformation</em> may be a mistake; <em>disinformation</em> is deliberate.')
      ]
    },
    {
      id: 'topic-health', title: 'Topic: Health and lifestyle', short: 'Diet, exercise, illness and well-being.',
      section: 'Topic vocabulary',
      idea: `<p>Health vocabulary works well when organised as <strong>habits</strong> (balanced diet, sedentary lifestyle), <strong>conditions</strong> (chronic condition, suffer from) and <strong>recovery</strong> (shake off, recover from). Use them to sound precise instead of repeating <em>healthy</em> and <em>ill</em>.</p>`,
      cards: [
        co('a balanced diet', 'eating a healthy mixture of foods', 'A [[balanced diet]] includes fruit and vegetables.', 'Balanced = in the right proportion.'),
        co('a sedentary lifestyle', 'a way of life with little exercise', 'A [[sedentary lifestyle]] increases heart disease.', 'From Latin "to sit".'),
        co('mental well-being', 'good psychological health', 'Exercise improves [[mental well-being]].', 'Well-being is uncountable.'),
        pv('ward off', 'to prevent something unpleasant', 'Vitamin C may help [[ward off]] colds.', 'You keep it at a distance.'),
        co('boost immunity', 'to improve the body\'s defence against illness', 'Sleep helps [[boost immunity]].', 'Boost = push up.'),
        co('a chronic condition', 'a long-lasting illness', 'Diabetes is [[a chronic condition]].', 'Opposite: acute.'),
        co('preventive care', 'medical actions taken to avoid illness', '[[Preventive care]] is cheaper than treatment.', 'Also spelled <em>preventative</em>, equally correct.'),
        co('recover from', 'to become healthy again after illness', 'It took weeks to [[recover from]] the operation.', 'Recover + <em>from</em>.'),
        pv('cut back on', 'to reduce the amount you consume', 'My doctor told me to [[cut back on]] salt.', 'Similar to <em>cut down on</em>, but often for spending too.'),
        co('suffer from', 'to have an illness or problem over a period of time', 'Many people [[suffer from]] back pain.', 'Not <em>suffer of</em>. Used for conditions (<em>suffer from asthma</em>) as well as problems.'),
        co('seek medical advice', 'to ask a doctor for help', 'You should [[seek medical advice]] if symptoms persist.', 'Formal.'),
        pv('shake off', 'to get rid of a minor illness', 'I can\'t seem to [[shake off]] this cold.', 'You shake it off like water.')
      ]
    },
    {
      id: 'topic-education', title: 'Topic: Education', short: 'Schools, universities and learning styles.',
      section: 'Topic vocabulary',
      idea: `<p>Education essays revolve around <strong>systems</strong> (compulsory, higher, tuition fees), <strong>methods</strong> (rote learning, critical thinking) and <strong>students\' actions</strong> (sit an exam, drop out, catch up). Note the British collocation <em>sit an exam</em> (take it) versus <em>pass</em> (succeed).</p>`,
      cards: [
        co('compulsory education', 'schooling that the law requires', '[[Compulsory education]] ends at sixteen in some countries.', 'Compulsory = by law.'),
        co('tuition fees', 'money paid for university teaching', 'Rising [[tuition fees]] discourage poorer students.', 'Always plural.'),
        co('sit an exam', 'to take an exam (not necessarily to pass)', 'Candidates [[sit]] the [[exam]] in June.', 'British English. Pass = succeed.'),
        co('rote learning', 'memorising by repeating', '[[Rote learning]] does not develop understanding.', 'Rote = mechanical repetition.'),
        co('critical thinking', 'analysing ideas objectively', 'Schools should teach [[critical thinking]].', 'Uncountable.'),
        co('lifelong learning', 'continuing to learn throughout life', '[[Lifelong learning]] is vital in a changing economy.', 'Written as one word, <em>lifelong</em>; uncountable.'),
        co('gain a qualification', 'to obtain a diploma or certificate', 'She [[gained a qualification]] in nursing.', 'More formal than <em>get</em>.'),
        pv('drop out of', 'to leave a course before finishing', 'A third of students [[drop out of]] university.', 'Noun: dropout.'),
        pv('catch up with', 'to reach the same level as others', 'She worked hard to [[catch up with]] her classmates.', 'You close the distance.'),
        pv('cram for', 'to study hard shortly before an exam', 'He was [[cramming for]] his finals all night.', 'You pack information in.'),
        pv('brush up on', 'to improve knowledge you already have', 'I need to [[brush up on]] my French.', 'You wipe off the dust.'),
        co('continuous assessment', 'grading based on work done throughout the course', 'The course is based on [[continuous assessment]].', 'Contrast: final exam.')
      ]
    },
    {
      id: 'topic-society-media', title: 'Topic: Society and the media', short: 'Public opinion, news, inequality and speaking out.',
      section: 'Topic vocabulary',
      idea: `<p>For society and media questions you need language of <strong>influence</strong> (shape public opinion, media coverage), <strong>truth</strong> (fake news, sensationalist headlines) and <strong>fairness</strong> (social inequality, tackle discrimination, speak out). These are typical essay topics and Speaking Part 4 discussion points.</p>`,
      cards: [
        co('freedom of speech', 'the right to express opinions', 'Some argue that [[freedom of speech]] has limits.', 'Uncountable; also <em>free speech</em>. <em>Freedom of the press</em> is a related chunk.'),
        co('peer pressure', 'influence from people of your own age or group', 'Teenagers often give in to [[peer pressure]].', 'Peer = someone of equal age or status; uncountable. Typical: <em>give in to peer pressure</em>.'),
        co('social inequality', 'unfair differences between groups', 'The report highlights growing [[social inequality]].', 'Usually uncountable; plural <em>inequalities</em> for specific cases. Opposite idea: <em>equality of opportunity</em>.'),
        co('fake news', 'false stories presented as fact', 'Platforms are trying to stop [[fake news]].', 'Uncountable, singular verb.'),
        co('shape public opinion', 'to influence what people generally think', 'Newspapers can [[shape public opinion]].', 'Shape = mould.'),
        co('media coverage', 'the amount of reporting about an event', 'The trial received extensive [[media coverage]].', 'Uncountable.'),
        co('sensationalist headlines', 'titles designed to shock', 'Tabloids use [[sensationalist headlines]] to sell copies.', 'Sensation = strong reaction.'),
        co('a sense of community', 'the feeling of belonging to a group', 'Local clubs create [[a sense of community]].', 'Positive phrase in essays.'),
        pv('stand up for', 'to defend a person or idea', 'It takes courage to [[stand up for]] your beliefs.', 'You stand firm.'),
        pv('speak out', 'to say publicly what you think, especially against something', 'Several employees [[spoke out]] against the policy.', 'Words go out into public.'),
        pv('live up to', 'to be as good as expected', 'The film did not [[live up to]] the hype.', 'You reach the standard.'),
        co('tackle discrimination', 'to try to deal with unfair treatment', 'New laws aim to [[tackle discrimination]] at work.', 'Tackle = confront a problem.')
      ]
    }
  ];

  C1.vocab.push(...groups);
})();
