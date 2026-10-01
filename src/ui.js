// DOM user interface: detail panel, search, category legend, timeline, tour card, list view, help and settings.
const $ = (s, r = document) => r.querySelector(s);
const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };

const KIND_LABEL = {
  influenced: ['Influenced', 'Influenced by'], 'evolved-into': ['Led to', 'Came from'], implements: ['Implements', 'Implemented by'],
  uses: ['Uses', 'Used by'], 'created-by': ['Created by', 'Created'], 'part-of': ['Part of', 'Contains'],
  'replaced-by': ['Replaced by', 'Replaced'], 'competes-with': ['Competes with', 'Competes with'], related: ['Related to', 'Related to'],
};
const KIND_ORDER = ['part-of', 'evolved-into', 'influenced', 'implements', 'uses', 'created-by', 'replaced-by', 'competes-with', 'related'];

export function createUI(app) {
  const { graph, cats } = app;
  const nodes = graph.nodes, idxOf = app.indexOf;
  const years = nodes.map((n) => n.year), minYear = Math.min(...years), maxYear = Math.max(...years);
  const catCount = new Map(); nodes.forEach((n) => catCount.set(n.cat, (catCount.get(n.cat) ?? 0) + 1));
  const links = nodes.map(() => []);
  graph.edges.forEach((e) => { const a = idxOf.get(e.s), b = idxOf.get(e.t); if (a == null || b == null) return; links[a].push({ o: b, e, out: true }); links[b].push({ o: a, e, out: false }); });

  // ---------- header stats ----------
  $('#stats').textContent = `${nodes.length} ideas · ${graph.edges.length} connections`;

  // ---------- panel ----------
  const panel = $('#panel');
  function chipFor(i) {
    const b = el('button'); b.type = 'button';
    const dot = el('i', 'legend-dot'); dot.style.setProperty('--c', cats.get(nodes[i].cat)?.color ?? '#fff');
    b.append(dot, document.createTextNode(nodes[i].title)); b.title = `${nodes[i].title} (${nodes[i].year})`;
    b.addEventListener('click', () => app.select(i)); return b;
  }
  function renderPanel(i) {
    const nd = nodes[i], cat = cats.get(nd.cat);
    panel.hidden = false; panel.replaceChildren();
    const bar = el('div', 'bar');
    const back = el('button', null, '‹'); back.title = 'Back ([)'; back.setAttribute('aria-label', 'Back'); back.disabled = !app.canBack(); back.addEventListener('click', () => app.back());
    const fwd = el('button', null, '›'); fwd.title = 'Forward (])'; fwd.setAttribute('aria-label', 'Forward'); fwd.disabled = !app.canForward(); fwd.addEventListener('click', () => app.forward());
    const sp = el('span', 'sp');
    const close = el('button', null, '×'); close.title = 'Close (Esc)'; close.setAttribute('aria-label', 'Close details'); close.addEventListener('click', () => app.select(-1));
    bar.append(back, fwd, sp, close);
    const sc = el('div', 'scroll');
    const chip = el('div', 'chip'); const dot = el('i', 'legend-dot'); dot.style.setProperty('--c', cat?.color ?? '#fff');
    chip.append(dot, el('span', null, cat?.label ?? nd.cat), el('span', 'yr', String(nd.year) + (nd.yearEnd ? `–${nd.yearEnd}` : '')));
    if (nd.status && nd.status !== 'n/a') chip.append(el('span', 'yr', nd.status));
    const h = el('h2', null, nd.title); h.id = 'panel-title';
    sc.append(chip, h, el('p', 'lead', nd.short), el('p', 'long', nd.long));
    if (nd.sleeper) { const s = el('div', 'sleeper'); s.append(el('b', null, 'If you have been asleep'), el('span', null, nd.sleeper)); sc.append(s); }
    if (nd.code) { const pre = el('pre', 'code'); const c = el('code', null, nd.code.text); pre.append(c); pre.setAttribute('aria-label', `${nd.code.lang} example`); sc.append(pre); }
    // connections grouped by relation, strongest first
    const groups = new Map();
    for (const { o, e, out } of links[i]) {
      const key = `${e.k}|${out ? 0 : 1}`; if (!groups.has(key)) groups.set(key, []); groups.get(key).push({ o, w: e.w });
    }
    const keys = [...groups.keys()].sort((a, b) => KIND_ORDER.indexOf(a.split('|')[0]) - KIND_ORDER.indexOf(b.split('|')[0]) || a.split('|')[1] - b.split('|')[1]);
    if (keys.length) {
      sc.append(el('h3', null, `Connections (${links[i].length})`));
      for (const key of keys) {
        const [k, dir] = key.split('|'); const g = el('div', 'conn-group'); g.append(el('h4', null, KIND_LABEL[k]?.[+dir] ?? k));
        const row = el('div', 'conn');
        groups.get(key).sort((a, b) => b.w - a.w || nodes[a.o].tier - nodes[b.o].tier).forEach(({ o }) => row.append(chipFor(o)));
        g.append(row); sc.append(g);
      }
    }
    if (nd.refs?.length) {
      sc.append(el('h3', null, 'Read more')); const ul = el('ul', 'refs');
      nd.refs.forEach((r) => { const li = el('li'); const a = el('a', null, r.label); a.href = r.url; a.target = '_blank'; a.rel = 'noopener noreferrer'; li.append(a); ul.append(li); });
      sc.append(ul);
    }
    panel.append(bar, sc); sc.scrollTop = 0;
    panel.setAttribute('aria-labelledby', 'panel-title');
  }
  function closePanel() { panel.hidden = true; panel.replaceChildren(); }

  // ---------- legend ----------
  const legendList = $('#legend-list'), legend = $('#legend');
  const legendBtns = new Map();
  graph.categories.filter((c) => c.key !== 'root').forEach((c) => {
    const li = el('li'), b = el('button'); b.type = 'button'; b.setAttribute('aria-pressed', 'true'); b.dataset.cat = c.key;
    const dot = el('i', 'legend-dot'); dot.style.setProperty('--c', c.color);
    b.append(dot, el('span', 'lab', c.label), el('span', 'cnt', String(catCount.get(c.key) ?? 0)));
    b.title = `${c.desc}  (click to hide or show; double-click to isolate)`;
    b.addEventListener('click', () => app.toggleCategory(c.key));
    b.addEventListener('dblclick', () => app.isolateCategory(c.key));
    li.append(b); legendList.append(li); legendBtns.set(c.key, b);
  });
  $('#legend-toggle').addEventListener('click', (ev) => { const open = legend.classList.toggle('collapsed') === false; ev.currentTarget.setAttribute('aria-expanded', String(open)); });
  $('#legend-all').addEventListener('click', () => app.showAllCategories());
  if (innerWidth < 860) { legend.classList.add('collapsed'); $('#legend-toggle').setAttribute('aria-expanded', 'false'); }
  function updateLegend() { for (const [k, b] of legendBtns) b.setAttribute('aria-pressed', String(!app.hiddenCats.has(k))); }

  // ---------- timeline ----------
  const yearIn = $('#year'), yearOut = $('#year-out'), marks = $('#marks');
  yearIn.min = String(minYear); yearIn.max = String(maxYear); yearIn.value = String(maxYear); yearOut.textContent = String(maxYear);
  const pos = (y) => `${((y - minYear) / (maxYear - minYear)) * 100}%`;
  [1950, 1970, 1990, 2010, maxYear].filter((y) => y >= minYear).forEach((y) => { const s = el('span', null, String(y)); s.style.left = pos(y); marks.append(s); });
  if (minYear < 1990 && maxYear > 1990) { const f = el('span', 'flag', 'you fall asleep'); f.style.left = pos(1990); marks.append(f); }
  yearIn.addEventListener('input', () => app.setYear(+yearIn.value, { manual: true }));
  $('#play').addEventListener('click', () => app.togglePlay());
  function updateTimeline() { yearIn.value = String(Math.round(app.year)); yearOut.textContent = String(Math.round(app.year)); $('#play').innerHTML = app.playing ? '&#10074;&#10074;' : '&#9654;'; }

  // ---------- layout switch / buttons ----------
  document.querySelectorAll('#controls .seg button').forEach((b) => b.addEventListener('click', () => app.setLayout(b.dataset.layout)));
  function updateLayoutButtons() { document.querySelectorAll('#controls .seg button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.layout === app.layout))); }
  $('#btn-tour').addEventListener('click', () => (app.tourActive ? app.exitTour() : app.startTour()));
  $('#btn-help').addEventListener('click', () => toggleHelp());
  $('#help-x').addEventListener('click', () => toggleHelp(false));
  $('#btn-list').addEventListener('click', () => toggleList());
  const settings = $('#settings');
  $('#btn-settings').addEventListener('click', (ev) => { settings.hidden = !settings.hidden; ev.currentTarget.setAttribute('aria-expanded', String(!settings.hidden)); });
  $('#set-quality').addEventListener('change', (ev) => app.setQuality(ev.target.value));
  $('#set-rotate').addEventListener('change', (ev) => { app.autoRotate = ev.target.checked; });
  $('#set-labels').addEventListener('change', (ev) => app.setLabels(ev.target.checked));
  function toggleHelp(force) { const h = $('#help'); h.hidden = force === undefined ? !h.hidden : !force; if (!h.hidden) h.focus?.(); }

  // ---------- tour card ----------
  const tourcard = $('#tourcard');
  function renderTour(step) {
    const stops = graph.tour, s = stops[step];
    tourcard.hidden = false; tourcard.replaceChildren();
    tourcard.append(el('div', 'step', `STOP ${step + 1} OF ${stops.length}`), el('h3', null, s.title), el('p', null, s.text));
    const row = el('div', 'row'), dots = el('div', 'dots');
    stops.forEach((_, k) => dots.append(el('i', k === step ? 'on' : k < step ? 'done' : '')));
    const prev = el('button', null, 'Back'); prev.disabled = step === 0; prev.addEventListener('click', () => app.tourStep(-1));
    const more = el('button', null, 'Read more'); more.addEventListener('click', () => app.select(idxOf.get(s.node), { fly: false }));
    const next = el('button', 'primary', step === stops.length - 1 ? 'Finish' : 'Next'); next.addEventListener('click', () => (step === stops.length - 1 ? app.exitTour() : app.tourStep(1)));
    const x = el('button', null, 'Exit'); x.addEventListener('click', () => app.exitTour());
    row.append(dots, prev, more, next, x); tourcard.append(row);
  }
  function hideTour() { tourcard.hidden = true; tourcard.replaceChildren(); }

  // ---------- list view ----------
  const listview = $('#listview');
  function toggleList(force) {
    const open = force === undefined ? listview.hidden : force;
    if (!open) { listview.hidden = true; return; }
    listview.hidden = false; listview.replaceChildren();
    const x = el('button', 'x', '×'); x.setAttribute('aria-label', 'Close list'); x.addEventListener('click', () => toggleList(false));
    listview.append(x, el('h2', null, 'All ideas'));
    graph.categories.filter((c) => c.key !== 'root').forEach((c) => {
      const items = nodes.map((n, i) => [n, i]).filter(([n]) => n.cat === c.key).sort((a, b) => a[0].tier - b[0].tier || a[0].year - b[0].year);
      if (!items.length) return;
      const h = el('div', 'cat'); const d = el('i', 'legend-dot'); d.style.setProperty('--c', c.color); h.append(d, document.createTextNode(c.label)); listview.append(h);
      const ul = el('ul');
      items.forEach(([n, i]) => { const li = el('li'), b = el('button'); b.type = 'button'; b.append(el('span', null, n.title), el('span', 'y', String(n.year))); b.title = n.short; b.addEventListener('click', () => { toggleList(false); app.select(i); }); li.append(b); ul.append(li); });
      listview.append(ul);
    });
  }

  // ---------- search ----------
  const q = $('#q'), results = $('#results');
  let hits = [], sel = -1;
  const norm = (s) => s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '');
  const hay = nodes.map((n) => norm(`${n.title} ${n.id} ${(n.tags ?? []).join(' ')}`));
  function score(i, terms) {
    const t = norm(nodes[i].title); let s = 0;
    for (const w of terms) {
      if (t === w) s += 100; else if (t.startsWith(w)) s += 60; else if (t.includes(w)) s += 35; else if (hay[i].includes(w)) s += 18;
      else if (norm(nodes[i].short).includes(w)) s += 6; else return 0;
    }
    return s + (4 - nodes[i].tier) * 3;
  }
  function search(text) {
    const terms = norm(text).split(/\s+/).filter(Boolean); if (!terms.length) return [];
    return nodes.map((_, i) => [score(i, terms), i]).filter(([s]) => s > 0).sort((a, b) => b[0] - a[0]).slice(0, 12).map(([, i]) => i);
  }
  function renderResults() {
    results.replaceChildren(); const text = q.value.trim();
    if (!text) { results.hidden = true; q.setAttribute('aria-expanded', 'false'); return; }
    hits = search(text); sel = hits.length ? 0 : -1;
    if (!hits.length) { const li = el('li', 'empty', `Nothing matches "${text}"`); results.append(li); }
    hits.forEach((i, k) => {
      const li = el('li'); li.setAttribute('role', 'option'); li.setAttribute('aria-selected', String(k === sel)); li.id = `res-${k}`;
      const d = el('i', 'cdot'); d.style.setProperty('--c', cats.get(nodes[i].cat)?.color ?? '#fff');
      li.append(d, el('span', 'rt', nodes[i].title), el('span', 'ry', String(nodes[i].year)));
      li.addEventListener('mousedown', (ev) => { ev.preventDefault(); choose(i); }); results.append(li);
    });
    results.hidden = false; q.setAttribute('aria-expanded', 'true');
  }
  function choose(i) { results.hidden = true; q.value = ''; q.blur(); app.select(i); }
  function moveSel(d) { if (!hits.length) return; sel = (sel + d + hits.length) % hits.length; [...results.children].forEach((li, k) => li.setAttribute('aria-selected', String(k === sel))); results.children[sel]?.scrollIntoView({ block: 'nearest' }); }
  q.addEventListener('input', renderResults);
  q.addEventListener('focus', renderResults);
  q.addEventListener('blur', () => setTimeout(() => { results.hidden = true; q.setAttribute('aria-expanded', 'false'); }, 120));
  q.addEventListener('keydown', (ev) => {
    if (ev.key === 'ArrowDown') { ev.preventDefault(); moveSel(1); } else if (ev.key === 'ArrowUp') { ev.preventDefault(); moveSel(-1); }
    else if (ev.key === 'Enter') { ev.preventDefault(); if (hits[sel] != null) choose(hits[sel]); }
    else if (ev.key === 'Escape') { q.value = ''; results.hidden = true; q.blur(); }
  });

  return { renderPanel, closePanel, updateLegend, updateTimeline, updateLayoutButtons, renderTour, hideTour, toggleHelp, toggleList, search, minYear, maxYear, focusSearch: () => { q.focus(); q.select(); }, links };
}
