"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUp,
  Check,
  List,
  PencilSimple,
  Plus,
  SignOut,
  SpinnerGap,
  TrashSimple,
  X,
} from "@phosphor-icons/react";
import { sileo } from "sileo";
import { ThemeMenu } from "@/components/theme-menu";
import { Logo, LogoMark } from "@/components/brand";
import { useAuth } from "@/contexts/AuthContext";
import type { Chat } from "@/lib/db";

type Message = { id: string; role: "user" | "krishna"; text: string };

export function ChatApp() {
  const { user, signOutUser } = useAuth();
  const [chats, setChats] = useState<Chat[]>([]);
  const [chatsLoading, setChatsLoading] = useState(true);
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [renamingId, setRenamingId] = useState<number | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [confirmingId, setConfirmingId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [typing, setTyping] = useState<{ id: string; text: string } | null>(null);
  const [typingText, setTypingText] = useState("");
  const [drawer, setDrawer] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  // Follow new text only while the reader is at the bottom; scrolling up releases it.
  const stickRef = useRef(true);
  const lastTopRef = useRef(0);
  // Chat created by the first question: its messages are already on screen, so skip the reload.
  const freshChatRef = useRef<number | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const authHeader = useCallback(async () => ({ Authorization: `Bearer ${await user!.getIdToken()}` }), [user]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/chats", { headers: await authHeader() });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        if (!cancelled) {
          setChats(data.chats);
          setActiveChatId((prev) => prev ?? data.chats[0]?.id ?? null);
        }
      } catch {
        if (!cancelled) sileo.error({ title: "Could not load your chats", description: "Please reload the page." });
      } finally {
        if (!cancelled) setChatsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [authHeader]);

  useEffect(() => {
    if (activeChatId === null) {
      setMessages([]);
      return;
    }
    if (freshChatRef.current === activeChatId) {
      freshChatRef.current = null;
      return;
    }
    let cancelled = false;
    stickRef.current = true;
    setHistoryLoading(true);
    (async () => {
      try {
        const res = await fetch(`/api/conversations?chatId=${activeChatId}`, { headers: await authHeader() });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        if (!cancelled) {
          setMessages(
            data.conversations.flatMap((c: { id: number; question: string; answer: string }) => [
              { id: `${c.id}-q`, role: "user" as const, text: c.question },
              { id: `${c.id}-a`, role: "krishna" as const, text: c.answer },
            ])
          );
        }
      } catch {
        if (!cancelled) sileo.error({ title: "Could not load this chat" });
      } finally {
        if (!cancelled) setHistoryLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [activeChatId, authHeader]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el && stickRef.current) {
      el.scrollTop = el.scrollHeight;
      lastTopRef.current = el.scrollTop;
    }
  }, [messages, typingText, loading]);

  useEffect(() => {
    if (!typing) return;
    let i = 0;
    setTypingText("");
    const timer = setInterval(() => {
      i += 2;
      setTypingText(typing.text.slice(0, i));
      if (i >= typing.text.length) {
        clearInterval(timer);
        setTyping(null);
      }
    }, 14);
    return () => clearInterval(timer);
  }, [typing]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 168)}px`;
  }, [input]);

  const sendMessage = async () => {
    const q = input.trim();
    if (!q || loading) return;
    stickRef.current = true;
    setLoading(true);
    setMessages((prev) => [...prev, { id: `u-${Date.now()}`, role: "user", text: q }]);
    setInput("");
    try {
      const res = await fetch("/api/ask-krishna", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(await authHeader()) },
        body: JSON.stringify({ question: q, chatId: activeChatId }),
      });
      const data = await res.json();
      if (!res.ok) {
        const err = new Error(data.error || "Failed to get a response") as Error & { status?: number };
        err.status = res.status;
        throw err;
      }
      const id = `k-${Date.now()}`;
      setMessages((prev) => [...prev, { id, role: "krishna", text: data.answer }]);
      setTyping({ id, text: data.answer });

      if (data.chatId) {
        setChats((prev) => {
          const existing = prev.find((c) => c.id === data.chatId);
          const rest = prev.filter((c) => c.id !== data.chatId);
          const now = new Date().toISOString();
          const chat: Chat = existing
            ? { ...existing, updated_at: now }
            : { id: data.chatId, title: data.chatTitle || "New chat", updated_at: now };
          return [chat, ...rest];
        });
        if (activeChatId === null) {
          freshChatRef.current = data.chatId;
          setActiveChatId(data.chatId);
        }
      }
    } catch (err) {
      setInput(q);
      const status = (err as { status?: number }).status;
      const message = err instanceof Error ? err.message : "Something went wrong";
      if (status === 429) sileo.warning({ title: "Slow down a little", description: message });
      else sileo.error({ title: "Krishna could not answer", description: message });
    } finally {
      setLoading(false);
    }
  };

  const newChat = () => {
    // A chat is created on the first question; this just clears the page.
    setActiveChatId(null);
    setMessages([]);
    setDrawer(false);
    textareaRef.current?.focus();
  };

  const commitRename = async (chatId: number) => {
    const title = renameValue.trim();
    setRenamingId(null);
    if (!title) return;
    const previous = chats;
    setChats((cs) => cs.map((c) => (c.id === chatId ? { ...c, title } : c)));
    try {
      const res = await fetch(`/api/chats/${chatId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...(await authHeader()) },
        body: JSON.stringify({ title }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setChats(previous);
      sileo.error({ title: "Could not rename chat" });
    }
  };

  const deleteChat = async (chatId: number) => {
    setConfirmingId(null);
    const previous = chats;
    const remaining = previous.filter((c) => c.id !== chatId);
    setChats(remaining);
    if (activeChatId === chatId) setActiveChatId(remaining[0]?.id ?? null);
    try {
      const res = await fetch(`/api/chats/${chatId}`, { method: "DELETE", headers: await authHeader() });
      if (!res.ok) throw new Error();
      sileo.success({ title: "Chat deleted" });
    } catch {
      setChats(previous);
      if (activeChatId === chatId) setActiveChatId(chatId);
      sileo.error({ title: "Could not delete chat", description: "It has been restored." });
    }
  };

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 shrink-0 items-center justify-between px-4 pt-[env(safe-area-inset-top)] box-content">
        <Logo size={32} />
        <button
          type="button"
          onClick={() => setDrawer(false)}
          aria-label="Close menu"
          className="inline-flex size-11 items-center justify-center rounded-[var(--radius-ctl)] text-dim hover:bg-raised md:hidden"
        >
          <X size={20} />
        </button>
      </div>

      <div className="px-3">
        <button
          type="button"
          onClick={newChat}
          className="flex min-h-11 w-full items-center justify-center gap-2 rounded-[var(--radius-ctl)] bg-accent px-4 text-sm font-semibold text-accent-ink transition-colors hover:bg-accent-hover active:scale-[0.98]"
        >
          <Plus size={16} weight="bold" aria-hidden />
          New chat
        </button>
      </div>

      <nav aria-label="Chats" className="mt-4 min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 pb-3">
        {chatsLoading && (
          <div className="space-y-2" aria-hidden>
            {[70, 90, 55].map((w) => (
              <div key={w} className="h-10 animate-pulse rounded-[var(--radius-ctl)] bg-raised" style={{ width: `${w}%` }} />
            ))}
          </div>
        )}
        {!chatsLoading && chats.length === 0 && (
          <p className="px-2 text-sm leading-relaxed text-faint">No chats yet. Ask your first question to begin.</p>
        )}
        <ul className="space-y-1">
          {chats.map((c) => {
            const active = c.id === activeChatId;
            if (renamingId === c.id) {
              return (
                <li key={c.id}>
                  <input
                    autoFocus
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                    onBlur={() => commitRename(c.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") commitRename(c.id);
                      if (e.key === "Escape") setRenamingId(null);
                    }}
                    aria-label="Chat name"
                    className="min-h-11 w-full rounded-[var(--radius-ctl)] border border-accent bg-bg px-3 text-base text-ink outline-none md:min-h-10 md:text-sm"
                  />
                </li>
              );
            }
            if (confirmingId === c.id) {
              return (
                <li key={c.id} className="flex min-h-11 items-center gap-1 rounded-[var(--radius-ctl)] bg-raised pl-3 pr-1 md:min-h-10">
                  <span className="flex-1 truncate text-sm text-ink">Delete this chat?</span>
                  <button
                    type="button"
                    onClick={() => deleteChat(c.id)}
                    aria-label="Confirm delete"
                    className="inline-flex size-11 items-center justify-center rounded-[var(--radius-ctl)] text-danger hover:bg-panel md:size-9"
                  >
                    <Check size={16} weight="bold" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmingId(null)}
                    aria-label="Cancel delete"
                    className="inline-flex size-11 items-center justify-center rounded-[var(--radius-ctl)] text-dim hover:bg-panel md:size-9"
                  >
                    <X size={16} weight="bold" />
                  </button>
                </li>
              );
            }
            return (
              <li
                key={c.id}
                className={`group flex items-center rounded-[var(--radius-ctl)] transition-colors ${
                  active ? "bg-panel shadow-soft" : "hover:bg-raised"
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    setActiveChatId(c.id);
                    setDrawer(false);
                  }}
                  aria-current={active ? "true" : undefined}
                  className={`min-h-11 min-w-0 flex-1 truncate px-3 text-left text-sm md:min-h-10 ${
                    active ? "font-semibold text-ink" : "text-dim"
                  }`}
                >
                  {c.title}
                </button>
                <span className="flex pr-1 opacity-100 transition-opacity focus-within:opacity-100 md:opacity-0 md:group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={() => {
                      setRenamingId(c.id);
                      setRenameValue(c.title);
                    }}
                    aria-label="Rename chat"
                    className="inline-flex size-11 items-center justify-center rounded-[var(--radius-ctl)] text-faint hover:text-ink md:size-9"
                  >
                    <PencilSimple size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmingId(c.id)}
                    aria-label="Delete chat"
                    className="inline-flex size-11 items-center justify-center rounded-[var(--radius-ctl)] text-faint hover:text-danger md:size-9"
                  >
                    <TrashSimple size={16} />
                  </button>
                </span>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="flex shrink-0 items-center gap-3 border-t border-rule p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        {user?.photoURL ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.photoURL} alt="" referrerPolicy="no-referrer" className="size-9 rounded-full" />
        ) : (
          <span className="inline-flex size-9 items-center justify-center rounded-full bg-accent-soft text-sm font-bold text-accent-text">
            {(user?.displayName || user?.email || "?").charAt(0).toUpperCase()}
          </span>
        )}
        <span className="min-w-0 flex-1 truncate text-sm font-medium text-ink">{user?.displayName || user?.email}</span>
        <ThemeMenu placement="top" />
        <button
          type="button"
          onClick={() => signOutUser()}
          aria-label="Sign out"
          className="inline-flex size-10 items-center justify-center rounded-[var(--radius-ctl)] text-dim hover:bg-raised hover:text-ink"
        >
          <SignOut size={20} />
        </button>
      </div>
    </div>
  );

  const activeTitle = chats.find((c) => c.id === activeChatId)?.title ?? "New chat";
  const empty = !historyLoading && messages.length === 0;

  return (
    <div className="grid h-[100dvh] grid-rows-[minmax(0,1fr)] overflow-hidden md:grid-cols-[18.5rem_1fr]">
      <aside className="hidden min-h-0 border-r border-rule bg-bg md:block">{sidebar}</aside>

      <AnimatePresence>
        {drawer && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              onClick={() => setDrawer(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-30 bg-black/40 md:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="fixed inset-y-0 left-0 z-30 w-[19rem] max-w-[85vw] bg-bg shadow-pop md:hidden"
            >
              {sidebar}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <section className="flex min-h-0 flex-col bg-panel">
        <header className="box-content flex h-16 shrink-0 items-center gap-2 border-b border-rule px-3 pt-[env(safe-area-inset-top)] sm:px-6">
          <button
            type="button"
            onClick={() => setDrawer(true)}
            aria-label="Open menu"
            className="inline-flex size-11 items-center justify-center rounded-[var(--radius-ctl)] text-dim hover:bg-raised md:hidden"
          >
            <List size={22} />
          </button>
          <h1 className="truncate font-display text-lg font-bold tracking-tight text-ink">{activeTitle}</h1>
        </header>

        <div
          ref={scrollRef}
          onScroll={(e) => {
            const el = e.currentTarget;
            // Our own scrolling only ever moves down, so any upward move is the reader.
            if (el.scrollTop < lastTopRef.current - 1) stickRef.current = false;
            else if (el.scrollHeight - el.scrollTop - el.clientHeight < 24) stickRef.current = true;
            lastTopRef.current = el.scrollTop;
          }}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain scroll-auto">
          <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6">
            {historyLoading && messages.length === 0 && (
              <div className="space-y-3" aria-label="Loading conversation">
                <div className="ml-auto h-12 w-2/3 animate-pulse rounded-[var(--radius-panel)] bg-raised" />
                <div className="h-28 w-full animate-pulse rounded-[var(--radius-panel)] bg-raised" />
              </div>
            )}

            {empty && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="pt-6 sm:pt-16"
              >
                <h2 className="max-w-[16ch] text-4xl font-extrabold leading-[1.02] tracking-tight text-ink sm:text-5xl">
                  What weighs on you today?
                </h2>
                <p className="mt-4 max-w-[46ch] text-base text-dim">
                  Write it plainly. Krishna answers the way he answered Arjuna.
                </p>
              </motion.div>
            )}

            <ol className="space-y-8">
              {messages.map((m) => (
                <motion.li
                  key={m.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className={m.role === "user" ? "flex justify-end" : "flex gap-3"}
                >
                  {m.role === "user" ? (
                    <p className="max-w-[85%] whitespace-pre-wrap rounded-[var(--radius-panel)] rounded-br-md bg-accent-soft px-4 py-3 text-base leading-relaxed text-ink">
                      {m.text}
                    </p>
                  ) : (
                    <>
                      <span className="mt-0.5"><LogoMark size={36} /></span>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-ink">Krishna</p>
                        <p className="mt-1 max-w-[65ch] whitespace-pre-wrap text-[1.0625rem] leading-[1.75] text-ink">
                          {typing?.id === m.id ? typingText : m.text}
                          {typing?.id === m.id && <span className="caret" aria-hidden />}
                        </p>
                      </div>
                    </>
                  )}
                </motion.li>
              ))}
              {loading && (
                <li className="flex gap-3" aria-label="Krishna is writing">
                  <LogoMark size={36} />
                  <span className="flex items-center gap-1.5 pt-3">
                    {[0, 0.2, 0.4].map((d) => (
                      <span key={d} className="typing-dot size-1.5 rounded-full bg-faint" style={{ animationDelay: `${d}s` }} />
                    ))}
                  </span>
                </li>
              )}
            </ol>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="shrink-0 px-3 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2 sm:px-6"
        >
          <div className="mx-auto flex max-w-2xl items-end gap-2 rounded-[var(--radius-panel)] border border-rule-strong bg-bg p-2 transition-shadow focus-within:border-accent focus-within:shadow-[0_0_0_3px_color-mix(in_oklch,var(--accent)_22%,transparent)]">
            <label htmlFor="question" className="sr-only">
              Your question for Krishna
            </label>
            <textarea
              id="question"
              ref={textareaRef}
              value={input}
              rows={1}
              maxLength={2000}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Ask Krishna"
              className="max-h-40 min-h-11 flex-1 resize-none bg-transparent px-3 py-2.5 text-base text-ink outline-none placeholder:text-faint"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send"
              className="inline-flex size-11 shrink-0 items-center justify-center rounded-[var(--radius-ctl)] bg-accent text-accent-ink transition-all hover:bg-accent-hover active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? <SpinnerGap size={20} className="animate-spin" /> : <ArrowUp size={20} weight="bold" />}
            </button>
          </div>
          <p className="mx-auto mt-2 max-w-2xl text-center text-xs text-faint">
            AI-generated reflections, not religious or professional advice.
          </p>
        </form>
      </section>
    </div>
  );
}
