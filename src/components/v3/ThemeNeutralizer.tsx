"use client";

import { useEffect } from "react";

/**
 * A UI /v3 tem identidade própria e não participa do sistema de skins
 * (default/pirata). A skin pirata aplica regras GLOBAIS via
 * [data-theme="pirate"] no <html> (flicker, overlay CRT e um
 * `[class*="rotate"] { transform: none }` que quebraria os transforms do
 * GSAP). Aqui removemos o data-theme enquanto /v3 está montada e restauramos
 * ao sair — sem tocar no localStorage, então a skin do usuário sobrevive
 * quando ele volta pro site normal.
 */
export function ThemeNeutralizer({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const el = document.documentElement;
    const prev = el.dataset.theme;
    delete el.dataset.theme;
    return () => {
      if (prev) el.dataset.theme = prev;
    };
  }, []);

  return <>{children}</>;
}
