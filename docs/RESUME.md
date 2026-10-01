# Resume notes: The Sleeper's Map

Working notes so the build can continue after any interruption. Delete this file when the project ships.

## What the user asked for

1. Run the `deep-research` skill on the history of software engineering, from assembly language to modern coding techniques: terms, notable languages with defining characteristics and syntax, notable companies, what a compiler is, C basics and C versus C++, databases/arrays/variables, types of linting, what a matrix is, important Python packages, package managers, what is popular now, what worked, what has been proven NOT to work. Framing: catch up as if asleep for 30 to 40 years.
2. Present it as an interactive 3D map in one HTML file: no node limit, most stunning design possible, titles above nodes, descriptions as zoom increases, edges by relevance, bigger nodes for top-level ideas.
3. Run via `/lfg` with the goal "a tested and working html file plus any other artifacts". No git remote, so no push or PR. Chat replies to the user are terse (caveman style); files on disk are normal prose.

## Paths

- Working folder: `C:\Users\srbro\OneDrive\Documents\7 - Claude`
- Project: `...\software-engineering-map` (local git repo, branch `main`, git dir external at `C:\Users\srbro\AppData\Local\se-map-tooling\se-map.git`; `node_modules` is a junction to `C:\Users\srbro\AppData\Local\se-map-tooling\node_modules`, so after any `npm install` check it is still a junction)
- Research notes: `...\7 - Claude\research_notes\Software engineering history 1945 to 2026\` (shared brief in `_shared_brief.md`)
- Report (not yet written): `...\7 - Claude\reports\Software engineering history 1945 to 2026.md`
- deep-research skill: `C:\Users\srbro\.claude\skills\synced\58b67614-a696-406c-b0ed-52258b347a32_12b6b4aa-8e0a-4b38-bb05-c02574758ac9\deep-research` (`references/researcher.md`, `references/report-writer.md`; the coordinator must not read those two files itself)

## State (updated 23:30 on 2026-09-30)

Done and committed: the engine (`src/`), build (`scripts/`), validator, layouts, 38 automated tests (all passing on the RX 7800 XT at about 150 fps, including a 3,000-node synthetic graph), a 77-node seed dataset in `data/src/core.json`, the plan in `docs/plans/`, and `docs/data-style-guide.md` for dataset authors.

An earlier fan-out of 14 agents hit the account usage limit and died without output. Researchers now run at most four at a time.

| Topic | Output file | Status |
|---|---|---|
| Foundations, machine code to early languages | 01_foundations_machine_code_to_early_languages.md | written, finishing |
| C, C++, Unix, systems | 02_c_unix_cpp_systems_programming.md | done (has Graph hints) |
| Mainstream OO/web/scripting languages | 03_mainstream_languages_oo_web_scripting_mobile.md | running |
| Functional/logic/scientific/legacy, paradigms | 04_functional_logic_scientific_legacy_paradigms.md | not started |
| Core concepts, data structures, databases | 05_core_concepts_data_structures_databases.md | written, finishing |
| Matrices, numerics, Python ecosystem, ML | 06_matrices_numerics_python_ecosystem_ml.md | running |
| Version control, build, packaging, supply chain | 07_version_control_build_packaging_supply_chain.md | not started |
| Linting, static analysis, testing, CI, IDEs | 08_linting_static_analysis_testing_ci_ides.md | done (has Graph hints) |
| Methodologies, evidence, failures | 09_methodologies_evidence_failures.md | not started |
| Companies, institutions, people | 10_companies_institutions_people.md | not started |
| OS, internet, web, cloud, mobile | 11_platforms_os_internet_web_cloud_mobile.md | not started |
| Modern state, AI-assisted development | 12_modern_state_ai_assisted_development.md | not started |

The prompts for topics 04, 07, 09, 10, 11 and 12 follow the same pattern as the launched ones: a topic paragraph, key questions, suggested sources, the instruction to follow `_shared_brief.md`, the save path, and the mandatory first step of reading `references/researcher.md`.

## Next steps

1. Launch the remaining researchers as slots free up (never more than four running). Check `Graph hints` sections to see when a note file is complete.
2. When all twelve exist, spawn the report writer (it reads the notes and writes `reports/Software engineering history 1945 to 2026.md` after reading `references/report-writer.md`).
3. Dataset: one registry agent merges the `## Graph hints` sections into `data/src/registry.json` (ids, titles, categories, tiers, years) following `docs/data-style-guide.md`; then author agents (about 4 at once) write `data/src/<slice>.json` per category slice against the registry; then merge, `npm run validate:strict`, a linker pass for cross-slice edges, a fact-check pass against the notes, write `data/tour.json` (10 to 16 stops) and `data/required-topics.json`.
4. Enable strict validation in `npm test`, run on the real GPU and with `SMAP_SOFTWARE_GL=1`, read every screenshot in `screenshots/`, write `README.md`, delete `.tmp/`, commit.
5. lfg steps after the build: simplify, code review of the diff, a compact learnings note in `docs/solutions/` if worthwhile, browser test (already covered by `npm test`), local commit. There is no remote, so skip push, PR and CI watching.
