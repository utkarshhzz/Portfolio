"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const EDUCATION = [
  {
    id: "mit",
    institution: "Manipal Institute of Technology, Bengaluru",
    logo: "/manipal.png",
    logoAlt: "Manipal Institute of Technology logo",
    degree: "B.Tech",
    field: "Computer Science & Engineering (Data Science)",
    period: "2024 – 2028",
    gpa: "9.3",
    location: "Bengaluru, Karnataka",
    type: "Primary degree",
    accent: "#C49A3C",
  },
  {
    id: "iitg",
    institution: "Indian Institute of Technology Guwahati",
    logo: "/iitg.png",
    logoAlt: "IIT Guwahati logo",
    degree: "B.Sc (Honours)",
    field: "Artificial Intelligence & Data Science",
    period: "2024 – 2028",
    gpa: "8.3",
    location: "Guwahati, Assam",
    type: "Concurrent degree",
    accent: "#60a5fa",
  },
];

export default function Education() {
  return (
    <section id="education" className="section-padding">
      <SectionHeading
        index="06"
        eyebrow="Academics"
        title="Education"
        sub="Two degrees in parallel: computer science at MIT Bengaluru and AI & data science at IIT Guwahati."
      />

      <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-2">
        {EDUCATION.map((e, i) => (
          <motion.li
            key={e.id}
            className="relative overflow-hidden rounded-2xl border bg-[rgba(10,10,12,0.95)] p-7 transition-shadow duration-300 md:p-9"
            style={{ borderColor: `${e.accent}26` }}
            whileHover={{ boxShadow: `0 8px 48px ${e.accent}14` }}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full blur-3xl" style={{ background: `${e.accent}10` }} />

            <div className="mb-7 flex items-start gap-5">
              <div className="grid size-16 flex-shrink-0 place-items-center overflow-hidden rounded-2xl bg-white/95 p-2">
                <Image src={e.logo} alt={e.logoAlt} width={48} height={48} className="h-full w-full object-contain" />
              </div>
              <div className="min-w-0 flex-1">
                <span
                  className="mb-2 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest"
                  style={{ background: `${e.accent}18`, color: e.accent, border: `1px solid ${e.accent}30` }}
                >
                  {e.type}
                </span>
                <h3 className="text-lg font-bold leading-snug text-white md:text-xl">{e.institution}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-[var(--text-3)]">
                  <MapPin size={13} /> {e.location}
                </p>
              </div>
            </div>

            <div
              className="flex flex-wrap items-end justify-between gap-4 rounded-xl px-5 py-4"
              style={{ background: `${e.accent}0a`, border: `1px solid ${e.accent}1a` }}
            >
              <div className="min-w-0">
                <p className="mb-0.5 text-xs font-semibold uppercase tracking-widest" style={{ color: e.accent }}>{e.degree}</p>
                <p className="text-base font-bold text-white">{e.field}</p>
                <p className="mt-1 text-xs text-[var(--text-3)]">{e.period} · in progress</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-extrabold leading-none tracking-tight tabular-nums" style={{ color: e.accent }}>
                  {e.gpa}<span className="text-base font-semibold text-[var(--text-3)]">/10</span>
                </p>
                <p className="mt-1 text-xs text-[var(--text-3)]">GPA</p>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
