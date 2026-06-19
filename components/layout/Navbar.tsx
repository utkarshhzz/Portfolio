"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Menu, X, Download, Command } from "lucide-react";
import { useActiveSection } from "@/lib/hooks/useActiveSection";

const navLinks = [
  { id: "about",        label: "About" },
  { id: "experience",   label: "Experience" },
  { id: "projects",     label: "Projects" },
  { id: "skills",       label: "Skills" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact",      label: "Contact" },
];

export default function Navbar({ onCommandPalette }: { onCommandPalette: () => void }) {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [scrollPct,   setScrollPct]   = useState(0);
  const active = useActiveSection(navLinks.map(l => l.id));

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - innerHeight;
      setScrollPct(total > 0 ? window.scrollY / total : 0);
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const kd = (e: KeyboardEvent) => { if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); onCommandPalette(); } };
    window.addEventListener("keydown", kd);
    return () => window.removeEventListener("keydown", kd);
  }, [onCommandPalette]);

  useEffect(() => { document.body.style.overflow = mobileOpen ? "hidden" : ""; }, [mobileOpen]);

  return (
    <>
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[200] origin-left"
        style={{ transform: `scaleX(${scrollPct})`, background: "linear-gradient(90deg, var(--gold), var(--gold-light))", transformOrigin: "left" }} />

      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.22,1,0.36,1] }}
      >
        <div className="transition-all duration-300"
          style={{
            background: scrolled ? "rgba(8,8,8,0.82)" : "transparent",
            backdropFilter: scrolled ? "blur(24px) saturate(140%)" : "none",
            borderBottom: scrolled ? "1px solid var(--border)" : "none",
          }}>
          <div className="container-lg flex items-center justify-between h-16 px-6">

            {/* Logo */}
            <button id="navbar-logo" onClick={() => scrollTo("hero")}
              className="flex items-center gap-1.5 group">
              <span className="font-bold text-[15px] tracking-tight" style={{ color: "var(--text-1)" }}>UK</span>
              <span className="font-mono text-[15px] transition-colors duration-200 group-hover:text-[var(--gold)]"
                style={{ color: "rgba(196,154,60,0.6)" }}>/&gt;</span>
            </button>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-0.5">
              {navLinks.map(link => (
                <button key={link.id} id={`nav-${link.id}`} onClick={() => scrollTo(link.id)}
                  className="px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all duration-200"
                  style={{
                    color: active === link.id ? "var(--text-1)" : "var(--text-3)",
                    background: active === link.id ? "rgba(255,255,255,0.05)" : "transparent",
                  }}>
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div className="hidden md:flex items-center gap-2">
              <button id="navbar-cmd" onClick={onCommandPalette}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-all duration-200 hover:bg-white/[0.05]"
                style={{ color: "var(--text-3)", border: "1px solid var(--border)" }}>
                <Command size={11} /> K
              </button>
              <a href="/resume.pdf" id="navbar-resume" download="Utkarsh_Kumar_Resume.pdf"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
                style={{ background: "var(--gold-dim)", border: "1px solid var(--gold-border)", color: "var(--gold)" }}>
                <Download size={12} /> Resume
              </a>
            </div>

            {/* Hamburger */}
            <button id="navbar-mobile" className="md:hidden p-2 rounded-lg hover:bg-white/[0.05] transition-colors"
              onClick={() => setMobileOpen(p => !p)} aria-label="Toggle menu">
              {mobileOpen ? <X size={20} style={{ color: "var(--text-1)" }} /> : <Menu size={20} style={{ color: "var(--text-1)" }} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 md:hidden"
          style={{ background: "rgba(8,8,8,0.96)", backdropFilter: "blur(24px)" }}
          onClick={() => setMobileOpen(false)}
        >
          <nav className="absolute top-16 left-0 right-0 p-6 flex flex-col gap-1"
            onClick={e => e.stopPropagation()}>
            {navLinks.map((link, i) => (
              <motion.button key={link.id} onClick={() => scrollTo(link.id)}
                className="text-left py-3 px-4 rounded-xl text-lg font-medium transition-colors hover:bg-white/[0.04]"
                style={{ color: "var(--text-1)" }}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}>
                {link.label}
              </motion.button>
            ))}
            <div className="mt-6 flex flex-col gap-3">
              <a href="/resume.pdf" download className="btn-primary justify-center">
                <Download size={14} /> Download Resume
              </a>
            </div>
          </nav>
        </motion.div>
      )}
    </>
  );
}
