"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { ExternalLink } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { projects } from "@/data/projects";
import { Project, ProjectCategory } from "@/types";

const GHIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const tabs: { label: string; value: ProjectCategory }[] = [
  { label: "All",      value: "all" },
  { label: "AI / ML",  value: "ai" },
  { label: "Research", value: "research" },
  { label: "Web",      value: "web" },
];

export default function Projects() {
  const [active, setActive] = useState<ProjectCategory>("all");
  const filtered = active === "all" ? projects : projects.filter(p => p.category === active);

  return (
    <section id="projects" className="section-pad" style={{ background: "#080808" }}>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(196,154,60,0.12),transparent)" }} />

      <div className="container-lg">
        <SectionHeader
          eyebrow="Projects"
          title="Things I've built"
          description="From multi-agent orchestration to production search engines — each project pushes AI engineering limits."
        />

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {tabs.map(tab => (
            <button
              key={tab.value}
              id={`project-filter-${tab.value}`}
              onClick={() => setActive(tab.value)}
              className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
              style={
                active === tab.value
                  ? { background: "var(--gold-dim)", color: "var(--gold)", border: "1px solid var(--gold-border)" }
                  : { background: "transparent", color: "var(--text-3)", border: "1px solid transparent" }
              }
            >
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  return (
    <motion.article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={e => {
        const r = e.currentTarget.getBoundingClientRect();
        setMousePos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22,1,0.36,1] }}
      whileHover={{ y: -5 }}
      id={`project-card-${project.id}`}
      className="relative rounded-2xl flex flex-col overflow-hidden cursor-default"
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow-card)",
        transition: "border-color 0.3s, box-shadow 0.3s",
        ...(hovered ? { borderColor: "var(--gold-border)", boxShadow: "var(--shadow-card), 0 0 40px rgba(196,154,60,0.06)" } : {}),
      }}
    >
      {/* Gold top reveal bar */}
      <motion.div
        className="h-[2px] w-0 rounded-t-2xl"
        animate={{ width: hovered ? "100%" : "0%" }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        style={{ background: "linear-gradient(90deg, var(--gold), rgba(196,154,60,0.3))" }}
      />

      {/* Mouse spotlight */}
      {hovered && (
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl z-[1]"
          style={{ background: `radial-gradient(220px circle at ${mousePos.x}px ${mousePos.y}px, rgba(196,154,60,0.07), transparent 70%)` }}
        />
      )}

      <div className="flex flex-col flex-1 p-5 relative z-[2]">
        {/* Row: category + badge */}
        <div className="flex items-center justify-between mb-3">
          <span className="eyebrow">
            {project.category === "ai" ? "AI / ML" : project.category}
          </span>
          {project.featured && <span className="badge badge-gold">Featured</span>}
        </div>

        <h3 className="text-[1rem] font-bold mb-2 leading-snug transition-colors duration-200"
          style={{ color: hovered ? "var(--gold)" : "var(--text-1)", letterSpacing: "-0.01em" }}>
          {project.name}
        </h3>

        <p className="text-[0.8125rem] leading-relaxed mb-4 flex-1" style={{ color: "var(--text-2)" }}>
          {project.description}
        </p>

        {/* Hover: long description */}
        <AnimatePresence>
          {hovered && (
            <motion.p
              key="long"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22,1,0.36,1] }}
              className="overflow-hidden text-xs leading-relaxed mb-4 pt-3"
              style={{ color: "var(--text-3)", borderTop: "1px solid var(--border)" }}
            >
              {project.longDescription}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Tech */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map(t => <span key={t} className="tag-pill">{t}</span>)}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 pt-3.5" style={{ borderTop: "1px solid var(--border)" }}>
          {project.githubUrl && project.githubUrl !== "#" && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium transition-colors duration-200"
              style={{ color: "var(--text-3)" }}
              onClick={e => e.stopPropagation()}>
              <GHIcon /> GitHub
            </a>
          )}
          {project.demoUrl ? (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
              className="ml-auto flex items-center gap-1 text-xs font-semibold transition-colors duration-200"
              style={{ color: "var(--gold)" }}
              onClick={e => e.stopPropagation()}>
              Live Demo <ExternalLink size={11} />
            </a>
          ) : (
            <span className="ml-auto text-xs" style={{ color: "var(--text-3)" }}>
              In Development
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
