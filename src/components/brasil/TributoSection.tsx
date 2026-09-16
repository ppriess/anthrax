import Link from "next/link";
import ReactMarkdown from "react-markdown";
import type { Tributo } from "@/lib/content";

/* ---------- blocos, montados em duas ordens (desktop / mobile) ---------- */

function Cover({ tributo }: { tributo: Tributo }) {
  if (!tributo.cover) return null;
  return (
    <figure className="m-0">
      <div className="hatch-paper-sm border-[3px] border-hardline shadow-[8px_8px_0_var(--color-brasil-paper)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={tributo.cover}
          alt={`Capa de ${tributo.title}`}
          className="block h-auto w-full"
        />
      </div>
      {tributo.coverCaption && (
        <figcaption className="mt-3 font-mono text-[11px] text-paper-meta">
          {tributo.coverCaption}
        </figcaption>
      )}
    </figure>
  );
}

function Listen({ tributo }: { tributo: Tributo }) {
  const vol1 = tributo.soundcloudVol1Url?.trim();
  const vol2 = tributo.soundcloudVol2Url?.trim();
  const discogs = tributo.discogsUrl?.trim();
  // Sem link nenhum o bloco inteiro some — página de arquivo não exibe botão morto.
  if (!vol1 && !vol2 && !discogs) return null;

  return (
    <div>
      <h2 className="mb-2 font-display text-xl uppercase">
        {tributo.listenTitle}
      </h2>
      {(vol1 || vol2) && tributo.listenNote && (
        <p className="m-0 mb-3 text-sm leading-[1.4] text-paper-hi">
          {tributo.listenNote}
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        {vol1 && (
          <a
            href={vol1}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brasil-paper px-4 py-[10px] text-sm font-bold tracking-[0.1em] text-paper no-underline"
          >
            {tributo.soundcloudVol1Label ?? "OUVIR VOL. I"}
          </a>
        )}
        {vol2 && (
          <a
            href={vol2}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brasil-paper px-4 py-[10px] text-sm font-bold tracking-[0.1em] text-paper no-underline"
          >
            {tributo.soundcloudVol2Label ?? "OUVIR VOL. II"}
          </a>
        )}
      </div>
      {discogs && (
        <a
          href={discogs}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block font-mono text-xs text-paper-meta underline decoration-dotted underline-offset-4 hover:text-brasil-paper"
        >
          {tributo.discogsLabel ?? "Ficha no Discogs →"}
        </a>
      )}
    </div>
  );
}

function Ficha({ tributo }: { tributo: Tributo }) {
  if (tributo.ficha.length === 0) return null;
  return (
    <div className="border-2 border-ink bg-card-paper p-4">
      <h2 className="m-0 mb-3 font-mono text-[11px] font-bold tracking-[0.2em] text-brasil-paper">
        {tributo.fichaTitle.toUpperCase()}
      </h2>
      <dl className="m-0">
        {tributo.ficha.map((row, i) => (
          <div
            key={`${row.label}-${i}`}
            className={`flex gap-3 py-[7px] ${i < tributo.ficha.length - 1 ? "border-b border-ink/15" : ""}`}
          >
            <dt className="min-w-[88px] flex-none font-mono text-[11px] uppercase tracking-[0.06em] text-paper-meta">
              {row.label}
            </dt>
            <dd className="m-0 text-[13px] leading-[1.35] text-paper-hi">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Endorsement({ tributo }: { tributo: Tributo }) {
  if (!tributo.endorsementTitle) return null;
  return (
    <div className="relative mb-8 border-[3px] border-hardline bg-card-paper px-5 py-[22px] shadow-[8px_8px_0_var(--color-brasil-paper)]">
      {tributo.endorsementLabel && (
        <div className="absolute left-[18px] top-[-13px] bg-brasil-paper px-3 py-[4px] font-mono text-[11px] tracking-[0.2em] text-paper">
          {tributo.endorsementLabel}
        </div>
      )}
      <p className="m-0 mb-1 -rotate-[0.4deg] font-marker text-xl leading-[1.2] text-brasil-paper">
        {tributo.endorsementTitle}
      </p>
      {tributo.endorsementBody && (
        <p className="m-0 text-[15px] leading-[1.45] text-paper-hi">
          {tributo.endorsementBody}
        </p>
      )}
    </div>
  );
}

function Bandas({ tributo }: { tributo: Tributo }) {
  return (
    <div>
      <h2 className="mb-1 font-display text-2xl uppercase">
        {tributo.bandasTitle}
      </h2>
      {tributo.bandasNote && (
        <p className="m-0 mb-4 max-w-2xl text-sm leading-[1.4] text-paper-hi">
          {tributo.bandasNote}
        </p>
      )}
      <ul className="m-0 grid list-none grid-cols-2 gap-2 p-0 sm:grid-cols-3 lg:grid-cols-4">
        {tributo.bandas.map((banda) => {
          const inner = (
            <>
              <span className="block text-[15px] font-bold leading-[1.15]">
                {banda.name}
              </span>
              {banda.track && (
                <span className="mt-1 block font-mono text-[10px] text-brasil-paper">
                  {banda.track}
                </span>
              )}
              {banda.origin && (
                <span className="mt-1 block font-mono text-[10px] text-paper-meta">
                  {banda.origin}
                </span>
              )}
            </>
          );
          return (
            <li key={banda.id} className="m-0">
              {banda.url ? (
                <a
                  href={banda.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full border-2 border-ink bg-card-paper p-3 text-ink no-underline transition-shadow hover:shadow-[4px_4px_0_var(--color-brasil-paper)]"
                >
                  {inner}
                </a>
              ) : (
                <div className="h-full border-2 border-ink bg-card-paper p-3">
                  {inner}
                </div>
              )}
            </li>
          );
        })}
      </ul>
      {tributo.bandas.length === 0 && (
        <p className="text-sm text-paper-meta">Nenhuma banda cadastrada ainda.</p>
      )}
    </div>
  );
}

function Intro({ tributo }: { tributo: Tributo }) {
  if (!tributo.intro) return null;
  return (
    <div className="prose-news mb-10 max-w-2xl text-base leading-[1.5] text-paper-hi">
      <ReactMarkdown>{tributo.intro}</ReactMarkdown>
    </div>
  );
}

/* ---------- página ---------- */

export function TributoSection({ tributo }: { tributo: Tributo }) {
  return (
    <section aria-label={tributo.title} className="bg-paper text-ink">
      <div className="px-4 py-8 md:px-10">
        <Link
          href="/#brasil"
          className="mb-5 inline-block font-mono text-[11px] tracking-[0.1em] text-paper-meta no-underline hover:text-brasil-paper"
        >
          ← ANTHRAX + BRASIL
        </Link>

        <div className="mb-7">
          <div className="mb-2 font-mono text-[11px] font-bold tracking-[0.18em] text-brasil-paper">
            {tributo.kicker}
          </div>
          <h1 className="m-0 mb-1 font-display text-3xl uppercase md:text-[44px]">
            {tributo.title}
          </h1>
          <p className="m-0 -rotate-[0.5deg] font-marker text-base text-brasil-paper md:text-lg">
            {tributo.subtitle}
          </p>
        </div>

        {/* Mobile: identidade e ação antes da leitura longa */}
        <div className="mb-8 flex flex-col gap-6 md:hidden">
          <Cover tributo={tributo} />
          <Listen tributo={tributo} />
        </div>

        {/* Desktop: texto à esquerda, capa + ouvir + ficha fixos à direita */}
        <div className="hidden grid-cols-[1fr_420px] gap-10 md:grid">
          <div>
            <Endorsement tributo={tributo} />
            <Intro tributo={tributo} />
            <Bandas tributo={tributo} />
          </div>
          <aside className="sticky top-6 flex flex-col gap-6 self-start">
            <Cover tributo={tributo} />
            <Listen tributo={tributo} />
            <Ficha tributo={tributo} />
          </aside>
        </div>

        {/* Mobile: ficha técnica por último */}
        <div className="flex flex-col gap-8 md:hidden">
          <Endorsement tributo={tributo} />
          <Intro tributo={tributo} />
          <Bandas tributo={tributo} />
          <Ficha tributo={tributo} />
        </div>
      </div>
    </section>
  );
}
