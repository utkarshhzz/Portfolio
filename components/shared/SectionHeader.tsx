"use client";

import { motion } from "framer-motion";

interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export default function SectionHeader({ eyebrow, title, description, className = "", align = "left" }: Props) {
  const center = align === "center";
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: [0.22,1,0.36,1] }}
      className={`mb-14 ${center ? "text-center" : ""} ${className}`}
    >
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="display-md text-gradient mb-4">{title}</h2>
      {description && (
        <p className="text-[15px] leading-relaxed max-w-2xl" style={{ color: "var(--text-2)", ...(center ? { marginLeft: "auto", marginRight: "auto" } : {}) }}>
          {description}
        </p>
      )}
      <div className={`section-divider mt-5 ${center ? "mx-auto" : ""}`} />
    </motion.div>
  );
}
