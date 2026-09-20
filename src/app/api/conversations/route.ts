import { NextRequest, NextResponse } from "next/server";
import { requireUserId } from "@/lib/firebase-admin";
import { getConversations } from "@/lib/db";

export async function GET(request: NextRequest) {
  const userId = await requireUserId(request);
  if (!userId) return NextResponse.json({ error: "Sign in required" }, { status: 401 });

  const chatId = Number(request.nextUrl.searchParams.get("chatId"));
  if (!Number.isInteger(chatId)) {
    return NextResponse.json({ error: "chatId is required" }, { status: 400 });
  }

  try {
    const conversations = await getConversations(userId, chatId);
    return NextResponse.json({ conversations });
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return NextResponse.json({ error: "Failed to load history" }, { status: 500 });
  }
}
