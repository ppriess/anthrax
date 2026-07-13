import Link from "next/link";
import { readContentFile, type Agenda } from "@/lib/content";
import { deleteAgendaItem, saveAgendaAlert } from "@/lib/admin-actions";

export const dynamic = "force-dynamic";

export default async function AgendaPage() {
  const agenda = await readContentFile<Agenda>("agenda.json");

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl uppercase">Agenda</h1>
        <Link
          href="/admin/agenda/novo"
          className="bg-signal px-4 py-2 text-sm font-bold tracking-[0.1em] text-ink no-underline"
        >
          + NOVA DATA
        </Link>
      </div>

      <div className="mb-8 flex flex-col gap-2">
        {agenda.items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 border-2 border-border-dark bg-card-dark p-4"
          >
            <div className="w-16 flex-none font-display text-signal">
              {item.date}
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold text-paper">{item.title}</div>
              <div className="font-mono text-[11px] text-on-dark-3">
                {item.meta}
              </div>
            </div>
            <Link
              href={`/admin/agenda/${item.id}`}
              className="border border-border-dark-2 px-3 py-[6px] text-xs font-bold text-on-dark-2 no-underline hover:border-signal hover:text-signal"
            >
              EDITAR
            </Link>
            <form action={deleteAgendaItem.bind(null, item.id)}>
              <button
                type="submit"
                className="border border-border-dark-2 px-3 py-[6px] text-xs font-bold text-on-dark-2 hover:border-hot hover:text-hot"
              >
                EXCLUIR
              </button>
            </form>
          </div>
        ))}
        {agenda.items.length === 0 && (
          <p className="text-sm text-on-dark-3">Nenhuma data ainda.</p>
        )}
      </div>

      <h2 className="mb-3 font-display text-lg uppercase text-on-dark-2">
        Alerta de e-mail (&quot;Brasil 2027??&quot;)
      </h2>
      <form action={saveAgendaAlert} className="flex max-w-xl flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">
            Texto do alerta
          </span>
          <input
            name="alert"
            defaultValue={agenda.alert}
            required
            className="admin-input"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">
            Mensagem de confirmação (após enviar o e-mail)
          </span>
          <input
            name="alertConfirm"
            defaultValue={agenda.alertConfirm}
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
