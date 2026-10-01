# Fact-check task for dataset slices

You are checking the claims in a group of dataset slice files against the research notes they were written from. The goal is a map whose statements a careful reader can trust. You are not rewriting for style and you are not adding material.

## Inputs

- Your slice files in `data/src/` (named in your task prompt). Each has `nodes` (with `short`, `long`, optional `sleeper`, optional `code`, `tags`, `refs`) and `edges` (some with a `note`).
- The research notes for your slices, in `C:\Users\srbro\OneDrive\Documents\7 - Claude\research_notes\Software engineering history 1945 to 2026\`. Your task prompt names which ones. Notes tag claims as `[V]` (verified against a source), `[B]` (background knowledge, widely known), or `[?]` (not verified).
- The report `C:\Users\srbro\OneDrive\Documents\7 - Claude\reports\Software engineering history 1945 to 2026.md`, for cross-checking.
- `docs/data-style-guide.md`, for the length limits and style rules.

## Method

For every node in your slices, read `short`, `long`, `sleeper`, `code`, and edge notes. For each concrete claim (a date, number, version, name, quotation, attribution, a "first" or "largest" or "only" statement), find its support in the notes. Use `Grep` on a distinctive word from the claim, then read around the match.

Decide for each claim:

1. **Supported by a note.** Leave it.
2. **Contradicted by a note.** Fix the node text to match the note. If two notes disagree, state both or use the safer wording ("about", "reported", "sources differ").
3. **Not in the notes, but certain and widely known** (for example, "Unix was written at Bell Labs"). Leave it.
4. **Not in the notes and not certain, or the note tags it `[?]`.** Hedge it ("reported", "about", "according to the vendor") or remove it. Never leave an unverified number, valuation, date or quotation stated as fact.
5. **A vendor or advocate claim stated as fact** (speed-ups, productivity figures, adoption numbers from a company's own blog). Rewrite so it is attributed ("the vendor says").
6. **A well-known myth or apocryphal quotation** (for example, that Hopper found the first bug, that Royce coined "waterfall", that Gates said 640K is enough). Keep it only if the text says it is disputed or false.

Also check each `code` snippet: it must be valid in its language and its stated output must be right. Work it out by hand. Fix mistakes.

## Rules

- Edit only the `short`, `long`, `sleeper`, `code`, `tags`, `refs` fields of nodes, and the `note` field of edges, in your own files.
- Never change `id`, `title`, `cat`, `tier`, `year`, `s`, `t`, `w` or `k`. If you think a year, tier or edge is wrong, list it in your log under "Proposed structural changes" and leave it alone.
- Keep the limits: `short` at most 165 characters, `long` 280 to 900 characters (hard maximum 920), plain English, no em dashes, no markdown, no emoji.
- Add no new facts that the notes do not support. When you shorten a sentence to hedge it, keep the rest of the node intact.
- Edit JSON safely: use the `Edit` tool with a unique `old_string`, or a small Node script that parses the file, changes fields, and writes it back with `JSON.stringify(data, null, 1)`. Do not hand-edit around quotes in a way that can break the file.
- After your edits run `node scripts/check-slice.mjs data/src/<file>.json` for each of your files. It must report 0 errors.
- Work in order of risk: nodes with numbers, dates, money, rankings, quotations and "first" claims before conceptual nodes. If you run short of budget, say which nodes you did not reach.

## Output

Write a log to `.tmp/factcheck/<slice-name>.md` with three sections:

1. **Changes made**: node id, the old claim, the new text, the note and line that supports it.
2. **Unresolved doubts**: claims you could not verify and left hedged or unchanged, with the reason.
3. **Proposed structural changes**: year, tier or edge problems.

Your final message to the coordinator is at most 200 words: counts of nodes checked, changed, and left in doubt, the nodes you did not reach, and the path of your log.
