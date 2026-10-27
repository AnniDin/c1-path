window.C1 = window.C1 || {}; C1.visuals = C1.visuals || {};
/* Drawings for the theory pages (see js/diagrams.js for the shapes). C1.visuals[lessonId] = [{ after: 'idea' | 'part0' | 'part1' …, type, title, … }]. */
Object.assign(C1.visuals, {
  bestructures: [
    { after: 'idea', type: 'timeline', title: 'Three clocks for the future', caption: 'Where each structure points.', now: 24,
      marks: [{ x: 33, label: 'be about to', sub: 'the next second' }, { x: 62, label: 'be due to', sub: 'on the timetable' }, { x: 88, label: 'be to', sub: 'an official plan' }],
      say: 'Ask yourself: now, on a timetable, or ordered by an authority?' },
    { after: 'part0', type: 'blocks', title: 'BE TO: the pattern', rows: [
      { label: 'Official plan', parts: [{ t: 'The President', k: 'subj' }, { t: 'is to', k: 'aux' }, { t: 'visit', k: 'verb' }, { t: 'Spain', k: 'obj' }, { t: 'next month', k: 'time' }] },
      { label: 'Formal order', parts: [{ t: 'You', k: 'subj' }, { t: 'are not to', k: 'neg' }, { t: 'leave', k: 'verb' }, { t: 'the room', k: 'obj' }] }] },
    { after: 'part2', type: 'compare', title: 'Two meanings of "due to"', left: { title: 'be due to + verb', items: ['expected, scheduled', 'The train is due to arrive at 6.30.'], tone: 'ok' }, right: { title: 'due to + noun', items: ['because of', 'The delay was due to snow.'], tone: 'neutral' } },
    { after: 'part3', type: 'chooser', title: 'Which one?', rows: [
      { q: 'An authority has decided it', a: 'be to', ex: 'The tunnel is to open in June.' },
      { q: 'It is on the timetable', a: 'be due to', ex: 'The tunnel is due to open in June.' },
      { q: 'It is happening right now', a: 'be about to', ex: 'The tunnel is about to open.' }] }
  ]
});
