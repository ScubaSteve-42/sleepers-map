// Checks one authored slice against the registry without touching data/graph.json:
//   node scripts/check-slice.mjs data/src/s01-foundations-compilers.json
// Errors exit non-zero; warnings are advice (length targets, thin linking).
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const KINDS = new Set(['influenced', 'evolved-into', 'implements', 'uses', 'created-by', 'part-of', 'competes-with', 'replaced-by', 'related']);
const STATUS = new Set(['thriving', 'niche', 'legacy', 'dead', 'n/a']);
const file = path.resolve(process.argv[2] ?? '');
if (!existsSync(file)) { console.error('usage: node scripts/check-slice.mjs data/src/<slice>.json'); process.exit(2); }

const errors = [], warnings = [];
const err = (m) => errors.push(m), warn = (m) => warnings.push(m);
let slice;
try { slice = JSON.parse(readFileSync(file, 'utf8')); } catch (e) { console.error(`JSON parse error: ${e.message}`); process.exit(1); }

const reg = JSON.parse(readFileSync(path.join(root, 'data/src/registry.json'), 'utf8'));
const regById = new Map(reg.nodes.map((n) => [n.id, n]));
// nodes written in the other slices (the core slices hold the nodes that are not in the registry); a slice that someone is
// rewriting right now may be unreadable for a moment, so skip it rather than fail
const srcDir = path.join(root, 'data/src');
const others = readdirSync(srcDir).filter((f) => f.endsWith('.json') && f !== 'registry.json' && path.join(srcDir, f) !== file)
  .flatMap((f) => { try { return JSON.parse(readFileSync(path.join(srcDir, f), 'utf8')).nodes ?? []; } catch { return []; } });
const otherById = new Map(others.map((n) => [n.id, n]));
const cats = new Map(JSON.parse(readFileSync(path.join(root, 'data/categories.json'), 'utf8')).map((c) => [c.key, c]));
const known = new Set([...regById.keys(), ...otherById.keys()]);
const own = new Set((slice.nodes ?? []).map((n) => n.id));
const catOf = (id) => (regById.get(id) ?? otherById.get(id))?.cat;

const sliceName = slice.slice ?? path.basename(file, '.json');
const expected = reg.nodes.filter((n) => n.slice === sliceName);
const seen = new Set();
for (const nd of slice.nodes ?? []) {
  const w = `node "${nd.id}"`;
  if (seen.has(nd.id)) err(`${w}: duplicate id in slice`); seen.add(nd.id);
  const r = regById.get(nd.id);
  if (!r) warn(`${w}: not in the registry (added node)`);
  else {
    if (r.slice !== sliceName) err(`${w}: registry assigns it to slice ${r.slice}`);
    for (const f of ['title', 'cat', 'tier', 'year']) if (nd[f] !== r[f]) warn(`${w}: ${f} is ${JSON.stringify(nd[f])} but the registry says ${JSON.stringify(r[f])}`);
  }
  for (const f of ['title', 'cat', 'short', 'long']) if (typeof nd[f] !== 'string' || !nd[f].trim()) err(`${w}: missing ${f}`);
  if (!cats.has(nd.cat)) err(`${w}: unknown category`);
  if (!Number.isInteger(nd.tier) || nd.tier < 0 || nd.tier > 4) err(`${w}: tier must be 0-4`);
  if (!Number.isInteger(nd.year) || nd.year < 1800 || nd.year > 2026) err(`${w}: bad year`);
  if (nd.status && !STATUS.has(nd.status)) err(`${w}: bad status`);
  if (nd.title?.length > 46) err(`${w}: title over 46 characters`);
  if (nd.short?.length > 190) err(`${w}: short is ${nd.short.length} chars (max 190)`); else if (nd.short?.length > 165) warn(`${w}: short is ${nd.short.length} chars (target 165)`);
  if (nd.long) { if (nd.long.length > 1300) err(`${w}: long is ${nd.long.length} chars (max 1300)`); else if (nd.long.length > 950) warn(`${w}: long is ${nd.long.length} chars (target 900)`); if (nd.long.length < 220) warn(`${w}: long is only ${nd.long.length} chars (target 280+)`); }
  if (nd.sleeper?.length > 340) err(`${w}: sleeper over 340 chars`); else if (nd.sleeper?.length > 300) warn(`${w}: sleeper over 300 chars`);
  if (nd.code) { if (!nd.code.lang || !nd.code.text) err(`${w}: code needs lang and text`); else { const n = nd.code.text.split('\n').length; if (n > 16) err(`${w}: code is ${n} lines (max 16)`); else if (n > 12) warn(`${w}: code is ${n} lines (target 12)`); } }
  for (const f of ['title', 'short', 'long', 'sleeper']) {
    const v = nd[f]; if (!v) continue;
    if (/\bTODO\b|\bTBD\b|lorem ipsum/i.test(v)) err(`${w}: placeholder text in ${f}`);
    if (/^#{1,6}\s|\*\*|—/.test(v)) warn(`${w}: ${f} contains markdown or an em dash`);
    if (v !== v.trim() || /  /.test(v)) warn(`${w}: odd whitespace in ${f}`);
  }
  for (const r2 of nd.refs ?? []) if (!/^https:\/\/\S+$/.test(r2.url ?? '') || !r2.label) err(`${w}: bad ref ${JSON.stringify(r2)}`);
}
for (const r of expected) if (!own.has(r.id)) warn(`registry row "${r.id}" has no node in this slice`);

const pairs = new Set(), out = new Map();
for (const e of slice.edges ?? []) {
  const w = `edge ${e.s} -> ${e.t}`;
  if (!own.has(e.s)) err(`${w}: source is not a node of this slice`);
  if (!known.has(e.t) && !own.has(e.t)) err(`${w}: unknown target`);
  if (e.s === e.t) err(`${w}: self loop`);
  if (![1, 2, 3].includes(e.w)) err(`${w}: weight must be 1, 2 or 3`);
  if (!KINDS.has(e.k)) err(`${w}: unknown kind "${e.k}"`);
  if (e.k === 'created-by' && catOf(e.t) && !['people', 'orgs'].includes(catOf(e.t))) err(`${w}: created-by target must be a person or organization`);
  const key = e.s < e.t ? `${e.s}|${e.t}` : `${e.t}|${e.s}`;
  if (pairs.has(key)) err(`${w}: duplicate pair`); pairs.add(key);
  out.set(e.s, (out.get(e.s) ?? 0) + 1);
}
for (const id of own) if (!out.get(id)) warn(`node "${id}": no outgoing edges (needs at least one, ideally two or more)`);
const avg = own.size ? ((slice.edges ?? []).length / own.size) : 0;
console.log(`${sliceName}: ${own.size} nodes (registry expects ${expected.length}), ${(slice.edges ?? []).length} edges, ${avg.toFixed(1)} edges per node`);
warnings.slice(0, 60).forEach((m) => console.warn('warn:', m));
if (warnings.length > 60) console.warn(`warn: ...and ${warnings.length - 60} more`);
errors.forEach((m) => console.error('error:', m));
console.log(errors.length ? `FAILED: ${errors.length} error(s)` : `OK: ${warnings.length} warning(s)`);
process.exit(errors.length ? 1 : 0);
