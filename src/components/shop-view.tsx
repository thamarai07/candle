import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { Eyebrow } from "@/components/ui";
import { categories } from "@/data/catalog";
import type { Category, Product } from "@/lib/types";

export function ShopView({
  category,
  products,
}: {
  category?: Category;
  products: Product[];
}) {
  const pills = [{ slug: "", name: "All" }, ...categories];

  return (
    <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8 lg:pt-16">
      <nav aria-label="Breadcrumb" className="text-xs text-mocha">
        <Link href="/" className="hover:text-ember">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/shop" className="hover:text-ember">Shop</Link>
        {category && (
          <>
            <span className="mx-2">/</span>
            <span className="text-cocoa">{category.name}</span>
          </>
        )}
      </nav>

      <header className="mt-6 max-w-2xl space-y-3">
        <Eyebrow>{category?.tagline ?? "The full collection"}</Eyebrow>
        <h1 className="font-display text-5xl font-medium text-cocoa sm:text-6xl">
          {category?.name ?? "Shop all candles"}
        </h1>
        <p className="text-mocha">
          {category?.description ??
            "Every candle we make, hand-poured with soy wax and cotton wicks. Filter by collection to find your favourite."}
        </p>
      </header>

      <div className="sticky top-24 z-20 -mx-4 mt-10 border-y border-sand/70 bg-cream/90 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-full sm:border sm:px-2">
        <div className="flex items-center justify-between gap-4">
          <ul className="flex gap-2 overflow-x-auto [scrollbar-width:none]">
            {pills.map((pill) => {
              const active = (category?.slug ?? "") === pill.slug;
              return (
                <li key={pill.slug || "all"} className="shrink-0">
                  <Link
                    href={pill.slug ? `/shop/${pill.slug}` : "/shop"}
                    prefetch
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-full px-4 py-2 text-sm transition ${active ? "bg-cocoa text-cream" : "text-cocoa hover:bg-linen"}`}
                  >
                    {pill.name}
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="hidden shrink-0 pr-3 text-xs text-mocha sm:block">
            {products.length} {products.length === 1 ? "candle" : "candles"}
          </p>
        </div>
      </div>

      {products.length > 0 ? (
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="mt-16 text-center text-mocha">New candles are coming to this collection soon.</p>
      )}
    </div>
  );
}
