"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Search,
  User,
  Briefcase,
  FolderKanban,
  Trophy,
  Zap,
  Mail,
  X,
  ChevronRight,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/shared/BrandIcons";
import { cn } from "@/lib/utils";

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  action: () => void;
  category: string;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
    onClose();
  };

  const allItems: CommandItem[] = [
    {
      id: "hero",
      label: "Home",
      description: "Back to the top",
      icon: <User size={15} />,
      action: () => scrollTo("hero"),
      category: "Navigation",
    },
    {
      id: "about",
      label: "About",
      description: "Learn about Utkarsh",
      icon: <User size={15} />,
      action: () => scrollTo("about"),
      category: "Navigation",
    },
    {
      id: "experience",
      label: "Experience",
      description: "Work history and internships",
      icon: <Briefcase size={15} />,
      action: () => scrollTo("experience"),
      category: "Navigation",
    },
    {
      id: "projects",
      label: "Projects",
      description: "Featured builds",
      icon: <FolderKanban size={15} />,
      action: () => scrollTo("projects"),
      category: "Navigation",
    },
    {
      id: "achievements",
      label: "Achievements",
      description: "Hackathon wins and recognitions",
      icon: <Trophy size={15} />,
      action: () => scrollTo("achievements"),
      category: "Navigation",
    },
    {
      id: "skills",
      label: "Skills",
      description: "Technical expertise",
      icon: <Zap size={15} />,
      action: () => scrollTo("skills"),
      category: "Navigation",
    },
    {
      id: "testimonials",
      label: "Testimonials",
      description: "What people say",
      icon: <Zap size={15} />,
      action: () => scrollTo("testimonials"),
      category: "Navigation",
    },
    {
      id: "contact",
      label: "Contact",
      description: "Get in touch",
      icon: <Mail size={15} />,
      action: () => scrollTo("contact"),
      category: "Navigation",
    },

    {
      id: "github",
      label: "GitHub",
      description: "github.com/utkarshhzz",
      icon: <GithubIcon size={15} />,
      action: () => {
        window.open("https://github.com/utkarshhzz", "_blank");
        onClose();
      },
      category: "Links",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      description: "linkedin.com/in/utkarsh-kumar-801703321",
      icon: <LinkedinIcon size={15} />,
      action: () => {
        window.open("https://www.linkedin.com/in/utkarsh-kumar-801703321/", "_blank");
        onClose();
      },
      category: "Links",
    },
    {
      id: "leetcode",
      label: "LeetCode",
      description: "leetcode.com/u/utkarshzz",
      icon: <Zap size={15} />,
      action: () => {
        window.open("https://leetcode.com/u/utkarshzz/", "_blank");
        onClose();
      },
      category: "Links",
    },
    {
      id: "resume",
      label: "Download Resume",
      description: "Get the PDF",
      icon: <ChevronRight size={15} />,
      action: () => {
        window.open("/resume.pdf", "_blank");
        onClose();
      },
      category: "Actions",
    },
  ];

  const filtered = query
    ? allItems.filter(
        (item) =>
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          item.description?.toLowerCase().includes(query.toLowerCase())
      )
    : allItems;

  // Group by category
  const grouped = filtered.reduce(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, CommandItem[]>
  );

  // Flat list for keyboard nav
  const flatItems = Object.values(grouped).flat();

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, flatItems.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter" && flatItems[selectedIndex]) {
        flatItems[selectedIndex].action();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, flatItems, selectedIndex, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[200]"
            style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[201] w-full max-w-lg rounded-xl overflow-hidden shadow-2xl"
            style={{
              background: "#0f0f0f",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.8)",
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            {/* Search input */}
            <div
              className="flex items-center gap-3 px-4 py-3 border-b"
              style={{ borderBottomColor: "rgba(255,255,255,0.08)" }}
            >
              <Search size={16} style={{ color: "#a1a1aa" }} />
              <input
                ref={inputRef}
                id="command-palette-input"
                type="text"
                placeholder="Search commands..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm text-white placeholder-[#a1a1aa] outline-none"
              />
              <button
                onClick={onClose}
                className="p-1 rounded text-[#a1a1aa] hover:text-white transition-colors"
                aria-label="Close"
              >
                <X size={14} />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto py-2">
              {Object.entries(grouped).map(([category, items]) => (
                <div key={category}>
                  <p
                    className="px-4 py-1.5 text-[10px] font-semibold tracking-[0.15em] uppercase"
                    style={{ color: "#52525b" }}
                  >
                    {category}
                  </p>
                  {items.map((item) => {
                    const globalIndex = flatItems.findIndex(
                      (fi) => fi.id === item.id
                    );
                    const isSelected = globalIndex === selectedIndex;
                    return (
                      <button
                        key={item.id}
                        id={`cmd-item-${item.id}`}
                        onClick={item.action}
                        onMouseEnter={() => setSelectedIndex(globalIndex)}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors",
                          isSelected
                            ? "bg-white/[0.06]"
                            : "hover:bg-white/[0.03]"
                        )}
                      >
                        <span
                          className={cn(
                            "flex-shrink-0",
                            isSelected ? "" : "text-[#52525b]"
                          )}
                        >
                          {item.icon}
                        </span>
                        <div className="min-w-0">
                          <p
                            className={cn(
                              "text-sm font-medium truncate",
                              isSelected ? "text-white" : "text-[#d4d4d8]"
                            )}
                          >
                            {item.label}
                          </p>
                          {item.description && (
                            <p className="text-xs text-[#52525b] truncate">
                              {item.description}
                            </p>
                          )}
                        </div>
                        {isSelected && (
                          <ChevronRight
                            size={14}
                            className="ml-auto flex-shrink-0"
                            style={{ color: "var(--gold)" }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
              {flatItems.length === 0 && (
                <p className="px-4 py-8 text-sm text-center text-[#52525b]">
                  No results for &ldquo;{query}&rdquo;
                </p>
              )}
            </div>

            {/* Footer */}
            <div
              className="flex items-center gap-4 px-4 py-2 border-t text-[10px]"
              style={{
                borderTopColor: "rgba(255,255,255,0.06)",
                color: "#52525b",
              }}
            >
              <span>↑↓ Navigate</span>
              <span>↵ Select</span>
              <span>Esc Close</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
