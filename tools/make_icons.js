/* Draws the app icons with Pica, the site's magpie: icons/icon.svg, icon-192.png, icon-512.png, icon-maskable-512.png.   node tools/make_icons.js
   The PNGs are screenshots of the SVG taken by headless Chrome or Edge (set CHROME=/path/to/browser to pick one). */
const fs = require('fs'), path = require('path'), os = require('os'), { execFileSync } = require('child_process');
const out = path.join(__dirname, '..', 'icons');
const CANDIDATES = [process.env.CHROME, 'C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/usr/bin/google-chrome', '/usr/bin/chromium', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'].filter(Boolean);
const chrome = CANDIDATES.find((p) => fs.existsSync(p));
if (!chrome) { console.error('No Chrome or Edge found. Set CHROME=/path/to/browser.'); process.exit(2); }

/* the same drawing as PICA() in js/ask.js (64 x 64 units), with fixed colours */
const PICA = `<path d="M10 46 L1 58 L18 52 Z" fill="#111"/><ellipse cx="30" cy="40" rx="20" ry="17" fill="#111"/>
<path d="M22 44 Q32 60 46 44 Q38 38 22 44 Z" fill="#fff"/><path d="M14 38 Q26 28 40 40 Q26 50 14 38 Z" fill="#8db1ff" stroke="#0b3d91" stroke-width="1.5"/>
<circle cx="44" cy="22" r="13" fill="#111"/><path d="M54 20 L63 24 L54 28 Z" fill="#d98e04"/><circle cx="47" cy="20" r="3.2" fill="#fff"/><circle cx="48" cy="20.5" r="1.5" fill="#111"/>
<path d="M38 11 Q42 6 47 9" fill="none" stroke="#111" stroke-width="3" stroke-linecap="round"/>`;
/* Pica sits on a white disc on the blue tile; the maskable version has more margin so any shape the phone cuts still shows all of it */
const svg = (maskable) => {
  const r = maskable ? 150 : 200, s = maskable ? 4.4 : 5.3, tx = 256 - 32 * s, ty = 256 - 32 * s;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512"${maskable ? '' : ' rx="96"'} fill="#0b3d91"/><circle cx="256" cy="256" r="${r}" fill="#fff"/><g transform="translate(${tx.toFixed(1)} ${ty.toFixed(1)}) scale(${s})">${PICA}</g></svg>`;
};

fs.writeFileSync(path.join(out, 'icon.svg'), svg(false) + '\n');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'c1icons-'));
for (const [name, size, maskable] of [['icon-192.png', 192, false], ['icon-512.png', 512, false], ['icon-maskable-512.png', 512, true]]) {
  const html = path.join(tmp, name + '.html');
  fs.writeFileSync(html, `<!doctype html><meta charset="utf-8"><style>html,body{margin:0;background:transparent}svg{display:block;width:${size}px;height:${size}px}</style>${svg(maskable)}`);
  execFileSync(chrome, ['--headless=new', '--disable-gpu', '--no-sandbox', '--hide-scrollbars', '--default-background-color=00000000', `--window-size=${size},${size}`, '--screenshot=' + path.join(out, name), 'file:///' + html.replace(/\\/g, '/')], { stdio: 'ignore' });
  console.log(name, fs.statSync(path.join(out, name)).size, 'bytes');
}
fs.rmSync(tmp, { recursive: true, force: true });
