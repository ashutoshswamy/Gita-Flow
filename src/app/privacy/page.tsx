import { Sparkles, ArrowLeft, Shield } from "lucide-react";
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
    url: "https://gita-flow.vercel.app/privacy",
  },
  alternates: {
    canonical: "https://gita-flow.vercel.app/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950 p-3 xs:p-4 sm:p-6 md:p-8">
      <main className="max-w-4xl mx-auto py-6 xs:py-8 sm:py-12 md:py-16 w-full">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 min-h-[44px] text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-300 active:scale-95 transition-all duration-200 mb-6 xs:mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 xs:w-5 xs:h-5 flex-shrink-0 group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="text-sm xs:text-base font-medium">Back to Home</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 px-2">
          <div className="flex items-center justify-center gap-2 xs:gap-3 mb-3 sm:mb-4">
            <Shield
              className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 flex-shrink-0 text-emerald-600 dark:text-emerald-400"
              strokeWidth={1.5}
            />
            <h1 className="text-3xl xs:text-4xl sm:text-5xl font-bold text-emerald-800 dark:text-emerald-400 leading-tight">
              Privacy Policy
            </h1>
          </div>
          <p className="text-base xs:text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            Last Updated: October 3, 2025
          </p>
        </div>

        {/* Content */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-4 xs:p-5 sm:p-6 md:p-8 lg:p-12 border border-emerald-100 dark:border-emerald-900/30">
          <div className="prose prose-sm xs:prose-base sm:prose-lg dark:prose-invert max-w-none">
            <p className="text-sm xs:text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed sm:leading-loose mb-6 xs:mb-7 sm:mb-8">
              At <strong>Gita Flow</strong>, we value your privacy. This policy
              explains how we collect, use, and safeguard your information.
            </p>

            <h2 className="text-xl xs:text-2xl sm:text-3xl font-semibold text-emerald-800 dark:text-emerald-300 mt-6 xs:mt-7 sm:mt-8 mb-3 xs:mb-4 leading-tight">
              1. Information We Collect
            </h2>
            <ul className="text-sm xs:text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed sm:leading-loose space-y-2">
              <li>
                <strong>Basic Data:</strong> Name, email (if provided).
              </li>
              <li>
                <strong>User Inputs:</strong> Questions you ask the AI.
              </li>
              <li>
                <strong>Usage Data:</strong> Device type, app activity,
                analytics data.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-emerald-800 dark:text-emerald-300 mt-8 mb-4">
              2. How We Use Your Information
            </h2>
            <ul className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-2">
              <li>To generate AI-based answers in the persona of Krishna.</li>
              <li>
                To improve the app&apos;s performance, reliability, and cultural
                sensitivity.
              </li>
              <li>To send updates or notifications (with your consent).</li>
            </ul>

            <h2 className="text-2xl font-semibold text-emerald-800 dark:text-emerald-300 mt-8 mb-4">
              3. Data Sharing
            </h2>
            <ul className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-2">
              <li>We do not sell personal data.</li>
              <li>We may share anonymized usage data for app improvements.</li>
              <li>
                Data may be processed by third-party services (e.g., cloud
                hosting).
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-emerald-800 dark:text-emerald-300 mt-8 mb-4">
              4. Data Security
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We take reasonable measures (encryption, secure servers) to
              protect your data, though no system is completely secure.
            </p>

            <h2 className="text-2xl font-semibold text-emerald-800 dark:text-emerald-300 mt-8 mb-4">
              5. Your Rights
            </h2>
            <ul className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-2">
              <li>Request access, correction, or deletion of your data.</li>
              <li>Withdraw consent for data processing.</li>
              <li>Opt out of communications.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-emerald-800 dark:text-emerald-300 mt-8 mb-4">
              6. Retention
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Data is stored only as long as necessary for the app&apos;s
              operation or as required by law.
            </p>

            <h2 className="text-2xl font-semibold text-emerald-800 dark:text-emerald-300 mt-8 mb-4">
              7. Changes to Policy
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We may update this Privacy Policy periodically. Users will be
              informed of significant changes.
            </p>

            <div className="mt-12 p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border-2 border-emerald-200 dark:border-emerald-800">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic">
                Your privacy matters to us. If you have any questions or
                concerns about our privacy practices, please contact us.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
