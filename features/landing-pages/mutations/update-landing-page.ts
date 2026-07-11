import type { SupabaseClient } from "@supabase/supabase-js";
import { updateLandingPage } from "../services/landing-page.service";
import type { UpdateLandingPageInput } from "../types/landing-page.types";

export async function updateLandingPageMutation(
  supabase: SupabaseClient,
  id: string,
  input: UpdateLandingPageInput,
) {
  return updateLandingPage(supabase, id, input);
}
