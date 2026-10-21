# Portfolio: notes for Claude

Astro site, deployed to GitHub Pages from `main`. Copy lives in `src/data/site.ts`; project pages are in `src/pages/work/` and share `src/layouts/Case.astro` and `src/styles/case.css`.

## Copy rules

- No em dashes, anywhere: copy, alt text, page titles. Use a full stop, comma, colon or "·" instead.
- No AI-sounding copy. Avoid slogans, punchy fragments, stock phrases ("take it on trust", "the moment of trust"), salesy framing and invented claims.
- This is a personal portfolio, not a set of case studies. Write plainly about what Sebastian made and what he's interested in. Keep metrics on the project pages, not the home page.
- Be accurate about roles. He was lead engineer on the Link SDK and engineering manager (and wrote some of the frontend) on the Lean Dashboard. He doesn't call himself a designer; the title is "Web developer".
- Say MENA, not "the Gulf".
- Don't name or show colleagues on public pages. Blur real names in screenshots.

## Before pushing

- Run `npm run build` and check the pages at desktop and phone widths, light and dark mode, including below the fold.
- The home page's name lockup and the two intro paragraphs should fit on the first screen, with the roles strip starting just below it.
