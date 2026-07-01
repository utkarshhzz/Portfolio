"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/* ─── Types ────────────────────────────────────────────────────── */
interface GitHubData {
  public_repos: number;
  followers: number;
  following: number;
  public_gists: number;
}

interface LeetCodeData {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  acceptanceRate: number;
  ranking: number;
  totalQuestions: number;
  totalEasy: number;
  totalMedium: number;
  totalHard: number;
}

/* ─── Animation helper ─────────────────────────────────────────── */
function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Thin progress bar ────────────────────────────────────────── */
function Bar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
      <motion.div
        className="h-full rounded-full"
        style={{ background: color }}
        initial={{ width: 0 }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: "easeOut", delay: 0.2 }}
      />
    </div>
  );
}

/* ─── Stat pill ───────────────────────────────────────────────── */
function StatPill({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-2xl p-4 gap-1"
      style={{ background: `${color}0d`, border: `1px solid ${color}22` }}
    >
      <span className="text-xl font-extrabold tabular-nums" style={{ color }}>{value}</span>
      <span className="text-[10px] uppercase tracking-widest" style={{ color: "var(--text-3)" }}>{label}</span>
    </div>
  );
}

/* ─── GitHub Card ──────────────────────────────────────────────── */
function GitHubCard() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.github.com/users/utkarshhzz")
      .then(r => r.json())
      .then((d: GitHubData) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const GOLD = "#C49A3C";

  return (
    <div
      className="rounded-2xl p-7 h-full flex flex-col gap-6 relative overflow-hidden transition-all duration-300"
      style={{ background: "rgba(10,10,12,0.95)", border: "1px solid rgba(196,154,60,0.18)" }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(196,154,60,0.4)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 48px rgba(196,154,60,0.08)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(196,154,60,0.18)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
    >
      {/* Ambient glow */}
      <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(196,154,60,0.07)" }} />

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(196,154,60,0.1)", border: "1px solid rgba(196,154,60,0.2)" }}>
          <svg viewBox="0 0 24 24" fill={GOLD} width="20" height="20">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: GOLD }}>GitHub</p>
          <a
            href="https://github.com/utkarshhzz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold text-white hover:underline"
          >
            @utkarshhzz
          </a>
        </div>
      </div>

      {/* Stats grid */}
      {loading ? (
        <div className="grid grid-cols-2 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-16 rounded-2xl animate-pulse" style={{ background: "rgba(255,255,255,0.04)" }} />
          ))}
        </div>
      ) : data ? (
        <div className="grid grid-cols-2 gap-3">
          <StatPill label="Public Repos"  value={data.public_repos}  color={GOLD} />
          <StatPill label="Followers"     value={data.followers}     color="#4ade80" />
          <StatPill label="Following"     value={data.following}     color="#60a5fa" />
          <StatPill label="Public Gists"  value={data.public_gists}  color="#a78bfa" />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <StatPill label="Public Repos"  value="—" color={GOLD} />
          <StatPill label="Followers"     value="—" color="#4ade80" />
          <StatPill label="Following"     value="—" color="#60a5fa" />
          <StatPill label="Public Gists"  value="—" color="#a78bfa" />
        </div>
      )}

      {/* Streak image widget */}
      <div className="rounded-xl overflow-hidden" style={{ background: "#0a0a0c" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://streak-stats.demolab.com/?user=utkarshhzz&theme=transparent&hide_border=true&background=0a0a0c&stroke=C49A3C&ring=C49A3C&fire=DDB854&currStreakNum=FFFFFF&sideNums=FFFFFF&currStreakLabel=C49A3C&sideLabels=C49A3C&dates=556070&type=png`}
          alt="GitHub Streak Stats"
          className="w-full h-auto"
          loading="lazy"
        />
      </div>

      {/* View profile link */}
      <a
        href="https://github.com/utkarshhzz"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
        style={{ background: "rgba(196,154,60,0.08)", border: "1px solid rgba(196,154,60,0.2)", color: GOLD }}
      >
        View GitHub Profile
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  );
}

/* ─── LeetCode Card ────────────────────────────────────────────── */
function LeetCodeCard() {
  const [data, setData] = useState<LeetCodeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://leetcode-stats-api.herokuapp.com/utkarshzz")
      .then(r => r.json())
      .then((d: LeetCodeData) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const ORANGE = "#f97316";
  const EASY   = "#4ade80";
  const MEDIUM = "#fbbf24";
  const HARD   = "#f87171";

  const totalSolved   = data?.totalSolved   ?? 0;
  const easySolved    = data?.easySolved    ?? 0;
  const mediumSolved  = data?.mediumSolved  ?? 0;
  const hardSolved    = data?.hardSolved    ?? 0;
  const totalEasy     = data?.totalEasy     ?? 800;
  const totalMedium   = data?.totalMedium   ?? 1700;
  const totalHard     = data?.totalHard     ?? 700;

  const difficulties = [
    { label: "Easy",   solved: easySolved,   total: totalEasy,   color: EASY,   pct: totalEasy   ? (easySolved / totalEasy) * 100   : 0 },
    { label: "Medium", solved: mediumSolved, total: totalMedium, color: MEDIUM, pct: totalMedium ? (mediumSolved / totalMedium) * 100 : 0 },
    { label: "Hard",   solved: hardSolved,   total: totalHard,   color: HARD,   pct: totalHard   ? (hardSolved / totalHard) * 100   : 0 },
  ];

  return (
    <div
      className="rounded-2xl p-7 h-full flex flex-col gap-6 relative overflow-hidden transition-all duration-300"
      style={{ background: "rgba(10,10,12,0.95)", border: "1px solid rgba(249,115,22,0.18)" }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(249,115,22,0.4)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 48px rgba(249,115,22,0.08)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(249,115,22,0.18)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
    >
      {/* Ambient glow */}
      <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(249,115,22,0.06)" }} />

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.2)" }}>
          <svg viewBox="0 0 24 24" fill={ORANGE} width="20" height="20">
            <path d="M13.483 0a1.374 1.374 0 00-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 00-1.209 2.104 5.35 5.35 0 00-.125 2.227 5.465 5.465 0 00.35 1.938 5.337 5.337 0 001.047 1.7l4.468 4.58a1.37 1.37 0 001.977.014l1.434-1.428a1.373 1.373 0 00.009-1.932L9.118 17.4l-1.42-1.457a2.604 2.604 0 01-.763-1.861 2.56 2.56 0 01.246-1.094 2.59 2.59 0 01.717-.928L12 8.73l4.1-4.214a1.374 1.374 0 00-.02-1.94L14.68.47a1.374 1.374 0 00-1.197-.47zm4.026 5.918L14.16 9.418l3.324 3.41a5.355 5.355 0 010 7.502l-.006.005c-.05.05-.099.094-.15.14l-.005.003a5.306 5.306 0 01-7.49-.022l-1.42-1.457 2.86-2.86 1.42 1.457a1.374 1.374 0 001.963.014l.005-.005a1.374 1.374 0 000-1.94l-3.324-3.41 3.347-3.437a1.374 1.374 0 000-1.943l-.007-.007a1.374 1.374 0 00-1.94.008z"/>
          </svg>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: ORANGE }}>LeetCode</p>
          <a
            href="https://leetcode.com/u/utkarshzz/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold text-white hover:underline"
          >
            @utkarshzz
          </a>
        </div>
      </div>

      {/* Total solved donut summary */}
      {loading ? (
        <div className="h-24 rounded-2xl animate-pulse" style={{ background: "rgba(255,255,255,0.04)" }} />
      ) : (
        <div
          className="rounded-xl px-6 py-5 flex items-center justify-between"
          style={{ background: "rgba(249,115,22,0.06)", border: "1px solid rgba(249,115,22,0.12)" }}
        >
          <div>
            <p className="text-4xl font-extrabold tabular-nums" style={{ color: ORANGE }}>
              {totalSolved}
            </p>
            <p className="text-xs uppercase tracking-widest mt-1" style={{ color: "var(--text-3)" }}>Problems Solved</p>
          </div>
          {data?.ranking && (
            <div className="text-right">
              <p className="text-lg font-bold" style={{ color: "var(--text-1)" }}>
                #{data.ranking.toLocaleString()}
              </p>
              <p className="text-[10px] uppercase tracking-widest mt-0.5" style={{ color: "var(--text-3)" }}>Global Rank</p>
            </div>
          )}
          {data?.acceptanceRate && (
            <div className="text-right">
              <p className="text-lg font-bold" style={{ color: "#4ade80" }}>
                {data.acceptanceRate.toFixed(1)}%
              </p>
              <p className="text-[10px] uppercase tracking-widest mt-0.5" style={{ color: "var(--text-3)" }}>Acceptance</p>
            </div>
          )}
        </div>
      )}

      {/* Difficulty breakdown */}
      <div className="flex flex-col gap-4">
        {difficulties.map(({ label, solved, total, color, pct }) => (
          <div key={label}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold" style={{ color }}>{label}</span>
              <span className="text-xs tabular-nums" style={{ color: "var(--text-3)" }}>
                {loading ? "—" : `${solved} / ${total}`}
              </span>
            </div>
            <Bar pct={loading ? 0 : pct} color={color} />
          </div>
        ))}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* View profile link */}
      <a
        href="https://leetcode.com/u/utkarshzz/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
        style={{ background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.2)", color: ORANGE }}
      >
        View LeetCode Profile
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  );
}

/* ─── Main section ─────────────────────────────────────────────── */
export default function StatsSection() {
  return (
    <section id="stats" className="w-full bg-black section-padding">
      {/* Header */}
      <motion.div
        className="flex flex-col items-center mb-14"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="eyebrow-badge mb-5">📊 Live Stats</div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center">
          By the Numbers
        </h2>
        <p className="text-blue-50 text-sm md:text-base mt-4 text-center max-w-md">
          Real-time data pulled directly from GitHub &amp; LeetCode.
        </p>
      </motion.div>

      {/* Side-by-side cards */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <FadeIn delay={0}>
          <GitHubCard />
        </FadeIn>
        <FadeIn delay={0.1}>
          <LeetCodeCard />
        </FadeIn>
      </div>
    </section>
  );
}
