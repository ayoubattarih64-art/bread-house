import type { Metadata, Viewport } from "next";
import "./globals.css";

// ✅ الرابط الأساسي للموقع (يُضبط من متغير البيئة عند النشر)
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://breadhouse-morocco.com";

const SITE_NAME = "Bread House Morocco";
const SITE_DESCRIPTION =
  "Premium artisanal breads, cakes and pastries from Bread House Morocco. Traditional Moroccan bakery crafts since 1985 — CAKES & BAKERY & BELDI HOUSE in Salé.";

export const metadata: Metadata = {
  // ✅ أساس روابط الميتاداتا المطلقة (Open Graph / canonical)
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Bread House Morocco | Artisan Bakery",
    template: "%s | Bread House Morocco",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "Bread House",
    "Bread House Morocco",
    "boulangerie Salé",
    "pâtisserie Maroc",
    "artisan bakery Morocco",
    "Moroccan bakery",
    "chebakia",
    "gâteaux Maroc",
    "مخبزة المغرب",
    "حلويات سلا",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "food",
  alternates: {
    canonical: "/",
    languages: {
      "fr-MA": "/",
      "en-US": "/",
      "ar-MA": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_MA",
    alternateLocale: ["en_US", "ar_MA"],
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Bread House Morocco | Artisan Bakery",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/Face.jpeg",
        width: 1200,
        height: 630,
        alt: "Bread House Morocco — Artisan Bakery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bread House Morocco | Artisan Bakery",
    description: SITE_DESCRIPTION,
    images: ["/Face.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo1.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#3a2317",
  width: "device-width",
  initialScale: 1,
};

// ✅ بيانات منظّمة (Schema.org Bakery) لتحسين الظهور في نتائج جوجل
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}/Face.jpeg`,
  logo: `${SITE_URL}/logo1.png`,
  telephone: "+212537883303",
  priceRange: "1 MAD – 50 MAD",
  servesCuisine: ["Bakery", "Moroccan", "Pastry"],
  foundingDate: "1985",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Assalam",
    addressLocality: "Salé",
    addressCountry: "MA",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Monday",
      opens: "05:30",
      closes: "22:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "06:30",
      closes: "22:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "500",
  },
  sameAs: ["https://wa.me/212537883303"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="min-h-full flex flex-col">
        {/* ✅ JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
