"use client";

import { useActiveSection } from "@/lib/hooks/useActiveSection";
import { SECTIONS, SECTION_IDS, scrollToSection } from "@/lib/sections";

/** Right-edge dot navigation (desktop only). */
export default function SectionProgress() {
  const active = useActiveSection(SECTION_IDS);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-5 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-end gap-2.5 xl:flex"
    >
      {SECTIONS.map((s) => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => scrollToSection(s.id)}
            className="group flex items-center gap-2 py-0.5"
            aria-label={`Go to ${s.label}`}
            aria-current={isActive}
          >
            <span
              className="translate-x-1 text-[10px] font-medium opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:opacity-100"
              style={{ color: isActive ? "var(--gold)" : "var(--text-3)" }}
            >
              {s.label}
            </span>
            <span className={`progress-dot ${isActive ? "active" : ""}`} />
          </button>
        );
      })}
    </nav>
  );
}
