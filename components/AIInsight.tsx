"use client";

import { useState } from "react";
import { askOpenAI, askXAI } from "@/services/ai";
import { Sparkles, Loader2 } from "lucide-react";

interface AIInsightProps {
  prompt: string;
}

export function AIInsight({ prompt }: AIInsightProps) {
  const [text, setText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (provider: "openai" | "xai") => {
    setLoading(true);
    setError(null);
    try {
      const result =
        provider === "openai" ? await askOpenAI(prompt) : await askXAI(prompt);
      setText(result);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erro ao gerar análise");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="panel p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
          <Sparkles className="w-3 h-3" />
          Análise com IA
        </h4>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleGenerate("openai")}
            disabled={loading}
            className="retro-btn text-[10px] py-1 px-2"
          >
            {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : "OpenAI"}
          </button>
          <button
            onClick={() => handleGenerate("xai")}
            disabled={loading}
            className="retro-btn text-[10px] py-1 px-2"
          >
            {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : "xAI"}
          </button>
        </div>
      </div>

      {error && (
        <p className="text-[10px] uppercase tracking-wider text-red-800 bg-red-100/20 p-2 border border-red-800/20">
          {error}
        </p>
      )}

      {text && (
        <div className="text-xs leading-relaxed opacity-90 whitespace-pre-wrap">
          {text}
        </div>
      )}

      {!text && !error && (
        <p className="text-[10px] uppercase tracking-wider opacity-50">
          Clique em um dos botões acima para gerar uma análise com inteligência artificial.
        </p>
      )}
    </div>
  );
}
