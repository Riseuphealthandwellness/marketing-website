import Image from "next/image";
import { redirect } from "next/navigation";

import { auth, signOut } from "@/auth";

export default async function StudioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");

  async function handleSignOut() {
    "use server";
    await signOut({ redirectTo: "/sign-in" });
  }

  const user = session.user;
  const initials = getInitials(user.name ?? user.email ?? "?");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/90 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between gap-4">
            {/* Logo */}
            <a href="/studio" className="flex items-center gap-2.5 no-underline">
              <Image
                src="/images/brand/riseup-logo-dark-nobg.png"
                alt="RiseUp"
                width={96}
                height={28}
                className="h-7 w-auto"
              />
              <span
                className="rounded bg-brand-action px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-warm-white leading-none"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Studio
              </span>
            </a>

            {/* Nav */}
            <nav className="hidden sm:flex items-center gap-6" aria-label="Studio navigation">
              <a
                href="/studio"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors no-underline"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Dashboard
              </a>
            </nav>

            {/* User + sign-out */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-xs font-semibold text-foreground leading-tight" style={{ fontFamily: "var(--font-sans)" }}>
                  {user.name ?? user.email}
                </p>
                {user.name && (
                  <p className="text-xs text-muted-foreground leading-tight">{user.email}</p>
                )}
              </div>

              {user.image ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={user.image}
                  alt={user.name ?? "User avatar"}
                  width={32}
                  height={32}
                  className="size-8 rounded-full ring-2 ring-border object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div
                  className="size-8 rounded-full bg-brand-action flex items-center justify-center text-xs font-bold text-brand-warm-white"
                  aria-hidden="true"
                >
                  {initials}
                </div>
              )}

              <form action={handleSignOut}>
                <button
                  type="submit"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors font-medium"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Sign out
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}
