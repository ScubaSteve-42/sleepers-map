# Task: build the node registry

You are building the registry for "The Sleeper's Map": the complete list of nodes (id, title, category, tier, year) that the slice authors will later write full text and edges for. Getting the list right matters more than anything else downstream: authors cannot link to a node that is not in the registry, and the map can only teach what the registry names.

## Read first

1. `docs/data-style-guide.md` (tiers, ids, categories, edge conventions).
2. `data/categories.json` and `data/src/core.json` (77 nodes that already exist and keep their ids and tiers).
3. The `## Graph hints` section at the end of every research note in `../research_notes/Software engineering history 1945 to 2026/` (files `01_` to `12_`; read `_shared_brief.md` for the notes' format). Each hint line is `name | category | year | tier | related entities`. Open the body of a note whenever a hint is ambiguous or you need to confirm a year.

## Produce

`data/src/registry.json`:

```json
{
  "slices": [ { "name": "s01-foundations-compilers", "cats": ["foundations", "compilers"], "notes": ["01", "02"] } ],
  "nodes": [ { "id": "lang.go", "title": "Go", "cat": "languages", "tier": 2, "year": 2009, "slice": "s03-languages-modern", "from": ["02", "03"] } ]
}
```

and `data/required-topics.json`, a map from each required topic to the ids that cover it (these ids must exist in the registry or in `core.json`). The topics are: `compiler`, `assembly`, `c-basics`, `c-vs-cpp`, `databases`, `arrays`, `variables`, `linting-types` (one node per kind of linter or analyzer), `matrix`, `python-packages` (at least the 15 most important), `package-managers` (at least 10), `popular-now`, `what-worked`, `what-failed`, `companies` (at least 20), `people` (at least 25), `languages` (at least 40), `version-control`, `testing`, `ai-assisted-coding`.

## Rules

- Keep every node in `core.json`: do not repeat them in `registry.json`, but you may refer to their ids in `required-topics.json`.
- Aim for 600 to 800 new nodes in total (about 700 to 900 with core). Prefer important things covered well over obscure things covered thinly. Merge synonyms and duplicates across notes into one node with one id.
- Use the tier targets in the style guide. Every category needs at least one tier-1 hub (core already has most; add the missing cross-cutting hubs such as Operating System, Database, Testing, and so on if they are not in core).
- Give every node an integer `year`. If the notes disagree, pick the best-supported year and list the disagreement in `from` as a note id plus a short comment string, for example `"03 (year disputed: 1994 vs 1995)"`.
- Assign each node to exactly one slice. Use these twelve slices (the category lists say which categories each slice owns; split a category across slices only where shown):
  `s01-foundations-compilers` (foundations, compilers), `s02-languages-systems-legacy` (languages: assembly-era, FORTRAN, COBOL, ALGOL, Pascal, Ada, C family, systems languages, legacy), `s03-languages-modern` (languages: application, scripting, functional, scientific, mobile, plus language-design ideas filed under languages), `s04-concepts` (concepts), `s05-data` (data), `s06-math-ai` (mathai), `s07-tooling-packages` (tooling, packages), `s08-quality` (quality), `s09-process-failures` (process, failures), `s10-orgs-people` (orgs, people), `s11-platforms` (platforms), `s12-modern-era` (modern).
- Ids: `prefix.slug`, lowercase letters, digits and hyphens, exactly one dot, unique across registry and core.
- Include every important entity in the hints for the user-named topics (see the required topics above), including what has been proven NOT to work and the companies, people and Python packages the user asked about.

## Check your work

Write a small Node script in `.tmp/` (do not commit it) that loads the registry and core, then verifies: ids unique and well-formed, categories exist, tiers 1 to 4, integer years between 1800 and 2026, every `required-topics` id exists, slice names are among the twelve, and prints counts per slice, per category and per tier. Fix problems until it is clean, and report the counts in your final message.
