"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, transform, useScroll, useTransform, type MotionValue } from "framer-motion";
import HeroContent from "./HeroContent";

/** Distance (px) the camera travels through the scene over the whole hero. */
const TRAVEL = 5600;

type Item =
  | { kind: "img"; src: string; alt: string; w: number; h: number; x: number; y: number; z: number; caption?: string }
  | { kind: "stat"; value: string; label: string; x: number; y: number; z: number };

// x / y in vw / vh from centre, z in px (negative = further away).
// Early items stay right of centre so the intro text on the left stays readable.
const ITEMS: Item[] = [
  { kind: "img", src: "/project1.png", alt: "AI Candidate Discovery Engine", caption: "Candidate Discovery Engine", w: 420, h: 262, x: 22, y: -8, z: -900 },
  { kind: "stat", value: "110M+", label: "records searched", x: 34, y: 22, z: -1300 },
  { kind: "img", src: "/achievements/agentops-26.jpg", alt: "AgentOps '26 trophy", caption: "AgentOps '26 · 1st Runner-Up", w: 220, h: 360, x: 38, y: -20, z: -1700 },
  { kind: "img", src: "/project2.png", alt: "CrowdWisdom.AI", caption: "CrowdWisdom.AI", w: 380, h: 300, x: -30, y: 14, z: -2300 },
  { kind: "stat", value: "R² 0.581", label: "IGARSS 2026 research", x: 26, y: 20, z: -2600 },
  { kind: "img", src: "/achievements/Ignisia_3rd.jpg", alt: "Ignisia prize ceremony", caption: "Ignisia · 2nd Runner-Up", w: 400, h: 266, x: 30, y: -16, z: -3000 },
  { kind: "img", src: "/project3.png", alt: "SmurfPakad", caption: "SmurfPakad · GNN fraud detection", w: 360, h: 282, x: -32, y: -18, z: -3400 },
  { kind: "stat", value: "₹1.5L+", label: "hackathon prize money", x: -24, y: 24, z: -3700 },
  { kind: "img", src: "/achievements/hackverse-2.jpg", alt: "HackVerse 2.0 stage", caption: "HackVerse 2.0 · 2nd Prize", w: 420, h: 237, x: 28, y: 16, z: -4100 },
  { kind: "img", src: "/project4.png", alt: "Medical AI Assistant", caption: "Medical AI Assistant", w: 400, h: 193, x: -26, y: -12, z: -4500 },
  { kind: "stat", value: "92%+", label: "real-time CV accuracy", x: 30, y: -22, z: -4800 },
  { kind: "img", src: "/achievements/lovelace_3rd.jpg", alt: "Lovelace podium", caption: "Lovelace · Turinger 2026", w: 260, h: 346, x: -34, y: 4, z: -5200 },
  { kind: "img", src: "/project5.png", alt: "PII Redaction Microservice", caption: "PII Redaction · Azure AKS", w: 420, h: 175, x: 14, y: 2, z: -5900 },
];

function FloatingItem({ item, travel }: { item: Item; travel: MotionValue<number> }) {
  const z = useTransform(travel, (t) => item.z + t);
  // Fade in from the fog, fade out just before passing the camera
  const opacity = useTransform(z, (v) => transform(v, [-4200, -2600, 250, 700], [0, 1, 1, 0]));
  const blur = useTransform(z, (v) => `blur(${transform(v, [-4200, -2400], [6, 0])}px)`);

  const pos = { left: "50%", top: "50%", x: `calc(${item.x}vw - 50%)`, y: `calc(${item.y}vh - 50%)` } as const;

  if (item.kind === "stat") {
    return (
      <motion.div className="absolute" style={{ ...pos, z, opacity, filter: blur }}>
        <div className="whitespace-nowrap rounded-2xl border border-[var(--gold-border)] bg-[rgba(12,12,14,0.75)] px-6 py-4 shadow-[0_20px_60px_-20px_rgba(196,154,60,0.35)] backdrop-blur">
          <p className="text-4xl font-extrabold tracking-tight text-[var(--gold)]">{item.value}</p>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-3)]">{item.label}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.figure className="absolute" style={{ ...pos, z, opacity, filter: blur, width: item.w }}>
      <div
        className="relative overflow-hidden rounded-xl border border-white/10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]"
        style={{ height: item.h }}
      >
        <Image src={item.src} alt={item.alt} fill sizes={`${item.w}px`} className="object-cover" />
      </div>
      {item.caption && (
        <figcaption className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/55">{item.caption}</figcaption>
      )}
    </motion.figure>
  );
}

export default function DepthHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const travel = useTransform(scrollYProgress, [0, 1], [0, TRAVEL]);
  const floorY = useTransform(scrollYProgress, (p) => `${p * 2400}px`);
  // Function form: keeps this in JS instead of a native ScrollTimeline (see HeroContent)
  const floorOpacity = useTransform(scrollYProgress, (p) => transform(p, [0, 0.85, 1], [0.9, 0.9, 0]));

  return (
    <section id="hero" ref={ref} className="relative h-[300vh]" aria-label="Introduction">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-[#080808]" style={{ perspective: "900px" }}>
        {/* Horizon glow */}
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(70%_45%_at_50%_58%,rgba(196,154,60,0.14),transparent_70%)]" />

        {/* Perspective grid floor */}
        <motion.div
          aria-hidden
          className="absolute left-1/2 top-[58%] h-[160vh] w-[260vw] -translate-x-1/2 origin-top"
          style={{
            opacity: floorOpacity,
            rotateX: 76,
            backgroundImage:
              "linear-gradient(rgba(196,154,60,0.28) 1px, transparent 1px), linear-gradient(90deg, rgba(196,154,60,0.28) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            backgroundPositionY: floorY,
            maskImage: "linear-gradient(to bottom, transparent 0%, #000 25%, #000 60%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, #000 25%, #000 60%, transparent 100%)",
          }}
        />

        {/* Scene */}
        <div aria-hidden className="absolute inset-0 z-[1]" style={{ transformStyle: "preserve-3d" }}>
          {ITEMS.map((item, i) => (
            <FloatingItem key={i} item={item} travel={travel} />
          ))}
        </div>

        <HeroContent progress={scrollYProgress} />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-32 bg-gradient-to-t from-[#080808] to-transparent" />
      </div>
    </section>
  );
}
