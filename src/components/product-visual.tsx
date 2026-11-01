import Image from "next/image";
import { CandleArt } from "@/components/candle-art";
import type { Product } from "@/lib/types";

// Shows the product's photo when it has one, otherwise the illustrated candle.
// The photo fills its parent, which must be `relative` with a set size.
export function ProductVisual({
  product,
  sizes,
  lit,
  preload,
  className = "",
}: {
  product: Product;
  /** How wide the photo appears on screen, so the right size is downloaded. */
  sizes: string;
  lit?: boolean;
  preload?: boolean;
  /** Positions the illustration. Photos always fill the parent. */
  className?: string;
}) {
  if (!product.image) {
    return <CandleArt art={product.art} lit={lit} className={className} />;
  }
  return (
    <Image
      src={product.image}
      alt={product.name}
      fill
      sizes={sizes}
      preload={preload}
      className="rounded-[inherit] object-cover transition duration-700 ease-out group-hover:scale-110"
    />
  );
}
