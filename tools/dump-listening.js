/* Prints every listening script as JSON (used by tools/make_audio.py): node tools/dump-listening.js */
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
const ctx = { console }; ctx.window = ctx; vm.createContext(ctx);
const files = [...fs.readFileSync(path.join(root, 'index.html'), 'utf8').matchAll(/<script src="(data\/listening\d*\.js)"/g)].map((m) => m[1]);
files.forEach((f) => vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f }));
console.log(JSON.stringify(ctx.C1.listening.map((s) => ({ id: s.id, title: s.title, script: s.script }))));
