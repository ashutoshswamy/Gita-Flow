import { NextRequest, NextResponse } from "next/server";
import { requireUserId } from "@/lib/firebase-admin";
import { renameChat, deleteChat } from "@/lib/db";

const MAX_TITLE_LENGTH = 80;

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userId = await requireUserId(request);
  if (!userId) return NextResponse.json({ error: "Sign in required" }, { status: 401 });

  const chatId = Number((await params).id);
  if (!Number.isInteger(chatId)) {
    return NextResponse.json({ error: "Invalid chat" }, { status: 400 });
  }

  const { title } = await request.json();
  if (!title || typeof title !== "string" || !title.trim()) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }
  if (title.length > MAX_TITLE_LENGTH) {
    return NextResponse.json({ error: "Title is too long" }, { status: 400 });
  }

  try {
    const ok = await renameChat(userId, chatId, title.trim());
    if (!ok) return NextResponse.json({ error: "Chat not found" }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error renaming chat:", error);
    return NextResponse.json({ error: "Failed to rename chat" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userId = await requireUserId(request);
  if (!userId) return NextResponse.json({ error: "Sign in required" }, { status: 401 });

  const chatId = Number((await params).id);
  if (!Number.isInteger(chatId)) {
    return NextResponse.json({ error: "Invalid chat" }, { status: 400 });
  }

  try {
    const ok = await deleteChat(userId, chatId);
    if (!ok) return NextResponse.json({ error: "Chat not found" }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error deleting chat:", error);
    return NextResponse.json({ error: "Failed to delete chat" }, { status: 500 });
  }
}
