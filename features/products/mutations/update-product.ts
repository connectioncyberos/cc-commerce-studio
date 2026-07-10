import type { SupabaseClient } from "@supabase/supabase-js";
import { updateProduct } from "../services/product.service";
import type { UpdateProductInput } from "../types/product.types";

export async function updateProductMutation(
  supabase: SupabaseClient,
  id: string,
  input: UpdateProductInput,
) {
  return updateProduct(supabase, id, input);
}
