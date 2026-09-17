/**
 * Canonical site URL, used for metadataBase, hreflang alternates, sitemap and JSON-LD.
 * Set NEXT_PUBLIC_SITE_URL in Vercel once the amulet.ro domain is connected —
 * until then it falls back to the current deployment URL so nothing breaks.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
).replace(/\/$/, "");
