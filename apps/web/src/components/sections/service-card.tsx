import { ArrowRight } from "lucide-react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ServiceHighlight } from "@/lib/cms/types";

type ServiceCardProps = {
  service: ServiceHighlight;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{service.title}</CardTitle>
        <CardDescription>{service.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Link
          className="inline-flex items-center gap-2 text-sm font-bold text-secondary hover:underline"
          href={service.href}
        >
          Learn more
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </CardContent>
    </Card>
  );
}
