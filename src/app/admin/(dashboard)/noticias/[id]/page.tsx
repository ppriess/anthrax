import { notFound } from "next/navigation";
import { readContentFile, type News } from "@/lib/content";
import { NewsForm } from "../NewsForm";

export const dynamic = "force-dynamic";

export default async function EditarNoticiaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const news = await readContentFile<News>("news.json");
  const item = news.items.find((n) => n.id === id);
  if (!item) notFound();

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl uppercase">Editar notícia</h1>
      <NewsForm item={item} />
    </div>
  );
}
