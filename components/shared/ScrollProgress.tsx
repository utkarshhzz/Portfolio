"use client";

import { motion, useScroll, useSpring } from "framer-motion";

// Mobile-only: on desktop the Navbar shows its own progress bar
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left md:hidden"
      aria-hidden="true"
    >
      <div
        className="w-full h-full"
        style={{ background: "linear-gradient(90deg, var(--gold), var(--gold-light))" }}
      />
    </motion.div>
  );
}

