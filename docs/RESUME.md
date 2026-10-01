# Resume notes: The Sleeper's Map

Working notes so the build can continue after any interruption. Delete this file when the project ships.

## What the user asked for

1. Run the `deep-research` skill on the history of software engineering, from assembly language to modern coding techniques: terms, notable languages with defining characteristics and syntax, notable companies, what a compiler is, C basics and C versus C++, databases/arrays/variables, types of linting, what a matrix is, important Python packages, package managers, what is popular now, what worked, what has been proven NOT to work. Framing: catch up as if asleep for 30 to 40 years.
2. Present it as an interactive 3D map in one HTML file: no node limit, most stunning design possible, titles above nodes, descriptions as zoom increases, edges by relevance, bigger nodes for top-level ideas.
3. Run via `/lfg` with the goal "a tested and working html file plus any other artifacts". No git remote, so no push or PR. Chat replies to the user are terse (caveman style); files on disk are normal prose.

## Paths

- Working folder: `C:\Users\srbro\OneDrive\Documents\7 - Claude`
- Project: `...\software-engineering-map` (local git repo, branch `main`, git dir external at `C:\Users\srbro\AppData\Local\se-map-tooling\se-map.git`; `node_modules` is a junction to `C:\Users\srbro\AppData\Local\se-map-tooling\node_modules`, so after any `npm install` check it is still a junction)
- Research notes: `...\7 - Claude\research_notes\Software engineering history 1945 to 2026\` (twelve notes, each with Graph hints)
- Report (done, about 31K words): `...\7 - Claude\reports\Software engineering history 1945 to 2026.md`

## State (as of 11:45 on 2026-10-01)

Done: research notes, report, viewer engine, build, validator, layouts, tests (25 end-to-end, data, layout), registry of 743 rows, and these dataset slices in `data/src/`: s01, s02, s03, s04, s05, s06, s07a, s07b, s08, s10b (people, written by hand with `z-people-links.json` holding thing-to-person `created-by` edges), s12.

In flight (background authors, each runs `node scripts/check-slice.mjs <file>` at the end): s09a-process, s09b-failures, s10a-orgs, s11-platforms. Slice files for s09a, s09b, s10a already exist on disk. If s11 never appears, write it by hand from note 11 against the `plat.*` rows of the registry (62 rows).

Merging all slices on disk already gives about 780 nodes and 3,900 edges. The only validation errors are edges that point at the missing `plat.*` ids.

## Next steps

1. When all slices exist: `npm run merge`, `npm run validate`, fix dangling ids and duplicate concepts (for example an organization added twice).
2. `node scripts/suggest-links.mjs --write` for structural edges, then re-merge and run `npm run validate:strict` (at least 500 nodes, 1,500 edges, hubs with 8 or more edges, required topics, a tour of 10 or more stops).
3. Fact-check pass over high-risk claims (dates, figures, quotes) against the research notes; correct in place.
4. Make strict validation the default in `npm test` (`tests/data.test.mjs` reads `SMAP_STRICT`; `package.json` test script should call `build.mjs --strict`).
5. Re-tune the viewer with the full dataset (label density, glow, timeline, galaxy, phone view), run `npm test` on the real GPU and with `SMAP_SOFTWARE_GL=1`, read every screenshot in `screenshots/`.
6. Finalize `README.md` numbers, write a compact note in `docs/solutions/`, delete `.tmp/` and this file, commit locally (trailers required by the harness), confirm `Software Engineering Map.html` at the project root is the final build.
