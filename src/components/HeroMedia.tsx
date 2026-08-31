import type { Hero as HeroContent } from "@/lib/content";
import { HeroVideoCover } from "./HeroVideoCover";

export function HeroMedia({
  hero,
  videoId,
  variant,
  muted,
  expanded,
  onToggleMute,
  onToggleExpand,
}: {
  hero: HeroContent;
  videoId: string | null;
  variant: "desktop" | "mobile";
  muted: boolean;
  expanded: boolean;
  onToggleMute: () => void;
  onToggleExpand: () => void;
}) {
  const desktop = variant === "desktop";

  return (
    <div className="relative">
      <div
        className={
          desktop
            ? "hatch-dark-45 relative flex h-[336px] rotate-[1.2deg] items-center justify-center overflow-hidden border-4 border-hardline shadow-[8px_8px_0_var(--color-brasil-paper)]"
            : "hatch-paper-45 relative mb-[14px] flex h-[160px] items-center justify-center overflow-hidden border-[3px] border-hardline"
        }
      >
        {videoId ? (
          <HeroVideoCover
            videoId={videoId}
            muted={muted}
            onToggleMute={onToggleMute}
            expanded={expanded}
            onToggleExpand={onToggleExpand}
            showControls
          />
        ) : hero.cover.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={hero.cover.src}
            alt={`Capa de ${hero.titleLines.join(" ")}`}
            className="h-full w-full object-cover"
          />
        ) : (
          <span
            className={
              desktop
                ? "border border-dashed border-border-dark-2 bg-ink px-[10px] py-[5px] font-mono text-xs text-on-dark-3"
                : "font-mono text-[10px] text-paper-meta"
            }
          >
            {desktop ? hero.cover.placeholder : hero.cover.placeholderMobile}
          </span>
        )}
      </div>
      {desktop && (
        <div className="absolute bottom-[-10px] right-[10px] h-[26px] w-[90px] -rotate-[38deg] bg-paper/70" />
      )}
    </div>
  );
}
