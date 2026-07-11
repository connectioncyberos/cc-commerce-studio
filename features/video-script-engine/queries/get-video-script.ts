import type { SupabaseClient } from "@supabase/supabase-js";
import { getVideoScriptById } from "../services/video-script.service";

export async function getVideoScriptQuery(supabase: SupabaseClient, id: string) {
  return getVideoScriptById(supabase, id);
}
