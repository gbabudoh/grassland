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
  description: "Advanced footwear, apparel, and sports technology for the next generation.",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: ["/favicon.png"],
    apple: [
      { url: "/favicon.png", sizes: "180x180", type: "image/png" },
    ],
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
        <ConditionalLayout session={session}>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
