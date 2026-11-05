"use client";

import { motion } from "framer-motion";
import { Brain, Server, Cloud, Code2, Wrench } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

/** Mirrors the "Technical Skills" block of the resume. `core` items are highlighted. */
const GROUPS = [
  {
    title: "AI / ML",
    Icon: Brain,
    accent: "#C49A3C",
    core: ["PyTorch", "LangChain", "OpenAI API", "FAISS", "Computer Vision"],
    rest: ["Machine Learning", "Deep Learning", "NLP", "Scikit-Learn", "XGBoost", "GraphSAGE", "PyTorch Geometric", "Hugging Face", "OpenCV"],
    wide: true,
  },
  {
    title: "Backend & Systems",
    Icon: Server,
    accent: "#60a5fa",
    core: ["FastAPI", "PostgreSQL", "Redis", "Docker", "Kubernetes"],
    rest: ["Flask", "Node.js", "Next.js", "React", "MongoDB", "SQLAlchemy", "Pydantic", "Microservices", "REST", "WebSockets", "GraphQL", "Distributed Systems"],
    wide: true,
  },
  {
    title: "Languages",
    Icon: Code2,
    accent: "#4ade80",
    core: ["Python", "C++", "TypeScript"],
    rest: ["Java", "JavaScript", "SQL"],
  },
  {
    title: "Cloud & Observability",
    Icon: Cloud,
    accent: "#38bdf8",
    core: ["Azure (AKS, AI Search)", "AWS (EC2, S3)"],
    rest: ["GCP", "Supabase", "Vercel", "Prometheus", "Grafana", "Linux"],
  },
  {
    title: "Engineering Practice",
    Icon: Wrench,
    accent: "#fb923c",
    core: ["Data Structures & Algorithms", "System Design"],
    rest: ["OOP", "Design Patterns", "Unit & Integration Testing", "Code Review", "CI/CD", "Git", "Agile"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section-padding">
      <SectionHeading
        index="05"
        eyebrow="Toolkit"
        title="Technical Skills"
        sub="From research tooling to production infrastructure. Highlighted items are what I reach for first."
      />

      <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
        {GROUPS.map(({ title, Icon, accent, core, rest, wide }, i) => (
          <motion.li
            key={title}
            className={`group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[rgba(14,14,16,0.8)] p-6 transition-colors hover:border-white/[0.14] md:p-7 ${wide ? "lg:col-span-3" : "lg:col-span-2"}`}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.07, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full opacity-10 blur-3xl transition-opacity duration-500 group-hover:opacity-25"
              style={{ background: accent }}
            />
            <div className="mb-5 flex items-center gap-3">
              <span
                className="grid size-10 place-items-center rounded-xl"
                style={{ background: `${accent}14`, border: `1px solid ${accent}30`, color: accent }}
              >
                <Icon size={19} strokeWidth={1.8} />
              </span>
              <h3 className="text-lg font-bold text-white">{title}</h3>
            </div>
            <ul className="flex flex-wrap gap-2">
              {core.map((s) => (
                <li
                  key={s}
                  className="rounded-lg px-2.5 py-1.5 text-[13px] font-semibold"
                  style={{ background: `${accent}14`, border: `1px solid ${accent}38`, color: "var(--text-1)" }}
                >
                  {s}
                </li>
              ))}
              {rest.map((s) => (
                <li
                  key={s}
                  className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-2.5 py-1.5 text-[13px] text-[var(--text-3)]"
                >
                  {s}
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
