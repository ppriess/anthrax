import Link from "next/link";
import { readContentFile, type Brasil } from "@/lib/content";
import { deleteBrasilCard, saveBrasilIntro } from "@/lib/admin-actions";
import { AccordionItem } from "@/components/admin/AccordionItem";
import { BrasilCardForm } from "./BrasilCardForm";

export const dynamic = "force-dynamic";

export default async function BrasilPage() {
  const brasil = await readContentFile<Brasil>("brasil.json");

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl uppercase">Anthrax + Brasil</h1>
        <Link
          href="/admin/brasil/novo"
          className="bg-signal px-4 py-2 text-sm font-bold tracking-[0.1em] text-ink no-underline"
        >
          + NOVO CARD
        </Link>
      </div>

      <p className="mb-3 text-xs text-on-dark-3">
        Desktop mostra todos os cards; mobile mostra só os 2 primeiros.
      </p>
      <div className="mb-8 flex flex-col gap-2">
        {brasil.cards.map((card) => (
          <AccordionItem
            key={card.id}
            summary={
              <div>
                <div className="mb-1 flex gap-2 font-mono text-[11px] text-on-dark-3">
                  <span>{card.label || "(sem selo)"}</span>
                  {card.wide && <span className="text-signal">LARGO</span>}
                </div>
                <div className="text-sm font-bold text-paper">{card.title}</div>
              </div>
            }
            actions={
              <form action={deleteBrasilCard.bind(null, card.id)}>
                <button
                  type="submit"
                  className="border border-border-dark-2 px-3 py-[6px] text-xs font-bold text-on-dark-2 hover:border-hot hover:text-hot"
                >
                  EXCLUIR
                </button>
              </form>
            }
          >
            <BrasilCardForm item={card} />
          </AccordionItem>
        ))}
        {brasil.cards.length === 0 && (
          <p className="text-sm text-on-dark-3">Nenhum card ainda.</p>
        )}
      </div>

      <h2 className="mb-3 font-display text-lg uppercase text-on-dark-2">
        Título da seção
      </h2>
      <form action={saveBrasilIntro} className="flex max-w-xl flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">Título</span>
          <input
            name="title"
            defaultValue={brasil.title}
            required
            className="admin-input"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">Subtítulo</span>
          <input
            name="subtitle"
            defaultValue={brasil.subtitle}
            required
            className="admin-input"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">
            Subtítulo curto (mobile)
          </span>
          <input
            name="subtitleShort"
            defaultValue={brasil.subtitleShort}
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
