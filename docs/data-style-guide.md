# Data style guide for the map

This guide is for anyone writing nodes and edges for "The Sleeper's Map": the registry builder, the slice authors, the linker and the fact-checkers. The exemplar is `data/src/core.json`; read a few entries before writing. The validator (`npm run validate`, and `--strict` for release) enforces what can be checked mechanically.

## Reader and voice

The reader is a smart adult who stopped following software 30 to 40 years ago. They know what a computer is and may remember mainframes, BASIC, Pascal, COBOL, DOS, early Macs and floppy disks. They do not know Git, package managers, the cloud, containers, the modern web, or why Python, JavaScript and Rust matter.

- Write plain, concrete English. Say what the thing is, who made it, when, and why it mattered. Define jargon at first use inside the text.
- No hype words ("revolutionary", "game-changing", "powerful", "seamless"), no filler, no rhetorical questions. Prefer a fact to an adjective.
- Use the present tense for things that exist, the past tense for history. Say "still" and "now" only when you verified the current state.
- Never invent facts. Draw from the research notes in `../research_notes/Software engineering history 1945 to 2026/` and the report in `../reports/`. If a claim is contested or apocryphal, either leave it out or say it is disputed.

## Node fields

```json
{ "id": "lang.c", "title": "C", "cat": "languages", "tier": 2, "year": 1972,
  "short": "...", "long": "...", "sleeper": "...", "code": { "lang": "c", "text": "..." },
  "status": "thriving", "tags": ["systems", "unix"], "refs": [{ "label": "...", "url": "https://..." }] }
```

| Field | Rule |
|---|---|
| `id` | `prefix.slug`, lowercase letters, digits and hyphens, exactly one dot. Prefixes: `found`, `comp`, `lang`, `conc`, `data`, `math`, `tool`, `pkg`, `qual`, `proc`, `fail`, `org`, `ppl`, `plat`, `mod`. The prefix does not have to equal the category. Never change an id once published. |
| `title` | At most 46 characters, the name people use ("Git", "Mythical Man-Month, The" is wrong; write "The Mythical Man-Month"). |
| `cat` | One of the keys in `data/categories.json`. |
| `tier` | 0 root (only `se`), 1 hub, 2 major, 3 notable, 4 detail. See below. |
| `year` | An integer: first release, founding, coinage or the event. For a person, the year of their best-known contribution, not birth. Use the best-supported year; mention a dispute in `long`. |
| `yearEnd` | Optional integer for things that ended (a dead product, a discredited practice). |
| `short` | The line shown when the camera zooms in. One or two sentences, at most 165 characters, no markdown. It must make sense alone. |
| `long` | The detail panel text. Two to five sentences, 280 to 900 characters. Concrete facts: who, when, what it did, what it replaced or led to, why it mattered. Blank lines between paragraphs are allowed. |
| `sleeper` | Optional, at most 300 characters. What changed since about 1990, or what the reader would have expected instead. Include it on roughly 40 percent of nodes, where it adds real information. |
| `code` | Optional `{lang, text}`, at most 12 lines. Use for languages, tools and techniques where a snippet teaches something. It must be correct and runnable as shown. |
| `status` | `thriving`, `niche`, `legacy`, `dead` or `n/a` (people, events, concepts without a lifecycle). |
| `tags` | Optional lowercase search words not already in the title. |
| `refs` | Optional, one or two `https` links to primary or authoritative pages taken from the research notes. Never guess a URL. |

## Tiers

| Tier | Meaning | Target count |
|---|---|---|
| 0 | The root, `se` | 1 |
| 1 | Hubs: the top-level ideas everything hangs from. One per category plus a few cross-cutting ones such as Compiler, Version Control, Package Manager, Linting and Static Analysis, Operating System, Database. | 18 to 26 |
| 2 | Major: landmark languages, ideas, tools, companies and people a newcomer must meet. | 110 to 160 |
| 3 | Notable: important but secondary. | 250 to 350 |
| 4 | Detail: specific tools, incidents, techniques, libraries. | the rest |

## Edges

```json
{ "s": "lang.c", "t": "lang.cpp", "w": 3, "k": "evolved-into", "note": "optional one line" }
```

An edge reads "source kind target". Source and target are node ids.

| Kind | Reads | Notes |
|---|---|---|
| `influenced` | source influenced target | |
| `evolved-into` | source evolved into target | C evolved-into C++; SCCS evolved-into RCS |
| `implements` | source implements target | the concrete thing is the source: SQLite implements SQL; PostgreSQL implements the relational model |
| `uses` | source uses target | Python uses NumPy |
| `created-by` | source was created by target | target must be a person or organization |
| `part-of` | source is part of target | the member is the source and the hub or whole is the target |
| `replaced-by` | source was replaced by target | |
| `competes-with` | symmetric | |
| `related` | symmetric | use sparingly, only when no other kind fits |

Weights express relevance:

- `3`: definitional or direct lineage (created-by, part-of a hub, evolved-into, the main implementation).
- `2`: a strong, specific relationship worth following.
- `1`: a real but looser relationship.

Rules the validator checks: no self loops, no duplicate pair, both ends exist, weight is 1, 2 or 3, every node has at least one edge and the whole graph is connected to the root. Aim for every node to have at least two edges, every hub at least fifteen, and an average of about 4.5. Cross-category links are what make the map valuable: link a language to the company that made it, the person behind it, the tool that built it, and the practice it displaced.

Each author writes the edges whose source is in their own slice, and may point at any id in the registry. Do not write the same pair twice from both sides.

## Categories

The keys, in order: `foundations`, `compilers`, `languages`, `concepts`, `data`, `mathai`, `tooling`, `packages`, `quality`, `process`, `failures`, `orgs`, `people`, `platforms`, `modern`. Descriptions are in `data/categories.json`. Put "what was tried and failed" in `failures`, and make sure each failure links to what replaced it or what it taught.

## Tour

`data/tour.json` lists 10 to 16 stops in chronological order, each `{node, title, text}`. `title` is short and may start with a year. `text` is one or two sentences in the second person that move the story forward ("You wake up in...").

## Starter questions

`data/questions.json` lists the questions the map was built to answer, each `{q, node}`. They appear when the search box is focused and empty. `q` is a plain question of at most 70 characters, and `node` is the id of the one node that answers it best. The strict validator requires at least 10 and checks that every `node` exists.
