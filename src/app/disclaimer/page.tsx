import { Metadata } from "next";
import { LegalLayout, LegalNote } from "@/components/legal";

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

const DISCLAIMER_POINTS = [
  <>The responses are <strong>AI-generated interpretations</strong>, not divine revelations, religious teachings, or absolute truths.</>,
  <>The App is for <strong>entertainment, educational, and reflective purposes only</strong>.</>,
  <>The App <strong>does not replace religious, spiritual, medical, or professional guidance</strong>.</>,
  <>Any reliance on the App&apos;s responses is <strong>at your own discretion and risk</strong>.</>,
  <><strong>Respect cultural and spiritual sensitivities</strong> when engaging with the App.</>,
];

function WarningIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

export default function DisclaimerPage() {
  return (
    <LegalLayout title="Disclaimer" eyebrow="Important information about this app" icon={<WarningIcon />}>
      <div
        className="rounded-xl p-5 sm:p-6 mb-8"
        style={{
          background: "color-mix(in srgb, var(--flame) 8%, var(--bg-panel-raised))",
          border: "1px solid color-mix(in srgb, var(--flame) 30%, transparent)",
        }}
      >
        <p className="font-sans text-base sm:text-lg leading-relaxed font-medium" style={{ color: "var(--ink)" }}>
          <strong>Gita Flow</strong> is an AI-powered interactive
          experience inspired by the wisdom and persona of Krishna from
          the Mahabharata.
        </p>
      </div>

      <div className="space-y-5 sm:space-y-6">
        {DISCLAIMER_POINTS.map((text, i) => (
          <div key={i} className="flex items-start gap-4">
            <div
              className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5"
              style={{
                background: "var(--glow-soft)",
                border: "1px solid color-mix(in srgb, var(--flame) 30%, transparent)",
              }}
            >
              <span className="text-sm font-sans font-bold" style={{ color: "var(--flame)" }}>
                {i + 1}
              </span>
            </div>
            <p className="font-sans text-base leading-relaxed flex-1" style={{ color: "var(--ink-dim)" }}>
              {text}
            </p>
          </div>
        ))}
      </div>

      <LegalNote>
        By using Gita Flow, you acknowledge and accept these
        disclaimers. This app is designed to inspire reflection and
        provide perspective, not to serve as authoritative spiritual or
        professional counsel.
      </LegalNote>

      <div
        className="mt-6 p-5 sm:p-6 rounded-xl"
        style={{
          background: "var(--bg-panel-raised)",
          border: "1px solid var(--rule)",
        }}
      >
        <h3 className="text-lg sm:text-xl font-bold mb-2" style={{ color: "var(--flame)" }}>
          For Serious Concerns
        </h3>
        <p className="font-sans text-base leading-relaxed" style={{ color: "var(--ink-dim)" }}>
          If you are facing serious personal, health, spiritual, or legal
          issues, please consult with qualified professionals, trusted
          advisors, or appropriate authorities.
        </p>
      </div>
    </LegalLayout>
  );
}
