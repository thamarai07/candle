import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { ChatIcon, GiftIcon, TruckIcon } from "@/components/icons";
import { Eyebrow } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div className="mx-auto grid max-w-7xl gap-12 px-4 pt-12 sm:px-6 lg:grid-cols-2 lg:px-8 lg:pt-16">
      <div className="space-y-8">
        <div className="space-y-3">
          <Eyebrow>Say hello</Eyebrow>
          <h1 className="font-display text-5xl leading-tight font-medium text-cocoa sm:text-6xl">
            We&apos;d love to <em className="text-ember">hear</em> from you
          </h1>
          <p className="max-w-md text-mocha">
            Questions about an order, bulk gifting or a collaboration? Send a note and we&apos;ll
            reply within a day. For quick answers, WhatsApp is fastest.
          </p>
        </div>
        <ul className="space-y-4">
          {[
            { icon: ChatIcon, title: "WhatsApp", text: site.phone, href: `https://wa.me/${site.whatsapp}` },
            { icon: GiftIcon, title: "Email", text: site.email, href: `mailto:${site.email}` },
            { icon: TruckIcon, title: "Studio", text: `${site.city} · Ships pan-India` },
          ].map(({ icon: Icon, title, text, href }) => (
            <li key={title} className="flex items-center gap-4 rounded-2xl bg-linen/70 p-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cream text-ember">
                <Icon />
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-mocha">{title}</p>
                {href ? (
                  <a href={href} className="text-cocoa hover:text-ember" target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                    {text}
                  </a>
                ) : (
                  <p className="text-cocoa">{text}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <ContactForm />
    </div>
  );
}
