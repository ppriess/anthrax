import type { ReactNode } from "react";
import type { Hero as HeroContent } from "@/lib/content";
import { Countdown } from "./Countdown";

/** Renders the body text with the single name in bold, wherever it appears. */
function Body({ text, single }: { text: string; single: string }) {
  if (!single) return <>{text}</>;
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

/** Capa do álbum em miniatura, ao lado do título (mobile) — confirma
 * visualmente "isto é um álbum" sem precisar nomear o clipe em destaque. */
function CoverThumb({ hero, size }: { hero: HeroContent; size: number }) {
  return (
    <div
      className="hatch-dark-45 flex-none -rotate-2 overflow-hidden border-2 border-hardline shadow-[4px_4px_0_var(--color-signal)]"
      style={{ width: size, height: size }}
    >
      {hero.cover.src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={hero.cover.src}
          alt={`Capa de ${hero.titleLines.join(" ")}`}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="flex h-full items-center justify-center px-1 text-center font-mono text-[8px] leading-tight text-on-dark-3">
          {hero.cover.placeholder}
        </span>
      )}
    </div>
  );
}

/** Capa do álbum em destaque, ao lado do bloco de título+texto (desktop) —
 * coluna própria, estica pra acompanhar a altura do texto ao lado. */
function CoverFeatured({ hero }: { hero: HeroContent }) {
  return (
    <div className="hatch-dark-45 relative w-[42%] flex-none -rotate-1 overflow-hidden border-4 border-hardline shadow-[6px_6px_0_var(--color-signal)]">
      {hero.cover.src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={hero.cover.src}
          alt={`Capa de ${hero.titleLines.join(" ")}`}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="flex h-full items-center justify-center px-2 text-center font-mono text-xs text-on-dark-3">
          {hero.cover.placeholder}
        </span>
      )}
    </div>
  );
}

export function HeroPanel({
  hero,
  releaseDate,
  variant,
  mediaSlot,
}: {
  hero: HeroContent;
  releaseDate: string;
  variant: "desktop" | "mobile";
  mediaSlot?: ReactNode;
}) {
  const desktop = variant === "desktop";

  return (
    <div
      className={
        desktop
          ? "relative border-4 border-hardline bg-paper px-[34px] py-[30px] text-ink shadow-[8px_8px_0_var(--color-signal)]"
          : "relative overflow-hidden border-[3px] border-hardline bg-paper p-5 text-ink shadow-[6px_6px_0_var(--color-signal)]"
      }
    >
      {!desktop && hero.annotation && (
        <div className="mb-1 -rotate-1 font-marker text-[15px] text-hot">
          {hero.annotation}
        </div>
      )}

      {desktop ? (
        <>
          <div className="absolute left-[26px] top-[-14px] z-10 bg-ink px-3 py-[5px] font-mono text-xs tracking-[0.2em] text-paper">
            {hero.panelLabel}
          </div>
          {hero.annotation && (
            <div className="mb-[6px] -rotate-1 font-marker text-[19px] text-hot">
              {hero.annotation}
            </div>
          )}
          <div className="mb-[18px] flex gap-5">
            <CoverFeatured hero={hero} />
            <div className="min-w-0 flex-1">
              <h2 className="m-0 whitespace-nowrap font-display text-[clamp(24px,4vw,56px)] uppercase leading-[0.92]">
                {hero.titleLines.map((line, i) => (
                  <span key={line}>
                    {i > 0 && <br />}
                    {line}
                  </span>
                ))}
              </h2>
              <p className="m-0 mt-[14px] text-[19px] leading-[1.4] text-paper-hi [text-wrap:pretty]">
                <Body text={hero.body} single={hero.singleName} />
              </p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-[10px] font-mono text-[13px]">
            <button className="border border-ink px-2 py-[3px] font-bold tracking-[0.05em]">
              {hero.secondaryCta}
            </button>
            <Countdown
              target={releaseDate}
              className="border border-border-soft px-2 py-[3px]"
            />
            <span className="border border-border-soft px-2 py-[3px]">
              {hero.label}
            </span>
          </div>
        </>
      ) : (
        <>
          <div className="mb-[10px] flex items-center gap-3">
            <CoverThumb hero={hero} size={64} />
            <h2 className="m-0 font-display text-[40px] uppercase leading-[0.92]">
              {hero.titleLines.join(" ")}
            </h2>
          </div>
          <p className="m-0 mb-[14px] text-base leading-[1.35] text-paper-hi">
            <Body text={hero.bodyMobile} single={hero.singleName} />
          </p>
          {mediaSlot}
        </>
      )}
    </div>
  );
}
