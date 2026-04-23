"use client";

import { useState, useEffect } from "react";
import { SectionTitle } from "@/components/SectionTitle";
import { Key, Save, Trash2, AlertTriangle, Check } from "lucide-react";

export default function ConfiguracoesPage() {
  const [openaiKey, setOpenaiKey] = useState("");
  const [xaiKey, setXaiKey] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const oai = localStorage.getItem("openai_api_key");
    const xai = localStorage.getItem("xai_api_key");
    if (oai) setOpenaiKey(oai);
    if (xai) setXaiKey(xai);
  }, []);

  const handleSave = () => {
    if (openaiKey) localStorage.setItem("openai_api_key", openaiKey);
    else localStorage.removeItem("openai_api_key");
    
    if (xaiKey) localStorage.setItem("xai_api_key", xaiKey);
    else localStorage.removeItem("xai_api_key");
    
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleClear = () => {
    setOpenaiKey("");
    setXaiKey("");
    localStorage.removeItem("openai_api_key");
    localStorage.removeItem("xai_api_key");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <SectionTitle subtitle="Configure suas chaves de API para análise com IA">
        Configurações
      </SectionTitle>

      <div className="panel p-4 space-y-4">
        <div className="flex items-center gap-2">
          <Key className="w-4 h-4" />
          <h3 className="text-sm font-bold uppercase tracking-widest">Chaves de API</h3>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-wider font-bold block">
              OpenAI API Key
            </label>
            <input
              type="password"
              placeholder="sk-proj-..."
              value={openaiKey}
              onChange={(e) => setOpenaiKey(e.target.value)}
              className="retro-input w-full text-xs"
            />
            <p className="text-[10px] uppercase tracking-wider opacity-50">
              Obtenha em: platform.openai.com/api-keys
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-wider font-bold block">
              xAI API Key
            </label>
            <input
              type="password"
              placeholder="xai-..."
              value={xaiKey}
              onChange={(e) => setXaiKey(e.target.value)}
              className="retro-input w-full text-xs"
            />
            <p className="text-[10px] uppercase tracking-wider opacity-50">
              Obtenha em: console.x.ai
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handleSave}
            className="retro-btn retro-btn-primary flex items-center gap-2"
          >
            <Save className="w-3 h-3" />
            Salvar Chaves
          </button>
          <button
            onClick={handleClear}
            className="retro-btn flex items-center gap-2"
          >
            <Trash2 className="w-3 h-3" />
            Limpar
          </button>
        </div>

        {saved && (
          <div className="flex items-center gap-2 text-xs text-green-800 bg-green-100/20 p-2 border border-green-800/20">
            <Check className="w-3 h-3" />
            Configurações salvas com sucesso!
          </div>
        )}
      </div>

      <div className="panel p-4 flex items-start gap-3">
        <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 opacity-70" />
        <div className="text-xs leading-relaxed opacity-90 space-y-2">
          <p>
            <strong className="uppercase tracking-wider">Segurança:</strong> suas chaves são armazenadas apenas no navegador (localStorage).
            Elas nunca são enviadas para nossos servidores. As requisições para OpenAI/xAI são feitas diretamente do seu navegador.
          </p>
          <p>
            <strong className="uppercase tracking-wider">OpenAI OAuth:</strong> a OpenAI não oferece OAuth público para consumo de API.
            É necessário usar uma API Key diretamente. O Codex usa o mesmo sistema de chaves.
          </p>
        </div>
      </div>
    </div>
  );
}
