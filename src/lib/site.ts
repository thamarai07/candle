// Brand details live here so the name, contact info and shipping rules
// can be changed in one place.
export const site = {
  name: "Wick & Bloom",
  tagline: "Hand-poured candles, made to order",
  description:
    "Small-batch soy candles hand-poured in India. Shop scented jars, pillars, travel tins and gift sets, or design your own custom candle.",
  email: "hello@wickandbloom.in",
  phone: "+91 98765 43210",
  whatsapp: "919876543210",
  instagram: "https://instagram.com/",
  city: "Chennai, Tamil Nadu",
  year: 2026,
  shipping: {
    freeAbove: 999,
    flatRate: 79,
  },
} as const;

export const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/custom", label: "Custom candles" },
  { href: "/#story", label: "Our story" },
  { href: "/contact", label: "Contact" },
] as const;
