import { products, startingPrice } from "@/data/catalog";

// Options for the custom candle builder. Prices are per candle; the final
// quote is confirmed with the customer on WhatsApp.
export const customOptions = {
  occasion: [
    { id: "wedding", label: "Wedding favours" },
    { id: "birthday", label: "Birthday" },
    { id: "baby", label: "Baby shower / naming" },
    { id: "corporate", label: "Corporate gifting" },
    { id: "festival", label: "Festival" },
    { id: "personal", label: "Just for me" },
  ],
  // Every candle in the shop can be customised, at its unscented list price.
  vessel: products.map((p) => ({
    id: p.id,
    label: p.name.replace(/ Candle$/, ""),
    price: startingPrice(p),
    shape: p.art.shape,
    scale: p.art.scale,
  })),
  scent: [
    { id: "vanilla-sandalwood", label: "Vanilla Sandalwood" },
    { id: "jasmine", label: "Jasmine Night" },
    { id: "rose", label: "Rose & Lychee" },
    { id: "lavender", label: "Lavender Calm" },
    { id: "lemongrass", label: "Lemongrass & Ginger" },
    { id: "coffee", label: "Filter Coffee" },
    { id: "chai", label: "Masala Chai" },
    { id: "unscented", label: "Unscented" },
  ],
  waxColor: [
    { id: "ivory", label: "Ivory", hex: "#f6eedf" },
    { id: "blush", label: "Blush", hex: "#ecc3b4" },
    { id: "sage", label: "Sage", hex: "#b9c4a8" },
    { id: "lilac", label: "Lilac", hex: "#d9cde6" },
    { id: "butter", label: "Butter", hex: "#f2e2a8" },
    { id: "terracotta", label: "Terracotta", hex: "#cf8a68" },
    { id: "mocha", label: "Mocha", hex: "#a98468" },
  ],
} as const;

export function customVessel(id: string) {
  return customOptions.vessel.find((v) => v.id === id);
}

export function customWax(id: string) {
  return customOptions.waxColor.find((w) => w.id === id);
}
