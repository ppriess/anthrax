"use client";

import { useEffect, useRef } from "react";
import { useExperience } from "./ExperienceProvider";

/**
 * Camada fixa e persistente do vídeo da transmissão. Começa em tela cheia
 * atrás da cena 1; a timeline do SceneHero encolhe esta MESMA camada até o
 * canto (mini-frame) — o iframe nunca desmonta, então o vídeo não reinicia
 * nem perde o estado de mute (mesmo padrão do HeroVideoCover do site normal).
 * Mute/unmute via postMessage da API do YouTube.
 */
export function BroadcastVideo({ videoId }: { videoId: string | null }) {
  const { sound } = useExperience();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({
        event: "command",
        func: sound ? "unMute" : "mute",
        args: [],
      }),
      "*",
    );
  }, [sound]);

  const src = videoId
    ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&modestbranding=1&rel=0&playsinline=1&enablejsapi=1`
    : null;

  return (
    <div id="v3-video" aria-hidden="true">
      <div className="v3-video-layer">
        {src ? (
          <>
            <iframe
              ref={iframeRef}
              src={src}
              title="Transmissão em destaque"
              allow="autoplay; encrypted-media; picture-in-picture"
              tabIndex={-1}
            />
            <div className="v3-video-scrim" />
          </>
        ) : (
          <div className="v3-nosignal">
            <p className="v3-mono" style={{ color: "var(--v3-dim)" }}>
              ▚▞ SEM SINAL — AGUARDANDO TRANSMISSÃO ▞▚
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
