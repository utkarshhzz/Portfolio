# Utkarsh Kumar — Portfolio

Scroll-driven portfolio for an AI systems engineer, built with **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS v4** and **Framer Motion**.

**Live:** https://utkarshkumar-theta.vercel.app — every push to `main` deploys automatically on Vercel.

## Sections

| # | Section | File |
|---|---------|------|
| – | 3D scroll hero (3 variants, see below) | `sections/Hero.tsx`, `sections/hero/*` |
| 00 | About | `sections/IdentitySection.tsx` |
| 01 | Projects | `sections/ShowcaseSection.tsx` |
| 02 | Experience timeline | `sections/Experience.tsx` |
| 03 | Hackathon achievements + lightbox | `sections/Achievements.tsx`, data in `data/achievements.ts` |
| 04 | Approach | `sections/FeatureCards.tsx` |
| 05 | Skills | `sections/Skills.tsx` |
| 06 | Education | `sections/Education.tsx` |
| 07 | Live GitHub activity | `sections/StatsSection.tsx` |
| 08 | Contact | `sections/Contact.tsx` |

Press **⌘K / Ctrl+K** anywhere for the command palette. Section ids and links live in `lib/sections.ts`.

## Hero variants

All three share the same text layer (`sections/hero/HeroContent.tsx`): name, role, credentials and CTAs in the first viewport, then the “research → production” quote mid-scroll.

| Variant | Preview | What it is |
|---------|---------|------------|
| **Neural** (default) | `/` or `/?hero=neural` | WebGL particle field (three.js, lazy-loaded): neural sphere → spiral galaxy → data wave |
| **Depth** | `/?hero=depth` | CSS 3D fly-through of project screenshots, hackathon photos and metrics over a perspective grid |
| **Portrait** | `/?hero=portrait` | Original scroll-scrubbed image sequence (102 WebP frames) |

A switcher pill appears whenever `?hero=` is in the URL. To change the default, edit `DEFAULT_HERO` in `sections/Hero.tsx`.

## Backend

`GET /api/github` (`app/api/github/route.ts`) fetches the GitHub profile and contribution calendar on the server and caches it for an hour, so visitors never hit GitHub rate limits. Optionally set `GITHUB_TOKEN` in Vercel for a higher API limit.

## Common edits

- **New hackathon result:** drop the photo in `public/achievements/` and add an entry at the top of `ACHIEVEMENTS` in `data/achievements.ts`. Podium and summary counts update automatically.
- **New resume:** replace `public/resume.pdf`.
- **Profile photo:** replace `public/profile.webp` (square, ≥ 400 px).
- **Hero frames (Portrait variant):** `public/hero-frames/frame_000.webp … frame_101.webp`. They are served with a one-year immutable cache, so if you re-export them, use new file names and update `FRAME_PATH` in `sections/hero/PortraitHero.tsx`.

## Contact form

The form posts to [Formspree](https://formspree.io) form `mjyyzabe` (set in `sections/Contact.tsx`; override with the `NEXT_PUBLIC_FORMSPREE_ID` env var in Vercel). Submissions arrive at the email registered on Formspree. If a submission fails, the visitor is offered a pre-filled email instead.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```
