import {
  readContentFile,
  type Site,
  type NavItem,
  type Footer as FooterContent,
} from "@/lib/content";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import { MobileTabBar } from "@/components/MobileTabBar";

export const dynamic = "force-dynamic";

export default async function BandaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [site, nav, footer] = await Promise.all([
    readContentFile<Site>("site.json"),
    readContentFile<NavItem[]>("nav.json"),
    readContentFile<FooterContent>("footer.json"),
  ]);

  return (
    <>
      <main className="min-h-screen bg-ink pb-[76px] md:pb-0">
        <Masthead site={site} nav={nav} />
        {children}
        <Footer footer={footer} />
      </main>
      <MobileTabBar />
    </>
  );
}
