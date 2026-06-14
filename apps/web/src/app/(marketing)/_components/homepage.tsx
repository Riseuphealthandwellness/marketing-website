import {
  ArrowRight,
  Brain,
  CheckCircle2,
  ClipboardList,
  HeartHandshake,
  HeartPulse,
  MapPin,
  PhoneCall,
  Route,
  Send,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UsersRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { createElement, type ComponentType } from "react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { getProgramHref, getServiceHref } from "@/lib/care-routes";
import type {
  HomepageComponent,
  HomepageIconName,
  HomepageOffering,
  HomepageSettings,
  Program,
  Service,
} from "@/lib/cms/types";
import { cn } from "@/lib/utils";

type Icon = ComponentType<{ className?: string; "aria-hidden"?: boolean }>;

const iconMap = {
  arrowRight: ArrowRight,
  brain: Brain,
  checkCircle: CheckCircle2,
  clipboardList: ClipboardList,
  heartHandshake: HeartHandshake,
  heartPulse: HeartPulse,
  mapPin: MapPin,
  phoneCall: PhoneCall,
  route: Route,
  send: Send,
  shieldCheck: ShieldCheck,
  sparkles: Sparkles,
  stethoscope: Stethoscope,
  usersRound: UsersRound,
} satisfies Record<HomepageIconName, Icon>;

function getIcon(iconName?: HomepageIconName) {
  return iconMap[iconName ?? "heartPulse"] ?? HeartPulse;
}

function HomepageIcon({
  name,
  className,
}: {
  name?: HomepageIconName;
  className?: string;
}) {
  return createElement(getIcon(name), { "aria-hidden": true, className });
}

function Eyebrow({ children, className }: { children: string; className?: string }) {
  return (
    <p className={cn("font-heading text-sm font-black uppercase text-brand-warm-accent", className)}>
      {children}
    </p>
  );
}

function IconTile({
  icon,
  title,
  body,
  image,
  className,
}: {
  icon?: HomepageIconName;
  title: string;
  body: string;
  image?: { url: string; alt?: string };
  className?: string;
}) {
  if (image?.url) {
    return (
      <article className={cn("overflow-hidden rounded-lg border border-border bg-white shadow-sm", className)}>
        <div className="relative">
          <div className="aspect-[4/3] overflow-hidden">
            <Image
              alt={image.alt ?? title}
              className="h-full w-full object-cover"
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              src={image.url}
            />
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-10">
            <span className="flex size-12 items-center justify-center rounded-md bg-brand-trust text-brand-soft-accent shadow-md ring-2 ring-white">
              <HomepageIcon className="size-6" name={icon} />
            </span>
          </div>
        </div>
        <div className="p-5 pt-9">
          <h3 className="font-heading text-xl font-black tracking-normal text-brand-coal">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-brand-coal/72">{body}</p>
        </div>
      </article>
    );
  }

  return (
    <article className={cn("rounded-lg border border-border bg-white p-5 shadow-sm", className)}>
      <span className="flex size-12 items-center justify-center rounded-md bg-brand-trust text-brand-soft-accent">
        <HomepageIcon className="size-6" name={icon} />
      </span>
      <h3 className="mt-4 font-heading text-xl font-black tracking-normal text-brand-coal">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-brand-coal/72">{body}</p>
    </article>
  );
}

function StartPathCard({
  icon,
  title,
  body,
  href,
  label,
}: {
  icon?: HomepageIconName;
  title: string;
  body: string;
  href: string;
  label: string;
}) {
  return (
    <article className="rounded-lg border border-white/18 bg-white/88 p-5 text-brand-coal shadow-[0_22px_54px_rgb(31_28_25_/_22%)] backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <span className="flex size-11 items-center justify-center rounded-md bg-brand-warm-white text-brand-action">
          <HomepageIcon className="size-5" name={icon} />
        </span>
        <h3 className="font-heading text-xl font-black tracking-normal">{title}</h3>
      </div>
      <p className="mt-3 text-sm leading-6 text-brand-coal/72">{body}</p>
      <Link
        className="mt-5 inline-flex items-center gap-2 font-heading text-sm font-black text-brand-action hover:text-brand-action-hover hover:underline"
        href={href}
      >
        {label}
        <ArrowRight aria-hidden={true} className="size-4" />
      </Link>
    </article>
  );
}

function ServiceFeatureCard({
  icon,
  title,
  body,
  href,
  eyebrow,
}: {
  icon?: HomepageIconName;
  title: string;
  body: string;
  href: string;
  eyebrow: string;
}) {
  return (
    <Link
      className="group grid gap-4 rounded-lg border border-border bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-brand-action/50 hover:shadow-[0_18px_36px_rgb(31_28_25_/_12%)] focus-visible:ring-2 focus-visible:ring-brand-action sm:grid-cols-[3.75rem_1fr_auto] sm:items-center"
      href={href}
    >
      <span className="flex size-13 items-center justify-center bg-brand-trust text-brand-soft-accent transition-colors duration-200 group-hover:bg-brand-action group-hover:text-brand-warm-white">
        <HomepageIcon
          className="size-6 transition-transform duration-200 group-hover:scale-110"
          name={icon}
        />
      </span>
      <div>
        <p className="font-heading text-xs font-black uppercase text-brand-warm-accent">
          {eyebrow}
        </p>
        <h3 className="mt-1 font-heading text-2xl font-black tracking-normal text-brand-coal transition-colors duration-200 group-hover:text-brand-action">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-brand-coal/70">{body}</p>
      </div>
      <span className="hidden size-10 items-center justify-center bg-brand-warm-white text-brand-action transition-colors duration-200 group-hover:bg-brand-action group-hover:text-brand-warm-white sm:flex">
        <ArrowRight aria-hidden={true} className="size-5 transition-transform duration-200 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

function WaveDivider() {
  return (
    <svg
      aria-hidden={true}
      className="absolute inset-x-0 bottom-[-1px] h-20 w-full text-brand-warm-white sm:h-24"
      preserveAspectRatio="none"
      viewBox="0 0 1440 120"
    >
      <path
        d="M0 78L80 68C160 58 320 38 480 46C640 54 800 90 960 92C1120 94 1280 62 1360 46L1440 30V120H0V78Z"
        fill="currentColor"
      />
    </svg>
  );
}

type HeroComponent = Extract<HomepageComponent, { _type: "homepageHeroComponent" }>;
type AdvantageComponent = Extract<HomepageComponent, { _type: "homepageAdvantageComponent" }>;
type ServicesComponent = Extract<HomepageComponent, { _type: "homepageServicesComponent" }>;
type ProcessComponent = Extract<HomepageComponent, { _type: "homepageProcessComponent" }>;
type CareCoordinationComponent = Extract<
  HomepageComponent,
  { _type: "homepageCareCoordinationComponent" }
>;
type FinalCtaComponent = Extract<HomepageComponent, { _type: "homepageFinalCtaComponent" }>;

function Hero({ content }: { content: HeroComponent }) {
  const buttons = content.buttons ?? [];
  const pathCards = content.pathCards ?? [];
  const backgroundImage = content.backgroundImage;

  return (
    <section className="relative isolate min-h-[720px] overflow-hidden bg-brand-coal text-brand-warm-white">
      {backgroundImage?.url ? (
        <Image
          alt={backgroundImage.alt ?? ""}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          fill
          priority
          sizes="100vw"
          src={backgroundImage.url}
        />
      ) : null}
      <div
        aria-hidden={true}
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(31_28_25_/_0.18),rgb(31_28_25_/_0.72)_64%,rgb(31_28_25_/_0.86))]"
      />
      <Container className="relative z-10 flex min-h-[720px] items-end pb-24 pt-12 sm:pb-28 sm:pt-16 lg:pb-32">
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,0.45fr)] lg:items-end">
          <div>
            {content.eyebrow ? (
              <Eyebrow className="text-brand-emphasis">{content.eyebrow}</Eyebrow>
            ) : null}
            <h1 className="mt-4 max-w-4xl font-heading text-5xl font-black leading-[1.02] tracking-normal sm:text-6xl lg:text-7xl">
              {content.heading}
            </h1>
            {content.description ? (
              <p className="mt-6 max-w-2xl text-xl leading-9 text-brand-warm-white/84">
                {content.description}
              </p>
            ) : null}
            {buttons?.length ? (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {buttons.map((button, index) => {
                  const isPrimary = button.style !== "secondary";
                  const ButtonIcon = ArrowRight;

                  return (
                    <Button
                      asChild
                      className={cn(
                        "min-h-13 px-7",
                        !isPrimary && "border-white/34 bg-white/12 text-white hover:bg-white/18",
                      )}
                      key={`${button.href}-${button.label}`}
                      size="lg"
                      variant={isPrimary ? "default" : "outline"}
                    >
                      <Link href={button.href}>
                        {button.label}
                        {button.icon !== "none" || index === 0 ? (
                          <ButtonIcon aria-hidden={true} className="size-4" />
                        ) : null}
                      </Link>
                    </Button>
                  );
                })}
              </div>
            ) : null}
          </div>
          <div className="grid gap-3">
            {pathCards?.map((card) => (
              <StartPathCard
                body={card.body}
                href={card.link.href}
                icon={card.icon}
                key={`${card.title}-${card.link.href}`}
                label={card.link.label}
                title={card.title}
              />
            ))}
          </div>
        </div>
      </Container>
      <WaveDivider />
    </section>
  );
}

function AdvantageSection({ content }: { content: AdvantageComponent }) {
  const advantages = content.cards ?? [];

  return (
    <section className="bg-brand-warm-white py-14 sm:py-16">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            {content.eyebrow ? <Eyebrow>{content.eyebrow}</Eyebrow> : null}
            <h2 className="mt-3 max-w-xl font-heading text-4xl font-black tracking-normal text-brand-coal sm:text-5xl">
              {content.heading}
            </h2>
          </div>
          {content.description ? (
            <p className="max-w-3xl text-lg leading-8 text-brand-coal/72">
              {content.description}
            </p>
          ) : null}
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {advantages?.map((advantage) => (
            <IconTile
              body={advantage.body}
              icon={advantage.icon}
              image={advantage.image}
              key={advantage.title}
              title={advantage.title}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

function serviceToOffering(service: Service): HomepageOffering {
  return {
    _key: service._id,
    item: {
      _id: service._id,
      _type: "service",
      slug: service.slug,
      title: service.title,
      description: service.description,
      icon: service.icon,
      cardEyebrow: service.cardEyebrow,
      href: service.href,
    },
  };
}

function programToOffering(program: Program): HomepageOffering {
  return {
    _key: program._id ?? program.slug,
    item: {
      _id: program._id ?? program.slug,
      _type: "program",
      slug: program.slug,
      title: program.title,
      description: program.description,
      icon: program.icon,
      cardEyebrow: program.cardEyebrow,
      audience: program.audience,
      href: program.href,
    },
  };
}

function servicesToOfferings(services: Service[], programs: Program[]): HomepageOffering[] {
  return [...services.map(serviceToOffering), ...programs.map(programToOffering)];
}

function getServicesSectionOfferings(
  content: ServicesComponent,
  allServices: Service[],
  allPrograms: Program[],
): HomepageOffering[] {
  const selected = content.offerings?.filter((offering) => offering.item) ?? [];

  if (content.listingSource !== "allActiveServices") {
    return selected.length > 0 ? selected : servicesToOfferings(allServices, allPrograms);
  }

  const activeServiceOfferings = new Map(
    allServices.map((service) => [service._id, serviceToOffering(service)]),
  );
  const ordered: HomepageOffering[] = [];

  for (const offering of selected) {
    const item = offering.item;
    if (!item || item._type !== "service") continue;

    const activeOffering = activeServiceOfferings.get(item._id);
    if (!activeOffering) continue;

    ordered.push({
      _key: offering._key ?? activeOffering._key,
      item: {
        ...activeOffering.item!,
        ...item,
        icon: item.icon ?? activeOffering.item?.icon,
        cardEyebrow: item.cardEyebrow ?? activeOffering.item?.cardEyebrow,
        href: item.href ?? activeOffering.item?.href,
      },
    });
    activeServiceOfferings.delete(item._id);
  }

  return [...ordered, ...activeServiceOfferings.values()];
}

function ServicesSection({
  content,
  allServices,
  allPrograms,
}: {
  content: ServicesComponent;
  allServices: Service[];
  allPrograms: Program[];
}) {
  const offerings = getServicesSectionOfferings(content, allServices, allPrograms);
  const featureImage = content.featureImage;

  return (
    <section className="relative isolate overflow-hidden bg-brand-trust py-16 text-brand-warm-white sm:py-20">
      <svg
        aria-hidden={true}
        className="absolute inset-0 -z-10 h-full w-full opacity-18"
        preserveAspectRatio="none"
        viewBox="0 0 1440 680"
      >
        <path
          d="M-80 560C120 466 246 630 450 520C630 423 740 282 980 360C1170 422 1288 302 1510 346"
          fill="none"
          stroke="rgb(246 140 93 / 0.72)"
          strokeWidth="3"
        />
        <path
          d="M-90 420C160 322 290 476 510 374C702 285 842 142 1064 214C1248 274 1342 178 1514 206"
          fill="none"
          stroke="rgb(242 193 78 / 0.62)"
          strokeWidth="3"
        />
        <path
          d="M-60 246C180 184 330 282 540 226C768 165 900 48 1130 104C1308 147 1378 86 1520 98"
          fill="none"
          stroke="rgb(247 243 238 / 0.38)"
          strokeWidth="2"
        />
      </svg>
      <Container className="relative">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-end">
          <div>
            {content.eyebrow ? (
              <Eyebrow className="text-brand-soft-accent">{content.eyebrow}</Eyebrow>
            ) : null}
            <h2 className="mt-3 max-w-3xl font-heading text-4xl font-black tracking-normal sm:text-5xl">
              {content.heading}
            </h2>
          </div>
          {content.description ? (
            <p className="max-w-2xl text-lg leading-8 text-brand-warm-white/78">
              {content.description}
            </p>
          ) : null}
        </div>

        <div className="mt-10 overflow-hidden rounded-lg bg-brand-warm-white text-brand-coal shadow-[0_28px_70px_rgb(31_28_25_/_24%)]">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            {featureImage?.url ? (
              <div className="relative min-h-[430px] overflow-hidden lg:min-h-[640px]">
                <Image
                  alt={featureImage.alt ?? ""}
                  className="object-cover object-center"
                  fill
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  src={featureImage.url}
                />
              </div>
            ) : null}

            <div className="flex flex-col justify-center bg-[linear-gradient(180deg,#fffdfa,#f7f3ee)] p-5 sm:p-7 lg:p-8">
              <div className="grid gap-4">
                {offerings.map((offering) => {
                  const item = offering.item!;
                  const href =
                    item._type === "program" ? getProgramHref(item) : getServiceHref(item);

                  return (
                    <ServiceFeatureCard
                      body={item.description}
                      eyebrow={item.cardEyebrow ?? item.audience ?? ""}
                      href={href}
                      icon={item.icon}
                      key={`${item._type}-${item._id}`}
                      title={item.title}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ProcessSection({ content }: { content: ProcessComponent }) {
  const steps = content.steps ?? [];

  return (
    <section className="bg-brand-warm-white py-14 sm:py-16">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          {content.eyebrow ? <Eyebrow>{content.eyebrow}</Eyebrow> : null}
          <h2 className="mt-3 font-heading text-4xl font-black tracking-normal text-brand-coal sm:text-5xl">
            {content.heading}
          </h2>
          {content.description ? (
            <p className="mt-5 text-lg leading-8 text-brand-coal/72">{content.description}</p>
          ) : null}
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {steps?.map((step) => (
            <article className="rounded-lg border border-border bg-white p-6 shadow-sm" key={step.title}>
              <div className="flex items-center gap-4">
                <span className="flex size-12 items-center justify-center rounded-md bg-brand-action text-brand-warm-white">
                  <HomepageIcon className="size-7" name={step.icon} />
                </span>
              </div>
              <h3 className="mt-5 font-heading text-2xl font-black tracking-normal text-brand-coal">
                {step.title}
              </h3>
              <p className="mt-2 text-base leading-7 text-brand-coal/72">{step.body}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function TrustBand({ content }: { content: CareCoordinationComponent }) {
  const careMapCards = content.careMapCards ?? [];
  const splitIndex = Math.ceil((careMapCards?.length ?? 0) / 2);
  const leftCards = careMapCards?.slice(0, splitIndex) ?? [];
  const rightCards = careMapCards?.slice(splitIndex) ?? [];
  const centerCard = content.centerCard;

  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(135deg,var(--brand-trust),#2f444e)] py-14 text-brand-warm-white sm:py-16">
      <svg
        aria-hidden={true}
        className="absolute inset-0 -z-10 h-full w-full opacity-16"
        preserveAspectRatio="none"
        viewBox="0 0 1440 520"
      >
        <path
          d="M-80 420C130 332 275 492 478 378C648 282 760 162 992 232C1196 294 1300 186 1520 228"
          fill="none"
          stroke="rgb(246 140 93 / 0.5)"
          strokeWidth="3"
        />
        <path
          d="M-60 310C148 240 300 356 508 284C720 211 818 88 1032 150C1208 201 1328 116 1500 138"
          fill="none"
          stroke="rgb(242 193 78 / 0.45)"
          strokeWidth="3"
        />
        <path
          d="M-80 198C160 132 330 222 528 174C744 122 858 20 1088 72C1262 111 1368 48 1516 60"
          fill="none"
          stroke="rgb(247 243 238 / 0.28)"
          strokeWidth="3"
        />
      </svg>
      <Container className="relative">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            {content.eyebrow ? (
              <Eyebrow className="text-brand-soft-accent">{content.eyebrow}</Eyebrow>
            ) : null}
            <h2 className="mt-3 max-w-xl font-heading text-4xl font-black tracking-normal sm:text-5xl">
              {content.heading}
            </h2>
            {content.description ? (
              <p className="mt-5 max-w-xl text-lg leading-8 text-brand-warm-white/78">
                {content.description}
              </p>
            ) : null}
            <div className="mt-7 h-1.5 w-28 rounded-full bg-[linear-gradient(90deg,var(--brand-soft-accent),var(--brand-emphasis))]" />
          </div>
          <div className="relative min-h-[360px] overflow-hidden rounded-lg border border-white/24 bg-brand-warm-white p-6 text-brand-coal shadow-[0_22px_54px_rgb(31_28_25_/_20%)] sm:p-8">
            <svg
              aria-hidden={true}
              className="absolute inset-0 h-full w-full opacity-34"
              preserveAspectRatio="none"
              viewBox="0 0 720 420"
            >
              <path
                d="M-40 330C70 282 125 382 228 327C318 279 382 198 500 239C612 278 653 198 760 224"
                fill="none"
                stroke="rgb(246 140 93 / 0.34)"
                strokeWidth="2"
              />
              <path
                d="M-28 260C82 214 150 288 250 242C354 195 410 105 514 142C626 181 664 120 748 140"
                fill="none"
                stroke="rgb(242 193 78 / 0.34)"
                strokeWidth="2"
              />
              <path
                d="M-32 190C82 150 148 202 245 173C352 140 398 54 522 82C614 103 664 64 750 78"
                fill="none"
                stroke="rgb(78 101 112 / 0.18)"
                strokeWidth="2"
              />
            </svg>
            <div className="relative flex h-full min-h-[304px] items-center justify-center">
              <div className="grid w-full max-w-xl gap-5 sm:grid-cols-[1fr_1.1fr_1fr] sm:items-center">
                <div className="space-y-5">
                  {leftCards.map((card) => (
                    <div
                      className="rounded-lg border border-brand-trust/14 bg-white p-4 text-brand-coal shadow-sm"
                      key={`${card.title}-${card.label}`}
                    >
                      <HomepageIcon className="size-7 text-brand-action" name={card.icon} />
                      <p className="mt-3 font-heading text-lg font-black">{card.title}</p>
                      {card.label ? (
                        <p className="mt-1 text-xs font-bold uppercase text-brand-trust/64">
                          {card.label}
                        </p>
                      ) : null}
                    </div>
                  ))}
                </div>
                {centerCard ? (
                  <div className="relative rounded-lg border border-brand-emphasis/45 bg-white p-5 text-center text-brand-coal shadow-[0_22px_48px_rgb(31_28_25_/_14%)]">
                    <span className="mx-auto flex size-14 items-center justify-center rounded-md bg-brand-action text-brand-warm-white motion-safe:animate-pulse">
                      <HomepageIcon className="size-8" name={centerCard.icon} />
                    </span>
                    <p className="mt-4 font-heading text-2xl font-black tracking-normal">
                      {centerCard.title}
                    </p>
                    {centerCard.body ? (
                      <p className="mt-2 text-sm leading-6 text-brand-coal/70">{centerCard.body}</p>
                    ) : null}
                  </div>
                ) : null}
                <div className="space-y-5">
                  {rightCards.map((card) => (
                    <div
                      className="rounded-lg border border-brand-trust/14 bg-white p-4 text-brand-coal shadow-sm"
                      key={`${card.title}-${card.label}`}
                    >
                      <HomepageIcon className="size-7 text-brand-action" name={card.icon} />
                      <p className="mt-3 font-heading text-lg font-black">{card.title}</p>
                      {card.label ? (
                        <p className="mt-1 text-xs font-bold uppercase text-brand-trust/64">
                          {card.label}
                        </p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function FinalBand({ content }: { content: FinalCtaComponent }) {
  const buttons = content.buttons ?? [];

  return (
    <section className="bg-brand-coal py-12 text-brand-warm-white">
      <Container className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          {content.eyebrow ? (
            <p className="font-heading text-sm font-black uppercase text-brand-soft-accent">
              {content.eyebrow}
            </p>
          ) : null}
          <h2 className="mt-2 max-w-3xl font-heading text-3xl font-black tracking-normal sm:text-4xl">
            {content.heading}
          </h2>
        </div>
        {buttons?.length ? (
          <div className="flex flex-col gap-3 sm:flex-row">
            {buttons.map((button) => {
              const isPrimary = button.style !== "secondary";

              return (
                <Button
                  asChild
                  className={cn(
                    isPrimary
                      ? "bg-brand-warm-white text-brand-coal hover:bg-brand-warm-white/90"
                      : "border-brand-warm-white/28 bg-transparent text-brand-warm-white hover:bg-brand-warm-white/10",
                  )}
                  key={`${button.href}-${button.label}`}
                  variant={isPrimary ? "default" : "outline"}
                >
                  <Link href={button.href}>
                    {button.label}
                    {button.icon !== "none" && isPrimary ? (
                      <ArrowRight aria-hidden={true} className="size-4" />
                    ) : null}
                  </Link>
                </Button>
              );
            })}
          </div>
        ) : null}
      </Container>
    </section>
  );
}

function renderComponent(component: HomepageComponent, allServices: Service[], allPrograms: Program[]) {
  if (component.enabled === false) return null;

  switch (component._type) {
    case "homepageHeroComponent":
      return <Hero content={component} key={component._type} />;
    case "homepageAdvantageComponent":
      return <AdvantageSection content={component} key={component._type} />;
    case "homepageServicesComponent":
      return <ServicesSection content={component} allServices={allServices} allPrograms={allPrograms} key={component._type} />;
    case "homepageProcessComponent":
      return <ProcessSection content={component} key={component._type} />;
    case "homepageCareCoordinationComponent":
      return <TrustBand content={component} key={component._type} />;
    case "homepageFinalCtaComponent":
      return <FinalBand content={component} key={component._type} />;
    default:
      return null;
  }
}

export function HomepageConcept({
  settings,
  allServices,
  allPrograms,
}: {
  settings: HomepageSettings;
  allServices: Service[];
  allPrograms: Program[];
}) {
  const components = settings.components ?? [];

  return (
    <>
      {components.map((component, index) => (
        <div key={`${component._type}-${index}`}>{renderComponent(component, allServices, allPrograms)}</div>
      ))}
    </>
  );
}
