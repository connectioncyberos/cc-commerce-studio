import type { SupabaseClient } from "@supabase/supabase-js";
import { getProductById } from "../services/product.service";

export async function getProductQuery(supabase: SupabaseClient, id: string) {
  return getProductById(supabase, id);
}
