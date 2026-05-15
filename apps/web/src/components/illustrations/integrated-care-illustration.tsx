const illustrationItems = [
  {
    label: "Primary care",
    icon: "/images/illustrations/fa-user-doctor.svg",
    className: "bg-primary",
  },
  {
    label: "Treatment support",
    icon: "/images/illustrations/fa-hand-holding-heart.svg",
    className: "bg-secondary",
  },
  {
    label: "Connected access",
    icon: "/images/illustrations/fa-house-medical.svg",
    className: "bg-accent",
  },
];

type MaskedFaIconProps = {
  icon: string;
  className: string;
};

function MaskedFaIcon({ icon, className }: MaskedFaIconProps) {
  return (
    <span
      aria-hidden="true"
      className={`block size-12 ${className}`}
      style={{
        WebkitMask: `url(${icon}) center / contain no-repeat`,
        mask: `url(${icon}) center / contain no-repeat`,
      }}
    />
  );
}

export function IntegratedCareIllustration() {
  return (
    <div
      aria-label="Illustration of connected primary care, treatment support, and access"
      className="relative overflow-hidden rounded-lg border border-border bg-card bg-[url('/images/brand/appalachian-sunrise-valley.png')] bg-cover bg-center p-6 shadow-[var(--shadow-soft)]"
      role="img"
    >
      <div className="relative">
        <div className="grid gap-4">
          {illustrationItems.map((item) => (
            <div
              className="flex items-center gap-4 rounded-lg border border-background/70 bg-background/86 p-4 shadow-sm backdrop-blur-[2px]"
              key={item.label}
            >
              <div className="flex size-16 shrink-0 items-center justify-center rounded-md bg-muted">
                <MaskedFaIcon className={item.className} icon={item.icon} />
              </div>
              <div>
                <p className="font-heading text-base font-bold text-foreground">
                  {item.label}
                </p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  One coordinated care path, without collecting sensitive
                  details in the public website.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
