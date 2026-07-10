import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  CreateWorkspaceInput,
  UpdateWorkspaceInput,
  Workspace,
} from "../types/workspace.types";

export async function listWorkspaces(
  supabase: SupabaseClient,
): Promise<Workspace[]> {
  const { data, error } = await supabase
    .from("workspaces")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function getWorkspaceById(
  supabase: SupabaseClient,
  id: string,
): Promise<Workspace | null> {
  const { data, error } = await supabase
    .from("workspaces")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/**
 * Insere o Workspace SEM pedir a linha de volta (sem RETURNING).
 * Motivo: logo após o insert, ainda não existe o vínculo em
 * workspace_members — a política de SELECT de workspaces exige esse
 * vínculo, então pedir a linha de volta nesse momento falha por RLS
 * (Postgres nega "visibilidade" da linha recém-criada). O id é gerado
 * no chamador e passado explicitamente para não depender do RETURNING.
 */
export async function createWorkspace(
  supabase: SupabaseClient,
  input: CreateWorkspaceInput & { id: string },
): Promise<void> {
  const { error } = await supabase.from("workspaces").insert(input);

  if (error) {
    throw new Error(error.message);
  }
}

export async function updateWorkspace(
  supabase: SupabaseClient,
  id: string,
  input: UpdateWorkspaceInput,
): Promise<Workspace> {
  const { data, error } = await supabase
    .from("workspaces")
    .update(input)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteWorkspace(
  supabase: SupabaseClient,
  id: string,
): Promise<void> {
  const { error } = await supabase.from("workspaces").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}
