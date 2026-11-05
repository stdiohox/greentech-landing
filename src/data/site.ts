// Every contact detail on the page comes from here. Taken from the previous
// site (stdiohox/greentech); change them in this one place.
export const site = {
  name: "GreenTech Gadget Store",
  shortName: "GreenTech",
  tagline: "Everywhere Green",
  url: "https://greentech-landing-eight.vercel.app",
  phoneDisplay: "0903 235 9726",
  phoneTel: "+2349032359726",
  whatsapp: "2349032359726",
  address: "Computer Village, Ikeja, Lagos",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Computer+Village+Ikeja+Lagos",
  hours: "Mon–Sat · 8am–8pm",
  // @AbariGreen on every platform.
  instagram: { handle: "@AbariGreen", url: "https://www.instagram.com/AbariGreen" },
  x: { handle: "@AbariGreen", url: "https://x.com/AbariGreen" },
} as const;

export const waLink = (message: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

export const naira = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;
export const amount = (n: number) => n.toLocaleString("en-NG");

type Orderable = { name: string; condition: string; price: number; priceTo?: number };
/** "₦143,000 to ₦190,000" for a range, otherwise the one price. */
export const priceText = (p: Orderable) => (p.priceTo ? `${naira(p.price)} to ${naira(p.priceTo)}` : naira(p.price));
export const orderMessage = (p: Orderable) =>
  `Hi GreenTech, I saw your website. I'm interested in the ${p.name} (${p.condition}) at ${priceText(p)}. Is it available? Please send today's price and a live video of the exact unit.`;
export const swapMessage = (p: Orderable) =>
  `Hi GreenTech, I saw your website. I want to swap my old device for the ${p.name} (${p.condition}, ${priceText(p)}). My device is: `;

export const PRICE_VARIES = "Phone prices vary by supplier and by the country or region the phone is imported from.";
