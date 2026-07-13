import { readContentFile, type Footer } from "@/lib/content";
import { saveFooter } from "@/lib/admin-actions";

export const dynamic = "force-dynamic";

export default async function FooterPage() {
  const footer = await readContentFile<Footer>("footer.json");

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl uppercase">Rodapé</h1>
      <form action={saveFooter} className="flex max-w-xl flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">Wordmark</span>
          <input
            name="wordmark"
            defaultValue={footer.wordmark}
            required
            className="admin-input"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">
            Texto central
          </span>
          <input
            name="disclaimer"
            defaultValue={footer.disclaimer}
            required
            className="admin-input"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">
            Assinatura (ex.: mosh responsável ★)
          </span>
          <input
            name="signature"
            defaultValue={footer.signature}
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
    </div>
  );
}
