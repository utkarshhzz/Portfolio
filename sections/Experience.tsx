"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { CalendarDays } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

interface Role {
  id: string;
  company: string;
  monogram: string;
  role: string;
  period: string;
  type: string;
  accent: string;
  metric: { value: string; label: string };
  highlights: string[];
  tech: string[];
  links?: { label: string; href: string }[];
}

const ROLES: Role[] = [
  {
    id: "provaantech",
    company: "Provaantech",
    monogram: "PT",
    role: "AI / Software Engineering Intern",
    period: "Apr 2026 – Aug 2026",
    type: "Internship",
    accent: "#C49A3C",
    metric: { value: "110M+", label: "records searched, top-10 in < 10 s" },
    highlights: [
      "Gathered requirements with the product team and designed an AI Candidate Discovery Engine that indexes and searches 110M+ records, returning top-10 ranked matches in under 10 seconds.",
      "Architected a hybrid retrieval pipeline (OpenAI embeddings, Azure AI Search, BM25, semantic re-ranking), balancing accuracy, cost and latency.",
      "Wrote unit and integration tests for retrieval and ranking, and integrated GPT-4o-mini to explain candidate fit; iterated through code review with senior engineers.",
    ],
    tech: ["Python", "FastAPI", "Azure AI Search", "OpenAI", "BM25", "PostgreSQL"],
    links: [
      { label: "Code", href: "https://github.com/utkarshhzz/JDeesiee" },
      { label: "Demo", href: "https://youtu.be/85gfMJ7TME0" },
    ],
  },
  {
    id: "avss",
    company: "AVSS Tech",
    monogram: "AV",
    role: "Software Engineering Intern",
    period: "Dec 2025 – Jan 2026",
    type: "Internship",
    accent: "#60a5fa",
    metric: { value: "92%+", label: "recognition accuracy, 35% lower latency" },
    highlights: [
      "Built a real-time face recognition pipeline for enterprise access control with 92%+ accuracy, from requirements through testing and deployment.",
      "Cut inference latency by 35% with adaptive frame batching, frame skipping and hardware-level optimisations.",
      "Designed a modular detection-and-verification pipeline with graceful fallbacks for edge-case inputs, backed by test cases for production reliability.",
    ],
    tech: ["Python", "OpenCV", "PyTorch", "Computer Vision", "Flask"],
  },
  {
    id: "ieee-grss",
    company: "IEEE GRSS · MIT Bengaluru",
    monogram: "GR",
    role: "Researcher",
    period: "Jan 2025",
    type: "Research · IGARSS 2026",
    accent: "#4ade80",
    metric: { value: "R² 0.581", label: "across 210 weather stations" },
    highlights: [
      "Engineered a two-stage hurdle stacking ensemble for rainfall prediction across 210 weather stations using 15 years of NASA POWER reanalysis data.",
      "Reached R² = 0.581, MAE = 2.17 mm and Skill Score = 0.510 with leakage-free chronological cross-validation and out-of-fold meta-learning.",
      "Presented the results for publication at IEEE IGARSS 2026.",
    ],
    tech: ["Python", "XGBoost", "LightGBM", "Scikit-Learn", "NASA POWER"],
    links: [{ label: "Code", href: "https://github.com/utkarshhzz/Rainfall_pattern_analysis" }],
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ExperienceSection() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 60%"] });

  return (
    <section id="experience" className="section-padding">
      <SectionHeading
        index="02"
        eyebrow="Career"
        title="Experience"
        sub="Two engineering internships and a published research project, all shipped against real constraints."
      />

      <ol ref={listRef} className="relative mx-auto flex max-w-5xl flex-col gap-10 md:gap-14">
        {/* Spine */}
        <div aria-hidden className="absolute bottom-2 left-[19px] top-2 w-px overflow-hidden bg-white/[0.06] md:left-[27px]">
          <motion.div className="gradient-line h-full w-full origin-top" style={{ scaleY: scrollYProgress }} />
        </div>

        {ROLES.map((r) => (
          <motion.li
            key={r.id}
            className="relative pl-14 md:pl-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {/* Node */}
            <span
              aria-hidden
              className="absolute left-0 top-1 grid size-10 place-items-center rounded-full border bg-[#0e0e10] font-mono text-[11px] font-bold md:size-14 md:text-sm"
              style={{ borderColor: `${r.accent}55`, color: r.accent, boxShadow: `0 0 0 6px #080808` }}
            >
              {r.monogram}
            </span>

            <article className="grid gap-6 rounded-2xl border border-white/[0.07] bg-[rgba(14,14,16,0.7)] p-6 transition-colors hover:border-white/[0.14] md:p-8 lg:grid-cols-[260px_1fr] lg:gap-10">
              {/* Meta column */}
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-sm font-semibold" style={{ color: r.accent }}>{r.company}</p>
                  <h3 className="mt-1 text-xl font-bold leading-snug text-white md:text-2xl">{r.role}</h3>
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-[var(--text-3)]">
                    <CalendarDays size={13} /> {r.period} · {r.type}
                  </p>
                </div>
                <div className="rounded-xl p-4" style={{ background: `${r.accent}0d`, border: `1px solid ${r.accent}26` }}>
                  <p className="text-2xl font-extrabold tracking-tight tabular-nums" style={{ color: r.accent }}>
                    {r.metric.value}
                  </p>
                  <p className="mt-0.5 text-xs leading-snug text-[var(--text-3)]">{r.metric.label}</p>
                </div>
                {r.links && (
                  <div className="flex gap-3 text-xs font-semibold">
                    {r.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--text-2)] underline-offset-4 hover:text-[var(--gold)] hover:underline"
                      >
                        {l.label} ↗
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Detail column */}
              <div className="flex flex-col gap-5">
                <ul className="space-y-3">
                  {r.highlights.map((h) => (
                    <li key={h} className="relative pl-5 text-sm leading-relaxed text-[var(--text-2)]/85 md:text-[15px]">
                      <span aria-hidden className="absolute left-0 top-[0.6em] size-1.5 rounded-full" style={{ background: r.accent }} />
                      {h}
                    </li>
                  ))}
                </ul>
                <ul className="mt-auto flex flex-wrap gap-1.5" aria-label="Tech used">
                  {r.tech.map((t) => (
                    <li key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-[var(--text-3)]">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
