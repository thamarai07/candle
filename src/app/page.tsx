import Image from "next/image";
import Link from "next/link";
import { CandleArt } from "@/components/candle-art";
import {
  ArrowRightIcon,
  GiftIcon,
  HandIcon,
  LeafIcon,
  TruckIcon,
} from "@/components/icons";
import { ProductCard } from "@/components/product-card";
import { SectionHeading, buttonClass } from "@/components/ui";
import {
  categories,
  getFeaturedProducts,
  getProductsByCategory,
  products,
  startingPrice,
} from "@/data/catalog";
import { formatPrice } from "@/lib/format";
import { site } from "@/lib/site";

const lowestPrice = Math.min(...products.map(startingPrice));

const perks = [
  { icon: HandIcon, title: "Handmade", text: "Made by hand, made to order" },
  { icon: LeafIcon, title: "Scented or unscented", text: `Scented +${formatPrice(site.scentedExtra)}` },
  { icon: GiftIcon, title: "Gift packing", text: `From ${formatPrice(site.giftPacking)}` },
  { icon: TruckIcon, title: "Ships pan-India", text: `Free above ${formatPrice(site.shipping.freeAbove)}` },
];

const faqs = [
  {
    q: "How long does delivery take?",
    a: "Ready-made candles ship in 1–2 working days and reach most cities in 3–6 days. Custom orders take 7–10 days to make before they ship.",
  },
  {
    q: "How much do scented candles and gift packing cost?",
    a: `Scented candles are ${formatPrice(site.scentedExtra)} more than the listed price. Gift packing starts at ${formatPrice(site.giftPacking)} and you can add it at checkout.`,
  },
  {
    q: "Do you offer cash on delivery?",
    a: "Yes, on most pincodes. You can also pay by UPI. We confirm every order on WhatsApp before dispatch.",
  },
  {
    q: "Can I order in bulk for weddings or corporate gifting?",
    a: "Absolutely. Use the custom candle form for anything from 1 to 500 pieces, with your choice of candle, scent, colour and label text.",
  },
  {
    q: "What if my candle arrives damaged?",
    a: "Send us a photo on WhatsApp within 48 hours of delivery and we'll send a replacement free of charge.",
  },
];

const careTips = [
  { title: "First burn matters", text: "Let the wax melt all the way to the edges on the first light (about 2 hours) to prevent tunnelling." },
  { title: "Trim the wick", text: "Trim to 5mm before every light for a clean, steady flame." },
  { title: "Burn up to 4 hours", text: "Then let it cool. Never leave a burning candle unattended." },
];

export default function Home() {
  const featured = getFeaturedProducts().slice(0, 8);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-40 -right-40 h-[32rem] w-[32rem] rounded-full bg-blush/70 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-lilac-light blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pt-12 pb-20 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:pt-20 lg:pb-28">
          <div className="animate-fade-up space-y-7">
            <p className="inline-flex items-center gap-2 rounded-full border border-sand bg-white/50 px-4 py-1.5 text-xs tracking-wide text-mocha">
              <span className="h-1.5 w-1.5 rounded-full bg-ember" />
              Handmade candles
            </p>
            <h1 className="font-display text-5xl leading-[1.02] font-medium text-cocoa sm:text-6xl lg:text-7xl">
              Small flames, <em className="text-logo font-normal">big happiness</em>.
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-mocha">
              Tea lights, bubble candles, jars, flowers, hearts and stars. All made by hand,
              all made to order, starting at just {formatPrice(lowestPrice)}.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/shop" className={buttonClass("primary", "px-8 py-4")}>
                Shop the collection <ArrowRightIcon width={16} height={16} />
              </Link>
              <Link href="/custom" className={buttonClass("outline", "px-8 py-4")}>
                Design your own
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <Image
              src={site.logo}
              alt={`${site.name} logo: handmade candles, small flames, big happiness`}
              width={1080}
              height={1080}
              sizes="(min-width: 1024px) 512px, 90vw"
              preload
              className="h-auto w-full rounded-full shadow-lift"
            />
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="border-y border-sand/80 bg-linen/60">
        <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 lg:grid-cols-4 lg:px-8">
          {perks.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream text-ember">
                <Icon />
              </span>
              <div>
                <p className="text-sm font-medium text-cocoa">{title}</p>
                <p className="text-xs text-mocha">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Shop by collection"
            title="Find your kind of glow"
            description="From tiny tea lights to flowers, hearts and stars."
          />
          <Link href="/shop" className="group inline-flex items-center gap-2 text-sm font-medium text-cocoa hover:text-ember">
            View everything <ArrowRightIcon width={16} height={16} className="transition group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-5">
          {categories.map((category) => {
            const items = getProductsByCategory(category.slug);
            return (
              <Link
                key={category.slug}
                href={`/shop/${category.slug}`}
                className="group relative flex aspect-[3/4] flex-col overflow-hidden rounded-[var(--radius-card)] p-5 transition duration-300 hover:shadow-lift"
                style={{ background: category.tint }}
              >
                <p className="text-[11px] uppercase tracking-[0.18em] text-mocha">{category.tagline}</p>
                <p className="mt-1 font-display text-2xl leading-tight text-cocoa">{category.name}</p>
                <p className="mt-1 text-xs text-mocha">
                  {items.length} {items.length === 1 ? "candle" : "candles"}
                </p>
                {items[0] && (
                  <CandleArt
                    art={items[0].art}
                    lit={false}
                    className="absolute inset-x-[14%] bottom-[4%] transition duration-500 group-hover:-translate-y-1.5"
                  />
                )}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured candles */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our candles"
          title="Little flames to love"
          description="A few of our candles to start with. See the whole collection in the shop."
        />
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Custom CTA */}
      <section className="mx-auto mt-28 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-ember to-lilac px-6 py-16 text-cream sm:px-12 lg:px-16">
          <div className="relative grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <p className="text-xs font-medium uppercase tracking-[0.25em]">Made just for you</p>
              <h2 className="font-display text-4xl leading-tight sm:text-5xl">
                Design a candle for your <em>moment</em>.
              </h2>
              <p className="max-w-md">
                Wedding favours, baby showers, corporate gifts or a single candle with a name on it.
                Choose the candle, scent, colour and label, and we&apos;ll make it by hand.
              </p>
              <Link href="/custom" className={buttonClass("light", "px-8 py-4")}>
                Start your custom order <ArrowRightIcon width={16} height={16} />
              </Link>
            </div>
            <ol className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {[
                { n: "01", t: "Pick a candle", d: "Flower, bubble, jar, heart, star and more" },
                { n: "02", t: "Choose a scent", d: "Or keep it unscented" },
                { n: "03", t: "Add your touch", d: "Wax colour and a custom label" },
              ].map((step) => (
                <li key={step.n} className="rounded-2xl border border-cream/25 bg-cocoa/25 p-5">
                  <p className="font-display text-3xl">{step.n}</p>
                  <p className="mt-2 font-medium">{step.t}</p>
                  <p className="mt-1 text-sm">{step.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Story */}
      <section id="story" className="mx-auto grid max-w-7xl scroll-mt-28 items-center gap-12 px-4 py-28 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="relative order-2 lg:order-1">
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-[3/4] rounded-[var(--radius-card)] bg-blush p-6">
              <CandleArt art={{ shape: "rose", wax: "#ef5b93" }} className="h-full w-full" />
            </div>
            <div className="mt-12 aspect-[3/4] rounded-[var(--radius-card)] bg-lilac-light p-6">
              <CandleArt art={{ shape: "lotus", wax: "#b79be6" }} className="h-full w-full" />
            </div>
          </div>
        </div>
        <div className="order-1 space-y-6 lg:order-2">
          <SectionHeading eyebrow="Our story" title={<>Small flames, <em className="text-ember">big happiness</em>.</>} />
          <p className="leading-relaxed text-mocha">
            {site.name} makes handmade candles in cheerful shapes and colours: little bubbles,
            daisies, roses, lotuses, tulips, hearts and stars, alongside classic jars and tea lights.
          </p>
          <p className="leading-relaxed text-mocha">
            Every candle is made by hand and to order. Keep yours unscented or add a scent, and
            add gift packing when it&apos;s a present for someone special.
          </p>
          <dl className="grid grid-cols-3 gap-4 border-t border-sand pt-6">
            {[
              [String(products.length), "candle designs"],
              [String(categories.length), "collections"],
              [formatPrice(lowestPrice), "starting price"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd className="font-display text-3xl text-cocoa">{value}</dd>
                <dd className="text-xs text-mocha">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Care + FAQ */}
      <section className="mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div id="care" className="scroll-mt-28">
          <SectionHeading eyebrow="Candle care" title="Make every candle last" />
          <ol className="mt-8 space-y-6">
            {careTips.map((tip, i) => (
              <li key={tip.title} className="flex gap-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blush font-display text-lg text-cocoa">
                  {i + 1}
                </span>
                <div>
                  <p className="font-medium text-cocoa">{tip.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-mocha">{tip.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div id="faq" className="scroll-mt-28">
          <SectionHeading eyebrow="Questions" title="Shipping & FAQs" />
          <div className="mt-8 divide-y divide-sand border-y border-sand">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-cocoa [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-sand text-mocha transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 pr-10 text-sm leading-relaxed text-mocha">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
