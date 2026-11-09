"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, Code2, BookOpen, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/shared/BrandIcons";
import { LINKS } from "@/lib/sections";
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

const FOCUS = ["Multi-Agent AI", "Semantic Search", "Computer Vision", "RAG / LangGraph", "Distributed Systems"];

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
    <section id="identity" className="relative w-full pt-20 pb-24 md:pt-28 md:pb-28">
      <div className="mx-auto max-w-[1200px] px-5 md:px-14">
        <div className="grid grid-cols-1 gap-14 xl:grid-cols-[1fr_400px] xl:gap-20">

          {/* LEFT: bio */}
          <div>
            <FadeUp>
              <p className="section-eyebrow mb-6">
                <span className="text-[var(--gold)]">00</span>
                <span aria-hidden className="h-px w-8 bg-[var(--gold-border)]" />
                <span>About</span>
              </p>
            </FadeUp>

            <FadeUp delay={0.06}>
              <h2 className="mb-6 text-3xl font-bold leading-[1.1] tracking-tight md:text-5xl text-balance">
                I take AI from <span className="text-[var(--gold)]">research</span> to{" "}
                <span className="text-[var(--gold)]">production</span>.
              </h2>
            </FadeUp>

            <FadeUp delay={0.12}>
              <div className="mb-8 max-w-2xl space-y-4 text-base leading-relaxed text-[var(--text-2)]/85 md:text-lg text-pretty">
                <p>
                  I&apos;m a third-year computer science student at MIT Bengaluru, studying AI &amp; Data Science
                  at IIT Guwahati alongside. Over the last year I&apos;ve shipped a candidate search engine over
                  110M+ records at Provaantech, a real-time face recognition pipeline at AVSS Tech, and rainfall
                  prediction research published at IEEE IGARSS 2026.
                </p>
                <p>
                  I care about tests, latency budgets and monitoring as much as model accuracy, and I do my best
                  work on small teams that ship fast.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.18}>
              <ul className="mb-8 flex flex-wrap gap-2" aria-label="Focus areas">
                {FOCUS.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-[rgba(196,154,60,0.2)] bg-[rgba(196,154,60,0.06)] px-3 py-1.5 text-xs font-semibold text-[var(--text-2)]"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </FadeUp>

            <FadeUp delay={0.24}>
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

          {/* RIGHT: photo + stats */}
          <div className="flex flex-col gap-6">
            <motion.div
              className="flex items-center gap-5 rounded-2xl border border-white/[0.07] bg-[rgba(14,14,16,0.7)] p-5"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <div className="relative flex-shrink-0">
                <div aria-hidden className="absolute -inset-1 rounded-full bg-[linear-gradient(135deg,#C49A3C,#DDB854,#C49A3C)] opacity-60 blur-sm" />
                <div className="relative size-24 overflow-hidden rounded-full border-2 border-[rgba(196,154,60,0.4)] md:size-28">
                  <Image
                    src="/profile.webp"
                    alt="Portrait of Utkarsh Kumar"
                    fill
                    sizes="112px"
                    className="object-cover object-[50%_30%]"
                  />
                </div>
              </div>
              <div className="min-w-0">
                <p className="text-lg font-bold text-white">Utkarsh Kumar</p>
                <p className="text-sm text-[var(--text-3)]">AI Systems Engineer</p>
                <p className="mt-2 flex items-center gap-1.5 text-xs text-[var(--text-3)]">
                  <MapPin size={12} /> Bengaluru, India
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-[var(--text-3)]">
                  <BookOpen size={12} /> IEEE IGARSS 2026 author
                </p>
              </div>
            </motion.div>

            <dl className="grid grid-cols-2 gap-3">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="relative overflow-hidden rounded-2xl border border-[rgba(196,154,60,0.12)] bg-[rgba(14,14,16,0.9)] p-5 transition-colors hover:border-[rgba(196,154,60,0.3)]"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, delay: i * 0.08 + 0.15, ease: EASE }}
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
