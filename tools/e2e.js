/* Runs tools/e2e.html in headless Chrome or Edge and prints the result: node tools/e2e.js
   Serves the repository on a random local port, so nothing else needs to be running. Set CHROME=/path/to/chrome to pick the browser. */
const http = require('http'), fs = require('fs'), path = require('path'), { execFile } = require('child_process');
const root = path.join(__dirname, '..');
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.mp3': 'audio/mpeg', '.webmanifest': 'application/manifest+json' };
const CANDIDATES = [process.env.CHROME, 'C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'].filter(Boolean);
const chrome = CANDIDATES.find((p) => fs.existsSync(p));
if (!chrome) { console.error('No Chrome or Edge found. Set CHROME=/path/to/browser.'); process.exit(2); }

const server = http.createServer((req, res) => {
  const p = path.join(root, decodeURIComponent(req.url.split('?')[0]).replace(/\/$/, '/index.html'));
  if (!p.startsWith(root) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end('not found'); }
  res.writeHead(200, { 'content-type': TYPES[path.extname(p)] || 'application/octet-stream' });
  fs.createReadStream(p).pipe(res);
}).listen(0, '127.0.0.1', () => {
  const url = `http://127.0.0.1:${server.address().port}/tools/e2e.html`;
  const profile = fs.mkdtempSync(path.join(require('os').tmpdir(), 'c1e2e-'));
  execFile(chrome, ['--headless=new', '--disable-gpu', '--no-sandbox', '--user-data-dir=' + profile, '--virtual-time-budget=600000', '--dump-dom', url],
    { maxBuffer: 100 * 1024 * 1024, timeout: 900000 }, (err, stdout) => {
      server.close();
      try { fs.rmSync(profile, { recursive: true, force: true }); } catch (e) { /* ignore */ }
      const m = String(stdout).match(/<pre id="out">([\s\S]*?)<\/pre>/);
      if (!m) { console.error('The test page produced no output.', err ? err.message : ''); process.exit(2); }
      const outText = m[1].replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&');
      console.log(outText.trim());
      const r = outText.match(/E2E-RESULT passed=(\d+) failed=(\d+)/);
      process.exit(r && r[2] === '0' ? 0 : 1);
    });
});
