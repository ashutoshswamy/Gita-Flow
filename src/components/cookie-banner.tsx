"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Cookie } from "@phosphor-icons/react";
import { sileo } from "sileo";

const COOKIE = "gf_cookie_consent";
export const OPEN_COOKIE_SETTINGS = "gf:cookie-settings";

function readChoice() {
  const match = document.cookie.split("; ").find((c) => c.startsWith(`${COOKIE}=`));
  return match ? match.split("=")[1] : null;
}

export function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!readChoice()) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS, reopen);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS, reopen);
  }, []);

  const choose = (value: "all" | "essential") => {
    document.cookie = `${COOKIE}=${value}; Max-Age=31536000; Path=/; SameSite=Lax`;
    setOpen(false);
    sileo.success({
      title: "Cookie preference saved",
      description: value === "all" ? "All cookies accepted." : "Only essential storage will be used.",
    });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.section
          role="region"
          aria-label="Cookie consent"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 right-4 z-40 rounded-[var(--radius-panel)] border border-rule bg-panel max-h-[calc(100dvh-2rem)] overflow-y-auto p-5 shadow-pop sm:left-6 sm:right-auto sm:max-w-sm"
        >
          <div className="flex items-start gap-3">
            <span className="mt-0.5 shrink-0 text-accent-text">
              <Cookie size={24} weight="duotone" aria-hidden />
            </span>
            <div>
              <h2 className="font-display text-base font-bold text-ink">Cookies</h2>
              <p className="mt-1 text-sm leading-relaxed text-dim">
                We use essential storage to keep you signed in and remember this choice. Optional
                cookies run only if you accept. See our{" "}
                <Link href="/privacy" className="font-medium text-ink underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => choose("all")}
              className="min-h-11 flex-1 rounded-[var(--radius-ctl)] bg-accent px-4 text-sm font-semibold text-accent-ink transition-colors hover:bg-accent-hover active:scale-[0.98]"
            >
              Accept all
            </button>
            <button
              type="button"
              onClick={() => choose("essential")}
              className="min-h-11 flex-1 rounded-[var(--radius-ctl)] border border-rule-strong px-4 text-sm font-semibold text-ink transition-colors hover:bg-raised active:scale-[0.98]"
            >
              Essential only
            </button>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
