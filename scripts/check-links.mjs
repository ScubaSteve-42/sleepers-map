// Checks that every "Read more" link in the dataset still resolves. Needs network access, so it is not part of `npm test`.
//   node scripts/check-links.mjs [--out report.json]
// A link is "dead" when the host does not resolve or the server answers 404 or 410; 401, 403, 429 and timeouts are reported as
// "unverified" because many sites refuse automated requests.
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const graph = JSON.parse(readFileSync(path.join(root, 'data/graph.json'), 'utf8'));
const outArg = process.argv.indexOf('--out');
const urls = new Map();   // url -> node ids that cite it
for (const n of graph.nodes) for (const r of n.refs ?? []) { if (!urls.has(r.url)) urls.set(r.url, []); urls.get(r.url).push(n.id); }

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
async function probe(url) {
  for (const method of ['HEAD', 'GET']) {
    const ctl = new AbortController(); const timer = setTimeout(() => ctl.abort(), 20000);
    try {
      const res = await fetch(url, { method, redirect: 'follow', signal: ctl.signal, headers: { 'user-agent': UA, accept: 'text/html,*/*' } });
      clearTimeout(timer);
      if (res.status < 400) return { status: res.status };
      if (method === 'HEAD' && [400, 403, 405, 406, 501].includes(res.status)) continue;   // some servers reject HEAD
      return { status: res.status };
    } catch (e) {
      clearTimeout(timer);
      if (method === 'HEAD') continue;
      return { error: String(e.cause?.code ?? e.name ?? e) };
    }
  }
  return { error: 'unknown' };
}

const list = [...urls.keys()], results = new Map(); let next = 0;
async function worker() { while (next < list.length) { const u = list[next++]; results.set(u, await probe(u)); } }
await Promise.all(Array.from({ length: 10 }, worker));

const dead = [], unverified = [];
for (const [u, r] of results) {
  const gone = r.status === 404 || r.status === 410 || ['ENOTFOUND', 'ERR_INVALID_URL'].includes(r.error);
  const soft = [401, 403, 429, 999].includes(r.status) || (r.status >= 500) || ['AbortError', 'UND_ERR_CONNECT_TIMEOUT', 'ECONNRESET', 'unknown'].includes(r.error);
  if (gone) dead.push({ url: u, ...r, nodes: urls.get(u) }); else if (r.status >= 400 || r.error) unverified.push({ url: u, ...r, nodes: urls.get(u), soft });
}
console.log(`${list.length} unique links checked: ${list.length - dead.length - unverified.length} ok, ${unverified.length} unverified, ${dead.length} dead`);
for (const d of dead) console.log(`DEAD ${d.status ?? d.error} ${d.url} (${d.nodes.join(', ')})`);
for (const d of unverified) console.log(`unverified ${d.status ?? d.error} ${d.url} (${d.nodes.slice(0, 3).join(', ')})`);
if (outArg > 0) writeFileSync(process.argv[outArg + 1], JSON.stringify({ dead, unverified }, null, 1));
process.exit(dead.length ? 1 : 0);
