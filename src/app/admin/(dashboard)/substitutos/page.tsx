import Link from "next/link";
import { readContentFile, type Substitutos } from "@/lib/content";
import { deleteSubstituto, saveSubstitutosIntro } from "@/lib/admin-actions";
import { AccordionItem } from "@/components/admin/AccordionItem";
import { SubstitutoForm } from "./SubstitutoForm";

export const dynamic = "force-dynamic";

export default async function SubstitutosPage() {
  const substitutos = await readContentFile<Substitutos>("substitutos.json");

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl uppercase">
          Notáveis Substitutos
        </h1>
        <Link
          href="/admin/substitutos/novo"
          className="bg-signal px-4 py-2 text-sm font-bold tracking-[0.1em] text-ink no-underline"
        >
          + NOVO SUBSTITUTO
        </Link>
      </div>

      <div className="mb-8 flex flex-col gap-2">
        {substitutos.items.map((item) => (
          <AccordionItem
            key={item.id}
            summary={
              <div>
                <div className="mb-1 font-mono text-[11px] text-on-dark-3">
                  {item.year} · {item.role}
                </div>
                <div className="text-sm font-bold text-paper">
                  {item.name}
                </div>
              </div>
            }
            actions={
              <form action={deleteSubstituto.bind(null, item.id)}>
                <button
                  type="submit"
                  className="border border-border-dark-2 px-3 py-[6px] text-xs font-bold text-on-dark-2 hover:border-hot hover:text-hot"
                >
                  EXCLUIR
                </button>
              </form>
            }
          >
            <SubstitutoForm item={item} />
          </AccordionItem>
        ))}
        {substitutos.items.length === 0 && (
          <p className="text-sm text-on-dark-3">Nenhum substituto ainda.</p>
        )}
      </div>

      <h2 className="mb-3 font-display text-lg uppercase text-on-dark-2">
        Título, intro e curiosidade
      </h2>
      <form
        action={saveSubstitutosIntro}
        className="flex max-w-xl flex-col gap-4"
      >
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">Título</span>
          <input
            name="title"
            defaultValue={substitutos.title}
            required
            className="admin-input"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">
            Texto de abertura
          </span>
          <textarea
            name="intro"
            defaultValue={substitutos.intro}
            rows={3}
            required
            className="admin-input"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">
            Curiosidade final (markdown — opcional, aparece depois da lista)
          </span>
          <textarea
            name="curiosity"
            defaultValue={substitutos.curiosity}
            rows={5}
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
