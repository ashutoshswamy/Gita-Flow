import { Metadata } from "next";
import { Warning } from "@phosphor-icons/react/dist/ssr";
import { LegalLayout, LegalNote } from "@/components/legal";

export const metadata: Metadata = {
  title: "Disclaimer",
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
  <>The responses are <strong className="text-ink">AI-generated interpretations</strong>, not divine revelations, religious teachings, or absolute truths.</>,
  <>The App is for <strong className="text-ink">entertainment, educational, and reflective purposes only</strong>.</>,
  <>The App <strong className="text-ink">does not replace religious, spiritual, medical, or professional guidance</strong>.</>,
  <>Any reliance on the App&apos;s responses is <strong className="text-ink">at your own discretion and risk</strong>.</>,
  <><strong className="text-ink">Respect cultural and spiritual sensitivities</strong> when engaging with the App.</>,
];

export default function DisclaimerPage() {
  return (
    <LegalLayout title="Disclaimer" updated="November 10, 2026" icon={<Warning size={26} weight="duotone" aria-hidden />}>
      <p className="max-w-[62ch] text-lg font-medium leading-relaxed text-ink">
        <strong>Gita Flow</strong> is an AI-powered interactive experience inspired by the wisdom and persona of
        Krishna from the Mahabharata.
      </p>

      <ol className="space-y-5">
        {DISCLAIMER_POINTS.map((text, i) => (
          <li key={i} className="flex items-start gap-4 border-t border-rule pt-5">
            <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-sm font-bold text-accent-text">
              {i + 1}
            </span>
            <p className="max-w-[62ch] flex-1 text-base leading-relaxed text-dim">{text}</p>
          </li>
        ))}
      </ol>

      <LegalNote>
        By using Gita Flow, you acknowledge and accept these disclaimers. This app is designed to inspire reflection
        and provide perspective, not to serve as authoritative spiritual or professional counsel.
      </LegalNote>
    </LegalLayout>
  );
}
