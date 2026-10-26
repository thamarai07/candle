import type { Metadata } from "next";
import { ShopView } from "@/components/shop-view";
import { products } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Shop all candles",
};

export default function ShopPage() {
  return <ShopView products={products} />;
}
