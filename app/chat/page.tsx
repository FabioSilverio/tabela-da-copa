"use client";

import { SectionTitle } from "@/components/SectionTitle";
import { ChatCopa } from "@/components/ChatCopa";
import { Bot, AlertTriangle } from "lucide-react";

export default function ChatPage() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <SectionTitle subtitle="Converse com nosso assistente de IA sobre a Copa 2026">
        Chat Copa 2026
      </SectionTitle>

      <div className="panel p-4 flex items-start gap-3">
        <Bot className="w-4 h-4 mt-0.5 shrink-0 opacity-70" />
        <div className="text-xs leading-relaxed opacity-90 space-y-2">
          <p>
            <strong className="uppercase tracking-wider">Como usar:</strong> pergunte sobre seleções, jogos, 
            estatísticas, histórico da Copa, análises táticas ou qualquer assunto relacionado ao Mundial 2026.
          </p>
          <p>
            O assistente pode consultar dados do site em tempo real e também usar inteligência artificial 
            (OpenAI ou xAI) para respostas mais detalhadas.
          </p>
        </div>
      </div>

      <ChatCopa />

      <div className="panel p-4 flex items-start gap-3">
        <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 opacity-70" />
        <div className="text-xs leading-relaxed opacity-90">
          <p>
            <strong className="uppercase tracking-wider">Importante:</strong> configure suas chaves de API em 
            <a href="/configuracoes" className="underline mx-1">Configurações</a> 
            para usar o chat com IA. Sem chaves configuradas, o chat funcionará apenas com dados básicos do site.
          </p>
        </div>
      </div>
    </div>
  );
}
