"use client";

import Link from "next/link";

type Props = {
  adult: boolean;
  terms: boolean;
  onAdult: (v: boolean) => void;
  onTerms: (v: boolean) => void;
};

const BOX =
  "flex cursor-pointer items-start gap-3 rounded-[var(--radius-ctl)] border border-rule bg-panel p-4 transition-colors has-[:checked]:border-accent";

export function ConsentChecks({ adult, terms, onAdult, onTerms }: Props) {
  return (
    <fieldset className="space-y-3">
      <legend className="sr-only">Age and terms</legend>
      <label className={BOX}>
        <input type="checkbox" checked={adult} onChange={(e) => onAdult(e.target.checked)} className="mt-0.5" />
        <span className="text-sm leading-snug text-ink">I am 18 years of age or older.</span>
      </label>
      <label className={BOX}>
        <input type="checkbox" checked={terms} onChange={(e) => onTerms(e.target.checked)} className="mt-0.5" />
        <span className="text-sm leading-snug text-ink">
          I accept the{" "}
          <Link href="/terms" target="_blank" className="font-semibold text-accent-text underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" target="_blank" className="font-semibold text-accent-text underline">
            Privacy Policy
          </Link>
          .
        </span>
      </label>
    </fieldset>
  );
}
