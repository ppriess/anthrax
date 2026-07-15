import {
  readContentFile,
  type Albuns,
  type StreamingAlbumEntry,
  type StreamingLinksFile,
} from "@/lib/content";
import { AlbunsSection } from "@/components/banda/AlbunsSection";
import { slugify } from "@/lib/slug";

export const dynamic = "force-dynamic";

export default async function AlbunsPage() {
  const [albuns, streaming] = await Promise.all([
    readContentFile<Albuns>("albuns.json"),
    readContentFile<StreamingLinksFile>(
      "anthrax_official_streaming_links_by_album.json",
    ),
  ]);

  // remove apóstrofos antes de slugificar — "We've" vira "weve-...", igual ao
  // slug do YAML de origem, em vez de "we-ve-..." (slugify trata ' como
  // separador)
  const streamingByAlbumId: Record<string, StreamingAlbumEntry> = {};
  for (const entry of streaming.albums) {
    streamingByAlbumId[slugify(entry.title.replace(/['’]/g, ""))] = entry;
  }

  return <AlbunsSection albuns={albuns} streamingByAlbumId={streamingByAlbumId} />;
}
