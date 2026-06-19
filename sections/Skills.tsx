"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Cpu, Server, Monitor, Cloud, Code2, BookOpen } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { skillCategories } from "@/data/skills";

const iconMap: Record<string, React.ElementType> = {
  Brain, Cpu, Server, Monitor, Cloud, Code2, BookOpen,
};

export default function Skills() {
  const [active, setActive] = useState(skillCategories[0].id);
  const cat = skillCategories.find(c => c.id === active)!;
  const Icon = iconMap[cat.icon] ?? Brain;

  return (
    <section id="skills" className="section-pad"
      style={{ background: "linear-gradient(180deg, #0a0a0a 0%, #080808 100%)" }}>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(196,154,60,0.12),transparent)" }} />

      <div className="container-lg">
        <SectionHeader
          eyebrow="Skills"
          title="My technical stack"
          description="Tools and technologies I reach for — organized by domain. No rankings, no ratings, just what I know and use."
        />

        <div className="grid lg:grid-cols-[210px_1fr] gap-5">
          {/* Sidebar tabs */}
          <div className="flex lg:flex-col gap-2 flex-wrap">
            {skillCategories.map(c => {
              const CIcon = iconMap[c.icon] ?? Brain;
              const isCurrent = c.id === active;
              return (
                <button
                  key={c.id}
                  id={`skill-tab-${c.id}`}
                  onClick={() => setActive(c.id)}
                  className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium text-left transition-all duration-200"
                  style={
                    isCurrent
                      ? { background: "var(--gold-dim)", color: "var(--gold)", border: "1px solid var(--gold-border)" }
                      : { background: "transparent", color: "var(--text-3)", border: "1px solid transparent" }
                  }
                >
                  <CIcon size={14} />
                  <span className="flex-1">{c.name}</span>
                  <span className="text-xs tabular-nums" style={{ color: isCurrent ? "rgba(196,154,60,0.6)" : "var(--text-3)" }}>
                    {c.skills.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.25, ease: [0.22,1,0.36,1] }}
              className="glass-card p-6 md:p-8"
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-7">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "var(--gold-dim)", border: "1px solid var(--gold-border)" }}>
                  <Icon size={17} style={{ color: "var(--gold)" }} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm" style={{ color: "var(--text-1)" }}>{cat.name}</h3>
                  <p className="text-xs" style={{ color: "var(--text-3)" }}>{cat.skills.length} skills</p>
                </div>
              </div>

              {/* Tag cloud — NO bars, NO ratings */}
              <div className="flex flex-wrap gap-2.5">
                {cat.skills.map((skill, i) => (
                  <motion.span
                    key={skill.name}
                    className="tag-pill text-sm py-2 px-3.5"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04, duration: 0.25 }}
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
