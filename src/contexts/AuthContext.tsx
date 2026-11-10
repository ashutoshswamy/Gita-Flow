"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut, User } from "firebase/auth";
import { sileo } from "sileo";
import { auth, googleProvider } from "@/lib/firebase";

type ConsentState = "checking" | "ok" | "needed";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  consent: ConsentState;
  /** Google popup only. Consent is looked up afterwards; "needed" means a first-time or outdated account. */
  signInWithGoogle: () => Promise<boolean>;
  /** Google popup, then records the 18+ and terms confirmation the form already collected. */
  signUpWithGoogle: () => Promise<boolean>;
  /** Records consent for an already signed-in user. */
  acceptTerms: () => Promise<boolean>;
  signOutUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const SILENT_ERRORS = ["auth/popup-closed-by-user", "auth/cancelled-popup-request"];

async function postConsent(user: User) {
  const res = await fetch("/api/consent", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${await user.getIdToken()}` },
    body: JSON.stringify({ adult: true, terms: true }),
  });
  if (!res.ok) throw new Error("We could not save your consent. Please try again.");
}

function report(err: unknown, title: string) {
  const code = (err as { code?: string }).code;
  if (code && SILENT_ERRORS.includes(code)) return;
  sileo.error({ title, description: err instanceof Error ? err.message : "Something went wrong." });
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [consent, setConsent] = useState<ConsentState>("checking");
  // Sign-up records consent itself right after the popup; skip the lookup meanwhile.
  const recordingRef = useRef(false);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
      if (!u) setConsent("checking");
    });
  }, []);

  useEffect(() => {
    if (!user || recordingRef.current) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/consent", {
          headers: { Authorization: `Bearer ${await user.getIdToken()}` },
        });
        const data = await res.json();
        if (cancelled) return;
        if (!res.ok) throw new Error(data.error);
        setConsent(data.accepted ? "ok" : "needed");
      } catch {
        if (!cancelled) {
          sileo.error({
            title: "Could not verify your account",
            description: "Check your connection and reload the page.",
          });
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user]);

  const signInWithGoogle = useCallback(async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      return true;
    } catch (err) {
      report(err, "Sign in failed");
      return false;
    }
  }, []);

  const signUpWithGoogle = useCallback(async () => {
    recordingRef.current = true;
    try {
      const { user: u } = await signInWithPopup(auth, googleProvider);
      try {
        await postConsent(u);
      } catch (err) {
        // Signed in but not recorded: the page falls back to the consent step.
        setConsent("needed");
        throw err;
      }
      setConsent("ok");
      return true;
    } catch (err) {
      report(err, "Could not create your account");
      return false;
    } finally {
      recordingRef.current = false;
    }
  }, []);

  const acceptTerms = useCallback(async () => {
    const u = auth.currentUser;
    if (!u) return false;
    try {
      await postConsent(u);
      setConsent("ok");
      return true;
    } catch (err) {
      report(err, "Could not save your consent");
      return false;
    }
  }, []);

  const signOutUser = useCallback(async () => {
    await signOut(auth);
    sileo.info({ title: "Signed out", description: "Your chats are saved for next time." });
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, consent, signInWithGoogle, signUpWithGoogle, acceptTerms, signOutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
