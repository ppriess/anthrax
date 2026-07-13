import Link from "next/link";
import { readContentFile, type Albuns } from "@/lib/content";
import { deleteAlbum, saveAlbunsIntro } from "@/lib/admin-actions";
import { AccordionItem } from "@/components/admin/AccordionItem";
import { AlbumForm } from "./AlbumForm";

export const dynamic = "force-dynamic";

export default async function AlbunsPage() {
  const albuns = await readContentFile<Albuns>("albuns.json");

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl uppercase">Álbuns</h1>
        <Link
          href="/admin/albuns/novo"
          className="bg-signal px-4 py-2 text-sm font-bold tracking-[0.1em] text-ink no-underline"
        >
          + NOVO ÁLBUM
        </Link>
      </div>

      <div className="mb-8 flex flex-col gap-2">
        {albuns.items.map((item) => (
          <AccordionItem
            key={item.id}
            summary={
              <div>
                <div className="mb-1 font-mono text-[11px] text-on-dark-3">
                  {item.year}
                  {item.label && ` · ${item.label}`}
                </div>
                <div className="text-sm font-bold text-paper">
                  {item.title}
                </div>
              </div>
            }
            actions={
              <form action={deleteAlbum.bind(null, item.id)}>
                <button
                  type="submit"
                  className="border border-border-dark-2 px-3 py-[6px] text-xs font-bold text-on-dark-2 hover:border-hot hover:text-hot"
                >
                  EXCLUIR
                </button>
              </form>
            }
          >
            <AlbumForm item={item} />
          </AccordionItem>
        ))}
        {albuns.items.length === 0 && (
          <p className="text-sm text-on-dark-3">Nenhum álbum ainda.</p>
        )}
      </div>

      <h2 className="mb-3 font-display text-lg uppercase text-on-dark-2">
        Título da página
      </h2>
      <form action={saveAlbunsIntro} className="flex max-w-xl flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">Título</span>
          <input
            name="title"
            defaultValue={albuns.title}
            required
            className="admin-input"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">Subtítulo</span>
          <input
            name="subtitle"
            defaultValue={albuns.subtitle}
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
