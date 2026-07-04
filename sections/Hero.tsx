"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TOTAL_FRAMES = 102;
const FRAME_PATH = (n: number) =>
  `/hero-frames/Portfolio_utk_${String(n).padStart(3, "0")}.png?v=2`;

// Taller scrub so the sequence plays out fully before page scrolls away
const SCRUB_HEIGHT = "350vh";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const imagesRef    = useRef<HTMLImageElement[]>([]);
  const frameRef     = useRef(0);
  const drawPendingRef = useRef(false);
  const [loaded,   setLoaded]   = useState(false);
  const [loadPct,  setLoadPct]  = useState(0);

  // ── Draw frame (cover-fit, debounced via rAF) ────────────────────
  const drawFrame = useCallback((idx: number) => {
    if (drawPendingRef.current) return;
    const canvas = canvasRef.current;
    const img = imagesRef.current[idx];
    if (!canvas || !img?.complete || img.naturalWidth === 0) return;
    drawPendingRef.current = true;
    requestAnimationFrame(() => {
      const ctx = canvas.getContext("2d");
      if (!ctx) { drawPendingRef.current = false; return; }
      const { width: cw, height: ch } = canvas;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const dx = (cw - img.naturalWidth * scale) / 2;
      const dy = (ch - img.naturalHeight * scale) / 2;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, img.naturalWidth * scale, img.naturalHeight * scale);
      drawPendingRef.current = false;
    });
  }, []);

  // ── Preload frames (Optimized for instant load) ──────────────────
  useEffect(() => {
    const imgs: HTMLImageElement[] = [];
    let loadedCount = 0;

    // Load first frame immediately to display the canvas
    const firstImg = new Image();
    firstImg.src = FRAME_PATH(0);
    firstImg.onload = () => {
      imgs[0] = firstImg;
      setLoaded(true); // INSTANT LOAD: Unblock the UI immediately
      drawFrame(0);

      // Sequentially load the rest in the background to save network bandwidth
      // and prevent blocking other critical assets
      let currentLoadIdx = 1;
      const loadNext = () => {
        if (currentLoadIdx >= TOTAL_FRAMES) return;
        const img = new Image();
        const idx = currentLoadIdx; // capture
        img.src = FRAME_PATH(idx);
        img.onload = () => {
          imgs[idx] = img;
          loadedCount++;
          setLoadPct(Math.round((loadedCount / TOTAL_FRAMES) * 100));
          currentLoadIdx++;
          loadNext(); // Load next only after current finishes
        };
        img.onerror = () => {
          currentLoadIdx++;
          loadNext();
        };
      };
      // Start background sequential load
      loadNext();
    };
    
    firstImg.onerror = () => { setLoaded(true); }; // Fail gracefully

    imagesRef.current = imgs;
  }, [drawFrame]);

  // ── Resize canvas to fill viewport ───────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(frameRef.current);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });
    return () => window.removeEventListener("resize", resize);
  }, [drawFrame]);

  // ── Scroll scrub ─────────────────────────────────────────────────
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      // rect.top goes negative as we scroll down; total scroll distance = height - viewport
      const totalScroll = container.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScroll));
      const frame = Math.min(TOTAL_FRAMES - 1, Math.round(progress * (TOTAL_FRAMES - 1)));
      if (frame !== frameRef.current) {
        frameRef.current = frame;
        drawFrame(frame);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Draw initial frame
    drawFrame(0);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [loaded, drawFrame]);

  return (
    /* Tall container — scroll height determines how long the sequence plays */
    <section
      id="hero"
      ref={containerRef}
      style={{ height: SCRUB_HEIGHT }}
      className="relative"
    >
      {/* Sticky viewport fills the screen while user scrolls through container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-black">
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-[1]"
          style={{ display: "block" }}
        />

        {/* Bottom fade into next section */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48 z-[5] pointer-events-none"
          style={{ background: "linear-gradient(to top, #080808 0%, transparent 100%)" }}
        />

        {/* Scroll hint */}
        {loaded && (
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: [0, 0.8, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 2 }}
          >
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">
              Scroll
            </span>
            <motion.div
              className="w-px h-8"
              style={{ background: "linear-gradient(to bottom, rgba(196,154,60,0.7), transparent)" }}
              animate={{ scaleY: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
          </motion.div>
        )}

        {/* Loading overlay */}
        <AnimatePresence>
          {!loaded && (
            <motion.div
              key="loader"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-5 bg-black"
            >
              {/* Spinner */}
              <motion.div
                className="w-10 h-10 rounded-full border-2 border-transparent"
                style={{
                  borderTopColor: "#C49A3C",
                  borderRightColor: "rgba(196,154,60,0.2)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              />
              {/* Progress bar */}
              <div className="w-40 h-px bg-white/5 relative overflow-hidden">
                <div
                  className="h-full transition-all duration-150"
                  style={{ width: `${loadPct}%`, background: "#C49A3C" }}
                />
              </div>
              <p className="text-[10px] tracking-[0.25em] uppercase tabular-nums text-white/30">
                {loadPct}%
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
