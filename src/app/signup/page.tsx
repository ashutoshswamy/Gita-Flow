import type { Metadata } from "next";
import { AuthFlow } from "@/components/auth-flow";

export const metadata: Metadata = {
  title: "Create account",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://gitaflow.ashutoshswamy.in/signup" },
};

export default function SignupPage() {
  return <AuthFlow mode="signup" />;
}
