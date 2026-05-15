import { PortableText } from "@portabletext/react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import type { PageBlock } from "@/lib/cms/types";

type PageBlocksProps = {
  blocks: PageBlock[];
};

export function PageBlocks({ blocks }: PageBlocksProps) {
  return (
    <>
      {blocks.map((block, index) => {
        if (block._type === "pageSection") {
          return (
            <Section key={index}>
              <Container>
                <div className="max-w-4xl space-y-4">
                  <h2 className="text-2xl font-semibold tracking-normal text-foreground">
                    {block.heading}
                  </h2>
                  <div className="prose prose-slate max-w-none leading-8 text-muted-foreground">
                    <PortableText value={block.body as Parameters<typeof PortableText>[0]['value']} />
                  </div>
                </div>
              </Container>
            </Section>
          );
        }

        if (block._type === "ctaBlock") {
          return (
            <Section key={index} tone="muted">
              <Container>
                <div className="max-w-4xl space-y-5">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-normal text-foreground">
                      {block.heading}
                    </h2>
                    <p className="mt-3 text-base leading-8 text-muted-foreground">
                      {block.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <a
                      className="inline-flex h-10 items-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                      href={block.primaryHref}
                    >
                      {block.primaryLabel}
                    </a>
                    {block.secondaryLabel && block.secondaryHref ? (
                      <a
                        className="inline-flex h-10 items-center rounded-md border border-border px-5 text-sm font-semibold transition-colors hover:bg-muted"
                        href={block.secondaryHref}
                      >
                        {block.secondaryLabel}
                      </a>
                    ) : null}
                  </div>
                </div>
              </Container>
            </Section>
          );
        }

        return null;
      })}
    </>
  );
}
