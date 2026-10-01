// Builds a large, valid synthetic graph (default 3,000 nodes) to show the viewer has no practical node limit.
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { root } from './browser.mjs';

export function syntheticGraph(count = 3000, seed = 5) {
  let s = seed; const rnd = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  const real = JSON.parse(readFileSync(path.join(root, 'data/graph.json'), 'utf8'));
  const cats = real.categories.filter((c) => c.key !== 'root').map((c) => c.key);
  const nodes = real.nodes.map((n) => ({ ...n })), edges = real.edges.map((e) => ({ ...e }));
  const hubs = nodes.filter((n) => n.tier === 1);
  for (let i = nodes.length; i < count; i++) {
    const cat = cats[Math.floor(rnd() * cats.length)];
    const tier = rnd() < 0.08 ? 2 : rnd() < 0.4 ? 3 : 4;
    nodes.push({
      id: `syn.n${i}`, title: `Synthetic idea ${i}`, cat, tier, year: 1950 + Math.floor(rnd() * 76),
      short: `A generated placeholder idea number ${i}, used only to prove the map scales.`,
      long: `Synthetic node ${i}. It exists so the automated tests can load thousands of points and check that rendering, labels and picking stay responsive with a graph far larger than the real one.`,
    });
    const hub = hubs.find((h) => h.cat === cat) ?? hubs[0];
    edges.push({ s: `syn.n${i}`, t: hub.id, w: 2, k: 'part-of' });
    for (let k = 0; k < 2; k++) {
      const other = nodes[Math.floor(rnd() * (nodes.length - 1))];
      if (other.id !== `syn.n${i}` && !edges.some((e) => (e.s === `syn.n${i}` && e.t === other.id))) edges.push({ s: `syn.n${i}`, t: other.id, w: 1 + Math.floor(rnd() * 3), k: 'related' });
    }
  }
  // drop duplicate unordered pairs the random links may have produced
  const seen = new Set(); const unique = edges.filter((e) => { const k = e.s < e.t ? `${e.s}|${e.t}` : `${e.t}|${e.s}`; if (seen.has(k) || e.s === e.t) return false; seen.add(k); return true; });
  return { ...real, nodes, edges: unique };
}
