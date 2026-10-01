# Resume notes: The Sleeper's Map

This file records where the build stood when the account's usage limit interrupted it, so the work can continue without re-deriving anything. Delete it when the project ships.

## Update at 22:50 on 2026-09-30

Every background agent (the twelve researchers and the two planning-research agents) failed with the usage-limit error before writing anything. No research notes, stack notes or flow analysis exist on disk, so the "running" and "FAILED" labels in the table below all mean the same thing: relaunch. The main session then hit the same limit. The limit resets at 03:10 America/Chicago on 2026-10-01.

What exists: the project folder with a local git repo and one commit, the `node_modules` junction, empty `docs/plans`, and this file. Nothing has been built and no HTML exists yet.

Lessons for the restart:

1. Launch at most four agents at a time. Twelve in parallel exhausted the window before any of them produced output.
2. Keep the main context small. Every call re-reads it, and the long ce-plan references added a lot. Prefer a compact plan over the full ceremony, and skip optional reference reads.
3. The engine, build script, validator and tests do not depend on the research. Build them first against a small placeholder dataset, then add the real content.
4. After the research notes land, write them to disk before doing anything else, so a second interruption loses nothing.

## What the user asked for

1. Run the `deep-research` skill on the history of software engineering, from assembly language to modern coding techniques. Cover terms and definitions, notable languages with their defining characteristics and syntax, notable companies, what a compiler is, C basics and C versus C++, how to program with databases/arrays/variables, types of linting, what a matrix is, important Python packages, package managers, what is popular now, what has worked, and what has been proven NOT to work. Framing: bring the reader up to speed as if they had been asleep for 30 to 40 years.
2. Present the result as an interactive 3D map in one HTML file. No limit on node count. Most stunning visual design possible. A title above every node, a description that appears as the camera zooms in, edges by relevance, larger nodes for top-level ideas.
3. Run it with `/lfg` and the goal "a tested and working html file plus any other artifacts". The working folder is not a git repo with a remote, so there is no push or PR. A local git repo exists in this project folder.

Chat replies to the user use the terse "caveman" style; every file written to disk uses normal clear prose.

## Paths

- Working folder: `C:\Users\srbro\OneDrive\Documents\7 - Claude`
- Project: `C:\Users\srbro\OneDrive\Documents\7 - Claude\software-engineering-map` (git repo, branch `main`, external git dir at `C:\Users\srbro\AppData\Local\se-map-tooling\se-map.git`; `node_modules` is a junction to `C:\Users\srbro\AppData\Local\se-map-tooling\node_modules`)
- Research notes: `C:\Users\srbro\OneDrive\Documents\7 - Claude\research_notes\Software engineering history 1945 to 2026\`
- Final research report (not yet written): `C:\Users\srbro\OneDrive\Documents\7 - Claude\reports\Software engineering history 1945 to 2026.md`
- deep-research skill: `C:\Users\srbro\.claude\skills\synced\58b67614-a696-406c-b0ed-52258b347a32_12b6b4aa-8e0a-4b38-bb05-c02574758ac9\deep-research` (researcher instructions in `references/researcher.md`, report writer in `references/report-writer.md`)
- lfg and ce-plan skill references: `C:\Users\srbro\.claude\plugins\cache\compound-engineering-plugin\compound-engineering\3.27.0\skills\{lfg,ce-plan}\references\`
- Environment: Windows 11, Node 22.23.2, npm 10.9.8, git 2.54, no Python, Microsoft Edge at `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`, AMD Radeon RX 7800 XT.

## Pipeline state

The lfg pipeline is at step 1 (produce the work source). Route chosen: plan route (ce-plan), non-interactive.

- ce-plan: references read, plan not yet written. The plan file will go in `docs/plans/` (timestamp prefix `2026-09-30-2240`). Planned shape: Deep plan, about 12 implementation units in four phases (foundation, content, engine, ship). Design direction is in the lfg arguments in the session and summarized below.
- Two planning-research agents were launched: tech stack docs (writes `docs/research/tech-stack-notes.md`) and flow analysis (writes `docs/research/flow-analysis.md`).
- deep-research: 12 researcher agents were launched in parallel, each writing one file in the research notes folder. At 22:45 the account hit its session usage limit (HTTP 429, resets 03:10 America/Chicago) and agents started failing.

| Topic | Agent id | Output file | Status at interruption |
|---|---|---|---|
| Foundations, machine code to early languages | a8724f6c703c0b151 | 01_foundations_machine_code_to_early_languages.md | FAILED (429, nothing written) |
| C, C++, Unix, systems | ab079d6ab52c6e6c3 | 02_c_unix_cpp_systems_programming.md | FAILED (429, nothing written) |
| Mainstream OO/web/scripting languages | a4a11a1fd72b69845 | 03_mainstream_languages_oo_web_scripting_mobile.md | FAILED (429, nothing written) |
| Functional/logic/scientific/legacy, paradigms | aa95aee1f307f4c63 | 04_functional_logic_scientific_legacy_paradigms.md | FAILED (429, nothing written) |
| Core concepts, data structures, databases | af8ba1e87a2d6c9d1 | 05_core_concepts_data_structures_databases.md | FAILED (429) |
| Matrices, numerics, Python ecosystem, ML | a48774fb0f4ec341a | 06_matrices_numerics_python_ecosystem_ml.md | FAILED (429, nothing written) |
| Version control, build, packaging, supply chain | af2863ac1d2e97475 | 07_version_control_build_packaging_supply_chain.md | FAILED (429, nothing written) |
| Linting, static analysis, testing, CI, IDEs | a93845748fe172e83 | 08_linting_static_analysis_testing_ci_ides.md | FAILED (429, nothing written) |
| Methodologies, evidence, failures | a9158749427fd28ef | 09_methodologies_evidence_failures.md | FAILED (429, nothing written) |
| Companies, institutions, people | adb71edaec7fd5cee | 10_companies_institutions_people.md | FAILED (429) |
| OS, internet, web, cloud, mobile | a9b755cc4190d7596 | 11_platforms_os_internet_web_cloud_mobile.md | FAILED (429) |
| Modern state, AI-assisted development | aaf9b11094c28f994 | 12_modern_state_ai_assisted_development.md | FAILED (429, nothing written) |

## How to continue after the limit resets

1. Check which note files exist and how complete they are. Resume a failed or stalled agent with `SendMessage` (its context is kept), or relaunch it with the same prompt in the research skill's format. Run at most four agents at once to avoid hitting the limit again.
2. When all twelve note files are done, spawn the report-writer agent: it reads the notes and writes `reports/Software engineering history 1945 to 2026.md` after reading `references/report-writer.md` in the deep-research skill folder. The coordinator must not read `researcher.md` or `report-writer.md` itself.
3. Write the ce-plan plan file, run its confidence check and the mandatory `ce-doc-review` (non-interactive), then return to lfg step 2 (`ce-work mode:return-to-caller <plan path>`), then steps 3 to 8 as lfg defines. Skip push, PR and CI steps (no remote). Do not end the turn before the DONE promise or an explicit stop.
4. Data pipeline for the map is registry-first: one taxonomist agent merges the `## Graph hints` sections of the notes into a registry, parallel authors fill each category slice, then merge, validate, link and fact-check. Engine: three.js bundled with esbuild into one inline HTML file, instanced glowing nodes, GPU-evaluated curved edges, DOM label layer with level of detail, bloom, timeline scrubber, layouts, guided tour. Tests: Playwright (playwright-core) driving Edge, screenshots inspected by eye.
