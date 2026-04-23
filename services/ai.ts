export async function askOpenAI(prompt: string, model = "o3-mini") {
  const res = await fetch("/api/openai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, model }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Erro na API OpenAI");
  return data.content as string;
}

export async function askXAI(prompt: string, model = "grok-2-latest") {
  const res = await fetch("/api/xai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, model }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Erro na API xAI");
  return data.content as string;
}
