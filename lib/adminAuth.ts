import { currentUser } from "@clerk/nextjs/server";

import {
  getApprovedAdminEmails,
  getApprovedAdminUserIds,
} from "@/lib/adminAllowlist";

export type AdminAccess = {
  email: string;
  userId: string;
  isAllowed: boolean;
};

export async function getAdminAccess(): Promise<AdminAccess> {
  const user = await currentUser();
  const userId = user?.id ?? "";
  const email =
    user?.primaryEmailAddress?.emailAddress?.toLowerCase() ??
    user?.emailAddresses?.[0]?.emailAddress?.toLowerCase() ??
    "";
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

// Production note:
// ADMIN_EMAILS or ADMIN_USER_IDS must be present in the deployed environment.
