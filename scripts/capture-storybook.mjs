// Captures the Link SDK Storybook into sources/storybook/ and writes its manifest.
// Public, so no login is needed.
//
// Usage: node scripts/capture-storybook.mjs [--only=slug,slug]
import { chromium } from 'playwright';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

const BASE = 'https://ui.leantech.me';
const ONLY = process.argv.find((a) => a.startsWith('--only='))?.slice(7).split(',');
const ROOT = 'sources/storybook';
const MANIFEST = `${ROOT}/manifest.json`;
const VIEWPORT = { width: 1440, height: 1060 };
const SCALE = 2;

// [slug, story or docs id], shot in the Storybook UI so the sidebar and
// controls show.
const SHOTS = [
  ['bank-priming-adcb', 'views-bankpriming--adcb-priming-connect'],
  ['button-docs', 'components-button--docs'],
];

async function settle(frame) {
  await frame.waitForLoadState('networkidle').catch(() => {});
  // Views can render into portals outside #storybook-root, so count those too.
  await frame
    .waitForFunction(() => {
      const roots = [...document.body.children].filter(
        (el) => !el.hidden && !el.matches('.sb-wrapper, script, #storybook-highlights-root'),
      );
      return roots.some((root) => root.innerText.trim().length + root.querySelectorAll('svg, img, canvas').length > 0);
    }, null, { timeout: 30000 })
    .catch(() => console.warn('  nothing rendered after 30s'));
  await frame.evaluate(() => document.fonts.ready);
  await frame.waitForTimeout(2000);
}

const pngSize = (file) => {
  const b = readFileSync(file);
  return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
};

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: SCALE, colorScheme: 'light' });
const page = await context.newPage();

const manifest = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, 'utf8')) : [];
const entries = manifest.filter((e) => ONLY && !ONLY.includes(e.slug));

for (const [slug, id] of SHOTS) {
  if (ONLY && !ONLY.includes(slug)) continue;
  console.log(slug);
  const url = `${BASE}/?path=/${id.endsWith('--docs') ? 'docs' : 'story'}/${id}`;
  await page.goto(url, { waitUntil: 'load' });
  await settle(await (await page.waitForSelector('#storybook-preview-iframe')).contentFrame());
  const file = `${slug}.png`;
  mkdirSync(dirname(`${ROOT}/${file}`), { recursive: true });
  await page.screenshot({ path: `${ROOT}/${file}`, caret: 'hide' });
  entries.push({ file, url, slug, storyId: id, ...pngSize(`${ROOT}/${file}`) });
}

await browser.close();
entries.sort((a, b) => a.file.localeCompare(b.file));
writeFileSync(MANIFEST, JSON.stringify(entries, null, 2) + '\n');
console.log(`${entries.length} entries in ${MANIFEST}`);
