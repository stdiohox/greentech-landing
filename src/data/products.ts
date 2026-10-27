// Today's deals. Names, conditions and prices come from the previous site's
// product table; update them here when stock or prices change. Order = display order.
export type Category = "phones" | "laptops" | "consoles" | "audio";
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
};

export const categories: { id: Category; label: string }[] = [
  { id: "phones", label: "Phones" },
  { id: "laptops", label: "Laptops" },
  { id: "consoles", label: "Consoles" },
  { id: "audio", label: "Audio" },
];

export const products: Product[] = [
  { id: "iphone-14-pro-max-128gb", name: "iPhone 14 Pro Max 128GB", category: "phones", condition: "UK Used", price: 950000, specs: ['6.7" OLED', "A16 Bionic", "48MP triple camera"], swap: true },
  { id: "iphone-13-128gb", name: "iPhone 13 128GB", category: "phones", condition: "UK Used", price: 420000, specs: ['6.1" OLED', "A15 Bionic", "5G"], swap: true },
  { id: "galaxy-s24-ultra", name: "Samsung Galaxy S24 Ultra", category: "phones", condition: "Brand New", price: 1450000, specs: ['6.8" AMOLED', "Snapdragon 8 Gen 3", "200MP camera"], swap: true },
  { id: "pixel-9-128gb", name: "Google Pixel 9 128GB", category: "phones", condition: "Brand New", price: 630000, specs: ['6.3" OLED', "Tensor G4", "50MP camera"], swap: true },
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
  { id: "bose-soundlink-flex", name: "Bose SoundLink Flex", category: "audio", condition: "Brand New", price: 120000, specs: ["12hr battery", "IP67"], swap: false },
];

// Hero "Today's pick" devices. Each needs a photo that really shows that model
// (src/components/Hero.astro maps product id -> photo).
export const heroPicks = ["iPhone 14 Pro Max 128GB", "PlayStation 5 Disc Edition"];

export const findProduct = (id: string) => products.find((p) => p.id === id);
