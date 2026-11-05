"use client";

import { motion } from "framer-motion";

interface Props {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  className?: string;
}

/** Numbered section heading used by every content section. */
export default function SectionHeading({ index, eyebrow, title, sub, className = "" }: Props) {
  return (
    <motion.header
      className={`flex flex-col items-center text-center mb-14 md:mb-16 ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="section-eyebrow mb-5">
        <span className="text-[var(--gold)]">{index}</span>
        <span aria-hidden className="h-px w-8 bg-[var(--gold-border)]" />
        <span>{eyebrow}</span>
      </p>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
        {title}
      </h2>
      {sub && (
        <p className="mt-4 max-w-xl text-sm md:text-base leading-relaxed text-pretty text-[var(--text-3)]">
          {sub}
        </p>
      )}
    </motion.header>
  );
}
