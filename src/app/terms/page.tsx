import { Sparkles, ArrowLeft } from "lucide-react";
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
    url: "https://gita-flow.vercel.app/terms",
  },
  alternates: {
    canonical: "https://gita-flow.vercel.app/terms",
  },
};

export default function TermsPage() {
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
            <Sparkles
              className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 flex-shrink-0 text-emerald-600 dark:text-emerald-400"
              strokeWidth={1.5}
            />
            <h1 className="text-3xl xs:text-4xl sm:text-5xl font-bold text-emerald-800 dark:text-emerald-400 leading-tight">
              Terms of Service
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
              Welcome to <strong>Gita Flow</strong>, an interactive AI
              experience inspired by the wisdom of Lord Krishna from the
              Mahabharata. By using this app, you agree to these Terms of
              Service.
            </p>

            <h2 className="text-2xl font-semibold text-emerald-800 dark:text-emerald-300 mt-8 mb-4">
              1. Eligibility
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              You must be at least 16 years old (or have guardian consent) to
              use this App.
            </p>

            <h2 className="text-2xl font-semibold text-emerald-800 dark:text-emerald-300 mt-8 mb-4">
              2. Services Provided
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The App uses Generative AI to answer user questions in the style,
              tone, and persona of Krishna. The responses are AI-generated
              interpretations and not religious doctrine, spiritual authority,
              or absolute truth.
            </p>

            <h2 className="text-2xl font-semibold text-emerald-800 dark:text-emerald-300 mt-8 mb-4">
              3. User Responsibilities
            </h2>
            <ul className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-2">
              <li>
                Use the App with respect for its cultural and spiritual context.
              </li>
              <li>
                Do not misuse the App for offensive, unlawful, or harmful
                purposes.
              </li>
              <li>Understand that responses are symbolic and educational.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-emerald-800 dark:text-emerald-300 mt-8 mb-4">
              4. No Religious or Professional Advice
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The App does not provide certified spiritual, religious, legal,
              financial, or medical advice. It is intended for reflection,
              guidance, and inspiration only. For personal, health, or spiritual
              concerns, consult qualified professionals or trusted advisors.
            </p>

            <h2 className="text-2xl font-semibold text-emerald-800 dark:text-emerald-300 mt-8 mb-4">
              5. Intellectual Property
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The design, content, and AI models behind the App are owned by
              Gita Flow. Users may not copy, modify, or distribute without
              permission.
            </p>

            <h2 className="text-2xl font-semibold text-emerald-800 dark:text-emerald-300 mt-8 mb-4">
              6. Limitation of Liability
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We are not liable for any decisions, actions, or outcomes
              resulting from reliance on the App&apos;s responses. Use at your
              own discretion.
            </p>

            <h2 className="text-2xl font-semibold text-emerald-800 dark:text-emerald-300 mt-8 mb-4">
              7. Governing Law
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              These Terms shall be governed by the laws of India.
            </p>

            <div className="mt-12 p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border-2 border-emerald-200 dark:border-emerald-800">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic">
                By using Gita Flow, you acknowledge that you have read,
                understood, and agree to be bound by these Terms of Service.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
