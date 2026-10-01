// End-to-end tests: drive the built single-file map in Microsoft Edge (real GPU when available, software GL as a fallback).
import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, mkdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { PNG } from 'pngjs';
import { launch, openMap, settle, state, root, MAP_FILE } from './helpers/browser.mjs';
import { syntheticGraph } from './helpers/synthetic.mjs';
import { buildMap } from '../scripts/build.mjs';

const data = JSON.parse(readFileSync(path.join(root, 'data/graph.json'), 'utf8'));
const byId = new Map(data.nodes.map((n) => [n.id, n]));
const nbrs = (id) => data.edges.filter((e) => e.s === id || e.t === id).map((e) => (e.s === id ? e.t : e.s));
const SHOTS = path.join(root, 'screenshots');
let browser, glRenderer = 'unknown';

before(async () => {
  assert.ok(existsSync(MAP_FILE), `build first: ${MAP_FILE} is missing`);
  browser = await launch();
});
after(async () => { await browser?.close(); });

function analyze(buf) {
  const png = PNG.sync.read(buf); const n = png.width * png.height; let sum = 0, sum2 = 0, bright = 0;
  for (let i = 0; i < n; i++) { const l = 0.2126 * png.data[i * 4] + 0.7152 * png.data[i * 4 + 1] + 0.0722 * png.data[i * 4 + 2]; sum += l; sum2 += l * l; if (l > 70) bright++; }
  const mean = sum / n; return { mean, std: Math.sqrt(Math.max(0, sum2 / n - mean * mean)), bright: bright / n, w: png.width, h: png.height };
}
const withPage = (opts, fn) => async () => { const m = await openMap(browser, opts); try { await fn(m); } finally { await m.ctx.close(); } };

test('loads with no console errors and no network requests, and draws the whole graph', withPage({}, async ({ page, errors, requests }) => {
  assert.deepEqual(errors, []);
  assert.ok(requests.every((u) => /^(file|data|blob):/.test(u)), `unexpected requests: ${requests.filter((u) => !/^(file|data|blob):/.test(u)).join(', ')}`);
  const s = await state(page);
  glRenderer = s.gl.renderer; console.log(`# GL renderer: ${glRenderer}`);
  assert.equal(s.gl.webgl2, true);
  assert.equal(s.nodes, data.nodes.length);
  assert.equal(s.visible, data.nodes.length);
  const a = analyze(await page.screenshot());
  assert.ok(a.std > 12 && a.bright > 0.01, `canvas looks blank: ${JSON.stringify(a)}`);
}));

test('overview shows hub titles but no descriptions', withPage({}, async ({ page }) => {
  await page.evaluate(() => window.__mapTest.jumpOverview()); await page.waitForTimeout(700);
  const { visible, described } = await page.evaluate(() => window.__mapTest.labels());
  const hubs = data.nodes.filter((n) => n.tier <= 1).map((n) => n.id);
  const shownHubs = hubs.filter((id) => visible.includes(id));
  assert.ok(shownHubs.length >= Math.min(8, hubs.length * 0.5), `only ${shownHubs.length}/${hubs.length} hub titles visible`);
  assert.ok(visible.includes(data.nodes.find((n) => n.tier === 0).id), 'root title is not visible');
  assert.deepEqual(described, [], 'descriptions should stay hidden when zoomed out');
}));

test('zooming in fades a description in', withPage({}, async ({ page }) => {
  await page.evaluate(() => window.__mapTest.jumpTo('lang.python', 34)); await page.waitForTimeout(900);
  const { described } = await page.evaluate(() => window.__mapTest.labels());
  assert.ok(described.includes('lang.python'), `described: ${described.join(', ')}`);
  const text = await page.locator('.lbl.desc .d').first().textContent();
  assert.ok(Array.from(byId.values()).some((n) => n.short === text), 'description text does not match the data');
  assert.ok(described.length <= 5, 'too many simultaneous descriptions');
}));

test('every hub, and a sample of all other nodes, shows its title once you zoom up to it', withPage({}, async ({ page }) => {
  const step = Math.max(1, Math.floor(data.nodes.length / 80));
  const ids = data.nodes.filter((n, i) => n.tier <= 1 || i % step === 0).map((n) => n.id);
  for (const id of ids) {
    await page.evaluate(([i, d]) => window.__mapTest.jumpTo(i, d), [id, 55]);
    await page.waitForFunction((i) => window.__mapTest.labels().visible.includes(i), id, { timeout: 2500 }).catch(() => { throw new Error(`title for "${id}" never became visible up close`); });
  }
}));

test('hovering a node lights its neighbours and dims everything else', withPage({}, async ({ page }) => {
  await page.evaluate(() => { window.__mapTest.jumpOverview(); window.__mapTest.hover('lang.c'); }); await page.waitForTimeout(900);
  const n1 = nbrs('lang.c')[0], stranger = data.nodes.find((n) => n.id !== 'lang.c' && !nbrs('lang.c').includes(n.id)).id;
  const f = await page.evaluate(([a, b, c]) => [window.__mapTest.fx(a), window.__mapTest.fx(b), window.__mapTest.fx(c)], ['lang.c', n1, stranger]);
  assert.ok(f[0].emph > 0.9, 'hovered node not emphasised'); assert.ok(f[1].emph > 0.3 && f[1].dim < 0.3, 'neighbour not lit'); assert.ok(f[2].dim > 0.6, 'unrelated node not dimmed');
}));

test('clicking a node flies to it and opens its details', withPage({}, async ({ page }) => {
  await page.evaluate(() => window.__mapTest.jumpOverview()); await page.waitForTimeout(500);
  const [w, h] = [1440, 900]; let target = null;
  for (const n of data.nodes.filter((x) => x.tier === 2)) {
    const p = await page.evaluate((id) => ({ s: window.__mapTest.screenOf(id), hit: null }), n.id);
    if (p.s.x > 330 && p.s.x < w - 470 && p.s.y > 120 && p.s.y < h - 130 && p.s.r > 5) {
      const hit = await page.evaluate(([x, y]) => window.__mapTest.pick(x, y), [p.s.x, p.s.y]);
      // a title label sitting on top of the point would take the click instead of the canvas, so skip those spots
      const onCanvas = await page.evaluate(([x, y]) => document.elementFromPoint(x, y)?.id === 'gl', [p.s.x, p.s.y]);
      if (hit === n.id && onCanvas) { target = { n, ...p.s }; break; }
    }
  }
  assert.ok(target, 'no clickable tier-2 node found in the overview');
  await page.mouse.click(target.x, target.y);
  await page.waitForSelector('#panel:not([hidden])');
  assert.equal(await page.locator('#panel h2').textContent(), target.n.title);
  assert.ok((await page.locator('#panel .conn button').count()) > 0, 'panel lists no connections');
  assert.equal((await state(page)).selected, target.n.id);
  await settle(page);
  const after = await state(page); assert.ok(after.cam.dist < 120, `camera did not move in (distance ${after.cam.dist.toFixed(0)})`);
}));

test('clicking a title label selects its node, and dragging over labels still orbits', withPage({}, async ({ page }) => {
  await page.evaluate(() => window.__mapTest.jumpOverview()); await page.waitForTimeout(700);
  const rects = (await page.evaluate(() => window.__mapTest.labels())).rects;
  let target = null;
  for (const r of rects) {
    const x = r.x + r.w / 2, y = r.y + r.h / 2;
    if (x < 330 || x > 1440 - 470 || y < 110 || y > 770) continue;
    const owner = await page.evaluate(([px, py]) => window.__mapTest.hit(px, py), [x, y]);
    const node = await page.evaluate(([px, py]) => window.__mapTest.pick(px, py), [x, y]);
    if (owner === r.id && node === null) { target = { id: r.id, x, y }; break; }
  }
  assert.ok(target, 'no clickable title label found');
  await page.mouse.click(target.x, target.y);
  await page.waitForFunction((id) => window.__mapTest.state().selected === id, target.id);
  // a drag that starts on top of a label must still move the camera
  await page.keyboard.press('Escape'); await page.evaluate(() => window.__mapTest.jumpOverview()); await page.waitForTimeout(500);
  const before = (await state(page)).cam.pos;
  await page.mouse.move(target.x, target.y); await page.mouse.down(); await page.mouse.move(target.x + 160, target.y + 40, { steps: 8 }); await page.mouse.up();
  await page.waitForTimeout(400);
  const after = (await state(page)).cam.pos;
  assert.ok(Math.hypot(...after.map((v, i) => v - before[i])) > 20, 'dragging across a label did not orbit the camera');
}));

test('connection chips navigate and the back button returns', withPage({}, async ({ page }) => {
  await page.evaluate(() => window.__mapTest.select('lang.python')); await settle(page);
  const chip = page.locator('#panel .conn button').first(); const name = (await chip.textContent()).trim();
  await chip.click(); await page.waitForFunction((t) => document.querySelector('#panel h2')?.textContent === t, name);
  await page.locator('#panel .bar button').first().click();
  await page.waitForFunction(() => document.querySelector('#panel h2')?.textContent === 'Python');
}));

test('search finds a node, Enter selects it', withPage({}, async ({ page }) => {
  await page.fill('#q', 'git'); await page.waitForSelector('#results li');
  assert.match(await page.locator('#results li').first().textContent(), /^Git/);
  await page.keyboard.press('Enter');
  await page.waitForFunction(() => window.__mapTest.state().selected === 'tool.git');
  assert.equal(await page.locator('#panel h2').textContent(), 'Git');
  await page.fill('#q', 'zzzzqqq'); assert.match(await page.locator('#results li').first().textContent(), /Nothing matches/);
}));

test('category legend hides and restores nodes', withPage({}, async ({ page }) => {
  const total = data.nodes.length, fail = data.nodes.filter((n) => n.cat === 'failures').length;
  await page.click('#legend-list button[data-cat="failures"]'); await page.waitForTimeout(1200);
  assert.equal((await state(page)).visible, total - fail);
  const vis = (await page.evaluate(() => window.__mapTest.labels())).visible;
  assert.ok(!vis.some((id) => byId.get(id).cat === 'failures'), 'a hidden category still shows labels');
  await page.click('#legend-all'); await page.waitForTimeout(1200);
  assert.equal((await state(page)).visible, total);
}));

test('time scrubber hides ideas newer than the chosen year', withPage({}, async ({ page }) => {
  await page.$eval('#year', (el) => { el.value = '1980'; el.dispatchEvent(new Event('input', { bubbles: true })); }); await page.waitForTimeout(1300);
  const expected = data.nodes.filter((n) => n.year <= 1980).length;
  assert.equal((await state(page)).visible, expected); assert.equal(await page.locator('#year-out').textContent(), '1980');
  assert.ok(expected < data.nodes.length);
}));

test('play replays history from the start', withPage({}, async ({ page }) => {
  await page.click('#play'); await page.waitForTimeout(2200);
  const mid = await state(page); assert.ok(mid.year < Math.max(...data.nodes.map((n) => n.year)), 'timeline did not rewind'); assert.ok(mid.visible < data.nodes.length);
  await page.click('#play');
}));

test('layouts move the nodes and the timeline is chronological', withPage({}, async ({ page }) => {
  const before = await page.evaluate(() => window.__mapTest.worldOf('lang.c'));
  await page.click('[data-layout="timeline"]'); await settle(page);
  const [old, young] = await page.evaluate(() => [window.__mapTest.worldOf('found.machine-code'), window.__mapTest.worldOf('mod.copilot')]);
  assert.ok(old[0] < young[0], 'machine code should be left of AI assistants on the timeline');
  const moved = await page.evaluate(() => window.__mapTest.worldOf('lang.c'));
  assert.ok(Math.hypot(...moved.map((v, i) => v - before[i])) > 50, 'node did not move');
  await page.click('[data-layout="galaxy"]'); await settle(page);
  assert.equal((await state(page)).layout, 'galaxy');
}));

test('guided tour steps move the camera', withPage({}, async ({ page }) => {
  await page.click('#btn-tour'); await settle(page);
  assert.match(await page.locator('#tourcard .step').textContent(), /STOP 1 OF/);
  const a = (await state(page)).cam.target;
  await page.click('#tourcard button.primary'); await settle(page);
  assert.match(await page.locator('#tourcard .step').textContent(), /STOP 2 OF/);
  const b = (await state(page)).cam.target; assert.ok(Math.hypot(...b.map((v, i) => v - a[i])) > 20, 'camera stayed put');
  await page.keyboard.press('Escape'); assert.equal(await page.locator('#tourcard').isHidden(), true);
}));

test('title labels never overlap each other', withPage({}, async ({ page }) => {
  for (const mode of ['overview', 'mid']) {
    await page.evaluate((m) => (m === 'overview' ? window.__mapTest.jumpOverview() : window.__mapTest.jumpTo('lang.c', 200)), mode); await page.waitForTimeout(800);
    const { rects } = await page.evaluate(() => window.__mapTest.labels());
    for (let i = 0; i < rects.length; i++) for (let j = i + 1; j < rects.length; j++) {
      const a = rects[i], b = rects[j];
      const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x), oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
      assert.ok(!(ox > 3 && oy > 3), `${mode}: labels "${a.id}" and "${b.id}" overlap by ${ox.toFixed(0)}x${oy.toFixed(0)}px`);
    }
    assert.ok(rects.length > 5, `${mode}: too few labels (${rects.length})`);
  }
}));

test('deep links select a node and a layout', withPage({ hash: '#n=lang.c&l=timeline' }, async ({ page }) => {
  await settle(page); const s = await state(page);
  assert.equal(s.selected, 'lang.c'); assert.equal(s.layout, 'timeline');
}));

test('keyboard shortcuts work', withPage({}, async ({ page }) => {
  await page.keyboard.press('/'); assert.equal(await page.evaluate(() => document.activeElement.id), 'q'); await page.keyboard.press('Escape');
  await page.keyboard.press('2'); assert.equal((await state(page)).layout, 'timeline');
  await page.keyboard.press('?'); assert.equal(await page.locator('#help').isVisible(), true); await page.keyboard.press('Escape');
  await page.keyboard.press('l'); assert.ok((await page.locator('#listview button').count()) >= data.nodes.length); await page.keyboard.press('Escape');
}));

test('first-run intro appears and can be dismissed', withPage({ query: 'test=1&intro=1&still=1', waitReady: false }, async ({ page, errors }) => {
  await page.waitForSelector('#intro.show', { timeout: 40000 });
  assert.match(await page.locator('#intro h2').textContent(), /Sleeper/);
  await page.click('#intro-free'); await page.waitForFunction(() => !document.querySelector('#intro').classList.contains('show'));
  assert.deepEqual(errors, []);
}));

test('phone viewport: no horizontal overflow and the panel is a bottom sheet', withPage({ viewport: { width: 390, height: 844 }, mobile: true }, async ({ page }) => {
  const m = () => page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: innerWidth, ih: innerHeight }));
  let d = await m(); assert.ok(d.sw <= d.iw, `page is ${d.sw}px wide in a ${d.iw}px viewport`);
  const off = await page.evaluate(() => [...document.querySelectorAll('#controls button, #search, #timeline')].filter((e) => e.getBoundingClientRect().right > innerWidth + 1).map((e) => e.id || e.textContent));
  assert.deepEqual(off, [], `controls spill off-screen: ${off.join(', ')}`);
  await page.evaluate(() => window.__mapTest.select('lang.python')); await settle(page);
  const r = await page.locator('#panel').boundingBox();
  assert.ok(r.x >= 0 && r.x + r.width <= d.iw + 1 && r.y + r.height <= d.ih + 1, `panel outside viewport: ${JSON.stringify(r)}`);
  d = await m(); assert.ok(d.sw <= d.iw);
}));

test('reduced motion turns off pulses and skips the intro', withPage({ reducedMotion: 'reduce' }, async ({ page }) => {
  const f = await page.evaluate(() => window.__mapTest.flags()); assert.equal(f.pulse, 0); assert.equal(f.reduced, true);
}));

test('without WebGL the full list is still readable', async () => {
  const b = await launch({ args: ['--disable-webgl', '--disable-webgl2', '--disable-3d-apis', '--disable-gpu'] });
  try {
    const { page, ctx } = await openMap(b); const hidden = await page.locator('#nogl').isHidden();
    if (hidden) { console.log('# note: this browser still offered WebGL, fallback path not exercised'); await ctx.close(); return; }
    assert.ok((await page.locator('#listview button').count()) >= data.nodes.length);
    await page.fill('#q', 'python'); await page.waitForSelector('#results li'); await ctx.close();
  } finally { await b.close(); }
});

test('frame rate is reported and above a floor', withPage({}, async ({ page }) => {
  const fps = await page.evaluate(() => window.__mapTest.measureFps(2500));
  const soft = /swiftshader|software|llvmpipe/i.test(glRenderer); const floor = soft ? 8 : 40;
  console.log(`# ${fps.toFixed(0)} fps on ${glRenderer}`); assert.ok(fps >= floor, `${fps.toFixed(1)} fps is below ${floor}`);
}));

test('scales to thousands of nodes (3,000 generated points)', { timeout: 300000 }, async () => {
  const out = path.join(root, '.tmp', 'synthetic.html'); mkdirSync(path.dirname(out), { recursive: true });
  const { graph } = await buildMap({ graph: syntheticGraph(3000), outFile: out, copyToRoot: false, quiet: true, strictMode: false });
  const { page, errors, ctx } = await openMap(browser, { file: out });
  try {
    const s = await state(page); assert.equal(s.nodes, graph.nodes.length); assert.deepEqual(errors, []);
    const fps = await page.evaluate(() => window.__mapTest.measureFps(2500)); console.log(`# ${graph.nodes.length} nodes: ${fps.toFixed(0)} fps`);
    await page.evaluate(() => window.__mapTest.jumpTo('syn.n2500', 80)); await page.waitForTimeout(600);
    assert.ok((await page.evaluate(() => window.__mapTest.labels())).visible.length > 3);
    assert.ok(fps >= (/swiftshader|software/i.test(glRenderer) ? 3 : 25), `only ${fps.toFixed(1)} fps with ${graph.nodes.length} nodes`);
  } finally { await ctx.close(); }
});

test('captures the README screenshots', withPage({}, async ({ page }) => {
  mkdirSync(SHOTS, { recursive: true });
  const shot = async (name) => { await page.waitForTimeout(900); const buf = await page.screenshot({ path: path.join(SHOTS, `${name}.png`) }); const a = analyze(buf); assert.ok(a.std > 10, `${name} looks blank`); };
  await page.evaluate(() => window.__mapTest.jumpOverview()); await shot('01-overview');
  await page.evaluate(() => window.__mapTest.jumpTo('lang.python', 50)); await shot('02-zoomed-descriptions');
  await page.evaluate(() => window.__mapTest.select('tool.git')); await settle(page); await shot('03-detail-panel');
  await page.evaluate(() => { window.__mapTest.select(null); window.__mapTest.setLayout('timeline'); }); await settle(page); await shot('04-timeline-layout');
  await page.evaluate(() => window.__mapTest.setLayout('galaxy')); await settle(page); await shot('05-galaxy-layout');
  await page.evaluate(() => window.__mapTest.setLayout('constellation')); await settle(page);
  await page.evaluate(() => window.__mapTest.setYear(1985)); await page.evaluate(() => window.__mapTest.jumpOverview()); await shot('06-time-travel-1985');
  await page.evaluate(() => window.__mapTest.setYear(2100)); await page.evaluate(() => window.__mapTest.startTour()); await settle(page); await page.evaluate(() => window.__mapTest.tourStep(3)); await settle(page); await shot('07-guided-tour');
  await page.keyboard.press('Escape'); await page.fill('#q', 'compiler'); await shot('08-search');
}));

test('captures the phone screenshot', withPage({ viewport: { width: 390, height: 844 }, mobile: true, deviceScaleFactor: 2 }, async ({ page }) => {
  mkdirSync(SHOTS, { recursive: true });
  await page.evaluate(() => window.__mapTest.select('lang.python')); await settle(page); await page.waitForTimeout(900);
  const a = analyze(await page.screenshot({ path: path.join(SHOTS, '09-phone.png') })); assert.ok(a.std > 10);
}));
