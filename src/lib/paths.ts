/** Public URL for a file in `public/`. Astro's BASE_URL has no trailing slash. */
export function publicUrl(file: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const clean = file.replace(/^\//, "");
  return clean ? `${base}/${clean}` : `${base}/`;
}

/** An in-page anchor. Bare, so it works on every language's page. */
export function hashHref(hash: string): string {
  return hash.startsWith("#") ? hash : `#${hash}`;
}
