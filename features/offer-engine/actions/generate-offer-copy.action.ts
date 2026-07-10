"use server";

import { createClient } from "@/lib/supabase/server";
import { getProductById } from "@/features/products";
import { getBrandById } from "@/features/brands";
import { generateOfferCopy } from "../services/offer.service";

/**
 * Server Action isolada (SPC-0004, 4.5): a UI chama esta action para
 * "gerar" a copy. Hoje ela devolve um rascunho manual (ver
 * offer.service.ts::generateOfferCopy), sem chamada real de IA — quando
 * um provedor for escolhido, só esta cadeia precisa mudar.
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
