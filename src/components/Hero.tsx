import type { Hero as HeroContent } from "@/lib/content";
import { Countdown } from "./Countdown";

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

export function Hero({
  hero,
  releaseDate,
}: {
  hero: HeroContent;
  releaseDate: string;
}) {
  return (
    <section aria-label="Destaque">
      {/* Desktop */}
      <div className="hidden grid-cols-[1fr_470px] gap-8 px-10 py-9 md:grid">
        {/* comic panel */}
        <div className="relative border-4 border-black bg-paper px-[34px] py-[30px] text-ink shadow-[8px_8px_0_#E8B71A]">
          <div className="absolute left-[26px] top-[-14px] bg-ink px-3 py-[5px] font-mono text-xs tracking-[0.2em] text-paper">
            {hero.panelLabel}
          </div>
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
          <p className="m-0 mb-[18px] max-w-[520px] text-[21px] leading-[1.4] text-paper-hi [text-wrap:pretty]">
            <Body text={hero.body} single={hero.singleName} />
          </p>
          <div className="flex gap-3">
            <button className="inline-block -rotate-1 bg-ink px-[22px] py-[13px] text-[17px] font-bold tracking-[0.1em] text-signal">
              {hero.primaryCta}
            </button>
            <button className="inline-block rotate-[0.6deg] border-[3px] border-ink px-[22px] py-[11px] text-[17px] font-bold tracking-[0.1em] text-ink">
              {hero.secondaryCta}
            </button>
          </div>
          <div className="mt-5 flex gap-[10px] font-mono text-[13px] text-paper-meta">
            <Countdown
              target={releaseDate}
              className="border border-[#b6b0a4] px-2 py-[3px]"
            />
            <span className="border border-[#b6b0a4] px-2 py-[3px]">
              {hero.label}
            </span>
          </div>
        </div>

        {/* cover */}
        <div className="relative">
          <div className="hatch-dark-45 flex h-[420px] rotate-[1.2deg] items-center justify-center border-4 border-black shadow-[8px_8px_0_#2E7D4F]">
            <span className="border border-dashed border-border-dark-2 bg-ink px-[10px] py-[5px] font-mono text-xs text-on-dark-3">
              {hero.cover.placeholder}
            </span>
          </div>
          <div className="absolute left-[-14px] top-[-12px] -rotate-[5deg] border-2 border-black bg-paper px-3 py-[6px] font-marker text-[15px] text-ink">
            {hero.cover.sticker}
          </div>
          {/* translucent tape */}
          <div className="absolute bottom-[-10px] right-[10px] h-[26px] w-[90px] -rotate-[38deg] bg-paper/70" />
        </div>
      </div>

      {/* Mobile */}
      <div className="block px-4 py-5 md:hidden">
        <div className="relative border-[3px] border-black bg-paper p-5 text-ink shadow-[6px_6px_0_#E8B71A]">
          <div className="mb-1 -rotate-1 font-marker text-[15px] text-hot">
            {hero.annotation}
          </div>
          <h2 className="m-0 mb-[10px] font-display text-[40px] uppercase leading-[0.92]">
            {hero.titleLines.join(" ")}
          </h2>
          <p className="m-0 mb-[14px] text-base leading-[1.35] text-paper-hi">
            <Body text={hero.bodyMobile} single={hero.singleName} />
          </p>
          <div className="hatch-paper-45 mb-[14px] flex h-[200px] items-center justify-center border-[3px] border-black">
            <span className="font-mono text-[10px] text-paper-meta">
              {hero.cover.placeholderMobile}
            </span>
          </div>
          <button className="block w-full -rotate-[0.6deg] bg-ink py-[13px] text-center text-base font-bold tracking-[0.1em] text-signal">
            {hero.primaryCta}
          </button>
        </div>
      </div>
    </section>
  );
}
