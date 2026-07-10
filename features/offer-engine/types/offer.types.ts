export type OfferStatus = "draft" | "generated" | "published";

export interface Offer {
  id: string;
  workspace_id: string;
  product_id: string;
  brand_id: string | null;
  title: string;
  copy: string | null;
  status: string;
  prompt_id: string | null;

  created_at: string;
  updated_at: string;
}

export interface CreateOfferInput {
  workspace_id: string;
  product_id: string;
  brand_id?: string | null;
  title: string;
  copy?: string;
  status?: OfferStatus;
  prompt_id?: string;
}

export interface UpdateOfferInput {
  product_id?: string;
  brand_id?: string | null;
  title?: string;
  copy?: string;
  status?: OfferStatus;
  prompt_id?: string;
}
