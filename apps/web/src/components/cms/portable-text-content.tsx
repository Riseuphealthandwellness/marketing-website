import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

import { cn } from "@/lib/utils";

type PortableTextContentProps = {
  value?: unknown[];
  className?: string;
};

const portableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="whitespace-pre-line text-base leading-8 text-brand-trust">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="pt-8 font-heading text-2xl font-black leading-tight tracking-normal text-brand-coal first:pt-0 sm:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="pt-5 font-heading text-xl font-black leading-snug tracking-normal text-brand-coal first:pt-0 sm:text-2xl">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="pt-3 font-heading text-lg font-black leading-snug tracking-normal text-brand-coal first:pt-0">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-brand-warm-accent bg-brand-warm-white px-5 py-4 text-base leading-8 text-brand-trust">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc space-y-2 pl-6 text-base leading-8 text-brand-trust marker:text-brand-warm-accent">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal space-y-2 pl-6 text-base leading-8 text-brand-trust marker:font-bold marker:text-brand-warm-accent">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-1">{children}</li>,
    number: ({ children }) => <li className="pl-1">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-brand-coal">{children}</strong>
    ),
    em: ({ children }) => <em className="text-brand-coal">{children}</em>,
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "#";
      const isExternal = /^https?:\/\//.test(href);

      return (
        <a
          className="font-semibold text-brand-action underline decoration-brand-action/35 underline-offset-4 hover:text-brand-action-hover"
          href={href}
          rel={isExternal ? "noreferrer" : undefined}
          target={isExternal ? "_blank" : undefined}
        >
          {children}
        </a>
      );
    },
  },
  hardBreak: () => <br />,
} satisfies PortableTextComponents;

export function PortableTextContent({ value, className }: PortableTextContentProps) {
  if (!value || value.length === 0) return null;

  return (
    <div className={cn("space-y-6", className)}>
      <PortableText
        components={portableTextComponents}
        value={value as PortableTextBlock[]}
      />
    </div>
  );
}
