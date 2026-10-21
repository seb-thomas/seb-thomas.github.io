import type { ImageMetadata } from 'astro';
import radioReads from '../assets/projects/radio-reads.png';
import sdkDialog from '../assets/projects/link-sdk-dialog.png';
import sdkSelectBank from '../../sources/link-sdk-v2/figma/mobile/light/connect-select-bank.png';
import sdkOtp from '../../sources/link-sdk-v2/figma/mobile/light/connect-mfa-otp.png';
import sdkPayDark from '../../sources/link-sdk-v2/figma/mobile/dark/pay-confirm.png';
import sdkStoryView from '../../sources/storybook/bank-priming-adcb.png';
import flagOverview from '../../sources/flag-audit/overview.png';
import dashPayments from '../../sources/dashboard/test/desktop/light/payments-date-range.png';
import dashPalette from '../../sources/dashboard/test/desktop/light/customers-search-palette.png';
import dashCustomer from '../../sources/dashboard/test/desktop/light/customers-detail.png';

export const site = {
  firstName: 'Sebastian',
  lastName: 'Thomas',
  title: 'Web developer',
  email: 'sebastianjthomas@gmail.com',
  intro:
    'I’m an engineering manager in London. For the last six years I’ve been at Lean Technologies, working on the SDK and dashboard people use to connect their bank and pay across MENA.',
  introNote: 'This is where I put things I’m working on — some from my day job, some just ideas I wanted to try.',
  roles: ['Web developer', 'Engineering leader', 'Design-curious'],
  links: [
    { label: 'GitHub', href: 'https://github.com/seb-thomas' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sebastian-thomas-96583826/' },
  ],
};

type Shot = { src: ImageMetadata; alt: string };

export interface Project {
  title: string;
  year: string;
  role: string;
  stack: string[];
  description: string;
  /** Background colour of the panel behind the screenshots. */
  panel: string;
  /** `feature` projects get a full-width panel; `small` ones sit two to a row. */
  size: 'feature' | 'small';
  /** How the screenshots are arranged in the panel. */
  layout: 'dialog-and-phones' | 'main-and-side' | 'single';
  shots: Shot[];
  href?: string;
  repo?: string;
}

export const projects: Project[] = [
  {
    title: 'Link SDK 2.0',
    year: '2025',
    role: 'Lead engineer',
    stack: ['TypeScript', 'React', 'Radix UI', 'Storybook'],
    description:
      'A rebuild of the flow people use to connect their bank and pay inside other apps. A small team, a new component library and a slow rollout behind feature flags.',
    panel: '#DDE2FB',
    size: 'feature',
    layout: 'dialog-and-phones',
    href: '/work/link-sdk/',
    shots: [
      { src: sdkDialog, alt: 'Link SDK “Let’s connect your account” dialog on desktop' },
      { src: sdkOtp, alt: 'Mobile: enter the one-time passcode' },
      { src: sdkPayDark, alt: 'Mobile: confirm payment in dark mode' },
    ],
  },
  {
    title: 'Lean Dashboard',
    year: '2026',
    role: 'Engineering manager',
    stack: ['React', 'React Query', 'Data tables'],
    description:
      'Where Lean’s clients run their integration: customers, payments, logs and bank connections, all one ⌘K away. I managed the team that built it, and wrote some of the frontend.',
    panel: '#E4E7DA',
    size: 'feature',
    layout: 'main-and-side',
    href: 'https://dashboard.leantech.me/',
    shots: [
      { src: dashPayments, alt: 'Payments page with volume charts and the date range picker open' },
      { src: dashPalette, alt: '⌘K search palette open over the customers page' },
      { src: dashCustomer, alt: 'Customer details drawer open beside the customers table' },
    ],
  },
  {
    title: 'Radio Reads',
    year: '2026',
    role: 'Side project',
    stack: ['Django', 'Claude API', 'Astro'],
    description:
      'Every book discussed on BBC Radio 4 and NPR, found by a daily pipeline and Claude, then checked against Google Books.',
    panel: '#CEC6F6',
    size: 'small',
    layout: 'single',
    href: 'https://radioreads.fun/',
    repo: 'https://github.com/seb-thomas/scaling-engine',
    shots: [{ src: radioReads, alt: 'Radio Reads homepage showing this week’s books on air' }],
  },
  {
    title: 'Feature flag audit',
    year: '2026',
    role: 'Vibe-coded',
    stack: ['Claude Code', 'GrowthBook'],
    description:
      'A small tool I vibe-coded with Claude Code to find dead GrowthBook flags across 126 repos, and write the prompts to clean them up.',
    panel: '#EEF3D0',
    size: 'small',
    layout: 'single',
    shots: [{ src: flagOverview, alt: 'Flag audit overview: 188 flags sorted into cleanup, review and active' }],
  },
];

export const about = {
  heading: 'Fifteen years of building for the web.',
  paragraphs: [
    'I studied interaction design, then spent about ten years as a frontend developer for agencies and clients like Adidas, Square Enix and the Home Office.',
    'I joined Lean in 2020 to build its first JavaScript SDK. Now I manage the team behind its customer platform and SDKs, and still write code. Lately I’m curious about how AI changes who gets to build interfaces — and I’m designing more than I used to.',
  ],
  focus: [
    { title: 'Frontend architecture', text: 'React, TypeScript, React Query, design systems and component libraries in Storybook.' },
    { title: 'Shipping safely', text: 'Phased rollouts, feature flags, CI/CD with GitHub Actions, Vite and Vitest.' },
    { title: 'Knowing what’s happening', text: 'Observability with Sentry and Grafana, service-level indicators, alerting and incident reviews.' },
    { title: 'Teams', text: 'Coaching, hiring, and running Lean’s frontend guild.' },
  ],
};

export const approach = [
  { title: 'Ask better questions.', text: 'Understand the people, the problem and the possibilities before choosing a direction.' },
  { title: 'Make the idea real.', text: 'Move between sketches, prototypes and code. Learn by putting something in front of people.' },
  { title: 'Keep iterating.', text: 'Ship small, watch what happens, adjust. Flags and good monitoring are what make that safe.' },
];

export const linkSdk = {
  storybook: { src: sdkStoryView, alt: 'Storybook showing the ADCB bank priming view with its controls' } as Shot,
  phones: [
    { src: sdkSelectBank, alt: 'Mobile: select your bank' },
    { src: sdkOtp, alt: 'Mobile: enter the one-time passcode' },
    { src: sdkPayDark, alt: 'Mobile: confirm payment in dark mode' },
  ] as Shot[],
};
