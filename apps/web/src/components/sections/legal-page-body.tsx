import { PortableText } from "@portabletext/react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import type { PortableTextBlock } from "@portabletext/types";

type LegalPageBodyProps = {
  body?: unknown[];
};

export function LegalPageBody({ body }: LegalPageBodyProps) {
  return (
    <Section>
      <Container>
        <div className="prose prose-neutral max-w-4xl dark:prose-invert">
          {body ? (
            <PortableText value={body as PortableTextBlock[]} />
          ) : (
            <p className="text-base leading-8 text-muted-foreground">
              Content coming soon.
            </p>
          )}
        </div>
      </Container>
    </Section>
  );
}
