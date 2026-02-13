"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AIChatPanel({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState<{ user: string; ai: string }[]>([]);

  const handleSend = () => {
    if (!query.trim()) return;
    // Dodajemy wpis do historii
    setHistory([
      ...history,
      { user: query, ai: "Przykładowa odpowiedź AI..." },
    ]);
    setQuery("");
  };

  return (
    <>
      {/* Chat Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl border-l transition-transform z-50 flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gray-50">
          <h2 className="text-lg font-semibold">Asystent AI</h2>
          <Button size="icon" variant="ghost" onClick={() => setOpen(false)}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Chat history */}
        <div className="flex-1 p-4 overflow-y-auto space-y-2">
          {history.length === 0 && (
            <p className="text-sm text-gray-400">
              Brak wiadomości. Zacznij rozmowę!
            </p>
          )}
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="bg-blue-100 text-blue-800 p-2 rounded-md text-sm">
                {item.user}
              </div>
              <div className="bg-gray-200 text-gray-800 p-2 rounded-md text-sm">
                {item.ai}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t flex gap-2">
          <Input
            placeholder="Zadaj pytanie..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button onClick={handleSend}>Wyślij</Button>
        </div>
      </div>
    </>
  );
}
