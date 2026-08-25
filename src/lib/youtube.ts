/** Extrai o ID de 11 caracteres de uma URL do YouTube em qualquer formato comum. */
export function extractYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/live\/)([a-zA-Z0-9_-]{11})/,
  );
  return match ? match[1] : null;
}

/** Extrai o ID de uma playlist do YouTube (parâmetro "list="). */
export function extractYouTubePlaylistId(url: string): string | null {
  const match = url.match(/[?&]list=([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}
