import { cookies } from "next/headers";
import { readContentFile, type Albuns } from "@/lib/content";
import { HomeContent } from "@/components/HomeContent";
import { AlbumListenExperience } from "@/components/AlbumListenExperience";
import { GateHeader } from "@/components/GateHeader";
import { GATE_BYPASS_COOKIE, isGateActive } from "@/lib/gate";

export const dynamic = "force-dynamic";

export default async function RootPage() {
  const cookieStore = await cookies();
  const bypass = cookieStore.get(GATE_BYPASS_COOKIE)?.value;

  if (!isGateActive(bypass)) {
    return <HomeContent />;
  }

  const albuns = await readContentFile<Albuns>("albuns.json");
  const album = albuns.items.find((a) => a.id === "cursum-perficio");
  if (!album?.youtubeId) {
    return <HomeContent />;
  }

  return (
    <main className="min-h-screen bg-ink text-paper">
      <GateHeader />
      <AlbumListenExperience
        title={album.title}
        subtitle={album.label}
        cover={album.cover}
        youtubeId={album.youtubeId}
        tracks={album.tracks ?? []}
      />
    </main>
  );
}
