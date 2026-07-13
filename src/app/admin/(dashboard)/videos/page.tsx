import Link from "next/link";
import { readContentFile, type Tv } from "@/lib/content";
import { deleteVideo, saveTvArchive } from "@/lib/admin-actions";
import { AccordionItem } from "@/components/admin/AccordionItem";
import { VideoForm } from "./VideoForm";

export const dynamic = "force-dynamic";

export default async function VideosPage() {
  const tv = await readContentFile<Tv>("tv.json");

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl uppercase">Anthrax TV</h1>
        <Link
          href="/admin/videos/novo"
          className="bg-signal px-4 py-2 text-sm font-bold tracking-[0.1em] text-ink no-underline"
        >
          + NOVO VÍDEO
        </Link>
      </div>

      <p className="mb-3 text-xs text-on-dark-3">
        A home mostra os 3 primeiros vídeos desta lista.
      </p>
      <div className="mb-8 flex flex-col gap-2">
        {tv.videos.map((video) => (
          <AccordionItem
            key={video.id}
            summary={
              <div>
                <div className="mb-1 flex gap-2 font-mono text-[11px] text-on-dark-3">
                  <span>{video.meta}</span>
                  {video.brasil && (
                    <span className="text-brasil-dark">BRASIL</span>
                  )}
                </div>
                <div className="text-sm font-bold text-paper">
                  {video.title}
                </div>
              </div>
            }
            actions={
              <form action={deleteVideo.bind(null, video.id)}>
                <button
                  type="submit"
                  className="border border-border-dark-2 px-3 py-[6px] text-xs font-bold text-on-dark-2 hover:border-hot hover:text-hot"
                >
                  EXCLUIR
                </button>
              </form>
            }
          >
            <VideoForm item={video} />
          </AccordionItem>
        ))}
        {tv.videos.length === 0 && (
          <p className="text-sm text-on-dark-3">Nenhum vídeo ainda.</p>
        )}
      </div>

      <h2 className="mb-3 font-display text-lg uppercase text-on-dark-2">
        Card do arquivo (&quot;+147 vídeos...&quot;)
      </h2>
      <form action={saveTvArchive} className="flex max-w-xl flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">Contador</span>
          <input
            name="count"
            defaultValue={tv.archive.count}
            required
            className="admin-input"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">
            Texto (uma quebra de linha = nova linha)
          </span>
          <textarea
            name="blurb"
            defaultValue={tv.archive.blurb}
            rows={2}
            required
            className="admin-input"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">Texto do botão</span>
          <input
            name="cta"
            defaultValue={tv.archive.cta}
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
