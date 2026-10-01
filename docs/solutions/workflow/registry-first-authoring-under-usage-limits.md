---
title: Authoring a 800-node dataset with parallel agents under account usage limits
date: 2026-10-01
category: workflow
tags: [subagents, data-authoring, rate-limits, validation, onedrive]
---

## Problem

The map needs several hundred nodes and well over a thousand edges, written from twelve research notes. Two things went wrong at first:

- A fan-out of 14 agents in one message all failed with HTTP 429 session-limit errors and left no output. Later limit hits killed individual researchers and authors part-way through.
- Authors working in parallel wrote edges to ids that did not exist yet, wrote the same pair twice with different kinds, and in one case overwrote another author's scratch file.

## What worked

**Registry first.** One agent turned the notes' Graph hints into `data/src/registry.json`: every id, title, category, tier and year, split into slices. Authors then wrote text and edges against that fixed list, so ids could not drift and the validator could flag a dangling edge immediately.

**Small batches and write-early rules.** At most four or five agents ran at once. Each got a shared brief, a hard tool-call budget, its own work folder under `.tmp/`, and the instruction to save partial output as soon as it existed. When a limit hit, the notes on disk survived and a relaunched agent could resume from them.

**A checker for every slice.** `scripts/check-slice.mjs <file>` compares a slice to the registry (missing or extra ids, length limits, markdown or em dashes, edge direction) and reports errors and warnings. An agent is not finished until it passes. This caught most problems before the merge.

**Merge rules that tolerate overlap.** `scripts/merge-data.mjs` keeps one edge per unordered pair and the strongest weight, skips `registry.json`, and reads `z-*` files last. Authors may therefore add a stronger or more precise edge between slices without coordinating. `scripts/suggest-links.mjs` then adds structural `part-of` edges for nodes that are still thin.

**When an agent stalls or is stopped, write the slice by hand.** The people slice was small enough (60 nodes) to write directly from the notes in three part files plus one assembler that checks ids against the registry. That was faster than relaunching a large agent against the same limit.

## Pitfalls to avoid

- Do not let npm install into a OneDrive folder. It replaced the `node_modules` junction with a real directory of tens of thousands of files. Keep `node_modules` in a local tooling directory and junction it in; check it is still a junction after any `npm install`.
- Do not share a scratch path between agents. Give each a work folder named for its slice.
- Write JSON from scripts that assemble part files, not by hand. A stray quote in 700 characters of prose breaks the whole file.
- Make the edge direction convention explicit in the brief ("source kind target", for example `lang.c created-by ppl.ritchie`). The seed file had `part-of`, `implements` and `created-by` edges written backwards in several places, and the validator now checks direction as well.
