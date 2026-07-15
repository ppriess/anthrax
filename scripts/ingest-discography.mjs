/**
 * Converte public/albums/anthrax.yaml (discografia completa: álbuns, faixas,
 * clipes oficiais, fotos de imprensa) nos JSONs do CMS em content/. Não toca
 * no Blob — depois de conferir os diffs, rodar `node scripts/seed-content.mjs`
 * para publicar (atenção: o seed sobrescreve edições feitas via /admin).
 *
 * Uso: node scripts/ingest-discography.mjs
 *
 * O que gera/atualiza:
 *  - content/albuns.json  → 19 álbuns (studio + live) com capa, tracklist,
 *    tipo e destaque de lançamento; preserva descrições PT-BR já existentes.
 *  - content/tv.json      → clipes oficiais com URL (álbuns + extra_videos).
 *  - content/news.json    → notícia do anúncio do Cursum Perficio com a foto
 *    de imprensa de maio (idempotente: atualiza se o id já existir).
 *  - content/membros.json → foto de grupo de julho + crédito no cabeçalho.
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentDir = path.join(root, "content");

const yamlRaw = await readFile(
  path.join(root, "public", "albums", "anthrax.yaml"),
  "utf8",
);
const data = parse(yamlRaw);

async function readJson(file) {
  return JSON.parse(await readFile(path.join(contentDir, file), "utf8"));
}
async function writeJson(file, obj) {
  await writeFile(
    path.join(contentDir, file),
    JSON.stringify(obj, null, 2) + "\n",
  );
  console.log(`✓ content/${file}`);
}

// o parser YAML pode devolver datas como Date — normaliza pra "AAAA-MM-DD"
function isoDate(value) {
  if (value == null) return undefined;
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value).slice(0, 10);
}

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ---------- albuns.json ----------

const albunsAtual = await readJson("albuns.json");
const descricoes = new Map(
  albunsAtual.items
    .filter((a) => a.description)
    .map((a) => [a.id, a.description]),
);

function toAlbumItem(album) {
  const item = {
    id: album.slug,
    title: album.title,
    year: String(album.year),
    label: album.label ?? undefined,
    description: descricoes.get(album.slug),
    cover: `/albums/${album.cover.file}`,
    albumType: album.type,
    releaseDate: isoDate(album.release_date),
    tracks: (album.tracks ?? []).map((t) => ({
      n: t.n,
      title: String(t.title),
      duration: t.duration ?? undefined,
    })),
    upcoming: album.status === "upcoming" || undefined,
  };
  // remove chaves undefined pra manter o JSON limpo
  return Object.fromEntries(
    Object.entries(item).filter(([, v]) => v !== undefined),
  );
}

const byYearDesc = (a, b) => Number(b.year) - Number(a.year);
const studio = data.albums.filter((a) => a.type === "studio").map(toAlbumItem);
const live = data.albums.filter((a) => a.type === "live").map(toAlbumItem);
const upcoming = studio.filter((a) => a.upcoming);
const lancados = studio.filter((a) => !a.upcoming).sort(byYearDesc);

albunsAtual.items = [...upcoming, ...lancados, ...live.sort(byYearDesc)];
await writeJson("albuns.json", albunsAtual);

// ---------- tv.json ----------

const tv = await readJson("tv.json");
const tipoLabel = {
  music_video: "CLIPE",
  lyric_video: "LYRIC VIDEO",
  live_video: "AO VIVO",
};

const albumPorSlug = new Map(data.albums.map((a) => [a.slug, a]));
const usados = new Set();
function videoId(title, year) {
  const base = slugify(`${title}-${year}`);
  let id = base;
  for (let i = 2; usados.has(id); i++) id = `${base}-${i}`;
  usados.add(id);
  return id;
}

const videos = [];
for (const album of data.albums) {
  for (const v of album.videos ?? []) {
    if (!v.url) continue; // clipe sem upload oficial no YouTube
    videos.push({
      id: videoId(v.title, v.year),
      title: v.title,
      meta: `${tipoLabel[v.type]} · ${v.year} · ${album.title.toUpperCase()}`,
      sourceUrl: v.url,
      year: String(v.year),
      videoType: v.type,
      albumSlug: album.slug,
    });
  }
}
for (const v of data.extra_videos ?? []) {
  if (!v.url) continue;
  videos.push({
    id: videoId(v.title, v.year),
    title: v.title,
    meta: `${tipoLabel[v.type]} · ${v.year} · ${v.release.toUpperCase()}`,
    sourceUrl: v.url,
    year: String(v.year),
    videoType: v.type,
  });
}
videos.sort((a, b) => Number(b.year) - Number(a.year));

tv.videos = videos;
tv.archive = {
  count: String(videos.length),
  blurb: "clipes e vídeos oficiais\ndo canal da banda",
  cta: "VER TODOS OS VÍDEOS",
};
await writeJson("tv.json", tv);

// ---------- news.json (anúncio do Cursum Perficio + foto de maio) ----------

const news = await readJson("news.json");
const fotoMaio = data.press_photos_2026.find((p) => p.released === "2026-05");
const noticia = {
  id: "cursum-perficio-anuncio",
  source: "BLABBERMOUTH · 14 MAI",
  date: "2026-05-14",
  title:
    "Anthrax anuncia Cursum Perficio, 12º álbum de estúdio, para 18 de setembro",
  excerpt:
    "Primeiro disco em dez anos chega com o single \"It's for the Kids\" já no ar. Produção de Jay Ruston. Foto: Travis Shinn.",
  link: fotoMaio?.source_article,
  image: `/albums/${fotoMaio?.file}`,
  hot: true,
  variant: "feature",
};
const idx = news.items.findIndex((n) => n.id === noticia.id);
if (idx === -1) news.items.unshift(noticia);
else news.items[idx] = noticia;
await writeJson("news.json", news);

// ---------- membros.json (foto de grupo de julho) ----------

const membros = await readJson("membros.json");
const fotoJulho = data.press_photos_2026.find((p) => p.released === "2026-07");
membros.photo = `/albums/${fotoJulho?.file}`;
membros.photoCredit = `Foto: ${fotoJulho?.credit}`;
await writeJson("membros.json", membros);

console.log(
  `\nÁlbuns: ${albunsAtual.items.length} · Vídeos TV: ${videos.length}` +
    "\nConfira os diffs em content/ e publique com: node scripts/seed-content.mjs",
);
