export interface Workspace {
  id: string;
  name: string;
  slug: string;
  description: string | null;

  created_at: string;
  updated_at: string;
}

export interface CreateWorkspaceInput {
  name: string;
  slug: string;
  description?: string;
}

export interface UpdateWorkspaceInput {
  name?: string;
  slug?: string;
  description?: string;
}