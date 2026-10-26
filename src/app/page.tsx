import Link from "next/link";
import { CandleArt } from "@/components/candle-art";
import {
  ArrowRightIcon,
  GiftIcon,
  HandIcon,
  LeafIcon,
  StarIcon,
  TruckIcon,
} from "@/components/icons";
import { ProductCard } from "@/components/product-card";
import { SectionHeading, buttonClass } from "@/components/ui";
import {
  categories,
  getFeaturedProducts,
  getProductsByCategory,
} from "@/data/catalog";
import { formatPrice } from "@/lib/format";
import { site } from "@/lib/site";

const perks = [
  { icon: LeafIcon, title: "Clean soy wax", text: "Plant-based, paraffin-free, cotton wicks" },
  { icon: HandIcon, title: "Hand-poured", text: "Small batches, made to order" },
  { icon: GiftIcon, title: "Gift-ready", text: "Wrapped with a handwritten note" },
  { icon: TruckIcon, title: "Ships pan-India", text: `Free above ${formatPrice(site.shipping.freeAbove)}` },
];

const testimonials = [
  {
    quote: "The Jasmine Night candle smells exactly like my paati's garden. I've ordered three more as gifts.",
    name: "Priya R.",
    place: "Coimbatore",
  },
  {
    quote: "We ordered 120 custom jars for our wedding favours. Every single one was perfect, and the labels were so pretty.",
    name: "Arjun & Meera",
    place: "Bengaluru",
  },
  {
    quote: "Beautiful packaging and the Rose Bubble looks even better in person. Burns clean too, no soot at all.",
    name: "Sneha K.",
    place: "Chennai",
  },
];

const faqs = [
  {
    q: "How long does delivery take?",
    a: "Ready-made candles ship in 1–2 working days and reach most cities in 3–6 days. Custom orders take 7–10 days to pour and cure before they ship.",
  },
  {
    q: "Do you offer cash on delivery?",
    a: "Yes, on most pincodes. You can also pay by UPI. We confirm every order on WhatsApp before dispatch.",
  },
  {
    q: "Can I order in bulk for weddings or corporate gifting?",
    a: "Absolutely. Use the custom candle form for anything from 10 to 500 pieces, with your choice of vessel, scent, colour and label text.",
  },
  {
    q: "What if my candle arrives damaged?",
    a: "Send us a photo on WhatsApp within 48 hours of delivery and we'll send a replacement free of charge.",
  },
];

const careTips = [
  { title: "First burn matters", text: "Let the wax melt all the way to the edges on the first light (about 2 hours) to prevent tunnelling." },
  { title: "Trim the wick", text: "Trim to 5mm before every light for a clean, steady flame with no soot." },
  { title: "Burn up to 4 hours", text: "Then let it cool. Never leave a burning candle unattended." },
];

export default function Home() {
  const featured = getFeaturedProducts().slice(0, 8);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-40 -right-40 h-[32rem] w-[32rem] rounded-full bg-blush/50 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-sage-light/70 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pt-12 pb-20 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:pt-20 lg:pb-28">
          <div className="animate-fade-up space-y-7">
            <p className="inline-flex items-center gap-2 rounded-full border border-sand bg-white/50 px-4 py-1.5 text-xs tracking-wide text-mocha">
              <span className="h-1.5 w-1.5 rounded-full bg-ember" />
              Hand-poured in small batches
            </p>
            <h1 className="font-display text-5xl leading-[1.02] font-medium text-cocoa sm:text-6xl lg:text-7xl">
              Light something <em className="font-normal text-ember">slow</em> &amp; lovely.
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-mocha">
              Soy candles scented with jasmine, sandalwood, filter coffee and first rain.
              Made by hand, made to order, made to feel like home.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/shop" className={buttonClass("primary", "px-8 py-4")}>
                Shop the collection <ArrowRightIcon width={16} height={16} />
              </Link>
              <Link href="/custom" className={buttonClass("outline", "px-8 py-4")}>
                Design your own
              </Link>
            </div>
            <div className="flex items-center gap-4 pt-2">
              <div className="flex -space-x-2">
                {["#ecd2c4", "#dfe5d6", "#efe0c6", "#e5dcef"].map((c) => (
                  <span key={c} className="h-9 w-9 rounded-full border-2 border-cream" style={{ background: c }} />
                ))}
              </div>
              <div className="text-sm">
                <p className="flex items-center gap-1 font-medium text-cocoa">
                  <StarIcon width={14} height={14} className="text-gold" /> 4.9 average rating
                </p>
                <p className="text-mocha">from 900+ happy homes</p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[2.5rem] bg-gradient-to-b from-linen to-sand">
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-oat/60 to-transparent" />
              <CandleArt
                art={{ shape: "jar", wax: "#f3e6d1", vessel: "#e9dccb", label: "No. 01" }}
                className="absolute bottom-[8%] left-1/2 w-[58%] -translate-x-1/2"
              />
              <CandleArt
                art={{ shape: "bubble", wax: "#e7b9a9", vessel: "#e7b9a9" }}
                className="absolute bottom-[6%] left-[2%] w-[36%]"
              />
              <CandleArt
                art={{ shape: "tin", wax: "#e5dcef", vessel: "#c9c2b6" }}
                className="absolute right-[2%] bottom-[5%] w-[34%]"
              />
            </div>
            <div className="absolute -bottom-6 -left-2 rounded-2xl bg-cream/95 p-4 shadow-lift backdrop-blur sm:-left-8">
              <p className="text-[11px] uppercase tracking-[0.2em] text-mocha">Bestseller</p>
              <p className="font-display text-xl">Vanilla Sandalwood</p>
              <p className="text-sm text-ember">from {formatPrice(449)}</p>
            </div>
            <div className="absolute top-10 -right-2 hidden rounded-2xl bg-cream/95 px-4 py-3 shadow-lift backdrop-blur sm:block lg:-right-6">
              <p className="font-display text-3xl text-cocoa">40+</p>
              <p className="text-xs text-mocha">hours of burn time</p>
            </div>
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
            description="From everyday jars to festive brass bowls. New collections are added every season."
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
                <p className="mt-1 text-xs text-mocha">{items.length} candles</p>
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

      {/* Bestsellers */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Loved by our community"
          title="Bestsellers"
          description="The candles our customers reorder again and again."
        />
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Custom CTA */}
      <section className="mx-auto mt-28 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-cocoa px-6 py-16 text-cream sm:px-12 lg:px-16">
          <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-ember/30 blur-3xl" />
          <div className="relative grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold">Made just for you</p>
              <h2 className="font-display text-4xl leading-tight sm:text-5xl">
                Design a candle for your <em className="text-blush">moment</em>.
              </h2>
              <p className="max-w-md text-cream/75">
                Wedding favours, baby showers, corporate gifts or a single candle with a name on it.
                Choose the vessel, scent, colour and label, and we&apos;ll pour it by hand.
              </p>
              <Link href="/custom" className={buttonClass("primary", "px-8 py-4")}>
                Start your custom order <ArrowRightIcon width={16} height={16} />
              </Link>
            </div>
            <ol className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {[
                { n: "01", t: "Pick a vessel", d: "Jar, tumbler, tin, bubble or brass bowl" },
                { n: "02", t: "Choose a scent", d: "Eight signature blends, or unscented" },
                { n: "03", t: "Add your touch", d: "Wax colour and a custom label" },
              ].map((step) => (
                <li key={step.n} className="rounded-2xl border border-cream/10 bg-cream/5 p-5">
                  <p className="font-display text-3xl text-gold">{step.n}</p>
                  <p className="mt-2 font-medium">{step.t}</p>
                  <p className="mt-1 text-sm text-cream/65">{step.d}</p>
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
            <div className="aspect-[3/4] rounded-[var(--radius-card)] bg-blush/70 p-6">
              <CandleArt art={{ shape: "pillar", wax: "#f3e6d1", vessel: "#f3e6d1" }} className="h-full w-full" />
            </div>
            <div className="mt-12 aspect-[3/4] rounded-[var(--radius-card)] bg-sage-light p-6">
              <CandleArt art={{ shape: "tumbler", wax: "#d9bf9f", vessel: "#a8693e" }} className="h-full w-full" />
            </div>
          </div>
        </div>
        <div className="order-1 space-y-6 lg:order-2">
          <SectionHeading eyebrow="Our story" title={<>Started at a kitchen table, <em className="text-ember">poured with care</em>.</>} />
          <p className="leading-relaxed text-mocha">
            {site.name} began as a weekend hobby: a few jars, a double boiler, and a lot of
            experimenting with scents that reminded us of home. Jasmine strings, filter coffee,
            the smell of the first rain.
          </p>
          <p className="leading-relaxed text-mocha">
            Today every candle is still poured by hand in small batches using clean soy wax,
            lead-free cotton wicks and phthalate-free fragrance oils. Nothing is mass-produced,
            and every order is packed by the same hands that made it.
          </p>
          <dl className="grid grid-cols-3 gap-4 border-t border-sand pt-6">
            {[
              ["2,500+", "candles poured"],
              ["12", "signature scents"],
              ["100%", "soy & cotton"],
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

      {/* Testimonials */}
      <section className="bg-linen/70 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading align="center" eyebrow="Kind words" title="Glowing reviews" />
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <li key={t.name} className="flex flex-col rounded-[var(--radius-card)] bg-cream p-8 shadow-soft">
                <div className="flex gap-0.5 text-gold">
                  {[1, 2, 3, 4, 5].map((n) => <StarIcon key={n} width={16} height={16} />)}
                </div>
                <blockquote className="mt-4 flex-1 font-display text-xl leading-snug text-cocoa">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <p className="mt-6 text-sm font-medium text-cocoa">{t.name}</p>
                <p className="text-xs text-mocha">{t.place}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Care + FAQ */}
      <section className="mx-auto grid max-w-7xl gap-16 px-4 pt-24 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div id="care" className="scroll-mt-28">
          <SectionHeading eyebrow="Candle care" title="Make every candle last" />
          <ol className="mt-8 space-y-6">
            {careTips.map((tip, i) => (
              <li key={tip.title} className="flex gap-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blush/70 font-display text-lg text-cocoa">
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
