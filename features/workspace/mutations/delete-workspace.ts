import { deleteWorkspace } from "../services/workspace.service";

export async function deleteWorkspaceMutation(id: string) {
  return deleteWorkspace(id);
}