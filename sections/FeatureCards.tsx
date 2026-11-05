"use client";

import { motion } from "framer-motion";
import { Target, FlaskConical, Network, Server } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const ABILITIES = [
  {
    Icon: Target,
    title: "Production-grade AI",
    desc: "Systems that search 110M+ records, stay up under load and reach real users. Prototypes are a starting point, not the deliverable.",
    accent: "#C49A3C",
  },
  {
    Icon: FlaskConical,
    title: "Research to reality",
    desc: "From an IGARSS paper to a deployed API: RAG pipelines, multi-agent orchestration and evaluation that doesn't leak.",
    accent: "#4ade80",
  },
  {
    Icon: Network,
    title: "Systems thinking",
    desc: "Error handling, fallbacks, caching and monitoring designed in from day one, with Prometheus and Grafana watching the hot paths.",
    accent: "#61DAFB",
  },
  {
    Icon: Server,
    title: "Backend architecture",
    desc: "Typed FastAPI microservices on Docker and Kubernetes, with tested data models and low-latency retrieval.",
    accent: "#FF9D00",
  },
];

export default function FeatureCards() {
  return (
    <section id="approach" className="section-padding">
      <SectionHeading index="04" eyebrow="Approach" title="How I Contribute" />

      <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {ABILITIES.map(({ Icon, title, desc, accent }, i) => (
          <motion.li
            key={title}
            className="card card-border group relative flex flex-col gap-5 overflow-hidden rounded-2xl p-7"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            onMouseMove={(e) => {
              const el = e.currentTarget;
              const r = el.getBoundingClientRect();
              const angle = (Math.atan2(e.clientY - r.top - r.height / 2, e.clientX - r.left - r.width / 2) * 180) / Math.PI;
              el.style.setProperty("--start", String(((angle + 360) % 360) + 60));
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20"
              style={{ background: accent }}
            />
            <span
              className="grid size-12 flex-shrink-0 place-items-center rounded-xl"
              style={{ background: `${accent}15`, border: `1px solid ${accent}30`, color: accent }}
            >
              <Icon size={22} strokeWidth={1.75} />
            </span>
            <div>
              <h3 className="mb-2 text-lg font-bold text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-[var(--text-3)]">{desc}</p>
            </div>
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-0.5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
