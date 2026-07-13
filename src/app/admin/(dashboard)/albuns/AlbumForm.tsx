import type { AlbumItem } from "@/lib/content";
import { saveAlbum } from "@/lib/admin-actions";

export function AlbumForm({ item }: { item?: AlbumItem }) {
  const action = saveAlbum.bind(null, item?.id ?? null);

  return (
    <form action={action} className="flex max-w-xl flex-col gap-4">
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
        <span className="font-mono text-xs text-on-dark-3">Ano</span>
        <input
          name="year"
          defaultValue={item?.year}
          required
          className="admin-input"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="font-mono text-xs text-on-dark-3">
          Gravadora (opcional)
        </span>
        <input
          name="label"
          defaultValue={item?.label}
          className="admin-input"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="font-mono text-xs text-on-dark-3">
          Label da capa (placeholder, ex.: [ CAPA — ... ])
        </span>
        <input
          name="coverLabel"
          defaultValue={item?.coverLabel}
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
      <button
        type="submit"
        className="mt-2 w-fit bg-signal px-5 py-2 text-sm font-bold tracking-[0.1em] text-ink"
      >
        SALVAR
      </button>
    </form>
  );
}
