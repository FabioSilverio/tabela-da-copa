export async function askOpenAI(prompt: string, model = "gpt-4o-mini") {
  const apiKey = localStorage.getItem("openai_api_key");
  
  const res = await fetch("/api/openai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, model, apiKey }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Erro na API OpenAI");
  return data.content as string;
}

export async function askXAI(prompt: string, model?: string) {
  const apiKey = localStorage.getItem("xai_api_key");
  const xaiModel = model || localStorage.getItem("xai_model") || "grok-4-20";
  
  const res = await fetch("/api/xai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, model: xaiModel, apiKey }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Erro na API xAI");
  return data.content as string;
}
