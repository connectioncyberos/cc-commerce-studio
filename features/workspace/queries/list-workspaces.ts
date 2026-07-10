import type { SupabaseClient } from "@supabase/supabase-js";
import { listWorkspaces } from "../services/workspace.service";

export async function listWorkspacesQuery(supabase: SupabaseClient) {
  return listWorkspaces(supabase);
}
