"use client";

import { Download, Mail, Code2, Heart } from "lucide-react";

const GHIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);
const LIIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const socialLinks = [
  { id: "footer-github",   href: "https://github.com/utkarshrpg",         Icon: GHIcon,   label: "GitHub" },
  { id: "footer-linkedin", href: "https://linkedin.com/in/utkarsh-kumar", Icon: LIIcon,   label: "LinkedIn" },
  { id: "footer-email",    href: "mailto:utkarsh@example.com",            Icon: Mail,     label: "Email" },
  { id: "footer-leetcode", href: "https://leetcode.com/utkarshrpg",       Icon: Code2,    label: "LeetCode" },
];

const navCols = [
  {
    title: "Navigate",
    links: [
      { label: "About",        href: "#about" },
      { label: "Experience",   href: "#experience" },
      { label: "Projects",     href: "#projects" },
      { label: "Skills",       href: "#skills" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "Contact",      href: "#contact" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "GitHub",             href: "https://github.com/utkarshrpg",         external: true },
      { label: "LinkedIn",           href: "https://linkedin.com/in/utkarsh-kumar", external: true },
      { label: "LeetCode",           href: "https://leetcode.com/utkarshrpg",       external: true },
      { label: "Email",              href: "mailto:utkarsh@example.com" },
      { label: "Resume (PDF)",       href: "/resume.pdf",                           download: true },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      className="relative"
      style={{ background: "#000", borderTop: "1px solid var(--border)" }}
    >
      {/* Subtle top gold shimmer */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(196,154,60,0.3),transparent)" }} />

      <div className="container-lg px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-10 mb-12">

          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg tracking-tight" style={{ color: "var(--text-1)", letterSpacing: "-0.03em" }}>UK</span>
              <span className="font-mono" style={{ color: "rgba(196,154,60,0.65)" }}>/&gt;</span>
            </div>
            <p className="text-[13px] leading-relaxed max-w-xs" style={{ color: "var(--text-3)" }}>
              AI Systems Engineer building production-grade intelligent systems.
              MIT Bangalore &amp; IIT Guwahati.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2 mt-2">
              {socialLinks.map(({ id, href, Icon, label }) => (
                <a
                  key={id}
                  id={id}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 rounded-lg transition-all duration-200 hover:bg-white/[0.05] hover:scale-110"
                  style={{ color: "var(--text-3)" }}
                >
                  <Icon />
                </a>
              ))}
            </div>

            {/* Availability badge */}
            <div className="inline-flex items-center gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[11px]" style={{ color: "var(--text-3)" }}>
                Open to opportunities
              </span>
            </div>
          </div>

          {/* Nav columns */}
          {navCols.map(col => (
            <div key={col.title} className="flex flex-col gap-3">
              <p className="eyebrow mb-1">{col.title}</p>
              {col.links.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target={"external" in link && link.external ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  download={"download" in link && link.download ? true : undefined}
                  className="flex items-center gap-1.5 text-[13px] transition-colors duration-200 hover:text-[var(--gold)]"
                  style={{ color: "var(--text-3)" }}
                  onClick={link.href.startsWith("#")
                    ? e => { e.preventDefault(); document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" }); }
                    : undefined}
                >
                  {link.label}
                  {"download" in link && link.download && <Download size={11} />}
                  {"external" in link && link.external && <span style={{ opacity: 0.5 }}>↗</span>}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p className="text-[12px] flex items-center gap-1.5" style={{ color: "var(--text-3)" }}>
            © 2024 Utkarsh Kumar.
            Built with <Heart size={10} fill="currentColor" style={{ color: "#ef4444" }} /> using Next.js &amp; Framer Motion.
          </p>
          <p className="text-[12px] flex items-center gap-1.5" style={{ color: "var(--text-3)" }}>
            <span style={{ color: "var(--gold)" }}>✦</span>
            MIT Bangalore · IIT Guwahati
          </p>
        </div>
      </div>
    </footer>
  );
}
