// Today's deals. Names, conditions and prices come from the previous site's
// product table; update them here when stock or prices change. Order = display order.
export type Category = "phones" | "laptops" | "consoles" | "audio";
export type Condition = "Brand New" | "UK Used";

export type Product = {
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
  { name: "iPhone 14 Pro Max 128GB", category: "phones", condition: "UK Used", price: 950000, specs: ['6.7" OLED', "A16 Bionic", "48MP triple camera"], swap: true },
  { name: "iPhone 13 128GB", category: "phones", condition: "UK Used", price: 420000, specs: ['6.1" OLED', "A15 Bionic", "5G"], swap: true },
  { name: "Samsung Galaxy S24 Ultra", category: "phones", condition: "Brand New", price: 1450000, specs: ['6.8" AMOLED', "Snapdragon 8 Gen 3", "200MP camera"], swap: true },
  { name: "Google Pixel 9 128GB", category: "phones", condition: "Brand New", price: 630000, specs: ['6.3" OLED', "Tensor G4", "50MP camera"], swap: true },
  { name: "Samsung Galaxy A56 5G", category: "phones", condition: "Brand New", price: 520000, specs: ['6.7" AMOLED', "8GB RAM", "256GB"], swap: true },
  { name: "Tecno Camon 40 Pro 5G", category: "phones", condition: "Brand New", price: 175000, specs: ['6.78" AMOLED', "50MP camera", "256GB"], swap: true },
  { name: 'MacBook Air M2 13"', category: "laptops", condition: "UK Used", price: 1100000, specs: ["Apple M2", "8GB RAM", "256GB SSD"], swap: true },
  { name: "HP EliteBook 840 G6", category: "laptops", condition: "UK Used", price: 400000, specs: ["Core i7 8th Gen", "16GB RAM", "512GB SSD"], swap: true },
  { name: "Lenovo ThinkPad T490", category: "laptops", condition: "UK Used", price: 380000, specs: ["Core i7 8th Gen", "16GB RAM", "256GB SSD"], swap: true },
  { name: "Dell Latitude 5400", category: "laptops", condition: "UK Used", price: 325000, specs: ["Core i5 8th Gen", "8GB RAM", "256GB SSD"], swap: true },
  { name: "PlayStation 5 Disc Edition", category: "consoles", condition: "Brand New", price: 750000, specs: ["825GB SSD", "4K @ 120fps", "DualSense"], swap: true },
  { name: "Xbox Series S 512GB", category: "consoles", condition: "Brand New", price: 670000, specs: ["512GB SSD", "1440p @ 120fps", "All-digital"], swap: true },
  { name: "Nintendo Switch OLED", category: "consoles", condition: "UK Used", price: 380000, specs: ['7" OLED', "64GB", "Handheld + TV"], swap: true },
  { name: "AirPods Pro (2nd Gen)", category: "audio", condition: "UK Used", price: 120000, specs: ["Noise cancelling", "USB-C"], swap: false },
  { name: "JBL Charge 5", category: "audio", condition: "Brand New", price: 85000, specs: ["20hr battery", "IP67", "Power bank"], swap: false },
  { name: "Bose SoundLink Flex", category: "audio", condition: "Brand New", price: 120000, specs: ["12hr battery", "IP67"], swap: false },
];

// The three tickets pinned in the hero.
export const heroPicks = ["iPhone 14 Pro Max 128GB", "PlayStation 5 Disc Edition", 'MacBook Air M2 13"'];
