// DOM label layer with level of detail: titles above nodes, descriptions fade in as the camera gets close.
// Labels are placed greedily by priority (tier, size on screen, focus) and skipped when they would overlap a stronger one.
const MIN_RADIUS_PX = [0, 0, 2.2, 4, 6.5];      // smallest on-screen node radius that earns a title, by tier
const DESC_START = 24, DESC_FULL = 38;           // on-screen radius (px) where a description starts and finishes fading in
const MAX_DESCS = 5;

export function createLabels({ container, scene, graph, cats }) {
  const nodes = graph.nodes, n = nodes.length;
  const els = new Array(n), st = new Array(n);
  const frag = document.createDocumentFragment();
  nodes.forEach((nd, i) => {
    const el = document.createElement('div');
    el.className = `lbl t${nd.tier}`;
    el.style.setProperty('--c', cats.get(nd.cat)?.color ?? '#fff');
    el.innerHTML = '<div class="lbl-head"><span class="dot"></span><span class="ttl"></span><span class="yr"></span></div><div class="lbl-desc"><span class="cat"></span><span class="d"></span></div>';
    el.querySelector('.ttl').textContent = nd.title;
    el.querySelector('.yr').textContent = nd.tier > 1 ? String(nd.year) : '';
    el.querySelector('.cat').textContent = cats.get(nd.cat)?.label ?? '';
    el.querySelector('.d').textContent = nd.short;
    frag.appendChild(el); els[i] = el;
    st[i] = { on: false, desc: false, focus: false, tf: '', op: 1, dop: 1 };
  });
  container.appendChild(frag);

  // faint territory names that float over each category's cluster while zoomed out, like a map
  const regionEls = scene.regions.map((r) => {
    const e = document.createElement('div'); e.className = 'region'; e.style.setProperty('--c', cats.get(r.key)?.color ?? '#fff');
    e.textContent = (cats.get(r.key)?.label ?? r.key).replace(/:.*$/, ''); container.prepend(e); return e;
  });
  function updateRegions(focus, enabled) {
    const fit = scene.fitDistance();
    scene.regions.forEach((r, k) => {
      const e = regionEls[k];
      if (!enabled || r.depth < 0 || r.w < 0.05) { e.style.opacity = '0'; return; }
      const f = Math.min(1, Math.max(0, (r.depth / fit - 0.45) * 2.4));
      e.style.opacity = (f * 0.3 * r.w * (focus >= 0 ? 0.3 : 1)).toFixed(2);
      e.style.transform = `translate3d(${Math.round(r.x)}px,${Math.round(r.y)}px,0) translate(-50%,-50%)`;
    });
  }

  // axis labels: decades and category lanes on the timeline, era rings on the galaxy
  const axis = graph.layouts?.axis, guideEls = [];
  if (axis) {
    const mk = (cls, text, color) => { const e = document.createElement('div'); e.className = `axis-lbl ${cls}`; e.textContent = text; if (color) e.style.setProperty('--c', color); container.prepend(e); return e; };
    const tl = axis.timeline, xs = tl.decades.map((d) => d.x), x0 = Math.min(...xs) - 90;
    tl.decades.forEach((d) => guideEls.push({ el: mk('dec', String(d.year)), key: 'timeline', p: [d.x, tl.bottom - 12, tl.z] }));
    tl.lanes.forEach((l) => guideEls.push({ el: mk('lane', l.label.replace(/:.*$/, ''), cats.get(l.cat)?.color), key: 'timeline', p: [x0, l.y, tl.z] }));
    const [cx, cy, cz] = axis.galaxy.center;
    // stagger the ring labels around the galaxy so they do not pile up where the rings are close together
    axis.galaxy.rings.forEach((r, i) => { const a = -0.9 + i * 0.5; guideEls.push({ el: mk('ring', String(r.year)), key: 'galaxy', p: [cx + Math.cos(a) * r.r, cy, cz + Math.sin(a) * r.r] }); });
  }
  function updateGuides() {
    for (const g of guideEls) {
      const m = scene.guideMix[g.key], pt = enabled && m > 0.02 ? scene.project(g.p[0], g.p[1], g.p[2]) : null;
      if (!pt) { if (g.on) { g.el.style.opacity = '0'; g.on = false; } continue; }
      g.on = true; g.el.style.opacity = (m * 0.8).toFixed(2);
      g.el.style.transform = `translate3d(${Math.round(pt[0])}px,${Math.round(pt[1])}px,0) translate(-50%,-50%)`;
    }
  }

  const CELL = 110;
  let enabled = true;
  const rects = [];
  let placedRects = [];   // [node index, screen rectangle] for every label shown this frame, strongest first

  function overlaps(a, b) { return a.x0 < b.x1 && a.x1 > b.x0 && a.y0 < b.y1 && a.y1 > b.y0; }

  function update() {
    const [W, H] = scene.size, sc = scene.screen, vis = scene.vis;
    const hover = scene.hover, selected = scene.selected, focus = hover >= 0 ? hover : selected;
    const nbrs = focus >= 0 ? new Set(scene.adj[focus]) : null;
    const maxLabels = Math.max(12, Math.min(150, Math.floor((W * H) / 17000)));
    const cand = [];
    let gaze = -1, gazeD = 70;
    if (enabled) {
      for (let i = 0; i < n; i++) {
        const k = i * 4;
        if (vis[i] < 0.5 || sc[k + 2] < 0) continue;
        const x = sc[k], y = sc[k + 1], r = sc[k + 3];
        if (x < -30 || x > W + 30 || y < -10 || y > H + 100) continue;
        const isFocus = i === hover || i === selected;
        const tier = nodes[i].tier;
        if (!isFocus && r < MIN_RADIUS_PX[tier]) continue;
        if (r >= 10) { const d = Math.hypot(x - W / 2, y - H / 2); if (d < gazeD) { gazeD = d; gaze = i; } }
        const score = (4 - tier) * 1000 + r * 2 + (isFocus ? 1e6 : 0) + (nbrs && nbrs.has(i) ? 400 : 0) + (st[i].on ? 120 : 0);
        cand.push([score, i]);
      }
      // whatever the camera is aimed at wins its label, so zooming toward any node always shows its title
      if (gaze >= 0) for (const c of cand) if (c[1] === gaze) c[0] += 1e5;
      cand.sort((a, b) => b[0] - a[0]);
    }
    // choose which labels may expand into a description (largest on screen first)
    const descSet = new Set();
    if (enabled) {
      const byR = cand.filter(([, i]) => sc[i * 4 + 3] >= DESC_START || ((i === hover) && sc[i * 4 + 3] >= 6) || (i === selected && sc[i * 4 + 3] >= 14))
        .sort((a, b) => sc[b[1] * 4 + 3] - sc[a[1] * 4 + 3]);
      for (const [, i] of byR) { if (descSet.size >= MAX_DESCS) break; descSet.add(i); }
    }
    const grid = new Map(), placed = new Set(), want = new Map(), order = [];
    rects.length = 0;
    for (const [, i] of cand) {
      if (placed.size >= maxLabels) break;
      const k = i * 4, x = sc[k], r = sc[k + 3], nd = nodes[i];
      const tier = nd.tier, isFocus = i === hover || i === selected;
      const wantDesc = descSet.has(i);
      const tw = nd.title.length * (tier === 0 ? 12.5 : tier === 1 ? 9.4 : tier === 2 ? 7.9 : 7.3) + (tier > 1 ? 46 : 22);
      const w = (wantDesc ? Math.max(tw, 200) : tw) + 10;
      const h = (tier === 0 ? 32 : tier === 1 ? 24 : 21) + (wantDesc ? 22 + 15 * Math.min(5, Math.ceil(nd.short.length / 36)) : 0);
      const ay = sc[k + 1] - r - 7;
      const lx = Math.min(Math.max(x, w / 2 + 6), W - w / 2 - 6);      // keep the label on screen
      const rect = { x0: lx - w / 2, y0: ay - h, x1: lx + w / 2, y1: ay + 2 };
      let hit = false;
      const cx0 = Math.floor(rect.x0 / CELL), cx1 = Math.floor(rect.x1 / CELL), cy0 = Math.floor(rect.y0 / CELL), cy1 = Math.floor(rect.y1 / CELL);
      if (!isFocus && i !== gaze) {
        outer: for (let gx = cx0; gx <= cx1; gx++) for (let gy = cy0; gy <= cy1; gy++) {
          const b = grid.get(gx * 7919 + gy);
          if (b) for (const o of b) if (overlaps(rect, o)) { hit = true; break outer; }
        }
      }
      if (hit) continue;
      for (let gx = cx0; gx <= cx1; gx++) for (let gy = cy0; gy <= cy1; gy++) {
        const key = gx * 7919 + gy; let b = grid.get(key); if (!b) grid.set(key, (b = [])); b.push(rect);
      }
      placed.add(i); want.set(i, { x: lx, ay, wantDesc, isFocus }); order.push([i, rect]);
    }
    updateRegions(focus, enabled);
    updateGuides();
    placedRects = order;
    // apply to the DOM, touching only what changed
    const nearDepth = scene.camera.position.length();
    for (let i = 0; i < n; i++) {
      const s = st[i], el = els[i], w = want.get(i);
      if (!w) { if (s.on) { s.on = false; s.desc = false; el.classList.remove('on', 'desc', 'focus'); s.focus = false; } continue; }
      if (!s.on) { s.on = true; el.classList.add('on'); }
      const tf = `translate3d(${Math.round(w.x)}px,${Math.round(w.ay)}px,0) translate(-50%,-100%)`;
      if (tf !== s.tf) { el.style.transform = tf; s.tf = tf; }
      const depth = sc[i * 4 + 2];
      let op = Math.min(1, Math.max(0.55, 1.2 - (depth / (nearDepth * 1.6 + 400)) * 0.7));
      if (focus >= 0 && !w.isFocus && !(nbrs && nbrs.has(i))) op *= 0.28;
      if (Math.abs(op - s.op) > 0.03) { el.style.setProperty('--op', op.toFixed(2)); s.op = op; }
      const rpx = sc[i * 4 + 3];
      const dop = (i === hover) ? 1 : Math.min(1, Math.max(0, (rpx - DESC_START) / (DESC_FULL - DESC_START)));
      if (w.wantDesc !== s.desc) { s.desc = w.wantDesc; el.classList.toggle('desc', s.desc); }
      if (s.desc && Math.abs(dop - s.dop) > 0.03) { el.style.setProperty('--dop', Math.max(dop, i === selected ? 0.9 : 0).toFixed(2)); s.dop = dop; }
      if (w.isFocus !== s.focus) { s.focus = w.isFocus; el.classList.toggle('focus', s.focus); }
    }
  }

  return {
    update,
    // labels let pointer events through so dragging to orbit works anywhere; clicks on a title are matched here instead
    hitTest(px, py) {
      for (const [i, r] of placedRects) if (px >= r.x0 && px <= r.x1 && py >= r.y0 && py <= r.y1) return i;
      return -1;
    },
    setEnabled(v) { enabled = !!v; },
    visibleIds() { const out = []; for (let i = 0; i < n; i++) if (st[i].on) out.push(nodes[i].id); return out; },
    describedIds() { const out = []; for (let i = 0; i < n; i++) if (st[i].on && st[i].desc) out.push(nodes[i].id); return out; },
    rects() { const out = []; for (let i = 0; i < n; i++) if (st[i].on) { const r = els[i].querySelector('.lbl-head').getBoundingClientRect(); out.push({ id: nodes[i].id, x: r.x, y: r.y, w: r.width, h: r.height }); } return out; },
    el: (i) => els[i],
  };
}
