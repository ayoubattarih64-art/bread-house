import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://breadhouse-morocco.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // الموقع صفحة واحدة بأقسام مرتبطة عبر روابط مرساة (#anchors)
  const sections = [
    "",
    "#about",
    "#specialites",
    "#products",
    "#gallery",
    "#videos",
    "#contact",
  ];

  return sections.map((section) => ({
    url: `${SITE_URL}/${section}`,
    lastModified,
    changeFrequency: "monthly",
    priority: section === "" ? 1 : 0.7,
  }));
}
