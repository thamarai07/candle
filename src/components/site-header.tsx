"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cart, useCartCount } from "@/lib/cart-store";
import { navLinks, site } from "@/lib/site";
import { formatPrice } from "@/lib/format";
import { BagIcon, CloseIcon, MenuIcon } from "@/components/icons";

export function SiteHeader() {
  const count = useCartCount();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-cocoa px-4 py-2 text-center text-xs tracking-wide text-cream/90">
        Free shipping on orders above {formatPrice(site.shipping.freeAbove)}
        <span className="hidden sm:inline"> · Hand-poured in {site.city.split(",")[0]}</span>
      </div>
      <div className="border-b border-sand/70 bg-cream/85 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-ml-2 rounded-full p-2 text-cocoa hover:bg-linen md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <MenuIcon />
          </button>

          <Link href="/" className="font-display text-2xl font-semibold tracking-wide text-cocoa">
            {site.name}
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => {
              const active = link.href !== "/#story" && pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm tracking-wide transition hover:text-ember ${active ? "text-ember" : "text-cocoa"}`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            onClick={cart.openDrawer}
            className="relative -mr-2 rounded-full p-2 text-cocoa transition hover:bg-linen"
            aria-label={`Open bag, ${count} item${count === 1 ? "" : "s"}`}
          >
            <BagIcon width={22} height={22} />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-ember px-1 text-[10px] font-semibold text-cream">
                {count}
              </span>
            )}
          </button>
        </nav>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-cocoa/30 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[82%] max-w-sm flex-col bg-cream p-6 shadow-lift">
            <div className="flex items-center justify-between">
              <span className="font-display text-2xl font-semibold">{site.name}</span>
              <button
                type="button"
                className="rounded-full p-2 hover:bg-linen"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <CloseIcon />
              </button>
            </div>
            <ul className="mt-10 space-y-1">
              {[{ href: "/", label: "Home" }, ...navLinks].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-xl px-3 py-3 font-display text-2xl text-cocoa hover:bg-linen"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-auto text-sm text-mocha">
              Questions? WhatsApp us at {site.phone}
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
