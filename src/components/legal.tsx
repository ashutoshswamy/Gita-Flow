import Link from "next/link";

export function LegalLayout({
  title,
  eyebrow,
  icon,
  children,
}: {
  title: string;
  eyebrow: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="noise-overlay min-h-screen relative" style={{ background: "var(--bg)" }}>
      <main className="relative z-10 max-w-3xl mx-auto py-10 sm:py-16 px-4 sm:px-6 w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-2 min-h-[44px] font-sans text-sm font-medium transition-colors duration-200 mb-8 group"
          style={{ color: "var(--flame)" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Home
        </Link>

        <header className="text-center mb-10 sm:mb-14">
          {icon && (
            <div className="flex justify-center mb-3" style={{ color: "var(--flame)" }}>
              {icon}
            </div>
          )}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter leading-tight mb-3 text-flame-gradient">
            {title}
          </h1>
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase" style={{ color: "var(--ink-faint)" }}>
            {eyebrow}
          </p>
        </header>

        <div
          className="rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12"
          style={{
            background: "var(--bg-panel)",
            border: "1px solid var(--rule)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
          }}
        >
          {children}
        </div>
      </main>
    </div>
  );
}

export function LegalIntro({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-base sm:text-lg leading-relaxed mb-8" style={{ color: "var(--ink-dim)" }}>
      {children}
    </p>
  );
}

export function LegalSection({
  title,
  children,
  last,
}: {
  title: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div className={last ? "" : "mb-8"}>
      <h2 className="text-xl sm:text-2xl font-bold mb-3" style={{ color: "var(--flame)" }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

export function LegalList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="font-sans text-base leading-relaxed space-y-2 ml-1" style={{ color: "var(--ink-dim)" }}>
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--flame)" }} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function LegalNote({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mt-10 p-5 sm:p-6 rounded-xl"
      style={{
        background: "color-mix(in srgb, var(--flame) 6%, var(--bg-panel-raised))",
        border: "1px solid var(--rule-bright)",
      }}
    >
      <p className="font-sans text-base italic leading-relaxed" style={{ color: "var(--ink-dim)" }}>
        {children}
      </p>
    </div>
  );
}
