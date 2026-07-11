"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { deleteVideoScriptMutation } from "../mutations";

export async function deleteVideoScriptAction(id: string) {
  const supabase = createClient();
  await deleteVideoScriptMutation(supabase, id);
  revalidatePath("/video-scripts");
}
