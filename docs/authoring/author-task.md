# Task: write one slice of the map

You are an author for "The Sleeper's Map", an interactive 3D map of the history of software engineering for a reader who has been away from software for 30 to 40 years. You will write the full text and the edges for the nodes in one slice of the registry.

## Read first

1. `docs/data-style-guide.md`: field rules, tiers, edge kinds and directions, voice. Follow it exactly.
2. `data/src/core.json`: the exemplar entries (and 77 nodes that already exist; you may link to them).
3. `data/src/registry.json`: find the nodes whose `slice` is yours. Also skim the full list of ids and titles so you can link to nodes in other slices.
4. The research notes named for your slice in `../research_notes/Software engineering history 1945 to 2026/`. These are your sources. They are long and carefully sourced; search them (with Grep) for each entity rather than relying on memory. Use `_shared_brief.md` to understand their layout.

## Write

`data/src/<slice name>.json`:

```json
{ "slice": "s03-languages-modern", "nodes": [ ... ], "edges": [ ... ] }
```

- One node object for every registry row in your slice, with the same `id`, `title`, `cat`, `tier` and `year` as the registry (add `yearEnd` and `status` where they apply). Write `short`, `long`, and, where the style guide says so, `sleeper`, `code`, `tags` and `refs`.
- Facts come from the notes. If the notes do not support a claim, leave it out. If the notes call something contested, say so briefly or omit it. Dates, names and numbers must match the notes. Take `refs` URLs only from the notes.
- Edges: write the edges whose source is a node in your slice. Target any id in the registry or core. Follow the direction conventions in the style guide. Give every node at least two edges, hubs at least fifteen, and link across categories wherever there is a real relationship (the company, the person, the tool, the practice it replaced). Use weight 3 sparingly, for definitional or direct-lineage links.
- Voice: plain, concrete English for a smart newcomer. No hype, no filler, no rhetorical questions. Vary sentence openings. Do not write in a terse or telegraphic style. Include a `sleeper` note on roughly 40 percent of nodes, only where it adds real information about what changed since about 1990.
- If a registry row cannot be supported by the notes, omit the node and list it in your report. If the notes clearly cover an important entity that is missing from the registry, you may add up to 5 percent extra nodes to your slice with unique new ids; list them in your report.

## Check your work

Run `node scripts/validate-data.mjs` after creating a temporary merge: `node scripts/merge-data.mjs` writes `data/graph.json` from every slice in `data/src/` (other slices may not exist yet, so unknown-target errors for edges pointing at them are expected until the end; fix every other error and warning that mentions your slice). Check lengths: `short` at most 165 characters, `long` 280 to 900 characters, `title` at most 46. Make sure the JSON parses.

## Report

End with a short report: node and edge counts, nodes omitted and why, nodes added, facts you could not verify from the notes, and any disagreement between notes.
