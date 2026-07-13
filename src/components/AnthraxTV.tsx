"use client";

import { useState } from "react";
import type { Tv, Video } from "@/lib/content";

// Filtros são estrutura de UI, não conteúdo editável — ficam no código.
type VideoFilter = "FESTIVAL" | "ANO" | "ERA" | "4K";
const videoFilters: { label: VideoFilter; active?: boolean }[] = [
  { label: "FESTIVAL", active: true },
  { label: "ANO" },
  { label: "ERA" },
  { label: "4K" },
];

function VideoCard({ video, rotate }: { video: Video; rotate: string }) {
  const accent = video.brasil ? "border-brasil-dark" : "border-paper";
  return (
    <article
      className={`card-hover border-[3px] ${accent} bg-ink`}
      style={{ transform: `rotate(${rotate})` }}
    >
      <div
        className={`hatch-dark relative flex h-[150px] items-center justify-center border-b-[3px] ${accent}`}
      >
        <span className="font-mono text-[10px] text-on-dark-3">[ THUMB ]</span>
        {video.brasil ? (
          <span className="absolute left-2 top-2 bg-brasil-dark px-[7px] py-[2px] text-[11px] font-bold text-tv-black">
            BRASIL 🇧🇷
          </span>
        ) : (
          <span className="absolute bottom-2 right-2 bg-black px-[5px] py-[2px] font-mono text-[11px] text-white">
            {video.duration}
          </span>
        )}
      </div>
      <div className="px-[13px] py-[11px]">
        <h4 className="m-0 mb-1 text-base font-bold leading-[1.15] text-paper">
          {video.title}
        </h4>
        <div className="font-mono text-[11px] text-on-dark-3">{video.meta}</div>
      </div>
    </article>
  );
}

export function AnthraxTV({ tv }: { tv: Tv }) {
  const [active, setActive] = useState<string>(
    videoFilters.find((f) => f.active)?.label ?? videoFilters[0].label,
  );
  const { videos, archive } = tv;

  return (
    <section
      id="anthrax-tv"
      aria-label="Anthrax TV"
      className="border-y-[3px] border-black bg-tv-black px-4 py-5 md:border-y-4 md:px-10 md:py-[38px]"
    >
      <div className="mb-3 flex items-center gap-[14px] md:mb-5">
        <h2 className="m-0 font-display text-[19px] uppercase text-paper md:text-[28px]">
          Anthrax{" "}
          <span className="bg-hot px-[7px] py-px text-paper md:px-[10px] md:py-[2px]">
            TV
          </span>
        </h2>
        <div className="ml-auto hidden gap-2 md:flex">
          {videoFilters.map((f) => {
            const on = f.label === active;
            return (
              <button
                key={f.label}
                type="button"
                onClick={() => setActive(f.label)}
                className={`border-2 px-3 py-[5px] text-[13px] font-bold tracking-[0.1em] transition-colors ${
                  on
                    ? "border-signal text-signal"
                    : "border-border-dark-2 text-on-dark-2 hover:border-signal hover:text-signal"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop 4-col */}
      <div className="hidden grid-cols-4 gap-4 md:grid">
        <VideoCard video={videos[0]} rotate="-0.7deg" />
        <VideoCard video={videos[1]} rotate="0.6deg" />
        <VideoCard video={videos[2]} rotate="-0.5deg" />
        <div className="flex flex-col items-center justify-center gap-2 border-[3px] border-dashed border-border-dark-2 p-5 text-center">
          <div className="font-display text-[30px] text-signal">
            {archive.count}
          </div>
          <div className="whitespace-pre-line text-base leading-[1.3] text-on-dark-2">
            {archive.blurb}
          </div>
          <button className="mt-1 bg-signal px-4 py-[9px] text-sm font-bold tracking-[0.1em] text-ink">
            {archive.cta}
          </button>
        </div>
      </div>

      {/* Mobile: 1 card + CTA */}
      <div className="block md:hidden">
        <article className="card-hover -rotate-[0.5deg] border-[3px] border-paper bg-ink">
          <div className="hatch-dark relative flex h-[170px] items-center justify-center border-b-[3px] border-paper">
            <span className="font-mono text-[10px] text-on-dark-3">[ THUMB ]</span>
            <span className="absolute bottom-2 right-2 bg-black px-[5px] py-[2px] font-mono text-[11px] text-white">
              {videos[0].duration}
            </span>
          </div>
          <div className="px-[13px] py-[11px]">
            <h4 className="m-0 mb-[3px] text-base font-bold text-paper">
              {videos[0].title}
            </h4>
            <div className="font-mono text-[10px] text-on-dark-3">
              {videos[0].meta}
            </div>
          </div>
        </article>
        <div className="mt-[10px] text-center">
          <button className="inline-block bg-signal px-[18px] py-[10px] text-sm font-bold tracking-[0.1em] text-ink">
            {archive.count} VÍDEOS → ANTHRAX TV
          </button>
        </div>
      </div>
    </section>
  );
}
