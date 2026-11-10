"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Desktop, Moon, Sun } from "@phosphor-icons/react";

type Theme = "light" | "dark" | "system";

const OPTIONS: { value: Theme; label: string; Icon: typeof Sun }[] = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
  { value: "system", label: "System", Icon: Desktop },
];

const KEY = "gf-theme";

function apply(theme: Theme) {
  if (theme === "system") delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = theme;
}

export function ThemeMenu({ placement = "bottom" }: { placement?: "bottom" | "top" }) {
  const [theme, setTheme] = useState<Theme>("system");
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === "light" || saved === "dark") setTheme(saved);
    } catch {}
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        root.current?.querySelector("button")?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const choose = (value: Theme) => {
    setTheme(value);
    apply(value);
    try {
      if (value === "system") localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, value);
    } catch {}
    setOpen(false);
  };

  const Current = OPTIONS.find((o) => o.value === theme)!.Icon;

  return (
    <div ref={root} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Change theme"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex size-11 items-center justify-center rounded-[var(--radius-ctl)] text-dim transition-colors hover:bg-raised hover:text-ink aria-expanded:bg-raised aria-expanded:text-ink"
      >
        <Current size={20} aria-hidden />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            aria-label="Theme"
            initial={{ opacity: 0, y: placement === "top" ? 6 : -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute z-30 w-40 rounded-[var(--radius-ctl)] border border-rule bg-panel p-1 shadow-pop ${
              placement === "top" ? "bottom-full left-0 mb-2 origin-bottom-left" : "right-0 top-full mt-2 origin-top-right"
            }`}
          >
            {OPTIONS.map(({ value, label, Icon }) => (
              <button
                key={value}
                type="button"
                role="menuitemradio"
                aria-checked={theme === value}
                onClick={() => choose(value)}
                className="flex min-h-10 w-full items-center gap-2.5 rounded-[8px] px-3 text-sm font-medium text-ink transition-colors hover:bg-raised"
              >
                <Icon size={18} className="text-dim" aria-hidden />
                <span className="flex-1 text-left">{label}</span>
                {theme === value && <Check size={16} weight="bold" className="text-accent-text" aria-hidden />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
