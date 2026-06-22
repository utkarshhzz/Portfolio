"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const NAV_LINKS = [
  { name: "Work",         href: "projects" },
  { name: "Experience",   href: "experience" },
  { name: "Skills",       href: "skills" },
  { name: "Testimonials", href: "testimonials" },
];

export default function Navbar() {
  const [visible,    setVisible]    = useState(false); // hidden during hero
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const update = () => {
      // Hero section is 350vh tall — navbar only appears after it ends
      const heroEl = document.getElementById("hero");
      const heroBottom = heroEl
        ? heroEl.offsetTop + heroEl.offsetHeight - window.innerHeight
        : window.innerHeight * 2.5;

      const pastHero = window.scrollY >= heroBottom;
      setVisible(pastHero);
      setScrolled(pastHero); // dark bg from the moment it appears
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -12 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: visible ? "auto" : "none" }}
    >
      <div className="inner">

        {/* Logo — full name */}
        <button
          className="logo flex items-center"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <span className="text-sm md:text-base font-semibold tracking-tight" style={{ color: "var(--text-1)" }}>
            Utkarsh Kumar
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="desktop" aria-label="Main navigation">
          <ul>
            {NAV_LINKS.map(link => (
              <li key={link.name}>
                <span onClick={() => scrollTo(link.href)}>{link.name}</span>
                <div className="underline" />
              </li>
            ))}
          </ul>
        </nav>

        {/* Right side: Resume + Contact */}
        <div className="flex items-center gap-3">
          <a
            href="/resume.pdf"
            download="Utkarsh_Kumar_Resume.pdf"
            className="hidden md:flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border transition-colors duration-200"
            style={{ borderColor: "rgba(196,154,60,0.3)", color: "var(--gold)", background: "rgba(196,154,60,0.06)" }}
          >
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M16 10l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Resume
          </a>

          <button
            onClick={() => scrollTo("contact")}
            className="contact-btn hidden md:flex"
          >
            <div className="inner">
              <span>Contact me</span>
            </div>
          </button>

          {/* Mobile hamburger */}
          <button
            className="flex lg:hidden p-2 rounded-lg text-white-50 bg-black-100 border border-black-50"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden mx-4 mt-2 mb-4 rounded-xl overflow-hidden border border-black-50 bg-black-100"
          >
            {NAV_LINKS.map(link => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.href)}
                className="flex w-full items-center px-5 py-3.5 text-sm font-medium text-white-50 hover:text-white border-b border-black-50/50 transition-colors last:border-0"
              >
                {link.name}
              </button>
            ))}
            <div className="px-4 py-3 flex gap-2">
              <a
                href="/resume.pdf"
                download="Utkarsh_Kumar_Resume.pdf"
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-center border transition-colors"
                style={{ borderColor: "rgba(196,154,60,0.3)", color: "var(--gold)", background: "rgba(196,154,60,0.08)" }}
              >
                Resume
              </a>
              <button
                onClick={() => scrollTo("contact")}
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold bg-white text-black transition-colors"
              >
                Contact me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
