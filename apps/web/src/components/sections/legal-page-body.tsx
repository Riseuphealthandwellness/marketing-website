import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { PortableTextContent } from "@/components/cms/portable-text-content";

type LegalPageBodyProps = {
  body?: unknown[];
  title?: string;
};

function normalizeTitle(value: string) {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}

function getPortableTextBlockText(block: unknown) {
  if (!block || typeof block !== "object") return "";

  const maybeBlock = block as { _type?: unknown; children?: unknown };
  if (maybeBlock._type !== "block" || !Array.isArray(maybeBlock.children)) {
    return "";
  }

  return maybeBlock.children
    .map((child) => {
      if (!child || typeof child !== "object") return "";

      const maybeSpan = child as { text?: unknown };
      return typeof maybeSpan.text === "string" ? maybeSpan.text : "";
    })
    .join("");
}

function removeDuplicateTitleBlock(body: unknown[] | undefined, title: string | undefined) {
  if (!body?.length || !title) return body;

  const [firstBlock, ...remainingBlocks] = body;
  if (normalizeTitle(getPortableTextBlockText(firstBlock)) === normalizeTitle(title)) {
    return remainingBlocks;
  }

  return body;
}

export function LegalPageBody({ body, title }: LegalPageBodyProps) {
  const visibleBody = removeDuplicateTitleBlock(body, title);

  return (
    <Section>
      <Container>
        <div className="max-w-4xl">
          {visibleBody && visibleBody.length > 0 ? (
            <PortableTextContent value={visibleBody} />
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
