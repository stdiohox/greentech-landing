// Server-only Paystack helpers. Imported by the checkout endpoint and the
// order page, both of which render on demand; never import this from a
// client <script>. astro:env/server throws if a secret reaches the browser.
import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { PAYSTACK_API_BASE, PAYSTACK_SECRET_KEY } from "astro:env/server";
import type { Product } from "../data/products";
import { NIGERIAN_STATES } from "../data/states";

// The override exists only for local testing against a fake Paystack. In a
// production build it is ignored, so the secret key can only ever go to Paystack.
const DEV = import.meta.env.DEV;
const API = DEV && PAYSTACK_API_BASE ? PAYSTACK_API_BASE : "https://api.paystack.co";
export const CURRENCY = "NGN";

export const isConfigured = () => Boolean(PAYSTACK_SECRET_KEY?.startsWith("sk_"));

export const toKobo = (naira: number) => Math.round(naira * 100);

// 128 random bits: the reference is what opens the order page, so it must not be guessable.
export const newReference = () => `GT-${randomBytes(16).toString("hex").toUpperCase()}`;
export const REFERENCE_PATTERN = /^[A-Za-z0-9._=-]{6,100}$/;

export type Fulfilment = "pickup" | "delivery";

export type OrderDetails = {
  name: string;
  phone: string;
  email: string;
  fulfilment: Fulfilment;
  address: string;
  state: string;
  notes: string;
};

/**
 * Validates the checkout form. Mirrors the HTML constraints on /checkout/[id],
 * which are a convenience only: this is the check that counts.
 */
export function parseOrder(form: FormData): { ok: true; order: OrderDetails } | { ok: false; field: keyof OrderDetails } {
  const get = (k: string) => String(form.get(k) ?? "").trim();
  const order: OrderDetails = {
    name: get("name"),
    phone: get("phone").replace(/\s+/g, " "),
    email: get("email").toLowerCase(),
    fulfilment: get("fulfilment") === "delivery" ? "delivery" : "pickup",
    address: get("address"),
    state: get("state"),
    notes: get("notes"),
  };
  if (order.name.length < 2 || order.name.length > 100) return { ok: false, field: "name" };
  if (!/^\+?[0-9 ()-]{7,20}$/.test(order.phone) || order.phone.replace(/\D/g, "").length < 10) return { ok: false, field: "phone" };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(order.email) || order.email.length > 254) return { ok: false, field: "email" };
  if (order.fulfilment === "delivery") {
    if (order.address.length < 5 || order.address.length > 200) return { ok: false, field: "address" };
    if (!(NIGERIAN_STATES as readonly string[]).includes(order.state)) return { ok: false, field: "state" };
  } else {
    order.address = "";
    order.state = "";
  }
  if (order.notes.length > 500) return { ok: false, field: "notes" };
  return { ok: true, order };
}

/**
 * Anyone holding the public key can create a Paystack transaction with any
 * amount and metadata, so metadata is untrusted. This signature, made with the
 * secret key, proves our server created the transaction for this exact item
 * and amount.
 */
const orderHash = (order: unknown) => createHash("sha256").update(JSON.stringify(order ?? null)).digest("hex");

const sign = (reference: string, productId: string, kobo: number, order: unknown) =>
  createHmac("sha256", PAYSTACK_SECRET_KEY!).update(`${reference}|${productId}|${kobo}|${orderHash(order)}`).digest("hex");

const signatureMatches = (reference: string, productId: string, kobo: number, order: unknown, sig: unknown) => {
  if (typeof sig !== "string" || !/^[0-9a-f]{64}$/.test(sig)) return false;
  return timingSafeEqual(Buffer.from(sign(reference, productId, kobo, order), "hex"), Buffer.from(sig, "hex"));
};

/** Paystack's hosted checkout lives on checkout.paystack.com; never redirect a buyer anywhere else. */
const isPaystackCheckoutUrl = (raw: string) => {
  try {
    const u = new URL(raw);
    return DEV ? true : u.protocol === "https:" && u.hostname === "checkout.paystack.com";
  } catch {
    return false;
  }
};

type PaystackEnvelope<T> = { status?: boolean; message?: string; data?: T };

async function call<T>(path: string, init?: RequestInit): Promise<PaystackEnvelope<T>> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`, "Content-Type": "application/json" },
    signal: AbortSignal.timeout(8000),
  });
  return (await res.json().catch(() => ({ status: false, message: `Paystack HTTP ${res.status}` }))) as PaystackEnvelope<T>;
}

/** Starts a hosted-checkout transaction. Returns the Paystack page to send the buyer to. */
export async function initialize(product: Product, order: OrderDetails, callbackUrl: string) {
  const reference = newReference();
  const amount = toKobo(product.price);
  const field = (display_name: string, value: string) => ({ display_name, variable_name: display_name.toLowerCase().replace(/\W+/g, "_"), value });
  let res: PaystackEnvelope<{ authorization_url?: string; reference?: string }>;
  try {
    res = await call<{ authorization_url?: string; reference?: string }>("/transaction/initialize", {
    method: "POST",
    body: JSON.stringify({
      email: order.email,
      amount,
      currency: CURRENCY,
      reference,
      callback_url: callbackUrl,
      metadata: {
        product_id: product.id,
        sig: sign(reference, product.id, amount, order),
        order,
        // Shown on the transaction in the Paystack dashboard, which is the shop's order record.
        custom_fields: [
          field("Device", `${product.name} (${product.condition})`),
          field("Customer", order.name),
          field("Phone", order.phone),
          field("Fulfilment", order.fulfilment === "delivery" ? `Delivery: ${order.address}, ${order.state}` : "Pickup at Computer Village"),
          ...(order.notes ? [field("Notes", order.notes)] : []),
        ],
      },
    }),
    });
  } catch (err) {
    console.error("paystack initialize request failed:", err);
    return null;
  }
  if (!res.status || !res.data?.authorization_url || !isPaystackCheckoutUrl(res.data.authorization_url)) {
    console.error("paystack initialize failed:", res.message ?? "unexpected authorization_url");
    return null;
  }
  return { reference, url: res.data.authorization_url };
}

type VerifiedData = {
  status?: string;
  reference?: string;
  amount?: number;
  currency?: string;
  paid_at?: string;
  channel?: string;
  gateway_response?: string;
  customer?: { email?: string };
  metadata?: { product_id?: unknown; sig?: unknown; order?: Partial<OrderDetails> } | string | null;
};

export type Verification =
  | { state: "paid"; reference: string; amountKobo: number; productId: string; order: Partial<OrderDetails>; paidAt?: string; channel?: string }
  | { state: "failed"; reference: string; message: string }
  | { state: "pending"; reference: string }
  | { state: "invalid"; reference: string }
  | { state: "error"; reference: string };

/**
 * The only place a payment counts as paid. Re-asks Paystack for the
 * transaction and checks status, reference, currency, and our signature over
 * the item and amount. The redirect back from Paystack proves nothing on its own.
 */
export async function verify(reference: string): Promise<Verification> {
  let res: PaystackEnvelope<VerifiedData>;
  try {
    res = await call<VerifiedData>(`/transaction/verify/${encodeURIComponent(reference)}`);
  } catch (err) {
    console.error("paystack verify request failed:", err);
    return { state: "error", reference };
  }
  const d = res.data;
  if (!res.status || !d) return { state: "invalid", reference };
  if (d.reference !== reference) {
    console.error("paystack verify: reference mismatch", reference, d.reference);
    return { state: "error", reference };
  }
  if (d.status === "ongoing" || d.status === "pending" || d.status === "processing") {
    return { state: "pending", reference };
  }
  if (d.status === "abandoned") return { state: "failed", reference, message: "The payment wasn't completed." };
  if (d.status !== "success") return { state: "failed", reference, message: d.gateway_response || "The payment was not completed." };

  const meta = typeof d.metadata === "object" && d.metadata ? d.metadata : {};
  const productId = typeof meta.product_id === "string" ? meta.product_id : "";
  const amount = Number(d.amount);
  const emailMatches = !meta.order?.email || d.customer?.email?.toLowerCase() === meta.order.email;
  if (d.currency !== CURRENCY || !productId || !emailMatches || !signatureMatches(reference, productId, amount, meta.order, meta.sig)) {
    console.error("paystack verify: signature/currency check failed", { reference, productId, amount, currency: d.currency });
    return { state: "invalid", reference };
  }
  return { state: "paid", reference, amountKobo: amount, productId, order: meta.order ?? {}, paidAt: d.paid_at, channel: d.channel };
}
