import { notFound } from "next/navigation";
import { readContentFile, type Tv } from "@/lib/content";
import { VideoForm } from "../VideoForm";

export const dynamic = "force-dynamic";

export default async function EditarVideoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tv = await readContentFile<Tv>("tv.json");
  const item = tv.videos.find((v) => v.id === id);
  if (!item) notFound();

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl uppercase">Editar vídeo</h1>
      <VideoForm item={item} />
    </div>
  );
}
