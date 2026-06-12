import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { isApprovedAdminUserId } from "@/lib/adminAllowlist";

const isPrivatePageRoute = createRouteMatcher(["/admin(.*)", "/requests(.*)"]);
const isAdminApiRoute = createRouteMatcher(["/api/admin(.*)"]);
const isAdminAuthRoute = createRouteMatcher([
  "/admin/sign-in(.*)",
  "/admin/sign-up(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isAdminAuthRoute(req)) {
    return;
  }

  if (!isPrivatePageRoute(req) && !isAdminApiRoute(req)) {
    return;
  }

  const authObject = await auth();

  if (!authObject.userId) {
    return authObject.redirectToSignIn({ returnBackUrl: req.url });
  }

  if (isApprovedAdminUserId(authObject.userId)) {
    return;
  }

  if (isAdminApiRoute(req)) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  return NextResponse.redirect(new URL("/access-denied", req.url));
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
