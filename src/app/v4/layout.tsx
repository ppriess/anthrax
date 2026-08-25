import type { Metadata } from "next";
import { ThemeNeutralizer } from "@/components/v3/ThemeNeutralizer";
import "./v4.css";

export const metadata: Metadata = {
  title: "Central de Sinais — Anthrax Brasil",
  description:
    "Notícias, vídeos, arquivo e sinais oficiais do Anthrax no Brasil.",
  robots: { index: false, follow: false },
};

export default function V4Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeNeutralizer>
      <div data-v4>{children}</div>
    </ThemeNeutralizer>
  );
}
