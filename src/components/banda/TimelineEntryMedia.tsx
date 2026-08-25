"use client";

import { useState } from "react";
import { extractYouTubeId } from "@/lib/youtube";

export function TimelineEntryMedia({
  videoUrl,
  videoLabel,
  link,
  linkLabel,
}: {
  videoUrl?: string;
  videoLabel?: string;
  link?: string;
  linkLabel?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const ytId = videoUrl ? extractYouTubeId(videoUrl) : null;

  if (ytId) {
    return (
      <div className="mt-3 max-w-xs border-2 border-hardline">
        <div className="relative aspect-video overflow-hidden bg-ink">
          {playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0`}
              title={videoLabel ?? "Vídeo"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="h-full w-full border-0"
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Assistir ${videoLabel ?? "vídeo"}`}
              className="absolute inset-0 cursor-pointer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <span className="pointer-events-none absolute right-1 top-1 bg-signal px-[6px] py-[2px] font-mono text-[10px] font-bold text-ink">
                ▶ ASSISTIR
              </span>
            </button>
          )}
        </div>
        {videoLabel && (
          <div className="bg-card-paper px-2 py-1 font-mono text-[10px] text-paper-meta">
            {videoLabel}
          </div>
        )}
      </div>
    );
  }

  if (link) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-block border border-hardline px-[9px] py-[4px] font-mono text-[10px] font-bold tracking-[0.08em] text-ink no-underline hover:border-signal hover:text-brasil-paper"
      >
        {linkLabel ?? "SAIBA MAIS"} →
      </a>
    );
  }

  return null;
}
