import { createImageUrlBuilder } from "@sanity/image-url";

import { sanityDataset, sanityProjectId } from "@/lib/cms/client";
import type { CmsImage } from "@/lib/cms/types";

type SanityImageOptions = {
  width?: number;
  height?: number;
  quality?: number;
  fit?: "clip" | "crop" | "fill" | "fillmax" | "max" | "min" | "scale";
};

const builder = createImageUrlBuilder({
  projectId: sanityProjectId,
  dataset: sanityDataset,
});

/**
 * Builds a Sanity CDN URL while preserving crop/hotspot metadata when the
 * caller passes the full image object from GROQ.
 * Requests a pre-resized, compressed image so Next.js Image optimizer
 * receives a reasonably-sized source rather than an original large PNG.
 */
export function sanityImageUrl(
  image: string | CmsImage,
  { width, height, quality = 85, fit = "clip" }: SanityImageOptions = {},
): string {
  if (typeof image !== "string" && image.asset?._ref) {
    let request = builder.image(image).auto("format").quality(quality).fit(fit);
    if (width) request = request.width(width);
    if (height) request = request.height(height);
    return request.url();
  }

  const url = typeof image === "string" ? image : image.url;
  const base = url.split("?")[0];
  const params = new URLSearchParams({ auto: "format", q: String(quality), fit });
  if (width) params.set("w", String(width));
  if (height) params.set("h", String(height));
  return `${base}?${params.toString()}`;
}
