import Link from "next/link";
import { Logo } from "@/components/brand";
import { ThemeMenu } from "@/components/theme-menu";

// Two-panel auth layout: the carved verse on the left (large screens), the form on the right.
export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-[100dvh] lg:grid-cols-[1fr_1.05fr]">
      <aside className="relative hidden items-center justify-center overflow-hidden bg-raised p-12 lg:flex">
        <div className="relief w-full max-w-lg rounded-[var(--radius-panel)] px-10 py-14 xl:px-12 xl:py-16">
          <p lang="sa" className="relief-text font-deva text-4xl font-bold leading-[1.5] xl:text-5xl">
            यदा यदा हि धर्मस्य
            <br />
            ग्लानिर्भवति भारत।
          </p>
          <p className="relief-text mt-8 max-w-[28ch] text-lg font-medium leading-snug">
            Whenever dharma declines, I manifest myself.
          </p>
          <p className="mt-3 text-sm text-faint">Bhagavad Gita 4.7</p>
        </div>
      </aside>

      <div className="flex min-h-[100dvh] flex-col px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-10">
        <header className="flex h-14 items-center justify-between">
          <Link href="/" aria-label="Gita Flow home" className="rounded-[var(--radius-ctl)]">
            <Logo size={32} />
          </Link>
          <ThemeMenu />
        </header>

        <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-10">{children}</main>

        <footer className="mx-auto flex w-full max-w-md flex-wrap gap-x-6 text-sm font-medium text-faint">
          <Link href="/terms" className="flex min-h-11 items-center hover:text-ink">
            Terms
          </Link>
          <Link href="/privacy" className="flex min-h-11 items-center hover:text-ink">
            Privacy
          </Link>
          <Link href="/disclaimer" className="flex min-h-11 items-center hover:text-ink">
            Disclaimer
          </Link>
        </footer>
      </div>
    </div>
  );
}
