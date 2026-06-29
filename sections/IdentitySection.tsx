"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

/* ── Animated counter ── */
function Counter({ to, suffix }: { to: number; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const dur = 2000; const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - t0) / dur, 1);
          setN(Math.round((1 - Math.pow(1 - p, 3)) * to));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref} className="tabular-nums">{n}{suffix}</span>;
}

const STATS = [
  { to: 110, suffix: "M+", label: "Resumes Searched",     sub: "Production · Olumio" },
  { to: 75,  suffix: "K+", label: "Prize Money Won ₹",    sub: "2× National Hackathons" },
  { to: 3,   suffix: "+",  label: "Research Projects",     sub: "CV · NLP · Multi-agent" },
  { to: 2,   suffix: "×",  label: "Hackathon Wins",        sub: "Top placement both times" },
];

// Specialization tags
const TAGS = [
  "Multi-Agent AI",
  "Semantic Search",
  "Computer Vision",
  "LangGraph / RAG",
  "Production ML",
];

// Social links — properly sized with icons
const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/utkarshhzz",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/utkarsh-kumar-801703321/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:unofficialutkarsh.06@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} width="18" height="18">
        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
    ),
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/utkarshzz/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M13.483 0a1.374 1.374 0 00-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 00-1.209 2.104 5.35 5.35 0 00-.125 2.227 5.465 5.465 0 00.35 1.938 5.337 5.337 0 001.047 1.7l4.468 4.58a1.37 1.37 0 001.977.014l1.434-1.428a1.373 1.373 0 00.009-1.932L9.118 17.4l-1.42-1.457a2.604 2.604 0 01-.763-1.861 2.56 2.56 0 01.246-1.094 2.59 2.59 0 01.717-.928L12 8.73l4.1-4.214a1.374 1.374 0 00-.02-1.94L14.68.47a1.374 1.374 0 00-1.197-.47zm4.026 5.918L14.16 9.418l3.324 3.41a5.355 5.355 0 010 7.502l-.006.005c-.05.05-.099.094-.15.14l-.005.003a5.306 5.306 0 01-7.49-.022l-1.42-1.457 2.86-2.86 1.42 1.457a1.374 1.374 0 001.963.014l.005-.005a1.374 1.374 0 000-1.94l-3.324-3.41 3.347-3.437a1.374 1.374 0 000-1.943l-.007-.007a1.374 1.374 0 00-1.94.008z"/>
      </svg>
    ),
  },
];

// Stagger animation helper
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function IdentitySection() {
  return (
    <section
      id="identity"
      className="w-full relative"
      style={{ background: "#080808", paddingTop: "6rem", paddingBottom: "7rem" }}
    >
      {/* Top gold line */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(196,154,60,0.25),transparent)" }}
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-14">

        {/* ── STATUS BADGE ── */}
        <FadeUp delay={0}>
          <div className="flex items-center gap-2 mb-8">
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border"
              style={{ background: "rgba(74,222,128,0.06)", borderColor: "rgba(74,222,128,0.2)", color: "#4ade80" }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "#4ade80" }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "#4ade80" }} />
              </span>
              Open to opportunities
            </span>
            <span className="hidden md:block text-xs font-medium" style={{ color: "var(--text-3)" }}>
              MIT Bangalore · IIT Guwahati
            </span>
          </div>
        </FadeUp>

        {/* ── MAIN HEADLINE — two-col on XL ── */}
        <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-12 xl:gap-20">

          {/* LEFT */}
          <div className="flex-1">
            {/* Name — huge gradient */}
            <FadeUp delay={0.05}>
              <h1
                className="font-extrabold leading-none tracking-tighter mb-4"
                style={{
                  fontSize: "clamp(3.5rem, 8vw, 7rem)",
                  background: "linear-gradient(135deg, #EFEFEA 40%, #C49A3C 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Utkarsh<br />Kumar
              </h1>
            </FadeUp>

            {/* Role with animated underline */}
            <FadeUp delay={0.12}>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px flex-1 max-w-[40px]" style={{ background: "var(--gold)" }} />
                <p
                  className="font-bold uppercase tracking-widest text-sm"
                  style={{ color: "var(--gold)" }}
                >
                  AI Systems Engineer
                </p>
              </div>
            </FadeUp>

            {/* Specialization chips */}
            <FadeUp delay={0.18}>
              <div className="flex flex-wrap gap-2 mb-7">
                {TAGS.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold"
                    style={{
                      background: "rgba(196,154,60,0.08)",
                      border: "1px solid rgba(196,154,60,0.2)",
                      color: "var(--text-2)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </FadeUp>

            {/* Bio */}
            <FadeUp delay={0.24}>
              <p
                className="text-base md:text-lg leading-relaxed mb-8 max-w-lg"
                style={{ color: "var(--text-3)" }}
              >
                I build production-grade AI systems — not demos. From 110M-resume semantic search
                to multi-agent RAG pipelines, I bridge the gap between research and reality.
              </p>
            </FadeUp>

            {/* CTA buttons */}
            <FadeUp delay={0.3}>
              <div className="flex flex-wrap gap-3 mb-8">
                <button
                  className="btn-primary"
                  onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                >
                  See My Work
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </button>
                <a href="/resume.pdf" download="Utkarsh_Kumar_Resume.pdf" className="btn-secondary">
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M16 10l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Resume
                </a>
              </div>
            </FadeUp>

            {/* Social icon buttons — PROPERLY SIZED */}
            <FadeUp delay={0.36}>
              <div className="flex flex-wrap gap-3">
                {SOCIALS.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      borderColor: "rgba(255,255,255,0.08)",
                      background: "rgba(255,255,255,0.03)",
                      color: "var(--text-2)",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = "rgba(196,154,60,0.35)";
                      e.currentTarget.style.color = "var(--gold)";
                      e.currentTarget.style.background = "rgba(196,154,60,0.06)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                      e.currentTarget.style.color = "var(--text-2)";
                      e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                    }}
                  >
                    {icon}
                    <span>{label}</span>
                  </a>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* RIGHT — Profile photo + Stats cards */}
          <div className="xl:w-[400px] xl:flex-shrink-0 flex flex-col gap-5">

            {/* ── Profile photo ── */}
            <motion.div
              className="flex justify-center xl:justify-start"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative">
                {/* Gold ring */}
                <div
                  className="absolute -inset-1 rounded-full blur-sm opacity-60"
                  style={{ background: "linear-gradient(135deg, #C49A3C, #DDB854, #C49A3C)" }}
                />
                {/* Photo */}
                <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-full overflow-hidden border-2" style={{ borderColor: "rgba(196,154,60,0.4)" }}>
                  <Image
                    src="/utkarsh.png"
                    alt="Utkarsh Kumar"
                    fill
                    className="object-cover object-top"
                    priority
                    sizes="(max-width: 768px) 176px, 208px"
                  />
                </div>
                {/* Online indicator */}
                <span
                  className="absolute bottom-3 right-3 w-4 h-4 rounded-full border-2"
                  style={{ background: "#4ade80", borderColor: "#080808" }}
                />
              </div>
            </motion.div>

            {/* ── Stats grid ── */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="rounded-2xl p-5 relative overflow-hidden"
                  style={{
                    background: "rgba(14,14,16,0.9)",
                    border: "1px solid rgba(196,154,60,0.12)",
                  }}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, delay: i * 0.1 + 0.25, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ scale: 1.02, borderColor: "rgba(196,154,60,0.3)" }}
                >
                  <div
                    className="absolute -top-4 -right-4 w-16 h-16 rounded-full opacity-20 blur-2xl pointer-events-none"
                    style={{ background: "var(--gold)" }}
                  />
                  <div
                    className="font-extrabold leading-none mb-2 tabular-nums"
                    style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", letterSpacing: "-0.04em", color: "var(--gold)" }}
                  >
                    <Counter to={s.to} suffix={s.suffix} />
                  </div>
                  <p className="text-sm font-semibold mb-0.5" style={{ color: "var(--text-1)" }}>{s.label}</p>
                  <p className="text-xs" style={{ color: "var(--text-3)" }}>{s.sub}</p>
                </motion.div>
              ))}
            </div>

            {/* ── School logos row ── */}
            <motion.div
              className="rounded-xl px-5 py-4 flex items-center gap-4"
              style={{ background: "rgba(196,154,60,0.05)", border: "1px solid rgba(196,154,60,0.13)" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.75 }}
            >
              <span className="text-lg">🎓</span>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0" style={{ background: "#fff", padding: "2px" }}>
                  <Image src="/manipal.png" alt="MIT Bengaluru" width={28} height={28} className="object-contain w-full h-full" />
                </div>
                <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0" style={{ background: "#fff", padding: "2px" }}>
                  <Image src="/iitg.png" alt="IIT Guwahati" width={28} height={28} className="object-contain w-full h-full" />
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold" style={{ color: "var(--text-1)" }}>MIT Bengaluru · IIT Guwahati</p>
                <p className="text-[10px]" style={{ color: "var(--text-3)" }}>Dual Degree · 2024–2028</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom separator */}
      <div
        className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(196,154,60,0.15),transparent)" }}
      />
    </section>
  );
}
