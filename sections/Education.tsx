"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Edu {
  id: number;
  institution: string;
  shortName: string;
  logo: string;
  degree: string;
  field: string;
  period: string;
  location: string;
  type: string; // "Primary" | "Concurrent"
  accentColor: string;
  highlights: string[];
}

const EDUCATION: Edu[] = [
  {
    id: 1,
    institution: "Manipal Institute of Technology, Bengaluru",
    shortName: "MIT Bengaluru",
    logo: "/manipal.png",
    degree: "B.Tech",
    field: "Computer Science & Engineering (Data Science)",
    period: "2024 – 2028",
    location: "Bengaluru, Karnataka",
    type: "Primary",
    accentColor: "#C49A3C",
    highlights: [
      "Specialisation in Data Science & AI — core focus on ML systems, statistical modelling, and large-scale data pipelines",
      "Active in the AI/ML research club — led workshops on LangGraph and multi-agent orchestration for juniors",
      "Built production-level projects alongside academics: semantic search at 110M-resume scale",
    ],
  },
  {
    id: 2,
    institution: "Indian Institute of Technology, Guwahati",
    shortName: "IIT Guwahati",
    logo: "/iitg.png",
    degree: "B.Sc (Honours)",
    field: "Artificial Intelligence & Data Science",
    period: "2024 – 2028",
    location: "Guwahati, Assam",
    type: "Concurrent",
    accentColor: "#60a5fa",
    highlights: [
      "Concurrent online honours programme by IIT Guwahati — rigorous AI/DS curriculum alongside B.Tech",
      "Covered advanced ML theory: deep learning, reinforcement learning, statistical inference, NLP",
      "IEEE GRSS research internship — NASA MODIS satellite crop yield prediction (R² = 0.581)",
    ],
  },
];

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
    >
      {children}
    </motion.div>
  );
}

function EduCard({ edu, delay }: { edu: Edu; delay: number }) {
  return (
    <FadeIn delay={delay} className="relative">
      {/* Card */}
      <div
        className="relative rounded-2xl overflow-hidden p-8 md:p-10 transition-all duration-300"
        style={{
          background: "rgba(10,10,12,0.95)",
          border: `1px solid ${edu.accentColor}22`,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = `${edu.accentColor}45`;
          (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 48px ${edu.accentColor}12`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = `${edu.accentColor}22`;
          (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        }}
      >
        {/* Ambient top glow */}
        <div
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl pointer-events-none"
          style={{ background: `${edu.accentColor}0d` }}
        />

        {/* Top row — logo + meta */}
        <div className="flex items-start gap-5 mb-7">
          {/* Logo */}
          <div
            className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden"
            style={{ background: "rgba(255,255,255,0.96)", padding: "8px" }}
          >
            <Image
              src={edu.logo}
              alt={edu.shortName}
              width={48}
              height={48}
              className="object-contain w-full h-full"
            />
          </div>

          {/* Institution info */}
          <div className="flex-1 min-w-0">
            {/* Type badge */}
            <span
              className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase mb-2"
              style={{ background: `${edu.accentColor}18`, color: edu.accentColor, border: `1px solid ${edu.accentColor}30` }}
            >
              {edu.type} Degree
            </span>
            <h3 className="text-lg md:text-xl font-bold text-white leading-snug">
              {edu.institution}
            </h3>
            <p className="text-sm mt-1" style={{ color: "var(--text-3)" }}>
              📍 {edu.location}
            </p>
          </div>
        </div>

        {/* Degree block */}
        <div
          className="rounded-xl px-5 py-4 mb-7"
          style={{ background: `${edu.accentColor}0a`, border: `1px solid ${edu.accentColor}1a` }}
        >
          <div className="flex flex-wrap items-center gap-3">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase mb-0.5" style={{ color: edu.accentColor }}>
                {edu.degree}
              </p>
              <p className="text-base font-bold text-white">{edu.field}</p>
            </div>
            <div
              className="ml-auto text-right flex-shrink-0"
            >
              <p className="text-sm font-semibold" style={{ color: "var(--text-1)" }}>
                {edu.period}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-3)" }}>In Progress</p>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <ul className="space-y-3">
          {edu.highlights.map((h, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
              <span
                className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2"
                style={{ background: edu.accentColor }}
              />
              {h}
            </li>
          ))}
        </ul>
      </div>
    </FadeIn>
  );
}

export default function Education() {
  return (
    <section id="education" className="w-full bg-black section-padding">
      {/* Header */}
      <motion.div
        className="flex flex-col items-center mb-16"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="eyebrow-badge mb-5">🎓 Academic Background</div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center">
          Education
        </h2>
        <p className="text-blue-50 text-sm md:text-base mt-4 text-center max-w-lg">
          Pursuing two concurrent degrees — bridging rigorous AI theory
          with applied engineering at two of India&apos;s top institutions.
        </p>
      </motion.div>

      {/* Dual cards — side by side on xl */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {EDUCATION.map((edu, i) => (
          <EduCard key={edu.id} edu={edu} delay={i * 0.12} />
        ))}
      </div>

      {/* Bottom combined badge */}
      <FadeIn delay={0.3} className="mt-10 max-w-6xl mx-auto">
        <div
          className="rounded-2xl px-8 py-6 flex flex-wrap items-center justify-between gap-4"
          style={{
            background: "rgba(196,154,60,0.04)",
            border: "1px solid rgba(196,154,60,0.15)",
          }}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚡</span>
            <div>
              <p className="text-sm font-bold text-white">Dual Degree Student</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-3)" }}>
                Simultaneously enrolled at MIT Bengaluru + IIT Guwahati · 2024–2028
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            {[
              { label: "CGPA", value: "Ongoing" },
              { label: "Research", value: "IEEE GRSS" },
              { label: "Hackathons", value: "2× Winner" },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="text-sm font-bold" style={{ color: "var(--gold)" }}>{value}</p>
                <p className="text-[10px] uppercase tracking-widest mt-0.5" style={{ color: "var(--text-3)" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
