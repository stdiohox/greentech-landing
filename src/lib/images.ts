// Product photos live in src/assets/products/<product id>.jpg. A product with no
// file shows a branded placeholder instead: never a photo of a different model.
import type { ImageMetadata } from "astro";

const files = import.meta.glob<ImageMetadata>("../assets/products/*.jpg", { eager: true, import: "default" });

const byId: Record<string, ImageMetadata> = {};
for (const [path, img] of Object.entries(files)) {
  const id = path.split("/").pop()!.replace(/\.jpg$/, "");
  byId[id] = img;
}

export const productImage = (id: string): ImageMetadata | undefined => byId[id];
