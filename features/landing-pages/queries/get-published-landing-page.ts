import type { SupabaseClient } from "@supabase/supabase-js";
import { getPublishedLandingPageBySlug } from "../services/landing-page.service";

export async function getPublishedLandingPageQuery(
  supabase: SupabaseClient,
  slug: string,
) {
  return getPublishedLandingPageBySlug(supabase, slug);
}
