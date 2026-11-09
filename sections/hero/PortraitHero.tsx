"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import HeroContent from "./HeroContent";

const TOTAL_FRAMES = 102;
// Frames are content-addressed by name: if you re-export them, rename (e.g. frame-v2_000.webp)
// because they are served with a 1-year immutable cache header.
const FRAME_PATH = (n: number) => `/hero-frames/frame_${String(n).padStart(3, "0")}.webp`;

// Taller scrub so the sequence plays out fully before the page scrolls on
const SCRUB_HEIGHT = "300vh";

export default function PortraitHero() {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const imagesRef    = useRef<HTMLImageElement[]>([]);
  const frameRef     = useRef(0);
  const rafRef       = useRef<number | null>(null);
  const [loaded,  setLoaded]  = useState(false);
  const [loadPct, setLoadPct] = useState(0);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  // Draw the *current* frame on the next animation frame (coalesces bursts of scroll events)
  const requestDraw = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const canvas = canvasRef.current;
      const img = imagesRef.current[frameRef.current];
      if (!canvas || !img?.complete || img.naturalWidth === 0) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const { width: cw, height: ch } = canvas;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
    });
  }, []);

  // Preload every frame
  useEffect(() => {
    let done = 0;
    let cancelled = false;
    const tick = () => {
      if (cancelled) return;
      done++;
      setLoadPct(Math.round((done / TOTAL_FRAMES) * 100));
      if (done === TOTAL_FRAMES) setLoaded(true);
    };
    const imgs: HTMLImageElement[] = [];
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        tick();
        if (i === frameRef.current) requestDraw();
      };
      img.onerror = tick;
      img.src = FRAME_PATH(i);
      imgs[i] = img;
    }
    imagesRef.current = imgs;
    return () => { cancelled = true; };
  }, [requestDraw]);

  // Keep the canvas sized to the viewport
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width  = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      requestDraw();
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });
    return () => window.removeEventListener("resize", resize);
  }, [requestDraw]);

  // Map scroll position → frame
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onScroll = () => {
      const total = container.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -container.getBoundingClientRect().top / total));
      const frame = Math.min(TOTAL_FRAMES - 1, Math.round(progress * (TOTAL_FRAMES - 1)));
      if (frame !== frameRef.current) {
        frameRef.current = frame;
        requestDraw();
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    requestDraw();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [loaded, requestDraw]);

  return (
    <section
      id="hero"
      ref={containerRef}
      style={{ height: SCRUB_HEIGHT }}
      className="relative"
      aria-label="Introduction"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-[1] block h-full w-full"
          role="img"
          aria-label="Animated portrait of Utkarsh Kumar"
        />

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-48"
          style={{ background: "linear-gradient(to top, #080808 0%, transparent 100%)" }}
        />

        <HeroContent progress={scrollYProgress} />

        <AnimatePresence>
          {!loaded && (
            <motion.div
              key="loader"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-x-0 bottom-0 z-[4] flex flex-col items-center gap-3 pb-6"
              role="status"
              aria-live="polite"
            >
              <div className="relative h-px w-40 overflow-hidden bg-white/10">
                <div
                  className="h-full transition-[width] duration-150"
                  style={{ width: `${loadPct}%`, background: "var(--gold)" }}
                />
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] tabular-nums text-white/40">
                Loading {loadPct}%
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
