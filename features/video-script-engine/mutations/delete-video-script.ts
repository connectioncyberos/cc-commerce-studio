import type { SupabaseClient } from "@supabase/supabase-js";
import { deleteVideoScript } from "../services/video-script.service";

export async function deleteVideoScriptMutation(supabase: SupabaseClient, id: string) {
  return deleteVideoScript(supabase, id);
}
