"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface Achievement {
  id: number;
  title: string;
  position: string;
  event: string;
  image: string;
  accent: string;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 1,
    title: "Hackbricks",
    position: "2nd Runner Up",
    event: "National Hackathon",
    image: "/achievements/Hackbricks_2nd.jpg",
    accent: "#60a5fa", // blue
  },
  {
    id: 2,
    title: "Bitflux",
    position: "Runner Up",
    event: "National Level Hackathon",
    image: "/achievements/Bitflux_second.jpg",
    accent: "#a78bfa", // purple
  },
  {
    id: 3,
    title: "Ignisia",
    position: "3rd Place",
    event: "Tech Fest Hackathon",
    image: "/achievements/Ignisia_3rd.jpg",
    accent: "#f43f5e", // rose
  },
  {
    id: 4,
    title: "Lovelace",
    position: "3rd Place",
    event: "Women in Tech / Tech Fest",
    image: "/achievements/lovelace_3rd.jpg",
    accent: "#fbbf24", // amber
  },
  {
    id: 5,
    title: "Hackathon Excellence",
    position: "Certificate",
    event: "Award of Recognition",
    image: "/achievements/Hackathon_certificate.png",
    accent: "#10b981", // emerald
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
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function AchievementsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section id="achievements" className="w-full bg-black section-padding overflow-hidden relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />

      {/* Header */}
      <motion.div
        className="flex flex-col items-center mb-16 relative z-10"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="eyebrow-badge mb-5">🏆 Recognitions</div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center">
          Hackathon Achievements
        </h2>
        <p className="text-blue-50 text-sm md:text-base mt-4 text-center max-w-lg">
          5+ Hackathon Wins. Bringing ideas to life under 24-48 hour pressure and taking home over ₹1 Lakh+ in prizes.
        </p>
      </motion.div>

      {/* Gallery Grid */}
      <div ref={containerRef} className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 px-4">
        {ACHIEVEMENTS.map((item, idx) => (
          <FadeIn
            key={item.id}
            delay={idx * 0.15}
            className="group relative rounded-2xl overflow-hidden aspect-[4/3]"
          >
            {/* Image Container */}
            <div className="absolute inset-0 bg-neutral-900 border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end pointer-events-none">
              <div
                className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
              >
                <div 
                  className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-3 backdrop-blur-md"
                  style={{ 
                    background: `${item.accent}30`, 
                    color: item.accent, 
                    border: `1px solid ${item.accent}50` 
                  }}
                >
                  {item.position}
                </div>
                <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-md">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-300 font-medium drop-shadow-md">
                  {item.event}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
