"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createProductMutation } from "../mutations";
import { productSchema } from "../validations/product.schema";

export type CreateProductActionState = {
  error: string | null;
  success: boolean;
};

export async function createProductAction(
  _prevState: CreateProductActionState,
  formData: FormData,
): Promise<CreateProductActionState> {
  const parsed = productSchema.safeParse({
    name: formData.get("name") ?? "",
    description: formData.get("description") || undefined,
    status: formData.get("status") || undefined,
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
    await createProductMutation(supabase, {
      id: crypto.randomUUID(),
      workspace_id: workspaceId,
      ...parsed.data,
    });
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Erro ao criar produto.",
      success: false,
    };
  }

  revalidatePath("/products");
  return { error: null, success: true };
}
