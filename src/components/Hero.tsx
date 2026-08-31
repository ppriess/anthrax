"use client";

import { useState } from "react";
import type { Hero as HeroContent } from "@/lib/content";
import { extractYouTubeId } from "@/lib/youtube";
import { HeroPanel } from "./HeroPanel";
import { HeroMedia } from "./HeroMedia";

export function Hero({
  hero,
  releaseDate,
}: {
  hero: HeroContent;
  releaseDate: string;
}) {
  const videoId = hero.videoUrl ? extractYouTubeId(hero.videoUrl) : null;

  const [desktopMuted, setDesktopMuted] = useState(true);
  const [desktopExpanded, setDesktopExpanded] = useState(false);
  const [mobileMuted, setMobileMuted] = useState(true);
  const [mobileExpanded, setMobileExpanded] = useState(false);

  return (
    <section aria-label="Destaque">
      {/* Desktop */}
      <div className="hidden grid-cols-[1fr_1fr] gap-8 px-10 py-[29px] lg:grid">
        <HeroPanel hero={hero} releaseDate={releaseDate} variant="desktop" />

        <HeroMedia
          hero={hero}
          videoId={videoId}
          variant="desktop"
          muted={desktopMuted}
          expanded={desktopExpanded}
          onToggleMute={() => setDesktopMuted((m) => !m)}
          onToggleExpand={() => setDesktopExpanded((e) => !e)}
        />
      </div>

      {/* Mobile */}
      <div className="block px-4 py-[16px] lg:hidden">
        <HeroPanel
          hero={hero}
          releaseDate={releaseDate}
          variant="mobile"
          mediaSlot={
            <HeroMedia
              hero={hero}
              videoId={videoId}
              variant="mobile"
              muted={mobileMuted}
              expanded={mobileExpanded}
              onToggleMute={() => setMobileMuted((m) => !m)}
              onToggleExpand={() => setMobileExpanded((e) => !e)}
            />
          }
        />
      </div>
    </section>
  );
}
