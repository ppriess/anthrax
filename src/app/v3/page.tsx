import {
  getContent,
  readContentFile,
  type Albuns,
  type Membros,
} from "@/lib/content";
import { extractYouTubeId } from "@/lib/youtube";
import { BroadcastExperience } from "@/components/v3/BroadcastExperience";

export const dynamic = "force-dynamic";

export default async function V3Page() {
  const [content, albuns, membros] = await Promise.all([
    getContent(),
    readContentFile<Albuns>("albuns.json"),
    readContentFile<Membros>("membros.json"),
  ]);
  const { hero, tv, agenda, news, footer, site } = content;

  const videoSource = hero.videoUrl ?? tv.videos[0]?.sourceUrl;
  const videoId = videoSource ? extractYouTubeId(videoSource) : null;

  return (
    <BroadcastExperience
      data={{ videoId, hero, tv, agenda, albuns, membros, news, footer, site }}
    />
  );
}
