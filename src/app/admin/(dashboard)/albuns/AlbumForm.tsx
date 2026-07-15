import type { AlbumItem } from "@/lib/content";
import { saveAlbum } from "@/lib/admin-actions";

export function AlbumForm({ item }: { item?: AlbumItem }) {
  const action = saveAlbum.bind(null, item?.id ?? null);

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
        <span className="font-mono text-xs text-on-dark-3">Ano</span>
        <input
          name="year"
          defaultValue={item?.year}
          required
          className="admin-input"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="font-mono text-xs text-on-dark-3">
          Gravadora (opcional)
        </span>
        <input
          name="label"
          defaultValue={item?.label}
          className="admin-input"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="font-mono text-xs text-on-dark-3">
          Capa (caminho da imagem, ex.: /albums/covers/among-the-living.jpg)
        </span>
        <input
          name="cover"
          defaultValue={item?.cover}
          placeholder="/albums/covers/..."
          className="admin-input"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="font-mono text-xs text-on-dark-3">
          Label da capa (placeholder de texto — usado só sem imagem)
        </span>
        <input
          name="coverLabel"
          defaultValue={item?.coverLabel}
          className="admin-input"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="font-mono text-xs text-on-dark-3">Tipo</span>
        <select
          name="albumType"
          defaultValue={item?.albumType ?? "studio"}
          className="admin-input"
        >
          <option value="studio">Estúdio</option>
          <option value="live">Ao vivo</option>
        </select>
      </label>
      <label className="flex flex-col gap-1">
        <span className="font-mono text-xs text-on-dark-3">
          Data de lançamento (AAAA-MM-DD, opcional)
        </span>
        <input
          name="releaseDate"
          defaultValue={item?.releaseDate}
          placeholder="2026-09-18"
          className="admin-input"
        />
      </label>
      <label className="flex items-center gap-2 text-sm text-on-dark-2">
        <input
          type="checkbox"
          name="upcoming"
          defaultChecked={item?.upcoming}
        />
        Próximo lançamento (destaque na discografia)
      </label>
      <label className="flex flex-col gap-1">
        <span className="font-mono text-xs text-on-dark-3">
          Faixas — uma por linha, formato: Título | 3:10 (duração opcional;
          vazio remove a tracklist)
        </span>
        <textarea
          name="tracks"
          defaultValue={item?.tracks
            ?.map((t) => (t.duration ? `${t.title} | ${t.duration}` : t.title))
            .join("\n")}
          rows={8}
          className="admin-input font-mono text-xs"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="font-mono text-xs text-on-dark-3">
          Descrição (opcional)
        </span>
        <textarea
          name="description"
          defaultValue={item?.description}
          rows={3}
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
  );
}
