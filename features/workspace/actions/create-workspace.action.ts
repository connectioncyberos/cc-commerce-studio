"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createWorkspaceMutation } from "../mutations";
import { workspaceSchema } from "../validations/workspace.schema";

export type CreateWorkspaceActionState = {
  error: string | null;
  success: boolean;
};

export async function createWorkspaceAction(
  _prevState: CreateWorkspaceActionState,
  formData: FormData,
): Promise<CreateWorkspaceActionState> {
  const parsed = workspaceSchema.safeParse({
    name: formData.get("name") ?? "",
    slug: formData.get("slug") ?? "",
    description: formData.get("description") || undefined,
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Dados inválidos.",
      success: false,
    };
  }

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Sessão expirada. Faça login novamente.", success: false };
  }

  const workspaceId = crypto.randomUUID();

  try {
    await createWorkspaceMutation(supabase, {
      id: workspaceId,
      ...parsed.data,
    });

    const { error: memberError } = await supabase
      .from("workspace_members")
      .insert({ workspace_id: workspaceId, user_id: user.id, role: "owner" });

    if (memberError) {
      return { error: memberError.message, success: false };
    }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Erro ao criar workspace.",
      success: false,
    };
  }

  revalidatePath("/workspace");
  return { error: null, success: true };
}
