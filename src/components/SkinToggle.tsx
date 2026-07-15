"use client";

import { useTheme } from "./ThemeProvider";

export function SkinToggle({ compact }: { compact?: boolean }) {
  const { skin, setSkin } = useTheme();
  const isPirate = skin === "pirate";

  return (
    <button
      type="button"
      onClick={() => setSkin(isPirate ? "default" : "pirate")}
      aria-pressed={isPirate}
      className={
        compact
          ? "border border-border-dark-2 px-2 py-1 font-mono text-[10px] tracking-[0.14em] text-on-dark-2 hover:border-signal hover:text-signal"
          : "border border-ink px-2 py-[3px] font-mono text-[11px] tracking-[0.14em] text-ink hover:border-brasil-paper hover:text-brasil-paper"
      }
    >
      {isPirate ? "SINAL: PIRATA" : "SINAL: PADRÃO"}
    </button>
  );
}
