import type { SupabaseClient } from "@supabase/supabase-js";
import { getWorkspaceById } from "../services/workspace.service";

export async function getWorkspaceQuery(supabase: SupabaseClient, id: string) {
  return getWorkspaceById(supabase, id);
}
