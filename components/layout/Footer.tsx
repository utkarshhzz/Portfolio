"use client";

import { Mail, Code2, ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/shared/BrandIcons";
import { LINKS, scrollToSection } from "@/lib/sections";

const SOCIAL = [
  { name: "GitHub", href: LINKS.github, icon: <GithubIcon size={18} /> },
  { name: "LinkedIn", href: LINKS.linkedin, icon: <LinkedinIcon size={18} /> },
  { name: "LeetCode", href: LINKS.leetcode, icon: <Code2 size={18} /> },
  { name: "Email", href: `mailto:${LINKS.email}`, icon: <Mail size={18} /> },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 text-center md:grid-cols-3 md:text-left">
        <div>
          <p className="font-semibold text-white">Utkarsh Kumar</p>
          <p className="mt-1 text-xs text-[var(--text-3)]">AI Systems Engineer · MIT Bengaluru · IIT Guwahati</p>
          <p className="mt-1 text-xs text-[var(--text-3)]">© {year}</p>
        </div>

        <ul className="flex items-center justify-center gap-3">
          {SOCIAL.map(({ name, href, icon }) => (
            <li key={name}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={name}
                title={name}
                className="grid size-11 place-items-center rounded-xl border border-black-50 bg-black-100 text-[#a1a1aa] transition-colors duration-300 hover:border-[var(--gold-border)] hover:text-[var(--gold)]"
              >
                {icon}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex flex-col items-center gap-2 text-xs md:items-end">
          <a href={LINKS.resume} download="Utkarsh_Kumar_Resume.pdf" className="text-[var(--text-3)] transition-colors hover:text-white">
            Download resume ↗
          </a>
          <a href="https://github.com/utkarshhzz/Portfolio" target="_blank" rel="noopener noreferrer" className="text-[var(--text-3)] transition-colors hover:text-white">
            View source ↗
          </a>
          <button type="button" onClick={() => scrollToSection("identity")} className="inline-flex items-center gap-1 text-[var(--text-3)] transition-colors hover:text-white">
            <ArrowUp size={12} /> Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
