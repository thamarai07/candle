# Tharikaa Little Flames: candle store

A Next.js 16 store for handmade candles. It has a shop with categories, product pages, a bag, checkout with address collection, a custom candle builder and a contact form.

## Run it

```bash
npm install
npm run dev
```

## Where things live

| What | File |
| --- | --- |
| Brand name, phone, WhatsApp, shipping, scented and gift packing prices | `src/lib/site.ts` |
| Logo and favicon | `public/logo.jpg`, `src/app/icon.png` |
| Colour palette and fonts | `src/app/globals.css`, `src/app/layout.tsx` |
| Categories, products and prices | `src/data/catalog.ts` |
| Custom candle options (prices come from the catalog) | `src/data/custom.ts` |
| Form validation (used by both forms and API) | `src/lib/validation.ts` |
| Order and form API routes | `src/app/api/*/route.ts` |

### Adding a category

1. Add an entry to `categories` in `src/data/catalog.ts`.
2. Add products with a matching `categorySlug`.

The shop filters, category page (`/shop/<slug>`), home page and footer pick it up automatically.

### Product photos

Each product shows an illustrated candle by default. To use a real photo, put it in `public/products/` and set `image` on the product (rendering it with `next/image` still needs to be wired up in `ProductCard` and the product page).

## Orders and submissions

Checkout, custom orders and contact messages are validated on the server and saved as JSON in `data/` (`orders.json`, `custom-orders.json`, `enquiries.json`). Prices are recalculated from the catalog on the server, so they can't be changed from the browser.

This works for local use and a single always-on server. Before deploying to serverless hosting such as Vercel, replace `src/lib/records.ts` with a database, and add an email or WhatsApp notification so new orders get noticed. Online payment (for example Razorpay) is not connected yet. Checkout currently offers UPI-on-confirmation and cash on delivery.
