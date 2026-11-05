// The supplier price lists from GreenTech (iPhone, Samsung, Google Pixel), all UK used.
// One model per entry, one line per storage / SIM option. Each line becomes its own product
// with its own URL and server-side price. Newest first; this order is the display order.
// Prices vary by supplier and import region: update them here, then redeploy.
export type Brand = "iPhone" | "Samsung" | "Google Pixel";

/** [option label, price, overrides]. `to` makes it a price range (WhatsApp only, no online checkout). */
export type PriceLine = [label: string, price: number, extra?: { to?: number; id?: string }];
export type PhoneModel = { brand: Brand; model: string; name: string; lines: PriceLine[] };

const PS = "pSIM + eSIM";

const iphone = (model: string, name: string, lines: PriceLine[]): PhoneModel => ({ brand: "iPhone", model, name: `iPhone ${name}`, lines });
const samsung = (model: string, name: string, lines: PriceLine[]): PhoneModel => ({ brand: "Samsung", model, name: `Samsung Galaxy ${name}`, lines });
const pixel = (model: string, name: string, lines: PriceLine[]): PhoneModel => ({ brand: "Google Pixel", model, name: `Google Pixel ${name}`, lines });

export const phoneModels: PhoneModel[] = [
  iphone("iphone-17-pro-max", "17 Pro Max", [["256GB · eSIM", 1600000]]),
  iphone("iphone-17-pro", "17 Pro", [["256GB · eSIM", 1450000], [`256GB · ${PS}`, 1600000]]),
  iphone("iphone-17", "17", [[`256GB · ${PS}`, 1090000]]),
  iphone("iphone-air", "Air", [
    ["256GB · eSIM locked · Black", 800000],
    ["256GB · eSIM locked · Other colours", 830000],
    ["256GB · eSIM unlocked · Black", 1090000],
    ["256GB · eSIM unlocked · Other colours", 1100000],
  ]),
  iphone("iphone-16-plus", "16 Plus", [["128GB · eSIM", 900000], [`128GB · ${PS}`, 970000], [`256GB · ${PS}`, 1070000]]),
  iphone("iphone-16", "16", [["128GB · eSIM", 800000], [`128GB · ${PS}`, 870000], [`256GB · ${PS}`, 970000]]),
  iphone("iphone-15-pro-max", "15 Pro Max", [[`256GB · ${PS}`, 1000000], [`512GB · ${PS}`, 1050000]]),
  iphone("iphone-15-pro", "15 Pro", [["128GB · eSIM", 750000], [`128GB · ${PS}`, 810000], [`256GB · ${PS}`, 890000]]),
  iphone("iphone-15-plus", "15 Plus", [[`128GB · ${PS}`, 700000], [`256GB · ${PS}`, 760000]]),
  iphone("iphone-15", "15", [[`128GB · ${PS}`, 550000]]),
  iphone("iphone-14-pro-max", "14 Pro Max", [[`128GB · ${PS}`, 780000, { id: "iphone-14-pro-max-128gb" }]]),
  iphone("iphone-14-pro", "14 Pro", [["128GB · eSIM", 620000], [`128GB · ${PS}`, 680000], [`256GB · ${PS}`, 730000]]),
  iphone("iphone-14-plus", "14 Plus", [[`128GB · ${PS}`, 530000]]),
  iphone("iphone-14", "14", [["128GB · eSIM", 450000], [`128GB · ${PS}`, 450000], [`256GB · ${PS}`, 490000]]),
  iphone("iphone-13", "13", [["128GB", 400000], ["256GB", 440000]]),
  iphone("iphone-12-pro-max", "12 Pro Max", [["128GB", 450000], ["256GB", 490000]]),
  iphone("iphone-12-pro", "12 Pro", [["128GB", 390000], ["256GB", 430000]]),
  iphone("iphone-12", "12", [["64GB", 290000], ["128GB", 320000], ["256GB", 350000]]),
  iphone("iphone-11-pro-max", "11 Pro Max", [["256GB", 380000]]),
  iphone("iphone-11", "11", [["64GB", 260000], ["128GB", 300000]]),
  iphone("iphone-xr", "XR", [["64GB", 230000], ["128GB", 250000]]),
  iphone("iphone-se-2", "SE (2nd gen)", [["", 160000]]),
  iphone("iphone-7", "7", [["32GB", 100000], ["128GB", 120000]]),

  samsung("galaxy-s26-ultra", "S26 Ultra", [["256GB", 1220000], ["512GB", 1500000]]),
  samsung("galaxy-s26-plus", "S26+", [["256GB", 1000000]]),
  samsung("galaxy-s25-ultra", "S25 Ultra", [["256GB", 1120000], ["512GB", 1200000]]),
  samsung("galaxy-s25-plus", "S25+", [["256GB", 850000]]),
  samsung("galaxy-s25", "S25", [["256GB", 750000]]),
  samsung("galaxy-s24-ultra", "S24 Ultra", [["256GB", 870000, { id: "galaxy-s24-ultra" }], ["256GB · Dual SIM", 900000], ["512GB", 950000]]),
  samsung("galaxy-s24-plus", "S24+", [["256GB", 630000]]),
  samsung("galaxy-s24", "S24", [["128GB", 550000], ["256GB", 590000]]),
  samsung("galaxy-s23-ultra", "S23 Ultra", [["256GB", 650000], ["256GB · Dual SIM", 680000], ["512GB", 740000], ["512GB · Dual SIM", 770000]]),
  samsung("galaxy-s23-plus", "S23+", [["256GB", 480000], ["256GB · 2 SIM", 500000], ["512GB", 530000]]),
  samsung("galaxy-s23", "S23", [["128GB · eSIM", 400000], ["256GB · eSIM", 450000]]),
  samsung("galaxy-s22-ultra", "S22 Ultra", [["128GB · 1 SIM + eSIM", 490000], ["256GB · 1 SIM + eSIM", 550000], ["512GB + eSIM", 580000]]),
  samsung("galaxy-s22-plus", "S22+", [["128GB", 330000], ["256GB · 2 SIM", 360000]]),
  samsung("galaxy-s22", "S22", [["128GB", 320000], ["256GB", 340000]]),
  samsung("galaxy-s21-ultra", "S21 Ultra", [["128GB", 400000], ["256GB + eSIM", 420000]]),
  samsung("galaxy-s21-plus", "S21+", [["128GB", 280000], ["256GB", 290000]]),
  samsung("galaxy-s21-fe", "S21 FE", [["1 SIM", 250000]]),
  samsung("galaxy-s21", "S21", [["128GB", 260000], ["256GB", 270000]]),
  samsung("galaxy-s20-ultra", "S20 Ultra", [["128GB", 300000], ["256GB", 320000]]),
  samsung("galaxy-s20-plus", "S20+", [["", 250000], ["Dual SIM", 260000]]),
  samsung("galaxy-s20-fe", "S20 FE", [["", 210000]]),
  samsung("galaxy-s20", "S20", [["", 240000], ["Dual SIM", 250000]]),
  samsung("galaxy-s10-plus", "S10+", [["", 280000]]),
  samsung("galaxy-s10", "S10", [["", 250000], ["Dual SIM", 260000]]),
  samsung("galaxy-s10e", "S10e", [["", 200000]]),
  samsung("galaxy-s9-plus", "S9+", [["", 190000]]),
  samsung("galaxy-s9", "S9", [["", 180000]]),
  samsung("galaxy-s8-plus", "S8+", [["", 180000]]),
  samsung("galaxy-s8", "S8", [["", 150000]]),

  samsung("galaxy-note-20-ultra", "Note 20 Ultra", [["", 380000], ["256GB", 400000], ["256GB · Dual SIM", 440000]]),
  samsung("galaxy-note-20", "Note 20", [["256GB · Original pen", 270000]]),
  samsung("galaxy-note-10-plus", "Note 10+", [["Original pen", 330000]]),
  samsung("galaxy-note-10", "Note 10", [["Original pen", 210000, { to: 250000 }]]),
  samsung("galaxy-note-9", "Note 9", [["", 158000, { to: 220000 }]]),
  samsung("galaxy-note-8", "Note 8", [["", 143000, { to: 190000 }]]),

  samsung("galaxy-z-fold-7", "Z Fold 7", [["256GB", 1350000], ["512GB", 1370000]]),
  samsung("galaxy-z-fold-6", "Z Fold 6", [["256GB", 1050000], ["512GB", 1070000]]),
  samsung("galaxy-z-fold-5", "Z Fold 5", [["256GB", 750000], ["512GB", 780000]]),
  samsung("galaxy-z-fold-4", "Z Fold 4", [["256GB", 600000], ["512GB", 620000]]),
  samsung("galaxy-z-fold-3", "Z Fold 3", [["256GB", 530000], ["512GB", 550000]]),
  samsung("galaxy-z-flip-6", "Z Flip 6", [["256GB", 490000], ["512GB", 510000]]),
  samsung("galaxy-z-flip-5", "Z Flip 5", [["256GB", 400000], ["512GB", 420000]]),
  samsung("galaxy-z-flip-4", "Z Flip 4", [["128GB", 320000], ["256GB", 330000]]),
  samsung("galaxy-z-flip-3", "Z Flip 3", [["128GB", 290000], ["256GB", 300000]]),

  pixel("pixel-10-pro-xl", "10 Pro XL", [["256GB · eSIM", 1000000]]),
  pixel("pixel-10-pro", "10 Pro", [["256GB · eSIM", 900000]]),
  pixel("pixel-10", "10", [["128GB · eSIM", 700000]]),
  pixel("pixel-9-pro-xl", "9 Pro XL", [["128GB", 720000], ["256GB", 790000]]),
  pixel("pixel-9-pro", "9 Pro", [["128GB", 680000], ["256GB", 750000]]),
  pixel("pixel-9", "9", [["128GB", 590000]]),
  pixel("pixel-8-pro", "8 Pro", [["128GB", 480000]]),
  pixel("pixel-8", "8", [["128GB", 350000]]),
  pixel("pixel-7-pro", "7 Pro", [["128GB", 400000]]),
  pixel("pixel-7", "7", [["128GB", 320000]]),
  pixel("pixel-6-pro", "6 Pro", [["128GB", 320000]]),
  pixel("pixel-6", "6", [["256GB", 280000]]),
];
