import type { Metadata, Viewport } from "next";
import { Geist, Bricolage_Grotesque, Noto_Sans_Devanagari } from "next/font/google";
import jsonLd from "@/lib/json-ld";
import { Providers } from "@/components/providers";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const devanagari = Noto_Sans_Devanagari({
  variable: "--font-deva",
  subsets: ["devanagari"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gitaflow.ashutoshswamy.in"),
  title: {
    default: "Gita Flow - AI-Powered Spiritual Wisdom from Bhagavad Gita",
    template: "%s | Gita Flow",
  },
  description:
    "Seek divine wisdom from Lord Krishna through AI. Get personalized spiritual guidance inspired by the Bhagavad Gita. Ask life questions and receive compassionate answers rooted in ancient wisdom.",
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
    url: "https://gitaflow.ashutoshswamy.in",
    siteName: "Gita Flow",
    title: "Gita Flow - AI-Powered Spiritual Wisdom from Bhagavad Gita",
    description:
      "Seek divine wisdom from Lord Krishna through AI. Get personalized spiritual guidance inspired by the Bhagavad Gita.",
    images: [
      {
        url: "/og-image.jpg",
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
    images: ["/og-image.jpg"],
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
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "48x48" },
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
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eef1f1" },
    { media: "(prefers-color-scheme: dark)", color: "#15191a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("gf-theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`,
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }} />
      </head>
      <body
        className={`${geist.variable} ${bricolage.variable} ${devanagari.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
