import { Metadata } from "next";
import { LegalLayout, LegalIntro, LegalSection, LegalList, LegalNote } from "@/components/legal";

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

const SECTIONS = [
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
];

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" eyebrow="Last updated October 3, 2025">
      <LegalIntro>
        Welcome to <strong style={{ color: "var(--ink)" }}>Gita Flow</strong>, an interactive AI
        experience inspired by the wisdom of Lord Krishna from the
        Mahabharata. By using this app, you agree to these Terms of Service.
      </LegalIntro>

      {SECTIONS.map((section) => (
        <LegalSection key={section.title} title={section.title}>
          {section.content && (
            <p className="font-sans text-base leading-relaxed" style={{ color: "var(--ink-dim)" }}>
              {section.content}
            </p>
          )}
          {section.list && <LegalList items={section.list} />}
        </LegalSection>
      ))}

      <LegalNote>
        By using Gita Flow, you acknowledge that you have read,
        understood, and agree to be bound by these Terms of Service.
      </LegalNote>
    </LegalLayout>
  );
}
