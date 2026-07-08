"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

/* ─── Types ────────────────────────────────────────────────────── */
interface GitHubData {
  public_repos: number;
  followers: number;
  following: number;
  public_gists: number;
}

interface ChartData {
  date: string;
  count: number;
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

/* ─── Tooltip ─────────────────────────────────────────────────── */
const CustomTooltip = ({ active, payload, label, unit }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#111] border border-white/10 rounded-md px-3 py-2 shadow-xl">
        <p className="text-[10px] uppercase tracking-widest text-white/50 mb-1">{label}</p>
        <p className="text-sm font-bold text-white">{payload[0].value} {unit}</p>
      </div>
    );
  }
  return null;
};

/* ─── GitHub Card ──────────────────────────────────────────────── */
function GitHubCard() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const GOLD = "#C49A3C";

  useEffect(() => {
    Promise.allSettled([
      fetch("https://api.github.com/users/utkarshhzz").then(r => r.ok ? r.json() : null),
      fetch("https://github-contributions-api.deno.dev/utkarshhzz.json").then(r => r.ok ? r.json() : null)
    ])
    .then(([profileRes, contribsRes]) => {
      const profile = profileRes.status === "fulfilled" ? profileRes.value : null;
      const contribs = contribsRes.status === "fulfilled" ? contribsRes.value : null;
      
      // Even if rate limited, preserve what we can
      if (profile && profile.public_repos !== undefined) {
        setData(profile);
      }
      
      // Process 6 months (180 days) of contributions safely
      if (contribs && contribs.contributions) {
        const allDays = contribs.contributions.flat() || [];
        const sorted = allDays.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
        const last180 = sorted.slice(-180);
        
        setChartData(last180.map((d: any) => ({
          date: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          count: d.contributionCount || 0
        })));
      }
      
      setLoading(false);
    });
  }, []);

  return (
    <div
      className="rounded-2xl p-7 h-full flex flex-col gap-6 relative overflow-hidden transition-all duration-300"
      style={{ background: "rgba(10,10,12,0.95)", border: "1px solid rgba(196,154,60,0.18)" }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(196,154,60,0.4)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 48px rgba(196,154,60,0.08)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(196,154,60,0.18)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
    >
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
          <a href="https://github.com/utkarshhzz" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-white hover:underline">
            @utkarshhzz
          </a>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        <StatPill label="Public Repos"  value={data?.public_repos ?? "35"}  color={GOLD} />
        <StatPill label="Followers"     value={data?.followers ?? "13"}     color="#4ade80" />
        <StatPill label="Following"     value={data?.following ?? "1"}     color="#60a5fa" />
        <StatPill label="Public Gists"  value={data?.public_gists ?? "0"}  color="#a78bfa" />
      </div>

      {/* Live Chart Widget */}
      <div className="rounded-xl overflow-hidden p-4 flex flex-col gap-2" style={{ background: "#0a0a0c" }}>
        <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Live Contributions (Last 6 Months)</p>
        <div className="h-32 w-full relative">
          {loading ? (
            <div className="absolute inset-0 animate-pulse rounded bg-white/5" />
          ) : chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorGithub" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={GOLD} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={GOLD} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" hide />
                <YAxis hide domain={['dataMin', 'dataMax + 2']} />
                <Tooltip content={<CustomTooltip unit="commits" />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }} />
                <Area type="monotone" dataKey="count" stroke={GOLD} strokeWidth={2} fillOpacity={1} fill="url(#colorGithub)" />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-xs text-white/30">Data unavailable</div>
          )}
        </div>
      </div>

      {/* View profile link */}
      <a href="https://github.com/utkarshhzz" target="_blank" rel="noopener noreferrer" className="mt-auto flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5" style={{ background: "rgba(196,154,60,0.08)", border: "1px solid rgba(196,154,60,0.2)", color: GOLD }}>
        View GitHub Profile
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
          Real-time data pulled directly from GitHub.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-8 max-w-2xl mx-auto">
        <FadeIn delay={0}>
          <GitHubCard />
        </FadeIn>
      </div>
    </section>
  );
}
