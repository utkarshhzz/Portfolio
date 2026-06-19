# Utkarsh Kumar — Portfolio

A cinematic, scroll-driven AI engineer portfolio built with **Next.js 15**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**.

**Live:** [Coming soon on Vercel]

---

## Stack

| Layer      | Technology |
|------------|-----------|
| Framework  | Next.js 15 (App Router) |
| Language   | TypeScript |
| Styling    | Tailwind CSS v4 + Custom CSS Variables |
| Animation  | Framer Motion |
| Deployment | Vercel |

## Features

- **Cinematic entrance screen** — Playfair Display serif quote, auto-dismisses
- **Scroll-driven hero** — 102-frame PNG sequence mapped to `scrollY`
- **3D Experience timeline** — CSS perspective + scroll-triggered card unfold
- **Project spotlight cards** — Mouse-tracking radial glow, hover expand
- **Pure tag skills** — No ratings or bars, organized by category including DSA
- **Testimonials section** — Placeholder cards for internship feedback
- **Command palette** — `⌘K` / `Ctrl+K` to navigate

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Hero Frames

The scroll-driven hero animation requires 102 PNG frames in `public/hero-frames/`.  
These are **not included in the repo** (57 MB total) due to GitHub's size limits.

**To set up locally:**
1. Add your frames as `Portfolio_utk_000.png` → `Portfolio_utk_101.png` in `public/hero-frames/`
2. Or use Git LFS: `git lfs track "public/hero-frames/*.png"`

**For Vercel deployment**, upload frames to a CDN and update `FRAME_PATH` in `sections/Hero.tsx`.

## Deployment

```bash
npm run build  # verify 0 errors
vercel --prod  # deploy
```

## License

MIT
