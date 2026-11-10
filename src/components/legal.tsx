import Link from "next/link";
import { ThemeMenu } from "@/components/theme-menu";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";

export function LegalLayout({
  title,
  updated,
  icon,
  children,
}: {
  title: string;
  updated: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[100dvh]">
      <main className="mx-auto w-full max-w-3xl px-5 py-8 sm:px-8 sm:py-14">
        <div className="flex items-center justify-between">
        <Link
          href="/"
          className="group -ml-2 inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-ctl)] px-2 text-sm font-semibold text-accent-text transition-colors hover:bg-raised"
        >
          <ArrowLeft size={16} weight="bold" className="transition-transform group-hover:-translate-x-1" aria-hidden />
          Back to Gita Flow
        </Link>
          <ThemeMenu />
        </div>

        <header className="mb-10 mt-8 sm:mb-14">
          {icon && (
            <span className="mb-5 inline-flex size-12 items-center justify-center rounded-[var(--radius-ctl)] bg-accent-soft text-accent-text">
              {icon}
            </span>
          )}
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl">{title}</h1>
          <p className="mt-3 text-sm text-faint">Last updated {updated}</p>
        </header>

        <div className="space-y-10">{children}</div>
      </main>
    </div>
  );
}

export function LegalIntro({ children }: { children: React.ReactNode }) {
  return <p className="max-w-[62ch] text-lg leading-relaxed text-dim">{children}</p>;
}

export function LegalSection({ title, children }: { title: string; children: React.ReactNode; last?: boolean }) {
  return (
    <section className="border-t border-rule pt-6">
      <h2 className="mb-3 text-xl font-bold tracking-tight text-ink sm:text-2xl">{title}</h2>
      {children}
    </section>
  );
}

export function LegalList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="max-w-[65ch] space-y-2.5 text-base leading-relaxed text-dim">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-[0.7rem] h-px w-3 shrink-0 bg-accent" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function LegalNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[var(--radius-panel)] bg-accent-soft p-5 sm:p-6">
      <p className="max-w-[62ch] text-base leading-relaxed text-ink">{children}</p>
    </div>
  );
}
