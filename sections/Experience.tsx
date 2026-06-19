"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CheckCircle2, Briefcase, FlaskConical } from "lucide-react";
import { experiences } from "@/data/experience";
import SectionHeader from "@/components/shared/SectionHeader";

const typeIcon: Record<string, typeof Briefcase> = {
  Internship: Briefcase,
  Research:   FlaskConical,
};

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Timeline spine grows from 0→100% as the section scrolls through
  const spineHeight = useTransform(scrollYProgress, [0.05, 0.75], ["0%", "100%"]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section-pad relative"
      style={{ background: "linear-gradient(180deg, #0a0a0a 0%, #080808 100%)" }}
    >
      {/* Section top separator */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(196,154,60,0.15),transparent)" }} />

      <div className="container-lg">
        <SectionHeader
          eyebrow="Experience"
          title="Where I've built"
          description="AI systems, computer vision pipelines, and research models across internships and collaborative research."
        />

        {/* 3-D perspective wrapper */}
        <div className="timeline-3d-container mt-2">
          <div className="relative ml-6 md:ml-12 pl-8 md:pl-14">

            {/* Spine track */}
            <div className="absolute left-0 top-0 bottom-0 w-px"
              style={{ background: "rgba(255,255,255,0.06)" }} />

            {/* Animated gold fill */}
            <motion.div
              className="absolute left-0 top-0 w-px origin-top"
              style={{
                height: spineHeight,
                background: "linear-gradient(to bottom, var(--gold), rgba(196,154,60,0.1))",
              }}
            />

            {/* Timeline items */}
            <div className="flex flex-col gap-12 py-4">
              {experiences.map((exp, index) => (
                <TimelineItem key={exp.id} exp={exp} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  exp,
  index,
}: {
  exp: (typeof experiences)[number];
  index: number;
}) {
  const ref  = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  const Icon = typeIcon[exp.type] ?? Briefcase;

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { rootMargin: "-12% 0px -12% 0px", threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="timeline-item-3d"
      style={{
        transitionDelay: `${index * 0.08}s`,
        ...(vis ? { transform: "rotateX(0deg) translateZ(0px)", opacity: 1 } : {}),
      }}
    >
      {/* Node */}
      <motion.div
        className="absolute left-0 flex items-center justify-center"
        style={{
          width: 40, height: 40,
          marginLeft: -20 - 0.5,
          top: 0,
          background: "var(--card)",
          border: "1px solid rgba(196,154,60,0.25)",
          borderRadius: 10,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={vis ? { scale: 1, opacity: 1 } : {}}
        transition={{ type: "spring", stiffness: 300, damping: 22, delay: index * 0.08 + 0.1 }}
      >
        <Icon size={16} style={{ color: "var(--gold)" }} />
      </motion.div>

      {/* Card */}
      <div
        className="glass-card p-6 md:p-8 relative overflow-hidden cursor-default"
        style={{ position: "relative" }}
      >
        {/* Gold left accent bar */}
        <div className="absolute left-0 top-6 bottom-6 w-[2px] rounded-r-full"
          style={{ background: "var(--gold)" }} />

        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
          <div>
            <span className="badge badge-gold mb-2">{exp.type}</span>
            <h3 className="text-lg font-bold leading-tight mb-1" style={{ color: "var(--text-1)", letterSpacing: "-0.02em" }}>
              {exp.role}
            </h3>
            <p className="text-sm font-semibold" style={{ color: "var(--gold)" }}>
              {exp.company}
            </p>
          </div>
          <span
            className="flex-shrink-0 text-xs font-mono px-3 py-1 rounded-lg"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)", color: "var(--text-3)" }}
          >
            {exp.period}
          </span>
        </div>

        <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-2)" }}>
          {exp.description}
        </p>

        {/* Bullet highlights */}
        <ul className="flex flex-col gap-2.5 mb-5">
          {exp.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--text-2)" }}>
              <CheckCircle2 size={13} className="flex-shrink-0 mt-0.5" style={{ color: "var(--gold)" }} />
              {h}
            </li>
          ))}
        </ul>

        {/* Tech */}
        <div className="flex flex-wrap gap-1.5">
          {exp.tech.map(t => (
            <span key={t} className="tag-pill">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
