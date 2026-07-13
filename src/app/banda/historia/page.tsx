import { readContentFile, type Historia } from "@/lib/content";
import { HistoriaSection } from "@/components/banda/HistoriaSection";

export const dynamic = "force-dynamic";

export default async function HistoriaPage() {
  const historia = await readContentFile<Historia>("historia.json");
  return <HistoriaSection historia={historia} />;
}
