import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { AdminSignOutButton } from "@/components/AdminSignOutButton";

export const metadata = {
  title: "Access Denied | William Samorey",
};

export default async function AccessDeniedPage() {
  const user = await currentUser();
  const isSignedIn = Boolean(user);
  const userId = user?.id ?? "Not available";
  const email =
    user?.primaryEmailAddress?.emailAddress ??
    user?.emailAddresses?.[0]?.emailAddress ??
    "Not available";

  return (
    <main className="min-h-screen bg-espresso px-5 py-28 text-ivory sm:px-8 lg:px-16">
      <section className="elegant-surface mx-auto max-w-3xl border border-ivory/10 p-8 sm:p-10">
        <p className="text-xs uppercase tracking-[0.32em] text-gold">
          Access Denied
        </p>
        <h1 className="mt-5 font-display text-5xl leading-tight sm:text-6xl">
          Signed in, but not approved for admin access.
        </h1>
        <p className="mt-5 text-base leading-8 text-ivory-muted">
          Clerk recognized the sign-in, but this account's Clerk user ID is not
          on the approved admin list for William Samorey / Winspiration Studio
          LLC.
        </p>
        <div className="mt-8 border border-ivory/10 bg-espresso/40 p-5 text-sm leading-7 text-ivory-muted">
          <p>
            <span className="text-ivory">Detected email:</span> {email}
          </p>
          <p className="break-all">
            <span className="text-ivory">Clerk user ID:</span> {userId}
          </p>
          <p className="mt-4">
            For local development and Vercel, add this Clerk user ID to{" "}
            <span className="font-mono text-ivory">ADMIN_USER_IDS</span>.
            Email addresses are not used for final admin approval.
          </p>
        </div>
        {isSignedIn ? (
          <div className="mt-8">
            <AdminSignOutButton email={email} />
          </div>
        ) : null}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/admin/sign-in"
            className="inline-flex min-h-12 items-center justify-center border border-gold/40 px-5 text-xs uppercase tracking-[0.18em] text-ivory transition hover:border-gold hover:bg-gold/15"
          >
            Try Another Account
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center bg-ivory px-5 text-xs uppercase tracking-[0.18em] text-espresso transition hover:bg-gold"
          >
            Return Home
          </Link>
        </div>
      </section>
    </main>
  );
}
