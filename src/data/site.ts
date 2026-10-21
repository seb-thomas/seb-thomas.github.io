import type { ImageMetadata } from 'astro';
import radioReads from '../assets/projects/radio-reads.png';
import linkSdk from '../../sources/link-sdk-v2/figma/desktop/light/connect-initial-payments.png';
import dashPayments from '../../sources/dashboard/test/desktop/light/payments-date-range.png';
import dashPaymentMenu from '../../sources/dashboard/test/desktop/light/payments-row-menu.png';
import dashCustomers from '../../sources/dashboard/test/desktop/light/customers-list.png';
import dashCustomer from '../../sources/dashboard/test/desktop/light/customers-detail.png';
import dashPalette from '../../sources/dashboard/test/desktop/light/customers-search-palette.png';
import dashSearch from '../../sources/dashboard/test/desktop/light/search-results.png';
import dashLogs from '../../sources/dashboard/test/desktop/light/logs-list.png';
import dashBanks from '../../sources/dashboard/test/desktop/light/bank-connections-default.png';
import dashAccounts from '../../sources/dashboard/live/desktop/light/your-accounts-list.png';
import dashWorkspaces from '../../sources/dashboard/live/desktop/light/customers-workspace-menu.png';

export const site = {
  name: 'Seb Thomas',
  role: 'Designer & developer',
  intro:
    'I build thoughtful digital products. This is a placeholder intro — replace it with a sentence or two about what you do.',
  links: [
    { label: 'GitHub', href: 'https://github.com/seb-thomas' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sebastian-thomas-96583826/' },
  ],
};

export interface Project {
  title: string;
  year: string;
  description: string;
  tags: string[];
  href?: string;
  repo?: string;
  image?: { src: ImageMetadata; alt: string };
  gallery?: { src: ImageMetadata; alt: string }[];
}

export const projects: Project[] = [
  {
    title: 'Lean Dashboard',
    year: '2026',
    description:
      'The dashboard Lean’s clients use to run their open banking integration: customers, payments and payouts, account verification, developer tools like logs, webhooks and test users, and bank connections, all reachable from a ⌘K search.',
    tags: ['Product design', 'Dashboard', 'Data tables', 'Search'],
    href: 'https://dashboard.leantech.me/',
    image: { src: dashPayments, alt: 'Payments page with volume charts and the date range picker open' },
    gallery: [
      { src: dashCustomers, alt: 'Customers table with pagination' },
      { src: dashCustomer, alt: 'Customer details drawer open beside the customers table' },
      { src: dashPalette, alt: '⌘K search palette open over the customers page' },
      { src: dashSearch, alt: 'Search results for “test” grouped into customers and payments' },
      { src: dashPaymentMenu, alt: 'Payment row actions menu' },
      { src: dashLogs, alt: 'API logs with request charts and status table' },
      { src: dashBanks, alt: 'Bank connections settings with per-bank toggles' },
      { src: dashAccounts, alt: 'Your accounts page listing connected bank accounts' },
      { src: dashWorkspaces, alt: 'Workspace menu for switching between Test, Pre-live and Live' },
    ],
  },
  {
    title: 'Link SDK 2.0',
    year: '2025',
    description:
      'Lead engineer on the rebuild of Lean’s Link SDK, the embedded flow people use to connect their bank and pay inside other apps. We moved it to a TypeScript component library on Radix UI and Storybook, drove each bank’s MFA steps from a state machine, and shipped it over the air in phases behind feature flags, watched by Sentry. Connect conversion rose 15% and payment success went from 75% to 89%.',
    tags: ['TypeScript', 'Radix UI', 'Storybook', 'State machines', 'Feature flags', 'Sentry'],
    href: 'https://www.figma.com/design/eJ6wAodx2x8dCCcYmU46s9/Lean-Link-SDK-2.0--UAE----Community--Community-?node-id=1-21024',
    image: { src: linkSdk, alt: 'Link SDK “Let’s connect your account” screen on desktop' },
  },
  {
    title: 'Radio Reads',
    year: '2026',
    description:
      'A searchable archive of books discussed on BBC Radio 4 and NPR. A daily pipeline scrapes new episodes, uses Claude to pull out the books being talked about, verifies them against Google Books, then publishes each one with a link to its programme.',
    tags: ['Django', 'Celery', 'PostgreSQL', 'Scrapy', 'Claude API', 'Astro', 'Tailwind', 'Docker'],
    href: 'https://radioreads.fun/',
    repo: 'https://github.com/seb-thomas/scaling-engine',
    image: { src: radioReads, alt: 'Radio Reads homepage showing this week’s books on air' },
  },
  {
    title: 'Project one',
    year: '2026',
    description: 'A short summary of the project, the problem it solved and your role.',
    tags: ['Product design', 'Astro'],
    href: '#',
  },
  {
    title: 'Project two',
    year: '2025',
    description: 'Another project. Edit or remove these in src/data/site.ts.',
    tags: ['Frontend', 'TypeScript'],
    href: '#',
  },
  {
    title: 'Project three',
    year: '2024',
    description: 'A third example entry to show the layout.',
    tags: ['Research'],
  },
];
