import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CandleArt } from "@/components/candle-art";
import { GiftIcon, LeafIcon, TruckIcon } from "@/components/icons";
import { ProductCard } from "@/components/product-card";
import { ProductPurchase } from "@/components/product-purchase";
import { Stars } from "@/components/ui";
import {
  getCategory,
  getProduct,
  getProductsByCategory,
  products,
} from "@/data/catalog";
import { formatPrice } from "@/lib/format";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  return product
    ? { title: product.name, description: product.shortDescription }
    : {};
}

export default function ProductPage({ params }: PageProps<"/products/[slug]">) {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductDetails params={params} />
    </Suspense>
  );
}

function ProductSkeleton() {
  return (
    <div className="mx-auto grid max-w-7xl animate-pulse gap-10 px-4 pt-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
      <div className="aspect-square rounded-[2rem] bg-linen" />
      <div className="space-y-4">
        <div className="h-4 w-24 rounded bg-linen" />
        <div className="h-12 w-3/4 rounded bg-linen" />
        <div className="h-20 rounded bg-linen" />
        <div className="h-14 rounded-full bg-linen" />
      </div>
    </div>
  );
}

async function ProductDetails({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.categorySlug);
  const related = getProductsByCategory(product.categorySlug)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8 lg:pt-14">
      <nav aria-label="Breadcrumb" className="text-xs text-mocha">
        <Link href="/" className="hover:text-ember">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/shop" className="hover:text-ember">Shop</Link>
        {category && (
          <>
            <span className="mx-2">/</span>
            <Link href={`/shop/${category.slug}`} className="hover:text-ember">{category.name}</Link>
          </>
        )}
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <div
            className="relative aspect-square overflow-hidden rounded-[2rem]"
            style={{ background: category?.tint }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.6),transparent_60%)]" />
            {product.badge && (
              <span className="absolute top-6 left-6 rounded-full bg-cream/90 px-3 py-1 text-xs font-medium text-cocoa">
                {product.badge}
              </span>
            )}
            <CandleArt art={product.art} className="absolute inset-x-[18%] bottom-[8%]" />
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-ember">{category?.name}</p>
            <h1 className="font-display text-5xl leading-tight font-medium text-cocoa">{product.name}</h1>
            <div className="flex items-center gap-2 text-sm text-mocha">
              <Stars rating={product.rating} />
              <span>{product.rating.toFixed(1)} · {product.reviewCount} reviews</span>
            </div>
            <p className="text-lg leading-relaxed text-mocha">{product.description}</p>
          </div>

          <ProductPurchase product={product} />

          <ul className="grid gap-3 rounded-2xl bg-linen/70 p-5 text-sm text-mocha sm:grid-cols-3">
            <li className="flex items-center gap-2"><TruckIcon className="text-ember" /> Ships in 1–2 days</li>
            <li className="flex items-center gap-2"><GiftIcon className="text-ember" /> Free gift note</li>
            <li className="flex items-center gap-2"><LeafIcon className="text-ember" /> {product.wax}</li>
          </ul>

          <div>
            <h2 className="mb-4 font-display text-2xl text-cocoa">Scent notes</h2>
            <dl className="grid grid-cols-3 divide-x divide-sand rounded-2xl border border-sand">
              {(
                [
                  ["Top", product.notes.top],
                  ["Heart", product.notes.heart],
                  ["Base", product.notes.base],
                ] as const
              ).map(([label, value]) => (
                <div key={label} className="p-4 text-center">
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-mocha">{label}</dt>
                  <dd className="mt-1 font-display text-lg leading-tight text-cocoa">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="divide-y divide-sand border-y border-sand">
            {[
              {
                title: "Details",
                body: `Burn time ${product.burnTime}. ${product.wax}, lead-free cotton wick, phthalate-free fragrance oils. Hand-poured to order.`,
              },
              {
                title: "Shipping & returns",
                body: `Free shipping on orders above ${formatPrice(site.shipping.freeAbove)}, otherwise ${formatPrice(site.shipping.flatRate)}. Delivered in 3–6 days. Damaged in transit? WhatsApp us a photo within 48 hours for a free replacement.`,
              },
              {
                title: "Candle care",
                body: "Burn for 2 hours on the first light so the wax melts to the edges. Trim the wick to 5mm each time and never burn for more than 4 hours at once.",
              },
            ].map((item, i) => (
              <details key={item.title} className="group py-5" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-cocoa [&::-webkit-details-marker]:hidden">
                  {item.title}
                  <span className="text-mocha transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-mocha">{item.body}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-28">
          <h2 className="font-display text-4xl text-cocoa">You may also love</h2>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
