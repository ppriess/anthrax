"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Vídeo de fundo do YouTube pro painel de texto do hero. Componente
 * controlado: mute/tela-cheia vêm de fora (HeroPanel), pra poder mostrar um
 * único conjunto de ícones no "modo foco" sem duplicar estado. O iframe
 * nunca desmonta ao trocar de modo — só a moldura ao redor muda — pra não
 * reiniciar o vídeo nem perder o estado de mute.
 */
export function HeroVideoCover({
  videoId,
  muted,
  onToggleMute,
  expanded,
  onToggleExpand,
  showControls,
}: {
  videoId: string;
  muted: boolean;
  onToggleMute: () => void;
  expanded: boolean;
  onToggleExpand: () => void;
  showControls: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({
        event: "command",
        func: muted ? "mute" : "unMute",
        args: [],
      }),
      "*",
    );
  }, [muted]);

  useEffect(() => {
    if (!expanded) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onToggleExpand();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded, onToggleExpand]);

  const src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&modestbranding=1&rel=0&playsinline=1&enablejsapi=1`;

  const frame = (
    <div
      className={
        expanded
          ? "fixed inset-0 z-[200] bg-black"
          : "absolute inset-0 overflow-hidden"
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
      {showControls && (
        <div
          className={`absolute flex gap-2 ${expanded ? "right-4 top-4" : "right-2 top-2"}`}
        >
          <button
            type="button"
            onClick={onToggleMute}
            aria-label={muted ? "Ativar som" : "Silenciar"}
            className="flex h-8 w-8 items-center justify-center bg-ink/80 text-base text-paper hover:bg-signal hover:text-ink"
          >
            {muted ? "🔇" : "🔊"}
          </button>
          <button
            type="button"
            onClick={onToggleExpand}
            aria-label={expanded ? "Sair da tela cheia" : "Tela cheia"}
            className="flex h-8 w-8 items-center justify-center bg-ink/80 text-base text-paper hover:bg-signal hover:text-ink"
          >
            {expanded ? "✕" : "⛶"}
          </button>
        </div>
      )}
    </div>
  );

  // O modo expandido escapa de qualquer ancestral com rotate/transform via
  // portal direto pro <body>, garantindo que só o vídeo apareça.
  if (expanded && mounted) {
    return createPortal(frame, document.body);
  }
  return frame;
}
