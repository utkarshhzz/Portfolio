"use client";

import { motion } from "framer-motion";
import { Trophy, Medal, Star } from "lucide-react";
import { achievements } from "@/data/achievements";
import SectionHeader from "@/components/shared/SectionHeader";

const placementCfg: Record<string, { icon: typeof Trophy; color: string }> = {
  "National Winner":       { icon: Trophy, color: "#C49A3C" },
  "Top 3":                 { icon: Medal,  color: "#A8A8B0" },
  "Final Round Selection": { icon: Star,   color: "#34d399" },
};

export default function Achievements() {
  return (
    <section id="achievements" className="section-pad relative"
      style={{ background: "linear-gradient(180deg, #080808 0%, #0a0a0a 100%)" }}>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(196,154,60,0.12),transparent)" }} />

      <div className="container-lg">
        <SectionHeader
          eyebrow="Achievements"
          title="Winning under pressure"
          description="Competing at national hackathons, validating technical depth and product thinking against the clock."
        />

        {/* Summary row */}
        <div className="grid grid-cols-3 rounded-2xl overflow-hidden mb-12"
          style={{ border: "1px solid var(--border)" }}>
          {[
            { v: "2", label: "Hackathons Won" },
            { v: "₹95K+", label: "Prize Money" },
            { v: "1st", label: "National Placement" },
          ].map((s, i) => (
            <div key={s.label}
              className="flex flex-col items-center py-6 px-4"
              style={{
                background: "var(--card)",
                borderRight: i < 2 ? "1px solid var(--border)" : undefined,
              }}>
              <span className="text-2xl font-bold mb-1 tabular-nums"
                style={{ color: "var(--text-1)", letterSpacing: "-0.03em" }}>{s.v}</span>
              <span className="text-xs text-center" style={{ color: "var(--text-3)" }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Achievement cards */}
        <div className="flex flex-col gap-5">
          {achievements.map((a, i) => {
            const cfg = placementCfg[a.placement] ?? placementCfg["Final Round Selection"];
            const Icon = cfg.icon;
            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22,1,0.36,1] }}
                className="glass-card overflow-hidden"
                style={{ borderLeft: `3px solid ${cfg.color}` }}
              >
                <div className="p-6 md:p-7 flex flex-col md:flex-row md:items-center gap-5">
                  <motion.div
                    className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{ background: `${cfg.color}14`, border: `1px solid ${cfg.color}28` }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 280, damping: 20, delay: i * 0.1 + 0.1 }}
                  >
                    <Icon size={24} style={{ color: cfg.color }} />
                  </motion.div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="badge"
                        style={{ background: `${cfg.color}14`, border: `1px solid ${cfg.color}28`, color: cfg.color }}>
                        {a.placement}
                      </span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)", color: "var(--text-3)" }}>
                        {a.year}
                      </span>
                    </div>
                    <h3 className="text-base font-bold mb-0.5"
                      style={{ color: "var(--text-1)", letterSpacing: "-0.01em" }}>{a.title}</h3>
                    <p className="text-xs mb-3" style={{ color: cfg.color, opacity: 0.8 }}>{a.event}</p>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>{a.description}</p>
                  </div>

                  {a.prize && (
                    <div className="flex-shrink-0 flex flex-col items-center px-5 py-3 rounded-xl"
                      style={{ background: `${cfg.color}0d`, border: `1px solid ${cfg.color}22` }}>
                      <span className="text-xl font-bold" style={{ color: cfg.color }}>{a.prize}</span>
                      <span className="text-[10px] mt-0.5" style={{ color: "var(--text-3)" }}>Prize</span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
