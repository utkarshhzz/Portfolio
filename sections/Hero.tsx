"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

// ── Config ─────────────────────────────────────────────
const TOTAL_FRAMES = 102;
const FRAME_PATH   = (n: number) =>
  `/hero-frames/Portfolio_utk_${String(n).padStart(3, "0")}.png`;
const SCRUB_HEIGHT = "260vh";

// SVG social icons (no lucide-react dependency for these brand icons)
const GH = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);
const LI = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const socials = [
  { label: "GitHub",   href: "https://github.com/utkarshrpg",          Icon: GH },
  { label: "LinkedIn", href: "https://linkedin.com/in/utkarsh-kumar",  Icon: LI },
];

// ── Particle canvas ─────────────────────────────────────
function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    const particles: { x: number; y: number; vx: number; vy: number; r: number; a: number; maxA: number }[] = [];
    const resize = () => { canvas.width = innerWidth; canvas.height = innerHeight; };
    resize();
    window.addEventListener("resize", resize, { passive: true });
    for (let i = 0; i < 55; i++) particles.push({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, vx: (Math.random() - .5) * 0.25, vy: -Math.random() * 0.45 - 0.1, r: Math.random() * 1.2 + 0.4, a: 0, maxA: Math.random() * 0.35 + 0.08 });
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.a = Math.min(p.a + 0.003, p.maxA);
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; p.a = 0; }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(196,154,60,${p.a})`; ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 pointer-events-none z-[2]" aria-hidden />;
}

// ── Animated stat counter ───────────────────────────────
function Counter({ to, suffix }: { to: number; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const dur = 1800; const t0 = performance.now();
        const tick = (now: number) => { const p = Math.min((now - t0) / dur, 1); setN(Math.round((1 - Math.pow(1 - p, 3)) * to)); if (p < 1) requestAnimationFrame(tick); };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref} className="tabular-nums">{n}{suffix}</span>;
}

// ── Main Hero ────────────────────────────────────────────
export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const imagesRef    = useRef<HTMLImageElement[]>([]);
  const frameRef     = useRef(0);
  const drawingRef   = useRef(false);
  const [loaded,    setLoaded]    = useState(false);
  const [loadPct,   setLoadPct]   = useState(0);
  const [contentIn, setContentIn] = useState(false);

  // Preload
  useEffect(() => {
    let done = 0;
    const imgs: HTMLImageElement[] = [];
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        done++;
        setLoadPct(Math.round(done / TOTAL_FRAMES * 100));
        if (done === TOTAL_FRAMES) { setLoaded(true); setTimeout(() => setContentIn(true), 200); }
      };
      imgs[i] = img;
    }
    imagesRef.current = imgs;
  }, []);

  // Draw
  const drawFrame = useCallback((idx: number) => {
    if (drawingRef.current) return;
    const canvas = canvasRef.current;
    const img = imagesRef.current[idx];
    if (!canvas || !img?.complete) return;
    drawingRef.current = true;
    requestAnimationFrame(() => {
      const ctx = canvas.getContext("2d"); if (!ctx) { drawingRef.current = false; return; }
      const { width: cw, height: ch } = canvas;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, (cw - img.naturalWidth * scale) / 2, (ch - img.naturalHeight * scale) / 2, img.naturalWidth * scale, img.naturalHeight * scale);
      drawingRef.current = false;
    });
  }, []);

  // Resize
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const resize = () => { canvas.width = innerWidth; canvas.height = innerHeight; drawFrame(frameRef.current); };
    resize();
    window.addEventListener("resize", resize, { passive: true });
    return () => window.removeEventListener("resize", resize);
  }, [drawFrame]);

  // Scroll scrub
  useEffect(() => {
    if (!loaded) return;
    const container = containerRef.current; if (!container) return;
    const onScroll = () => {
      const top = -container.getBoundingClientRect().top;
      const progress = Math.max(0, Math.min(1, top / (container.offsetHeight - innerHeight)));
      const frame = Math.min(TOTAL_FRAMES - 1, Math.round(progress * (TOTAL_FRAMES - 1)));
      if (frame !== frameRef.current) { frameRef.current = frame; drawFrame(frame); }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); drawFrame(0);
    return () => window.removeEventListener("scroll", onScroll);
  }, [loaded, drawFrame]);

  return (
    <section id="hero" ref={containerRef} style={{ height: SCRUB_HEIGHT }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 z-[1]" />

        {/* Particles */}
        <Particles />

        {/* Vignettes */}
        <div className="absolute inset-0 z-[4] pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 70% at 65% 50%, transparent 35%, rgba(8,8,8,0.72) 100%)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-52 z-[5] pointer-events-none"
          style={{ background: "linear-gradient(to top, #080808 0%, transparent 100%)" }} />

        {/* ── CONTENT ───────────────────────────────────── */}
        <div className="absolute inset-0 z-10 flex flex-col">

          {/* UPPER: name + identity block — vertically centered left */}
          <div className="flex-1 flex items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: contentIn ? 1 : 0, y: contentIn ? 0 : 40 }}
              transition={{ duration: 0.9, ease: [0.22,1,0.36,1] }}
              className="px-8 md:px-16 lg:px-24 max-w-xl"
            >
              {/* Status */}
              <div className="mb-6">
                <span className="badge badge-green">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"
                    style={{ animation: "pulse-dot 2s infinite" }} />
                  Available for opportunities
                </span>
              </div>

              {/* Name */}
              <h1 className="display-xl text-gradient mb-3 leading-none">
                Utkarsh<br />Kumar
              </h1>

              {/* Role */}
              <p className="text-gradient-gold text-xl font-semibold mb-2"
                style={{ letterSpacing: "-0.01em" }}>
                AI Systems Engineer
              </p>

              {/* Edu line */}
              <p className="text-sm font-medium mb-5" style={{ color: "var(--text-3)", letterSpacing: "0.04em" }}>
                MIT BANGALORE · IIT GUWAHATI
              </p>

              {/* Bio */}
              <p className="text-[15px] leading-relaxed mb-7 max-w-md" style={{ color: "var(--text-2)" }}>
                I build production-grade AI systems — multi-agent orchestration,
                semantic search at 110M-resume scale, and computer vision pipelines
                that survive the gap between research and reality.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-6">
                <a href="#projects" className="btn-primary"
                  onClick={e => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}>
                  View Projects
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
                </a>
                <a href="/resume.pdf" download="Utkarsh_Kumar_Resume.pdf" className="btn-secondary">
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M16 10l-4 4m0 0l-4-4m4 4V4"/></svg>
                  Resume
                </a>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-4">
                {socials.map(({ label, href, Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs transition-all duration-200 hover:opacity-100"
                    style={{ color: "var(--text-3)" }}>
                    <Icon />
                    {label}
                  </a>
                ))}
                <a href="mailto:utkarsh@example.com"
                  className="text-xs transition-colors duration-200"
                  style={{ color: "var(--text-3)" }}>
                  Email ↗
                </a>
                <a href="https://leetcode.com/utkarshrpg" target="_blank" rel="noopener noreferrer"
                  className="text-xs transition-colors duration-200"
                  style={{ color: "var(--text-3)" }}>
                  LeetCode ↗
                </a>
              </div>
            </motion.div>
          </div>

          {/* LOWER: Stats + scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: contentIn ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="px-8 md:px-16 lg:px-24 pb-10 flex items-end justify-between"
          >
            {/* Stats */}
            <div className="flex gap-10">
              {[
                { to: 110, suffix: "M+", label: "Resumes Searched" },
                { to: 75,  suffix: "K+", label: "Prize Money (₹)" },
                { to: 3,   suffix: "+",  label: "Research Projects" },
              ].map(s => (
                <div key={s.label}>
                  <div className="text-[2rem] font-bold leading-none" style={{ letterSpacing: "-0.04em" }}>
                    <Counter to={s.to} suffix={s.suffix} />
                  </div>
                  <div className="text-[11px] mt-1" style={{ color: "var(--text-3)", letterSpacing: "0.06em" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll cue */}
            <motion.div
              className="flex flex-col items-center gap-1.5"
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <span className="text-[10px] tracking-[0.22em] uppercase" style={{ color: "var(--text-3)" }}>
                Scroll
              </span>
              <div className="w-px h-10" style={{ background: "linear-gradient(to bottom, var(--gold), transparent)", animation: "scroll-line 2s ease-in-out infinite" }} />
            </motion.div>
          </motion.div>
        </div>

        {/* Loading overlay */}
        <AnimatePresence>
          {!loaded && (
            <motion.div
              key="loader"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-5"
              style={{ background: "var(--bg)" }}
            >
              <motion.div
                className="w-14 h-14 rounded-full border-2 border-transparent"
                style={{ borderTopColor: "var(--gold)", borderRightColor: "rgba(196,154,60,0.25)" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 0.85, repeat: Infinity, ease: "linear" }}
              />
              <div className="w-44 h-[1px]" style={{ background: "rgba(255,255,255,0.05)" }}>
                <div className="h-full transition-[width] duration-150"
                  style={{ width: `${loadPct}%`, background: "var(--gold)" }} />
              </div>
              <p className="text-xs tracking-[0.2em] uppercase tabular-nums" style={{ color: "var(--text-3)" }}>
                {loadPct}%
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
