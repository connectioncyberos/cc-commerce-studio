import { createWorkspace } from "../services/workspace.service";
import type { CreateWorkspaceInput } from "../types/workspace.types";

export async function createWorkspaceMutation(
  input: CreateWorkspaceInput,
) {
  return createWorkspace(input);
}