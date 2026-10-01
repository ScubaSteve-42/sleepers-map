// After the slices are merged, report thin spots in the graph and write structural edges that fix them:
//   node scripts/suggest-links.mjs          (report only)
//   node scripts/suggest-links.mjs --write  (writes data/src/z-links.json, which the merge reads last)
// Rules: every node with fewer than 3 connections gains a part-of edge to its category's hub; every hub with fewer
// than 15 connections gains part-of edges from the nodes of its category that rank highest by tier.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mergeData } from './merge-data.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const write = process.argv.includes('--write');
const { graph } = mergeData({ write: false });
const byId = new Map(graph.nodes.map((n) => [n.id, n]));
const deg = new Map(graph.nodes.map((n) => [n.id, 0]));
const pair = new Set();
for (const e of graph.edges) { if (!byId.has(e.s) || !byId.has(e.t)) continue; deg.set(e.s, deg.get(e.s) + 1); deg.set(e.t, deg.get(e.t) + 1); pair.add(e.s < e.t ? `${e.s}|${e.t}` : `${e.t}|${e.s}`); }

// the main hub of each category: the tier-1 node with the most connections
const hubOf = new Map();
for (const n of graph.nodes) if (n.tier === 1 && (!hubOf.get(n.cat) || deg.get(n.id) > deg.get(hubOf.get(n.cat)))) hubOf.set(n.cat, n.id);
const add = [], addPair = new Set();
const link = (s, t, w, why) => { const k = s < t ? `${s}|${t}` : `${t}|${s}`; if (s === t || pair.has(k) || addPair.has(k)) return false; addPair.add(k); add.push({ s, t, w, k: 'part-of', note: why }); deg.set(s, deg.get(s) + 1); deg.set(t, deg.get(t) + 1); return true; };

for (const n of graph.nodes) {
  if (n.tier === 0 || (deg.get(n.id) ?? 0) >= 3) continue;
  const hub = hubOf.get(n.cat);
  if (hub && hub !== n.id) link(n.id, hub, n.tier <= 2 ? 3 : 2, 'structural');
}
for (const h of graph.nodes.filter((n) => n.tier === 1)) {
  if (deg.get(h.id) >= 15) continue;
  const members = graph.nodes.filter((n) => n.cat === h.cat && n.id !== h.id && n.tier >= 2).sort((a, b) => a.tier - b.tier || (deg.get(b.id) - deg.get(a.id)));
  for (const m of members) { if (deg.get(h.id) >= 15) break; link(m.id, h.id, m.tier <= 2 ? 3 : 2, 'structural'); }
}
const thin = graph.nodes.filter((n) => (deg.get(n.id) ?? 0) < 3);
const hubs = graph.nodes.filter((n) => n.tier === 1).map((h) => `${h.id}:${deg.get(h.id)}`);
console.log(`${graph.nodes.length} nodes, ${graph.edges.length} edges; added ${add.length} structural edges; nodes still under 3 connections: ${thin.length}`);
console.log('hub degrees:', hubs.join(' '));
if (write) {
  // the merge already includes the edges written by an earlier run, so `add` holds only what is still missing: keep the old ones too
  const file = path.join(root, 'data/src/z-links.json');
  const earlier = existsSync(file) ? (JSON.parse(readFileSync(file, 'utf8')).edges ?? []) : [];
  writeFileSync(file, JSON.stringify({ slice: 'z-links', nodes: [], edges: [...earlier, ...add] }, null, 1) + '\n'); console.log(`wrote data/src/z-links.json (${earlier.length} kept, ${add.length} new)`);
}
