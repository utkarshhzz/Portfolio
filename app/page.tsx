"use client";

import { useEffect, useState } from "react";
import Navbar          from "@/components/layout/Navbar";
import Footer          from "@/components/layout/Footer";
import SectionProgress from "@/components/shared/SectionProgress";
import ScrollProgress  from "@/components/shared/ScrollProgress";
import CommandPalette  from "@/components/layout/CommandPalette";

import Hero                from "@/sections/Hero";
import IdentitySection     from "@/sections/IdentitySection";
import LogoShowcase        from "@/sections/LogoShowcase";
import ShowcaseSection     from "@/sections/ShowcaseSection";
import Experience          from "@/sections/Experience";
import AchievementsSection from "@/sections/Achievements";
import FeatureCards        from "@/sections/FeatureCards";
import Skills              from "@/sections/Skills";
import Education           from "@/sections/Education";
import StatsSection        from "@/sections/StatsSection";
import Contact             from "@/sections/Contact";

export default function Home() {
  const [cmdOpen, setCmdOpen] = useState(false);

  // ⌘K / Ctrl+K toggles the command palette
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <a
        href="#identity"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10000] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-black"
      >
        Skip to content
      </a>

      <Navbar onOpenPalette={() => setCmdOpen(true)} />
      <SectionProgress />
      <ScrollProgress />

      <main>
        <Hero />
        <IdentitySection />
        <LogoShowcase />
        <ShowcaseSection />
        <Experience />
        <AchievementsSection />
        <FeatureCards />
        <Skills />
        <Education />
        <StatsSection />
        <Contact />
      </main>

      <Footer />

      <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />
    </>
  );
}
