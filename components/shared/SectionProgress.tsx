"use client";

import { motion } from "framer-motion";
import { useActiveSection } from "@/lib/hooks/useActiveSection";

const sections = [
  { id: "hero",         label: "Intro" },
  { id: "identity",     label: "About" },
  { id: "projects",     label: "Work" },
  { id: "experience",   label: "Experience" },
  { id: "skills",       label: "Skills" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact",      label: "Contact" },
];

export default function SectionProgress() {
  const active = useActiveSection(sections.map(s => s.id), "-30% 0px -30% 0px");

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-2.5 items-end"
    >
      {sections.map(s => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            id={`progress-dot-${s.id}`}
            onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}
            className="group flex items-center gap-2"
            aria-label={`Go to ${s.label}`}
          >
            <span
              className="text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0"
              style={{ color: isActive ? "var(--gold)" : "var(--text-3)" }}
            >
              {s.label}
            </span>
            <span
              className={`progress-dot ${isActive ? "active" : ""}`}
              style={{ transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)" }}
            />
          </button>
        );
      })}
    </nav>
  );
}
