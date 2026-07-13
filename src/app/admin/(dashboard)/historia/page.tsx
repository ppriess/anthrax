import { readContentFile, type Historia } from "@/lib/content";
import {
  deleteTimelineItem,
  moveTimelineItem,
  saveHistoriaIntro,
} from "@/lib/admin-actions";
import { AccordionItem } from "@/components/admin/AccordionItem";
import { TimelineForm } from "./TimelineForm";

export const dynamic = "force-dynamic";

export default async function HistoriaPage() {
  const historia = await readContentFile<Historia>("historia.json");

  return (
    <div>
      <h1 className="mb-1 font-display text-2xl uppercase">História</h1>
      <p className="mb-6 text-xs text-on-dark-3">
        Título, subtítulo e texto de abertura da página, mais a timeline
        abaixo.
      </p>
      <form
        action={saveHistoriaIntro}
        className="mb-10 flex max-w-xl flex-col gap-4"
      >
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">Título</span>
          <input
            name="title"
            defaultValue={historia.title}
            required
            className="admin-input"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">Subtítulo</span>
          <input
            name="subtitle"
            defaultValue={historia.subtitle}
            required
            className="admin-input"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">
            Texto de abertura (markdown — **negrito**, *itálico*, parágrafos)
          </span>
          <textarea
            name="intro"
            defaultValue={historia.intro}
            rows={6}
            className="admin-input"
          />
        </label>
        <button
          type="submit"
          className="mt-2 w-fit bg-signal px-5 py-2 text-sm font-bold tracking-[0.1em] text-ink"
        >
          SALVAR
        </button>
      </form>

      <h2 className="mb-1 font-display text-lg uppercase text-on-dark-2">
        Timeline
      </h2>
      <p className="mb-3 text-xs text-on-dark-3">
        Ordem de cima pra baixo = ordem de exibição na página.
      </p>
      <div className="mb-6 flex flex-col gap-2">
        {historia.timeline.map((item, index) => (
          <AccordionItem
            key={item.id}
            summary={
              <div>
                <div className="mb-1 font-mono text-[11px] text-signal">
                  {item.year}
                </div>
                <div className="text-sm font-bold text-paper">
                  {item.title}
                </div>
              </div>
            }
            actions={
              <>
                <form action={moveTimelineItem.bind(null, item.id, -1)}>
                  <button
                    type="submit"
                    disabled={index === 0}
                    className="border border-border-dark-2 px-2 py-[6px] text-xs font-bold text-on-dark-2 hover:border-signal hover:text-signal disabled:opacity-20"
                  >
                    ▲
                  </button>
                </form>
                <form action={moveTimelineItem.bind(null, item.id, 1)}>
                  <button
                    type="submit"
                    disabled={index === historia.timeline.length - 1}
                    className="border border-border-dark-2 px-2 py-[6px] text-xs font-bold text-on-dark-2 hover:border-signal hover:text-signal disabled:opacity-20"
                  >
                    ▼
                  </button>
                </form>
                <form action={deleteTimelineItem.bind(null, item.id)}>
                  <button
                    type="submit"
                    className="border border-border-dark-2 px-3 py-[6px] text-xs font-bold text-on-dark-2 hover:border-hot hover:text-hot"
                  >
                    EXCLUIR
                  </button>
                </form>
              </>
            }
          >
            <TimelineForm item={item} />
          </AccordionItem>
        ))}
        {historia.timeline.length === 0 && (
          <p className="text-sm text-on-dark-3">Nenhum evento ainda.</p>
        )}
      </div>

      <h2 className="mb-3 font-display text-lg uppercase text-on-dark-2">
        Adicionar evento
      </h2>
      <TimelineForm />
    </div>
  );
}
