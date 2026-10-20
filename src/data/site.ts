import type { ImageMetadata } from 'astro';
import radioReads from '../assets/projects/radio-reads.png';

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
