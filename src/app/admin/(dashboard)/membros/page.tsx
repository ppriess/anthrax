import Link from "next/link";
import { readContentFile, type Membros } from "@/lib/content";
import { deleteMembro, saveMembrosIntro } from "@/lib/admin-actions";
import { AccordionItem } from "@/components/admin/AccordionItem";
import { MembroForm } from "./MembroForm";

export const dynamic = "force-dynamic";

export default async function MembrosPage() {
  const membros = await readContentFile<Membros>("membros.json");

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl uppercase">Membros</h1>
        <Link
          href="/admin/membros/novo"
          className="bg-signal px-4 py-2 text-sm font-bold tracking-[0.1em] text-ink no-underline"
        >
          + NOVO MEMBRO
        </Link>
      </div>

      <div className="mb-8 flex flex-col gap-2">
        {membros.items.map((item) => (
          <AccordionItem
            key={item.id}
            summary={
              <div>
                <div className="mb-1 flex gap-2 font-mono text-[11px] text-on-dark-3">
                  <span>{item.role}</span>
                  {item.current === false && (
                    <span className="text-hot">EX-MEMBRO</span>
                  )}
                </div>
                <div className="text-sm font-bold text-paper">{item.name}</div>
              </div>
            }
            actions={
              <form action={deleteMembro.bind(null, item.id)}>
                <button
                  type="submit"
                  className="border border-border-dark-2 px-3 py-[6px] text-xs font-bold text-on-dark-2 hover:border-hot hover:text-hot"
                >
                  EXCLUIR
                </button>
              </form>
            }
          >
            <MembroForm item={item} />
          </AccordionItem>
        ))}
        {membros.items.length === 0 && (
          <p className="text-sm text-on-dark-3">Nenhum membro ainda.</p>
        )}
      </div>

      <h2 className="mb-3 font-display text-lg uppercase text-on-dark-2">
        Título da página
      </h2>
      <form action={saveMembrosIntro} className="flex max-w-xl flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">Título</span>
          <input
            name="title"
            defaultValue={membros.title}
            required
            className="admin-input"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">Subtítulo</span>
          <input
            name="subtitle"
            defaultValue={membros.subtitle}
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
