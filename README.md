# Tabela da Copa

Site completo sobre a Copa do Mundo FIFA 2026 com visual retrô inspirado em terminais e jornais clássicos.

## Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Lucide React** (ícones)
- **OpenAI / xAI** (análises com IA)

## Funcionalidades

- **Página inicial** com visão geral, próximos jogos, seleções em destaque e simulador rápido
- **Tabela de grupos** completa com classificação
- **Mata-mata** com chaveamento e detalhes dos jogos
- **Resultados ao vivo** com fallback elegante quando não há dados
- **Páginas de seleções** com estatísticas, elenco e confrontos
- **Páginas de jogos** com informações de estádio, TV, rádio e escalações
- **Simulador de confrontos** com engine estatística própria
- **Busca** por seleção ou jogo
- **Análise com IA** integrada via OpenAI (Codex) e xAI (Grok)

## Design

- Fundo bege/acinzentado com grid sutil
- Tipografia monoespaçada (`Courier Prime`)
- Boxes com bordas finas escuras e sombras retrô
- Hierarquia visual clara e responsiva

## Executar localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha:

```
OPENAI_API_KEY=sk-...
XAI_API_KEY=xai-...
```

## Arquitetura

```
app/              → páginas e rotas API
components/       → componentes reutilizáveis
data/             → dados mock e estáticos
lib/              → utilitários e engine de simulação
services/         → clientes de API (IA)
types/            → tipagens TypeScript
public/           → assets estáticos
```

## Deploy

O projeto está configurado para deploy na **Vercel**.

```bash
vercel --prod
```

---

Desenvolvido com foco em código limpo, escalabilidade e UX retrô.
