"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Vídeo de fundo do YouTube: muted por padrão (autoplay exige isso), com
 * toggle discreto de som e modo tela cheia (só o vídeo, sem os dados do
 * banner). O iframe nunca desmonta ao trocar de modo — só a moldura ao redor
 * muda — pra não reiniciar o vídeo nem perder o estado de mute.
 */
export function HeroVideoCover({ videoId }: { videoId: string }) {
  const [muted, setMuted] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!expanded) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setExpanded(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded]);

  function postCommand(func: string) {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args: [] }),
      "*",
    );
  }

  function toggleMute() {
    postCommand(muted ? "unMute" : "mute");
    setMuted((m) => !m);
  }

  const src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&modestbranding=1&rel=0&playsinline=1&enablejsapi=1`;

  const frame = (
    <div
      className={
        expanded
          ? "fixed inset-0 z-[200] bg-black"
          : "relative h-full w-full overflow-hidden"
      }
    >
      <iframe
        ref={iframeRef}
        src={src}
        title="Vídeo em destaque"
        allow="autoplay; encrypted-media; picture-in-picture"
        className="h-full w-full"
        style={{ border: 0 }}
      />
      <div
        className={`absolute flex gap-2 ${expanded ? "right-4 top-4" : "bottom-2 right-2"}`}
      >
        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? "Ativar som" : "Silenciar"}
          className="flex h-8 w-8 items-center justify-center bg-ink/80 text-base text-paper hover:bg-signal hover:text-ink"
        >
          {muted ? "🔇" : "🔊"}
        </button>
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          aria-label={expanded ? "Sair da tela cheia" : "Tela cheia"}
          className="flex h-8 w-8 items-center justify-center bg-ink/80 text-base text-paper hover:bg-signal hover:text-ink"
        >
          {expanded ? "✕" : "⛶"}
        </button>
      </div>
    </div>
  );

  // O modo expandido escapa de qualquer ancestral com rotate/transform (o
  // painel da capa é levemente rotacionado) via portal direto pro <body>.
  if (expanded && mounted) {
    return createPortal(frame, document.body);
  }
  return frame;
}
