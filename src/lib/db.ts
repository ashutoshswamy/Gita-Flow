import { neon } from "@neondatabase/serverless";
import { TERMS_VERSION } from "@/lib/consent";

export const sql = neon(process.env.DATABASE_URL!);

export type Chat = {
  id: number;
  title: string;
  updated_at: string;
};

export type Conversation = {
  id: number;
  question: string;
  answer: string;
  created_at: string;
};

export async function listChats(userId: string) {
  const rows = await sql`
    SELECT id, title, updated_at
    FROM chats
    WHERE user_id = ${userId}
    ORDER BY updated_at DESC
  `;
  return rows as unknown as Chat[];
}

export async function createChat(userId: string, title: string) {
  const rows = await sql`
    INSERT INTO chats (user_id, title)
    VALUES (${userId}, ${title})
    RETURNING id, title, updated_at
  `;
  return (rows as unknown as Chat[])[0];
}

export async function renameChat(userId: string, chatId: number, title: string) {
  const rows = await sql`
    UPDATE chats SET title = ${title}
    WHERE id = ${chatId} AND user_id = ${userId}
    RETURNING id
  `;
  return rows.length > 0;
}

export async function deleteChat(userId: string, chatId: number) {
  const rows = await sql`
    DELETE FROM chats
    WHERE id = ${chatId} AND user_id = ${userId}
    RETURNING id
  `;
  return rows.length > 0;
}

async function touchChat(chatId: number) {
  await sql`UPDATE chats SET updated_at = now() WHERE id = ${chatId}`;
}

export async function chatBelongsToUser(userId: string, chatId: number) {
  const rows = await sql`SELECT id FROM chats WHERE id = ${chatId} AND user_id = ${userId}`;
  return rows.length > 0;
}

export async function saveConversation(userId: string, chatId: number, question: string, answer: string) {
  await sql`
    INSERT INTO conversations (user_id, chat_id, question, answer)
    VALUES (${userId}, ${chatId}, ${question}, ${answer})
  `;
  await touchChat(chatId);
}

export async function getConversations(userId: string, chatId: number) {
  const rows = await sql`
    SELECT id, question, answer, created_at
    FROM conversations
    WHERE user_id = ${userId} AND chat_id = ${chatId}
    ORDER BY created_at ASC
  `;
  return rows as unknown as Conversation[];
}

export async function hasConsent(userId: string) {
  const rows = await sql`
    SELECT 1 FROM user_consents
    WHERE user_id = ${userId} AND terms_version = ${TERMS_VERSION}
      AND is_adult AND accepted_terms
  `;
  return rows.length > 0;
}

export async function saveConsent(userId: string) {
  await sql`
    INSERT INTO user_consents (user_id, terms_version, is_adult, accepted_terms)
    VALUES (${userId}, ${TERMS_VERSION}, true, true)
    ON CONFLICT (user_id, terms_version) DO NOTHING
  `;
}
