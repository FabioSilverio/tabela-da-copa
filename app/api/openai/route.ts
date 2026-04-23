import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  try {
    const { prompt, model = "gpt-4o-mini", apiKey: clientKey } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Prompt inválido" }, { status: 400 });
    }

    // Tenta usar a chave enviada pelo cliente, senão usa a do servidor
    const apiKey = clientKey || process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ error: "Chave da OpenAI não configurada. Insira em Configurações ou configure OPENAI_API_KEY no servidor." }, { status: 500 });
    }

    const openai = new OpenAI({ apiKey });

    const response = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content:
            "Você é um assistente especializado em análise futebolística da Copa do Mundo 2026. Responda de forma objetiva, técnica e em português do Brasil.",
        },
        { role: "user", content: prompt },
      ],
    });

    const content = response.choices[0]?.message?.content ?? "";
    return NextResponse.json({ content });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Erro desconhecido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
