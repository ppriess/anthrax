import { readContentFile, type Membros } from "@/lib/content";
import { MembrosSection } from "@/components/banda/MembrosSection";

export const dynamic = "force-dynamic";

export default async function MembrosPage() {
  const membros = await readContentFile<Membros>("membros.json");
  return <MembrosSection membros={membros} />;
}
