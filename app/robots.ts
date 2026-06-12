import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/admin/",
        "/admin/sign-in",
        "/admin/sign-in/",
        "/admin/sign-up",
        "/admin/sign-up/",
        "/requests",
        "/requests/",
        "/sign-in",
        "/sign-in/",
        "/sign-up",
        "/sign-up/",
        "/access-denied",
        "/api/",
      ],
    },
    sitemap: "https://violinistwilliam.com/sitemap.xml",
  };
}
