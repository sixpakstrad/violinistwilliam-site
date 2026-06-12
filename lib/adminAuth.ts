import { currentUser } from "@clerk/nextjs/server";

export type AdminAccess = {
  email: string;
  userId: string;
  isAllowed: boolean;
};

export function getApprovedAdminEmails() {
  return new Set(
    `${process.env.ADMIN_EMAILS ?? ""},${process.env.ADMIN_EMAIL ?? ""}`
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean),
  );
}

export function getApprovedAdminUserIds() {
  return new Set(
    `${process.env.ADMIN_USER_IDS ?? ""},${process.env.ADMIN_CLERK_USER_ID ?? ""}`
      .split(",")
      .map((userId) => userId.trim())
      .filter(Boolean),
  );
}

export async function getAdminAccess(): Promise<AdminAccess> {
  const user = await currentUser();
  const userId = user?.id ?? "";
  const email = user?.primaryEmailAddress?.emailAddress?.toLowerCase() ?? "";
  const approvedUserIds = getApprovedAdminUserIds();
  const approvedEmails = getApprovedAdminEmails();

  return {
    email,
    userId,
    isAllowed: Boolean(
      (userId && approvedUserIds.has(userId)) ||
        (email && approvedEmails.has(email)),
    ),
  };
}

// Vercel setup note:
// Add ADMIN_EMAILS or ADMIN_USER_IDS plus Clerk keys in Vercel Project
// Settings > Environment Variables for Production and Preview.
