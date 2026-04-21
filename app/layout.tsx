import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "./ConditionalLayout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Grassland | Modern Cross-Breed Sports Innovation",
  description: "Advanced footwear, apparel, and sports technology for the next generation. Redefining performance through cross-breed engineering.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: ["/favicon.png"],
    apple: [
      { url: "/favicon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Grassland | Modern Cross-Breed Sports Innovation",
    description: "Advanced footwear, apparel, and sports technology for the next generation.",
    url: "https://grassland.com", // Should ideally be ENV based
    siteName: "Grassland",
    images: [
      {
        url: "/grassland_banner_1_1767749428961.png",
        width: 1200,
        height: 630,
        alt: "Grassland Performance Matrix",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grassland | Modern Cross-Breed Sports Innovation",
    description: "Redefining performance through cross-breed engineering.",
    images: ["/grassland_banner_1_1767749428961.png"],
  },
};

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Grassland",
              "url": "https://grassland.com",
              "logo": "https://grassland.com/logo2.png",
              "sameAs": [
                "https://instagram.com/grassland",
                "https://twitter.com/grassland",
                "https://facebook.com/grassland"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-800-GRASSLAND",
                "contactType": "customer service"
              }
            })
          }}
        />
        <ConditionalLayout session={session}>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
