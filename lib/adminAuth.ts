import { currentUser } from "@clerk/nextjs/server";

import { isApprovedAdmin } from "@/lib/adminAllowlist";

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
    isAllowed: isApprovedAdmin({ userId, email }),
  };
}

// Production note:
// ADMIN_USER_IDS or ADMIN_EMAILS must be present in the deployed environment.
