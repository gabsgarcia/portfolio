# Gabi Garcia · Portfolio

Personal portfolio in Next.js, in Portuguese (`/`) and English (`/en`).

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

## Add a project

1. Open `content/projects.ts` and copy an entry.
2. Fill both languages (`pt` and `en`), the stack and the links.
3. Pick a cover in `components/Cover.tsx`, or add a new one (a drawn sketch, or swap it for a real screenshot in `public/`).
4. Add `caseStudy` if the project deserves its own page (`/projetos/<slug>` and `/en/projects/<slug>`).

All text that isn't about a project lives in `lib/i18n.ts`.

## Design

Colors, fonts and components follow the "Gabi Garcia" design system: paper background, violet brand, peach blocks, one coral accent, Archivo + DM Sans + JetBrains Mono. Tokens are at the top of `app/globals.css`, with a dark theme that follows the visitor's system setting.

## Deploy

Import the repository in Vercel (no environment variables needed). Every push to `main` goes to production; every branch gets a preview link. The site lives at https://portfolio-gabigarcia.vercel.app. If it moves to a custom domain, set `NEXT_PUBLIC_SITE_URL` in Vercel (or change the default in `lib/meta.ts`).
