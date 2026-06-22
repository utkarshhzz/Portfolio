"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const TESTIMONIALS = [
  {
    name: "Rahul Mehta",
    role: "Engineering Manager, Olumio",
    img: "/client1.png",
    review:
      "Utkarsh built our semantic search pipeline from scratch — 110M resumes, sub-second retrieval. Running in production for months without a single incident. Exceptional depth.",
  },
  {
    name: "Dr. Priya Sharma",
    role: "Research Supervisor, IIT Guwahati",
    img: "/client2.png",
    review:
      "What stands out is his ability to read a paper on Monday and have a working implementation by Friday. His AgniSense computer vision work was publication-worthy.",
  },
  {
    name: "Arjun Verma",
    role: "Co-founder, Smart India Hackathon",
    img: "/client3.png",
    review:
      "We won ₹50K at SIH together. Utkarsh owned the AI backend end-to-end — multi-agent reasoning, REST APIs, and the live demo. Calm under pressure and impossibly fast.",
  },
  {
    name: "Pooja Gupta",
    role: "Team Lead, MIT Bangalore",
    img: "/client4.png",
    review:
      "Utkarsh mentored juniors on LangChain and RAG pipelines while shipping his own features. That combination of execution speed and generosity is rare.",
  },
  {
    name: "Dr. Anil Singh",
    role: "IEEE GRSS Research Lead",
    img: "/client5.png",
    review:
      "Building ML pipelines over 15 years of NASA satellite data is no small task. Utkarsh delivered R² = 0.581, beating every baseline we had. Methodical and thorough.",
  },
  {
    name: "Sneha Iyer",
    role: "Peer Collaborator, CV Lab",
    img: "/client6.png",
    review:
      "Utkarsh makes complex systems look simple. His architecture diagrams are as clear as his code. A genuine joy to collaborate with.",
  },
];

// Reference-exact GlowCard for testimonials
function TestCard({ t, i }: { t: typeof TESTIMONIALS[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const angle = Math.atan2(
      e.clientY - rect.top  - rect.height / 2,
      e.clientX - rect.left - rect.width  / 2
    ) * (180 / Math.PI);
    el.style.setProperty("--start", String((angle + 360) % 360 + 60));
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      className="card card-border rounded-xl p-6 mb-5 break-inside-avoid-column"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
    >
      {/* Glow effect */}
      <div className="glow" />

      {/* Stars */}
      <div className="star-rating">
        {[...Array(5)].map((_, j) => (
          <Image key={j} src="/gold-star.png" alt="★" width={16} height={16} className="object-contain" />
        ))}
      </div>

      {/* Review text */}
      <p className="text-white-50 text-sm leading-relaxed mb-6">
        &ldquo;{t.review}&rdquo;
      </p>

      {/* Author row */}
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-full overflow-hidden flex-shrink-0 border border-black-50">
          <Image src={t.img} alt={t.name} width={40} height={40} className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{t.name}</p>
          <p className="text-xs text-blue-50">{t.role}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="w-full bg-black section-padding"
    >
      {/* Header */}
      <motion.div
        className="flex flex-col items-center mb-16"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="eyebrow-badge mb-5">⭐ Testimonials</div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center">
          Kind Words from Collaborators
        </h2>
        <p className="text-xs text-blue-50 mt-3">* Approximate — will be updated with verified quotes</p>
      </motion.div>

      {/* 3-column masonry */}
      <div className="columns-1 md:columns-2 xl:columns-3 gap-5">
        {TESTIMONIALS.map((t, i) => (
          <TestCard key={i} t={t} i={i} />
        ))}
      </div>
    </section>
  );
}
