import type {
  Agenda,
  Brasil,
  BrasilCard,
  Quiz as QuizContent,
} from "@/lib/content";
import { extractYouTubeId } from "@/lib/youtube";
import { AlertaBrasil } from "./AlertaBrasil";
import { Quiz } from "./Quiz";

function PaperCard({ card, mobile }: { card: BrasilCard; mobile?: boolean }) {
  const ytId = card.sourceUrl ? extractYouTubeId(card.sourceUrl) : null;

  if (card.wide) {
    return (
      <div className="flex items-center gap-4 border-2 border-ink bg-card-paper p-[15px] [grid-column:1/-1]">
        <div className="hatch-paper-sm flex h-16 w-24 flex-none items-center justify-center border-2 border-ink">
          <span className="font-mono text-[9px] text-paper-meta">
            {card.ticketLabel}
          </span>
        </div>
        <div className="flex-1">
          <h4 className="m-0 mb-1 text-[19px] font-bold">{card.title}</h4>
          <p className="m-0 text-[15px] text-paper-hi">
            {card.body}{" "}
            {card.bodyEmphasis && (
              <strong className="text-brasil-paper">{card.bodyEmphasis}</strong>
            )}
          </p>
        </div>
        <span className="whitespace-nowrap bg-brasil-paper px-4 py-[10px] text-sm font-bold tracking-[0.1em] text-paper">
          {card.cta}
        </span>
      </div>
    );
  }
  return (
    <div className={`border-2 border-ink bg-card-paper p-3 md:p-[15px] ${mobile ? "mb-2" : ""}`}>
      {ytId ? (
        <div className="mb-2 aspect-video overflow-hidden border-2 border-ink bg-ink">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${ytId}?rel=0`}
            title={card.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="h-full w-full border-0"
          />
        </div>
      ) : card.image ? (
        <div className="hatch-paper-sm mb-2 aspect-[3/2] overflow-hidden border-2 border-ink">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={card.image}
            alt={card.title}
            loading="lazy"
            className={`h-full w-full ${card.imageContain ? "object-contain" : "object-cover"}`}
          />
        </div>
      ) : card.sourceUrl ? (
        <a
          href={card.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hatch-paper-sm mb-2 flex aspect-[3/2] items-center justify-center border-2 border-ink no-underline"
        >
          <span className="font-mono text-[9px] text-paper-meta">
            {card.photoLabel ?? "[ VIDEO ]"}
          </span>
        </a>
      ) : card.photoLabel ? (
        <div className="hatch-paper-sm mb-2 flex aspect-[3/2] items-center justify-center border-2 border-ink">
          <span className="font-mono text-[9px] text-paper-meta">
            {card.photoLabel}
          </span>
        </div>
      ) : null}
      <div className="mb-1 font-mono text-[10px] font-bold text-brasil-paper md:mb-[6px] md:text-[11px]">
        {mobile ? (card.labelShort ?? card.label) : card.label}
      </div>
      <h4 className="m-0 text-base font-bold leading-[1.15] md:mb-[6px] md:text-[19px]">
        {card.title}
      </h4>
      {!mobile && card.body && (
        <p className="m-0 text-[15px] leading-[1.35] text-paper-hi">{card.body}</p>
      )}
    </div>
  );
}

export function BrasilSection({
  brasil,
  agenda,
  quiz,
}: {
  brasil: Brasil;
  agenda: Agenda;
  quiz: QuizContent;
}) {
  const activeQuiz = quiz.items.find((q) => q.active) ?? quiz.items[0];

  return (
    <section id="brasil" aria-label="Anthrax + Brasil">
      {/* Desktop grid */}
      <div className="hidden grid-cols-[1fr_460px] gap-8 p-10 md:grid">
        {/* paper panel */}
        <div className="relative border-4 border-hardline bg-paper px-[30px] py-[26px] text-ink shadow-[8px_8px_0_var(--color-brasil-paper)]">
          <div className="absolute left-[26px] top-[-14px] bg-brasil-paper px-3 py-[5px] font-mono text-xs tracking-[0.2em] text-paper">
            SEÇÃO ESPECIAL
          </div>
          <h2 className="mb-[6px] mt-1 font-display text-[38px] uppercase">
            {brasil.title}
          </h2>
          <p className="m-0 mb-[18px] -rotate-[0.5deg] font-marker text-base text-brasil-paper">
            {brasil.subtitle}
          </p>
          <div className="grid grid-cols-2 gap-[14px]">
            {brasil.cards.map((card) => (
              <PaperCard key={card.id} card={card} />
            ))}
          </div>
        </div>

        {/* right column: agenda + quiz */}
        <div className="flex flex-col gap-[18px]">
          <div className="border-[3px] border-paper p-5">
            <h2 className="m-0 mb-[14px] font-display text-[22px] uppercase text-paper">
              {agenda.title}
            </h2>
            {agenda.items.map((item, i) => (
              <div
                key={item.id}
                className={`flex items-center gap-3 py-[10px] ${i < agenda.items.length - 1 ? "border-b border-border-dark" : ""}`}
              >
                <span className="min-w-[52px] font-display text-[17px] text-signal">
                  {item.date}
                </span>
                <div>
                  <div className="text-[17px] font-bold text-paper">
                    {item.title}
                  </div>
                  <div className="font-mono text-[11px] text-on-dark-3">
                    {item.meta}
                  </div>
                </div>
              </div>
            ))}
            <AlertaBrasil alert={agenda.alert} confirm={agenda.alertConfirm} />
          </div>
          {activeQuiz && <Quiz quiz={activeQuiz} />}
        </div>
      </div>

      {/* Mobile: brasil panel only */}
      <div className="block px-4 py-5 md:hidden">
        <div className="border-[3px] border-hardline bg-paper p-4 text-ink shadow-[6px_6px_0_var(--color-brasil-paper)]">
          <h2 className="m-0 mb-1 font-display text-[22px] uppercase">
            {brasil.title}
          </h2>
          <p className="m-0 mb-3 font-marker text-[13px] text-brasil-paper">
            {brasil.subtitleShort}
          </p>
          {brasil.cards
            .filter((card) => !card.wide)
            .map((card) => (
              <PaperCard key={card.id} card={card} mobile />
            ))}
        </div>
      </div>
    </section>
  );
}
