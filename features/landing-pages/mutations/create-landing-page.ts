import type { SupabaseClient } from "@supabase/supabase-js";
import { createLandingPage } from "../services/landing-page.service";
import type { CreateLandingPageInput } from "../types/landing-page.types";

export async function createLandingPageMutation(
  supabase: SupabaseClient,
  input: CreateLandingPageInput & { id: string },
) {
  return createLandingPage(supabase, input);
}
