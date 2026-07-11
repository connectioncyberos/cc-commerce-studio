export type VideoScriptStatus = "draft" | "generated";

export interface VideoScript {
  id: string;
  workspace_id: string;
  offer_id: string;
  title: string;
  script: string | null;
  status: string;
  prompt_id: string | null;

  created_at: string;
  updated_at: string;
}

export interface CreateVideoScriptInput {
  workspace_id: string;
  offer_id: string;
  title: string;
  script?: string;
  status?: VideoScriptStatus;
  prompt_id?: string;
}

export interface UpdateVideoScriptInput {
  offer_id?: string;
  title?: string;
  script?: string;
  status?: VideoScriptStatus;
  prompt_id?: string;
}
