import { listWorkspaces } from "../services/workspace.service";

export async function listWorkspacesQuery() {
  return listWorkspaces();
}