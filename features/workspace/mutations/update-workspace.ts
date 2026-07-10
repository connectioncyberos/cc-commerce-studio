import type { SupabaseClient } from "@supabase/supabase-js";
import { updateWorkspace } from "../services/workspace.service";
import type { UpdateWorkspaceInput } from "../types/workspace.types";

export async function updateWorkspaceMutation(
  supabase: SupabaseClient,
  id: string,
  input: UpdateWorkspaceInput,
) {
  return updateWorkspace(supabase, id, input);
}
