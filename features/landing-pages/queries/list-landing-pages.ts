import type { SupabaseClient } from "@supabase/supabase-js";
import { listLandingPages } from "../services/landing-page.service";

export async function listLandingPagesQuery(
  supabase: SupabaseClient,
  workspaceId: string,
) {
  return listLandingPages(supabase, workspaceId);
}
