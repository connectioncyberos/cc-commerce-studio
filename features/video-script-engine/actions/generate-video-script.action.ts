"use server";

import { createClient } from "@/lib/supabase/server";
import { getOfferById } from "@/features/offer-engine";
import { getProductById } from "@/features/products";
import { getBrandById } from "@/features/brands";
import { generateVideoScript } from "../services/video-script.service";

/**
 * Server Action isolada (SPC-0006, 4.4): a UI chama esta action para gerar
 * o roteiro. Chama o Gemini de verdade via generateVideoScript(); erros de
 * rede, cota ou bloqueio de segurança chegam aqui via catch e viram `error`
 * tratável pela UI (STD-0007 §4.8) — mesmo padrão de generate-offer-copy.action.ts.
 */
export async function generateVideoScriptAction(
  offerId: string,
): Promise<{ script: string | null; error: string | null }> {
  const supabase = createClient();

  try {
    const offer = await getOfferById(supabase, offerId);

    if (!offer) {
      return { script: null, error: "Oferta não encontrada." };
    }

    const product = await getProductById(supabase, offer.product_id);

    if (!product) {
      return { script: null, error: "Produto da oferta não encontrado." };
    }

    const brand = offer.brand_id ? await getBrandById(supabase, offer.brand_id) : null;

    const script = await generateVideoScript({ offer, product, brand });
    return { script, error: null };
  } catch (error) {
    return {
      script: null,
      error: error instanceof Error ? error.message : "Erro ao gerar roteiro.",
    };
  }
}
