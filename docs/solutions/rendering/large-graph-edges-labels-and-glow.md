---
title: Keeping a 3D graph readable and fast as it grows from 77 to 800+ nodes
date: 2026-10-01
category: rendering
tags: [three.js, webgl, instancing, labels, bloom, level-of-detail]
---

## Problem

The viewer was built and tuned against a 77-node seed graph. Three things broke or degraded as the dataset grew toward 800 nodes and 3,900 edges:

- Edges drawn as ordinary line geometry cost too much to update when layouts changed, and thick lines look poor without a custom shader.
- With hundreds of overlapping glows and edges, additive blending summed to white. The map turned into a bright blob and the colours of the categories disappeared.
- A DOM label for every node collided, cost layout time, and stole mouse input from the canvas.

## What worked

**Edges are instanced ribbons evaluated on the GPU.** Each edge is one instance of a small quad strip. The vertex shader reads the two endpoint positions and an effect value (hover, dim, visibility) from float `DataTexture`s with `texelFetch(gl_InstanceID)`, bends the ribbon along a quadratic curve, and turns it to face the camera. Changing layouts only rewrites the position texture, so there is no per-edge JavaScript work. The textures are `TEXW = 1024` texels wide, and the helper that turns an index into a texel coordinate lives in its own shader chunk (`texu`). It must only be included in materials that define `TEXW`; putting it in the shared chunk made every other material fail to compile.

**Brightness scales with density.** Gains shrink as the visible counts grow, so a sparse graph keeps its glow and a dense one stays legible:

- edge gain: `clamp(pow(260 / edgeCount, 0.7), 0.16, 1)`
- halo gain: `clamp(pow(140 / nodeCount, 0.5), 0.3, 1)`
- bloom strength: `0.55 * pow(max(1, nodeCount / 150), -0.2)`, with the bloom threshold at 0.66

Tone mapping is off (`NoToneMapping`). The filmic curves we tried pushed bright nodes to white, which hides the category colour that carries meaning. Chromatic aberration in the final pass stays at 0.006, because larger values fringe the label text.

**Labels are a screen-space layer with a budget.** Each frame the labels are projected, ranked by tier and projected radius, and placed greedily with a grid for collision checks. A node needs a minimum projected radius for its tier before it gets a title (`MIN_RADIUS_PX = [0, 0, 2.2, 4, 6.5]`), and descriptions fade in between 24 and 38 pixels of radius, at most five at a time. One node near the screen centre (within 70 pixels and at least 10 pixels in radius) is always allowed a description and skips collision, so something readable is always there when the user zooms in.

**Labels never take pointer input.** They are `pointer-events: none`. Clicks go to the canvas, which first tries a 3D pick and then a hit test against the placed label rectangles. Before this, labels intercepted drags and the orbit controls felt broken.

## How to apply

- Treat every brightness constant as a function of node and edge count, never as a fixed number tuned on a small sample.
- Test with a synthetic graph several times larger than the real one (`tests/helpers/synthetic.mjs` builds 3,000 nodes) so that scaling mistakes show up before the data does.
- Keep one rule for DOM overlays on a canvas: they display, the canvas decides.
