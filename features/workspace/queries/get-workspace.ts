import { getWorkspaceById } from "../services/workspace.service";

export async function getWorkspaceQuery(id: string) {
  return getWorkspaceById(id);
}