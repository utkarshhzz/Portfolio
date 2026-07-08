"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const EXPERIENCES = [
  {
    id: 1,
    company: "Provaantech (Olumio)",
    role: "AI / Software Engineering Intern",
    period: "Apr 2026 – Sep 2026",
    type: "Internship",
    logo: "/exp1.png",
    tech: ["OpenAI", "Azure AI Search", "FastAPI", "PostgreSQL"],
    highlights: [
      "Architected an AI Candidate Discovery Engine operating over a corpus of 110M+ resumes",
      "Achieved top-10 candidate retrieval in under 10 seconds using Azure AI Search + vector indexing",
      "Integrated OpenAI Embeddings for semantic resume-to-job-description matching",
      "Built GPT-powered explanation layer that generates natural-language match rationales per candidate",
      "Optimized vector retrieval pipelines to reduce enterprise search time by 80% while significantly minimizing API costs",
    ],
  },
  {
    id: 2,
    company: "AVSS Tech",
    role: "Software Engineering Intern",
    period: "Dec 2025 – Jan 2026",
    type: "Internship",
    logo: "/exp2.png",
    tech: ["Python", "OpenCV", "Computer Vision", "Flask"],
    highlights: [
      "Built an internal microservice for facial recognition and attendance logging",
      "Achieved real-time detection with 89% accuracy on live camera feeds",
      "Optimized inference pipeline for edge GPU deployment, reducing latency by 40%",
    ],
  },
  {
    id: 3,
    company: "IEEE GRSS Research",
    role: "ML Research Intern",
    period: "2025 – Present",
    type: "Research",
    logo: "/exp3.png",
    tech: ["Python", "XGBoost", "Satellite Data", "NumPy"],
    highlights: [
      "Analyzed 15 years of NASA MODIS satellite imagery for crop yield prediction in Rajasthan",
      "Built XGBoost regression pipeline achieving R² = 0.581, beating all baseline models",
      "Engineered spectral vegetation indices (NDVI, EVI) as predictive features",
      "Published findings as part of IEEE GRSS research initiative",
    ],
  },
];

// GlowCard component (mouse-tracking conic glow — exact reference)
function GlowCard({ exp }: { exp: typeof EXPERIENCES[0] }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const angle = Math.atan2(
      e.clientY - rect.top  - rect.height / 2,
      e.clientX - rect.left - rect.width  / 2
    ) * (180 / Math.PI);
    el.style.setProperty("--start", String((angle + 360) % 360 + 60));
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className="card card-border rounded-xl p-6 mb-5 break-inside-avoid-column relative"
    >
      <div className="glow" />

      {/* Stars */}
      <div className="star-rating">
        {[...Array(5)].map((_, i) => (
          <Image key={i} src="/gold-star.png" alt="★" width={16} height={16} className="object-contain" />
        ))}
      </div>

      {/* Review text */}
      <p className="text-white-50 text-sm leading-relaxed mb-5">
        &ldquo;{exp.role} at {exp.company} — {exp.period}&rdquo;
      </p>

      {/* Company logo + tech pills */}
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-full border border-black-50 bg-black-200 flex items-center justify-center overflow-hidden flex-shrink-0">
          <Image src={exp.logo} alt={exp.company} width={28} height={28} className="object-contain" />
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-white">{exp.company}</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {exp.tech.slice(0, 3).map(t => (
              <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-black-200 border border-black-50 text-blue-50">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 60%"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="w-full bg-black section-padding"
    >
      {/* Header */}
      <motion.div
        className="flex flex-col items-center mb-20"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="eyebrow-badge mb-5">💼 Career Overview</div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center">
          Professional Work Experience
        </h2>
      </motion.div>

      {/* Experience cards */}
      <div className="flex flex-col gap-32 relative">

        {/* Vertical spine line (desktop) */}
        <div
          className="absolute top-0 h-full hidden xl:block overflow-hidden"
          style={{ left: "calc(33.33% + 2rem)", width: "2px", background: "rgba(255,255,255,0.05)" }}
        >
          <motion.div
            className="w-full gradient-line"
            style={{ height: "100%", scaleY: lineScaleY, transformOrigin: "top" }}
          />
        </div>

        {EXPERIENCES.map((exp, i) => (
          <motion.div
            key={exp.id}
            className="exp-card-wrapper"
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            {/* LEFT: GlowCard (xl:w-1/3) */}
            <div className="xl:w-[30%]">
              <GlowCard exp={exp} />
            </div>

            {/* RIGHT: Timeline + responsibilities (xl:w-2/3) */}
            <div className="xl:w-[65%] flex items-start gap-6 xl:gap-10">
              {/* Timeline logo circle */}
              <div className="flex-shrink-0 relative z-10 flex flex-col items-center">
                <div className="timeline-logo">
                  <Image
                    src={exp.logo}
                    alt={exp.company}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Text */}
              <div className="flex-1 pb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {exp.role}
                </h3>
                <p className="text-sm text-blue-50 mb-1">{exp.company}</p>
                <p className="text-xs text-blue-50/60 mb-6">
                  🗓️&nbsp;{exp.period} · {exp.type}
                </p>
                <p className="text-xs italic text-blue-50/40 mb-4">Responsibilities</p>
                <ul className="list-disc pl-5 space-y-3">
                  {exp.highlights.map((r, j) => (
                    <li key={j} className="text-white-50 text-sm md:text-base leading-relaxed">
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
