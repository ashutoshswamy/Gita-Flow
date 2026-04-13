"use client";

import { useState, useEffect, useRef } from "react";
import Script from "next/script";
import jsonLd from "@/lib/json-ld";

function Mandala({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer ring of petals */}
      {Array.from({ length: 12 }).map((_, i) => (
        <ellipse
          key={`outer-${i}`}
          cx="100"
          cy="30"
          rx="8"
          ry="28"
          stroke="currentColor"
          strokeWidth="0.8"
          opacity="0.4"
          transform={`rotate(${i * 30} 100 100)`}
        />
      ))}
      {/* Inner ring */}
      {Array.from({ length: 8 }).map((_, i) => (
        <ellipse
          key={`inner-${i}`}
          cx="100"
          cy="50"
          rx="6"
          ry="20"
          stroke="currentColor"
          strokeWidth="0.6"
          opacity="0.3"
          transform={`rotate(${i * 45} 100 100)`}
        />
      ))}
      {/* Center circles */}
      <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      <circle cx="100" cy="100" r="35" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
      <circle cx="100" cy="100" r="20" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
      <circle cx="100" cy="100" r="5" fill="currentColor" opacity="0.4" />
      {/* Diamond accents */}
      {Array.from({ length: 4 }).map((_, i) => (
        <rect
          key={`diamond-${i}`}
          x="95"
          y="60"
          width="10"
          height="10"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.2"
          transform={`rotate(${i * 90 + 45} 100 100)`}
        />
      ))}
    </svg>
  );
}

function GoldenParticles() {
  const [particles, setParticles] = useState<
    { id: number; left: string; delay: string; duration: string; size: string }[]
  >([]);

  useEffect(() => {
    const generated = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`,
      duration: `${8 + Math.random() * 12}s`,
      size: `${2 + Math.random() * 3}px`,
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            bottom: "-10px",
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}

function OmSymbol({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <text x="50" y="72" textAnchor="middle" fontSize="60" fontFamily="serif" opacity="0.12">
        &#x0950;
      </text>
    </svg>
  );
}

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [displayedAnswer, setDisplayedAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const answerRef = useRef<HTMLDivElement>(null);

  // Typewriter effect for answer
  useEffect(() => {
    if (!answer) {
      setDisplayedAnswer("");
      return;
    }
    let i = 0;
    setDisplayedAnswer("");
    const interval = setInterval(() => {
      if (i < answer.length) {
        setDisplayedAnswer(answer.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 12);
    return () => clearInterval(interval);
  }, [answer]);

  // Scroll to answer when it appears
  useEffect(() => {
    if (answer && answerRef.current) {
      answerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [answer]);

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to get response");
      setAnswer(data.answer);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />

      <div className="noise-overlay min-h-screen flex flex-col relative"
        style={{ background: "var(--bg-primary)" }}
      >
        <GoldenParticles />

        {/* Background mandala decorations */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <Mandala className="mandala-spin absolute -top-32 -right-32 w-[500px] h-[500px] text-[var(--accent-gold)] opacity-[0.06]" />
          <Mandala className="mandala-spin-reverse absolute -bottom-40 -left-40 w-[600px] h-[600px] text-[var(--accent-gold)] opacity-[0.04]" />
          <OmSymbol className="float-gentle absolute top-1/4 right-[8%] w-32 h-32 text-[var(--accent-gold)]" />
          <OmSymbol className="float-gentle absolute bottom-1/3 left-[5%] w-24 h-24 text-[var(--accent-gold)]" style={{ animationDelay: "3s" }} />
        </div>

        <main className="relative z-10 max-w-3xl mx-auto py-10 sm:py-16 md:py-20 px-4 sm:px-6 flex-grow w-full">
          {/* ── Header ───────────────────────────── */}
          <header className="text-center mb-12 sm:mb-16 animate-fade-in-up">
            {/* Small mandala above title */}
            <div className="flex justify-center mb-4">
              <Mandala className="mandala-spin w-16 h-16 sm:w-20 sm:h-20 text-[var(--accent-gold)] opacity-60" />
            </div>

            <h1
              className="font-serif text-5xl xs:text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight leading-[0.9] mb-4 text-gold-gradient"
            >
              Gita Flow
            </h1>

            <div className="ornate-divider max-w-xs mx-auto mb-5">
              <span
                className="text-xs tracking-[0.35em] uppercase font-sans font-medium"
                style={{ color: "var(--text-muted)" }}
              >
                Divine Wisdom
              </span>
            </div>

            <p
              className="font-sans text-base sm:text-lg md:text-xl max-w-xl mx-auto leading-relaxed font-light"
              style={{ color: "var(--text-secondary)" }}
            >
              Seek guidance from Lord Krishna. Share what troubles your heart and
              receive wisdom inspired by the eternal Bhagavad Gita.
            </p>
          </header>

          {/* ── Question Form ────────────────────── */}
          <form
            onSubmit={handleSubmit}
            className="mb-8 sm:mb-10 animate-fade-in-up"
            style={{ animationDelay: "0.15s" }}
          >
            <div
              className="rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 relative overflow-hidden"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-light)",
                boxShadow: `0 4px 30px var(--shadow-warm), 0 1px 3px rgba(0,0,0,0.04)`,
              }}
            >
              {/* Decorative corner marks */}
              <div className="absolute top-3 left-3 w-5 h-5 border-t border-l opacity-25" style={{ borderColor: "var(--accent-gold)" }} />
              <div className="absolute top-3 right-3 w-5 h-5 border-t border-r opacity-25" style={{ borderColor: "var(--accent-gold)" }} />
              <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l opacity-25" style={{ borderColor: "var(--accent-gold)" }} />
              <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r opacity-25" style={{ borderColor: "var(--accent-gold)" }} />

              <label
                htmlFor="question"
                className="flex items-center gap-2.5 font-serif text-lg sm:text-xl font-semibold mb-4"
                style={{ color: "var(--accent-gold-dim)" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="4" />
                  <line x1="12" y1="2" x2="12" y2="6" />
                  <line x1="12" y1="18" x2="12" y2="22" />
                  <line x1="2" y1="12" x2="6" y2="12" />
                  <line x1="18" y1="12" x2="22" y2="12" />
                </svg>
                What troubles you, dear seeker?
              </label>

              <textarea
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Share your problem, dilemma, or question... Krishna is listening"
                className="w-full min-h-[140px] sm:min-h-[160px] p-4 text-base sm:text-lg rounded-xl resize-none font-sans transition-all duration-300 focus:outline-none"
                style={{
                  background: "var(--bg-secondary)",
                  color: "var(--text-primary)",
                  border: "1.5px solid var(--border-light)",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent-gold)";
                  e.currentTarget.style.boxShadow = `0 0 0 3px var(--glow-gold)`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-light)";
                  e.currentTarget.style.boxShadow = "none";
                }}
                disabled={loading}
                rows={5}
              />

              <button
                type="submit"
                disabled={loading}
                className="mt-4 w-full sm:w-auto min-h-[48px] px-8 py-3 font-sans text-base sm:text-lg font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                style={{
                  background: loading
                    ? "var(--accent-gold-dim)"
                    : `linear-gradient(135deg, var(--accent-gold-dim), var(--accent-gold))`,
                  color: "#fff",
                  boxShadow: "0 4px 15px var(--glow-gold)",
                }}
                onMouseEnter={(e) => {
                  if (!loading) e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {loading ? (
                  <>
                    <Mandala className="w-5 h-5 mandala-spin text-white" />
                    <span>Krishna is reflecting...</span>
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                    <span>Seek Krishna&apos;s Wisdom</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* ── Error ────────────────────────────── */}
          {error && (
            <div
              className="rounded-xl p-4 mb-8 flex items-start gap-3 animate-fade-in-up"
              style={{
                background: "color-mix(in srgb, var(--accent-crimson) 8%, var(--bg-card))",
                border: "1px solid color-mix(in srgb, var(--accent-crimson) 30%, transparent)",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-crimson)" strokeWidth="2" strokeLinecap="round" className="flex-shrink-0 mt-0.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p className="text-sm sm:text-base font-sans" style={{ color: "var(--accent-crimson)" }}>
                {error}
              </p>
            </div>
          )}

          {/* ── Answer Display ───────────────────── */}
          {answer && (
            <div
              ref={answerRef}
              className="rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 animate-fade-in-up relative overflow-hidden"
              style={{
                background: "var(--bg-card)",
                border: "1.5px solid var(--accent-gold)",
                boxShadow: `0 4px 40px var(--glow-gold), 0 0 80px var(--shadow-warm)`,
              }}
            >
              {/* Gold shimmer line at top */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] animate-shimmer"
                style={{
                  background: "linear-gradient(90deg, transparent, var(--accent-gold), transparent)",
                }}
              />

              <div className="flex items-start gap-3 mb-5 sm:mb-6">
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--glow-gold)" }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gold-gradient leading-tight">
                    Krishna&apos;s Divine Wisdom
                  </h2>
                  <div className="ornate-divider mt-2" style={{ maxWidth: "180px" }}>
                    <span className="text-[10px] tracking-[0.3em] uppercase font-sans" style={{ color: "var(--text-muted)" }}>
                      Bhagavad Gita
                    </span>
                  </div>
                </div>
              </div>

              <div className="font-sans text-base sm:text-lg leading-relaxed sm:leading-loose font-light whitespace-pre-wrap"
                style={{ color: "var(--text-secondary)" }}
              >
                {displayedAnswer}
                {displayedAnswer.length < answer.length && (
                  <span
                    className="inline-block w-0.5 h-5 ml-0.5 align-text-bottom"
                    style={{
                      background: "var(--accent-gold)",
                      animation: "typewriter-blink 0.8s ease-in-out infinite",
                    }}
                  />
                )}
              </div>
            </div>
          )}

          {/* ── Idle Quote ───────────────────────── */}
          {!answer && !loading && (
            <div
              className="text-center mt-10 sm:mt-14 animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              <div
                className="inline-block rounded-xl sm:rounded-2xl px-6 py-5 max-w-lg mx-auto sacred-border"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-light)",
                }}
              >
                <p
                  className="font-serif text-lg sm:text-xl md:text-2xl italic leading-relaxed font-light"
                  style={{ color: "var(--text-secondary)" }}
                >
                  &quot;Whenever dharma declines and adharma rises, I manifest
                  myself.&quot;
                </p>
                <span
                  className="inline-block mt-3 text-xs sm:text-sm tracking-[0.2em] uppercase font-sans font-medium"
                  style={{ color: "var(--accent-gold)" }}
                >
                  Bhagavad Gita 4.7
                </span>
              </div>
            </div>
          )}
        </main>

        {/* ── Footer ───────────────────────────── */}
        <footer
          className="relative z-10 max-w-3xl mx-auto w-full py-8 sm:py-10 px-4 sm:px-6"
          style={{ borderTop: "1px solid var(--border-light)" }}
        >
          <div className="text-center">
            <div className="flex items-center justify-center gap-5 sm:gap-8 mb-6 flex-wrap">
              {[
                { href: "/terms", label: "Terms" },
                { href: "/privacy", label: "Privacy" },
                { href: "/disclaimer", label: "Disclaimer" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs sm:text-sm font-sans font-medium min-h-[44px] flex items-center transition-colors duration-200 hover:opacity-100"
                  style={{ color: "var(--text-muted)" }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "var(--accent-gold)"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-muted)"}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <p
              className="font-sans text-xs sm:text-sm mb-5"
              style={{ color: "var(--text-muted)" }}
            >
              Crafted with devotion by{" "}
              <span className="font-medium" style={{ color: "var(--accent-gold)" }}>
                Ashutosh Swamy
              </span>
            </p>

            <div className="flex items-center justify-center gap-6">
              <a
                href="https://github.com/ashutoshswamy"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] flex items-center gap-2 transition-all duration-200 group"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) => e.currentTarget.style.color = "var(--accent-gold)"}
                onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-muted)"}
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                <span className="hidden sm:inline text-sm font-sans font-medium">GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/ashutoshswamy"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] flex items-center gap-2 transition-all duration-200 group"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) => e.currentTarget.style.color = "var(--accent-gold)"}
                onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-muted)"}
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span className="hidden sm:inline text-sm font-sans font-medium">LinkedIn</span>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
