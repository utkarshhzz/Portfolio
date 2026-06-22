"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Projects using reference screenshot images + your real projects
const PROJECTS = [
  {
    id: 1,
    name: "AI Candidate Discovery Engine",
    description:
      "Production-grade semantic search system surfacing the top 10 candidates from 110M+ resumes in under 10 seconds. Built with Azure AI Search, OpenAI embeddings, and a GPT-powered match rationale layer.",
    tech: ["Python", "FastAPI", "Azure AI Search", "OpenAI"],
    image: "/project1.png",
    githubUrl: "https://github.com/utkarshhzz",
  },
  {
    id: 2,
    name: "CrowdWisdom.AI",
    description:
      "Multi-Agent AI orchestration platform for collective intelligence and automated decision synthesis with real-time voice output.",
    tech: ["Python", "LangGraph", "FastAPI"],
    image: "/project2.png",
    githubUrl: "https://github.com/utkarshhzz",
  },
  {
    id: 3,
    name: "SmurfPakad — Fraud Detection",
    description:
      "Blockchain fraud detection using Graph Neural Networks to identify smurf account clusters in Web3 gaming ecosystems.",
    tech: ["Python", "GraphSAGE", "PyTorch"],
    image: "/project3.png",
    githubUrl: "https://github.com/utkarshhzz",
  },
];

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
    >
      {children}
    </motion.div>
  );
}

export default function ShowcaseSection() {
  const [featured, second, third] = PROJECTS;

  return (
    <section id="projects" className="w-full bg-black">
      <div className="app-showcase">
        <div className="showcaselayout">

          {/* ── Featured Project (left 60%) ── */}
          <FadeIn className="first-project-wrapper">
            {/* Image */}
            <div className="image-wrapper">
              <Image
                src={featured.image}
                alt={featured.name}
                fill
                className="object-cover rounded-xl"
                sizes="60vw"
              />
            </div>

            {/* Text */}
            <div className="text-content">
              <div className="badges">
                {featured.tech.map(t => (
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
              {featured.githubUrl && (
                <a
                  href={featured.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-lg bg-black-200 border border-black-50 text-white-50 text-sm font-medium hover:bg-black-50 transition-colors"
                >
                  GitHub ↗
                </a>
              )}
            </div>
          </FadeIn>

          {/* ── Two smaller projects (right 40%) ── */}
          <div className="project-list-wrapper">
            {[second, third].map((project, i) => (
              <FadeIn key={project.id} delay={i * 0.15 + 0.1}>
                {/* Image */}
                <div className="image-wrapper">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover rounded-xl"
                    sizes="40vw"
                  />
                </div>
                <h2>{project.name}</h2>
                <p className="text-blue-50 text-sm leading-relaxed mt-2">
                  {project.description}
                </p>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-3 text-sm font-medium text-white-50 hover:text-white transition-colors"
                  >
                    GitHub ↗
                  </a>
                )}
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
