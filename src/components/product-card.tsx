import Link from "next/link";
import { CandleArt } from "@/components/candle-art";
import { QuickAddButton } from "@/components/quick-add-button";
import { Stars } from "@/components/ui";
import { getCategory, startingPrice } from "@/data/catalog";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const category = getCategory(product.categorySlug);
  const hasOptions = product.sizes.length > 1;

  return (
    <article className="group flex flex-col">
      <Link
        href={`/products/${product.slug}`}
        prefetch
        className="relative block aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] transition duration-300 group-hover:shadow-lift"
        style={{ background: category?.tint }}
      >
        {product.badge && (
          <span className="absolute top-4 left-4 z-10 rounded-full bg-cream/90 px-3 py-1 text-[11px] font-medium tracking-wide text-cocoa backdrop-blur">
            {product.badge}
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white/0 via-white/0 to-white/40" />
        <CandleArt
          art={product.art}
          className="absolute inset-x-[12%] bottom-[6%] transition duration-500 group-hover:-translate-y-1 group-hover:scale-[1.03]"
        />
      </Link>

      <div className="mt-4 flex flex-1 flex-col">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-mocha/80">{category?.name}</p>
            <h3 className="mt-1 font-display text-lg leading-tight font-medium text-cocoa sm:text-xl">
              <Link href={`/products/${product.slug}`} className="hover:text-ember">
                {product.name}
              </Link>
            </h3>
          </div>
          <div className="flex items-baseline gap-2 sm:block sm:text-right">
            <p className="text-sm font-medium text-cocoa">
              {hasOptions && <span className="text-xs font-normal text-mocha">from </span>}
              {formatPrice(startingPrice(product))}
            </p>
            {product.compareAtPrice && (
              <p className="text-xs text-mocha/70 line-through">{formatPrice(product.compareAtPrice)}</p>
            )}
          </div>
        </div>
        <p className="mt-1.5 hidden text-sm text-mocha sm:block">{product.shortDescription}</p>
        <div className="mt-2 flex items-center gap-2 text-xs text-mocha">
          <Stars rating={product.rating} />
          <span>({product.reviewCount})</span>
        </div>
        <div className="mt-4">
          {hasOptions ? (
            <Link
              href={`/products/${product.slug}`}
              className="inline-flex w-full items-center justify-center rounded-full border border-cocoa/20 py-2.5 text-sm text-cocoa transition hover:border-cocoa hover:bg-cocoa hover:text-cream"
            >
              Choose size
            </Link>
          ) : (
            <QuickAddButton productId={product.id} sizeId={product.sizes[0].id} />
          )}
        </div>
      </div>
    </article>
  );
}
