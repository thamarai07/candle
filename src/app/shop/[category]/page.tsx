import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ShopView } from "@/components/shop-view";
import { categories, getCategory, getProductsByCategory } from "@/data/catalog";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/shop/[category]">): Promise<Metadata> {
  const { category } = await params;
  const found = getCategory(category);
  return found ? { title: found.name, description: found.description } : {};
}

export default function CategoryPage({ params }: PageProps<"/shop/[category]">) {
  return (
    <Suspense fallback={<div className="mx-auto mt-16 h-96 max-w-7xl animate-pulse rounded-[var(--radius-card)] bg-linen" />}>
      <CategoryContent params={params} />
    </Suspense>
  );
}

async function CategoryContent({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  return <ShopView category={category} products={getProductsByCategory(slug)} />;
}
