// Merges data/src/*.json slices plus categories, tour and starter questions into data/graph.json.
import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const readJson = (p) => JSON.parse(readFileSync(p, 'utf8'));

export function mergeData({ write = true } = {}) {
  const categories = readJson(path.join(root, 'data/categories.json'));
  const tourPath = path.join(root, 'data/tour.json');
  const tour = existsSync(tourPath) ? readJson(tourPath) : [];
  const questionsPath = path.join(root, 'data/questions.json');
  const questions = existsSync(questionsPath) ? readJson(questionsPath) : [];
  const srcDir = path.join(root, 'data/src');
  // the registry lists planned nodes without text; it is a planning file, not a slice
  const files = readdirSync(srcDir).filter((f) => f.endsWith('.json') && f !== 'registry.json').sort();
  const nodes = [], seen = new Map(), problems = [];
  const edgeMap = new Map();
  for (const f of files) {
    const slice = readJson(path.join(srcDir, f));
    for (const nd of slice.nodes ?? []) {
      if (seen.has(nd.id)) { problems.push(`duplicate node id "${nd.id}" in ${f} (first seen in ${seen.get(nd.id)})`); continue; }
      seen.set(nd.id, f); nodes.push(nd);
    }
    for (const e of slice.edges ?? []) {
      const [a, b] = e.s < e.t ? [e.s, e.t] : [e.t, e.s];
      const key = `${a}|${b}`;           // one edge per unordered pair; keep the strongest
      const prev = edgeMap.get(key);
      if (!prev || e.w > prev.w) edgeMap.set(key, { s: e.s, t: e.t, w: e.w, k: e.k ?? 'related', ...(e.note ? { note: e.note } : {}) });
    }
  }
  const order = new Map(categories.map((c) => [c.key, c.order]));
  nodes.sort((x, y) => (order.get(x.cat) ?? 99) - (order.get(y.cat) ?? 99) || x.tier - y.tier || x.year - y.year || x.id.localeCompare(y.id));
  const edges = [...edgeMap.values()];
  const graph = {
    meta: { title: "The Sleeper's Map", subtitle: 'The history of software engineering, from machine code to AI', generated: new Date().toISOString().slice(0, 10), nodes: nodes.length, edges: edges.length },
    categories, nodes, edges, tour, questions,
  };
  if (write) writeFileSync(path.join(root, 'data/graph.json'), JSON.stringify(graph, null, 1) + '\n');
  return { graph, problems };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { graph, problems } = mergeData();
  problems.forEach((p) => console.error('merge:', p));
  console.log(`merged ${graph.nodes.length} nodes, ${graph.edges.length} edges -> data/graph.json`);
  if (problems.length) process.exit(1);
}
