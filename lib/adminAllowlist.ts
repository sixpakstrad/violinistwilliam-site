export function splitEnvList(value: string | undefined) {
  return (value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function getApprovedAdminEmails() {
  return new Set(
    splitEnvList(`${process.env.ADMIN_EMAILS ?? ""},${process.env.ADMIN_EMAIL ?? ""}`)
      .map((email) => email.toLowerCase()),
  );
}

export function getApprovedAdminUserIds() {
  return new Set(
    splitEnvList(
      `${process.env.ADMIN_USER_IDS ?? ""},${process.env.ADMIN_CLERK_USER_ID ?? ""}`,
    ),
  );
}

export function getEmailFromClaims(sessionClaims: unknown) {
  if (!sessionClaims || typeof sessionClaims !== "object") {
    return "";
  }

  const claims = sessionClaims as Record<string, unknown>;
  const directEmail = claims.email;

  if (typeof directEmail === "string") {
    return directEmail.toLowerCase();
  }

  const primaryEmail = claims.primaryEmailAddress;

  if (primaryEmail && typeof primaryEmail === "object") {
    const emailAddress = (primaryEmail as Record<string, unknown>).emailAddress;
    if (typeof emailAddress === "string") {
      return emailAddress.toLowerCase();
    }
  }

  return "";
}

export function isApprovedAdmin(userId: string, email: string) {
  const approvedUserIds = getApprovedAdminUserIds();

  if (userId && approvedUserIds.has(userId)) {
    return true;
  }

  const approvedEmails = getApprovedAdminEmails();

  return Boolean(email && approvedEmails.has(email.toLowerCase()));
}
