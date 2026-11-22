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

const COLUMNS = [
  {
    title: "Product",
    links: [
      { href: "/signup", label: "Get started" },
      { href: "/login", label: "Log in" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/terms", label: "Terms of Service" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/disclaimer", label: "Disclaimer" },
    ],
  },
];

const linkCls = "flex min-h-11 items-center text-sm text-dim transition-colors hover:text-ink";

export function SiteFooter() {
  return (
    <footer className="border-t border-rule bg-panel">
      <div className="mx-auto max-w-6xl 2xl:max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <Logo size={32} />
            <p className="max-w-xs text-sm leading-relaxed text-dim">
              Timeless guidance from the Bhagavad Gita, for the questions of modern life.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-faint">{col.title}</h2>
              <ul className="mt-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={linkCls}>
                      {l.label}
                    </Link>
                  </li>
                ))}
                {col.title === "Legal" && (
                  <li>
                    <button
                      type="button"
                      onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS))}
                      className={linkCls}
                    >
                      Cookie settings
                    </button>
                  </li>
                )}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-faint">Connect</h2>
            <div className="-ml-3 mt-2 flex items-center">
              {SOCIALS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex size-11 items-center justify-center rounded-[var(--radius-ctl)] text-dim transition-colors hover:bg-raised hover:text-ink"
                >
                  <Icon size={20} aria-hidden />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-rule py-6 text-sm text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Gita Flow. All rights reserved.</p>
          <p>
            Made by{" "}
            <a
              href="https://ashutoshswamy.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-ink underline-offset-4 hover:underline"
            >
              Ashutosh Swamy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
