"use client";

import { useState, useEffect } from "react";
import { SectionTitle } from "@/components/SectionTitle";
import { Key, Save, Trash2, AlertTriangle, Check, LogIn, ExternalLink } from "lucide-react";

export default function ConfiguracoesPage() {
  const [openaiKey, setOpenaiKey] = useState("");
  const [xaiKey, setXaiKey] = useState("");
  const [saved, setSaved] = useState(false);
  const [oauthStatus, setOAuthStatus] = useState<"none" | "connected">("none");
  const [showOAuthInfo, setShowOAuthInfo] = useState(false);

  useEffect(() => {
    const oai = localStorage.getItem("openai_api_key");
    const xai = localStorage.getItem("xai_api_key");
    const oauthToken = localStorage.getItem("openai_oauth_token");
    if (oai) setOpenaiKey(oai);
    if (xai) setXaiKey(xai);
    if (oauthToken) setOAuthStatus("connected");
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
    localStorage.removeItem("openai_oauth_token");
    setOAuthStatus("none");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  // OpenAI OAuth flow
  const startOpenAIOAuth = () => {
    // Generate PKCE parameters
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = generateCodeChallenge(codeVerifier);
    
    // Store code verifier for later
    sessionStorage.setItem("openai_code_verifier", codeVerifier);
    
    // Build OAuth URL
    const clientId = "YOUR_OPENAI_CLIENT_ID"; // User needs to replace this
    const redirectUri = `${window.location.origin}/configuracoes`;
    const state = generateState();
    sessionStorage.setItem("openai_oauth_state", state);
    
    const oauthUrl = new URL("https://platform.openai.com/oauth/authorize");
    oauthUrl.searchParams.set("client_id", clientId);
    oauthUrl.searchParams.set("redirect_uri", redirectUri);
    oauthUrl.searchParams.set("response_type", "code");
    oauthUrl.searchParams.set("scope", "api");
    oauthUrl.searchParams.set("state", state);
    oauthUrl.searchParams.set("code_challenge", codeChallenge);
    oauthUrl.searchParams.set("code_challenge_method", "S256");
    
    window.location.href = oauthUrl.toString();
  };

  // Handle OAuth callback
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const state = urlParams.get("state");
    const error = urlParams.get("error");
    
    if (error) {
      console.error("OAuth error:", error);
      return;
    }
    
    if (code && state) {
      const savedState = sessionStorage.getItem("openai_oauth_state");
      const codeVerifier = sessionStorage.getItem("openai_code_verifier");
      
      if (state !== savedState) {
        console.error("State mismatch");
        return;
      }
      
      // Exchange code for token
      exchangeCodeForToken(code, codeVerifier).then((token) => {
        if (token) {
          localStorage.setItem("openai_oauth_token", token);
          setOAuthStatus("connected");
          // Clean URL
          window.history.replaceState({}, document.title, "/configuracoes");
        }
      });
    }
  }, []);

  const disconnectOAuth = () => {
    localStorage.removeItem("openai_oauth_token");
    setOAuthStatus("none");
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <SectionTitle subtitle="Configure suas chaves de API e autenticações para análise com IA">
        Configurações
      </SectionTitle>

      {/* OpenAI OAuth Section */}
      <div className="panel p-4 space-y-4">
        <div className="flex items-center gap-2">
          <LogIn className="w-4 h-4" />
          <h3 className="text-sm font-bold uppercase tracking-widest">Autenticação OpenAI (Codex)</h3>
        </div>

        <div className="text-xs leading-relaxed opacity-90 space-y-2">
          <p>
            Conecte sua conta OpenAI via OAuth para usar o <strong>Codex API</strong> e outros modelos.
            Alternativamente, use uma API Key diretamente na seção abaixo.
          </p>
        </div>

        {oauthStatus === "connected" ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs text-green-800 bg-green-100/20 p-2 border border-green-800/20">
              <Check className="w-3 h-3" />
              Conta OpenAI conectada via OAuth
            </div>
            <button onClick={disconnectOAuth} className="retro-btn flex items-center gap-2">
              <Trash2 className="w-3 h-3" />
              Desconectar
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <button
              onClick={startOpenAIOAuth}
              className="retro-btn retro-btn-primary w-full flex items-center justify-center gap-2"
            >
              <LogIn className="w-3 h-3" />
              Conectar com OpenAI OAuth
            </button>
            <button
              onClick={() => setShowOAuthInfo(!showOAuthInfo)}
              className="text-[10px] uppercase tracking-wider opacity-60 flex items-center gap-1"
            >
              <ExternalLink className="w-3 h-3" />
              Como configurar OAuth da OpenAI
            </button>
          </div>
        )}

        {showOAuthInfo && (
          <div className="panel p-3 text-xs space-y-2 opacity-90">
            <p className="font-bold uppercase tracking-wider">Instruções:</p>
            <ol className="list-decimal list-inside space-y-1 text-[11px]">
              <li>Acesse <a href="https://platform.openai.com/settings/organization/oauth" target="_blank" rel="noopener noreferrer" className="underline">platform.openai.com/settings/organization/oauth</a></li>
              <li>Crie um novo aplicativo OAuth</li>
              <li>Adicione <code className="bg-black/5 px-1">{typeof window !== "undefined" ? window.location.origin : ""}/configuracoes</code> como Redirect URI</li>
              <li>Copie o Client ID e substitua no código do projeto</li>
              <li>Clique em "Conectar com OpenAI OAuth" acima</li>
            </ol>
            <p className="text-[10px] opacity-60 mt-2">
              Nota: O fluxo OAuth requer um Client ID válido registrado na OpenAI.
            </p>
          </div>
        )}
      </div>

      {/* API Keys Section */}
      <div className="panel p-4 space-y-4">
        <div className="flex items-center gap-2">
          <Key className="w-4 h-4" />
          <h3 className="text-sm font-bold uppercase tracking-widest">Chaves de API (Alternativa)</h3>
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
              Obtenha em: platform.openai.com/api-keys — Funciona com Codex, GPT-4o, etc.
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
            Limpar Tudo
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
            Elas nunca são enviadas para nossos servidores. As requisições são feitas diretamente do seu navegador para as APIs.
          </p>
          <p>
            <strong className="uppercase tracking-wider">Prioridade:</strong> OAuth da OpenAI tem prioridade sobre API Key. Se ambos estiverem configurados, o OAuth será usado.
          </p>
        </div>
      </div>
    </div>
  );
}

// PKCE helpers
function generateCodeVerifier(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return base64URLEncode(array);
}

function generateCodeChallenge(verifier: string): string {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  return crypto.subtle.digest("SHA-256", data).then((digest) => {
    return base64URLEncode(new Uint8Array(digest));
  }) as unknown as string;
}

function base64URLEncode(buffer: Uint8Array): string {
  return btoa(String.fromCharCode(...buffer))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

function generateState(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return base64URLEncode(array);
}

async function exchangeCodeForToken(code: string, codeVerifier: string | null): Promise<string | null> {
  try {
    const response = await fetch("https://api.openai.com/v1/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: "YOUR_OPENAI_CLIENT_ID",
        code,
        redirect_uri: `${window.location.origin}/configuracoes`,
        code_verifier: codeVerifier || "",
      }),
    });
    
    if (!response.ok) {
      console.error("Token exchange failed:", await response.text());
      return null;
    }
    
    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Error exchanging code:", error);
    return null;
  }
}
