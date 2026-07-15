import type { Metadata } from "next";
import { ThemeNeutralizer } from "@/components/v3/ThemeNeutralizer";
import "./v3.css";

export const metadata: Metadata = {
  title: "A TRANSMISSÃO — Anthrax Brasil",
  description: "Sinal experimental interceptado. Anthrax Brasil /v3.",
  // rota experimental, acessível só por URL — fora do índice
  robots: { index: false, follow: false },
};

export default function V3Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeNeutralizer>
      {/* sem JS, os .v3-fade nunca seriam revelados pelo GSAP */}
      <noscript>
        <style>{`[data-v3] .v3-fade { opacity: 1 !important; transform: none !important; }`}</style>
      </noscript>
      <div data-v3 data-motion="full" id="v3-shell">
        {children}
      </div>
    </ThemeNeutralizer>
  );
}
