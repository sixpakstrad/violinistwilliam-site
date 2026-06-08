import Link from "next/link";

export const metadata = {
  title: "Access Denied | William Samorey",
};

export default function AccessDeniedPage() {
  return (
    <main className="min-h-screen bg-espresso px-5 py-28 text-ivory sm:px-8 lg:px-16">
      <section className="elegant-surface mx-auto max-w-3xl border border-ivory/10 p-8 sm:p-10">
        <p className="text-xs uppercase tracking-[0.32em] text-gold">
          Access Denied
        </p>
        <h1 className="mt-5 font-display text-5xl leading-tight sm:text-6xl">
          This admin account is not approved.
        </h1>
        <p className="mt-5 text-base leading-8 text-ivory-muted">
          You are signed in, but this email address is not listed as an approved
          admin for William Samorey / Winspiration Studio LLC.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/sign-in"
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
