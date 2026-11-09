"use client";

import { motion, transform, useTransform, type MotionValue } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { LINKS, scrollToSection } from "@/lib/sections";
import { PODIUM_COUNT } from "@/data/achievements";

const EASE = [0.22, 1, 0.36, 1] as const;

const CREDENTIALS = [
  "IEEE IGARSS 2026 author",
  `${PODIUM_COUNT} hackathon podiums`,
  "MIT Bengaluru × IIT Guwahati",
];

/**
 * Text layer shared by every hero variant.
 * Phase A (first viewport): who I am + CTAs. Phase B (mid-scroll): positioning quote.
 * `progress` is the hero's 0→1 scroll progress.
 */
/**
 * Function-form transforms on purpose: Framer Motion hands array-form opacity
 * transforms to a native ScrollTimeline, which resolves the target range
 * differently from useScroll and leaves the text visible at the wrong depth.
 */
const map = (input: number[], output: number[]) => (p: number) => transform(p, input, output);

export default function HeroContent({ progress }: { progress: MotionValue<number> }) {
  const aOpacity = useTransform(progress, map([0, 0.16, 0.3], [1, 1, 0]));
  const aY = useTransform(progress, map([0, 0.3], [0, -90]));
  const aEvents = useTransform(progress, (p) => (p < 0.25 ? "auto" : "none"));
  const aVisibility = useTransform(progress, (p) => (p < 0.32 ? "visible" : "hidden"));

  const bOpacity = useTransform(progress, map([0.34, 0.46, 0.68, 0.8], [0, 1, 1, 0]));
  const bY = useTransform(progress, map([0.34, 0.5, 0.8], [60, 0, -60]));
  const bScale = useTransform(progress, map([0.34, 0.8], [0.96, 1.04]));

  return (
    <>
      {/* Legibility scrim: strongest behind the text column */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(to_top,#080808_0%,rgba(8,8,8,0.85)_32%,transparent_70%)] md:bg-[linear-gradient(90deg,rgba(8,8,8,0.92)_0%,rgba(8,8,8,0.6)_38%,transparent_62%)]"
      />

      {/* ── Phase A ── */}
      <motion.div
        style={{ opacity: aOpacity, y: aY, pointerEvents: aEvents, visibility: aVisibility }}
        className="absolute inset-0 z-10 flex items-end md:items-center"
      >
        <div className="mx-auto w-full max-w-7xl px-5 pb-24 md:px-10 md:pb-0">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[rgba(74,222,128,0.25)] bg-[rgba(8,8,8,0.6)] px-3 py-1 text-xs font-medium text-[#86efac] backdrop-blur"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ade80] opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-[#4ade80]" />
              </span>
              Open to SWE / ML roles &amp; internships
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18, ease: EASE }}
              className="mb-3 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.24em] text-[var(--gold)]"
            >
              <span aria-hidden className="h-px w-8 bg-[var(--gold)]" />
              AI Systems Engineer
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.24, ease: EASE }}
              className="mb-5 font-extrabold leading-[0.92] tracking-[-0.045em] text-balance"
              style={{
                fontSize: "clamp(3.1rem, 8.5vw, 7.5rem)",
                background: "linear-gradient(135deg, #F4F1E8 35%, #D9B45A 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Utkarsh Kumar
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.34, ease: EASE }}
              className="mb-8 max-w-xl text-base leading-relaxed text-[var(--text-2)]/85 md:text-lg text-pretty"
            >
              I build production AI: semantic search over <strong className="font-semibold text-[var(--text-1)]">110M+ records</strong>,
              multi-agent LLM systems and real-time computer vision. Tested, monitored and shipped.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.42, ease: EASE }}
              className="mb-9 flex flex-wrap gap-3"
            >
              <button type="button" className="btn-primary" onClick={() => scrollToSection("projects")}>
                View my work <ArrowUpRight size={15} strokeWidth={2.5} />
              </button>
              <a href={LINKS.resume} download="Utkarsh_Kumar_Resume.pdf" className="btn-secondary backdrop-blur">
                <Download size={15} /> Resume
              </a>
              <button
                type="button"
                onClick={() => scrollToSection("contact")}
                className="inline-flex items-center px-3 text-sm font-semibold text-[var(--text-2)] underline-offset-4 hover:text-white hover:underline"
              >
                Get in touch
              </button>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="flex flex-col gap-y-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--text-3)] sm:flex-row sm:flex-wrap sm:gap-x-5"
            >
              {CREDENTIALS.map((c, i) => (
                <li key={c} className="flex items-center gap-5">
                  {i > 0 && <span aria-hidden className="hidden size-1 rounded-full bg-[var(--gold)]/60 sm:block" />}
                  {c}
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      </motion.div>

      {/* ── Phase B ── */}
      <motion.div
        style={{ opacity: bOpacity, y: bY, scale: bScale }}
        className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6"
      >
        <div aria-hidden className="absolute left-1/2 top-1/2 h-[70%] w-[min(1100px,120%)] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(8,8,8,0.82),rgba(8,8,8,0.5)_60%,transparent)]" />
        <blockquote className="relative max-w-4xl text-center">
          <p className="serif-display leading-[1.12] text-[rgba(244,241,232,0.95)]" style={{ fontSize: "clamp(2rem, 5.2vw, 4.4rem)" }}>
            The gap between <em className="text-[var(--gold)]">research and production</em> is where most AI fails.
          </p>
          <p className="mt-6 font-mono text-sm uppercase tracking-[0.3em] text-[var(--text-3)]">I close it.</p>
        </blockquote>
      </motion.div>

      {/* Scroll cue */}
      <motion.button
        type="button"
        onClick={() => scrollToSection("identity")}
        style={{ opacity: aOpacity }}
        initial={{ y: 0 }}
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/45 hover:text-white/80 md:flex"
        aria-label="Scroll to about section"
      >
        Scroll
        <ArrowDown size={14} />
      </motion.button>
    </>
  );
}
