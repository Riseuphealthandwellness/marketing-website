import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type TextColorMark = {
  _key: string;
  _type: "textColor";
  color?: keyof typeof textColorClassNames;
};

type PortableTextSpan = {
  _key: string;
  _type: "span";
  text: string;
  marks?: string[];
};

export type PortableHeadingBlock = {
  _key: string;
  _type: "block";
  children?: PortableTextSpan[];
  markDefs?: TextColorMark[];
};

const textColorClassNames = {
  default: undefined,
  riseRed: "text-brand-rise-red",
  emberOrange: "text-brand-ember-orange",
  sunburstGold: "text-brand-sunburst-gold",
  dawnCoral: "text-brand-dawn-coral",
  deepSlate: "text-brand-deep-slate",
  coal: "text-brand-coal",
} as const;

function renderSpan(block: PortableHeadingBlock, span: PortableTextSpan) {
  const colorMark = span.marks
    ?.map((markKey) => block.markDefs?.find((mark) => mark._key === markKey))
    .find((mark): mark is TextColorMark => mark?._type === "textColor");

  const className = colorMark?.color
    ? textColorClassNames[colorMark.color]
    : undefined;

  if (!className) {
    return span.text;
  }

  return (
    <span className={className} key={span._key}>
      {span.text}
    </span>
  );
}

export function renderPortableHeadingText(
  value: PortableHeadingBlock[] | undefined,
): ReactNode {
  if (!value?.length) {
    return null;
  }

  return value.map((block, blockIndex) => {
    const children = block.children?.map((span) => renderSpan(block, span));

    return (
      <span key={block._key} className={cn(blockIndex > 0 && "block")}>
        {children}
      </span>
    );
  });
}
