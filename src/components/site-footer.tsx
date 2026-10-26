import Link from "next/link";
import { categories } from "@/data/catalog";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-cocoa text-cream/80">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="space-y-4">
          <p className="font-display text-3xl font-semibold text-cream">{site.name}</p>
          <p className="max-w-xs text-sm leading-relaxed">{site.tagline}. Small batches, clean soy wax and scents inspired by home.</p>
        </div>

        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-gold">Shop</p>
          <ul className="space-y-2.5 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/shop/${c.slug}`} className="hover:text-cream">
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/custom" className="hover:text-cream">
                Custom candles
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-gold">Help</p>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/contact" className="hover:text-cream">Contact us</Link></li>
            <li><Link href="/#care" className="hover:text-cream">Candle care</Link></li>
            <li><Link href="/#faq" className="hover:text-cream">Shipping & FAQs</Link></li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-gold">Say hello</p>
          <ul className="space-y-2.5 text-sm">
            <li><a href={`mailto:${site.email}`} className="hover:text-cream">{site.email}</a></li>
            <li><a href={`https://wa.me/${site.whatsapp}`} className="hover:text-cream" target="_blank" rel="noreferrer">WhatsApp {site.phone}</a></li>
            <li><a href={site.instagram} className="hover:text-cream" target="_blank" rel="noreferrer">Instagram</a></li>
            <li className="text-cream/60">{site.city}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <p className="mx-auto max-w-7xl px-4 py-6 text-xs text-cream/50 sm:px-6 lg:px-8">
          © {site.year} {site.name}. Made with warmth.
        </p>
      </div>
    </footer>
  );
}
