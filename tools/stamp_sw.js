/* The service worker's cache name is a hash of every file it precaches, so the cache changes exactly when a file does and the worker can serve
   files from the cache without asking the network. `node tools/stamp_sw.js` rewrites it; tools/validate-node.js fails if it is out of date. */
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const root = path.join(__dirname, '..'), swFile = path.join(root, 'sw.js');

function expected() {
  const src = fs.readFileSync(swFile, 'utf8');
  const list = JSON.parse(/const PRECACHE = (\[.*?\]);/s.exec(src)[1]);
  const h = crypto.createHash('sha1');
  list.filter((f) => f !== './').sort().forEach((f) => {
    h.update(f + '\0');
    try { h.update(fs.readFileSync(path.join(root, f)).toString('latin1').replace(/\r\n/g, '\n')); } catch (e) { h.update('missing'); }
  });
  return { src, name: 'c1path-' + h.digest('hex').slice(0, 10) };
}
module.exports = { expected };

if (require.main === module) {
  const { src, name } = expected();
  fs.writeFileSync(swFile, src.replace(/const CACHE = '[^']*';/, `const CACHE = '${name}';`));
  console.log('sw.js cache name:', name);
}
