import { Sparkles, ArrowLeft, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer - Gita Flow",
  description:
    "Important disclaimer about Gita Flow and AI-generated responses. Understand the nature of AI-powered spiritual guidance.",
  openGraph: {
    title: "Disclaimer - Gita Flow",
    description: "Important disclaimer about AI-generated spiritual guidance",
    url: "https://gita-flow.vercel.app/disclaimer",
  },
  alternates: {
    canonical: "https://gita-flow.vercel.app/disclaimer",
  },
};

export default function DisclaimerPage() {
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
            <AlertTriangle
              className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 flex-shrink-0 text-amber-600 dark:text-amber-400"
              strokeWidth={1.5}
            />
            <h1 className="text-3xl xs:text-4xl sm:text-5xl font-bold text-emerald-800 dark:text-emerald-400 leading-tight">
              Disclaimer
            </h1>
          </div>
          <p className="text-base xs:text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            Important Information About This App
          </p>
        </div>

        {/* Content */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-4 xs:p-5 sm:p-6 md:p-8 lg:p-12 border border-emerald-100 dark:border-emerald-900/30">
          <div className="prose prose-sm xs:prose-base sm:prose-lg dark:prose-invert max-w-none">
            <div className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-xl sm:rounded-2xl p-4 xs:p-5 sm:p-6 mb-6 xs:mb-7 sm:mb-8">
              <p className="text-sm xs:text-base sm:text-lg text-gray-800 dark:text-gray-200 leading-relaxed sm:leading-loose font-medium m-0">
                <strong>Gita Flow</strong> is an AI-powered interactive
                experience inspired by the wisdom and persona of Krishna from
                the Mahabharata.
              </p>
            </div>

            <div className="space-y-4 xs:space-y-5 sm:space-y-6">
              <div className="flex items-start gap-3 xs:gap-4">
                <div className="flex-shrink-0 w-7 h-7 xs:w-8 xs:h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mt-0.5 xs:mt-1">
                  <span className="text-sm xs:text-base text-emerald-700 dark:text-emerald-400 font-bold">
                    1
                  </span>
                </div>
                <p className="text-sm xs:text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed sm:leading-loose flex-1">
                  The responses are{" "}
                  <strong>AI-generated interpretations</strong>, not divine
                  revelations, religious teachings, or absolute truths.
                </p>
              </div>

              <div className="flex items-start gap-3 xs:gap-4">
                <div className="flex-shrink-0 w-7 h-7 xs:w-8 xs:h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mt-0.5 xs:mt-1">
                  <span className="text-sm xs:text-base text-emerald-700 dark:text-emerald-400 font-bold">
                    2
                  </span>
                </div>
                <p className="text-sm xs:text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed sm:leading-loose flex-1">
                  The App is for{" "}
                  <strong>
                    entertainment, educational, and reflective purposes only
                  </strong>
                  .
                </p>
              </div>

              <div className="flex items-start gap-3 xs:gap-4">
                <div className="flex-shrink-0 w-7 h-7 xs:w-8 xs:h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mt-0.5 xs:mt-1">
                  <span className="text-sm xs:text-base text-emerald-700 dark:text-emerald-400 font-bold">
                    3
                  </span>
                </div>
                <p className="text-sm xs:text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed sm:leading-loose flex-1">
                  The App{" "}
                  <strong>
                    does not replace religious, spiritual, medical, or
                    professional guidance
                  </strong>
                  .
                </p>
              </div>

              <div className="flex items-start gap-3 xs:gap-4">
                <div className="flex-shrink-0 w-7 h-7 xs:w-8 xs:h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mt-0.5 xs:mt-1">
                  <span className="text-sm xs:text-base text-emerald-700 dark:text-emerald-400 font-bold">
                    4
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed flex-1">
                  Any reliance on the App&apos;s responses is{" "}
                  <strong>at your own discretion and risk</strong>.
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mt-1">
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                    5
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed flex-1">
                  <strong>Respect cultural and spiritual sensitivities</strong>{" "}
                  when engaging with the App.
                </p>
              </div>
            </div>

            <div className="mt-12 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl border-2 border-emerald-200 dark:border-emerald-800">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic m-0">
                By using Gita Flow, you acknowledge and accept these
                disclaimers. This app is designed to inspire reflection and
                provide perspective, not to serve as authoritative spiritual or
                professional counsel.
              </p>
            </div>

            <div className="mt-8 p-6 bg-white dark:bg-slate-900/50 rounded-2xl border border-emerald-200 dark:border-emerald-800">
              <h3 className="text-xl font-semibold text-emerald-800 dark:text-emerald-300 mb-3">
                For Serious Concerns
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed m-0">
                If you are facing serious personal, health, spiritual, or legal
                issues, please consult with qualified professionals, trusted
                advisors, or appropriate authorities.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
