import { PortableText } from "@portabletext/react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import type { PageSection } from "@/lib/cms/types";

type SimplePageContentProps = {
  sections: PageSection[];
};

export function SimplePageContent({ sections }: SimplePageContentProps) {
  return (
    <Section>
      <Container>
        <div className="max-w-4xl space-y-10">
          {sections.map((section) => (
            <section className="space-y-3" key={section.heading}>
              <h2 className="text-2xl font-semibold tracking-normal text-foreground">
                {section.heading}
              </h2>
              <div className="prose prose-slate max-w-none text-base leading-8 text-muted-foreground">
                <PortableText value={section.body as Parameters<typeof PortableText>[0]['value']} />
              </div>
            </section>
          ))}
        </div>
      </Container>
    </Section>
  );
}
