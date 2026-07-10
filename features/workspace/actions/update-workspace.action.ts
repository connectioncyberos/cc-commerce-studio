"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { updateWorkspaceMutation } from "../mutations";
import { workspaceSchema } from "../validations/workspace.schema";

export async function updateWorkspaceAction(id: string, input: unknown) {
  const parsedInput = workspaceSchema.partial().parse(input);

  const supabase = createClient();
  const workspace = await updateWorkspaceMutation(supabase, id, parsedInput);
  revalidatePath("/workspace");
  return workspace;
}
