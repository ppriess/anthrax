import { readContentFile, type Albuns } from "@/lib/content";
import { AlbunsSection } from "@/components/banda/AlbunsSection";

export const dynamic = "force-dynamic";

export default async function AlbunsPage() {
  const albuns = await readContentFile<Albuns>("albuns.json");
  return <AlbunsSection albuns={albuns} />;
}
