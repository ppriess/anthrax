import type { Metadata } from "next";
import { archivoBlack, barlow, permanentMarker } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anthrax Brasil — Site Oficial do Anthrax no Brasil",
  description:
    "Site oficial do Anthrax no Brasil, est. 2004: notícias, Anthrax TV, discografia, shows e a conexão Anthrax + Brasil.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${archivoBlack.variable} ${barlow.variable} ${permanentMarker.variable}`}
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
