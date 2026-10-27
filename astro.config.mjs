import { defineConfig, envField } from "astro/config";
import vercel from "@astrojs/vercel";

export default defineConfig({
  site: "https://greentech-landing-eight.vercel.app",
  // Pages stay static; only the checkout endpoint and the order page run on demand.
  adapter: vercel(),
  build: { inlineStylesheets: "always" },
  // Astro's default, pinned: rejects cross-site form posts to the checkout endpoint.
  security: { checkOrigin: true },
  env: {
    schema: {
      // Server-only. astro:env refuses to expose a secret to client code.
      PAYSTACK_SECRET_KEY: envField.string({ context: "server", access: "secret", optional: true }),
      // Only for local testing against a fake Paystack. Leave unset in production.
      PAYSTACK_API_BASE: envField.string({ context: "server", access: "secret", optional: true }),
    },
  },
});
