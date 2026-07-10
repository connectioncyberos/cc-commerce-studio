import type { SupabaseClient } from "@supabase/supabase-js";
import { getOfferById } from "../services/offer.service";

export async function getOfferQuery(supabase: SupabaseClient, id: string) {
  return getOfferById(supabase, id);
}
