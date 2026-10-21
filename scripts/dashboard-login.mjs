// Opens a visible Chromium on the Lean dashboard so you can log in by hand,
// then saves the session to .auth/dashboard-<env>.json for capture-dashboard.mjs.
// Test and Live need separate logins: switch the workspace mode in the window
// before saving.
//
// Usage: node scripts/dashboard-login.mjs [test|live]
// Log in, then press Enter in this terminal (or create .auth/.ready).
import { chromium } from 'playwright';
import { existsSync, mkdirSync, rmSync } from 'node:fs';

const URL = 'https://dashboard.leantech.me/customers?page=1&size=15';
const STATE = `.auth/dashboard-${process.argv[2] ?? 'test'}.json`;
const READY = '.auth/.ready';

mkdirSync('.auth', { recursive: true });
rmSync(READY, { force: true });

const browser = await chromium.launch({ headless: false });
const context = await browser.newContext({ viewport: { width: 1440, height: 1060 } });
const page = await context.newPage();
await page.goto(URL);

console.log('WAITING: log in in the Chromium window, then press Enter here.');
await new Promise((resolve) => {
  process.stdin.once('data', resolve);
  const timer = setInterval(() => {
    if (existsSync(READY)) {
      clearInterval(timer);
      resolve();
    }
  }, 1000);
});

await context.storageState({ path: STATE });
rmSync(READY, { force: true });
console.log(`SAVED: ${STATE} (current page: ${page.url()})`);
await browser.close();
process.exit(0);
