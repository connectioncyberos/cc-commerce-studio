import type { SupabaseClient } from "@supabase/supabase-js";
import type { CreateOfferInput, Offer, UpdateOfferInput } from "../types/offer.types";

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
 * SPC-0004 (Não Escopo): nenhuma chamada real de IA está ligada aqui.
 * Nenhum provedor foi escolhido (ver .env.example — só chaves do Supabase).
 * Esta função existe isolada para que, quando um provedor for decidido,
 * apenas esta implementação precise mudar — nenhum outro ponto do módulo
 * depende de como a geração acontece por baixo.
 */
export async function generateOfferCopy(input: {
  product: { name: string; description: string | null };
  brand?: { tone_of_voice: string | null } | null;
}): Promise<string> {
  const tone = input.brand?.tone_of_voice ?? "neutro e profissional";

  return (
    `[Rascunho manual — nenhum provedor de IA configurado ainda, ver PR-0001]\n\n` +
    `Escreva aqui a oferta para "${input.product.name}", usando tom de voz "${tone}". ` +
    `Consulte features/offer-engine/prompts/offer-copy.md para o template completo.`
  );
}
