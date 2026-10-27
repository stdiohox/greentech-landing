// Product detail content, keyed by product id (see products.ts).
// Specs are the manufacturer's published figures for the model, not measurements of a
// particular unit. Where we aren't sure of a figure we leave it out rather than guess;
// the page tells buyers to ask about anything not listed.

export type SpecGroup = { title: string; rows: [label: string, value: string][] };
export type ProductDetail = { summary: string; highlights: string[]; specs: SpecGroup[]; partial?: boolean };

export const details: Record<string, ProductDetail> = {
  "iphone-14-pro-max-128gb": {
    summary: "Apple's 2022 flagship, with the Dynamic Island, an always-on ProMotion display and a 48MP main camera.",
    highlights: ["48MP Pro camera system", "Dynamic Island", "Always-on ProMotion display"],
    specs: [
      { title: "Display", rows: [["Size", '6.7" Super Retina XDR (OLED)'], ["Refresh rate", "ProMotion, up to 120Hz"], ["Always-on", "Yes"]] },
      { title: "Performance", rows: [["Chip", "A16 Bionic"], ["Storage", "128GB"]] },
      { title: "Cameras", rows: [["Rear", "48MP Main, 12MP Ultra Wide, 12MP 3x Telephoto"], ["Front", "12MP TrueDepth"]] },
      { title: "Battery & charging", rows: [["Video playback", "Up to 29 hours"], ["Port", "Lightning"]] },
      { title: "Build & connectivity", rows: [["Network", "5G"], ["Security", "Face ID"], ["Water resistance", "IP68"], ["Released", "2022"]] },
    ],
  },
  "iphone-13-128gb": {
    summary: "A dependable everyday iPhone with a bright OLED display, the A15 Bionic chip and dual 12MP cameras.",
    highlights: ["A15 Bionic", "Dual 12MP cameras", "5G"],
    specs: [
      { title: "Display", rows: [["Size", '6.1" Super Retina XDR (OLED)']] },
      { title: "Performance", rows: [["Chip", "A15 Bionic"], ["Storage", "128GB"]] },
      { title: "Cameras", rows: [["Rear", "12MP Wide, 12MP Ultra Wide"], ["Front", "12MP TrueDepth"]] },
      { title: "Battery & charging", rows: [["Video playback", "Up to 19 hours"], ["Port", "Lightning"]] },
      { title: "Build & connectivity", rows: [["Network", "5G"], ["Security", "Face ID"], ["Water resistance", "IP68"], ["Released", "2021"]] },
    ],
  },
  "galaxy-s24-ultra": {
    summary: "Samsung's 2024 flagship with a titanium frame, a built-in S Pen and a 200MP main camera.",
    highlights: ["200MP main camera", "Built-in S Pen", "Snapdragon 8 Gen 3 for Galaxy"],
    specs: [
      { title: "Display", rows: [["Size", '6.8" QHD+ Dynamic AMOLED 2X'], ["Refresh rate", "Up to 120Hz"]] },
      { title: "Performance", rows: [["Chip", "Snapdragon 8 Gen 3 for Galaxy"], ["RAM", "12GB"], ["Storage", "Ask us which capacity this unit has"]] },
      { title: "Cameras", rows: [["Rear", "200MP Wide, 12MP Ultra Wide, 50MP 5x Telephoto, 10MP 3x Telephoto"], ["Front", "12MP"]] },
      { title: "Battery & charging", rows: [["Battery", "5,000mAh"], ["Wired charging", "Up to 45W"], ["Port", "USB-C"]] },
      { title: "Build & connectivity", rows: [["Frame", "Titanium"], ["S Pen", "Built in"], ["Network", "5G"], ["Water resistance", "IP68"], ["Released", "2024"]] },
    ],
  },
  "pixel-9-128gb": {
    summary: "Google's 2024 Pixel with the Tensor G4 chip, a 120Hz Actua display and Google's best camera software.",
    highlights: ["Tensor G4", "50MP + 48MP cameras", "7 years of OS updates"],
    specs: [
      { title: "Display", rows: [["Size", '6.3" Actua (OLED)'], ["Refresh rate", "Up to 120Hz"]] },
      { title: "Performance", rows: [["Chip", "Google Tensor G4"], ["RAM", "12GB"], ["Storage", "128GB"]] },
      { title: "Cameras", rows: [["Rear", "50MP Wide, 48MP Ultra Wide"], ["Front", "10.5MP"]] },
      { title: "Battery & charging", rows: [["Battery", "4,700mAh"], ["Port", "USB-C"]] },
      { title: "Build & connectivity", rows: [["Network", "5G"], ["Water resistance", "IP68"], ["Software updates", "7 years of OS and security updates"], ["Released", "2024"]] },
    ],
  },
  "galaxy-a56-5g": {
    summary: "A mid-range Samsung that punches up: a large 120Hz AMOLED screen, 50MP camera and fast 45W charging.",
    highlights: ["6.7\" 120Hz AMOLED", "50MP main camera", "45W fast charging"],
    specs: [
      { title: "Display", rows: [["Size", '6.7" Super AMOLED'], ["Refresh rate", "Up to 120Hz"]] },
      { title: "Performance", rows: [["Chip", "Exynos 1580"], ["RAM", "8GB"], ["Storage", "256GB"]] },
      { title: "Cameras", rows: [["Rear", "50MP Main, 12MP Ultra Wide, 5MP Macro"], ["Front", "12MP"]] },
      { title: "Battery & charging", rows: [["Battery", "5,000mAh"], ["Wired charging", "Up to 45W"], ["Port", "USB-C"]] },
      { title: "Build & connectivity", rows: [["Network", "5G"], ["Water resistance", "IP67"], ["Released", "2025"]] },
    ],
  },
  "tecno-camon-40-pro": {
    summary: "Tecno's camera-focused 5G phone with a curved-edge AMOLED display and a 50MP main camera.",
    highlights: ["50MP camera", '6.78" AMOLED', "5G"],
    partial: true,
    specs: [
      { title: "Display", rows: [["Size", '6.78" AMOLED']] },
      { title: "Performance", rows: [["Storage", "256GB"]] },
      { title: "Cameras", rows: [["Main", "50MP"]] },
      { title: "Connectivity", rows: [["Network", "5G"]] },
    ],
  },
  "macbook-air-m2": {
    summary: "Apple's redesigned thin-and-light laptop: the M2 chip, a 13.6\" Liquid Retina display and all-day battery.",
    highlights: ["Apple M2 chip", "Up to 18 hours battery", "MagSafe charging"],
    specs: [
      { title: "Display", rows: [["Size", '13.6" Liquid Retina'], ["Resolution", "2560 × 1664"]] },
      { title: "Performance", rows: [["Chip", "Apple M2, 8-core CPU, 8-core GPU"], ["Memory", "8GB unified memory"], ["Storage", "256GB SSD"]] },
      { title: "Battery & charging", rows: [["Battery life", "Up to 18 hours video playback"], ["Charging", "MagSafe 3"]] },
      { title: "Ports & build", rows: [["Ports", "2 × Thunderbolt / USB 4, MagSafe 3, headphone jack"], ["Camera", "1080p FaceTime HD"], ["Security", "Touch ID"], ["Weight", "1.24 kg"], ["Released", "2022"]] },
    ],
  },
  "hp-elitebook-840-g6": {
    summary: "A business-class 14\" laptop built for work: a Core i7, 16GB of RAM and a fast 512GB SSD.",
    highlights: ["Intel Core i7 (8th Gen)", "16GB RAM", "512GB SSD"],
    partial: true,
    specs: [
      { title: "Display", rows: [["Size", '14"']] },
      { title: "Performance", rows: [["Processor", "Intel Core i7, 8th Gen"], ["Memory", "16GB"], ["Storage", "512GB SSD"]] },
      { title: "Build", rows: [["Class", "Business laptop (HP EliteBook)"]] },
    ],
  },
  "thinkpad-t490": {
    summary: "Lenovo's workhorse business laptop, with the classic ThinkPad keyboard and TrackPoint.",
    highlights: ["Intel Core i7 (8th Gen)", "16GB RAM", "ThinkPad keyboard + TrackPoint"],
    specs: [
      { title: "Display", rows: [["Size", '14"']] },
      { title: "Performance", rows: [["Processor", "Intel Core i7, 8th Gen"], ["Memory", "16GB"], ["Storage", "256GB SSD"]] },
      { title: "Ports & build", rows: [["Ports", "USB-C (Thunderbolt 3), 2 × USB-A, HDMI"], ["Keyboard", "ThinkPad keyboard with TrackPoint"], ["Released", "2019"]] },
    ],
  },
  "dell-latitude-5400": {
    summary: "A sturdy 14\" Dell business laptop that handles everyday office work and study comfortably.",
    highlights: ["Intel Core i5 (8th Gen)", "8GB RAM", "256GB SSD"],
    specs: [
      { title: "Display", rows: [["Size", '14"']] },
      { title: "Performance", rows: [["Processor", "Intel Core i5, 8th Gen"], ["Memory", "8GB"], ["Storage", "256GB SSD"], ["Graphics", "Intel UHD Graphics 620"]] },
      { title: "Build", rows: [["Class", "Business laptop (Dell Latitude)"], ["Released", "2019"]] },
    ],
  },
  "ps5-disc": {
    summary: "Sony's current-generation console with an Ultra HD Blu-ray drive, ultra-fast SSD and the DualSense controller.",
    highlights: ["4K gaming, up to 120fps", "Ultra HD Blu-ray drive", "DualSense controller"],
    specs: [
      { title: "Performance", rows: [["Storage", "825GB custom SSD"], ["Output", "Up to 4K, up to 120fps"], ["Ray tracing", "Yes"]] },
      { title: "Media", rows: [["Disc drive", "Ultra HD Blu-ray"]] },
      { title: "In use", rows: [["Controller", "DualSense wireless controller"], ["Backwards compatible", "Plays most PS4 games"], ["Connectivity", "HDMI 2.1, Wi-Fi 6, Bluetooth"]] },
    ],
  },
  "xbox-series-s": {
    summary: "Microsoft's compact all-digital next-gen console: fast loading, Quick Resume and up to 120fps.",
    highlights: ["Up to 1440p at 120fps", "512GB SSD", "All-digital"],
    specs: [
      { title: "Performance", rows: [["Storage", "512GB SSD"], ["Output", "Up to 1440p at up to 120fps; 4K upscaling for media"]] },
      { title: "Media", rows: [["Disc drive", "None (all-digital)"]] },
      { title: "In use", rows: [["Controller", "Xbox Wireless Controller"], ["Features", "Quick Resume, Game Pass ready"]] },
    ],
  },
  "switch-oled": {
    summary: "The Switch with a vivid 7\" OLED screen, a wide adjustable stand and double the storage of the original.",
    highlights: ['7" OLED screen', "64GB storage", "Play on TV, tabletop or handheld"],
    specs: [
      { title: "Display", rows: [["Screen", '7" OLED']] },
      { title: "Storage", rows: [["Internal", "64GB, expandable with microSD"]] },
      { title: "In use", rows: [["Modes", "TV, tabletop, handheld"], ["Stand", "Wide adjustable stand"], ["Dock", "Includes wired LAN port"], ["Battery", "About 4.5 to 9 hours, depending on the game"]] },
    ],
  },
  "airpods-pro-2": {
    summary: "Apple's noise-cancelling earbuds with the H2 chip, Adaptive Transparency and a USB-C charging case.",
    highlights: ["Active Noise Cancellation", "H2 chip", "USB-C case"],
    specs: [
      { title: "Sound", rows: [["Noise control", "Active Noise Cancellation, Adaptive Transparency"], ["Audio", "Personalised Spatial Audio"], ["Chip", "Apple H2"]] },
      { title: "Battery", rows: [["Listening", "Up to 6 hours (noise cancellation on)"], ["With case", "Up to 30 hours"], ["Case port", "USB-C"]] },
      { title: "Build", rows: [["Dust & water resistance", "IP54 (earbuds and case)"], ["Find My", "Yes, with speaker in case"]] },
    ],
  },
  "jbl-charge-5": {
    summary: "A rugged, waterproof portable speaker that doubles as a power bank for your phone.",
    highlights: ["Up to 20 hours playtime", "IP67 waterproof", "Built-in power bank"],
    specs: [
      { title: "Battery", rows: [["Playtime", "Up to 20 hours"], ["Power bank", "Charges your phone over USB"], ["Charging port", "USB-C"]] },
      { title: "Build", rows: [["Dust & water resistance", "IP67"]] },
      { title: "Connectivity", rows: [["Wireless", "Bluetooth"], ["Multi-speaker", "JBL PartyBoost"]] },
    ],
  },
  "bose-soundlink-flex": {
    summary: "A compact Bose speaker with big, clear sound that's dustproof, waterproof and even floats.",
    highlights: ["Up to 12 hours playtime", "IP67, and it floats", "PositionIQ sound tuning"],
    specs: [
      { title: "Battery", rows: [["Playtime", "Up to 12 hours"], ["Charging port", "USB-C"]] },
      { title: "Sound", rows: [["Tuning", "PositionIQ adjusts to how the speaker is placed"], ["Microphone", "Yes, for calls"]] },
      { title: "Build", rows: [["Dust & water resistance", "IP67, floats in water"], ["Wireless", "Bluetooth"]] },
    ],
  },
};
