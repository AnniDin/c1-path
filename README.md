# C1 Path

Understand-first English practice for **Cambridge C1 Advanced**, **Linguaskill** and **CertAcles**. Static site: no build step, no server, no dependencies.

## Run it

Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8765
```

then visit http://localhost:8765. Progress (streaks, accuracy, flashcard schedule) is stored in the browser's `localStorage`.

## Publish

Push to GitHub and enable Pages on the `main` branch (root folder). Nothing else is needed.

## Two ways to study

- **Course**: 22 units from B2 to C1 (work, technology, everyday English, health, word power, nature, cities, education, society, culture, law and media, consumers and arts, travel, family, sport, talk skills, society and work, lifestyle and language, then the listening, writing and Use of English labs). Each combines vocabulary, grammar and exam practice, ends with a mixed review, and there is a general mixed review for revising everything.
- **Full test**: one task of each Reading and Use of English part with a 60-minute timer, scored by part.
- **Library**: every area on one page, to study in any order: grammar, vocabulary (flashcards and quizzes), Use of English and Reading, Listening (recordings read aloud by the browser, plus dictation), Speaking (timer, recorder, self-assessment) and Writing (workspace with word count, text analyser, annotated models), plus the exam guide.
- **Optional AI feedback** (Review page): paste your own API key (Google Gemini or Groq, both with free plans, or paid Anthropic Claude) to get examiner-style feedback on writing and speaking and extra explanations of wrong answers. The key stays in your browser and is never part of backups or sync.
- **Review** (flashcards due, mistakes, mixed review, progress) and **Notes**: every wrong answer is saved with its explanation and re-asked until you get it right twice; your own notes live in a drawer that opens from the Notes button (or Alt+N) on every page, and can be docked beside the page on wide screens.

Both use the same content; a unit is just an ordered path through it. `validate()` reports any lesson, vocabulary group or practice set that no unit uses.

## Structure

- `data/grammar.js`, `data/grammar2.js`, `data/grammar3.js` – lessons: category, idea, explanation, traps, exam relevance, quiz
- `data/vocab.js`, `data/vocab2.js` – vocabulary groups in four sections (phrasal verbs, collocations and patterns, idioms and expressions, topic vocabulary)
- `data/practice.js`, `practice2.js`, `practice3.js` – practice sets: multiple-choice cloze, open cloze, word formation, key word transformations, reading comprehension, gapped text
- `data/course.js`, `data/course2.js` – the themed course: units that point at grammar lessons, vocabulary groups and practice sets
- `data/listening.js`, `data/writing.js`, `data/speaking.js` – skills content (scripts and questions, tasks with models, speaking prompts and guides)
- `data/placement.js` – 24-question placement test (B1 to C1)
- `data/exams.js` – exam format summaries
- `tools/validate.js` – paste into the browser console and run `validate()` after adding content
- `js/store.js` – progress, streaks, spaced repetition (Leitner boxes)
- `js/engine.js` – exercise rendering, checking and feedback
- `js/ai.js` – optional AI feedback client (bring your own key)
- `audio/`, `tools/make_audio.py`, `tools/dump-listening.js` – recorded listening audio (6.5 MB) generated with Kokoro, an open-source neural text-to-speech model (Apache-2.0, https://github.com/thewh1teagle/kokoro-onnx). To regenerate after changing a script, see the instructions at the top of `tools/make_audio.py`. Without a recording the site falls back to the browser's own voices.
- `js/sync.js` – sync between devices (cloud account, shared file or transfer code), always merging both sides
- `js/cloud.js`, `js/config.js`, `supabase/` – optional Supabase accounts: see `supabase/README.md`
- `js/app.js` – core views and router; `js/skills.js` – mistakes, the notes drawer and the skills views; `js/main.js` – start-up and service worker
- `sw.js`, `manifest.webmanifest`, `icons/` – offline use and installability (served over http(s) only)

Content lives in plain `.js` files (not JSON) so the site also works when opened straight from disk.

## Adding content

Grammar quiz items, vocabulary cards and Use of English sets follow the shapes already in the data files. Every item needs a `why` explanation. Keep the principle: explain the reason, not just the rule.


## Added later

- **Full tests** now cover Reading and Use of English Parts 1 to 8 (`data/practice6.js` cross-text, `data/practice7.js` multiple matching) and keep a score history in Review.
- **Exam plan** (`#/plan`), **weak spots** (`#/weak`), daily quests, XP and achievements (`js/plan.js`, `js/rewards.js`).
- **Offline and install**: PNG icons and manifest; the recorded listening audio can be saved for offline use from Review (`c1path-audio` cache, served by `sw.js`).
- **Friends leaderboard** (`js/friends.js`): optional, needs `supabase/friends.sql` run once in the Supabase SQL editor (after `schema.sql`).
- **Content based on reference coursebooks.** The authors gave permission to base the site on the books' contents, not to copy them. A gap analysis (what each book teaches versus what the site lacked) led to original material only: `data/grammar4.js` and `data/grammar5.js` (word building, nouns, verbs, adjectives, likelihood, speaking and discussion skills), `data/vocab5.js` (13 topic and collocation groups), `data/listening4.js` (lectures, attitude, distractors, two sources; audio made with `tools/make_audio.py`), `data/practice8.js` (more Part 5 and Part 7) and units 14 to 17 in `data/course5.js`.
- **Tests:** `node tools/validate-node.js` checks the content; `node tools/test.js` checks merging between devices, XP, quests and streaks. `node tools/smoke.js` renders every page in Node with a fake DOM, checks `h()`/`view()` flattening, that every listening has a recording with one mark per line, and that every `#/` link points to a real page. All three run in GitHub Actions.
- **Everyday English and truquitos.** A second gap analysis (two Spanish-language books of English tricks, used with the author's permission as inspiration only) produced original material: `data/tricks2.js` and `data/tricks3.js` (about 90 more truquitos, plus an 'Everyday English' section), `data/vocab6.js` (12 groups for restaurants, shops, doctors, work, plans, travel and more), `data/listening5.js` (three everyday conversations with audio) and units 18 and 19 in `data/course6.js`.

- **Unit 20 and 21:** `listening-lab` (six more recordings, `data/listening6.js`, `listening7.js`) and `writing-workshop` (six more writing tasks with annotated models, `data/writing4.js`, `writing5.js`). AI writing checks are saved per task (last 6) so the panel shows the change since the previous attempt.
- **Exams tab** (`#/mock`): full tests, the CertAcles-style paper, exam date and plan, test history and the exams explained, in one place. **Unit 22** `use-of-english-lab` adds 15 sets (`data/practice9.js`, `practice10.js`: 4 multiple-choice cloze, 4 open cloze, 4 word formation, 3 key word transformation).
- **What to do next** (`js/next.js`): after every quiz the result box recommends two or three next steps from the score, the exam part, the difficulty of the sets and what is still undone (harder set after a strong score, easier set plus base lessons after a weak one, mistakes, due cards, weak spots, exam date). **Difficulty ladder:** `data/levels1.js` to `levels3.js` hold an expert rating from 1 (warm-up) to 5 (hardest) for every practice set, listening set, writing task and speaking set; lists show them from easier to harder (progress is still stored by set number). `tools/validate.js` requires a rating for every item and course levels that never go down; `node tools/difficulty.js` prints the distribution. The course order and levels live in `data/course_order.js`.
- **Friends are mutual** (`supabase/friends_mutual.sql`, also folded into `friends.sql`): adding a friend code makes both people see each other.
