import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPrivatePageRoute = createRouteMatcher(["/admin(.*)", "/requests(.*)"]);
const isAdminApiRoute = createRouteMatcher(["/api/admin(.*)"]);

function getApprovedAdminEmails() {
  return new Set(
    (process.env.ADMIN_EMAILS ?? "")
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean),
  );
}

function getEmailFromClaims(sessionClaims: unknown) {
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

export default clerkMiddleware(async (auth, req) => {
  if (!isPrivatePageRoute(req) && !isAdminApiRoute(req)) {
    return;
  }

  const authObject = await auth();

  if (!authObject.userId) {
    return authObject.redirectToSignIn({ returnBackUrl: req.url });
  }

  const email = getEmailFromClaims(authObject.sessionClaims);
  const approvedEmails = getApprovedAdminEmails();

  if (!email || !approvedEmails.has(email)) {
    if (isAdminApiRoute(req)) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    return NextResponse.redirect(new URL("/access-denied", req.url));
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
