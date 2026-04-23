import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt, model = "grok-4-20", apiKey: clientKey } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Prompt inválido" }, { status: 400 });
    }

    // Tenta usar a chave enviada pelo cliente, senão usa a do servidor
    const apiKey = clientKey || process.env.XAI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ error: "Chave da xAI não configurada. Insira em Configurações ou configure XAI_API_KEY no servidor." }, { status: 500 });
    }

    const response = await fetch("https://api.x.ai/v1/chat/completions", {
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

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json({ error: text }, { status: response.status });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content ?? "";
    return NextResponse.json({ content });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Erro desconhecido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
