import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { requireUserId } from "@/lib/firebase-admin";
import { saveConversation, createChat, chatBelongsToUser } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const AUTHED_LIMIT = 30;
const AUTHED_WINDOW_MS = 60 * 60 * 1000;
const MAX_QUESTION_LENGTH = 2000;
const MAX_TITLE_LENGTH = 60;

export async function POST(request: NextRequest) {
  try {
    const { question, chatId } = await request.json();

    if (!question || typeof question !== "string" || !question.trim()) {
      return NextResponse.json(
        { error: "Question is required" },
        { status: 400 }
      );
    }

    if (question.length > MAX_QUESTION_LENGTH) {
      return NextResponse.json(
        { error: "Question is too long" },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const userId = await requireUserId(request);
    if (!userId) return NextResponse.json({ error: "Sign in to continue" }, { status: 401 });

    let existingChatId: number | null = null;
    if (chatId !== undefined && chatId !== null) {
      existingChatId = Number(chatId);
      if (!Number.isInteger(existingChatId) || !(await chatBelongsToUser(userId, existingChatId))) {
        return NextResponse.json({ error: "Chat not found" }, { status: 404 });
      }
    }

    if (!rateLimit(`user:${userId}`, AUTHED_LIMIT, AUTHED_WINDOW_MS)) {
      return NextResponse.json(
        { error: "Too many questions. Please try again later." },
        { status: 429 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash-lite" });

    const prompt = `You are Lord Krishna from the Mahabharata, the Supreme Divine Being who possesses all the wisdom of the universe. You spoke the Bhagavad Gita to guide Arjuna and humanity towards righteousness (dharma), self-realization, and liberation.

A devotee comes to you with this problem or question:
"${question}"

Respond as Krishna would - with profound wisdom, compassion, and divine insight. Draw upon the teachings of the Bhagavad Gita where relevant. Speak with authority yet kindness, addressing the core of their concern while guiding them towards higher understanding. Use "my dear child" or similar affectionate terms occasionally. Keep your response meaningful, practical, and spiritually uplifting (around 150-250 words). Write in plain prose only - no markdown, no headings, no bullet points, no asterisks or other formatting symbols.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const answer = response.text();

    let chat: { id: number; title: string } | null = null;
    try {
      if (existingChatId === null) {
        const title = question.trim().slice(0, MAX_TITLE_LENGTH);
        chat = await createChat(userId, title);
        existingChatId = chat.id;
      }
      await saveConversation(userId, existingChatId, question, answer);
    } catch (dbError) {
      console.error("Error saving conversation:", dbError);
    }

    return NextResponse.json({
      answer,
      chatId: existingChatId,
      chatTitle: chat?.title,
    });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return NextResponse.json(
      { error: "Failed to get wisdom from Krishna" },
      { status: 500 }
    );
  }
}
