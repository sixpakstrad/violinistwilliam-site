import { currentUser } from "@clerk/nextjs/server";

export type AdminAccess = {
  email: string;
  isAllowed: boolean;
};

export function getApprovedAdminEmails() {
  return new Set(
    (process.env.ADMIN_EMAILS ?? "")
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean),
  );
}

export async function getAdminAccess(): Promise<AdminAccess> {
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress?.toLowerCase() ?? "";
  const approvedEmails = getApprovedAdminEmails();

  return {
    email,
    isAllowed: Boolean(email && approvedEmails.has(email)),
  };
}

// Vercel setup note:
// Add ADMIN_EMAILS, NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, and CLERK_SECRET_KEY in
// Vercel Project Settings > Environment Variables for Production and Preview.
