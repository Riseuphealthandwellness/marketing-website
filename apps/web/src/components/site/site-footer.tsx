import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { getFooterNav, getSiteSettings } from "@/lib/cms/content-source";

const copyrightTokenPattern = /(\[year\]|\[name\]|\[privacy\]|\[terms\])/g;

function renderCopyrightText(template: string | undefined, name: string | undefined) {
  const text =
    template?.trim() ||
    "© [year] [name]. All rights reserved. | [privacy] | [terms]";
  const year = String(new Date().getFullYear());

  return text.split(copyrightTokenPattern).map((part, index) => {
    if (part === "[year]") return year;
    if (part === "[name]") return name ?? "";
    if (part === "[privacy]") {
      return (
        <Link className="hover:text-brand-warm-white" href="/privacy-policy" key={`${part}-${index}`}>
          Privacy policy
        </Link>
      );
    }
    if (part === "[terms]") {
      return (
        <Link className="hover:text-brand-warm-white" href="/terms-of-service" key={`${part}-${index}`}>
          Terms of service
        </Link>
      );
    }

    return part;
  });
}

export async function SiteFooter() {
  const [settings, footerNav] = await Promise.all([getSiteSettings(), getFooterNav()]);

  return (
    <footer className="border-t border-border bg-brand-coal text-brand-warm-white">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div className="space-y-5">
            <Link className="inline-flex items-center gap-3" href="/">
              <span className="flex size-16 items-center justify-center sm:size-20">
                <Image
                  alt={settings?.logo?.alt ?? ""}
                  className="h-full w-full object-contain grayscale contrast-125"
                  height={settings?.logo?.height ?? 160}
                  src={settings?.logo?.url ?? "/images/brand/logo-parts/riseup-mountain-mark.png"}
                  sizes="(min-width: 640px) 80px, 64px"
                  width={settings?.logo?.width ?? 160}
                />
              </span>
              {settings?.name ? (
                <span>
                  <span className="font-logo block text-2xl leading-none text-brand-warm-white">
                    {settings.name.toUpperCase()}
                  </span>
                  {settings.tagline ? (
                    <span className="mt-1 block font-heading text-lg font-bold">
                      {settings.tagline}
                    </span>
                  ) : null}
                </span>
              ) : null}
            </Link>

            {settings ? (
              <div className="space-y-3 text-sm text-brand-warm-white/78">
                {settings.address ? (
                  <p className="flex items-start gap-3">
                    <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                    {settings.address}
                  </p>
                ) : null}
                {settings.phone ? (
                  <p className="flex items-start gap-3">
                    <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                    <a
                      className="hover:text-brand-warm-white"
                      href={`tel:${settings.phone.replace(/[^\d+]/g, "")}`}
                    >
                      {settings.phone}
                    </a>
                  </p>
                ) : null}
                {settings.email ? (
                  <p className="flex items-start gap-3">
                    <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                    <a
                      className="hover:text-brand-warm-white"
                      href={`mailto:${settings.email}`}
                    >
                      {settings.email}
                    </a>
                  </p>
                ) : null}
              </div>
            ) : null}

            <p className="max-w-md text-sm leading-6 text-brand-warm-white/68">
              This website is for general information and non-urgent access.
              For emergencies, call 911 or go to the nearest emergency department.
            </p>
          </div>

          {footerNav.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-3">
              {footerNav.map((group) => (
                <div key={group.title}>
                  <h2 className="font-heading text-base font-bold tracking-normal text-brand-warm-white sm:text-lg">
                    {group.title}
                  </h2>
                  <ul className="mt-4 space-y-3">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          className="text-sm text-brand-warm-white/72 hover:text-brand-warm-white"
                          href={link.href}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="mt-10 border-t border-brand-warm-white/14 pt-6 text-sm text-brand-warm-white/62">
          <p className="flex flex-wrap gap-x-2 gap-y-1">
            {renderCopyrightText(settings?.copyrightText, settings?.name)}
          </p>
        </div>
      </Container>
    </footer>
  );
}
