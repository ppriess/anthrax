import ReactMarkdown from "react-markdown";
import type { Historia } from "@/lib/content";
import { BandaTabs } from "./BandaTabs";

export function HistoriaSection({ historia }: { historia: Historia }) {
  return (
    <section aria-label="História" className="bg-paper text-ink">
      <BandaTabs active="historia" />
      <div className="px-4 py-8 md:px-10">
        <h1 className="mb-1 font-display text-3xl uppercase md:text-[44px]">
          {historia.title}
        </h1>
        <p className="mb-6 -rotate-[0.5deg] font-marker text-base text-brasil-paper">
          {historia.subtitle}
        </p>

        {historia.intro && (
          <div className="prose-news mb-10 max-w-2xl text-base leading-[1.5] text-paper-hi">
            <ReactMarkdown>{historia.intro}</ReactMarkdown>
          </div>
        )}

        <div className="max-w-2xl border-l-[3px] border-brasil-paper pl-6">
          {historia.timeline.map((item, i) => (
            <div
              key={item.id}
              className={`relative pb-8 ${i === historia.timeline.length - 1 ? "pb-0" : ""}`}
            >
              <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-hardline bg-signal" />
              <div className="font-display text-lg text-signal">
                {item.year}
              </div>
              <h3 className="m-0 mb-1 text-lg font-bold">{item.title}</h3>
              {item.description && (
                <p className="m-0 text-sm leading-[1.4] text-paper-hi">
                  {item.description}
                </p>
              )}
            </div>
          ))}
          {historia.timeline.length === 0 && (
            <p className="text-sm text-paper-meta">
              Nenhum evento na timeline ainda.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
