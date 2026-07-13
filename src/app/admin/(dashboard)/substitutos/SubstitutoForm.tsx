import type { SubstitutoItem } from "@/lib/content";
import { saveSubstituto } from "@/lib/admin-actions";

export function SubstitutoForm({ item }: { item?: SubstitutoItem }) {
  const action = saveSubstituto.bind(null, item?.id ?? null);

  return (
    <form action={action} className="flex max-w-xl flex-col gap-4">
      <label className="flex flex-col gap-1">
        <span className="font-mono text-xs text-on-dark-3">Nome</span>
        <input
          name="name"
          defaultValue={item?.name}
          required
          className="admin-input"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="font-mono text-xs text-on-dark-3">
          Função (ex.: Guitarra (no lugar de Scott Ian))
        </span>
        <input
          name="role"
          defaultValue={item?.role}
          required
          className="admin-input"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="font-mono text-xs text-on-dark-3">
          Período/ano (ex.: 2011 ou 2012–2018)
        </span>
        <input
          name="year"
          defaultValue={item?.year}
          required
          className="admin-input"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="font-mono text-xs text-on-dark-3">Descrição</span>
        <textarea
          name="description"
          defaultValue={item?.description}
          rows={3}
          className="admin-input"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="font-mono text-xs text-on-dark-3">
          Link do vídeo (opcional — YouTube/Vimeo/etc.)
        </span>
        <input
          type="url"
          name="videoUrl"
          defaultValue={item?.videoUrl}
          placeholder="https://..."
          className="admin-input"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="font-mono text-xs text-on-dark-3">
          Label do thumb (placeholder, ex.: [ VÍDEO: ... ])
        </span>
        <input
          name="videoLabel"
          defaultValue={item?.videoLabel}
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
