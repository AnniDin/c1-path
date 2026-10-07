window.C1 = window.C1 || {}; C1.vocab = C1.vocab || [];
(function () {
  const pv = (phrase, meaning, ex, logic) => ({ phrase, kind: 'phrasal verb', meaning, ex, logic: logic || '' });
  const co = (phrase, meaning, ex, logic) => ({ phrase, kind: 'collocation', meaning, ex, logic: logic || '' });
  const id = (phrase, meaning, ex, logic) => ({ phrase, kind: 'idiom', meaning, ex, logic: logic || '' });
  const ex = (phrase, meaning, ex, logic) => ({ phrase, kind: 'expression', meaning, ex, logic: logic || '' });

  const groups = [
    {
      id: 'life-restaurant', title: 'At the restaurant', short: 'Booking, ordering, special requests, complaints and paying.',
      section: 'Collocations and patterns',
      idea: `<p>A meal out follows a fixed script: <strong>booking</strong> (<em>book a table under the name of, a table for four</em>), <strong>ordering</strong> (<em>I'll have, leave out, on the side</em>), <strong>problems</strong> (<em>send it back, go easy on</em>) and <strong>paying</strong> (<em>split the bill, it's on me, keep the change</em>). Spanish speakers often translate word for word ("we are four"); English uses fixed chunks, so learn each one whole.</p>`,
      cards: [
        co(`book a table under the name of`, `to reserve a table and give the name the booking is kept in`, `I've [[booked a table under the name of]] Hughes for eight o'clock.`, `The booking sits "under" a name, like a file under a letter. Use <em>under</em>, not "on".`),
        ex(`a table for four`, `the normal way to say how many people are in your group`, `Good evening, [[a table for four]], please. We haven't booked.`, `Say the table, not the people: "we are four" is a Spanish pattern. Also <em>a party of four</em>.`),
        ex(`Any chance of a table?`, `a polite way to ask for a table when you have not booked`, `[[Any chance of a table?]] There are two of us, and we can wait at the bar.`, `"Any chance of" softens a request that may be refused. Informal and very British.`),
        ex(`I'll have the`, `the natural way to order a dish`, `[[I'll have the]] fish of the day, please, and she'll have the risotto.`, `<em>I'll</em> is a decision made now. "I want" sounds blunt in a restaurant.`),
        pv(`leave out`, `to not put an ingredient in the dish`, `Could you [[leave the nuts out]]? I'm allergic to them.`, `Separable: <em>leave out the nuts</em> or <em>leave the nuts out</em>. Also <em>without</em>: <em>a burger without onions</em>.`),
        ex(`on the side`, `served in a separate dish instead of over the food`, `Could I have the dressing [[on the side]], please?`, `Side = a small extra dish. Also <em>a side of chips</em>.`),
        co(`swap the chips for a salad`, `to ask for one item to be replaced by another`, `Can I [[swap the chips for a salad]], or is there an extra charge?`, `Pattern: <em>swap A for B</em>. Same idea as <em>substitute</em>, but friendlier.`),
        ex(`go easy on the salt`, `use only a little of something`, `Could you [[go easy on the salt]]? My doctor has told me to cut down.`, `<em>Go easy on</em> = be gentle with. Also used for people: <em>go easy on him</em>.`),
        pv(`send back`, `to return food to the kitchen because it is wrong, cold or bad`, `The soup was cold, so we [[sent it back]] and they brought a fresh one.`, `With a pronoun, the pronoun goes in the middle: <em>send it back</em>.`),
        co(`split the bill`, `to share the total cost of a meal between everyone`, `Shall we [[split the bill]] four ways, or does everyone pay for their own?`, `Split = divide. British English says <em>bill</em>; American English says <em>check</em>.`),
        ex(`It's on me`, `I am paying for this, as a treat`, `Put your card away, [[it's on me]] tonight. You paid last time.`, `The cost "rests on" me. Also <em>my treat</em>, or <em>it's on the house</em> when the restaurant pays.`),
        ex(`keep the change`, `a polite way to say the waiter can keep the extra money as a tip`, `That's twenty pounds, [[keep the change]], and thanks for the great service.`, `Change = coins and notes returned to you. In the UK check whether a <em>service charge</em> is already included.`)
      ]
    },
    {
      id: 'life-shopping-returns', title: 'Shopping, faults and returns', short: 'Prices, fit, damaged goods, refunds and exchanges.',
      section: 'Collocations and patterns',
      idea: `<p>Shopping language has three stages: <strong>judging the price</strong> (<em>good value for money, a bargain, a rip-off, marked down</em>), <strong>trying things</strong> (<em>try on, it suits you, it doesn't fit</em>) and <strong>solving problems</strong> (<em>a faulty product, a refund, a store credit, the receipt</em>). Use a precise fault word (<em>chipped, cracked, scratched</em>) instead of "broken" and you will get faster, better help.</p>`,
      cards: [
        co(`good value for money`, `worth what you pay for it`, `The hotel isn't luxurious, but it is [[good value for money]].`, `Value is measured against the price. <em>Value for money</em> is a fixed chunk.`),
        co(`snap up a bargain`, `to buy something cheap quickly before it sells out`, `I [[snapped up a bargain]]: those boots were half price in the January sales.`, `Snap = grab quickly. A bargain is positive; informal <em>a steal</em>. Opposite: <em>a rip-off</em>.`),
        id(`daylight robbery`, `a price that is far too high`, `Forty pounds for a sandwich is [[daylight robbery]].`, `As if a thief took your money in broad daylight. Mainly British and informal; Americans might say <em>highway robbery</em>.`),
        co(`be marked down`, `to have the price reduced`, `The coats have been [[marked down]] by thirty per cent.`, `You write a lower number on the label. Opposite: <em>marked up</em>.`),
        ex(`buy one, get one free`, `a shop offer where a second item costs nothing`, `The shampoo is [[buy one, get one free]] this week.`, `Often shortened to BOGOF in the UK. Say it as one fixed chunk.`),
        ex(`I'm just browsing`, `a polite reply meaning you only want to look`, `No, thanks, [[I'm just browsing]]. I'll call you if I need help.`, `Browse = look through without a plan. Friendlier than a plain "no".`),
        co(`a fitting room`, `a small cabin in a shop where you try on clothes`, `There was a long queue for [[a fitting room]] on Saturday.`, `British also <em>changing room</em>; American <em>dressing room</em>. Verb to use there: <em>try on</em>.`),
        co(`it suits you`, `it looks good on you, because of your style or colouring`, `Green really [[suits you]]. It goes with your eyes.`, `Three verbs: <em>fit</em> = right size, <em>suit</em> = looks good on you, <em>go with</em> = matches other things.`),
        pv(`zip up`, `to close clothing with a zip`, `It's freezing, so [[zip up]] your jacket before you go out.`, `<em>Zip</em> is British; Americans say <em>zipper</em> for the object. Opposite: <em>unzip</em>.`),
        co(`a chipped cup`, `a cup with a small piece broken off the edge`, `I'm sorry, but this is [[a chipped cup]]. Do you have another in stock?`, `Pick the exact fault: chipped (cup), cracked (screen), scratched (surface), dented (metal), stained (cloth), faded (colour), torn (paper, cloth).`),
        co(`a faulty product`, `an item that does not work properly because of a manufacturing problem`, `The kettle was [[a faulty product]], so I took it back with my receipt.`, `Faulty = has a fault. In UK law you have stronger rights on faulty goods than when you simply change your mind.`),
        co(`ask for a refund`, `to request your money back`, `The tickets were cancelled, so I [[asked for a refund]].`, `Refund = money back. Compare <em>an exchange</em> (a swap) and <em>a store credit</em> (a voucher usable only in that shop).`)
      ]
    },
    {
      id: 'life-doctor-pharmacy', title: 'Doctor, symptoms and pharmacy', short: 'Describing problems, tests and medicine.',
      section: 'Collocations and patterns',
      idea: `<p>At the doctor's, language moves from <strong>describing symptoms</strong> (<em>a persistent cough, a splitting headache, on and off, run a temperature</em>) to <strong>the diagnosis</strong> (<em>rule out, refer you to a specialist</em>) and <strong>treatment</strong> (<em>over-the-counter, pick up a prescription, side effects, finish the course</em>). Spanish says "tener fiebre"; English often prefers a verb that fits each symptom, so learn the verb with the noun.</p>`,
      cards: [
        co(`book an appointment`, `to arrange a time to see a doctor`, `I'd like to [[book an appointment]] with Dr Patel, please.`, `Verbs: <em>book, make, cancel</em>. You have an appointment <em>with</em> a person and <em>at</em> a time.`),
        ex(`What brings you in?`, `a doctor's opening question asking why you came`, `"[[What brings you in]] today?" "I've had chest pains for a week."`, `Literally "what has brought you here". Neutral and kind; very common.`),
        co(`a persistent cough`, `a cough that goes on for a long time`, `I've had [[a persistent cough]] since March, so I've come for a check.`, `Persistent = continuing without stopping. Compare <em>a dry cough</em> and <em>a chesty cough</em>.`),
        co(`a splitting headache`, `a very bad headache`, `I woke up with [[a splitting headache]] and could hardly open my eyes.`, `Splitting = as if the head were being split open. Also <em>a pounding headache</em>.`),
        ex(`on and off`, `happening from time to time, not continuously`, `The pain has come [[on and off]] since Sunday.`, `Like a light switched on, then off. Also <em>off and on</em>.`),
        co(`run a temperature`, `to have a fever`, `The child is [[running a temperature]] of 39 degrees, so please see her quickly.`, `British idiom for <em>have a fever</em>. A related symptom is <em>have the chills</em>.`),
        pv(`rule out`, `to decide that something is not the cause`, `The blood test will [[rule out]] an infection.`, `To "rule out" is to remove one option from the list of possible causes.`),
        co(`refer to a specialist`, `to send a patient to a doctor who is an expert in one area`, `My GP [[referred me to a specialist]] about my knee.`, `Pattern: refer X to Y. The noun is <em>a referral</em>.`),
        co(`over-the-counter medicine`, `medicine you can buy without a doctor's note`, `Paracetamol is an [[over-the-counter medicine]] in most countries.`, `You buy it "over the counter" in the pharmacy. Opposite: <em>prescription-only</em>. Do not say "drug", which often suggests illegal substances.`),
        co(`pick up a prescription`, `to collect the medicine your doctor has ordered from a pharmacy`, `I need to [[pick up a prescription]] before the chemist's closes.`, `<em>Fill a prescription</em> is the American phrase. The shop is a <em>chemist's</em> or <em>pharmacy</em> (UK) or <em>drugstore</em> (US).`),
        co(`side effects`, `unwanted reactions caused by a medicine`, `The tablets may cause [[side effects]] such as dizziness.`, `Side = not the main purpose. Check the leaflet for <em>the dosage</em> (how much to take).`),
        co(`finish the course`, `to take all the prescribed tablets even if you feel better`, `You must [[finish the course]] of antibiotics, even if the symptoms disappear.`, `Course = a planned series. Stopping early can let the infection return.`)
      ]
    },
    {
      id: 'life-work-email-calls', title: 'Work email and video calls', short: 'Polite email formulae and repair phrases for online meetings.',
      section: 'Collocations and patterns',
      idea: `<p>Professional communication uses <strong>formulae</strong> in each part of the message: <strong>opening</strong> (<em>I'm writing in connection with, thanks for getting back to me</em>), <strong>middle</strong> (<em>please find attached, I've copied in, just following up</em>), <strong>ending</strong> (<em>keep me in the loop, I look forward to hearing from you</em>). For live calls the formulae become <strong>repair phrases</strong> (<em>you're on mute, bear with me, may I jump in</em>). They sound natural because everyone uses them.</p>`,
      cards: [
        ex(`I'm writing in connection with`, `a formal way to state why you are writing`, `[[I'm writing in connection with]] your advertisement for a project manager.`, `In connection with = about. More formal than "about" or "regarding".`),
        ex(`Thanks for getting back to me`, `thank you for replying`, `[[Thanks for getting back to me]] so quickly. That helps a lot.`, `Get back = return a reply. Friendly and standard in business email.`),
        ex(`Thanks for the heads-up`, `thank you for warning me in advance`, `[[Thanks for the heads-up]]. I'll tell the team before Monday.`, `A heads-up is an early alert. Informal; fine with colleagues.`),
        id(`be tied up`, `to be too busy to do something else`, `I'm [[tied up]] until three, but I can call you after that.`, `Like being tied with ropes, you cannot move. Similar: <em>swamped</em> and <em>snowed under</em>.`),
        ex(`Please find attached`, `a formal way to say a file is included in the email`, `[[Please find attached]] the agenda and last month's figures.`, `Fixed formal phrase. Informal: <em>I've attached</em>. Check the file is really attached.`),
        pv(`copy in`, `to add someone as a recipient of an email so that they see it`, `I've [[copied in]] Maria so she can follow the discussion.`, `Same idea as <em>cc</em>: you write to one person, but another should also know.`),
        ex(`Just following up on`, `a polite reminder about an earlier message`, `[[Just following up on]] my email from last week about the budget.`, `<em>Just</em> softens the reminder, so it does not sound like a complaint.`),
        id(`keep me in the loop`, `keep me informed about what is happening`, `Please [[keep me in the loop]] as the plans develop.`, `A loop is a circle of people who know. <em>Out of the loop</em> = uninformed.`),
        ex(`I look forward to hearing from you`, `a formal ending expecting a reply`, `[[I look forward to hearing from you]] at your earliest convenience.`, `<em>To</em> is a preposition here, so the verb takes <em>-ing</em>: "look forward to hear" is a common error.`),
        ex(`You're on mute`, `a video-call phrase meaning others cannot hear you`, `Sorry, Tom, [[you're on mute]]. Could you try again?`, `Your microphone icon is crossed out. Related: <em>you're breaking up</em> (the connection is bad).`),
        ex(`Bear with me`, `please be patient while I do something`, `[[Bear with me]] a second while I share my screen.`, `Bear = tolerate. Friendlier than "wait". Used in calls and customer service.`),
        ex(`May I jump in?`, `a polite way to interrupt a speaker`, `Sorry, [[may I jump in]] for a second? I have some data on that.`, `<em>Jump in</em> = enter quickly. Softer than a blunt "Wait".`)
      ]
    },
    {
      id: 'life-friends-plans', title: 'Friends, plans and gossip', short: 'Making, changing and cancelling plans; secrets and rumours.',
      section: 'Idioms and expressions',
      idea: `<p>Friends use short chunks for three jobs: <strong>making plans</strong> (<em>be up for, count me in, are we still on</em>), <strong>changing plans</strong> (<em>I can't make it, something came up, take a rain check, push back</em>) and <strong>sharing news</strong> (<em>spill the beans, just between us, rumour has it</em>). Notice that <em>make it</em> means manage to attend, not "do it".</p>`,
      cards: [
        ex(`be up for`, `to feel like doing something and be happy to do it`, `Are you [[up for]] a film tonight, or are you too tired?`, `Up = ready and active. Often in questions: <em>Are you up for it?</em>`),
        ex(`count me in`, `include me, I want to take part`, `You're organising a hike? [[Count me in]].`, `You count the group and add me. Opposite: <em>count me out</em>.`),
        ex(`I can't make it`, `I am not able to come`, `Sorry, [[I can't make it]] on Saturday, I'm working.`, `<em>Make it</em> = succeed in getting there. It does not mean "do it".`),
        ex(`Are we still on?`, `a question checking that a plan has not changed`, `[[Are we still on?]] Seven o'clock outside the cinema, right?`, `<em>On</em> = still happening. Reply: <em>Yes, it's still on</em>.`),
        ex(`something came up`, `an unexpected matter appeared and stopped me`, `I'm so sorry, [[something came up]] at work and I'll be late.`, `Vague on purpose: you do not have to explain. Past tense, since it already happened.`),
        pv(`push back`, `to move an event to a later time`, `They've [[pushed back]] the meeting until Friday.`, `Push = move, back = later. Opposite: <em>bring forward</em>.`),
        id(`take a rain check`, `to say no now but suggest doing it another time`, `I can't tonight, but can I [[take a rain check]]?`, `American in origin (baseball tickets for a later game if rain stopped play), now common in British English for any invitation.`),
        pv(`cheer up`, `to make someone feel less sad, or to feel happier`, `I bought her flowers to [[cheer her up]] after the bad news.`, `Separable with a pronoun: <em>cheer her up</em>. Imperative: <em>Cheer up!</em>`),
        id(`spill the beans`, `to reveal a secret by accident or on purpose`, `Come on, [[spill the beans]]! Who is she going out with?`, `Beans spilling from a jar cannot be put back, like a secret.`),
        ex(`just between us`, `please do not tell anyone else`, `[[Just between us]], I think he's leaving the company.`, `Opens a secret and shows trust. Also <em>between you and me</em>.`),
        ex(`rumour has it`, `people are saying so, but it is not confirmed`, `[[Rumour has it]] the café is closing at the end of the month.`, `British spelling <em>rumour</em>; American <em>rumor</em>. Followed by <em>that</em> or a clause.`),
        id(`keep it under wraps`, `to keep something secret for the moment`, `We're getting engaged, but please [[keep it under wraps]] for now.`, `Wraps = a cover over something. Used for plans, news and products not yet announced.`)
      ]
    },
    {
      id: 'life-dating-flirting', title: 'Dating and flirting', short: 'Making a move, chatting up, hitting it off and breaking up.',
      section: 'Phrasal verbs',
      idea: `<p>The story of a romance has a natural order: <strong>interest</strong> (<em>have a crush on, chat up, hit on</em>), <strong>the first date</strong> (<em>ask out, fall for, chemistry</em>), <strong>progress or ending</strong> (<em>go steady, lead on, turn down, break up with</em>). Many are phrasal verbs, so learn which ones take an object in the middle: <em>ask her out</em>, <em>turn him down</em>.</p>`,
      cards: [
        pv(`chat up`, `to talk to someone in a flirting way to show interest`, `He tried to [[chat her up]] at the bar with a terrible joke.`, `Separable: <em>chat her up</em>. Mostly British; Americans say <em>hit on</em>.`),
        pv(`hit on`, `to flirt with someone, often clumsily or when it is not wanted`, `A stranger kept [[hitting on]] her all evening.`, `Inseparable: <em>hit on her</em>. Often sounds negative.`),
        pv(`ask out`, `to invite someone on a date`, `He finally plucked up the courage to [[ask her out]].`, `Separable. You ask someone <em>out</em>, then you <em>go out with</em> them.`),
        pv(`lead on`, `to make someone believe you love them when you do not`, `She felt he was [[leading her on]] because he never wanted a real relationship.`, `Lead = guide. You guide their hopes in the wrong direction.`),
        co(`let someone down gently`, `to refuse a person's romantic interest in a kind way`, `She tried to [[let him down gently]] by saying she valued his friendship.`, `Let down = disappoint; gently softens it. Compare <em>turn down</em>, which is more blunt.`),
        pv(`break up with`, `to end a romantic relationship with someone`, `She [[broke up with]] him by text, which was cruel.`, `Three-part verb. Noun: <em>a break-up</em>. Without an object: <em>they broke up</em>.`),
        pv(`fall for`, `to start to love someone, often quickly`, `She [[fell for]] him the moment he laughed at her joke.`, `Fall = a sudden, uncontrolled movement. <em>Fall for</em> can also mean to be tricked: <em>he fell for the scam</em>.`),
        co(`have a crush on`, `to like someone romantically but secretly`, `At sixteen I [[had a crush on]] my maths teacher.`, `Crush = strong but usually secret attraction. Often about teenagers or a famous person.`),
        co(`chemistry between`, `a strong natural attraction between two people`, `You could see the [[chemistry between]] the two actors.`, `Like a chemical reaction you cannot plan. Opposite: <em>there was no spark</em>.`),
        ex(`be seeing someone`, `to be in an early, not yet official, relationship`, `I'm [[seeing someone]] at the moment, but it's early days.`, `Continuous form = temporary. Not engaged, not even "boyfriend" yet.`),
        id(`make a move on`, `to take the first step towards a romantic relationship`, `He was too shy to [[make a move on]] her at the party.`, `A move is an action in a game. Informal.`),
        co(`go steady`, `to have a serious relationship with one person`, `They've been [[going steady]] for two years now.`, `Slightly old-fashioned; younger people say <em>be together</em>.`)
      ]
    },
    {
      id: 'life-directions-transport', title: 'Directions and public transport', short: 'Finding the way, turning, landmarks and trains.',
      section: 'Collocations and patterns',
      idea: `<p>Directions combine three things: <strong>movement</strong> (<em>carry straight on, go past, take the second left</em>), <strong>position</strong> (<em>across the road from, on the corner of, just round the corner</em>) and <strong>landmarks</strong> (<em>the traffic lights, the roundabout, the crossroads</em>). Prepositions matter: <em>on the corner</em> is where two streets meet, <em>in the corner</em> is the inside angle of a room.</p>`,
      cards: [
        pv(`carry straight on`, `to continue in the same direction without turning`, `[[Carry straight on]] until you reach the roundabout.`, `British: <em>straight on</em>. American: <em>straight ahead</em>. Also <em>keep going</em>.`),
        co(`take the second left`, `to turn into the second street on the left`, `[[Take the second left]] after the bank and you will see the station.`, `<em>Take</em> + turning. Count only the roads you can actually turn into.`),
        ex(`at the traffic lights`, `where the road has red, amber and green signals`, `Turn right [[at the traffic lights]], then go straight on.`, `British plural <em>lights</em>; American <em>stoplight</em>. Preposition <em>at</em> for a point.`),
        pv(`go past`, `to continue beyond a place`, `[[Go past]] the post office and the library is on your left.`, `<em>Past</em> here means you do not stop at that place.`),
        ex(`just round the corner`, `very close, a short walk away`, `The pharmacy is [[just round the corner]] from here.`, `British <em>round</em>, American <em>around</em>. Also for time: <em>Christmas is just round the corner</em>.`),
        co(`on the corner of`, `at a place where two streets meet`, `The café is [[on the corner of]] Mill Road and Church Street.`, `Where two streets meet = <em>on the corner</em>. Inside a room = <em>in the corner</em>.`),
        ex(`across the road from`, `on the other side of the street`, `The bus stop is [[across the road from]] the bakery.`, `Also <em>opposite</em>. <em>Across</em> suggests you must cross the street.`),
        ex(`you can't miss it`, `it is easy to see, so you will find it`, `The town hall is the big white building, [[you can't miss it]].`, `Said at the end of directions to reassure. (Not always true!)`),
        pv(`get off`, `to leave a bus, train or plane`, `[[Get off]] at the third stop and walk up the hill.`, `Opposite: <em>get on</em>. For a car or taxi use <em>get out of</em> and <em>get in</em>.`),
        pv(`change trains`, `to leave one train and board another to continue`, `You'll need to [[change trains]] at Crewe.`, `Note the plural: <em>change trains</em>, not "change train". Also <em>change at</em> + station.`),
        ex(`How often do they run?`, `a question about how frequent buses or trains are`, `[[How often do they run]] on Sundays? Every half-hour?`, `<em>Run</em> = operate on a route. Answer: <em>every ten minutes</em>.`),
        ex(`Is this the right platform for`, `a check that you are going the right way`, `Excuse me, [[is this the right platform for]] Leeds?`, `<em>Right</em> = correct. Also <em>Is this the right bus for...?</em>`)
      ]
    },
    {
      id: 'life-airport-hotel', title: 'Airport, delays and hotel', short: 'Check-in, luggage, flights, customs and hotel stays.',
      section: 'Collocations and patterns',
      idea: `<p>Travel language follows the journey: <strong>before the flight</strong> (<em>check in, carry-on luggage, excess baggage</em>), <strong>problems</strong> (<em>the flight is delayed, miss your connection, fill in a claim form</em>) and <strong>arrival</strong> (<em>anything to declare, baggage reclaim, a reservation under the name of</em>). Remember that <em>luggage</em> and <em>baggage</em> are uncountable: say <em>two suitcases</em> or <em>a piece of luggage</em>.</p>`,
      cards: [
        pv(`check in`, `to register at an airport or hotel when you arrive`, `We must [[check in]] two hours before the flight leaves.`, `Noun: <em>check-in</em> (the desk). Opposite: <em>check out</em> (leave a hotel).`),
        co(`carry-on luggage`, `bags small enough to take into the plane cabin`, `Only one piece of [[carry-on luggage]] is allowed per passenger.`, `Uncountable noun <em>luggage</em>. British English also says <em>hand luggage</em>.`),
        co(`excess baggage`, `weight over the free limit, for which you must pay`, `I had to pay for [[excess baggage]] because my case was three kilos too heavy.`, `Excess = more than allowed. Also <em>the weight limit</em>.`),
        co(`a direct flight`, `a flight that goes straight to the destination without changing`, `There is [[a direct flight]] to Lima, so we avoid the stopover.`, `Direct = no change. Different from <em>a non-stop flight</em>, which does not land even briefly.`),
        co(`a long stopover`, `a long wait between two flights`, `We had [[a long stopover]] in Dubai, so we left the airport to see the city.`, `British <em>stopover</em>; American <em>layover</em>. A flight with a stopover is not direct.`),
        co(`the flight is delayed`, `the plane is leaving later than planned`, `I'm afraid [[the flight is delayed]] by two hours because of fog.`, `Delayed = late. Do not confuse it with <em>cancelled</em> (not flying at all).`),
        co(`baggage reclaim`, `the area where you collect your bags after landing`, `We waited at [[baggage reclaim]], but our suitcase never came.`, `British term; American <em>baggage claim</em>. The moving belt is the <em>carousel</em>.`),
        co(`fill in a claim form`, `to complete a document reporting lost or damaged luggage`, `You will need to [[fill in a claim form]] at the airline desk.`, `British <em>fill in</em>; American <em>fill out</em>.`),
        ex(`Anything to declare?`, `a customs question about goods you must report`, `At customs the officer asked, "[[Anything to declare?]]" I said no.`, `Declare = state officially. Alcohol, cash and food may need declaring.`),
        ex(`a reservation under the name of`, `a booking kept in a person's name`, `I have [[a reservation under the name of]] Garcia for three nights.`, `Same <em>under</em> as in restaurants.`),
        id(`a red-eye flight`, `an overnight flight that leaves you tired the next day`, `I took [[a red-eye flight]] and went straight to the meeting.`, `The idea is eyes red from lack of sleep. Informal, American in origin.`),
        pv(`check out`, `to pay your bill and leave a hotel`, `You have to [[check out]] by eleven, but you can leave your bags at reception.`, `Noun: <em>check-out</em> (time). Informal <em>check out</em> also means "have a look at".`)
      ]
    },
    {
      id: 'life-hair-beauty', title: 'Hair, beauty and nails', short: 'Haircuts, salon requests, skin types and nails.',
      section: 'Topic vocabulary',
      idea: `<p>Salon talk is a short list of <strong>requests</strong> (<em>a trim, layers, thin it out, a side parting</em>), <strong>problems</strong> (<em>split ends, greasy roots</em>) and <strong>services</strong> (<em>get your nails done, a full set</em>). Remember the causative: <em>I'm getting my hair cut</em> or <em>I had my nails done</em>, because someone else does it for you.</p>`,
      cards: [
        co(`a trim`, `a light haircut that removes only a little length`, `Just [[a trim]], please. I want to keep it long.`, `Not "a cut", which suggests a big change. Also <em>trim the fringe</em>.`),
        co(`a fringe`, `hair cut short across the forehead`, `She cut herself [[a fringe]] during lockdown and regretted it.`, `British <em>fringe</em>; American <em>bangs</em>.`),
        co(`layers`, `hair cut so that it falls at different lengths`, `I'd like some [[layers]] to give it more movement.`, `Like layers of a cake, one on top of another. Usually plural.`),
        co(`a side parting`, `the line on the head where hair is divided, to one side`, `Do you prefer a middle parting or [[a side parting]]?`, `British <em>parting</em>; American <em>part</em>.`),
        pv(`thin out`, `to cut some hair away to make it less thick`, `Could you [[thin it out]] at the back? It's too heavy in summer.`, `Thin = not thick. Separable: <em>thin it out</em>.`),
        co(`split ends`, `hair tips that have divided because of damage`, `Colouring my hair so often has given me terrible [[split ends]].`, `Always plural. Usual fix: <em>get it trimmed</em>.`),
        co(`greasy roots`, `hair that is oily near the scalp`, `I wash it daily because of [[greasy roots]].`, `Roots = the part nearest the head. Contrast: <em>dry ends</em>.`),
        co(`combination skin`, `skin that is oily in some areas and dry in others`, `I have [[combination skin]], so I use two different creams.`, `It combines two types. The others are <em>oily, dry</em> and <em>sensitive</em>.`),
        co(`get your nails done`, `to have a professional do your fingernails`, `We're [[getting our nails done]] before the wedding.`, `Causative <em>get something done</em>. "Do my nails" sounds like you do it yourself.`),
        co(`a full set`, `a complete set of false nails put on all fingers`, `She treated herself to [[a full set]] of acrylic nails.`, `Salon term. The cheaper repeat visit is <em>a fill</em> (new material at the base of the nail).`),
        co(`nail varnish remover`, `liquid used to take off nail polish`, `Do you have any [[nail varnish remover]]? I've chipped my polish.`, `British <em>nail varnish</em>; American <em>nail polish</em>.`),
        co(`freshen up my look`, `make a small change so you look newer or more modern`, `I want to [[freshen up my look]] without a drastic cut.`, `Fresh = new and bright. A light change, not a makeover.`)
      ]
    },
    {
      id: 'life-gym-fitness', title: 'Gym and fitness', short: 'Joining, training, goals, gym slang and sore muscles.',
      section: 'Collocations and patterns',
      idea: `<p>Gym language has <strong>joining</strong> (<em>take out a membership, be on a waiting list, sign up for a class</em>), <strong>training</strong> (<em>work out, warm up, three sets of ten reps</em>), <strong>goals</strong> (<em>build stamina, bulk up, tone up</em>) and <strong>slang</strong> (<em>spot someone, work in</em>). Do not confuse a set (a group of repetitions) with a rep (one movement).</p>`,
      cards: [
        co(`take out a membership`, `to pay to become a member of a club or gym`, `I [[took out a membership]] in January and have been twice.`, `<em>Take out</em> is used for subscriptions and insurance. Also <em>join a gym</em>.`),
        co(`be on a waiting list`, `to be waiting for a place when a service is full`, `I'm [[on a waiting list]] for the yoga class.`, `You are <em>put on</em> a waiting list. Also used for housing and surgery.`),
        co(`sign up for a class`, `to register to attend a course or class`, `I've [[signed up for a class]]: spinning, every Tuesday.`, `Sign up = write your name. <em>Sign up for</em> a class or course; <em>sign up to</em> a website or newsletter.`),
        ex(`hit the gym`, `to go to the gym to exercise`, `I try to [[hit the gym]] three times a week before work.`, `Hit = go to, as in <em>hit the shops</em>. Informal. Noun: <em>a workout</em> is the exercise itself.`),
        pv(`warm up`, `to prepare the body with light exercise before training`, `Always [[warm up]] before you lift heavy weights.`, `Noun: <em>a warm-up</em>. Opposite: <em>cool down</em>.`),
        co(`three sets of ten reps`, `a way to describe training: ten movements, repeated three times`, `Do [[three sets of ten reps]] with a light weight.`, `A <em>rep</em> is one movement; a <em>set</em> is a group of reps.`),
        co(`build stamina`, `to gain the ability to keep exercising for a long time`, `Running every morning helps me [[build stamina]].`, `Stamina = endurance. Also <em>build strength</em>, <em>build muscle</em>.`),
        pv(`bulk up`, `to get bigger by building muscle`, `He ate a lot of protein to [[bulk up]].`, `Bulk = size. Opposite: <em>slim down</em>.`),
        pv(`tone up`, `to make the body firmer without making it much bigger`, `She wants to [[tone up]] her arms before the wedding.`, `Tone = firmness of muscles. Contrast with <em>bulk up</em>.`),
        co(`feel sore`, `to have aching muscles after exercise`, `I still [[feel sore]] after yesterday's leg day and can hardly use the stairs.`, `Sore = painful to touch. Not "ill". Also <em>aching</em>.`),
        pv(`spot someone`, `to stand near and help someone lifting heavy weights, for safety`, `Can you [[spot me]] on the bench press?`, `Spot = watch closely. Gym slang for a safety role.`),
        pv(`work in`, `to share a machine and take turns with someone`, `Do you mind if I [[work in]] with you on the rowing machine?`, `Mainly American gym slang. Not the same as <em>work in</em> = fit into a plan.`)
      ]
    },
    {
      id: 'life-small-talk', title: 'Small talk and social openers', short: 'Starting and keeping up light conversation with new people.',
      section: 'Idioms and expressions',
      idea: `<p>Small talk is a ritual, not an exchange of information. It uses safe topics (<em>the weather, the weekend, a mutual friend</em>) and fixed chunks. The usual pattern is <strong>open</strong> (<em>How are things going with...?</em>), <strong>respond</strong> (<em>Can't complain, Hanging in there</em>), and <strong>link</strong> (<em>How do you know each other?</em>). Answer with a short remark and then return the question; one-word replies end the chat.</p>`,
      cards: [
        ex(`How are things going with`, `a polite question about one part of someone's life`, `[[How are things going with]] the new flat?`, `More caring than "How are you?" because it shows you remember.`),
        ex(`How are you getting on?`, `an informal way to ask how someone is doing`, `[[How are you getting on]] at your new school?`, `British <em>get on</em> = make progress. Not about relationships between people here.`),
        ex(`Can't complain`, `a modest reply meaning things are fine`, `"How's work?" "[[Can't complain]], thanks. Busy but fine."`, `Literally: I have no reason to. A British understatement for "good".`),
        ex(`Hanging in there`, `a reply meaning you are coping, but it is hard`, `"How are the exams going?" "Oh, [[hanging in there]]."`, `Like holding on to a rope. As encouragement: <em>Hang in there!</em>`),
        ex(`Any plans for the weekend?`, `a safe question to start talking to a colleague`, `[[Any plans for the weekend?]] We're going to the coast.`, `Neutral topic, easy to answer, and not too private.`),
        ex(`Have you two met?`, `a way to introduce two people`, `Anna, this is Jorge. [[Have you two met?]]`, `Asking first means no one feels left out. Answer: <em>Not yet</em> or <em>We have, actually</em>.`),
        ex(`How do you know each other?`, `a natural party question about the link between two people`, `[[How do you know each other?]] Through work or at university?`, `Opens a story and keeps both people talking.`),
        ex(`Do you know many people here?`, `a friendly question for someone who looks alone`, `[[Do you know many people here?]] If not, I'll introduce you.`, `The offer afterwards makes it kind, not just curious.`),
        ex(`Where did you get that?`, `a compliment in the form of a question`, `I love that jacket, [[where did you get that?]]`, `A question about an item praises it without sounding forced.`),
        ex(`Did you catch the match?`, `a question asking if someone watched a game`, `[[Did you catch the match]] last night? What a finish!`, `Catch = watch or hear. British <em>match</em>; Americans say <em>game</em>.`),
        ex(`Have you been following`, `a question asking if someone pays attention to an ongoing story`, `[[Have you been following]] the election coverage?`, `Present perfect continuous: the interest has lasted over time.`),
        ex(`Isn't it freezing in here?`, `a remark about temperature that invites agreement`, `[[Isn't it freezing in here?]] Shall I shut the window?`, `A negative question expects "yes". Useful for starting a chat with a stranger.`)
      ]
    },
    {
      id: 'life-school-university', title: 'School and university life', short: 'Courses, deadlines, exams and degrees.',
      section: 'Collocations and patterns',
      idea: `<p>Study vocabulary follows the academic year: <strong>enrolling and attending</strong> (<em>enrol on a course, hand in an essay, a tutorial group</em>), <strong>pressure</strong> (<em>meet a deadline, last-minute revision, pull an all-nighter, resit an exam</em>) and <strong>results</strong> (<em>pass with flying colours, scrape through, a first-class degree</em>). Note UK and US differences: <em>a first</em> and <em>a 2:1</em> in the UK; <em>GPA</em> in the US.</p>`,
      cards: [
        co(`enrol on a course`, `to register officially to study something`, `She [[enrolled on a course]] in graphic design in September.`, `British <em>enrol</em> (American <em>enroll</em>) is followed by <em>on</em> a course, <em>at</em> a school.`),
        co(`hand in an essay`, `to give your written work to a teacher`, `You must [[hand in your essay]] by Friday noon.`, `Hand + in = deliver. More formal: <em>submit</em>. American: <em>turn in</em>.`),
        co(`a tight deadline`, `a time limit that leaves very little time to finish`, `We are working to [[a tight deadline]], so there will be no extensions.`, `Tight = with no spare room. Also <em>meet</em> or <em>miss</em> it.`),
        co(`last-minute revision`, `studying hard just before an exam`, `I did some [[last-minute revision]] on the bus to the exam.`, `<em>Revision</em> is the British noun for reviewing what you have learned; Americans say <em>studying</em>. Informal verb: <em>cram</em>.`),
        id(`pull an all-nighter`, `to stay awake all night, usually to study or finish work`, `I [[pulled an all-nighter]] to finish my dissertation.`, `Originally American, now widely used. Informal and a little humorous.`),
        co(`resit an exam`, `to take an exam again after failing`, `She had to [[resit the exam]] in August.`, `British <em>resit</em> (verb and noun); American <em>retake</em>.`),
        id(`pass with flying colours`, `to succeed very well`, `He [[passed with flying colours]] and won a scholarship.`, `Colours = flags. It probably comes from ships that returned from battle with their flags flying.`),
        pv(`scrape through`, `to pass something by a very small margin`, `I [[scraped through]] the maths exam with just 41 per cent.`, `Scrape = only just touch. Opposite: <em>sail through</em>.`),
        co(`a first-class degree`, `the highest level of university degree in the UK`, `She graduated with [[a first-class degree]] in law.`, `Shortened to <em>a first</em>. Below that: <em>a 2:1</em>, <em>a 2:2</em>. The US uses <em>GPA</em>.`),
        co(`drop out of university`, `to leave a course before finishing it`, `He [[dropped out of university]] to start his own business.`, `Noun: <em>a dropout</em>. Often negative, but not always.`),
        co(`a tutorial group`, `a small group of students who meet a teacher to discuss their work`, `We discuss each week's reading in [[a tutorial group]] of six.`, `British university word; a <em>seminar</em> is similar but often larger.`),
        pv(`revise for`, `to study again what you have learned before an exam`, `I'm [[revising for]] my history exam all week.`, `British <em>revise</em> = review; Americans say <em>study for</em>.`),
      ]
    }
  ];

  C1.vocab.push(...groups);
})();
