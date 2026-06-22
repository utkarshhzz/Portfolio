"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

// SVG Icons
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const ExternalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

interface Project {
  id: number;
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  image: string;
  githubUrl: string;
  demoUrl: string;
  accentColor: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    name: "AI Candidate Discovery Engine",
    tagline: "Internship @ Provaantech (Olumio)",
    description:
      "Production-grade semantic search system surfacing the top 10 candidates from 110M+ resumes in under 10 seconds. Built with Azure AI Search, OpenAI embeddings, and a GPT-powered match rationale layer.",
    tech: ["Python", "FastAPI", "Azure AI Search", "OpenAI"],
    image: "/project1.png",
    githubUrl: "https://github.com/utkarshhzz",
    demoUrl: "https://youtu.be/85gfMJ7TME0",
    accentColor: "#C49A3C",
  },
  {
    id: 2,
    name: "CrowdWisdom.AI",
    tagline: "National Hackathon Winner",
    description:
      "Multi-Agent AI orchestration platform for collective intelligence and automated decision synthesis with real-time voice output. Built with LangGraph multi-agent architecture.",
    tech: ["Python", "LangGraph", "FastAPI", "OpenAI"],
    image: "/project2.png",
    githubUrl: "https://github.com/utkarshhzz",
    demoUrl: "https://youtu.be/xEUB63xrMI4",
    accentColor: "#4ade80",
  },
  {
    id: 3,
    name: "SmurfPakad — Fraud Detection",
    tagline: "Blockchain & Web3 Security",
    description:
      "Blockchain fraud detection using Graph Neural Networks to identify smurf account clusters in Web3 gaming ecosystems. Achieved 87% detection accuracy.",
    tech: ["Python", "GraphSAGE", "PyTorch", "Web3"],
    image: "/project3.png",
    githubUrl: "https://github.com/utkarshhzz",
    demoUrl: "https://youtu.be/U30vM4ilUqI",
    accentColor: "#a78bfa",
  },
];

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
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      }}
    >
      {children}
    </motion.div>
  );
}

// Reusable button pair (GitHub + Demo)
function ProjectButtons({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-3 mt-5">
      {/* Demo — primary CTA */}
      <a
        href={project.demoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
        style={{
          background: project.accentColor,
          color: "#080808",
          boxShadow: `0 4px 20px ${project.accentColor}40`,
        }}
      >
        <PlayIcon />
        Watch Demo
        <ExternalIcon />
      </a>

      {/* GitHub — secondary */}
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 hover:-translate-y-0.5"
        style={{
          borderColor: "rgba(255,255,255,0.12)",
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

export default function ShowcaseSection() {
  const [featured, second, third] = PROJECTS;

  return (
    <section id="projects" className="w-full bg-black">
      {/* Section header */}
      <div className="px-5 md:px-20 pt-16 pb-4">
        <motion.div
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="eyebrow-badge mb-5">🚀 Featured Work</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Projects I&apos;ve Built</h2>
          <p className="text-blue-50 text-sm mt-3 max-w-lg">
            Production systems, hackathon wins, and research prototypes — every project ships and runs.
          </p>
        </motion.div>
      </div>

      <div className="app-showcase">
        <div className="showcaselayout">

          {/* ── Featured Project (left 60%) ── */}
          <FadeIn className="first-project-wrapper">
            {/* Image with overlay play button */}
            <div className="image-wrapper group relative">
              <Image
                src={featured.image}
                alt={featured.name}
                fill
                className="object-cover rounded-xl"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
              {/* Play button overlay */}
              <a
                href={featured.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl z-10"
                style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(2px)" }}
              >
                <motion.div
                  className="flex items-center gap-3 px-6 py-3 rounded-full font-semibold text-sm"
                  style={{ background: featured.accentColor, color: "#080808" }}
                  whileHover={{ scale: 1.05 }}
                >
                  <PlayIcon />
                  Watch Demo
                </motion.div>
              </a>
            </div>

            {/* Text */}
            <div className="text-content">
              {/* Tagline */}
              <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: featured.accentColor }}>
                {featured.tagline}
              </p>
              <div className="badges">
                {featured.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full text-xs font-medium border border-black-50 bg-black-100 text-white-50"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <h2>{featured.name}</h2>
              <p className="text-blue-50 text-sm md:text-base leading-relaxed">
                {featured.description}
              </p>
              <ProjectButtons project={featured} />
            </div>
          </FadeIn>

          {/* ── Two smaller projects (right 40%) ── */}
          <div className="project-list-wrapper">
            {[second, third].map((project, i) => (
              <FadeIn key={project.id} delay={i * 0.15 + 0.1}>
                {/* Image with play overlay */}
                <div className="image-wrapper group relative">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover rounded-xl"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl z-10"
                    style={{ background: "rgba(0,0,0,0.55)" }}
                  >
                    <motion.div
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm"
                      style={{ background: project.accentColor, color: "#080808" }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <PlayIcon />
                      Watch Demo
                    </motion.div>
                  </a>
                </div>

                {/* Tagline */}
                <p className="text-xs font-semibold tracking-widest uppercase mt-4" style={{ color: project.accentColor }}>
                  {project.tagline}
                </p>
                <h2>{project.name}</h2>
                <p className="text-blue-50 text-sm leading-relaxed mt-2">{project.description}</p>

                {/* Tech pills */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-full text-xs font-medium border border-black-50 bg-black-100 text-white-50"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <ProjectButtons project={project} />
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
