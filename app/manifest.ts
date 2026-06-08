import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bread House Morocco — Artisan Bakery",
    short_name: "Bread House",
    description:
      "Premium artisanal breads, cakes and pastries from Bread House Morocco. Traditional Moroccan bakery since 1985.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#3a2317",
    lang: "fr",
    dir: "ltr",
    categories: ["food", "shopping", "lifestyle"],
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/logo1.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
