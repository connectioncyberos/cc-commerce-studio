"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createLandingPageMutation } from "../mutations";
import { landingPageSchema } from "../validations/landing-page.schema";

export type CreateLandingPageActionState = {
  error: string | null;
  success: boolean;
};

export async function createLandingPageAction(
  _prevState: CreateLandingPageActionState,
  formData: FormData,
): Promise<CreateLandingPageActionState> {
  const parsed = landingPageSchema.safeParse({
    title: formData.get("title") ?? "",
    slug: formData.get("slug") ?? "",
    content: formData.get("content") || undefined,
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
    await createLandingPageMutation(supabase, {
      id: crypto.randomUUID(),
      workspace_id: workspaceId,
      ...parsed.data,
    });
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "Erro ao criar landing page.",
      success: false,
    };
  }

  revalidatePath("/landing-pages");
  return { error: null, success: true };
}
