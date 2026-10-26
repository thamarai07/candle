export type VesselShape =
  | "jar"
  | "tumbler"
  | "tin"
  | "pillar"
  | "bubble"
  | "bowl"
  | "set";

export type Category = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  /** Soft background tint used on category cards. */
  tint: string;
};

export type ProductSize = {
  id: string;
  label: string;
  price: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  categorySlug: string;
  shortDescription: string;
  description: string;
  sizes: ProductSize[];
  compareAtPrice?: number;
  notes: { top: string; heart: string; base: string };
  burnTime: string;
  wax: string;
  badge?: string;
  featured?: boolean;
  rating: number;
  reviewCount: number;
  /** Optional photo in /public. Falls back to the illustrated candle. */
  image?: string;
  art: {
    shape: VesselShape;
    wax: string;
    vessel: string;
    label?: string;
  };
};

export type CartItem = {
  productId: string;
  sizeId: string;
  quantity: number;
};
