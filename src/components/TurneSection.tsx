import ReactMarkdown from "react-markdown";
import type { Turne, TurneShow } from "@/lib/content";

/**
 * Seção "Turnê" (âncora #shows — é pra onde o item SHOWS do menu aponta).
 *
 * Hierarquia visual, na ordem em que o olho deve pegar:
 *  1. o PRÓXIMO show (bloco grande, cor signal) — é a pergunta nº 1 de quem
 *     abre a seção;
 *  2. a nota editorial "tem data no Brasil?" — pergunta nº 1 do público
 *     brasileiro especificamente, por isso vem colada no destaque e não no
 *     rodapé da seção;
 *  3. a lista completa, em linhas comparáveis (data em coluna monoespaçada
 *     pro olho varrer de cima a baixo);
 *  4. venue, billing, horário e fonte — informação de apoio, menor e mais
 *     apagada, truncada no mobile.
 */

function isFuture(show: TurneShow, today: string): boolean {
  return show.date >= today;
}

function NextShow({ show, ticketCta, nextLabel }: { show: TurneShow; ticketCta: string; nextLabel: string }) {
  return (
    <div className="relative border-4 border-signal bg-card-dark p-5 md:p-7">
      <div className="absolute left-4 top-[-13px] bg-signal px-3 py-[4px] font-mono text-[11px] font-bold tracking-[0.2em] text-ink md:left-6">
        {nextLabel}
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="font-display text-[34px] leading-none text-signal md:text-[52px]">
            {show.dateLabel}
          </div>
          <h3 className="m-0 mt-2 font-display text-[24px] uppercase leading-[1.05] text-paper md:text-[34px]">
            {show.flag && <span className="mr-2">{show.flag}</span>}
            {show.city}
            {show.region ? `, ${show.region}` : ""}
          </h3>
          <div className="mt-1 text-[15px] text-on-dark-2 md:text-[17px]">
            {show.venue} · {show.country}
          </div>
          {show.festival && (
            <div className="mt-2 inline-block bg-hot px-[7px] py-[2px] text-[12px] font-bold tracking-[0.08em] text-paper">
              {show.festival.toUpperCase()}
            </div>
          )}
          {show.billing && (
            <div className="mt-2 font-mono text-[11px] text-on-dark-3 md:text-xs">
              {show.billing}
              {show.setTime ? ` · ${show.setTime}` : ""}
            </div>
          )}
        </div>
        {show.ticketUrl && (
          <a
            href={show.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit whitespace-nowrap bg-signal px-5 py-[11px] text-sm font-bold tracking-[0.1em] text-ink no-underline"
          >
            {ticketCta} →
          </a>
        )}
      </div>
    </div>
  );
}

function ShowRow({ show, ticketCta }: { show: TurneShow; ticketCta: string }) {
  return (
    <li
      className={`flex items-center gap-3 border-b py-[11px] md:gap-5 ${
        show.brasil ? "border-brasil-dark" : "border-border-dark"
      }`}
    >
      <span
        className={`min-w-[54px] flex-none font-display text-[17px] md:min-w-[68px] md:text-[20px] ${
          show.brasil ? "text-brasil-dark" : "text-signal"
        }`}
      >
        {show.dateLabel}
      </span>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[15px] font-bold text-paper md:text-[17px]">
          {show.flag && <span className="mr-[6px]">{show.flag}</span>}
          {show.city}
          {show.region ? `, ${show.region}` : ""}
          <span className="font-normal text-on-dark-3"> · {show.country}</span>
        </div>
        <div className="truncate font-mono text-[11px] text-on-dark-3">
          {show.venue}
          {show.festival ? ` · ${show.festival}` : ""}
          {show.billing ? ` · ${show.billing}` : ""}
        </div>
      </div>
      {show.ticketUrl ? (
        <a
          href={show.ticketUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden flex-none border-2 border-signal px-3 py-[6px] text-[12px] font-bold tracking-[0.1em] text-signal no-underline hover:bg-signal hover:text-ink sm:block"
        >
          {ticketCta}
        </a>
      ) : show.sourceUrl ? (
        <a
          href={show.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden flex-none font-mono text-[11px] text-on-dark-3 no-underline hover:text-signal sm:block"
        >
          fonte ↗
        </a>
      ) : null}
    </li>
  );
}

export function TurneSection({ turne }: { turne: Turne }) {
  // renderizado a cada request (a home é force-dynamic), então "hoje" é o
  // dia real — datas passadas somem sozinhas da seção.
  const today = new Date().toISOString().slice(0, 10);
  const futuros = turne.shows
    .filter((s) => isFuture(s, today))
    .sort((a, b) => a.date.localeCompare(b.date));
  const [proximo, ...resto] = futuros;

  return (
    <section
      id="shows"
      aria-label="Turnê"
      className="border-y-[3px] border-hardline bg-tv-black px-4 py-5 md:border-y-4 md:px-10 md:py-[38px]"
    >
      <div className="mb-4 flex flex-wrap items-baseline gap-x-[14px] gap-y-1 md:mb-6">
        <h2 className="m-0 font-display text-[19px] uppercase text-paper md:text-[28px]">
          {turne.title}
        </h2>
        <p className="m-0 -rotate-[0.5deg] font-marker text-[15px] text-signal">
          {turne.subtitle}
        </p>
        <span className="ml-auto hidden font-mono text-[11px] text-on-dark-3 md:inline">
          {turne.kicker}
        </span>
      </div>

      {proximo ? (
        <div className="grid gap-5 md:grid-cols-[1.15fr_1fr] md:gap-7">
          <div className="flex flex-col gap-4">
            <NextShow
              show={proximo}
              ticketCta={turne.ticketCta}
              nextLabel={turne.nextLabel}
            />
            {turne.note && (
              <div className="markdown border-l-4 border-brasil-dark bg-card-dark p-4 text-[15px] leading-[1.4] text-on-dark-2">
                <ReactMarkdown>{turne.note}</ReactMarkdown>
              </div>
            )}
          </div>

          <div>
            <div className="mb-1 font-mono text-[11px] tracking-[0.2em] text-on-dark-3">
              TODAS AS DATAS CONFIRMADAS ({futuros.length})
            </div>
            <ul className="m-0 list-none p-0">
              {resto.map((show) => (
                <ShowRow key={show.id} show={show} ticketCta={turne.ticketCta} />
              ))}
            </ul>
            {resto.length === 0 && (
              <p className="m-0 py-3 font-mono text-[12px] text-on-dark-3">
                Essa é a única data confirmada até agora.
              </p>
            )}
          </div>
        </div>
      ) : (
        <p className="m-0 text-[15px] text-on-dark-2">{turne.emptyMessage}</p>
      )}
    </section>
  );
}
