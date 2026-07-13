import type { AgendaItem } from "@/lib/content";
import { saveAgendaItem } from "@/lib/admin-actions";

export function AgendaForm({ item }: { item?: AgendaItem }) {
  const action = saveAgendaItem.bind(null, item?.id ?? null);

  return (
    <form action={action} className="flex max-w-xl flex-col gap-4">
      <label className="flex flex-col gap-1">
        <span className="font-mono text-xs text-on-dark-3">
          Data (texto livre, ex.: SET 26 ou 18.09)
        </span>
        <input
          name="date"
          defaultValue={item?.date}
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
          Meta (ex.: MEGAFORCE · NUCLEAR BLAST)
        </span>
        <input
          name="meta"
          defaultValue={item?.meta}
          required
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
