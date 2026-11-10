import { LOTUS, LOTUS_TINT } from "@/lib/logo-paths";

// The one Gita Flow mark. Colours come from theme tokens, so it follows light/dark.
// Static copies (favicon, app icons, OG image) are generated from the same paths.
export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 512 512" aria-hidden className="shrink-0">
      <rect width="512" height="512" rx="170" fill="var(--accent)" />
      <g transform="translate(107.5 107.5) scale(1.16)" fill="var(--accent-ink)">
        <path d={LOTUS_TINT} opacity=".2" />
        <path d={LOTUS} />
      </g>
    </svg>
  );
}

export function Logo({ size = 36 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark size={size} />
      <span className="whitespace-nowrap font-display text-xl font-bold tracking-tight text-ink">Gita Flow</span>
    </span>
  );
}
