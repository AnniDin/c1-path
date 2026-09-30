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

## Structure

- `data/grammar.js`, `data/grammar2.js` – lessons: category, idea, explanation, traps, exam relevance, quiz
- `data/vocab.js`, `data/vocab2.js` – vocabulary groups in four sections (phrasal verbs, collocations and patterns, idioms and expressions, topic vocabulary)
- `data/practice.js`, `practice2.js`, `practice3.js` – practice sets: multiple-choice cloze, open cloze, word formation, key word transformations, reading comprehension, gapped text
- `data/placement.js` – 24-question placement test (B1 to C1)
- `data/exams.js` – exam format summaries
- `tools/validate.js` – paste into the browser console and run `validate()` after adding content
- `js/store.js` – progress, streaks, spaced repetition (Leitner boxes)
- `js/engine.js` – exercise rendering, checking and feedback
- `js/app.js` – views and router

Content lives in plain `.js` files (not JSON) so the site also works when opened straight from disk.

## Adding content

Grammar quiz items, vocabulary cards and Use of English sets follow the shapes already in the data files. Every item needs a `why` explanation. Keep the principle: explain the reason, not just the rule.
