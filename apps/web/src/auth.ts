import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const ALLOWED_EMAIL_DOMAINS = process.env.AUTH_ALLOWED_DOMAINS?.split(",").map((d) => d.trim()).filter(Boolean) ?? [];

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async signIn({ user }) {
      if (ALLOWED_EMAIL_DOMAINS.length === 0) return true;
      const email = user.email ?? "";
      const domain = email.split("@")[1];
      return ALLOWED_EMAIL_DOMAINS.includes(domain);
    },
    authorized({ auth: session, request: { nextUrl } }) {
      const isLoggedIn = !!session?.user;
      const isStudio = nextUrl.pathname.startsWith("/studio");
      if (isStudio && !isLoggedIn) {
        const signInUrl = new URL("/sign-in", nextUrl.origin);
        signInUrl.searchParams.set("provider", "google");
        signInUrl.searchParams.set("callbackUrl", nextUrl.pathname);
        return Response.redirect(signInUrl);
      }
      return true;
    },
  },
});
