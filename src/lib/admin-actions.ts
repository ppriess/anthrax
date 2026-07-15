"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  readContentFile,
  writeContentFile,
  type Agenda,
  type AgendaItem,
  type AlbumItem,
  type Albuns,
  type Brasil,
  type BrasilCard,
  type Footer,
  type Hero,
  type Historia,
  type MembroItem,
  type Membros,
  type NavItem,
  type News,
  type NewsItem,
  type Quiz,
  type QuizItem,
  type Site,
  type SubstitutoItem,
  type Substitutos,
  type TimelineItem,
  type Tv,
  type Video,
} from "@/lib/content";
import { slugify, uniqueSlug } from "@/lib/slug";

const SESSION_COOKIE = "admin_session";

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}
function optStr(formData: FormData, key: string): string | undefined {
  const v = str(formData, key);
  return v === "" ? undefined : v;
}
function bool(formData: FormData, key: string): boolean {
  return formData.get(key) === "on";
}

function revalidateAll(adminPath: string) {
  revalidatePath("/");
  revalidatePath(adminPath);
}

// ---------- auth ----------

export async function login(formData: FormData) {
  const password = str(formData, "password");
  const expected = process.env.ADMIN_PASSWORD;
  const token = process.env.ADMIN_SESSION_TOKEN;
  if (!expected || !token) {
    throw new Error(
      "ADMIN_PASSWORD / ADMIN_SESSION_TOKEN não configurados (.env.local)",
    );
  }
  if (password !== expected) {
    redirect("/admin/login?erro=1");
  }
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  redirect("/admin");
}

export async function logout() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
  redirect("/admin/login");
}

// ---------- notícias ----------

export async function saveNewsItem(id: string | null, formData: FormData) {
  const news = await readContentFile<News>("news.json");
  const title = str(formData, "title");
  const item: NewsItem = {
    id: id ?? uniqueSlug(slugify(title), news.items.map((n) => n.id)),
    source: str(formData, "source"),
    date: str(formData, "date"),
    title,
    excerpt: optStr(formData, "excerpt"),
    body: optStr(formData, "body"),
    link: optStr(formData, "link"),
    image: optStr(formData, "image"),
    hot: bool(formData, "hot"),
    variant: str(formData, "variant") === "feature" ? "feature" : "dark",
    photoLabel: optStr(formData, "photoLabel"),
    feed: bool(formData, "feed"),
  };

  if (id) {
    const idx = news.items.findIndex((n) => n.id === id);
    if (idx === -1) throw new Error("Notícia não encontrada");
    news.items[idx] = item;
  } else {
    news.items.unshift(item);
  }
  await writeContentFile("news.json", news);
  revalidateAll("/admin/noticias");
  redirect("/admin/noticias");
}

export async function deleteNewsItem(id: string) {
  const news = await readContentFile<News>("news.json");
  news.items = news.items.filter((n) => n.id !== id);
  await writeContentFile("news.json", news);
  revalidateAll("/admin/noticias");
}

// ---------- vídeos (Anthrax TV) ----------

export async function saveVideo(id: string | null, formData: FormData) {
  const tv = await readContentFile<Tv>("tv.json");
  const idx = id ? tv.videos.findIndex((v) => v.id === id) : -1;
  if (id && idx === -1) throw new Error("Vídeo não encontrado");
  const prev = idx !== -1 ? tv.videos[idx] : undefined;
  const title = str(formData, "title");
  const videoType = str(formData, "videoType");
  const item: Video = {
    ...prev,
    id: id ?? uniqueSlug(slugify(title), tv.videos.map((v) => v.id)),
    title,
    meta: str(formData, "meta"),
    duration: optStr(formData, "duration"),
    brasil: bool(formData, "brasil"),
    sourceUrl: optStr(formData, "sourceUrl"),
    year: optStr(formData, "year"),
    videoType:
      videoType === "music_video" ||
      videoType === "lyric_video" ||
      videoType === "live_video"
        ? videoType
        : undefined,
    albumSlug: optStr(formData, "albumSlug"),
  };

  if (idx !== -1) {
    tv.videos[idx] = item;
  } else {
    tv.videos.unshift(item);
  }
  await writeContentFile("tv.json", tv);
  revalidateAll("/admin/videos");
  redirect("/admin/videos");
}

export async function deleteVideo(id: string) {
  const tv = await readContentFile<Tv>("tv.json");
  tv.videos = tv.videos.filter((v) => v.id !== id);
  await writeContentFile("tv.json", tv);
  revalidateAll("/admin/videos");
}

export async function saveTvArchive(formData: FormData) {
  const tv = await readContentFile<Tv>("tv.json");
  tv.archive = {
    count: str(formData, "count"),
    blurb: str(formData, "blurb"),
    cta: str(formData, "cta"),
  };
  await writeContentFile("tv.json", tv);
  revalidateAll("/admin/videos");
}

// ---------- Anthrax + Brasil (cards) ----------

export async function saveBrasilCard(id: string | null, formData: FormData) {
  const brasil = await readContentFile<Brasil>("brasil.json");
  const title = str(formData, "title");
  const card: BrasilCard = {
    id: id ?? uniqueSlug(slugify(title), brasil.cards.map((c) => c.id)),
    label: str(formData, "label"),
    labelShort: optStr(formData, "labelShort"),
    title,
    body: optStr(formData, "body"),
    bodyEmphasis: optStr(formData, "bodyEmphasis"),
    wide: bool(formData, "wide"),
    photoLabel: optStr(formData, "photoLabel"),
    ticketLabel: optStr(formData, "ticketLabel"),
    cta: optStr(formData, "cta"),
  };

  if (id) {
    const idx = brasil.cards.findIndex((c) => c.id === id);
    if (idx === -1) throw new Error("Card não encontrado");
    brasil.cards[idx] = card;
  } else {
    brasil.cards.push(card);
  }
  await writeContentFile("brasil.json", brasil);
  revalidateAll("/admin/brasil");
  redirect("/admin/brasil");
}

export async function deleteBrasilCard(id: string) {
  const brasil = await readContentFile<Brasil>("brasil.json");
  brasil.cards = brasil.cards.filter((c) => c.id !== id);
  await writeContentFile("brasil.json", brasil);
  revalidateAll("/admin/brasil");
}

export async function saveBrasilIntro(formData: FormData) {
  const brasil = await readContentFile<Brasil>("brasil.json");
  brasil.title = str(formData, "title");
  brasil.subtitle = str(formData, "subtitle");
  brasil.subtitleShort = str(formData, "subtitleShort");
  await writeContentFile("brasil.json", brasil);
  revalidateAll("/admin/brasil");
}

// ---------- agenda ----------

export async function saveAgendaItem(id: string | null, formData: FormData) {
  const agenda = await readContentFile<Agenda>("agenda.json");
  const title = str(formData, "title");
  const item: AgendaItem = {
    id: id ?? uniqueSlug(slugify(title), agenda.items.map((a) => a.id)),
    date: str(formData, "date"),
    title,
    meta: str(formData, "meta"),
  };

  if (id) {
    const idx = agenda.items.findIndex((a) => a.id === id);
    if (idx === -1) throw new Error("Item de agenda não encontrado");
    agenda.items[idx] = item;
  } else {
    agenda.items.push(item);
  }
  await writeContentFile("agenda.json", agenda);
  revalidateAll("/admin/agenda");
  redirect("/admin/agenda");
}

export async function deleteAgendaItem(id: string) {
  const agenda = await readContentFile<Agenda>("agenda.json");
  agenda.items = agenda.items.filter((a) => a.id !== id);
  await writeContentFile("agenda.json", agenda);
  revalidateAll("/admin/agenda");
}

export async function saveAgendaAlert(formData: FormData) {
  const agenda = await readContentFile<Agenda>("agenda.json");
  agenda.alert = str(formData, "alert");
  agenda.alertConfirm = str(formData, "alertConfirm");
  await writeContentFile("agenda.json", agenda);
  revalidateAll("/admin/agenda");
}

// ---------- menu (nav) ----------

export async function saveNavItem(index: number | null, formData: FormData) {
  const nav = await readContentFile<NavItem[]>("nav.json");
  const item: NavItem = {
    label: str(formData, "label"),
    href: str(formData, "href"),
    active: bool(formData, "active"),
    brasil: bool(formData, "brasil"),
    // o editor de menu não tem UI pra submenu ainda — preserva o que já
    // existia pra não apagar o dropdown "Banda" ao editar label/href/etc.
    children: index !== null ? nav[index]?.children : undefined,
  };
  if (index === null) {
    nav.push(item);
  } else {
    nav[index] = item;
  }
  await writeContentFile("nav.json", nav);
  revalidateAll("/admin/nav");
}

export async function deleteNavItem(index: number) {
  const nav = await readContentFile<NavItem[]>("nav.json");
  nav.splice(index, 1);
  await writeContentFile("nav.json", nav);
  revalidateAll("/admin/nav");
}

export async function moveNavItem(index: number, dir: -1 | 1) {
  const nav = await readContentFile<NavItem[]>("nav.json");
  const target = index + dir;
  if (target < 0 || target >= nav.length) return;
  [nav[index], nav[target]] = [nav[target], nav[index]];
  await writeContentFile("nav.json", nav);
  revalidateAll("/admin/nav");
}

// ---------- blocos únicos ----------

export async function saveSite(formData: FormData) {
  const site: Site = {
    edition: str(formData, "edition"),
    editionShort: str(formData, "editionShort"),
    tagline: str(formData, "tagline"),
    searchPlaceholder: str(formData, "searchPlaceholder"),
    releaseDate: str(formData, "releaseDate"),
  };
  await writeContentFile("site.json", site);
  revalidateAll("/admin/site");
}

export async function saveHero(formData: FormData) {
  const hero: Hero = {
    panelLabel: str(formData, "panelLabel"),
    annotation: str(formData, "annotation"),
    titleLines: str(formData, "titleLines")
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean),
    body: str(formData, "body"),
    bodyMobile: str(formData, "bodyMobile"),
    singleName: str(formData, "singleName"),
    primaryCta: str(formData, "primaryCta"),
    secondaryCta: str(formData, "secondaryCta"),
    label: str(formData, "label"),
    videoUrl: optStr(formData, "videoUrl"),
    cover: {
      placeholder: str(formData, "coverPlaceholder"),
      placeholderMobile: str(formData, "coverPlaceholderMobile"),
      sticker: str(formData, "coverSticker"),
    },
  };
  await writeContentFile("hero.json", hero);
  revalidateAll("/admin/hero");
}

export async function saveFooter(formData: FormData) {
  const footer: Footer = {
    wordmark: str(formData, "wordmark"),
    disclaimer: str(formData, "disclaimer"),
    signature: str(formData, "signature"),
  };
  await writeContentFile("footer.json", footer);
  revalidateAll("/admin/footer");
}

export async function saveQuizItem(id: string | null, formData: FormData) {
  const quiz = await readContentFile<Quiz>("quiz.json");
  const number = str(formData, "number");
  const active = bool(formData, "active");
  const item: QuizItem = {
    id: id ?? uniqueSlug(slugify(number), quiz.items.map((q) => q.id)),
    number,
    question: str(formData, "question"),
    options: str(formData, "options")
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean),
    correct: str(formData, "correct"),
    stats: str(formData, "stats"),
    active,
  };

  // só um quiz pode estar ativo (é o que aparece na home) por vez
  if (active) {
    quiz.items.forEach((q) => {
      q.active = false;
    });
  }

  if (id) {
    const idx = quiz.items.findIndex((q) => q.id === id);
    if (idx === -1) throw new Error("Quiz não encontrado");
    quiz.items[idx] = item;
  } else {
    quiz.items.unshift(item);
  }
  await writeContentFile("quiz.json", quiz);
  revalidateAll("/admin/quiz");
  redirect("/admin/quiz");
}

export async function deleteQuizItem(id: string) {
  const quiz = await readContentFile<Quiz>("quiz.json");
  quiz.items = quiz.items.filter((q) => q.id !== id);
  await writeContentFile("quiz.json", quiz);
  revalidateAll("/admin/quiz");
}

// ---------- banda: membros ----------

export async function saveMembro(id: string | null, formData: FormData) {
  const membros = await readContentFile<Membros>("membros.json");
  const name = str(formData, "name");
  const item: MembroItem = {
    id: id ?? uniqueSlug(slugify(name), membros.items.map((m) => m.id)),
    name,
    role: str(formData, "role"),
    bio: optStr(formData, "bio"),
    photoLabel: optStr(formData, "photoLabel"),
    current: bool(formData, "current"),
    years: optStr(formData, "years"),
    now: optStr(formData, "now"),
  };

  if (id) {
    const idx = membros.items.findIndex((m) => m.id === id);
    if (idx === -1) throw new Error("Membro não encontrado");
    membros.items[idx] = item;
  } else {
    membros.items.push(item);
  }
  await writeContentFile("membros.json", membros);
  revalidateAll("/admin/membros");
  redirect("/admin/membros");
}

export async function deleteMembro(id: string) {
  const membros = await readContentFile<Membros>("membros.json");
  membros.items = membros.items.filter((m) => m.id !== id);
  await writeContentFile("membros.json", membros);
  revalidateAll("/admin/membros");
}

export async function saveMembrosIntro(formData: FormData) {
  const membros = await readContentFile<Membros>("membros.json");
  membros.title = str(formData, "title");
  membros.subtitle = str(formData, "subtitle");
  membros.photo = optStr(formData, "photo");
  membros.photoCredit = optStr(formData, "photoCredit");
  await writeContentFile("membros.json", membros);
  revalidateAll("/admin/membros");
}

// ---------- banda: álbuns ----------

// textarea "uma faixa por linha", formato "Título | 3:10" (duração opcional).
// Textarea vazia limpa a tracklist — o form vem preenchido, então apagar tudo
// é um gesto explícito.
function parseTracks(text: string): AlbumItem["tracks"] {
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  if (lines.length === 0) return undefined;
  return lines.map((line, i) => {
    const [title, duration] = line.split("|").map((p) => p.trim());
    return { n: i + 1, title, duration: duration || undefined };
  });
}

export async function saveAlbum(id: string | null, formData: FormData) {
  const albuns = await readContentFile<Albuns>("albuns.json");
  const idx = id ? albuns.items.findIndex((a) => a.id === id) : -1;
  if (id && idx === -1) throw new Error("Álbum não encontrado");
  // parte do item existente (spread) pra não perder campos que o form ainda
  // não conheça
  const prev = idx !== -1 ? albuns.items[idx] : undefined;
  const title = str(formData, "title");
  const albumType = str(formData, "albumType");
  const item: AlbumItem = {
    ...prev,
    id: id ?? uniqueSlug(slugify(title), albuns.items.map((a) => a.id)),
    title,
    year: str(formData, "year"),
    label: optStr(formData, "label"),
    coverLabel: optStr(formData, "coverLabel"),
    description: optStr(formData, "description"),
    cover: optStr(formData, "cover"),
    albumType:
      albumType === "studio" || albumType === "live" ? albumType : undefined,
    releaseDate: optStr(formData, "releaseDate"),
    tracks: parseTracks(str(formData, "tracks")),
    upcoming: bool(formData, "upcoming") || undefined,
  };

  if (idx !== -1) {
    albuns.items[idx] = item;
  } else {
    albuns.items.unshift(item);
  }
  await writeContentFile("albuns.json", albuns);
  revalidateAll("/admin/albuns");
  redirect("/admin/albuns");
}

export async function deleteAlbum(id: string) {
  const albuns = await readContentFile<Albuns>("albuns.json");
  albuns.items = albuns.items.filter((a) => a.id !== id);
  await writeContentFile("albuns.json", albuns);
  revalidateAll("/admin/albuns");
}

export async function saveAlbunsIntro(formData: FormData) {
  const albuns = await readContentFile<Albuns>("albuns.json");
  albuns.title = str(formData, "title");
  albuns.subtitle = str(formData, "subtitle");
  await writeContentFile("albuns.json", albuns);
  revalidateAll("/admin/albuns");
}

// ---------- banda: história ----------

export async function saveHistoriaIntro(formData: FormData) {
  const historia = await readContentFile<Historia>("historia.json");
  historia.title = str(formData, "title");
  historia.subtitle = str(formData, "subtitle");
  historia.intro = str(formData, "intro");
  await writeContentFile("historia.json", historia);
  revalidateAll("/admin/historia");
}

export async function saveTimelineItem(id: string | null, formData: FormData) {
  const historia = await readContentFile<Historia>("historia.json");
  const year = str(formData, "year");
  const item: TimelineItem = {
    id: id ?? uniqueSlug(slugify(year), historia.timeline.map((t) => t.id)),
    year,
    title: str(formData, "title"),
    description: optStr(formData, "description"),
  };

  if (id) {
    const idx = historia.timeline.findIndex((t) => t.id === id);
    if (idx === -1) throw new Error("Evento não encontrado");
    historia.timeline[idx] = item;
  } else {
    historia.timeline.push(item);
  }
  await writeContentFile("historia.json", historia);
  revalidateAll("/admin/historia");
  redirect("/admin/historia");
}

export async function deleteTimelineItem(id: string) {
  const historia = await readContentFile<Historia>("historia.json");
  historia.timeline = historia.timeline.filter((t) => t.id !== id);
  await writeContentFile("historia.json", historia);
  revalidateAll("/admin/historia");
}

export async function moveTimelineItem(id: string, dir: -1 | 1) {
  const historia = await readContentFile<Historia>("historia.json");
  const index = historia.timeline.findIndex((t) => t.id === id);
  const target = index + dir;
  if (index === -1 || target < 0 || target >= historia.timeline.length) return;
  [historia.timeline[index], historia.timeline[target]] = [
    historia.timeline[target],
    historia.timeline[index],
  ];
  await writeContentFile("historia.json", historia);
  revalidateAll("/admin/historia");
}

// ---------- banda: notáveis substitutos ----------

export async function saveSubstituto(id: string | null, formData: FormData) {
  const substitutos = await readContentFile<Substitutos>("substitutos.json");
  const name = str(formData, "name");
  const item: SubstitutoItem = {
    id: id ?? uniqueSlug(slugify(name), substitutos.items.map((s) => s.id)),
    name,
    role: str(formData, "role"),
    year: str(formData, "year"),
    description: optStr(formData, "description"),
    videoUrl: optStr(formData, "videoUrl"),
    videoLabel: optStr(formData, "videoLabel"),
  };

  if (id) {
    const idx = substitutos.items.findIndex((s) => s.id === id);
    if (idx === -1) throw new Error("Substituto não encontrado");
    substitutos.items[idx] = item;
  } else {
    substitutos.items.push(item);
  }
  await writeContentFile("substitutos.json", substitutos);
  revalidateAll("/admin/substitutos");
  redirect("/admin/substitutos");
}

export async function deleteSubstituto(id: string) {
  const substitutos = await readContentFile<Substitutos>("substitutos.json");
  substitutos.items = substitutos.items.filter((s) => s.id !== id);
  await writeContentFile("substitutos.json", substitutos);
  revalidateAll("/admin/substitutos");
}

export async function saveSubstitutosIntro(formData: FormData) {
  const substitutos = await readContentFile<Substitutos>("substitutos.json");
  substitutos.title = str(formData, "title");
  substitutos.intro = str(formData, "intro");
  substitutos.curiosity = optStr(formData, "curiosity");
  await writeContentFile("substitutos.json", substitutos);
  revalidateAll("/admin/substitutos");
}
