import Link from "next/link";
import { CandleArt } from "@/components/candle-art";
import { buttonClass } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 pt-20 text-center">
      <CandleArt art={{ shape: "pillar", wax: "#ecd2c4", vessel: "#ecd2c4" }} lit={false} className="w-28" />
      <h1 className="mt-6 font-display text-5xl text-cocoa">This page has burnt out</h1>
      <p className="mt-3 text-mocha">We couldn&apos;t find what you were looking for.</p>
      <Link href="/shop" className={buttonClass("primary", "mt-8")}>Back to the shop</Link>
    </div>
  );
}
