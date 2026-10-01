// Build: merge + validate data, compute layouts, bundle the app, inline everything into one offline HTML file.
//   node scripts/build.mjs [--strict] [--data path/to/graph.json] [--out path/to/file.html]
import { build } from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mergeData } from './merge-data.mjs';
import { validateGraph } from './validate-data.mjs';
import { computeLayouts } from './layouts.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const flag = (name) => argv.includes(name);
const opt = (name) => { const i = argv.indexOf(name); return i >= 0 ? argv[i + 1] : undefined; };
const strict = flag('--strict');

export async function buildMap({ graph: given, strictMode = strict, outFile, copyToRoot = true, quiet = false } = {}) {
  const t0 = Date.now(); const log = (...a) => { if (!quiet) console.log(...a); };
  let graph = given;
  if (!graph) {
    const dataArg = opt('--data');
    if (dataArg) graph = JSON.parse(readFileSync(path.resolve(dataArg), 'utf8'));
    else { const m = mergeData(); m.problems.forEach((p) => console.error('merge:', p)); if (m.problems.length) throw new Error('merge failed'); graph = m.graph; }
  }
  const v = validateGraph(graph, { strict: strictMode });
  v.warnings.slice(0, 15).forEach((w) => console.warn('warn:', w));
  if (v.errors.length) { v.errors.slice(0, 40).forEach((e) => console.error('error:', e)); throw new Error(`data validation failed (${v.errors.length} errors)`); }
  log(`data ok: ${v.stats.nodes} nodes, ${v.stats.edges} edges, avg degree ${v.stats.avgDegree}`);

  graph = { ...graph, layouts: computeLayouts(graph) };
  log(`layouts computed in ${((Date.now() - t0) / 1000).toFixed(1)}s`);

  const result = await build({
    entryPoints: [path.join(root, 'src/main.js')], bundle: true, minify: true, format: 'iife', target: 'es2022', write: false, legalComments: 'none',
    logLevel: quiet ? 'silent' : 'warning', define: { 'process.env.NODE_ENV': '"production"' },
  });
  const js = result.outputFiles[0].text.replace(/<\/script/gi, '<\\/script').replace(/<!--/g, '<\\!--');

  const font = (pkg, file, family, weight, style = 'normal') => {
    const p = path.join(root, 'node_modules', pkg, 'files', file);
    if (!existsSync(p)) throw new Error(`missing font file ${p}`);
    return `@font-face{font-family:'${family}';font-style:${style};font-weight:${weight};font-display:swap;src:url(data:font/woff2;base64,${readFileSync(p).toString('base64')}) format('woff2')}`;
  };
  const fonts = [
    font('@fontsource-variable/inter', 'inter-latin-wght-normal.woff2', 'Inter', '100 900'),
    font('@fontsource/jetbrains-mono', 'jetbrains-mono-latin-400-normal.woff2', 'JetBrains Mono', 400),
    font('@fontsource/jetbrains-mono', 'jetbrains-mono-latin-600-normal.woff2', 'JetBrains Mono', 600),
    font('@fontsource/instrument-serif', 'instrument-serif-latin-400-normal.woff2', 'Instrument Serif', 400),
    font('@fontsource/instrument-serif', 'instrument-serif-latin-400-italic.woff2', 'Instrument Serif', 400, 'italic'),
  ].join('\n');
  const css = fonts + '\n' + readFileSync(path.join(root, 'src/styles.css'), 'utf8');
  const data = JSON.stringify(graph).replace(/</g, '\\u003c').replace(new RegExp('\\u2028', 'g'), '\\u2028').replace(new RegExp('\\u2029', 'g'), '\\u2029');

  const template = readFileSync(path.join(root, 'src/template.html'), 'utf8');
  // the template must not pull anything from the network
  const stray = template.replace(/<style>\{\{CSS\}\}<\/style>/, '').match(/(?:src|href)\s*=\s*["']https?:|@import|url\(\s*["']?https?:/gi);
  if (stray) throw new Error(`template references external resources: ${stray.join(', ')}`);
  if (/url\(\s*["']?https?:/i.test(readFileSync(path.join(root, 'src/styles.css'), 'utf8'))) throw new Error('styles.css references an external URL');
  const html = template.replace('{{CSS}}', () => css).replace('{{DATA}}', () => data).replace('{{JS}}', () => js);

  const out = outFile ?? opt('--out') ?? path.join(root, 'dist/software-engineering-map.html');
  mkdirSync(path.dirname(out), { recursive: true });
  writeFileSync(out, html);
  if (copyToRoot && !outFile && !opt('--out')) copyFileSync(out, path.join(root, 'Software Engineering Map.html'));
  log(`wrote ${path.relative(root, out)} (${(html.length / 1048576).toFixed(2)} MB) in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
  return { out, size: html.length, stats: v.stats, graph };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  buildMap().catch((e) => { console.error(String(e.message ?? e)); process.exit(1); });
}
