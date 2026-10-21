// Captures the Lean dashboard into sources/dashboard/ and updates its manifest.
// Opens pages, drawers, menus and modals but never submits anything.
// One viewport-sized shot per state; empty states are skipped and the Test-mode
// banner is hidden.
//
// Usage: node scripts/capture-dashboard.mjs [test|live] [--only=slug,slug]
// Needs a saved session: node scripts/dashboard-login.mjs [test|live] first.
import { chromium } from 'playwright';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

const BASE = 'https://dashboard.leantech.me';
const ENV = process.argv[2] ?? 'test';
const ONLY = process.argv.find((a) => a.startsWith('--only='))?.slice(7).split(',');
const STATE = `.auth/dashboard-${ENV}.json`;
const ROOT = 'sources/dashboard';
const MANIFEST = `${ROOT}/manifest.json`;
const VIEWPORT = { width: 1440, height: 1060 };
const SCALE = 2;
// Something both customers and payments match, so search results are mixed.
const SEARCH_TERM = { test: 'test', live: 'helper' }[ENV];
const EMPTY = /No results|No data available|You haven't|haven't run any|live in the sandbox|No .* yet/;

const click = (role, name, opts = {}) => (page) => page.getByRole(role, { name, ...opts }).first().click();
const firstRow = (page) => page.locator('main tbody tr').first().locator('td').nth(1).click();
const tab = (name) => click('tab', name, { exact: true });

// [page, state, path, action?]
const SHOTS = [
  ['home', 'overview', '/'],
  ['customers', 'workspace-menu', '/customers?page=1&size=15', (p) => p.locator('button').first().click()],
  ['customers', 'user-menu', '/customers?page=1&size=15', (p) => p.locator('button[aria-haspopup=menu]').last().click()],
  ['customers', 'list', '/customers?page=1&size=15'],
  ['customers', 'search-palette', '/customers?page=1&size=15', click('button', /Search/)],
  ['customers', 'search-palette-query', '/customers?page=1&size=15', async (p) => {
    await click('button', /Search/)(p);
    await p.locator('[role=dialog] input').first().fill(SEARCH_TERM);
  }],
  ['search', 'results', `/search?q=${SEARCH_TERM}`],
  ['customers', 'detail', '/customers?page=1&size=15', firstRow],
  ['payments', 'list', '/transactions?page=1&size=15&paymentView=all'],
  ['payments', 'outstanding', '/transactions?page=1&size=15&paymentView=all', tab('Outstanding')],
  ['payments', 'received', '/transactions?page=1&size=15&paymentView=all', tab('Received')],
  ['payments', 'unreceived', '/transactions?page=1&size=15&paymentView=all', tab('Unreceived')],
  ['payments', 'refunds', '/transactions?page=1&size=15&paymentView=all', tab('All Refunds')],
  ['payments', 'detail', '/transactions?page=1&size=15&paymentView=all', firstRow],
  ['payments', 'row-menu', '/transactions?page=1&size=15&paymentView=all', click('button', 'Open menu')],
  ['payments', 'filters', '/transactions?page=1&size=15&paymentView=all', click('button', /Filters/)],
  ['payments', 'date-range', '/transactions?page=1&size=15&paymentView=all', click('button', '30 days')],
  ['payouts', 'list', '/transactions/payouts?page=1&size=15&payoutView=ALL'],
  ['payouts', 'create-menu', '/transactions/payouts?page=1&size=15&payoutView=ALL', click('button', 'Create a payout')],
  ['account-verification', 'list', '/verifications/account-verification?page=1&size=15'],
  ['account-verification', 'verify-menu', '/verifications/account-verification?page=1&size=15', click('button', 'Verify', { exact: true })],
  ['account-verification', 'supported-countries', '/verifications/account-verification?page=1&size=15', click('button', 'View supported countries')],
  ['logs', 'list', '/development/logs?page=1&size=15'],
  ['logs', 'detail', '/development/logs?page=1&size=15', firstRow],
  ['integration-settings', 'default', '/development/integration-settings'],
  ['test-users', 'list', '/development/test-users?page=1&size=15'],
  ['test-users', 'overview', '/development/test-users?page=1&size=15', click('button', 'Show the test users overview')],
  ['test-users', 'create', '/development/test-users?page=1&size=15&create=true'],
  ['webhooks', 'list', '/development/webhooks'],
  ['webhooks', 'create', '/development/webhooks/create'],
  // Its events table uses placeholders the generic skeleton check misses.
  ['webhooks', 'detail', '/development/webhooks', async (p) => {
    await firstRow(p);
    await p.waitForURL(/webhooks\/[0-9a-f-]{36}/);
    await p.getByText('Endpoint URL').waitFor({ timeout: 30000 });
    await p.getByText(/Page 1 of \d+/).waitFor({ timeout: 30000 });
  }],
  ['sdk-customization', 'default', '/configurations/sdk-customization'],
  ['bank-connections', 'default', '/configurations/banks'],
  ['team', 'list', '/configurations/team'],
  ['team', 'add-user', '/configurations/team/new'],
  ['your-accounts', 'list', '/configurations/your-accounts'],
  ['your-accounts', 'add', '/configurations/your-accounts/add'],
  ['notifications', 'default', '/configurations/notifications'],
  ['account-settings', 'default', '/configurations/account'],
  ['billing', 'default', '/billing?page=1&size=15&period=all'],
];

async function settle(page) {
  await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
  await page
    .waitForFunction(
      () =>
        !/Connecting to Lean/.test(document.body.innerText) &&
        !document.querySelector('[class*=skeleton i], [data-slot=skeleton], .animate-pulse, [aria-busy=true]'),
      null,
      { timeout: 20000 },
    )
    .catch(() => console.warn('  skeleton still visible'));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(800);
}

// The yellow "You're using Test mode" pill and the thin yellow strip above it.
async function hideTestBanner(page) {
  await page.evaluate(() => {
    for (const el of document.querySelectorAll('[class*="bg-warning"]')) {
      if (el.innerText.trim().length < 80) el.style.visibility = 'hidden';
    }
  });
}

const pngSize = (file) => {
  const b = readFileSync(file);
  return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
};

const browser = await chromium.launch();
const context = await browser.newContext({ storageState: STATE, viewport: VIEWPORT, deviceScaleFactor: SCALE, colorScheme: 'light' });
const page = await context.newPage();

const manifest = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, 'utf8')) : [];
const keep = (e) => !(e.env === ENV && (!ONLY || ONLY.includes(`${e.page}-${e.state}`)));
const entries = manifest.filter(keep);

for (const [name, state, path, action] of SHOTS) {
  const slug = `${name}-${state}`;
  if (ONLY && !ONLY.includes(slug)) continue;
  console.log(slug);
  await page.setViewportSize(VIEWPORT);
  await page.goto(BASE + path, { waitUntil: 'load' });
  await settle(page);
  if (new URL(page.url()).pathname === '/login' || page.url().includes('signin')) throw new Error(`Session expired: run scripts/dashboard-login.mjs ${ENV}`);
  if (action) {
    try {
      await action(page);
    } catch (e) {
      console.warn(`  skipped: ${e.message.split('\n')[0]}`);
      continue;
    }
    await settle(page);
  }
  if (await page.getByText('Something went wrong').isVisible()) {
    console.warn('  skipped: page shows an error');
    continue;
  }
  const visible = await page.evaluate(() => document.body.innerText);
  const empty = visible.match(EMPTY);
  if (empty) {
    console.warn(`  skipped: empty state ("${empty[0]}")`);
    continue;
  }
  await hideTestBanner(page);
  const file = `${ENV}/desktop/light/${slug}.png`;
  mkdirSync(dirname(`${ROOT}/${file}`), { recursive: true });
  await page.screenshot({ path: `${ROOT}/${file}`, animations: 'disabled', caret: 'hide' });
  entries.push({ file, url: page.url(), env: ENV, page: name, state, platform: 'desktop', mode: 'light', ...pngSize(`${ROOT}/${file}`), fullPage: false });
}

await browser.close();
entries.sort((a, b) => a.file.localeCompare(b.file));
writeFileSync(MANIFEST, JSON.stringify(entries, null, 2) + '\n');
console.log(`${entries.length} entries in ${MANIFEST}`);
