import { currentUser } from "@clerk/nextjs/server";

import { isApprovedAdminUserId } from "@/lib/adminAllowlist";

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

  return {
    email,
    userId,
    isAllowed: isApprovedAdminUserId(userId),
  };
}

// Production note:
// ADMIN_USER_IDS must be present in the deployed environment.
