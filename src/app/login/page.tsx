import type { Metadata } from "next";
import { AuthFlow } from "@/components/auth-flow";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://gitaflow.ashutoshswamy.in/login" },
};

export default function LoginPage() {
  return <AuthFlow mode="login" />;
}
