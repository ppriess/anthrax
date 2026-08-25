import type { TimelineItem } from "@/lib/content";
import { saveTimelineItem } from "@/lib/admin-actions";

export function TimelineForm({ item }: { item?: TimelineItem }) {
  const action = saveTimelineItem.bind(null, item?.id ?? null);

  return (
    <form action={action} className="flex max-w-xl flex-col gap-4">
      <label className="flex flex-col gap-1">
        <span className="font-mono text-xs text-on-dark-3">
          Ano (texto livre, ex.: 1987 ou 1994–2011)
        </span>
        <input
          name="year"
          defaultValue={item?.year}
          required
          className="admin-input"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="font-mono text-xs text-on-dark-3">Título</span>
        <input
          name="title"
          defaultValue={item?.title}
          required
          className="admin-input"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="font-mono text-xs text-on-dark-3">
          Descrição (opcional)
        </span>
        <textarea
          name="description"
          defaultValue={item?.description}
          rows={3}
          className="admin-input"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="font-mono text-xs text-on-dark-3">
          Vídeo do YouTube (URL, opcional — ilustra o marco com um clipe)
        </span>
        <input
          name="videoUrl"
          defaultValue={item?.videoUrl}
          placeholder="https://www.youtube.com/watch?v=..."
          className="admin-input"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="font-mono text-xs text-on-dark-3">
          Legenda do vídeo (opcional)
        </span>
        <input
          name="videoLabel"
          defaultValue={item?.videoLabel}
          className="admin-input"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="font-mono text-xs text-on-dark-3">
          Link externo (opcional — usado só quando não há vídeo, ex.: Discogs)
        </span>
        <input
          name="link"
          defaultValue={item?.link}
          placeholder="https://..."
          className="admin-input"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="font-mono text-xs text-on-dark-3">
          Texto do link (opcional, ex.: Ver no Discogs)
        </span>
        <input
          name="linkLabel"
          defaultValue={item?.linkLabel}
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
  );
}
