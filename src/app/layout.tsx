import type { Metadata } from "next";
import { Poppins } from "next/font/google"; // Import Poppins
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

// Configure Poppins
const poppins = Poppins({
  variable: "--font-poppins", // Define the CSS variable name
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // Add desired weights
});

// Replace with your actual production URL when deploying
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://gita-flow.vercel.app";

export const metadata: Metadata = {
  // metadataBase: new URL(siteUrl), // Uncomment and set your production URL
  title: {
    default: "Gita Flow - Wisdom from the Bhagavad Gita",
    template: "%s | Gita Flow",
  },
  description:
    "Seek wisdom, guidance, and answers to life's questions inspired by the Bhagavad Gita, powered by AI. Your personal spiritual companion for clarity and peace.",
  keywords: [
    "Bhagavad Gita",
    "Krishna",
    "AI",
    "Spiritual Guidance",
    "Wisdom",
    "Hinduism",
    "Philosophy",
    "Meditation",
    "Self-Help",
    "Inspiration",
    "Gita Flow",
  ],
  authors: [
    { name: "Ashutosh Swamy", url: "https://github.com/ashutoshswamy" },
  ],
  creator: "Ashutosh Swamy",
  publisher: "Gita Flow Project",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Gita Flow - Wisdom from the Bhagavad Gita",
    description:
      "Seek wisdom, guidance, and answers to life's questions inspired by the Bhagavad Gita, powered by AI.",
    siteName: "Gita Flow",
    // images: [ // Add a default OG image if available
    //   {
    //     url: '/og-default.png', // e.g., public/og-default.png
    //     width: 1200,
    //     height: 630,
    //     alt: 'Gita Flow - Wisdom from the Bhagavad Gita',
    //   },
    // ],
  },

  twitter: {
    card: "summary_large_image",
    // site: '@YourProjectTwitterHandle', // Optional: Your project's Twitter handle
    creator: "@ashutoshswamy_",
    title: "Gita Flow - Wisdom from the Bhagavad Gita",
    description:
      "Seek wisdom and guidance inspired by the Bhagavad Gita, powered by AI.",
    // images: ['/twitter-default.png'], // e.g., public/twitter-default.png
  },

  icons: {
    icon: "/favicon.ico", // Ensure these files exist in your /public folder
    shortcut: "/icon.png",
    apple: "/apple-icon.png",
  },
  manifest: "/site.webmanifest", // Ensure this file exists in your /public folder

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

  viewport: {
    width: "device-width",
    initialScale: 1,
    // maximumScale: 1, // Usually not recommended as it can hinder accessibility
  },
  // category: 'spirituality', // Optional: if applicable
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Use Poppins font variable for the body class and add suppressHydrationWarning */}
      <body
        className={`${poppins.variable} antialiased selection:bg-accent/20`}
        suppressHydrationWarning
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
