import type { MetadataRoute } from "next"

export const dynamic = "force-static"
export const revalidate = 86400

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://doxtalk.co.kr"
  const lastModified = new Date("2026-02-07")

  return [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/register`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/quote`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sitemap-page`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ]
}
