import type { ImageMetadata } from 'astro';
import radioReads from '../assets/projects/radio-reads.png';
import linkSdk from '../../sources/link-sdk-v2/figma/desktop/light/connect-initial-payments.png';

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
}

export const projects: Project[] = [
  {
    title: 'Link SDK 2.0',
    year: '2025',
    description:
      'A redesign of Lean’s Link SDK, the flow people use to connect their bank and make payments inside other apps. Clearer MFA guidance, rewritten copy, dark mode and layouts that adapt from mobile to desktop, rolled out over the air with feature flags.',
    tags: ['Product design', 'Design system', 'Mobile', 'Dark mode'],
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
