import Image from "next/image";

import { sanityImageUrl } from "@/lib/cms/image";
import type { CmsImage } from "@/lib/cms/types";
import { cn } from "@/lib/utils";


const portraitTone = { background: "bg-brand-dawn-coral", text: "text-brand-coal" } as const;

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

const imageSourceWidths = {
  sm: 300,
  md: 650,
  lg: 900,
} as const;

type TeamMemberPortraitProps = {
  image?: CmsImage;
  name: string;
  size?: keyof typeof sizeClasses;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
};

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
  size = "md",
  priority = false,
  className,
  imageClassName,
}: TeamMemberPortraitProps) {
  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full shadow-[0_20px_45px_rgb(31_28_25_/_14%)] ring-1 ring-brand-coal/10",
        sizeClasses[size],
        portraitTone.background,
        className,
      )}
    >
      {image?.url ? (
        <Image
          src={sanityImageUrl(image.url, { width: imageSourceWidths[size], fit: "clip" })}
          alt={image.alt ?? name}
          fill
          className={cn("object-contain object-bottom", imageClassName)}
          sizes={imageSizes[size]}
          priority={priority}
          placeholder={image.lqip ? "blur" : "empty"}
          blurDataURL={image.lqip}
        />
      ) : (
        <span
          className={cn(
            "flex h-full w-full items-center justify-center font-heading font-black tracking-normal",
            textSizeClasses[size],
            portraitTone.text,
          )}
        >
          {initialsForName(name)}
        </span>
      )}
    </div>
  );
}
