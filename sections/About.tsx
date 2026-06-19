"use client";

import { motion } from "framer-motion";
import { GraduationCap, Brain, Network, Server, Eye, FlaskConical } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";

const techTicker = [
  "LangGraph", "OpenAI", "FastAPI", "PyTorch", "Azure AI Search",
  "RAG", "Vector Embeddings", "GraphSAGE", "Computer Vision", "XGBoost",
  "LangChain", "HuggingFace", "Docker", "PostgreSQL", "Next.js", "TypeScript",
  "LangGraph", "OpenAI", "FastAPI", "PyTorch", "Azure AI Search",
  "RAG", "Vector Embeddings", "GraphSAGE", "Computer Vision", "XGBoost",
];

const focuses = [
  { icon: Brain,        label: "AI Engineering",    desc: "LLMs, RAG, multi-agent" },
  { icon: Network,      label: "Multi-Agent Systems",desc: "LangGraph, orchestration" },
  { icon: Eye,          label: "Computer Vision",   desc: "PyTorch, OpenCV" },
  { icon: Server,       label: "Backend Systems",   desc: "FastAPI, PostgreSQL, Redis" },
  { icon: FlaskConical, label: "ML Research",       desc: "IEEE, NASA satellite data" },
];

const education = [
  { school: "MIT Bangalore",  degree: "B.Tech CS · Data Science", period: "2022 – 2026" },
  { school: "IIT Guwahati",   degree: "B.Sc AI & Data Science",   period: "2022 – 2026" },
];

export default function About() {
  return (
    <section id="about" className="section-pad relative" style={{ background: "#0a0a0a" }}>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(196,154,60,0.12),transparent)" }} />

      {/* Subtle dot grid */}
      <div className="absolute inset-0 dot-grid pointer-events-none"
        style={{ maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent)" }} />

      <div className="container-lg relative">
        <SectionHeader
          eyebrow="About"
          title="Engineering at the frontier of AI"
          description="Building systems where research meets production — from semantic search at 110M-resume scale to multi-agent platforms that orchestrate complex reasoning."
        />

        <div className="grid lg:grid-cols-[1fr_380px] gap-14 mt-4">

          {/* ── Left: narrative ── */}
          <div className="flex flex-col gap-6">
            {[
              "I'm an AI Systems Engineer studying at MIT Bangalore and IIT Guwahati. I'm driven by one specific obsession: making AI research actually work in production. Most AI projects die in the gap between prototype and product — I've spent my career learning to close that gap.",
              "At Provaantech, I built a candidate discovery engine that searches 110 million resumes semantically — returning results in under 10 seconds using Azure AI Search and OpenAI embeddings. That's not a research demo. That's production, at scale. At IEEE GRSS, I analyzed 15 years of NASA satellite data and built rainfall prediction models that outperformed established climatological baselines on every metric.",
              "I believe the best engineers design systems that survive real-world conditions. Every line of code I write carries that conviction.",
            ].map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22,1,0.36,1] }}
                className="text-[15px] leading-[1.8]"
                style={{ color: "var(--text-2)" }}
              >
                {para}
              </motion.p>
            ))}

            {/* Focus area pills */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-wrap gap-2 pt-2"
            >
              {focuses.map(f => (
                <span key={f.label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium cursor-default transition-all duration-200 hover:border-[var(--gold-border)] hover:bg-[var(--gold-dim)] hover:text-[var(--gold)]"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)", color: "var(--text-2)" }}>
                  <f.icon size={11} style={{ color: "var(--gold)" }} />
                  {f.label}
                </span>
              ))}
            </motion.div>

            {/* Tech ticker */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="overflow-hidden py-4 mt-2"
              style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
            >
              <div className="marquee-track">
                {techTicker.map((tech, i) => (
                  <span key={i} className="tag-pill flex-shrink-0">{tech}</span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Right: education + stat cards ── */}
          <div className="flex flex-col gap-4">
            <p className="eyebrow mb-1">Education</p>
            {education.map((edu, i) => (
              <motion.div
                key={edu.school}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22,1,0.36,1] }}
                className="glass-card p-5 flex gap-4 items-start"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "var(--gold-dim)", border: "1px solid var(--gold-border)" }}>
                  <GraduationCap size={18} style={{ color: "var(--gold)" }} />
                </div>
                <div>
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <h3 className="text-sm font-semibold" style={{ color: "var(--text-1)" }}>{edu.school}</h3>
                    <span className="text-[11px] font-mono" style={{ color: "var(--text-3)" }}>{edu.period}</span>
                  </div>
                  <p className="text-xs" style={{ color: "var(--gold)" }}>{edu.degree}</p>
                </div>
              </motion.div>
            ))}

            {/* Quick stat cards */}
            <p className="eyebrow mt-4 mb-1">Focus Areas</p>
            <div className="grid grid-cols-2 gap-3">
              {focuses.map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="glass-card p-3 cursor-default"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <f.icon size={12} style={{ color: "var(--gold)" }} />
                    <span className="text-xs font-semibold" style={{ color: "var(--text-1)" }}>{f.label}</span>
                  </div>
                  <p className="text-[11px] leading-snug" style={{ color: "var(--text-3)" }}>{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
