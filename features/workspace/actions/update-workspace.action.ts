import { updateWorkspaceMutation } from "../mutations";
import { workspaceSchema } from "../validations/workspace.schema";

export async function updateWorkspaceAction(id: string, input: unknown) {
  const parsedInput = workspaceSchema.partial().parse(input);

  return updateWorkspaceMutation(id, parsedInput);
}