import type { SupabaseClient } from "@supabase/supabase-js";
import { createBrand } from "../services/brand.service";
import type { CreateBrandInput } from "../types/brand.types";

export async function createBrandMutation(
  supabase: SupabaseClient,
  input: CreateBrandInput & { id: string },
) {
  return createBrand(supabase, input);
}
