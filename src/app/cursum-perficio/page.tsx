import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { readContentFile, type Albuns } from "@/lib/content";
import { AlbumListenExperience } from "@/components/AlbumListenExperience";

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
      <div className="flex items-center justify-between px-4 py-4 md:px-10 md:py-6">
        <Link
          href="/"
          className="font-display text-lg uppercase leading-none text-paper no-underline md:text-xl"
        >
          Anthrax{" "}
          <span className="inline-block -rotate-[1.5deg] bg-signal px-[6px] text-ink">
            Brasil
          </span>
        </Link>
        <Link
          href="/"
          className="font-mono text-[11px] tracking-[0.1em] text-on-dark-2 no-underline hover:text-signal"
        >
          ENTRAR NO SITE →
        </Link>
      </div>

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
