import type { SupabaseClient } from "@supabase/supabase-js";
import { updateBrand } from "../services/brand.service";
import type { UpdateBrandInput } from "../types/brand.types";

export async function updateBrandMutation(
  supabase: SupabaseClient,
  id: string,
  input: UpdateBrandInput,
) {
  return updateBrand(supabase, id, input);
}
