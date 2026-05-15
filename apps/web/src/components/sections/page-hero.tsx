import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="border-b border-border bg-background py-14 sm:py-20">
      <Container>
        <div className="max-w-4xl">
          {eyebrow ? <Badge>{eyebrow}</Badge> : null}
          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-normal text-foreground sm:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
