export interface Brand {
  id: string;
  workspace_id: string;
  name: string;
  slug: string;
  description: string | null;
  tone_of_voice: string | null;
  logo_url: string | null;

  created_at: string;
  updated_at: string;
}

export interface CreateBrandInput {
  workspace_id: string;
  name: string;
  slug: string;
  description?: string;
  tone_of_voice?: string;
  logo_url?: string;
}

export interface UpdateBrandInput {
  name?: string;
  slug?: string;
  description?: string;
  tone_of_voice?: string;
  logo_url?: string;
}
