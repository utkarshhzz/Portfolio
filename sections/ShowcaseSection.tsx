"use client";

import { motion } from "framer-motion";
import Image from "next/image";

/* ── Icons ──────────────────────────────────────────────────────── */
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M8 5v14l11-7z" />
  </svg>
);
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);
const ExternalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

/* ── Project data ────────────────────────────────────────────────── */
interface Project {
  id: number;
  name: string;
  tagline: string;
  impact: string; // one-line metric
  description: string;
  tech: string[];
  image: string;
  githubUrl: string;
  demoUrl: string;
  accentColor: string;
  featured?: boolean;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    name: "AI Candidate Discovery Engine",
    tagline: "Production-grade Semantic Search",
    impact: "Top 10 from 110M+ resumes in under 10 seconds",
    description:
      "Production-grade semantic search system surfacing the best candidates from a corpus of 110M+ resumes. Built with Azure AI Search, OpenAI embeddings, and a GPT-powered match rationale layer. Optimized vector retrieval pipelines to reduce enterprise search time by 80% while significantly minimizing API costs.",
    tech: ["Python", "FastAPI", "Azure AI Search", "OpenAI", "PostgreSQL"],
    image: "/project1.png",
    githubUrl: "https://github.com/utkarshhzz",
    demoUrl: "https://youtu.be/85gfMJ7TME0",
    accentColor: "#C49A3C",
    featured: true,
  },
  {
    id: 2,
    name: "CrowdWisdom.AI",
    tagline: "Multi-Agent Orchestration",
    impact: "Collective intelligence platform",
    description:
      "Multi-agent AI platform for collective intelligence. LangGraph agents debate, synthesise, and deliver decisions with real-time voice output — built end-to-end in 36 hours.",
    tech: ["Python", "LangGraph", "FastAPI", "OpenAI", "TTS"],
    image: "/project2.png",
    githubUrl: "https://github.com/utkarshhzz",
    demoUrl: "https://youtu.be/xEUB63xrMI4",
    accentColor: "#4ade80",
  },
  {
    id: 3,
    name: "SmurfPakad — Fraud Detection",
    tagline: "Graph Neural Networks · Web3 Security",
    impact: "87% fraud detection accuracy on live blockchain data",
    description:
      "GNN-powered smurf account detector for Web3 gaming ecosystems. GraphSAGE clusters suspicious wallets using transaction graph topology — no rule-based heuristics.",
    tech: ["Python", "GraphSAGE", "PyTorch", "Web3.py", "NetworkX"],
    image: "/project3.png",
    githubUrl: "https://github.com/utkarshhzz",
    demoUrl: "https://youtu.be/U30vM4ilUqI",
    accentColor: "#a78bfa",
  },
  {
    id: 4,
    name: "Medical AI Assistant",
    tagline: "Healthcare RAG · 24/7 Q&A",
    impact: "Sub-2s response on 10,000+ medical document corpus",
    description:
      "RAG-powered medical Q&A assistant grounded on trusted clinical sources. Evidence-based answers with source citations — never hallucinates, always cites.",
    tech: ["Python", "LangChain", "RAG", "FastAPI", "React"],
    image: "/project4.png",
    githubUrl: "https://github.com/utkarshhzz",
    demoUrl: "https://youtu.be/cwfJqqEMcPI",
    accentColor: "#38bdf8",
  },
  {
    id: 5,
    name: "Resume Sanitizer API",
    tagline: "PII Redaction · Production REST API",
    impact: "Redacts 15+ PII entity types at 95%+ Presidio confidence",
    description:
      "REST API that ingests a PDF resume and returns a permanently blacked-out version. Powered by Microsoft Presidio NLP — phone, email, address, name — all gone, zero leaks.",
    tech: ["Python", "FastAPI", "Presidio", "spaCy", "PDF"],
    image: "/project5.png",
    githubUrl: "https://github.com/utkarshhzz",
    demoUrl: "https://youtu.be/TR2lV09c_NA",
    accentColor: "#fb923c",
  },
];

/* ── Fade-in wrapper ────────────────────────────────────────────── */
function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Reusable button row ─────────────────────────────────────────── */
function ProjectButtons({ project, small }: { project: Project; small?: boolean }) {
  const py = small ? "py-2" : "py-2.5";
  const px = small ? "px-4" : "px-5";
  const text = small ? "text-xs" : "text-sm";
  return (
    <div className="flex flex-wrap gap-2.5 mt-4">
      <a
        href={project.demoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-1.5 ${px} ${py} rounded-xl ${text} font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg`}
        style={{
          background: project.accentColor,
          color: "#080808",
          boxShadow: `0 4px 16px ${project.accentColor}35`,
        }}
      >
        <PlayIcon />
        Watch Demo
      </a>
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-1.5 ${px} ${py} rounded-xl ${text} font-medium border transition-all duration-200 hover:-translate-y-0.5`}
        style={{
          borderColor: "rgba(255,255,255,0.1)",
          background: "rgba(255,255,255,0.04)",
          color: "#d9ecff",
        }}
      >
        <GitHubIcon />
        GitHub
      </a>
    </div>
  );
}

/* ── Impact badge ────────────────────────────────────────────────── */
function ImpactBadge({ text, color }: { text: string; color: string }) {
  return (
    <div
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold mb-3"
      style={{ background: `${color}18`, border: `1px solid ${color}35`, color }}
    >
      <span>⚡</span>
      {text}
    </div>
  );
}

/* ── Featured project card (large) ──────────────────────────────── */
function FeaturedCard({ project }: { project: Project }) {
  return (
    <FadeIn className="flex flex-col xl:flex-row gap-8 xl:gap-12 items-start">
      {/* Image */}
      <div className="xl:w-[58%] w-full">
        <div className="relative rounded-2xl overflow-hidden group" style={{ aspectRatio: "16/10" }}>
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 58vw"
            priority
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          {/* Hover play */}
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
            style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(3px)" }}
          >
            <motion.div
              className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm"
              style={{ background: project.accentColor, color: "#080808" }}
              whileHover={{ scale: 1.07 }}
            >
              <PlayIcon />
              Watch Demo
              <ExternalIcon />
            </motion.div>
          </a>
          {/* Featured badge */}
          <div
            className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase z-10"
            style={{ background: project.accentColor, color: "#080808" }}
          >
            Featured
          </div>
        </div>
      </div>

      {/* Text */}
      <div className="xl:w-[42%] w-full flex flex-col justify-center">
        <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: project.accentColor }}>
          {project.tagline}
        </p>
        <ImpactBadge text={project.impact} color={project.accentColor} />
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
          {project.name}
        </h2>
        <p className="text-blue-50 text-sm md:text-base leading-relaxed mb-4">
          {project.description}
        </p>
        {/* Tech pills */}
        <div className="flex flex-wrap gap-2 mb-1">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-full text-[11px] font-medium border"
              style={{ borderColor: "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", color: "#839cb5" }}
            >
              {t}
            </span>
          ))}
        </div>
        <ProjectButtons project={project} />
      </div>
    </FadeIn>
  );
}

/* ── Small project card (grid) ───────────────────────────────────── */
function GridCard({ project, delay }: { project: Project; delay: number }) {
  return (
    <FadeIn delay={delay} className="flex flex-col group">
      {/* Image */}
      <div className="relative rounded-2xl overflow-hidden mb-4" style={{ aspectRatio: "16/10" }}>
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        {/* Hover play */}
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
          style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(3px)" }}
        >
          <motion.div
            className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-xs"
            style={{ background: project.accentColor, color: "#080808" }}
            whileHover={{ scale: 1.07 }}
          >
            <PlayIcon />
            Watch Demo
          </motion.div>
        </a>
      </div>

      {/* Text */}
      <p className="text-[10px] font-semibold tracking-widest uppercase mb-1.5" style={{ color: project.accentColor }}>
        {project.tagline}
      </p>
      <ImpactBadge text={project.impact} color={project.accentColor} />
      <h3 className="text-lg font-bold text-white mb-2 leading-snug">{project.name}</h3>
      <p className="text-blue-50 text-sm leading-relaxed mb-2 flex-1">{project.description}</p>

      {/* Tech pills */}
      <div className="flex flex-wrap gap-1.5 mb-1">
        {project.tech.map((t) => (
          <span
            key={t}
            className="px-2 py-0.5 rounded-full text-[10px] font-medium border"
            style={{ borderColor: "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", color: "#839cb5" }}
          >
            {t}
          </span>
        ))}
      </div>
      <ProjectButtons project={project} small />
    </FadeIn>
  );
}

/* ── Main section ────────────────────────────────────────────────── */
export default function ShowcaseSection() {
  const [featured, ...rest] = PROJECTS;

  return (
    <section id="projects" className="w-full bg-black">
      {/* Section header */}
      <div className="px-5 md:px-20 pt-20 pb-6">
        <motion.div
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="eyebrow-badge mb-5">🚀 Featured Work</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Projects I&apos;ve Built
          </h2>
          <p className="text-blue-50 text-sm md:text-base mt-4 max-w-xl">
            Production systems, hackathon wins, and research prototypes —
            every project ships, runs, and has a demo.
          </p>
        </motion.div>
      </div>

      {/* ── Featured (full-width hero card) ── */}
      <div className="px-5 md:px-20 py-10">
        <FeaturedCard project={featured} />
      </div>

      {/* Divider */}
      <div className="mx-5 md:mx-20 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

      {/* ── Grid: remaining 4 projects ── */}
      <div className="px-5 md:px-20 py-12">
        <motion.p
          className="text-xs font-semibold tracking-widest uppercase mb-8 text-center"
          style={{ color: "var(--text-3)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          More Projects
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-10 xl:gap-12 max-w-5xl mx-auto">
          {rest.map((project, i) => (
            <GridCard key={project.id} project={project} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
