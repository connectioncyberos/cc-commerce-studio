import type { SupabaseClient } from "@supabase/supabase-js";
import { deleteBrand } from "../services/brand.service";

export async function deleteBrandMutation(supabase: SupabaseClient, id: string) {
  return deleteBrand(supabase, id);
}
