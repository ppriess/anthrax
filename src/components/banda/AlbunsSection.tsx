import type {
  Albuns,
  AlbumItem,
  StreamingAlbumEntry,
  StreamingPlatform,
} from "@/lib/content";
import { BandaTabs } from "./BandaTabs";

const PLATFORM_LABEL: Record<StreamingPlatform, string> = {
  spotify: "SPOTIFY",
  apple_music: "APPLE MUSIC",
  deezer: "DEEZER",
  youtube: "YOUTUBE MUSIC",
};
const PLATFORM_ORDER: StreamingPlatform[] = [
  "spotify",
  "apple_music",
  "deezer",
  "youtube",
];

function formatReleaseDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  const meses = [
    "JAN", "FEV", "MAR", "ABR", "MAI", "JUN",
    "JUL", "AGO", "SET", "OUT", "NOV", "DEZ",
  ];
  const mes = meses[Number(m) - 1] ?? "";
  return `${Number(d)} ${mes} ${y}`;
}

function StreamingLinks({ entry }: { entry: StreamingAlbumEntry }) {
  const platforms = PLATFORM_ORDER.filter((p) => entry.links[p]);
  if (platforms.length === 0) return null;
  return (
    <div className="mt-3 border-t border-dashed border-hardline pt-2">
      <div className="mb-[6px] font-mono text-[11px] font-bold tracking-[0.1em] text-brasil-paper">
        OUVIR EM
      </div>
      <div className="flex flex-wrap gap-2">
        {platforms.map((p) => (
          <a
            key={p}
            href={entry.links[p]!.url}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-hardline px-[9px] py-[4px] font-mono text-[10px] font-bold tracking-[0.08em] text-ink no-underline hover:border-signal hover:text-brasil-paper"
          >
            {PLATFORM_LABEL[p]}
          </a>
        ))}
      </div>
    </div>
  );
}

function AlbumCard({
  a,
  streaming,
}: {
  a: AlbumItem;
  streaming?: StreamingAlbumEntry;
}) {
  return (
    <article
      className={`border-2 bg-card-paper shadow-[5px_5px_0_var(--color-hardline)] ${
        a.upcoming ? "border-signal" : "border-hardline"
      }`}
    >
      {a.cover ? (
        <div className="relative border-b-2 border-hardline">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={a.cover}
            alt={`Capa de ${a.title}`}
            loading="lazy"
            className="aspect-square w-full object-cover"
          />
          {a.upcoming && a.releaseDate && (
            <span className="absolute left-2 top-2 bg-signal px-[7px] py-[2px] font-mono text-[11px] font-bold text-ink">
              LANÇAMENTO {formatReleaseDate(a.releaseDate)}
            </span>
          )}
        </div>
      ) : (
        a.coverLabel && (
          <div className="hatch-paper flex h-[180px] items-center justify-center border-b-2 border-hardline">
            <span className="font-mono text-[11px] text-paper-meta">
              {a.coverLabel}
            </span>
          </div>
        )
      )}
      <div className="p-4">
        <div className="mb-1 flex items-baseline gap-2">
          <h3 className="m-0 text-xl font-bold leading-[1.1]">{a.title}</h3>
          <span className="font-display text-signal">{a.year}</span>
        </div>
        {a.label && (
          <div className="mb-2 font-mono text-[11px] tracking-[0.1em] text-paper-meta">
            {a.label.toUpperCase()}
          </div>
        )}
        {a.description && (
          <p className="m-0 text-sm leading-[1.4] text-paper-hi">
            {a.description}
          </p>
        )}
        {a.tracks && a.tracks.length > 0 && (
          <details className="mt-3 border-t border-dashed border-hardline pt-2">
            <summary className="cursor-pointer select-none font-mono text-[11px] font-bold tracking-[0.1em] text-brasil-paper">
              FAIXAS ({a.tracks.length})
            </summary>
            <ol className="m-0 mt-2 list-none p-0">
              {a.tracks.map((t) => (
                <li
                  key={t.n}
                  className="flex gap-2 py-[2px] font-mono text-[11px] leading-[1.5] text-paper-hi"
                >
                  <span className="w-5 shrink-0 text-right text-paper-meta">
                    {t.n}.
                  </span>
                  <span className="flex-1">{t.title}</span>
                  {t.duration && (
                    <span className="text-paper-meta">{t.duration}</span>
                  )}
                </li>
              ))}
            </ol>
          </details>
        )}
        {streaming && <StreamingLinks entry={streaming} />}
      </div>
    </article>
  );
}

export function AlbunsSection({
  albuns,
  streamingByAlbumId = {},
}: {
  albuns: Albuns;
  streamingByAlbumId?: Record<string, StreamingAlbumEntry>;
}) {
  const estudio = albuns.items.filter((a) => a.albumType !== "live");
  const aoVivo = albuns.items.filter((a) => a.albumType === "live");

  return (
    <section aria-label="Álbuns" className="bg-paper text-ink">
      <BandaTabs active="albuns" />
      <div className="px-4 py-8 md:px-10">
        <h1 className="mb-1 font-display text-3xl uppercase md:text-[44px]">
          {albuns.title}
        </h1>
        <p className="mb-8 -rotate-[0.5deg] font-marker text-base text-brasil-paper">
          {albuns.subtitle}
        </p>
        {aoVivo.length > 0 && (
          <h2 className="mb-5 font-display text-2xl uppercase">Estúdio</h2>
        )}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {estudio.map((a) => (
            <AlbumCard key={a.id} a={a} streaming={streamingByAlbumId[a.id]} />
          ))}
        </div>
        {aoVivo.length > 0 && (
          <>
            <h2 className="mb-5 mt-12 font-display text-2xl uppercase">
              Ao vivo
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {aoVivo.map((a) => (
                <AlbumCard key={a.id} a={a} streaming={streamingByAlbumId[a.id]} />
              ))}
            </div>
          </>
        )}
        {albuns.items.length === 0 && (
          <p className="text-sm text-paper-meta">Nenhum álbum cadastrado.</p>
        )}
      </div>
    </section>
  );
}
