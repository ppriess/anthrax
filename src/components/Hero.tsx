import type { Hero as HeroContent } from "@/lib/content";
import { extractYouTubeId } from "@/lib/youtube";
import { HeroPanel } from "./HeroPanel";

export function Hero({
  hero,
  releaseDate,
}: {
  hero: HeroContent;
  releaseDate: string;
}) {
  const videoId = hero.videoUrl ? extractYouTubeId(hero.videoUrl) : null;

  return (
    <section aria-label="Destaque">
      {/* Desktop */}
      <div className="hidden grid-cols-[1fr_470px] gap-8 px-10 py-9 md:grid">
        <HeroPanel
          hero={hero}
          releaseDate={releaseDate}
          videoId={videoId}
          variant="desktop"
        />

        {/* cover: capa do álbum, sempre imagem/placeholder */}
        <div className="relative">
          <div className="hatch-dark-45 flex h-[420px] rotate-[1.2deg] items-center justify-center overflow-hidden border-4 border-hardline shadow-[8px_8px_0_var(--color-brasil-paper)]">
            {hero.cover.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={hero.cover.src}
                alt={`Capa de ${hero.titleLines.join(" ")}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="border border-dashed border-border-dark-2 bg-ink px-[10px] py-[5px] font-mono text-xs text-on-dark-3">
                {hero.cover.placeholder}
              </span>
            )}
          </div>
          <div className="absolute left-[-14px] top-[-12px] -rotate-[5deg] border-2 border-hardline bg-paper px-3 py-[6px] font-marker text-[15px] text-ink">
            {hero.cover.sticker}
          </div>
          {/* translucent tape */}
          <div className="absolute bottom-[-10px] right-[10px] h-[26px] w-[90px] -rotate-[38deg] bg-paper/70" />
        </div>
      </div>

      {/* Mobile */}
      <div className="block px-4 py-5 md:hidden">
        <HeroPanel
          hero={hero}
          releaseDate={releaseDate}
          videoId={videoId}
          variant="mobile"
        />
      </div>
    </section>
  );
}
