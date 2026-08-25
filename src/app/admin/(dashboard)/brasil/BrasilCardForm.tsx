import type { BrasilCard } from "@/lib/content";
import { saveBrasilCard } from "@/lib/admin-actions";

export function BrasilCardForm({ item }: { item?: BrasilCard }) {
  const action = saveBrasilCard.bind(null, item?.id ?? null);

  return (
    <form action={action} className="flex max-w-xl flex-col gap-4">
      <label className="flex flex-col gap-1">
        <span className="font-mono text-xs text-on-dark-3">
          Selo (ex.: 2004 · TRIBUTO NACIONAL — deixe vazio pro card &quot;largo&quot;)
        </span>
        <input name="label" defaultValue={item?.label} className="admin-input" />
      </label>
      <label className="flex flex-col gap-1">
        <span className="font-mono text-xs text-on-dark-3">
          Selo curto (versão mobile, opcional)
        </span>
        <input
          name="labelShort"
          defaultValue={item?.labelShort}
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
        <span className="font-mono text-xs text-on-dark-3">Texto</span>
        <textarea
          name="body"
          defaultValue={item?.body}
          rows={3}
          className="admin-input"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="font-mono text-xs text-on-dark-3">
          Trecho em negrito no fim do texto (só no card largo)
        </span>
        <input
          name="bodyEmphasis"
          defaultValue={item?.bodyEmphasis}
          className="admin-input"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="font-mono text-xs text-on-dark-3">
          Placeholder de imagem (ex.: [ FOTO: ... ])
        </span>
        <input
          name="photoLabel"
          defaultValue={item?.photoLabel}
          className="admin-input"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="font-mono text-xs text-on-dark-3">
          Link do vídeo (YouTube/Vimeo/etc. — YouTube vira embed no card)
        </span>
        <input
          name="sourceUrl"
          defaultValue={item?.sourceUrl}
          className="admin-input"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="font-mono text-xs text-on-dark-3">
          Placeholder de ingresso (só no card largo, ex.: [ INGRESSO ])
        </span>
        <input
          name="ticketLabel"
          defaultValue={item?.ticketLabel}
          className="admin-input"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="font-mono text-xs text-on-dark-3">
          Texto do botão (só no card largo, ex.: EXPLORAR →)
        </span>
        <input name="cta" defaultValue={item?.cta} className="admin-input" />
      </label>
      <label className="flex items-center gap-2 text-sm text-on-dark-2">
        <input type="checkbox" name="wide" defaultChecked={item?.wide} />
        Card largo (ocupa a faixa inteira, tipo &quot;Arquivo Brasil&quot;)
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
