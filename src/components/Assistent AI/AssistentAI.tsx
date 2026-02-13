"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Bot, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAskChat } from "@/hooks/useAskChat";

type ChatMessage = {
  user: string;
  ai: string;
  loading?: boolean;
};

export default function AIChatPanel({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {

  const [query, setQuery] = useState("");
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [sparkleGlow, setSparkleGlow] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, setOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [history]);

  useEffect(() => {
    if (!open) {
      setSparkleGlow(false);
      return;
    }

    setSparkleGlow(true);
    const timer = window.setTimeout(() => setSparkleGlow(false), 1800);

    return () => window.clearTimeout(timer);
  }, [open]);

  const { mutateAsync: askChat, isPending } = useAskChat();

  const handleSend = async () => {
    if (!query.trim() || isPending) return;

    const userQuery = query.trim();

    setHistory((previous) => [...previous, { user: userQuery, ai: "", loading: true }]);
    setQuery("");

    try {
      const aiResponse = await askChat(userQuery);
      setHistory((prevHistory) =>
        prevHistory.map((item, idx) =>
          idx === prevHistory.length - 1 && item.loading
            ? { ...item, ai: aiResponse, loading: false }
            : item
        )
      );
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setHistory((prevHistory) =>
        prevHistory.map((item, idx) =>
          idx === prevHistory.length - 1 && item.loading
            ? { ...item, ai: "Wystąpił błąd połączenia z AI.", loading: false }
            : item
        )
      );
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 22, scale: 0.975 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 14, scale: 0.975 }}
          transition={{ type: "spring", stiffness: 220, damping: 24, mass: 0.7 }}
          className="fixed bottom-4 right-4 z-50 w-[min(92vw,420px)] h-[min(72vh,560px)] rounded-2xl border bg-background shadow-2xl flex flex-col overflow-hidden"
        >
          <div className="flex items-center justify-between p-4 border-b bg-muted/40">
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8 rounded-lg bg-amber-400/15 text-amber-500 flex items-center justify-center">
                <AnimatePresence>
                  {sparkleGlow && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.88 }}
                      animate={{ opacity: [0, 1, 0], scale: [0.92, 1.03, 1] }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-[-3px] rounded-xl border border-amber-300/95 shadow-[0_0_16px_rgba(250,204,21,0.9)]"
                    />
                  )}
                </AnimatePresence>
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-base font-semibold leading-tight">Asystent AI</h2>
                <p className="text-xs text-muted-foreground">Wsparcie operatora na zmianie</p>
              </div>
            </div>
            <Button size="icon" variant="ghost" onClick={() => setOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-3 bg-background">
            {history.length === 0 && (
              <div className="rounded-xl border bg-muted/40 p-4 text-sm text-muted-foreground flex items-center gap-2">
                <Bot className="h-4 w-4" />
                Brak wiadomości. Zacznij rozmowę z asystentem.
              </div>
            )}
            {history.map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="ml-auto max-w-[85%] bg-primary/5 text-primary p-2.5 rounded-xl text-sm font-medium">
                  {item.user}
                </div>
                {item.loading ? (
                  <div className="mr-auto max-w-[85%] bg-muted/80 p-2.5 rounded-xl text-sm min-h-[41px] flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/70 animate-bounce [animation-delay:-0.2s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/70 animate-bounce [animation-delay:-0.1s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/70 animate-bounce" />
                  </div>
                ) : (
                  <div className="mr-auto max-w-[85%] bg-muted/80 p-2.5 rounded-xl text-sm text-foreground">
                    {item.ai}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-4 border-t bg-muted/30 flex gap-2">
            <Input
              placeholder="Zadaj pytanie..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && void handleSend()}
              disabled={isPending}
            />
            <Button
              onClick={() => void handleSend()}
              disabled={!query.trim() || isPending}
              size="icon"
              aria-label="Wyślij wiadomość"
              className="group rounded-md bg-primary/50 cursor-pointer shadow-sm transition-all duration-200  disabled:opacity-50 disabled:hover:translate-y-0"
            >
              <ArrowUp className="h-4 w-4 transition-transform text-black duration-200 " />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
