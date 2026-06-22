"use client";

import { useRef } from "react";

interface CardData {
  review?: string;
  [key: string]: unknown;
}

interface Props {
  card: CardData;
  index?: number;
  children: React.ReactNode;
}

export default function GlowCard({ card, index = 0, children }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;
    let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
    angle = (angle + 360) % 360;
    el.style.setProperty("--start", String(angle + 60));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="card card-border timeline-card rounded-xl p-8 mb-5 break-inside-avoid-column"
    >
      <div className="glow" />

      {/* Stars */}
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: 5 }, (_, i) => (
          <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="var(--gold)" aria-hidden>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>

      {/* Review */}
      {card.review && (
        <div className="mb-5">
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>
            {card.review}
          </p>
        </div>
      )}

      {children}
    </div>
  );
}
