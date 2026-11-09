"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import { Trophy, Maximize2, X, ChevronLeft, ChevronRight, Users, CalendarDays, Images } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import {
  ACHIEVEMENTS,
  OTHER_WINS,
  MEDAL,
  PODIUM_COUNT,
  type Achievement,
} from "@/data/achievements";

const EASE = [0.22, 1, 0.36, 1] as const;

function PlacementChip({ rank, label }: { rank: Achievement["rank"]; label: string }) {
  const c = MEDAL[rank].color;
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold backdrop-blur-md"
      style={{ background: `${c}1f`, color: c, border: `1px solid ${c}55` }}
    >
      <span aria-hidden className="size-1.5 rounded-full" style={{ background: c }} />
      {label}
    </span>
  );
}

/* ── Photo card ─────────────────────────────────────────────────── */
function AchievementCard({
  item,
  index,
  onOpen,
}: {
  item: Achievement;
  index: number;
  onOpen: () => void;
}) {
  const cover = item.images[0];
  const contain = item.fit === "contain";

  return (
    <motion.li
      className={`relative ${item.span === "tall" ? "lg:row-span-2" : ""}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: EASE }}
    >
      <button
        type="button"
        onClick={onOpen}
        className="achievement-card group"
        aria-label={`${item.event}, ${item.placement}. Open photo`}
      >
        {/* Blurred backdrop for posters shown uncropped */}
        {contain && (
          <Image
            src={cover.src}
            alt=""
            aria-hidden
            fill
            sizes="10vw"
            className="object-cover scale-125 blur-2xl opacity-50"
          />
        )}
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`${contain ? "object-contain p-4 pb-28" : "object-cover"} transition-transform duration-700 ease-out group-hover:scale-[1.04]`}
          style={{ objectPosition: item.focus ?? "50% 50%" }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-transparent from-[22%] via-[48%] to-[82%]" />

        <span className="absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-black/50 text-white/80 opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          {item.images.length > 1 ? <Images size={15} /> : <Maximize2 size={15} />}
        </span>

        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 text-left">
          <PlacementChip rank={item.rank} label={item.placement} />
          <h3 className="mt-3 text-xl md:text-2xl font-bold leading-tight text-white">
            {item.event}
          </h3>
          <p className="mt-1 text-[13px] text-white/65 leading-snug">
            {item.organizer}
            {item.partners && <span className="text-white/45"> · {item.partners}</span>}
          </p>
          {(item.prize || item.date) && (
            <p className="mt-2 font-mono text-[11px] tracking-wide text-white/50">
              {[item.date, item.prize].filter(Boolean).join("  ·  ")}
            </p>
          )}
        </div>
      </button>
    </motion.li>
  );
}

/* ── Lightbox ───────────────────────────────────────────────────── */
function Lightbox({
  openIndex,
  onChange,
}: {
  openIndex: number | null;
  onChange: (i: number | null) => void;
}) {
  const [imgIdx, setImgIdx] = useState(0);
  const touchX = useRef<number | null>(null);
  const item = openIndex === null ? null : ACHIEVEMENTS[openIndex];
  const total = ACHIEVEMENTS.length;

  const go = useCallback(
    (dir: 1 | -1) => {
      if (openIndex === null) return;
      setImgIdx(0);
      onChange((openIndex + dir + total) % total);
    },
    [openIndex, onChange, total],
  );

  const image = item?.images[Math.min(imgIdx, item.images.length - 1)];

  return (
    <Dialog.Root
      open={item !== null}
      onOpenChange={(o) => {
        if (!o) {
          onChange(null);
          setImgIdx(0);
        }
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[300] bg-black/85 backdrop-blur-sm data-[state=open]:animate-[fadeIn_.2s_ease-out]" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-[301] flex max-h-[92dvh] w-[min(1100px,94vw)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0d] shadow-2xl outline-none lg:flex-row data-[state=open]:animate-[popIn_.25s_cubic-bezier(.22,1,.36,1)]"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") go(1);
            if (e.key === "ArrowLeft") go(-1);
          }}
        >
          {item && image && (
            <>
              <div
                className="relative min-h-[42dvh] flex-1 touch-pan-y bg-black lg:min-h-[78dvh]"
                onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
                onTouchEnd={(e) => {
                  if (touchX.current === null) return;
                  const dx = e.changedTouches[0].clientX - touchX.current;
                  touchX.current = null;
                  if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1); // swipe between achievements
                }}
              >
                <Image
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 1024px) 94vw, 760px"
                  className="object-contain"
                  quality={90}
                />
                {item.images.length > 1 && (
                  <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-black/60 p-1.5 backdrop-blur">
                    {item.images.map((im, i) => (
                      <button
                        key={im.src}
                        type="button"
                        onClick={() => setImgIdx(i)}
                        aria-label={`Show image ${i + 1} of ${item.images.length}`}
                        aria-current={i === imgIdx}
                        className={`h-1.5 rounded-full transition-all ${i === imgIdx ? "w-6 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70"}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              <aside className="flex w-full flex-col gap-4 overflow-y-auto border-t border-white/10 p-6 lg:w-[340px] lg:border-l lg:border-t-0 lg:p-8">
                <div className="pr-12">
                  <PlacementChip rank={item.rank} label={item.placement} />
                </div>
                <div>
                  <Dialog.Title className="text-2xl font-bold leading-tight text-white">
                    {item.event}
                  </Dialog.Title>
                  <p className="mt-1.5 text-sm text-[var(--text-3)]">{item.organizer}</p>
                  {item.partners && (
                    <p className="mt-0.5 text-sm text-[var(--text-3)]/80">with {item.partners}</p>
                  )}
                </div>
                <Dialog.Description className="text-sm leading-relaxed text-[var(--text-2)]/85">
                  {item.summary}
                </Dialog.Description>
                <dl className="grid grid-cols-2 gap-3 text-sm">
                  {item.team && (
                    <div className="lightbox-fact">
                      <dt><Users size={13} /> Team</dt>
                      <dd>{item.team.replace("Team ", "")}</dd>
                    </div>
                  )}
                  {item.date && (
                    <div className="lightbox-fact">
                      <dt><CalendarDays size={13} /> When</dt>
                      <dd>{item.date}</dd>
                    </div>
                  )}
                  {item.prize && (
                    <div className="lightbox-fact">
                      <dt><Trophy size={13} /> Prize</dt>
                      <dd>{item.prize}</dd>
                    </div>
                  )}
                </dl>

                <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                  <span className="font-mono text-xs text-[var(--text-3)]">
                    {String((openIndex ?? 0) + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                  </span>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => go(-1)} className="icon-btn" aria-label="Previous achievement">
                      <ChevronLeft size={16} />
                    </button>
                    <button type="button" onClick={() => go(1)} className="icon-btn" aria-label="Next achievement">
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </aside>

              <Dialog.Close className="icon-btn absolute right-3 top-3 bg-black/60 backdrop-blur" aria-label="Close">
                <X size={16} />
              </Dialog.Close>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/* ── Section ────────────────────────────────────────────────────── */
export default function AchievementsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const other = OTHER_WINS[0];

  const summary = [
    { value: `${PODIUM_COUNT}`, label: "Podium finishes" },
    { value: `${ACHIEVEMENTS.length + OTHER_WINS.length}`, label: "Hackathons placed" },
    { value: "₹1.5L+", label: "Prize money" },
  ];

  return (
    <section id="achievements" className="section-padding relative">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-40 h-[420px] w-[720px] max-w-full -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(196,154,60,0.10),transparent)]" />

      <SectionHeading
        index="03"
        eyebrow="Recognition"
        title="Hackathon Achievements"
        sub="Ideas built and shipped in 24–48 hours, then judged against hundreds of other teams."
      />

      <dl className="relative mx-auto mb-12 grid max-w-2xl grid-cols-3 divide-x divide-white/[0.07] rounded-2xl border border-white/[0.07] bg-white/[0.02]">
        {summary.map((s) => (
          <div key={s.label} className="px-3 py-5 text-center">
            <dd className="text-2xl md:text-3xl font-extrabold tabular-nums tracking-tight text-[var(--gold)]">
              {s.value}
            </dd>
            <dt className="mt-1 text-[11px] md:text-xs text-[var(--text-3)]">{s.label}</dt>
          </div>
        ))}
      </dl>

      <ul className="relative mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:grid-flow-dense auto-rows-[300px] md:auto-rows-[280px]">
        {ACHIEVEMENTS.map((item, i) => (
          <AchievementCard key={item.id} item={item} index={i} onOpen={() => setOpenIndex(i)} />
        ))}

        {/* Win without a photo */}
        <motion.li
          className="relative flex flex-col justify-between overflow-hidden rounded-2xl border p-6"
          style={{
            borderColor: `${MEDAL[other.rank].color}40`,
            background: `linear-gradient(160deg, ${MEDAL[other.rank].color}14, rgba(10,10,12,0.9) 55%)`,
          }}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
        >
          <Trophy
            aria-hidden
            size={120}
            strokeWidth={1}
            className="absolute -right-6 -top-6 opacity-[0.07]"
            style={{ color: MEDAL[other.rank].color }}
          />
          <div>
            <PlacementChip rank={other.rank} label={other.placement} />
            <h3 className="mt-3 text-2xl font-bold text-white">{other.event}</h3>
            <p className="mt-1 text-[13px] text-white/60">{other.detail}</p>
          </div>
          <p className="text-[13px] leading-relaxed text-[var(--text-3)]">{other.summary}</p>
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-[11px] tracking-wide text-white/50">{other.prize} prize</p>
            <a
              href={other.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[var(--gold)] hover:underline underline-offset-4"
            >
              View code ↗
            </a>
          </div>
        </motion.li>
      </ul>

      <Lightbox openIndex={openIndex} onChange={setOpenIndex} />
    </section>
  );
}
