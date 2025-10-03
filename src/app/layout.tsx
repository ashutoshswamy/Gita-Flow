import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gita-flow.vercel.app"),
  title: {
    default: "Gita Flow - AI-Powered Spiritual Wisdom from Bhagavad Gita",
    template: "%s | Gita Flow",
  },
  description:
    "Seek divine wisdom from Lord Krishna through AI. Get personalized spiritual guidance inspired by the Bhagavad Gita. Ask life questions and receive compassionate answers rooted in ancient wisdom.",
  keywords: [
    "Bhagavad Gita",
    "Krishna wisdom",
    "spiritual guidance",
    "AI spirituality",
    "Hindu philosophy",
    "life advice",
    "Gita teachings",
    "spiritual counseling",
    "Krishna AI",
    "Vedic wisdom",
    "dharma guidance",
    "meditation advice",
    "spiritual questions",
  ],
  authors: [{ name: "Gita Flow Team" }],
  creator: "Gita Flow",
  publisher: "Gita Flow",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gita-flow.vercel.app",
    siteName: "Gita Flow",
    title: "Gita Flow - AI-Powered Spiritual Wisdom from Bhagavad Gita",
    description:
      "Seek divine wisdom from Lord Krishna through AI. Get personalized spiritual guidance inspired by the Bhagavad Gita.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gita Flow - Spiritual Wisdom from Krishna",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gita Flow - AI-Powered Spiritual Wisdom from Bhagavad Gita",
    description:
      "Seek divine wisdom from Lord Krishna through AI. Get personalized spiritual guidance inspired by the Bhagavad Gita.",
    images: ["/og-image.png"],
    creator: "@gitaflow",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  verification: {
    google: "google-site-verification-code", // Add your verification code after setting up Google Search Console
  },
  alternates: {
    canonical: "https://gita-flow.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://gita-flow.vercel.app" />
      </head>
      <body className={`${spaceGrotesk.variable} antialiased`}>{children}</body>
    </html>
  );
}
