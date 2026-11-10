"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { Logo } from "@/components/brand";
import { ThemeMenu } from "@/components/theme-menu";
import { SiteFooter } from "@/components/site-footer";
import { HowItWorks } from "@/components/how-it-works";
import { FaqList } from "@/components/faq-list";

function SignInLink() {
  return (
    <Link
      href="/login"
      className="inline-flex min-h-11 items-center gap-2.5 rounded-[var(--radius-ctl)] border border-rule-strong px-4 text-sm font-semibold text-ink transition-colors hover:bg-raised active:scale-[0.98]"
    >
      Sign in
    </Link>
  );
}

function GetStartedLink() {
  return (
    <Link
      href="/signup"
      className="inline-flex min-h-14 items-center gap-3 rounded-[var(--radius-ctl)] bg-accent px-7 text-base font-semibold text-accent-ink shadow-soft transition-all hover:bg-accent-hover active:scale-[0.98]"
    >
      Get started
      <ArrowRight size={18} weight="bold" aria-hidden />
    </Link>
  );
}

const EASE = [0.16, 1, 0.3, 1] as const;

// Two carved tablets at different depths. Pointer movement shifts them in opposite
// directions, which is what reads as depth: it ties the verse to the stone it is cut in.
function HeroTablets() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 90, damping: 18 });
  const sy = useSpring(py, { stiffness: 90, damping: 18 });
  const frontX = useTransform(sx, [-0.5, 0.5], [-10, 10]);
  const frontY = useTransform(sy, [-0.5, 0.5], [-8, 8]);
  const backX = useTransform(sx, [-0.5, 0.5], [18, -18]);
  const backY = useTransform(sy, [-0.5, 0.5], [12, -12]);

  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width - 0.5);
        py.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
      className="relative mx-auto flex w-full max-w-xl flex-col lg:block lg:min-h-[32rem] lg:max-w-none"
    >
      <motion.div
        style={reduce ? undefined : { x: backX, y: backY }}
        className="relative w-[84%] self-end lg:absolute lg:right-0 lg:top-0"
      >
        <motion.div
          initial={{ opacity: 0, y: 48, rotate: 0 }}
          animate={{ opacity: 1, y: 0, rotate: 3 }}
          transition={{ duration: 1.1, delay: 0.45, ease: EASE }}
          className="relief rounded-[var(--radius-panel)] px-7 pb-24 pt-9 sm:px-10 sm:pt-11"
        >
          <p className="relief-text max-w-[26ch] text-xl font-medium leading-snug sm:text-2xl">
            You have a right to your actions, but never to their fruits.
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        style={reduce ? undefined : { x: frontX, y: frontY }}
        className="relative -mt-14 w-[90%] lg:absolute lg:bottom-0 lg:left-0 lg:mt-0"
      >
        <motion.div
          initial={{ opacity: 0, y: 64, rotate: 0 }}
          animate={{ opacity: 1, y: 0, rotate: -1.5 }}
          transition={{ duration: 1.1, delay: 0.25, ease: EASE }}
          className="relief rounded-[var(--radius-panel)] px-7 py-10 sm:px-10 sm:py-14"
        >
          <p lang="sa" className="relief-text font-deva text-[2rem] font-bold leading-[1.45] sm:text-5xl lg:text-4xl xl:text-5xl">
            कर्मण्येवाधिकारस्ते
            <br />
            मा फलेषु कदाचन।
          </p>
          <p className="mt-6 text-sm text-faint">Bhagavad Gita 2.47</p>
        </motion.div>
      </motion.div>
    </div>
  );
}

const HEADLINE = ["Ask", "what", "Arjuna", "asked."];

export function Landing() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <header className="mx-auto flex h-16 w-full max-w-6xl 2xl:max-w-7xl items-center justify-between gap-2 px-4 pt-[env(safe-area-inset-top)] sm:px-8">
        <Logo />
        <div className="flex items-center gap-2">
          <ThemeMenu />
          <SignInLink />
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto grid w-full max-w-6xl 2xl:max-w-7xl items-center gap-10 px-5 pb-24 pt-8 sm:px-8 lg:min-h-[calc(100dvh-4rem)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:pb-16 lg:pt-4">
          <div>
            <h1
              aria-label="Ask what Arjuna asked."
              className="text-[clamp(2.5rem,13vw,3.3rem)] font-extrabold leading-[0.96] tracking-tight text-ink sm:text-[clamp(3rem,min(11vw,16vh),4.5rem)] lg:text-[clamp(3rem,min(6vw,16vh),4.5rem)] 2xl:text-[clamp(4rem,min(3.4vw,14vh),4.75rem)]"
            >
              {HEADLINE.map((w, i) => (
                <span key={w} aria-hidden className="-mb-[0.2em] mr-[0.24em] inline-block overflow-hidden pb-[0.2em] align-bottom">
                  <motion.span
                    className={`inline-block ${w === "Arjuna" ? "text-accent-text" : ""}`}
                    initial={{ y: "115%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, delay: 0.1 + i * 0.09, ease: EASE }}
                  >
                    {w}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
              className="mt-7 max-w-[44ch] text-lg leading-relaxed text-dim sm:text-xl 2xl:text-2xl"
            >
              Bring your doubt, fear or decision. Krishna answers from the Bhagavad Gita, one conversation at a time.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.68, ease: EASE }}
              className="mt-9"
            >
              <GetStartedLink />
            </motion.div>
          </div>

          <HeroTablets />
        </section>

        <section className="mx-auto w-full max-w-6xl 2xl:max-w-7xl px-5 pb-24 pt-8 sm:px-8 lg:pt-0">
          <p className="max-w-[62ch] text-sm leading-relaxed text-faint">
            Answers are AI-generated reflections inspired by the Gita. They are not religious authority and not a
            substitute for professional advice. Gita Flow is for adults aged 18 and over.
          </p>
        </section>
        <HowItWorks />

        <section className="mx-auto grid w-full max-w-6xl 2xl:max-w-7xl gap-10 px-5 pb-28 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-8 lg:self-start">
            <h2 className="max-w-[12ch] text-3xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
              Questions, answered.
            </h2>
            <p className="mt-4 max-w-[32ch] text-base leading-relaxed text-dim">
              The short version, before you begin.
            </p>
          </div>
          <FaqList />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
