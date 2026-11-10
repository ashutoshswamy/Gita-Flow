"use client";

import { MotionConfig } from "motion/react";
import { Toaster } from "sileo";
import "sileo/styles.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { CookieBanner } from "@/components/cookie-banner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <AuthProvider>
        {children}
        <CookieBanner />
      </AuthProvider>
      <Toaster position="top-center" theme="system" />
    </MotionConfig>
  );
}
