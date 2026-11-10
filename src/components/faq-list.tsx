"use client";

import { useId, useState } from "react";
import { Plus } from "@phosphor-icons/react";
import { FAQ } from "@/lib/faq";

// Answers stay in the DOM when closed (crawlable, matches the FAQPage JSON-LD);
// the grid-rows trick animates height with no JS.
export function FaqList() {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <ul className="space-y-3">
      {FAQ.map((f, i) => {
        const isOpen = open === i;
        const panel = `${base}-${i}`;
        return (
          <li
            key={f.q}
            className={`rounded-[var(--radius-panel)] border transition-colors duration-300 ${
              isOpen ? "border-accent bg-panel shadow-soft" : "border-rule bg-panel hover:border-rule-strong"
            }`}
          >
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex min-h-16 w-full items-center justify-between gap-4 rounded-[var(--radius-panel)] px-5 py-4 text-left sm:px-6"
              >
                <span className="font-display text-lg font-semibold tracking-tight text-ink sm:text-xl">{f.q}</span>
                <span
                  className={`inline-flex size-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                    isOpen ? "rotate-45 bg-accent text-accent-ink" : "bg-raised text-dim"
                  }`}
                >
                  <Plus size={18} weight="bold" aria-hidden />
                </span>
              </button>
            </h3>
            <div
              id={panel}
              role="region"
              aria-hidden={!isOpen}
              className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p
                  className={`max-w-[60ch] px-5 pb-6 text-base leading-relaxed text-dim transition-opacity duration-300 sm:px-6 ${
                    isOpen ? "opacity-100 delay-100" : "opacity-0"
                  }`}
                >
                  {f.a}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
