import type { SupabaseClient } from "@supabase/supabase-js";
import { listVideoScripts } from "../services/video-script.service";

export async function listVideoScriptsQuery(supabase: SupabaseClient, workspaceId: string) {
  return listVideoScripts(supabase, workspaceId);
}
