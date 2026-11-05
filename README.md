# Utkarsh Kumar — Portfolio

Scroll-driven portfolio for an AI systems engineer, built with **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS v4** and **Framer Motion**.

**Live:** https://utkarshkumar-theta.vercel.app — every push to `main` deploys automatically on Vercel.

## Sections

| # | Section | File |
|---|---------|------|
| – | Cinematic entrance (once per session) | `sections/EntranceScreen.tsx` |
| – | Scroll-scrubbed hero (102 WebP frames) | `sections/Hero.tsx` |
| – | About / identity | `sections/IdentitySection.tsx` |
| 01 | Projects | `sections/ShowcaseSection.tsx` |
| 02 | Experience timeline | `sections/Experience.tsx` |
| 03 | Hackathon achievements + lightbox | `sections/Achievements.tsx`, data in `data/achievements.ts` |
| 04 | Approach | `sections/FeatureCards.tsx` |
| 05 | Skills | `sections/Skills.tsx` |
| 06 | Education | `sections/Education.tsx` |
| 07 | Live GitHub activity | `sections/StatsSection.tsx` |
| 08 | Contact | `sections/Contact.tsx` |

Press **⌘K / Ctrl+K** anywhere for the command palette. Section ids and links live in `lib/sections.ts`.

## Common edits

- **New hackathon result:** drop the photo in `public/achievements/` and add an entry at the top of `ACHIEVEMENTS` in `data/achievements.ts`. Podium and summary counts update automatically.
- **New resume:** replace `public/resume.pdf`.
- **Profile photo:** replace `public/profile.webp` (square, ≥ 400 px).
- **Hero frames:** `public/hero-frames/frame_000.webp … frame_101.webp`. They are served with a one-year immutable cache, so if you re-export them, use new file names and update `FRAME_PATH` in `sections/Hero.tsx`.

## Contact form

The form sends through [Formspree](https://formspree.io) when `NEXT_PUBLIC_FORMSPREE_ID` is set (Vercel → Project → Settings → Environment Variables, value is the ID from `https://formspree.io/f/<ID>`). Without it, the form opens the visitor's email app with the message pre-filled.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```
