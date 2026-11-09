"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Command, Download, Menu, X } from "lucide-react";
import { useActiveSection } from "@/lib/hooks/useActiveSection";
import { LINKS, SECTIONS, SECTION_IDS, scrollToSection } from "@/lib/sections";

const NAV = SECTIONS.filter((s) => s.nav);

export default function Navbar({ onOpenPalette }: { onOpenPalette: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  // Transparent over the top of the hero, solid once the page scrolls
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const go = (id: string) => {
    setMobileOpen(false);
    scrollToSection(id);
  };

  return (
    <motion.header
      className="navbar"
      data-solid={scrolled || mobileOpen}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6">
        <button
          type="button"
          onClick={() => { setMobileOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          aria-label="Utkarsh Kumar, back to top"
          className="flex items-center gap-2.5 font-semibold tracking-tight text-[var(--text-1)]"
        >
          <span aria-hidden className="grid size-8 place-items-center rounded-lg border border-[var(--gold-border)] bg-[var(--gold-dim)] font-mono text-[13px] text-[var(--gold)]">
            UK
          </span>
          <span className="text-[15px]">Utkarsh Kumar</span>
        </button>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {NAV.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  className="nav-link"
                  aria-current={active === s.id}
                  onClick={() => go(s.id)}
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenPalette}
            className="hidden md:inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-1.5 font-mono text-[11px] text-[var(--text-3)] transition-colors hover:border-white/20 hover:text-[var(--text-1)]"
            aria-label="Open command palette"
          >
            <Command size={12} /> K
          </button>
          <a
            href={LINKS.resume}
            download="Utkarsh_Kumar_Resume.pdf"
            className="hidden md:inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors hover:bg-[rgba(196,154,60,0.12)]"
            style={{ borderColor: "var(--gold-border)", color: "var(--gold)" }}
          >
            <Download size={13} /> Resume
          </a>
          <button
            type="button"
            onClick={() => go("contact")}
            className="hidden md:inline-flex rounded-lg bg-[var(--text-1)] px-4 py-2 text-xs font-semibold text-black transition-colors hover:bg-white"
          >
            Contact me
          </button>
          <button
            type="button"
            className="icon-btn lg:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="lg:hidden overflow-hidden"
          >
            <ul className="flex flex-col pb-3">
              {[...NAV, SECTIONS.find((s) => s.id === "contact")!].map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => go(s.id)}
                    aria-current={active === s.id}
                    className="flex w-full items-center justify-between border-b border-white/[0.06] py-3.5 text-left text-[15px] font-medium text-[var(--text-2)] aria-[current=true]:text-[var(--gold)]"
                  >
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
            <a
              href={LINKS.resume}
              download="Utkarsh_Kumar_Resume.pdf"
              className="mb-4 flex items-center justify-center gap-2 rounded-lg border py-3 text-sm font-semibold"
              style={{ borderColor: "var(--gold-border)", color: "var(--gold)" }}
            >
              <Download size={15} /> Download resume
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
