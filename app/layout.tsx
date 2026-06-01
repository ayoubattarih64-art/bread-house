import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bread House Morocco | Artisan Bakery",
  description: "Premium artisanal breads and pastries from Bread House Morocco. Traditional Moroccan bakery crafts since 1985.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}