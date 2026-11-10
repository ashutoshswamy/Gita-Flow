import { MetadataRoute } from "next";

const base = "https://gitaflow.ashutoshswamy.in";

// ponytail: lastModified = build time; use per-page dates if content changes unevenly
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ["", "/disclaimer", "/privacy", "/terms"].map((p) => ({ url: `${base}${p}`, lastModified }));
}
