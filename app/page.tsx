"use client";

import { useState } from "react";
import Navbar        from "@/components/layout/Navbar";
import Footer        from "@/components/layout/Footer";
import SectionProgress from "@/components/shared/SectionProgress";
import ScrollProgress  from "@/components/shared/ScrollProgress";
import CommandPalette  from "@/components/layout/CommandPalette";

import EntranceScreen from "@/sections/EntranceScreen";
import Hero           from "@/sections/Hero";
import About          from "@/sections/About";
import Experience     from "@/sections/Experience";
import Projects       from "@/sections/Projects";
import Achievements   from "@/sections/Achievements";
import Skills         from "@/sections/Skills";
import Testimonials   from "@/sections/Testimonials";
import Contact        from "@/sections/Contact";

export default function Home() {
  const [cmdOpen,        setCmdOpen]        = useState(false);
  const [entranceDone,   setEntranceDone]   = useState(false);

  return (
    <>
      {/* ── Cinematic entrance (overlays everything) */}
      {!entranceDone && (
        <EntranceScreen
          onDone={() => {
            window.scrollTo({ top: 0, behavior: "instant" });
            setEntranceDone(true);
          }}
        />
      )}

      {/* ── Navigation */}
      <Navbar onCommandPalette={() => setCmdOpen(true)} />

      {/* ── Side section progress dots (desktop) */}
      <SectionProgress />

      {/* ── Mobile-only thin progress bar */}
      <ScrollProgress />

      {/* ── All sections */}
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Achievements />
        <Skills />
        <Testimonials />
        <Contact />
      </main>

      <Footer />

      {/* ── Command palette */}
      <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />
    </>
  );
}
