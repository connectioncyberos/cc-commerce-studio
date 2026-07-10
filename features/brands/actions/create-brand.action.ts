"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createBrandMutation } from "../mutations";
import { brandSchema } from "../validations/brand.schema";

export type CreateBrandActionState = {
  error: string | null;
  success: boolean;
};

export async function createBrandAction(
  _prevState: CreateBrandActionState,
  formData: FormData,
): Promise<CreateBrandActionState> {
  const parsed = brandSchema.safeParse({
    name: formData.get("name") ?? "",
    slug: formData.get("slug") ?? "",
    description: formData.get("description") || undefined,
    tone_of_voice: formData.get("tone_of_voice") || undefined,
    logo_url: formData.get("logo_url") || undefined,
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
    await createBrandMutation(supabase, {
      id: crypto.randomUUID(),
      workspace_id: workspaceId,
      ...parsed.data,
      logo_url: parsed.data.logo_url || undefined,
    });
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Erro ao criar marca.",
      success: false,
    };
  }

  revalidatePath("/brands");
  return { error: null, success: true };
}
