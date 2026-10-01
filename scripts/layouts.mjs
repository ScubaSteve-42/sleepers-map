// Computes the three node layouts at build time so loading is instant and the result is testable in plain Node.
//   constellation: force-directed by relevance, clustered by category
//   timeline:      x = year (rank-blended so modern years are not crushed), one lane per category
//   galaxy:        category spiral arms, older ideas near the core, newer ones further out
import { forceSimulation, forceLink, forceManyBody, forceCollide, forceX, forceY, forceZ } from 'd3-force-3d';

export const TIER_RADIUS = [15, 9.5, 5.8, 3.6, 2.4];

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function finish(nodes) {
  let cx = 0, cy = 0, cz = 0;
  nodes.forEach((o) => { cx += o.x; cy += o.y; cz += o.z; });
  cx /= nodes.length; cy /= nodes.length; cz /= nodes.length;
  const out = [];
  nodes.forEach((o) => out.push(+(o.x - cx).toFixed(1), +(o.y - cy).toFixed(1), +(o.z - cz).toFixed(1)));
  return out;
}

function runSim(sim, ticks) {
  sim.stop().alpha(1).alphaDecay(1 - Math.pow(0.002, 1 / ticks)).velocityDecay(0.38);
  for (let i = 0; i < ticks; i++) sim.tick();
}

export function computeLayouts(graph, { seed = 7 } = {}) {
  const n = graph.nodes.length;
  const rand = rng(seed);
  const idx = new Map(graph.nodes.map((nd, i) => [nd.id, i]));
  const cats = graph.categories.filter((c) => c.key !== 'root').sort((a, b) => a.order - b.order);
  const K = cats.length;
  const catIndex = new Map(cats.map((c, i) => [c.key, i]));
  const anchors = cats.map((_, k) => {
    const y = 1 - (2 * (k + 0.5)) / K, r = Math.sqrt(1 - y * y), phi = k * 2.399963;
    return [r * Math.cos(phi), y, r * Math.sin(phi)];
  });
  const R = 120 + Math.cbrt(n) * 36;
  const mk = () => graph.nodes.map((nd, i) => ({ index: i, tier: nd.tier, r: TIER_RADIUS[nd.tier] ?? 3, cat: nd.cat, year: nd.year }));
  const links = graph.edges
    .map((e) => ({ source: idx.get(e.s), target: idx.get(e.t), w: e.w }))
    .filter((l) => l.source !== undefined && l.target !== undefined);

  // ---- constellation ----
  const c = mk();
  c.forEach((o) => {
    const a = anchors[catIndex.get(o.cat)] ?? [0, 0, 0], f = o.tier <= 1 ? 0.45 : 0.9;
    o.x = a[0] * R * f + (rand() - 0.5) * 90; o.y = a[1] * R * f + (rand() - 0.5) * 90; o.z = a[2] * R * f + (rand() - 0.5) * 90;
    if (o.tier === 0) { o.x = o.y = o.z = 0; o.fx = o.fy = o.fz = 0; }
  });
  const pull = (o, k) => { const a = anchors[catIndex.get(o.cat)]; if (!a) return 0; const f = o.tier <= 1 ? 0.45 : o.tier === 2 ? 0.8 : 1; return a[k] * R * f; };
  const sim = forceSimulation(c, 3).randomSource(rng(seed + 1)).stop()
    .force('link', forceLink(links).distance((l) => 40 + (3 - l.w) * 36 + c[l.source.index ?? l.source].r + c[l.target.index ?? l.target].r).strength((l) => [0, 0.04, 0.16, 0.42][l.w] ?? 0.1))
    .force('charge', forceManyBody().strength((o) => -45 - o.r * o.r * 2.4).distanceMax(560).theta(0.9))
    .force('collide', forceCollide((o) => o.r + (o.tier <= 2 ? 11 : 6)).iterations(2))
    .force('x', forceX((o) => pull(o, 0)).strength((o) => (o.tier <= 1 ? 0.1 : 0.045)))
    .force('y', forceY((o) => pull(o, 1)).strength((o) => (o.tier <= 1 ? 0.1 : 0.045)))
    .force('z', forceZ((o) => pull(o, 2)).strength((o) => (o.tier <= 1 ? 0.1 : 0.045)));
  runSim(sim, 320 + Math.min(300, Math.round(n / 3)));
  const constellation = finish(c);

  // ---- helpers for target layouts ----
  const years = graph.nodes.map((nd) => nd.year ?? 1990);
  const minY = Math.min(...years), maxY = Math.max(...years), sortedY = [...years].sort((a, b) => a - b);
  const tNorm = (y) => (y - minY) / Math.max(1, maxY - minY);
  const rank = (y) => { let lo = 0, hi = sortedY.length - 1; while (lo < hi) { const m = (lo + hi) >> 1; if (sortedY[m] < y) lo = m + 1; else hi = m; } return lo / Math.max(1, n - 1); };

  function relax(nodes, tx, ty, tz, { strength = 0.4, ticks = 260, pad = 6, charge = -10, yStrength } = {}) {
    nodes.forEach((o, i) => { o.x = tx[i] + (rand() - 0.5) * 6; o.y = ty[i] + (rand() - 0.5) * 6; o.z = tz[i] + (rand() - 0.5) * 6; });
    const s = forceSimulation(nodes, 3).randomSource(rng(seed + 2)).stop()
      .force('x', forceX((o) => tx[o.index]).strength(strength))
      .force('y', forceY((o) => ty[o.index]).strength(yStrength ?? strength))
      .force('z', forceZ((o) => tz[o.index]).strength(strength * 0.5))
      .force('charge', forceManyBody().strength(charge).distanceMax(120))
      .force('collide', forceCollide((o) => o.r + pad + (o.tier <= 2 ? 6 : 0)).iterations(3));
    runSim(s, ticks);
  }

  // ---- timeline ----
  const t = mk();
  const SPAN = 1100 + n * 0.8, LANE = 46;
  const tx = [], ty = [], tz = [];
  graph.nodes.forEach((nd, i) => {
    const y = nd.year ?? 1990;
    tx.push(((0.5 * tNorm(y) + 0.5 * rank(y)) - 0.5) * SPAN);
    const lane = nd.cat === 'root' ? (K - 1) / 2 : catIndex.get(nd.cat);
    ty.push((lane - (K - 1) / 2) * LANE);
    tz.push((rand() - 0.5) * 70);
  });
  relax(t, tx, ty, tz, { strength: 0.85, yStrength: 0.22, ticks: 280, pad: 5, charge: -6 });
  const timeline = finish(t);

  // ---- galaxy ----
  const g = mk();
  const RG = 380 + n * 0.45;
  const gx = [], gy = [], gz = [];
  graph.nodes.forEach((nd, i) => {
    const tt = tNorm(nd.year ?? 1990);
    const rho = nd.tier === 0 ? 0 : RG * (0.1 + 0.9 * Math.pow(tt, 0.85)) * (nd.tier === 1 ? 0.55 : 1);
    const arm = ((catIndex.get(nd.cat) ?? 0) / K) * Math.PI * 2;
    const ang = arm + (rho / RG) * 2.4 + (rand() - 0.5) * 0.22;
    gx.push(Math.cos(ang) * rho); gz.push(Math.sin(ang) * rho);
    gy.push((rand() - 0.5) * (14 + 40 * tt));
  });
  relax(g, gx, gy, gz, { strength: 0.3, ticks: 280, pad: 5, charge: -8 });
  const galaxy = finish(g);

  return { constellation, timeline, galaxy };
}

// Minimum clearance between any two node surfaces in a layout (negative means overlap). Used by the layout test.
export function minClearance(graph, flat) {
  let min = Infinity, worst = null;
  const n = graph.nodes.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const d = Math.hypot(flat[i * 3] - flat[j * 3], flat[i * 3 + 1] - flat[j * 3 + 1], flat[i * 3 + 2] - flat[j * 3 + 2]);
      const c = d - (TIER_RADIUS[graph.nodes[i].tier] ?? 3) - (TIER_RADIUS[graph.nodes[j].tier] ?? 3);
      if (c < min) { min = c; worst = [graph.nodes[i].id, graph.nodes[j].id]; }
    }
  }
  return { min, worst };
}
