import type { SupabaseClient } from "@supabase/supabase-js";
import { GoogleGenAI } from "@google/genai";
import type { CreateOfferInput, Offer, UpdateOfferInput } from "../types/offer.types";

/**
 * PR-0001 (Active): cliente do Gemini, criado só se GEMINI_API_KEY existir.
 * Se a chave não estiver configurada, generateOfferCopy() cai no rascunho
 * manual — nenhum outro ponto do módulo quebra por falta de chave.
 */
const genAI = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  : null;

export async function listOffers(
  supabase: SupabaseClient,
  workspaceId: string,
): Promise<Offer[]> {
  const { data, error } = await supabase
    .from("offers")
    .select("*")
    .eq("workspace_id", workspaceId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function getOfferById(
  supabase: SupabaseClient,
  id: string,
): Promise<Offer | null> {
  const { data, error } = await supabase
    .from("offers")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/**
 * Mesmo raciocínio já validado em CS-008/CS-009: a política `offers_member_all`
 * depende só de `workspace_members`, que já existe antes de qualquer oferta
 * ser criada — o insert pode pedir a linha de volta com segurança.
 */
export async function createOffer(
  supabase: SupabaseClient,
  input: CreateOfferInput & { id: string },
): Promise<Offer> {
  const { data, error } = await supabase
    .from("offers")
    .insert(input)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateOffer(
  supabase: SupabaseClient,
  id: string,
  input: UpdateOfferInput,
): Promise<Offer> {
  const { data, error } = await supabase
    .from("offers")
    .update(input)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteOffer(supabase: SupabaseClient, id: string): Promise<void> {
  const { error } = await supabase.from("offers").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

/**
 * PR-0001 (features/offer-engine/prompts/offer-copy.md) — se o template do
 * prompt mudar naquele arquivo, atualizar este texto junto, para os dois
 * ficarem sincronizados.
 */
function buildOfferPrompt(input: {
  product: { name: string; description: string | null };
  brand?: { tone_of_voice: string | null } | null;
}): string {
  const tone = input.brand?.tone_of_voice ?? "neutro e profissional";

  return `Você é um redator publicitário especializado em ofertas de venda diretas.

Produto: ${input.product.name}
Descrição do produto: ${input.product.description ?? "Não informada."}
Tom de voz da marca: ${tone}

Escreva uma oferta de venda persuasiva para este produto, respeitando o tom de voz
indicado. Use entre 2 e 4 parágrafos curtos. Termine com uma chamada para ação clara.
Não use listas nem formatação markdown — apenas texto corrido.`;
}

/**
 * PR-0001: Active quando GEMINI_API_KEY está configurada; cai para rascunho
 * manual (mesmo comportamento de antes) se a chave não existir, para não
 * quebrar ambientes de desenvolvimento sem a chave configurada.
 */
export async function generateOfferCopy(input: {
  product: { name: string; description: string | null };
  brand?: { tone_of_voice: string | null } | null;
}): Promise<string> {
  if (!genAI) {
    const tone = input.brand?.tone_of_voice ?? "neutro e profissional";
    return (
      `[Rascunho manual — GEMINI_API_KEY não configurada, ver PR-0001]\n\n` +
      `Escreva aqui a oferta para "${input.product.name}", usando tom de voz "${tone}". ` +
      `Consulte features/offer-engine/prompts/offer-copy.md para o template completo.`
    );
  }

  let response;

  try {
    response = await genAI.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: buildOfferPrompt(input),
    });
  } catch (error) {
    // STD-0007 §4.8 — falha de rede/cota/indisponibilidade do provedor
    // precisa virar um erro tratável, não uma exceção não tratada.
    throw new Error(
      error instanceof Error
        ? `Falha ao chamar o provedor de IA: ${error.message}`
        : "Falha ao chamar o provedor de IA.",
    );
  }

  const text = response.text;

  if (!text) {
    // STD-0007 §4.8 — resposta vazia/bloqueada pelo filtro de segurança
    // nunca deve virar uma string vazia silenciosa para o usuário.
    const blockReason = response.candidates?.[0]?.finishReason;
    throw new Error(
      blockReason
        ? `O provedor de IA não retornou texto (motivo: ${blockReason}).`
        : "O provedor de IA não retornou nenhum texto.",
    );
  }

  return text;
}
