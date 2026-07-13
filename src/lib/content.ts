/**
 * CMS mínimo: todo conteúdo editável vive em blobs JSON no Vercel Blob (store
 * "anthrax-content", pathnames "content/*.json"). A home é dinâmica
 * (force-dynamic), então editar via /admin atualiza o site na hora — sem
 * rebuild. Serverless não tem filesystem gravável persistente, por isso o
 * storage é o Blob e não `fs` local. `scripts/seed-content.mjs` faz a carga
 * inicial a partir dos JSONs versionados nesta pasta `content/`.
 */
import { get, put } from "@vercel/blob";

export type Site = {
  edition: string;
  editionShort: string;
  tagline: string;
  searchPlaceholder: string;
  releaseDate: string;
};

export type NavChild = {
  label: string;
  href: string;
};

export type NavItem = {
  label: string;
  href: string;
  active?: boolean;
  brasil?: boolean;
  children?: NavChild[];
};

export type Hero = {
  panelLabel: string;
  annotation: string;
  titleLines: string[];
  body: string;
  bodyMobile: string;
  singleName: string;
  primaryCta: string;
  secondaryCta: string;
  label: string;
  // se definido, vira fundo em vídeo do PAINEL DE TEXTO (não da capa do
  // álbum) — texto sobreposto, com toggle de som e modo tela cheia (só o
  // vídeo, sem o texto por cima).
  videoUrl?: string;
  cover: {
    placeholder: string;
    placeholderMobile: string;
    sticker: string;
  };
};

export type NewsItem = {
  id: string;
  source: string;
  date: string;
  title: string;
  excerpt?: string;
  body?: string; // markdown — texto completo, opcional
  link?: string; // URL da matéria original
  image?: string; // URL de imagem real; sem isso usa o placeholder photoLabel
  hot?: boolean;
  variant: "feature" | "dark";
  photoLabel?: string;
  feed?: boolean;
};

export type News = {
  title: string;
  kicker: string;
  archiveCta: string;
  items: NewsItem[];
};

export type Video = {
  id: string;
  title: string;
  meta: string;
  duration?: string;
  brasil?: boolean;
  sourceUrl?: string; // link do YouTube/Vimeo/etc.
};

export type Tv = {
  videos: Video[];
  archive: {
    count: string;
    blurb: string;
    cta: string;
  };
};

export type BrasilCard = {
  id: string;
  label: string;
  labelShort?: string;
  title: string;
  body?: string;
  bodyEmphasis?: string;
  wide?: boolean;
  photoLabel?: string;
  ticketLabel?: string;
  cta?: string;
};

export type Brasil = {
  title: string;
  subtitle: string;
  subtitleShort: string;
  cards: BrasilCard[];
};

export type AgendaItem = {
  id: string;
  date: string;
  title: string;
  meta: string;
};

export type Agenda = {
  title: string;
  items: AgendaItem[];
  alert: string;
  alertConfirm: string;
};

export type QuizItem = {
  id: string;
  number: string;
  question: string;
  options: string[];
  correct: string;
  stats: string;
  active?: boolean; // qual item aparece na home; só um deve estar ativo
};

export type Quiz = {
  items: QuizItem[];
};

export type Footer = {
  wordmark: string;
  disclaimer: string;
  signature: string;
};

// ---------- páginas "Banda" (/banda/*) — não fazem parte da home,
// lidas isoladamente por cada página e pelo /admin. ----------

export type MembroItem = {
  id: string;
  name: string;
  role: string;
  bio?: string;
  photoLabel?: string;
  current?: boolean; // membro atual vs ex-membro
  years?: string; // período ativo, ex.: "1982–1984" — sobretudo pra ex-membros
  now?: string; // "atualmente" — o que faz hoje / em qual banda está
};

export type Membros = {
  title: string;
  subtitle: string;
  items: MembroItem[];
};

export type SubstitutoItem = {
  id: string;
  name: string;
  role: string; // instrumento
  year: string; // período/ano
  description?: string;
  videoUrl?: string;
  videoLabel?: string; // placeholder do thumb, ex.: "[ VÍDEO: Live in Gelsenkirchen 2011 ]"
};

export type Substitutos = {
  title: string;
  intro: string;
  items: SubstitutoItem[];
  curiosity?: string; // markdown — nota final tipo curiosidade
};

export type AlbumItem = {
  id: string;
  title: string;
  year: string;
  label?: string;
  coverLabel?: string;
  description?: string;
};

export type Albuns = {
  title: string;
  subtitle: string;
  items: AlbumItem[];
};

export type TimelineItem = {
  id: string;
  year: string;
  title: string;
  description?: string;
};

export type Historia = {
  title: string;
  subtitle: string;
  intro: string; // markdown
  timeline: TimelineItem[];
};

export type Content = {
  site: Site;
  nav: NavItem[];
  hero: Hero;
  news: News;
  tv: Tv;
  brasil: Brasil;
  agenda: Agenda;
  quiz: Quiz;
  footer: Footer;
};

function blobPathname(file: string): string {
  return `content/${file}`;
}

/** Lê um content/*.json isolado do Blob — usado pela home e pelas telas do /admin. */
export async function readContentFile<T>(file: string): Promise<T> {
  const pathname = blobPathname(file);
  // useCache: false — conteúdo é editado pelo /admin e precisa refletir na
  // hora; sem isso, o CDN do Blob pode servir a versão anterior por um tempo.
  const result = await get(pathname, { access: "private", useCache: false });
  if (!result || result.stream === null) {
    throw new Error(
      `Conteúdo "${file}" não encontrado no Blob store. Rode "node scripts/seed-content.mjs" para carregar o conteúdo inicial.`,
    );
  }
  const raw = await new Response(result.stream).text();
  try {
    return JSON.parse(raw) as T;
  } catch (e) {
    throw new Error(`JSON inválido em content/${file}: ${(e as Error).message}`);
  }
}

/** Grava um content/*.json isolado no Blob — usado pelas server actions do /admin. */
export async function writeContentFile(file: string, data: unknown): Promise<void> {
  const json = JSON.stringify(data, null, 2) + "\n";
  await put(blobPathname(file), json, {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

export async function getContent(): Promise<Content> {
  const [site, nav, hero, news, tv, brasil, agenda, quiz, footer] =
    await Promise.all([
      readContentFile<Site>("site.json"),
      readContentFile<NavItem[]>("nav.json"),
      readContentFile<Hero>("hero.json"),
      readContentFile<News>("news.json"),
      readContentFile<Tv>("tv.json"),
      readContentFile<Brasil>("brasil.json"),
      readContentFile<Agenda>("agenda.json"),
      readContentFile<Quiz>("quiz.json"),
      readContentFile<Footer>("footer.json"),
    ]);
  return { site, nav, hero, news, tv, brasil, agenda, quiz, footer };
}
