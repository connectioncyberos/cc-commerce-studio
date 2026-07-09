import { updateWorkspace } from "../services/workspace.service";
import type { UpdateWorkspaceInput } from "../types/workspace.types";

export async function updateWorkspaceMutation(
  id: string,
  input: UpdateWorkspaceInput,
) {
  return updateWorkspace(id, input);
}