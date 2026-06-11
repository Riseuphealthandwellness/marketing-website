"use client";

import { ArrowRight, ExternalLink, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";

import { Container } from "@/components/layout/container";
import { DesktopNav } from "@/components/site/desktop-nav";
import { MobileNavButton } from "@/components/site/mobile-nav";
import { Button } from "@/components/ui/button";
import { isExternalUrl, type PatientAccessLinks } from "@/lib/integrations/patient-access";
import type { CmsImage, CtaButton, SiteNavItem } from "@/lib/cms/types";

type SiteHeaderClientProps = {
  siteName?: string;
  tagline?: string;
  headerCta?: CtaButton;
  accessLinks?: PatientAccessLinks;
  logo?: CmsImage;
  mainNav: SiteNavItem[];
};

function resolveHeaderCtaIcon(cta: CtaButton) {
  const configuredIcon = cta.icon ?? "auto";

  if (configuredIcon === "none") return "none";
  if (configuredIcon !== "auto") return configuredIcon;

  const label = cta.label.toLowerCase();
  const href = cta.href.toLowerCase();

  if (label.includes("contact") || href.includes("contact")) return "phone";
  if (isExternalUrl(cta.href)) return "external";

  return "none";
}

function HeaderCtaIcon({ cta }: { cta: CtaButton }) {
  const icon = resolveHeaderCtaIcon(cta);
  const className = "size-3.5";

  if (icon === "phone") return <Phone aria-hidden="true" className={className} />;
  if (icon === "mail") return <Mail aria-hidden="true" className={className} />;
  if (icon === "arrow") return <ArrowRight aria-hidden="true" className={className} />;
  if (icon === "external") return <ExternalLink aria-hidden="true" className={className} />;

  return null;
}

export function SiteHeaderClient({
  siteName,
  tagline,
  headerCta,
  logo,
  mainNav,
}: SiteHeaderClientProps) {
  const router = useRouter();

  const handleHomeClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    router.push("/", { scroll: true });
    window.requestAnimationFrame(() => {
      window.scrollTo({ left: 0, top: 0, behavior: "instant" });
    });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white after:absolute after:inset-x-0 after:bottom-[-5px] after:h-[5px] after:bg-[linear-gradient(90deg,var(--brand-warm-accent),var(--brand-emphasis))] after:content-['']">
      <Container className="grid min-h-16 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 py-1 lg:min-h-16 lg:gap-5">
        <Link
          aria-label={siteName ? `${siteName} home` : "Home"}
          className="relative z-10 flex h-16 shrink-0 items-center gap-2.5 pr-2 sm:h-[72px] sm:gap-3"
          href="/"
          onClick={handleHomeClick}
        >
          <span className="flex size-14 shrink-0 items-center justify-center sm:size-16">
            <Image
              alt={logo?.alt ?? ""}
              className="h-full w-full object-contain"
              height={logo?.height ?? 160}
              priority
              src={logo?.url ?? "/images/brand/logo-parts/riseup-mountain-mark.png"}
              width={logo?.width ?? 160}
            />
          </span>
          {siteName ? (
            <span className="font-logo flex flex-col leading-none text-brand-trust dark:text-brand-warm-white">
              <span className="text-[1.7rem] [-webkit-text-stroke:1px_currentColor] sm:text-[2.05rem]">
                {siteName.toUpperCase()}
              </span>
              {tagline ? (
                <span className="mt-0.5 whitespace-pre-line text-[10px] uppercase leading-none text-brand-warm-accent sm:text-[12px]">
                  {tagline}
                </span>
              ) : null}
            </span>
          ) : null}
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden min-h-16 min-w-0 items-center justify-start lg:flex"
        >
          <DesktopNav mainNav={mainNav} />
        </nav>

        <div className="flex min-h-16 shrink-0 items-center justify-end gap-2">
          {headerCta ? (
            <div className="hidden items-center gap-2 lg:flex">
              <Button asChild size="sm" className="h-10 px-4 text-sm">
                <a
                  href={headerCta.href}
                  rel={isExternalUrl(headerCta.href) ? "noreferrer" : undefined}
                  target={isExternalUrl(headerCta.href) ? "_blank" : undefined}
                >
                  {headerCta.label}
                  <HeaderCtaIcon cta={headerCta} />
                </a>
              </Button>
            </div>
          ) : null}
          <MobileNavButton mainNav={mainNav} />
        </div>
      </Container>
    </header>
  );
}
