export async function askOpenAI(prompt: string, model = "o3-mini") {
  const apiKey = localStorage.getItem("openai_api_key");
  if (!apiKey) throw new Error("Chave da OpenAI não configurada. Vá em Configurações.");
  
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "system",
          content:
            "Você é um assistente especializado em análise futebolística da Copa do Mundo 2026. Responda de forma objetiva, técnica e em português do Brasil.",
        },
        { role: "user", content: prompt },
      ],
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message ?? "Erro na API OpenAI");
  return data.choices[0]?.message?.content as string;
}

export async function askXAI(prompt: string, model = "grok-2-latest") {
  const apiKey = localStorage.getItem("xai_api_key");
  if (!apiKey) throw new Error("Chave da xAI não configurada. Vá em Configurações.");

  const res = await fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "system",
          content:
            "Você é um assistente especializado em análise futebolística da Copa do Mundo 2026. Responda de forma objetiva, técnica e em português do Brasil.",
        },
        { role: "user", content: prompt },
      ],
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message ?? "Erro na API xAI");
  return data.choices?.[0]?.message?.content as string;
}
