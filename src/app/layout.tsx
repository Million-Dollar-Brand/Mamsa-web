import type { Metadata } from "next";
import { Koh_Santepheap, Roboto_Flex } from "next/font/google";
import "./globals.css";

// Replaces the theme's expired woff2 files called out in the handoff.
const kohSantepheap = Koh_Santepheap({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-koh-santepheap",
  display: "swap",
});

const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  variable: "--font-roboto-flex",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mamsacafe.com"),
  title: "Mamsa Cafe & Banquet — Catering & Events in Gurugram",
  description:
    "Three halls and a garden lawn in Gurugram for 80 to 900 guests. In-house kitchen, end-to-end event planning, and menus settled at a tasting with you.",
  openGraph: {
    title: "Mamsa Cafe & Banquet — Catering & Events in Gurugram",
    description:
      "Three halls, one garden lawn and a kitchen that has served more than 6,000 events since 1994.",
    type: "website",
    images: ["/images/hero-bg-1.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${kohSantepheap.variable} ${robotoFlex.variable}`}>
      <body>{children}</body>
    </html>
  );
}
