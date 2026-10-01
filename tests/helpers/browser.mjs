// Shared browser helpers: launch Microsoft Edge through playwright-core and open the built map with the test hook enabled.
import { chromium } from 'playwright-core';
import { pathToFileURL, fileURLToPath } from 'node:url';
import path from 'node:path';

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
export const MAP_FILE = process.env.MAP_FILE ?? path.join(root, 'dist/software-engineering-map.html');
const EDGE = process.env.EDGE_PATH ?? 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

export function launch({ software = process.env.SMAP_SOFTWARE_GL === '1', args = [] } = {}) {
  const gl = software ? ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] : [];
  return chromium.launch({ executablePath: EDGE, headless: true, args: ['--ignore-gpu-blocklist', ...gl, ...args] });
}

export async function openMap(browser, { query = 'test=1&still=1', hash = '', viewport = { width: 1440, height: 900 }, mobile = false, reducedMotion, deviceScaleFactor = 1, file = MAP_FILE, waitReady = true } = {}) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor, isMobile: mobile, hasTouch: mobile, reducedMotion });
  const page = await ctx.newPage();
  const errors = [], requests = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(`console: ${m.text()}`); });
  page.on('pageerror', (e) => errors.push(`pageerror: ${e}`));
  page.on('requestfailed', (r) => errors.push(`requestfailed: ${r.url()}`));
  page.on('request', (r) => requests.push(r.url()));
  await page.goto(`${pathToFileURL(file).href}?${query}${hash}`);
  if (waitReady) await page.waitForFunction(() => document.body.dataset.ready === '1', null, { timeout: 90000 });
  return { ctx, page, errors, requests };
}

export const state = (page) => page.evaluate(() => window.__mapTest.state());
// let camera flights and layout transitions settle
export const settle = (page, timeout = 20000) => page.waitForFunction(() => { const s = window.__mapTest.state(); return !s.flying && !s.layoutMoving && !s.intro; }, null, { timeout });
