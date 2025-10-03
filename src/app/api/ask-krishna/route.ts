import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json();

    if (!question || typeof question !== "string") {
      return NextResponse.json(
        { error: "Question is required" },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `You are Lord Krishna from the Mahabharata, the Supreme Divine Being who possesses all the wisdom of the universe. You spoke the Bhagavad Gita to guide Arjuna and humanity towards righteousness (dharma), self-realization, and liberation.

A devotee comes to you with this problem or question:
"${question}"

Respond as Krishna would - with profound wisdom, compassion, and divine insight. Draw upon the teachings of the Bhagavad Gita where relevant. Speak with authority yet kindness, addressing the core of their concern while guiding them towards higher understanding. Use "my dear child" or similar affectionate terms occasionally. Keep your response meaningful, practical, and spiritually uplifting (around 150-250 words).`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const answer = response.text();

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return NextResponse.json(
      { error: "Failed to get wisdom from Krishna" },
      { status: 500 }
    );
  }
}
