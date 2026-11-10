"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SpinnerGap } from "@phosphor-icons/react";
import { sileo } from "sileo";
import { AuthShell } from "@/components/auth-shell";
import { ConsentChecks } from "@/components/consent-checks";
import { GoogleIcon } from "@/components/google-icon";
import { useAuth } from "@/contexts/AuthContext";

const PRIMARY =
  "inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-[var(--radius-ctl)] bg-accent px-5 text-sm font-semibold text-accent-ink shadow-soft transition-all hover:bg-accent-hover active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none";

function GoogleBadge() {
  return (
    <span className="inline-flex size-6 items-center justify-center rounded-full bg-white">
      <GoogleIcon size={14} />
    </span>
  );
}

function Heading({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl">{title}</h1>
      <p className="mt-3 max-w-[40ch] text-base leading-relaxed text-dim">{children}</p>
    </>
  );
}

export function AuthFlow({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const { user, loading, consent, signInWithGoogle, signUpWithGoogle, acceptTerms, signOutUser } = useAuth();
  const [adult, setAdult] = useState(false);
  const [terms, setTerms] = useState(false);
  const [busy, setBusy] = useState(false);
  const acted = useRef<null | "signin" | "signup">(null);
  const ready = adult && terms && !busy;

  // Everyone with a complete account ends up on the home page.
  useEffect(() => {
    if (user && consent === "ok") {
      if (acted.current === "signin") sileo.success({ title: "Welcome back", description: user.displayName ?? undefined });
      if (acted.current === "signup") sileo.success({ title: "Account created", description: "Welcome to Gita Flow." });
      router.replace("/");
    }
  }, [user, consent, router]);

  const run = async (kind: "signin" | "signup", fn: () => Promise<boolean>) => {
    acted.current = kind;
    setBusy(true);
    const ok = await fn();
    if (!ok) acted.current = null;
    setBusy(false);
  };

  if (loading || (user && consent !== "needed")) {
    return (
      <AuthShell>
        <div className="space-y-4" aria-label="Loading">
          <div className="h-12 w-3/4 animate-pulse rounded-[var(--radius-ctl)] bg-raised" />
          <div className="h-5 w-2/3 animate-pulse rounded-[var(--radius-ctl)] bg-raised" />
          <div className="h-12 w-full animate-pulse rounded-[var(--radius-ctl)] bg-raised" />
        </div>
      </AuthShell>
    );
  }

  // Signed in with Google but no consent on record (new or outdated terms).
  if (user) {
    return (
      <AuthShell>
        <Heading title="One last step">
          Confirm your age and accept our terms to start using Gita Flow.
        </Heading>
        <div className="mt-8">
          <ConsentChecks adult={adult} terms={terms} onAdult={setAdult} onTerms={setTerms} />
        </div>
        <button
          type="button"
          disabled={!ready}
          onClick={() => run("signup", acceptTerms)}
          className={`${PRIMARY} mt-6`}
        >
          {busy && <SpinnerGap size={18} className="animate-spin" aria-hidden />}
          Accept and continue
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={() => signOutUser()}
          className="mt-2 min-h-11 w-full rounded-[var(--radius-ctl)] text-sm font-medium text-dim transition-colors hover:text-ink disabled:opacity-50"
        >
          Sign out
        </button>
      </AuthShell>
    );
  }

  if (mode === "signup") {
    return (
      <AuthShell>
        <Heading title="Create your account">
          Free, and no password to remember. Gita Flow uses your Google account.
        </Heading>
        <div className="mt-8">
          <ConsentChecks adult={adult} terms={terms} onAdult={setAdult} onTerms={setTerms} />
        </div>
        <button
          type="button"
          disabled={!ready}
          onClick={() => run("signup", signUpWithGoogle)}
          className={`${PRIMARY} mt-6`}
        >
          {busy ? <SpinnerGap size={18} className="animate-spin" aria-hidden /> : <GoogleBadge />}
          Create account with Google
        </button>
        <p className="mt-6 text-sm text-dim">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-accent-text underline">
            Sign in
          </Link>
        </p>
      </AuthShell>
    );
  }

  return (
    <AuthShell>
      <Heading title="Welcome back">Sign in to pick up your conversations where you left them.</Heading>
      <button
        type="button"
        disabled={busy}
        onClick={() => run("signin", signInWithGoogle)}
        className={`${PRIMARY} mt-8`}
      >
        {busy ? <SpinnerGap size={18} className="animate-spin" aria-hidden /> : <GoogleBadge />}
        Sign in with Google
      </button>
      <p className="mt-6 text-sm text-dim">
        New to Gita Flow?{" "}
        <Link href="/signup" className="font-semibold text-accent-text underline">
          Create an account
        </Link>
      </p>
    </AuthShell>
  );
}
