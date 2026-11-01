// Brand details live here so the name, contact info and shipping rules
// can be changed in one place.
export const site = {
  name: "Tharikaa Little Flames",
  tagline: "Small Flames, Big Happiness",
  description:
    "Handmade candles by Tharikaa Little Flames. Shop tea lights, bubble candles, jars, flower and shape candles, or design your own custom candle.",
  logo: "/logo.jpg",
  // Add the shop's real address here to show it in the footer and contact page.
  email: null as string | null,
  phone: "+91 98765 43210",
  whatsapp: "919876543210",
  instagram: "https://instagram.com/",
  city: "Chennai, Tamil Nadu",
  year: 2026,
  shipping: {
    freeAbove: 999,
    flatRate: 79,
  },
  /** Added to a candle's price when it is scented. */
  scentedExtra: 20,
  /** Starting price of gift packing. Bigger orders are confirmed on WhatsApp. */
  giftPacking: 30,
  /** Most of one candle that can go in the bag at once. */
  maxPerItem: 50,
} as const;

export const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/custom", label: "Custom candles" },
  { href: "/#story", label: "Our story" },
  { href: "/contact", label: "Contact" },
] as const;
