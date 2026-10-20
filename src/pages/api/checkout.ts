import type { APIRoute } from "astro";
import { findProduct } from "../../data/products";
import { initialize, isConfigured, parseOrder } from "../../lib/paystack";

export const prerender = false;

// Plain HTML form post from /checkout/[id]: on success we 303 to Paystack's
// hosted page, on any problem we 303 back to the form with a reason.
export const POST: APIRoute = async ({ request, url, site, redirect }) => {
  const form = await request.formData().catch(() => null);
  const id = String(form?.get("item") ?? "");
  const product = findProduct(id);
  if (!form || !product) return redirect("/#deals", 303);

  const back = (error: string) => redirect(`/checkout/${product.id}?error=${error}#form`, 303);

  // Honeypot: real buyers never see or fill this field.
  if (String(form.get("website") ?? "") !== "") return back("gateway");

  if (!isConfigured()) {
    console.error("checkout: PAYSTACK_SECRET_KEY is not set");
    return back("unavailable");
  }

  const parsed = parseOrder(form);
  if (!parsed.ok) return back(`field-${parsed.field}`);

  // The price comes from products.ts on the server, never from the form.
  // Build the return URL from the configured site, not the request's Host header.
  const base = import.meta.env.DEV || !site ? url.origin : site.origin;
  const tx = await initialize(product, parsed.order, new URL("/order", base).href);
  if (!tx) return back("gateway");
  return redirect(tx.url, 303);
};

export const GET: APIRoute = ({ redirect }) => redirect("/#deals", 303);
