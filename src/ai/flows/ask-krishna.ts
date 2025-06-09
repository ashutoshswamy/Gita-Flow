// src/ai/flows/ask-krishna.ts
"use server";
/**
 * @fileOverview An AI agent that responds to user questions with wisdom inspired by the Bhagavad Gita, in the persona of Krishna, using the Google Gemini API via @google/generative-ai.
 *
 * - askKrishna - A function that handles the question answering process.
 * - AskKrishnaInput - The input type for the askKrishna function.
 * - AskKrishnaOutput - The return type for the askKrishna function.
 */

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

export interface AskKrishnaInput {
  question: string;
}

export interface AskKrishnaOutput {
  answer: string;
}

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable is not set.");
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  // For GITA AI, we want to allow most content, but block hate speech, harassment, and dangerous content.
  // Sexually explicit content should also be blocked as it's not relevant to spiritual guidance.
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ],
});

export async function askKrishna(
  input: AskKrishnaInput
): Promise<AskKrishnaOutput> {
  const prompt = `You are Krishna from the Bhagavad Gita. A user has come to you seeking guidance. Answer their question with wisdom and compassion, drawing upon the teachings of the Gita. Speak as Krishna would, using analogies and stories to illustrate your points. Provide gentle and spiritual guidance. Do not mention the current year or any contemporary temporal markers. Focus solely on timeless spiritual wisdom.

User's Question: ${input.question}`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return { answer: text };
  } catch (error: any) {
    console.error("Error calling Gemini API:", error);
    // Check for specific blocked content error
    if (error.message && error.message.includes(" закінчився із SAFETY")) {
      // This is an example, actual message might vary
      return {
        answer:
          "I apologize, but I am unable to provide guidance on this topic as it may go against my safety guidelines. Perhaps we can explore a different aspect of your query?",
      };
    }
    if (
      error.response &&
      error.response.promptFeedback &&
      error.response.promptFeedback.blockReason
    ) {
      // Log the specific block reason for debugging
      console.error(
        "Content blocked due to:",
        error.response.promptFeedback.blockReason
      );
      let userMessage =
        "I apologize, but I am unable to provide guidance on this specific topic as it may have been blocked by safety filters. ";
      userMessage +=
        "Could you please rephrase your question, or perhaps we can explore a different aspect of spiritual wisdom?";
      return { answer: userMessage };
    }
    throw new Error(
      error.message ||
        "An unexpected error occurred while seeking Krishna's wisdom."
    );
  }
}
