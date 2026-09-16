import type { Metadata } from "next";
import { readContentFile, type Tributo } from "@/lib/content";
import { TributoSection } from "@/components/brasil/TributoSection";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const tributo = await readContentFile<Tributo>("tributo.json");
  return {
    title: `${tributo.title} — ${tributo.subtitle}`,
    description:
      "O tributo brasileiro ao Anthrax: álbum duplo gratuito lançado em 2007 pela Collision Records e pelo Anthrax.com.br, com mais de 20 bandas nacionais.",
  };
}

export default async function TributoPage() {
  const tributo = await readContentFile<Tributo>("tributo.json");
  return <TributoSection tributo={tributo} />;
}
