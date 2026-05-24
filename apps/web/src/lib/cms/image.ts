type SanityImageOptions = {
  width?: number;
  height?: number;
  quality?: number;
  fit?: "clip" | "crop" | "fill" | "fillmax" | "max" | "min" | "scale";
};

/**
 * Appends Sanity CDN transformation parameters to a raw asset URL.
 * Requests a pre-resized, compressed image so Next.js Image optimizer
 * receives a reasonably-sized source rather than an original large PNG.
 */
export function sanityImageUrl(
  url: string,
  { width, height, quality = 85, fit = "clip" }: SanityImageOptions = {},
): string {
  const base = url.split("?")[0];
  const params = new URLSearchParams({ auto: "format", q: String(quality), fit });
  if (width) params.set("w", String(width));
  if (height) params.set("h", String(height));
  return `${base}?${params.toString()}`;
}
