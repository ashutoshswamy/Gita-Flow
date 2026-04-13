import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer - Gita Flow",
  description:
    "Important disclaimer about Gita Flow and AI-generated responses. Understand the nature of AI-powered spiritual guidance.",
  openGraph: {
    title: "Disclaimer - Gita Flow",
    description: "Important disclaimer about AI-generated spiritual guidance",
    url: "https://gitaflow.ashutoshswamy.in/disclaimer",
  },
  alternates: {
    canonical: "https://gitaflow.ashutoshswamy.in/disclaimer",
  },
};

const disclaimerPoints = [
  {
    num: "1",
    text: (
      <>
        The responses are <strong>AI-generated interpretations</strong>, not divine
        revelations, religious teachings, or absolute truths.
      </>
    ),
  },
  {
    num: "2",
    text: (
      <>
        The App is for{" "}
        <strong>entertainment, educational, and reflective purposes only</strong>.
      </>
    ),
  },
  {
    num: "3",
    text: (
      <>
        The App{" "}
        <strong>does not replace religious, spiritual, medical, or professional guidance</strong>.
      </>
    ),
  },
  {
    num: "4",
    text: (
      <>
        Any reliance on the App&apos;s responses is{" "}
        <strong>at your own discretion and risk</strong>.
      </>
    ),
  },
  {
    num: "5",
    text: (
      <>
        <strong>Respect cultural and spiritual sensitivities</strong> when engaging
        with the App.
      </>
    ),
  },
];

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <main className="max-w-3xl mx-auto py-10 sm:py-16 px-4 sm:px-6 w-full">
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

        <header className="text-center mb-10 sm:mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent-saffron)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-gold-gradient leading-tight mb-3">
            Disclaimer
          </h1>
          <p className="font-sans text-sm tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
            Important Information About This App
          </p>
        </header>

        <div
          className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-light)",
            boxShadow: "0 4px 30px var(--shadow-warm)",
          }}
        >
          {/* Highlight box */}
          <div
            className="rounded-xl p-5 sm:p-6 mb-8"
            style={{
              background: "color-mix(in srgb, var(--accent-saffron) 6%, var(--bg-secondary))",
              border: "1px solid color-mix(in srgb, var(--accent-saffron) 25%, var(--border-light))",
            }}
          >
            <p className="font-sans text-base sm:text-lg leading-relaxed font-medium" style={{ color: "var(--text-primary)" }}>
              <strong>Gita Flow</strong> is an AI-powered interactive
              experience inspired by the wisdom and persona of Krishna from
              the Mahabharata.
            </p>
          </div>

          {/* Numbered points */}
          <div className="space-y-5 sm:space-y-6">
            {disclaimerPoints.map((point) => (
              <div key={point.num} className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5"
                  style={{
                    background: "var(--glow-gold)",
                    border: "1px solid color-mix(in srgb, var(--accent-gold) 30%, transparent)",
                  }}
                >
                  <span className="text-sm font-sans font-bold" style={{ color: "var(--accent-gold)" }}>
                    {point.num}
                  </span>
                </div>
                <p className="font-sans text-base leading-relaxed flex-1" style={{ color: "var(--text-secondary)" }}>
                  {point.text}
                </p>
              </div>
            ))}
          </div>

          {/* Closing note */}
          <div
            className="mt-10 p-5 sm:p-6 rounded-xl sacred-border"
            style={{
              background: "color-mix(in srgb, var(--accent-gold) 5%, var(--bg-secondary))",
              border: "1px solid var(--border-medium)",
            }}
          >
            <p className="font-sans text-base italic leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              By using Gita Flow, you acknowledge and accept these
              disclaimers. This app is designed to inspire reflection and
              provide perspective, not to serve as authoritative spiritual or
              professional counsel.
            </p>
          </div>

          {/* Serious concerns */}
          <div
            className="mt-6 p-5 sm:p-6 rounded-xl"
            style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-light)",
            }}
          >
            <h3 className="font-serif text-lg sm:text-xl font-semibold mb-2" style={{ color: "var(--accent-gold-dim)" }}>
              For Serious Concerns
            </h3>
            <p className="font-sans text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              If you are facing serious personal, health, spiritual, or legal
              issues, please consult with qualified professionals, trusted
              advisors, or appropriate authorities.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
