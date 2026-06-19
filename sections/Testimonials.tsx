"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";

const testimonials = [
  {
    id: "t1",
    quote: "Utkarsh delivered a production-grade AI search system at a scale most experienced engineers would hesitate to take on. His ability to move from a research idea to a working product — serving 110M+ resumes — is genuinely rare, especially for someone still in college.",
    name: "Senior Manager, Provaantech",
    role: "Engineering Leadership · 2024",
    initials: "PM",
    placeholder: true,
  },
  {
    id: "t2",
    quote: "The face recognition pipeline Utkarsh built cut our inference latency by 35% while improving accuracy. He doesn't just write code — he thinks through systems. Always asking the right questions about reliability, edge cases, and scale before touching a keyboard.",
    name: "Tech Lead, AVSS Tech",
    role: "Software Engineering · 2023",
    initials: "AT",
    placeholder: true,
  },
  {
    id: "t3",
    quote: "What stood out about Utkarsh during our research collaboration was his rigor. He didn't accept 'good enough' results — he kept iterating until we beat the climatological baseline on every metric. That level of scientific discipline is uncommon in undergrads.",
    name: "Research Mentor",
    role: "IEEE GRSS · 2023",
    initials: "RM",
    placeholder: true,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-pad relative"
      style={{ background: "linear-gradient(180deg, #0a0a0a 0%, #080808 100%)" }}>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(196,154,60,0.12),transparent)" }} />

      <div className="container-lg">
        <SectionHeader
          eyebrow="Testimonials"
          title="What people say"
          description="Feedback from managers and collaborators I've worked with. I'll be adding direct testimonials from my internship managers shortly."
        />

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22,1,0.36,1] }}
              className="glass-card p-6 flex flex-col gap-4 relative"
            >
              {/* Placeholder badge */}
              {t.placeholder && (
                <span className="absolute top-4 right-4 text-[9px] tracking-[0.12em] uppercase px-2 py-0.5 rounded"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)", color: "var(--text-3)" }}>
                  Placeholder
                </span>
              )}

              {/* Quote mark */}
              <div style={{ color: "rgba(196,154,60,0.2)" }}>
                <Quote size={32} />
              </div>

              {/* Quote text */}
              <p className="flex-1 text-sm leading-relaxed italic" style={{ color: "var(--text-2)" }}>
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4"
                style={{ borderTop: "1px solid var(--border)" }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
                  style={{ background: "var(--gold-dim)", border: "1px solid var(--gold-border)", color: "var(--gold)" }}>
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--text-1)" }}>{t.name}</p>
                  <p className="text-xs" style={{ color: "var(--text-3)" }}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center text-xs"
          style={{ color: "var(--text-3)" }}
        >
          ✦ Placeholder testimonials above — real quotes from internship managers coming soon
        </motion.p>
      </div>
    </section>
  );
}
