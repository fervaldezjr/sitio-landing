/** Public URL for a file in `public/`. Astro's BASE_URL has no trailing slash. */
export function publicUrl(file: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const clean = file.replace(/^\//, "");
  return clean ? `${base}/${clean}` : `${base}/`;
}

export function hashHref(hash: string): string {
  const id = hash.startsWith("#") ? hash : `#${hash}`;
  return `${publicUrl("")}${id}`;
}
