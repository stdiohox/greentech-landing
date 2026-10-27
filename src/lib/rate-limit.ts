// Best-effort, per-instance rate limiter. Serverless instances don't share
// memory, so this stops bursts from one visitor on a warm instance rather than
// enforcing a global cap. A Vercel firewall rule is the global backstop (README).

type Window = { count: number; resetAt: number };

const buckets = new Map<string, Window>();
const MAX_KEYS = 10_000;

/** Returns true if this key may proceed, false once it has used up `limit` hits in `windowMs`. */
export function allow(key: string, limit: number, windowMs: number, now = Date.now()): boolean {
  const w = buckets.get(key);
  if (!w || w.resetAt <= now) {
    // Keep memory bounded: drop expired windows (and, if still too many, the oldest).
    if (buckets.size >= MAX_KEYS) {
      for (const [k, v] of buckets) if (v.resetAt <= now) buckets.delete(k);
      if (buckets.size >= MAX_KEYS) buckets.delete(buckets.keys().next().value!);
    }
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  w.count++;
  return w.count <= limit;
}

/** Visitor IP as Astro reports it; on Vercel this comes from the platform, not a spoofable header. */
export function clientIp(getAddress: () => string): string {
  try {
    return getAddress() || "unknown";
  } catch {
    return "unknown";
  }
}

export const LIMITS = {
  // Starting a payment: a real buyer retries a few times at most.
  checkout: { limit: 10, windowMs: 10 * 60_000 },
  // Order page loads: generous for refreshes while a transfer clears.
  order: { limit: 30, windowMs: 10 * 60_000 },
} as const;
