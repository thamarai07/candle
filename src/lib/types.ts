export type VesselShape =
  | "tealight"
  | "bubble"
  | "jar"
  | "daisy"
  | "rose"
  | "lotus"
  | "tulip"
  | "heart"
  | "square"
  | "star";

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
  badge?: string;
  featured?: boolean;
  /** Optional photo in /public. Falls back to the illustrated candle. */
  image?: string;
  art: {
    shape: VesselShape;
    wax: string;
    /** Glass tint, used by jars. */
    vessel?: string;
    label?: string;
    /** Draws the candle smaller, for mini and small sizes. */
    scale?: number;
  };
};

export type CartItem = {
  productId: string;
  sizeId: string;
  quantity: number;
};
