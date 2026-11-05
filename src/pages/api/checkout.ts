import type { APIRoute } from "astro";
import { findProduct } from "../../data/products";
import { initialize, isConfigured, parseOrder } from "../../lib/paystack";
import { LIMITS, allow, clientIp } from "../../lib/rate-limit";

export const prerender = false;

// Plain HTML form post from /checkout/[id]: on success we 303 to Paystack's
// hosted page, on any problem we 303 back to the form with a reason.
export const POST: APIRoute = async ({ request, url, site, redirect, clientAddress }) => {
  const form = await request.formData().catch(() => null);
  const id = String(form?.get("item") ?? "");
  const product = findProduct(id);
  if (!form || !product) return redirect("/#deals", 303);

  // A price range has no single amount to charge: send the buyer to its page to ask on WhatsApp.
  if (product.priceTo) return redirect(`/products/${product.id}`, 303);

  const back = (error: string) => redirect(`/checkout/${product.id}?error=${error}#form`, 303);
  if (product.sold) return back("sold");

  const ip = clientIp(() => clientAddress);
  if (!allow(`checkout:${ip}`, LIMITS.checkout.limit, LIMITS.checkout.windowMs)) return back("busy");

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
