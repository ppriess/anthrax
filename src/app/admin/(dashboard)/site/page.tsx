import { readContentFile, type Site } from "@/lib/content";
import { saveSite } from "@/lib/admin-actions";

export const dynamic = "force-dynamic";

export default async function SitePage() {
  const site = await readContentFile<Site>("site.json");

  return (
    <div>
      <h1 className="mb-1 font-display text-2xl uppercase">Masthead</h1>
      <p className="mb-6 text-xs text-on-dark-3">
        Cabeçalho do site (linha &quot;SITE OFICIAL...&quot;, adesivo amarelo,
        busca e data de lançamento do countdown).
      </p>
      <form action={saveSite} className="flex max-w-xl flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">
            Linha superior (desktop)
          </span>
          <input
            name="edition"
            defaultValue={site.edition}
            required
            className="admin-input"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">
            Linha superior (mobile, versão curta)
          </span>
          <input
            name="editionShort"
            defaultValue={site.editionShort}
            required
            className="admin-input"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">
            Adesivo amarelo torto (só desktop)
          </span>
          <input
            name="tagline"
            defaultValue={site.tagline}
            required
            className="admin-input"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">
            Placeholder da busca
          </span>
          <input
            name="searchPlaceholder"
            defaultValue={site.searchPlaceholder}
            required
            className="admin-input"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">
            Data de lançamento (countdown do hero) — formato ISO com fuso, ex.:
            2026-09-18T00:00:00-03:00
          </span>
          <input
            name="releaseDate"
            defaultValue={site.releaseDate}
            required
            pattern="\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}"
            className="admin-input font-mono"
          />
        </label>
        <button
          type="submit"
          className="mt-2 w-fit bg-signal px-5 py-2 text-sm font-bold tracking-[0.1em] text-ink"
        >
          SALVAR
        </button>
      </form>
    </div>
  );
}
