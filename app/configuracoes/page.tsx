"use client";

import { useState, useEffect } from "react";
import { SectionTitle } from "@/components/SectionTitle";
import { Key, Save, Trash2, AlertTriangle, Check, Server, Globe } from "lucide-react";

export default function ConfiguracoesPage() {
  const [openaiKey, setOpenaiKey] = useState("");
  const [xaiKey, setXaiKey] = useState("");
  const [xaiModel, setXaiModel] = useState("");
  const [saved, setSaved] = useState(false);
  const [testResult, setTestResult] = useState<{provider: string; success: boolean; message: string} | null>(null);

  useEffect(() => {
    // Carregar do localStorage (para desenvolvimento local)
    const oai = localStorage.getItem("openai_api_key");
    const xai = localStorage.getItem("xai_api_key");
    const xaiM = localStorage.getItem("xai_model");
    if (oai) setOpenaiKey(oai);
    if (xai) setXaiKey(xai);
    if (xaiM) setXaiModel(xaiM);
  }, []);

  const handleSave = () => {
    if (openaiKey) localStorage.setItem("openai_api_key", openaiKey);
    else localStorage.removeItem("openai_api_key");
    
    if (xaiKey) localStorage.setItem("xai_api_key", xaiKey);
    else localStorage.removeItem("xai_api_key");

    if (xaiModel) localStorage.setItem("xai_model", xaiModel);
    else localStorage.removeItem("xai_model");
    
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleClear = () => {
    setOpenaiKey("");
    setXaiKey("");
    setXaiModel("");
    localStorage.removeItem("openai_api_key");
    localStorage.removeItem("xai_api_key");
    localStorage.removeItem("xai_model");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const testConnection = async (provider: "openai" | "xai") => {
    setTestResult(null);
    try {
      const endpoint = provider === "openai" ? "/api/openai" : "/api/xai";
      const apiKey = provider === "openai" ? openaiKey : xaiKey;
      
      if (!apiKey) {
        setTestResult({ provider, success: false, message: "Chave não preenchida. Digite a chave acima." });
        return;
      }
      
      const body: Record<string, string> = { prompt: "Responda apenas 'OK'", apiKey };
      if (provider === "xai" && xaiModel) {
        body.model = xaiModel;
      }
      
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      
      if (res.ok) {
        setTestResult({ provider, success: true, message: "Conexão bem-sucedida!" });
      } else {
        const data = await res.json();
        setTestResult({ provider, success: false, message: data.error ?? `Erro ${res.status}` });
      }
    } catch (e: unknown) {
      setTestResult({ provider, success: false, message: e instanceof Error ? e.message : "Erro de conexão" });
    }
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <SectionTitle subtitle="Configure as chaves de API para análise com IA">
        Configurações
      </SectionTitle>

      {/* Info sobre como funciona */}
      <div className="panel p-4 flex items-start gap-3">
        <Server className="w-4 h-4 mt-0.5 shrink-0 opacity-70" />
        <div className="text-xs leading-relaxed opacity-90 space-y-2">
          <p>
            <strong className="uppercase tracking-wider">Como funciona:</strong> As requisições para OpenAI e xAI 
            são feitas através de proxies no nosso servidor. Você pode configurar as chaves abaixo para uso local, 
            ou o administrador pode configurar via variáveis de ambiente no servidor.
          </p>
        </div>
      </div>

      {/* API Keys Section */}
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
            <div className="flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-wider opacity-50">
                Obtenha em: <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline">platform.openai.com/api-keys</a>
              </p>
              <button 
                onClick={() => testConnection("openai")}
                className="text-[10px] uppercase tracking-wider retro-btn py-1 px-2"
              >
                <Globe className="w-3 h-3 inline mr-1" />
                Testar
              </button>
            </div>
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
            <label className="text-[10px] uppercase tracking-wider font-bold block pt-1">
              xAI Modelo
            </label>
            <input
              type="text"
              placeholder="grok-4, grok-3-latest, grok-2, etc."
              value={xaiModel}
              onChange={(e) => setXaiModel(e.target.value)}
              className="retro-input w-full text-xs"
            />
            <div className="flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-wider opacity-50">
                Obtenha em: <a href="https://console.x.ai" target="_blank" rel="noopener noreferrer" className="underline">console.x.ai</a>
              </p>
              <button 
                onClick={() => testConnection("xai")}
                className="text-[10px] uppercase tracking-wider retro-btn py-1 px-2"
              >
                <Globe className="w-3 h-3 inline mr-1" />
                Testar
              </button>
            </div>
          </div>
        </div>

        {testResult && (
          <div className={`flex items-center gap-2 text-xs p-2 border ${testResult.success ? 'text-green-800 bg-green-100/20 border-green-800/20' : 'text-red-800 bg-red-100/20 border-red-800/20'}`}>
            {testResult.success ? <Check className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
            <strong className="uppercase">{testResult.provider}:</strong> {testResult.message}
          </div>
        )}

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
            As requisições são enviadas para nosso servidor proxy, que então repassa para as APIs. Isso evita problemas de CORS.
          </p>
        </div>
      </div>
    </div>
  );
}
