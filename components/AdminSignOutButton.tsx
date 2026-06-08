"use client";

import { useClerk } from "@clerk/nextjs";

type AdminSignOutButtonProps = {
  email: string;
};

export function AdminSignOutButton({ email }: AdminSignOutButtonProps) {
  const { signOut } = useClerk();

  return (
    <div className="elegant-surface flex flex-col gap-3 border border-ivory/10 p-4 sm:flex-row sm:items-center">
      <p className="text-xs uppercase tracking-[0.18em] text-ivory-muted">
        Signed in as{" "}
        <span className="normal-case tracking-normal text-ivory">{email}</span>
      </p>
      <button
        type="button"
        onClick={() => signOut({ redirectUrl: "/sign-in" })}
        className="border border-gold/40 px-4 py-3 text-xs uppercase tracking-[0.18em] text-ivory transition hover:border-gold hover:bg-gold/15"
      >
        Sign Out
      </button>
    </div>
  );
}
