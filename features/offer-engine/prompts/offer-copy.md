---
id: PR-0001
title: Geração de copy de oferta a partir de Product + Brand
target_model: Gemini 3.1 Flash-Lite (Google AI Studio, free tier)
objective: Gerar um texto de oferta de venda persuasivo a partir dos dados de um produto e do tom de voz de uma marca.
version: 0.2.0
status: Active
---

# PR-0001 — Geração de copy de oferta

## Variáveis de entrada

- `product.name` (obrigatória) — nome do produto.
- `product.description` (obrigatória) — descrição do produto.
- `brand.tone_of_voice` (opcional) — tom de voz da marca; se ausente, usar tom neutro/profissional padrão.
- `brand.name` (opcional) — nome da marca, para referência de contexto.

## Formato de saída esperado

Texto livre (string), em português do Brasil, entre 2 e 4 parágrafos curtos, terminando com uma chamada para ação clara. Sem markdown, sem listas — texto corrido pronto para uso direto como copy de oferta.

## Template do prompt

```
Você é um redator publicitário especializado em ofertas de venda diretas.

Produto: {{product.name}}
Descrição do produto: {{product.description}}
Tom de voz da marca: {{brand.tone_of_voice | "neutro e profissional"}}

Escreva uma oferta de venda persuasiva para este produto, respeitando o tom de voz
indicado. Use entre 2 e 4 parágrafos curtos. Termine com uma chamada para ação clara.
Não use listas nem formatação markdown — apenas texto corrido.
```

## Exemplo manual (sem chamada de IA real — valida apenas o formato)

**Entrada:**
- `product.name`: "Insole Biohacking FIR Power®"
- `product.description`: "A palmilha inteligente que transforma conforto em liberdade a cada passo."
- `brand.tone_of_voice`: "direto, técnico, confiante"

**Saída esperada (exemplo escrito à mão):**

Seus pés carregam você o dia inteiro — e a Insole Biohacking FIR Power® foi desenvolvida para devolver o conforto que eles merecem. Tecnologia aplicada ao seu calçado, sem mudar sua rotina.

Menos cansaço, mais disposição para o que importa. Experimente e sinta a diferença já no primeiro dia de uso.

Garanta a sua agora e transforme cada passo em mais liberdade.

## Histórico de Alterações

| Versão | Data | Alteração | Autor |
|--------|------|-----------|-------|
| 0.1.0 | 2026-07-10 | Primeira versão, status Ready (checklist STD-0007 §4.7 cumprido; falta apenas provedor de IA para avançar a Active) | Claude |
| 0.2.0 | 2026-07-10 | Status promovido para Active — ligado ao Gemini 2.5 Flash-Lite via `@google/genai` em `offer.service.ts` | Claude |
| 0.2.1 | 2026-07-10 | Corrigido para `gemini-3.1-flash-lite` — 2.5 Flash-Lite foi descontinuado para novos usuários | Claude |
