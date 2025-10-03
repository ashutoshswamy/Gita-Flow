"use client";

import { useState } from "react";
import { Leaf, Send, Sparkles, Loader2, AlertCircle } from "lucide-react";
import Script from "next/script";
import jsonLd from "@/lib/json-ld";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!question.trim()) {
      setError("Please enter your question");
      return;
    }

    setLoading(true);
    setError("");
    setAnswer("");

    try {
      const response = await fetch("/api/ask-krishna", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      setAnswer(data.answer);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950 p-3 xs:p-4 sm:p-6 md:p-8 flex flex-col">
        <main className="max-w-4xl mx-auto py-6 xs:py-8 sm:py-12 md:py-16 flex-grow w-full">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12 px-2">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <Sparkles
                className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 text-emerald-600 dark:text-emerald-400 flex-shrink-0"
                strokeWidth={1.5}
              />
              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-emerald-800 dark:text-emerald-400 leading-tight">
                Gita Flow
              </h1>
            </div>
            <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto font-light leading-relaxed px-2">
              Seek divine wisdom from Lord Krishna. Share your problems and
              receive guidance inspired by the eternal teachings of the Bhagavad
              Gita.
            </p>
          </div>

          {/* Question Form */}
          <form onSubmit={handleSubmit} className="mb-6 sm:mb-8">
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-4 xs:p-5 sm:p-6 md:p-8 border border-emerald-100 dark:border-emerald-900/30">
              <label
                htmlFor="question"
                className="flex items-center gap-2 text-base sm:text-lg font-medium text-gray-800 dark:text-gray-200 mb-3 sm:mb-4"
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <span className="leading-snug">
                  What troubles you, dear seeker?
                </span>
              </label>
              <textarea
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Share your problem, dilemma, or question... Krishna is listening"
                className="w-full min-h-[140px] xs:min-h-[150px] sm:min-h-[160px] md:min-h-[180px] p-3 xs:p-4 text-base sm:text-lg border-2 border-emerald-200 dark:border-emerald-800 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-600 focus:border-transparent resize-none text-gray-800 dark:text-gray-200 bg-white dark:bg-slate-700 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 leading-relaxed"
                disabled={loading}
                rows={5}
              />
              <button
                type="submit"
                disabled={loading}
                className="mt-3 xs:mt-4 w-full sm:w-auto min-h-[44px] px-6 xs:px-8 py-2.5 xs:py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 active:scale-[0.98] text-white text-base sm:text-lg font-medium rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin flex-shrink-0" />
                    <span>Krishna is reflecting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 flex-shrink-0" />
                    <span>Seek Krishna&apos;s Wisdom</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-700 rounded-xl sm:rounded-2xl p-3 xs:p-4 mb-6 sm:mb-8 flex items-start gap-2 xs:gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm xs:text-base text-red-800 dark:text-red-300 leading-relaxed">
                {error}
              </p>
            </div>
          )}

          {/* Answer Display */}
          {answer && (
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-800/80 dark:to-emerald-900/20 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-4 xs:p-5 sm:p-6 md:p-8 border-2 border-emerald-200 dark:border-emerald-800/50 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-start gap-2 xs:gap-3 mb-4 xs:mb-5 sm:mb-6">
                <Leaf
                  className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1"
                  strokeWidth={1.5}
                />
                <h2 className="text-xl xs:text-2xl sm:text-3xl font-semibold text-emerald-900 dark:text-emerald-300 leading-tight">
                  Krishna&apos;s Divine Wisdom
                </h2>
              </div>
              <div className="prose prose-sm xs:prose-base sm:prose-lg dark:prose-invert max-w-none">
                <p className="text-sm xs:text-base sm:text-lg text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed sm:leading-loose font-light">
                  {answer}
                </p>
              </div>
            </div>
          )}

          {/* Footer Note */}
          {!answer && !loading && (
            <div className="text-center mt-8 sm:mt-10 md:mt-12 px-2">
              <div className="inline-block bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl px-4 xs:px-5 sm:px-6 py-3 xs:py-4 border border-emerald-100 dark:border-emerald-900/30 max-w-xl mx-auto">
                <p className="text-sm xs:text-base sm:text-lg text-gray-700 dark:text-gray-300 italic font-light leading-relaxed">
                  &quot;Whenever dharma declines and adharma rises, I manifest
                  myself.&quot;
                  <br />
                  <span className="text-xs xs:text-sm sm:text-base text-emerald-600 dark:text-emerald-400 font-normal mt-1 inline-block">
                    - Bhagavad Gita 4.7
                  </span>
                </p>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="max-w-4xl mx-auto w-full py-6 xs:py-7 sm:py-8 border-t border-emerald-200 dark:border-emerald-900/30 px-3 xs:px-4">
          <div className="text-center">
            {/* Legal Links */}
            <div className="flex items-center justify-center gap-3 xs:gap-4 sm:gap-6 mb-5 xs:mb-6 flex-wrap px-2">
              <a
                href="/terms"
                className="text-xs xs:text-sm sm:text-base min-h-[44px] flex items-center text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 active:scale-95 transition-all duration-200 font-medium"
              >
                Terms of Service
              </a>
              <span className="text-gray-400 dark:text-gray-600 hidden xs:inline">
                •
              </span>
              <a
                href="/privacy"
                className="text-xs xs:text-sm sm:text-base min-h-[44px] flex items-center text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 active:scale-95 transition-all duration-200 font-medium"
              >
                Privacy Policy
              </a>
              <span className="text-gray-400 dark:text-gray-600 hidden xs:inline">
                •
              </span>
              <a
                href="/disclaimer"
                className="text-xs xs:text-sm sm:text-base min-h-[44px] flex items-center text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 active:scale-95 transition-all duration-200 font-medium"
              >
                Disclaimer
              </a>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-4 xs:mb-5 text-xs xs:text-sm sm:text-base leading-relaxed">
              Developed with ❤️ by{" "}
              <span className="font-medium text-emerald-700 dark:text-emerald-400">
                Ashutosh Swamy
              </span>
            </p>
            <div className="flex items-center justify-center gap-5 xs:gap-6 sm:gap-8">
              <a
                href="https://github.com/ashutoshswamy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 min-h-[44px] text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 active:scale-95 transition-all duration-200 group"
              >
                <svg
                  className="w-5 h-5 xs:w-6 xs:h-6 flex-shrink-0 group-hover:scale-110 transition-transform duration-200"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="hidden sm:inline text-xs xs:text-sm sm:text-base font-medium">
                  GitHub
                </span>
                <span className="sr-only">GitHub Profile</span>
              </a>
              <a
                href="https://linkedin.com/in/ashutoshswamy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 min-h-[44px] text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 active:scale-95 transition-all duration-200 group"
              >
                <svg
                  className="w-5 h-5 xs:w-6 xs:h-6 flex-shrink-0 group-hover:scale-110 transition-transform duration-200"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span className="hidden sm:inline text-xs xs:text-sm sm:text-base font-medium">
                  LinkedIn
                </span>
                <span className="sr-only">LinkedIn Profile</span>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
