import { readContentFile, type Membros, type Substitutos } from "@/lib/content";
import { MembrosSection } from "@/components/banda/MembrosSection";

export const dynamic = "force-dynamic";

export default async function MembrosPage() {
  const [membros, substitutos] = await Promise.all([
    readContentFile<Membros>("membros.json"),
    readContentFile<Substitutos>("substitutos.json"),
  ]);
  return <MembrosSection membros={membros} substitutos={substitutos} />;
}
