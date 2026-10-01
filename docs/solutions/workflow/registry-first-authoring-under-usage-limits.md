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

**Fact-check in a second pass, by slice, against the notes.** Seven checkers (one per slice group) each compared every claim in their files with the research notes, using `docs/authoring/factcheck-task.md`. They changed about 130 of 760 nodes. The recurring problems were:

- A vendor's own figure written as plain fact (speed-ups, adoption counts, productivity numbers). The fix is to attribute it ("the vendor says").
- "First" and "introduced" claims that the sources dispute.
- Present-tense statements about 2026 that the notes only report (valuations, pending deals, CEO changes).
- Round numbers that did not match the cited paper.
- Universal negatives such as "no controlled study exists".

Checkers were told never to change ids, titles, tiers, years or edges, and to list those problems for the coordinator instead. That kept parallel edits from colliding, and the proposed changes (a handful of years, statuses and edge kinds) were applied afterwards in one script.

**Re-audit the seed nodes with the same bar.** The 77 nodes written before the research existed (the root, every hub, the main language and tool exemplars) averaged about 180 characters of text with no code samples or sources, while the later nodes averaged 700. They were also the biggest and most-clicked nodes on the map. A final inventory of text length per node, by tier, found the gap; the seed nodes were then rewritten from the notes in two parallel slices.

## Pitfalls to avoid

- Do not round-trip UTF-8 data files through Windows PowerShell 5.1 (`Get-Content` then `WriteAllLines`, or `Set-Content` without `-Encoding utf8`). It decodes as ANSI and writes back mojibake: "Plankalkül" became "PlankalkÃ¼l" in one node. Scan the merged text for unexpected non-ASCII characters before a release.
- Keep the scripts that read other slices (`check-slice.mjs`) free of hard-coded file names. Splitting `core.json` into two files broke the checker for every other author until it was changed to read all slices.

- Do not let npm install into a OneDrive folder. It replaced the `node_modules` junction with a real directory of tens of thousands of files. Keep `node_modules` in a local tooling directory and junction it in; check it is still a junction after any `npm install`.
- Do not share a scratch path between agents. Give each a work folder named for its slice.
- Write JSON from scripts that assemble part files, not by hand. A stray quote in 700 characters of prose breaks the whole file.
- Make the edge direction convention explicit in the brief ("source kind target", for example `lang.c created-by ppl.ritchie`). The seed file had `part-of`, `implements` and `created-by` edges written backwards in several places, and the validator now checks direction as well.
