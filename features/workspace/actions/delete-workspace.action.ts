"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { deleteWorkspaceMutation } from "../mutations";

export async function deleteWorkspaceAction(id: string) {
  const supabase = createClient();
  await deleteWorkspaceMutation(supabase, id);
  revalidatePath("/workspace");
}
