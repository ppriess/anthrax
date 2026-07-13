import { readContentFile, type Hero } from "@/lib/content";
import { saveHero } from "@/lib/admin-actions";

export const dynamic = "force-dynamic";

export default async function HeroPage() {
  const hero = await readContentFile<Hero>("hero.json");

  return (
    <div>
      <h1 className="mb-1 font-display text-2xl uppercase">Destaque (hero)</h1>
      <p className="mb-6 text-xs text-on-dark-3">
        O card grande no topo da home, abaixo do menu.
      </p>
      <form action={saveHero} className="flex max-w-xl flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">
            Label do painel (ex.: EM DESTAQUE)
          </span>
          <input
            name="panelLabel"
            defaultValue={hero.panelLabel}
            required
            className="admin-input"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">
            Anotação torta (ex.: saiu! depois de DEZ anos!!)
          </span>
          <input
            name="annotation"
            defaultValue={hero.annotation}
            required
            className="admin-input"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">
            Título (uma linha por linha do título grande)
          </span>
          <textarea
            name="titleLines"
            defaultValue={hero.titleLines.join("\n")}
            rows={2}
            required
            className="admin-input"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">
            Texto (desktop)
          </span>
          <textarea
            name="body"
            defaultValue={hero.body}
            rows={4}
            required
            className="admin-input"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">
            Texto (mobile, mais curto)
          </span>
          <textarea
            name="bodyMobile"
            defaultValue={hero.bodyMobile}
            rows={2}
            required
            className="admin-input"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">
            Nome do single (fica em negrito no texto acima, se aparecer igual)
          </span>
          <input
            name="singleName"
            defaultValue={hero.singleName}
            required
            className="admin-input"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">
            Botão principal
          </span>
          <input
            name="primaryCta"
            defaultValue={hero.primaryCta}
            required
            className="admin-input"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">
            Botão secundário
          </span>
          <input
            name="secondaryCta"
            defaultValue={hero.secondaryCta}
            required
            className="admin-input"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">
            Selo da gravadora (ex.: MEGAFORCE / NUCLEAR BLAST)
          </span>
          <input
            name="label"
            defaultValue={hero.label}
            required
            className="admin-input"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">
            Vídeo de fundo do painel de texto (YouTube — opcional; deixe
            vazio pra usar só o fundo de papel normal). Toca mutado, em loop,
            com toggle de som e botão de tela cheia (só o vídeo).
          </span>
          <input
            type="url"
            name="videoUrl"
            defaultValue={hero.videoUrl}
            placeholder="https://www.youtube.com/watch?v=..."
            className="admin-input"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">
            Placeholder da capa do álbum (desktop)
          </span>
          <input
            name="coverPlaceholder"
            defaultValue={hero.cover.placeholder}
            className="admin-input"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">
            Placeholder da capa do álbum (mobile — some se houver vídeo de
            fundo)
          </span>
          <input
            name="coverPlaceholderMobile"
            defaultValue={hero.cover.placeholderMobile}
            className="admin-input"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">
            Adesivo da capa (ex.: relíquia futura ★)
          </span>
          <input
            name="coverSticker"
            defaultValue={hero.cover.sticker}
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
