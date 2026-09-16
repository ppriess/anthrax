import type { TributoBanda } from "@/lib/content";
import { saveTributoBanda } from "@/lib/admin-actions";

export function BandaForm({ banda }: { banda?: TributoBanda }) {
  const action = saveTributoBanda.bind(null, banda?.id ?? null);

  return (
    <form action={action} className="flex max-w-xl flex-col gap-4">
      <label className="flex flex-col gap-1">
        <span className="font-mono text-xs text-on-dark-3">Nome da banda</span>
        <input
          name="name"
          defaultValue={banda?.name}
          required
          className="admin-input"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="font-mono text-xs text-on-dark-3">
          Faixa regravada (opcional — aparece em verde sob o nome)
        </span>
        <input
          name="track"
          defaultValue={banda?.track}
          placeholder="ex.: Indians"
          className="admin-input"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="font-mono text-xs text-on-dark-3">
          Cidade/estado (opcional)
        </span>
        <input
          name="origin"
          defaultValue={banda?.origin}
          placeholder="ex.: São Paulo, SP"
          className="admin-input"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="font-mono text-xs text-on-dark-3">
          Link da banda (opcional — o cartão inteiro vira link)
        </span>
        <input
          name="url"
          defaultValue={banda?.url}
          placeholder="https://..."
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
