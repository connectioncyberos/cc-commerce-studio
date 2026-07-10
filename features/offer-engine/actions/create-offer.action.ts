"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createOfferMutation } from "../mutations";
import { offerSchema } from "../validations/offer.schema";

export type CreateOfferActionState = {
  error: string | null;
  success: boolean;
};

export async function createOfferAction(
  _prevState: CreateOfferActionState,
  formData: FormData,
): Promise<CreateOfferActionState> {
  const parsed = offerSchema.safeParse({
    title: formData.get("title") ?? "",
    copy: formData.get("copy") || undefined,
    status: formData.get("status") || undefined,
    product_id: formData.get("product_id") ?? "",
    brand_id: formData.get("brand_id") || undefined,
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Dados inválidos.",
      success: false,
    };
  }

  const workspaceId = formData.get("workspace_id");

  if (typeof workspaceId !== "string" || !workspaceId) {
    return { error: "Workspace não identificado.", success: false };
  }

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Sessão expirada. Faça login novamente.", success: false };
  }

  try {
    await createOfferMutation(supabase, {
      id: crypto.randomUUID(),
      workspace_id: workspaceId,
      ...parsed.data,
      brand_id: parsed.data.brand_id || null,
    });
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Erro ao criar oferta.",
      success: false,
    };
  }

  revalidatePath("/offers");
  return { error: null, success: true };
}
