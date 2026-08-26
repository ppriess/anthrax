/**
 * CMS mínimo: todo conteúdo editável vive em blobs JSON no Vercel Blob (store
 * "anthrax-content", pathnames "content/*.json"). A home é dinâmica
 * (force-dynamic), então editar via /admin atualiza o site na hora — sem
 * rebuild. Serverless não tem filesystem gravável persistente, por isso o
 * storage é o Blob e não `fs` local. `scripts/seed-content.mjs` faz a carga
 * inicial a partir dos JSONs versionados nesta pasta `content/`.
 */
import { get, put } from "@vercel/blob";
import { readFile } from "node:fs/promises";
import path from "node:path";

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
    /** Capa real do álbum (ex.: "/albums/covers/cursum-perficio.jpg").
     *  Ausente → cai no placeholder hachurado. */
    src?: string;
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
  year?: string;
  videoType?:
    | "music_video"
    | "lyric_video"
    | "live_video"
    | "behind_scenes"
    | "full_album";
  albumSlug?: string; // id do álbum em albuns.json, quando o clipe pertence a um
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
  /** Imagem real do card; sem isso usa o placeholder photoLabel. */
  image?: string;
  /** true → a imagem aparece inteira dentro do 3:2 (object-contain), pra arte
   *  quadrada com texto nas bordas. Padrão (false) preenche cortando. */
  imageContain?: boolean;
  id: string;
  label: string;
  labelShort?: string;
  title: string;
  body?: string;
  bodyEmphasis?: string;
  wide?: boolean;
  photoLabel?: string;
  sourceUrl?: string;
  ticketLabel?: string;
  cta?: string;
};

export type Brasil = {
  title: string;
  subtitle: string;
  subtitleShort: string;
  cards: BrasilCard[];
};

export type TurneShow = {
  id: string;
  /** ISO (YYYY-MM-DD) — é o que ordena a lista e decide passado/futuro. */
  date: string;
  /** Rótulo curto exibido na coluna de data, ex.: "03 SET". */
  dateLabel: string;
  city: string;
  region?: string; // estado/província, ex.: "QC", "TX"
  country: string;
  flag?: string; // emoji da bandeira, ex.: "🇺🇸"
  venue: string;
  festival?: string; // quando a data é um festival
  billing?: string; // ex.: "abrindo p/ Iron Maiden · com Megadeth"
  setTime?: string; // horário do set, quando anunciado
  ticketUrl?: string;
  sourceUrl?: string; // de onde a data foi confirmada
  brasil?: boolean; // data em solo brasileiro — ganha destaque verde-amarelo
};

export type Turne = {
  title: string;
  subtitle: string;
  kicker: string;
  /** Chamada do bloco de destaque do próximo show. */
  nextLabel: string;
  /** Markdown — nota editorial (ex.: "nenhuma data no Brasil confirmada"). */
  note?: string;
  ticketCta: string;
  emptyMessage: string;
  shows: TurneShow[];
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
  photo?: string; // foto de grupo real, ex.: "/albums/photos/anthrax-2026-press-july.jpg"
  photoCredit?: string; // ex.: "Foto: Travis Shinn"
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

// ---------- Arquivo Brasil (/brasil/arquivo) — histórico de shows em solo
// nacional; lido só pela própria página e pelo /admin. ----------

export type ArquivoBrasilShow = {
  id: string;
  date: string; // ISO (YYYY-MM-DD)
  dateLabel: string; // ex.: "28.04.2024"
  city: string;
  state?: string;
  venue: string;
  context?: string; // festival / turnê / com quem tocou
  note?: string; // curiosidade daquela noite
  setlistUrl?: string;
  videoUrl?: string;
};

export type ArquivoBrasil = {
  title: string;
  subtitle: string;
  intro: string; // markdown
  callout?: string; // markdown — "você estava lá? manda tua história"
  sourceNote?: string;
  shows: ArquivoBrasilShow[];
};

export type AlbumTrack = {
  n: number;
  title: string;
  duration?: string;
};

// ---------- links de streaming (catálogo gerado, não editável pelo /admin —
// vive em content/anthrax_official_streaming_links_by_album.json) ----------

export type StreamingPlatform =
  | "spotify"
  | "apple_music"
  | "deezer"
  | "youtube";

export type StreamingLink = {
  url: string;
  edition?: string;
  link_type?: string;
  direct_album_page_verified?: boolean;
};

export type StreamingAlbumEntry = {
  title: string;
  year: number;
  links: Partial<Record<StreamingPlatform, StreamingLink>>;
};

export type StreamingLinksFile = {
  artist: string;
  generated_at: string;
  official_channels: Partial<Record<StreamingPlatform, string>>;
  albums: StreamingAlbumEntry[];
};

export type AlbumItem = {
  id: string;
  title: string;
  year: string;
  label?: string;
  coverLabel?: string; // placeholder de texto — fallback quando não há cover
  description?: string;
  cover?: string; // caminho da capa real, ex.: "/albums/covers/among-the-living.jpg"
  albumType?: "studio" | "live";
  releaseDate?: string; // ISO, ex.: "2026-09-18"
  tracks?: AlbumTrack[];
  upcoming?: boolean; // lançamento futuro — ganha destaque na discografia
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
  videoUrl?: string; // ilustra o marco com um clipe oficial do YouTube
  videoLabel?: string;
  link?: string; // referência externa (ex.: Discogs), quando não há vídeo
  linkLabel?: string;
};

export type Historia = {
  title: string;
  subtitle: string;
  intro: string; // markdown
  timeline: TimelineItem[];
  playlistUrl?: string; // playlist oficial do YouTube com a história em vídeo
  playlistLabel?: string;
};

export type Content = {
  site: Site;
  nav: NavItem[];
  hero: Hero;
  news: News;
  tv: Tv;
  brasil: Brasil;
  turne: Turne;
  agenda: Agenda;
  quiz: Quiz;
  footer: Footer;
};

function blobPathname(file: string): string {
  return `content/${file}`;
}

/**
 * Fallback de desenvolvimento: lê o content/*.json versionado no repo quando o
 * Blob não responde. Nunca é usado em produção — ver readContentFile.
 */
async function readLocalContentFile<T>(file: string, reason: string): Promise<T> {
  const local = path.join(process.cwd(), "content", file);
  let raw: string;
  try {
    raw = await readFile(local, "utf-8");
  } catch {
    throw new Error(
      `Blob indisponível (${reason}) e não há cópia local em content/${file}.`,
    );
  }
  console.warn(
    `[content] Blob indisponível (${reason}) — usando content/${file} do disco. Só vale em desenvolvimento.`,
  );
  try {
    return JSON.parse(raw) as T;
  } catch (e) {
    throw new Error(`JSON inválido em content/${file}: ${(e as Error).message}`);
  }
}

/** Lê um content/*.json isolado do Blob — usado pela home e pelas telas do /admin. */
export async function readContentFile<T>(file: string): Promise<T> {
  const pathname = blobPathname(file);
  // useCache: false — conteúdo é editado pelo /admin e precisa refletir na
  // hora; sem isso, o CDN do Blob pode servir a versão anterior por um tempo.
  let result: Awaited<ReturnType<typeof get>>;
  try {
    result = await get(pathname, { access: "private", useCache: false });
  } catch (e) {
    // Em desenvolvimento, um Blob indisponível (token expirado/ausente) não
    // deve derrubar o site inteiro: cai para a cópia versionada em content/.
    // Em produção o erro sobe, para não mascarar falha real de storage.
    if (process.env.NODE_ENV === "production") throw e;
    return readLocalContentFile<T>(file, (e as Error).message);
  }
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
  const [site, nav, hero, news, tv, brasil, turne, agenda, quiz, footer] =
    await Promise.all([
      readContentFile<Site>("site.json"),
      readContentFile<NavItem[]>("nav.json"),
      readContentFile<Hero>("hero.json"),
      readContentFile<News>("news.json"),
      readContentFile<Tv>("tv.json"),
      readContentFile<Brasil>("brasil.json"),
      readContentFile<Turne>("turne.json"),
      readContentFile<Agenda>("agenda.json"),
      readContentFile<Quiz>("quiz.json"),
      readContentFile<Footer>("footer.json"),
    ]);
  return { site, nav, hero, news, tv, brasil, turne, agenda, quiz, footer };
}
