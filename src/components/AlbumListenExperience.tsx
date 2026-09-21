"use client";

import { useRef, useState } from "react";
import type { AlbumTrack } from "@/lib/content";

// mostra o timestamp de início da faixa no vídeo (não a duração da faixa)
function formatTimestamp(track: AlbumTrack): string {
  if (track.startSeconds === undefined) return "";
  const m = Math.floor(track.startSeconds / 60);
  const s = track.startSeconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function embedUrl(youtubeId: string, startSeconds: number, autoplay: boolean) {
  const params = new URLSearchParams({ start: String(startSeconds), rel: "0" });
  if (autoplay) params.set("autoplay", "1");
  return `https://www.youtube.com/embed/${youtubeId}?${params.toString()}`;
}

export function AlbumListenExperience({
  title,
  subtitle,
  cover,
  youtubeId,
  tracks,
}: {
  title: string;
  subtitle?: string;
  cover?: string;
  youtubeId: string;
  tracks: AlbumTrack[];
}) {
  const playerSectionRef = useRef<HTMLDivElement | null>(null);
  const [current, setCurrent] = useState<{
    track: number | null;
    start: number;
    autoplay: boolean;
  }>({ track: null, start: 0, autoplay: false });

  function playFrom(track: AlbumTrack) {
    setCurrent({
      track: track.n,
      start: track.startSeconds ?? 0,
      autoplay: true,
    });
  }

  function handleEscuteAgora() {
    playFrom(tracks[0] ?? { n: 0, title });
    playerSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <>
      {/* player — primeira coisa depois do header, acima da dobra no mobile */}
      <section ref={playerSectionRef} aria-label="Player" className="px-4 pt-2 md:px-10">
        <div className="mx-auto max-w-2xl overflow-hidden border-2 border-hardline bg-tv-black aspect-video">
          <iframe
            key={`${current.start}-${current.autoplay}`}
            src={embedUrl(youtubeId, current.start, current.autoplay)}
            title={`Player — ${title}`}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>

      <section aria-label="Faixas" className="px-4 py-6 md:px-10">
        <div className="mx-auto max-w-2xl border-4 border-hardline bg-paper p-4 text-ink shadow-[8px_8px_0_var(--color-signal)] md:p-6">
          <p className="m-0 mb-3 font-mono text-[10px] tracking-[0.1em] text-paper-meta">
            TRACKLIST — CLIQUE PRA PULAR PRA FAIXA
          </p>
          <ol className="m-0 list-none divide-y divide-dashed divide-black/15 p-0">
            {tracks.map((track) => (
              <li key={track.n}>
                <button
                  type="button"
                  onClick={() => playFrom(track)}
                  disabled={track.startSeconds === undefined}
                  className={`flex w-full items-center gap-3 px-2 py-[7px] text-left font-mono text-[13px] leading-[1.4] disabled:cursor-default disabled:opacity-60 ${
                    current.track === track.n
                      ? "bg-signal text-ink"
                      : "text-paper-hi hover:text-brasil-paper"
                  }`}
                >
                  <span className="w-5 shrink-0 text-right text-paper-meta">
                    {track.n}.
                  </span>
                  <span className="flex-1 truncate font-bold">
                    {track.title}
                  </span>
                  <span className="shrink-0 text-paper-meta">
                    [{formatTimestamp(track)}]
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-label="Sobre o álbum" className="px-4 pb-14 md:px-10">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          {cover && (
            <div className="w-[140px] border-[3px] border-hardline">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cover}
                alt={`Capa de ${title}`}
                className="block h-auto w-full"
              />
            </div>
          )}
          <div>
            <div className="mb-2 inline-block bg-signal px-[9px] py-[3px] font-mono text-[10px] tracking-[0.18em] text-ink">
              JÁ DISPONÍVEL
            </div>
            <h1 className="m-0 font-display text-2xl uppercase leading-[0.95] md:text-3xl">
              {title}
            </h1>
            {subtitle && (
              <p className="m-0 mt-1 -rotate-[0.5deg] font-marker text-sm text-brasil-paper">
                {subtitle}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={handleEscuteAgora}
            className="bg-signal px-8 py-3 text-base font-bold tracking-[0.14em] text-ink"
          >
            ESCUTE AGORA
          </button>
        </div>
      </section>
    </>
  );
}
