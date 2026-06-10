import Link from "next/link";

// Inline styles used intentionally — Turbopack lazy-compiles CSS in dev mode
// and not-found.tsx is hit infrequently enough that Tailwind classes may not
// be compiled on first render.
const TRUST = "#4e6570";
const WARM_WHITE = "#f7f3ee";
const COAL = "#1f1c19";

export default function NotFound() {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: TRUST,
        color: WARM_WHITE,
        padding: "5rem 1.5rem",
        borderBottom: `1px solid rgba(31,28,25,0.2)`,
      }}
    >
      {/* accent gradient bar */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "0 0 auto 0",
          height: 4,
          background: "linear-gradient(90deg,#f26a2e,#f2c14e,#f68c5d)",
          zIndex: 10,
        }}
      />

      <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
        <div style={{ maxWidth: 560 }}>
          <p
            aria-hidden="true"
            style={{
              fontFamily: "var(--font-heading, system-ui)",
              fontSize: "clamp(5rem,12vw,8rem)",
              fontWeight: 900,
              lineHeight: 1,
              color: `rgba(247,243,238,0.10)`,
              userSelect: "none",
            }}
          >
            404
          </p>
          <h1
            style={{
              fontFamily: "var(--font-heading, system-ui)",
              fontSize: "clamp(1.75rem,4vw,2.65rem)",
              fontWeight: 900,
              lineHeight: 1.2,
              color: WARM_WHITE,
              marginTop: "-1rem",
            }}
          >
            Page not found
          </h1>
          <p
            style={{
              marginTop: "1rem",
              fontSize: "1.1rem",
              lineHeight: 1.7,
              color: `rgba(247,243,238,0.75)`,
              maxWidth: 480,
            }}
          >
            The page you&apos;re looking for doesn&apos;t exist or may have
            moved. Try one of the links below to get back on track.
          </p>
          <div style={{ marginTop: "2rem", display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                minHeight: 44,
                padding: "0 1.25rem",
                background: WARM_WHITE,
                color: COAL,
                fontFamily: "var(--font-heading, system-ui)",
                fontWeight: 700,
                fontSize: "0.875rem",
                borderRadius: "0.375rem",
                textDecoration: "none",
              }}
            >
              &#8962; Go home
            </Link>
            <Link
              href="/care"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                minHeight: 44,
                padding: "0 1.25rem",
                background: "rgba(247,243,238,0.08)",
                color: WARM_WHITE,
                border: "1px solid rgba(247,243,238,0.30)",
                fontFamily: "var(--font-heading, system-ui)",
                fontWeight: 700,
                fontSize: "0.875rem",
                borderRadius: "0.375rem",
                textDecoration: "none",
              }}
            >
              Our care &rarr;
            </Link>
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                minHeight: 44,
                padding: "0 1.25rem",
                background: "rgba(247,243,238,0.08)",
                color: WARM_WHITE,
                border: "1px solid rgba(247,243,238,0.30)",
                fontFamily: "var(--font-heading, system-ui)",
                fontWeight: 700,
                fontSize: "0.875rem",
                borderRadius: "0.375rem",
                textDecoration: "none",
              }}
            >
              Contact us &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
