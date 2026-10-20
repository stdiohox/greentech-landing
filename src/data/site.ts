// Every contact detail on the page comes from here. Taken from the previous
// site (stdiohox/greentech); change them in this one place.
export const site = {
  name: "GreenTech Gadget Store",
  shortName: "GreenTech",
  tagline: "Everywhere Green",
  url: "https://greentech-landing.vercel.app",
  phoneDisplay: "0903 235 9726",
  phoneTel: "+2349032359726",
  whatsapp: "2349032359726",
  address: "Computer Village, Ikeja, Lagos",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Computer+Village+Ikeja+Lagos",
  hours: "Mon–Sat · 8am–8pm",
  instagram: { handle: "@greentechgadgetstore", url: "https://www.instagram.com/greentechgadgetstore" },
  x: { handle: "@abarigreen", url: "https://x.com/abarigreen" },
} as const;

export const waLink = (message: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

export const naira = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;
export const amount = (n: number) => n.toLocaleString("en-NG");
