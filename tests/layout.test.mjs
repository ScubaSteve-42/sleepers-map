// Layout checks run in plain Node: every layout is finite, deterministic, keeps nodes apart and tells the story it claims to tell.
import test from 'node:test';
import assert from 'node:assert/strict';
import { mergeData } from '../scripts/merge-data.mjs';
import { computeLayouts, minClearance } from '../scripts/layouts.mjs';

const { graph } = mergeData({ write: false });
const all = computeLayouts(graph);
const { axis, ...layouts } = all;   // `axis` holds the timeline and galaxy guides; the rest are node positions
const n = graph.nodes.length;
const at = (flat, id) => { const i = graph.nodes.findIndex((x) => x.id === id); return [flat[i * 3], flat[i * 3 + 1], flat[i * 3 + 2]]; };

test('every layout has finite coordinates for every node', () => {
  for (const [name, flat] of Object.entries(layouts)) {
    assert.equal(flat.length, n * 3, `${name} length`);
    assert.ok(flat.every(Number.isFinite), `${name} has non-finite values`);
  }
});

test('layouts are deterministic', () => {
  const again = computeLayouts(graph);
  for (const name of Object.keys(layouts)) assert.deepEqual(again[name], layouts[name], `${name} differs between runs`);
  assert.deepEqual(again.axis, axis);
});

test('axis guides line up with the nodes they describe', () => {
  const xs = axis.timeline.decades.map((d) => d.x);
  assert.ok(xs.length >= 5 && xs.every((x, i) => i === 0 || x > xs[i - 1]), 'decade lines must be ordered left to right');
  // a node dated within a decade sits near that decade's line, not on the far side of the chart
  const dec = axis.timeline.decades.find((d) => d.year === 1990), nxt = axis.timeline.decades.find((d) => d.year === 2000);
  if (dec && nxt) for (const [i, nd] of graph.nodes.entries()) if (nd.year >= 1991 && nd.year <= 1999) assert.ok(layouts.timeline[i * 3] > dec.x - 40 && layouts.timeline[i * 3] < nxt.x + 40, `${nd.id} (${nd.year}) is outside the 1990s band`);
  assert.equal(axis.timeline.lanes.length, graph.categories.filter((c) => c.key !== 'root').length);
  assert.ok(axis.galaxy.rings.every((r, i) => i === 0 || r.r > axis.galaxy.rings[i - 1].r), 'era rings must grow outward');
});

test('node surfaces never overlap by more than a hair', () => {
  for (const [name, flat] of Object.entries(layouts)) {
    const { min, worst } = minClearance(graph, flat);
    assert.ok(min > -1.5, `${name}: ${worst?.join(' and ')} overlap by ${(-min).toFixed(1)} units`);
  }
});

test('the root sits near the centre of the constellation', () => {
  const d = Math.hypot(...at(layouts.constellation, graph.nodes.find((x) => x.tier === 0).id));
  let reach = 0; for (let i = 0; i < n; i++) reach = Math.max(reach, Math.hypot(layouts.constellation[i * 3], layouts.constellation[i * 3 + 1], layouts.constellation[i * 3 + 2]));
  assert.ok(d < reach * 0.22, `root is ${d.toFixed(1)} units from the centre of a ${reach.toFixed(0)}-unit layout`);
});

test('timeline places older ideas to the left of newer ones', () => {
  const idx = graph.nodes.map((nd, i) => [nd.year, layouts.timeline[i * 3]]);
  let agree = 0, total = 0;
  for (let i = 0; i < idx.length; i += 3) for (let j = i + 1; j < idx.length; j += 3) { if (idx[i][0] === idx[j][0]) continue; total++; if ((idx[i][0] < idx[j][0]) === (idx[i][1] < idx[j][1])) agree++; }
  assert.ok(agree / total > 0.93, `only ${(100 * agree / total).toFixed(0)}% of pairs are in chronological order`);
});

test('galaxy places newer ideas further from the core than older ones, on average', () => {
  const r = (i) => Math.hypot(layouts.galaxy[i * 3], layouts.galaxy[i * 3 + 2]);
  const sorted = graph.nodes.map((nd, i) => [nd.year, r(i)]).sort((a, b) => a[0] - b[0]);
  const half = Math.floor(sorted.length / 2);
  const avg = (a) => a.reduce((s, x) => s + x[1], 0) / a.length;
  assert.ok(avg(sorted.slice(half)) > avg(sorted.slice(0, half)), 'newer half is not further out');
});

test('related nodes sit closer together than random pairs in the constellation', () => {
  const idx = new Map(graph.nodes.map((nd, i) => [nd.id, i]));
  const dist = (a, b) => Math.hypot(...[0, 1, 2].map((k) => layouts.constellation[a * 3 + k] - layouts.constellation[b * 3 + k]));
  const strong = graph.edges.filter((e) => e.w === 3).map((e) => dist(idx.get(e.s), idx.get(e.t)));
  let randomSum = 0, cnt = 0; for (let i = 0; i < n; i += 2) for (let j = i + 1; j < n; j += 5) { randomSum += dist(i, j); cnt++; }
  const mean = (a) => a.reduce((s, x) => s + x, 0) / a.length;
  assert.ok(mean(strong) < (randomSum / cnt) * 0.7, 'strong links are not shorter than random pairs');
});
