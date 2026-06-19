"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onDone: () => void;
}

const QUOTE_LINES = [
  { text: "The gap between",           italic: false },
  { text: "research and production",   italic: true  },
  { text: "is where most AI fails.",   italic: false },
];

export default function EntranceScreen({ onDone }: Props) {
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");

  const dismiss = useCallback(() => {
    if (phase === "out") return;
    setPhase("out");

    // Ensure page starts at the very top when hero is revealed
    document.body.style.overflow = "";
    window.scrollTo({ top: 0, behavior: "instant" });

    setTimeout(onDone, 850);
  }, [phase, onDone]);

  // Lock body scroll while entrance is visible
  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.scrollTo({ top: 0, behavior: "instant" });

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Auto-dismiss timeline: "in" → "hold" → "out"
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 500);
    const t2 = setTimeout(() => dismiss(), 3800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []); // eslint-disable-line

  // Click or any key to skip
  useEffect(() => {
    const skip = (e: Event) => {
      // Ignore the initial click that may have navigated to the page
      e.stopPropagation();
      dismiss();
    };
    window.addEventListener("click",   skip, { once: true });
    window.addEventListener("keydown", skip, { once: true });
    return () => {
      window.removeEventListener("click",   skip);
      window.removeEventListener("keydown", skip);
    };
  }, [dismiss]);

  return (
    <AnimatePresence>
      {phase !== "out" && (
        <motion.div
          key="entrance"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none"
          style={{ background: "#000" }}
        >
          {/* Noise texture */}
          <div
            className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "200px",
            }}
          />

          {/* Content */}
          <div className="text-center px-6 max-w-2xl z-10">
            <motion.p
              className="mb-5 text-[11px] tracking-[0.35em] uppercase"
              style={{ color: "rgba(196,154,60,0.45)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "hold" ? 1 : 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Utkarsh Kumar
            </motion.p>

            <div
              className="serif-display leading-[1.18]"
              style={{ fontSize: "clamp(1.75rem, 4.5vw, 3.25rem)" }}
            >
              {QUOTE_LINES.map((line, i) => (
                <motion.span
                  key={i}
                  className="block"
                  style={{
                    color: line.italic
                      ? "var(--gold)"
                      : "rgba(239,239,234,0.90)",
                  }}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{
                    opacity: phase === "hold" ? 1 : 0,
                    y:       phase === "hold" ? 0  : 24,
                  }}
                  transition={{
                    duration: 0.78,
                    delay:    0.08 + i * 0.20,
                    ease:     [0.22, 1, 0.36, 1],
                  }}
                >
                  {line.italic ? <em>{line.text}</em> : line.text}
                </motion.span>
              ))}
            </div>

            <motion.p
              className="mt-6 text-sm font-medium tracking-wide"
              style={{ color: "rgba(68,68,64,0.7)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "hold" ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              I close it.
            </motion.p>
          </div>

          {/* Gold sweep line at bottom */}
          <motion.div
            className="absolute bottom-0 left-0 h-[1px]"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--gold), transparent)",
            }}
            initial={{ width: "0%" }}
            animate={{ width: phase === "hold" ? "100%" : "0%" }}
            transition={{ duration: 2.8, ease: "easeInOut", delay: 0.5 }}
          />

          {/* Skip hint */}
          <motion.p
            className="absolute bottom-6 right-6 text-[10px] tracking-[0.18em] uppercase"
            style={{ color: "rgba(68,68,64,0.45)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            Click to skip
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
