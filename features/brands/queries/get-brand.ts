import type { SupabaseClient } from "@supabase/supabase-js";
import { getBrandById } from "../services/brand.service";

export async function getBrandQuery(supabase: SupabaseClient, id: string) {
  return getBrandById(supabase, id);
}
