// Every device on sale. Phones from the supplier price lists live in phones.ts; everything
// else is below. Update prices when they change, then redeploy. Order = display order.
import { phoneModels, type Brand } from "./phones";
import phoneSpecs from "./phone-specs.json";

export type Category = "phones" | "laptops" | "consoles" | "audio" | "accessories";
export type Condition = "Brand New" | "UK Used";

export type Product = {
  /** Stable URL id: /checkout/<id>. Never reuse an id for a different device. */
  id: string;
  name: string;
  category: Category;
  condition: Condition;
  price: number;
  specs: string[];
  swap: boolean;
  /** Set true when the unit has sold: Buy is switched off and checkout refuses it. */
  sold?: boolean;
  /** Top of a price range. There is no single price to charge, so it is WhatsApp only. */
  priceTo?: number;
  /** Price-list phones: brand, the model shared by its options, and this option's label. */
  brand?: Brand;
  model?: string;
  modelName?: string;
  option?: string;
};

export const categories: { id: Category; label: string }[] = [
  { id: "phones", label: "Phones" },
  { id: "laptops", label: "Laptops" },
  { id: "consoles", label: "Consoles" },
  { id: "audio", label: "Audio" },
  { id: "accessories", label: "Accessories" },
];

const slug = (label: string) => label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const priceListPhones: Product[] = phoneModels.flatMap((m) =>
  m.lines.map(([label, price, extra]) => ({
    id: extra?.id ?? (label ? `${m.model}-${slug(label)}` : m.model),
    name: label ? `${m.name} ${label.replaceAll(" · ", " ")}` : m.name,
    category: "phones" as const,
    condition: "UK Used" as const,
    price,
    priceTo: extra?.to,
    specs: (phoneSpecs as Record<string, { cardSpecs: string[] }>)[m.model].cardSpecs,
    swap: true,
    brand: m.brand,
    model: m.model,
    modelName: m.name,
    option: label,
  })),
);

export const products: Product[] = [
  ...priceListPhones,
  { id: "galaxy-a56-5g", name: "Samsung Galaxy A56 5G", category: "phones", condition: "Brand New", price: 520000, specs: ['6.7" AMOLED', "8GB RAM", "256GB"], swap: true },
  { id: "tecno-camon-40-pro", name: "Tecno Camon 40 Pro 5G", category: "phones", condition: "Brand New", price: 175000, specs: ['6.78" AMOLED', "50MP camera", "256GB"], swap: true },
  { id: "macbook-air-m2", name: 'MacBook Air M2 13"', category: "laptops", condition: "UK Used", price: 1100000, specs: ["Apple M2", "8GB RAM", "256GB SSD"], swap: true },
  { id: "hp-elitebook-840-g6", name: "HP EliteBook 840 G6", category: "laptops", condition: "UK Used", price: 400000, specs: ["Core i7 8th Gen", "16GB RAM", "512GB SSD"], swap: true },
  { id: "thinkpad-t490", name: "Lenovo ThinkPad T490", category: "laptops", condition: "UK Used", price: 380000, specs: ["Core i7 8th Gen", "16GB RAM", "256GB SSD"], swap: true },
  { id: "dell-latitude-5400", name: "Dell Latitude 5400", category: "laptops", condition: "UK Used", price: 325000, specs: ["Core i5 8th Gen", "8GB RAM", "256GB SSD"], swap: true },
  { id: "ps5-disc", name: "PlayStation 5 Disc Edition", category: "consoles", condition: "Brand New", price: 750000, specs: ["825GB SSD", "4K @ 120fps", "DualSense"], swap: true },
  { id: "xbox-series-s", name: "Xbox Series S 512GB", category: "consoles", condition: "Brand New", price: 670000, specs: ["512GB SSD", "1440p @ 120fps", "All-digital"], swap: true },
  { id: "switch-oled", name: "Nintendo Switch OLED", category: "consoles", condition: "UK Used", price: 380000, specs: ['7" OLED', "64GB", "Handheld + TV"], swap: true },
  { id: "airpods-pro-2", name: "AirPods Pro (2nd Gen)", category: "audio", condition: "UK Used", price: 120000, specs: ["Noise cancelling", "USB-C"], swap: false },
  { id: "jbl-charge-5", name: "JBL Charge 5", category: "audio", condition: "Brand New", price: 85000, specs: ["20hr battery", "IP67", "Power bank"], swap: false },
  // A spare or replacement: every phone already comes with a pouch (see PHONE_EXTRAS).
  // Price from the previous site's "Phone Case (Universal)" listing; confirm with GreenTech.
  { id: "phone-pouch", name: "Protective phone pouch", category: "accessories", condition: "Brand New", price: 3500, specs: ["Protective", "Fits most phone models"], swap: false },
  { id: "bose-soundlink-flex", name: "Bose SoundLink Flex", category: "audio", condition: "Brand New", price: 120000, specs: ["12hr battery", "IP67"], swap: false },
];

// Hero "Today's pick" devices. Each needs a photo that really shows that model
// (src/components/Hero.astro maps product id -> photo).
export const heroPicks = ["iPhone 14 Pro Max 128GB pSIM + eSIM", "PlayStation 5 Disc Edition"];

export const findProduct = (id: string) => products.find((p) => p.id === id);

/** What every phone comes with, at no extra cost. */
export const PHONE_EXTRAS = "screen guard, pouch and cable";

/** Shown first in the "All" view, so the page isn't 80 phones before the first laptop. */
export const featuredModels = new Set([
  "iphone-17-pro-max", "iphone-15-pro-max", "iphone-14-pro-max", "iphone-13", "galaxy-s24-ultra", "galaxy-z-fold-3",
  "pixel-10-pro", "pixel-9", "macbook-air-m2", "ps5-disc", "airpods-pro-2", "bose-soundlink-flex",
]);

/** One shop card per model: the options of a price-list phone share a card. */
export type ShopCard = { key: string; lead: Product; options: Product[] };
export const shopCards: ShopCard[] = [];
for (const p of products) {
  const key = p.model ?? p.id;
  const card = shopCards.find((c) => c.key === key);
  if (card) card.options.push(p);
  else shopCards.push({ key, lead: p, options: [p] });
}
