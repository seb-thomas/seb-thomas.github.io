# seb-thomas.github.io

Personal portfolio built with [Astro](https://astro.build) and deployed to GitHub Pages.

Live at: https://seb-thomas.github.io/

## Develop

```sh
npm install
npm run dev      # http://localhost:4321/
npm run build    # outputs to dist/
npm run preview
```

Requires Node 22.22+.

## Editing content

Name, intro, roles, projects, About and Approach copy live in `src/data/site.ts`. The home page is `src/pages/index.astro`; project pages live in `src/pages/work/` and share `src/styles/case.css`.

## Deployment

Every push to `main` builds and deploys via `.github/workflows/deploy.yml`.

One-time setup: in the repo go to **Settings → Pages** and set **Source** to **GitHub Actions**.

### Custom domain

Add a `public/CNAME` file containing the domain, then in `astro.config.mjs` set `site` to `https://your-domain`.
