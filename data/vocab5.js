window.C1 = window.C1 || {}; C1.vocab = C1.vocab || [];
(function () {
  const pv = (phrase, meaning, ex, logic) => ({ phrase, kind: 'phrasal verb', meaning, ex, logic: logic || '' });
  const co = (phrase, meaning, ex, logic) => ({ phrase, kind: 'collocation', meaning, ex, logic: logic || '' });
  const id = (phrase, meaning, ex, logic) => ({ phrase, kind: 'idiom', meaning, ex, logic: logic || '' });
  const ex = (phrase, meaning, ex, logic) => ({ phrase, kind: 'expression', meaning, ex, logic: logic || '' });

  const groups = [
    {
      id: 'topic-wildlife', title: 'Wildlife and conservation', short: 'Endangered species, habitats and protecting nature.',
      section: 'Topic vocabulary',
      idea: `<p>Conservation texts follow one story: <strong>a threat, a loss, a response</strong>. First the threat (<em>habitat loss, poaching, invasive species, human encroachment</em>), then the result (<em>on the brink of extinction, a dwindling population, upset the ecological balance</em>) and finally the response (<em>a nature reserve, a captive breeding programme, reintroduce into the wild, protected species, wildlife corridor</em>). In an essay, name the threat first and then the remedy.</p>`,
      cards: [
        co(`habitat loss`, `the destruction or shrinking of the places where animals and plants live`, `[[Habitat loss]] is the main reason why so many amphibians are disappearing.`, `Habitat = the natural home of a species. Also <em>habitat destruction / fragmentation</em>.`),
        co(`on the brink of extinction`, `very close to disappearing completely as a species`, `The rhino was [[on the brink of extinction]] before strict protection began.`, `A brink is the edge of a cliff. Also <em>on the verge of</em>.`),
        co(`a dwindling population`, `a number of animals that is getting steadily smaller`, `Scientists are monitoring [[a dwindling population]] of red squirrels in the north.`, `To dwindle = to become gradually smaller. It has no passive form.`),
        co(`a protected species`, `an animal or plant that the law forbids people to harm or collect`, `It is illegal to disturb nests of [[a protected species]] such as the barn owl.`, `Species has the same form in singular and plural: <em>one species, two species</em>.`),
        co(`a nature reserve`, `an area of land managed to protect wild plants and animals`, `The wetland became [[a nature reserve]] in the 1970s.`, `A reserve is something set aside. Compare <em>a national park</em>.`),
        co(`an invasive species`, `a plant or animal brought into a new area where it spreads and harms local wildlife`, `[[An invasive species]] of crayfish has wiped out the native ones.`, `It "invades" territory that is not its own. Compare <em>native / indigenous species</em>.`),
        co(`a captive breeding programme`, `a scheme to breed rare animals in zoos or centres so that numbers can recover`, `[[A captive breeding programme]] saved the species from extinction.`, `Captive = kept by humans. UK spelling: <em>programme</em>.`),
        co(`become extinct`, `to stop existing as a species, because the last members have died`, `Dozens of bird species [[became extinct]] after rats arrived on the island.`, `Extinct is an adjective, so use <em>become</em>, not "get". Noun: <em>extinction</em>.`),
        co(`breed in captivity`, `to produce young while kept by humans, for example in a zoo`, `Pandas rarely [[breed in captivity]], which makes conservation difficult.`, `Captivity = the state of being kept in a place. Opposite: <em>in the wild</em>.`),
        co(`reintroduce into the wild`, `to bring animals back to an area where they used to live`, `Beavers have been [[reintroduced into the wild]] in parts of Scotland.`, `Re- = again. Pattern: <em>reintroduce X into / to Y</em>.`),
        co(`upset the ecological balance`, `to disturb the natural relationship between living things in an area`, `Removing top predators can [[upset the ecological balance]] of a whole valley.`, `Upset = to disturb a stable system. Also <em>disrupt the food chain</em>.`),
        co(`human encroachment`, `people gradually taking over land that wildlife needs`, `[[Human encroachment]] on forests brings elephants into conflict with farmers.`, `To encroach = to move step by step into someone else's space. Formal.`)
      ]
    },
    {
      id: 'topic-gig-careers', title: 'Gig work, recruitment and careers', short: 'Freelancing, job hunting, interviews and moving up.',
      section: 'Topic vocabulary',
      idea: `<p>The modern job market splits into <strong>how work is organised</strong> (<em>the gig economy, a zero-hours contract, work on a freelance basis, a side hustle</em>), <strong>how you get hired</strong> (<em>shortlist candidates, a probationary period, a job offer, headhunt, a competitive salary</em>) and <strong>how careers move</strong> (<em>climb the career ladder, a career break, burn out, a dead-end job</em>). Essays on work usually weigh <strong>flexibility against security</strong>, so learn the chunks on both sides.</p>`,
      cards: [
        co(`the gig economy`, `a labour market where many people do short, temporary jobs instead of permanent ones`, `Delivery drivers are a familiar part of [[the gig economy]].`, `A gig is a short job, originally a musician's booking. Related: <em>a gig worker</em>.`),
        co(`a zero-hours contract`, `an agreement in which the employer does not promise any minimum number of working hours`, `She left her job because [[a zero-hours contract]] made it impossible to plan her month.`, `Zero hours guaranteed. Typical UK term; critics say it brings insecurity.`),
        co(`on a freelance basis`, `working for different clients instead of being employed by one company`, `He translates texts [[on a freelance basis]] for several publishers.`, `A basis is the arrangement. Also <em>on a part-time / temporary basis</em>.`),
        co(`a side hustle`, `a second job or small business that you do alongside your main work to earn extra money`, `Her pottery [[side hustle]] now earns as much as her day job.`, `Informal, from AmE slang. Hustle = work energetically for money.`),
        co(`shortlist candidates`, `to choose a small number of the best applicants to consider further`, `We [[shortlisted five candidates]] and invited them to interview.`, `A short list is the reduced list. Noun: <em>be on the shortlist</em>.`),
        co(`a probationary period`, `the first weeks or months of a job when an employer checks whether you are suitable`, `I will be on [[a probationary period]] of three months.`, `Probation = a test period. Often shortened to <em>probation</em>.`),
        co(`a competitive salary`, `pay that is as good as or better than what other employers offer`, `The advert promised [[a competitive salary]] and flexible hours.`, `Competitive = able to compete with others. Typical of job advertisements.`),
        co(`a graduate scheme`, `a training programme that large companies offer to new university graduates`, `He joined [[a graduate scheme]] at a bank and rotated through four departments.`, `Scheme (UK) = organised programme. AmE: <em>a management trainee programme</em>.`),
        co(`take a career break`, `to leave work for a time, intending to return later`, `After ten years in banking she [[took a career break]] to travel.`, `Break = pause. Noun: <em>a career break</em>.`),
        co(`a dead-end job`, `a job with no chance of promotion or improvement`, `He felt trapped in [[a dead-end job]] on the production line.`, `A dead end is a road with no exit. Opposite: <em>a job with prospects</em>.`),
        co(`work unsociable hours`, `to work late at night, early in the morning or at weekends`, `Nurses often [[work unsociable hours]] and miss family events.`, `Unsociable = not suited to social life. Typical UK collocation.`),
        co(`headhunt a candidate`, `to find a skilled person who already has a job and persuade them to join your company`, `The firm [[headhunted]] her from its biggest competitor.`, `Companies "hunt" for a particular head, meaning a person. Noun: <em>a headhunter</em>.`)
      ]
    },
    {
      id: 'topic-social-media', title: 'Social media and influencers', short: 'Followers, going viral, online abuse and screen habits.',
      section: 'Topic vocabulary',
      idea: `<p>Social media vocabulary falls into <strong>reach</strong> (<em>go viral, build a following, trending, a sponsored post</em>), <strong>behaviour</strong> (<em>scroll endlessly, post on impulse, curate your online image, share your every move</em>) and <strong>harm</strong> (<em>online abuse, cyberbullying, an echo chamber, fake news, spread misinformation</em>). Use the third set for balanced essays: <em>While social media connects people, it can also ...</em></p>`,
      cards: [
        co(`a clickbait headline`, `a title designed to attract clicks, often exaggerating what the article says`, `I fell for [[a clickbait headline]] and the article said nothing new.`, `Bait attracts a fish; here it attracts clicks.`),
        co(`build a following`, `to gradually gain many people who regularly read or watch your content`, `It took him three years to [[build a following]] on the platform.`, `A following = the group of followers. Also <em>a loyal / huge following</em>.`),
        co(`a sponsored post`, `an online message that a company has paid someone to publish`, `Users must now label every [[sponsored post]] clearly.`, `The sponsor pays, so the content is advertising. Also <em>a paid partnership</em>.`),
        co(`an echo chamber`, `an online space where people only hear opinions like their own`, `Algorithms can trap users in [[an echo chamber]] of one-sided views.`, `Sounds bounce back unchanged in an echo chamber. Used in discussions of polarisation.`),
        co(`tighten your privacy settings`, `to make your online accounts show less information to strangers`, `After the data leak, I [[tightened my privacy settings]] on every account.`, `Tighten = make stricter. Also <em>change your privacy settings</em>.`),
        co(`curate your online image`, `to choose carefully what you show of yourself so that you look good`, `Teenagers often [[curate their online image]] with filtered photos.`, `A curator selects works for a museum; you select your life.`),
        co(`online abuse`, `insulting or threatening messages sent to people over the internet`, `Public figures often receive [[online abuse]] after expressing an opinion.`, `Verbs: <em>suffer, report, tackle</em>. Related: <em>trolling, cyberbullying</em>.`),
        pv(`scroll through`, `to move down a screen quickly, looking at posts without reading them closely`, `I [[scrolled through]] my feed for an hour without noticing the time.`, `You move the page by scrolling. Related: <em>doomscrolling</em>.`),
        co(`a brand ambassador`, `a person paid to promote a company's products, often through social media`, `The footballer became [[a brand ambassador]] for a sportswear label.`, `Ambassador = official representative. A brand is the company's name and image.`),
        co(`be glued to your screen`, `to spend all your attention on a phone or computer`, `Half the class was [[glued to their screens]] during the break.`, `Glued = stuck fast. Informal, usually critical.`),
        co(`a digital detox`, `a period during which you deliberately stop using phones and the internet`, `We went on [[a digital detox]] and left our phones at home for a weekend.`, `A detox removes toxins; here the "toxin" is screen time. Verbs: <em>do, go on</em>.`),
        co(`trending topics`, `subjects that large numbers of people are talking about online at the moment`, `The election was among the top [[trending topics]] all week.`, `To trend = to be currently popular. Used with <em>on social media</em>.`)
      ]
    },
    {
      id: 'topic-language-use', title: 'Language learning and language use', short: 'Fluency, accents, mistakes and getting your message across.',
      section: 'Topic vocabulary',
      idea: `<p>Learners are often asked to talk about <strong>how people learn</strong> and <strong>how language works in real life</strong>. The chunks cover <strong>progress</strong> (<em>pick up a language, polish up, make steady progress, reach a high level of fluency</em>), <strong>problems</strong> (<em>a false friend, a strong accent, lost for words, on the tip of my tongue</em>) and <strong>communication</strong> (<em>get your message across, read between the lines, translate word for word, in plain English</em>). A good Part 4 answer separates <em>learning in a classroom</em> from <em>picking it up in the country</em>.</p>`,
      cards: [
        pv(`pick up a language`, `to learn a language gradually, without formal lessons`, `Children [[pick up a language]] simply by playing with other children.`, `You collect it like something along the way. Contrast with <em>study a language</em>.`),
        pv(`polish up`, `to improve a skill or piece of work by making small corrections`, `I need to [[polish up]] my English before the interview.`, `You polish something until it shines. Separable: <em>polish it up</em>.`),
        co(`translate word for word`, `to translate each word separately instead of the whole meaning`, `Beginners often [[translate word for word]] and produce sentences that sound strange.`, `The result is a literal, unnatural translation. Compare <em>a literal translation</em>.`),
        co(`make steady progress`, `to improve at a regular, reliable rate`, `She is [[making steady progress]] with her German.`, `Progress is uncountable: <em>make progress</em>, not "a progress".`),
        co(`reach a high level of fluency`, `to be able to speak easily and without long pauses`, `It took her six years to [[reach a high level of fluency]].`, `Fluency is a noun; <em>fluent</em> is the adjective: <em>fluent in Spanish</em>.`),
        co(`a false friend`, `a word that looks like a word in your language but has a different meaning`, `The Spanish "actual" is [[a false friend]]: it means "current", not "real".`, `It looks like a friend but misleads you. Spanish learners meet many.`),
        co(`get your message across`, `to make other people understand what you mean`, `My vocabulary was small, but I managed to [[get my message across]].`, `Across = from one side to the other, like a bridge.`),
        co(`a strong accent`, `a very noticeable way of pronouncing a language that shows where you come from`, `He speaks fluently, though with [[a strong accent]].`, `Adjectives: <em>strong, heavy, slight, regional</em>. Say <em>have / speak with an accent</em>.`),
        id(`lost for words`, `so surprised or moved that you cannot find anything to say`, `When they announced the surprise party, I was [[lost for words]].`, `You cannot find words. Compare <em>be at a loss for words</em>.`),
        id(`on the tip of my tongue`, `a word you know but cannot remember at that moment`, `His name is [[on the tip of my tongue]]; it begins with a K.`, `The word is almost spoken. Usually said as <em>It's on the tip of my tongue</em>.`),
        co(`read between the lines`, `to understand a meaning that is not directly stated`, `If you [[read between the lines]], the report is really criticising the manager.`, `The meaning sits in the gaps. Also an inference skill in Reading Part 5.`),
        co(`in plain English`, `in simple, clear language that is easy to understand`, `Could you explain the contract [[in plain English]]?`, `Plain = simple, without decoration. Often asked of lawyers and officials.`)
      ]
    },
    {
      id: 'topic-volunteering', title: 'Volunteering and charity', short: 'Giving time and money, fundraising and helping the community.',
      section: 'Topic vocabulary',
      idea: `<p>Charity language moves from <strong>giving</strong> (<em>make a donation, a charitable cause, raise funds, sponsor a runner</em>) to <strong>helping directly</strong> (<em>volunteer your time, lend a hand, give something back, a soup kitchen</em>) and <strong>the effect</strong> (<em>make a difference, tackle poverty, those in need, a sense of purpose</em>). Many essays ask whether governments or individuals should help the needy: <em>those in need</em> and <em>give something back</em> make the contrast sound natural.</p>`,
      cards: [
        co(`make a donation`, `to give money or goods to a charity`, `Please [[make a donation]] to help flood victims.`, `Donate is the verb; <em>make a donation</em> is the usual noun phrase. Also <em>a generous donation</em>.`),
        co(`a charitable cause`, `an aim or problem that a charity works to solve`, `She devotes her weekends to [[a charitable cause]] close to her heart.`, `Cause = the reason people unite for. Pattern: <em>support / champion a cause</em>.`),
        co(`raise funds for`, `to collect money for a particular purpose`, `The school held a bake sale to [[raise funds for]] the new library.`, `Funds = money for a purpose. Noun: <em>a fundraiser</em>, meaning an event or a person.`),
        co(`give something back`, `to do something good for a community or person that has helped you`, `Now that she is successful, she wants to [[give something back]] to her home town.`, `You return what you received. Often said by successful people.`),
        id(`lend a hand`, `to help someone, especially with a practical task`, `Could you [[lend a hand]] with these boxes?`, `A hand stands for help. Informal and friendly.`),
        co(`make a difference`, `to have a positive effect on a situation or people's lives`, `One kind teacher can [[make a difference]] to a child's whole future.`, `A difference exists between before and after. Often used with <em>real, huge, little</em>.`),
        co(`those in need`, `people who lack money, food or other basic things`, `The charity delivers hot meals to [[those in need]].`, `The + adjective/phrase = a group of people. Also <em>the needy</em>, which sounds more formal.`),
        co(`a soup kitchen`, `a place where free meals are given to homeless or poor people`, `He volunteers at [[a soup kitchen]] every Tuesday evening.`, `Soup was the cheap, easy food to serve to many. A kitchen here is a place, not a room.`),
        co(`tackle poverty`, `to take action to deal with poverty`, `Governments must do more to [[tackle poverty]] among children.`, `To tackle = to try to deal with a hard problem. Also <em>tackle unemployment / crime</em>.`),
        co(`volunteer your time`, `to give free hours to help an organisation`, `She [[volunteers her time]] at the local animal shelter.`, `Volunteer can be a verb with a direct object. Also <em>volunteer for</em> a task.`),
        co(`a sense of purpose`, `the feeling that your life or actions have a useful aim`, `Helping others gave him [[a sense of purpose]] after he retired.`, `Compare <em>a sense of belonging / achievement</em>. Verbs: <em>give, lose, find</em>.`),
        co(`a fundraising event`, `an organised occasion, such as a race or a concert, held to collect money for a cause`, `The school is holding [[a fundraising event]] on Saturday to pay for new playground equipment.`, `Fundraising = the activity of collecting money. Compare <em>a charity auction / sponsored walk</em>.`)
      ]
    },
    {
      id: 'topic-problem-solving', title: 'Problem-solving and mindset', short: 'Facing difficulties, staying positive and finding solutions.',
      section: 'Topic vocabulary',
      idea: `<p>Mindset vocabulary has three steps. First, <strong>the problem appears</strong> (<em>come up against, hit a brick wall, a stumbling block, go round in circles</em>). Then <strong>you respond</strong> (<em>think outside the box, weigh up the options, get to the root of, find a way round, come up with a solution</em>). Finally <strong>you learn</strong> (<em>learn from your mistakes, bounce back, a blessing in disguise, look on the bright side</em>). Use the third set to end personal stories positively.</p>`,
      cards: [
        co(`a stumbling block`, `something that makes it difficult to make progress`, `Lack of funding proved [[a stumbling block]] for the project.`, `You trip over it. Often <em>the main / biggest stumbling block</em>.`),
        id(`hit a brick wall`, `to be unable to make any more progress because something stops you completely`, `The investigation [[hit a brick wall]] when the main witness disappeared.`, `A wall cannot be passed. Informal.`),
        id(`go round in circles`, `to keep discussing or trying the same things without making any progress`, `We [[went round in circles]] for an hour and still had no decision.`, `Like walking in a circle: you move but arrive nowhere. UK; AmE often says <em>go around in circles</em>.`),
        co(`think outside the box`, `to think in a new, creative way instead of the usual way`, `To win this contract we will have to [[think outside the box]].`, `The "box" is the usual limits of thinking. Adjective: <em>out-of-the-box ideas</em>.`),
        pv(`weigh up`, `to consider the good and bad points of something before deciding`, `You should [[weigh up]] the costs and benefits before signing.`, `Imagine scales with pros and costs on two sides. Separable: <em>weigh the options up</em>.`),
        co(`get to the root of`, `to find the basic cause of a problem`, `We need to [[get to the root of]] the staff turnover problem.`, `A root is the hidden origin of a plant. Also <em>the root cause</em>.`),
        pv(`iron out`, `to solve small difficulties or problems`, `We still have a few details to [[iron out]] before the launch.`, `You flatten creases in cloth. Separable: <em>iron the problems out</em>.`),
        co(`find a way round`, `to deal with a problem by an indirect method instead of removing it`, `If the system blocks the file, we will [[find a way round]] it.`, `A way going round an obstacle. UK English; AmE often says <em>around</em>.`),
        pv(`bounce back`, `to recover quickly after a failure or difficult period`, `The company [[bounced back]] within a year of the crisis.`, `Like a ball hitting the floor. Often used with <em>from</em>: <em>bounce back from defeat</em>.`),
        id(`turn a corner`, `to start to improve after a difficult period`, `The company seems to have [[turned a corner]] after two years of losses.`, `After the corner, the road looks different. Often <em>turn the corner</em>.`),
        id(`look on the bright side`, `to think about the positive aspects of a bad situation`, `We missed the train, but let's [[look on the bright side]]: we can have lunch first.`, `Bright = full of light. Often used as advice.`),
        co(`learn from your mistakes`, `to improve by thinking about what went wrong`, `The best managers [[learn from their mistakes]] and share the lessons.`, `Say <em>learn from</em>, not "learn of". Related: <em>learn your lesson</em>.`)
      ]
    },
    {
      id: 'topic-film-streaming', title: 'Film, TV and streaming', short: 'Plots, performances, reviews and binge-watching.',
      section: 'Topic vocabulary',
      idea: `<p>Talking about films and series needs three kinds of language. <strong>Story</strong> (<em>a gripping plot, a twist, a cliffhanger, a predictable storyline</em>), <strong>performance and production</strong> (<em>a stellar cast, steal the show, a big-budget production, stunning special effects</em>) and <strong>watching habits</strong> (<em>binge-watch, stream, catch up on, a box set, subtitles</em>). When you review something, give an opinion and a reason: <em>It is worth watching for the cast alone.</em></p>`,
      cards: [
        co(`a convincing performance`, `acting that feels real and believable`, `She gave [[a convincing performance]] as a lawyer under pressure.`, `Convincing = able to make you believe. Also <em>a moving performance</em>.`),
        co(`a plot twist`, `an unexpected change in the story`, `The final [[plot twist]] left the audience stunned.`, `The story turns suddenly. Warn others with <em>no spoilers</em>.`),
        co(`end on a cliffhanger`, `to finish an episode at an exciting, unresolved moment`, `Each episode [[ends on a cliffhanger]], so you have to watch the next one.`, `The hero hangs from a cliff: you must wait. Noun and verb use.`),
        co(`a stellar cast`, `a group of actors who are all excellent or famous`, `The drama boasts [[a stellar cast]] of award-winning actors.`, `Stellar = relating to stars. Compare <em>an all-star cast</em>.`),
        co(`a supporting role`, `a smaller part in a film or play that is not the main character`, `He won an award for [[a supporting role]] as the hero's father.`, `Supporting = helping the main part. Contrast <em>the leading role</em>.`),
        co(`a box set`, `a collection of all episodes of a series, sold or offered together`, `We spent the winter watching [[a box set]] of a Scandinavian crime series.`, `Originally a physical set in a box. UK spelling often <em>boxset</em> online.`),
        co(`binge-watch a series`, `to watch many episodes one after another in a short time`, `I [[binge-watched]] the whole series in a weekend.`, `Binge = doing something too much, like eating. Informal.`),
        pv(`catch up on`, `to watch or read things that you missed`, `I am trying to [[catch up on]] last season before the new one starts.`, `You move faster to reach the others. Also <em>catch up with</em> a person.`),
        co(`a big-budget production`, `a film or show that costs a lot of money to make`, `The studio's latest [[big-budget production]] flopped at the box office.`, `Hyphenated before a noun. Opposite: <em>a low-budget film</em>.`),
        co(`a critical success`, `a work that critics praise very highly`, `The low-budget film was [[a critical success]] but did not make much money.`, `Contrast <em>a commercial success</em>, which sells well.`),
        co(`a predictable storyline`, `a story whose ending you can easily guess`, `The film was beautiful to look at but had [[a predictable storyline]].`, `Predictable is a criticism of plots. Also <em>formulaic, clichéd</em>.`),
        co(`a feel-good film`, `a film that is light and leaves you happy and positive`, `After a stressful week I just want [[a feel-good film]] and a takeaway.`, `You feel good afterwards. Also <em>a feel-good factor</em>, a general mood of optimism.`)
      ]
    },
    {
      id: 'topic-food-diet', title: 'Food, diet and nutrition', short: 'Eating habits, processed food, cooking and healthy choices.',
      section: 'Topic vocabulary',
      idea: `<p>Food topics mix <strong>science</strong> and <strong>habits</strong>. Nutrition language describes what is in food (<em>a balanced diet, nutritional value, processed food, cut down on sugar</em>), eating habits describe behaviour (<em>eat on the go, comfort eating, skip breakfast, grab a bite</em>) and food culture describes meals and cooking (<em>home-cooked meals, an acquired taste, whet your appetite, a staple food</em>). Essays on health often link <em>fast food culture</em> to <em>obesity</em> and <em>eating habits</em>.</p>`,
      cards: [
        co(`go on a diet`, `to start eating less or differently in order to lose weight`, `He [[went on a diet]] before the wedding and lost five kilos.`, `Prepositions: <em>on a diet</em>, not "in". Opposite sense: <em>come off a diet</em>.`),
        co(`processed food`, `food that has been changed by industry, often with added sugar, salt or preservatives`, `Too much [[processed food]] has been linked to heart disease.`, `Uncountable. Contrast with <em>fresh / whole foods</em>.`),
        co(`nutritional value`, `how much of the substances our bodies need a food contains`, `White bread has less [[nutritional value]] than wholemeal.`, `Nutrition = what food gives the body. Adjective: <em>nutritious</em>.`),
        pv(`fill up on`, `to eat so much of one food that you have no room for anything else`, `Don't [[fill up on]] bread before the main course.`, `Fill = make full. Followed by food nouns.`),
        co(`eat on the go`, `to eat while travelling or busy, without sitting down for a proper meal`, `Commuters often [[eat on the go]] and skip lunch.`, `On the go = in constant motion. Related: <em>a quick bite</em>.`),
        co(`comfort eating`, `eating a lot when you feel unhappy or stressed, rather than from hunger`, `Exams drive many students to [[comfort eating]].`, `Food gives emotional comfort. Uncountable noun.`),
        id(`an acquired taste`, `something you only begin to like after trying it several times`, `Black coffee is [[an acquired taste]] for most people.`, `You acquire (gain) the liking gradually.`),
        id(`whet your appetite`, `to make you want more of something, especially food`, `A small starter will [[whet your appetite]] for the main course.`, `To whet = to sharpen a knife. Often used also of ideas: <em>whet your appetite for travel</em>.`),
        co(`a staple food`, `a food that forms the main part of people's diet in a region`, `Rice is [[a staple food]] for billions of people.`, `Staple = main, regular item. Also <em>the staple diet</em>.`),
        co(`home-cooked meals`, `meals prepared at home from basic ingredients`, `Nothing beats [[home-cooked meals]] after a long week away.`, `Compound adjective before noun. Compare <em>ready meals</em>.`),
        co(`food intolerance`, `a condition in which your body reacts badly to a food without being a true allergy`, `Her [[food intolerance]] means she cannot eat dairy products.`, `Intolerant = unable to bear something. Contrast <em>a food allergy</em>, which is an immune reaction.`),
        pv(`stock up on`, `to buy a large amount of something so that you have enough for later`, `We [[stocked up on]] tinned food before the storm.`, `Stock = a supply. Often used with <em>supplies, food, water</em>.`)
      ]
    },
    {
      id: 'topic-weather-climate', title: 'Weather and climate language', short: 'Storms, heatwaves, forecasts and climate change.',
      section: 'Topic vocabulary',
      idea: `<p>Weather language has <strong>everyday chunks</strong> (<em>a heavy downpour, scattered showers, a cold snap, a heatwave, a prolonged heatwave</em>) and <strong>climate chunks</strong> (<em>extreme weather events, rising sea levels, global warming, a record temperature, a long spell of drought</em>). Note that <strong>weather</strong> is short-term and <strong>climate</strong> is the long-term pattern; examiners notice when learners mix them up. UK speakers use <em>weather</em> idioms to be polite and to start conversations.</p>`,
      cards: [
        co(`a heavy downpour`, `a sudden, very strong fall of rain`, `We were soaked by [[a heavy downpour]] on the way home.`, `Down + pour. Related: <em>a torrential downpour, a cloudburst</em>.`),
        co(`scattered showers`, `short periods of rain in some places but not everywhere`, `The forecast promises sunshine with [[scattered showers]] in the afternoon.`, `Typical of weather forecasts. A shower is brief rain. Also <em>heavy / light showers</em>.`),
        co(`a cold snap`, `a short period of suddenly very cold weather`, `[[A cold snap]] in April killed many early blossoms.`, `A snap is something sudden. Compare <em>a heatwave</em>.`),
        co(`a prolonged heatwave`, `a long period of unusually hot weather`, `[[A prolonged heatwave]] put pressure on hospitals and power stations.`, `Prolonged = lasting a long time. Formal; used in news reports.`),
        co(`extreme weather events`, `very severe weather such as storms, floods and droughts`, `Scientists warn that [[extreme weather events]] will become more common.`, `Extreme = far from normal. Usually plural.`),
        co(`rising sea levels`, `the gradual increase in the height of the sea`, `[[Rising sea levels]] threaten low-lying islands.`, `A level goes up and down. Used with <em>threaten, pose a risk to</em>.`),
        co(`a long spell of drought`, `a period of weeks or months with very little rain`, `[[A long spell of drought]] left the reservoirs almost empty.`, `Spell = a period of weather. Also <em>a dry spell, a cold spell</em>.`),
        co(`a record temperature`, `a temperature higher or lower than any recorded before`, `The city recorded [[a record temperature]] of 41 degrees.`, `Record = best or worst ever. Also <em>record rainfall</em>.`),
        id(`it is raining cats and dogs`, `it is raining very heavily`, `We could not go out because [[it was raining cats and dogs]].`, `Origin uncertain; a funny exaggeration. Only informal speech, never formal writing.`),
        id(`a bolt from the blue`, `a shocking and completely unexpected piece of news`, `Her resignation came as [[a bolt from the blue]].`, `Lightning from a clear sky. A weather image for surprise.`),
        id(`save it for a rainy day`, `to keep money for a time when you may need it`, `Don't spend all your bonus; [[save it for a rainy day]].`, `Rain stands for hard times. Often said as advice: <em>save something for a rainy day</em>.`),
        co(`weather the storm`, `to survive a difficult period successfully`, `The small bakery managed to [[weather the storm]] of the recession.`, `A ship that weathers a storm survives it. A metaphor in business language.`)
      ]
    },
    {
      id: 'topic-money-debt', title: 'Money, spending and debt', short: 'Budgets, loans, savings and the cost of living.',
      section: 'Topic vocabulary',
      idea: `<p>Money language splits into <strong>coming in</strong> (<em>earn a living, a steady income, a pay rise, the minimum wage</em>), <strong>going out</strong> (<em>make ends meet, splash out, overspend, the cost of living, a tight budget</em>) and <strong>trouble and safety</strong> (<em>run up debts, get into debt, pay off a loan, build up savings, a nest egg</em>). Idioms such as <em>make ends meet</em> and <em>splash out</em> make speaking sound natural, while <em>run up</em> and <em>pay off</em> are common in written texts.</p>`,
      cards: [
        co(`a steady income`, `regular money that comes in at predictable times`, `Freelancers often struggle to have [[a steady income]].`, `Steady = regular and reliable. Compare <em>a sizeable / disposable income</em>.`),
        id(`live from hand to mouth`, `to have only just enough money to buy what you need immediately`, `For years the family [[lived from hand to mouth]].`, `Money goes from the hand straight to the mouth for food. Also <em>a hand-to-mouth existence</em>.`),
        pv(`splash out`, `to spend a lot of money on something enjoyable that you do not really need`, `For our anniversary we [[splashed out]] on a luxury hotel.`, `Like splashing water everywhere. Usually with <em>on</em> + noun.`),
        pv(`run up`, `to allow a bill or debt to grow bigger`, `She [[ran up]] a huge credit card debt during her studies.`, `The amount runs upward. Usually <em>run up debts / a bill</em>.`),
        pv(`chip in`, `to give a small amount of money towards a shared cost`, `We all [[chipped in]] to buy her a leaving present.`, `Each person adds a small piece. Informal. Pattern: <em>chip in (with) money</em>.`),
        co(`get into debt`, `to begin to owe money that you cannot easily repay`, `Many young people [[get into debt]] because of easy credit.`, `Opposite: <em>get out of debt</em>. Do not use "in debts".`),
        co(`the cost of living`, `the amount of money people need for basic things such as housing and food`, `Salaries have not kept pace with [[the cost of living]].`, `Singular noun phrase. Compare <em>the standard of living</em>, which describes comfort.`),
        co(`a tight budget`, `very limited money to spend`, `We are working on [[a tight budget]], so we cannot hire anyone.`, `Tight = with no room to spare. Also <em>stay within budget</em>.`),
        id(`a nest egg`, `money saved for the future, especially for retirement`, `They built up [[a nest egg]] for their old age.`, `A nest egg is a sum you leave untouched to grow. The exact origin is uncertain; just learn it as a chunk.`),
        id(`be in the red`, `to have spent more money than is in your account`, `Our account has been [[in the red]] since March.`, `Red ink was used for debts in accounts. Opposite: <em>be in the black</em>.`),
        id(`live beyond your means`, `to spend more money than you earn`, `Many people [[live beyond their means]] and rely on credit cards.`, `Means = money available. Opposite: <em>live within your means</em>.`),
        co(`build up your savings`, `to gradually collect money that you do not spend`, `It takes discipline to [[build up your savings]] on a low salary.`, `Build up = increase little by little. Compare <em>dip into your savings</em>.`)
      ]
    },
    {
      id: 'adj-noun-sets', title: 'Adjective + noun sets: heavy, high, wide, vast', short: 'Which adjective is natural with which noun?',
      section: 'Collocations and patterns',
      idea: `<p>English chooses adjectives by habit, not by logic. Learn <strong>by adjective</strong>: <em>heavy</em> goes with things that press or arrive in force (<em>heavy traffic, heavy rain, a heavy smoker</em>); <em>high</em> with levels (<em>a high standard, high hopes, a high risk</em>); <em>wide</em> with range (<em>a wide variety, a wide range, wide-ranging reforms</em>); <em>vast</em> with great size or number (<em>a vast majority, vast amounts of</em>); <em>deep</em> with feelings and thought (<em>deep concern, a deep sleep</em>). Spanish speakers often translate "fuerte" or "grande" as <em>strong / big</em>; check this set before you do.</p>`,
      cards: [
        co(`heavy traffic`, `many vehicles on the road, moving slowly`, `[[Heavy traffic]] delayed the ambulance.`, `Not "strong traffic". Also <em>heavy rain, a heavy drinker, heavy losses</em>.`),
        co(`a heavy smoker`, `a person who smokes very many cigarettes`, `He was [[a heavy smoker]] for thirty years.`, `Heavy = in large quantity. Also <em>a heavy drinker</em>, not "a strong smoker".`),
        co(`high hopes`, `strong expectations that something good will happen`, `The coach has [[high hopes]] for the new striker.`, `Not "big hopes". Also <em>high expectations, high spirits</em>.`),
        co(`a high standard`, `a level of quality that is very good`, `The restaurant maintains [[a high standard]] of service.`, `Standards are measured in height. Opposite: <em>a low standard</em>.`),
        co(`a wide variety of`, `many different kinds of`, `The market sells [[a wide variety of]] spices.`, `Wide describes range. Also <em>a wide range of</em>, <em>wide-ranging</em>.`),
        co(`the vast majority`, `almost all of a group`, `[[The vast majority]] of students passed.`, `Vast = enormous; the pattern is <em>the vast majority of + plural noun</em>. Also <em>the overwhelming / great majority</em>.`),
        co(`vast amounts of`, `extremely large quantities of`, `The company spends [[vast amounts of]] money on advertising.`, `Followed by an uncountable noun. Also <em>vast sums</em>.`),
        co(`deep concern`, `serious and genuine worry`, `Teachers expressed [[deep concern]] about the new timetable.`, `Feelings are "deep". Also <em>deep regret, deeply moved</em>.`),
        co(`a bitter disappointment`, `something that makes you feel very sad because it did not turn out as you hoped`, `The result was [[a bitter disappointment]] for the fans.`, `Bitter = hard to accept. Also <em>bitter experience, a bitter argument, bitter cold</em>.`),
        co(`sound advice`, `sensible, reliable advice`, `My tutor gave me [[sound advice]] about choosing a course.`, `Sound = reliable. Also <em>a sound investment, sound judgement</em>.`),
        co(`a narrow escape`, `a situation in which you only just avoid danger`, `The passengers had [[a narrow escape]] when the bus skidded.`, `Narrow = with very little space. Also <em>a narrow margin / victory</em>.`),
        co(`bear a striking resemblance to`, `to look very much like someone or something`, `She [[bears a striking resemblance to]] her grandmother.`, `Striking = noticeable. Pattern: resemblance <em>to</em>, not "with".`)
      ]
    },
    {
      id: 'confusable-abstract', title: 'Confusable pairs: chance, activity, offer, find out', short: 'Words with similar meanings and different grammar.',
      section: 'Collocations and patterns',
      idea: `<p>Spanish speakers lose marks when two English words share one Spanish translation. This set puts each confusable pair in a <strong>typical frame</strong>: <em>opportunity</em> is something you can use (<em>take an opportunity</em>), <em>occasion</em> is a particular event (<em>on this occasion</em>) and <em>chance</em> is likelihood (<em>a slim chance</em>). <em>Find out</em> means to discover a fact, <em>know</em> a state, <em>learn</em> a process. <em>Action</em> is a single deed, <em>activity</em> is something you do repeatedly. Check the frame, not the translation.</p>`,
      cards: [
        co(`seize an opportunity`, `to use a favourable situation quickly, before it passes`, `She [[seized the opportunity]] to work abroad.`, `An opportunity is a chance to act. Compare <em>a golden opportunity</em>.`),
        co(`on this occasion`, `at this particular time, as a single event`, `I forgive you [[on this occasion]], but it must not happen again.`, `An occasion is a specific event. Compare <em>on one occasion, on the rare occasion</em>.`),
        co(`a slim chance`, `a very small possibility`, `There is only [[a slim chance]] that the flight will leave on time.`, `Chance = likelihood. Opposites: <em>a good / fair chance</em>. Note <em>by chance</em> = accidentally.`),
        co(`a remote possibility`, `something that could happen but is very unlikely`, `A strike is [[a remote possibility]] at this stage.`, `Possibility = what can happen. Not used for opportunity: "a possibility to learn" is wrong.`),
        co(`take decisive action`, `to do something firm and effective to deal with a problem`, `The government must [[take decisive action]] against pollution.`, `Action = a deed or step. Uncountable here; <em>actions</em> = deeds of a person.`),
        co(`leisure activities`, `things people do for enjoyment in their free time`, `The centre offers a range of [[leisure activities]] for older people.`, `Activity = a regular occupation. Also <em>outdoor / physical activity</em>.`),
        co(`be aware of`, `to know about something because you have noticed or been told`, `Few drivers are [[aware of]] the new speed limit.`, `Aware = knowing. State, not discovery. Compare <em>become aware of</em>.`),
        co(`find out the truth about`, `to discover the real facts about something, often after being misled`, `She [[found out the truth about]] the company only after she had resigned.`, `Find out = discover a fact at a moment. <em>Know</em> = state; <em>learn</em> = gradual process. Say <em>find out about</em>, not "know about" a discovery.`),
        co(`know for a fact`, `to be completely certain that something is true`, `I [[know for a fact]] that she never received the email.`, `Know = a state of certainty, not an action. No continuous form.`),
        co(`provide evidence`, `to supply proof or information`, `The company failed to [[provide evidence]] of its claims.`, `Provide = supply what is needed. Pattern: <em>provide X for Y</em> or <em>provide Y with X</em>.`),
        co(`offer a solution`, `to suggest or put forward a way of solving a problem`, `Nobody was able to [[offer a solution]] to the traffic problem.`, `Offer = put forward for acceptance. Compare <em>give an answer</em>.`),
        co(`give a presentation`, `to present information to an audience`, `She [[gave a presentation]] on renewable energy.`, `Give = deliver. Verbs like make/give/do depend on the noun: <em>give a talk, make a speech, do research</em>.`)
      ]
    },
    {
      id: 'hedging-disagreeing', title: 'Hedging and polite disagreement', short: 'Softening opinions and disagreeing without sounding rude.',
      section: 'Collocations and patterns',
      idea: `<p>C1 speakers rarely say "You are wrong". They <strong>hedge</strong> (soften what they say) and <strong>concede first</strong>. Use <strong>distance</strong> (<em>It could be argued that, As far as I can tell</em>), <strong>partial agreement</strong> (<em>I see your point, but; That is true up to a point</em>) and <strong>mild limits</strong> (<em>to some extent, by and large, tend to</em>). In Speaking Part 3, this makes you sound thoughtful. In essays, it prevents sweeping claims that examiners mark as overstatement.</p>`,
      cards: [
        ex(`It could be argued that`, `a way of presenting an opinion without claiming it is your only view`, `[[It could be argued that]] cheaper public transport would solve most of the problem.`, `Passive and conditional keep you at a distance. Typical for essays.`),
        ex(`As far as I can tell`, `based on what I know, although I may be missing something`, `[[As far as I can tell]], the new system is working well.`, `Admits limited knowledge, so it softens a claim.`),
        ex(`I see your point, but`, `I understand your idea, though I do not fully agree`, `[[I see your point, but]] I think the cost would be too high.`, `Acknowledge first, then disagree. Never skip the first half.`),
        ex(`That is true up to a point`, `partly correct, but not completely`, `[[That is true up to a point]], although it ignores the long-term effects.`, `Up to a point = to a limited degree. Neutral and polite.`),
        ex(`I am inclined to think that`, `I tend to believe, though I am not certain`, `[[I am inclined to think that]] the project will need another year.`, `Inclined = leaning towards. More formal than <em>I think</em>.`),
        ex(`for the most part`, `in most cases or to a large degree`, `[[For the most part]], the plan is sensible, although it needs more detail.`, `Looks at the bigger part and ignores small exceptions.`),
        ex(`more often than not`, `in most cases, though not always`, `[[More often than not]], the trains run on time.`, `Often + a hint of exception. Good for hedging generalisations.`),
        ex(`to some extent`, `partly, but not completely`, `[[To some extent]], the critics are right, but the full picture is more complicated.`, `Extent = degree. Admits a limit. Also <em>to a certain extent</em>, and <em>to a large extent</em> (stronger).`),
        ex(`It seems to me that`, `a phrase that marks something as a personal impression`, `[[It seems to me that]] the second plan is more realistic.`, `Marks the view as personal, so nobody can say it is false.`),
        ex(`I am not entirely convinced`, `I have doubts, though I do not say you are wrong`, `[[I am not entirely convinced]] that a four-day week would work for hospitals.`, `Not entirely = not completely. A polite way of expressing doubt.`),
        ex(`With respect, I would argue that`, `a formal way to disagree, often in meetings and debates`, `[[With respect, I would argue that]] the figures tell a different story.`, `Names the disagreement openly but politely. It can sound sharp if overused.`),
        ex(`Surely that depends on`, `a way to challenge a statement by showing it is not always true`, `[[Surely that depends on]] how much training the staff receive?`, `Surely invites the other speaker to reconsider. Use a rising tone.`)
      ]
    }
  ];

  C1.vocab.push(...groups);
})();
