import { NextRequest, NextResponse } from "next/server";
import { requireUserId } from "@/lib/firebase-admin";
import { hasConsent, saveConsent } from "@/lib/db";

export async function GET(request: NextRequest) {
  const userId = await requireUserId(request);
  if (!userId) return NextResponse.json({ error: "Sign in required" }, { status: 401 });

  try {
    return NextResponse.json({ accepted: await hasConsent(userId) });
  } catch (error) {
    console.error("Error reading consent:", error);
    return NextResponse.json({ error: "Failed to check consent" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const userId = await requireUserId(request);
  if (!userId) return NextResponse.json({ error: "Sign in required" }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (body?.adult !== true || body?.terms !== true) {
    return NextResponse.json({ error: "You must confirm your age and accept the terms" }, { status: 400 });
  }

  try {
    await saveConsent(userId);
    return NextResponse.json({ accepted: true });
  } catch (error) {
    console.error("Error saving consent:", error);
    return NextResponse.json({ error: "Failed to save consent" }, { status: 500 });
  }
}
