import type { SupabaseClient } from "@supabase/supabase-js";
import { deleteWorkspace } from "../services/workspace.service";

export async function deleteWorkspaceMutation(supabase: SupabaseClient, id: string) {
  return deleteWorkspace(supabase, id);
}
