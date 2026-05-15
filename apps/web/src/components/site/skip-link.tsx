export function SkipLink() {
  return (
    <a
      className="sr-only z-50 rounded-md bg-primary px-4 py-3 text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      href="#main-content"
    >
      Skip to main content
    </a>
  );
}
