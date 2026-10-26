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
  vessel: [
    { id: "glass-jar", label: "Glass jar", detail: "200g", price: 549, shape: "jar" },
    { id: "amber-tumbler", label: "Amber tumbler", detail: "220g", price: 649, shape: "tumbler" },
    { id: "travel-tin", label: "Travel tin", detail: "80g", price: 249, shape: "tin" },
    { id: "bubble", label: "Bubble cube", detail: "180g", price: 379, shape: "bubble" },
    { id: "brass-bowl", label: "Brass bowl", detail: "300g", price: 999, shape: "bowl" },
  ],
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
