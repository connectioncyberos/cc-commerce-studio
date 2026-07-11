"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createVideoScriptMutation } from "../mutations";
import { videoScriptSchema } from "../validations/video-script.schema";

export type CreateVideoScriptActionState = {
  error: string | null;
  success: boolean;
};

export async function createVideoScriptAction(
  _prevState: CreateVideoScriptActionState,
  formData: FormData,
): Promise<CreateVideoScriptActionState> {
  const parsed = videoScriptSchema.safeParse({
    title: formData.get("title") ?? "",
    script: formData.get("script") || undefined,
    status: formData.get("status") || undefined,
    offer_id: formData.get("offer_id") ?? "",
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
    await createVideoScriptMutation(supabase, {
      id: crypto.randomUUID(),
      workspace_id: workspaceId,
      ...parsed.data,
    });
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Erro ao criar roteiro.",
      success: false,
    };
  }

  revalidatePath("/video-scripts");
  return { error: null, success: true };
}
