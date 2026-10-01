# The Sleeper's Map

An interactive 3D map of the history of software engineering, from hand-set machine code to AI that writes code. It is built for someone who stopped following software 30 to 40 years ago and wants to catch up: every glowing point is an idea, a language, a tool, a company, a person or a mistake, and the links show what led to what.

**Open `Software Engineering Map.html`.** It is one self-contained file. It needs no server and no internet connection, and it works from a double-click in any current browser that supports WebGL 2.

![Overview of the map](screenshots/01-overview.png)

## What you can do

- **Orbit, pan and zoom.** Drag to orbit, scroll or pinch to zoom toward the pointer, right-drag or two fingers to pan.
- **Read at any depth.** Bigger nodes are bigger ideas. Titles float above the nodes, and as you zoom in the title grows a short description. Click a node to fly to it and open the full text, a "for the sleeper" note about what changed since the late 1980s, a code sample where one helps, and every connection grouped by relationship. Links are brighter and shorter when two ideas are more closely related.
- **Follow the connections.** Hover to light up a node's neighborhood and dim the rest. Click a connection chip to jump there. Back and forward buttons retrace your path.
- **Take the tour.** A guided flight through the story in chronological order.
- **Time-travel.** Drag the year slider to hide everything newer than that year, or press play to watch the field grow from the 1940s to today. A marker shows where you "fall asleep" in 1990.
- **Change the layout.** Constellation groups ideas by relevance. Timeline lines them up by year with a lane per category. Galaxy spirals outward through time.
- **Search and filter.** Press `/` to search. Click a category in the legend to hide or show it, double-click to isolate it.

| Key | Action |
|---|---|
| `/` | Search |
| `1` `2` `3` | Constellation, Timeline, Galaxy |
| `T` | Guided tour |
| `P` | Replay history |
| `L` | List view of every idea |
| `R` | Reset the view |
| `←` `→` | Previous or next connection (or tour stop) |
| `[` `]` | Back or forward |
| `?` | Help |
| `Esc` | Close |

Everything works on a phone-width screen with touch. The map respects the operating system's reduced-motion setting. If WebGL is unavailable, the page shows the complete list of ideas instead, so nothing is lost.

## Screenshots

| | |
|---|---|
| ![Zoomed in with descriptions](screenshots/02-zoomed-descriptions.png) | ![Detail panel](screenshots/03-detail-panel.png) |
| ![Timeline layout](screenshots/04-timeline-layout.png) | ![Galaxy layout](screenshots/05-galaxy-layout.png) |
| ![Time travel to 1985](screenshots/06-time-travel-1985.png) | ![Guided tour](screenshots/07-guided-tour.png) |

## Where the content comes from

The text comes from a deep-research pass that ran twelve independent topic researchers (early languages and compilers, C and Unix, mainstream languages, functional and legacy languages, data and databases, matrices and the Python ecosystem, version control and packaging, linting and testing, methodologies and failures, companies and people, platforms, and the AI era). Their notes, with sources, are in `../research_notes/`, and the synthesized report is in `../reports/`. The map's nodes were then written against those notes, and a fact-check pass compared each node's claims and dates with them.

## Project layout

```
Software Engineering Map.html   the built, self-contained map (a copy of dist/software-engineering-map.html)
data/
  categories.json               the categories and their colors
  src/*.json                    node and edge slices, written against the registry
  tour.json                     the guided tour
  required-topics.json          topics the release data must cover
  graph.json                    merged and validated dataset (generated)
src/                            the viewer: scene, shaders, labels, UI, styles, HTML template
scripts/                        merge, validate, layouts, build
tests/                          data, layout and end-to-end browser tests
screenshots/                    images produced by the end-to-end tests
docs/                           plan, data style guide, learnings
```

## Rebuild and test

Requires Node 22 or newer and Microsoft Edge (the tests drive it through `playwright-core`; set `EDGE_PATH` for a different location).

```
npm install
npm run build        # merge and validate the data, compute layouts, write the HTML
npm test             # build, then data, layout and browser tests, and refresh the screenshots
SMAP_SOFTWARE_GL=1 npm run test:e2e   # run the browser tests on software rendering
```

`npm run validate:strict` checks the release bars: at least 500 nodes, 1,500 edges, every category populated, every hub well connected, every required topic present.

## How it is built

- **Rendering.** three.js with custom shaders. Nodes and halos are instanced; edges are curves evaluated on the GPU from a position texture and drawn as camera-facing ribbons with category gradients and traveling pulses; bloom, a nebula backdrop and soft category clouds finish the look. The same code renders thousands of nodes (the tests load a 3,000-node synthetic graph).
- **Labels.** A DOM layer projected every frame. Labels are ranked by importance and on-screen size, collisions are rejected, and the node the camera is aimed at always wins its label.
- **Layouts.** `d3-force-3d` computes the three layouts at build time, seeded so they are identical every run. The browser only interpolates between them.
- **One file.** esbuild bundles the code, and the build inlines the script, styles, data and fonts (Inter, JetBrains Mono, Instrument Serif; all SIL Open Font License) into the HTML. A test confirms the page makes no network requests.

## Adding or changing content

Edit or add a slice in `data/src/`, following `docs/data-style-guide.md`, then run `npm test`. The validator reports dangling edges, disconnected nodes, over-long text and other problems before anything is built.

## Credits and licenses

Code in this project is MIT licensed. It bundles [three.js](https://threejs.org) (MIT) and [d3-force-3d](https://github.com/vasturiano/d3-force-3d) (MIT). Fonts are from [Fontsource](https://fontsource.org) packages under the SIL Open Font License 1.1.
