import type {
  Agenda,
  Albuns,
  Footer,
  Hero,
  Membros,
  News,
  Site,
  Tv,
} from "@/lib/content";

/** Tudo que a experiência /v3 precisa, derivado no servidor a partir do CMS. */
export type BroadcastData = {
  /** ID do YouTube do "último sinal" (hero.videoUrl ?? tv.videos[0]) — null = SEM SINAL */
  videoId: string | null;
  hero: Hero;
  tv: Tv;
  agenda: Agenda;
  albuns: Albuns;
  membros: Membros;
  news: News;
  footer: Footer;
  site: Site;
};

export const SCENES = [
  { id: "s-transmissao", num: "01", label: "TRANSMISSÃO" },
  { id: "s-sinal", num: "02", label: "SINAL ATUAL" },
  { id: "s-circuito", num: "03", label: "CIRCUITO" },
  { id: "s-arquivo", num: "04", label: "ARQUIVO" },
  { id: "s-organismo", num: "05", label: "ORGANISMO" },
  { id: "s-saida", num: "06", label: "SAÍDA" },
] as const;
