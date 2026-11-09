"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/shared/BrandIcons";
import SectionHeading from "@/components/shared/SectionHeading";
import { LINKS } from "@/lib/sections";

const USER = "utkarshhzz";
const WEEKS = 52;

function longestStreak(days: Day[]): number {
  let best = 0;
  let run = 0;
  for (const d of [...days].sort((a, b) => a.date.localeCompare(b.date))) {
    run = d.count > 0 ? run + 1 : 0;
    best = Math.max(best, run);
  }
  return best;
}

interface Day {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}
/** Shape returned by app/api/github/route.ts */
interface GithubPayload {
  publicRepos: number | null;
  total: number | null;
  days: Day[] | null;
}

const LEVEL_BG = [
  "rgba(255,255,255,0.05)",
  "rgba(196,154,60,0.28)",
  "rgba(196,154,60,0.5)",
  "rgba(196,154,60,0.75)",
  "#DDB854",
];

/** Group the trailing N weeks of days into Sunday-first columns. */
function toWeeks(days: Day[]): (Day | null)[][] {
  if (days.length === 0) return [];
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
  const last = sorted[sorted.length - 1];
  const lastDow = new Date(`${last.date}T00:00:00Z`).getUTCDay();
  const needed = (WEEKS - 1) * 7 + lastDow + 1;
  const slice = sorted.slice(-needed);
  const weeks: (Day | null)[][] = [];
  for (let i = 0; i < slice.length; i += 7) weeks.push(slice.slice(i, i + 7));
  const tail = weeks[weeks.length - 1];
  while (tail.length < 7) tail.push(null);
  return weeks;
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3.5">
      <dd className="text-2xl font-extrabold tabular-nums tracking-tight text-[var(--text-1)]">{value}</dd>
      <dt className="mt-0.5 text-[11px] text-[var(--text-3)]">{label}</dt>
    </div>
  );
}

export default function StatsSection() {
  const [repos, setRepos] = useState<number | null>(null);
  const [days, setDays] = useState<Day[] | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch("/api/github", { signal: ctrl.signal })
      .then((r) => (r.ok ? (r.json() as Promise<GithubPayload>) : null))
      .then((d) => {
        if (d?.publicRepos != null) setRepos(d.publicRepos);
        if (!d?.days?.length) { setFailed(true); return; }
        setDays(d.days);
        setTotal(d.total);
      })
      .catch((e: unknown) => { if ((e as Error)?.name !== "AbortError") setFailed(true); });
    return () => ctrl.abort();
  }, []);

  const weeks = days ? toWeeks(days) : [];
  const shown = weeks.flat().filter((d): d is Day => d !== null);
  const recent = shown.reduce((s, d) => s + d.count, 0);
  const activeDays = shown.filter((d) => d.count > 0).length;

  return (
    <section id="github" className="section-padding">
      <SectionHeading
        index="07"
        eyebrow="Open source"
        title="GitHub Activity"
        sub="Pulled from GitHub and refreshed every hour."
      />

      <motion.div
        className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-[rgba(196,154,60,0.18)] bg-[rgba(10,10,12,0.95)] p-6 md:p-8"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div aria-hidden className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-[rgba(196,154,60,0.08)] blur-3xl" />

        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl border border-[rgba(196,154,60,0.2)] bg-[rgba(196,154,60,0.1)] text-[var(--gold)]">
              <GithubIcon size={20} />
            </span>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--gold)]">GitHub</p>
              <p className="text-sm font-bold text-white">@{USER}</p>
            </div>
          </div>
          <a
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[rgba(196,154,60,0.25)] px-3.5 py-2 text-xs font-semibold text-[var(--gold)] transition-colors hover:bg-[rgba(196,154,60,0.08)]"
          >
            View profile <ArrowUpRight size={13} />
          </a>
        </div>

        <dl className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          <Stat label="Contributions (last year)" value={total !== null ? total.toLocaleString("en-IN") : "—"} />
          <Stat label="Active days" value={days ? String(activeDays) : "—"} />
          <Stat label="Longest streak" value={days ? `${longestStreak(shown)} days` : "—"} />
          <Stat label="Public repos" value={repos !== null ? String(repos) : "35+"} />
        </dl>

        <div className="rounded-xl bg-[#0a0a0c] p-4">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-white/40">Contributions · last {WEEKS} weeks</p>
          {days ? (
            <div className="overflow-x-auto pb-1" tabIndex={0} aria-label="Contribution graph, scrollable">
              <div
                className="mx-auto grid w-max grid-flow-col gap-[3px]"
                style={{ gridTemplateRows: "repeat(7, 12px)", gridTemplateColumns: `repeat(${weeks.length}, 12px)` }}
                role="img"
                aria-label={`${recent} contributions in the last ${WEEKS} weeks`}
              >
                {weeks.flatMap((w, wi) =>
                  w.map((d, di) => (
                    <span
                      key={`${wi}-${di}`}
                      title={d ? `${d.count} contribution${d.count === 1 ? "" : "s"} on ${d.date}` : undefined}
                      className="aspect-square rounded-[3px]"
                      style={{ background: d ? LEVEL_BG[d.level] : "transparent" }}
                    />
                  )),
                )}
              </div>
            </div>
          ) : failed ? (
            <p className="py-8 text-center text-xs text-white/40">
              Couldn&apos;t reach the contributions API.{" "}
              <a href={LINKS.github} className="text-[var(--gold)] underline-offset-4 hover:underline" target="_blank" rel="noopener noreferrer">
                See it on GitHub
              </a>
            </p>
          ) : (
            <div className="h-[118px] animate-pulse rounded-lg bg-white/[0.04]" />
          )}
          <div className="mt-3 flex items-center justify-end gap-1.5 text-[10px] text-white/40" aria-hidden>
            Less
            {LEVEL_BG.map((bg) => (
              <span key={bg} className="size-2.5 rounded-[2px]" style={{ background: bg }} />
            ))}
            More
          </div>
        </div>
      </motion.div>
    </section>
  );
}
