import Link from "next/link";
import { readContentFile, type News } from "@/lib/content";
import { deleteNewsItem } from "@/lib/admin-actions";
import { AccordionItem } from "@/components/admin/AccordionItem";
import { NewsForm } from "./NewsForm";

export const dynamic = "force-dynamic";

export default async function NoticiasPage() {
  const news = await readContentFile<News>("news.json");

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl uppercase">Notícias</h1>
        <Link
          href="/admin/noticias/novo"
          className="bg-signal px-4 py-2 text-sm font-bold tracking-[0.1em] text-ink no-underline"
        >
          + NOVA NOTÍCIA
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        {news.items.map((item) => (
          <AccordionItem
            key={item.id}
            summary={
              <div>
                <div className="mb-1 flex gap-2 font-mono text-[11px] text-on-dark-3">
                  <span>{item.source}</span>
                  {item.hot && <span className="text-hot">QUENTE</span>}
                  {item.variant === "feature" && (
                    <span className="text-signal">DESTAQUE</span>
                  )}
                  {item.feed && <span>FEED</span>}
                </div>
                <div className="text-sm font-bold text-paper">{item.title}</div>
              </div>
            }
            actions={
              <form action={deleteNewsItem.bind(null, item.id)}>
                <button
                  type="submit"
                  className="border border-border-dark-2 px-3 py-[6px] text-xs font-bold text-on-dark-2 hover:border-hot hover:text-hot"
                >
                  EXCLUIR
                </button>
              </form>
            }
          >
            <NewsForm item={item} />
          </AccordionItem>
        ))}
        {news.items.length === 0 && (
          <p className="text-sm text-on-dark-3">Nenhuma notícia ainda.</p>
        )}
      </div>
    </div>
  );
}
