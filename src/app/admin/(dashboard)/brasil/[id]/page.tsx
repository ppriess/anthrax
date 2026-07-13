import { notFound } from "next/navigation";
import { readContentFile, type Brasil } from "@/lib/content";
import { BrasilCardForm } from "../BrasilCardForm";

export const dynamic = "force-dynamic";

export default async function EditarBrasilCardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const brasil = await readContentFile<Brasil>("brasil.json");
  const item = brasil.cards.find((c) => c.id === id);
  if (!item) notFound();

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl uppercase">Editar card</h1>
      <BrasilCardForm item={item} />
    </div>
  );
}
