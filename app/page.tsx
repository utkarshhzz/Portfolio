"use client";

import { useState } from "react";
import Navbar          from "@/components/layout/Navbar";
import Footer          from "@/components/layout/Footer";
import SectionProgress from "@/components/shared/SectionProgress";
import ScrollProgress  from "@/components/shared/ScrollProgress";
import CommandPalette  from "@/components/layout/CommandPalette";

import EntranceScreen   from "@/sections/EntranceScreen";
import Hero             from "@/sections/Hero";
import IdentitySection  from "@/sections/IdentitySection";
import LogoShowcase     from "@/sections/LogoShowcase";
import ShowcaseSection  from "@/sections/ShowcaseSection";
import FeatureCards     from "@/sections/FeatureCards";
import Experience       from "@/sections/Experience";
import Skills           from "@/sections/Skills";
import Testimonials     from "@/sections/Testimonials";
import Contact          from "@/sections/Contact";

export default function Home() {
  const [cmdOpen,      setCmdOpen]      = useState(false);
  const [entranceDone, setEntranceDone] = useState(false);

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
      <Navbar />

      {/* ── Side section progress dots (desktop only) */}
      <SectionProgress />

      {/* ── Mobile-only thin scroll progress bar */}
      <ScrollProgress />

      {/* ── Page content */}
      <main>
        {/*
          Flow:
          1. Entrance quote screen (cinematic)
          2. Hero — scroll-driven canvas frames (CLEAN, no text)
          3. IdentitySection — name / bio / CTAs / stats (after hero)
          4. LogoShowcase — dual-row tech marquee
          5. ShowcaseSection — featured + 2 smaller projects (reference layout)
          6. FeatureCards — 3-col ability cards
          7. Experience — GlowCard left + timeline right (reference layout)
          8. Skills — 5-col tech icon grid (reference layout)
          9. Testimonials — GlowCard masonry columns (reference layout)
          10. Contact — form left + decorative visual right
        */}
        <Hero />
        <IdentitySection />
        <LogoShowcase />
        <ShowcaseSection />
        <FeatureCards />
        <Experience />
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
