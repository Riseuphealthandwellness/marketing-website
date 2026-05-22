import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
type ConditionListItem = { slug: string; title: string };

type ConditionListProps = {
  conditions: ConditionListItem[];
  serviceSlug: string;
  heading?: string;
};

export function ConditionList({ conditions, serviceSlug, heading }: ConditionListProps) {
  if (conditions.length === 0) return null;

  return (
    <Section>
      <Container>
        {heading ? (
          <h2 className="font-heading text-3xl font-black tracking-normal text-foreground sm:text-4xl">
            {heading}
          </h2>
        ) : null}
        <div className={heading ? "mt-8 columns-1 gap-x-8 sm:columns-2 lg:columns-3" : "columns-1 gap-x-8 sm:columns-2 lg:columns-3"}>
          {conditions.map((condition) => (
            <div key={condition.slug} className="mb-2 break-inside-avoid">
              <Link
                href={`/care/${serviceSlug}/${condition.slug}`}
                className="group flex items-start gap-2 rounded px-2 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted/60 hover:text-brand-action"
              >
                <ArrowRight
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-brand-action"
                />
                {condition.title}
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
