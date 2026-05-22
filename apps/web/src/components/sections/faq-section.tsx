import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import type { Faq } from "@/lib/cms/types";

type FaqSectionProps = {
  faqs: Faq[];
  heading?: string;
};

export function FaqSection({ faqs, heading }: FaqSectionProps) {
  if (faqs.length === 0) return null;

  return (
    <Section>
      <Container>
        {heading ? (
          <h2 className="font-heading text-3xl font-black tracking-normal text-foreground sm:text-4xl">
            {heading}
          </h2>
        ) : null}
        <dl className={heading ? "mt-8 divide-y divide-border" : "divide-y divide-border"}>
          {faqs.map((faq, i) => (
            <details key={i} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <dt className="font-heading text-base font-black tracking-normal text-foreground">
                  {faq.question}
                </dt>
                <span
                  aria-hidden="true"
                  className="shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </summary>
              <dd className="mt-3 text-base leading-7 text-muted-foreground">{faq.answer}</dd>
            </details>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
