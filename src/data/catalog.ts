import { site } from "@/lib/site";
import type { Category, Product, ProductSize } from "@/lib/types";

// To add a new category: add an entry here, then add products with a
// matching `categorySlug`. Shop filters, category pages and the home page
// pick it up automatically.
export const categories: Category[] = [
  {
    slug: "tea-lights",
    name: "Tea Lights",
    tagline: "Tiny & sweet",
    description: "Little candles for diyas, table settings and quiet evenings.",
    tint: "#fff0c8",
  },
  {
    slug: "bubble-candles",
    name: "Bubble Candles",
    tagline: "Soft & squishy-looking",
    description: "Our playful bubble cubes, in mini and medium sizes.",
    tint: "#fbd3e4",
  },
  {
    slug: "jar-candles",
    name: "Jar Candles",
    tagline: "Everyday glow",
    description: "Classic candles poured into a jar, in small and medium sizes.",
    tint: "#ffe4cf",
  },
  {
    slug: "flower-candles",
    name: "Flower Candles",
    tagline: "Pretty in bloom",
    description: "Daisy, rose, lotus and tulip candles that look lovely even before they're lit.",
    tint: "#ebe0f8",
  },
  {
    slug: "shape-candles",
    name: "Shape Candles",
    tagline: "Fun shapes",
    description: "Heart, square and star candles for gifting and decorating.",
    tint: "#d6f1f7",
  },
];

// Each candle comes unscented at its list price, or scented for a little more.
function options(price: number): ProductSize[] {
  return [
    { id: "unscented", label: "Unscented", price },
    { id: "scented", label: "Scented", price: price + site.scentedExtra },
  ];
}

// Computer-generated images of each candle. To use a real photo instead, put it
// in public/products/ and replace the line with: image: "/products/rose.jpg",
function render(id: string) {
  return { image: `/products/${id}.jpg`, imageIsRender: true };
}

export const products: Product[] = [
  {
    id: "tea-light",
    slug: "tea-light-candle",
    name: "Tea Light Candle",
    categorySlug: "tea-lights",
    shortDescription: "A tiny candle with a warm little glow.",
    description:
      "Small enough to tuck in anywhere. Light a few together for a festive table, a pooja corner or a cosy evening.",
    sizes: options(20),
    ...render("tea-light"),
    featured: true,
    art: { shape: "tealight", wax: "#fff3dc" },
  },
  {
    id: "mini-bubble",
    slug: "mini-bubble-candle",
    name: "Mini Bubble Candle",
    categorySlug: "bubble-candles",
    shortDescription: "The cutest little bubble cube.",
    description:
      "A small bubble cube that brightens up a desk or a shelf, and makes a sweet return gift.",
    sizes: options(79),
    ...render("mini-bubble"),
    featured: true,
    art: { shape: "bubble", wax: "#f7a8c8", scale: 0.8 },
  },
  {
    id: "medium-bubble",
    slug: "medium-bubble-candle",
    name: "Medium Bubble Candle",
    categorySlug: "bubble-candles",
    shortDescription: "A bigger bubble cube to show off.",
    description:
      "Our bubble cube in a larger size, made to be noticed on a coffee table or bedside.",
    sizes: options(129),
    ...render("medium-bubble"),
    art: { shape: "bubble", wax: "#c9a9ee" },
  },
  {
    id: "small-jar",
    slug: "small-jar-candle",
    name: "Small Jar Candle",
    categorySlug: "jar-candles",
    shortDescription: "A simple candle in a small jar.",
    description:
      "An easy everyday candle in a small jar, just right for a first try or a small gift.",
    sizes: options(99),
    ...render("small-jar"),
    featured: true,
    art: { shape: "jar", wax: "#fde0cc", scale: 0.82 },
  },
  {
    id: "medium-jar",
    slug: "medium-jar-candle",
    name: "Medium Jar Candle",
    categorySlug: "jar-candles",
    shortDescription: "The classic jar candle, a size up.",
    description:
      "Our jar candle in a medium size, for the room you spend the most time in.",
    sizes: options(179),
    ...render("medium-jar"),
    featured: true,
    art: { shape: "jar", wax: "#fbd0dc" },
  },
  {
    id: "daisy",
    slug: "daisy-candle",
    name: "Daisy Candle",
    categorySlug: "flower-candles",
    shortDescription: "A cheerful daisy with a sunny centre.",
    description:
      "A happy little daisy that looks lovely on a tray, beside a photo frame or tucked into a gift box.",
    sizes: options(69),
    ...render("daisy"),
    featured: true,
    art: { shape: "daisy", wax: "#fffaf0" },
  },
  {
    id: "rose",
    slug: "rose-candle",
    name: "Rose Candle",
    categorySlug: "flower-candles",
    shortDescription: "Soft layered petals, shaped like a rose.",
    description:
      "A rose in full bloom, made for anniversaries, thank-yous and everything in between.",
    sizes: options(79),
    ...render("rose"),
    featured: true,
    art: { shape: "rose", wax: "#ef5b93" },
  },
  {
    id: "lotus",
    slug: "lotus-candle",
    name: "Lotus Candle",
    categorySlug: "flower-candles",
    shortDescription: "A graceful lotus for festive days.",
    description:
      "A lotus with gently opening petals. A beautiful choice for pooja, Diwali and festive gifting.",
    sizes: options(89),
    ...render("lotus"),
    featured: true,
    art: { shape: "lotus", wax: "#b79be6" },
  },
  {
    id: "tulip",
    slug: "tulip-candle",
    name: "Tulip Candle",
    categorySlug: "flower-candles",
    shortDescription: "A sweet tulip bud in candle form.",
    description:
      "A neat little tulip that adds a pop of colour to a shelf, a table or a gift box.",
    sizes: options(89),
    ...render("tulip"),
    art: { shape: "tulip", wax: "#f9a35c" },
  },
  {
    id: "heart",
    slug: "heart-candle",
    name: "Heart Candle",
    categorySlug: "shape-candles",
    shortDescription: "A little heart to give to someone you love.",
    description:
      "Made for birthdays, anniversaries and little surprises. Easy to love, easier to gift.",
    sizes: options(69),
    ...render("heart"),
    featured: true,
    art: { shape: "heart", wax: "#e8336f" },
  },
  {
    id: "square",
    slug: "square-candle",
    name: "Square Candle",
    categorySlug: "shape-candles",
    shortDescription: "A clean, modern block candle.",
    description:
      "A simple square block with neat edges. Stack a few on a tray for a modern look.",
    sizes: options(99),
    ...render("square"),
    art: { shape: "square", wax: "#7fd4dd" },
  },
  {
    id: "star",
    slug: "star-candle",
    name: "Star Candle",
    categorySlug: "shape-candles",
    shortDescription: "A bright little star for any celebration.",
    description:
      "A star-shaped candle for kids' parties, Christmas tables and anyone who deserves a gold star.",
    sizes: options(79),
    ...render("star"),
    art: { shape: "star", wax: "#f7c948" },
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
