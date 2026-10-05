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

- **Course**: ten themed units (work, technology, health, nature, cities, education, society, culture, law and media, consumers and arts). Each combines vocabulary, grammar and exam practice, ends with a mixed review, and there is a general mixed review for revising everything.
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
- `js/sync.js` – sync between devices without accounts (shared file or transfer code, merging both sides)
- `js/app.js` – core views and router; `js/skills.js` – mistakes, the notes drawer and the skills views; `js/main.js` – start-up and service worker
- `sw.js`, `manifest.webmanifest`, `icons/` – offline use and installability (served over http(s) only)

Content lives in plain `.js` files (not JSON) so the site also works when opened straight from disk.

## Adding content

Grammar quiz items, vocabulary cards and Use of English sets follow the shapes already in the data files. Every item needs a `why` explanation. Keep the principle: explain the reason, not just the rule.
