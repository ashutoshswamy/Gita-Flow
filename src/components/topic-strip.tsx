"use client";

import { useState } from "react";
import { ArrowRight, Scales, Wind, Feather, Compass, Fire, type Icon } from "@phosphor-icons/react";
import { TOPICS } from "@/lib/topics";

const ICONS: Record<string, Icon> = { duty: Scales, fear: Wind, loss: Feather, purpose: Compass, anger: Fire };

// Surface per topic gives the row rhythm; `cta` inverts against that surface.
const TONES: Record<string, { surface: string; cta: string }> = {
  duty: { surface: "bg-accent text-accent-ink", cta: "bg-accent-ink text-accent-text" },
  fear: { surface: "bg-panel text-ink border border-rule", cta: "bg-accent text-accent-ink" },
  loss: { surface: "bg-raised text-ink", cta: "bg-accent text-accent-ink" },
  purpose: { surface: "bg-slate text-slate-ink", cta: "bg-slate-ink text-slate" },
  anger: { surface: "bg-panel text-ink border border-rule", cta: "bg-accent text-accent-ink" },
};

// One topic open at a time. On desktop the open strip grows and the rest fold to
// vertical labels; on mobile it is a stacked accordion. The open state is the motion:
// it reveals the actual question you would ask.
export function TopicStrip({ onPick }: { onPick: (prompt: string) => void }) {
  const [active, setActive] = useState(0);

  return (
    <ul className="mt-10 flex flex-col gap-3 lg:h-[27rem] lg:flex-row lg:gap-4">
      {TOPICS.map((t, i) => {
        const Ico = ICONS[t.id];
        const tone = TONES[t.id];
        const open = active === i;
        return (
          <li
            key={t.id}
            className={`flex min-w-0 flex-col overflow-hidden rounded-[var(--radius-panel)] p-5 transition-[flex-grow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:p-6 lg:p-7 ${tone.surface} ${
              open ? "lg:grow-[4]" : "lg:grow-[1]"
            } lg:basis-0`}
            onPointerEnter={(e) => {
              if (e.pointerType === "mouse") setActive(i);
            }}
          >
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="flex min-h-11 w-full items-center gap-4 text-left lg:flex-1 lg:flex-col lg:items-start lg:justify-between lg:gap-0"
            >
              <Ico size={32} weight="duotone" aria-hidden className="shrink-0" />
              <span
                className={`font-display font-bold tracking-tight transition-[font-size] duration-500 ${
                  open
                    ? "text-3xl lg:text-5xl"
                    : "text-2xl lg:text-2xl lg:[writing-mode:vertical-rl] lg:rotate-180"
                }`}
              >
                {t.title}
              </span>
            </button>

            <div
              className={`grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
              aria-hidden={!open}
            >
              <div className="overflow-hidden">
                <div className="pt-4 lg:w-[24rem] lg:max-w-full">
                  <p className="max-w-[30ch] text-lg leading-snug opacity-90 sm:text-xl">{t.prompt}</p>
                  <button
                    type="button"
                    tabIndex={open ? 0 : -1}
                    onClick={() => onPick(t.prompt)}
                    className={`mt-5 inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-ctl)] px-4 text-sm font-semibold transition-transform active:scale-[0.98] ${tone.cta}`}
                  >
                    Ask this question
                    <ArrowRight size={16} weight="bold" aria-hidden />
                  </button>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
