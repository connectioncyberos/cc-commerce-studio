import type { SupabaseClient } from "@supabase/supabase-js";
import { createProduct } from "../services/product.service";
import type { CreateProductInput } from "../types/product.types";

export async function createProductMutation(
  supabase: SupabaseClient,
  input: CreateProductInput & { id: string },
) {
  return createProduct(supabase, input);
}
