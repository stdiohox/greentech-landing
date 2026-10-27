# GreenTech Gadget Store — landing page

One-page sales site for GreenTech (Computer Village, Ikeja, Lagos). Astro 7, deployed to
Vercel with `@astrojs/vercel`. Pages are static. Only the checkout endpoint and the order page
run on demand.

```sh
npm install
cp .env.example .env    # add your Paystack TEST secret key
npm run dev             # http://localhost:4321
npm run build           # type-check + build to .vercel/output
```

## Editing content

- **Products and prices:** `src/data/products.ts`. The checkout charges whatever price is in
  this file, so redeploy after a price change. Never reuse an `id` for a different device,
  because `/checkout/<id>` links are built from it.
- **Phone, WhatsApp, address, socials:** `src/data/site.ts`.

## Paystack checkout

The buyer taps **Buy now**, fills in their details on `/checkout/<id>`, and gets redirected to
Paystack's hosted page. Paystack then sends them back to `/order?reference=…`.

- **Price.** `POST /api/checkout` reads the price from `products.ts` on the server. Any amount
  the browser sends is ignored.
- **Signature.** The server signs `reference|product_id|amount` with the secret key and stores
  the signature in the transaction metadata.
- **Confirmation.** `/order` re-verifies the transaction with Paystack, then shows it as paid
  only if all of these hold: the status is `success`, the currency is NGN, and the signature
  matches. A transaction someone created with only the public key fails the signature check.
- **What is charged.** The device price only. For delivery, the fee is agreed with the buyer on
  WhatsApp and paid separately. Pickup is free.
- **Where orders live.** There is no database. Paystack's dashboard is the order record: every
  transaction carries the device, customer, phone and delivery details as custom fields.
  Turn on email notifications for successful payments in Paystack
  (Settings → Preferences) so the shop hears about each order.

### Sold-out refunds

Each listing is a single unit, so one can sell in the shop just before an online order lands.
The site promises a **full refund** in that case (checkout page and FAQ). Issue it from the
Paystack dashboard: Transactions → the payment → Refund. Confirm this wording with GreenTech
before going live.

### Pouch add-on and stock

Phone checkouts offer the "phone-pouch" product as an add-on; the server adds its price and
the signature covers the total and the add-on choice. Set `sold: true` on any product in
`products.ts` (then redeploy) to switch off Buy and refuse checkout for it. Pouches have no
stock count: mark the pouch sold if you run out.

**Staff note:** the "Add-on" line in the Paystack dashboard is informational. Before handing
over a pouch, check the amount paid equals phone + pouch, or open the buyer's `/order` page,
which only shows the pouch when the signed order includes it.

### Rate limiting

`src/lib/rate-limit.ts` caps each visitor IP at 10 checkout attempts and 30 order-page loads
per 10 minutes. It is per serverless instance, so it stops bursts rather than enforcing a
global cap. After the first deploy, add the global backstop in Vercel: Project → Firewall →
Configure → New Rule → *Request Path* equals `/api/checkout` (and a second rule for
`/order`) → **Rate Limit**, e.g. 20 requests / 60 s per IP → Deny.

### Keys

| Variable | Where | Notes |
| --- | --- | --- |
| `PAYSTACK_SECRET_KEY` | `.env` locally, Vercel env vars in production | `sk_test_…` while testing, `sk_live_…` to go live. Server-only (`astro:env` secret). |
| `PAYSTACK_API_BASE` | local testing only | Points the server at a fake Paystack. Never set this in production. |

No public key is needed, because the site uses Paystack's hosted checkout rather than the
inline popup.

### Testing with Paystack test mode

With a `sk_test_` key, pay using Paystack's test cards
(https://paystack.com/docs/payments/test-payments). The test transactions then show up in the
dashboard's test mode.
