import { notFound } from "next/navigation";
import { readContentFile, type Agenda } from "@/lib/content";
import { AgendaForm } from "../AgendaForm";

export const dynamic = "force-dynamic";

export default async function EditarDataPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const agenda = await readContentFile<Agenda>("agenda.json");
  const item = agenda.items.find((a) => a.id === id);
  if (!item) notFound();

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl uppercase">Editar data</h1>
      <AgendaForm item={item} />
    </div>
  );
}
