import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { isExternalUrl } from "@/lib/integrations/patient-access";

type CTAGroupProps = {
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  tone?: "default" | "onImage" | "onPrimary";
};

export function CTAGroup({
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  tone = "default",
}: CTAGroupProps) {
  const primaryExternal = isExternalUrl(primaryHref);
  const secondaryExternal = secondaryHref ? isExternalUrl(secondaryHref) : false;
  const primaryVariant = tone === "onPrimary" ? "brand" : "default";
  const secondaryVariant = tone === "onPrimary" ? "brandOutline" : "outline";
  const primaryClassName =
    tone === "onImage"
      ? "min-h-14 border border-brand-action bg-brand-action px-7 text-brand-warm-white shadow-[var(--shadow-soft)] hover:bg-brand-action-hover"
      : undefined;
  const secondaryClassName =
    tone === "onImage"
      ? "min-h-14 border border-brand-trust/28 bg-brand-warm-white px-7 text-brand-trust hover:bg-brand-trust/10"
      : undefined;

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Button
        asChild
        className={primaryClassName}
        size="lg"
        variant={primaryVariant}
      >
        {primaryExternal ? (
          <a href={primaryHref} rel="noreferrer" target="_blank">
            {primaryLabel}
            <ExternalLink aria-hidden="true" className="size-4" />
          </a>
        ) : (
          <Link href={primaryHref}>
            {primaryLabel}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        )}
      </Button>
      {secondaryHref && secondaryLabel ? (
        <Button
          asChild
          className={secondaryClassName}
          size="lg"
          variant={secondaryVariant}
        >
          {secondaryExternal ? (
            <a href={secondaryHref} rel="noreferrer" target="_blank">
              {secondaryLabel}
              <ExternalLink aria-hidden="true" className="size-4" />
            </a>
          ) : (
            <Link href={secondaryHref}>{secondaryLabel}</Link>
          )}
        </Button>
      ) : null}
    </div>
  );
}
