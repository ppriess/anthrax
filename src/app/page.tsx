import { getContent } from "@/lib/content";
import { Masthead } from "@/components/Masthead";
import { Hero } from "@/components/Hero";
import { NewsSection } from "@/components/NewsSection";
import { AnthraxTV } from "@/components/AnthraxTV";
import { BrasilSection } from "@/components/BrasilSection";
import { Footer } from "@/components/Footer";
import { MobileTabBar } from "@/components/MobileTabBar";

// Conteúdo vem de /content/*.json a cada request — editar o JSON atualiza o
// site sem rebuild.
export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getContent();

  return (
    <>
      <main className="min-h-screen bg-ink pb-[76px] md:pb-0">
        <Masthead site={content.site} nav={content.nav} />
        <Hero hero={content.hero} releaseDate={content.site.releaseDate} />
        <NewsSection news={content.news} />
        <AnthraxTV tv={content.tv} />
        <BrasilSection
          brasil={content.brasil}
          agenda={content.agenda}
          quiz={content.quiz}
        />
        <Footer footer={content.footer} />
      </main>
      <MobileTabBar />
    </>
  );
}
