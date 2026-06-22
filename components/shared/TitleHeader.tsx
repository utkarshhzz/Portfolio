"use client";

import { motion } from "framer-motion";

interface Props {
  title: string;
  sub?: string;
  align?: "left" | "center";
}

export default function TitleHeader({ title, sub, align = "center" }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={align === "center" ? "text-center" : ""}
    >
      {sub && (
        <p className="eyebrow mb-3" style={{ color: "var(--gold)" }}>{sub}</p>
      )}
      <h2
        className="display-md"
        style={{
          color: "var(--text-1)",
          letterSpacing: "-0.025em",
          maxWidth: align === "center" ? "700px" : undefined,
          margin: align === "center" ? "0 auto" : undefined,
        }}
      >
        {title}
      </h2>
      <div
        className="section-divider mt-5"
        style={{ margin: align === "center" ? "1.25rem auto 0" : "1.25rem 0 0" }}
      />
    </motion.div>
  );
}
