// Validates the merged graph. Errors fail the build; warnings are reported. `--strict` enforces the release size and coverage bars.
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const KINDS = new Set(['influenced', 'evolved-into', 'implements', 'uses', 'created-by', 'part-of', 'competes-with', 'replaced-by', 'related']);
const STATUS = new Set(['thriving', 'niche', 'legacy', 'dead', 'n/a']);

export function validateGraph(graph, { strict = false } = {}) {
  const errors = [], warnings = [];
  const err = (m) => errors.push(m), warn = (m) => warnings.push(m);
  const cats = new Set(graph.categories.map((c) => c.key));
  const ids = new Map();
  const deg = new Map();
  for (const nd of graph.nodes) {
    const where = `node "${nd.id}"`;
    if (!nd.id || !/^[a-z0-9]+(\.[a-z0-9-]+)*$/.test(nd.id)) err(`${where}: bad id`);
    if (ids.has(nd.id)) err(`${where}: duplicate id`); ids.set(nd.id, nd);
    deg.set(nd.id, 0);
    for (const f of ['title', 'cat', 'short', 'long']) if (typeof nd[f] !== 'string' || !nd[f].trim()) err(`${where}: missing ${f}`);
    if (!cats.has(nd.cat)) err(`${where}: unknown category "${nd.cat}"`);
    if (!Number.isInteger(nd.tier) || nd.tier < 0 || nd.tier > 4) err(`${where}: tier must be an integer 0-4`);
    if (!Number.isInteger(nd.year) || nd.year < 1800 || nd.year > 2026) err(`${where}: year out of range`);
    if (nd.status && !STATUS.has(nd.status)) err(`${where}: bad status "${nd.status}"`);
    if (nd.title && nd.title.length > 46) err(`${where}: title longer than 46 characters`);
    if (nd.short && nd.short.length > 190) err(`${where}: short is ${nd.short.length} characters (max 190)`);
    else if (nd.short && nd.short.length > 165) warn(`${where}: short is ${nd.short.length} characters (target 165)`);
    if (nd.long && nd.long.length > 1300) err(`${where}: long is ${nd.long.length} characters (max 1300)`);
    if (nd.long && nd.long.length < 80) warn(`${where}: long is very short`);
    if (nd.sleeper && nd.sleeper.length > 340) err(`${where}: sleeper longer than 340 characters`);
    if (nd.code) {
      if (!nd.code.text || !nd.code.lang) err(`${where}: code needs lang and text`);
      else if (nd.code.text.split('\n').length > 16) err(`${where}: code longer than 16 lines`);
    }
    for (const f of ['title', 'short', 'long', 'sleeper']) {
      const v = nd[f]; if (!v) continue;
      if (/\bTODO\b|\bTBD\b|lorem ipsum/i.test(v)) err(`${where}: placeholder text in ${f}`);
      if (v !== v.trim() || /\s{2,}/.test(v.replace(/\n/g, ' '))) warn(`${where}: odd whitespace in ${f}`);
    }
    for (const r of nd.refs ?? []) if (!/^https:\/\/\S+$/.test(r.url ?? '') || !r.label) err(`${where}: bad ref ${JSON.stringify(r)}`);
  }
  const seenPairs = new Set();
  for (const e of graph.edges) {
    const where = `edge ${e.s} -> ${e.t}`;
    if (!ids.has(e.s)) err(`${where}: unknown source`);
    if (!ids.has(e.t)) err(`${where}: unknown target`);
    if (e.s === e.t) err(`${where}: self loop`);
    if (![1, 2, 3].includes(e.w)) err(`${where}: weight must be 1, 2 or 3`);
    if (!KINDS.has(e.k)) err(`${where}: unknown kind "${e.k}"`);
    // direction conventions: "source <kind> target"; created-by must point at a person or organization
    if (e.k === 'created-by' && ids.has(e.t) && !['people', 'orgs'].includes(ids.get(e.t).cat)) err(`${where}: created-by target must be a person or organization`);
    if (e.k === 'part-of' && ids.has(e.s) && ids.has(e.t) && ids.get(e.s).tier < ids.get(e.t).tier) warn(`${where}: part-of points from a higher tier to a lower one (source should be the member)`);
    const key = e.s < e.t ? `${e.s}|${e.t}` : `${e.t}|${e.s}`;
    if (seenPairs.has(key)) err(`${where}: duplicate pair`); seenPairs.add(key);
    if (deg.has(e.s)) deg.set(e.s, deg.get(e.s) + 1);
    if (deg.has(e.t)) deg.set(e.t, deg.get(e.t) + 1);
  }
  // connectivity from the root
  const root0 = graph.nodes.find((n) => n.tier === 0);
  if (!root0) err('no tier-0 root node');
  else {
    const adj = new Map(graph.nodes.map((n) => [n.id, []]));
    for (const e of graph.edges) { adj.get(e.s)?.push(e.t); adj.get(e.t)?.push(e.s); }
    const seen = new Set([root0.id]), q = [root0.id];
    while (q.length) for (const m of adj.get(q.pop()) ?? []) if (!seen.has(m)) { seen.add(m); q.push(m); }
    for (const n of graph.nodes) if (!seen.has(n.id)) err(`node "${n.id}" is not connected to the root`);
  }
  for (const nd of graph.nodes) {
    const d = deg.get(nd.id) ?? 0;
    if (d === 0) err(`node "${nd.id}": isolated`);
    else if (d < 2 && nd.tier <= 3) warn(`node "${nd.id}": only ${d} edge (tier ${nd.tier})`);
    if (strict && nd.tier === 1 && d < 8) err(`hub "${nd.id}" has ${d} edges (need 8+)`);
  }
  for (const s of graph.tour ?? []) if (!ids.has(s.node)) err(`tour stop references unknown node "${s.node}"`);

  const byCat = {}, byTier = [0, 0, 0, 0, 0];
  graph.nodes.forEach((n) => { byCat[n.cat] = (byCat[n.cat] ?? 0) + 1; byTier[n.tier]++; });
  if (strict) {
    if (graph.nodes.length < 500) err(`only ${graph.nodes.length} nodes (need 500+)`);
    if (graph.edges.length < 1500) err(`only ${graph.edges.length} edges (need 1500+)`);
    for (const c of graph.categories) if (c.key !== 'root' && (byCat[c.key] ?? 0) < 8) err(`category "${c.key}" has only ${byCat[c.key] ?? 0} nodes (need 8+)`);
    if ((graph.tour ?? []).length < 10) err('tour needs 10+ stops');
    const reqPath = path.join(root, 'data/required-topics.json');
    if (existsSync(reqPath)) {
      for (const [topic, list] of Object.entries(JSON.parse(readFileSync(reqPath, 'utf8')))) {
        const missing = list.filter((id) => !ids.has(id));
        if (missing.length) err(`required topic "${topic}" is missing node(s): ${missing.join(', ')}`);
      }
    }
  }
  const avgDeg = graph.nodes.length ? (2 * graph.edges.length) / graph.nodes.length : 0;
  return { errors, warnings, stats: { nodes: graph.nodes.length, edges: graph.edges.length, avgDegree: +avgDeg.toFixed(2), byCat, byTier } };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const strict = process.argv.includes('--strict');
  const p = path.join(root, 'data/graph.json');
  if (!existsSync(p)) { console.error('data/graph.json not found; run `npm run merge` first'); process.exit(1); }
  const { errors, warnings, stats } = validateGraph(JSON.parse(readFileSync(p, 'utf8')), { strict });
  warnings.slice(0, 40).forEach((w) => console.warn('warn:', w));
  if (warnings.length > 40) console.warn(`warn: ...and ${warnings.length - 40} more`);
  errors.forEach((e) => console.error('error:', e));
  console.log(JSON.stringify(stats));
  console.log(errors.length ? `FAILED: ${errors.length} error(s)` : `OK${strict ? ' (strict)' : ''}: ${warnings.length} warning(s)`);
  process.exit(errors.length ? 1 : 0);
}
