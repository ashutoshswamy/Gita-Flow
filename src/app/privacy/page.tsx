import Link from "next/link";
import { Metadata } from "next";

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

function Section({ title, children, last }: { title: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div className={last ? "" : "mb-8"}>
      <h2 className="font-serif text-xl sm:text-2xl font-semibold mb-3" style={{ color: "var(--accent-gold-dim)" }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

function BulletList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="font-sans text-base leading-relaxed space-y-2 ml-1" style={{ color: "var(--text-secondary)" }}>
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--accent-gold)" }} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function PrivacyPage() {
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
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="1.5" strokeLinecap="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-gold-gradient leading-tight mb-3">
            Privacy Policy
          </h1>
          <p className="font-sans text-sm tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
            Last Updated: October 3, 2025
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
          <p className="font-sans text-base sm:text-lg leading-relaxed mb-8" style={{ color: "var(--text-secondary)" }}>
            At <strong style={{ color: "var(--text-primary)" }}>Gita Flow</strong>, we value your privacy. This policy
            explains how we collect, use, and safeguard your information.
          </p>

          <Section title="1. Information We Collect">
            <BulletList items={[
              <><strong style={{ color: "var(--text-primary)" }}>Basic Data:</strong> Name, email (if provided).</>,
              <><strong style={{ color: "var(--text-primary)" }}>User Inputs:</strong> Questions you ask the AI.</>,
              <><strong style={{ color: "var(--text-primary)" }}>Usage Data:</strong> Device type, app activity, analytics data.</>,
            ]} />
          </Section>

          <Section title="2. How We Use Your Information">
            <BulletList items={[
              "To generate AI-based answers in the persona of Krishna.",
              "To improve the app\u2019s performance, reliability, and cultural sensitivity.",
              "To send updates or notifications (with your consent).",
            ]} />
          </Section>

          <Section title="3. Data Sharing">
            <BulletList items={[
              "We do not sell personal data.",
              "We may share anonymized usage data for app improvements.",
              "Data may be processed by third-party services (e.g., cloud hosting).",
            ]} />
          </Section>

          <Section title="4. Data Security">
            <p className="font-sans text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              We take reasonable measures (encryption, secure servers) to protect your data, though no system is completely secure.
            </p>
          </Section>

          <Section title="5. Your Rights">
            <BulletList items={[
              "Request access, correction, or deletion of your data.",
              "Withdraw consent for data processing.",
              "Opt out of communications.",
            ]} />
          </Section>

          <Section title="6. Retention">
            <p className="font-sans text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Data is stored only as long as necessary for the app&apos;s operation or as required by law.
            </p>
          </Section>

          <Section title="7. Changes to Policy" last>
            <p className="font-sans text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              We may update this Privacy Policy periodically. Users will be informed of significant changes.
            </p>
          </Section>

          <div
            className="mt-10 p-5 sm:p-6 rounded-xl sacred-border"
            style={{
              background: "color-mix(in srgb, var(--accent-gold) 5%, var(--bg-secondary))",
              border: "1px solid var(--border-medium)",
            }}
          >
            <p className="font-sans text-base italic leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Your privacy matters to us. If you have any questions or
              concerns about our privacy practices, please contact us.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
