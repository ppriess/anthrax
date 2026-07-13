import type { Membros } from "@/lib/content";
import { BandaTabs } from "./BandaTabs";

export function MembrosSection({ membros }: { membros: Membros }) {
  return (
    <section aria-label="Membros" className="bg-paper text-ink">
      <BandaTabs active="membros" />
      <div className="px-4 py-8 md:px-10">
        <h1 className="mb-1 font-display text-3xl uppercase md:text-[44px]">
          {membros.title}
        </h1>
        <p className="mb-8 -rotate-[0.5deg] font-marker text-base text-brasil-paper">
          {membros.subtitle}
        </p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {membros.items.map((m) => (
            <article
              key={m.id}
              className="border-2 border-black bg-white shadow-[5px_5px_0_#000]"
            >
              {m.photoLabel && (
                <div className="hatch-paper flex h-[160px] items-center justify-center border-b-2 border-black">
                  <span className="font-mono text-[11px] text-paper-meta">
                    {m.photoLabel}
                  </span>
                </div>
              )}
              <div className="p-4">
                <h3 className="m-0 text-xl font-bold leading-[1.1]">
                  {m.name}
                </h3>
                <div className="mb-2 font-mono text-[11px] tracking-[0.1em] text-brasil-paper">
                  {m.role.toUpperCase()}
                  {m.current === false && " · EX-MEMBRO"}
                </div>
                {m.bio && (
                  <p className="m-0 text-sm leading-[1.4] text-paper-hi">
                    {m.bio}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
        {membros.items.length === 0 && (
          <p className="text-sm text-paper-meta">Nenhum membro cadastrado.</p>
        )}
      </div>
    </section>
  );
}
