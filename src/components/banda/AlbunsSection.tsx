import type { Albuns } from "@/lib/content";
import { BandaTabs } from "./BandaTabs";

export function AlbunsSection({ albuns }: { albuns: Albuns }) {
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
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {albuns.items.map((a) => (
            <article
              key={a.id}
              className="border-2 border-black bg-white shadow-[5px_5px_0_#000]"
            >
              {a.coverLabel && (
                <div className="hatch-paper flex h-[180px] items-center justify-center border-b-2 border-black">
                  <span className="font-mono text-[11px] text-paper-meta">
                    {a.coverLabel}
                  </span>
                </div>
              )}
              <div className="p-4">
                <div className="mb-1 flex items-baseline gap-2">
                  <h3 className="m-0 text-xl font-bold leading-[1.1]">
                    {a.title}
                  </h3>
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
              </div>
            </article>
          ))}
        </div>
        {albuns.items.length === 0 && (
          <p className="text-sm text-paper-meta">Nenhum álbum cadastrado.</p>
        )}
      </div>
    </section>
  );
}
