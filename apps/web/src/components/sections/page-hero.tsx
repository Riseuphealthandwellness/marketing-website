import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { ShareButtons } from "@/components/sections/share-buttons";
import { sanityImageUrl } from "@/lib/cms/image";
import type { BreadcrumbItem } from "@/lib/breadcrumbs";
import type { CmsImage } from "@/lib/cms/types";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  backgroundImage?: CmsImage;
};

export function PageHero({ eyebrow, title, description, breadcrumbs, backgroundImage }: PageHeroProps) {
  const showBreadcrumbs = breadcrumbs && breadcrumbs.length > 1;
  const hasImage = !!backgroundImage?.url;

  return (
    <section
      className={[
        "relative overflow-hidden border-b border-brand-coal/20 bg-brand-trust text-brand-warm-white",
        "before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-[linear-gradient(90deg,var(--brand-warm-accent),var(--brand-emphasis),var(--brand-soft-accent))] before:content-[''] before:z-10",
        "py-8 sm:py-10",
      ].join(" ")}
    >
      {hasImage ? (
        <>
          <Image
            alt={backgroundImage.alt ?? ""}
            aria-hidden="true"
            className="absolute inset-0 z-0 h-full w-full object-cover opacity-25"
            fill
            priority
            sizes="100vw"
            src={sanityImageUrl(backgroundImage, { width: 1800, quality: 75, fit: "crop" })}
            placeholder={backgroundImage.lqip ? "blur" : "empty"}
            blurDataURL={backgroundImage.lqip}
          />
          {/* gradient darkens edges so text stays readable regardless of photo */}
          <div
            aria-hidden="true"
            className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0)_40%,rgba(0,0,0,0.22)_100%)] lg:bg-[linear-gradient(90deg,rgba(0,0,0,0.28)_0%,rgba(0,0,0,0.08)_60%,rgba(0,0,0,0)_100%)]"
          />
        </>
      ) : null}

      <svg
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-[1] h-[320px] w-full"
        preserveAspectRatio="none"
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M-80,258 C130,204 275,303 478,233 C648,174 760,100 992,143 C1196,181 1300,114 1520,140" fill="none" stroke="white" strokeWidth="3.5" strokeOpacity="0.06" />
        <path d="M-60,175 C148,136 300,201 508,161 C720,119 818,50 1032,85 C1208,114 1328,65 1500,78" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.12" />
        <path d="M-80,112 C160,74 330,126 528,98 C744,69 858,11 1088,40 C1262,63 1368,28 1516,34" fill="none" stroke="white" strokeWidth="2" strokeOpacity="0.08" />
      </svg>

      <Container className="relative z-[2]">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <div className="min-w-0">
            {showBreadcrumbs ? (
              <nav aria-label="Breadcrumb" className="mb-4">
                <ol className="flex flex-wrap items-center gap-y-1">
                  {breadcrumbs.map((crumb, i) => {
                    return (
                      <li key={i} className="flex items-center">
                        {i > 0 ? (
                          <ChevronRight
                            aria-hidden="true"
                            className="mx-1.5 size-3 shrink-0 text-brand-warm-white/35"
                          />
                        ) : null}
                        {!crumb.href ? (
                          <span className="text-xs font-medium text-brand-warm-white/75 sm:text-sm">
                            {crumb.label}
                          </span>
                        ) : (
                          <Link
                            href={crumb.href}
                            className="text-xs font-medium text-brand-warm-white/50 transition-colors hover:text-brand-warm-white/85 sm:text-sm"
                          >
                            {crumb.label}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </nav>
            ) : null}

            {eyebrow ? (
              <p className="flex items-center gap-2.5 font-heading text-xs font-black uppercase tracking-widest text-brand-emphasis sm:text-sm">
                <span className="h-px w-7 bg-brand-emphasis" aria-hidden="true" />
                {eyebrow}
              </p>
            ) : null}
            <h1
              className={
                eyebrow
                  ? "mt-2.5 font-heading text-3xl font-black leading-tight tracking-normal text-brand-warm-white sm:text-4xl lg:text-[2.65rem]"
                  : "font-heading text-3xl font-black leading-tight tracking-normal text-brand-warm-white sm:text-4xl lg:text-[2.65rem]"
              }
            >
              {title}
            </h1>
            {description ? (
              <p className="mt-3 max-w-2xl text-base leading-7 text-brand-warm-white/78 sm:text-lg sm:leading-8">
                {description}
              </p>
            ) : null}
          </div>

          <div className="shrink-0">
            <ShareButtons title={title} />
          </div>
        </div>
      </Container>
    </section>
  );
}
