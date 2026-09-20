import { Metadata } from "next";
import { LegalLayout, LegalIntro, LegalSection, LegalList, LegalNote } from "@/components/legal";

export const metadata: Metadata = {
  title: "Privacy Policy - Gita Flow",
  description:
    "Privacy Policy for Gita Flow - How we handle your data. We respect your privacy and don't store personal information.",
  openGraph: {
    title: "Privacy Policy - Gita Flow",
    description:
      "Learn how Gita Flow protects your privacy and handles your data",
    url: "https://gitaflow.ashutoshswamy.in/privacy",
  },
  alternates: {
    canonical: "https://gitaflow.ashutoshswamy.in/privacy",
  },
};

function ShieldIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" eyebrow="Last updated October 3, 2025" icon={<ShieldIcon />}>
      <LegalIntro>
        At <strong style={{ color: "var(--ink)" }}>Gita Flow</strong>, we value your privacy. This policy
        explains how we collect, use, and safeguard your information.
      </LegalIntro>

      <LegalSection title="1. Information We Collect">
        <LegalList items={[
          <><strong style={{ color: "var(--ink)" }}>Basic Data:</strong> Name, email (if you sign in).</>,
          <><strong style={{ color: "var(--ink)" }}>User Inputs:</strong> Questions you ask Krishna, and the answers given.</>,
          <><strong style={{ color: "var(--ink)" }}>Usage Data:</strong> Device type, app activity, analytics data.</>,
        ]} />
      </LegalSection>

      <LegalSection title="2. How We Use Your Information">
        <LegalList items={[
          "To generate AI-based answers in the persona of Krishna.",
          "To save your conversation history once you sign in, so you can continue where you left off.",
          "To improve the app’s performance, reliability, and cultural sensitivity.",
        ]} />
      </LegalSection>

      <LegalSection title="3. Data Sharing">
        <LegalList items={[
          "We do not sell personal data.",
          "We may share anonymized usage data for app improvements.",
          "Data is processed by third-party services we rely on for authentication, database storage, and AI generation.",
        ]} />
      </LegalSection>

      <LegalSection title="4. Data Security">
        <p className="font-sans text-base leading-relaxed" style={{ color: "var(--ink-dim)" }}>
          We take reasonable measures (encryption, secure servers) to protect your data, though no system is completely secure.
        </p>
      </LegalSection>

      <LegalSection title="5. Your Rights">
        <LegalList items={[
          "Request access, correction, or deletion of your data.",
          "Withdraw consent for data processing.",
          "Opt out of communications.",
        ]} />
      </LegalSection>

      <LegalSection title="6. Retention">
        <p className="font-sans text-base leading-relaxed" style={{ color: "var(--ink-dim)" }}>
          Data is stored only as long as necessary for the app&apos;s operation or as required by law.
        </p>
      </LegalSection>

      <LegalSection title="7. Changes to Policy" last>
        <p className="font-sans text-base leading-relaxed" style={{ color: "var(--ink-dim)" }}>
          We may update this Privacy Policy periodically. Users will be informed of significant changes.
        </p>
      </LegalSection>

      <LegalNote>
        Your privacy matters to us. If you have any questions or
        concerns about our privacy practices, please contact us.
      </LegalNote>
    </LegalLayout>
  );
}
