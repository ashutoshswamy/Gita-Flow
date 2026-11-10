"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { ChatCircleText, FlowerLotus, ClockCounterClockwise, type Icon } from "@phosphor-icons/react";
import { HOW } from "@/lib/faq";

const ICONS: Icon[] = [ChatCircleText, FlowerLotus, ClockCounterClockwise];
// Each step sits further right on desktop; a hairline connector bridges node to text.
const OFFSETS = ["0%", "12%", "24%"];

export function HowItWorks() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 65%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  return (
    <section className="mx-auto w-full max-w-6xl 2xl:max-w-7xl px-5 pb-28 sm:px-8">
      <h2 className="max-w-[18ch] text-3xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
        How it works
      </h2>

      <ol ref={ref} className="relative mt-14 space-y-14 sm:space-y-20">
        {/* Progress line: the track is static, the fill is drawn by scroll. */}
        <span aria-hidden className="absolute bottom-6 left-[21px] top-6 w-px bg-rule-strong" />
        <motion.span
          aria-hidden
          style={{ scaleY: reduce ? 1 : fill }}
          className="absolute bottom-6 left-[20px] top-6 w-0.5 origin-top bg-accent"
        />

        {HOW.map((h, i) => {
          const Ico = ICONS[i];
          return (
            <motion.li
              key={h.t}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-start"
            >
              <span className="relative z-10 mr-5 inline-flex size-11 shrink-0 sm:mr-7 items-center justify-center rounded-full border-2 border-accent bg-bg text-accent-text">
                <Ico size={22} weight="duotone" aria-hidden />
              </span>
              {i > 0 && (
                <span
                  aria-hidden
                  style={{ width: OFFSETS[i] }}
                  className="mr-7 mt-[21px] hidden h-px shrink-0 bg-accent/50 md:block"
                />
              )}
              <div className="-mt-1 max-w-[38ch]">
                <h3 className="font-display text-4xl font-extrabold leading-none tracking-tight text-ink sm:text-6xl">
                  {h.t}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-dim sm:text-lg">{h.d}</p>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </section>
  );
}
