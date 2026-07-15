"use client";

import { useState } from "react";
import type { Tv, Video } from "@/lib/content";
import { extractYouTubeId } from "@/lib/youtube";

// Filtros são estrutura de UI, não conteúdo editável — ficam no código.
type VideoFilter = "TODOS" | "CLIPES" | "LYRIC" | "AO VIVO";
const videoFilters: { label: VideoFilter; type?: Video["videoType"] }[] = [
  { label: "TODOS" },
  { label: "CLIPES", type: "music_video" },
  { label: "LYRIC", type: "lyric_video" },
  { label: "AO VIVO", type: "live_video" },
];

function VideoCard({
  video,
  rotate,
  playing,
  onPlay,
}: {
  video: Video;
  rotate: string;
  playing: boolean;
  onPlay: () => void;
}) {
  const accent = video.brasil ? "border-brasil-dark" : "border-paper";
  const ytId = video.sourceUrl ? extractYouTubeId(video.sourceUrl) : null;
  // com ID do YouTube o card vira player embutido; sem ID mantém link externo
  const Wrapper = video.sourceUrl && !ytId ? "a" : "article";
  const linkProps =
    video.sourceUrl && !ytId
      ? { href: video.sourceUrl, target: "_blank", rel: "noopener noreferrer" }
      : {};
  return (
    <Wrapper
      className={`card-hover block border-[3px] ${accent} bg-ink no-underline`}
      style={{ transform: `rotate(${rotate})` }}
      {...linkProps}
    >
      <div
        className={`hatch-dark relative flex aspect-video items-center justify-center overflow-hidden border-b-[3px] ${accent}`}
      >
        {playing && ytId ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <>
            {ytId ? (
              <button
                type="button"
                onClick={onPlay}
                aria-label={`Assistir ${video.title}`}
                className="absolute inset-0 cursor-pointer"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </button>
            ) : (
              <span className="font-mono text-[10px] text-on-dark-3">
                [ THUMB ]
              </span>
            )}
            {video.brasil && (
              <span className="pointer-events-none absolute left-2 top-2 bg-brasil-dark px-[7px] py-[2px] text-[11px] font-bold text-tv-black">
                BRASIL 🇧🇷
              </span>
            )}
            {video.duration && (
              <span className="pointer-events-none absolute bottom-2 right-2 bg-ink px-[5px] py-[2px] font-mono text-[11px] text-paper">
                {video.duration}
              </span>
            )}
            {video.sourceUrl && (
              <span className="pointer-events-none absolute right-2 top-2 bg-signal px-[6px] py-[2px] font-mono text-[10px] font-bold text-ink">
                ▶ ASSISTIR
              </span>
            )}
          </>
        )}
      </div>
      <div className="px-[13px] py-[11px]">
        <h4 className="m-0 mb-1 text-base font-bold leading-[1.15] text-paper">
          {video.title}
        </h4>
        <div className="font-mono text-[11px] text-on-dark-3">{video.meta}</div>
      </div>
    </Wrapper>
  );
}

export function AnthraxTV({ tv }: { tv: Tv }) {
  const [active, setActive] = useState<VideoFilter>("TODOS");
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const { videos, archive } = tv;

  const activeType = videoFilters.find((f) => f.label === active)?.type;
  const filtered = activeType
    ? videos.filter((v) => v.videoType === activeType)
    : videos;
  const destaques = filtered.slice(0, 3);
  const resto = filtered.slice(3);

  const cardProps = (v: Video) => ({
    playing: playingId === v.id,
    onPlay: () => setPlayingId(v.id),
  });

  return (
    <section
      id="anthrax-tv"
      aria-label="Anthrax TV"
      className="border-y-[3px] border-hardline bg-tv-black px-4 py-5 md:border-y-4 md:px-10 md:py-[38px]"
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
        {destaques.map((v, i) => (
          <VideoCard
            key={v.id}
            video={v}
            rotate={["-0.7deg", "0.6deg", "-0.5deg"][i]}
            {...cardProps(v)}
          />
        ))}
        <div className="flex flex-col items-center justify-center gap-2 border-[3px] border-dashed border-border-dark-2 p-5 text-center">
          <div className="font-display text-[30px] text-signal">
            {archive.count}
          </div>
          <div className="whitespace-pre-line text-base leading-[1.3] text-on-dark-2">
            {archive.blurb}
          </div>
          <button
            type="button"
            onClick={() => setShowAll((s) => !s)}
            className="mt-1 bg-signal px-4 py-[9px] text-sm font-bold tracking-[0.1em] text-ink"
          >
            {showAll ? "FECHAR ACERVO" : archive.cta}
          </button>
        </div>
        {showAll &&
          resto.map((v, i) => (
            <VideoCard
              key={v.id}
              video={v}
              rotate={["0.5deg", "-0.6deg", "0.4deg", "-0.4deg"][i % 4]}
              {...cardProps(v)}
            />
          ))}
      </div>

      {/* Mobile: 1 card + CTA (expande o acervo completo) */}
      <div className="block md:hidden">
        {destaques[0] && (
          <VideoCard
            video={destaques[0]}
            rotate="-0.5deg"
            {...cardProps(destaques[0])}
          />
        )}
        {showAll && (
          <div className="mt-4 flex flex-col gap-4">
            {[...destaques.slice(1), ...resto].map((v, i) => (
              <VideoCard
                key={v.id}
                video={v}
                rotate={i % 2 === 0 ? "0.4deg" : "-0.4deg"}
                {...cardProps(v)}
              />
            ))}
          </div>
        )}
        <div className="mt-[10px] text-center">
          <button
            type="button"
            onClick={() => setShowAll((s) => !s)}
            className="inline-block bg-signal px-[18px] py-[10px] text-sm font-bold tracking-[0.1em] text-ink"
          >
            {showAll ? "FECHAR ACERVO" : `${archive.count} VÍDEOS → ANTHRAX TV`}
          </button>
        </div>
      </div>
    </section>
  );
}
