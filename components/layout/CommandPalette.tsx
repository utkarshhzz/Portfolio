"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  Search, User, Briefcase, FolderKanban, Trophy, Wrench, GraduationCap,
  Mail, X, ChevronRight, Download, Code2, Activity, Copy, Home,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/shared/BrandIcons";
import { cn } from "@/lib/utils";
import { LINKS, scrollToSection } from "@/lib/sections";

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  run: () => void;
  category: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function buildItems(close: () => void): CommandItem[] {
  const nav = (id: string) => () => { close(); scrollToSection(id); };
  const open = (url: string) => () => { close(); window.open(url, "_blank", "noopener,noreferrer"); };
  return [
    { id: "hero", label: "Home", description: "Back to the top", icon: <Home size={15} />, run: nav("hero"), category: "Navigate" },
    { id: "identity", label: "About", description: "Who I am", icon: <User size={15} />, run: nav("identity"), category: "Navigate" },
    { id: "projects", label: "Projects", description: "Featured builds", icon: <FolderKanban size={15} />, run: nav("projects"), category: "Navigate" },
    { id: "experience", label: "Experience", description: "Internships and research", icon: <Briefcase size={15} />, run: nav("experience"), category: "Navigate" },
    { id: "achievements", label: "Achievements", description: "Hackathon podiums", icon: <Trophy size={15} />, run: nav("achievements"), category: "Navigate" },
    { id: "skills", label: "Skills", description: "Technical toolkit", icon: <Wrench size={15} />, run: nav("skills"), category: "Navigate" },
    { id: "education", label: "Education", description: "MIT Bengaluru · IIT Guwahati", icon: <GraduationCap size={15} />, run: nav("education"), category: "Navigate" },
    { id: "github-stats", label: "GitHub activity", description: "Live contribution graph", icon: <Activity size={15} />, run: nav("github"), category: "Navigate" },
    { id: "contact", label: "Contact", description: "Send a message", icon: <Mail size={15} />, run: nav("contact"), category: "Navigate" },
    { id: "github", label: "GitHub", description: "github.com/utkarshhzz", icon: <GithubIcon size={15} />, run: open(LINKS.github), category: "Links" },
    { id: "linkedin", label: "LinkedIn", description: "linkedin.com/in/utkarsh-kumar", icon: <LinkedinIcon size={15} />, run: open(LINKS.linkedin), category: "Links" },
    { id: "leetcode", label: "LeetCode", description: "350+ problems solved", icon: <Code2 size={15} />, run: open(LINKS.leetcode), category: "Links" },
    { id: "resume", label: "Open resume", description: "PDF", icon: <Download size={15} />, run: open(LINKS.resume), category: "Actions" },
    {
      id: "copy-email",
      label: "Copy email address",
      description: LINKS.email,
      icon: <Copy size={15} />,
      run: () => { navigator.clipboard?.writeText(LINKS.email).catch(() => {}); close(); },
      category: "Actions",
    },
  ];
}

function PaletteBody({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);

  const items = useMemo(() => buildItems(onClose), [onClose]);
  const q = query.trim().toLowerCase();
  const filtered = q
    ? items.filter((i) => i.label.toLowerCase().includes(q) || i.description?.toLowerCase().includes(q))
    : items;

  const categories = [...new Set(filtered.map((i) => i.category))];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowDown") { e.preventDefault(); setSelected((i) => Math.min(i + 1, filtered.length - 1)); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setSelected((i) => Math.max(i - 1, 0)); }
      else if (e.key === "Enter") filtered[selected]?.run();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [filtered, selected, onClose]);

  return (
    <>
      <div className="flex items-center gap-3 border-b border-white/[0.08] px-4 py-3">
        <Search size={16} className="text-[#a1a1aa]" />
        <input
          autoFocus
          type="text"
          placeholder="Jump to a section or link…"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setSelected(0); }}
          className="flex-1 bg-transparent text-sm text-white placeholder-[#71717a] outline-none focus-visible:outline-none"
          aria-label="Search commands"
          role="combobox"
          aria-expanded="true"
          aria-controls="cmd-results"
          aria-activedescendant={filtered[selected] ? `cmd-${filtered[selected].id}` : undefined}
        />
        <button onClick={onClose} className="rounded p-1 text-[#a1a1aa] transition-colors hover:text-white" aria-label="Close">
          <X size={14} />
        </button>
      </div>

      <div id="cmd-results" role="listbox" className="max-h-80 overflow-y-auto py-2">
        {categories.map((cat) => (
          <div key={cat} role="group" aria-label={cat}>
            <p className="px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-[#71717a]">{cat}</p>
            {filtered.filter((i) => i.category === cat).map((item) => {
              const idx = filtered.indexOf(item);
              const isSel = idx === selected;
              return (
                <button
                  key={item.id}
                  id={`cmd-${item.id}`}
                  role="option"
                  aria-selected={isSel}
                  onClick={item.run}
                  onMouseMove={() => setSelected(idx)}
                  className={cn("flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors", isSel && "bg-white/[0.06]")}
                >
                  <span className={cn("flex-shrink-0", isSel ? "text-[var(--gold)]" : "text-[#71717a]")}>{item.icon}</span>
                  <span className="min-w-0">
                    <span className={cn("block truncate text-sm font-medium", isSel ? "text-white" : "text-[#d4d4d8]")}>{item.label}</span>
                    {item.description && <span className="block truncate text-xs text-[#71717a]">{item.description}</span>}
                  </span>
                  {isSel && <ChevronRight size={14} className="ml-auto flex-shrink-0 text-[var(--gold)]" />}
                </button>
              );
            })}
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="px-4 py-8 text-center text-sm text-[#71717a]">No results for &ldquo;{query}&rdquo;</p>
        )}
      </div>

      <div className="flex items-center gap-4 border-t border-white/[0.06] px-4 py-2 font-mono text-[10px] text-[#71717a]">
        <span>↑↓ navigate</span>
        <span>↵ select</span>
        <span>esc close</span>
      </div>
    </>
  );
}

export default function CommandPalette({ isOpen, onClose }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 top-[18%] z-[201] w-[min(32rem,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-xl border border-white/10 bg-[#0f0f0f] shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            <PaletteBody onClose={onClose} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
