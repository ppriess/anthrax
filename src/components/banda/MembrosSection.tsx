import ReactMarkdown from "react-markdown";
import type { Membros, Substitutos } from "@/lib/content";
import { BandaTabs } from "./BandaTabs";

function MemberCard({
  m,
}: {
  m: Membros["items"][number];
}) {
  return (
    <article className="border-2 border-black bg-white shadow-[5px_5px_0_#000]">
      {m.photoLabel && (
        <div className="hatch-paper flex h-[160px] items-center justify-center border-b-2 border-black">
          <span className="font-mono text-[11px] text-paper-meta">
            {m.photoLabel}
          </span>
        </div>
      )}
      <div className="p-4">
        <h3 className="m-0 text-xl font-bold leading-[1.1]">{m.name}</h3>
        <div className="mb-2 font-mono text-[11px] tracking-[0.1em] text-brasil-paper">
          {m.role.toUpperCase()}
          {m.current === false && " · EX-MEMBRO"}
          {m.years && ` · ${m.years}`}
        </div>
        {m.bio && (
          <p className="m-0 text-sm leading-[1.4] text-paper-hi">{m.bio}</p>
        )}
        {m.now && (
          <p className="m-0 mt-2 text-sm leading-[1.4] text-paper-hi">
            <strong>Atualmente:</strong> {m.now}
          </p>
        )}
      </div>
    </article>
  );
}

export function MembrosSection({
  membros,
  substitutos,
}: {
  membros: Membros;
  substitutos: Substitutos;
}) {
  const atuais = membros.items.filter((m) => m.current !== false);
  const exIntegrantes = membros.items.filter((m) => m.current === false);

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
          {atuais.map((m) => (
            <MemberCard key={m.id} m={m} />
          ))}
        </div>
        {membros.items.length === 0 && (
          <p className="text-sm text-paper-meta">Nenhum membro cadastrado.</p>
        )}

        {exIntegrantes.length > 0 && (
          <>
            <h2 className="mb-5 mt-12 font-display text-2xl uppercase">
              Ex-integrantes
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {exIntegrantes.map((m) => (
                <MemberCard key={m.id} m={m} />
              ))}
            </div>
          </>
        )}

        {substitutos.items.length > 0 && (
          <>
            <h2 className="mb-1 mt-12 font-display text-2xl uppercase">
              {substitutos.title}
            </h2>
            <p className="mb-6 max-w-2xl text-base leading-[1.4] text-paper-hi">
              {substitutos.intro}
            </p>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {substitutos.items.map((s) => {
                const Wrapper = s.videoUrl ? "a" : "article";
                const linkProps = s.videoUrl
                  ? {
                      href: s.videoUrl,
                      target: "_blank",
                      rel: "noopener noreferrer",
                    }
                  : {};
                return (
                  <Wrapper
                    key={s.id}
                    className="block border-2 border-black bg-white text-ink no-underline shadow-[5px_5px_0_#000]"
                    {...linkProps}
                  >
                    {s.videoLabel && (
                      <div className="hatch-paper relative flex h-[110px] items-center justify-center border-b-2 border-black">
                        <span className="font-mono text-[10px] text-paper-meta">
                          {s.videoLabel}
                        </span>
                        {s.videoUrl && (
                          <span className="absolute right-2 top-2 bg-signal px-[6px] py-[2px] font-mono text-[10px] font-bold text-ink">
                            ▶ VER
                          </span>
                        )}
                      </div>
                    )}
                    <div className="p-4">
                      <div className="mb-1 font-mono text-[11px] tracking-[0.1em] text-brasil-paper">
                        {s.year} · {s.role.toUpperCase()}
                      </div>
                      <h3 className="m-0 mb-1 text-lg font-bold leading-[1.1]">
                        {s.name}
                      </h3>
                      {s.description && (
                        <p className="m-0 text-sm leading-[1.4] text-paper-hi">
                          {s.description}
                        </p>
                      )}
                    </div>
                  </Wrapper>
                );
              })}
            </div>
            {substitutos.curiosity && (
              <div className="prose-news mt-6 max-w-2xl text-sm leading-[1.4] text-paper-hi">
                <ReactMarkdown>{substitutos.curiosity}</ReactMarkdown>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
