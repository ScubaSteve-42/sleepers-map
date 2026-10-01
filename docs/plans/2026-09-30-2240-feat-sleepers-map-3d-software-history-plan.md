---
title: "The Sleeper's Map - Plan"
type: feat
date: 2026-09-30
artifact_contract: ce-unified-plan/v1
product_contract_source: ce-plan-bootstrap
execution: code
status: completed
---

# The Sleeper's Map - Plan

## Goal Capsule

- **Objective:** Someone who stopped following software 30 to 40 years ago can open one HTML file, offline, and explore an interactive 3D map of how software engineering got from machine code to AI-assisted coding. They come away knowing the vocabulary, the landmark technologies and companies, what worked and what failed, and the file is proven working by automated tests.
- **Means:** A three.js scene bundled with esbuild into one inline HTML file, fed by a research-derived graph dataset (KTD1, KTD2, KTD5).
- **Authority:** The settled decisions under Key Decisions, then the requirements, then the KTDs, then the units.
- **Stop conditions:** Stop and report if the research notes cannot be produced, if the dataset cannot reach the strict validation bar with accurate content, or if a browser test cannot be made to pass without weakening what it proves.
- **Execution profile:** The executor implements and verifies locally. The project folder has a local git repo and no remote, so nothing is pushed.

---

## Product Contract

### Summary

Ship `Software Engineering Map.html`: a self-contained 3D knowledge graph of several hundred weighted, typed connections between ideas, languages, tools, companies, people and failures. Titles float above nodes, descriptions appear as the camera approaches, important ideas are larger, and brighter or shorter links mean closer relevance. A research report, the dataset, the source, tests and screenshots ship alongside.

### Problem Frame

The user asked for a deep research pass on the history of software engineering framed as catching up after decades asleep, then asked to see it as the most striking interactive 3D map possible. A written report alone loses the connections between ideas, which are the point: C led to C++, Unix to Linux, SCCS to Git, CASE tools to nothing. A map shows those connections, and zoom-dependent labels let the same view serve both overview and detail.

### Requirements

**Content and data**

- R1. The map covers every topic the user named: terms and definitions; notable languages with defining traits, syntax and structure; notable companies; what a compiler is; C basics and C versus C++; working with databases, arrays and variables; the types of linting; what a matrix is; important Python packages; package managers; what is popular now; what has worked; what has been proven not to work.
- R2. Every node has a title, category, importance tier, year, a short description of at most 190 characters that appears on zoom, and a longer description for the detail panel. Nodes add a "for the sleeper" note and a code sample where they help.
- R3. Edges carry a relevance weight (1 to 3) and a relation kind. No node is isolated, the graph is one connected component, and each hub has at least eight connections.
- R4. Node count has no cap. The release dataset has at least 500 nodes and 1,500 edges, and quality is never traded for count.
- R5. Content is drawn from the deep-research notes and report, and node text is accurate, plain English.

**Visualization**

- R6. The scene is interactive 3D with orbit, pan and zoom toward the pointer. Node size follows tier, so top-level ideas are largest.
- R7. A title label sits above every node. Which titles are visible depends on zoom, tier and available space, and zooming toward any node always shows its title.
- R8. A description fades in as a node's on-screen size grows, with at most five at once.
- R9. Edge brightness and width follow relevance, edges are colored by the categories they join, and hovering a node lights its neighborhood and dims the rest.
- R10. The look is striking: deep-space backdrop, glowing nodes, curved luminous edges with traveling pulses, bloom, territory clouds, and a cinematic opening.

**Interaction and accessibility**

- R11. Clicking a node flies the camera to it and opens a panel with the long text, year, category, sleeper note, code, grouped connections that navigate, and back and forward history.
- R12. Search, category filters, a year scrubber with history replay, three layouts (relevance, chronological, spiral), a guided tour, keyboard shortcuts, help and deep links are available.
- R13. The page works on a phone-width screen, respects reduced motion, is keyboard operable, and falls back to a readable list when WebGL is unavailable.

**Delivery**

- R14. The deliverable is one HTML file that works from `file://` with no network requests, built by a script.
- R15. A single `npm test` validates the data, checks the layouts, and drives the built file in a real browser, including screenshots.
- R16. Performance holds 60 frames per second on a discrete GPU with the full dataset and stays usable on software rendering.

### Key Decisions

- Deliver an interactive 3D map in an HTML file. (session-settled: user-directed — chosen over a report-only or static 2D diagram: the user asked to see this as an interactive 3D map in HTML.) Governs R6, R12, R14.
- No cap on node count. (session-settled: user-directed — chosen over a curated 50 to 100 node cap: the user said there is no limit on the number of points.) Governs R4.
- A title above every node and a description that appears as the camera zooms in. (session-settled: user-directed — chosen over always-visible full text or hover-only tooltips: the user asked for titles above nodes and descriptions as zoom increases.) Governs R7, R8.
- Edges express relevance and node size expresses importance. (session-settled: user-directed — chosen over uniform nodes with unweighted links: the user asked to connect by relevance and enlarge top-level ideas.) Governs R3, R6, R9.
- Content comes from the deep-research run. (session-settled: user-directed — chosen over authoring from memory alone: the first instruction was to deep-research the topic.) Governs R1, R5.
- Done means a tested, working HTML file plus other artifacts. (session-settled: user-directed — chosen over an untested or look-only deliverable: the user's stated goal.) Governs R14, R15.
- The visual bar is the most striking design achievable. (session-settled: user-directed — chosen over plain or default styling: explicit request.) Governs R10.

### Success Criteria

- The built file opens from disk in Microsoft Edge with zero console errors and zero network requests, and every automated test passes.
- Reading the screenshots, a person sees legible titles at overview, descriptions on zoom, and a polished, coherent visual design.
- The strict data validation passes with the release dataset, and every topic in R1 resolves to named nodes.

### Scope Boundaries

- No server, accounts, analytics or runtime network use.
- Not a graph editor and not a tutorial platform; each node teaches briefly and points onward.
- No WebGPU path; WebGL 2 is required, with the list fallback.

#### Deferred to Follow-Up Work

- Publishing the file as a hosted web page.
- Link-liveness checking for the optional reference links.
- A VR or audio mode, and languages other than English.

---

## Planning Contract

### Key Technical Decisions

- KTD1. Use three.js `WebGLRenderer` rather than WebGPU or a graph wrapper library. It is stable in headless and software rendering, supports custom shaders and the EffectComposer bloom path, and gives full control of the look.
- KTD2. Bundle with esbuild into one IIFE and inline CSS, data, fonts (base64) and script into a template. The file then works offline and from `file://`, which a CDN import map would not.
- KTD3. Render nodes and halos as instanced geometry, edges as GPU-evaluated quadratic curves expanded into camera-facing ribbons, with node positions held in a float texture the CPU rewrites each frame. Layout transitions and filters then cost nothing extra per edge, and thousands of nodes stay fast.
- KTD4. Compute all three layouts at build time in Node with `d3-force-3d`, seeded for determinism, and ship the positions in the data. Loading is instant, the layouts are testable without a browser, and the browser only interpolates.
- KTD5. Author the dataset registry-first: a skeleton of ids, tiers and years from the research notes, then parallel authors per category slice writing text and edges against that registry, then merge, validate and fact-check. Edges cannot dangle and ids stay consistent.
- KTD6. Draw labels in a DOM layer projected each frame, ranked by tier and on-screen size, with greedy collision rejection and a gaze rule that guarantees the node under the camera shows its title. DOM text stays crisp and styleable.
- KTD7. Pick nodes by screen-space proximity over projected positions instead of raycasting, which is simpler and exact for instanced spheres.
- KTD8. Test with `node:test` and `playwright-core` driving the installed Edge, using a `?test` hook that exposes state and camera control. No test framework dependency is needed.
- KTD9. Edge kinds read "source kind target" (for example C evolved-into C++, Git created-by Torvalds, a member part-of its hub). The validator enforces what it can.
- KTD10. Bake-off not used: the choices above are settled by evidence from prototypes already running, and reversing them would not strand later work.

### High-Level Technical Design

```mermaid
flowchart TB
  N[Research notes and report] --> R[Registry: ids, tiers, years]
  R --> A[Parallel authors per slice]
  A --> M[merge-data: graph.json]
  M --> V[validate-data]
  V --> L[layouts: constellation, timeline, galaxy]
  L --> B[build: esbuild plus inline template]
  B --> H[Software Engineering Map.html]
  H --> T[Edge tests and screenshots]
```

```mermaid
flowchart TB
  D[Embedded graph JSON] --> S[Scene: instanced nodes, edge ribbons, backdrop, bloom]
  D --> LB[Label layer: tier, size, collisions]
  D --> UI[Panel, search, legend, timeline, tour]
  UI --> APP[App state: selection, filter, year, layout]
  APP --> S
  S --> PICK[Screen-space picking]
  PICK --> APP
  S --> LB
```

### Assumptions

- The release dataset lands between 500 and 900 nodes across 15 categories.
- Maximum fidelity on a discrete GPU; phones get the same scene with the quality governor lowering resolution and effects.
- Source links are optional and only checked for shape, not liveness.

### Risks and Dependencies

- Research or authoring fails partway: notes are written to disk early so progress survives interruptions.
- Factual errors in generated node text: a dedicated fact-check pass reads each node against the notes before release.
- Software rendering is slow: tests use relaxed frame-rate floors on SwiftShader and strict ones on a real GPU.
- Hub labels crowding dense clusters: the declutter and the gaze rule keep the focus readable.

---

## Implementation Units

| U-ID | Title | Key files | Depends on |
|---|---|---|---|
| U1 | Toolchain and smoke proof | `package.json`, `tests/helpers/browser.mjs` | none |
| U2 | Data schema, merge and validator | `scripts/merge-data.mjs`, `scripts/validate-data.mjs`, `data/` | U1 |
| U3 | Layout computation | `scripts/layouts.mjs`, `tests/layout.test.mjs` | U2 |
| U4 | Renderer core | `src/scene.js`, `src/shaders.js` | U1 |
| U5 | Labels, picking and level of detail | `src/labels.js` | U4 |
| U6 | UI shell and app state | `src/ui.js`, `src/main.js`, `src/styles.css`, `src/template.html` | U4, U5 |
| U7 | Build pipeline | `scripts/build.mjs` | U2, U3, U6 |
| U8 | End-to-end tests and screenshots | `tests/e2e.test.mjs`, `screenshots/` | U7 |
| U9 | Research notes and report | `research_notes/`, `reports/` (parent folder) | none |
| U10 | Dataset authoring | `data/src/*.json`, `data/tour.json` | U2, U9 |
| U11 | Release hardening and docs | `README.md`, strict validation in `npm test` | U8, U10 |

### U1. Toolchain and smoke proof

- **Goal:** Prove a three.js bundle runs from `file://` in headless Edge with WebGL 2 before building anything on it.
- **Requirements:** R14, R15
- **Files:** `package.json`, `tests/helpers/browser.mjs`
- **Approach:**
  1. Install three, d3-force-3d, esbuild, playwright-core, pngjs and the three font packages.
  2. Keep `node_modules` outside OneDrive through a junction.
  3. Launch Edge by executable path, report the GL renderer, screenshot a bloom test scene.
- **Execution note:** Smoke-first; no application code until the browser path works.
- **Test scenarios:**
  - Real GPU: the renderer string names the discrete GPU and WebGL 2 is true.
  - Software fallback: with the SwiftShader flags the same page renders.
- **Verification:** The smoke script prints a WebGL 2 renderer and writes a non-blank screenshot.

### U2. Data schema, merge and validator

- **Goal:** One merged `data/graph.json` that is validated on every build.
- **Requirements:** R2, R3, R4, R5
- **Files:** `scripts/merge-data.mjs`, `scripts/validate-data.mjs`, `data/categories.json`, `data/src/core.json`, `data/tour.json`, `tests/data.test.mjs`
- **Approach:**
  1. Slices in `data/src/` hold nodes and edges; the merge dedupes edges by unordered pair and keeps the strongest.
  2. The validator checks ids, categories, tiers, years, text lengths, edge ends, weights, kinds, direction rules, connectivity from the root, hub degree, and, with `--strict`, size and coverage bars.
- **Test scenarios:**
  - A minimal good graph passes.
  - Dangling edges, self loops, bad weights, duplicate ids, unknown categories, out-of-range years, overlong text and isolated nodes each produce an error.
  - A `created-by` edge to a non-person, non-organization is rejected.
- **Verification:** `npm run validate` passes on the merged data; the validator tests pass.

### U3. Layout computation

- **Goal:** Three deterministic, collision-free layouts.
- **Requirements:** R6, R12, R16
- **Files:** `scripts/layouts.mjs`, `tests/layout.test.mjs`
- **Approach:** Constellation is a force simulation with category anchors and hubs pulled inward. Timeline fixes x by a year and rank blend with a lane per category. Galaxy places category arms with older ideas near the core.
- **Test scenarios:**
  - Every coordinate is finite and the output is identical across runs.
  - No two node surfaces overlap by more than 1.5 units.
  - Older ideas sit left of newer ones on the timeline in at least 93 percent of sampled pairs.
  - Strong links are shorter than random pairs in the constellation.
- **Verification:** `npm run test:data` passes.

### U4. Renderer core

- **Goal:** The stunning scene at 60 frames per second.
- **Requirements:** R6, R9, R10, R16
- **Files:** `src/scene.js`, `src/shaders.js`
- **Approach:**
  1. Instanced orb nodes with fresnel shading and glow halos, orbit rings on hubs.
  2. Edge ribbons evaluated on the GPU from a position texture, with category gradients, relevance-driven width and traveling pulses.
  3. Nebula backdrop, stars, dust, category clouds, bloom, vignette and grain.
  4. Intro, camera flights, layout transitions, hover and selection emphasis, and a frame-time governor.
- **Execution note:** Iterate by building, screenshotting and reading the images.
- **Test scenarios:**
  - The canvas is non-blank with the full dataset.
  - Hover emphasizes neighbors and dims unrelated nodes.
  - A 3,000-node synthetic graph loads and stays above the frame-rate floor.
- **Verification:** The e2e rendering and scale tests pass; screenshots read as polished.

### U5. Labels, picking and level of detail

- **Goal:** Titles above nodes, descriptions on zoom, no overlaps.
- **Requirements:** R7, R8
- **Files:** `src/labels.js`
- **Approach:** Rank by tier and on-screen radius, reject colliding labels with a grid, expand at most five descriptions as radius grows, and force the label of the node nearest the screen center.
- **Test scenarios:**
  - Overview shows hub titles and no descriptions.
  - Zooming to a node shows its description and text matches the data.
  - Every hub and a sample of all nodes shows its title when zoomed up to it.
  - No two visible label boxes overlap by more than 3 pixels.
- **Verification:** The label tests pass.

### U6. UI shell and app state

- **Goal:** Panel, search, legend, timeline, layouts, tour, help, list view, settings, deep links, keyboard.
- **Requirements:** R11, R12, R13
- **Files:** `src/ui.js`, `src/main.js`, `src/styles.css`, `src/template.html`
- **Approach:** Vanilla DOM and CSS with a glass look and embedded fonts. Selection reveals hidden nodes. Back and forward walk a history. The tour card and timeline replay drive the scene through the same app state.
- **Test scenarios:**
  - Search ranks title matches first and Enter selects.
  - Legend toggles hide and restore categories and their labels.
  - Scrubbing to 1980 shows exactly the nodes dated 1980 or earlier.
  - Tour steps move the camera; Escape exits.
  - Deep link `#n=lang.c&l=timeline` restores node and layout.
  - Phone width has no horizontal overflow and the panel is a bottom sheet.
  - Without WebGL the list view shows every node.
- **Verification:** The UI tests pass.

### U7. Build pipeline

- **Goal:** One command builds the offline file.
- **Requirements:** R14
- **Files:** `scripts/build.mjs`
- **Approach:** Merge, validate, compute layouts, bundle, inline fonts and data (escaping script terminators), write `dist/` and a root copy, and fail if the template references external resources.
- **Test scenarios:** A page load records only `file`, `data` and `blob` requests.
- **Verification:** `npm run build` writes the file; its size stays under 8 MB.

### U8. End-to-end tests and screenshots

- **Goal:** Prove the file works and capture the README images.
- **Requirements:** R15
- **Files:** `tests/e2e.test.mjs`, `tests/helpers/`, `screenshots/`
- **Approach:** One Edge instance, one page per test, a test hook for state, and pixel analysis of screenshots.
- **Verification:** `npm test` is green.

### U9. Research notes and report

- **Goal:** Accurate, sourced research for the content.
- **Requirements:** R1, R5
- **Files:** `research_notes/Software engineering history 1945 to 2026/` and `reports/Software engineering history 1945 to 2026.md` in the parent folder.
- **Approach:** Twelve topic researchers in small batches, each writing notes early and ending with graph hints, then one report writer.
- **Verification:** Twelve note files and one report exist.

### U10. Dataset authoring

- **Goal:** The release dataset.
- **Requirements:** R1 to R5
- **Files:** `data/src/*.json`, `data/tour.json`, `data/required-topics.json`
- **Approach:** Build a registry from the notes' graph hints, author each category slice against it, merge, validate strictly, link across slices, and fact-check text and years against the notes.
- **Test scenarios:** `required-topics.json` resolves for every R1 topic; strict validation passes.
- **Verification:** `npm run validate:strict` passes.

### U11. Release hardening and docs

- **Goal:** Final build, strict test run, README.
- **Requirements:** R4, R14, R15
- **Files:** `README.md`, `package.json`
- **Approach:** Enable strict validation in `npm test`, run the whole suite on the real GPU and on software rendering, review every screenshot, write the README, clean up scratch files.
- **Verification:** All tests pass in both modes.

---

## Verification Contract

| Command | Proves | Applies to |
|---|---|---|
| `npm run validate:strict` | Release data bars: size, coverage, connectivity, hubs | U2, U10 |
| `npm run test:data` | Validator behavior and layout quality | U2, U3 |
| `npm run build` | The offline HTML builds and contains no external resource references | U7 |
| `npm test` | Everything above plus the browser suite and screenshots | all |
| `SMAP_SOFTWARE_GL=1 npm run test:e2e` | The suite also passes on software rendering | U4, U8 |

Screenshots in `screenshots/` are read and judged against R6 to R10 before release.

## Definition of Done

- All commands in the Verification Contract pass.
- The dataset passes strict validation and its facts were checked against the research notes.
- Screenshots show legible titles at overview, descriptions on zoom, no label collisions, and a coherent polished design on desktop and phone.
- README, dataset, source, tests and screenshots are present, and abandoned experiment code and scratch folders are removed.

---

## Outcome

Completed on 2026-10-01. Every command in the Verification Contract passes, on the real GPU and on software rendering.

**Delivered**

- `Software Engineering Map.html`: one offline file of about 2.3 MB with 841 ideas, 4,151 weighted connections, 17 tour stops and 18 starter questions.
- The research notes (12 files) and the 31,000-word report in the parent folder, the dataset (`data/`), the source, the tests (44 on the GPU), nine README screenshots plus one for the starter questions, the README, the data style guide, the authoring task files and three learning notes in `docs/solutions/`.

**Verification results**

- `npm test` (strict data validation, build, data, layout and browser tests): all pass. The full map holds about 150 frames per second on a Radeon RX 7800 XT, and a generated 3,000-node graph about the same.
- `SMAP_SOFTWARE_GL=1 npm run test:e2e`: all pass. The page detects a software renderer and starts on the low preset at reduced resolution, which gives about 9 frames per second; the first software run at full quality managed 1.3.
- `node scripts/check-links.mjs`: 912 unique links, 870 answered, 42 refused automated requests, none dead.

**Where the work differed from the plan**

- A starter-question list (opened from the empty search box) was added, because the user's original request was a list of questions and a newcomer needs a way into the map from them.
- The 77 seed nodes were rewritten late, after an inventory showed they were far thinner than the 764 authored ones.
- The run was interrupted several times by account usage limits. The research and authoring were therefore done in small batches with notes saved early, and the heavier ceremony steps of the delivery workflow (a multi-agent plan review and a full multi-reviewer code review) were replaced by a single read-only code-review agent, seven fact-check agents and the automated tests. The code review found 14 issues; all were fixed, and covered by tests where practical.
- The plan said software rendering would be usable at more than 20 frames per second. Software rendering is limited by pixel fill, so the page lowers its own resolution instead, and the floor in the tests is 5 frames per second.

**Known limits**

- Facts dated 2026 were read through summarizing tools. The text labels them as reported where the sources were secondary, but they may have moved on.
- The tests drive Microsoft Edge only. Firefox and Safari should work (the page uses WebGL 2 and no browser-specific features) but were not run.
- Python and most compilers were not installed on the build machine, so many code samples were checked by hand against the notes rather than executed.
