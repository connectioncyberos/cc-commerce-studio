import { deleteWorkspaceMutation } from "../mutations";

export async function deleteWorkspaceAction(id: string) {
  return deleteWorkspaceMutation(id);
}