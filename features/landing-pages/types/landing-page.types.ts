export type LandingPageStatus = "draft" | "published";

export interface LandingPage {
  id: string;
  workspace_id: string;
  offer_id: string;
  title: string;
  slug: string;
  content: string | null;
  status: string;

  created_at: string;
  updated_at: string;
}

export interface CreateLandingPageInput {
  workspace_id: string;
  offer_id: string;
  title: string;
  slug: string;
  content?: string;
  status?: LandingPageStatus;
}

export interface UpdateLandingPageInput {
  offer_id?: string;
  title?: string;
  slug?: string;
  content?: string;
  status?: LandingPageStatus;
}
