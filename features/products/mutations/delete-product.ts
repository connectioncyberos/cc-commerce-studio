import type { SupabaseClient } from "@supabase/supabase-js";
import { deleteProduct } from "../services/product.service";

export async function deleteProductMutation(supabase: SupabaseClient, id: string) {
  return deleteProduct(supabase, id);
}
