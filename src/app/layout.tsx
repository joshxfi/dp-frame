import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://frame.omsimos.com"),
  title: "Gravitate: DP Frame",
  description:
    "Approaching the L-Week, Tigers, get ready to make your mark and electrify towards this excursion of heading towards an unknown reality. Let your vibrant hues be the roaring presence as we explore onwards",
  openGraph: {
    type: "website",
    title: "Gravitate: Navigating the Cosmic Potential",
    description:
      "Approaching the L-Week, Tigers, get ready to make your mark and electrify towards this excursion of heading towards an unknown reality. Let your vibrant hues be the roaring presence as we explore onwards",
    images: [
      "https://github.com/joshxfi/dp-frame/assets/69457996/6846a0ed-4be9-463a-9507-6b13e2a60fae",
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
