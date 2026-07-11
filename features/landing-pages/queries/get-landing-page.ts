import type { SupabaseClient } from "@supabase/supabase-js";
import { getLandingPageById } from "../services/landing-page.service";

export async function getLandingPageQuery(supabase: SupabaseClient, id: string) {
  return getLandingPageById(supabase, id);
}
