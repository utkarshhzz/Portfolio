"use client";

import { motion } from "framer-motion";

// Tech stack with official brand colors and clean SVG inline icons
const TECH_LIST = [
  {
    name: "Python",
    color: "#3776AB",
    bg: "#1a2a3a",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="40" height="40">
        <path d="M24 4C13.5 4 14 8.9 14 8.9L14 14H24.1V15.5H9.2S4 14.9 4 24.6c0 9.7 5.4 9.4 5.4 9.4H12v-4.5s-.1-5.4 5.3-5.4h9.2s5.1.1 5.1-5v-8.4S32.5 4 24 4zm-5.1 2.9c.9 0 1.7.8 1.7 1.7s-.8 1.7-1.7 1.7-1.7-.8-1.7-1.7.8-1.7 1.7-1.7z" fill="#3776AB"/>
        <path d="M24 44c10.5 0 10-4.9 10-4.9V33H23.9v-1.5h14.9S44 32.1 44 22.4c0-9.7-5.4-9.4-5.4-9.4H36v4.5s.1 5.4-5.3 5.4H21.5s-5.1-.1-5.1 5v8.4S15.5 44 24 44zm5.1-2.9c-.9 0-1.7-.8-1.7-1.7s.8-1.7 1.7-1.7 1.7.8 1.7 1.7-.8 1.7-1.7 1.7z" fill="#FFD43B"/>
      </svg>
    ),
  },
  {
    name: "PyTorch",
    color: "#EE4C2C",
    bg: "#2d1a15",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width="40" height="40">
        <circle cx="16" cy="16" r="14" fill="#EE4C2C" opacity="0.15"/>
        <path d="M16 4L9 11l2.5 2.5L16 9l4.5 4.5L23 11zM8 16a8 8 0 1016 0 8 8 0 00-16 0zm12 0a4 4 0 11-8 0 4 4 0 018 0z" fill="#EE4C2C"/>
        <circle cx="20" cy="10" r="1.5" fill="#EE4C2C"/>
      </svg>
    ),
  },
  {
    name: "LangChain",
    color: "#1C3C3C",
    bg: "#0a1a1a",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="40" height="40">
        <rect x="4" y="14" width="12" height="12" rx="3" fill="#2FA84F" opacity="0.9"/>
        <rect x="24" y="14" width="12" height="12" rx="3" fill="#2FA84F" opacity="0.9"/>
        <line x1="16" y1="20" x2="24" y2="20" stroke="#2FA84F" strokeWidth="2.5"/>
        <circle cx="20" cy="20" r="2" fill="#2FA84F"/>
      </svg>
    ),
  },
  {
    name: "OpenAI",
    color: "#10a37f",
    bg: "#0a1f1a",
    icon: (
      <svg viewBox="0 0 41 41" fill="currentColor" width="40" height="40" style={{ color: "#10a37f" }}>
        <path d="M37.532 16.87a9.963 9.963 0 00-.856-8.184 10.078 10.078 0 00-10.855-4.835 9.964 9.964 0 00-7.504-3.357 10.079 10.079 0 00-9.614 6.977 9.967 9.967 0 00-6.664 4.834 10.08 10.08 0 001.24 11.817 9.965 9.965 0 00.856 8.185 10.079 10.079 0 0010.855 4.835 9.965 9.965 0 007.504 3.357 10.079 10.079 0 009.617-6.981 9.967 9.967 0 006.663-4.834 10.079 10.079 0 00-1.243-11.814zM22.498 37.886a7.474 7.474 0 01-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 00.655-1.134V19.054l3.366 1.944a.12.12 0 01.066.092v9.299a7.505 7.505 0 01-7.49 7.496zM6.392 31.006a7.471 7.471 0 01-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 001.308 0l9.724-5.614v3.888a.12.12 0 01-.048.103l-8.051 4.649a7.504 7.504 0 01-10.24-2.744zM4.297 13.62A7.469 7.469 0 018.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 00.654 1.132l9.723 5.614-3.366 1.944a.12.12 0 01-.114.012L7.044 23.86a7.504 7.504 0 01-2.747-10.24zm27.658 6.437l-9.724-5.615 3.367-1.943a.121.121 0 01.114-.012l8.048 4.648a7.498 7.498 0 01-1.158 13.528v-9.476a1.293 1.293 0 00-.647-1.13zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 00-1.308 0l-9.723 5.614v-3.888a.12.12 0 01.048-.103l8.05-4.645a7.497 7.497 0 0111.135 7.763zm-21.063 6.929l-3.367-1.944a.12.12 0 01-.065-.092v-9.299a7.497 7.497 0 0112.293-5.756 6.94 6.94 0 00-.236.134l-7.965 4.6a1.294 1.294 0 00-.654 1.132l-.006 11.225zm1.829-3.943l4.33-2.501 4.332 2.5v4.999l-4.331 2.5-4.331-2.5V18z"/>
      </svg>
    ),
  },
  {
    name: "FastAPI",
    color: "#009688",
    bg: "#001a17",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width="40" height="40">
        <circle cx="16" cy="16" r="14" fill="#009688" opacity="0.15"/>
        <path d="M16 4C9.4 4 4 9.4 4 16s5.4 12 12 12 12-5.4 12-12S22.6 4 16 4zm-1 17v-6H9l8-9v6h6l-8 9z" fill="#009688"/>
      </svg>
    ),
  },
  {
    name: "Azure AI",
    color: "#0078D4",
    bg: "#001426",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width="40" height="40">
        <path d="M16 4L4 28h24L16 4z" fill="#0078D4" opacity="0.25"/>
        <path d="M16 7L6 26h20L16 7z" stroke="#0078D4" strokeWidth="1.5" fill="none"/>
        <path d="M11 20l5-10 5 10H11z" fill="#0078D4"/>
      </svg>
    ),
  },
  {
    name: "React / Next.js",
    color: "#61DAFB",
    bg: "#001a26",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="40" height="40">
        <ellipse cx="20" cy="20" rx="18" ry="7" stroke="#61DAFB" strokeWidth="1.5" fill="none"/>
        <ellipse cx="20" cy="20" rx="18" ry="7" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(60 20 20)"/>
        <ellipse cx="20" cy="20" rx="18" ry="7" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(120 20 20)"/>
        <circle cx="20" cy="20" r="2.5" fill="#61DAFB"/>
      </svg>
    ),
  },
  {
    name: "TypeScript",
    color: "#3178C6",
    bg: "#001126",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width="40" height="40">
        <rect x="2" y="2" width="28" height="28" rx="3" fill="#3178C6"/>
        <path d="M7 13h8M11 13v9" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M17 21c0 1 .8 1.5 2 1.5 1.3 0 2-.6 2-1.5 0-1-1-1.5-2-2s-2-1-2-2 .7-1.5 2-1.5 2 .5 2 1.5" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "PostgreSQL",
    color: "#336791",
    bg: "#0d1f2e",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width="40" height="40">
        <ellipse cx="16" cy="9" rx="10" ry="5" fill="#336791"/>
        <path d="M6 9v14c0 2.8 4.5 5 10 5s10-2.2 10-5V9" stroke="#336791" strokeWidth="2" fill="none"/>
        <ellipse cx="16" cy="9" rx="10" ry="5" stroke="#5aa0c8" strokeWidth="1" fill="#336791"/>
      </svg>
    ),
  },
  {
    name: "Docker",
    color: "#2496ED",
    bg: "#001526",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="40" height="40">
        <rect x="4" y="16" width="6" height="6" rx="1" fill="#2496ED"/>
        <rect x="12" y="16" width="6" height="6" rx="1" fill="#2496ED"/>
        <rect x="20" y="16" width="6" height="6" rx="1" fill="#2496ED"/>
        <rect x="12" y="8" width="6" height="6" rx="1" fill="#2496ED"/>
        <rect x="20" y="8" width="6" height="6" rx="1" fill="#2496ED"/>
        <path d="M28 19c1.5-1 5 0 5 3.5 0 2-1 4-4 5s-20 2-24 0-3-5-1-7 3-2 4-2" stroke="#2496ED" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
  },
  {
    name: "LangGraph",
    color: "#4F8EF7",
    bg: "#0d1a2d",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="40" height="40">
        <circle cx="8" cy="20" r="4" fill="#4F8EF7"/>
        <circle cx="32" cy="8" r="4" fill="#4F8EF7"/>
        <circle cx="32" cy="32" r="4" fill="#4F8EF7"/>
        <circle cx="20" cy="20" r="3" fill="#4F8EF7" opacity="0.6"/>
        <line x1="12" y1="20" x2="17" y2="20" stroke="#4F8EF7" strokeWidth="1.5"/>
        <line x1="23" y1="20" x2="28" y2="10" stroke="#4F8EF7" strokeWidth="1.5"/>
        <line x1="23" y1="21" x2="28" y2="30" stroke="#4F8EF7" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    name: "HuggingFace",
    color: "#FF9D00",
    bg: "#261a00",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width="40" height="40">
        <circle cx="16" cy="16" r="13" fill="#FF9D00" opacity="0.15"/>
        <text x="16" y="23" textAnchor="middle" fontSize="18" fill="#FF9D00">🤗</text>
      </svg>
    ),
  },
  {
    name: "OpenCV",
    color: "#5C3EE8",
    bg: "#120d2e",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="40" height="40">
        <circle cx="20" cy="20" r="12" stroke="#5C3EE8" strokeWidth="2" fill="none"/>
        <circle cx="20" cy="20" r="6" fill="#5C3EE8" opacity="0.4"/>
        <circle cx="20" cy="20" r="2" fill="#5C3EE8"/>
        <line x1="8" y1="20" x2="14" y2="20" stroke="#5C3EE8" strokeWidth="2"/>
        <line x1="26" y1="20" x2="32" y2="20" stroke="#5C3EE8" strokeWidth="2"/>
        <line x1="20" y1="8" x2="20" y2="14" stroke="#5C3EE8" strokeWidth="2"/>
        <line x1="20" y1="26" x2="20" y2="32" stroke="#5C3EE8" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    name: "Git / GitHub",
    color: "#F05032",
    bg: "#2a0e08",
    icon: (
      <svg viewBox="0 0 24 24" fill="#F05032" width="40" height="40">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
  },
  {
    name: "Three.js",
    color: "#ffffff",
    bg: "#1a1a1a",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="40" height="40">
        <polygon points="20,5 35,30 5,30" stroke="white" strokeWidth="1.5" fill="none"/>
        <polygon points="20,12 30,27 10,27" fill="white" opacity="0.2"/>
        <line x1="20" y1="5" x2="20" y2="30" stroke="white" strokeWidth="0.8" opacity="0.3"/>
        <line x1="5" y1="30" x2="30" y2="27" stroke="white" strokeWidth="0.8" opacity="0.3"/>
      </svg>
    ),
  },
  {
    name: "Docker / CI/CD",
    color: "#2496ED",
    bg: "#0d2238",
    icon: (
      <svg viewBox="0 0 24 24" fill="#2496ED" width="40" height="40">
        <path d="M13.983 11.278h1.61v-1.57h-1.61v1.57zm-1.89-1.57h1.609v1.57h-1.61v-1.57zm0-1.86h1.609v1.569h-1.61V7.848zm-1.89 1.86h1.61v1.57h-1.61v-1.57zm0-1.86h1.61v1.569h-1.61V7.848zm-1.89 1.86h1.61v1.57h-1.61v-1.57zm0-1.86h1.61v1.569h-1.61V7.848zm-1.889 1.86h1.609v1.57h-1.61v-1.57zm0-1.86h1.609v1.569h-1.61V7.848zM6.433 9.708h1.61v1.57h-1.61v-1.57zm-1.89 0h1.609v1.57H4.543v-1.57zm8.397-3.718c-.378-.894-1.12-1.393-2.023-1.393-1.464 0-2.438.995-2.438 2.502v.75H6.282c-.886 0-1.604.72-1.604 1.61 0 .285.076.55.204.786-.882.257-1.536 1.055-1.536 2.02 0 .56.21 1.07.556 1.455-.386.417-.62 1.004-.62 1.65 0 1.258 1.01 2.274 2.258 2.274h12.87c1.378 0 2.5-1.134 2.5-2.527 0-1.17-.803-2.164-1.874-2.443.085-.306.13-.63.13-.967 0-1.353-.872-2.493-2.062-2.868.046-.226.07-.46.07-.7 0-1.507-.974-2.502-2.438-2.502-.904 0-1.646.5-2.024 1.393z"/>
      </svg>
    ),
  },
];

function TechCard({ name, color, bg, icon, i }: { name: string; color: string; bg: string; icon: React.ReactNode; i: number }) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl flex flex-col items-center justify-center py-8 px-4 gap-4 group cursor-default"
      style={{
        background: "rgba(14,14,16,0.8)",
        border: "1px solid rgba(255,255,255,0.07)",
        minHeight: "160px",
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.55, delay: (i % 5) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.04, borderColor: `${color}44` }}
      onMouseMove={(e) => {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const angle = Math.atan2(e.clientY - rect.top - rect.height / 2, e.clientX - rect.left - rect.width / 2) * 180 / Math.PI;
        el.style.setProperty("--start", String((angle + 360) % 360 + 60));
        el.style.borderColor = `${color}55`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
      }}
    >
      {/* Color wash on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
        style={{ background: `${bg}` }}
      />
      {/* Glow top-right */}
      <div
        className="absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-2xl pointer-events-none"
        style={{ background: color }}
      />

      {/* Icon */}
      <div className="relative z-10 flex items-center justify-center w-14 h-14">
        {icon}
      </div>

      {/* Name */}
      <p className="relative z-10 text-sm font-semibold text-center leading-tight transition-colors duration-300 group-hover:text-white" style={{ color: "#839cb5" }}>
        {name}
      </p>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="w-full bg-black section-padding">
      {/* Header */}
      <motion.div
        className="flex flex-col items-center mb-4"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="eyebrow-badge mb-5">🛠️ Technical Arsenal</div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center">
          Technologies I Work With
        </h2>
        <p className="text-blue-50 text-sm mt-4 text-center max-w-lg">
          From research tooling to production infrastructure — my full-stack AI engineering toolkit.
        </p>
      </motion.div>

      {/* Tech grid */}
      <div className="grid xl:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4 mt-12">
        {TECH_LIST.map((tech, i) => (
          <TechCard key={tech.name} {...tech} i={i} />
        ))}
      </div>
    </section>
  );
}
