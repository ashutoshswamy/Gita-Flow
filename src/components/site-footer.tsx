"use client";

import Link from "next/link";
import { GithubLogo, XLogo, LinkedinLogo, Globe } from "@phosphor-icons/react";
import { Logo } from "@/components/brand";
import { OPEN_COOKIE_SETTINGS } from "@/components/cookie-banner";

const SOCIALS = [
  { href: "https://github.com/ashutoshswamy", label: "GitHub", Icon: GithubLogo },
  { href: "https://x.com/ashutoshswamy_", label: "X", Icon: XLogo },
  { href: "https://linkedin.com/in/ashutoshswamy", label: "LinkedIn", Icon: LinkedinLogo },
  { href: "https://ashutoshswamy.in", label: "Portfolio", Icon: Globe },
];

const LINKS = [
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
  { href: "/disclaimer", label: "Disclaimer" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto flex max-w-6xl 2xl:max-w-7xl flex-col gap-8 px-5 py-10 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-3">
          <Logo size={32} />
          <p className="text-sm text-faint">
            Made by{" "}
            <a href="https://ashutoshswamy.in" target="_blank" rel="noopener noreferrer" className="font-medium text-ink underline">
              Ashutosh Swamy
            </a>
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm font-medium text-dim">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="flex min-h-11 items-center transition-colors hover:text-ink">
              {l.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS))}
            className="flex min-h-11 items-center transition-colors hover:text-ink"
          >
            Cookie settings
          </button>
        </nav>
        <div className="flex items-center gap-1">
          {SOCIALS.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="inline-flex size-11 items-center justify-center rounded-[var(--radius-ctl)] text-dim transition-colors hover:bg-raised hover:text-ink"
            >
              <Icon size={22} aria-hidden />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
