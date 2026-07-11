import type { SupabaseClient } from "@supabase/supabase-js";
import { GoogleGenAI } from "@google/genai";
import type {
  CreateVideoScriptInput,
  UpdateVideoScriptInput,
  VideoScript,
} from "../types/video-script.types";

/**
 * PR-0002: mesmo padrão do PR-0001 (offer.service.ts) — cliente do Gemini
 * criado só se GEMINI_API_KEY existir. Sem chave, generateVideoScript() cai
 * em rascunho manual, sem quebrar o resto do módulo.
 */
const genAI = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  : null;

export async function listVideoScripts(
  supabase: SupabaseClient,
  workspaceId: string,
): Promise<VideoScript[]> {
  const { data, error } = await supabase
    .from("video_scripts")
    .select("*")
    .eq("workspace_id", workspaceId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function getVideoScriptById(
  supabase: SupabaseClient,
  id: string,
): Promise<VideoScript | null> {
  const { data, error } = await supabase
    .from("video_scripts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/**
 * Mesmo raciocínio já validado em CS-008 a CS-011: a política
 * `video_scripts_member_all` depende só de `workspace_members`, que já
 * existe antes de qualquer roteiro ser criado — o insert pode pedir a linha
 * de volta com segurança.
 */
export async function createVideoScript(
  supabase: SupabaseClient,
  input: CreateVideoScriptInput & { id: string },
): Promise<VideoScript> {
  const { data, error } = await supabase
    .from("video_scripts")
    .insert(input)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateVideoScript(
  supabase: SupabaseClient,
  id: string,
  input: UpdateVideoScriptInput,
): Promise<VideoScript> {
  const { data, error } = await supabase
    .from("video_scripts")
    .update(input)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteVideoScript(supabase: SupabaseClient, id: string): Promise<void> {
  const { error } = await supabase.from("video_scripts").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

/**
 * PR-0002 (features/video-script-engine/prompts/video-script.md) — se o
 * template do prompt mudar naquele arquivo, atualizar este texto junto.
 */
function buildVideoScriptPrompt(input: {
  offer: { title: string; copy: string | null };
  product: { name: string };
  brand?: { tone_of_voice: string | null } | null;
}): string {
  const tone = input.brand?.tone_of_voice ?? "neutro e profissional";

  return `Você é um roteirista especializado em vídeos de venda diretos (estilo VSL — Video Sales Letter).

Produto: ${input.product.name}
Título da oferta: ${input.offer.title}
Copy da oferta: ${input.offer.copy ?? "Não informada."}
Tom de voz da marca: ${tone}

Escreva um roteiro de vídeo curto, dividido em cenas nomeadas (Gancho, Problema, Solução,
Prova, Chamada para ação), respeitando o tom de voz indicado. Cada cena deve ter 1 a 3
frases de fala. Não use markdown nem listas numeradas — apenas texto corrido, com o nome
de cada cena seguido de dois pontos e a fala correspondente.`;
}

/**
 * PR-0002: Active quando GEMINI_API_KEY está configurada; cai para rascunho
 * manual (mesmo comportamento do Offer Engine) se a chave não existir.
 */
export async function generateVideoScript(input: {
  offer: { title: string; copy: string | null };
  product: { name: string };
  brand?: { tone_of_voice: string | null } | null;
}): Promise<string> {
  if (!genAI) {
    return (
      `[Rascunho manual — GEMINI_API_KEY não configurada, ver PR-0002]\n\n` +
      `Escreva aqui o roteiro de vídeo para a oferta "${input.offer.title}". ` +
      `Consulte features/video-script-engine/prompts/video-script.md para o template completo.`
    );
  }

  let response;

  try {
    response = await genAI.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: buildVideoScriptPrompt(input),
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
