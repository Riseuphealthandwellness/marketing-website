import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { getSiteFooter, getSiteSettings } from "@/lib/cms/content-source";

const copyrightTokenPattern = /(\[year\]|\[name\]|\[privacy\]|\[terms\])/g;

function renderCopyrightText(template: string | undefined, name: string | undefined) {
  const text = template?.trim();
  if (!text) return null;

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
  const [settings, footer] = await Promise.all([getSiteSettings(), getSiteFooter()]);

  return (
    <footer className="border-t border-border bg-brand-coal text-brand-warm-white">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div className="space-y-5">
            <Link className="inline-flex items-center gap-3" href="/">
              <span className="flex size-12 items-center justify-center sm:size-14">
                <Image
                  alt={settings?.logo?.alt ?? ""}
                  className="h-full w-full object-contain grayscale contrast-125"
                  height={settings?.logo?.height ?? 160}
                  src={settings?.logo?.url ?? "/images/brand/logo-parts/riseup-mountain-mark.png"}
                  sizes="(min-width: 640px) 56px, 48px"
                  width={settings?.logo?.width ?? 160}
                />
              </span>
              {settings?.name ? (
                <span>
                  <span className="font-logo block text-xl leading-none text-brand-warm-white">
                    {settings.name.toUpperCase()}
                  </span>
                  {settings.tagline ? (
                    <span className="mt-1 block font-heading text-sm font-bold">
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

            {footer?.footerNotice ? (
              <p className="max-w-md text-sm leading-6 text-brand-warm-white/68">
                {footer.footerNotice}
              </p>
            ) : null}
          </div>

          {footer?.columns && footer.columns.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-3">
              {footer.columns.map((col) => (
                <div key={col._key ?? col.heading}>
                  <h2 className="font-heading text-base font-bold tracking-normal text-brand-warm-white sm:text-lg">
                    {col.heading}
                  </h2>
                  {col.links && col.links.length > 0 ? (
                    <ul className="mt-4 space-y-3">
                      {col.links.map((link) => (
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
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}
        </div>

      </Container>

      <div className="border-t border-white/10 bg-black/40">
        <Container className="pb-12 pt-8">
          {footer?.legalLinks && footer.legalLinks.length > 0 ? (
            <div className="mb-6 flex flex-wrap items-center gap-y-2">
              {footer.legalLinks.map((link, i) => (
                <span className="flex items-center" key={link.href}>
                  {i > 0 && <span aria-hidden="true" className="mx-4 text-white/20">|</span>}
                  <Link
                    className="text-sm font-medium text-white/55 transition-colors hover:text-white/85"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </span>
              ))}
            </div>
          ) : null}

          {footer?.footerDisclaimers && footer.footerDisclaimers.length > 0 ? (
            <div className="mb-6 space-y-4">
              {footer.footerDisclaimers.map((d, i) => (
                <p className="text-sm leading-6 text-white/40" key={i}>
                  {d.text}
                </p>
              ))}
            </div>
          ) : null}

          <p className="text-sm text-white/35">
            {renderCopyrightText(footer?.copyrightText, settings?.name)}
          </p>
        </Container>
      </div>
    </footer>
  );
}
