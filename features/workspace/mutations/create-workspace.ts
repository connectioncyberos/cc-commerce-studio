import type { SupabaseClient } from "@supabase/supabase-js";
import { createWorkspace } from "../services/workspace.service";
import type { CreateWorkspaceInput } from "../types/workspace.types";

export async function createWorkspaceMutation(
  supabase: SupabaseClient,
  input: CreateWorkspaceInput & { id: string },
) {
  return createWorkspace(supabase, input);
}
