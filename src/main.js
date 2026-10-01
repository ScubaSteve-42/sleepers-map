// Boot and application state: wires the 3D scene, labels and UI together.
import { createScene } from './scene.js';
import { createLabels } from './labels.js';
import { createUI } from './ui.js';

const graph = JSON.parse(document.getElementById('graph-data').textContent);
const params = new URLSearchParams(location.search);
const test = params.has('test');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches || params.has('reduced');
const cats = new Map(graph.categories.map((c) => [c.key, c]));
const indexOf = new Map(graph.nodes.map((n, i) => [n.id, i]));
const years = graph.nodes.map((n) => n.year);
const minYear = Math.min(...years), maxYear = Math.max(...years);
const $ = (s) => document.querySelector(s);

const app = {
  graph, cats, indexOf, scene: null, labels: null, ui: null,
  hiddenCats: new Set(), year: maxYear, layout: 'constellation', selected: -1,
  hist: [], hi: -1, tourActive: false, tourStep: 0, tourTimer: null, playing: false, idle: 0, autoRotate: true,
};

// ---------- WebGL scene (the UI still works without it) ----------
const canvas = $('#gl');
try {
  const quality = params.get('q') || 'auto';
  app.scene = createScene({ canvas, graph, layouts: graph.layouts, reduced, quality, still: params.has('still') });
} catch (err) {
  console.warn('WebGL scene unavailable:', err);
  $('#nogl').hidden = false; canvas.hidden = true;
}
const scene = app.scene;
app.ui = createUI(app);
const ui = app.ui;
if (scene) app.labels = createLabels({
  container: $('#labels'), scene, graph, cats,
  onHover: (i) => scene.setHover(i), onSelect: (i) => app.select(i),
});

// ---------- visibility (category filter + time travel) ----------
function applyFilter(birth = false) {
  if (!scene) return;
  scene.setVisibleMask((i) => !app.hiddenCats.has(graph.nodes[i].cat) && graph.nodes[i].year <= app.year, { birthFlash: birth });
}
app.toggleCategory = (key) => { app.hiddenCats.has(key) ? app.hiddenCats.delete(key) : app.hiddenCats.add(key); ui.updateLegend(); applyFilter(); };
app.isolateCategory = (key) => { app.hiddenCats = new Set(graph.categories.filter((c) => c.key !== key && c.key !== 'root').map((c) => c.key)); ui.updateLegend(); applyFilter(); };
app.showAllCategories = () => { app.hiddenCats.clear(); ui.updateLegend(); applyFilter(); };
app.setYear = (y, { manual = false, birth = false } = {}) => {
  if (manual) app.playing = false;
  app.year = Math.min(maxYear, Math.max(minYear, y)); ui.updateTimeline(); applyFilter(birth);
};
app.togglePlay = () => {
  if (app.playing) { app.playing = false; ui.updateTimeline(); return; }
  if (app.year >= maxYear - 0.5) app.setYear(minYear);
  app.playing = true; ui.updateTimeline();
};

// ---------- selection and history ----------
const hashFor = () => (app.selected >= 0 ? `#n=${graph.nodes[app.selected].id}&l=${app.layout}` : app.layout !== 'constellation' ? `#l=${app.layout}` : ' ');
const syncHash = () => { try { history.replaceState(null, '', location.pathname + location.search + (hashFor().trim() || '')); } catch { /* file:// in some browsers */ } };
app.canBack = () => app.hi > 0;
app.canForward = () => app.hi < app.hist.length - 1;
app.select = (i, { fly = true, push = true, panel = true } = {}) => {
  if (i < 0 || i == null) { app.selected = -1; scene?.setSelected(-1); ui.closePanel(); syncHash(); return; }
  const nd = graph.nodes[i];
  if (app.hiddenCats.has(nd.cat)) { app.hiddenCats.delete(nd.cat); ui.updateLegend(); }
  if (nd.year > app.year) { app.playing = false; app.year = nd.year; ui.updateTimeline(); }
  applyFilter();
  app.selected = i; scene?.setSelected(i);
  if (push && app.hist[app.hi] !== i) { app.hist = app.hist.slice(0, app.hi + 1); app.hist.push(i); app.hi = app.hist.length - 1; }
  if (panel) ui.renderPanel(i);
  if (fly && scene) scene.flyToNode(i);
  syncHash();
};
app.back = () => { if (app.canBack()) { app.hi--; app.select(app.hist[app.hi], { push: false }); } };
app.forward = () => { if (app.canForward()) { app.hi++; app.select(app.hist[app.hi], { push: false }); } };
app.neighbor = (d) => {
  if (app.selected < 0) return;
  if (app.selected !== app.lastArrowSel) { app.nbrAnchor = app.selected; app.nbrIdx = -1; }
  const list = ui.links[app.nbrAnchor].slice().sort((a, b) => b.e.w - a.e.w || a.o - b.o).map((l) => l.o);
  if (!list.length) return;
  app.nbrIdx = (app.nbrIdx + d + list.length) % list.length;
  app.select(list[app.nbrIdx]); app.lastArrowSel = app.selected;
};

// ---------- layout ----------
app.setLayout = (name, { fly = true } = {}) => {
  if (!graph.layouts[name]) return;
  app.layout = name; ui.updateLayoutButtons(); scene?.setLayout(name); syncHash();
  if (fly && scene) { if (app.selected >= 0) scene.flyToNode(app.selected, { duration: 2.2 }); else scene.overview(1, name === 'galaxy' ? 0.85 : name === 'timeline' ? 0.08 : 0.2); }
};
app.setQuality = (q) => scene?.setQuality(q);
app.setLabels = (v) => app.labels?.setEnabled(v);

// ---------- guided tour ----------
app.tourIdx = 0;
app.startTour = () => {
  if (!graph.tour?.length) return;
  app.tourActive = true; $('#btn-tour').innerHTML = '&#10005; Exit tour'; setIntro(false);
  app.setYear(maxYear); app.showAllCategories(); app.select(-1); gotoStop(0);
};
function gotoStop(k) {
  app.tourIdx = k; const s = graph.tour[k]; ui.renderTour(k);
  app.select(indexOf.get(s.node), { panel: false, push: false });
  clearTimeout(app.tourTimer);
  if (!test) app.tourTimer = setTimeout(() => { if (app.tourActive && app.tourIdx < graph.tour.length - 1) gotoStop(app.tourIdx + 1); }, 14000);
}
app.tourStep = (d) => gotoStop(Math.min(graph.tour.length - 1, Math.max(0, app.tourIdx + d)));   // also called by the tour card buttons
app.exitTour = () => { app.tourActive = false; clearTimeout(app.tourTimer); ui.hideTour(); $('#btn-tour').innerHTML = '&#9654; Tour'; };

// ---------- input ----------
let down = null, lastMove = 0;
if (scene) {
  const cv = canvas;
  const local = (ev) => { const r = cv.getBoundingClientRect(); return [ev.clientX - r.left, ev.clientY - r.top]; };
  cv.addEventListener('pointerdown', (ev) => { down = { x: ev.clientX, y: ev.clientY, t: performance.now() }; app.idle = 0; scene.stopFlight(); });
  cv.addEventListener('pointermove', (ev) => {
    app.idle = 0; const now = performance.now(); if (now - lastMove < 24 || (ev.buttons && ev.pointerType === 'mouse')) return; lastMove = now;
    const [x, y] = local(ev); const i = scene.pick(x, y); scene.setHover(i); cv.style.cursor = i >= 0 ? 'pointer' : 'grab';
  });
  cv.addEventListener('pointerleave', () => scene.setHover(-1));
  cv.addEventListener('pointerup', (ev) => {
    if (!down) return; const moved = Math.hypot(ev.clientX - down.x, ev.clientY - down.y), dt = performance.now() - down.t; down = null;
    if (moved > 6 || dt > 600) return;
    const [x, y] = local(ev); const i = scene.pick(x, y);
    if (i >= 0) { if (app.tourActive) app.exitTour(); app.select(i); } else if (app.selected >= 0) app.select(-1);
  });
  cv.addEventListener('wheel', () => { app.idle = 0; scene.stopFlight(); }, { passive: true });
  addEventListener('resize', () => scene.resize());
}
addEventListener('keydown', (ev) => {
  const t = ev.target; const typing = t && (t.tagName === 'INPUT' || t.tagName === 'SELECT' || t.tagName === 'TEXTAREA');
  app.idle = 0;
  if (ev.key === 'Escape') {
    if (!$('#help').hidden) ui.toggleHelp(false); else if (!$('#listview').hidden) ui.toggleList(false); else if (!$('#settings').hidden) { $('#settings').hidden = true; }
    else if (app.tourActive) app.exitTour(); else if (app.selected >= 0) app.select(-1); else setIntro(false);
    return;
  }
  if (typing || ev.ctrlKey || ev.metaKey || ev.altKey) { if ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === 'k') { ev.preventDefault(); ui.focusSearch(); } return; }
  switch (ev.key) {
    case '/': ev.preventDefault(); ui.focusSearch(); break;
    case '1': app.setLayout('constellation'); break; case '2': app.setLayout('timeline'); break; case '3': app.setLayout('galaxy'); break;
    case 't': case 'T': app.tourActive ? app.exitTour() : app.startTour(); break;
    case 'p': case 'P': app.togglePlay(); break;
    case 'l': case 'L': ui.toggleList(); break;
    case 'r': case 'R': app.select(-1); scene?.overview(); break;
    case '?': ui.toggleHelp(); break;
    case 'ArrowRight': app.tourActive ? app.tourStep(1) : app.neighbor(1); break;
    case 'ArrowLeft': app.tourActive ? app.tourStep(-1) : app.neighbor(-1); break;
    case '[': app.back(); break; case ']': app.forward(); break;
    default:
  }
});
['pointerdown', 'wheel', 'touchstart'].forEach((e) => addEventListener(e, () => { app.idle = 0; }, { passive: true }));

// ---------- hash deep link ----------
function readHash() {
  const h = new URLSearchParams(location.hash.replace(/^#/, ''));
  if (h.get('l') && graph.layouts[h.get('l')]) { app.layout = h.get('l'); ui.updateLayoutButtons(); scene?.setLayout(app.layout, { animate: false }); }
  const id = h.get('n'); return id && indexOf.has(id) ? indexOf.get(id) : -1;
}
addEventListener('hashchange', () => { const i = readHash(); if (i >= 0 && i !== app.selected) app.select(i); });

// ---------- main loop ----------
let last = performance.now(), introShown = false, readyFlag = false;
function frame(now) {
  const dt = (now - last) / 1000; last = now; app.idle += dt;
  if (scene) {
    if (app.playing) {
      const prev = Math.floor(app.year); app.year = Math.min(maxYear, app.year + dt * 5.5);
      if (Math.floor(app.year) !== prev) { ui.updateTimeline(); applyFilter(true); }
      if (app.year >= maxYear) { app.playing = false; ui.updateTimeline(); }
    }
    scene.controls.autoRotate = app.autoRotate && !reduced && app.idle > 6 && app.selected < 0 && !app.tourActive && !scene.intro;
    if (app.playing) scene.controls.autoRotate = !reduced;
    scene.update(dt); app.labels.update(); scene.render();
    if (!introShown && !scene.intro) { introShown = true; if (!test || params.get('intro') === '1') setIntro(true); }
    if (!readyFlag && !scene.intro && !scene.flying) { readyFlag = true; document.body.dataset.ready = '1'; }
  }
  requestAnimationFrame(frame);
}

// ---------- start ----------
ui.updateLayoutButtons(); ui.updateLegend(); ui.updateTimeline();
const startNode = readHash();
function setIntro(show) { $('#intro').classList.toggle('show', show); document.body.classList.toggle('intro-open', show); }
$('#intro-tour').addEventListener('click', () => { setIntro(false); app.startTour(); });
$('#intro-free').addEventListener('click', () => setIntro(false));
$('#intro').addEventListener('click', (ev) => { if (ev.target === $('#intro')) setIntro(false); });
if (scene) {
  const skip = test && params.get('intro') !== '1';
  if (skip || reduced) { scene.finishIntro(); } else scene.startIntro();
  if (startNode >= 0) app.select(startNode, { fly: true });
  requestAnimationFrame(frame);
} else {
  ui.toggleList(true);
  document.body.dataset.ready = '1';
}

// ---------- test hook (only with ?test) ----------
if (test) {
  window.__mapTest = {
    app,
    state: () => ({
      nodes: graph.nodes.length, visible: scene ? [...scene.vis].filter((v) => v > 0.5).length : 0, layout: app.layout,
      selected: app.selected >= 0 ? graph.nodes[app.selected].id : null, year: Math.round(app.year), hidden: [...app.hiddenCats],
      cam: scene ? { pos: scene.camera.position.toArray(), target: scene.controls.target.toArray(), dist: scene.camera.position.distanceTo(scene.controls.target) } : null,
      fps: scene?.fps, intro: scene?.intro, flying: scene?.flying, layoutMoving: scene?.layoutMoving, tour: app.tourActive ? app.tourIdx : null,
      gl: scene ? (() => { const gl = scene.renderer.getContext(), d = gl.getExtension('WEBGL_debug_renderer_info'); return { webgl2: gl instanceof WebGL2RenderingContext, renderer: d ? gl.getParameter(d.UNMASKED_RENDERER_WEBGL) : 'unknown' }; })() : null,
      quality: scene?.state.quality,
    }),
    labels: () => ({ visible: app.labels.visibleIds(), described: app.labels.describedIds(), rects: app.labels.rects() }),
    fx: (id) => { const i = indexOf.get(id); return { vis: scene.vis[i], ...scene.fxOf(i) }; },
    worldOf: (id) => { const i = indexOf.get(id); return [scene.pos[i * 3], scene.pos[i * 3 + 1], scene.pos[i * 3 + 2]]; },
    flags: () => ({ pulse: scene.state.pulse, autoRotate: scene.controls.autoRotate, reduced }),
    select: (id) => app.select(indexOf.get(id)),
    selectNoFly: (id) => app.select(indexOf.get(id), { fly: false }),
    flyTo: (id, opts) => scene.flyToNode(indexOf.get(id), opts),
    jumpTo: (id, dist) => { const i = indexOf.get(id); scene.stopFlight(); const p = scene.nodePoint(i); const d = scene.camera.position.clone().sub(scene.controls.target).normalize(); scene.controls.target.copy(p); scene.camera.position.copy(p).addScaledVector(d, dist); scene.controls.update(); },
    overview: () => scene.overview(),
    jumpOverview: (elev = 0.2) => { scene.stopFlight(); const dist = scene.fitDistance(); scene.controls.target.set(0, 0, 0); scene.camera.position.set(0, dist * elev, dist); scene.controls.update(); },
    setLayout: (n) => app.setLayout(n), setYear: (y) => app.setYear(y), toggleCategory: (k) => app.toggleCategory(k), showAll: () => app.showAllCategories(),
    search: (q) => ui.search(q).map((i) => graph.nodes[i].id),
    startTour: () => app.startTour(), tourStep: (d) => app.tourStep(d),
    screenOf: (id) => { const i = indexOf.get(id); const s = scene.screen; return { x: s[i * 4], y: s[i * 4 + 1], depth: s[i * 4 + 2], r: s[i * 4 + 3] }; },
    pick: (x, y) => { const i = scene.pick(x, y); return i >= 0 ? graph.nodes[i].id : null; },
    hover: (id) => scene.setHover(id ? indexOf.get(id) : -1),
    setQuality: (q) => scene.setQuality(q),
    freezeTime: () => { scene.state.still = true; },
    measureFps: (ms = 2000) => new Promise((res) => { let f = 0; const t0 = performance.now(); const tick = () => { f++; if (performance.now() - t0 >= ms) res((f * 1000) / (performance.now() - t0)); else requestAnimationFrame(tick); }; requestAnimationFrame(tick); }),
  };
}
