window.C1 = window.C1 || {};
/* Pronunciation lab: sentences grouped by one sound or stress problem that Spanish speakers often have. Original sentences. */
C1.pron = [
  {
    id: 'ed', title: 'Past endings: -ed', tip: 'There are three sounds. After voiceless sounds (p, k, f, s, sh, ch) say /t/: <em>worked, stopped</em>. After voiced sounds say /d/: <em>played, lived</em>. After t or d add a whole syllable /ɪd/: <em>wanted, needed</em>. Never say "work-ed" with a full e.',
    items: ['I worked late and stopped for a coffee.', 'We played football until the lights switched off.', 'She wanted to start, but he needed more time.', 'They decided to rent a flat and invited us round.', 'The manager asked, answered and ended the call.']
  },
  {
    id: 'th', title: 'The TH sounds', tip: 'Put the tip of your tongue lightly between your teeth. <em>Think</em> and <em>thin</em> are voiceless; <em>this</em> and <em>other</em> are voiced. Do not replace them with s, t, f or d.',
    items: ['I think they thought about the weather.', 'This is the third thing the others mentioned.', 'Thank you for the thorough information.', 'My brother and I rather enjoy the theatre.', 'Thirty thousand people gathered on Thursday.']
  },
  {
    id: 'vowels', title: 'Short and long vowels', tip: 'Hold the long vowel longer and tense your lips: <em>sheep</em> /iː/ vs <em>ship</em> /ɪ/; <em>full</em> /ʊ/ vs <em>fool</em> /uː/. Spanish has only one "i" and one "u", so these pairs sound the same to many learners.',
    items: ['Keep the sheep in the field and the ship in the dock.', 'The fool was full of ideas.', 'Please sit on the seat by the window.', 'He will fill the bin and feel better.', 'It is a pity to waste a cheap meal.']
  },
  {
    id: 'stress', title: 'Word stress', tip: 'English stresses one syllable strongly and weakens the rest. Many nouns and verbs change stress: a <em>REcord</em> (noun), to <em>reCORD</em> (verb). Suffixes move it too: <em>PHOtograph, phoTOgraphy, photoGRAPHic</em>.',
    items: ['The photographer took a photograph for the exhibition.', 'We need a record of the increase in imports.', 'I would like to record the present for the future.', 'The economy has developed an enormous potential.', 'Her reputation depends on her communication skills.']
  },
  {
    id: 'numbers', title: 'Numbers that sound alike', tip: 'In <em>thirTEEN</em> the stress is on the end and the vowel is long; in <em>THIRty</em> the stress is first and the end is short. Practise 13/30, 14/40, 15/50.',
    items: ['It costs thirteen pounds, not thirty.', 'There are fourteen students in room forty.', 'The flight was delayed by fifteen minutes or maybe fifty.', 'Sixteen people came on the sixtieth day.', 'He is nineteen and his father is ninety.']
  },
  {
    id: 'words', title: 'Tricky C1 words', tip: 'Some words lose a syllable or hide letters: <em>comfortable</em> (COMF-ta-bul), <em>vegetable</em> (VEJ-ta-bul), <em>Wednesday</em> (WENZ-day), <em>necessary</em> (NESS-uh-ree), <em>environment</em> (en-VY-run-ment).',
    items: ['A comfortable chair is necessary for studying on Wednesday.', 'Vegetables are particularly good for the environment.', 'The schedule is probably quite different now.', 'Fortunately, the temperature was reasonable.', 'Several literature courses are especially interesting.']
  },
  {
    id: 'linking', title: 'Linking words together', tip: 'Native speakers join words: the end of one flows into the start of the next. <em>Turn it off</em> sounds like "turnitoff". Do not pause between every word, and do not stress the small words.',
    items: ['Turn it off and pick it up.', 'What are you going to do about it?', 'I had a cup of tea and an apple.', 'Put it on and take it off again.', 'Could you give me a hand with this?']
  },
  {
    id: 'schwa', title: 'Weak vowel /ə/', tip: 'The most common sound in English is a short, lazy vowel, /ə/ (the schwa), in unstressed syllables, whatever the spelling: <em>a</em>bout, <em>comp</em>a<em>ny</em>, teach<em>er</em>, les<em>son</em>. Spanish keeps every vowel clear (a-ssis-tant); in English only the stressed syllable is clear and the rest shrinks.',
    items: ['The assistant announced a different approach to the problem.', 'The politician gave a lengthy explanation of the original argument.', 'A professional adviser recommended a generous donation to the charity.', 'Our neighbour\'s grandfather remembered a terrible accident on the avenue.', 'The company\'s director apologised for the delay in the delivery.']
  },
  {
    id: 'sentence-stress', title: 'Sentence stress', tip: 'Stress the content words (nouns, main verbs, adjectives, adverbs, negatives) and weaken the function words (articles, prepositions, auxiliaries, pronouns). Tap the beat on the stressed words only: <em>We COULD have arRANGED the MEETing for a BETter TIME</em>, with the small words squeezed in between.',
    items: ['We could have arranged the meeting for a better time.', 'She has been working on the project since September.', 'Nobody told me that the office would be closed today.', 'I would have called you if I had known about it.', 'The government has promised to improve the standard of living.']
  },
  {
    id: 'h-and-r', title: 'H and R', tip: 'English <em>h</em> is only a soft breath, never the Spanish jota: <em>house</em>, not "jouse". It is silent in <em>hour, honest, honour, heir</em>. In British English <em>r</em> is not rolled: curl the tongue back without touching anything, and say it only before a vowel (<em>red, borrow</em>); in <em>car</em> or <em>market</em> it is silent.',
    items: ['The honest receptionist handed her the heavy red envelope.', 'Harry heard the whole hotel had been booked for an hour.', 'Rarely do rural areas receive a really reliable broadband service.', 'The remarkable author wrote a rather brilliant report on rising prices.', 'The heir to the throne hired a historian to research the history of his house.']
  },
  {
    id: 'ending-sounds', title: 'Endings: -s, -es', tip: 'The plural -s and the third-person -s have three sounds. After voiceless sounds say /s/: <em>stops, works</em>. After voiced sounds and vowels say /z/: <em>begins, plays</em>. After s, z, sh, ch, j sounds add a syllable /ɪz/: <em>buses, watches, judges</em>. Also finish every final consonant; do not add an "e" after it.',
    items: ['The teacher watches the students and changes the exercises.', 'She discusses problems with her colleagues and manages the budgets.', 'He drives past the offices and stops at the bridges.', 'Laws and regulations change, and this affects thousands of families.', 'My boss organises meetings, reads reports and approves expenses.']
  },
  {
    id: 'b-v-w', title: 'B, V and W', tip: 'Spanish uses one sound for b and v; English has three. <b>B</b>: both lips close, then pop. <b>V</b>: top teeth touch the lower lip and you hum. <b>W</b>: round the lips like the start of <em>huevo</em>, with no contact. Try <em>best / vest / west</em> and <em>berry / very</em>.',
    items: ['Victor believes we have a valid reason to move forward.', 'We walked to the village on Wednesday and bought five bottles of wine.', 'Barbara never visited the vast vineyard because the weather was awful.', 'Would you rather have a bigger room with a better view?', 'The brave workers waved a banner while the vehicle moved away.']
  }
];
