import type { Video } from "@/lib/content";
import { saveVideo } from "@/lib/admin-actions";

export function VideoForm({ item }: { item?: Video }) {
  const action = saveVideo.bind(null, item?.id ?? null);

  return (
    <form action={action} className="flex max-w-xl flex-col gap-4">
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
        <span className="font-mono text-xs text-on-dark-3">
          Meta (ex.: 4K · BELLADONNA)
        </span>
        <input
          name="meta"
          defaultValue={item?.meta}
          required
          className="admin-input"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="font-mono text-xs text-on-dark-3">
          Duração (ex.: 58:12 — opcional, cards Brasil não mostram)
        </span>
        <input
          name="duration"
          defaultValue={item?.duration}
          className="admin-input"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="font-mono text-xs text-on-dark-3">
          Link da fonte (YouTube, Vimeo... — vira botão &quot;▶ ASSISTIR&quot;)
        </span>
        <input
          type="url"
          name="sourceUrl"
          defaultValue={item?.sourceUrl}
          placeholder="https://..."
          className="admin-input"
        />
      </label>
      <label className="flex items-center gap-2 text-sm text-on-dark-2">
        <input type="checkbox" name="brasil" defaultChecked={item?.brasil} />
        Selo &quot;BRASIL 🇧🇷&quot;
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
