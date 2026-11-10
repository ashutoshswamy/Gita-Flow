import { Metadata } from "next";
import { ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { LegalLayout, LegalIntro, LegalSection, LegalList, LegalNote } from "@/components/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
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


export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="November 10, 2026" icon={<ShieldCheck size={26} weight="duotone" aria-hidden />}>
      <LegalIntro>
        At <strong className="text-ink">Gita Flow</strong>, we value your privacy. This policy
        explains how we collect, use, and safeguard your information.
      </LegalIntro>

      <LegalSection title="1. Information We Collect">
        <LegalList items={[
          <><strong className="text-ink">Basic Data:</strong> Name, email (if you sign in).</>,
          <><strong className="text-ink">User Inputs:</strong> Questions you ask Krishna, and the answers given.</>,
          <><strong className="text-ink">Usage Data:</strong> Device type, app activity, analytics data.</>,
          <><strong className="text-ink">Consent Record:</strong> When you sign in we store that you confirmed you are 18 or older and accepted our Terms and Privacy Policy, together with the version and the date.</>,
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
        <p className="max-w-[65ch] text-base leading-relaxed text-dim">
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
        <p className="max-w-[65ch] text-base leading-relaxed text-dim">
          Data is stored only as long as necessary for the app&apos;s operation or as required by law.
        </p>
      </LegalSection>

      <LegalSection title="7. Cookies and Local Storage">
        <p className="max-w-[65ch] text-base leading-relaxed text-dim">
          We use essential cookies and browser storage to keep you signed in and to remember your cookie choice.
          Optional cookies are used only if you choose Accept all. You can change your choice at any time from
          Cookie settings in the footer.
        </p>
      </LegalSection>

      <LegalSection title="8. Changes to Policy" last>
        <p className="max-w-[65ch] text-base leading-relaxed text-dim">
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
