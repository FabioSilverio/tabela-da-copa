"use client";

import { useState, useRef, useEffect } from "react";
import { askOpenAI, askXAI } from "@/services/ai";
import { Loader2, Send, Bot, User, Trash2, Cpu } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  provider?: "openai" | "xai";
  timestamp: Date;
}

export function ChatCopa() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Olá! Sou seu assistente sobre a Copa do Mundo 2026. Pergunte sobre seleções, jogos, estatísticas, histórico, ou peça análises táticas. Posso consultar dados em tempo real do site.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState<"openai" | "xai">("openai");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: "user", content: input.trim(), timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // Verifica se é uma consulta de dados internos
      const query = userMsg.content.toLowerCase();
      let contextData = "";

      // Busca dados internos se a pergunta envolver dados do site
      if (
        query.includes("jogo") ||
        query.includes("partida") ||
        query.includes("confronto") ||
        query.includes("tabela") ||
        query.includes("classificação") ||
        query.includes("grupo") ||
        query.includes("seleção") ||
        query.includes("time") ||
        query.includes("copa")
      ) {
        try {
          const [matchesRes, standingsRes, teamsRes] = await Promise.all([
            fetch("/api/matches"),
            fetch("/api/standings"),
            fetch("/api/teams"),
          ]);
          const matches = await matchesRes.json();
          const standings = await standingsRes.json();
          const teams = await teamsRes.json();

          contextData = `DADOS ATUAIS DO SITE:\n`;
          contextData += `- ${teams.teams?.length ?? 0} seleções participantes\n`;
          contextData += `- ${matches.matches?.length ?? 0} jogos programados\n`;

          if (standings.standings) {
            standings.standings.forEach((g: { letter: string; teams: { team: { name: string }; points: number }[] }) => {
              contextData += `Grupo ${g.letter}: ${g.teams.map((t: { team: { name: string }; points: number }) => `${t.team.name}(${t.points}pts)`).join(", ")}\n`;
            });
          }
        } catch {
          // ignore
        }
      }

      const systemPrompt = `Você é um especialista em Copa do Mundo 2026. Use os dados fornecidos do site quando relevante. Responda sempre em português do Brasil, de forma objetiva e técnica sobre futebol.\n\n${contextData}`;

      const enhancedPrompt = contextData
        ? `${systemPrompt}\n\nPERGUNTA DO USUÁRIO: ${userMsg.content}`
        : userMsg.content;

      const answer =
        provider === "openai"
          ? await askOpenAI(enhancedPrompt, "gpt-4o-mini")
          : await askXAI(enhancedPrompt);

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: answer, provider, timestamp: new Date() },
      ]);
    } catch (e: unknown) {
      const errorMsg = e instanceof Error ? e.message : "Erro ao consultar IA";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `⚠️ ${errorMsg}\n\nDica: Vá em Configurações (⚙️) e insira sua chave de API ${provider === "openai" ? "OpenAI" : "xAI"}.`,
          provider,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "Chat limpo. Pergunte sobre a Copa 2026!",
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div className="panel p-0 flex flex-col h-[600px]">
      {/* Header */}
      <div className="px-4 py-2 border-b border-foreground retro-border bg-black/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-widest">Chat Copa 2026</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setProvider("openai")}
            className={`text-[10px] uppercase tracking-wider px-2 py-1 border border-foreground ${provider === "openai" ? "bg-foreground text-background" : ""}`}
          >
            OpenAI
          </button>
          <button
            onClick={() => setProvider("xai")}
            className={`text-[10px] uppercase tracking-wider px-2 py-1 border border-foreground ${provider === "xai" ? "bg-foreground text-background" : ""}`}
          >
            xAI
          </button>
          <button onClick={clearChat} className="retro-btn p-1" title="Limpar chat">
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <div
              className={`w-6 h-6 flex items-center justify-center shrink-0 border border-foreground ${
                msg.role === "user" ? "bg-foreground text-background" : "bg-panel-dark text-text-inverse"
              }`}
            >
              {msg.role === "user" ? <User className="w-3 h-3" /> : <Cpu className="w-3 h-3" />}
            </div>
            <div
              className={`max-w-[80%] px-3 py-2 text-xs leading-relaxed ${
                msg.role === "user"
                  ? "bg-black/5 border border-foreground/20"
                  : "panel-dark"
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.content}</div>
              {msg.provider && (
                <div className="text-[9px] opacity-50 mt-1 uppercase tracking-wider">
                  via {msg.provider}
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-2">
            <div className="w-6 h-6 flex items-center justify-center shrink-0 border border-foreground bg-panel-dark text-text-inverse">
              <Cpu className="w-3 h-3" />
            </div>
            <div className="panel-dark px-3 py-2 text-xs flex items-center gap-2">
              <Loader2 className="w-3 h-3 animate-spin" />
              Consultando {provider === "openai" ? "OpenAI" : "xAI"}...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-foreground retro-border p-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Pergunte sobre a Copa 2026..."
            className="retro-input flex-1 text-xs"
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="retro-btn retro-btn-primary px-3"
          >
            <Send className="w-3 h-3" />
          </button>
        </div>
        <p className="text-[9px] uppercase tracking-wider opacity-40 mt-2">
          Pressione Enter para enviar. As respostas podem consultar dados do site automaticamente.
        </p>
      </div>
    </div>
  );
}
