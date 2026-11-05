import type { APIRoute } from "astro";
import { products } from "../data/products";

// Built from the product list, so a new price line can't be missed.
export const GET: APIRoute = ({ site }) => {
  const urls = ["/", ...products.map((p) => `/products/${p.id}/`)].map((path) => `  <url><loc>${new URL(path, site)}</loc></url>`);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
};
