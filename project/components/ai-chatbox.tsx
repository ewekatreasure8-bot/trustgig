"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestions = [
  "How does escrow work?",
  "How do I hire someone?",
  "How do I become a service provider?",
  "Is TrustGig safe?",
];

const knowledgeBase: { keywords: string[]; answer: string }[] = [
  {
    keywords: ["escrow", "payment", "fund", "pay", "money", "release", "hold"],
    answer: "Escrow works like a safe middleman. When you hire a pro, you fund the job through TrustGig. We hold your payment securely in escrow until you confirm the work is done. The provider gets paid only when you're satisfied. This protects both sides — the pro knows the money is there, and you know the pro is motivated to deliver.",
  },
  {
    keywords: ["hire", "find", "search", "browse", "looking", "book"],
    answer: "Hiring on TrustGig is simple:\n\n1. Browse professionals on the Search page — filter by category, location (local or online), price, and ratings.\n2. Compare profiles, reviews, and skills side by side.\n3. When you find the right pro, click their profile to see details.\n4. Fund the job through escrow to get started.\n5. Track progress and confirm completion to release payment.",
  },
  {
    keywords: ["provider", "offer", "sell", "service", "become", "join", "freelance", "gig"],
    answer: "To become a service provider:\n\n1. Create an account and select 'Offer my services' or 'Both'.\n2. Set up your professional profile — add your title, category, skills, hourly rate, and a bio.\n3. Your profile goes live so clients can find you.\n4. When a client hires you, the payment is held in escrow for your protection.\n5. Complete the work, get confirmed, and the funds are released to your wallet.",
  },
  {
    keywords: ["safe", "security", "trust", "verify", "verification", "scam", "legit", "protected"],
    answer: "TrustGig is built on trust and safety:\n\n• Verified Profiles: We check identity and credentials for verified badges.\n• Escrow Protection: Your money is never at risk — it's held safely until work is confirmed.\n• Live Location Tracking: For local jobs, share your location in real time for added security.\n• Reviews & Ratings: Every pro has a public track record.\n• Secure Payments: All transactions are encrypted and protected.",
  },
  {
    keywords: ["location", "track", "live", "map", "gps", "where"],
    answer: "Live Location sharing is available for active local jobs. Go to the Live Location page from your dashboard or profile menu, toggle sharing on, and your position will be visible to the other party on the job. Location sharing stops automatically when the job is marked complete — it's only shared during the active job.",
  },
  {
    keywords: ["wallet", "balance", "deposit", "withdraw", "transaction", "bank"],
    answer: "Your Wallet has two balances:\n\n• Available Balance: Money you can withdraw to your bank or use to fund new jobs.\n• Escrow Balance: Funds locked for active jobs. These cannot be withdrawn until both parties confirm the job is done.\n\nYou can deposit from your bank, withdraw your available balance, and view your full transaction history from the Wallet page.",
  },
  {
    keywords: ["category", "custom", "create category", "can't find"],
    answer: "Can't find the right category? On the Search page, click 'Can't find your category? Create one' and enter a custom category name. Your custom category will be added to the filter list so you can browse and filter by it.",
  },
  {
    keywords: ["dashboard", "account", "profile", "manage"],
    answer: "Your Dashboard is your home base after logging in. It shows your active jobs, completed work, ratings, and quick links to browse pros, manage your wallet, track live location, and edit your profile. You can access it anytime from the menu in the top right.",
  },
  {
    keywords: ["hello", "hi", "hey", "help", "start", "what", "how"],
    answer: "Hi! I'm your TrustGig AI assistant. I can help with:\n\n• How escrow works\n• How to hire a professional\n• How to become a service provider\n• Safety and verification\n• Wallet and payments\n• Live location tracking\n\nAsk me anything, or tap one of the suggestions below!",
  },
];

function findAnswer(query: string): string {
  const q = query.toLowerCase();
  let bestMatch: { keywords: string[]; answer: string } | null = null;
  let bestScore = 0;

  for (const entry of knowledgeBase) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (q.includes(kw)) score += kw.length;
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  if (bestMatch && bestScore > 0) return bestMatch.answer;

  return "I'm not sure about that yet, but I can help with escrow, hiring, becoming a provider, safety, wallet, live location, and general TrustGig guidance. Try asking about one of those topics, or tap a suggestion below!";
}

export function AIChatbox() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        { role: "assistant", content: "Hi! I'm your TrustGig AI assistant. How can I help you today?" },
      ]);
    }
  }, [open, messages.length]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const handleSend = (text?: string) => {
    const content = (text ?? input).trim();
    if (!content) return;

    setMessages((prev) => [...prev, { role: "user", content }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const answer = findAnswer(content);
      setMessages((prev) => [...prev, { role: "assistant", content: answer }]);
      setTyping(false);
    }, 600 + Math.random() * 400);
  };

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl animate-fade-in"
          aria-label="Open AI assistant"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
            AI
          </span>
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[500px] max-h-[calc(100vh-3rem)] w-[calc(100vw-3rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-2xl animate-scale-in">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/60 bg-primary px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground/15">
                <Bot className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold text-primary-foreground">TrustGig Assistant</p>
                <p className="flex items-center gap-1 text-xs text-primary-foreground/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />
                  Online
                </p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="rounded-lg p-1.5 text-primary-foreground/70 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((msg, i) => (
              <div key={i} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
                <div className={cn(
                  "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm",
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground"
                )}>
                  <p className="whitespace-pre-line leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1.5 rounded-2xl bg-secondary px-4 py-3">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "0ms" }} />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "150ms" }} />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
          </div>

          {/* Suggestions */}
          {messages.length <= 1 && (
            <div className="flex flex-wrap gap-2 border-t border-border/40 px-3 py-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSend(s)}
                  className="flex items-center gap-1.5 rounded-full border border-border/60 bg-secondary/50 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
                >
                  <Sparkles className="h-3 w-3 text-primary" />
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-border/60 p-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
              placeholder="Ask me anything..."
              className="flex-1 rounded-lg border border-border/60 bg-background px-3 py-2 text-sm outline-none focus:border-primary/40"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
