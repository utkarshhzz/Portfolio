"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Play, Zap, ExternalLink, Globe } from "lucide-react";
import { GithubIcon } from "@/components/shared/BrandIcons";
import SectionHeading from "@/components/shared/SectionHeading";

interface Project {
  id: string;
  name: string;
  tagline: string;
  impact: string;
  description: string;
  tech: string[];
  image: string;
  demoUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  accent: string;
}

const PROJECTS: Project[] = [
  {
    id: "candidate-engine",
    name: "AI Candidate Discovery Engine",
    tagline: "Hybrid semantic search · Provaantech",
    impact: "Top-10 matches from 110M+ records in under 10 s",
    description:
      "Hybrid retrieval over 110M+ resumes: OpenAI embeddings and Azure AI Search for recall, BM25 and semantic re-ranking for precision, and GPT-4o-mini writing a fit explanation for every shortlisted candidate. Retrieval and ranking modules are covered by unit and integration tests.",
    tech: ["Python", "FastAPI", "Azure AI Search", "OpenAI", "BM25", "PostgreSQL"],
    image: "/project1.png",
    demoUrl: "https://youtu.be/85gfMJ7TME0",
    githubUrl: "https://github.com/utkarshhzz/JDeesiee",
    accent: "#C49A3C",
  },
  {
    id: "crowdwisdom",
    name: "CrowdWisdom.AI",
    tagline: "Multi-agent LLM orchestration",
    impact: "40% better scheduling efficiency",
    description:
      "LangGraph agents that debate, synthesise and act on automated workflows, with dynamic LLM-driven routing and ElevenLabs voice for real-time conversation.",
    tech: ["Python", "LangGraph", "FastAPI", "OpenAI", "ElevenLabs"],
    image: "/project2.png",
    demoUrl: "https://youtu.be/xEUB63xrMI4",
    githubUrl: "https://github.com/utkarshhzz/CrowdWisdom.AI",
    liveUrl: "https://crowd-wisdom-ai.vercel.app",
    accent: "#4ade80",
  },
  {
    id: "smurfpakad",
    name: "SmurfPakad",
    tagline: "Graph neural networks · Fraud detection",
    impact: "Top 3, state-level hackathon",
    description:
      "A GraphSAGE GNN that flags smurfing and money-laundering patterns from blockchain transaction-graph topology rather than hand-written rules, with D3.js force-graph views for investigators.",
    tech: ["PyTorch Geometric", "GraphSAGE", "FastAPI", "PostgreSQL", "D3.js"],
    image: "/project3.png",
    demoUrl: "https://youtu.be/U30vM4ilUqI",
    accent: "#a78bfa",
  },
  {
    id: "medical-assistant",
    name: "Medical AI Assistant",
    tagline: "Healthcare RAG",
    impact: "Answers cite their clinical sources",
    description:
      "Retrieval-augmented medical Q&A grounded on trusted clinical documents. Every answer comes with its source passages, so claims can be checked instead of trusted.",
    tech: ["Python", "LangChain", "RAG", "FastAPI", "React"],
    image: "/project4.png",
    demoUrl: "https://youtu.be/cwfJqqEMcPI",
    githubUrl: "https://github.com/utkarshhzz/Medical_Chatbot",
    accent: "#38bdf8",
  },
  {
    id: "pii-redaction",
    name: "PII Redaction Microservice",
    tagline: "Privacy engineering · Azure AKS",
    impact: "Zero per-request cost, fully instrumented",
    description:
      "Upload a resume PDF, get it back permanently redacted. Presidio, spaCy NER and custom recognisers for PAN, Aadhaar and +91 numbers, served by FastAPI on Kubernetes with Redis caching and Prometheus/Grafana monitoring.",
    tech: ["FastAPI", "Presidio", "spaCy", "Kubernetes", "Redis", "Grafana"],
    image: "/project5.png",
    demoUrl: "https://youtu.be/TR2lV09c_NA",
    githubUrl: "https://github.com/utkarshhzz/Resume_Sanitizer",
    accent: "#fb923c",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function ProjectLinks({ p, small }: { p: Project; small?: boolean }) {
  const size = small ? "px-3.5 py-2 text-xs" : "px-5 py-2.5 text-sm";
  const ghost = `inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] font-medium text-[var(--text-2)] transition-all duration-200 hover:-translate-y-0.5 hover:border-white/25 ${size}`;
  return (
    <div className="mt-4 flex flex-wrap gap-2.5">
      <a
        href={p.demoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-1.5 rounded-xl font-semibold text-[#080808] transition-all duration-200 hover:-translate-y-0.5 ${size}`}
        style={{ background: p.accent, boxShadow: `0 4px 16px ${p.accent}35` }}
      >
        <Play size={13} fill="currentColor" /> Watch demo
      </a>
      {p.liveUrl && (
        <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className={ghost}>
          <Globe size={13} /> Live
        </a>
      )}
      {p.githubUrl && (
        <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className={ghost}>
          <GithubIcon size={13} /> Code
        </a>
      )}
    </div>
  );
}

function ImpactBadge({ text, color }: { text: string; color: string }) {
  return (
    <p
      className="mb-3 inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold"
      style={{ background: `${color}18`, border: `1px solid ${color}35`, color }}
    >
      <Zap size={12} fill="currentColor" /> {text}
    </p>
  );
}

function TechList({ tech, small }: { tech: string[]; small?: boolean }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
      {tech.map((t) => (
        <li
          key={t}
          className={`rounded-full border border-white/10 bg-white/[0.04] font-medium text-[var(--text-3)] ${small ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-[11px]"}`}
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

function Thumb({ p, sizes, big }: { p: Project; sizes: string; big?: boolean }) {
  return (
    <div className="group/thumb relative overflow-hidden rounded-2xl border border-white/[0.06]" style={{ aspectRatio: "16/10" }}>
      <Image
        src={p.image}
        alt={`${p.name} screenshot`}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-500 group-hover/thumb:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      <a
        href={p.demoUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Watch the ${p.name} demo`}
        className="absolute inset-0 z-10 flex items-center justify-center bg-black/45 opacity-0 backdrop-blur-[3px] transition-opacity duration-300 group-hover/thumb:opacity-100 focus-visible:opacity-100"
      >
        <span
          className={`flex items-center gap-2 rounded-full font-semibold text-[#080808] ${big ? "px-6 py-3 text-sm" : "px-5 py-2.5 text-xs"}`}
          style={{ background: p.accent }}
        >
          <Play size={14} fill="currentColor" /> Watch demo <ExternalLink size={12} />
        </span>
      </a>
      {big && (
        <span
          className="absolute left-4 top-4 z-10 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#080808]"
          style={{ background: p.accent }}
        >
          Featured
        </span>
      )}
    </div>
  );
}

export default function ShowcaseSection() {
  const [featured, ...rest] = PROJECTS;

  return (
    <section id="projects" className="section-padding">
      <SectionHeading
        index="01"
        eyebrow="Selected work"
        title="Projects I've Built"
        sub="Production systems, hackathon builds and research prototypes. Every one ships with a demo."
      />

      <div className="mx-auto max-w-6xl">
        <FadeIn className="flex flex-col items-start gap-8 xl:flex-row xl:gap-12">
          <div className="w-full xl:w-[58%]">
            <Thumb p={featured} big sizes="(max-width: 1280px) 100vw, 680px" />
          </div>
          <div className="flex w-full flex-col justify-center xl:w-[42%]">
            <p className="mb-2 font-mono text-xs uppercase tracking-widest" style={{ color: featured.accent }}>
              {featured.tagline}
            </p>
            <ImpactBadge text={featured.impact} color={featured.accent} />
            <h3 className="mb-3 text-2xl font-bold leading-tight text-white md:text-3xl lg:text-4xl text-balance">
              {featured.name}
            </h3>
            <p className="mb-5 text-sm leading-relaxed text-[var(--text-3)] md:text-base text-pretty">{featured.description}</p>
            <TechList tech={featured.tech} />
            <ProjectLinks p={featured} />
          </div>
        </FadeIn>

        <div className="my-14 h-px bg-white/[0.06]" />

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-10 xl:gap-14">
          {rest.map((p, i) => (
            <FadeIn key={p.id} delay={(i % 2) * 0.08} className="flex flex-col">
              <Thumb p={p} sizes="(max-width: 768px) 100vw, 560px" />
              <p className="mb-1.5 mt-5 font-mono text-[11px] uppercase tracking-widest" style={{ color: p.accent }}>
                {p.tagline}
              </p>
              <ImpactBadge text={p.impact} color={p.accent} />
              <h3 className="mb-2 text-xl font-bold leading-snug text-white">{p.name}</h3>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-[var(--text-3)] text-pretty">{p.description}</p>
              <TechList tech={p.tech} small />
              <ProjectLinks p={p} small />
            </FadeIn>
          ))}
        </div>

        <p className="mt-14 text-center text-sm text-[var(--text-3)]">
          More on{" "}
          <a
            href="https://github.com/utkarshhzz?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[var(--gold)] underline-offset-4 hover:underline"
          >
            GitHub ↗
          </a>
        </p>
      </div>
    </section>
  );
}
