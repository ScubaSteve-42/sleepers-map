# Core node enrichment task

The 77 "core" nodes were written first, as a seed, before the research notes existed. They are also the map's largest and most-clicked nodes: the root, every category hub, and the main exemplars for compilers, C, Python, SQL, arrays, variables, matrices, linting, package managers, Git and Unix. Their text is thin (about 180 characters of `long`, no code samples, few "for the sleeper" notes, no sources) next to the 760 nodes written later. Your job is to bring your share of them up to the standard of the rest, with every claim checked against the research notes.

## Inputs

- Your slice file in `data/src/` (named in your task prompt). Edit only that file.
- `docs/data-style-guide.md`: field meanings, length limits, style rules. Read it first.
- The research notes in `C:\Users\srbro\OneDrive\Documents\7 - Claude\research_notes\Software engineering history 1945 to 2026\` (the authority; large, so use `Grep` for distinctive words and read around the matches). Your task prompt says which notes matter most. Notes tag claims `[V]` (verified), `[B]` (background knowledge) or `[?]` (unverified).
- The merged dataset `data/graph.json`. Use it to see what the 760 later nodes already say about a topic (for example search for "ESLint" or "Unix"), so your text agrees with them and does not repeat them. Look at a few well-made nodes for tone and density: `lang.c-basics`, `data.drivers`, `plat.kubernetes`, `proc.conways-law`.
- The report `C:\Users\srbro\OneDrive\Documents\7 - Claude\reports\Software engineering history 1945 to 2026.md`, which explains each topic at length.

## What to write for every node in your file

Keep `id`, `title`, `cat`, `tier`, `year`, `yearEnd` and `status` exactly as they are. Keep every edge. Rewrite or add these fields:

- `short`: at most 165 characters. It is shown on the map as you zoom in. Keep the existing one when it is accurate and specific; replace it when it is vague.
- `long`: 450 to 900 characters (hard maximum 920), plain English, no markdown, no em dashes. Say what the thing is, how it works, its defining traits, who made it and when, what it replaced and what replaced it, and why it matters to someone who has been away since about 1990. Use specific dates and names that the notes support. Short paragraphs are allowed (separate them with a blank line).
- `sleeper`: at most 340 characters. What a person who stopped following software in about 1990 would not know or would find surprising about this. Add it to every node that lacks one, unless it would be forced.
- `code`: add `{ "lang": "...", "text": "..." }` where a short example makes the idea concrete, and not otherwise. At most 16 lines. The code must be correct, and any output you state in a comment must be right; work it out by hand. Good candidates: Variable, Array, Pointer, Matrix, NumPy, PyTorch, SQL, Relational Model, Compiler (a C line and the assembly it becomes), Interpreter, Make, Git, npm, pip, ESLint (a rule and a warning), Docker, TypeScript, Garbage Collection, Object-Oriented Programming, Functional Programming. Hubs and organizations normally have no code.
- `refs`: one to three `{ "label": "...", "url": "https://..." }` entries for further reading. Only use URLs that appear in the research notes or that you are certain exist (a language's home page, a standard, a Wikipedia article). No `http:` links.
- `tags`: a few lowercase search words, if useful.

### Hubs and the root

Nodes with tier 0 or 1 are the biggest bubbles. Their `long` text should orient a newcomer: what the category covers, four to six of its key nodes named by their exact titles ("Start with ..."), and what changed since 1990. Look at the nodes the hub is connected to in `data/graph.json` and name real ones.

### Accuracy rules

- Every date, number, name and quotation must be supported by a note, or be certain and widely known. When a note marks a claim `[?]`, or notes disagree, hedge it ("about", "reported", "sources differ") or leave it out.
- Vendor and advocate claims must be attributed to the vendor or advocate.
- Do not state apocryphal stories as fact (for example, that Hopper found the first bug, or that Royce coined "waterfall").
- Do not add facts the notes do not support. Do not contradict what the later nodes say; if you find a later node that is wrong, note it in your log and do not edit it.

## Mechanics

- Edit the JSON safely: write a small Node script that parses the file, sets fields by node id, and writes it back with `JSON.stringify(data, null, 1)` and a trailing newline. Work in batches of about ten nodes so a failure loses little.
- After each batch run `node scripts/check-slice.mjs data/src/<file>.json`. It must report 0 errors (warnings about nodes not in the registry are expected for this file).
- Do not run the merge, the build or the tests, and do not touch other files except your log.
- Write a log to `.tmp/factcheck/<name>.md`: for each node, one line saying what you changed and which note supports the key claims, and a list of doubts and of problems you noticed in other nodes.
- Your final message is at most 200 words: nodes finished, nodes not reached, doubts, and the log path.
