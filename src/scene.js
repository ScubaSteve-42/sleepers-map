// The 3D scene: instanced glowing nodes, GPU-evaluated curved edges, starfield, nebula, bloom, camera flights.
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import * as SH from './shaders.js';

export const TIER_RADIUS = [15, 9.5, 5.8, 3.6, 2.4];
const TEXW = 1024;
const EDGE_SEGMENTS = 14;
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOutBack = (t, s = 1.2) => 1 + (s + 1) * Math.pow(t - 1, 3) + s * Math.pow(t - 1, 2);
const clamp01 = (x) => Math.min(1, Math.max(0, x));
const seedOf = (i) => { const s = Math.sin(i * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };

export function createScene({ canvas, graph, layouts, reduced = false, quality = 'auto', still = false }) {
  const n = graph.nodes.length;
  const cats = new Map(graph.categories.map((c) => [c.key, c]));
  const indexOf = new Map(graph.nodes.map((nd, i) => [nd.id, i]));
  const texH = Math.max(1, Math.ceil(n / TEXW));

  // ---------- renderer / camera / controls ----------
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance', alpha: false });
  renderer.setClearColor(0x02030a, 1);
  renderer.toneMapping = THREE.NoToneMapping;   // tone mapping washes the category colours toward white; the bloom pass supplies the glow
  const camera = new THREE.PerspectiveCamera(50, 1, 0.5, 14000);
  camera.position.set(0, 160, 1000);
  const controls = new OrbitControls(camera, canvas);
  Object.assign(controls, {
    enableDamping: true, dampingFactor: 0.07, rotateSpeed: 0.55, zoomSpeed: 1.0, panSpeed: 0.8,
    minDistance: 6, maxDistance: 3200, zoomToCursor: true, screenSpacePanning: true, autoRotateSpeed: 0.35,
  });
  controls.target.set(0, 0, 0);

  const scene = new THREE.Scene();
  const state = { time: 0, quality: quality === 'auto' ? 'high' : quality, auto: quality === 'auto', pulse: reduced ? 0 : 1, still };

  // ---------- per-node data ----------
  const pos = new Float32Array(n * 3);          // current positions
  const fromPos = new Float32Array(n * 3), toPos = new Float32Array(n * 3);
  const rad = new Float32Array(n);
  const tVis = new Float32Array(n).fill(1), vis = new Float32Array(n);
  const tEmph = new Float32Array(n), emph = new Float32Array(n);
  const tDim = new Float32Array(n), dim = new Float32Array(n);
  const birth = new Float32Array(n);
  const screen = new Float32Array(n * 4);       // x, y, depth, radius in px (CSS pixels)
  const colorLin = [];
  graph.nodes.forEach((nd, i) => {
    rad[i] = TIER_RADIUS[nd.tier] ?? 3;
    const c = new THREE.Color(cats.get(nd.cat)?.color ?? '#ffffff');
    colorLin.push([c.r, c.g, c.b]);
  });
  const adj = Array.from({ length: n }, () => []);
  const edgePairs = [];
  graph.edges.forEach((e) => {
    const a = indexOf.get(e.s), b = indexOf.get(e.t);
    if (a === undefined || b === undefined) return;
    adj[a].push(b); adj[b].push(a); edgePairs.push([a, b, e.w]);
  });

  const posData = new Float32Array(TEXW * texH * 4), fxData = new Float32Array(TEXW * texH * 4);
  const mkTex = (data) => {
    const t = new THREE.DataTexture(data, TEXW, texH, THREE.RGBAFormat, THREE.FloatType);
    t.minFilter = t.magFilter = THREE.NearestFilter; t.generateMipmaps = false; t.needsUpdate = true; return t;
  };
  const posTex = mkTex(posData), fxTex = mkTex(fxData);

  const uniforms = {
    uPos: { value: posTex }, uFx: { value: fxTex }, uTime: { value: 0 }, uRes: { value: new THREE.Vector2(1, 1) },
    uPx: { value: 1 }, uPulse: { value: state.pulse }, uReveal: { value: 1 },
  };
  const defines = { TEXW };

  // ---------- nodes (instanced spheres) + halos ----------
  const instColor = new Float32Array(n * 3), instInfo = new Float32Array(n * 4);
  graph.nodes.forEach((nd, i) => {
    instColor.set(colorLin[i], i * 3);
    instInfo.set([rad[i], nd.tier, seedOf(i + 1), 0], i * 4);
  });
  const sphere = new THREE.IcosahedronGeometry(1, 3);
  const nodeGeo = new THREE.InstancedBufferGeometry();
  nodeGeo.index = sphere.index; nodeGeo.setAttribute('position', sphere.getAttribute('position'));
  nodeGeo.setAttribute('aColor', new THREE.InstancedBufferAttribute(instColor, 3));
  nodeGeo.setAttribute('aInfo', new THREE.InstancedBufferAttribute(instInfo, 4));
  nodeGeo.instanceCount = n;
  const nodeMat = new THREE.ShaderMaterial({ vertexShader: SH.nodeVert, fragmentShader: SH.nodeFrag, uniforms, defines });
  const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat); nodeMesh.frustumCulled = false; nodeMesh.renderOrder = 0;
  scene.add(nodeMesh);

  const quad = new THREE.PlaneGeometry(2, 2);
  const haloGeo = new THREE.InstancedBufferGeometry();
  haloGeo.index = quad.index; haloGeo.setAttribute('position', quad.getAttribute('position'));
  haloGeo.setAttribute('aColor', nodeGeo.getAttribute('aColor')); haloGeo.setAttribute('aInfo', nodeGeo.getAttribute('aInfo'));
  haloGeo.instanceCount = n;
  const haloMat = new THREE.ShaderMaterial({
    vertexShader: SH.haloVert, fragmentShader: SH.haloFrag, uniforms, defines,
    transparent: true, depthWrite: false, depthTest: true, blending: THREE.AdditiveBlending,
  });
  const haloMesh = new THREE.Mesh(haloGeo, haloMat); haloMesh.frustumCulled = false; haloMesh.renderOrder = 2;
  scene.add(haloMesh);

  // ---------- orbit rings for hubs ----------
  const rings = [];
  graph.nodes.forEach((nd, i) => {
    if (nd.tier > 1) return;
    const col = new THREE.Color(cats.get(nd.cat)?.color ?? '#fff');
    for (let k = 0; k < 2; k++) {
      const pts = []; const seg = 160;
      for (let j = 0; j <= seg; j++) { const a = (j / seg) * Math.PI * 2; pts.push(new THREE.Vector3(Math.cos(a), 0, Math.sin(a))); }
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: nd.tier === 0 ? 0.55 : 0.32, blending: THREE.AdditiveBlending, depthWrite: false });
      const line = new THREE.Line(geo, mat); line.frustumCulled = false; line.renderOrder = 2;
      line.userData = { i, k, tilt: 0.5 + seedOf(i * 3 + k) * 1.1, speed: (0.12 + seedOf(i + k * 7) * 0.2) * (k ? -1 : 1), scale: 1.9 + k * 0.55 + (nd.tier === 0 ? 0.8 : 0) };
      rings.push(line); scene.add(line);
    }
  });

  // ---------- edges (GPU-evaluated ribbons) ----------
  const E = edgePairs.length, S = EDGE_SEGMENTS, vertsPer = (S + 1) * 2;
  const baseGeo = new THREE.InstancedBufferGeometry();
  const aT = new Float32Array(vertsPer), aSide = new Float32Array(vertsPer), idx = [];
  for (let s = 0; s <= S; s++) {
    aT[s * 2] = aT[s * 2 + 1] = s / S; aSide[s * 2] = -1; aSide[s * 2 + 1] = 1;
    if (s < S) { const a = s * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
  }
  baseGeo.setIndex(idx);
  baseGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertsPer * 3), 3));
  baseGeo.setAttribute('aT', new THREE.BufferAttribute(aT, 1));
  baseGeo.setAttribute('aSide', new THREE.BufferAttribute(aSide, 1));
  const aEnds = new Float32Array(E * 2), aEdge = new Float32Array(E * 4), aColA = new Float32Array(E * 3), aColB = new Float32Array(E * 3);
  edgePairs.forEach(([a, b, w], e) => {
    aEnds.set([a, b], e * 2);
    aEdge.set([(w - 1) / 2, seedOf(e + 11), seedOf(e * 5 + 3), 0], e * 4);
    aColA.set(colorLin[a], e * 3); aColB.set(colorLin[b], e * 3);
  });
  baseGeo.setAttribute('aEnds', new THREE.InstancedBufferAttribute(aEnds, 2));
  baseGeo.setAttribute('aEdge', new THREE.InstancedBufferAttribute(aEdge, 4));
  baseGeo.setAttribute('aColA', new THREE.InstancedBufferAttribute(aColA, 3));
  baseGeo.setAttribute('aColB', new THREE.InstancedBufferAttribute(aColB, 3));
  baseGeo.instanceCount = E;
  const edgeMat = new THREE.ShaderMaterial({
    vertexShader: SH.edgeVert, fragmentShader: SH.edgeFrag, uniforms, defines,
    transparent: true, depthWrite: false, depthTest: true, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
  });
  const edgeMesh = new THREE.Mesh(baseGeo, edgeMat); edgeMesh.frustumCulled = false; edgeMesh.renderOrder = 1;
  scene.add(edgeMesh);

  // ---------- backdrop: nebula, stars, dust ----------
  const bg = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 16), new THREE.ShaderMaterial({
    vertexShader: SH.bgVert, fragmentShader: SH.bgFrag, uniforms, side: THREE.BackSide, depthWrite: false, depthTest: false,
  }));
  bg.frustumCulled = false; bg.renderOrder = -10; scene.add(bg);

  const mkPoints = (count, rMin, rMax, sizeRange, vert, frag, tinted) => {
    const p = new Float32Array(count * 3), sz = new Float32Array(count), ph = new Float32Array(count), tint = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = seedOf(i * 3 + 1) * 2 - 1, a = seedOf(i * 3 + 2) * Math.PI * 2, r = rMin + seedOf(i * 3 + 3) * (rMax - rMin), s = Math.sqrt(1 - u * u);
      p.set([r * s * Math.cos(a), r * u, r * s * Math.sin(a)], i * 3);
      sz[i] = sizeRange[0] + Math.pow(seedOf(i + 99), 3) * (sizeRange[1] - sizeRange[0]); ph[i] = seedOf(i + 7);
      const t = seedOf(i + 55); tint.set(t < 0.15 ? [1, 0.82, 0.62] : t < 0.4 ? [0.7, 0.82, 1] : [0.92, 0.95, 1], i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(p, 3)); g.setAttribute('aSize', new THREE.BufferAttribute(sz, 1)); g.setAttribute('aPhase', new THREE.BufferAttribute(ph, 1));
    if (tinted) g.setAttribute('aTint', new THREE.BufferAttribute(tint, 3));
    const m = new THREE.ShaderMaterial({ vertexShader: vert, fragmentShader: frag, uniforms, transparent: true, depthWrite: false, depthTest: false, blending: THREE.AdditiveBlending });
    const pts = new THREE.Points(g, m); pts.frustumCulled = false; return pts;
  };
  const stars = mkPoints(3200, 2600, 6000, [1.1, 3.4], SH.starVert, SH.starFrag, true); stars.renderOrder = -9; scene.add(stars);
  const dust = mkPoints(700, 60, 560, [1.2, 3.2], SH.dustVert, SH.dustFrag, false); dust.renderOrder = -8; scene.add(dust);

  // ---------- post-processing ----------
  let composer, bloom, finalPass, rt;
  const finalUniforms = { tDiffuse: { value: null }, uTime: { value: 0 }, uVig: { value: 0.55 }, uGrain: { value: 0.018 }, uCA: { value: 0.012 }, uRes: { value: new THREE.Vector2(1, 1) } };
  function buildComposer(w, h) {
    composer?.dispose?.(); rt?.dispose?.();
    rt = new THREE.WebGLRenderTarget(w, h, { type: THREE.HalfFloatType, samples: state.quality === 'high' ? 4 : 0 });
    composer = new EffectComposer(renderer, rt);
    composer.addPass(new RenderPass(scene, camera));
    bloom = new UnrealBloomPass(new THREE.Vector2(w, h), 0.55, 0.55, 0.62);
    composer.addPass(bloom);
    finalPass = new ShaderPass(new THREE.ShaderMaterial({ uniforms: finalUniforms, vertexShader: SH.finalVert, fragmentShader: SH.finalFrag }));
    composer.addPass(finalPass);
    composer.addPass(new OutputPass());
  }

  let cssW = 1, cssH = 1;
  function resize() {
    cssW = Math.max(1, canvas.clientWidth || innerWidth); cssH = Math.max(1, canvas.clientHeight || innerHeight);
    const cap = state.quality === 'low' ? 1 : state.quality === 'medium' ? 1.5 : 2;
    const pr = Math.min(devicePixelRatio || 1, cap);
    renderer.setPixelRatio(pr); renderer.setSize(cssW, cssH, false);
    camera.aspect = cssW / cssH; camera.updateProjectionMatrix();
    uniforms.uRes.value.set(cssW * pr, cssH * pr); uniforms.uPx.value = pr;
    finalUniforms.uRes.value.set(cssW * pr, cssH * pr);
    buildComposer(Math.floor(cssW * pr), Math.floor(cssH * pr));
    composer.setPixelRatio?.(1);
  }

  // ---------- layout transitions ----------
  let layoutName = 'constellation';
  let layoutTween = null;
  const layoutArr = (name) => Float32Array.from(layouts[name]);
  function setLayout(name, { animate = true, duration = 2.2 } = {}) {
    if (!layouts[name]) return;
    layoutName = name; const to = layoutArr(name);
    if (!animate || reduced) { pos.set(to); toPos.set(to); layoutTween = null; return; }
    fromPos.set(pos); toPos.set(to); layoutTween = { t: 0, duration };
  }
  function layoutBounds() {
    let m = 1; for (let i = 0; i < n; i++) m = Math.max(m, Math.hypot(toPos[i * 3], toPos[i * 3 + 1], toPos[i * 3 + 2])); return m;
  }

  // ---------- camera tweens ----------
  let camTween = null;
  function flyToPoint(target, dist, { duration = 1.4, dirFrom } = {}) {
    const dir = new THREE.Vector3().subVectors(camera.position, controls.target);
    if (dirFrom) dir.copy(dirFrom);
    if (dir.lengthSq() < 1e-6) dir.set(0, 0.2, 1);
    dir.normalize();
    const toTarget = target.clone();
    const toPosCam = toTarget.clone().addScaledVector(dir, dist);
    if (reduced) { camera.position.copy(toPosCam); controls.target.copy(toTarget); controls.update(); return Promise.resolve(); }
    return new Promise((resolve) => {
      camTween = { t: 0, duration, fp: camera.position.clone(), ft: controls.target.clone(), tp: toPosCam, tt: toTarget, resolve };
    });
  }
  const nodePoint = (i) => new THREE.Vector3(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]);
  function flyToNode(i, { duration = 1.4, factor = 8.5 } = {}) {
    const dist = Math.max(rad[i] * factor, 34);
    // aim at where the node will be if a layout change is still in flight
    const target = layoutTween ? new THREE.Vector3(toPos[i * 3], toPos[i * 3 + 1], toPos[i * 3 + 2]) : nodePoint(i);
    return flyToPoint(target, dist, { duration });
  }
  // camera distance that frames the whole layout; wide screens are limited by height, narrow ones by width
  function fitDistance(extra = 1) {
    const r = layoutBounds(), half = Math.tan((camera.fov * Math.PI) / 360);
    return (r / Math.min(half, half * camera.aspect)) * 1.02 * extra;
  }
  function overview(extra = 1, elevation = 0.2) {
    return flyToPoint(new THREE.Vector3(0, 0, 0), fitDistance(extra), { duration: 1.6, dirFrom: new THREE.Vector3(0, elevation, 1) });
  }
  const stopFlight = () => { if (camTween) { camTween.resolve?.(); camTween = null; } };

  // ---------- focus / visibility ----------
  let hover = -1, selected = -1;
  function recomputeFocus() {
    const f = hover >= 0 ? hover : selected;
    tEmph.fill(0); tDim.fill(0);
    if (f >= 0) {
      tDim.fill(1); tEmph[f] = 1; tDim[f] = 0;
      for (const nb of adj[f]) { tEmph[nb] = 0.5; tDim[nb] = 0; }
    }
  }
  function setHover(i) { if (i !== hover) { hover = i; recomputeFocus(); } }
  function setSelected(i) { selected = i; recomputeFocus(); }
  function setVisibleMask(mask, { birthFlash = false } = {}) {
    for (let i = 0; i < n; i++) {
      const v = mask(i) ? 1 : 0;
      if (birthFlash && v === 1 && tVis[i] === 0) birth[i] = 1;
      tVis[i] = v;
    }
  }
  const isVisible = (i) => vis[i] > 0.3;

  // ---------- intro ----------
  let intro = null;
  function startIntro() {
    const to = layoutArr(layoutName); toPos.set(to);
    for (let i = 0; i < n; i++) { pos[i * 3] = pos[i * 3 + 1] = pos[i * 3 + 2] = 0; fromPos[i * 3] = fromPos[i * 3 + 1] = fromPos[i * 3 + 2] = 0; }
    vis.fill(0);
    uniforms.uReveal.value = 0;
    const r = layoutBounds();
    camera.position.set(r * 0.5, r * 0.35, r * 3.6); controls.target.set(0, 0, 0);
    intro = { t: 0, duration: 5.2 };
    layoutTween = null;
  }
  function finishIntro() {
    for (let i = 0; i < n; i++) vis[i] = tVis[i];
    pos.set(toPos); uniforms.uReveal.value = 1; intro = null;
    return overview(1);
  }

  // ---------- projection for labels and picking ----------
  const vp = new THREE.Matrix4(), v4 = new THREE.Vector4();
  function updateScreen() {
    camera.updateMatrixWorld(); vp.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    const e = vp.elements, scale = cssH / (2 * Math.tan((camera.fov * Math.PI) / 360));
    for (let i = 0; i < n; i++) {
      const x = pos[i * 3], y = pos[i * 3 + 1], z = pos[i * 3 + 2];
      const w = e[3] * x + e[7] * y + e[11] * z + e[15];
      if (w <= 0.01) { screen[i * 4 + 2] = -1; continue; }
      const cx = (e[0] * x + e[4] * y + e[8] * z + e[12]) / w, cy = (e[1] * x + e[5] * y + e[9] * z + e[13]) / w;
      screen[i * 4] = (cx * 0.5 + 0.5) * cssW; screen[i * 4 + 1] = (1 - (cy * 0.5 + 0.5)) * cssH; screen[i * 4 + 2] = w;
      screen[i * 4 + 3] = (rad[i] * (1 + 0.22 * emph[i]) * vis[i] * scale) / w;
    }
  }
  function pick(px, py) {
    let best = -1, bestScore = Infinity;
    for (let i = 0; i < n; i++) {
      if (vis[i] < 0.35 || screen[i * 4 + 2] < 0) continue;
      const dx = screen[i * 4] - px, dy = screen[i * 4 + 1] - py, r = Math.max(screen[i * 4 + 3], 7) + 4, d2 = dx * dx + dy * dy;
      if (d2 > r * r) continue;
      const score = screen[i * 4 + 2] + Math.sqrt(d2) * 2;   // prefer the nearest to the camera, then the closest to the pointer
      if (score < bestScore) { bestScore = score; best = i; }
    }
    return best;
  }

  // ---------- per-frame update ----------
  let fpsAcc = 0, fpsFrames = 0, fps = 60, slowSecs = 0, fastSecs = 0;
  function update(dt) {
    dt = Math.min(dt, 0.1);
    state.time += state.still ? 0 : dt;
    const t = state.still ? 12 : state.time;
    uniforms.uTime.value = t; finalUniforms.uTime.value = t; uniforms.uPulse.value = state.pulse;

    if (intro) {
      intro.t += dt; const k = clamp01(intro.t / intro.duration);
      for (let i = 0; i < n; i++) {
        const delay = (graph.nodes[i].tier * 0.1 + seedOf(i) * 0.25) * 0.9;
        const u = clamp01((k - delay) / (1 - 0.35 - delay + 0.0001));
        const e = easeOutBack(u, 0.9);
        pos[i * 3] = toPos[i * 3] * e; pos[i * 3 + 1] = toPos[i * 3 + 1] * e; pos[i * 3 + 2] = toPos[i * 3 + 2] * e;
        vis[i] = Math.min(tVis[i], clamp01(u * 2.2));
      }
      uniforms.uReveal.value = clamp01((k - 0.35) / 0.6);
      const r = layoutBounds(), end = fitDistance();
      const dist = THREE.MathUtils.lerp(r * 3.6, end, easeInOut(k));
      const ang = (1 - easeInOut(k)) * 1.1;
      camera.position.set(Math.sin(ang) * dist * 0.9, dist * (0.12 + 0.2 * (1 - k)), Math.cos(ang) * dist * 0.9);
      controls.target.set(0, 0, 0);
      if (k >= 1) { intro = null; uniforms.uReveal.value = 1; }
    } else if (layoutTween) {
      layoutTween.t += dt; const k = clamp01(layoutTween.t / layoutTween.duration);
      for (let i = 0; i < n; i++) {
        const d = seedOf(i + 3) * 0.3, u = easeInOut(clamp01((k - d) / (1 - d * 1.0001)));
        for (let c = 0; c < 3; c++) pos[i * 3 + c] = fromPos[i * 3 + c] + (toPos[i * 3 + c] - fromPos[i * 3 + c]) * u;
      }
      if (k >= 1) layoutTween = null;
    }

    if (camTween) {
      camTween.t += dt; const k = easeInOut(clamp01(camTween.t / camTween.duration));
      camera.position.lerpVectors(camTween.fp, camTween.tp, k); controls.target.lerpVectors(camTween.ft, camTween.tt, k);
      if (camTween.t >= camTween.duration) { const r = camTween.resolve; camTween = null; r?.(); }
    }
    controls.enabled = !camTween && !intro;
    controls.update();

    const ease = (rate) => 1 - Math.exp(-dt * rate);
    const eV = ease(5), eF = ease(9);
    if (!intro) for (let i = 0; i < n; i++) vis[i] += (tVis[i] - vis[i]) * eV;
    for (let i = 0; i < n; i++) {
      emph[i] += (tEmph[i] - emph[i]) * eF; dim[i] += (tDim[i] - dim[i]) * eF;
      if (birth[i] > 0) birth[i] = Math.max(0, birth[i] - dt * 0.9);
      const o = i * 4;
      posData[o] = pos[i * 3]; posData[o + 1] = pos[i * 3 + 1]; posData[o + 2] = pos[i * 3 + 2];
      fxData[o] = vis[i]; fxData[o + 1] = emph[i]; fxData[o + 2] = dim[i]; fxData[o + 3] = birth[i];
    }
    posTex.needsUpdate = true; fxTex.needsUpdate = true;

    for (const r of rings) {
      const { i, tilt, speed, scale, k } = r.userData; const s = rad[i] * scale * Math.max(0.001, vis[i]);
      r.position.set(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]); r.scale.setScalar(s);
      r.rotation.set(tilt, t * speed + k, k * 0.6);
      r.material.opacity = (graph.nodes[i].tier === 0 ? 0.5 : 0.3) * vis[i] * (1 - dim[i] * 0.9) * (1 + emph[i]);
    }
    updateScreen();

    // frame-time governor
    fpsAcc += dt; fpsFrames++;
    if (fpsAcc >= 1) {
      fps = fpsFrames / fpsAcc; fpsAcc = 0; fpsFrames = 0;
      if (state.auto && !intro) {
        slowSecs = fps < 28 ? slowSecs + 1 : 0; fastSecs = fps > 52 ? fastSecs + 1 : 0;
        if (slowSecs >= 2) { degrade(); slowSecs = 0; }
      }
    }
  }

  function degrade() {
    if (state.quality === 'high') setQuality('medium', true);
    else if (state.quality === 'medium') setQuality('low', true);
  }
  function setQuality(q, fromAuto = false) {
    if (!fromAuto) state.auto = false;
    state.quality = q;
    state.pulse = reduced || q === 'low' ? 0 : 1;
    finalUniforms.uGrain.value = q === 'low' ? 0 : 0.018; finalUniforms.uCA.value = q === 'low' ? 0 : 0.012;
    resize();
  }

  function render() {
    bg.position.copy(camera.position); bg.scale.setScalar(7000);
    stars.position.copy(camera.position); stars.position.multiplyScalar(0.985);
    composer.render();
  }

  resize();
  setLayout('constellation', { animate: false });
  for (let i = 0; i < n; i++) vis[i] = tVis[i];

  return {
    camera, controls, renderer, graph, indexOf, adj, pos, rad, screen, vis, state, uniforms,
    update, render, resize, pick, setHover, setSelected, setVisibleMask, isVisible, setLayout, startIntro, finishIntro,
    flyToNode, flyToPoint, overview, stopFlight, nodePoint, setQuality, layoutBounds, fitDistance,
    setBloom(strength) { if (bloom) bloom.strength = strength; },
    fxOf: (i) => ({ emph: emph[i], dim: dim[i], tVis: tVis[i] }),
    get layoutName() { return layoutName; }, get hover() { return hover; }, get selected() { return selected; },
    get intro() { return !!intro; }, get flying() { return !!camTween; }, get layoutMoving() { return !!layoutTween; },
    get fps() { return fps; }, get size() { return [cssW, cssH]; },
  };
}
