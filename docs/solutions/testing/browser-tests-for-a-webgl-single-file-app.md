---
title: Testing a WebGL single-file app with playwright-core and Microsoft Edge
date: 2026-10-01
category: testing
tags: [playwright, edge, webgl, swiftshader, test-hooks]
---

## Problem

The deliverable is one HTML file that draws a 3D scene. A normal DOM test cannot tell whether the canvas rendered, whether labels collide, or whether a click lands on a node. The machine has Microsoft Edge but no Chrome and no Python.

## What worked

**Drive Edge directly.** `playwright-core` launches the installed browser through `executablePath` (`tests/helpers/browser.mjs`), so no browser download is needed. The suite opens the built file over `file://`, which also proves the page needs no server.

**Use the real GPU by default and keep a software fallback.** Launch with `--ignore-gpu-blocklist`. Set `SMAP_SOFTWARE_GL=1` to add `--use-angle=swiftshader --enable-unsafe-swiftshader`, which checks that the app still renders and stays above 20 fps without a GPU.

**Add a test hook, only when asked for.** Opening the page with `?test` exposes `window.__mapTest` with state, camera control, selection, search, layout and time controls, screen-position helpers, and an fps sampler. Tests read state and drive the camera instead of guessing pixel positions. The app sets `document.body.dataset.ready = '1'` when the first frame is drawn, and the helpers wait for that.

**Check the things users see, not only the DOM:**

- the canvas is not blank (decode a screenshot with `pngjs` and count non-background pixels)
- every hub title is visible at overview and up close, label rectangles do not overlap, and a description appears after flying to a node
- clicking a node, clicking a label, and dragging across a label all behave correctly
- zero console errors, page errors and failed requests, and no request leaves the file (the map must work offline)
- a phone viewport has no horizontal overflow
- with WebGL blocked by an `initScript`, the text-list fallback appears (the test must remove WebGL for real, otherwise it passes without testing anything)
- a synthetic 3,000-node graph still builds and renders

**Read the screenshots.** The suite saves nine screenshots to `screenshots/`. Open them as images after any visual change. Several design problems (white-out glow, label crowding) were obvious in a picture and invisible to assertions.

## How to apply

- Keep tests serial (`--test-concurrency=1`). Parallel Edge instances compete for the GPU and make fps readings meaningless.
- Wait on an app-defined condition (`flying`, `layoutMoving`, `intro` all false) instead of sleeping.
- When a test fails only on the real GPU or only on SwiftShader, run the other mode before changing code. The difference usually points at a shader precision or timing assumption.
