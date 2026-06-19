"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center"
          style={{ background: "#050505" }}
        >
          {/* Logo mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.4 } }}
            exit={{ opacity: 0, scale: 1.1, transition: { duration: 0.4 } }}
            className="flex flex-col items-center gap-6"
          >
            {/* Animated ring */}
            <div className="relative w-16 h-16">
              <div
                className="absolute inset-0 rounded-full border-2"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-transparent"
                style={{
                  borderTopColor: "#3b82f6",
                  borderRightColor: "rgba(59,130,246,0.3)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <div
                className="absolute inset-[6px] rounded-full"
                style={{ background: "rgba(59,130,246,0.08)" }}
              />
            </div>

            {/* Name */}
            <div className="text-center">
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.2, duration: 0.4 },
                }}
                className="text-sm font-medium tracking-[0.2em] uppercase"
                style={{ color: "#a1a1aa" }}
              >
                Utkarsh Kumar
              </motion.p>
            </div>

            {/* Progress bar */}
            <motion.div
              className="w-40 h-[1px] overflow-hidden"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              <motion.div
                className="h-full"
                style={{ background: "#3b82f6" }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
