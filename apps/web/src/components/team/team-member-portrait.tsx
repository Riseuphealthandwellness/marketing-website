import Image from "next/image";

import type { CmsImage } from "@/lib/cms/types";
import { cn } from "@/lib/utils";

const portraitTones = [
  { background: "bg-brand-emphasis", text: "text-brand-coal" },
  { background: "bg-brand-soft-accent", text: "text-brand-coal" },
  { background: "bg-brand-warm-accent", text: "text-brand-warm-white" },
  { background: "bg-brand-trust", text: "text-brand-warm-white" },
] as const;

const sizeClasses = {
  sm: "size-24",
  md: "size-52",
  lg: "size-64 lg:size-72",
} as const;

const textSizeClasses = {
  sm: "text-2xl",
  md: "text-5xl",
  lg: "text-7xl",
} as const;

const imageSizes = {
  sm: "96px",
  md: "208px",
  lg: "(min-width: 1024px) 288px, 256px",
} as const;

type TeamMemberPortraitProps = {
  image?: CmsImage;
  name: string;
  toneKey: string;
  size?: keyof typeof sizeClasses;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
};

function toneForKey(key: string) {
  let hash = 0;

  for (const char of key) {
    hash = (hash * 31 + char.charCodeAt(0)) % portraitTones.length;
  }

  return portraitTones[Math.abs(hash) % portraitTones.length];
}

function initialsForName(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
}

export function TeamMemberPortrait({
  image,
  name,
  toneKey,
  size = "md",
  priority = false,
  className,
  imageClassName,
}: TeamMemberPortraitProps) {
  const tone = toneForKey(toneKey || name);

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full shadow-[0_20px_45px_rgb(31_28_25_/_14%)] ring-1 ring-brand-coal/10",
        sizeClasses[size],
        tone.background,
        className,
      )}
    >
      {image?.url ? (
        <Image
          src={image.url}
          alt={image.alt ?? name}
          fill
          className={cn("object-contain object-bottom", imageClassName)}
          sizes={imageSizes[size]}
          priority={priority}
        />
      ) : (
        <span
          className={cn(
            "flex h-full w-full items-center justify-center font-heading font-black tracking-normal",
            textSizeClasses[size],
            tone.text,
          )}
        >
          {initialsForName(name)}
        </span>
      )}
    </div>
  );
}
