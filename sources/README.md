# Sources

Original material for portfolio projects: where it came from and how it was captured, so screens can be re-exported or re-cropped when the design changes.

Files in this folder are **not deployed**. Only images imported from `src/` end up on the site, and Astro generates the web-sized versions at build time.

## Link SDK v2 (Lean Technologies)

| Source | URL | Notes |
| --- | --- | --- |
| Figma (community file) | https://www.figma.com/design/eJ6wAodx2x8dCCcYmU46s9/Lean-Link-SDK-2.0--UAE----Community--Community-?node-id=1-21024 | Pages: `Desktop (UAE)` 1:21024, `Mobile (UAE)` 1:2. Exported at 2x into `link-sdk-v2/figma/`; node IDs are in `manifest.json`. |
| Cropped dialog | — | `src/assets/projects/link-sdk-dialog.png` is `figma/desktop/light/connect-initial-payments.png` cropped to the dialog (no dark backdrop). |
| Pitch deck "UAE Link SDK v2" | https://pitch.com/v/uae-link-sdk-v2---rain-wdpz5k | Passcode protected (passcode is not stored here). 12 slides captured at 3840×2160 into `link-sdk-v2/pitch/`, with slide text in `slides.json`. The deck's 6 videos (demo, MFA guidance, feature clips) are in `link-sdk-v2/pitch/video/`, named by slide. |

## Dashboard (Lean Technologies)

| Source | URL | Notes |
| --- | --- | --- |
| Live dashboard | https://dashboard.leantech.me/customers?page=1&size=15 | Needs a manual login (credentials are not stored here). Captured from a demo account with fake data, in both workspace modes: `dashboard/test/` and `dashboard/live/`. Files are listed in `dashboard/manifest.json`. |

How the screenshots were captured:

- Playwright Chromium at 1440×1060 (tall enough for a 15-row table with pagination) with deviceScaleFactor 2, so files are 2880×2120.
- Every shot is exactly one viewport. There are no full-page captures.
- Empty states ("No results", "No data available", "You haven't…") are skipped, so `live/` has no payments, payouts, account verification or test-users screens.
- The yellow "You're using Test mode" banner is hidden before each Test shot.
- Secondary states (detail drawers, menus, filters, date picker, create forms) were opened but never submitted. The ⌘K palette is opened over the customers list, and search results use `test` in Test mode (customers and payments) and `helper` in Live (customers only).
- Light mode only, because the dashboard has no dark mode. There's no mobile set either, because at phone width the sidebar disappears and tables are cut off.
- Billing is missing because it errors in Test mode and has no invoices in Live.

To re-capture after a design change:

```bash
node scripts/dashboard-login.mjs test   # log in by hand, switch the workspace to Test, press Enter
node scripts/capture-dashboard.mjs test
node scripts/dashboard-login.mjs live   # same, with the workspace on Live
node scripts/capture-dashboard.mjs live
```

Sessions are saved to `.auth/`, which is gitignored. Logging in to one mode can sign out the other, so capture each mode right after its login. Add `--only=customers-list,payments-detail` to re-shoot specific screens.

## Link SDK Storybook (Lean Technologies)

| Source | URL | Notes |
| --- | --- | --- |
| Storybook | https://ui.leantech.me/ | Public, so no login is needed. Two shots in `storybook/`: an SDK view (ADCB bank priming) with its controls, and the Button docs page. Listed in `storybook/manifest.json`. |

Captured in the Storybook UI with Playwright at 1440×1060, deviceScaleFactor 2 (2880×2120). Re-run with `node scripts/capture-storybook.mjs`. To shoot other stories, edit `SHOTS`; story IDs are in https://ui.leantech.me/index.json.

## Feature flag audit (Lean Technologies)

| Source | URL | Notes |
| --- | --- | --- |
| Claude artifact "Flag Lifecycle Audit" | https://claude.ai/artifact/5weFQpjdZyyWemZY4grhsP | Internal: shared with the Lean org only. Built in the Claude Code chat "Feature flag audit". |

Screenshots were taken by hand (2026-09-22) and supplied as a zip. `src/assets/projects/flag-most-wanted.png` is `05-most-wanted.png` cropped to the poster, with the username ticker and real names blurred. They are stored in `flag-audit/` and listed in `manifest.json` with their original filenames.

## Radio Reads

| Source | URL |
| --- | --- |
| Live site | https://radioreads.fun/ |
| Repo | https://github.com/seb-thomas/scaling-engine |

Radio Reads screenshots in `radio-reads/` (book page, all books, show page, phone home) were captured from https://radioreads.fun/ with Playwright at deviceScaleFactor 2 on 2026-10-21.
