import Link from "next/link";
import type { Albuns } from "@/lib/content";

export function DiscografiaSection({ albuns }: { albuns: Albuns }) {
  const destaque = albuns.items.find((a) => a.upcoming);
  const resto = albuns.items.filter((a) => !a.upcoming).slice(0, 5);
  const grade = destaque ? [destaque, ...resto] : albuns.items.slice(0, 6);

  return (
    <section
      id="discografia"
      aria-label="Discografia"
      className="px-4 py-[22px] md:px-10 md:py-10"
    >
      <div className="relative border-4 border-hardline bg-paper px-4 py-6 text-ink shadow-[8px_8px_0_var(--color-signal)] md:px-[30px] md:py-[26px]">
        <div className="absolute left-4 top-[-14px] bg-signal px-3 py-[5px] font-mono text-xs tracking-[0.2em] text-ink md:left-[26px]">
          DISCOGRAFIA
        </div>
        <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <h2 className="m-0 mt-1 font-display text-3xl uppercase md:text-[38px]">
              {albuns.title}
            </h2>
            <p className="m-0 -rotate-[0.5deg] font-marker text-base text-brasil-paper">
              {albuns.subtitle}
            </p>
          </div>
          <Link
            href="/banda/albuns"
            className="whitespace-nowrap bg-signal px-4 py-[9px] text-sm font-bold tracking-[0.1em] text-ink no-underline"
          >
            DISCOGRAFIA COMPLETA →
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {grade.map((a) => (
            <Link
              key={a.id}
              href="/banda/albuns"
              className="block border-2 border-hardline bg-card-paper no-underline"
            >
              {a.cover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={a.cover}
                  alt={`Capa de ${a.title}`}
                  loading="lazy"
                  className="aspect-square w-full border-b-2 border-hardline object-cover"
                />
              ) : (
                <div className="hatch-paper flex aspect-square items-center justify-center border-b-2 border-hardline">
                  <span className="font-mono text-[10px] text-paper-meta">
                    {a.coverLabel}
                  </span>
                </div>
              )}
              <div className="p-2">
                <div className="truncate text-xs font-bold leading-[1.2]">
                  {a.title}
                </div>
                <div className="font-mono text-[10px] text-paper-meta">
                  {a.year}
                  {a.upcoming && (
                    <span className="ml-1 text-signal">· EM BREVE</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
