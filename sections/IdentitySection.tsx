"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Download, Mail, Code2, BookOpen } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/shared/BrandIcons";
import { LINKS, scrollToSection } from "@/lib/sections";
import { PODIUM_COUNT } from "@/data/achievements";

/* ── Animated counter ── */
function Counter({ to, prefix = "", suffix = "", decimals = 0 }: { to: number; prefix?: string; suffix?: string; decimals?: number }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      const t0 = performance.now();
      const step = (now: number) => {
        const p = Math.min((now - t0) / 1800, 1);
        setN((1 - Math.pow(1 - p, 3)) * to);
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => { obs.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{n.toFixed(decimals)}{suffix}
    </span>
  );
}

const STATS = [
  { to: 110, suffix: "M+", label: "Records searched", sub: "Production semantic search" },
  { to: PODIUM_COUNT, suffix: "", label: "Hackathon podiums", sub: "Incl. a national-level win" },
  { to: 1.5, prefix: "₹", suffix: "L+", decimals: 1, label: "Prize money", sub: "Across hackathons" },
  { to: 350, suffix: "+", label: "LeetCode solved", sub: "DSA in C++ & Python" },
];

const TAGS = ["Multi-Agent AI", "Semantic Search", "Computer Vision", "RAG / LangGraph", "Distributed Systems"];

const SOCIALS = [
  { label: "GitHub", href: LINKS.github, icon: <GithubIcon size={17} /> },
  { label: "LinkedIn", href: LINKS.linkedin, icon: <LinkedinIcon size={17} /> },
  { label: "LeetCode", href: LINKS.leetcode, icon: <Code2 size={17} /> },
  { label: "Email", href: `mailto:${LINKS.email}`, icon: <Mail size={17} /> },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export default function IdentitySection() {
  return (
    <section id="identity" className="relative w-full bg-[#080808] pt-20 pb-24 md:pt-24 md:pb-28">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(196,154,60,0.25),transparent)]" />

      <div className="mx-auto max-w-[1200px] px-5 md:px-14">
        <div className="flex flex-col gap-14 xl:flex-row xl:items-start xl:justify-between xl:gap-20">

          {/* LEFT */}
          <div className="flex-1">
            <FadeUp>
              <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-1.5 pr-3.5 text-xs text-[var(--text-2)]">
                <span className="grid size-6 place-items-center rounded-full bg-[var(--gold-dim)] text-[var(--gold)]">
                  <BookOpen size={12} />
                </span>
                Published researcher · IEEE IGARSS 2026
              </p>
            </FadeUp>

            <FadeUp delay={0.05}>
              <h1
                className="mb-5 font-extrabold leading-[0.95] tracking-tighter"
                style={{
                  fontSize: "clamp(3.25rem, 8vw, 7rem)",
                  background: "linear-gradient(135deg, #EFEFEA 40%, #C49A3C 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Utkarsh<br />Kumar
              </h1>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="mb-6 flex items-center gap-3">
                <span aria-hidden className="h-px w-10 bg-[var(--gold)]" />
                <p className="text-sm font-bold uppercase tracking-widest text-[var(--gold)]">
                  AI Systems Engineer
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.16}>
              <ul className="mb-8 flex flex-wrap gap-2">
                {TAGS.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-[rgba(196,154,60,0.2)] bg-[rgba(196,154,60,0.06)] px-3 py-1.5 text-xs font-semibold text-[var(--text-2)]"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </FadeUp>

            <FadeUp delay={0.22}>
              <h2 className="mb-4 text-3xl font-bold leading-tight md:text-5xl text-balance">
                I take AI from <span className="text-[var(--gold)]">research</span> to <span className="text-[var(--gold)]">production</span>.
              </h2>
              <p className="mb-8 max-w-xl text-base leading-relaxed text-[var(--text-2)]/85 md:text-lg text-pretty">
                Third-year CS student at MIT Bengaluru, studying AI &amp; Data Science at IIT Guwahati
                alongside. I&apos;ve shipped a candidate search engine over 110M+ records, real-time
                face recognition and multi-agent LLM systems, and I care about tests, latency budgets
                and monitoring as much as model accuracy.
              </p>
            </FadeUp>

            <FadeUp delay={0.28}>
              <div className="mb-8 flex flex-wrap gap-3">
                <button type="button" className="btn-primary" onClick={() => scrollToSection("projects")}>
                  See my work <ArrowUpRight size={15} strokeWidth={2.5} />
                </button>
                <a href={LINKS.resume} download="Utkarsh_Kumar_Resume.pdf" className="btn-secondary">
                  <Download size={15} /> Download resume
                </a>
              </div>
            </FadeUp>

            <FadeUp delay={0.34}>
              <ul className="flex flex-wrap gap-2.5">
                {SOCIALS.map(({ label, href, icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm font-semibold text-[var(--text-2)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[rgba(196,154,60,0.35)] hover:bg-[rgba(196,154,60,0.06)] hover:text-[var(--gold)]"
                    >
                      {icon}
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-6 xl:w-[400px] xl:flex-shrink-0">
            <motion.div
              className="flex flex-col items-center gap-4"
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <div className="relative">
                <div aria-hidden className="absolute -inset-1 rounded-full bg-[linear-gradient(135deg,#C49A3C,#DDB854,#C49A3C)] opacity-60 blur-sm" />
                <div className="relative size-44 overflow-hidden rounded-full border-2 border-[rgba(196,154,60,0.4)] md:size-52">
                  <Image
                    src="/profile.webp"
                    alt="Portrait of Utkarsh Kumar"
                    fill
                    sizes="(max-width: 768px) 176px, 208px"
                    className="object-cover object-[50%_30%]"
                  />
                </div>
              </div>
              <p className="inline-flex items-center gap-2 rounded-full border border-[rgba(74,222,128,0.25)] bg-[rgba(74,222,128,0.06)] px-3 py-1 text-xs font-medium text-[#86efac]">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ade80] opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-[#4ade80]" />
                </span>
                Open to SWE / ML roles &amp; internships
              </p>
            </motion.div>

            <dl className="grid grid-cols-2 gap-3">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="relative overflow-hidden rounded-2xl border border-[rgba(196,154,60,0.12)] bg-[rgba(14,14,16,0.9)] p-5 transition-colors hover:border-[rgba(196,154,60,0.3)]"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, delay: i * 0.08 + 0.2, ease: EASE }}
                >
                  <div aria-hidden className="pointer-events-none absolute -right-4 -top-4 size-16 rounded-full bg-[var(--gold)] opacity-15 blur-2xl" />
                  <dd
                    className="mb-2 font-extrabold leading-none text-[var(--gold)]"
                    style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.1rem)", letterSpacing: "-0.04em" }}
                  >
                    <Counter to={s.to} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
                  </dd>
                  <dt>
                    <span className="block text-sm font-semibold text-[var(--text-1)]">{s.label}</span>
                    <span className="block text-xs text-[var(--text-3)]">{s.sub}</span>
                  </dt>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
