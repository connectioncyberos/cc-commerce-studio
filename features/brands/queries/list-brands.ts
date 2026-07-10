import type { SupabaseClient } from "@supabase/supabase-js";
import { listBrands } from "../services/brand.service";

export async function listBrandsQuery(supabase: SupabaseClient, workspaceId: string) {
  return listBrands(supabase, workspaceId);
}
