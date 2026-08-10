import { ClerkFailed, ClerkLoaded, ClerkLoading, SignUp } from "@clerk/nextjs";

export const metadata = {
  title: "Admin Sign Up | William Samorey",
};

export default function AdminSignUpPage() {
  return (
    <main className="min-h-screen bg-espresso px-5 py-28 text-ivory sm:px-8 lg:px-16">
      <section className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-gold">
            Private Admin
          </p>
          <h1 className="mt-5 font-display text-5xl leading-tight sm:text-6xl">
            Create an approved admin account.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-ivory-muted">
            Only approved accounts can open the editing dashboard.
          </p>
        </div>
        <div className="elegant-surface border border-ivory/10 p-4">
          <ClerkLoading>
            <div className="bg-ivory p-8 text-center text-sm text-espresso/70">
              Loading secure sign up...
            </div>
          </ClerkLoading>
          <ClerkFailed>
            <div className="bg-ivory p-8 text-sm leading-7 text-espresso">
              The secure sign-up service could not load. Check the Clerk
              production domain and DNS settings, then refresh this page.
            </div>
          </ClerkFailed>
          <ClerkLoaded>
            <SignUp
              routing="path"
              path="/admin/sign-up"
              signInUrl="/admin/sign-in"
              forceRedirectUrl="/admin"
              fallbackRedirectUrl="/admin"
            />
          </ClerkLoaded>
        </div>
      </section>
    </main>
  );
}
