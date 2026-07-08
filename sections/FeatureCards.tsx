"use client";

import { motion } from "framer-motion";

const ABILITIES = [
  {
    emoji: "🎯",
    title: "Production-Grade AI",
    desc: "I build AI systems that handle 110M+ resumes, stay up under load, and ship to real users with SLAs — not just prototypes that die in staging.",
    accent: "#C49A3C",
  },
  {
    emoji: "🔬",
    title: "Research to Reality",
    desc: "Bridging academic research and deployment: RAG pipelines, multi-agent orchestration, semantic search at scale — from paper to API.",
    accent: "#4ade80",
  },
  {
    emoji: "⚡",
    title: "Systems Thinking",
    desc: "Every component is designed for reliability: proper error handling, monitoring, vector stores, and GPU-efficient inference pipelines.",
    accent: "#61DAFB",
  },
  {
    emoji: "⚙️",
    title: "Backend Architecture",
    desc: "Designing resilient microservices and APIs. Focused on scalable data models, low-latency search, and robust deployment pipelines.",
    accent: "#FF9D00",
  },
];

export default function FeatureCards() {
  return (
    <div className="w-full bg-black padding-x py-16">
      {/* Header */}
      <motion.div
        className="flex flex-col items-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="eyebrow-badge mb-5">🤝 What I Bring to the Table</div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center">
          How I Contribute
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 max-w-6xl mx-auto">
        {ABILITIES.map(({ emoji, title, desc, accent }, i) => (
          <motion.div
            key={title}
            className="card card-border rounded-2xl p-7 flex flex-col gap-5 group relative overflow-hidden"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            onMouseMove={(e) => {
              const el = e.currentTarget;
              const rect = el.getBoundingClientRect();
              const angle = Math.atan2(e.clientY - rect.top - rect.height / 2, e.clientX - rect.left - rect.width / 2) * 180 / Math.PI;
              el.style.setProperty("--start", String((angle + 360) % 360 + 60));
            }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Accent glow top-right */}
            <div
              className="absolute -top-8 -right-8 w-24 h-24 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
              style={{ background: accent }}
            />

            <div className="glow" />

            {/* Emoji badge */}
            <div
              className="flex items-center justify-center rounded-2xl w-14 h-14 text-2xl flex-shrink-0"
              style={{ background: `${accent}15`, border: `1px solid ${accent}30` }}
            >
              {emoji}
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
              <p className="text-blue-50 text-sm leading-relaxed">{desc}</p>
            </div>

            {/* Bottom accent line */}
            <div
              className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
