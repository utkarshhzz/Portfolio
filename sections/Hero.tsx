"use client";

import { useSyncExternalStore } from "react";
import NeuralHero from "./hero/NeuralHero";
import DepthHero from "./hero/DepthHero";
import PortraitHero from "./hero/PortraitHero";

/**
 * Landing hero. Default is "neural". Preview the others with
 *   /?hero=depth   — CSS 3D fly-through of projects and wins
 *   /?hero=portrait — original scroll-scrubbed image sequence
 * A small switcher appears whenever ?hero= is in the URL.
 */
const VARIANTS = {
  neural: { label: "Neural", Component: NeuralHero },
  depth: { label: "Depth", Component: DepthHero },
  portrait: { label: "Portrait", Component: PortraitHero },
} as const;

type Variant = keyof typeof VARIANTS;
export const DEFAULT_HERO: Variant = "neural";

const noopSubscribe = () => () => {};

function readParam(): string | null {
  try {
    return new URLSearchParams(window.location.search).get("hero");
  } catch {
    return null;
  }
}

export default function Hero() {
  const param = useSyncExternalStore(noopSubscribe, readParam, () => null);
  const variant: Variant = param && param in VARIANTS ? (param as Variant) : DEFAULT_HERO;
  const { Component } = VARIANTS[variant];

  return (
    <>
      <Component key={variant} />
      {param !== null && (
        <nav
          aria-label="Hero style preview"
          className="fixed bottom-4 left-1/2 z-[150] flex -translate-x-1/2 gap-1 rounded-full border border-white/10 bg-black/80 p-1 backdrop-blur"
        >
          {(Object.keys(VARIANTS) as Variant[]).map((v) => (
            <a
              key={v}
              href={`?hero=${v}`}
              aria-current={v === variant}
              className="rounded-full px-3.5 py-1.5 text-xs font-semibold text-[var(--text-3)] transition-colors hover:text-white aria-[current=true]:bg-[var(--gold)] aria-[current=true]:text-black"
            >
              {VARIANTS[v].label}
            </a>
          ))}
        </nav>
      )}
    </>
  );
}
