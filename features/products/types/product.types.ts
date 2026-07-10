export type ProductStatus = "draft" | "active" | "archived";

export interface Product {
  id: string;
  workspace_id: string;
  name: string;
  description: string | null;
  status: string;

  created_at: string;
  updated_at: string;
}

export interface CreateProductInput {
  workspace_id: string;
  name: string;
  description?: string;
  status?: ProductStatus;
}

export interface UpdateProductInput {
  name?: string;
  description?: string;
  status?: ProductStatus;
}
