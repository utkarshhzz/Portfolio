"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import Navbar          from "@/components/layout/Navbar";
import Footer          from "@/components/layout/Footer";
import SectionProgress from "@/components/shared/SectionProgress";
import ScrollProgress  from "@/components/shared/ScrollProgress";
import CommandPalette  from "@/components/layout/CommandPalette";

import EntranceScreen      from "@/sections/EntranceScreen";
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

const ENTRANCE_KEY = "uk-entrance-seen";
const noopSubscribe = () => () => {};

/** True once the entrance quote has been shown in this browser session. */
function useEntranceSeen() {
  return useSyncExternalStore(
    noopSubscribe,
    () => {
      try { return sessionStorage.getItem(ENTRANCE_KEY) === "1"; } catch { return false; }
    },
    () => false,
  );
}

export default function Home() {
  const [cmdOpen, setCmdOpen] = useState(false);
  const [entranceDone, setEntranceDone] = useState(false);
  const seen = useEntranceSeen();

  const finishEntrance = useCallback(() => {
    try { sessionStorage.setItem(ENTRANCE_KEY, "1"); } catch { /* private mode */ }
    window.scrollTo({ top: 0, behavior: "instant" });
    setEntranceDone(true);
  }, []);

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
      {!entranceDone && !seen && <EntranceScreen onDone={finishEntrance} />}

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
