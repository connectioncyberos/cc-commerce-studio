import type { SupabaseClient } from "@supabase/supabase-js";
import { listProducts } from "../services/product.service";

export async function listProductsQuery(
  supabase: SupabaseClient,
  workspaceId: string,
) {
  return listProducts(supabase, workspaceId);
}
