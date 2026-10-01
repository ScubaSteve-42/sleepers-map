// Data checks: the merged graph passes the validator, and the validator itself rejects bad input.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mergeData } from '../scripts/merge-data.mjs';
import { validateGraph } from '../scripts/validate-data.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const strict = process.env.SMAP_STRICT !== '0' && process.env.SMAP_RELEASE === '1';

test('merged graph has no duplicate ids or merge problems', () => {
  const { graph, problems } = mergeData({ write: false });
  assert.deepEqual(problems, []);
  assert.ok(graph.nodes.length > 0);
});

test('merged graph passes validation', () => {
  const { graph } = mergeData({ write: false });
  const { errors, stats } = validateGraph(graph, { strict });
  assert.deepEqual(errors, [], `validation errors:\n${errors.slice(0, 20).join('\n')}`);
  console.log(`# ${stats.nodes} nodes, ${stats.edges} edges, average degree ${stats.avgDegree}`);
});

test('data/graph.json on disk matches a fresh merge', () => {
  const disk = JSON.parse(readFileSync(path.join(root, 'data/graph.json'), 'utf8'));
  const { graph } = mergeData({ write: false });
  assert.equal(disk.nodes.length, graph.nodes.length, 'run `npm run merge` to refresh data/graph.json');
  assert.equal(disk.edges.length, graph.edges.length);
});

const base = () => ({
  categories: [{ key: 'root', order: 0 }, { key: 'a', order: 1 }, { key: 'people', order: 2 }],
  nodes: [
    { id: 'r', title: 'Root', cat: 'root', tier: 0, year: 1968, short: 'Short text here.', long: 'A long description that is comfortably longer than eighty characters so it passes the length check.' },
    { id: 'a.x', title: 'X', cat: 'a', tier: 2, year: 1990, short: 'Short text here.', long: 'A long description that is comfortably longer than eighty characters so it passes the length check.' },
    { id: 'p.y', title: 'Y', cat: 'people', tier: 2, year: 1950, short: 'Short text here.', long: 'A long description that is comfortably longer than eighty characters so it passes the length check.' },
  ],
  edges: [{ s: 'a.x', t: 'r', w: 3, k: 'part-of' }, { s: 'a.x', t: 'p.y', w: 2, k: 'created-by' }],
  tour: [],
});

test('validator accepts a minimal good graph', () => assert.deepEqual(validateGraph(base()).errors, []));
test('validator rejects dangling edges, self loops, bad weights and isolated nodes', () => {
  const g = base();
  g.edges.push({ s: 'a.x', t: 'nope', w: 2, k: 'related' }, { s: 'p.y', t: 'p.y', w: 2, k: 'related' }, { s: 'r', t: 'p.y', w: 9, k: 'related' });
  g.nodes.push({ ...g.nodes[1], id: 'a.lonely' });
  const text = validateGraph(g).errors.join('\n');
  assert.match(text, /unknown target/); assert.match(text, /self loop/); assert.match(text, /weight/); assert.match(text, /isolated/);
});
test('validator rejects duplicate ids, unknown categories, bad years and long text', () => {
  const g = base();
  g.nodes.push({ ...g.nodes[1] }, { ...g.nodes[1], id: 'a.z', cat: 'zzz', year: 3000, short: 'x'.repeat(300) });
  const text = validateGraph(g).errors.join('\n');
  assert.match(text, /duplicate id/); assert.match(text, /unknown category/); assert.match(text, /year out of range/); assert.match(text, /short is 300/);
});
test('validator enforces that created-by points at a person or organization', () => {
  const g = base(); g.edges.push({ s: 'r', t: 'a.x', w: 2, k: 'created-by' });
  assert.match(validateGraph(g).errors.join('\n'), /created-by target/);
});
