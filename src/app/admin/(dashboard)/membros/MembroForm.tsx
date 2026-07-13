import type { MembroItem } from "@/lib/content";
import { saveMembro } from "@/lib/admin-actions";

export function MembroForm({ item }: { item?: MembroItem }) {
  const action = saveMembro.bind(null, item?.id ?? null);

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
          Função (ex.: Vocal, Guitarra base)
        </span>
        <input
          name="role"
          defaultValue={item?.role}
          required
          className="admin-input"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="font-mono text-xs text-on-dark-3">Bio</span>
        <textarea
          name="bio"
          defaultValue={item?.bio}
          rows={3}
          className="admin-input"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="font-mono text-xs text-on-dark-3">
          Label da foto (placeholder, ex.: [ FOTO: ... ])
        </span>
        <input
          name="photoLabel"
          defaultValue={item?.photoLabel}
          className="admin-input"
        />
      </label>
      <label className="flex items-center gap-2 text-sm text-on-dark-2">
        <input
          type="checkbox"
          name="current"
          defaultChecked={item?.current ?? true}
        />
        Membro atual (desmarcar mostra &quot;EX-MEMBRO&quot;)
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
