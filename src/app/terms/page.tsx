import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - Gita Flow",
  description:
    "Terms of Service for Gita Flow - Divine wisdom from Krishna. Read our terms and conditions for using the spiritual guidance app.",
  openGraph: {
    title: "Terms of Service - Gita Flow",
    description:
      "Terms and conditions for using Gita Flow spiritual guidance app",
    url: "https://gitaflow.ashutoshswamy.in/terms",
  },
  alternates: {
    canonical: "https://gitaflow.ashutoshswamy.in/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <main className="max-w-3xl mx-auto py-10 sm:py-16 px-4 sm:px-6 w-full">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 min-h-[44px] font-sans text-sm font-medium transition-colors duration-200 mb-8 group"
          style={{ color: "var(--accent-gold)" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Home
        </Link>

        {/* Header */}
        <header className="text-center mb-10 sm:mb-14">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-gold-gradient leading-tight mb-3">
            Terms of Service
          </h1>
          <p className="font-sans text-sm tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
            Last Updated: October 3, 2025
          </p>
        </header>

        {/* Content */}
        <div
          className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-light)",
            boxShadow: "0 4px 30px var(--shadow-warm)",
          }}
        >
          <p className="font-sans text-base sm:text-lg leading-relaxed mb-8" style={{ color: "var(--text-secondary)" }}>
            Welcome to <strong style={{ color: "var(--text-primary)" }}>Gita Flow</strong>, an interactive AI
            experience inspired by the wisdom of Lord Krishna from the
            Mahabharata. By using this app, you agree to these Terms of Service.
          </p>

          {[
            {
              title: "1. Eligibility",
              content: "You must be at least 16 years old (or have guardian consent) to use this App.",
            },
            {
              title: "2. Services Provided",
              content: "The App uses Generative AI to answer user questions in the style, tone, and persona of Krishna. The responses are AI-generated interpretations and not religious doctrine, spiritual authority, or absolute truth.",
            },
            {
              title: "3. User Responsibilities",
              list: [
                "Use the App with respect for its cultural and spiritual context.",
                "Do not misuse the App for offensive, unlawful, or harmful purposes.",
                "Understand that responses are symbolic and educational.",
              ],
            },
            {
              title: "4. No Religious or Professional Advice",
              content: "The App does not provide certified spiritual, religious, legal, financial, or medical advice. It is intended for reflection, guidance, and inspiration only. For personal, health, or spiritual concerns, consult qualified professionals or trusted advisors.",
            },
            {
              title: "5. Intellectual Property",
              content: "The design, content, and AI models behind the App are owned by Gita Flow. Users may not copy, modify, or distribute without permission.",
            },
            {
              title: "6. Limitation of Liability",
              content: "We are not liable for any decisions, actions, or outcomes resulting from reliance on the App's responses. Use at your own discretion.",
            },
            {
              title: "7. Governing Law",
              content: "These Terms shall be governed by the laws of India.",
            },
          ].map((section) => (
            <div key={section.title} className="mb-8 last:mb-0">
              <h2 className="font-serif text-xl sm:text-2xl font-semibold mb-3" style={{ color: "var(--accent-gold-dim)" }}>
                {section.title}
              </h2>
              {section.content && (
                <p className="font-sans text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {section.content}
                </p>
              )}
              {section.list && (
                <ul className="font-sans text-base leading-relaxed space-y-2 ml-1" style={{ color: "var(--text-secondary)" }}>
                  {section.list.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--accent-gold)" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <div
            className="mt-10 p-5 sm:p-6 rounded-xl sacred-border"
            style={{
              background: "color-mix(in srgb, var(--accent-gold) 5%, var(--bg-secondary))",
              border: "1px solid var(--border-medium)",
            }}
          >
            <p className="font-sans text-base italic leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              By using Gita Flow, you acknowledge that you have read,
              understood, and agree to be bound by these Terms of Service.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
