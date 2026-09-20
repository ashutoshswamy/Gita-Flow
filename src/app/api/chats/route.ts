import { NextRequest, NextResponse } from "next/server";
import { requireUserId } from "@/lib/firebase-admin";
import { listChats, createChat } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";

const CREATE_LIMIT = 20;
const CREATE_WINDOW_MS = 10 * 60 * 1000;

export async function GET(request: NextRequest) {
  const userId = await requireUserId(request);
  if (!userId) return NextResponse.json({ error: "Sign in required" }, { status: 401 });

  try {
    const chats = await listChats(userId);
    return NextResponse.json({ chats });
  } catch (error) {
    console.error("Error listing chats:", error);
    return NextResponse.json({ error: "Failed to load chats" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const userId = await requireUserId(request);
  if (!userId) return NextResponse.json({ error: "Sign in required" }, { status: 401 });

  if (!rateLimit(`chats:create:${userId}`, CREATE_LIMIT, CREATE_WINDOW_MS)) {
    return NextResponse.json({ error: "Too many chats created. Please try again later." }, { status: 429 });
  }

  try {
    const chat = await createChat(userId, "New chat");
    return NextResponse.json({ chat });
  } catch (error) {
    console.error("Error creating chat:", error);
    return NextResponse.json({ error: "Failed to create chat" }, { status: 500 });
  }
}
