"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Script from "next/script";
import jsonLd from "@/lib/json-ld";
import { useAuth } from "@/contexts/AuthContext";
import type { Chat } from "@/lib/db";

function GoogleIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" className="flex-shrink-0">
      <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" />
      <path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z" />
      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" />
    </svg>
  );
}

function Lamp({ active, size = 56 }: { active?: boolean; size?: number }) {
  return (
    <div className="relative flex flex-col items-center" style={{ width: size, height: size * 1.5 }}>
      <div
        className={`lamp-glow ${active ? "lamp-glow-active" : ""} absolute top-0 left-1/2 -translate-x-1/2 rounded-full blur-xl`}
        style={{ width: size * 1.6, height: size * 1.6, background: "var(--glow)" }}
      />
      <svg
        width={size * 0.4}
        height={size * 0.7}
        viewBox="0 0 40 70"
        className={`flame ${active ? "flame-active" : ""} relative`}
        fill="none"
      >
        <path
          d="M20 2C20 2 6 22 6 38C6 51.8 12.3 62 20 62C27.7 62 34 51.8 34 38C34 22 20 2 20 2Z"
          fill="url(#flameGrad)"
        />
        <path
          d="M20 24C20 24 14 34 14 42C14 49 16.7 54 20 54C23.3 54 26 49 26 42C26 34 20 24 20 24Z"
          fill="#fff3d6"
          opacity="0.85"
        />
        <defs>
          <linearGradient id="flameGrad" x1="20" y1="2" x2="20" y2="62" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--flame-bright)" />
            <stop offset="1" stopColor="var(--flame-dim)" />
          </linearGradient>
        </defs>
      </svg>
      <svg width={size} height={size * 0.4} viewBox="0 0 80 32" className="relative -mt-1" fill="none">
        <ellipse cx="40" cy="6" rx="14" ry="4" fill="var(--flame-dim)" opacity="0.5" />
        <path d="M18 8C18 8 10 14 10 20C10 26.6 23.4 32 40 32C56.6 32 70 26.6 70 20C70 14 62 8 62 8" stroke="var(--rule-bright)" strokeWidth="1.5" />
        <ellipse cx="40" cy="8" rx="22" ry="5" stroke="var(--rule-bright)" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

function Embers() {
  const [embers, setEmbers] = useState<
    { id: number; left: string; delay: string; duration: string; size: string; drift: string }[]
  >([]);

  useEffect(() => {
    const generated = Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      left: `${46 + Math.random() * 8}%`,
      delay: `${Math.random() * 6}s`,
      duration: `${4 + Math.random() * 4}s`,
      size: `${2 + Math.random() * 2}px`,
      drift: `${(Math.random() - 0.5) * 60}px`,
    }));
    setEmbers(generated);
  }, []);

  return (
    <div className="absolute left-0 right-0 top-16 h-40 pointer-events-none z-0">
      {embers.map((e) => (
        <div
          key={e.id}
          className="ember"
          style={{
            left: e.left,
            bottom: 0,
            width: e.size,
            height: e.size,
            animationDelay: e.delay,
            animationDuration: e.duration,
            ["--drift" as string]: e.drift,
          }}
        />
      ))}
    </div>
  );
}

const GLOSSES = [
  { label: "on duty", prompt: "What is my duty when I don't know what's right?" },
  { label: "on fear", prompt: "How do I act when I'm afraid of the outcome?" },
  { label: "on loss", prompt: "How do I carry grief without being ruled by it?" },
  { label: "on purpose", prompt: "How do I find meaning in ordinary, unnoticed work?" },
  { label: "on anger", prompt: "How do I respond when anger clouds my judgment?" },
];

type Message = { id: string; role: "user" | "krishna"; text: string };

export default function Home() {
  const { user, loading: authLoading, signIn, signOutUser } = useAuth();
  const [chats, setChats] = useState<Chat[]>([]);
  const [chatsLoading, setChatsLoading] = useState(false);
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [renamingId, setRenamingId] = useState<number | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [historyLoading, setHistoryLoading] = useState(false);
  const [typingId, setTypingId] = useState<string | null>(null);
  const [typingText, setTypingText] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const loadChats = useCallback(async () => {
    if (!user) return;
    setChatsLoading(true);
    try {
      const token = await user.getIdToken();
      const response = await fetch("/api/chats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setChats(data.chats);
        setActiveChatId((prev) => prev ?? data.chats[0]?.id ?? null);
      }
    } finally {
      setChatsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      loadChats();
    } else {
      setChats([]);
      setActiveChatId(null);
      setMessages([]);
    }
  }, [user, loadChats]);

  useEffect(() => {
    if (!user || activeChatId === null) {
      setMessages([]);
      return;
    }
    let cancelled = false;
    setHistoryLoading(true);
    (async () => {
      const token = await user.getIdToken();
      const response = await fetch(`/api/conversations?chatId=${activeChatId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!cancelled && response.ok) {
        setMessages(
          data.conversations.flatMap((c: { id: number; question: string; answer: string }) => [
            { id: `${c.id}-q`, role: "user" as const, text: c.question },
            { id: `${c.id}-a`, role: "krishna" as const, text: c.answer },
          ])
        );
      }
      if (!cancelled) setHistoryLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [user, activeChatId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, typingText]);

  const animateMessage = (id: string, fullText: string) => {
    setTypingId(id);
    setTypingText("");
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTypingText(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(interval);
        setTypingId(null);
      }
    }, 12);
  };

  const sendMessage = async () => {
    const q = input.trim();
    if (!q) {
      setError("Please enter your question");
      return;
    }
    if (!user) {
      setError("Sign in to ask Krishna");
      return;
    }
    setError("");
    setLoading(true);
    setMessages((prev) => [...prev, { id: `u-${Date.now()}`, role: "user", text: q }]);
    setInput("");
    try {
      const response = await fetch("/api/ask-krishna", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await user.getIdToken()}`,
        },
        body: JSON.stringify({ question: q, chatId: activeChatId }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to get response");
      const krishnaId = `k-${Date.now()}`;
      setMessages((prev) => [...prev, { id: krishnaId, role: "krishna", text: data.answer }]);
      animateMessage(krishnaId, data.answer);

      if (data.chatId) {
        setChats((prev) => {
          const existing = prev.find((c) => c.id === data.chatId);
          const rest = prev.filter((c) => c.id !== data.chatId);
          const chat: Chat = existing
            ? { ...existing, updated_at: new Date().toISOString() }
            : { id: data.chatId, title: data.chatTitle || "New chat", updated_at: new Date().toISOString() };
          return [chat, ...rest];
        });
        if (activeChatId === null) setActiveChatId(data.chatId);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  const handleGloss = (prompt: string) => {
    setInput(prompt);
    textareaRef.current?.focus();
  };

  const handleNewChat = async () => {
    if (!user) return;
    setError("");
    try {
      const response = await fetch("/api/chats", {
        method: "POST",
        headers: { Authorization: `Bearer ${await user.getIdToken()}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to create chat");
      setChats((prev) => [data.chat, ...prev]);
      setActiveChatId(data.chat.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  const startRename = (chat: Chat) => {
    setRenamingId(chat.id);
    setRenameValue(chat.title);
  };

  const commitRename = async (chatId: number) => {
    const title = renameValue.trim();
    setRenamingId(null);
    if (!user || !title) return;
    const previous = chats;
    setChats((cs) => cs.map((c) => (c.id === chatId ? { ...c, title } : c)));
    try {
      const response = await fetch(`/api/chats/${chatId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await user.getIdToken()}`,
        },
        body: JSON.stringify({ title }),
      });
      if (!response.ok) throw new Error("Failed to rename chat");
    } catch {
      setChats(previous);
    }
  };

  const handleDeleteChat = async (chatId: number) => {
    if (!user) return;
    if (!window.confirm("Delete this chat? This cannot be undone.")) return;
    const previous = chats;
    const remaining = previous.filter((c) => c.id !== chatId);
    setChats(remaining);
    if (activeChatId === chatId) setActiveChatId(remaining[0]?.id ?? null);
    try {
      const response = await fetch(`/api/chats/${chatId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${await user.getIdToken()}` },
      });
      if (!response.ok) throw new Error("Failed to delete chat");
    } catch {
      setChats(previous);
      if (activeChatId === chatId) setActiveChatId(chatId);
    }
  };

  return (
    <>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />

      <div className="noise-overlay min-h-screen flex flex-col relative" style={{ background: "var(--bg)" }}>
        <main className="relative z-10 max-w-5xl mx-auto py-10 sm:py-16 md:py-20 px-4 sm:px-6 flex-grow w-full">
          {/* ── Auth bar ─────────────────────────── */}
          <div className="flex justify-end mb-2">
            {!authLoading && (user ? (
              <div className="flex items-center gap-3 font-sans text-xs sm:text-sm" style={{ color: "var(--ink-faint)" }}>
                <span>{user.displayName || user.email}</span>
                <button type="button" onClick={() => signOutUser()} className="underline hover:no-underline" style={{ color: "var(--flame)" }}>
                  Sign out
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => signIn()}
                className="inline-flex items-center gap-1.5 font-sans text-xs sm:text-sm underline hover:no-underline"
                style={{ color: "var(--flame)" }}
              >
                <GoogleIcon size={14} />
                Sign in with Google
              </button>
            ))}
          </div>

          {/* ── Header ───────────────────────────── */}
          <header className="relative text-center mb-12 sm:mb-16 animate-fade-in-up">
            <Embers />
            <div className="flex justify-center mb-2 relative z-10">
              <Lamp active={loading} />
            </div>

            <h1 className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-tighter leading-[0.9] mb-4 text-flame-gradient relative z-10">
              Gita Flow
            </h1>

            <p
              className="font-mono text-[11px] sm:text-xs tracking-[0.3em] uppercase mb-5 relative z-10"
              style={{ color: "var(--ink-faint)" }}
            >
              Kurukshetra · before the first arrow
            </p>

            <p
              className="font-sans text-base sm:text-lg md:text-xl max-w-xl mx-auto leading-relaxed font-light relative z-10"
              style={{ color: "var(--ink-dim)" }}
            >
              Arjuna faltered on the battlefield and asked. Krishna answered.
              Bring what troubles you, and receive the same counsel.
            </p>
          </header>

          {/* ── Body: question column + marginalia ─ */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-8 lg:gap-12">
            <div className="min-w-0">
              {/* ── Sign-in gate ─────────────────── */}
              {!user && (
                <div
                  className="rounded-2xl p-5 sm:p-7 md:p-8 mb-8 text-center animate-fade-in-up"
                  style={{
                    background: "var(--bg-panel)",
                    border: "1.5px solid var(--flame-dim)",
                    boxShadow: "0 4px 40px var(--glow), 0 20px 60px rgba(0,0,0,0.4)",
                  }}
                >
                  <h2 className="text-xl sm:text-2xl font-semibold text-flame-gradient mb-2">
                    Sign in to ask Krishna
                  </h2>
                  <p className="font-sans text-sm sm:text-base mb-5" style={{ color: "var(--ink-dim)" }}>
                    Every question and answer is saved to your account so you can return to it.
                  </p>
                  <button
                    type="button"
                    onClick={() => signIn()}
                    className="inline-flex items-center gap-2.5 px-8 py-3 font-sans text-base font-medium rounded-xl transition-all duration-300"
                    style={{
                      background: "var(--leaf-bg)",
                      color: "var(--leaf-ink)",
                      boxShadow: "0 4px 20px var(--glow)",
                    }}
                  >
                    <GoogleIcon size={18} />
                    Sign in with Google
                  </button>
                </div>
              )}

              {/* ── Chat ─────────────────────────── */}
              {user && (
                <div
                  className="rounded-2xl mb-8 flex flex-col overflow-hidden animate-fade-in-up"
                  style={{
                    animationDelay: "0.15s",
                    background: "var(--bg-panel)",
                    border: "1px solid var(--rule)",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
                  }}
                >
                  <div
                    className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4"
                    style={{ minHeight: 360, maxHeight: "min(62vh, 620px)" }}
                  >
                    {historyLoading && messages.length === 0 && (
                      <p className="font-sans text-sm text-center py-8" style={{ color: "var(--ink-faint)" }}>
                        Loading your conversation&hellip;
                      </p>
                    )}
                    {!historyLoading && messages.length === 0 && (
                      <div className="text-center py-10">
                        <p className="text-lg font-semibold mb-1" style={{ color: "var(--ink)" }}>
                          What troubles you, dear seeker?
                        </p>
                        <p className="font-sans text-sm" style={{ color: "var(--ink-faint)" }}>
                          Share your problem, dilemma, or question — Krishna is listening.
                        </p>
                      </div>
                    )}

                    {messages.map((m) => (
                      <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                        {m.role === "user" ? (
                          <div
                            className="max-w-[85%] sm:max-w-[75%] rounded-2xl rounded-br-sm px-4 py-3"
                            style={{ background: "var(--bg-panel-raised)", color: "var(--ink)", border: "1px solid var(--rule)" }}
                          >
                            <p className="font-sans text-sm sm:text-base leading-relaxed whitespace-pre-wrap">{m.text}</p>
                          </div>
                        ) : (
                          <div className="leaf-bubble max-w-[90%] sm:max-w-[80%] rounded-2xl rounded-bl-sm px-4 py-3 sm:px-5 sm:py-4">
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className="text-xs font-bold tracking-wide" style={{ color: "var(--verse)" }}>
                                Krishna
                              </span>
                              <span className="font-mono text-[9px] tracking-[0.15em] uppercase" style={{ color: "var(--leaf-ink-dim)" }}>
                                Bhagavad Gita
                              </span>
                            </div>
                            <p className="font-sans text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                              {m.id === typingId ? typingText : m.text}
                              {m.id === typingId && (
                                <span
                                  className="inline-block w-0.5 h-4 ml-0.5 align-text-bottom"
                                  style={{ background: "var(--verse)", animation: "typewriter-blink 0.8s ease-in-out infinite" }}
                                />
                              )}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}

                    {loading && (
                      <div className="flex justify-start">
                        <div className="leaf-bubble rounded-2xl rounded-bl-sm px-4 py-3.5 flex items-center gap-1.5">
                          <span className="typing-dot w-1.5 h-1.5 rounded-full" style={{ background: "var(--leaf-ink-dim)", animationDelay: "0s" }} />
                          <span className="typing-dot w-1.5 h-1.5 rounded-full" style={{ background: "var(--leaf-ink-dim)", animationDelay: "0.2s" }} />
                          <span className="typing-dot w-1.5 h-1.5 rounded-full" style={{ background: "var(--leaf-ink-dim)", animationDelay: "0.4s" }} />
                        </div>
                      </div>
                    )}
                    <div ref={bottomRef} />
                  </div>

                  <form onSubmit={handleSubmit} className="flex items-end gap-3 p-3 sm:p-4" style={{ borderTop: "1px solid var(--rule)" }}>
                    <textarea
                      ref={textareaRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
                      placeholder="Message Krishna&hellip;"
                      className="flex-1 min-h-[44px] max-h-32 px-4 py-2.5 text-sm sm:text-base rounded-xl resize-none overflow-y-auto font-sans transition-all duration-300 focus:outline-none"
                      style={{
                        background: "var(--bg-panel-raised)",
                        color: "var(--ink)",
                        border: "1.5px solid var(--rule)",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "var(--flame)";
                        e.currentTarget.style.boxShadow = "0 0 0 3px var(--glow-soft)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "var(--rule)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                      disabled={loading}
                      rows={1}
                    />
                    <button
                      type="submit"
                      disabled={loading || !input.trim()}
                      aria-label="Send"
                      className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        background: loading ? "var(--flame-dim)" : "linear-gradient(135deg, var(--flame-dim), var(--flame))",
                        color: "#1a0f04",
                        boxShadow: "0 4px 20px var(--glow)",
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    </button>
                  </form>
                </div>
              )}

              {/* ── Error ────────────────────────── */}
              {error && (
                <div
                  className="rounded-xl p-4 mb-8 flex items-start gap-3 animate-fade-in-up"
                  style={{
                    background: "color-mix(in srgb, var(--danger) 10%, var(--bg-panel))",
                    border: "1px solid color-mix(in srgb, var(--danger) 35%, transparent)",
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--danger)" strokeWidth="2" strokeLinecap="round" className="flex-shrink-0 mt-0.5">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <p className="text-sm sm:text-base font-sans" style={{ color: "var(--danger)" }}>
                    {error}
                  </p>
                </div>
              )}
            </div>

            {/* ── Marginalia ───────────────────────── */}
            <aside className="lg:pl-6 lg:border-l relative animate-fade-in" style={{ animationDelay: "0.3s", borderColor: "var(--rule)" }}>
              {user && (
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <p className="font-mono text-[10px] tracking-[0.25em] uppercase" style={{ color: "var(--ink-faint)" }}>
                      Chats
                    </p>
                    <button
                      type="button"
                      onClick={handleNewChat}
                      className="font-sans text-xs font-medium"
                      style={{ color: "var(--flame)" }}
                    >
                      + New
                    </button>
                  </div>
                  {chatsLoading && chats.length === 0 && (
                    <p className="font-sans text-xs" style={{ color: "var(--ink-faint)" }}>
                      Loading&hellip;
                    </p>
                  )}
                  {!chatsLoading && chats.length === 0 && (
                    <p className="font-sans text-xs leading-snug" style={{ color: "var(--ink-faint)" }}>
                      No chats yet. Ask a question to begin.
                    </p>
                  )}
                  <ul className="space-y-1">
                    {chats.map((c) => (
                      <li key={c.id}>
                        {renamingId === c.id ? (
                          <input
                            autoFocus
                            value={renameValue}
                            onChange={(e) => setRenameValue(e.target.value)}
                            onBlur={() => commitRename(c.id)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                commitRename(c.id);
                              }
                              if (e.key === "Escape") setRenamingId(null);
                            }}
                            className="w-full text-sm px-3 py-1.5 rounded-md font-sans focus:outline-none"
                            style={{ background: "var(--bg-panel-raised)", color: "var(--ink)", border: "1px solid var(--flame)" }}
                          />
                        ) : (
                          <div className="gloss-item flex items-center gap-0.5 pl-4 pr-1 py-1.5 rounded-r-md">
                            <button
                              type="button"
                              onClick={() => setActiveChatId(c.id)}
                              className="flex-1 min-w-0 text-left"
                            >
                              <span
                                className="block text-sm truncate"
                                style={{ color: c.id === activeChatId ? "var(--flame)" : "var(--ink)" }}
                              >
                                {c.title}
                              </span>
                            </button>
                            <button
                              type="button"
                              onClick={() => startRename(c)}
                              aria-label="Rename chat"
                              className="p-1.5 flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
                              style={{ color: "var(--ink-faint)" }}
                            >
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 20h9" />
                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
                              </svg>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteChat(c.id)}
                              aria-label="Delete chat"
                              className="p-1.5 flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
                              style={{ color: "var(--danger)" }}
                            >
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                <path d="M10 11v6" />
                                <path d="M14 11v6" />
                                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                              </svg>
                            </button>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="font-mono text-[10px] tracking-[0.25em] uppercase mb-4" style={{ color: "var(--ink-faint)" }}>
                Gloss
              </p>
              <ul className="space-y-1 mb-8">
                {GLOSSES.map((g) => (
                  <li key={g.label}>
                    <button
                      type="button"
                      onClick={() => handleGloss(g.prompt)}
                      className="gloss-item w-full text-left pl-4 py-2 rounded-r-md"
                    >
                      <span className="block italic text-sm" style={{ color: "var(--ink)" }}>
                        {g.label}
                      </span>
                      <span className="block font-sans text-xs mt-0.5 leading-snug" style={{ color: "var(--ink-faint)" }}>
                        {g.prompt}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              <blockquote className="pl-4 border-l" style={{ borderColor: "var(--flame-dim)" }}>
                <p className="italic text-base leading-relaxed" style={{ color: "var(--ink-dim)" }}>
                  &ldquo;Whenever dharma declines and adharma rises, I manifest myself.&rdquo;
                </p>
                <span className="block mt-2 font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: "var(--verse)" }}>
                  Bhagavad Gita 4.7
                </span>
              </blockquote>
            </aside>
          </div>
        </main>

        {/* ── Footer ───────────────────────────── */}
        <footer className="relative z-10 max-w-5xl mx-auto w-full py-8 sm:py-10 px-4 sm:px-6" style={{ borderTop: "1px solid var(--rule)" }}>
          <div className="text-center">
            <div className="flex items-center justify-center gap-5 sm:gap-8 mb-6 flex-wrap">
              {[
                { href: "/terms", label: "Terms" },
                { href: "/privacy", label: "Privacy" },
                { href: "/disclaimer", label: "Disclaimer" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs sm:text-sm font-sans font-medium min-h-[44px] flex items-center transition-colors duration-200"
                  style={{ color: "var(--ink-faint)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--flame)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-faint)")}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <p className="font-sans text-xs sm:text-sm mb-5" style={{ color: "var(--ink-faint)" }}>
              Crafted with devotion by{" "}
              <span className="font-medium" style={{ color: "var(--flame)" }}>
                Ashutosh Swamy
              </span>
            </p>

            <div className="flex items-center justify-center gap-6">
              <a
                href="https://github.com/ashutoshswamy"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] flex items-center gap-2 transition-all duration-200 group"
                style={{ color: "var(--ink-faint)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--flame)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-faint)")}
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                <span className="hidden sm:inline text-sm font-sans font-medium">GitHub</span>
              </a>
              <a
                href="https://x.com/ashutoshswamy_"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] flex items-center gap-2 transition-all duration-200 group"
                style={{ color: "var(--ink-faint)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--flame)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-faint)")}
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span className="hidden sm:inline text-sm font-sans font-medium">X</span>
              </a>
              <a
                href="https://linkedin.com/in/ashutoshswamy"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] flex items-center gap-2 transition-all duration-200 group"
                style={{ color: "var(--ink-faint)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--flame)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-faint)")}
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span className="hidden sm:inline text-sm font-sans font-medium">LinkedIn</span>
              </a>
              <a
                href="https://ashutoshswamy.in"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] flex items-center gap-2 transition-all duration-200 group"
                style={{ color: "var(--ink-faint)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--flame)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-faint)")}
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <span className="hidden sm:inline text-sm font-sans font-medium">Portfolio</span>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
