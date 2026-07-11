import type { SupabaseClient } from "@supabase/supabase-js";
import { deleteLandingPage } from "../services/landing-page.service";

export async function deleteLandingPageMutation(supabase: SupabaseClient, id: string) {
  return deleteLandingPage(supabase, id);
}
