export function splitEnvList(value: string | undefined) {
  return (value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function getApprovedAdminUserIds() {
  return new Set(
    splitEnvList(
      `${process.env.ADMIN_USER_IDS ?? ""},${process.env.ADMIN_CLERK_USER_ID ?? ""}`,
    ),
  );
}

export function isApprovedAdminUserId(userId: string) {
  const approvedUserIds = getApprovedAdminUserIds();

  return Boolean(userId && approvedUserIds.has(userId));
}
