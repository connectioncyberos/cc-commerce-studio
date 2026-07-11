---
id: PR-0002
title: Geração de roteiro de vídeo de venda a partir de uma Offer
target_model: Gemini 3.1 Flash-Lite (Google AI Studio, free tier)
objective: Gerar um roteiro de vídeo de venda (estilo VSL) dividido em cenas, a partir da copy de uma Offer existente.
version: 0.2.0
status: Active
model_verified_at: 2026-07-10
---

# PR-0002 — Geração de roteiro de vídeo de venda

## Variáveis de entrada

- `offer.title` (obrigatória) — título da oferta de origem.
- `offer.copy` (opcional) — copy já gerada da oferta; se ausente, o roteiro parte só do nome/descrição do produto.
- `product.name` (obrigatória) — nome do produto.
- `brand.tone_of_voice` (opcional) — tom de voz da marca; se ausente, usar tom neutro/profissional padrão.

## Formato de saída esperado

Texto livre (string), em português do Brasil, dividido em cenas nomeadas (Gancho, Problema, Solução, Prova, Chamada para ação), cada uma com 1 a 3 frases de fala. Sem markdown, sem listas numeradas — nome da cena seguido de dois pontos e o texto da fala.

## Template do prompt

```
Você é um roteirista especializado em vídeos de venda diretos (estilo VSL — Video Sales Letter).

Produto: {{product.name}}
Título da oferta: {{offer.title}}
Copy da oferta: {{offer.copy | "Não informada."}}
Tom de voz da marca: {{brand.tone_of_voice | "neutro e profissional"}}

Escreva um roteiro de vídeo curto, dividido em cenas nomeadas (Gancho, Problema, Solução,
Prova, Chamada para ação), respeitando o tom de voz indicado. Cada cena deve ter 1 a 3
frases de fala. Não use markdown nem listas numeradas — apenas texto corrido, com o nome
de cada cena seguido de dois pontos e a fala correspondente.
```

## Exemplo manual (sem chamada de IA real — valida apenas o formato)

**Entrada:**
- `product.name`: "Insole Biohacking FIR Power®"
- `offer.title`: "Oferta de lançamento"
- `offer.copy`: "Seus pés carregam você o dia inteiro — a Insole Biohacking FIR Power® foi desenvolvida para devolver o conforto que eles merecem."
- `brand.tone_of_voice`: "direto, técnico, confiante"

**Saída esperada (exemplo escrito à mão):**

Gancho: Você já parou pra pensar em quantos passos seus pés dão todos os dias?

Problema: O desconforto acumulado ao longo do dia rouba sua energia e sua produtividade sem você perceber.

Solução: A Insole Biohacking FIR Power® foi projetada com tecnologia de suporte anatômico para mudar isso.

Prova: Tecnologia validada para reduzir o impacto das atividades diárias sobre seus pés.

Chamada para ação: Garanta a sua agora e sinta a diferença já no primeiro passo.

## Histórico de Alterações

| Versão | Data | Alteração | Autor |
|--------|------|-----------|-------|
| 0.1.0 | 2026-07-11 | Primeira versão, status Draft (segue o mesmo ciclo de vida de PR-0001; falta ligar e testar com o provedor de IA real para avançar a Ready/Active) | Claude |
| 0.2.0 | 2026-07-11 | Status promovido para Active — testado end-to-end via `/video-scripts`, roteiro real gerado pelo Gemini 3.1 Flash-Lite (cenas Gancho/Problema/Solução/Prova/Chamada para ação) e salvo com sucesso | Claude |
