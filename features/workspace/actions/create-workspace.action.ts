import { createWorkspaceMutation } from "../mutations";
import { workspaceSchema } from "../validations/workspace.schema";

export async function createWorkspaceAction(input: unknown) {
  const parsedInput = workspaceSchema.parse(input);

  return createWorkspaceMutation(parsedInput);
}