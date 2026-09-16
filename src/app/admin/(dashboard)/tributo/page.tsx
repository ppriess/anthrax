import { readContentFile, type Tributo, type TributoFichaItem } from "@/lib/content";
import {
  deleteTributoBanda,
  moveTributoBanda,
  saveTributoIntro,
  saveTributoLinks,
} from "@/lib/admin-actions";
import { AccordionItem } from "@/components/admin/AccordionItem";
import { BandaForm } from "./BandaForm";

export const dynamic = "force-dynamic";

/** Ficha técnica vira texto `Rótulo | valor`, uma linha por item. */
function fichaToText(ficha: TributoFichaItem[]): string {
  return ficha.map((row) => `${row.label} | ${row.value}`).join("\n");
}

export default async function TributoAdminPage() {
  const tributo = await readContentFile<Tributo>("tributo.json");

  return (
    <div>
      <h1 className="mb-1 font-display text-2xl uppercase">
        Brasil: Tributo
      </h1>
      <p className="mb-6 text-xs text-on-dark-3">
        Página <code>/brasil/tributo</code> — o &quot;Indians… Not!&quot;. O
        card da home aponta pra cá.
      </p>

      {/* ---- textos ---- */}
      <form
        action={saveTributoIntro}
        className="mb-10 flex max-w-xl flex-col gap-4"
      >
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">Título</span>
          <input
            name="title"
            defaultValue={tributo.title}
            required
            className="admin-input"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">Subtítulo</span>
          <input
            name="subtitle"
            defaultValue={tributo.subtitle}
            required
            className="admin-input"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">
            Linha-guia acima do título (ex.: 2004 → 2007 · COLLISION…)
          </span>
          <input
            name="kicker"
            defaultValue={tributo.kicker}
            required
            className="admin-input"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">
            Capa (caminho em /public, ex.: /capa-tributo.jpg)
          </span>
          <input
            name="cover"
            defaultValue={tributo.cover}
            className="admin-input"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">
            Legenda da capa (opcional)
          </span>
          <input
            name="coverCaption"
            defaultValue={tributo.coverCaption}
            className="admin-input"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">
            Texto da história (markdown — **negrito**, *itálico*, parágrafos)
          </span>
          <textarea
            name="intro"
            defaultValue={tributo.intro}
            rows={10}
            className="admin-input"
          />
        </label>

        <div className="mt-2 border-t border-border-dark pt-4">
          <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.15em] text-signal">
            Destaque (o aval do Scott Ian)
          </div>
          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-1">
              <span className="font-mono text-xs text-on-dark-3">
                Selo do destaque (ex.: O AVAL — vazio esconde o selo)
              </span>
              <input
                name="endorsementLabel"
                defaultValue={tributo.endorsementLabel}
                className="admin-input"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-mono text-xs text-on-dark-3">
                Frase de destaque (vazio esconde o bloco inteiro)
              </span>
              <input
                name="endorsementTitle"
                defaultValue={tributo.endorsementTitle}
                className="admin-input"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-mono text-xs text-on-dark-3">
                Texto de apoio do destaque
              </span>
              <textarea
                name="endorsementBody"
                defaultValue={tributo.endorsementBody}
                rows={3}
                className="admin-input"
              />
            </label>
          </div>
        </div>

        <div className="mt-2 border-t border-border-dark pt-4">
          <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.15em] text-signal">
            Ficha técnica e bandas
          </div>
          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-1">
              <span className="font-mono text-xs text-on-dark-3">
                Título da ficha
              </span>
              <input
                name="fichaTitle"
                defaultValue={tributo.fichaTitle}
                required
                className="admin-input"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-mono text-xs text-on-dark-3">
                Ficha — uma linha por item, no formato{" "}
                <code>Rótulo | valor</code>
              </span>
              <textarea
                name="ficha"
                defaultValue={fichaToText(tributo.ficha)}
                rows={9}
                className="admin-input font-mono text-xs"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-mono text-xs text-on-dark-3">
                Título da lista de bandas
              </span>
              <input
                name="bandasTitle"
                defaultValue={tributo.bandasTitle}
                required
                className="admin-input"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-mono text-xs text-on-dark-3">
                Nota acima da lista de bandas (opcional)
              </span>
              <textarea
                name="bandasNote"
                defaultValue={tributo.bandasNote}
                rows={2}
                className="admin-input"
              />
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="mt-2 w-fit bg-signal px-5 py-2 text-sm font-bold tracking-[0.1em] text-ink"
        >
          SALVAR TEXTOS
        </button>
      </form>

      {/* ---- links de audição ---- */}
      <h2 className="mb-1 font-display text-lg uppercase text-on-dark-2">
        Onde ouvir
      </h2>
      <p className="mb-3 text-xs text-on-dark-3">
        Campo de URL vazio = botão escondido na página. Nada de link morto.
      </p>
      <form
        action={saveTributoLinks}
        className="mb-10 flex max-w-xl flex-col gap-4"
      >
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">
            Título do bloco
          </span>
          <input
            name="listenTitle"
            defaultValue={tributo.listenTitle}
            required
            className="admin-input"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">
            Nota do bloco (opcional)
          </span>
          <textarea
            name="listenNote"
            defaultValue={tributo.listenNote}
            rows={2}
            className="admin-input"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">
            SoundCloud — playlist Vol. I (URL)
          </span>
          <input
            name="soundcloudVol1Url"
            defaultValue={tributo.soundcloudVol1Url}
            placeholder="https://soundcloud.com/..."
            className="admin-input"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">
            Texto do botão Vol. I
          </span>
          <input
            name="soundcloudVol1Label"
            defaultValue={tributo.soundcloudVol1Label}
            className="admin-input"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">
            SoundCloud — playlist Vol. II (URL)
          </span>
          <input
            name="soundcloudVol2Url"
            defaultValue={tributo.soundcloudVol2Url}
            placeholder="https://soundcloud.com/..."
            className="admin-input"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">
            Texto do botão Vol. II
          </span>
          <input
            name="soundcloudVol2Label"
            defaultValue={tributo.soundcloudVol2Label}
            className="admin-input"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">
            Discogs (URL)
          </span>
          <input
            name="discogsUrl"
            defaultValue={tributo.discogsUrl}
            className="admin-input"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">
            Texto do link do Discogs
          </span>
          <input
            name="discogsLabel"
            defaultValue={tributo.discogsLabel}
            className="admin-input"
          />
        </label>
        <button
          type="submit"
          className="mt-2 w-fit bg-signal px-5 py-2 text-sm font-bold tracking-[0.1em] text-ink"
        >
          SALVAR LINKS
        </button>
      </form>

      {/* ---- bandas ---- */}
      <h2 className="mb-1 font-display text-lg uppercase text-on-dark-2">
        Bandas ({tributo.bandas.length})
      </h2>
      <p className="mb-3 text-xs text-on-dark-3">
        Ordem de cima pra baixo = ordem de exibição na página.
      </p>
      <div className="mb-6 flex flex-col gap-2">
        {tributo.bandas.map((banda, index) => (
          <AccordionItem
            key={banda.id}
            summary={
              <div>
                <div className="text-sm font-bold text-paper">{banda.name}</div>
                {(banda.track || banda.origin) && (
                  <div className="mt-1 font-mono text-[11px] text-signal">
                    {[banda.track, banda.origin].filter(Boolean).join(" · ")}
                  </div>
                )}
              </div>
            }
            actions={
              <>
                <form action={moveTributoBanda.bind(null, banda.id, -1)}>
                  <button
                    type="submit"
                    disabled={index === 0}
                    className="border border-border-dark-2 px-2 py-[6px] text-xs font-bold text-on-dark-2 hover:border-signal hover:text-signal disabled:opacity-20"
                  >
                    ▲
                  </button>
                </form>
                <form action={moveTributoBanda.bind(null, banda.id, 1)}>
                  <button
                    type="submit"
                    disabled={index === tributo.bandas.length - 1}
                    className="border border-border-dark-2 px-2 py-[6px] text-xs font-bold text-on-dark-2 hover:border-signal hover:text-signal disabled:opacity-20"
                  >
                    ▼
                  </button>
                </form>
                <form action={deleteTributoBanda.bind(null, banda.id)}>
                  <button
                    type="submit"
                    className="border border-border-dark-2 px-3 py-[6px] text-xs font-bold text-on-dark-2 hover:border-hot hover:text-hot"
                  >
                    EXCLUIR
                  </button>
                </form>
              </>
            }
          >
            <BandaForm banda={banda} />
          </AccordionItem>
        ))}
        {tributo.bandas.length === 0 && (
          <p className="text-sm text-on-dark-3">Nenhuma banda ainda.</p>
        )}
      </div>

      <h2 className="mb-3 font-display text-lg uppercase text-on-dark-2">
        Adicionar banda
      </h2>
      <BandaForm />
    </div>
  );
}
