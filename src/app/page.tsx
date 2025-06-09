import { Feather, Github, Linkedin, Twitter } from "lucide-react";
import { AskKrishnaUI } from "@/components/gita-ai/ask-krishna-ui";
import Link from "next/link";
import CurrentYear from "@/components/current-year";
import type { Metadata } from "next";

// Replace with your actual production URL if deploying
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://gitaflow.vercel.app";

export const metadata: Metadata = {
  title: "Gita Flow - Ask Krishna for Wisdom from the Bhagavad Gita",
  description:
    "Engage with Gita Flow to ask questions and receive profound answers from Krishna, based on the timeless teachings of the Bhagavad Gita. Find peace, clarity, and spiritual guidance.",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Gita Flow - Ask Krishna for Wisdom from the Bhagavad Gita",
    description:
      "Engage with Gita Flow to ask questions and receive profound answers from Krishna, based on the timeless teachings of the Bhagavad Gita.",
    url: siteUrl,
    type: "website",
    // images: [ // Optional: if you have a specific OG image for the home page
    //   {
    //     url: `${siteUrl}/og-home.png`,
    //     width: 1200,
    //     height: 630,
    //     alt: 'Ask Krishna - Gita Flow Interface',
    //   },
    // ],
  },
  twitter: {
    title: "Gita Flow - Ask Krishna for Wisdom from the Bhagavad Gita",
    description:
      "Engage with Gita Flow to ask questions and receive profound answers from Krishna, based on the timeless teachings of the Bhagavad Gita.",
    // images: [`${siteUrl}/twitter-home.png`],
  },
};

export default function Home() {
  return (
    <div className="container mx-auto min-h-screen flex flex-col items-center justify-start py-10 sm:py-16 px-4">
      <header className="mb-10 sm:mb-12 text-center">
        <Feather
          className="mx-auto h-14 w-14 sm:h-16 sm:w-16 text-primary opacity-75"
          strokeWidth={1.5}
        />
        <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent dark:from-primary dark:to-secondary">
          Gita Flow
        </h1>
        <p className="mt-2 text-lg sm:text-xl text-muted-foreground max-w-md mx-auto">
          Seek wisdom and gentle guidance from the Bhagavad Gita.
        </p>
      </header>

      <main className="w-full max-w-2xl">
        <AskKrishnaUI />
      </main>

      <footer className="w-full mt-16 sm:mt-24 pt-8 pb-6 border-t border-border/30 bg-gradient-to-b from-muted/5 via-muted/10 to-muted/20 dark:from-muted/10 dark:via-muted/20 dark:to-muted/30 rounded-t-lg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="md:col-span-2 space-y-2">
              <h3 className="text-lg font-semibold text-foreground">
                Gita Flow
              </h3>
              <p className="text-sm text-muted-foreground">
                Personalized spiritual guidance, powered by AI. Seek answers and
                wisdom inspired by the Bhagavad Gita.
              </p>
              <Link
                href="/disclaimer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                aria-label="Read our disclaimer"
              >
                Disclaimer
              </Link>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">
                Connect with Developer
              </h3>
              <div className="flex space-x-3">
                <Link
                  href="https://github.com/ashutoshswamy"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ashutosh Swamy on GitHub"
                >
                  <Github className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
                </Link>
                <Link
                  href="https://linkedin.com/in/ashutoshswamy"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ashutosh Swamy on LinkedIn"
                >
                  <Linkedin className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
                </Link>
                <Link
                  href="https://twitter.com/ashutoshswamy_"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ashutosh Swamy on Twitter"
                >
                  <Twitter className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
                </Link>
              </div>
              <p className="text-sm text-muted-foreground pt-1">
                Ashutosh Swamy
              </p>
            </div>
          </div>
          <div className="border-t border-border/50 pt-6 text-center text-xs sm:text-sm text-muted-foreground">
            <p>
              &copy; <CurrentYear /> Gita Flow. All rights reserved. Inspired by
              eternal truths.
            </p>
            <p className="mt-2">Made with ❤️</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
