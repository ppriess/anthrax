import { readContentFile, type NavItem } from "@/lib/content";
import { deleteNavItem, moveNavItem, saveNavItem } from "@/lib/admin-actions";

export const dynamic = "force-dynamic";

export default async function NavPage() {
  const nav = await readContentFile<NavItem[]>("nav.json");

  return (
    <div>
      <h1 className="mb-1 font-display text-2xl uppercase">Menu</h1>
      <p className="mb-6 text-xs text-on-dark-3">
        Ordem de cima pra baixo = ordem no site, da esquerda pra direita.
      </p>

      <div className="mb-8 flex flex-col gap-2">
        {nav.map((item, index) => (
          <form
            key={`${item.href}-${index}`}
            action={saveNavItem.bind(null, index)}
            className="flex flex-wrap items-center gap-3 border-2 border-border-dark bg-card-dark p-3"
          >
            <div className="flex flex-col gap-1">
              <button
                formAction={moveNavItem.bind(null, index, -1)}
                type="submit"
                className="px-1 text-xs text-on-dark-3 hover:text-signal disabled:opacity-20"
                disabled={index === 0}
              >
                ▲
              </button>
              <button
                formAction={moveNavItem.bind(null, index, 1)}
                type="submit"
                className="px-1 text-xs text-on-dark-3 hover:text-signal disabled:opacity-20"
                disabled={index === nav.length - 1}
              >
                ▼
              </button>
            </div>
            <input
              name="label"
              defaultValue={item.label}
              className="admin-input w-40"
              placeholder="Label"
            />
            <input
              name="href"
              defaultValue={item.href}
              className="admin-input w-40"
              placeholder="#href"
            />
            <label className="flex items-center gap-1 text-xs text-on-dark-2">
              <input type="checkbox" name="active" defaultChecked={item.active} />
              ativo
            </label>
            <label className="flex items-center gap-1 text-xs text-on-dark-2">
              <input type="checkbox" name="brasil" defaultChecked={item.brasil} />
              verde
            </label>
            <button
              type="submit"
              className="border border-signal px-3 py-[6px] text-xs font-bold text-signal"
            >
              SALVAR
            </button>
            <button
              formAction={deleteNavItem.bind(null, index)}
              type="submit"
              className="border border-border-dark-2 px-3 py-[6px] text-xs font-bold text-on-dark-2 hover:border-hot hover:text-hot"
            >
              EXCLUIR
            </button>
          </form>
        ))}
      </div>

      <h2 className="mb-3 font-display text-lg uppercase text-on-dark-2">
        Adicionar item
      </h2>
      <form
        action={saveNavItem.bind(null, null)}
        className="flex flex-wrap items-center gap-3 border-2 border-dashed border-border-dark-2 p-3"
      >
        <input name="label" required className="admin-input w-40" placeholder="Label" />
        <input name="href" required className="admin-input w-40" placeholder="#href" />
        <label className="flex items-center gap-1 text-xs text-on-dark-2">
          <input type="checkbox" name="active" />
          ativo
        </label>
        <label className="flex items-center gap-1 text-xs text-on-dark-2">
          <input type="checkbox" name="brasil" />
          verde
        </label>
        <button
          type="submit"
          className="bg-signal px-4 py-2 text-sm font-bold tracking-[0.1em] text-ink"
        >
          + ADICIONAR
        </button>
      </form>
    </div>
  );
}
