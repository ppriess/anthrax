"use client";

import { useState } from "react";
import type { Hero as HeroContent } from "@/lib/content";
import { Countdown } from "./Countdown";
import { HeroVideoCover } from "./HeroVideoCover";

/** Renders the body text with the single name in bold, wherever it appears. */
function Body({ text, single }: { text: string; single: string }) {
  const parts = text.split(single);
  if (parts.length === 1) return <>{text}</>;
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {i > 0 && <strong>{single}</strong>}
          {part}
        </span>
      ))}
    </>
  );
}

export function HeroPanel({
  hero,
  releaseDate,
  videoId,
  variant,
}: {
  hero: HeroContent;
  releaseDate: string;
  videoId: string | null;
  variant: "desktop" | "mobile";
}) {
  const [focusMode, setFocusMode] = useState(false);
  const [muted, setMuted] = useState(true);
  const [expanded, setExpanded] = useState(false);

  function handlePrimaryCta() {
    if (videoId) setFocusMode(true);
  }

  function handleVoltar() {
    setFocusMode(false);
    setExpanded(false);
  }

  const desktop = variant === "desktop";

  return (
    <div
      className={
        desktop
          ? `relative overflow-hidden border-4 border-hardline px-[34px] py-[30px] shadow-[8px_8px_0_var(--color-signal)] ${videoId ? "text-paper" : "bg-paper text-ink"}`
          : `relative overflow-hidden border-[3px] border-hardline p-5 shadow-[6px_6px_0_var(--color-signal)] ${videoId ? "text-paper" : "bg-paper text-ink"}`
      }
    >
      {videoId && (
        <>
          <HeroVideoCover
            videoId={videoId}
            muted={muted}
            onToggleMute={() => setMuted((m) => !m)}
            expanded={expanded}
            onToggleExpand={() => setExpanded((e) => !e)}
            showControls={focusMode}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/25" />
        </>
      )}

      {!focusMode && desktop && (
        <div className="absolute left-[26px] top-[-14px] z-10 bg-ink px-3 py-[5px] font-mono text-xs tracking-[0.2em] text-paper">
          {hero.panelLabel}
        </div>
      )}

      {focusMode ? (
        <div className="relative z-10 flex h-full min-h-[200px] items-end justify-end p-2">
          <button
            type="button"
            onClick={handleVoltar}
            aria-label="Voltar ao destaque"
            className="flex h-8 w-8 items-center justify-center bg-ink/80 text-base text-paper hover:bg-signal hover:text-ink"
          >
            ↺
          </button>
        </div>
      ) : desktop ? (
        <div className="relative z-10">
          <div className="mb-[6px] -rotate-1 font-marker text-[19px] text-hot">
            {hero.annotation}
          </div>
          <h2 className="m-0 mb-[14px] font-display text-[72px] uppercase leading-[0.9]">
            {hero.titleLines.map((line, i) => (
              <span key={line}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </h2>
          <p
            className={`m-0 mb-[18px] max-w-[520px] text-[21px] leading-[1.4] [text-wrap:pretty] ${videoId ? "text-paper" : "text-paper-hi"}`}
          >
            <Body text={hero.body} single={hero.singleName} />
          </p>
          <div className="flex gap-3">
            <button
              onClick={handlePrimaryCta}
              className="inline-block -rotate-1 bg-ink px-[22px] py-[13px] text-[17px] font-bold tracking-[0.1em] text-signal"
            >
              {hero.primaryCta}
            </button>
            <button className="inline-block rotate-[0.6deg] border-[3px] border-ink bg-paper px-[22px] py-[11px] text-[17px] font-bold tracking-[0.1em] text-ink">
              {hero.secondaryCta}
            </button>
          </div>
          <div className="mt-5 flex gap-[10px] font-mono text-[13px]">
            <Countdown
              target={releaseDate}
              className="border border-border-soft px-2 py-[3px]"
            />
            <span className="border border-border-soft px-2 py-[3px]">
              {hero.label}
            </span>
          </div>
        </div>
      ) : (
        <div className="relative z-10">
          <div className="mb-1 -rotate-1 font-marker text-[15px] text-hot">
            {hero.annotation}
          </div>
          <h2 className="m-0 mb-[10px] font-display text-[40px] uppercase leading-[0.92]">
            {hero.titleLines.join(" ")}
          </h2>
          <p
            className={`m-0 mb-[14px] text-base leading-[1.35] ${videoId ? "text-paper" : "text-paper-hi"}`}
          >
            <Body text={hero.bodyMobile} single={hero.singleName} />
          </p>
          {!videoId && (
            <div className="hatch-paper-45 mb-[14px] flex h-[200px] items-center justify-center overflow-hidden border-[3px] border-hardline">
              {hero.cover.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={hero.cover.src}
                  alt={`Capa de ${hero.titleLines.join(" ")}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="font-mono text-[10px] text-paper-meta">
                  {hero.cover.placeholderMobile}
                </span>
              )}
            </div>
          )}
          <button
            onClick={handlePrimaryCta}
            className="block w-full -rotate-[0.6deg] bg-ink py-[13px] text-center text-base font-bold tracking-[0.1em] text-signal"
          >
            {hero.primaryCta}
          </button>
        </div>
      )}
    </div>
  );
}
