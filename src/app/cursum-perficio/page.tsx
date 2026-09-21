import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { readContentFile, type Albuns } from "@/lib/content";
import { AlbumListenExperience } from "@/components/AlbumListenExperience";
import { GateHeader } from "@/components/GateHeader";

export const dynamic = "force-dynamic";

const ALBUM_ID = "cursum-perficio";

async function getAlbum() {
  const albuns = await readContentFile<Albuns>("albuns.json");
  return albuns.items.find((a) => a.id === ALBUM_ID);
}

export async function generateMetadata(): Promise<Metadata> {
  const album = await getAlbum();
  if (!album) return { title: "Cursum Perficio | Anthrax Brasil" };
  return {
    title: `${album.title} — Ouça agora | Anthrax Brasil`,
    description: album.description,
    openGraph: album.cover ? { images: [{ url: album.cover }] } : undefined,
  };
}

export default async function CursumPerficioPage() {
  const album = await getAlbum();
  if (!album || !album.youtubeId) notFound();

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
