"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Landing } from "@/components/landing";
import { ChatApp } from "@/components/chat-app";
import { Logo } from "@/components/brand";

export default function Home() {
  const { user, consent } = useAuth();
  const router = useRouter();
  const inApp = !!user && consent === "ok";

  // Signed in with Google but still missing the age and terms confirmation.
  useEffect(() => {
    if (user && consent === "needed") router.replace("/login");
  }, [user, consent, router]);

  return (
    <>
      {!!user && consent !== "ok" ? (
        <div className="flex min-h-[100dvh] items-center justify-center">
          <div className="animate-pulse">
            <Logo size={44} />
          </div>
        </div>
      ) : inApp ? (
        <ChatApp />
      ) : (
        <Landing />
      )}
    </>
  );
}
