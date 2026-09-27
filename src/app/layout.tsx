import type { Metadata } from "next";
import { GARRI } from "@/lib/constants";
import "./globals.css";

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
      <body className="antialiased">{children}</body>
    </html>
  );
}
