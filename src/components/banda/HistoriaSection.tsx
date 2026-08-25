import ReactMarkdown from "react-markdown";
import type { Historia } from "@/lib/content";
import { extractYouTubePlaylistId } from "@/lib/youtube";
import { BandaTabs } from "./BandaTabs";
import { TimelineEntryMedia } from "./TimelineEntryMedia";

function PlaylistEmbed({
  playlistId,
  label,
}: {
  playlistId: string;
  label?: string;
}) {
  return (
    <div>
      <h2 className="mb-3 font-display text-2xl uppercase">
        {label ?? "A história em vídeo"}
      </h2>
      <div className="aspect-video w-full border-2 border-hardline">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/videoseries?list=${playlistId}`}
          title={label ?? "Playlist oficial — história do Anthrax"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="h-full w-full border-0"
        />
      </div>
    </div>
  );
}

function Timeline({ historia }: { historia: Historia }) {
  return (
    <div className="border-l-[3px] border-brasil-paper pl-6">
      {historia.timeline.map((item, i) => (
        <div
          key={item.id}
          className={`relative pb-8 ${i === historia.timeline.length - 1 ? "pb-0" : ""}`}
        >
          <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-hardline bg-signal" />
          <div className="font-display text-lg text-signal">{item.year}</div>
          <h3 className="m-0 mb-1 text-lg font-bold">{item.title}</h3>
          {item.description && (
            <p className="m-0 text-sm leading-[1.4] text-paper-hi">
              {item.description}
            </p>
          )}
          <TimelineEntryMedia
            videoUrl={item.videoUrl}
            videoLabel={item.videoLabel}
            link={item.link}
            linkLabel={item.linkLabel}
          />
        </div>
      ))}
      {historia.timeline.length === 0 && (
        <p className="text-sm text-paper-meta">
          Nenhum evento na timeline ainda.
        </p>
      )}
    </div>
  );
}

export function HistoriaSection({ historia }: { historia: Historia }) {
  const playlistId = historia.playlistUrl
    ? extractYouTubePlaylistId(historia.playlistUrl)
    : null;

  return (
    <section aria-label="História" className="bg-paper text-ink">
      <BandaTabs active="historia" />
      <div className="px-4 py-8 md:px-10">
        <h1 className="mb-1 font-display text-3xl uppercase md:text-[44px]">
          {historia.title}
        </h1>
        <p className="mb-6 -rotate-[0.5deg] font-marker text-base text-brasil-paper">
          {historia.subtitle}
        </p>

        {historia.intro && (
          <div className="prose-news mb-10 max-w-2xl text-base leading-[1.5] text-paper-hi">
            <ReactMarkdown>{historia.intro}</ReactMarkdown>
          </div>
        )}

        {/* Desktop: timeline à esquerda, playlist fixa (sticky) à direita */}
        <div className="hidden grid-cols-[1fr_420px] gap-8 md:grid">
          <Timeline historia={historia} />
          {playlistId && (
            <div className="sticky top-6 self-start">
              <PlaylistEmbed
                playlistId={playlistId}
                label={historia.playlistLabel}
              />
            </div>
          )}
        </div>

        {/* Mobile: playlist primeiro (visão geral), timeline em seguida */}
        <div className="block md:hidden">
          {playlistId && (
            <div className="mb-10">
              <PlaylistEmbed
                playlistId={playlistId}
                label={historia.playlistLabel}
              />
            </div>
          )}
          <Timeline historia={historia} />
        </div>
      </div>
    </section>
  );
}
