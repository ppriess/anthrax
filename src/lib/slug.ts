export function slugify(input: string): string {
  const base = input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
  return base || "item";
}

export function uniqueSlug(base: string, existing: string[]): string {
  let slug = base;
  let n = 2;
  while (existing.includes(slug)) {
    slug = `${base}-${n}`;
    n++;
  }
  return slug;
}
