export function splitEnvList(value: string | undefined) {
  return (value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeClerkUserId(userId: string) {
  return userId.trim().replace(/^USER_/, "user_");
}

export function getApprovedAdminUserIds() {
  return new Set(
    splitEnvList([
      process.env.ADMIN_USER_IDS,
      process.env.ADMIN_CLERK_USER_ID,
      process.env.admin_user_ids,
      process.env.admin_clerk_user_id,
    ].join(",")).map(normalizeClerkUserId),
  );
}

export function getApprovedAdminEmails() {
  return new Set(
    splitEnvList(process.env.ADMIN_EMAILS).map((email) => email.toLowerCase()),
  );
}

export function isApprovedAdminUserId(userId: string) {
  const approvedUserIds = getApprovedAdminUserIds();

  return Boolean(userId && approvedUserIds.has(normalizeClerkUserId(userId)));
}

export function isApprovedAdminEmail(email: string) {
  const approvedEmails = getApprovedAdminEmails();

  return Boolean(email && approvedEmails.has(email.toLowerCase()));
}

export function isApprovedAdmin({
  userId,
  email,
}: {
  userId: string;
  email: string;
}) {
  return isApprovedAdminUserId(userId) || isApprovedAdminEmail(email);
}
