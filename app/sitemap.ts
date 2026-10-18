import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://newanext.bond";

  return [
    { url: baseUrl },
    { url: `${baseUrl}/about` },
    { url: `${baseUrl}/services` },
    { url: `${baseUrl}/products` },
    { url: `${baseUrl}/portfolio` },
    { url: `${baseUrl}/contact` },
  ];
}