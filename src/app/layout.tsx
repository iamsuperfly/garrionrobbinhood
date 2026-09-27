import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import { GARRI } from "@/lib/constants";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const body = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "GARRI ($GARRI) on Robinhood Chain",
  description: GARRI.tagline,
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "GARRI ($GARRI)",
    description: GARRI.tagline,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
