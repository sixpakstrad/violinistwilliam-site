import type { MetadataRoute } from "next";

const baseUrl = "https://violinistwilliam.com";

const publicRoutes = [
  { path: "/", priority: 1 },
  { path: "/about", priority: 0.8 },
  { path: "/education", priority: 0.75 },
  { path: "/performances", priority: 0.9 },
  { path: "/rates", priority: 0.7 },
  { path: "/groups", priority: 0.65 },
  { path: "/music", priority: 0.85 },
  { path: "/bow-rehair-repair-instrument-care", priority: 0.8 },
  { path: "/stories", priority: 0.65 },
  { path: "/contact", priority: 0.85 },
  { path: "/donate", priority: 0.45 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return publicRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: route.priority,
  }));
}
