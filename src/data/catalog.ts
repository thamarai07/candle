import type { Category, Product } from "@/lib/types";

// To add a new category: add an entry here, then add products with a
// matching `categorySlug`. Shop filters, category pages and the home page
// pick it up automatically.
export const categories: Category[] = [
  {
    slug: "jar-candles",
    name: "Jar Candles",
    tagline: "Everyday glow",
    description:
      "Our signature soy candles in reusable glass jars, poured in small batches with clean-burning cotton wicks.",
    tint: "#f1e4d4",
  },
  {
    slug: "pillar-candles",
    name: "Pillar Candles",
    tagline: "Sculpted & sculptural",
    description:
      "Free-standing pillars and shaped candles that look as good unlit on a shelf as they do glowing on a table.",
    tint: "#ecd2c4",
  },
  {
    slug: "travel-tins",
    name: "Travel Tins",
    tagline: "Small, mighty, portable",
    description:
      "Compact tins with lids. Perfect for desks, bedside tables, travel and first-time scent trials.",
    tint: "#dfe5d6",
  },
  {
    slug: "gift-sets",
    name: "Gift Sets",
    tagline: "Ready to give",
    description:
      "Curated boxes wrapped with a handwritten note. Birthdays, housewarmings, thank-yous, just because.",
    tint: "#efe0c6",
  },
  {
    slug: "festive",
    name: "Festive Edit",
    tagline: "Diwali & celebrations",
    description:
      "Warm, spiced and floral scents for festivals and celebrations, in brass-toned vessels made for gifting.",
    tint: "#f3dcc2",
  },
];

export const products: Product[] = [
  {
    id: "p-001",
    slug: "vanilla-sandalwood-jar",
    name: "Vanilla Sandalwood",
    categorySlug: "jar-candles",
    shortDescription: "Creamy vanilla over Mysore sandalwood.",
    description:
      "A soft, comforting blend that makes any room feel like a slow Sunday. Bourbon vanilla and warm sandalwood, rounded off with a touch of tonka.",
    sizes: [
      { id: "s", label: "Small · 120g", price: 449 },
      { id: "m", label: "Medium · 200g", price: 649 },
      { id: "l", label: "Large · 350g", price: 949 },
    ],
    notes: { top: "Bourbon vanilla", heart: "Sandalwood", base: "Tonka bean" },
    burnTime: "25–60 hours",
    wax: "100% soy wax",
    badge: "Bestseller",
    featured: true,
    rating: 4.9,
    reviewCount: 128,
    art: { shape: "jar", wax: "#f3e6d1", vessel: "#e9dccb", label: "No. 01" },
  },
  {
    id: "p-002",
    slug: "jasmine-night-jar",
    name: "Jasmine Night",
    categorySlug: "jar-candles",
    shortDescription: "Fresh malli poo with soft musk.",
    description:
      "Inspired by jasmine strings on a warm evening. Heady white florals balanced by green leaves and a clean musk base.",
    sizes: [
      { id: "s", label: "Small · 120g", price: 449 },
      { id: "m", label: "Medium · 200g", price: 649 },
      { id: "l", label: "Large · 350g", price: 949 },
    ],
    notes: { top: "Green leaf", heart: "Jasmine sambac", base: "White musk" },
    burnTime: "25–60 hours",
    wax: "100% soy wax",
    featured: true,
    rating: 4.8,
    reviewCount: 94,
    art: { shape: "jar", wax: "#fbf7ee", vessel: "#dfe5d6", label: "No. 02" },
  },
  {
    id: "p-003",
    slug: "coffee-cardamom-tumbler",
    name: "Filter Coffee & Cardamom",
    categorySlug: "jar-candles",
    shortDescription: "Morning decoction with a pinch of elaichi.",
    description:
      "Roasted coffee, green cardamom and a little brown sugar, poured into an amber tumbler you'll want to keep long after the candle is done.",
    sizes: [
      { id: "m", label: "Tumbler · 220g", price: 699 },
    ],
    compareAtPrice: 799,
    notes: { top: "Cardamom", heart: "Roasted coffee", base: "Brown sugar" },
    burnTime: "45 hours",
    wax: "Soy & coconut blend",
    badge: "New",
    featured: true,
    rating: 4.7,
    reviewCount: 41,
    art: { shape: "tumbler", wax: "#d9bf9f", vessel: "#a8693e" },
  },
  {
    id: "p-004",
    slug: "rose-bubble-pillar",
    name: "Rose Bubble",
    categorySlug: "pillar-candles",
    shortDescription: "Sculpted bubble candle in dusty rose.",
    description:
      "Our most-photographed candle. A soft bubble cube in dusty rose with a light rose-and-lychee scent. Beautiful lit or unlit.",
    sizes: [{ id: "one", label: "One size · 180g", price: 399 }],
    notes: { top: "Lychee", heart: "Damask rose", base: "Cedar" },
    burnTime: "18 hours",
    wax: "Soy & rapeseed blend",
    badge: "Bestseller",
    featured: true,
    rating: 4.9,
    reviewCount: 210,
    art: { shape: "bubble", wax: "#e7b9a9", vessel: "#e7b9a9" },
  },
  {
    id: "p-005",
    slug: "sage-ribbed-pillar",
    name: "Sage Ribbed Pillar",
    categorySlug: "pillar-candles",
    shortDescription: "Unscented ribbed pillar in muted sage.",
    description:
      "A tall ribbed pillar in muted sage. Unscented, so it sits easily on dining tables and beside food.",
    sizes: [
      { id: "s", label: "Short · 10cm", price: 349 },
      { id: "l", label: "Tall · 15cm", price: 499 },
    ],
    notes: { top: "Unscented", heart: "Unscented", base: "Unscented" },
    burnTime: "30–45 hours",
    wax: "Soy & rapeseed blend",
    rating: 4.6,
    reviewCount: 37,
    art: { shape: "pillar", wax: "#b9c4a8", vessel: "#b9c4a8" },
  },
  {
    id: "p-006",
    slug: "lemongrass-tin",
    name: "Lemongrass & Ginger",
    categorySlug: "travel-tins",
    shortDescription: "Zesty, bright and clean.",
    description:
      "A bright, uplifting tin for desks and kitchens. Crushed lemongrass, fresh ginger and a light vetiver base.",
    sizes: [{ id: "one", label: "Tin · 80g", price: 299 }],
    notes: { top: "Lemongrass", heart: "Ginger", base: "Vetiver" },
    burnTime: "16 hours",
    wax: "100% soy wax",
    rating: 4.7,
    reviewCount: 66,
    art: { shape: "tin", wax: "#f2ecc9", vessel: "#c9c2b6" },
  },
  {
    id: "p-007",
    slug: "lavender-tin",
    name: "Lavender Calm",
    categorySlug: "travel-tins",
    shortDescription: "Bedtime lavender with chamomile.",
    description:
      "Our wind-down tin. French lavender and chamomile with a soft woody base. Light it 20 minutes before bed.",
    sizes: [{ id: "one", label: "Tin · 80g", price: 299 }],
    notes: { top: "Bergamot", heart: "Lavender", base: "Chamomile & cedar" },
    burnTime: "16 hours",
    wax: "100% soy wax",
    featured: true,
    rating: 4.8,
    reviewCount: 88,
    art: { shape: "tin", wax: "#e5dcef", vessel: "#c9c2b6" },
  },
  {
    id: "p-008",
    slug: "petrichor-tin",
    name: "First Rain",
    categorySlug: "travel-tins",
    shortDescription: "The smell of mann vaasanai.",
    description:
      "Wet earth after the first monsoon rain. Petrichor, green moss and a hint of clay.",
    sizes: [{ id: "one", label: "Tin · 80g", price: 299 }],
    notes: { top: "Ozone", heart: "Wet earth", base: "Moss & clay" },
    burnTime: "16 hours",
    wax: "100% soy wax",
    badge: "Limited",
    rating: 4.9,
    reviewCount: 52,
    art: { shape: "tin", wax: "#d8cfc2", vessel: "#c9c2b6" },
  },
  {
    id: "p-009",
    slug: "self-care-set",
    name: "Self-Care Trio",
    categorySlug: "gift-sets",
    shortDescription: "Three travel tins in a gift box.",
    description:
      "Lavender Calm, Jasmine Night and Vanilla Sandalwood tins in a kraft gift box with dried flowers and a handwritten note.",
    sizes: [{ id: "one", label: "Gift box · 3 × 80g", price: 849 }],
    compareAtPrice: 897,
    notes: { top: "Lavender", heart: "Jasmine", base: "Sandalwood" },
    burnTime: "48 hours total",
    wax: "100% soy wax",
    badge: "Gift ready",
    featured: true,
    rating: 5,
    reviewCount: 73,
    art: { shape: "set", wax: "#efe3cf", vessel: "#c9c2b6" },
  },
  {
    id: "p-010",
    slug: "housewarming-box",
    name: "Housewarming Box",
    categorySlug: "gift-sets",
    shortDescription: "A jar, a pillar and a match bottle.",
    description:
      "Everything for a new home: a medium Vanilla Sandalwood jar, a Rose Bubble candle and a glass bottle of long matches.",
    sizes: [{ id: "one", label: "Gift box", price: 1299 }],
    compareAtPrice: 1447,
    notes: { top: "Vanilla", heart: "Rose", base: "Sandalwood" },
    burnTime: "60+ hours total",
    wax: "Soy blend",
    rating: 4.9,
    reviewCount: 29,
    art: { shape: "set", wax: "#e7b9a9", vessel: "#e9dccb" },
  },
  {
    id: "p-011",
    slug: "diya-brass-bowl",
    name: "Deepam Brass Bowl",
    categorySlug: "festive",
    shortDescription: "Sandalwood & marigold in a brass-toned bowl.",
    description:
      "A wide brass-toned bowl with three wicks, scented with marigold, sandalwood and a little camphor. Made for festive evenings.",
    sizes: [{ id: "one", label: "Bowl · 300g", price: 1099 }],
    notes: { top: "Marigold", heart: "Sandalwood", base: "Camphor" },
    burnTime: "40 hours",
    wax: "Soy & coconut blend",
    badge: "Festive",
    featured: true,
    rating: 4.8,
    reviewCount: 46,
    art: { shape: "bowl", wax: "#f2d79b", vessel: "#c49a4f" },
  },
  {
    id: "p-012",
    slug: "spiced-chai-jar",
    name: "Masala Chai",
    categorySlug: "festive",
    shortDescription: "Clove, cinnamon and milky tea.",
    description:
      "Simmering chai with clove, cinnamon, ginger and a splash of milk. Cozy, nostalgic and very good for rainy evenings.",
    sizes: [
      { id: "s", label: "Small · 120g", price: 449 },
      { id: "m", label: "Medium · 200g", price: 649 },
    ],
    notes: { top: "Ginger & clove", heart: "Black tea", base: "Cinnamon & milk" },
    burnTime: "25–40 hours",
    wax: "100% soy wax",
    rating: 4.7,
    reviewCount: 58,
    art: { shape: "jar", wax: "#e3c7a2", vessel: "#c49a4f", label: "Chai" },
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string) {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(slug: string) {
  return products.filter((p) => p.categorySlug === slug);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}

export function startingPrice(product: Product) {
  return Math.min(...product.sizes.map((s) => s.price));
}
