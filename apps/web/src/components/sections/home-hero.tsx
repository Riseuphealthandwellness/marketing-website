import { ArrowRight, ExternalLink, HeartPulse, MapPin, PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  renderPortableHeadingText,
  type PortableHeadingBlock,
} from "@/components/cms/portable-heading";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { CmsImage, CtaButton } from "@/lib/cms/types";
import {
  isExternalUrl,
  type PatientAccessLinks,
} from "@/lib/integrations/patient-access";

type HomeHeroProps = {
  eyebrow?: string;
  heading?: PortableHeadingBlock[];
  description?: string;
  buttons?: CtaButton[];
  backgroundImage?: CmsImage;
  featureImage?: CmsImage;
  accessLinks?: PatientAccessLinks;
};

function fallbackHeading() {
  return "Care that keeps treatment, recovery, and primary care connected.";
}

function buttonClassName(style: CtaButton["style"]) {
  if (style === "secondary") {
    return "min-h-14 border border-brand-trust/28 bg-brand-warm-white px-7 text-brand-trust hover:bg-brand-trust/10";
  }

  return "min-h-14 border border-brand-action bg-brand-action px-7 text-brand-warm-white shadow-[var(--shadow-soft)] hover:bg-brand-action-hover";
}

function HeroButton({ button }: { button: CtaButton }) {
  const external = isExternalUrl(button.href);
  const icon = external ? (
    <ExternalLink aria-hidden="true" className="size-4" />
  ) : (
    <ArrowRight aria-hidden="true" className="size-4" />
  );

  return (
    <Button
      asChild
      className={buttonClassName(button.style)}
      size="lg"
      variant={button.style === "secondary" ? "outline" : "default"}
    >
      {external ? (
        <a href={button.href} rel="noreferrer" target="_blank">
          {button.label}
          {icon}
        </a>
      ) : (
        <Link href={button.href}>
          {button.label}
          {icon}
        </Link>
      )}
    </Button>
  );
}

export function HomeHero({
  eyebrow = "Integrated healthcare in West Virginia",
  heading,
  description = "Rise Up gives patients, families, and referral partners a clearer path into coordinated care without asking people to navigate it alone.",
  buttons,
  backgroundImage,
  featureImage,
  accessLinks,
}: HomeHeroProps) {
  const renderedHeading = renderPortableHeadingText(heading);
  const resolvedHeroButtons = (buttons ?? []).slice(0, 2).map((button) => ({
    ...button,
    href: button.href || accessLinks?.referral || "#",
  }));
  const backgroundImageUrl =
    backgroundImage?.url || "/images/brand/appalachian-sunrise-valley.png";
  const featureImageUrl =
    featureImage?.url || "/images/illustrations/Asset%2026.png";
  const featureImageWidth = featureImage?.width || 1338;
  const featureImageHeight = featureImage?.height || 779;

  return (
    <section className="relative isolate overflow-hidden border-b border-border bg-brand-warm-white text-brand-coal">
      <Image
        alt=""
        className="absolute inset-0 -z-20 h-full w-full scale-[1.02] object-cover object-[center_58%] blur-[2px]"
        fill
        priority
        sizes="100vw"
        src={backgroundImageUrl}
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(247_243_238_/_0.26)_0%,rgb(247_243_238_/_0.08)_48%,rgb(247_243_238_/_0)_100%)] lg:bg-[linear-gradient(90deg,rgb(247_243_238_/_0.34)_0%,rgb(247_243_238_/_0.16)_38%,rgb(247_243_238_/_0.04)_68%,rgb(247_243_238_/_0)_100%)]" />
      <Container className="relative grid gap-8 py-8 sm:py-12 lg:min-h-[610px] lg:grid-cols-[1fr_0.72fr] lg:items-end lg:py-14">
        <div className="max-w-4xl self-center rounded-lg bg-brand-warm-white/78 p-5 shadow-[0_18px_48px_rgb(31_28_25_/_10%)] ring-1 ring-brand-warm-white/58 backdrop-blur-[1px] sm:p-7 lg:p-8 lg:pr-10">
          <Badge className="border-brand-trust/20 bg-brand-trust/10 text-brand-trust">
            {eyebrow}
          </Badge>
          <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[1.02] tracking-normal text-brand-coal sm:text-5xl lg:text-6xl">
            {renderedHeading ?? fallbackHeading()}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-brand-coal/78 sm:text-xl">
            {description}
          </p>
          {resolvedHeroButtons.length ? (
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              {resolvedHeroButtons.map((button) => (
                <HeroButton button={button} key={`${button.label}-${button.href}`} />
              ))}
            </div>
          ) : null}
        </div>

        <div className="hidden self-end lg:block">
          <Image
            alt="Rise Up care team illustration"
            className="h-auto w-full object-contain"
            height={featureImageHeight}
            sizes="(min-width: 1024px) 34vw, 100vw"
            src={featureImageUrl}
            width={featureImageWidth}
          />

          <div className="rounded-b-lg bg-brand-trust p-5 text-brand-warm-white shadow-[var(--shadow-soft)] ring-1 ring-brand-warm-white/18 sm:p-7">
            <p className="font-heading text-sm font-bold uppercase text-brand-warm-white">
              One coordinated starting point
            </p>
            <div className="mt-5 grid gap-4 text-sm text-brand-warm-white/82">
              <div className="flex gap-3">
                <PhoneCall aria-hidden="true" className="mt-0.5 size-5 text-brand-soft-accent" />
                <p>Call, request an appointment, or start a referral from the same public site.</p>
              </div>
              <div className="flex gap-3">
                <HeartPulse aria-hidden="true" className="mt-0.5 size-5 text-brand-soft-accent" />
                <p>Treatment support and primary care stay part of the same care conversation.</p>
              </div>
              <div className="flex gap-3">
                <MapPin aria-hidden="true" className="mt-0.5 size-5 text-brand-soft-accent" />
                <p>Built for West Virginia patients, families, and community referral partners.</p>
              </div>
            </div>
            <Link
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-warm-white hover:text-brand-soft-accent hover:underline"
              href="/care"
            >
              Explore care model
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
