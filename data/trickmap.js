window.C1 = window.C1 || {};
/* Which trick belongs to which kind of mistake. Each row is [trick key, pattern]: the key is the section id and the item's
   position in data/tricks.js ("words-0" = first trick of "words"); the pattern is matched, ignoring case, against the question and the answers (not the explanation, which names too many things),
   the right answer and the explanation. "a & b" means both must appear. The first row that matches wins, so the narrow ones come first.
   If you reorder items in data/tricks.js, update the keys here (tools/validate-node.js checks that every key exists). */
C1.trickMap = [
  /* exam strategies and grammar structures with a distinctive surface form */
  ['grammar-5', '\\b(hardly|barely|scarcely)\\b.*\\b(when|before)\\b|\\bno sooner\\b|\\bnot only\\b.*\\bdid\\b'],
  ['grammar-4', '\\b(never|rarely|seldom|little|nowhere|under no circumstances|not until|only when|only after|only then)\\b.*\\b(do|does|did|have|has|had|is|are|was|were|can|could|will|would)\\b (i|you|he|she|we|they|it|the)\\b|\\binversion\\b'],
  ['grammar-2', '\\b(i|we|he|she|they|you) wish\\b|\\bif only\\b|\\bwish\\b.*\\b(would|had|were)\\b'],
  ['grammar-3', '\\bif\\b.*\\bwill\\b.*\\b(instead|not use|never)\\b|\\bwill\\b after (if|when|unless)\\b|\\bnever "?will"? after\\b'],
  ['grammar-6', '\\bso\\b&\\bsuch\\b'],
  ['grammar-7', '\\btoo\\b&\\benough\\b'],
  ['grammar-8', '\\balthough\\b&\\bdespite\\b|\\bdespite\\b&\\bhowever\\b|\\bin spite of\\b&\\balthough\\b'],
  ['grammar-13', '\\bhave (it|my \\w+|your \\w+|the \\w+|her \\w+|his \\w+) (done|repaired|cut|painted|fixed|checked|cleaned|serviced)\\b|\\bget (it|my \\w+) (done|repaired|cut)\\b|\\bcausative\\b'],
  ['grammar-14', '\\bis (said|thought|believed|known|reported|expected|considered|understood) (to|that)\\b|\\b(are|were|was) (said|thought|believed|known|reported|expected|considered) to\\b'],
  ['grammar-18', '\\bwhom\\b'],
  ['grammar-19', '\\b(so|neither|nor) (do|does|did|am|is|are|was|were|have|has|can|will|would) (i|we|you|he|she|they|it)\\b'],

  /* prepositions */
  ['preps-6', '\\bon time\\b|\\bin time\\b'],
  ['preps-7', '\\bin the end\\b|\\bat the end\\b'],
  ['preps-8', '\\bago\\b&\\b(since|for)\\b.*\\b(years?|months?|weeks?|days?|hours?)\\b'],
  ['preps-9', '\\b(the|a) (best|worst|tallest|biggest|most|least|oldest|highest|largest|fastest)\\b.*\\b(in|of) (the )?(world|class|team|group|all|his|her|their|my|our|europe|city|country|town|office|company)\\b'],

  /* word formation */
  ['wf-1', '\\b(im|il|ir)-|\\bnegative prefix\\b'],
  ['wf-3', '\\by (becomes|changes to) i\\b|\\bchange the y\\b'],

  /* natural English and style */

  /* common word pairs and confusions */
  ['words-0', '\\b(mak(e|es|ing)|made|do|does|did|doing|done)\\s+(a\\s+|an\\s+|the\\s+|your\\s+|my\\s+|some\\s+|any\\s+)?(decisions?|mistakes?|efforts?|progress|money|homework|favou?rs?|research|business|best|shopping|damage|difference|noises?|housework|exercises?)\\b'],
  ['words-1', '\\b(say|says|said)\\b&\\b(tell|tells|told)\\b'],
  ['words-2', '\\b(bring|brought)\\b&\\b(take|took|taken)\\b'],
  ['words-3', '\\b(borrow(ed|s)?|lend|lent)\\b'],
  ['words-4', '\\b(hear|heard)\\b&\\b(listen(ed)?|look(ed)?|watch(ed)?|see|saw)\\b'],
  ['words-5', '\\bexpect(s|ed)?\\b&\\b(wait|hope)\\b'],
  ['words-6', '\\b(steal|stole|stolen|rob|robbed)\\b'],
  ['words-7', '\\b(raise[sd]?|raising)\\b&\\b(rise[sn]?|rose|rising)\\b'],
  ['words-8', '\\bfewer\\b'],
  ['words-9', '\\b(among|amongst)\\b&\\bbetween\\b'],
  ['words-10', '\\bbeside\\b&\\bbesides\\b'],
  ['words-11', '\\bfun\\b&\\bfunny\\b'],
  ['words-12', '\\b(affect|affected|affects)\\b&\\b(effect|effects)\\b'],
  ['words-13', '\\beconomic\\b&\\beconomical\\b|\\bhistoric\\b&\\bhistorical\\b'],
  ['words-14', '\\b(hard|hardly)\\b&\\b(late|lately|near|nearly)\\b|\\bhardly\\b&\\b(hard)\\b'],
  ['words-15', '\\b(used to|get used to|be used to|am used to|getting used to|got used to|are used to|is used to)\\b'],
  ['words-16', '\\bloose\\b&\\blose\\b'],
  ['words-17', '\\blater\\b&\\bafterwards\\b'],
  ['words-18', '\\b(lie|lying|lain)\\b&\\b(lay|laid|laying)\\b'],
  ['words-20', '\b(lose|lost|losing)\b&\b(miss|missed|missing)\b'],
  ['words-22', '\btrip\b&\bjourney\b'],
  ['words-24', '\bmeet\b&\bknow\b'],
  ['preps-10', '\b(arrive|arrives|arrived|arriving) (___|in|at|on)\b'],
  ['words-25', '\\bquit\\b&\\bquite\\b|\\bquite\\b&\\bquiet\\b|\\bquit\\b&\\bquiet\\b'],
  ['words-26', '\\bsometimes?\\b&\\bsome time\\b'],
  ['words-27', '\\bevery day\\b&\\beveryday\\b'],
  ['words-28', '\\bpeople\\b&\\bpersons\\b'],
  ['words-29', '\\b(ask|asked)\\b&\\bquestion\\b&\\b(make|made)\\b'],
  ['words-31', '\\bfit\\b&\\bsuit\\b'],
  ['grammar-17', '\\bsome\\b&\\bany\\b'],
  ['grammar-21', '\\b(could you tell me|can you tell me|do you know|i wonder|i would like to know|i\'d like to know|any idea|no idea|have no idea)\\b'],
  ['grammar-22', '\\b(explain|explained|suggest|suggested|mention|mentioned|describe|described)\\b.*\\bto (me|him|her|us|them|you)\\b|\\b(explain|suggest|mention|describe)(ed)? (me|him|her|us|them)\\b'],
  ['grammar-23', '\\brecommend(ed|s)? (you|him|her|us|them|me) to\\b|\\brecommend(ed)?\\b&\\b(visiting|that)\\b'],
  ['grammar-24', '\\bas\\b&\\blike\\b'],
  ['grammar-27', '\\bmust\\b&\\b(have to|has to|had to|mustn\'t|don\'t have to|doesn\'t have to|needn\'t)\\b'],
  ['grammar-28', '\\bhad better\\b'],
  ['grammar-29', '\\bno longer\\b|\\banymore\\b'],
  ['grammar-33', '\\b(two|three|four|five|six|seven|eight|nine|ten|several|few|many) (hundred|thousand|million)s?\\b'],
  ['grammar-34', '\\bits\\b&\\bit\'s\\b'],
  ['grammar-36', '\\b(you and (i|me)|me and you|(he|she|they|my \\w+) and (i|me))\\b'],
  ['grammar-39', '\\b(it\'s|it has|it is) (been )?(ages|years|months|weeks|days) since\\b|\\bsince (i|we|he|she|they) (last )?(saw|met|spoke)\\b'],
  ['grammar-40', '\\bcongratulat\\w+ (you |him |her |them |us |me )?(on|for)\\b'],
  ['preps-13', '\\bhow much time\\b'],
  ['preps-16', '\\b(at|in) the airport\\b'],
  ['preps-17', '\\b(at|on|in) the corner\\b'],
  ['wf-5', '\\b(bored|excited|interested|tired|confused|surprised|annoyed|embarrassed|exhausted)\\b&\\b(boring|exciting|interesting|tiring|confusing|surprising|annoying|embarrassing|exhausting)\\b'],
  ['wf-10', '\\b(over|under)(worked|paid|estimate|estimated|crowded|weight|cooked|eat|react|dressed|used|rated|staffed|developed|priced)\\b'],
  ['words-19', '\\bgreet(ed|ing)?\\b'],

  /* Spanish speakers */
  ['spanish-6', '\\b(take|took|taken|make|made) (a )?(decision|photo|photograph|picture|exam|test|break|bath|shower|walk)\\b'],

  /* exam techniques (matched on the task wording) */
];

/* The trick for a wrong answer, or null. Only short exercises (grammar, vocabulary, word choice) get one: comprehension
   questions have long answers that mention these words by chance. q = the question, given = what the learner chose, expected = right answers. */
C1.trickFor = (q, given, expected) => {
  const tidy = (t) => String(t == null ? '' : t).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const exp = (expected || []).map(tidy), text = [q, given].map(tidy).concat(exp).join(' ');
  if (!exp.length || exp.some((e) => e.length > 40) || tidy(given).length > 40 || /^(what|which|why|how|who|where|according|in what|the writer)/i.test(tidy(q))) return null;
  const row = C1.trickMap.find(([, p]) => p.split('&').every((s) => new RegExp(s, 'i').test(text)));
  if (!row) return null;
  const [sec, i] = row[0].split('-'), s = C1.tricks.find((x) => x.id === sec), t = s && s.items[+i];
  return t ? { key: row[0], title: t.t } : null;
};
