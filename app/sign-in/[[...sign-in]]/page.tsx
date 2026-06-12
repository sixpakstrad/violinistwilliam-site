import { SignIn } from "@clerk/nextjs";

export const metadata = {
  title: "Admin Sign In | William Samorey",
};

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-espresso px-5 py-28 text-ivory sm:px-8 lg:px-16">
      <section className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-gold">
            Private Admin
          </p>
          <h1 className="mt-5 font-display text-5xl leading-tight sm:text-6xl">
            Sign in to manage the site.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-ivory-muted">
            Admin access is protected by Clerk and limited to approved email
            addresses. Two-factor authentication can be enabled from the Clerk
            dashboard.
          </p>
        </div>
        <div className="elegant-surface border border-ivory/10 p-4">
          <SignIn
            routing="path"
            path="/sign-in"
            signUpUrl="/admin/sign-up"
            fallbackRedirectUrl="/admin"
          />
        </div>
      </section>
    </main>
  );
}
