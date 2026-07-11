"use server";

import { createClient } from "@/lib/supabase/server";
import { getProductById } from "@/features/products";
import { getBrandById } from "@/features/brands";
import { generateOfferCopy } from "../services/offer.service";

/**
 * Server Action isolada (SPC-0004, 4.5): a UI chama esta action para
 * "gerar" a copy. Desde PR-0001 v0.2.0, chama o Gemini 3.1 Flash-Lite de
 * verdade (ver offer.service.ts::generateOfferCopy); erros de rede, cota
 * ou bloqueio de segurança chegam aqui via catch e viram `error` tratável
 * pela UI (STD-0007 §4.8).
 */
export async function generateOfferCopyAction(
  productId: string,
  brandId: string | null,
): Promise<{ copy: string | null; error: string | null }> {
  const supabase = createClient();

  try {
    const product = await getProductById(supabase, productId);

    if (!product) {
      return { copy: null, error: "Produto não encontrado." };
    }

    const brand = brandId ? await getBrandById(supabase, brandId) : null;

    const copy = await generateOfferCopy({ product, brand });
    return { copy, error: null };
  } catch (error) {
    return {
      copy: null,
      error: error instanceof Error ? error.message : "Erro ao gerar copy.",
    };
  }
}
